"use strict";
module.exports = Encoder;

var Enum   = require("./enum"),
    Writer = require("./writer"),
    types  = require("./types"),
    util   = require("./util");

/**
 * Constructs a new encoder for the specified message type.
 * @classdesc Wire format encoder using code generation on top of reflection
 * @constructor
 * @param {Type} type Message type
 */
function Encoder(type) {

    /**
     * Message type.
     * @type {Type}
     */
    this.type = type;
}

/** @alias Encoder.prototype */
var EncoderPrototype = Encoder.prototype;

// This is here to mimic Type so that fallback functions work without having to bind()
Object.defineProperties(EncoderPrototype, {

    /**
     * Fields of this encoder's message type as an array for iteration.
     * @name Encoder#fieldsArray
     * @type {Field[]}
     * @readonly
     */
    fieldsArray: {
        get: function() {
            return this.type.fieldsArray;
        }
    }
});

/**
 * Encodes a message of this encoder's message type.
 * @param {Prototype|Object} message Runtime message or plain object to encode
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
EncoderPrototype.encode = function encode_fallback(message, writer) { // codegen reference and fallback
    /* eslint-disable block-scoped-var, no-redeclare */
    if (!writer)
        writer = Writer();
    var fields = this.fieldsArray, fi = 0;
    while (fi < fields.length) {
        var field    = fields[fi++].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.basic[type];

        // Map fields
        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            var value, keys;
            if ((value = message[field.name]) && (keys = Object.keys(value)).length) {
                writer.fork();
                for (var i = 0; i < keys.length; ++i) {
                    writer.tag(1, types.mapKey[keyType])[keyType](keys[i]);
                    if (wireType !== undefined)
                        writer.tag(2, wireType)[type](value[keys[i]]);
                    else
                        field.resolvedType.encode(value[keys[i]], writer.tag(2,2).fork()).ldelim();
                }
                writer.ldelim(field.id);
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
                            writer.tag(field.id, wireType)[type](values[i++]);
                    else
                        while (i < values.length)
                            field.resolvedType.encode(values[i++], writer.tag(field.id,2).fork()).ldelim();
                }

            }

        // Non-repeated
        } else {
            var value = message[field.name];
            if (field.required || value !== undefined && field.long ? util.longNeq(value, field.defaultValue) : value !== field.defaultValue) {
                if (wireType !== undefined)
                    writer.tag(field.id, wireType)[type](value);
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
};

/**
 * Generates an encoder specific to this encoder's message type.
 * @returns {function} Encoder function with an identical signature to {@link Encoder#encode}
 */
EncoderPrototype.generate = function generate() {
    /* eslint-disable no-unexpected-multiline */
    var fields = this.type.fieldsArray;
    var gen = util.codegen("m", "w")
    ("w||(w=Writer())");

    for (var i = 0; i < fields.length; ++i) {
        var field    = fields[i].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.basic[type],
            prop     = util.safeProp(field.name);
        
        // Map fields
        if (field.map) {
            var keyType     = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType,
                keyWireType = types.mapKey[keyType];
            gen

    ("if(m%s){", prop)
        ("w.fork()")
        ("for(var i=0,ks=Object.keys(m%s);i<ks.length;++i){", prop)
            ("w.tag(1,%d).%s(ks[i])", keyWireType, keyType);

            if (wireType !== undefined) gen

            ("w.tag(2,%d).%s(m%s[ks[i]])", wireType, type, prop);

            else gen
            
            ("types[%d].encode(m%s[ks[i]],w.tag(2,2).fork()).ldelim()", i, prop);

            gen
        ("}")
        ("w.len&&w.ldelim(%d)||w.reset()", field.id)
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
            ("w.tag(%d,%d).%s(m%s[i])", field.id, wireType, type, prop);
                else gen
            ("types[%d].encode(m%s[i],w.tag(%d,2).fork()).ldelim()", i, prop, field.id);

            }

        // Non-repeated
        } else {
            if (!field.required) {

                if (field.long) gen
    ("if(m%s!==undefined&&util.longNeq(m%s,%j))", prop, prop, field.defaultValue);
                else gen
    ("if(m%s!==undefined&&m%s!==%j)", prop, prop, field.defaultValue);

            }

            if (wireType !== undefined) gen

        ("w.tag(%d,%d).%s(m%s)", field.id, wireType, type, prop);

            else if (field.required) gen
            
        ("types[%d].encode(m%s,w.tag(%d,2).fork()).ldelim()", i, prop, field.id);
        
            else gen

        ("types[%d].encode(m%s,w.fork()).len&&w.ldelim(%d)||w.reset()", i, prop, field.id);
    
        }
    }
    return gen
    ("return w")

    .eof(this.type.fullName + "$encode", {
        Writer : Writer,
        types  : fields.map(function(fld) { return fld.resolvedType; }),
        util   : util
    });
    /* eslint-enable no-unexpected-multiline */
};
