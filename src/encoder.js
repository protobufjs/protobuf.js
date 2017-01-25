"use strict";
module.exports = encoder;

var Enum     = require("./enum"),
    types    = require("./types"),
    util     = require("./util");

/**
 * Generates a partial message type encoder.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genTypePartial(gen, field, fieldIndex, ref) {
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
    var gen = util.codegen("m", "w")
    ("if(!w)")
        ("w=Writer.create()");

    var i, ref;
    for (var i = 0; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field    = mtype._fieldsArray[i].resolve();
        if (field.partOf) // see below for oneofs
            continue;
        var type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.basic[type];
            ref      = "m" + util.safeProp(field.name);

        // Map fields
        if (field.map) {
            gen
    ("if(%s&&m.hasOwnProperty(%j)){", ref, field.name)
        ("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)
            ("w.uint32(%d).fork().uint32(%d).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
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

    ("if(%s&&%s.length&&m.hasOwnProperty(%j)){", ref, ref, field.name)
        ("w.uint32(%d).fork()", (field.id << 3 | 2) >>> 0)
        ("for(var i=0;i<%s.length;++i)", ref)
            ("w.%s(%s[i])", type, ref)
        ("w.ldelim()")
    ("}");

            // Non-packed
            } else { gen

    ("if(%s!==undefined&&m.hasOwnProperty(%j)){", ref, field.name)
        ("for(var i=0;i<%s.length;++i)", ref);
                if (wireType === undefined)
            genTypePartial(gen, field, i, ref + "[i]");
                else gen
            ("w.uint32(%d).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
                gen
    ("}");

            }

        // Non-repeated
        } else {
            if (!field.required) {

                if (field.long) gen
    ("if(%s!==undefined&&%s!==null&&m.hasOwnProperty(%j))", ref, ref, field.name);
                else if (field.bytes || field.resolvedType && !(field.resolvedType instanceof Enum)) gen
    ("if(%s&&m.hasOwnProperty(%j))", ref, field.name);
                else gen
    ("if(%s!==undefined&&m.hasOwnProperty(%j))", ref, field.name);

            }

            if (wireType === undefined)
        genTypePartial(gen, field, i, ref);
            else gen
        ("w.uint32(%d).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);

        }
    }

    // oneofs
    for (var i = 0; i < /* initializes */ mtype.oneofsArray.length; ++i) {
        var oneof = mtype._oneofsArray[i]; gen
        ("switch(%s){", "m" + util.safeProp(oneof.name));
        for (var j = 0; j < /* direct */ oneof.fieldsArray.length; ++j) {
            var field    = oneof.fieldsArray[j],
                type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
                wireType = types.basic[type];
                ref      = "m" + util.safeProp(field.name); gen
            ("case%j:", field.name);
            if (wireType === undefined)
                genTypePartial(gen, field, mtype._fieldsArray.indexOf(field), ref);
            else gen
                ("w.uint32(%d).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
            gen
                ("break");
        } gen
        ("}");
    }
    
    return gen
    ("return w");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}