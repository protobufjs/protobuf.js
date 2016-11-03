module.exports = Prototype;

/**
 * Runtime message prototype ready to be extended by custom classes or generated code.
 * 
 * @constructor
 * @param {!Object} [properties] Properties to set on the instance when extended.
 * @abstract
 * @see {@link Type#create}
 */
function Prototype(properties) {
    if (properties)
        Object.keys(properties).forEach(function(key) {
            this[key] = properties[key];
        }, this);
}

/**
 * Makes the specified constructor extend this prototype.
 * @param {function(new:Message)} constructor Constructor to extend
 * @param {!type} type Message type
 * @returns {!Object} Prototype
 */
Prototype.extend = function extend(constructor, type) {

    // Underlying reflected type for reference
    constructor.$type = type;

    // Create a new message
    constructor.create = function(properties) {
        return this.$type.create(properties, constructor);
    };

    // Encode to a buffer directly
    constructor.encode = function encode(message) {
        return this.$type.encode(message).finish();
    };

    // Encode to a buffer directly, length delimited
    constructor.encodeDelimited = function encodeDelimited(message) {
        return this.$type.encodeDelimited(message).finish();
    };

    // Decode from a buffer
    constructor.decode = function decode(buffer) {
        return this.$type.decode(buffer, constructor);
    };

    // Decode from a buffer, length delimited
    constructor.decodeDelimited = function decodeDelimited(buffer) {
        return this.$type.decodeDelimited(buffer, constructor);
    };

    // Properly extend Message
    var prototype = constructor.prototype = new Prototype();
    prototype.constructor = constructor;

    // Initialize default values on prototype
    if (type.fields)
        type.each(function(field, name) {
            if (field.repeated)
                return;
            this[name] = field.defaultValue; // eslint-disable-line no-invalid-this
        }, prototype, type.fields);

    return prototype;
};
