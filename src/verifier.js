"use strict";
module.exports = verifier;

var Enum      = require("./enum"),
    util      = require("./util");

function invalid(field, expected) {
    return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:"+field.keyType+"}" : "") + " expected";
}

/**
 * Generates a partial value verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genVerifyValue(gen, field, fieldIndex, ref) {
    /* eslint-disable no-unexpected-multiline */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) { gen
            ("switch(%s){", ref)
                ("default:")
                    ("return%j", invalid(field, "enum value"));
            for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j) gen
                ("case %d:", field.resolvedType.values[keys[j]]);
            gen
                    ("break")
            ("}");
        } else gen
            ("var e=types[%d].verify(%s);", fieldIndex, ref)
            ("if(e)")
                ("return%j+e", field.name + ".");
    } else {
        switch (field.type) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32": gen
                ("if(!util.isInteger(%s))", ref)
                    ("return%j", invalid(field, "integer"));
                break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
                ("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)
                    ("return%j", invalid(field, "integer|Long"));
                break;
            case "float":
            case "double": gen
                ("if(typeof %s!==\"number\")", ref)
                    ("return%j", invalid(field, "number"));
                break;
            case "bool": gen
                ("if(typeof %s!==\"boolean\")", ref)
                    ("return%j", invalid(field, "boolean"));
                break;
            case "string": gen
                ("if(!util.isString(%s))", ref)
                    ("return%j", invalid(field, "string"));
                break;
            case "bytes": gen
                ("if(!(%s&&typeof %s.length===\"number\"||util.isString(%s)))", ref, ref, ref)
                    ("return%j", invalid(field, "buffer"));
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a partial key verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genVerifyKey(gen, field, ref) {
    /* eslint-disable no-unexpected-multiline */
    switch (field.keyType) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32": gen
            ("if(!/^-?(?:0|[1-9][0-9]*)$/.test(%s))", ref) // it's important not to use any literals here that might be confused with short variable names by pbjs' beautify
                ("return%j", invalid(field, "integer key"));
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64": gen
            ("if(!/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/.test(%s))", ref) // see comment above: x is ok, d is not
                ("return%j", invalid(field, "integer|Long key"));
            break;
        case "bool": gen
            ("if(!/^true|false|0|1$/.test(%s))", ref)
                ("return%j", invalid(field, "boolean key"));
            break;
    }
    return gen;
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a verifier specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function verifier(mtype) {
    /* eslint-disable no-unexpected-multiline */

    if (/* initializes */ !mtype.fieldsArray.length)
        return util.codegen()("return null");
    var gen = util.codegen("m");

    for (var i = 0; i < mtype._fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            ref   = "m" + util.safeProp(field.name);

        // map fields
        if (field.map) { gen
            ("if(%s!==undefined){", ref)
                ("if(!util.isObject(%s))", ref)
                    ("return%j", invalid(field, "object"))
                ("var k=Object.keys(%s)", ref)
                ("for(var i=0;i<k.length;++i){");
                    genVerifyKey(gen, field, "k[i]");
                    genVerifyValue(gen, field, i, ref + "[k[i]]")
                ("}")
            ("}");

        // repeated fields
        } else if (field.repeated) { gen
            ("if(%s!==undefined){", ref)
                ("if(!Array.isArray(%s))", ref)
                    ("return%j", invalid(field, "array"))
                ("for(var i=0;i<%s.length;++i){", ref);
                    genVerifyValue(gen, field, i, ref + "[i]")
                ("}")
            ("}");

        // required or present fields
        } else {
            if (!field.required) {
                if (field.resolvedType && !(field.resolvedType instanceof Enum)) gen
            ("if(%s!==undefined&&%s!==null){", ref, ref);
                else gen
            ("if(%s!==undefined){", ref);
            }
                genVerifyValue(gen, field, i, ref);
            if (!field.required) gen
            ("}");
        }
    } return gen
    ("return null");
    /* eslint-enable no-unexpected-multiline */
}