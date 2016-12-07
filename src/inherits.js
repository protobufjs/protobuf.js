"use strict";
module.exports = inherits;

var Prototype = require("./prototype"),
    Type      = require("./type"),
    util      = require("./util");

var _TypeError = util._TypeError;

/**
 * Options passed to {@link inherits}, modifying its behavior.
 * @typedef InheritanceOptions
 * @type {Object}
 * @property {boolean} [noStatics=false] Skips adding the default static methods on top of the constructor
 * @property {boolean} [noRegister=false] Skips registering the constructor with the reflected type
 */

/**
 * Inherits a custom class from the message prototype of the specified message type.
 * @param {*} clazz Inheriting class constructor
 * @param {Type} type Inherited message type
 * @param {InheritanceOptions} [options] Inheritance options
 * @returns {Prototype} Created prototype
 */
function inherits(clazz, type, options) {
    if (typeof clazz !== 'function')
        throw _TypeError("clazz", "a function");
    if (!(type instanceof Type))
        throw _TypeError("type", "a Type");
    if (!options)
        options = {};

    /**
     * This is not an actual type but stands as a reference for any constructor of a custom message class that you pass to the library.
     * @name Class
     * @extends Prototype
     * @constructor
     * @param {Object.<string,*>} [properties] Properties to set on the message
     * @see {@link inherits}
     */

    var classProperties = {

        /**
         * Reference to the reflected type.
         * @name Class.$type
         * @type {Type}
         * @readonly
         */
        $type: {
            value: type
        }
    };

    if (!options.noStatics)
        util.merge(classProperties, {

            /**
             * Encodes a message of this type to a buffer.
             * @name Class.encode
             * @function
             * @param {Prototype|Object} message Message to encode
             * @param {Writer} [writer] Writer to use
             * @returns {Writer} Writer
             */
            encode: {
                value: function encode(message, writer) {
                    return this.$type.encode(message, writer);
                }
            },

            /**
             * Encodes a message of this type preceeded by its length as a varint to a buffer.
             * @name Class.encodeDelimited
             * @function
             * @param {Prototype|Object} message Message to encode
             * @param {Writer} [writer] Writer to use
             * @returns {Writer} Writer
             */
            encodeDelimited: {
                value: function encodeDelimited(message, writer) {
                    return this.$type.encodeDelimited(message, writer);
                }
            },

            /**
             * Decodes a message of this type from a buffer.
             * @name Class.decode
             * @function
             * @param {Uint8Array} buffer Buffer to decode
             * @returns {Prototype} Decoded message
             */
            decode: {
                value: function decode(buffer) {
                    return this.$type.decode(buffer);
                }
            },

            /**
             * Decodes a message of this type preceeded by its length as a varint from a buffer.
             * @name Class.decodeDelimited
             * @function
             * @param {Uint8Array} buffer Buffer to decode
             * @returns {Prototype} Decoded message
             */
            decodeDelimited: {
                value: function decodeDelimited(buffer) {
                    return this.$type.decodeDelimited(buffer);
                }
            },

            /**
             * Verifies a message of this type.
             * @name Class.verify
             * @function
             * @param {Prototype|Object} message Message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            verify: {
                value: function verify(message) {
                    return this.$type.verify(message);
                }
            }

        }, true);

    util.props(clazz, classProperties);
    var prototype = inherits.defineProperties(new Prototype(), type);
    clazz.prototype = prototype;
    prototype.constructor = clazz;

    if (!options.noRegister)
        type.setCtor(clazz);

    return prototype;
}

/**
 * Defines the reflected type's default values and virtual oneof properties on the specified prototype.
 * @memberof inherits
 * @param {Prototype} prototype Prototype to define properties upon
 * @param {Type} type Reflected message type
 * @returns {Prototype} The specified prototype
 */
inherits.defineProperties = function defineProperties(prototype, type) {

    var prototypeProperties = {

        /**
         * Reference to the reflected type.
         * @name Prototype#$type
         * @type {Type}
         * @readonly
         */
        $type: {
            value: type
        }
    };

    // Initialize default values
    type.getFieldsArray().forEach(function(field) {
        field.resolve();
        // objects on the prototype must be immmutable. users must assign a new object instance and
        // cannot use Array#push on empty arrays on the prototype for example, as this would modify
        // the non-encoded value on the prototype for ALL messages of this type.
        prototype[field.name] = util.isObject(field.defaultValue)
            ? Object.freeze(field.defaultValue)
            : field.defaultValue;
    });

    // Define each oneof with a non-enumerable getter and setter for the present field
    type.getOneofsArray().forEach(function(oneof) {
        util.prop(prototype, oneof.resolve().name, {
            get: function getVirtual() {
                // > If the parser encounters multiple members of the same oneof on the wire, only the last member seen is used in the parsed message.
                var keys = Object.keys(this);
                for (var i = keys.length - 1; i > -1; --i)
                    if (oneof.oneof.indexOf(keys[i]) > -1)
                        return keys[i];
                return undefined;
            },
            set: function setVirtual(value) {
                var keys = oneof.oneof;
                for (var i = 0; i < keys.length; ++i)
                    if (keys[i] !== value)
                        delete this[keys[i]];
            }
        });
    });

    util.props(prototype, prototypeProperties);
    return prototype;
};
