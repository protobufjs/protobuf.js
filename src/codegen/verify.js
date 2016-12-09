"use strict";

/**
 * Runtime message verifier using code generation on top of reflection that also provides a fallback.
 * @exports codegen.verify
 * @namespace
 */
var verify = exports;

var Enum      = require("../enum"),
    Type      = require("../type"),
    util      = require("../util"),
    codegen   = require("../codegen");
var isInteger = util.isInteger;

function invalid(field, expected) {
    return "invalid value for field " + field.getFullName() + " (" + expected + " expected)";
}

function verifyValue(field, value) {
    switch (field.type) {
        case "double":
        case "float":
            if (typeof value !== 'number')
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
            if (typeof value !== 'boolean')
                return invalid(field, "boolean");
            break;
        case "string":
            if (!util.isString(value))
                return invalid(field, "string");
            break;
        case "bytes":
            if (!value || typeof value.length !== 'number')
                return invalid(field, "buffer");
            break;
        default:
            if (field.resolvedType instanceof Enum) {
                if (typeof field.resolvedType.getValuesById()[value] !== 'number')
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

/**
 * Verifies a runtime message of `this` message type.
 * @param {Message|Object} message Runtime message or plain object to verify
 * @returns {?string} `null` if valid, otherwise the reason why it is not
 * @this {Type}
 */
verify.fallback = function verify_fallback(message) {
    var fields = this.getFieldsArray(),
        i = 0,
        reason;
    while (i < fields.length) {
        var field = fields[i++].resolve(),
            value = message[field.name];

        // repeated fields
        if (field.repeated) {

            if (value !== undefined) {
                if (!Array.isArray(value))
                    return invalid(field, "array");
                for (var j = 0; j < value.length; ++j)
                    if (reason = verifyValue(field, value[j]))
                        return reason;
            }

        // required or present fields
        } else if (field.required || value !== undefined) {
            
            if (reason = verifyValue(field, value))
                return reason;
        }

    }
    return null;
};

function genVerifyValue(gen, field, fieldIndex, ref) {
    switch (field.type) {
        case "double":
        case "float": gen
            ("if(typeof %s!=='number')", ref)
                ("return %j", invalid(field, "number"));
            break;
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32": gen
            ("if(!util.isInteger(%s))", ref)
                ("return %j", invalid(field, "integer"));
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64": gen
            ("if(!(util.isInteger(%s)||%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)
                ("return %j", invalid(field, "integer|Long"));
            break;
        case "bool": gen
            ("if(typeof %s!=='boolean')", ref)
                ("return %j", invalid(field, "boolean"));
            break;
        case "string": gen
            ("if(!util.isString(%s))", ref)
                ("return %j", invalid(field, "string"));
            break;
        case "bytes": gen
            ("if (!%s||typeof %s.length!=='number')", ref, ref)
                ("return %j", invalid(field, "buffer"));
            break;
        default:
            if (field.resolvedType instanceof Enum) { gen
                ("switch(%s){", ref)
                    ("default:")
                        ("return %j", invalid(field, "enum value"));
                var values = util.toArray(field.resolvedType.values);
                for (var j = 0; j < values.length; ++j) gen
                    ("case %d:", values[j]);
                gen
                ("}");
            } else if (field.resolvedType instanceof Type) { gen
                ("var r;")
                ("if(r=types[%d].verify(%s))", fieldIndex, ref)
                    ("return r");
            }
            break;
    }
}

/**
 * Generates a verifier specific to the specified message type, with an identical signature to {@link codegen.verify.fallback}.
 * @param {Type} mtype Message type
 * @returns {CodegenInstance} {@link codegen|Codegen} instance
 */
verify.generate = function verify_generate(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var fields = mtype.getFieldsArray();
    var gen = codegen("m");

    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            prop  = util.safeProp(field.name);

        // repeated fields
        if (field.repeated) { gen
            ("if(m%s!==undefined){", prop)
                ("if(!Array.isArray(m%s))", prop)
                    ("return %j", invalid(field, "array"))
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
