module.exports = Encoder;

var Enum    = require("./enum"),
    types   = require("./types"),
    util    = require("./util");

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
            var value = message[field.name],
                strict = field.long;
            if (field.required || strict && value !== field.defaultValue || !strict && value != field.defaultValue) { // eslint-disable-line eqeqeq
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
    var gen = util.codegen("$t", "m", "w")

    ('"use strict"');
    
    for (var i = 0; i < fieldsCount; ++i) {
        var field = fieldsArray[i].resolve();
        var type = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.wireTypes[type],
            prop = util.safeProp(field.name);
        
        // Map fields
        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType,
                keyWireType = types.mapKeyWireTypes[keyType];
            gen

    ("var o=m%s,ks", prop)
    ("if(o&&(ks=Object.keys(o)).length){")
        ("w.tag(%d,2).fork()", field.id)
        ("for(var i=0,l=ks.length,k;i<l;++i){")
            ("w.tag(1,%d).%s(k=ks[i])", keyWireType, keyType);
            if (wireType !== undefined) gen
            ("w.tag(2,%d).%s(o[k])", wireType, type);
            else gen
            ("$t[%d].encodeDelimited_(o[k],w.tag(2,2))", i);
            gen
        ("}")
        ("w.bytes(w.finish())")
    ("}");

        // Repeated fields
        } else if (field.repeated) { gen

    ("var vs=m%s,i=0,k=vs.length", prop);

            // Packed repeated
            if (field.packed && types.packableWireTypes[type] !== undefined) { gen

    ("w.fork()")
    ("while(i<k)")
        ("w.%s(vs[i++])", type)
    ("var b=w.finish()")
    ("if(b.length)")
        ("w.tag(%d,2).bytes(b)", field.id);

            // Non-packed
            } else { gen

    ("while(i<k)")
        ("$t[%d].encodeDelimited_(vs[i++],w.tag(%d,2))", i, field.id);

            }

        // Non-repeated
        } else { gen
            if (!field.required) gen
    ("if(m%s%s%j)", prop, typeof field.defaultValue === 'object' || field.long ? "!==" : "!=", field.defaultValue);
            if (wireType !== undefined) gen
    ("w.tag(%d,%d).%s(m%s)", field.id, wireType, type, prop);
            else gen
    ("$t[%d].encodeDelimited_(m%s,w.tag(%d,2))", i, prop, field.id);
    
        }
    }
    return gen
    ("return w")
    .eof(this.type.fullName + "$encode")
    .bind(this.type, fieldsArray.map(function(fld) { return fld.resolvedType; }));
    /* eslint-enable no-unexpected-multiline */
};
