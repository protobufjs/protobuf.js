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
 * @param {string} propName Property reference by name
 * @param {string} dQual Property qualification for the d object we generate
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_fromObject(gen, field, fieldIndex, propName, dQual) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) { gen
            ("switch(d%s){", dQual);
            for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
                if (field.repeated && values[keys[i]] === field.typeDefault) gen
                ("default:");
                gen
                ("case%j:", keys[i])
                ("case %i:", values[keys[i]])
                    ("m%s=%j", propName, values[keys[i]])
                    ("break");
            } gen
            ("}");
        } else gen
            ("if(typeof d%s!==\"object\")", dQual)
                ("throw TypeError(%j)", field.fullName + ": object expected")
            ("m%s=types[%i].fromObject(d%s, k)", propName, fieldIndex, dQual);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "double":
            case "float": gen
                ("m%s=Number(d%s)", propName, dQual); // also catches "NaN", "Infinity"
                break;
            case "uint32":
            case "fixed32": gen
                ("m%s=d%s>>>0", propName, dQual);
                break;
            case "int32":
            case "sint32":
            case "sfixed32": gen
                ("m%s=d%s|0", propName, dQual);
                break;
            case "uint64":
                isUnsigned = true;
            // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
                ("if(util.Long)")
                    ("(m%s=util.Long.fromValue(d%s)).unsigned=%j", propName, dQual, isUnsigned)
                ("else if(typeof d%s===\"string\")", dQual)
                    ("m%s=parseInt(d%s,10)", propName, dQual)
                ("else if(typeof d%s===\"number\")", dQual)
                    ("m%s=d%s", propName, dQual)
                ("else if(typeof d%s===\"object\")", dQual)
                    ("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", propName, dQual, dQual, isUnsigned ? "true" : "");
                break;
            case "bytes": gen
                ("if(typeof d%s===\"string\")", dQual)
                    ("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", propName, dQual, dQual)
                ("else if(d%s.length)", dQual)
                    ("m%s=d%s", propName, dQual);
                break;
            case "string": gen
                ("m%s=String(d%s)", propName, dQual);
                break;
            case "bool": gen
                ("m%s=Boolean(d%s)", propName, dQual);
                break;
            /* default: gen
                ("m%s=d%s", propName, dQual);
                break; */
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a converter able to produce an object using fields id as keys
 * @param {Codegen} gen Codegen instance
 * @param {Array<Field>} fields Reflected fields
 * @param {Boolean=} useId use id to qualify the fields
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function generate_fromObject(gen, fields, useId) {
    for (var i = 0; i < fields.length; ++i) {
        var field  = fields[i].resolve(),
            propName  = util.safeProp(field.name),
            dQual = useId ? util.safeProp(field.id) : propName;

        // Map fields
        if (field.map) { gen
    ("if(d%s){", dQual)
        ("if(typeof d%s!==\"object\")", dQual)
            ("throw TypeError(%j)", field.fullName + ": object expected")
        ("m%s={}", propName)
        ("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", dQual);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, propName + "[ks[i]]", dQual + "[ks[i]]")
        ("}")
    ("}");

            // Repeated fields
        } else if (field.repeated) { gen
    ("if(d%s){", dQual)
        ("if(!Array.isArray(d%s))", dQual)
            ("throw TypeError(%j)", field.fullName + ": array expected")
        ("m%s=[]", propName)
        ("for(var i=0;i<d%s.length;++i){", dQual);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, propName + "[i]", dQual + "[i]")
        ("}")
    ("}");

            // Non-repeated fields
        } else {
            if (!(field.resolvedType instanceof Enum)) gen // no need to test for null/undefined if an enum (uses switch)
    ("if(d%s!=null){", dQual); // !== undefined && !== null
        genValuePartial_fromObject(gen, field, /* not sorted */ i, propName, dQual);
            if (!(field.resolvedType instanceof Enum)) gen
    ("}");
        }
    }
    return gen;
}
/**
 * Generates a plain object to runtime message converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.fromObject = function fromObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray;
    var gen = util.codegen(["d", "k"], mtype.name + "$fromObject")
    ("if(d instanceof this.ctor)")
        ("return d");
    if (!fields.length) return gen
    ("return new this.ctor");
    gen
    ("var m=new this.ctor")
    ("if(!!k){");
        generate_fromObject(gen, fields, true)
    ("}else{");
        generate_fromObject(gen, fields)
    ("}");
    return gen
    ("return m");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};

/**
 * Generates a partial value toObject converter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} propName Property reference by its name
 * @param {string} dQual Property qualification for the d object we generate
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_toObject(gen, field, fieldIndex, propName, dQual) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) gen
        ("d%s=o.enums===String?types[%i].values[m%s]:m%s", dQual, fieldIndex, propName, propName);
        else gen
        ("d%s=types[%i].toObject(m%s,o)", dQual, fieldIndex, propName);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "double":
            case "float": gen
            ("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", dQual, propName, propName, propName);
                break;
            case "uint64":
                isUnsigned = true;
            // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
            ("if(typeof m%s===\"number\")", propName)
                ("d%s=o.longs===String?String(m%s):m%s", dQual, propName, propName)
            ("else") // Long-like
                ("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", dQual, propName, propName, propName, isUnsigned ? "true": "", propName);
                break;
            case "bytes": gen
            ("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", dQual, propName, propName, propName, propName);
                break;
            default: gen
            ("d%s=m%s", dQual, propName);
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a converter able to produce an object using fields id as keys
 * @param {Codegen} gen Codegen instance
 * @param {Type} mtype Message type
 * @param {Array<Field>} fields Reflected fields
 * @param {Boolean=} useId use id to qualify the fields
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function generate_toObject(gen, mtype, fields, useId){
    var repeatedFields = [],
        mapFields = [],
        normalFields = [],
        i = 0,
        attr = useId ? "id" : "name";

    for (; i < fields.length; ++i)
        if (!fields[i].partOf)
            ( fields[i].resolve().repeated ? repeatedFields
                : fields[i].map ? mapFields
                    : normalFields).push(fields[i]);

    if (repeatedFields.length) { gen
    ("if(o.arrays||o.defaults){");
        for (i = 0; i < repeatedFields.length; ++i) gen
        ("d%s=[]", util.safeProp(repeatedFields[i][attr]));
        gen
        ("}");
    }

    if (mapFields.length) { gen
    ("if(o.objects||o.defaults){");
        for (i = 0; i < mapFields.length; ++i) gen
        ("d%s={}", util.safeProp(repeatedFields[i][attr]));
        gen
        ("}");
    }

    if (normalFields.length) { gen
    ("if(o.defaults){");
        for (i = 0; i < normalFields.length; ++i) {
            var field = normalFields[i],
                prop = useId ? util.safeProp(field.id) : util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen
            ("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
            else if (field.long) gen
            ("if(util.Long){")
            ("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)
            ("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)
            ("}else")
            ("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
            else if (field.bytes) {
                var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
                gen
                ("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))
                ("else{")
                ("d%s=%s", prop, arrayDefault)
                ("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)
                ("}");
            } else gen
            ("d%s=%j", prop, field.typeDefault); // also messages (=null)
        } gen
        ("}");
    }
    var hasKs2 = false;
    for (i = 0; i < fields.length; ++i) {
        var field = fields[i],
            index = mtype._fieldsArray.indexOf(field),
            propName  = util.safeProp(field.name),
            dQual = useId ? util.safeProp(field.id) : propName;
        if (field.map) {
            if (!hasKs2) { hasKs2 = true; gen
            ("var ks2");
            } gen
            ("if(m%s&&(ks2=Object.keys(m%s)).length){", propName, propName)
            ("d%s={}", dQual)
            ("for(var j=0;j<ks2.length;++j){");
            genValuePartial_toObject(gen, field, /* sorted */ index, propName + "[ks2[j]]", dQual + "[ks2[j]]")
            ("}");
        } else if (field.repeated) { gen
        ("if(m%s&&m%s.length){", propName, propName)
        ("d%s=[]", dQual)
        ("for(var j=0;j<m%s.length;++j){", propName);
            genValuePartial_toObject(gen, field, /* sorted */ index, propName + "[j]", dQual + "[j]")
            ("}");
        } else { gen
        ("if(m%s!=null&&m.hasOwnProperty(%j)){", propName, field.name); // !== undefined && !== null
            genValuePartial_toObject(gen, field, /* sorted */ index, propName, dQual);
            if (field.partOf) gen
            ("if(o.oneofs)")
            ("d%s=%j", util.safeProp(field.partOf.name), field.name);
        }
        gen
        ("}");
    }
    return gen;
}

/**
 * Generates a runtime message to plain object converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.toObject = function toObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
    if (!fields.length)
        return util.codegen()("return {}");
    var gen = util.codegen(["m", "o"], mtype.name + "$toObject")
    ("if(!o)")
        ("o={}")
    ("var d={}");

    gen
    ("if(o.useId){");
        generate_toObject(gen, mtype, fields, true)
    ("}  else {");
        generate_toObject(gen, mtype, fields)
    ("}");
    return gen
    ("return d");
};
