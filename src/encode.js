"use strict";
module.exports = encode;

var Enum     = require("./enum"),
    Writer   = require("./writer"),
    types    = require("./types"),
    util     = require("./util");
var safeProp = util.safeProp;

/**
 * General purpose message encoder.
 * @param {Message|Object} message Runtime message or plain object to encode
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 * @this Type
 * @property {GenerateEncoder} generate Generates a type specific encoder
 */
function encode(message, writer) {
    /* eslint-disable block-scoped-var, no-redeclare */
    if (!writer)
        writer = Writer.create();
    var fields = this.getFieldsArray(), fi = 0;
    while (fi < fields.length) {
        var field    = fields[fi++].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.basic[type];

        // Map fields
        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            if (message[field.name] && message[field.name] !== util.emptyObject) {
                for (var keys = Object.keys(message[field.name]), i = 0; i < keys.length; ++i) {
                    writer.uint32(field.id << 3 | 2).fork()
                          .uint32(/*1*/8 | types.mapKey[keyType])[keyType](keys[i]);
                    if (wireType === undefined)
                        field.resolvedType.encode(message[field.name][keys[i]], writer.uint32(/*2,2*/18).fork()).ldelim();
                    else
                        writer.uint32(/*2*/16 | wireType)[type](message[field.name][keys[i]]);
                    writer.ldelim();
                }
            }

        // Repeated fields
        } else if (field.repeated) {
            var values = message[field.name];
            if (values && values.length) {

                // Packed repeated
                if (field.packed && types.packed[type] !== undefined) {
                    writer.fork();
                    var i = 0;
                    while (i < values.length)
                        writer[type](values[i++]);
                    writer.ldelim(field.id);

                // Non-packed
                } else {
                    var i = 0;
                    if (wireType !== undefined)
                        while (i < values.length)
                            writer.uint32(field.id << 3 | wireType)[type](values[i++]);
                    else
                        while (i < values.length)
                            field.resolvedType.encode(values[i++], writer.uint32(field.id << 3 | 2).fork()).ldelim();
                }

            }

        // Non-repeated
        } else {
            var value = message[field.name],
                longVal = field.long && typeof value === "number" ? util.LongBits.fromNumber(value) : value;
            if (
                field.partOf && message[field.partOf.name] === field.name
                ||
                (field.required || value !== undefined) && (field.long ? longVal.lo !== field.defaultValue.low || longVal.hi !== field.defaultValue.high : value !== field.defaultValue)
            ) {
                if (wireType !== undefined)
                    writer.uint32(field.id << 3 | wireType)[type](value);
                else {
                    field.resolvedType.encode(value, writer.fork());
                    if (writer.len || field.required)
                        writer.ldelim(field.id);
                    else
                        writer.reset();
                }
            }
        }
    }
    return writer;
    /* eslint-enable block-scoped-var, no-redeclare */
}

/**
 * Generates an {@link Encoder|encoder} specific to the specified message type.
 * @typedef GenerateEncoder
 * @type {function}
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
/**/
encode.generate = function generate(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.getFieldsArray();
    var oneofs = mtype.getOneofsArray();
    var gen = util.codegen("m", "w")
    ("w||(w=Writer.create())");

    var i;
    var hasLongVar = false;
    for (var i = 0; i < fields.length; ++i) {
        var field    = fields[i].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.basic[type],
            prop     = safeProp(field.name);

        // Map fields
        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            gen
    ("if(m%s&&m%s!==util.emptyObject){", prop, prop)
        ("for(var ks=Object.keys(m%s),i=0;i<ks.length;++i){", prop)
            ("w.uint32(%d).fork().uint32(%d).%s(ks[i])", field.id << 3 | 2, 8 | types.mapKey[keyType], keyType);
            if (wireType === undefined) gen
            ("types[%d].encode(m%s[ks[i]],w.uint32(18).fork()).ldelim()", i, prop);
            else gen
            ("w.uint32(%d).%s(m%s[ks[i]])", 16 | wireType, type, prop);
            gen
            ("w.ldelim()")
        ("}")
    ("}");

        // Repeated fields
        } else if (field.repeated) {

            // Packed repeated
            if (field.packed && types.packed[type] !== undefined) { gen

    ("if(m%s&&m%s.length){", prop, prop)
        ("w.fork()")
        ("for(var i=0;i<m%s.length;++i)", prop)
            ("w.%s(m%s[i])", type, prop)
        ("w.ldelim(%d)", field.id)
    ("}");

            // Non-packed
            } else { gen

    ("if(m%s)", prop)
        ("for(var i=0;i<m%s.length;++i)", prop);
                if (wireType !== undefined) gen
            ("w.uint32(%d).%s(m%s[i])", field.id << 3 | wireType, type, prop);
                else gen
            ("types[%d].encode(m%s[i],w.uint32(%d).fork()).ldelim()", i, prop, field.id << 3 | 2);

            }

        // Non-repeated
        } else if (!field.partOf) {
            if (!field.required) {

                if (field.long) {
                    if (!hasLongVar) { gen
    ("var l");
                        hasLongVar = true;
                    }
                    gen
    ("if(m%s!==undefined&&((l=typeof m%s===\"object\"?m%s:util.LongBits.from(m%s)).lo!==%d||l.hi!==%d))", prop, prop, prop, prop, field.defaultValue.low, field.defaultValue.high);
                } else gen
    ("if(m%s!==undefined&&m%s!==%j)", prop, prop, field.defaultValue);

            }

            if (wireType !== undefined) gen

        ("w.uint32(%d).%s(m%s)", field.id << 3 | wireType, type, prop);

            else if (field.required) gen
            
        ("types[%d].encode(m%s,w.uint32(%d).fork()).ldelim()", i, prop, field.id << 3 | 2);
        
            else gen

        ("types[%d].encode(m%s,w.fork()).len&&w.ldelim(%d)||w.reset()", i, prop, field.id);
    
        }
    }
    for (var i = 0; i < oneofs.length; ++i) {
        var oneof = oneofs[i],
            prop  = safeProp(oneof.name);
        gen
        ("switch(m%s){", prop);
        var oneofFields = oneof.getFieldsArray();
        for (var j = 0; j < oneofFields.length; ++j) {
            var field    = oneofFields[j],
                type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
                wireType = types.basic[type],
                prop     = safeProp(field.name);
            gen
            ("case%j:", field.name);

            if (wireType !== undefined) gen

                ("w.uint32(%d).%s(m%s)", field.id << 3 | wireType, type, prop);

            else if (field.required) gen
            
                ("types[%d].encode(m%s,w.uint32(%d).fork()).ldelim()", fields.indexOf(field), prop, field.id << 3 | 2);
        
            else gen

                ("types[%d].encode(m%s,w.fork()).len&&w.ldelim(%d)||w.reset()", fields.indexOf(field), prop, field.id);
            gen
                ("break;");

        } gen
        ("}");        
    }

    return gen
    ("return w");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};
