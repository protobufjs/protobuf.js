"use strict";
module.exports = decoder;

var Enum    = require("./enum"),
    types   = require("./types"),
    util    = require("./util");

/**
 * Generates a decoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function decoder(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var fields = mtype.getFieldsArray();    
    var gen = util.codegen("r", "l")

    ("r instanceof Reader||(r=Reader.create(r))")
    ("var c=l===undefined?r.len:r.pos+l,m=new(this.getCtor())")
    ("while(r.pos<c){")
        ("var t=r.uint32()");
    if (mtype.group) gen
        ("if((t&7)===4)")
            ("break");
    gen
        ("switch(t>>>3){");
    
    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            type  = field.resolvedType instanceof Enum ? "uint32" : field.type,
            prop  = util.safeProp(field.name);
        gen
            ("case %d:", field.id);

        // Map fields
        if (field.map) {

            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            gen
                ("r.skip().pos++")
                ("if(m%s===util.emptyObject)", prop)
                    ("m%s={}", prop)
                ("var k=r.%s()", keyType)
                ("if(typeof k===\"object\")")
                    ("k=util.longToHash(k)")
                ("r.pos++");
            if (types.basic[type] === undefined) gen
                ("m%s[k]=types[%d].decode(r,r.uint32())", prop, i); // can't be groups
            else gen
                ("m%s[k]=r.%s()", prop, type);

        // Repeated fields
        } else if (field.repeated) { gen

                ("m%s&&m%s.length?m%s:m%s=[]", prop, prop, prop, prop);

            // Packed
            if (field.packed && types.packed[type] !== undefined) gen
                ("if((t&7)===2){")
                    ("var e=r.uint32()+r.pos")
                    ("while(r.pos<e)")
                        ("m%s.push(r.%s())", prop, type)
                ("}else");

            // Non-packed
            if (types.basic[type] === undefined) gen(field.resolvedType.group
                    ? "m%s.push(types[%d].decode(r))"
                    : "m%s.push(types[%d].decode(r,r.uint32()))", prop, i);
            else gen
                    ("m%s.push(r.%s())", prop, type);

        // Non-repeated
        } else if (types.basic[type] === undefined) gen(field.resolvedType.group
                ? "m%s=types[%d].decode(r)"
                : "m%s=types[%d].decode(r,r.uint32())", prop, i);
        else gen
                ("m%s=r.%s()", prop, type);
        gen
                ("break");

    // Unknown fields
    } return gen
            ("default:")
                ("r.skipType(t&7)")
                ("break")
        ("}")
    ("}")
    ("return m");
    /* eslint-enable no-unexpected-multiline */
}
