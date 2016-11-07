module.exports = Prototype;

var Type  = require("./type"),
    Enum  = require("./enum"),
    types = require("./types"),
    util  = require("./util");

/**
 * Runtime message prototype ready to be extended by custom classes or generated code. Calling the
 * prototype constructor from within your own classes is optional, but you can do so if you just
 * want to initialize your instance's properties.
 * @constructor
 * @param {Object.<string,*>} [properties] Properties to set
 * @param {Object.<string,*>} [options] Initialization options
 * @param {boolean} [options.fieldsOnly=false] Sets only properties that actually reference a field
 * @abstract
 * @see {@link Type#create}
 */
function Prototype(properties, options) {
    if (properties) {
        var fieldsOnly = Boolean(options && options.fieldsOnly),
            fields = this.constructor.$type.fields,
            keys = Object.keys(properties);
        for (var i = 0, k = keys.length, key; i < k; ++i)
            if (!fieldsOnly || fields[key])
                this[key = keys[i]] = properties[key];
    }
}

/**
 * Converts a field value to JSON using the specified options.
 * @memberof Prototype
 * @param {Field} field Reflected field
 * @param {*} value Field value
 * @param {Object.<string,*>} [options] Conversion options
 * @param {Function} [options.long] Long conversion type.
 * Valid values are `String` (requires a long library) and `Number` (throws without a long library if unsafe).
 *  Defaults to the internal number/long-like representation.
 * @param {Function} [options.enum] Enum value conversion type.
 *  Only valid value is `String`.
 *  Defaults to the values' numeric ids.
 * @returns {*} Converted value
 */
function jsonConvert(field, value, options) {
    if (!field)
        return undefined;
    if (field.repeated) {
        if (!value)
            return [];
        return value.map(function(val) {
            return jsonConvert(field, val, options);
        });
    }
    if (options)
        if (field.resolvedType instanceof Enum && options.enum === String)
            return field.resolvedType.valuesById[value];
        else if (types.longWireTypes[field.type] !== undefined && options.long)
            return options.long === Number
                ? typeof value === 'number'
                ? value
                : util.Long.fromValue(value).toNumber()
                : util.Long.fromValue(value, field.type.charAt(0) === 'u').toString();
    return value;
}

Prototype.jsonConvert = jsonConvert;

/**
 * Converts a runtime message to a JSON object.
 * @param {Object.<string,*>} [options] Conversion options
 * @returns {Object.<string,*>} JSON object
 * @this Prototype
 * @virtual
 */
Prototype.toJSON = function toJSON(options) {
    var values = this.$values;
    if (!options)
        return values;
    var json = {},
        keys = Object.keys(values);
    for (var i = 0, k = keys.length, key; i < k; ++i)
        json[key = keys[i]] = jsonConvert(this.constructor.$type.fields[key], values[key], options);
    return json;
};

/**
 * Makes the specified constructor extend the runtime message prototype.
 * @param {function(new:Message)} constructor Constructor to extend
 * @param {Type} type Reflected message type
 * @param {Object.<string,*>} [options] Additional options
 * @param {boolean} [options.noStatics=false] Skips adding the default static methods on the constructor
 * @param {boolean} [options.noRegister=false] Skips registering the constructor with the reflected type
 * @returns {Object} Prototype
 */
Prototype.extend = function extend(constructor, type, options) {
    if (typeof constructor !== 'function')
        throw util._TypeError("constructor", "a function");
    if (!(type instanceof Type))
        throw util._TypeError("type", "a Type");
    if (!options)
        options = {};

    // Underlying reflected message type for reference
    constructor.$type = type;

    if (!options.noStatics) {

        // Creates a new message
        constructor.create = function(properties) {
            return this.$type.create(properties, constructor);
        };

        // Encodes to a buffer
        constructor.encode = function encode(message) {
            return this.$type.encode(message).finish();
        };

        // Encodes to a buffer, length delimited
        constructor.encodeDelimited = function encodeDelimited(message) {
            return this.$type.encodeDelimited(message).finish();
        };

        // Decodes from a buffer
        constructor.decode = function decode(buffer) {
            return this.$type.decode(buffer, constructor);
        };

        // Decodes from a buffer, length delimited
        constructor.decodeDelimited = function decodeDelimited(buffer) {
            return this.$type.decodeDelimited(buffer, constructor);
        };

    }

    var prototype = Prototype.initialize(new Prototype(), type);
    constructor.prototype = prototype;
    prototype.constructor = constructor;

    // Register the now-known constructor for this type
    if (!options.noRegister)
        type.register(constructor);

    return prototype;
};

/**
 * Initializes the specified prototype with getters and setters corresponding to the reflected
 * type's fields and oneofs. Stores field values within {@link Prototype#$values}.
 * @param {Prototype} prototype Prototype to initialize
 * @param {Type} type Reflected message type
 * @returns {Prototype} prototype
 * @see {@link Prototype#$type}
 * @see {@link Prototype#$valuees}
 * @see {@link Prototype#$oneofs}
 */
Prototype.initialize = function init(prototype, type) {

    var defaultValues = {};
    
    var defineProperties = {

        /**
         * Reference to the reflected type.
         * @name Prototype#$type
         * @type {Type}
         * @readonly
         */
        $type: {
            value: type
        },

        /**
         * Field values present on the message.
         * @name Prototype#$values
         * @type {Object.<string,*>}
         */
        $values: {
            value: defaultValues
        },

        /**
         * Field names present on the message. Useful as an alternative for Object.keys.
         * @name ProtoBuf#$keys
         * @type {string[]}
         */
        $keys: {
            get: function() {
                return Object.keys(this.$values);
            }
        },

        /**
         * Field names of the respective fields set for each oneof.
         * @name Prototype#$oneofs
         * @type {Object.<string,string|undefined>}
         */
        $oneofs: {
            value: {}
        }
    };

    // Initialize default values and define each field with a getter and a setter
    type.fieldsArray.forEach(function(field) {
        field.resolve();
        defaultValues[field.name] = field.defaultValue;
        defineProperties[field.name] = {
            get: function() {
                return this.$values[field.name];
            },
            set: function(value) {
                if (field.partOf) { // Handle oneof side effects
                    var fieldNameSet = this.$oneofs[field.partOf.name];
                    if (value === undefined || value === null) {
                        if (fieldNameSet === field.name)
                            this.$oneofs[field.partOf.name] = undefined;
                        this.$values[field.name] = field.defaultValue;
                    } else {
                        if (fieldNameSet !== undefined)
                            this.$values[fieldNameSet] = type.fields[fieldNameSet].defaultValue;
                        this.$values[field.name] = value;
                        this.$oneofs[field.partOf.name] = field.name;
                    }
                } else // Just set the value and reset to the default when unset
                    this.$values[field.name] = value === undefined || value === null
                        ? field.defaultValue
                        : value;
            },
            enumerable: true
        };
    });

    // Define each oneof with a non-enumerable getter returning the name of the currently set field
    type.oneofsArray.forEach(function(oneof) {
        oneof.resolve();
        defineProperties[oneof.name] = {
            get: function() {
                return this.$oneofs[oneof.name];
            }
        };
    });

    Object.defineProperties(prototype, defineProperties);
    return prototype;
};
