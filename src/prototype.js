module.exports = Prototype;

var util = require("./util"),
    Type = require("./type");

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
        var fieldsOnly = options && options.fieldsOnly,
            fields = this.constructor.$type.fields,
            keys = Object.keys(properties);
        for (var i = 0, k = keys.length, key; i < k; ++i)
            if (!fieldsOnly || fields[key])
                this[key = keys[i]] = properties[key];
    }
}

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
    if (!util.isFunction(constructor))
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
            value: type,
            enumerable: false
        },

        /**
         * Field values present on the message.
         * @name Prototype#$values
         * @type {Object.<string,*>}
         */
        $values: {
            value: defaultValues,
            enumerable: false
        },

        /**
         * Field names of the respective fields set for each oneof.
         * @name Prototype#$oneofs
         * @type {Object.<string,string|undefined>}
         */
        $oneofs: {
            value: {},
            enumerable: false
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
            },
            enumerable: false
        };
    });

    Object.defineProperties(prototype, defineProperties);
    return prototype;
};
