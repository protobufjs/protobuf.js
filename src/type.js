"use strict";
module.exports = Type;

// extends Namespace
var Namespace = require("./namespace");
((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";

var Enum      = require("./enum"),
    OneOf     = require("./oneof"),
    Field     = require("./field"),
    MapField  = require("./mapfield"),
    Service   = require("./service"),
    Class     = require("./class"),
    Message   = require("./message"),
    Reader    = require("./reader"),
    Writer    = require("./writer"),
    util      = require("./util"),
    encoder   = require("./encoder"),
    decoder   = require("./decoder"),
    verifier  = require("./verifier"),
    converter = require("./converter");

/**
 * Constructs a new reflected message type instance.
 * @classdesc Reflected message type.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Message name
 * @param {Object.<string,*>} [options] Declared options
 */
function Type(name, options) {
    Namespace.call(this, name, options);

    /**
     * Message fields.
     * @type {Object.<string,Field>}
     */
    this.fields = {};  // toJSON, marker

    /**
     * Oneofs declared within this namespace, if any.
     * @type {Object.<string,OneOf>}
     */
    this.oneofs = undefined; // toJSON

    /**
     * Extension ranges, if any.
     * @type {number[][]}
     */
    this.extensions = undefined; // toJSON

    /**
     * Reserved ranges, if any.
     * @type {Array.<number[]|string>}
     */
    this.reserved = undefined; // toJSON

    /*?
     * Whether this type is a legacy group.
     * @type {boolean|undefined}
     */
    this.group = undefined; // toJSON

    /**
     * Cached fields by id.
     * @type {?Object.<number,Field>}
     * @private
     */
    this._fieldsById = null;

    /**
     * Cached fields as an array.
     * @type {?Field[]}
     * @private
     */
    this._fieldsArray = null;

    /**
     * Cached oneofs as an array.
     * @type {?OneOf[]}
     * @private
     */
    this._oneofsArray = null;

    /**
     * Cached constructor.
     * @type {*}
     * @private
     */
    this._ctor = null;
}

Object.defineProperties(Type.prototype, {

    /**
     * Message fields by id.
     * @name Type#fieldsById
     * @type {Object.<number,Field>}
     * @readonly
     */
    fieldsById: {
        get: function() {

            /* istanbul ignore if */
            if (this._fieldsById)
                return this._fieldsById;

            this._fieldsById = {};
            for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
                var field = this.fields[names[i]],
                    id = field.id;

                /* istanbul ignore if */
                if (this._fieldsById[id])
                    throw Error("duplicate id " + id + " in " + this);

                this._fieldsById[id] = field;
            }
            return this._fieldsById;
        }
    },

    /**
     * Fields of this message as an array for iteration.
     * @name Type#fieldsArray
     * @type {Field[]}
     * @readonly
     */
    fieldsArray: {
        get: function() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
    },

    /**
     * Oneofs of this message as an array for iteration.
     * @name Type#oneofsArray
     * @type {OneOf[]}
     * @readonly
     */
    oneofsArray: {
        get: function() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
    },

    /**
     * The registered constructor, if any registered, otherwise a generic constructor.
     * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
     * @name Type#ctor
     * @type {Class}
     */
    ctor: {
        get: function() {
            return this._ctor || (this._ctor = Class(this).constructor);
        },
        set: function(ctor) {
            if (ctor && !(ctor.prototype instanceof Message))
                Class(this, ctor);
            else
                this._ctor = ctor;
        }
    }
});

function clearCache(type) {
    type._fieldsById = type._fieldsArray = type._oneofsArray = type._ctor = null;
    delete type.encode;
    delete type.decode;
    delete type.verify;
    return type;
}

/**
 * Message type descriptor.
 * @typedef TypeDescriptor
 * @type {Object}
 * @property {Object.<string,*>} [options] Message type options
 * @property {Object.<string,OneOfDescriptor>} [oneofs] Oneof descriptors
 * @property {Object.<string,FieldDescriptor>} fields Field descriptors
 * @property {number[][]} [extensions] Extension ranges
 * @property {number[][]} [reserved] Reserved ranges
 * @property {boolean} [group=false] Whether a legacy group or not
 * @property {Object.<string,AnyNestedDescriptor>} [nested] Nested object descriptors
 */

/**
 * Creates a message type from a message type descriptor.
 * @param {string} name Message name
 * @param {TypeDescriptor} json Message type descriptor
 * @returns {Type} Created message type
 */
Type.fromJSON = function fromJSON(name, json) {
    var type = new Type(name, json.options);
    type.extensions = json.extensions;
    type.reserved = json.reserved;
    var names = Object.keys(json.fields),
        i = 0;
    for (; i < names.length; ++i)
        type.add(
            ( typeof json.fields[names[i]].keyType !== "undefined"
            ? MapField.fromJSON
            : Field.fromJSON )(names[i], json.fields[names[i]])
        );
    if (json.oneofs)
        for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
            type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
    if (json.nested)
        for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
            var nested = json.nested[names[i]];
            type.add( // most to least likely
                ( nested.id !== undefined
                ? Field.fromJSON
                : nested.fields !== undefined
                ? Type.fromJSON
                : nested.values !== undefined
                ? Enum.fromJSON
                : nested.methods !== undefined
                ? Service.fromJSON
                : Namespace.fromJSON )(names[i], nested)
            );
        }
    if (json.extensions && json.extensions.length)
        type.extensions = json.extensions;
    if (json.reserved && json.reserved.length)
        type.reserved = json.reserved;
    if (json.group)
        type.group = true;
    return type;
};

/**
 * Converts this message type to a message type descriptor.
 * @returns {TypeDescriptor} Message type descriptor
 */
Type.prototype.toJSON = function toJSON() {
    var inherited = Namespace.prototype.toJSON.call(this);
    return {
        options    : inherited && inherited.options || undefined,
        oneofs     : Namespace.arrayToJSON(this.oneofsArray),
        fields     : Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) { return !obj.declaringField; })) || {},
        extensions : this.extensions && this.extensions.length ? this.extensions : undefined,
        reserved   : this.reserved && this.reserved.length ? this.reserved : undefined,
        group      : this.group || undefined,
        nested     : inherited && inherited.nested || undefined
    };
};

/**
 * @override
 */
Type.prototype.resolveAll = function resolveAll() {
    var fields = this.fieldsArray, i = 0;
    while (i < fields.length)
        fields[i++].resolve();
    var oneofs = this.oneofsArray; i = 0;
    while (i < oneofs.length)
        oneofs[i++].resolve();
    return Namespace.prototype.resolve.call(this);
};

/**
 * @override
 */
Type.prototype.get = function get(name) {
    return this.fields[name]
        || this.oneofs && this.oneofs[name]
        || this.nested && this.nested[name]
        || null;
};

/**
 * Adds a nested object to this type.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
 */
Type.prototype.add = function add(object) {

    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);

    if (object instanceof Field && object.extend === undefined) {
        // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
        // The root object takes care of adding distinct sister-fields to the respective extended
        // type instead.

        // avoids calling the getter if not absolutely necessary because it's called quite frequently
        if (this._fieldsById ? /* istanbul ignore next */ this._fieldsById[object.id] : this.fieldsById[object.id])
            throw Error("duplicate id " + object.id + " in " + this);
        if (this.isReservedId(object.id))
            throw Error("id " + object.id + " is reserved in " + this);
        if (this.isReservedName(object.name))
            throw Error("name '" + object.name + "' is reserved in " + this);

        if (object.parent)
            object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {
        if (!this.oneofs)
            this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object);
};

/**
 * Removes a nested object from this type.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this type
 */
Type.prototype.remove = function remove(object) {
    if (object instanceof Field && object.extend === undefined) {
        // See Type#add for the reason why extension fields are excluded here.

        /* istanbul ignore if */
        if (!this.fields || this.fields[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.fields[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {

        /* istanbul ignore if */
        if (!this.oneofs || this.oneofs[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.oneofs[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object);
};

/**
 * Tests if the specified id is reserved.
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Type.prototype.isReservedId = function isReservedId(id) {
    if (this.reserved)
        for (var i = 0; i < this.reserved.length; ++i)
            if (typeof this.reserved[i] !== "string" && this.reserved[i][0] <= id && this.reserved[i][1] >= id)
                return true;
    return false;
};

/**
 * Tests if the specified name is reserved.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Type.prototype.isReservedName = function isReservedName(name) {
    if (this.reserved)
        for (var i = 0; i < this.reserved.length; ++i)
            if (this.reserved[i] === name)
                return true;
    return false;
};

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object.<string,*>} [properties] Properties to set
 * @returns {Message} Runtime message
 */
Type.prototype.create = function create(properties) {
    return new this.ctor(properties);
};

/**
 * Sets up {@link Type#encode|encode}, {@link Type#decode|decode} and {@link Type#verify|verify}.
 * @returns {Type} `this`
 */
Type.prototype.setup = function setup() {
    // Sets up everything at once so that the prototype chain does not have to be re-evaluated
    // multiple times (V8, soft-deopt prototype-check).
    var fullName = this.fullName,
        types    = [];
    for (var i = 0; i < /* initializes */ this.fieldsArray.length; ++i)
        types.push(this._fieldsArray[i].resolve().resolvedType);
    this.encode = encoder(this).eof(fullName + "$encode", {
        Writer : Writer,
        types  : types,
        util   : util
    });
    this.decode = decoder(this).eof(fullName + "$decode", {
        Reader : Reader,
        types  : types,
        util   : util
    });
    this.verify = verifier(this).eof(fullName + "$verify", {
        types : types,
        util  : util
    });
    this.fromObject = this.from = converter.fromObject(this).eof(fullName + "$fromObject", {
        types : types,
        util  : util
    });
    this.toObject = converter.toObject(this).eof(fullName + "$toObject", {
        types : types,
        util  : util
    });
    return this;
};

/**
 * Encodes a message of this type. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
Type.prototype.encode = function encode_setup(message, writer) {
    return this.setup().encode(message, writer); // overrides this method
};

/**
 * Encodes a message of this type preceeded by its byte length as a varint. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
};

/**
 * Decodes a message of this type.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Message} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError} If required fields are missing
 */
Type.prototype.decode = function decode_setup(reader, length) {
    return this.setup().decode(reader, length); // overrides this method
};

/**
 * Decodes a message of this type preceeded by its byte length as a varint.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @returns {Message} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError} If required fields are missing
 */
Type.prototype.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof Reader))
        reader = Reader.create(reader);
    return this.decode(reader, reader.uint32());
};

/**
 * Verifies that field values are valid and that required fields are present.
 * @param {Object.<string,*>} message Plain object to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 */
Type.prototype.verify = function verify_setup(message) {
    return this.setup().verify(message); // overrides this method
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object to convert
 * @returns {Message} Message instance
 */
Type.prototype.fromObject = function fromObject(object) {
    return this.setup().fromObject(object);
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * This is an alias of {@link Type#fromObject}.
 * @function
 * @param {Object.<string,*>} object Plain object
 * @returns {Message} Message instance
 */
Type.prototype.from = Type.prototype.fromObject;

/**
 * Conversion options as used by {@link Type#toObject} and {@link Message.toObject}.
 * @typedef ConversionOptions
 * @type {Object}
 * @property {*} [longs] Long conversion type.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to copy the present value, which is a possibly unsafe number without and a {@link Long} with a long library.
 * @property {*} [enums] Enum value conversion type.
 * Only valid value is `String` (the global type).
 * Defaults to copy the present value, which is the numeric id.
 * @property {*} [bytes] Bytes value conversion type.
 * Valid values are `Array` and (a base64 encoded) `String` (the global types).
 * Defaults to copy the present value, which usually is a Buffer under node and an Uint8Array in the browser.
 * @property {boolean} [defaults=false] Also sets default values on the resulting object
 * @property {boolean} [arrays=false] Sets empty arrays for missing repeated fields even if `defaults=false`
 * @property {boolean} [objects=false] Sets empty objects for missing map fields even if `defaults=false`
 * @property {boolean} [oneofs=false] Includes virtual oneof properties set to the present field's name, if any
 */

/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {Message} message Message instance
 * @param {ConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 */
Type.prototype.toObject = function toObject(message, options) {
    return this.setup().toObject(message, options);
};
