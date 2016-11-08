module.exports = Type; 

var Namespace = require("./namespace");
/** @alias Namespace.prototype */
var NamespacePrototype = Namespace.prototype;
/** @alias Type.prototype */
var TypePrototype = Namespace.extend(Type, [ "fields", "oneofs", "extensions", "reserved" ]);

var Enum      = require("./enum"),
    OneOf     = require("./oneof"),
    Field     = require("./field"),
    Service   = require("./service"),
    Prototype = require("./prototype"),
    inherits  = require("./inherits"),
    util      = require("./util"),
    Reader    = require("./reader"),
    Writer    = require("./writer"),
    codegen   = require("./codegen");

/**
 * Reflected message type.
 * @extends Namespace
 * @constructor
 * @param {string} name Message name
 * @param {Object.<string,*>} [options] Message options
 */
function Type(name, options) {
    Namespace.call(this, name, options);

    /**
     * Message fields.
     * @type {Object.<string,Field>}
     */
    this.fields = {};  // exposed, marker

    /**
     * Oneofs declared within this namespace, if any.
     * @type {Object.<string,OneOf>}
     */
    this.oneofs = undefined; // exposed

    /**
     * Extension ranges, if any.
     * @type {number[][]}
     */
    this.extensions = undefined; // exposed

    /**
     * Reserved ranges, if any.
     * @type {number[][]}
     */
    this.reserved = undefined; // exposed

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
     * Cached prototype.
     * @type {?Prototype}
     * @private
     */
    this._prototype = null;

    /**
     * Registered constructor.
     * @type {?Function}
     * @private
     */
    this._constructor = null;
}

/**
 * Whether to use code generation or not. Will be set to `false` automatically if code generation
 * on any type or field failed.
 * @type {boolean}
 */
Type.useCodegen = true;

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
            for (var i = 0, k = names.length; i < k; ++i) {
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
     * Runtime prototype of this message.
     * @name Type#prototype
     * @type {Prototype}
     * @readonly
     */
    prototype: {
        get: function() {
            return this._prototype || (this._prototype = inherits.defineProperties(new Prototype(), this));
        }
    }
});

/**
 * Clears the internal cache on a message type.
 * @param {Type} type Message type
 * @returns {Type} type
 * @inner
 * @ignore
 */
function clearCache(type) {
    type._fieldsById = type._fieldsArray = type._oneofsArray = type._prototype = null;
    delete type.encode_;
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

var nestedTypes = [ Enum, Type, Service ];

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
            for (var i = 0, k = nestedTypes.length, clazz; i < k; ++i)
                if ((clazz = nestedTypes[i]).testJSON(nested)) {
                    type.add(clazz.fromJSON(nestedName, nested));
                    return;
                }
            throw Error("invalid nested object in " + type + ": " + nestedName);
        });
    return type;
};

/**
 * @override
 */
TypePrototype.resolveAll = function resolve() {
    this.each(function(field) {
        field.resolve();
    }, this, this.fields);
    if (this.oneofs)
        this.each(function(oneof) {
            oneof.resolve();
        }, this, this.oneofs);
    return NamespacePrototype.resolve.call(this);
};

/**
 * @override
 */
TypePrototype.get = function get(name) {
    return NamespacePrototype.get.call(this, name) || this.fields && this.fields[name] || this.oneofs && this.oneofs[name] || null;
};

/**
 * @override
 */
TypePrototype.add = function add(object) {
    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + '" in ' + this);
    if (object instanceof Field) {
        // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
        // The root object takes care of adding distinct sister-fields to the respective extended
        // type instead.
        if (object.extend === undefined) {
            if (object.parent)
                object.parent.remove(object);
            clearCache(this).fields[object.name] = object;
            object.message = this;
            object.onAdd(this);
        } else {
            if (!this.nested)
                this.nested = {};
            else if (this.get(object.name))
                throw Error("duplicate name '" + object.name + "' in " + this);
            this.nested[object.name] = object;
            object.onAdd(this);
        }
        return this;
    }
    if (object instanceof OneOf) {
        if (!this.oneofs)
            this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return this;
    }
    return NamespacePrototype.add.call(this, object);
};

/**
 * @override
 */
TypePrototype.remove = function remove(object) {
    if (object instanceof Field && object.extend === undefined) {
        // See Type#add for the reason why extension fields are excluded here.
        if (this.fields[object.name] !== object)
            throw Error("not a member of " + this);
        delete clearCache(this).fields[object.name];
        object.message = null;
        return this;
    }
    return NamespacePrototype.remove.call(this, object);
};

/**
 * Registers the specified constructor with this type.
 * @param {?Function} constructor Constructor to use for message instances or `null` to unregister
 *  the current constructor
 * @returns {Type} `this`
 */
TypePrototype.register = function register(constructor) {
    if (constructor !== null && typeof constructor !== 'function')
        throw util._TypeError("constructor", "a function or null");
    this._constructor = constructor;
    return this;
};

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object} [properties] Properties to set
 * @param {?Function} [constructor] Optional constructor to use or null to use the internal
 *  prototype. If a constructor, it should extend {@link Prototype}.
 * @returns {Prototype} Message instance
 */
TypePrototype.create = function create(properties, constructor) {
    if (typeof properties === 'function') {
        constructor = properties;
        properties = undefined;
    } else if (properties /* already */ instanceof Prototype)
        return properties;
    if (!constructor)
        constructor = this._constructor;
    if (constructor)
        return new constructor(properties);
    var message = Object.create(this.prototype);
    if (properties) {
        var keys = Object.keys(properties);
        for (var i = 0, k = keys.length, key; i < k; ++i) {
            var field = this.fields[key = keys[i]];
            if (field)
                message.$values[key] = properties[key];
            else
                message[key] = properties[key];
        }
    }
    return message;
};

/**
 * Encodes a message of this type.
 * @param {Prototype|Object} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encode = function encode(message, writer) {
    return this.encode_(message, writer || Writer());
};

/**
 * Encodes a message of this type. This method differs from {@link Type#encode} in that it expects
 * already type checked and known to be present arguments.
 * @param {Prototype|Object} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encode_ = function encode_setup(message, writer) {
    this.encode_ = codegen.supported
        ? encode_generate(this)
        : encode_internal;
    return this.encode_(message, writer);
};

// Codegen reference and also fallback if code generation is not supported
function encode_internal(message, writer) {
    /* eslint-disable no-invalid-this */
    var fieldsArray = this.fieldsArray,
        fieldsCount = fieldsArray.length;
    var values = message.$values || message; // throws if not an object
    for (var i = 0; i < fieldsCount; ++i) {
        var field = fieldsArray[i].resolve(),
            value = values[field.name];
        if (field.required || value != field.defaultValue) // eslint-disable-line eqeqeq
            field.encode(value, writer);
    }
    return writer;
    /* eslint-enable no-invalid-this */
}

/**
 * Generates an encoder specific to the specified message type.
 * @name Type.generateEncoder
 * @param {Type} type Message type
 * @returns {function} Encoder
 */
function encode_generate(type) {
    var fieldsArray = type.fieldsArray,
        fieldsCount = fieldsArray.length;
    var gen = codegen("$fields", "message", "writer")
    ('"use strict";')
    ("var values = message.$values || message;");
    for (var i = 0; i < fieldsCount; ++i) {
        var field = fieldsArray[i].resolve();
        if (field.required) gen
            ("$fields[%d].encode(values[%j], writer);", i, field.name);
        else gen
            ("if (values[%j] != %j)", field.name, field.defaultValue)
                ("$fields[%d].encode(values[%j], writer);", i, field.name);
    }
    return gen
    ("return writer;")
    .eof(type.fullName + "$encode")
    .bind(type, fieldsArray);
}

Type.generateEncoder = encode_generate;

/**
 * Encodes a message of this type preceeded by its byte length as a varint.
 * @param {Prototype|Object} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encodeDelimited_(message, writer || Writer());
};

/**
 * Encodes a message of this type preceeded by its byte length as a varint. This method differs
 * from {@link Type#encodeDelimited} in that it expects already type checked and known to be present arguments.
 * @param {Prototype|Object} message Message instance or plain object
 * @param {Writer} writer Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encodeDelimited_ = function encodeDelimited_internal(message, writer) {
    return writer.bytes(this.encode_(message, writer.fork()).finish());
};

/**
 * Decodes a message of this type.
 * @param {Reader|number[]} readerOrBuffer Reader or buffer to decode from
 * @param {Function} [constructor] Optional constructor of the created message, see {@link Type#create}
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Prototype} Decoded message
 */
TypePrototype.decode = function decode(readerOrBuffer, constructor, length) {
    if (typeof constructor === 'number') {
        length = constructor;
        constructor = this._constructor;
    } else if (!constructor)
        constructor = this._constructor;
    var reader  = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader(readerOrBuffer),
        message = this._constructor ? new this._constructor() : Object.create(this.prototype),
        limit   = length === undefined ? reader.len : reader.pos + length;
    return this.decode_(reader, message, limit);
};

/**
 * Decodes a message of this type. This method differs from {@link Type#decode} in that it expects
 * already type checked and known to be present arguments.
 * @function
 * @param {Reader} reader Reader to decode from
 * @param {Prototype} message Message instance to populate
 * @param {number} limit Maximum read offset
 * @returns {Prototype} Populated message instance
 */
TypePrototype.decode_ = decode_internal;

// Codegen reference and fallback if code generation is not supported.
// NOTE: There is actually no generator for Type#decode_ as it seems to bring no benefit.
function decode_internal(reader, message, limit) {
    /* eslint-disable no-invalid-this */
    var values     = message.$values,
        fieldsById = this.fieldsById;
    while (reader.pos < limit) {
        var tag   = reader.tag(),
            field = fieldsById[tag.id];
        if (field /* known */) {
            var name  = field.name,
                value = field.decode(reader, tag.wireType);
            if (field.repeated) {
                if (Array.isArray(value))
                    Array.prototype.push.apply(values[name], value);
                else
                    values[name].push(value);
            } else
                values[name] = value;
        } else
            reader.skipType(tag.wireType);
    }
    return message;
    /* eslint-enable no-invalid-this */
}

/**
 * Decodes a message of this m type preceeded by its byte length as a varint.
 * @param {Reader|number[]} readerOrBuffer Reader or buffer to decode from
 * @param {Function} [constructor] Optional constructor of the created message, see {@link Type#create}
 * @returns {Prototype} Decoded message
 */
TypePrototype.decodeDelimited = function decodeDelimited(readerOrBuffer, constructor) {
    var reader = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader(readerOrBuffer);
    return this.decode(reader, constructor, reader.uint32());
};

/**
 * Decodes a message of this type. This method differs from {@link Type#decodeDelimited} in that it
 * expects already type checked and known to be present arguments.
 * @param {Reader} reader Reader to decode from
 * @param {Prototype} message Message instance to populate
 * @returns {Prototype} Populated message instance
 */
TypePrototype.decodeDelimited_ = function decodeDelimited_internal(reader, message) {
    return this.decode_(reader, message, reader.uint32() + reader.pos);
};
