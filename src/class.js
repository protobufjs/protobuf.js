"use strict";
module.exports = Class;

var Message = require("./message"),
    Type    = require("./type"),
    util    = require("./util");

var _TypeError = util._TypeError;

/**
 * Constructs a class instance, which is also a message prototype.
 * @classdesc Runtime class providing the tools to create your own custom classes.
 * @constructor
 * @param {Type} type Reflected type
 * @abstract
 */
function Class(type) {
    return Class.create(type);
}

/**
 * Constructs a new message prototype for the specified reflected type and sets up its constructor.
 * @param {Type} type Reflected message type
 * @param {*} [ctor] Custom constructor to set up, defaults to create a generic one if omitted
 * @returns {Message} Message prototype
 */
Class.create = function create(type, ctor) {
    if (!(type instanceof Type))
        throw _TypeError("type", "a Type");
    var clazz = ctor;
    if (clazz) {
        if (typeof clazz !== 'function')
            throw _TypeError("ctor", "a function");
    } else
        clazz = (function(MessageCtor) { // eslint-disable-line wrap-iife
            return function Message(properties) {
                MessageCtor.call(this, properties);
            };
        })(Message);

    // Let's pretend...
    clazz.constructor = Class;
    
    // new Class() -> Message.prototype
    var prototype = clazz.prototype = new Message();
    prototype.constructor = clazz;

    // Static methods on Message are instance methods on Class and vice-versa.
    util.merge(clazz, Message, true);

    // Classes and messages reference their reflected type
    clazz.$type = type;
    prototype.$type = type;

    // Messages have non-enumerable default values on their prototype
    type.getFieldsArray().forEach(function(field) {
        field.resolve();
        // objects on the prototype must be immmutable. users must assign a new object instance and
        // cannot use Array#push on empty arrays on the prototype for example, as this would modify
        // the value on the prototype for ALL messages of this type. Hence, these objects are frozen.
        prototype[field.name] = Array.isArray(field.defaultValue)
            ? util.emptyArray
            : util.isObject(field.defaultValue)
            ? util.emptyObject
            : field.defaultValue;
    });

    // Runtime messages have non-enumerable getters and setters for each virtual oneof field
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

    // Register
    type.ctor = clazz;

    return prototype;
};

// Static methods on Message are instance methods on Class and vice-versa.
Class.prototype = Message;

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
