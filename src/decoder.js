module.exports = Decoder;

var Enum    = require("./enum"),
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
                    var ks = [], values = [], ki = 0, vi = 0;
                    while (reader.pos < length) {
                        if (reader.tag().id === 1)
                            ks[ki++] = reader[keyType]();
                        else if (wireType !== undefined)
                            values[vi++] = reader[type]();
                        else
                            values[vi++] = field.resolvedType.decodeDelimited_(reader, field.resolvedType.create_());
                    }
                    var key;
                    for (ki = 0; ki < vi; ++ki)
                        map[typeof (key = ks[ki]) === 'object' ? util.toHash(key) : key] = values[ki];
                }
                message[field.name] = map;

            // Repeated fields
            } else if (field.repeated) {

                var values   = message[field.name] || (message[field.name] = []),
                    length   = values.length;

                // Packed
                if (field.packed && types.packableWireTypes[type] !== undefined && tag.wireType === 2) {
                    var plimit = reader.uint32() + reader.pos;
                    while (reader.pos < plimit)
                        values[length++] = reader[type]();

                // Non-packed
                } else if (wireType !== undefined)
                    values[length++] = reader[type]();
                else
                    values[length++] = field.resolvedType.decodeDelimited_(reader, field.resolvedType.create_());

            // Non-repeated
            } else if (wireType !== undefined)
                message[field.name] = reader[type]();
            else
                message[field.name] = field.resolvedType.decodeDelimited_(reader, field.resolvedType.create_());

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
    
    var gen = util.codegen("$t", "$h", "r", "m", "l")

    ('"use strict"')
    ("while(r.pos<l){")
        ("var t=r.tag()")
        ("switch(t.id){");
    
    for (var i = 0; i < fieldsCount; ++i) {
        var field    = fieldsArray[i].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.wireTypes[type],
            packType = types.packableWireTypes[type],
            prop     = util.safeProp(field.name);
        gen
            ("case %d:", field.id);

        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            gen
                ("var n=r.uint32(),o={}")
                ("if(n){")
                    ("n+=r.pos")
                    ("var ks=[],vs=[],ki=0,vi=0")
                    ("while(r.pos<n){")
                        ("if(r.tag().id===1)")
                            ("ks[ki++]=r.%s()", keyType);
                        if (wireType !== undefined) gen
                        ("else")
                            ("vs[vi++]=r.%s()", type);
                        else gen
                        ("else")
                            ("vs[vi++]=$t[%d].decodeDelimited_(r,$t[%d].create_())", i, i);
                    gen
                    ("}")
                    ("var k")
                    ("for (ki=0;ki<vi;++ki)")
                        ("o[typeof(k=ks[ki])==='object'?$h(k):k]=vs[ki]")
                ("}")
                ("m%s=o", prop);

        } else if (field.repeated) { gen

                ("var vs=m%s||(m%s=[]),n=vs.length", prop, prop);

            if (field.packed && packType !== undefined) { gen

                ("if(t.wireType===2){")
                    ("var e=r.uint32()+r.pos")
                    ("while(r.pos<e)")
                        ("vs[n++]=r.%s()", type)
                ("}else");

            }

            if (wireType !== undefined) gen

                    ("vs[n++]=r.%s()", type);

            else gen

                    ("vs[n++]=$t[%d].decodeDelimited_(r,$t[%d].create_())", i, i);

        } else if (wireType !== undefined) { gen

                ("m%s=r.%s()", prop, type);

        } else { gen

                ("m%s=$t[%d].decodeDelimited_(r,$t[%d].create_())", prop, i, i);

        } gen
                ("break");
    } gen
            ("default:")
                ("r.skipType(t.wireType)")
                ("break")
        ("}")
    ("}")
    ("return m");
    return gen.eof(this.type.fullName + "$decode").bind(this.type, fieldsArray.map(function(fld) { return fld.resolvedType; }), util.toHash);
    /* eslint-enable no-unexpected-multiline */
};
