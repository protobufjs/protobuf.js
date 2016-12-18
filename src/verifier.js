"use strict";
module.exports = verifier;

var Enum      = require("./enum"),
    Type      = require("./type"),
    util      = require("./util");

function invalid(field, expected) {
    return "invalid value for field " + field.getFullName() + " (" + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:"+field.keyType+"}" : "") + " expected)";
}

function genVerifyValue(gen, field, fieldIndex, ref) {
    /* eslint-disable no-unexpected-multiline */
    var type  = field.type,
        rtype = field.resolvedType;
    if (!rtype && /32/.test(type)) gen
        ("if(!util.isInteger(%s))", ref)
            ("return%j", invalid(field, "integer"));
    else if (!rtype && /64/.test(type)) gen
        ("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)
            ("return%j", invalid(field, "integer|Long"));
    else if (type === "float" || type === "double") gen
        ("if(typeof %s!==\"number\")", ref)
            ("return%j", invalid(field, "number"));
    else if (type === "bool") gen
        ("if(typeof %s!==\"boolean\")", ref)
            ("return%j", invalid(field, "boolean"));
    else if (type === "string") gen
        ("if(!util.isString(%s))", ref)
            ("return%j", invalid(field, "string"));
    else if (type === "bytes") gen
        ("if(!(%s&&typeof %s.length===\"number\"||util.isString(%s)))", ref, ref, ref)
            ("return%j", invalid(field, "buffer"));
    else if (field.resolvedType instanceof Enum) { gen
        ("switch(%s){", ref)
            ("default:")
                ("return%j", invalid(field, "enum value"));
        var values = util.toArray(field.resolvedType.values);
        for (var j = 0; j < values.length; ++j) gen
            ("case %d:", values[j]);
        gen
                ("break")
        ("}");
    } else if (field.resolvedType instanceof Type) gen
        ("var r;")
        ("if(r=types[%d].verify(%s))", fieldIndex, ref)
            ("return r");
    /* eslint-enable no-unexpected-multiline */
}

function genVerifyKey(gen, field, ref) {
    /* eslint-disable no-unexpected-multiline */
    var keyType = field.keyType,
        rtype   = field.resolvedKeyType;
    if (!rtype && /32/.test(keyType)) gen
        ("if(!/^-?(?:0|[1-9]\\d*)$/.test(%s))", ref)
            ("return%j", invalid(field, "integer key"));
    else if (!rtype && /64/.test(keyType)) gen
        ("if(!/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9]\\d*))$/.test(%s))", ref)
            ("return%j", invalid(field, "integer|Long key"));
    else if (keyType === "bool") gen
        ("if(!/^true|false|0|1$/.test(%s))", ref)
            ("return%j", invalid(field, "boolean key"));
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a verifier specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function verifier(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var fields = mtype.getFieldsArray();
    var gen = util.codegen("m");

    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            prop  = util.safeProp(field.name);

        // map fields
        if (field.map) { gen
            ("if(m%s!==undefined){", prop)
                ("if(!util.isObject(m%s))", prop)
                    ("return%j", invalid(field, "object"))
                ("var k=Object.keys(m%s)", prop)
                ("for(var i=0;i<k.length;++i){");
                    genVerifyKey(gen, field, "k[i]");
                    genVerifyValue(gen, field, i, "m" + prop + "[k[i]]");
                gen
                ("}")
            ("}");

        // repeated fields
        } else if (field.repeated) { gen
            ("if(m%s!==undefined){", prop)
                ("if(!Array.isArray(m%s))", prop)
                    ("return%j", invalid(field, "array"))
                ("for(var i=0;i<m%s.length;++i){", prop);
                    genVerifyValue(gen, field, i, "m" + prop + "[i]"); gen
                ("}")
            ("}");

        // required or present fields
        } else {
            if (!field.required) {
                if (field.resolvedType instanceof Type) gen
            ("if(m%s!==undefined&&m%s!==null){", prop, prop);
                else gen
            ("if(m%s!==undefined){", prop);
            }
                genVerifyValue(gen, field, i, "m" + prop);
            if (!field.required) gen
            ("}");
        }
    }
    return gen
    ("return null");
    /* eslint-enable no-unexpected-multiline */
}