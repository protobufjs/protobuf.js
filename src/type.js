var Namespace = require("./namespace"),
    Enum      = require("./enum"),
    OneOf     = require("./oneof"),
    Field     = require("./field"),
    Service   = require("./service"),
    Prototype = require("./prototype"),
    util      = require("./util"),
    Reader    = require("./reader"),
    Writer    = require("./writer");

module.exports = Type;

/**
 * Reflected message type.
 * @memberof protobuf
 * @extends protobuf.Namespace
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
 * @alias protobuf.Type.prototype
 */
var TypePrototype = Namespace.extend(Type, [ "fields", "oneofs", "extensions", "reserved" ]);

/**
 * @alias protobuf.Namespace.prototype
 */
var NamespacePrototype = Namespace.prototype;

Object.defineProperties(TypePrototype, {

    /**
     * Message fields by id.
     * @name protobuf.Type#fieldsById
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
     * Message fields as an array for iteration.
     * @name protobuf.Type#fieldsArray
     * @type {Field[]}
     * @readonly
     */
    fieldsArray: {
        get: function() {
            if (this._fieldsArray)
                return this._fieldsArray;
            var names  = Object.keys(this.fields),
                length = names.length;
            this._fieldsArray = new Array(length);
            for (var i = 0; i < length; ++i)
                this._fieldsArray[i] = this.fields[names[i]];
            return this._fieldsArray;
        }
    },

    /**
     * Runtime message prototype of this message.
     * @name protobuf.Type#prototype
     * @type {Prototype}
     * @readonly
     */
    prototype: {
        get: function() {
            if (this._prototype)
                return this._prototype;
            var fieldsArray = this.fieldsArray,
                fieldsCount = fieldsArray.length;
            var prototype = new Prototype();
            prototype.$type = this;
            for (var i = 0; i < fieldsCount; ++i) {
                var field = fieldsArray[i].resolve();
                if (!util.isObject(field.defaultValue)) // objects are immutable and thus cannot be on the prototype
                    prototype[field.name] = field.defaultValue;
            }
            this._prototype = prototype;
            return prototype;
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
    type._fieldsById = type._fieldsArray = type._prototype = null;
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
 * @returns {Type} this
 */
TypePrototype.register = function register(constructor) {
    if (constructor !== null && !util.isFunction(constructor))
        throw util._TypeError("constructor", "a function or null");
    this._constructor = constructor;
    return this;
};

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object} [properties] Properties to set
 * @param {?Function} [constructor] Optional constructor to use or null to use the internal
 *  prototype. If a constructor, it should extend {@link protobuf.Prototype}.
 * @returns {Prototype} Message instance
 */
TypePrototype.create = function create(properties, constructor) {
    if (util.isFunction(properties)) {
        constructor = properties;
        properties = undefined;
    }
    if (constructor === undefined && this._constructor)
        constructor = this._constructor;

    // If there is a dedicated constructor specified or registered, take the fast route
    if (constructor)
        return new constructor(properties);
    
    // Otherwise create a new message instance and populate it
    if (!properties)
        properties  = {};
    var fieldsArray = this.fieldsArray,
        fieldsCount = fieldsArray.length;
    var message = Object.create(this.prototype);
    for (var i = 0; i < fieldsCount; ++i) {
        var field = fieldsArray[i].resolve(),
            value = properties[field.name] || field.defaultValue;
        if (field.required || field.repeated || field.map || value !== field.defaultValue || util.isObject(value)) {
            if (field.resolvedType instanceof Type)
                value = field.resolvedType.create(value);
            message[field.name] = value;
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
    if (!writer)
        writer = Writer();
    var fieldsArray = this.fieldsArray,
        fieldsCount = fieldsArray.length;
    for (var i = 0; i < fieldsCount; ++i) {
        var field = fieldsArray[i],
            value = message[field.name];
        if (field.resolve().required || value != field.defaultValue) // eslint-disable-line eqeqeq
            field.encode(value, writer);
    }
    return writer;
};

/**
 * Encodes a message of this type preceeded by its byte length as a varint.
 * @param {Prototype|Object} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encodeDelimited = function encodeDelimited(message, writer) {
    if (writer)
        writer.fork();
    else
        writer = Writer();
    return writer.bytes(this.encode(message, writer).finish());
};

/**
 * Decodes a message of this type.
 * @param {Reader|number[]} readerOrBuffer Reader or buffer to decode from
 * @param {Function} [constructor] Optional constructor of the created message, see {@link protobuf.Type#create}
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Object} Decoded message
 */
TypePrototype.decode = function decode(readerOrBuffer, constructor, length) {
    if (typeof constructor === 'number') {
        length = constructor;
        constructor = undefined;
    }

    var reader     = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader(readerOrBuffer),
        limit      = length === undefined ? reader.len : reader.pos + length,
        message    = this.create({}, constructor),
        fieldsById = this.fieldsById;

    while (reader.pos < limit) {
        var tag   = reader.tag(),
            field = fieldsById[tag.id];
        if (field) {
            var name  = field.name,
                value = field.decode(reader, tag.wireType);
            if (field.repeated) {
                var array = message[name] || (message[name] = []);
                if (util.isArray(value))
                    Array.prototype.push.apply(array, value);
                else
                    array.push(value);
            } else
                message[name] = value;
        } else
            reader.skipType(tag.wireType);
    }
    if (reader.pos !== limit)
        throw Error("invalid wire format: index " + reader.pos + " != " + limit);
    return message;
};

/**
 * Decodes a message of this m type preceeded by its byte length as a varint.
 * @param {Reader|number[]} readerOrBuffer Reader or buffer to decode from
 * @param {Function} [constructor] Optional constructor of the created message, see {@link protobuf.Type#create}
 * @returns {Object} Decoded message
 */
TypePrototype.decodeDelimited = function decodeDelimited(readerOrBuffer, constructor) {
    if (!(readerOrBuffer instanceof Reader))
        readerOrBuffer = Reader(/* of type */ readerOrBuffer);
    return this.decode(readerOrBuffer.bytes(), constructor);
};
