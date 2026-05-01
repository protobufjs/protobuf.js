"use strict";
module.exports = decoder;

var Enum    = require("./enum"),
    types   = require("./types"),
    util    = require("./util");

function missing(field) {
    return "missing required '" + field.name + "'";
}

/**
 * Generates a decoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function decoder(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var hasMapField = false,
        hasImplicitPresenceField = false,
        i = 0;
    for (; i < mtype.fieldsArray.length; ++i) {
        var pfield = mtype._fieldsArray[i];
        if (pfield.map)
            hasMapField = true;
        if (!pfield.repeated && !pfield.map && !pfield.hasPresence)
            hasImplicitPresenceField = true;
    }
    var gen = util.codegen(["r", "l", "z", "q", "g"], mtype.name + "$decode")
    ("if(!(r instanceof Reader))")
        ("r=Reader.create(r)")
    ("if(q===undefined)q=0")
    ("if(q>Reader.recursionLimit)")
        ("throw Error(\"max depth exceeded\")")
    ("var c=l===undefined?r.len:r.pos+l,m=g||new this.ctor" + (hasMapField ? ",k,v" : hasImplicitPresenceField ? ",v" : ""))
    ("while(r.pos<c){")
        ("var s=r.pos")
        ("var t=r.uint32()")
        ("if(t===z){")
            ("z=undefined")
            ("break")
        ("}");
    if (mtype.fieldsArray.length) gen
        ("var u=t&7")
        ("switch(t>>>=3){");
    for (i = 0; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            type  = field.resolvedType instanceof Enum ? "int32" : field.type,
            ref   = "m" + util.safeProp(field.name);

        // Map fields
        if (field.map) {
            gen
            ("case %i:{", field.id)
                ("if(u!==2)")
                    ("break")
                ("if(%s===util.emptyObject)", ref)
                    ("%s={}", ref)
                ("var c2=r.uint32()+r.pos");

            if (types.defaults[field.keyType] !== undefined) gen
                ("k=%j", types.defaults[field.keyType]);
            else gen
                ("k=null");

            if (types.defaults[type] !== undefined) gen
                ("v=%j", types.defaults[type]);
            else gen
                ("v=null");

            gen
                ("while(r.pos<c2){")
                    ("var t2=r.uint32()")
                    ("u=t2&7")
                    ("switch(t2>>>=3){")
                        ("case 1:")
                            ("if(u!==%i)", types.mapKey[field.keyType])
                                ("break")
                            ("k=r.%s()", field.keyType)
                            ("continue")
                        ("case 2:")
                            ("if(u!==%i)", types.basic[type] === undefined ? 2 : types.basic[type])
                                ("break");

            if (types.basic[type] === undefined) gen
                            ("v=types[%i].decode(r,r.uint32(),undefined,q+1)", i); // can't be groups
            else gen
                            ("v=r.%s()", type);

            gen
                            ("continue")
                    ("}")
                    ("r.skipType(u,q,t2)")
                ("}");

            var val = types.basic[type] === undefined ? "v||new types[" + i + "].ctor" : "v";
            if (types.long[field.keyType] !== undefined) gen
                ("%s[typeof k===\"object\"?util.longToHash(k):k]=%s", ref, val);
            else {
                if (field.keyType === "string") gen
                ("if(k===\"__proto__\")")
                    ("util.makeProp(%s,k)", ref);
                gen
                ("%s[k]=%s", ref, val);
            }

        // Repeated fields
        } else if (field.repeated) { gen
            ("case %i:", field.id)
            ("{");

            // Packable (always check for forward and backward compatiblity)
            if (types.packed[type] !== undefined) gen
                ("if(u===2){")
                    ("if(!(%s&&%s.length))", ref, ref)
                        ("%s=[]", ref)
                    ("var c2=r.uint32()+r.pos")
                    ("while(r.pos<c2)")
                        ("%s.push(r.%s())", ref, type)
                    ("continue")
                ("}");

            // Non-packed
            gen
                ("if(u!==%i)", types.basic[type] === undefined ? field.delimited ? 3 : 2 : types.basic[type])
                    ("break")
                ("if(!(%s&&%s.length))", ref, ref)
                    ("%s=[]", ref);
            if (types.basic[type] === undefined) {
                if (field.delimited) gen
                    ("%s.push(types[%i].decode(r,undefined,%i,q+1))", ref, i, field.id * 8 + 4);
                else gen
                    ("%s.push(types[%i].decode(r,r.uint32(),undefined,q+1))", ref, i);
            } else gen
                    ("%s.push(r.%s())", ref, type);

        // Non-repeated
        } else if (types.basic[type] === undefined) {
            gen
            ("case %i:{", field.id)
                ("if(u!==%i)", field.delimited ? 3 : 2)
                    ("break");
            if (field.delimited) gen
                ("%s=types[%i].decode(r,undefined,%i,q+1,%s)", ref, i, field.id * 8 + 4, ref);
            else gen
                ("%s=types[%i].decode(r,r.uint32(),undefined,q+1,%s)", ref, i, ref);
        }
        else if (field.hasPresence) {
            gen
            ("case %i:{", field.id)
                ("if(u!==%i)", types.basic[type])
                    ("break")
                ("%s=r.%s()", ref, type);
        } else {
            gen
            ("case %i:{", field.id)
                ("if(u!==%i)", types.basic[type])
                    ("break");
            if (type === "string" || type === "bytes") gen
                ("if((v=r.%s()).length)", type);
            else if (types.long[type] !== undefined) gen
                ("if(typeof(v=r.%s())===\"object\"?v.low||v.high:v!==0)", type);
            else if (type === "double" || type === "float") gen
                ("if((v=r.%s())!==0)", type);
            else gen
                ("if(v=r.%s())", type);
            gen
                    ("%s=v", ref)
                ("else")
                    ("delete %s", ref); // rare/odd case: later default clears earlier non-default
        }
        if (field.partOf) gen
                ("m%s=%j", util.safeProp(field.partOf.name), field.name);
        gen
                ("continue")
            ("}");
    }
    if (i) gen
        ("}");
    // Unknown fields
    gen
        ("r.skipType(%s,q,t)", i ? 'u':'t&7')
        ("util.makeProp(m,\"$unknowns\",false);")
        ("(m.$unknowns||(m.$unknowns=[])).push(r.raw(s,r.pos))")
    ("}")
    ("if(z!==undefined)")
        ("throw Error(\"missing end group\")");

    // Field presence
    for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required) gen
    ("if(!m.hasOwnProperty(%j))", rfield.name)
        ("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
    }

    return gen
    ("return m");
    /* eslint-enable no-unexpected-multiline */
}
