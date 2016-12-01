"use strict";

/**
 * Wire format decoder using code generation on top of reflection.
 * @namespace
 */
var decoder = exports;

var Enum   = require("./enum"),
    Reader = require("./reader"),
    types  = require("./types"),
    util   = require("./util");

/**
 * Decodes a message of `this` message's type.
 * @param {Reader} reader Reader to decode from
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Prototype} Populated runtime message
 * @this Type
 */
decoder.fallback = function fallback(reader, length) {
    /* eslint-disable no-invalid-this, block-scoped-var, no-redeclare */
    var fields  = this.getFieldsById(),
        reader  = reader instanceof Reader ? reader : Reader(reader),
        limit   = length === undefined ? reader.len : reader.pos + length,
        message = new (this.getCtor())();
    while (reader.pos < limit) {
        var tag      = reader.tag(),
            field    = fields[tag.id].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type;
        
        // Known fields
        if (field) {

            // Map fields
            if (field.map) {
                var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType,
                    length  = reader.uint32();
                var map = message[field.name] = {};
                if (length) {
                    length += reader.pos;
                    var ks = [], vs = [];
                    while (reader.pos < length) {
                        if (reader.tag().id === 1)
                            ks[ks.length] = reader[keyType]();
                        else if (types.basic[type] !== undefined)
                            vs[vs.length] = reader[type]();
                        else
                            vs[vs.length] = field.resolvedType.decode(reader, reader.uint32());
                    }
                    for (var i = 0; i < ks.length; ++i)
                        map[typeof ks[i] === 'object' ? util.longToHash(ks[i]) : ks[i]] = vs[i];
                }

            // Repeated fields
            } else if (field.repeated) {
                var values = message[field.name] || (message[field.name] = []);

                // Packed
                if (field.packed && types.packed[type] !== undefined && tag.wireType === 2) {
                    var plimit = reader.uint32() + reader.pos;
                    while (reader.pos < plimit)
                        values[values.length] = reader[type]();

                // Non-packed
                } else if (types.basic[type] !== undefined)
                    values[values.length] = reader[type]();
                  else
                    values[values.length] = field.resolvedType.decode(reader, reader.uint32());

            // Non-repeated
            } else if (types.basic[type] !== undefined)
                message[field.name] = reader[type]();
              else
                message[field.name] = field.resolvedType.decode(reader, reader.uint32());

        // Unknown fields
        } else
            reader.skipType(tag.wireType);
    }
    return message;
    /* eslint-enable no-invalid-this, block-scoped-var, no-redeclare */
};

/**
 * Generates a decoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {util.CodegenAppender} Unscoped codegen instance
 */
decoder.generate = function generate(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var fields = mtype.getFieldsArray();    
    var gen = util.codegen("r", "l")

    ("r instanceof Reader||(r=Reader(r))")
    ("var c=l===undefined?r.len:r.pos+l,m=new(this.getCtor())")
    ("while(r.pos<c){")
        ("var t=r.tag()")
        ("switch(t.id){");
    
    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            type  = field.resolvedType instanceof Enum ? "uint32" : field.type,
            prop  = util.safeProp(field.name);
        gen
            ("case %d:", field.id);

        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            gen
                ("var n=r.uint32(),o={}")
                ("if(n){")
                    ("n+=r.pos")
                    ("var k=[],v=[]")
                    ("while(r.pos<n){")
                        ("if(r.tag().id===1)")
                            ("k[k.length]=r.%s()", keyType);

                        if (types.basic[type] !== undefined) gen

                        ("else")
                            ("v[v.length]=r.%s()", type);

                        else gen

                        ("else")
                            ("v[v.length]=types[%d].decode(r,r.uint32())", i, i);
                    gen
                    ("}")
                    ("for(var i=0;i<k.length;++i)")
                        ("o[typeof(k[i])==='object'?util.longToHash(k[i]):k[i]]=v[i]")
                ("}")
                ("m%s=o", prop);

        } else if (field.repeated) { gen

                ("m%s||(m%s=[])", prop, prop);

            if (field.packed && types.packed[type] !== undefined) { gen

                ("if(t.wireType===2){")
                    ("var e=r.uint32()+r.pos")
                    ("while(r.pos<e)")
                        ("m%s[m%s.length]=r.%s()", prop, prop, type)
                ("}else");
            }

            if (types.basic[type] !== undefined) gen

                    ("m%s[m%s.length]=r.%s()", prop, prop, type);

            else gen

                    ("m%s[m%s.length]=types[%d].decode(r,r.uint32())", prop, prop, i, i);

        } else if (types.basic[type] !== undefined) { gen

                ("m%s=r.%s()", prop, type);

        } else { gen

                ("m%s=types[%d].decode(r,r.uint32())", prop, i, i);

        } gen
                ("break");
    } return gen
            ("default:")
                ("r.skipType(t.wireType)")
                ("break")
        ("}")
    ("}")
    ("return m");
    /* eslint-enable no-unexpected-multiline */
};
