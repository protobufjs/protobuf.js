"use strict";
module.exports = Class;

var Message = require("./message"),
    util    = require("./util");

var Type; // cyclic

/**
 * Constructs a new message prototype for the specified reflected type and sets up its constructor.
 * @classdesc Runtime class providing the tools to create your own custom classes.
 * @constructor
 * @param {Type} type Reflected message type
 * @param {*} [ctor] Custom constructor to set up, defaults to create a generic one if omitted
 * @returns {Message} Message prototype
 */
function Class(type, ctor) {
    if (!Type)
        Type = require("./type");

    if (!(type instanceof Type))
        throw TypeError("type must be a Type");

    if (ctor) {
        if (typeof ctor !== "function")
            throw TypeError("ctor must be a function");
    } else
        ctor = Class.generate(type).eof(type.name); // named constructor function (codegen is required anyway)

    // Let's pretend...
    ctor.constructor = Class;

    // new Class() -> Message.prototype
    (ctor.prototype = new Message()).constructor = ctor;

    // Static methods on Message are instance methods on Class and vice versa
    util.merge(ctor, Message, true);

    // Classes and messages reference their reflected type
    ctor.$type = type;
    ctor.prototype.$type = type;

    // Messages have non-enumerable default values on their prototype
    var i = 0;
    for (; i < /* initializes */ type.fieldsArray.length; ++i) {
        // objects on the prototype must be immmutable. users must assign a new object instance and
        // cannot use Array#push on empty arrays on the prototype for example, as this would modify
        // the value on the prototype for ALL messages of this type. Hence, these objects are frozen.
        ctor.prototype[type._fieldsArray[i].name] = Array.isArray(type._fieldsArray[i].resolve().defaultValue)
            ? util.emptyArray
            : util.isObject(type._fieldsArray[i].defaultValue) && !type._fieldsArray[i].long
              ? util.emptyObject
              : type._fieldsArray[i].defaultValue; // if a long, it is frozen when initialized
    }

    // Messages have non-enumerable getters and setters for each virtual oneof field
    var ctorProperties = {};
    for (i = 0; i < /* initializes */ type.oneofsArray.length; ++i)
        ctorProperties[type._oneofsArray[i].resolve().name] = {
            get: util.oneOfGetter(type._oneofsArray[i].oneof),
            set: util.oneOfSetter(type._oneofsArray[i].oneof)
        };
    if (i)
        Object.defineProperties(ctor.prototype, ctorProperties);

    // Register
    type.ctor = ctor;

    return ctor.prototype;
}

/**
 * Generates a constructor function for the specified type.
 * @param {Type} type Type to use
 * @returns {Codegen} Codegen instance
 */
Class.generate = function generate(type) { // eslint-disable-line no-unused-vars
    /* eslint-disable no-unexpected-multiline */
    var gen = util.codegen("p");
    // explicitly initialize mutable object/array fields so that these aren't just inherited from the prototype
    for (var i = 0, field; i < type.fieldsArray.length; ++i)
        if ((field = type._fieldsArray[i]).map) gen
            ("this%s={}", util.safeProp(field.name));
        else if (field.repeated) gen
            ("this%s=[]", util.safeProp(field.name));
    return gen
    ("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)") // omit undefined or null
        ("this[ks[i]]=p[ks[i]]");
    /* eslint-enable no-unexpected-multiline */
};

/**
 * Constructs a new message prototype for the specified reflected type and sets up its constructor.
 * @function
 * @param {Type} type Reflected message type
 * @param {*} [ctor] Custom constructor to set up, defaults to create a generic one if omitted
 * @returns {Message} Message prototype
 * @deprecated since 6.7.0 it's possible to just assign a new constructor to {@link Type#ctor}
 */
Class.create = Class;

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
 * @param {Message|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 */

/**
 * Encodes a message of this type preceeded by its length as a varint.
 * @name Class#encodeDelimited
 * @function
 * @param {Message|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 */

/**
 * Decodes a message of this type.
 * @name Class#decode
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {Message} Decoded message
 */

/**
 * Decodes a message of this type preceeded by its length as a varint.
 * @name Class#decodeDelimited
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {Message} Decoded message
 */

/**
 * Verifies a message of this type.
 * @name Class#verify
 * @function
 * @param {Message|Object.<string,*>} message Message or plain object to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 */
