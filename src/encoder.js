"use strict";
module.exports = encoder;

var Enum     = require("./enum"),
    types    = require("./types"),
    util     = require("./util");

function genEncodeType(gen, field, fieldIndex, ref) {
    return field.resolvedType.group
        ? gen("types[%d].encode(%s,w.uint32(%d)).uint32(%d)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0)
        : gen("types[%d].encode(%s,w.uint32(%d).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
}

/**
 * Generates an encoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function encoder(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray;
    var oneofs = mtype.oneofsArray;
    var gen = util.codegen("m", "w")
    ("if(!w)")
        ("w=Writer.create()");

    var i, ref;
    for (var i = 0; i < fields.length; ++i) {
        var field    = fields[i].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.basic[type];
            ref      = "m" + util.safeProp(field.name);

        // Map fields
        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            gen
    ("if(%s&&%s!==util.emptyObject){", ref, ref)
        ("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)
            ("w.uint32(%d).fork().uint32(%d).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[keyType], keyType);
            if (wireType === undefined) gen
            ("types[%d].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", i, ref); // can't be groups
            else gen
            (".uint32(%d).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen
        ("}")
    ("}");

        // Repeated fields
        } else if (field.repeated) {

            // Packed repeated
            if (field.packed && types.packed[type] !== undefined) { gen

    ("if(%s&&%s.length){", ref, ref)
        ("w.uint32(%d).fork()", (field.id << 3 | 2) >>> 0)
        ("for(var i=0;i<%s.length;++i)", ref)
            ("w.%s(%s[i])", type, ref)
        ("w.ldelim()", field.id)
    ("}");

            // Non-packed
            } else { gen

    ("if(%s){", ref)
        ("for(var i=0;i<%s.length;++i)", ref);
                if (wireType === undefined)
            genEncodeType(gen, field, i, ref + "[i]");
                else gen
            ("w.uint32(%d).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
            gen
    ("}");

            }

        // Non-repeated
        } else if (!field.partOf) {
            if (!field.required) {

                if (field.long) {
                    gen
    ("if(%s!==undefined&&%s!==null&&util.longNe(%s,%d,%d))", ref, ref, ref, field.defaultValue.low, field.defaultValue.high);
                } else gen
    ("if(%s!==undefined&&%s!==%j)", ref, ref, field.defaultValue);

            }

            if (wireType === undefined)
        genEncodeType(gen, field, i, ref);
            else gen
        ("w.uint32(%d).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);

        }
    }
    for (var i = 0; i < oneofs.length; ++i) {
        var oneof = oneofs[i];
        gen
        ("switch(%s){", "m" + util.safeProp(oneof.name));
        var oneofFields = oneof.fieldsArray;
        for (var j = 0; j < oneofFields.length; ++j) {
            var field    = oneofFields[j],
                type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
                wireType = types.basic[type];
                ref      = "m" + util.safeProp(field.name);
            gen
            ("case%j:", field.name);

            if (wireType === undefined)
                genEncodeType(gen, field, fields.indexOf(field), ref);
            else gen
                ("w.uint32(%d).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);

            gen
                ("break;");

        } gen
        ("}");
    }

    return gen
    ("return w");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}