"use strict";
module.exports = Type; 

var Namespace = require("./namespace");
/** @alias Namespace.prototype */
var NamespacePrototype = Namespace.prototype;
/** @alias Type.prototype */
var TypePrototype = Namespace.extend(Type);

var Enum      = require("./enum"),
    OneOf     = require("./oneof"),
    Field     = require("./field"),
    Service   = require("./service"),
    Prototype = require("./prototype"),
    inherits  = require("./inherits"),
    util      = require("./util"),
    Reader    = require("./reader"),
    Encoder   = require("./encoder"),
    Decoder   = require("./decoder"),
    Verifier  = require("./verifier");
var codegen   = util.codegen;

/**
 * Constructs a new message type.
 * @classdesc Reflected message type.
 * @extends Namespace
 * @constructor
 * @param {string} name Message name
 * @param {Object} [options] Declared options
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
     * @type {number[][]}
     */
    this.reserved = undefined; // toJSON

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
     * Cached required fields as an array.
     * @type {?Field[]}
     * @private
     */
    this._requiredFieldsArray = null;

    /**
     * Cached oneofs as an array.
     * @type {?OneOf[]}
     * @private
     */
    this._oneofsArray = null;

    /**
     * Cached constructor.
     * @type {?Function}
     * @private
     */
    this._ctor = null;
}

Object.defineProperties(TypePrototype, {

    /**
     * Message fields by id.
     * @name Type#fieldsById
     * @type {Object.<number,Field>}
     * @readonly
     */
    fieldsById: {
        get: function() {
            if (this._fieldsById)
                return this._fieldsById;
            this._fieldsById = {};
            var names = Object.keys(this.fields);
            for (var i = 0; i < names.length; ++i) {
                var field = this.fields[names[i]],
                    id = field.id;
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
     * Required fields of thiss message as an array for iteration.
     * @name Type#requiredFieldsArray
     * @type {Field[]}
     * @readonly
     */
    requiredFieldsArray: {
        get: function() {
            if (this._requiredFieldsArray)
                return this._requiredFieldsArray;
            var fields   = this.fieldsArray,
                required = this._requiredFieldsArray = [];
            for (var i = 0; i < fields.length; ++i)
                if (fields[i].required)
                    required[required.length] = fields[i];
            return required;
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
     * @name Type#ctor
     * @type {Prototype}
     */
    ctor: {
        get: function() {
            if (this._ctor)
                return this._ctor;
            var ctor;
            if (codegen.supported)
                ctor = codegen("p")("P.call(this,p)").eof(this.fullName + "$ctor", {
                    P: Prototype
                });
            else
                ctor = function GenericMessage(properties) {
                    Prototype.call(this, properties);
                };
            ctor.prototype = inherits(ctor, this);
            this._ctor = ctor;
            return ctor;
        },
        set: function(ctor) {
            if (ctor && !(ctor.prototype instanceof Prototype))
                throw util._TypeError("ctor", "a constructor inheriting from Prototype");
            this._ctor = ctor;
        }
    }
});

function clearCache(type) {
    type._fieldsById = type._fieldsArray = type._requiredFieldsArray = type._oneofsArray = type._ctor = null;
    delete type.encode;
    delete type.decode;
    return type;
}

/**
 * Tests if the specified JSON object describes a message type.
 * @param {*} json JSON object to test
 * @returns {boolean} `true` if the object describes a message type
 */
Type.testJSON = function testJSON(json) {
    return Boolean(json && json.fields);
};

var nestedTypes = [ Enum, Type, Field, Service ];

/**
 * Creates a type from JSON.
 * @param {string} name Message name
 * @param {Object} json JSON object
 * @returns {Type} Created message type
 */
Type.fromJSON = function fromJSON(name, json) {
    var type = new Type(name, json.options);
    type.extensions = json.extensions;
    type.reserved = json.reserved;
    if (json.fields)
        Object.keys(json.fields).forEach(function(fieldName) {
            type.add(Field.fromJSON(fieldName, json.fields[fieldName]));
        });
    if (json.oneofs)
        Object.keys(json.oneofs).forEach(function(oneOfName) {
            type.add(OneOf.fromJSON(oneOfName, json.oneofs[oneOfName]));
        });
    if (json.nested)
        Object.keys(json.nested).forEach(function(nestedName) {
            var nested = json.nested[nestedName];
            for (var i = 0; i < nestedTypes.length; ++i) {
                if (nestedTypes[i].testJSON(nested)) {
                    type.add(nestedTypes[i].fromJSON(nestedName, nested));
                    break;
                }
            }
            throw Error("invalid nested object in " + type + ": " + nestedName);
        });
    return type;
};

/**
 * @override
 */
TypePrototype.toJSON = function toJSON() {
    var inherited = NamespacePrototype.toJSON.call(this);
    return {
        options : inherited && inherited.options || undefined,
        oneofs  : Namespace.arrayToJSON(this.oneofsArray),
        fields  : Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) { return !obj.declaringField; })) || {},
        nested  : inherited && inherited.nested || undefined
    };
};

/**
 * @override
 */
TypePrototype.resolveAll = function resolve() {
    var fields = this.fieldsArray, i = 0;
    while (i < fields.length)
        fields[i++].resolve();
    var oneofs = this.oneofsArray; i = 0;
    while (i < oneofs.length)
        oneofs[i++].resolve();
    return NamespacePrototype.resolve.call(this);
};

/**
 * @override
 */
TypePrototype.get = function get(name) {
    return NamespacePrototype.get.call(this, name) || this.fields && this.fields[name] || this.oneofs && this.oneofs[name] || null;
};

/**
 * Adds a nested object to this type.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
 */
TypePrototype.add = function add(object) {
    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + '" in ' + this);
    if (object instanceof Field && object.extend === undefined) {
        // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
        // The root object takes care of adding distinct sister-fields to the respective extended
        // type instead.
        if (this.fieldsById[object.id])
            throw Error("duplicate id " + object.id + " in " + this);
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
    return NamespacePrototype.add.call(this, object);
};

/**
 * Removes a nested object from this type.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this type
 */
TypePrototype.remove = function remove(object) {
    if (object instanceof Field && object.extend === undefined) {
        // See Type#add for the reason why extension fields are excluded here.
        if (this.fields[object.name] !== object)
            throw Error(object + " is not a member of " + this);
        delete this.fields[object.name];
        object.message = null;
        return clearCache(this);
    }
    return NamespacePrototype.remove.call(this, object);
};

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object} [properties] Properties to set
 * @param {?Function} [ctor] Constructor to use.
 * Defaults to use the internal constuctor.
 * @returns {Prototype} Message instance
 */
TypePrototype.create = function create(properties, ctor) {
    if (typeof properties === 'function') {
        ctor = properties;
        properties = undefined;
    } else if (properties /* already */ instanceof Prototype)
        return properties;
    if (ctor) {
        if (!(ctor.prototype instanceof Prototype))
            throw util._TypeError("ctor", "a constructor inheriting from Prototype");
    } else
        ctor = this.ctor;
    return new ctor(properties);
};

/**
 * Encodes a message of this type.
 * @param {Prototype|Object} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encode = function encode(message, writer) {
    var encoder = new Encoder(this);
    this.encode = codegen.supported
        ? encoder.generate()
        : encoder.encode;
    return this.encode(message, writer);
};

/**
 * Encodes a message of this type preceeded by its byte length as a varint.
 * @param {Prototype|Object} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
};

/**
 * Decodes a message of this type.
 * @param {Reader|number[]} readerOrBuffer Reader or buffer to decode from
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Prototype} Decoded message
 */
TypePrototype.decode = function decode(readerOrBuffer, length) {
    var decoder = new Decoder(this);
    this.decode = codegen.supported
        ? decoder.generate()
        : decoder.decode;
    return this.decode(readerOrBuffer, length);
};

/**
 * Decodes a message of this type preceeded by its byte length as a varint.
 * @param {Reader|number[]} readerOrBuffer Reader or buffer to decode from
 * @returns {Prototype} Decoded message
 */
TypePrototype.decodeDelimited = function decodeDelimited(readerOrBuffer) {
    readerOrBuffer = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader(readerOrBuffer);
    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
};

/**
 * Verifies that enum values are valid and that any required fields are present.
 * @param {Prototype|Object} message Message to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 */
TypePrototype.verify = function verify(message) {
    var verifier = new Verifier(this);
    this.verify = codegen.supported
        ? verifier.generate()
        : verifier.verify;
    return this.verify(message);
};
