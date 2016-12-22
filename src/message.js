"use strict";
module.exports = Message;

var convert = require("./convert");

/**
 * Constructs a new message instance.
 *
 * This method should be called from your custom constructors, i.e. `Message.call(this, properties)`.
 * @classdesc Abstract runtime message.
 * @extends {Object}
 * @constructor
 * @param {Object.<string,*>} [properties] Properties to set
 * @abstract
 * @see {@link Class.create}
 */
function Message(properties) {
    if (properties) {
        var keys = Object.keys(properties);
        for (var i = 0; i < keys.length; ++i)
            this[keys[i]] = properties[keys[i]];
    }
}

/**
 * Reference to the reflected type.
 * @name Message.$type
 * @type {Type}
 * @readonly
 */

/** @alias Message.prototype */
var MessagePrototype = Message.prototype;

/**
 * Reference to the reflected type.
 * @name Message#$type
 * @type {Type}
 * @readonly
 */

/**
 * Converts this message to a JSON object.
 * @param {JSONConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} JSON object
 */
MessagePrototype.asJSON = function asJSON(options) {
    return convert(this.$type, this, {}, options, convert.toJson);
};

/**
 * Creates a message from a JSON object by converting strings and numbers to their respective field types.
 * @param {Object.<string,*>} object JSON object
 * @param {MessageConversionOptions} [options] Options
 * @returns {Message} Message instance
 */
Message.from = function from(object, options) {
    return convert(this.$type, object, new this.constructor(), options, convert.toMessage);
};

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
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode
 * @returns {Message} Decoded message
 */
Message.decode = function decode(readerOrBuffer) {
    return this.$type.decode(readerOrBuffer);
};

/**
 * Decodes a message of this type preceeded by its length as a varint.
 * @name Message.decodeDelimited
 * @function
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode
 * @returns {Message} Decoded message
 */
Message.decodeDelimited = function decodeDelimited(readerOrBuffer) {
    return this.$type.decodeDelimited(readerOrBuffer);
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
