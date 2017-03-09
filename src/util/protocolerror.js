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
 * @param {string} message Error message
 * @param {Message=} instance So far decoded message instance, if applicable
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
function ProtocolError(message, instance) {

    if (!(this instanceof ProtocolError))
        return new ProtocolError(message, instance);

    /**
     * Underlying plain error.
     * @type {Error}
     */
    this.error = Error(message);

    /**
     * So far decoded message instance, if applicable.
     * @type {?Message}
     */
    this.instance = instance || null;
}

/**
 * Error name (ProtocolError).
 * @type {string}
 */
ProtocolError.prototype.name = "ProtocolError";

Object.defineProperties(ProtocolError.prototype, {

    /**
     * Error message.
     * @name util.ProtocolError#message
     * @type {string}
     * @readonly
     */
    message: {
        get: function() {
            return this.error.message;
        }
    },

    /**
     * Stack trace.
     * @name util.ProtocolError#stack
     * @type {string}
     * @readonly
     */
    stack: {
        get: function() {
            return this.error.stack;
        }
    }
});
