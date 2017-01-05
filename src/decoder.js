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
    var fields = mtype.fieldsArray;
    var gen = util.codegen("r", "l")
    ("if(!(r instanceof Reader))")
        ("r=Reader.create(r)")
    ("var c=l===undefined?r.len:r.pos+l,m=new(this.ctor)")
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
            ref   = "m" + field._prop;
        gen
            ("case %d:", field.id);

        // Map fields
        if (field.map) {

            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            gen
                ("r.skip().pos++") // assumes id 1 + key wireType
                ("if(%s===util.emptyObject)", ref)
                    ("%s={}", ref)
                ("var k=r.%s()", keyType)
                ("if(typeof k===\"object\")")
                    ("k=util.longToHash(k)")
                ("r.pos++"); // assumes id 2 + value wireType
            if (types.basic[type] === undefined) gen
                ("%s[k]=types[%d].decode(r,r.uint32())", ref, i); // can't be groups
            else gen
                ("%s[k]=r.%s()", ref, type);

        // Repeated fields
        } else if (field.repeated) { gen

                ("if(!(%s&&%s.length))", ref, ref)
                    ("%s=[]", ref);

            // Packable (always check for forward and backward compatiblity)
            if (/* field.packed && */types.packed[type] !== undefined) gen
                ("if((t&7)===2){")
                    ("var c2=r.uint32()+r.pos")
                    ("while(r.pos<c2)")
                        ("%s.push(r.%s())", ref, type)
                ("}else");

            // Non-packed
            if (types.basic[type] === undefined) gen(field.resolvedType.group
                    ? "%s.push(types[%d].decode(r))"
                    : "%s.push(types[%d].decode(r,r.uint32()))", ref, i);
            else gen
                    ("%s.push(r.%s())", ref, type);

        // Non-repeated
        } else if (types.basic[type] === undefined) gen(field.resolvedType.group
                ? "%s=types[%d].decode(r)"
                : "%s=types[%d].decode(r,r.uint32())", ref, i);
        else gen
                ("%s=r.%s()", ref, type);
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
