"use strict";
module.exports = Class;

var Message = require("./message"),
    util    = require("./util");

var Type; // cyclic

/**
 * Constructs a class instance, which is also a {@link Message} prototype.
 * @classdesc Runtime class providing the tools to create your own custom classes.
 * @constructor
 * @param {Type} type Reflected type
 */
function Class(type) {
    return create(type);
}

/**
 * Constructs a new message prototype for the specified reflected type and sets up its constructor.
 * @memberof Class
 * @param {Type} type Reflected message type
 * @param {*} [ctor] Custom constructor to set up, defaults to create a generic one if omitted
 * @returns {Message} Message prototype
 */
function create(type, ctor) {
    if (!Type)
        Type = require("./type");

    /* istanbul ignore next */
    if (!(type instanceof Type))
        throw TypeError("type must be a Type");

    if (ctor) {
        /* istanbul ignore next */
        if (typeof ctor !== "function")
            throw TypeError("ctor must be a function");
    } else
        // create named constructor functions (codegen is required anyway)
        ctor = util.codegen("p")("return ctor.call(this,p)").eof(type.name, {
            ctor: Message
        });

    // Let's pretend...
    ctor.constructor = Class;

    // new Class() -> Message.prototype
    var prototype = ctor.prototype = new Message();
    prototype.constructor = ctor;

    // Static methods on Message are instance methods on Class and vice versa
    util.merge(ctor, Message, true);

    // Classes and messages reference their reflected type
    ctor.$type = type;
    prototype.$type = type;

    // Messages have non-enumerable default values on their prototype
    type.fieldsArray.forEach(function(field) {
        // objects on the prototype must be immmutable. users must assign a new object instance and
        // cannot use Array#push on empty arrays on the prototype for example, as this would modify
        // the value on the prototype for ALL messages of this type. Hence, these objects are frozen.
        prototype[field.name] = Array.isArray(field.resolve().defaultValue)
            ? util.emptyArray
            : util.isObject(field.defaultValue) && !field.long
              ? util.emptyObject
              : field.defaultValue;
    });

    // Messages have non-enumerable getters and setters for each virtual oneof field
    type.oneofsArray.forEach(function(oneof) {
        Object.defineProperty(prototype, oneof.resolve().name, {
            get: function() {
                // > If the parser encounters multiple members of the same oneof on the wire, only the last member seen is used in the parsed message.
                for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
                    if (oneof.oneof.indexOf(keys[i]) > -1)
                        return keys[i];
                return undefined;
            },
            set: function(value) {
                for (var keys = oneof.oneof, i = 0; i < keys.length; ++i)
                    if (keys[i] !== value)
                        delete this[keys[i]];
            }
        });
    });

    // Register
    type.ctor = ctor;

    return prototype;
}

Class.create = create;

// Static methods on Message are instance methods on Class and vice versa
Class.prototype = Message;

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @name Class#fromObject
 * @function
 * @param {Object.<string,*>} object Plain object
 * @returns {Message} Message instance
 */

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * This is an alias of {@link Class#fromObject}.
 * @name Class#from
 * @function
 * @param {Object.<string,*>} object Plain object
 * @returns {Message} Message instance
 */

/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @name Class#toObject
 * @function
 * @param {Message} message Message instance
 * @param {ConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 */

/**
 * Encodes a message of this type.
 * @name Class#encode
 * @function
 * @param {Message|Object} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 */

/**
 * Encodes a message of this type preceeded by its length as a varint.
 * @name Class#encodeDelimited
 * @function
 * @param {Message|Object} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 */

/**
 * Decodes a message of this type.
 * @name Class#decode
 * @function
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode
 * @returns {Message} Decoded message
 */

/**
 * Decodes a message of this type preceeded by its length as a varint.
 * @name Class#decodeDelimited
 * @function
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode
 * @returns {Message} Decoded message
 */

/**
 * Verifies a message of this type.
 * @name Class#verify
 * @function
 * @param {Message|Object} message Message or plain object to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 */
