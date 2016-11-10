module.exports = Encoder;

var Enum    = require("./enum"),
    types   = require("./types"),
    codegen = require("./codegen");

/**
 * Wire format encoder using code generation on top of reflection.
 * @constructor
 * @param {Type} type Message type
 */
function Encoder(type) {
    this.type = type;
}

/** @alias Encoder.prototype */
var EncoderPrototype = Encoder.prototype;

/**
 * Encodes a message of this encoder's message type.
 * @param {Prototype|Object} message Runtime message or plain object to encode
 * @param {Writer} writer Writer to encode to
 * @returns {Writer} writer
 */
EncoderPrototype.encode = function encode(message, writer) { // codegen reference and fallback
    /* eslint-disable no-invalid-this, block-scoped-var, no-redeclare */
    var fieldsArray = this.type.fieldsArray,
        fieldsCount = fieldsArray.length;

    for (var fi = 0; fi < fieldsCount; ++fi) {
        var field    = fieldsArray[fi].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.wireTypes[type];

        // Map fields
        if (field.map) {
            var keyType     = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType,
                keyWireType = types.mapKeyWireTypes[keyType];
            var value, keys;
            if ((value = message[field.name]) && (keys = Object.keys(value)).length) {
                writer.tag(field.id, 2).fork();
                for (var i = 0, k = keys.length, key; i < k; ++i) {
                    writer.tag(1, keyWireType)[keyType](key = keys[i]);
                    if (wireType !== undefined)
                        writer.tag(2, wireType)[type](value[key]);
                    else
                        field.resolvedType.encodeDelimited_(value[key], writer.tag(2, 2));
                }
                writer.bytes(writer.finish());
            }

        // Repeated fields
        } else if (field.repeated) {
            var values = message[field.name], i = 0, k = values.length;

            // Packed repeated
            if (field.packed && types.packableWireTypes[type] !== undefined) {
                writer.fork();
                while (i < k)
                    writer[type](values[i++]);
                var buffer = writer.finish();
                if (buffer.length)
                    writer.tag(field.id, 2).bytes(buffer);

            // Non-packed
            } else {
                while (i < k)
                    field.resolvedType.encodeDelimited_(values[i++], writer.tag(field.id, 2));
            }

        // Non-repeated
        } else {
            var value = message[field.name];
            if (field.required || value !== field.defaultValue) {
                if (wireType !== undefined)
                    writer.tag(field.id, wireType)[type](value);
                else
                    field.resolvedType.encodeDelimited_(value, writer.tag(field.id, 2));
            }
        }
    }
    return writer;
    /* eslint-enable no-invalid-this, block-scoped-var, no-redeclare */
};

/**
 * Generates an encoder specific to this encoder's message type.
 * @returns {function} Encoder function with an identical signature to {@link Encoder#encode}
 */
EncoderPrototype.generate = function generate() {
    /* eslint-disable no-unexpected-multiline */
    var fieldsArray = this.type.fieldsArray,
        fieldsCount = fieldsArray.length;
    var gen = codegen("$types", "message", "writer")

    ('"use strict";');
    
    for (var i = 0; i < fieldsCount; ++i) {
        var field = fieldsArray[i].resolve();
        var type = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.wireTypes[type];
        
        // Map fields
        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType,
                keyWireType = types.mapKeyWireTypes[keyType];
            gen

    ("var map = message[%j], keys;", field.name)
    ("if (map && (keys = Object.keys(map)).length) {")
        ("writer.tag(%d,2).fork();", field.id)
        ("for (var i = 0, k = keys.length, key; i < k; ++i) {")
            ("writer.tag(1,%d).%s(key = keys[i]);", keyWireType, keyType);
            if (wireType !== undefined) gen
            ("writer.tag(2,%d).%s(map[key]);", wireType, type);
            else gen
            ("$types[%d].encodeDelimited_(map[key], writer.tag(2,2));", i);
            gen
        ("}")
        ("writer.bytes(writer.finish());")
    ("}");

        // Repeated fields
        } else if (field.repeated) { gen

    ("var vals = message[%j], i = 0, k = vals.length;", field.name);

            // Packed repeated
            if (field.packed && types.packableWireTypes[type] !== undefined) { gen

    ("writer.fork();")
    ("while (i < k)")
        ("writer.%s(vals[i++]);", type)
    ("var buf = writer.finish();")
    ("if (buf.length)")
        ("writer.tag(%d,2).bytes(buf);", field.id);

            // Non-packed
            } else { gen

    ("while (i < k)")
        ("$types[%d].encodeDelimited_(vals[i++],writer.tag(%d,2));", i, field.id);

            }

        // Non-repeated
        } else { gen
    ("var value = message[%j];", field.name);

            if (!field.required) gen
    ("if (value !== %j)", field.defaultValue);
            if (wireType !== undefined) gen
    ("writer.tag(%d,%d).%s(value);", field.id, wireType, type);
            else gen
    ("$types[%d].encodeDelimited_(value, writer.tag(%d,2));", i, field.id);
    
        }
    }
    return gen
    ("return writer;")
    .eof(this.type.fullName + "$encode")
    .bind(this.type, fieldsArray.map(function(fld) { return fld.resolvedType; }));
    /* eslint-enable no-unexpected-multiline */
};
