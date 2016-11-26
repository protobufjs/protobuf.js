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
 * @param {Function} clazz Inheriting class
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
             * @returns {number[]} Encoded message
             */
            encode: {
                value: function encode(message, writer) {
                    return this.$type.encode(message, writer).finish();
                }
            },

            /**
             * Encodes a message of this type preceeded by its length as a varint to a buffer.
             * @name Class.encodeDelimited
             * @function
             * @param {Prototype|Object} message Message to encode
             * @param {Writer} [writer] Writer to use
             * @returns {number[]} Encoded message
             */
            encodeDelimited: {
                value: function encodeDelimited(message, writer) {
                    return this.$type.encodeDelimited(message, writer).finish();
                }
            },

            /**
             * Decodes a message of this type from a buffer.
             * @name Class.decode
             * @function
             * @param {number[]} buffer Buffer to decode
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
             * @param {number[]} buffer Buffer to decode
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

    Object.defineProperties(clazz, classProperties);
    var prototype = inherits.defineProperties(new Prototype(), type);
    clazz.prototype = prototype;
    prototype.constructor = clazz;

    if (!options.noRegister)
        type.ctor = clazz;

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
    type.fieldsArray.forEach(function(field) {
        field.resolve();
        if (!util.isObject(field.defaultValue))
            // objects are mutable (i.e. would modify the array on the prototype, not the instance)
            prototype[field.name] = field.defaultValue;
    });

    // Define each oneof with a non-enumerable getter and setter for the present field
    type.oneofsArray.forEach(function(oneof) {
        prototypeProperties[oneof.resolve().name] = {
            get: function() {
                var keys = oneof.oneof;
                for (var i = 0; i < keys.length; ++i) {
                    var field = oneof.parent.fields[keys[i]];
                    if (this[keys[i]] != field.defaultValue) // eslint-disable-line eqeqeq
                        return keys[i];
                }
                return undefined;
            },
            set: function(value) {
                var keys = oneof.oneof;
                for (var i = 0; i < keys.length; ++i) {
                    if (keys[i] !== value)
                        delete this[keys[i]];
                }
            }
        };
    });

    Object.defineProperties(prototype, prototypeProperties);
    return prototype;
};
