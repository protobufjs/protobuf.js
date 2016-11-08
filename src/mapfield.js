module.exports = MapField;

var Field = require("./field");
/** @alias MapField.prototype */
var MapFieldPrototype = Field.extend(MapField, [ "keyType" ]);

var Enum    = require("./enum"),
    types   = require("./types"),
    codegen = require("./codegen"),
    util    = require("./util");

/**
 * Reflected message map field.
 * @extends Field
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string} keyType Key type
 * @param {Object.<string,*>} [options] Field options
 */
function MapField(name, id, type, keyType, options) {
    Field.call(this, name, id, type, options);
    if (!util.isString(keyType))
        throw util._TypeError("keyType");
    
    // Is it worth to improve serialization order here?

    /**
     * Key type.
     * @type {string}
     */
    this.keyType = keyType; // exposed, marker

    /**
     * Resolved key type if not a basic type.
     * @type {?ReflectionObject}
     */
    this.resolvedKeyType = null;

    // Overrides Field#map
    this.map = true;
}

/**
 * Tests if the specified JSON object describes a map field.
 * @param {Object} json JSON object to test
 * @returns {boolean} `true` if the object describes a field
 */
MapField.testJSON = function testJSON(json) {
    return Boolean(json && json.keyType !== undefined);
};

/**
 * Constructs a map field from JSON.
 * @param {string} name Field name
 * @param {Object} json JSON object
 * @returns {MapField} Created map field
 * @throws {TypeError} If arguments are invalid
 */
MapField.fromJSON = function fromJSON(name, json) {
    return new MapField(name, json.id, json.type, json.keyType, json.options);
};

/**
 * @override
 */
MapFieldPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    
    // Besides a value type, map fields have a key type to resolve
    var keyWireType = types.mapKeyWireTypes[this.keyType];
    if (keyWireType === undefined) {
        var resolved = this.parent.lookup(this.keyType);
        if (!(resolved instanceof Enum))
            throw Error("unresolvable map key type: " + this.keyType);
        this.resolvedKeyType = resolved;
    }

    return Field.prototype.resolve.call(this);
};

/**
 * @override
 */
MapFieldPrototype.encode = function encode_setup(value, writer) {
    this.encode = codegen.supported
        ? encode_generate(this)
        : encode_internal;
    return this.encode(value, writer);
};

// Codegen reference and also fallback if code generation is not supported.
function encode_internal(value, writer) {
    /* eslint-disable no-invalid-this */
    var keys;
    if (!(value && (keys = Object.keys(value)).length))
        return writer;
    var keyType = this.resolve().resolvedKeyType /* only valid is enum */ ? "uint32" : this.keyType,
        keyWireType = types.mapKeyWireTypes[keyType];
    var valueType = this.resolvedType instanceof Enum ? "uint32" : this.type,
        valueWireType = types.wireTypes[valueType];
    writer.tag(this.id, 2).fork();
    for (var i = 0, k = keys.length, key; i < k; ++i) {
        writer.tag(1, keyWireType)[keyType](key = keys[i]);
        if (valueWireType === undefined)
            this.resolvedType.encodeDelimited_(value[key], writer);
        else
            writer.tag(2, valueWireType)[valueType](value[key]);
    }
    return writer.bytes(writer.finish());
    /* eslint-enable no-invalid-this */
}

/**
 * Generates an encoder specific to the specified map field.
 * @name MapField.generateEncoder
 * @param {MapField} field Map field
 * @returns {function} Encoder
 */
function encode_generate(field) {
    var gen = codegen("$type", "value", "writer")
    ('"use strict";')
    ("var keys;")
    ("if (!value || (keys = Object.keys(value)).length === 0)")
        ("return writer;");
    var keyType = field.resolve().resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType,
        keyWireType = types.mapKeyWireTypes[keyType];
    var valueType = field.resolvedType instanceof Enum ? "uint32" : field.type,
        valueWireType = types.wireTypes[valueType];
    gen
    ("writer.tag(%d, 2).fork();", field.id)
    ("for (var i = 0, k = keys.length, key; i < k; ++i) {")
        ("writer.tag(1, %d).%s(key = keys[i]);", keyWireType, keyType);
        if (valueWireType === undefined) gen
        ("$type.encodeDelimited_(value[key], writer);");
        else gen
        ("writer.tag(2, %d).%s(value[key]);", valueWireType, valueType);
    return gen
    ("}")
    ("return writer.bytes(writer.finish());")
    .eof(field.fullName + "$encode")
    .bind(field, field.resolvedType);
}

MapField.generateEncoder = encode_generate;

/**
 * @override
 */
MapFieldPrototype.decode = function decode_setup(reader) {    
    this.decode = codegen.supported
        ? decode_generate(this)
        : decode_internal;
    return this.decode(reader);
};

// Codegen reference and also fallback if code generation is not supported.
function decode_internal(reader) {
    /* eslint-disable no-invalid-this */
    var length = reader.uint32(),
        map = {};
    
    if (length) {

        var keyType = this.resolve().resolvedKeyType /* only valid is enum */ ? "uint32" : this.keyType,
            valueType = this.resolvedType instanceof Enum ? "uint32" : this.type,
            valueWireType = types.wireTypes[valueType];

        var limit  = reader.pos + length,
            keys   = [], ki = 0,
            values = [], vi = 0;

        while (reader.pos < limit) {
            var tag = reader.tag();
            if (tag.id === 1)
                keys[ki++] = reader[keyType]();
            else if (tag.id === 2) {
                if (valueWireType !== undefined)
                    values[vi++] = reader[valueType]();
                else
                    values[vi++] = this.resolvedType.decodeDelimited_(reader); // throws if invalid
            } else
                throw Error("illegal wire format");
        }
        for (var i = 0, key; i < ki; ++i)
            map[typeof (key = keys[i]) === 'object' ? util.toHash(key) : key] = values[i];
    }
    return map;
    /* eslint-enable no-invalid-this */
}

/**
 * Generates a decoder specific to the specified map field.
 * @name MapField.generateDecoder
 * @param {MapField} field Map field
 * @returns {function} Decoder
 */
function decode_generate(field) {
    var keyType = field.resolve().resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType,
        valueType = field.resolvedType instanceof Enum ? "uint32" : field.type,
        valueWireType = types.wireTypes[valueType];
    var gen = codegen("$type", "$hash", "reader")
    ('"use strict";')
    ("var length = reader.uint32(), map = {};")
    ("if (length) {")
        ("var limit = reader.pos + length, keys = [], ki = 0, values = [], vi = 0;")
        ("while (reader.pos < limit) {")
            ("var tag = reader.tag();")
            ("if (tag.id === 1)")
                ("keys[ki++] = reader.%s();", keyType)
            ("else if (tag.id === 2)");
                if (valueWireType !== undefined) gen
                ("values[vi++] = reader.%s();", valueType);
                else gen
                ("values[vi++] = $type.decodeDelimited_(reader);");
            gen
            ("else")
                ("throw Error('illegal wire format');")
        ("}")
        ("for (var i = 0, key; i < ki; ++i)")
            ("map[typeof (key = keys[i]) === 'object' ? $hash(key) : key] = values[i];")
    ("}")
    ("return map;");
    return gen
    .eof(field.fullName + "$decode")
    .bind(field, field.resolvedType, util.toHash);
}

MapField.generateDecoder = decode_generate;
