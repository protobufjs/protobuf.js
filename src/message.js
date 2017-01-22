"use strict";
module.exports = Message;

var util = require("./util");

/**
 * Constructs a new message instance.
 *
 * This function should also be called from your custom constructors, i.e. `Message.call(this, properties)`.
 * @classdesc Abstract runtime message.
 * @constructor
 * @param {Object.<string,*>} [properties] Properties to set
 * @see {@link Class.create}
 */
function Message(properties) {
    if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            this[keys[i]] = properties[keys[i]];
}

/**
 * Reference to the reflected type.
 * @name Message.$type
 * @type {Type}
 * @readonly
 */

/**
 * Reference to the reflected type.
 * @name Message#$type
 * @type {Type}
 * @readonly
 */

/**
 * Encodes a message of this type.
 * @param {Message|Object} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 */
Message.encode = function encode(message, writer) {
    return this.$type.encode(message, writer);
};

/**
 * Encodes a message of this type preceeded by its length as a varint.
 * @param {Message|Object} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 */
Message.encodeDelimited = function encodeDelimited(message, writer) {
    return this.$type.encodeDelimited(message, writer);
};

/**
 * Decodes a message of this type.
 * @name Message.decode
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {Message} Decoded message
 */
Message.decode = function decode(reader) {
    return this.$type.decode(reader);
};

/**
 * Decodes a message of this type preceeded by its length as a varint.
 * @name Message.decodeDelimited
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {Message} Decoded message
 */
Message.decodeDelimited = function decodeDelimited(reader) {
    return this.$type.decodeDelimited(reader);
};

/**
 * Verifies a message of this type.
 * @name Message.verify
 * @function
 * @param {Message|Object} message Message or plain object to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 */
Message.verify = function verify(message) {
    return this.$type.verify(message);
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object
 * @returns {Message} Message instance
 */
Message.fromObject = function fromObject(object) {
    return this.$type.fromObject(object);
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * This is an alias of {@link Message.fromObject}.
 * @function
 * @param {Object.<string,*>} object Plain object
 * @returns {Message} Message instance
 */
Message.from = Message.fromObject;

/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {Message} message Message instance
 * @param {ConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 */
Message.toObject = function toObject(message, options) {
    return this.$type.toObject(message, options);
};

/**
 * Creates a plain object from this message. Also converts values to other types if specified.
 * @param {ConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 */
Message.prototype.toObject = function toObject(options) {
    return this.$type.toObject(this, options);
};

/**
 * Converts this message to JSON.
 * @returns {Object.<string,*>} JSON object
 */
Message.prototype.toJSON = function toJSON() {
    return this.$type.toObject(this, util.toJSONOptions);
};
