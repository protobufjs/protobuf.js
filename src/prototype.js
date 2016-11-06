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

    // Properly extend Message
    var prototype = constructor.prototype = new Prototype();
    prototype.constructor = constructor;

    /**
     * Reflected type.
     * @name Prototype#$type
     * @type {Type}
     */
    prototype.$type = type;

    // Initialize default values on prototype
    if (type.fields)
        type.each(function(field, name) {
            if (field.repeated)
                return;
            prototype[name] = field.defaultValue;
        }, type, type.fields);

    // Register the now-known constructor for this type
    if (!options.noRegister)
        type.register(constructor);

    return prototype;
};
