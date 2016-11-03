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
 * @extends Namespace
 * @constructor
 * @param {string} name Message name
 * @param {!Object.<string,*>} [options] Message options
 */
function Type(name, options) {
    Namespace.call(this, name, options);

    /**
     * Message fields.
     * @type {!Object.<string,!Field>}
     */
    this.fields = {};  // exposed

    /**
     * Oneofs declared within this namespace, if any.
     * @type {!Object.<string,!Array.<string>>|undefined}
     */
    this.oneofs = undefined; // exposed

    /**
     * Extension ranges, if any.
     * @type {!Array.<!Array<number>>|undefined}
     */
    this.extensions = undefined; // exposed

    /**
     * Reserved ranges, if any.
     * @type {!Array.<!Array<number>|number>|undefined}
     */
    this.reserved = undefined; // exposed

    /**
     * Cached fields by id.
     * @type {?Object.<number,!Field>}
     * @private
     */
    this._fieldsById = null;
}

var TypePrototype = Namespace.extend(Type, [ "fields", "oneofs", "extensions", "reserved" ]);
var NamespacePrototype = Namespace.prototype;

Object.defineProperties(TypePrototype, {

    /**
     * Message fields by id.
     * @name Type#fieldsById
     * @type {!Object.<number,!Field>}
     * @readonly
     */
    fieldsById: {
        get: function() {
            if (!this._fieldsById) {
                this._fieldsById = {};
                this.each(function(field) {
                    this._fieldsById[field.id] = field; // eslint-disable-line no-invalid-this
                }, this, this.fields);
            }
            return this._fieldsById;
        }
    }
});

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
 * @param {!Object} json JSON object
 * @returns {!Type} Created message type
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
TypePrototype.resolve = function resolve() {
    // NOTE: Types aren't resolved internally - this is here as utility.
    if (this.resolved)
        return this;
    this.each(function(field) {
        field.resolve();
    }, this, this.fields);
    if (this.oneofs)
        this.each(function(oneof) {
            oneof.resolve();
        }, this, this.oneofs);
    return Namespace.prototype.resolve.call(this);
};

/**
 * @override 
 */
TypePrototype.exists = function exists(name) {
    return Boolean(this.fields && this.fields[name] || this.nested && this.nested[name] || this.oneofs && this.oneofs[name]);
};

/**
 * @override
 */
TypePrototype.add = function add(object) {
    if (this.exists(object.name))
        throw Error("duplicate name '" + object.name + '" in ' + this);
    if (object instanceof Field) {
        if (object.parent)
            object.parent.remove(object);
        this.fields[object.name] = object;
        this._fieldsById = null;
        object.message = this;
        object.onAdd(this);
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
    if (object instanceof Field) {
        if (this.fields[object.name] !== object)
            throw Error("not a member of " + this);
        delete this.fields[object.name];
        this._fieldsById = null;
        object.message = null;
        return this;
    }
    return NamespacePrototype.remove.call(this, object);
};

/**
 * Resolves any deferred extension fields that might belong to this type.
 * @returns {!Type} this
 */
TypePrototype.resolveExtends = function resolveExtends() {
    this.root.handleResolve(this);
    return this;
};

/**
 * Creates a new message of this type using the specified properties.
 * @param {!Object} [properties] Properties to set
 * @param {function(new:Prototype)} [constructor] Optional constructor to use (should extend {@link Prototype})
 * @returns {!Prototype} Message instance
 */
TypePrototype.create = function create(properties, constructor) {
    if (util.isFunction(properties)) {
        constructor = properties;
        properties = undefined;
    }
    if (constructor)
        return new constructor(properties);
    if (!properties)
        properties = {};
    var prototype = new Prototype();
    var message = Object.create(prototype);
    this.resolveExtends();
    this.each(function(field, name) {
        var value = properties[name] || field.defaultValue;
        if (!field.resolve().repeated)
            prototype[name] = field.defaultValue;
        if (field.required || value !== field.defaultValue || util.isObject(value))
            message[name] = value; // note that objects are mutable and thus must be on the instance
    }, this, this.fields);
    return message;
};

/**
 * Encodes a message of this type.
 * @param {!Prototype|!Object} message Message instance or plain object
 * @param {!Writer} [writer] Writer to encode to
 * @returns {!Writer} writer
 */
TypePrototype.encode = function encode(message, writer) {
    if (!writer)
        writer = Writer();
    this.resolveExtends();
    this.each(function(field, name) {
        var value = message[name];
        if (field.resolve().required || value !== field.defaultValue)
            field.encode(value, writer);
    }, this, this.fields);
    return writer;
};

/**
 * Encodes a message of this type, preceeded by its byte length as a varint.
 * @param {!Prototype|!Object} message Message instance or plain object
 * @param {!Writer} [writer] Writer to encode to
 * @returns {!Writer} writer
 */
TypePrototype.encodeDelimited = function encodeDelimited(message, writer) {
    if (writer)
        writer.fork();
    else
        writer = Writer();
    return writer.bytes(this.encode(message, writer).finish());
};

/**
 * Decodes a runtime message of this message's type.
 * @param {!Reader|!Array|!Buffer} readerOrBuffer Reader or buffer to decode from
 * @param {function(new:Prototype)} [constructor] Optional constructor of the created message, see {@link Type#create}
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {!Message} Decoded message
 */
TypePrototype.decode = function decode(readerOrBuffer, constructor, length) {
    if (util.isNumber(constructor)) {
        length = constructor;
        constructor = undefined;
    }
    this.resolveExtends();
    if (!(readerOrBuffer instanceof Reader))
        readerOrBuffer = Reader(/* of type */ readerOrBuffer);
    var limit = length === undefined ? readerOrBuffer.len : readerOrBuffer.pos + length,
        message = this.create({}, constructor);
    while (readerOrBuffer.pos < limit) {
        var tag = readerOrBuffer.tag(),
            field = this.fieldsById[tag.id];
        if (field) {
            var name = field.name,
                value = field.decode(readerOrBuffer, tag.wireType);
            if (field.repeated) {
                var array = message[name] = message[name] || [];
                if (util.isArray(value))
                    Array.prototype.push.apply(array, value);
                else
                    array.push(value);
            } else
                message[name] = value;
        } else {
            switch (tag.wireType) {
                case 0:
                    readerOrBuffer.skip();
                    break;
                case 1:
                    readerOrBuffer.skip(8);
                    break;
                case 2:
                    readerOrBuffer.skip(readerOrBuffer.uint32());
                    break;
                case 5:
                    readerOrBuffer.skip(4);
                    break;
                default:
                    throw Error("unsupported wire type of unknown field #" + tag.id + ": " + tag.wireType);
            }
        }
    }
    if (readerOrBuffer.pos !== limit)
        throw Error("illegal wire format: index " + readerOrBuffer.pos + " != " + limit);
    return message;
};

/**
 * Decodes a message of this type,
 * which is preceeded by its byte length as a varint.
 * @param {!Reader|!Array|!Buffer} readerOrBuffer Reader or buffer to decode from
 * @param {function(new:Prototype)} [constructor] Optional constructor of the created message, see {@link Type#create}
 * @returns {!Message} Decoded message
 */
TypePrototype.decodeDelimited = function decodeDelimited(readerOrBuffer, constructor) {
    if (!(readerOrBuffer instanceof Reader))
        readerOrBuffer = Reader(/* of type */ readerOrBuffer);
    return this.decode(readerOrBuffer.bytes(), constructor);
};
