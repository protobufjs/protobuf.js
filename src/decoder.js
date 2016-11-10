module.exports = Decoder;

var Enum    = require("./enum"),
    codegen = require("./codegen"),
    types   = require("./types"),
    util    = require("./util");

/**
 * Wire format decoder using code generation on top of reflection.
 * @constructor
 * @param {Type} type Message type
 */
function Decoder(type) {
    this.type = type;
}

/** @alias Decoder.prototype */
var DecoderPrototype = Decoder.prototype;

/**
 * Decodes a message of this decoder's message type.
 * @param {Reader} reader Reader to decode from
 * @param {Prototype} message Runtime message to populate
 * @param {number} limit Maximum read offset
 * @returns {Prototype} Populated runtime message
 */
DecoderPrototype.decode = function decode(reader, message, limit) { // codegen reference and fallback
    /* eslint-disable no-invalid-this, block-scoped-var, no-redeclare */
    var fieldsById = this.type.fieldsById;
    while (reader.pos < limit) {
        var tag      = reader.tag(),
            field    = fieldsById[tag.id],
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.wireTypes[type];
        
        // Known fields
        if (field) {

            // Map fields
            if (field.map) {

                var keyType = field.resolve().resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType,
                    length  = reader.uint32(),
                    map     = {};
                if (length) {
                    length += reader.pos;
                    var keys = [], values = [], ki = 0, vi = 0;
                    while (reader.pos < length) {
                        if (reader.tag().id === 1)
                            keys[ki++] = reader[keyType]();
                        else if (wireType !== undefined)
                            values[vi++] = reader[type]();
                        else {
                            var resolvedType = field.resolvedType;
                            values[vi++] = resolvedType.decodeDelimited_(reader, resolvedType.create_());
                        }
                    }
                    var key;
                    for (ki = 0; ki < vi; ++ki)
                        map[typeof (key = keys[ki]) === 'object' ? util.toHash(key) : key] = values[ki];
                }
                message[field.name] = map;

            // Repeated fields
            } else if (field.repeated) {

                var values   = message[field.name],
                    length   = values.length,
                    packType = types.packableWireTypes[type];

                // Packed
                if (field.packed && tag.wireType === packType) {
                    var plimit = reader.uint32() + reader.pos;
                    while (reader.pos < plimit)
                        values[length++] = reader[type]();

                // Non-packed
                } else if (wireType !== undefined) {
                    values[length++] = reader[type]();
                } else {
                    var resolvedType = field.resolvedType;
                    values[length++] = resolvedType.decodeDelimited_(reader, resolvedType.create_());
                }

            // Non-repeated
            } else if (wireType !== undefined) {
                message[field.name] = reader[type]();
            } else {
                var resolvedType = field.resolvedType;
                message[field.name] = resolvedType.decodeDelimited_(reader, resolvedType.create_());
            }

        // Unknown fields
        } else
            reader.skipType(tag.wireType);
    }
    return message;
    /* eslint-enable no-invalid-this, block-scoped-var, no-redeclare */
};

/**
 * Generates a decoder specific to this decoder's message type.
 * @returns {function} Decoder function with an identical signature to {@link Decoder#decode}
 */
DecoderPrototype.generate = function generate() {
    /* eslint-disable no-unexpected-multiline */
    var fieldsArray = this.type.fieldsArray,
        fieldsCount = fieldsArray.length;
    
    var gen = codegen("$resolvedTypes", "$toHash", "reader", "message", "limit")

    ('"use strict";')
    ("while (reader.pos < limit) {")
        ("var tag = reader.tag();")
        ("switch (tag.id) {");
    
    for (var i = 0; i < fieldsCount; ++i) {
        var field    = fieldsArray[i].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.wireTypes[type],
            packType = types.packableWireTypes[type];
        gen
            ("case %d:", field.id);

        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            gen
                ("var length = reader.uint32(), map = {};")
                ("if (length) {")
                    ("length += reader.pos;")
                    ("var keys = [], values = [], ki = 0, vi = 0;")
                    ("while (reader.pos < length) {")
                        ("if (reader.tag().id === 1)")
                            ("keys[ki++] = reader.%s();", keyType);
                        if (wireType !== undefined) gen
                        ("else")
                            ("values[vi++] = reader.%s();", type);
                        else gen
                        ("else {")
                            ("var type = $resolvedTypes[%d];", i)
                            ("values[vi++] = type.decodeDelimited_(reader, type.create_());")
                        ("}");
                    gen
                    ("}")
                    ("var key;")
                    ("for (ki = 0; ki < vi; ++ki)")
                        ("map[typeof (key = keys[ki]) === 'object' ? $toHash(key) : key] = values[ki];")
                ("}")
                ("message[%j] = map;", field.name);

        } else if (field.repeated) { gen

                ("var values = message[%j], length = values.length;", field.name);

            if (field.packed && packType !== undefined) { gen

                ("if (tag.wireType === %d) {", packType)
                    ("var plimit = reader.uint32() + reader.pos;")
                    ("while (reader.pos < plimit)")
                        ("values[length++] = reader.%s();", type)
                ("} else {");

            }

            if (wireType !== undefined) gen

                    ("values[length++] = reader.%s();", type);

            else gen

                    ("var type = $resolvedTypes[%d];", i)
                    ("values[length++] = type.decodeDelimited_(reader, type.create_());");

            if (field.packed && packType !== undefined) gen

                ("}");

        } else if (wireType !== undefined) { gen

                ("message[%j] = reader.%s();", field.name, type);

        } else { gen

                ("var type = $resolvedTypes[%d];", i)
                ("message[%j] = type.decodeDelimited_(reader, type.create_());", field.name);

        } gen
                ("break;");
    } gen
            ("default:")
                ("reader.skipType(tag.wireType);")
                ("break;")
        ("}")
    ("}")
    ("return message;");
    return gen.eof(this.type.fullName + "$decode").bind(this.type, fieldsArray.map(function(fld) { return fld.resolvedType; }), util.toHash);
    /* eslint-enable no-unexpected-multiline */
};
