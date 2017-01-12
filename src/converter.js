"use strict";
/**
 * Runtime message from/to plain object converters.
 * @namespace
 */
var converter = exports;

var Enum = require("./enum"),
    util = require("./util");

/**
 * Generates a partial value fromObject conveter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
            var values = field.resolvedType.values; gen
            ("switch(d%s){", prop);
            Object.keys(values).forEach(function(key) {
                if (field.repeated && values[key] === field.typeDefault) gen
                ("default:");
                gen
                ("case%j:", key)
                ("case %j:", values[key])
                    ("m%s=%j", prop, values[key])
                    ("break");
            }); gen
            ("}");
        } else gen
            ("m%s=types[%d].fromObject(d%s)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "double":
            case "float":gen
                ("m%s=Number(d%s)", prop, prop);
                break;
            case "uint32":
            case "fixed32": gen
                ("m%s=d%s>>>0", prop, prop);
                break;
            case "int32":
            case "sint32":
            case "sfixed32": gen
                ("m%s=d%s|0", prop, prop);
                break;
            case "uint64":
                isUnsigned = true;
                // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
                ("if(util.Long)")
                    ("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)
                ("else if(typeof d%s===\"string\")", prop)
                    ("m%s=parseInt(d%s,10)", prop, prop)
                ("else if(typeof d%s===\"number\")", prop)
                    ("m%s=d%s", prop, prop)
                ("else if(typeof d%s===\"object\")", prop)
                    ("m%s=new util.LongBits(d%s.low,d%s.high).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
                break;
            case "bytes": gen
                ("if(typeof d%s===\"string\")", prop)
                    ("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop, prop)
                ("else if(d%s&&d%s.length)", prop, prop)
                    ("m%s=d%s", prop, prop);
                break;
            case "string": gen
                ("m%s=String(d%s)", prop, prop);
                break;
            case "bool": gen
                ("m%s=Boolean(d%s)", prop, prop);
                break;
            default: gen /* bool, uint32, string etc. */
                ("m%s=d%s", prop, prop);
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a plain object to runtime message converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.fromObject = function fromObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray;
    var gen = util.codegen("d")
    ("var m=new(this.ctor)");
    for (var i = 0; i < fields.length; ++i) {
        var field  = fields[i].resolve(),
            prop   = field._prop;

        // Map fields
        if (field.map) { gen
    ("if(d%s){", prop, prop)
        ("m%s={}", prop)
        ("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            genValuePartial_fromObject(gen, field, i, prop + "[ks[i]]")
        ("}")
    ("}");

        // Repeated fields
        } else if (field.repeated) { gen
    ("if(d%s){", prop)
        ("m%s=[]", prop)
        ("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(gen, field, i, prop + "[i]")
        ("}")
    ("}");

        // Non-repeated fields
        } else {
            if (!(field.resolvedType instanceof Enum)) gen // no need to test for null/undefined if an enum (uses switch)
    ("if(d%s!==undefined&&d%s!==null){", prop, prop);
        genValuePartial_fromObject(gen, field, i, prop);
            if (!(field.resolvedType instanceof Enum)) gen
    ("}");
        }
    } return gen
    ("return m");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};

/**
 * Generates a partial value toObject converter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_toObject(gen, field, fieldIndex, prop) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) gen
            ("d%s=o.enums===String?types[%d].values[m%s]:m%s", prop, fieldIndex, prop, prop);
        else gen
            ("d%s=types[%d].toObject(m%s,o)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "uint64":
                isUnsigned = true;
                // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
            ("if(typeof m%s===\"number\")", prop)
                ("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)
            ("else") // Long-like
                ("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low,m%s.high).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true": "", prop);
                break;
            case "bytes": gen
            ("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
                break;
            default: gen
            ("d%s=m%s", prop, prop);
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a runtime message to plain object converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.toObject = function toObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray;
    if (!fields.length)
        return util.codegen()("return {}");
    var gen = util.codegen("m", "o")
    ("if(!o)")
        ("o={}")
    ("var d={}");
    var repeatedFields = fields.filter(function(field) { return field.repeated; });
    if (repeatedFields.length) { gen
    ("if(o.arrays||o.defaults){");
        fields.forEach(function(field) {
            if (field.resolve().repeated) gen
        ("d%s=[]", field._prop);
        }); gen
    ("}");
    }
    var mapFields = fields.filter(function(field) { return field.map; });
    if (mapFields.length) { gen
    ("if(o.objects||o.defaults){");
        fields.forEach(function(field) {
            if (field.map) gen
        ("d%s={}", field._prop);
        }); gen
    ("}");
    }
    var otherFields = fields.filter(function(field) { return !(field.repeated || field.map); });
    if (otherFields.length) { gen
    ("if(o.defaults){");
        fields.forEach(function(field) {
            if (field.repeated || field.map)
                return;
            if (field.resolvedType instanceof Enum) gen
        ("d%s=o.enums===String?%j:%j", field._prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
            else if (field.long) gen
        ("if(util.Long){")
            ("var n=new util.Long(%d,%d,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)
            ("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", field._prop)
        ("}else")
            ("d%s=o.longs===String?%j:%d", field._prop, field.typeDefault.toString(), field.typeDefault.toNumber());
            else if (field.bytes) gen
        ("d%s=o.bytes===String?%j:%s", field._prop, String.fromCharCode.apply(String, field.typeDefault), "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]");
            else gen
        ("d%s=%j", field._prop, field.typeDefault); // also messages (=null)
        }); gen
    ("}");
    } gen
    ("for(var ks=Object.keys(m),i=0;i<ks.length;++i){")
        ("switch(ks[i]){");
    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i],
            prop  = field._prop; gen
        ("case%j:", field.name);
        if (field.map) { gen
            ("if(m%s&&m%s!==util.emptyObject){", prop, prop)
                ("d%s={}", prop)
                ("for(var ks2=Object.keys(m%s),j=0;j<ks2.length;++j){", prop);
            genValuePartial_toObject(gen, field, i, prop + "[ks2[j]]")
                ("}")
            ("}");
        } else if (field.repeated) { gen
            ("if(m%s.length){", prop)
                ("d%s=[]", prop)
                ("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(gen, field, i, prop + "[j]")
                ("}")
            ("}");
        } else { gen
            ("if(m%s!==undefined&&m%s!==null){", prop, prop);
            genValuePartial_toObject(gen, field, i, prop)
            ("}");
        } gen
            ("break");
    }
    return gen
        ("}")
    ("}")
    ("return d");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};
