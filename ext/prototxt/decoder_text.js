"use strict";
module.exports = decoder_text;

var Enum    = require("../../src/enum"),
    types   = require("../../src/types"),
    util    = require("../../src/util");

function missing(field) {
    return "missing required '" + field.name + "'";
}

/**
 * Generates a text decoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function decoder_text(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var gen = util.codegen(["r"], mtype.name + "$decodeText")
    ("var m=new this.ctor" + (mtype.fieldsArray.filter(function(field) { return field.map; }).length ? ",k" : ""))
    ("r.start()")
    (mtype.fullName === ".google.protobuf.Any" ? "if(r.any(m)) { return m; }" : "")
    ("while(!r.end()){")
        ("var t=r.tag()");
    gen("switch(t){");

    var i = 0;
    for (; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            type  = field.type,
            ref   = "m" + util.safeProp(field.name);

        gen("case \"%s\":", field.name);

        // Map fields
        if (field.map) {
            gen ("r.start()")
                ("if(%s===util.emptyObject)", ref)
                    ("%s={}", ref)
                ("r.assert(\"key\")")
                ("k=r.%s()", field.keyType)
                ("r.assert(\"value\")")
            if (types.long[field.keyType] !== undefined) {
                if (types.basic[type] === undefined)
                    gen ("%s[typeof k===\"object\"?util.longToHash(k):k]=types[%i].decodeText(r,true)", ref, i); // can't be groups
                else if (field.resolvedType instanceof Enum)
                    gen ("%s.push(r.enum(types[%i]))", ref, i);
                else
                    gen ("%s[typeof k===\"object\"?util.longToHash(k):k]=r.%s()", ref, type);
            } else {
                if (types.basic[type] === undefined)
                    gen ("%s[k]=types[%i].decodeText(r,true)", ref, i);
                else
                    gen ("%s[k]=r.%s()", ref, type);
            }
            gen ("r.end()");

        // Repeated fields
        } else if (field.repeated) {
            gen ("if(!(%s&&%s.length))", ref, ref)
                ("%s=[]", ref);

            if (field.resolvedType instanceof Enum) {
                gen ("if(r.first()) {")
                        ("while(!r.last()) {")
                            ("%s.push(r.enum(types[%i]))", ref, i)
                            ("r.next()")
                        ("}")
                    ("} else {")
                        ("%s.push(r.enum(types[%i]))", ref, i)
                    ("}");
            }
            else if (types.basic[type] === undefined) {
                gen ("%s.push(types[%i].decodeText(r,true))", ref, i);
            }
            else {
                gen ("if(r.first()) {")
                        ("while(!r.last()) {")
                            ("%s.push(r.%s())", ref, type)
                            ("r.next()")
                        ("}")
                ("} else {")
                    ("%s.push(r.%s())", ref, type)
                ("}");
            }

        // Non-repeated
        } else if (field.resolvedType instanceof Enum)
            gen ("%s=r.enum(types[%i])", ref, i);
        else if (types.basic[type] === undefined)
            gen ("%s=types[%i].decodeText(r,true)", ref, i);
        else
            gen ("%s=r.%s()", ref, type);
        gen("break");
    // Unknown fields
    }
        gen ("default:")
                ("r.field(t,m)")
                ("break")

        ("}")
    ("}");

    // Field presence
    for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required) gen
    ("if(!m.hasOwnProperty(%j))", rfield.name)
        ("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
    }

    return gen("return m");
    /* eslint-enable no-unexpected-multiline */
}
