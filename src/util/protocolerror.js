"use strict";
module.exports = ProtocolError;

// extends Error
(ProtocolError.prototype = Object.create(Error.prototype)).constructor = Error;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @constructor
 * @param {string} messageText Error message text
 * @param {Message=} messageInstance So far decoded message instance, if applicable
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
function ProtocolError(messageText, messageInstance) {

    if (!(this instanceof ProtocolError))
        return new ProtocolError(messageText, messageInstance);

    this.name = "ProtocolError";
    this.message = messageText;
    this.stack = (new Error()).stack;

    /**
     * So far decoded message instance, if applicable.
     * @type {?Message}
     */
    this.instance = messageInstance || null;
}
