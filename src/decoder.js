"use strict";
module.exports = decoder;

decoder.compat = true;

var Enum    = require("./enum"),
    types   = require("./types"),
    util    = require("./util");

/**
 * Generates a decoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 * @property {boolean} compat=true Generates backward/forward compatible decoders (packed fields)
 */
function decoder(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var gen = util.codegen("r", "l")
    ("if(!(r instanceof Reader))")
        ("r=Reader.create(r)")
    ("var c=l===undefined?r.len:r.pos+l,m=new this.ctor")
    ("while(r.pos<c){")
        ("var t=r.uint32()");
    if (mtype.group) gen
        ("if((t&7)===4)")
            ("break");
    gen
        ("switch(t>>>3){");

    for (var i = 0; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            type  = field.resolvedType instanceof Enum ? "uint32" : field.type,
            ref   = "m" + util.safeProp(field.name); gen
            ("case %d:", field.id);

        // Map fields
        if (field.map) { gen

                ("r.skip().pos++") // assumes id 1 + key wireType
                ("if(%s===util.emptyObject)", ref)
                    ("%s={}", ref)
                ("var k=r.%s()", field.keyType)
                ("r.pos++"); // assumes id 2 + value wireType
            if (types.basic[type] === undefined) gen
                ("%s[typeof k===\"object\"?util.longToHash(k):k]=types[%d].decode(r,r.uint32())", ref, i); // can't be groups
            else gen
                ("%s[typeof k===\"object\"?util.longToHash(k):k]=r.%s()", ref, type);

        // Repeated fields
        } else if (field.repeated) { gen

                ("if(!(%s&&%s.length))", ref, ref)
                    ("%s=[]", ref);

            // Packable (always check for forward and backward compatiblity)
            if ((decoder.compat || field.packed) && types.packed[type] !== undefined) gen
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
