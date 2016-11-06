var util = require("./util");
var Type;

module.exports = Prototype;

// One time function to initialize cyclic dependencies
var initCyclics = function() {
    Type = require("./type");
    initCyclics = false;
};

/**
 * Runtime message prototype ready to be extended by custom classes or generated code.
 * @constructor
 * @param {Object.<string,*>} [properties] Properties to set on the instance. Only relevant when extended.
 * @abstract
 * @see {@link Type#create}
 */
function Prototype(properties) {
    if (properties)
        Object.keys(properties).forEach(function(key) {
            if (this.constructor.$type.fields[key] || this.constructor.$type.oneofs && this.constructor.$type.oneofs[key])
                this[key] = properties[key];
        }, this);

    // NOTE: Extending Prototype leaves optimization up to you. This method is here as a simple
    // way to set only properties that actually reference a field, so that instances have a fixed
    // set of fields and hopefully do not resort to become a hashmap. If you need your classes to
    // copy any properties for example, you can do that by implementing initialization yourself,
    // not calling this method from your constructor at all.
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
    if (initCyclics)
        initCyclics();
    if (!(type instanceof Type))
        throw util._TypeError("type", "a Type");
    if (!options)
        options = {};

    if (!options.noStatics) {
            
        // Underlying reflected message type for reference
        constructor.$type = type;

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

    var prototype = Prototype.init(new Prototype(), type);
    constructor.prototype = prototype;
    prototype.constructor = constructor;

    // Register the now-known constructor for this type
    if (!options.noRegister)
        type.register(constructor);

    return prototype;
};

/**
 * Initializes the specified prototype with the required references and getters/setters for the
 * reflected type's fields.
 * @param {Prototype} prototype Prototype to initialize
 * @param {Type} type Reflected message type
 * @returns {Prototype} prototype
 */
Prototype.init = function init(prototype, type) {
    if (initCyclics)
        initCyclics();
    
    var defineProperties = {

        /**
         * Reflected type.
         * @name Prototype#$type
         * @type {Type}
         */
        $type: {
            value: type,
            enumerable: false
        },

        /**
         * Field values.
         * @name Prototype#$values
         * @type {Object.<string,*>}
         */
        $values: {
            value: {},
            enumerable: false
        },

        /**
         * Field names of the respective fields set for each oneof.
         * @name Prototype#$oneofs
         * @type {Object.<string,string>}
         */
        $oneofs: {
            value: {},
            enumerable: false
        }
    };

    // Define each field with a getter and a setter
    type.fieldsArray.forEach(function(field) {
        defineProperties[field.name] = {
            get: function() {
                var value = this.$values[field.name];
                if (value !== undefined)
                    return value;
                // Note that objects are mutable and are explicitly set on the instance instead
                return util.isObject(field.defaultValue) ? undefined : field.defaultValue;           
            },
            set: function(value) {
                if (field.resolvedType instanceof Type)
                    value = field.resolvedType.create(value);
                var oneofCurrentlySet;
                if (field.partOf && (oneofCurrentlySet = this.$oneofs[field.partOf.name]) !== undefined) {
                    this.$values[oneofCurrentlySet] = undefined;
                    this.$oneofs[field.partOf.name] = field.name;
                }
                this.$values[field.name] = value;
            }
        };
    });

    // Define each oneof with a non-enumerable getter returning the name of the currently set field
    type.oneofsArray.forEach(function(oneof) {
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
