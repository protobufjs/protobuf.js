module.exports = inherits;

var Prototype = require("./prototype"),
    Type      = require("./type"),
    Reader    = require("./reader"),
    Writer    = require("./writer"),
    util      = require("./util");

/**
 * Inherits a custom class from the message prototype of the specified message type.
 * @param {Function} clazz Inheriting class
 * @param {Type} type Inherited message type
 * @param {Object.<string,*>} [options] Extension options
 * @param {boolean} [options.noStatics=false] Skips adding the default static methods on top of the constructor
 * @param {boolean} [options.noRegister=false] Skips registering the constructor with the reflected type
 * @returns {Prototype} Created prototype
 */
function inherits(clazz, type, options) {
    if (typeof clazz !== 'function')
        throw util._TypeError("clazz", "a function");
    if (!(type instanceof Type))
        throw util._TypeError("type", "a Type");
    if (!options)
        options = {};

    /**
     * This is not an actual type but stands as a reference for any constructor of a custom message class
     * that you pass to the library.
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
             * @param {Writer} [writer] Optional writer to use
             * @returns {number[]} Encoded message
             */
            encode: {
                value: function encode(message, writer) {
                    return this.$type.encode_(message, writer || Writer()).finish();
                }
            },

            /**
             * Encodes a message of this type preceeded by its length as a varint to a buffer.
             * @name Class.encodeDelimited
             * @function
             * @param {Prototype|Object} message Message to encode
             * @param {Writer} [writer] Optional writer to use
             * @returns {number[]} Encoded message
             */
            encodeDelimited: {
                value: function encodeDelimited(message, writer) {
                    return this.$type.encodeDelimited_(message, writer || Writer()).finish();
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
                    return this.$type.decode_(Reader(buffer), new this(), buffer.length);
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
                    return this.$type.decodeDelimited_(Reader(buffer), new this(), buffer.length);
                }
            }

        }, true);

    Object.defineProperties(clazz, classProperties);
    var prototype = inherits.defineProperties(new Prototype(), type);
    clazz.prototype = prototype;
    prototype.constructor = clazz;

    if (!options.noRegister)
        type.register(clazz);

    return prototype;
}

/**
 * Defines the reflected type's default values and virtual oneof properties on the specified
 * prototype.
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
                for (var i = 0, k = keys.length, key; i < k; ++i) {
                    var field = oneof.parent.fields[key = keys[i]];
                    if (this[key] != field.defaultValue) // eslint-disable-line eqeqeq
                        return key;
                }
                return undefined;
            },
            set: function(value) {
                var keys = oneof.oneof;
                for (var i = 0, k = keys.length, key; i < k; ++i) {
                    if ((key = keys[i]) !== value)
                        delete this[key];
                }
            }
        };
    });

    Object.defineProperties(prototype, prototypeProperties);
    return prototype;
};
