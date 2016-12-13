"use strict";
module.exports = decode;

var Enum    = require("./enum"),
    Reader  = require("./reader"),
    types   = require("./types"),
    util    = require("./util");

/**
 * General purpose message decoder.
 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Message} Populated runtime message
 * @this Type
 * @property {GenerateDecoder} generate Generates a type specific decoder
 */
function decode(readerOrBuffer, length) {
    /* eslint-disable no-invalid-this, block-scoped-var, no-redeclare */
    var fields  = this.getFieldsById(),
        reader  = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader.create(readerOrBuffer),
        limit   = length === undefined ? reader.len : reader.pos + length,
        message = new (this.getCtor())();
    while (reader.pos < limit) {
        var tag      = reader.tag(),
            field    = fields[tag.id].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type;
        
        // Known fields
        if (field) {

            // Map fields
            if (field.map) {
                var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
                reader.skip();
                reader.pos++; // assumes id 1
                if (message[field.name] === util.emptyObject)
                    message[field.name] = {};
                var key = reader[keyType]();
                if (typeof key === "object")
                    key = util.longToHash(key);
                reader.pos++; // assumes id 2
                message[field.name][key] = types.basic[type] === undefined
                    ? field.resolvedType.decode(reader, reader.uint32())
                    : reader[type]();

            // Repeated fields
            } else if (field.repeated) {
                var values = message[field.name] && message[field.name].length ? message[field.name] : message[field.name] = [];

                // Packed
                if (field.packed && types.packed[type] !== undefined && tag.wireType === 2) {
                    var plimit = reader.uint32() + reader.pos;
                    while (reader.pos < plimit)
                        values[values.length] = reader[type]();

                // Non-packed
                } else if (types.basic[type] !== undefined)
                    values[values.length] = reader[type]();
                else
                    values[values.length] = field.resolvedType.decode(reader, reader.uint32());

            // Non-repeated
            } else if (types.basic[type] !== undefined)
                message[field.name] = reader[type]();
              else
                message[field.name] = field.resolvedType.decode(reader, reader.uint32());

        // Unknown fields
        } else
            reader.skipType(tag.wireType);
    }
    return message;
    /* eslint-enable no-invalid-this, block-scoped-var, no-redeclare */
}

/**
 * Generates a decoder specific to the specified message type.
 * @typedef GenerateDecoder
 * @type {function}
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
/**/
decode.generate = function generate(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var fields = mtype.getFieldsArray();    
    var gen = util.codegen("r", "l")

    ("r instanceof Reader||(r=Reader.create(r))")
    ("var c=l===undefined?r.len:r.pos+l,m=new(this.getCtor())")
    ("while(r.pos<c){")
        ("var t=r.tag()")
        ("switch(t.id){");
    
    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            type  = field.resolvedType instanceof Enum ? "uint32" : field.type,
            prop  = util.safeProp(field.name);
        gen
            ("case %d:", field.id);

        if (field.map) {

            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            gen
                ("r.skip()")
                ("r.pos++")
                ("if(m%s===util.emptyObject)", prop)
                    ("m%s={}", prop)
                ("var k=r.%s()", keyType)
                ("if(typeof k===\"object\")")
                    ("k=util.longToHash(k)")
                ("r.pos++");
            if (types.basic[type] === undefined) gen
                ("m%s[k]=types[%d].decode(r,r.uint32())", prop, i);
            else gen
                ("m%s[k]=r.%s()", prop, type);

        } else if (field.repeated) { gen

                ("m%s&&m%s.length?m%s:m%s=[]", prop, prop, prop, prop);

            if (field.packed && types.packed[type] !== undefined) { gen

                ("if(t.wireType===2){")
                    ("var e=r.uint32()+r.pos")
                    ("while(r.pos<e)")
                        ("m%s[m%s.length]=r.%s()", prop, prop, type)
                ("}else");
            }

            if (types.basic[type] !== undefined) gen

                    ("m%s[m%s.length]=r.%s()", prop, prop, type);

            else gen

                    ("m%s[m%s.length]=types[%d].decode(r,r.uint32())", prop, prop, i, i);

        } else if (types.basic[type] !== undefined) { gen

                ("m%s=r.%s()", prop, type);

        } else { gen

                ("m%s=types[%d].decode(r,r.uint32())", prop, i, i);

        } gen
                ("break");
    } return gen
            ("default:")
                ("r.skipType(t.wireType)")
                ("break")
        ("}")
    ("}")
    ("return m");
    /* eslint-enable no-unexpected-multiline */
};
