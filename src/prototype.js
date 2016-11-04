module.exports = Prototype;

/**
 * Runtime message prototype ready to be extended by custom classes or generated code.
 * @constructor
 * @param {!Object.<string,*>} [properties] Properties to set on the instance. Only relevant when extended.
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
 * @param {!Type} type Reflected message type
 * @param {!Object.<string,*>} [options] Additional options
 * @returns {!Object} Prototype
 */
Prototype.extend = function extend(constructor, type, options) {
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

    // Initialize default values on prototype
    if (type.fields)
        type.each(function(field, name) {
            if (field.repeated)
                return;
            prototype[name] = field.defaultValue; // eslint-disable-line no-invalid-this
        }, type, type.fields);

    return prototype;
};
