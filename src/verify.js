"use strict";
module.exports = verify;

var Enum      = require("./enum"),
    Type      = require("./type"),
    util      = require("./util");
var isInteger = util.isInteger;

function invalid(field, expected) {
    return "invalid value for field " + field.getFullName() + " (" + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:"+field.keyType+"}" : "") + " expected)";
}

function verifyValue(field, value) {
    switch (field.type) {
        case "double":
        case "float":
            if (typeof value !== "number")
                return invalid(field, "number");
            break;
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
            if (!isInteger(value))
                return invalid(field, "integer");
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
            if (!(isInteger(value) || value && isInteger(value.low) && isInteger(value.high)))
                return invalid(field, "integer|Long");
            break;
        case "bool":
            if (typeof value !== "boolean")
                return invalid(field, "boolean");
            break;
        case "string":
            if (!util.isString(value))
                return invalid(field, "string");
            break;
        case "bytes":
            if (!(value && typeof value.length === "number" || util.isString(value)))
                return invalid(field, "buffer");
            break;
        default:
            if (field.resolvedType instanceof Enum) {
                if (typeof field.resolvedType.getValuesById()[value] !== "number")
                    return invalid(field, "enum value");
            } else if (field.resolvedType instanceof Type) {
                var reason = field.resolvedType.verify(value);
                if (reason)
                    return reason;
            }
            break;
    }
    return null;
}

function verifyKey(field, value) {
    switch (field.keyType) {
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
            if (/^[\x00-\xff]{8}$/.test(value)) // eslint-disable-line no-control-regex
                return null;
            // fallthrough
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
            if (/^-?(?:0|[1-9]\d*)$/.test(value))
                return invalid(field, "integer key");
            break;
        case "bool":
            if (/^true|false|0|1$/.test(value))
                return invalid(field, "boolean key");
            break;
    }
    return null;
}

/**
 * General purpose message verifier.
 * @param {Message|Object} message Runtime message or plain object to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 * @this {Type}
 * @property {GenerateVerifier} generate Generates a type specific verifier
 */
function verify(message) {
    /* eslint-disable block-scoped-var, no-redeclare */
    var fields = this.getFieldsArray(),
        i = 0,
        reason;
    while (i < fields.length) {
        var field = fields[i++].resolve(),
            value = message[field.name];

        // map fields
        if (field.map) {

            if (value !== undefined) {
                if (!util.isObject(value))
                    return invalid(field, "object");
                var keys = Object.keys(value);
                for (var j = 0; j < keys.length; ++j) {
                    if (reason = verifyKey(field, keys[j])) // eslint-disable-line no-cond-assign
                        return reason;
                    if (reason = verifyValue(field, value[keys[j]])) // eslint-disable-line no-cond-assign
                        return reason;
                }
            }

        // repeated fields
        } else if (field.repeated) {

            if (value !== undefined) {
                if (!Array.isArray(value))
                    return invalid(field, "array");
                for (var j = 0; j < value.length; ++j)
                    if (reason = verifyValue(field, value[j])) // eslint-disable-line no-cond-assign
                        return reason;
            }

        // required or present fields
        } else if (field.required || value !== undefined) {

            if (reason = verifyValue(field, value)) // eslint-disable-line no-cond-assign
                return reason;
        }

    }
    return null;
    /* eslint-enable block-scoped-var, no-redeclare */
}

function genVerifyValue(gen, field, fieldIndex, ref) {
    /* eslint-disable no-unexpected-multiline */
    switch (field.type) {
        case "double":
        case "float": gen
            ("if(typeof %s!==\"number\")", ref)
                ("return%j", invalid(field, "number"));
            break;
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
            ("if(!(util.isInteger(%s)||%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)
                ("return%j", invalid(field, "integer|Long"));
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
        default:
            if (field.resolvedType instanceof Enum) { gen
                ("switch(%s){", ref)
                    ("default:")
                        ("return%j", invalid(field, "enum value"));
                var values = util.toArray(field.resolvedType.values);
                for (var j = 0; j < values.length; ++j) gen
                    ("case %d:", values[j]);
                gen
                        ("break")
                ("}");
            } else if (field.resolvedType instanceof Type) { gen
                ("var r;")
                ("if(r=types[%d].verify(%s))", fieldIndex, ref)
                    ("return r");
            }
            break;
    }
    /* eslint-enable no-unexpected-multiline */
}

function genVerifyKey(gen, field, ref) {
    /* eslint-disable no-unexpected-multiline */
    switch (field.keyType) {
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64": gen
            ("if(!/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9]\\d*))$/.test(%s))", ref)
                ("return%j", invalid(field, "integer|Long key"));
            break;
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32": gen
            ("if(!/^-?(?:0|[1-9]\\d*)$/.test(%s))", ref)
                ("return%j", invalid(field, "integer key"));
            break;
        case "bool": gen
            ("if(!/^true|false|0|1$/.test(%s))", ref)
                ("return%j", invalid(field, "boolean key"));
            break;
    }
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a verifier specific to the specified message type.
 * @typedef GenerateVerifier
 * @type {function}
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
/**/
verify.generate = function generate(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var fields = mtype.getFieldsArray();
    var gen = util.codegen("m");

    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            prop  = util.safeProp(field.name);

        if (field.optional)
            gen("if(m===null || m===undefined) return null");

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
            if (!field.required) gen
            ("if(m%s!==undefined){", prop);
                genVerifyValue(gen, field, i, "m" + prop);
            if (!field.required) gen
            ("}");
        }
    }
    return gen
    ("return null");
    /* eslint-enable no-unexpected-multiline */
};
