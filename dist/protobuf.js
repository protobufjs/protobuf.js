/*!
 * protobuf.js v6.0.0-dev (c) 2016 Daniel Wirtz
 * Compiled Thu, 10 Nov 2016 00:16:49 UTC
 * Licensed under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/protobuf.js for details
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
ieee754 Copyright (c) 2008, Fair Oaks Labs, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

 * Neither the name of Fair Oaks Labs, Inc. nor the names of its contributors
   may be used to endorse or promote products derived from this software
   without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
*/
// ref: https://github.com/feross/ieee754 - parked here to include the license

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
    var e, m
    var eLen = nBytes * 8 - mLen - 1
    var eMax = (1 << eLen) - 1
    var eBias = eMax >> 1
    var nBits = -7
    var i = isLE ? (nBytes - 1) : 0
    var d = isLE ? -1 : 1
    var s = buffer[offset + i]

    i += d

    e = s & ((1 << (-nBits)) - 1)
    s >>= (-nBits)
    nBits += eLen
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) { }

    m = e & ((1 << (-nBits)) - 1)
    e >>= (-nBits)
    nBits += mLen
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) { }

    if (e === 0) {
        e = 1 - eBias
    } else if (e === eMax) {
        return m ? NaN : ((s ? -1 : 1) * Infinity)
    } else {
        m = m + Math.pow(2, mLen)
        e = e - eBias
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c
    var eLen = nBytes * 8 - mLen - 1
    var eMax = (1 << eLen) - 1
    var eBias = eMax >> 1
    var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
    var i = isLE ? 0 : (nBytes - 1)
    var d = isLE ? 1 : -1
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

    value = Math.abs(value)

    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0
        e = eMax
    } else {
        e = Math.floor(Math.log(value) / Math.LN2)
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--
            c *= 2
        }
        if (e + eBias >= 1) {
            value += rt / c
        } else {
            value += rt * Math.pow(2, 1 - eBias)
        }
        if (value * c >= 2) {
            e++
            c /= 2
        }

        if (e + eBias >= eMax) {
            m = 0
            e = eMax
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen)
            e = e + eBias
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
            e = 0
        }
    }

    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) { }

    e = (e << mLen) | m
    eLen += mLen
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) { }

    buffer[offset + i - d] |= s * 128
}

},{}],2:[function(require,module,exports){
module.exports = codegen;

/**
 * Whether code generation is supported by the environment.
 * @type {boolean}
 */
codegen.supported = false;
try { codegen.supported = codegen("a","b")("return a-b").eof()(2,1) === 1; } catch (e) {} // eslint-disable-line no-empty

/**
 * When set to true, codegen will log generated code to console. Useful for debugging.
 * @type {boolean}
 */
codegen.verbose = false;

/**
 * Programmatically generates a function. When done appending code, call `eof()` on the Appender
 * to generate the actual function.
 * @param {...string} params Function parameter names
 * @returns {function} Appender function similar to `util.format` known from node
 * @see {@link https://nodejs.org/docs/latest/api/util.html#util_util_format_format_args}
 */
function codegen(/* varargs */) {
    var args   = Array.prototype.slice.call(arguments),
        src    = [],
        indent = 1;

    // Appends a formatted line to the generated source
    function gen(format/*, varargs */) {
        var params = Array.prototype.slice.call(arguments, 1),
            index  = 0;
        var line = format.replace(/%([djs])/g, function($0, $1) {
            var param = params[index++];
            return $1 === "j"
                ? JSON.stringify(param)
                : String(param);
        });
        var level = indent;
        if (src.length) {
            var prev = src[src.length - 1];
            if (/[\{\[\:]$/.test(prev)) // block open before (increment and keep)
                level = ++indent;
            else if (/^\s*(?:if|else if|while|for)\b|\b(?:else)\s*$/.test(prev)) // branch without block before (increment once)
                ++level;
            else if (/(?:break|continue);$/.test(prev)) // control flow before (decrement and keep)
                level = --indent;
            
            if (/^[\}\]]/.test(line)) // block close on line (decrement and keep)
                level = --indent;
        }
        for (index = 0; index < level; ++index)
            line = "    " + line;
        src.push(line);
        return gen;
    }

    // Converts the so far generated source to a string
    gen.toString = function toString(name) {
        return "function " + (name ? name.replace(/[^\w_$]/g, "_") : "") + "(" + args.join(", ") + ") {\n" + src.join("\n") + "\n}";
    };

    // Ends generation
    gen.eof = function eof(name) {
        var code = gen.toString(name);
        if (codegen.verbose)
            console.log("--- codegen ---\n" + code.replace(/^/mg, "> ")); // eslint-disable-line no-console
        return new Function("return " + code + ";")(); // eslint-disable-line no-new-func
    };

    return gen;
}

},{}],3:[function(require,module,exports){
module.exports = Decoder;

var Enum    = require("./enum"),
    codegen = require("./codegen"),
    types   = require("./types"),
    util    = require("./util");

/**
 * Wire format decoder using code generation on top of reflection.
 * @constructor
 * @param {Type} type Message type
 */
function Decoder(type) {
    this.type = type;
}

/** @alias Decoder.prototype */
var DecoderPrototype = Decoder.prototype;

/**
 * Decodes a message of this decoder's message type.
 * @param {Reader} reader Reader to decode from
 * @param {Prototype} message Runtime message to populate
 * @param {number} limit Maximum read offset
 * @returns {Prototype} Populated runtime message
 */
DecoderPrototype.decode = function decode(reader, message, limit) { // codegen reference and fallback
    /* eslint-disable no-invalid-this, block-scoped-var, no-redeclare */
    var fieldsById = this.type.fieldsById;
    while (reader.pos < limit) {
        var tag      = reader.tag(),
            field    = fieldsById[tag.id],
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.wireTypes[type];
        
        // Known fields
        if (field) {

            // Map fields
            if (field.map) {

                var keyType = field.resolve().resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType,
                    length  = reader.uint32(),
                    map     = {};
                if (length) {
                    length += reader.pos;
                    var keys = [], values = [], ki = 0, vi = 0;
                    while (reader.pos < length) {
                        if (reader.tag().id === 1)
                            keys[ki++] = reader[keyType]();
                        else if (wireType !== undefined)
                            values[vi++] = reader[type]();
                        else {
                            var resolvedType = field.resolvedType;
                            values[vi++] = resolvedType.decodeDelimited_(reader, resolvedType.create_());
                        }
                    }
                    var key;
                    for (ki = 0; ki < vi; ++ki)
                        map[typeof (key = keys[ki]) === 'object' ? util.toHash(key) : key] = values[ki];
                }
                message[field.name] = map;

            // Repeated fields
            } else if (field.repeated) {

                var values   = message[field.name],
                    length   = values.length,
                    packType = types.packableWireTypes[type];

                // Packed
                if (field.packed && tag.wireType === packType) {
                    var plimit = reader.uint32() + reader.pos;
                    while (reader.pos < plimit)
                        values[length++] = reader[type]();

                // Non-packed
                } else if (wireType !== undefined) {
                    values[length++] = reader[type]();
                } else {
                    var resolvedType = field.resolvedType;
                    values[length++] = resolvedType.decodeDelimited_(reader, resolvedType.create_());
                }

            // Non-repeated
            } else if (wireType !== undefined) {
                message[field.name] = reader[type]();
            } else {
                var resolvedType = field.resolvedType;
                message[field.name] = resolvedType.decodeDelimited_(reader, resolvedType.create_());
            }

        // Unknown fields
        } else
            reader.skipType(tag.wireType);
    }
    return message;
    /* eslint-enable no-invalid-this, block-scoped-var, no-redeclare */
};

/**
 * Generates a decoder specific to this decoder's message type.
 * @returns {function} Decoder function with an identical signature to {@link Decoder#decode}
 */
DecoderPrototype.generate = function generate() {
    /* eslint-disable no-unexpected-multiline */
    var fieldsArray = this.type.fieldsArray,
        fieldsCount = fieldsArray.length;
    
    var gen = codegen("$resolvedTypes", "$toHash", "reader", "message", "limit")

    ('"use strict";')
    ("while (reader.pos < limit) {")
        ("var tag = reader.tag();")
        ("switch (tag.id) {");
    
    for (var i = 0; i < fieldsCount; ++i) {
        var field    = fieldsArray[i].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.wireTypes[type],
            packType = types.packableWireTypes[type];
        gen
            ("case %d:", field.id);

        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType;
            gen
                ("var length = reader.uint32(), map = {};")
                ("if (length) {")
                    ("length += reader.pos;")
                    ("var keys = [], values = [], ki = 0, vi = 0;")
                    ("while (reader.pos < length) {")
                        ("if (reader.tag().id === 1)")
                            ("keys[ki++] = reader.%s();", keyType);
                        if (wireType !== undefined) gen
                        ("else")
                            ("values[vi++] = reader.%s();", type);
                        else gen
                        ("else {")
                            ("var type = $resolvedTypes[%d];", i)
                            ("values[vi++] = type.decodeDelimited_(reader, type.create_());")
                        ("}");
                    gen
                    ("}")
                    ("var key;")
                    ("for (ki = 0; ki < vi; ++ki)")
                        ("map[typeof (key = keys[ki]) === 'object' ? $toHash(key) : key] = values[ki];")
                ("}")
                ("message[%j] = map;", field.name);

        } else if (field.repeated) { gen

                ("var values = message[%j], length = values.length;", field.name);

            if (field.packed && packType !== undefined) { gen

                ("if (tag.wireType === %d) {", packType)
                    ("var plimit = reader.uint32() + reader.pos;")
                    ("while (reader.pos < plimit)")
                        ("values[length++] = reader.%s();", type)
                ("} else {");

            }

            if (wireType !== undefined) gen

                    ("values[length++] = reader.%s();", type);

            else gen

                    ("var type = $resolvedTypes[%d];", i)
                    ("values[length++] = type.decodeDelimited_(reader, type.create_());");

            if (field.packed && packType !== undefined) gen

                ("}");

        } else if (wireType !== undefined) { gen

                ("message[%j] = reader.%s();", field.name, type);

        } else { gen

                ("var type = $resolvedTypes[%d];", i)
                ("message[%j] = type.decodeDelimited_(reader, type.create_());", field.name);

        } gen
                ("break;");
    } gen
            ("default:")
                ("reader.skipType(tag.wireType);")
                ("break;")
        ("}")
    ("}")
    ("return message;");
    return gen.eof(this.type.fullName + "$decode").bind(this.type, fieldsArray.map(function(fld) { return fld.resolvedType; }), util.toHash);
    /* eslint-enable no-unexpected-multiline */
};

},{"./codegen":2,"./enum":5,"./types":22,"./util":23}],4:[function(require,module,exports){
module.exports = Encoder;

var Enum    = require("./enum"),
    types   = require("./types"),
    codegen = require("./codegen");

/**
 * Wire format encoder using code generation on top of reflection.
 * @constructor
 * @param {Type} type Message type
 */
function Encoder(type) {
    this.type = type;
}

/** @alias Encoder.prototype */
var EncoderPrototype = Encoder.prototype;

/**
 * Encodes a message of this encoder's message type.
 * @param {Prototype|Object} message Runtime message or plain object to encode
 * @param {Writer} writer Writer to encode to
 * @returns {Writer} writer
 */
EncoderPrototype.encode = function encode(message, writer) { // codegen reference and fallback
    /* eslint-disable no-invalid-this, block-scoped-var, no-redeclare */
    var fieldsArray = this.type.fieldsArray,
        fieldsCount = fieldsArray.length;

    for (var fi = 0; fi < fieldsCount; ++fi) {
        var field    = fieldsArray[fi].resolve(),
            type     = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.wireTypes[type];

        // Map fields
        if (field.map) {
            var keyType     = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType,
                keyWireType = types.mapKeyWireTypes[keyType];
            var value, keys;
            if ((value = message[field.name]) && (keys = Object.keys(value)).length) {
                writer.tag(field.id, 2).fork();
                for (var i = 0, k = keys.length, key; i < k; ++i) {
                    writer.tag(1, keyWireType)[keyType](key = keys[i]);
                    if (wireType !== undefined)
                        writer.tag(2, wireType)[type](value[key]);
                    else
                        field.resolvedType.encodeDelimited_(value[key], writer.tag(2, 2));
                }
                writer.bytes(writer.finish());
            }

        // Repeated fields
        } else if (field.repeated) {
            var values = message[field.name], i = 0, k = values.length;

            // Packed repeated
            if (field.packed && types.packableWireTypes[type] !== undefined) {
                writer.fork();
                while (i < k)
                    writer[type](values[i++]);
                var buffer = writer.finish();
                if (buffer.length)
                    writer.tag(field.id, 2).bytes(buffer);

            // Non-packed
            } else {
                while (i < k)
                    field.resolvedType.encodeDelimited_(values[i++], writer.tag(field.id, 2));
            }

        // Non-repeated
        } else {
            var value = message[field.name];
            if (field.required || value != field.defaultValue) { // eslint-disable-line eqeqeq
                if (wireType !== undefined)
                    writer.tag(field.id, wireType)[type](value);
                else
                    field.resolvedType.encodeDelimited_(value, writer.tag(field.id, 2));
            }
        }
    }
    return writer;
    /* eslint-enable no-invalid-this, block-scoped-var, no-redeclare */
};

/**
 * Generates an encoder specific to this encoder's message type.
 * @returns {function} Encoder function with an identical signature to {@link Encoder#encode}
 */
EncoderPrototype.generate = function generate() {
    /* eslint-disable no-unexpected-multiline */
    var fieldsArray = this.type.fieldsArray,
        fieldsCount = fieldsArray.length;
    var gen = codegen("$resolvedTypes", "message", "writer")

    ('"use strict";');
    
    for (var i = 0; i < fieldsCount; ++i) {
        var field = fieldsArray[i].resolve();
        var type = field.resolvedType instanceof Enum ? "uint32" : field.type,
            wireType = types.wireTypes[type];
        
        // Map fields
        if (field.map) {
            var keyType = field.resolvedKeyType /* only valid is enum */ ? "uint32" : field.keyType,
                keyWireType = types.mapKeyWireTypes[keyType];
            gen

    ("var value = message[%j], keys;", field.name)
    ("if (value && (keys = Object.keys(value)).length) {")
        ("writer.tag(%d, 2).fork();", field.id)
        ("for (var i = 0, k = keys.length, key; i < k; ++i) {")
            ("writer.tag(1, %d).%s(key = keys[i]);", keyWireType, keyType);
            if (wireType !== undefined) gen
            ("writer.tag(2, %d).%s(value[key]);", wireType, type);
            else gen
            ("$resolvedTypes[%d].encodeDelimited_(value[key], writer.tag(2, 2));", i);
            gen
        ("}")
        ("writer.bytes(writer.finish());")
    ("}");

        // Repeated fields
        } else if (field.repeated) { gen

    ("var values = message[%j], i = 0, k = values.length;", field.name);

            // Packed repeated
            if (field.packed && types.packableWireTypes[type] !== undefined) { gen

    ("writer.fork();")
    ("while (i < k)")
        ("writer.%s(values[i++]);", type)
    ("var buffer = writer.finish();")
    ("if (buffer.length)")
        ("writer.tag(%d, 2).bytes(buffer);", field.id);

            // Non-packed
            } else { gen

    ("while (i < k)")
        ("$resolvedTypes[%d].encodeDelimited_(values[i++], writer.tag(%d, 2));", i, field.id);

            }

        // Non-repeated
        } else {

            if (field.required) {

                if (wireType !== undefined) gen
    ("writer.tag(%d, %d).%s(message[%j]);", field.id, wireType, type, field.name);
                else gen
    ("$resolvedTypes[%d].encodeDelimited_(message[%j], writer.tag(%d, 2));", i, field.name, field.id);

            } else { gen

    ("var value = message[%j];", field.name);

                if (wireType !== undefined) gen
    ("if (value != %j)", field.defaultValue)
        ("writer.tag(%d, %d).%s(value);", field.id, wireType, type);
                else gen
    ("if (value != %j) {", field.defaultValue)
        ("$resolvedTypes[%d].encodeDelimited_(value, writer.tag(%d, 2));", i, field.id)
    ("}");

            }
    
        }
    }
    return gen
    ("return writer;")
    .eof(this.type.fullName + "$encode")
    .bind(this.type, fieldsArray.map(function(fld) { return fld.resolvedType; }));
    /* eslint-enable no-unexpected-multiline */
};

},{"./codegen":2,"./enum":5,"./types":22}],5:[function(require,module,exports){
module.exports = Enum;

var ReflectionObject = require("./object");
/** @alias Enum.prototype */
var EnumPrototype = ReflectionObject.extend(Enum, [ "values" ]);

var util = require("./util");

/**
 * Reflected enum.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {Object.<string,number>} [values] Enum values as an object, by name
 * @param {Object.<string,*>} [options] Enum options
 */
function Enum(name, values, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Enum values by name.
     * @type {Object.<string,number>}
     */
    this.values = values || {}; // exposed, marker

    /**
     * Cached values by id.
     * @type {?Object.<number,string>}
     * @private
     */
    this._valuesById = null;
}

Object.defineProperties(EnumPrototype, {

    /**
     * Enum values by id.
     * @name Enum#valuesById
     * @type {Object.<number,string>}
     * @readonly
     */
    valuesById: {
        get: function() {
            if (!this._valuesById) {
                this._valuesById = {};
                Object.keys(this.values).forEach(function(name) {
                    var id = this.values[name];
                    if (this._valuesById[id])
                        throw Error("duplicate id " + id + " in " + this);
                    this._valuesById[id] = name;
                }, this);
            }
            return this._valuesById;
        }
    }

});

/**
 * Tests if the specified JSON object describes an enum.
 * @param {*} json JSON object to test
 * @returns {boolean} `true` if the object describes an enum
 */
Enum.testJSON = function testJSON(json) {
    return Boolean(json && json.values);
};

/**
 * Creates an enum from JSON.
 * @param {string} name Enum name
 * @param {Object.<string,*>} json JSON object
 * @returns {Enum} Created enum
 * @throws {TypeError} If arguments are invalid
 */
Enum.fromJSON = function fromJSON(name, json) {
    return new Enum(name, json.values, json.options);
};

/**
 * Adds a value to this enum.
 * @param {string} name Value name
 * @param {number} id Value id
 * @returns {Enum} `this`
 */
EnumPrototype.add = function(name, id) {
    if (!util.isString(name))
        throw util._TypeError("name");
    if (!util.isInteger(id) || id < 0)
        throw util._TypeError("id", "a non-negative integer");
    this.values[name] = id;
    this._valuesById = null;
    return this;
};

/**
 * Removes a value from this enum
 * @param {string} name Value name
 * @returns {Enum} `this`
 */
EnumPrototype.remove = function(name) {
    if (!util.isString(name))
        throw util._TypeError("name");
    delete this.values[name];
    this._valuesById = null;
    return this;
};

},{"./object":12,"./util":23}],6:[function(require,module,exports){
module.exports = Field;

var ReflectionObject = require("./object");
/** @alias Field.prototype */
var FieldPrototype = ReflectionObject.extend(Field, [ "rule", "type", "id", "extend" ]);

var Type      = require("./type"),
    Enum      = require("./enum"),
    types     = require("./types"),
    util      = require("./util");

/**
 * Reflected message field.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Type of the underlying value
 * @param {string} [rule=optional] Field rule
 * @param {string} [extend] Extended type if different from parent
 * @param {Object.<string,*>} [options] Field options
 */
function Field(name, id, type, rule, extend, options) {
    if (util.isObject(rule)) {
        options = rule;
        rule = extend = undefined;
    } else if (util.isObject(extend)) {
        options = extend;
        extend = undefined;
    }
    ReflectionObject.call(this, name, options);
    if (!util.isInteger(id) || id < 0)
        throw util._TypeError("id", "a non-negative integer");
    if (!util.isString(type))
        throw util._TypeError("type");
    if (extend !== undefined && !util.isString(extend))
        throw util._TypeError("extend");
    if (rule !== undefined && !/^required|optional|repeated$/.test(rule = rule.toString().toLowerCase()))
        throw util._TypeError("rule", "a valid rule string");

    /**
     * Field rule, if any.
     * @type {string|undefined}
     */
    this.rule = rule && rule !== 'optional' ? rule : undefined; // exposed

    /**
     * Field type.
     * @type {string}
     */
    this.type = type; // exposed

    /**
     * Unique field id.
     * @type {number}
     */
    this.id = id; // exposed, marker

    /**
     * Extended type if different from parent.
     * @type {string|undefined}
     */
    this.extend = extend || undefined; // exposed

    /**
     * Whether this field is required.
     * @type {boolean}
     */
    this.required = rule === "required";

    /**
     * Whether this field is optional.
     * @type {boolean}
     */
    this.optional = !this.required;

    /**
     * Whether this field is repeated.
     * @type {boolean}
     */
    this.repeated = rule === "repeated";

    /**
     * Whether this field is a map or not.
     * @type {boolean}
     */
    this.map = false;

    /**
     * Message this field belongs to.
     * @type {?Type}
     */
    this.message = null;

    /**
     * OneOf this field belongs to, if any,
     * @type {?OneOf}
     */
    this.partOf = null;

    /**
     * The field's default value. Only relevant when working with proto2.
     * @type {*}
     */
    this.defaultValue = null;

    /**
     * Resolved type if not a basic type.
     * @type {?(Type|Enum)}
     */
    this.resolvedType = null;

    /**
     * Sister-field within the extended type if a declaring extension field.
     * @type {?Field}
     */
    this.extensionField = null;

    /**
     * Sister-field within the declaring namespace if an extended field.
     * @type {?Field}
     */
    this.declaringField = null;

    /**
     * Internally remembers whether this field is packed.
     * @type {?boolean}
     * @private
     */
    this._packed = null;
}

Object.defineProperties(FieldPrototype, {

    /**
     * Determines whether this field is packed. Only relevant when repeated and working with proto2.
     * @name Field#packed
     * @type {boolean}
     * @readonly
     */
    packed: {
        get: function() {
            if (this._packed === null)
                this._packed = this.getOption("packed") !== false;
            return this._packed;
        }
    },

    /**
     * Determines whether this field's type is a long type (64 bit).
     * @name Field#long
     * @type {boolean}
     * @readonly
     */
    long : {
        get: function() {
            return types.longWireTypes[this.type] !== undefined;
        }
    }

});

/**
 * @override
 */
FieldPrototype.setOption = function setOption(name, value, ifNotSet) {
    if (name === "packed")
        this._packed = null;
    return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
};

/**
 * Tests if the specified JSON object describes a field.
 * @param {*} json Any JSON object to test
 * @returns {boolean} `true` if the object describes a field
 */
Field.testJSON = function testJSON(json) {
    return Boolean(json && json.id !== undefined);
};

/**
 * Constructs a field from JSON.
 * @param {string} name Field name
 * @param {Object} json JSON object
 * @returns {Field} Created field
 * @throws {TypeError} If arguments are invalid
 */
Field.fromJSON = function fromJSON(name, json) {
    return new Field(name, json.id, json.type, json.role, json.extend, json.options);
};

/**
 * Resolves this field's type references.
 * @returns {Field} `this`
 * @throws {Error} If any reference cannot be resolved
 */
FieldPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;

    var typeDefault = types.defaults[this.type];

    // if not a basic type, resolve it
    if (typeDefault === undefined) {
        var resolved = this.parent.lookup(this.type);
        if (resolved instanceof Type) {
            this.resolvedType = resolved;
            typeDefault = null;
        } else if (resolved instanceof Enum) {
            this.resolvedType = resolved;
            typeDefault = 0;
        } else
            throw Error("unresolvable field type: " + this.type);
    }

    // when everything is resolved determine the default value
    var optionDefault;
    if (this.map)
        this.defaultValue = {};
    else if (this.repeated)
        this.defaultValue = [];
    else if (this.options && (optionDefault = this.options.default) !== undefined)
        this.defaultValue = optionDefault;
    else
        this.defaultValue = typeDefault;
    
    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Converts a field value to JSON using the specified options. Note that this method does not
 * account for repeated fields and must be called once for each repeated element instead.
 * @param {*} value Field value
 * @param {Object.<string,*>} [options] Conversion options
 * @returns {*} Converted value
 * @see {@link Prototype#asJSON}
 */
FieldPrototype.jsonConvert = function(value, options) {
    if (options) {
        if (this.resolvedType instanceof Enum && options.enum === String)
            return this.resolvedType.valuesById[value];
        else if (types.longWireTypes[this.type] !== undefined && options.long)
            return options.long === Number
                ? typeof value === 'number'
                ? value
                : util.Long.fromValue(value).toNumber()
                : util.Long.fromValue(value, this.type.charAt(0) === 'u').toString();
    }
    return value;
};

},{"./enum":5,"./object":12,"./type":21,"./types":22,"./util":23}],7:[function(require,module,exports){
var protobuf = exports;

var util = require("./util");

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @param {function(?Error, Root=)} [callback] Callback function
 * @param {Object} [ctx] Optional callback context
 * @returns {Promise<Root>|Object} A promise if callback has been omitted, otherwise the protobuf namespace
 * @throws {TypeError} If arguments are invalid
 */
function load(filename, root, callback, ctx) {
    if (typeof root === 'function') {
        ctx = callback;
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback, ctx) || protobuf;
}

protobuf.load = load;

// Parser
protobuf.tokenize         = require("./tokenize");
protobuf.parse            = require("./parse");

// Serialization
protobuf.Writer           = require("./writer");
protobuf.BufferWriter     = protobuf.Writer.BufferWriter;
protobuf.Reader           = require("./reader");
protobuf.BufferReader     = protobuf.Reader.BufferReader;
protobuf.Encoder          = require("./encoder");
protobuf.Decoder          = require("./decoder");

// Reflection
protobuf.ReflectionObject = require("./object");
protobuf.Namespace        = require("./namespace");
protobuf.Root             = require("./root");
protobuf.Type             = require("./type");
protobuf.Field            = require("./field");
protobuf.MapField         = require("./mapfield");
protobuf.Enum             = require("./enum");
protobuf.Service          = require("./service");
protobuf.Method           = require("./method");

// Runtime
protobuf.Prototype        = require("./prototype");
protobuf.inherits         = require("./inherits");

// Utility
protobuf.codegen          = require("./codegen");
protobuf.types            = require("./types");
protobuf.util             = util;

},{"./codegen":2,"./decoder":3,"./encoder":4,"./enum":5,"./field":6,"./inherits":8,"./mapfield":9,"./method":10,"./namespace":11,"./object":12,"./parse":14,"./prototype":15,"./reader":16,"./root":17,"./service":18,"./tokenize":20,"./type":21,"./types":22,"./util":23,"./writer":24}],8:[function(require,module,exports){
module.exports = inherits;

var Prototype = require("./prototype"),
    Type      = require("./type"),
    Reader    = require("./reader"),
    Writer    = require("./writer"),
    util      = require("./util");

/**
 * Inherits a custom class from the message prototype of the specified message type.
 * @param {Function} clazz Inheriting class
 * @param {Type} type Inherited message type
 * @param {Object.<string,*>} [options] Extension options
 * @param {boolean} [options.noStatics=false] Skips adding the default static methods on top of the constructor
 * @param {boolean} [options.noRegister=false] Skips registering the constructor with the reflected type
 * @returns {Prototype} Created prototype
 */
function inherits(clazz, type, options) {
    if (typeof clazz !== 'function')
        throw util._TypeError("clazz", "a function");
    if (!(type instanceof Type))
        throw util._TypeError("type", "a Type");
    if (!options)
        options = {};

    /**
     * This is not an actual type but stands as a reference for any constructor of a custom message class
     * that you pass to the library.
     * @name Class
     * @extends Prototype
     * @constructor
     * @param {Object.<string,*>} [properties] Properties to set on the message
     * @see {@link inherits}
     */

    var classProperties = {
        
        /**
         * Reference to the reflected type.
         * @name Class.$type
         * @type {Type}
         * @readonly
         */
        $type: {
            value: type
        }
    };

    if (!options.noStatics)
        util.merge(classProperties, {

            /**
             * Encodes a message of this type to a buffer.
             * @name Class.encode
             * @function
             * @param {Prototype|Object} message Message to encode
             * @param {Writer} [writer] Optional writer to use
             * @returns {number[]} Encoded message
             */
            encode: {
                value: function encode(message, writer) {
                    return this.$type.encode_(message, writer || Writer()).finish();
                }
            },

            /**
             * Encodes a message of this type preceeded by its length as a varint to a buffer.
             * @name Class.encodeDelimited
             * @function
             * @param {Prototype|Object} message Message to encode
             * @param {Writer} [writer] Optional writer to use
             * @returns {number[]} Encoded message
             */
            encodeDelimited: {
                value: function encodeDelimited(message, writer) {
                    return this.$type.encodeDelimited_(message, writer || Writer()).finish();
                }
            },

            /**
             * Decodes a message of this type from a buffer.
             * @name Class.decode
             * @function
             * @param {number[]} buffer Buffer to decode
             * @returns {Prototype} Decoded message
             */
            decode: {
                value: function decode(buffer) {
                    return this.$type.decode_(Reader(buffer), new this(), buffer.length);
                }
            },

            /**
             * Decodes a message of this type preceeded by its length as a varint from a buffer.
             * @name Class.decodeDelimited
             * @function
             * @param {number[]} buffer Buffer to decode
             * @returns {Prototype} Decoded message
             */
            decodeDelimited: {
                value: function decodeDelimited(buffer) {
                    return this.$type.decodeDelimited_(Reader(buffer), new this(), buffer.length);
                }
            }

        }, true);

    Object.defineProperties(clazz, classProperties);
    var prototype = inherits.defineProperties(new Prototype(), type);
    clazz.prototype = prototype;
    prototype.constructor = clazz;

    if (!options.noRegister)
        type.register(clazz);

    return prototype;
}

/**
 * Defines the reflected type's default values and virtual oneof properties on the specified
 * prototype.
 * @memberof inherits
 * @param {Prototype} prototype Prototype to define properties upon
 * @param {Type} type Reflected message type
 * @returns {Prototype} The specified prototype
 */
inherits.defineProperties = function defineProperties(prototype, type) {

    var prototypeProperties = {

        /**
         * Reference to the reflected type.
         * @name Prototype#$type
         * @type {Type}
         * @readonly
         */
        $type: {
            value: type
        }
    };

    // Initialize default values
    type.fieldsArray.forEach(function(field) {
        prototype[field.name] = field.resolve().defaultValue;
    });

    // Define each oneof with a non-enumerable getter and setter for the present field
    type.oneofsArray.forEach(function(oneof) {
        prototypeProperties[oneof.resolve().name] = {
            get: function() {
                var keys = oneof.oneof;
                for (var i = 0, k = keys.length, key; i < k; ++i) {
                    var field = oneof.parent.fields[key = keys[i]];
                    if (this[key] != field.defaultValue) // eslint-disable-line eqeqeq
                        return key;
                }
                return undefined;
            },
            set: function(value) {
                var keys = oneof.oneof;
                for (var i = 0, k = keys.length, key; i < k; ++i) {
                    if ((key = keys[i]) !== value)
                        delete this[key];
                }
            }
        };
    });

    Object.defineProperties(prototype, prototypeProperties);
    return prototype;
};

},{"./prototype":15,"./reader":16,"./type":21,"./util":23,"./writer":24}],9:[function(require,module,exports){
module.exports = MapField;

var Field = require("./field");
/** @alias MapField.prototype */
var MapFieldPrototype = Field.extend(MapField, [ "keyType" ]);

var Enum    = require("./enum"),
    types   = require("./types"),
    util    = require("./util");

/**
 * Reflected message map field.
 * @extends Field
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string} keyType Key type
 * @param {Object.<string,*>} [options] Field options
 */
function MapField(name, id, type, keyType, options) {
    Field.call(this, name, id, type, options);
    if (!util.isString(keyType))
        throw util._TypeError("keyType");
    
    // Is it worth to improve serialization order here?

    /**
     * Key type.
     * @type {string}
     */
    this.keyType = keyType; // exposed, marker

    /**
     * Resolved key type if not a basic type.
     * @type {?ReflectionObject}
     */
    this.resolvedKeyType = null;

    // Overrides Field#map
    this.map = true;
}

/**
 * Tests if the specified JSON object describes a map field.
 * @param {Object} json JSON object to test
 * @returns {boolean} `true` if the object describes a field
 */
MapField.testJSON = function testJSON(json) {
    return Boolean(json && json.keyType !== undefined);
};

/**
 * Constructs a map field from JSON.
 * @param {string} name Field name
 * @param {Object} json JSON object
 * @returns {MapField} Created map field
 * @throws {TypeError} If arguments are invalid
 */
MapField.fromJSON = function fromJSON(name, json) {
    return new MapField(name, json.id, json.type, json.keyType, json.options);
};

/**
 * @override
 */
MapFieldPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    
    // Besides a value type, map fields have a key type to resolve
    var keyWireType = types.mapKeyWireTypes[this.keyType];
    if (keyWireType === undefined) {
        var resolved = this.parent.lookup(this.keyType);
        if (!(resolved instanceof Enum))
            throw Error("unresolvable map key type: " + this.keyType);
        this.resolvedKeyType = resolved;
    }

    return Field.prototype.resolve.call(this);
};

},{"./enum":5,"./field":6,"./types":22,"./util":23}],10:[function(require,module,exports){
module.exports = Method;

var ReflectionObject = require("./object");
ReflectionObject.extend(Method, [ "type", "requestType", "requestStream", "responseType", "responseStream" ]);

var util = require("./util");

/**
 * Reflected service method.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Method name
 * @param {string} type Usually "rpc"
 * @param {string} requestType Request message type
 * @param {string} responseType Response message type
 * @param {boolean} [requestStream] Whether the request is streamed
 * @param {boolean} [responseStream] Whether the response is streamed
 * @param {Object.<string,*>} [options] Method options
 */
function Method(name, type, requestType, responseType, requestStream, responseStream, options) {
    if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = undefined;
    } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = undefined;
    }
    if (!util.isString(type))
        throw util._TypeError("type");
    if (!util.isString(requestType))
        throw util._TypeError("requestType");
    if (!util.isString(responseType))
        throw util._TypeError("responseType");
    
    ReflectionObject.call(this, name, options);

    /**
     * Method type.
     * @type {string}
     */
    this.type = type || "rpc"; // exposed

    /**
     * Request type.
     * @type {string}
     */
    this.requestType = requestType; // exposed, marker

    /**
     * Whether requests are streamed or not.
     * @type {boolean|undefined}
     */
    this.requestStream = requestStream ? true : undefined; // exposed

    /**
     * Response type.
     * @type {string}
     */
    this.responseType = responseType; // exposed

    /**
     * Whether responses are streamed or not.
     * @type {boolean|undefined}
     */
    this.responseStream = responseStream ? true : undefined; // exposed

    /**
     * Service this method belongs to.
     * @type {?Service}
     */
    this.service = null;
}

/**
 * Tests if the specified JSON object describes a service method.
 * @param {Object} json JSON object
 * @returns {boolean} `true` if the object describes a map field
 */
Method.testJSON = function testJSON(json) {
    return Boolean(json && json.requestType !== undefined);
};

/**
 * Constructs a service method from JSON.
 * @param {string} name Method name
 * @param {Object} json JSON object
 * @returns {Method} Created method
 * @throws {TypeError} If arguments are invalid
 */
Method.fromJSON = function fromJSON(name, json) {
    return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options);
};

},{"./object":12,"./util":23}],11:[function(require,module,exports){
module.exports = Namespace;

var ReflectionObject = require("./object");
/** @alias Namespace.prototype */
var NamespacePrototype = ReflectionObject.extend(Namespace, [ "nested" ]);

var Enum    = require("./enum"),
    Type    = require("./type"),
    Field   = require("./field"),
    Service = require("./service"),
    util    = require("./util");

var nestedTypes = [ Enum, Type, Service, Field, Namespace ],
    nestedError = "one of " + nestedTypes.map(function(ctor) { return ctor.name; }).join(', ');

/**
 * Base class of all reflection objects containing nested objects.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Namespace options
 */
function Namespace(name, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Nested reflection objects by name.
     * @type {Object.<string,ReflectionObject>|undefined}
     */
    this.nested = undefined; // exposed
}

Object.defineProperties(NamespacePrototype, {

    /**
     * Determines whether this namespace is empty.
     * @name Namespace#empty
     * @type {boolean}
     * @readonly
     */
    empty: {
        get: function() {
            return Boolean(this.nested && Object.keys(this.nested).length);
        }
    }

});

/**
 * Tests if the specified JSON object describes not another reflection object.
 * @param {*} json JSON object
 * @returns {boolean} `true` if the object describes not another reflection object
 */
Namespace.testJSON = function testJSON(json) {
    return Boolean(json
        && !json.fields                   // Type
        && !json.values                   // Enum
        && json.id === undefined          // Field, MapField
        && !json.oneof                    // OneOf
        && !json.methods                  // Service
        && json.requestType === undefined // Method
    );
};

/**
 * Constructs a namespace from JSON.
 * @param {string} name Namespace name
 * @param {Object} json JSON object
 * @returns {Namespace} Created namespace
 * @throws {TypeError} If arguments are invalid
 */
Namespace.fromJSON = function fromJSON(name, json) {
    return new Namespace(name, json.options).addJSON(json.nested);
};

/**
 * Adds nested elements to this namespace from JSON.
 * @param {Object.<string,*>} json Nested JSON
 * @returns {Namespace} `this`
 */
NamespacePrototype.addJSON = function addJSON(json) {
    if (json) {
        var keys = Object.keys(json);
        for (var i = 0, k = keys.length, key; i < k; ++i) {
            var nested = json[key = keys[i]];
            for (var j = 0, l = nestedTypes.length, ReflObj; j < l; ++j)
                if ((ReflObj = nestedTypes[j]).testJSON(nested)) {
                    this.add(ReflObj.fromJSON(key, nested));
                    break;
                }
            throw util._TypeError("json." + key, "JSON for " + nestedError);
        }
    }
    return this;
};

/**
 * Iterates over all nested objects.
 * @param {function(this:Namespace, ReflectionObject, string):*} fn Iterator function called with nested objects
 *  and their names. Can return something different than `undefined` to break the iteration.
 * @param {Object} [ctx] Optional iterator function context
 * @param {Object} [object] Alternative object to iterate over
 * @returns {*|Namespace} First value returned, otherwise `this`
 */
NamespacePrototype.each = function each(fn, ctx, object) {
    if (!object)
        object = this.nested;
    if (object) {
        var names = Object.keys(object);
        for (var i = 0, k = names.length, name, ret; i < k; ++i)
            if ((ret = fn.call(ctx || this, object[name = names[i]], name)) !== undefined)
                return ret;
    }
    return this;
};

/**
 * Gets the nested object of the specified name.
 * @param {string} name Nested object name
 * @returns {?ReflectionObject} The reflection object or `null` if it doesn't exist
 */
NamespacePrototype.get = function get(name) {
    return this.nested && this.nested[name] || null;
};

/**
 * Adds a nested object to this namespace.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Namespace} `this`
 */
NamespacePrototype.add = function add(object) {
    if (!object || nestedTypes.indexOf(object.constructor) < 0)
        throw util._TypeError("object", nestedError);
    if (!this.nested)
        this.nested = {};
    else {
        var prev = this.get(object.name);
        if (prev) {
            if (prev instanceof Namespace && !(prev instanceof Type) && object instanceof Type) {
                prev.each(object.add, object); // move existing nested objects to the message type
                this.remove(prev);             // and remove the previous namespace
            } else
                throw Error("duplicate name '" + object.name + "' in " + this);
        }
    }
    if (object instanceof Field && object.extend === undefined)
        throw util._TypeError("object", "an extension field when not part of a type");
    this.nested[object.name] = object;
    object.onAdd(this);
    return this;
};

/**
 * Removes a nested object from this namespace.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Namespace} `this`
 */
NamespacePrototype.remove = function remove(object) {
    if (!(object instanceof ReflectionObject))
        throw util._TypeError("object", "a ReflectionObject");
    if (object.parent !== this)
        throw Error(object + " is not a member of " + this);
    delete this.nested[object.name];
    if (this.empty)
        this.nested = undefined;
    object.onRemove(this);
    return this;
};

/**
 * Defines additial namespaces within this one if not yet existing.
 * @param {string|string[]} path Path to create
 * @param {*} [json] Optional nested types to create from JSON
 * @param {?boolean} [visible=null] Whether visible when exporting definitions. Defaults to inherit from parent.
 * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
 */
NamespacePrototype.define = function define(path, json, visible) {
    if (util.isString(path))
        path = path.split('.');
    else if (!util.isArray(path)) {
        visible = json;
        json = path;
        path = undefined;
    }
    if (typeof json === 'boolean') {
        visible = json;
        json = undefined;
    }
    if (visible === undefined)
        visible = null;
    var ptr = this;
    if (path)
        while (path.length > 0) {
            var part = path.shift();
            if (ptr.nested && ptr.nested[part]) {
                ptr = ptr.nested[part];
                if (!(ptr instanceof Namespace))
                    throw Error("path conflicts with non-namespace objects");
                if (visible) // make visible when new namespaces are
                    ptr.visible = true;
            } else {
                ptr.add(ptr = new Namespace(part));
                ptr.visible = visible;
            }
        }
    if (json)
        ptr.addJSON(json);
    return ptr;
};

/**
 * Resolves this namespace's and all its nested objects' type references. Useful to validate a
 * reflection tree.
 * @returns {Namespace} `this`
 */
NamespacePrototype.resolveAll = function resolve() {
    this.each(function(nested) {
        nested.resolve();
    }, this);
    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Looks up the reflection object specified by path, relative to this namespace.
 * @param {string|string[]} path Path to look up
 * @param {boolean} [parentAlreadyChecked] Whether the parent has already been checked
 * @returns {?ReflectionObject} Looked up object or `null` if none could be found
 */
NamespacePrototype.lookup = function lookup(path, parentAlreadyChecked) {
    if (util.isString(path)) {
        if (!path.length)
            return null;
        path = path.split('.');
    }
    if (!path.length)
        return null;
    // Start at root if path is absolute
    if (path[0] === "")
        return this.root.lookup(path.slice(1));
    // Test if the first part matches any nested object, and if so, traverse if path contains more
    var found = this.nested && this.nested[path[0]];
    if (found && (path.length === 1 || found.lookup && (found = found.lookup(path.slice(1), true))))
        return found;
    // If there hasn't been a match, try again at the parent
    if (this.parent === null || parentAlreadyChecked)
        return null;
    return this.parent.lookup(path);
};

/**
 * @override
 */
NamespacePrototype.toJSON = function toJSON() {
    if (this.visible) return this.properties;

    // Otherwise expose visible members only
    var visibleMembers = {};
    var hasVisibleMembers = false;
    this.each(function(nested, name) {
        var json = nested.toJSON();
        if (json) {
            visibleMembers[name] = json;
            hasVisibleMembers = true;
        }
    }, this);
    return hasVisibleMembers ? { nested: visibleMembers } : undefined;
};

},{"./enum":5,"./field":6,"./object":12,"./service":18,"./type":21,"./util":23}],12:[function(require,module,exports){
module.exports = ReflectionObject;

ReflectionObject.extend = extend;

var Root = require("./root"),
    util = require("./util");

/**
 * Base class of all reflection objects.
 * @constructor
 * @param {string} name Object name
 * @param {Object.<string,*>} [options] Object options
 * @abstract
 */
function ReflectionObject(name, options) {
    if (!util.isString(name))
        throw util._TypeError("name");
    if (options && !util.isObject(options))
        throw util._TypeError("options", "an object");

    /**
     * JSON-exportable properties.
     * @type {?Object.<string,*>}
     */
    this.properties = null;

    // NOTE: The properties object contains the JSON-exportable descriptor of this object. The
    // properties object itself will most likely not benefit from hidden class optimizations, which
    // is ok, because it actually is a hash map, while the rest of the class is not. All properties
    // marked as "exposed" below and within other reflection objects are stored within properties.

    /**
     * Options.
     * @type {Object.<string,*>|undefined}
     */
    this.options = options; // exposed

    /**
     * Unique name within its namespace.
     * @type {string}
     */
    this.name = name;

    /**
     * Parent namespace.
     * @type {?Namespace}
     */
    this.parent = null;

    /**
     * Whether already resolved or not.
     * @type {boolean}
     */
    this.resolved = false;

    /**
     * Internally stores whether this object is visible.
     * @type {?boolean}
     * @private
     */
    this._visible = null;
}

/** @alias ReflectionObject.prototype */
var ReflectionObjectPrototype = ReflectionObject.prototype;

exposeJSON(ReflectionObjectPrototype, [ "options" ]);

Object.defineProperties(ReflectionObjectPrototype, {

    /**
     * Reference to the root namespace.
     * @name ReflectionObject#root
     * @type {Root}
     * @readonly
     */
    root: {
        get: function() {
            var ptr = this;
            while (ptr.parent !== null)
                ptr = ptr.parent;
            return ptr;
        }
    },

    /**
     * Full name including leading dot.
     * @name ReflectionObject#fullName
     * @type {string}
     * @readonly
     */
    fullName: {
        get: function() {
            var path = [ this.name ],
                ptr = this.parent;
            while (ptr) {
                path.unshift(ptr.name);
                ptr = ptr.parent;
            }
            return path.join('.');
        }
    },

    /**
     * Whether this object is visible when exporting definitions. Possible values are `true` to
     * be visible, `false` to be not and `null` (setter only) to inherit from parent.
     * @name ReflectionObject#visible
     * @type {?boolean}
     */
    visible: {
        get: function() {
            var ptr = this;
            do {
                if (ptr._visible !== null)
                    return ptr._visible;
            } while ((ptr = ptr.parent) !== null);
            return true; // visible by default
        },
        set: function(value) {
            if (value !== null && typeof value !== 'boolean')
                throw util._TypeError("value", "a boolean or null");
            this._visible = value;
        }
    }

});

/**
 * Extends this class and optionally exposes the specified properties to JSON.
 * @memberof ReflectionObject
 * @param {Function} constructor Extending constructor
 * @param {string[]} [exposePropertyNames] Properties to expose to JSON
 * @returns {Object} Prototype
 * @this ReflectionObject
 */
function extend(constructor, exposePropertyNames) {
    var proto = constructor.prototype = Object.create(this.prototype);
    proto.constructor = constructor;
    constructor.extend = extend;
    if (exposePropertyNames)
        exposeJSON(proto, exposePropertyNames);
    return proto;
}

/**
 * Exposes the specified properties to JSON.
 * @memberof ReflectionObject
 * @param {Object} prototype Prototype to expose the properties upon
 * @param {string[]} propertyNames Property names to expose
 * @returns {Object} prototype
 * @this ReflectionObject
 */
function exposeJSON(prototype, propertyNames) {
    var descriptors = {};
    propertyNames.forEach(function(name) {
        descriptors[name] = {
            get: function() {
                if (!this.properties)
                    return undefined;
                return this.properties[name];
            },
            set: function(value) {
                (this.properties || (this.properties = {}))[name] = value;
            }
        };
    });
    Object.defineProperties(prototype, descriptors);
    return prototype;
}

ReflectionObject.exposeJSON = exposeJSON;

/**
 * Converts this reflection object to its JSON representation.
 * Returns only properties that have explicitly been exposed.
 * @returns {Object} JSON object
 * @see {@link ReflectionObject.exposeJSON}
 */
ReflectionObjectPrototype.toJSON = function toJSON() {
    if (!this.visible)
        return undefined;
    return this.properties || undefined;
};

/**
 * Called when this object is added to a parent.
 * @param {ReflectionObject} parent Parent added to
 * @returns {undefined}
 */
ReflectionObjectPrototype.onAdd = function onAdd(parent) {
    if (this.parent !== parent && this.parent)
        this.parent.remove(this);
    this.parent = parent;
    this.resolved = false;
    var root = parent.root;
    if (root instanceof Root)
        root._handleAdd(this);
};

/**
 * Called when this object is removed from a parent.
 * @param {ReflectionObject} parent Parent removed from
 * @returns {undefined}
 */
ReflectionObjectPrototype.onRemove = function onRemove(parent) {
    var root = parent.root;
    if (root instanceof Root)
        root._handleRemove(this);
    this.parent = null;
    this.resolved = false;
};

/**
 * Resolves this objects type references.
 * @returns {ReflectionObject} `this`
 */
ReflectionObjectPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    var root = this.root;
    if (root instanceof Root)
        this.resolved = true; // only if part of a root
    return this;
};

/**
 * Changes this object's visibility when exporting definitions.
 * @param {?boolean} visible `true` for public, `false` for private, `null` to inherit from parent
 * @returns {ReflectionObject} `this`
 * @throws {TypeError} If arguments are invalid
 */
ReflectionObjectPrototype.visibility = function visibility(visible) {
    this.visible = visible;
    return this;
};

/**
 * Gets an option value.
 * @param {string} name Option name
 * @returns {*} Option value or `undefined` if not set
 */
ReflectionObjectPrototype.getOption = function getOption(name) {
    if (!this.options)
        return undefined;
    return this.options[name];
};

/**
 * Sets an option.
 * @param {string} name Option name
 * @param {*} value Option value
 * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObjectPrototype.setOption = function setOption(name, value, ifNotSet) {
    if (!ifNotSet || !this.options || this.options[name] === undefined)
        (this.options || (this.options = {}))[name] = value;
    return this;
};

/**
 * Sets multiple options.
 * @param {Object.<string,*>} options Options to set
 * @returns {ReflectionObject} `this`
 */
ReflectionObjectPrototype.setOptions = function setOptions(options) {
    if (options)
        Object.keys(options).forEach(function(name) {
            this.setOption(name, options[name]);
        }, this);
    return this;
};

/**
 * Converts this instance to its string representation.
 * @returns {string} Constructor name plus full name
 */
ReflectionObjectPrototype.toString = function toString() {
    return this.constructor.name + " " + this.fullName;
};

},{"./root":17,"./util":23}],13:[function(require,module,exports){
module.exports = OneOf;

var ReflectionObject = require("./object");
/** @alias OneOf.prototype */
var OneOfPrototype = ReflectionObject.extend(OneOf, [ "oneof" ]);

var Field = require("./field"),
    util  = require("./util");

/**
 * Reflected OneOf.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Oneof name
 * @param {string[]} [fieldNames] Field names
 * @param {Object} [options] Oneof options
 */
function OneOf(name, fieldNames, options) {
    if (!util.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = undefined;
    }
    ReflectionObject.call(this, name, options);
    if (fieldNames && !util.isArray(fieldNames))
        throw util._TypeError("fieldNames", "an Array");

    /**
     * Field names that belong to this oneof.
     * @type {Array.<string>}
     */
    this.oneof = fieldNames || []; // exposed, marker

    /**
     * Fields that belong to this oneof and are possibly not yet added to its parent.
     * @type {Array.<Field>}
     * @private
     */
    this._fields = [];
}

/**
 * Tests if the specified JSON object describes a oneof.
 * @param {*} json JSON object
 * @returns {boolean} `true` if the object describes a oneof
 */
OneOf.testJSON = function testJSON(json) {
    return Boolean(json.oneof);
};

/**
 * Constructs a oneof from JSON.
 * @param {string} name Oneof name
 * @param {Object} json JSON object
 * @returns {MapField} Created oneof
 * @throws {TypeError} If arguments are invalid
 */
OneOf.fromJSON = function fromJSON(name, json) {
    return new OneOf(name, json.oneof, json.options);
};

/**
 * Adds the fields of the specified oneof to the parent if not already done so.
 * @param {OneOf} oneof The oneof
 * @returns {undefined}
 * @inner
 * @ignore
 */
function addFieldsToParent(oneof) {
    if (oneof.parent)
        oneof._fields.forEach(function(field) {
            if (!field.parent)
                oneof.parent.add(field);
        });
}

/**
 * Adds a field to this oneof.
 * @param {Field} field Field to add
 * @returns {OneOf} `this`
 */
OneOfPrototype.add = function add(field) {
    if (!(field instanceof Field))
        throw util._TypeError("field", "a Field");
    if (field.parent)
        field.parent.remove(field);
    this._fields.push(field);
    field.partOf = this; // field.parent remains null
    addFieldsToParent(this);
    return this;
};

/**
 * Removes a field from this oneof.
 * @param {Field} field Field to remove
 * @returns {OneOf} `this`
 */
OneOfPrototype.remove = function remove(field) {
    if (!(field instanceof Field))
        throw util._TypeError("field", "a Field");
    var index = this._fields.indexOf(field);
    if (index < 0)
        throw Error(field + " is not a member of " + this);
    this._fields.splice(index, 1);
    index = this.oneof.indexOf(field.name);
    if (index > -1)
        this.oneof.splice(index, 1);
    if (field.parent)
        field.parent.remove(field);
    field.partOf = null;
    return this;
};

/**
 * @override
 */
OneOfPrototype.onAdd = function onAdd(parent) {
    ReflectionObject.prototype.onAdd.call(this, parent);
    addFieldsToParent(this);
};

/**
 * @override
 */
OneOfPrototype.onRemove = function onRemove(parent) {
    this._fields.forEach(function(field) {
        if (field.parent)
            field.parent.remove(field);
    });
    ReflectionObject.prototype.onRemove.call(this, parent);
};

},{"./field":6,"./object":12,"./util":23}],14:[function(require,module,exports){
module.exports = parse;

var tokenize = require("./tokenize"),
    Root     = require("./root"),
    Type     = require("./type"),
    Field    = require("./field"),
    MapField = require("./mapfield"),
    OneOf    = require("./oneof"),
    Enum     = require("./enum"),
    Service  = require("./service"),
    Method   = require("./method"),
    types    = require("./types");

var nameRe      = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
    typeRefRe   = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
    fqTypeRefRe = /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/;

function lower(token) {
    return token === null ? null : token.toLowerCase();
}

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @param {string} source Source contents
 * @param {Root} [root] Root to populate
 * @param {boolean} [visible=true] Whether types from this file are visible when exporting definitions
 * @returns {Object} Parsed contents
 */
function parse(source, root, visible) {
    /* eslint-disable default-case, callback-return */
    if (typeof root === 'boolean') {
        visible = root;
        root = undefined;
    }

    // NOTE:
    // In its current state this parser accepts a couple of directives that the
    // official parser wouldn't, i.e. some proto2 tokens in proto3 definitions.
    // While that shouldn't be much of an issue, it has to be decided how far
    // we want to go with this: Full compliance or compact library size?

    var tn = tokenize(source),
        next = tn.next,
        push = tn.push,
        peek = tn.peek,
        skip = tn.skip,
        omit = tn.omit;

    var head = true,
        pkg,
        imports,
        publicImports,
        weakImports,
        syntax,
        isProto3 = false;

    if (!root)
        root = new Root();

    var ptr = root;

    function line() {
        return " (line " + tn.line()+")";
    }

    function illegal(token, name) {
        return "illegal " + (name || "token") + " '" + token + "'" + line();
    }

    function readString() {
        var values = [],
            token;
        do {
            if ((token = next()) !== '"' && token !== "'")
                throw Error(illegal(token));
            values.push(next());
            skip(token);
            token = peek();
        } while (token === '"' || token === "'");
        return values.join('');
    }

    function readValue(acceptTypeRef) {
        var token = next();
        switch (token) {
            case "'":
            case '"':
                push(token);
                return readString();
            case "true":
            case "TRUE":
                return true;
            case "false":
            case "FALSE":
                return false;
        }
        try {
            return parseNumber(token);
        } catch (e) {
            if (acceptTypeRef && typeRefRe.test(token))
                return token;
            throw Error(illegal(token, "value"));
        }
    }

    function readRange() {
        var start = parseId(next());
        var end = start;
        if (omit("to"))
            end = parseId(next());
        skip(";");
        return [ start, end ];
    }

    function parseNumber(token) {
        var sign = 1;
        if (token.charAt(0) === '-') {
            sign = -1;
            token = token.substring(1);
        }
        var tokenLower = lower(token);
        switch (tokenLower) {
            case "inf": return sign * Infinity;
            case "nan": return NaN;
            case "0": return 0;
        }
        if (/^[1-9][0-9]*$/.test(token))
            return sign * parseInt(token, 10);
        if (/^0[x][0-9a-f]+$/.test(tokenLower))
            return sign * parseInt(token, 16);
        if (/^0[0-7]+$/.test(token))
            return sign * parseInt(token, 8);
        if (/^[0-9]*(?:\.[0-9]*)?(?:[e][+-]?[0-9]+)?$/.test(tokenLower))
            return sign * parseFloat(token);
        throw Error(illegal(token, "number"));
    }

    function parseId(token) {
        var tokenLower = lower(token);
        switch (tokenLower) {
            case "min": return 1;
            case "max": return 0x1FFFFFFF;
            case "0": return 0;
        }
        if (/^[1-9][0-9]*$/.test(token))
            return parseInt(token, 10);
        if (/^0[x][0-9a-f]+$/.test(tokenLower))
            return parseInt(token, 16);
        if (/^0[0-7]+$/.test(token))
            return parseInt(token, 8);
        throw Error(illegal(token, "id"));
    }

    function parsePackage() {
        if (pkg !== undefined)
            throw Error("duplicate package definition" + line());
        pkg = next();
        if (!typeRefRe.test(pkg))
            throw Error(illegal(pkg, "package name"));
        ptr = ptr.define(pkg);
        skip(";");
    }

    function parseImport() {
        var token = peek();
        var whichImports;
        switch (token) {
            case "public":
                whichImports = publicImports || (publicImports = []);
                next();
                break;
            case "weak":
                whichImports = weakImports || (weakImports = []);
                next();
                break;
        }
        if (!whichImports)
            whichImports = imports || (imports = []);
        token = readString();
        skip(";");
        whichImports.push(token);
    }

    function parseSyntax() {
        skip("=");
        syntax = lower(readString());
        if ([ "proto2", "proto3" ].indexOf(syntax) < 0)
            throw Error(illegal(syntax, "syntax"));
        isProto3 = syntax === "proto3";
        skip(";");
    }

    function parseCommon(parent, token) {
        switch (token) {

            case "option":
                parseOption(parent, token);
                skip(";");
                return true;

            case "message":
                parseType(parent, token);
                return true;

            case "enum":
                parseEnum(parent, token);
                return true;

            case "service":
                parseService(ptr, token);
                return true;

            case "extend":
                parseExtension(ptr, token);
                return true;
        }
        return false;
    }

    function parseType(parent, token) {
        var name = next();
        if (!nameRe.test(name))
            throw Error(illegal(name, "type name"));
        var type = new Type(name);
        if (omit("{")) {
            while ((token = next()) !== '}') {
                var tokenLower = lower(token);
                if (parseCommon(type, token))
                    continue;
                switch (tokenLower) {
                    case "map":
                        parseMapField(type, tokenLower);
                        break;
                    case "required":
                    case "optional":
                    case "repeated":
                        parseField(type, tokenLower);
                        break;
                    case "oneof":
                        parseOneOf(type, tokenLower);
                        break;
                    case "extensions":
                        (type.extensions || (type.extensions = [])).push(readRange(type, tokenLower));
                        break;
                    case "reserved":
                        (type.reserved || (type.reserved = [])).push(readRange(type, tokenLower));
                        break;
                    default:
                        if (!isProto3 || !typeRefRe.test(token))
                            throw Error(illegal(token));
                        push(token);
                        parseField(type, "optional");
                        break;
                }
            }
            omit(";");
        } else
            skip(";");
        if (!isProto3)
            type.setOption("packed", false, /* ifNotSet */ true);
        type.visible = visible;
        parent.add(type);
    }

    function parseField(parent, rule, extend) {
        var type = next();
        if (!typeRefRe.test(type))
            throw Error(illegal(type, "type"));
        var name = next();
        if (!nameRe.test(name))
            throw Error(illegal(name, "name"));
        skip("=");
        var id = parseNumber(next());
        parent.add(parseInlineOptions(new Field(name, id, type, rule, extend)));
    }

    function parseMapField(parent, token) {
        if (!isProto3)
            throw Error(illegal(token));
        skip("<");
        var keyType = next();
        if (types.mapKeyWireTypes[keyType] === undefined)
            throw Error(illegal(keyType, "map key type"));
        skip(",");
        var valueType = next();
        if (!typeRefRe.test(valueType))
            throw Error(illegal(valueType, "type"));
        skip(">");
        var name = next();
        skip("=");
        var id = parseId(next());
        parent.add(parseInlineOptions(new MapField(name, id, valueType, keyType)));
    }

    function parseOneOf(parent, token) {
        var name = next();
        if (!nameRe.test(name))
            throw Error(illegal(name, "name"));
        var oneof = new OneOf(name);
        if (omit("{")) {
            while ((token = next()) !== '}') {
                if (token === "option") {
                    parseOption(oneof, token);
                    skip(";");
                } else
                    parseField(oneof, "optional");
            }
            omit(";");
        } else
            skip(";");
        parent.add(oneof);
    }

    function parseEnum(parent, token) {
        var name = next();
        if (!nameRe.test(name))
            throw Error(illegal(name), "name");
        var values = {};
        var enm = new Enum(name, values);
        if (omit("{")) {
            while ((token = next()) !== "}") {
                if (lower(token) === "option")
                    parseOption(enm);
                else
                    parseEnumField(enm, token);
            }
            omit(";");
        } else
            skip(";");
        parent.add(enm);
    }

    function parseEnumField(parent, token) {
        if (!nameRe.test(token))
            throw Error(illegal(token, "name"));
        var name = token;
        skip("=");
        var value = parseId(next());
        parseInlineOptions(parent.values[name] = new Number(value)); // eslint-disable-line no-new-wrappers
    }

    function parseOption(parent, token) {
        var custom = omit('(');
        var name = next();
        if (!typeRefRe.test(name))
            throw Error(illegal(name, "option name"));
        if (custom) {
            skip(')');
            name = '(' + name + ')';
            token = peek();
            if (fqTypeRefRe.test(token)) {
                name += token;
                next();
            }
        }
        skip("=");
        parseOptionValue(parent, name);
    }

    function parseOptionValue(parent, name) {
        if (omit('{')) {
            while ((token = next()) !== '}') {
                if (!nameRe.test(token))
                    throw Error(illegal(token, "option name"));
                name = name + "." + token;
                if (omit(":"))
                    setOption(parent, name, readValue(true));
                else
                    parseOptionValue(parent, name);
            }
            omit(";");
        } else
            setOption(parent, name, readValue(true));
        // Does not enforce a delimiter to be universal
    }

    function setOption(parent, name, value) {
        if (parent.setOption)
            parent.setOption(name, value);
        else
            parent[name] = value;
    }

    function parseInlineOptions(parent) {
        if (omit("[")) {
            do {
                parseOption(parent, "option");
            } while (omit(","));
            skip("]");
        }
        skip(";");
        return parent;
    }

    function parseService(parent, token) {
        token = next();
        if (!nameRe.test(token))
            throw Error(illegal(token, "service name"));
        var name = token;
        var service = new Service(name);
        if (omit("{")) {
            while ((token = next()) !== '}') {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case "option":
                        parseOption(service, tokenLower);
                        skip(";");
                        break;
                    case "rpc":
                        parseMethod(service, tokenLower);
                        break;
                    default:
                        throw Error(illegal(token));
                }
            }
            omit(";");
        } else
            skip(";");
        parent.add(service);
    }

    function parseMethod(parent, token) {
        var type = token;
        var name = next();
        if (!nameRe.test(name))
            throw Error(illegal(name, "method name"));
        var requestType, requestStream,
            responseType, responseStream;
        skip("(");
        if (omit("stream"))
            requestStream = true;
        if (!typeRefRe.test(token = next()))
            throw Error(illegal(token));
        requestType = token;
        skip(")"); skip("returns"); skip("(");
        if (omit("stream"))
            responseStream = true;
        if (!typeRefRe.test(token = next()))
            throw Error(illegal(token));
        responseType = token;
        skip(")");
        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        if (omit("{")) {
            while ((token = next()) !== '}') {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case "option":
                        parseOption(method, tokenLower);
                        skip(";");
                        break;
                    default:
                        throw Error(illegal(token));
                }
            }
            omit(";");
        } else
            skip(";");
        parent.add(method);
    }

    function parseExtension(parent, token) {
        var reference = next();
        if (!typeRefRe.test(reference))
            throw Error(illegal(reference, "type reference"));
        if (omit("{")) {
            while ((token = next()) !== '}') {
                var tokenLower = lower(token);
                switch (tokenLower) {
                    case "required":
                    case "repeated":
                    case "optional":
                        parseField(parent, tokenLower, reference);
                        break;
                    default:
                        if (!isProto3 || !typeRefRe.test(token))
                            throw Error(illegal(token));
                        push(token);
                        parseField(parent, "optional", reference);
                        break;
                }
            }
            omit(";");
        } else
            skip(";");
    }

    var token;
    while ((token = next()) !== null) {
        if (parseCommon(ptr, token)) {
            head = false;
            continue;
        }
        if (!head)
            throw Error(illegal(token));
        var tokenLower = lower(token);
        switch (tokenLower) {

            case "package":
                parsePackage();
                break;

            case "import":
                parseImport();
                break;

            case "syntax":
                parseSyntax();
                break;

            default:
                throw Error(illegal(token));
        }
    }
    return {
        package       : pkg,
        imports       : imports,
        publicImports : publicImports,
        weakImports   : weakImports,
        syntax        : syntax,
        root          : root
    };
}

},{"./enum":5,"./field":6,"./mapfield":9,"./method":10,"./oneof":13,"./root":17,"./service":18,"./tokenize":20,"./type":21,"./types":22}],15:[function(require,module,exports){
module.exports = Prototype;

/**
 * Runtime message prototype ready to be extended by custom classes or generated code.
 * @constructor
 * @param {Object.<string,*>} [properties] Properties to set
 * @param {Object.<string,*>} [options] Initialization options
 * @param {boolean} [options.fieldsOnly=false] Sets only properties that reference a field
 * @abstract
 * @see {@link inherits}
 * @see {@link Class}
 */
function Prototype(properties, options) {
    if (properties) {
        var fieldsOnly = Boolean(options && options.fieldsOnly),
            fields = this.constructor.$type.fields,
            keys = Object.keys(properties);
        for (var i = 0, k = keys.length, key; i < k; ++i) {
            key = keys[i];
            if (!fieldsOnly || fields[key])
                this[key] = properties[key];
        }
    }
}

/**
 * Converts a runtime message to a JSON object.
 * @param {Object.<string,*>} [options] Conversion options
 * @param {boolean} [options.fieldsOnly=false] Converts only properties that reference a field
 * @param {Function} [options.long] Long conversion type. Valid values are `String` (requires a
 * long library) and `Number` (throws without a long library if unsafe).
 * Defaults to the internal representation.
 * @param {Function} [options.enum] Enum value conversion type. Only valid value is `String`.
 * Defaults to the values' numeric ids.
 * @returns {Object.<string,*>} JSON object
 */
Prototype.prototype.asJSON = function asJSON(options) {
    var fields = this.constructor.$type.fields,
        json = {};
    var keys = Object.keys(this);
    for (var i = 0, k = keys.length, key; i < k; ++i) {
        var field = fields[key = keys[i]],
            value = this[key];
        if (field) {
            if (field.repeated) {
                if (value && value.length) {
                    var array = new Array(value.length);
                    for (var j = 0, l = value.length; j < l; ++j)
                        array[j] = field.jsonConvert(value[j], options);
                    json[key] = array;
                }
            } else
                json[key] = field.jsonConvert(value, options);
        } else if (!options || !options.fieldsOnly)
            json[key] = value;
    }
    return json;
};

},{}],16:[function(require,module,exports){
module.exports = Reader;

/**
 * Buffer implementation, if available.
 * @type {?Function}
 */
Reader.Buffer = null;

Reader.BufferReader = BufferReader;

var long_   = require("./support/long"),
    ieee754 = require("../lib/ieee754");

function indexOutOfRange(reader, writeLength) {
    return "index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len;
}

/**
 * Wire format reader using arrays.
 * @constructor
 * @param {number[]} buffer Buffer to read from
 */
function Reader(buffer) {
    if (!(this instanceof Reader))
        return Reader.Buffer && (!buffer || Reader.Buffer.isBuffer(buffer))
            ? new BufferReader(buffer)
            : new Reader(buffer);

    /**
     * Read buffer.
     * @type {number[]}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

/** @alias Reader.prototype */
var ReaderPrototype = Reader.prototype;

var ArrayImpl = typeof Uint8Array !== 'undefined'
    ? Uint8Array
    : Array;
ReaderPrototype._slice = ArrayImpl.prototype.slice || ArrayImpl.prototype.subarray;

/**
 * Tag read.
 * @constructor
 * @param {number} id Field id
 * @param {number} wireType Wire type
 * @ignore
 */
function Tag(id, wireType) {
    this.id = id;
    this.wireType = wireType;
}

/**
 * Reads a tag.
 * @returns {{id: number, wireType: number}} Field id and wire type
 */
ReaderPrototype.tag = function read_tag() {
    if (this.pos >= this.len)
        throw RangeError(indexOutOfRange(this));
    var octet = this.buf[this.pos++];
    return new Tag(octet >>> 3, octet & 7);
};

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
ReaderPrototype.int32 = function read_int32() {
    var value = 0,
        shift = 0,
        octet;
    do {
        if (this.pos >= this.len)
            throw RangeError(indexOutOfRange(this));
        octet = this.buf[this.pos++];
        if (shift < 28)
            value |= (octet & 127) << shift;
        shift += 7;
    } while (octet & 128);
    return value;
};

/**
 * Reads a varint as an unsigned 32 bit value.
 * @returns {number} Value read
 */
ReaderPrototype.uint32 = function read_uint32() {
    return this.int32() >>> 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
ReaderPrototype.sint32 = function read_sint32() {
    var value = this.int32();
    return value >>> 1 ^ -(value & 1);
};

/**
 * Reads a varint as a signed 64 bit value.
 * @returns {number|{ low: number, high: number, unsigned: false }|Long} Value read
 */
ReaderPrototype.int64 = function read_int64() {
    return long_._read(this, indexOutOfRange)
                ._get(false);
};

/**
 * Reads a varint as an unsigned 64 bit value.
 * @returns {number|{ low: number, high: number, unsigned: true }|Long} Value read
 */
ReaderPrototype.uint64 = function read_uint64() {
    return long_._read(this, indexOutOfRange)
                ._get(true);
};

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @returns {number|{ low: number, high: number, unsigned: false }|Long} Value read
 */
ReaderPrototype.sint64 = function read_sint64() {
    return long_._read(this, indexOutOfRange)
                ._zigZagDecode()
                ._get(false);
};

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
ReaderPrototype.bool = function read_bool() {
    return this.int32() !== 0;
};

/**
 * Reads fixed 32 bits as a number.
 * @returns {number} Value read
 */
ReaderPrototype.fixed32 = function read_fixed32() {
    if (this.pos + 4 > this.len)
        throw RangeError(indexOutOfRange(this, 4));
    this.pos += 4;
    return this.buf[this.pos - 4]
         | this.buf[this.pos - 3] << 8
         | this.buf[this.pos - 2] << 16
         | this.buf[this.pos - 1] << 24;
};

/**
 * Reads zig-zag encoded fixed 32 bits as a number.
 * @returns {number} Value read
 */
ReaderPrototype.sfixed32 = function read_sfixed32() {
    var value = this.fixed32();
    return value >>> 1 ^ -(value & 1);
};

/**
 * Reads fixed 64 bits as a Long.
 * @returns {number|{ low: number, high: number, unsigned: true }|Long} Value read
 */
ReaderPrototype.fixed64 = function read_fixed64() {
    if (this.pos + 8 > this.len)
        throw RangeError(indexOutOfRange(this, 8));
    return long_._readFixed(this)
                ._get(true);
};

/**
 * Reads zig-zag encoded 64 bits as a Long.
 * @returns {number|{ low: number, high: number, unsigned: false }|Long} Value read
 */
ReaderPrototype.sfixed64 = function read_sfixed64() {
    if (this.pos + 8 > this.len)
        throw RangeError(indexOutOfRange(this, 8));
    return long_._readFixed(this)
                ._zigZagDecode()
                ._get(false);
};

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
ReaderPrototype.float = function read_float() {
    if (this.pos + 4 > this.len)
        throw RangeError(indexOutOfRange(this, 4));
    var value = ieee754.read(this.buf, this.pos, true, 23, 4);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
ReaderPrototype.double = function read_double() {
    if (this.pos + 8 > this.len)
        throw RangeError(indexOutOfRange(this, 4));
    var value = ieee754.read(this.buf, this.pos, true, 52, 8);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {number[]} Value read
 */
ReaderPrototype.bytes = function read_bytes() {
    var length = this.int32() >>> 0,
        start  = this.pos,
        end    = this.pos + length;
    if (end > this.len)
        throw RangeError(indexOutOfRange(this, length));
    this.pos += length;
    return this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
ReaderPrototype.string = function read_string() {
    // ref: https://github.com/google/closure-library/blob/master/closure/goog/crypt/crypt.js
    var bytes = this.bytes(),
        len = bytes.length;
    if (len) {
        var out = new Array(len), p = 0, c = 0;
        while (p < len) {
            var c1 = bytes[p++];
            if (c1 < 128)
                out[c++] = c1;
            else if (c1 > 191 && c1 < 224)
                out[c++] = (c1 & 31) << 6 | bytes[p++] & 63;
            else if (c1 > 239 && c1 < 365) {
                var u = ((c1 & 7) << 18 | (bytes[p++] & 63) << 12 | (bytes[p++] & 63) << 6 | bytes[p++] & 63) - 0x10000;
                out[c++] = 0xD800 + (u >> 10);
                out[c++] = 0xDC00 + (u & 1023);
            } else
                out[c++] = (c1 & 15) << 12 | (bytes[p++] & 63) << 6 | bytes[p++] & 63;
        }
        return String.fromCharCode.apply(String, out.slice(0, c));
    }
    return "";
};

/**
 * Skips the specified number of bytes if provided, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
ReaderPrototype.skip = function skip(length) {
    if (length === undefined) {
        do {
            if (this.pos >= this.len)
                throw RangeError(indexOutOfRange(this));
        } while (this.buf[this.pos++] & 128);
    } else {
        if (this.pos + length > this.len)
            throw RangeError(indexOutOfRange(this, length));
        this.pos += length;
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
ReaderPrototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            do { // eslint-disable-line no-constant-condition
                var tag = this.tag();
                if (tag.wireType === 4)
                    break;
                this.skipType(tag.wireType);
            } while (true);
            break;
        case 5:
            this.skip(4);
            break;
        default:
            throw Error("invalid wire type: " + wireType);
    }
    return this;
};

/**
 * Resets this instance and frees all resources.
 * @param {number[]} [buffer] Optionally a new buffer for a new sequence of read operations
 * @returns {Reader} `this`
 */
ReaderPrototype.reset = function reset(buffer) {
    if (buffer) {
        this.buf = buffer;
        this.len = buffer.length;
    } else {
        this.buf = null; // makes it throw
        this.len = 0;
    }
    this.pos = 0;
    return this;
};

/**
 * Finishes the current sequence of read operations, frees all resources and returns the remaining buffer.
 * Optionally accepts a new buffer for a new sequence of read operations.
 * @param {number[]} [buffer] Optionally a new buffer for a new sequence of read operations
 * @returns {number[]} Finished buffer
 */
ReaderPrototype.finish = function finish(buffer) {
    var remain = this.pos
        ? this._slice.call(this.buf, this.pos)
        : this.buf;
    this.reset(buffer);
    return remain;
};

// One time function to initialize BufferReader with the now-known buffer
// implementation's slice method
var initBufferReader = function() {
    if (!Reader.Buffer)
        throw Error("Buffer is not supported");
    BufferReaderPrototype._slice = Reader.Buffer.prototype.slice;
    initBufferReader = false;
};

/**
 * Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    if (initBufferReader)
        initBufferReader();
    Reader.call(this, buffer);
}

/** @alias BufferReader.prototype */
var BufferReaderPrototype = BufferReader.prototype = Object.create(Reader.prototype);

BufferReaderPrototype.constructor = BufferReader;

Reader.BufferReader = BufferReader;

/**
 * Reads a float (32 bit) as a number using node buffers.
 * @returns {number} Value read
 */
BufferReaderPrototype.float = function read_float_buffer() {
    if (this.pos + 4 > this.len)
        throw RangeError(indexOutOfRange(this, 4));
    var value = this.buf.readFloatLE(this.pos, true);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number using node buffers.
 * @returns {number} Value read
 */
BufferReaderPrototype.double = function read_double_buffer() {
    if (this.pos + 8 > this.len)
        throw RangeError(indexOutOfRange(this, 8));
    var value = this.buf.readDoubleLE(this.pos, true);
    this.pos += 8;
    return value;
};

/**
 * Reads a string.
 * @param {number} [length] Optional number of bytes to read, if known beforehand
 * @returns {string} Value read
 */
BufferReaderPrototype.string = function read_string_buffer(length) {
    if (length === undefined)
        length = this.int32() >>> 0;
    var start = this.pos,
        end   = this.pos + length;
    if (end > this.len)
        throw RangeError(indexOutOfRange(this, length));
    this.pos += length;
    return this.buf.toString("utf8", start, end);
};

/**
 * Finishes the current sequence of read operations using node buffers, frees all resources and returns the remaining buffer.
 * Optionally accepts a new buffer for a new sequence of read operations using node buffers.
 * @param {Buffer} [buffer] Optionally a new buffer for a new sequence of read operations
 * @returns {Buffer} Finished buffer
 */
BufferReaderPrototype.finish = function finish_buffer(buffer) {
    var remain = this.pos ? this.buf.slice(this.pos) : this.buf;
    this.reset(buffer);
    return remain;
};

},{"../lib/ieee754":1,"./support/long":19}],17:[function(require,module,exports){
module.exports = Root;

var Namespace = require("./namespace"),
    Type      = require("./type"),
    Field     = require("./field"),
    OneOf     = require("./oneof"),
    Enum      = require("./enum"),
    util      = require("./util");

/**
 * Root namespace.
 * @extends Namespace
 * @constructor
 * @param {Object.<string,*>} [contextOptions] Context options
 * @param {Object.<string,*>} [options] Namespace options
 * @param {boolean} [contextOptions.noGoogleTypes=false] Skips loading of common google types
 */
function Root(contextOptions, options) {
    Namespace.call(this, "", options);

    if (!contextOptions)
        contextOptions = {};

    /**
     * References to common google types.
     * @type {Object.<string, Type|Enum>}
     */
    this.common = {};

    /**
     * Array of yet unprocessed and thus pending extension fields.
     * @type {Field[]}
     */
    this.pendingExtensions = [];

    /**
     * Already loaded file names.
     * @type {string[]}
     * @private
     */
    this._loaded = []; // use addLoaded/isLoaded instead

    if (!contextOptions.noGoogleTypes)
        importGoogleTypes(this, false);
}

/** @alias Root.prototype */
var RootPrototype = Namespace.extend(Root);

/**
 * Checks if a specific file has already been loaded.
 * @param {string} filename File name to test
 * @returns {boolean} `true` if already loaded
 */
RootPrototype.isLoaded = function isLoaded(filename) {
    filename = util.normalizePath(filename);
    var index = filename.indexOf("google/protobuf/");
    if (index > 0 /* not -1 */)
        filename = filename.substring(index);
    return this._loaded.indexOf(filename) > -1;
};

/**
 * Lets the root know of a loaded file, i.e. when added programmatically.
 * @param {string} filename File name to add
 * @returns {boolean} `false` if this file has already been loaded before
 */
RootPrototype.addLoaded = function addLoaded(filename) {
    if (this.isLoaded(filename))
        return false;
    filename = util.normalizePath(filename);
    this._loaded.push(filename);
    return true;
};

/**
 * Imports common google types to the specified root.
 * @memberof Root
 * @param {Root} root The root to import to
 * @param {?boolean} [visible] Whether visible when exporting definitions. Defaults to inherit from parent.
 * @returns {undefined}
 */
function importGoogleTypes(root, visible) {

    var bool     = "bool",
        int32    = "int32",
        uint32   = "u"+int32,
        int64    = "int64",
        uint64   = "u"+int64,
        float    = "float",
        double   = "double",
        string   = "string",
        bytes    = "bytes",
        repeated = "repeated",
        value    = "value",
        name     = "name",
        number   = "number",
        options  = "options",
        seconds  = "seconds",
        nanos    = "nanos";

    // NOTE: It is important to create new instances for each root
    var types = {

        "empty": [

            new Type("Empty")
        ],
        "any": [

            new Type("Any")
            .add(new Field("type_url", 1, string))
            .add(new Field( value    , 2, bytes))
        ],
        "timestamp": [

            new Type("Timestamp")
            .add(new Field(seconds, 1, int64))
            .add(new Field(nanos  , 2, int32))
        ],
        "duration": [

            new Type("Duration")
            .add(new Field(seconds, 1, int64))
            .add(new Field(nanos  , 2, int32))
        ],
        "wrappers": [

            new Type("DoubleValue")
            .add(new Field(value, 1, double)),

            new Type("FloatValue")
            .add(new Field(value, 1, float)),

            new Type("Int64Value")
            .add(new Field(value, 1, int64)),

            new Type("UInt64Value")
            .add(new Field(value, 1, uint64)),

            new Type("Int32Value")
            .add(new Field(value, 1, int32)),

            new Type("UInt32Value")
            .add(new Field(value, 1, uint32)),

            new Type("BoolValue")
            .add(new Field(value, 1, bool)),

            new Type("StringValue")
            .add(new Field(value, 1, string)),

            new Type("BytesValue")
            .add(new Field(value, 1, bytes))
        ],
        "struct": [

            new Type("Value")
            .add(new OneOf("kind")
                .add(new Field("null_"       + value, 1, "NullValue"))
                .add(new Field( number + "_" + value, 2,  double))
                .add(new Field( string + "_" + value, 3,  string))
                .add(new Field( bool   + "_" + value, 4,  bool))
                .add(new Field("struct_"     + value, 5, "Struct"))
                .add(new Field("list_"       + value, 6, "ListValue"))
            ),
            new Enum("NullValue", { NULL_VALUE: 0 }),

            new Type("ListValue")
            .add(new Field("values", 1, "Value", repeated))
        ],
        "source_context": [

            new Type("SourceContext")
            .add(new Field("file_name", 1, string))
        ],
        "type": [

            new Type("Type")
            .add(new Field( name           , 1, string))
            .add(new Field("fields"        , 2, "Field", repeated))
            .add(new Field("oneofs"        , 3, string, repeated))
            .add(new Field( options        , 4, "Option", repeated))
            .add(new Field("source_context", 5, "SourceContext"))
            .add(new Field("syntax"        , 6, "Syntax")),

            new Type("Field")
            .add(new Enum("Kind", {
                TYPE_UNKNOWN  : 0,
                TYPE_DOUBLE   : 1,
                TYPE_FLOAT    : 2,
                TYPE_INT64    : 3,
                TYPE_UINT64   : 4,
                TYPE_INT32    : 5,
                TYPE_FIXED64  : 6,
                TYPE_FIXED32  : 7,
                TYPE_BOOL     : 8,
                TYPE_STRING   : 9,
                TYPE_GROUP    : 10,
                TYPE_MESSAGE  : 11,
                TYPE_BYTES    : 12,
                TYPE_UINT32   : 13,
                TYPE_ENUM     : 14,
                TYPE_SFIXED32 : 15,
                TYPE_SFIXED64 : 16,
                TYPE_SINT32   : 17,
                TYPE_SINT64   : 18
            }))
            .add(new Enum("Cardinality", {
                CARDINALITY_UNKNOWN  : 0,
                CARDINALITY_OPTIONAL : 1,
                CARDINALITY_REQUIRED : 2,
                CARDINALITY_REPEATED : 3
            }))
            .add(new Field("kind"         , 1 , "Kind"))
            .add(new Field("cardinality"  , 2 , "Cardinality"))
            .add(new Field( number        , 3 ,  int32))
            .add(new Field( name          , 4 ,  string))
            .add(new Field("type_url"     , 6 ,  string))
            .add(new Field("oneof_index"  , 7 ,  int32))
            .add(new Field("packed"       , 8 ,  bool))
            .add(new Field( options       , 9 , "Option"))
            .add(new Field("json_name"    , 10,  string))
            .add(new Field("default_value", 11,  string)),

            new Type("Enum")
            .add(new Field( name           , 1,  string))
            .add(new Field("enum" + value  , 2, "EnumValue", repeated))
            .add(new Field( options        , 3, "Option", repeated))
            .add(new Field("source_context", 4, "SourceContext"))
            .add(new Field("syntax"        , 5, "Syntax")),

            new Type("EnumValue")
            .add(new Field( name    , 1,  string))
            .add(new Field( number  , 2,  int32))
            .add(new Field( options , 3, "Option", repeated )),

            new Type("Option")
            .add(new Field(name , 1,  string ))
            .add(new Field(value, 2, "Any"   )),

            new Enum("Syntax", { SYNTAX_PROTO2 : 0, SYNTAX_PROTO3 : 1 })
        ],
        "field_mask": [

            new Type("FieldMask")
            .add(new Field("paths", 1, string, repeated))
        ]
    };

    var googleNamespace = root.define([ "google", "protobuf" ], visible);
    Object.keys(types).forEach(function(protoName) {
        if (!root.addLoaded("google/protobuf/" + protoName + ".proto"))
            return;
        types[protoName].forEach(function(type) {
            googleNamespace.add(type);
            root.common[type.name] = type;
        });
    });
}

Root.importGoogleTypes = importGoogleTypes;

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace.
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {function(?Error, Root=)} [callback] Node-style callback function
 * @param {Object} [ctx] Optional callback context
 * @returns {Promise<Root>|undefined} A promise if callback has been omitted, otherwise `undefined`
 * @throws {TypeError} If arguments are invalid
 */
RootPrototype.load = function load(filename, callback, ctx) {
    var self = this;
    if (!callback)
        return util.asPromise(load, filename);

    // Finishes loading by calling the callback (exactly once)
    function finish(err, root) {
        if (!callback)
            return;
        var cb = callback;
        callback = null;
        cb.call(ctx || self, err, root);
    }

    // Processes a single file
    function process(origin, source, visible) {
        try {
            if (source.charAt(0) === "{") {
                var json = JSON.parse(source);
                self.setOptions(json.options).addJSON(json.nested);
            } else {
                var parsed = require("./parse")(source, self, visible);
                if (parsed.publicImports)
                    parsed.publicImports.forEach(function(file) {
                        fetch(util.resolvePath(origin, file), visible, false);
                    });
                if (parsed.imports)
                    parsed.imports.forEach(function(file) {
                        fetch(util.resolvePath(origin, file), false, false);
                    });
                if (parsed.weakImports)
                    parsed.weakImports.forEach(function(file) {
                        fetch(util.resolvePath(origin, file), false, true);
                    });
            }
            if (!queued)
                finish(null, self);
        } catch (err) {
            finish(err);
        }
    }

    // Fetches a single file
    function fetch(file, visible, weak) {
        if (!self.addLoaded(file))
            return;
        ++queued;
        util.fetch(file, function(err, source) {
            --queued;
            if (!callback)
                return;
            if (!err) {
                process(file, source, visible);
                return;
            }
            if (!weak)
                finish(err);
        });
    }
    var queued = 0;

    // Assembling the root namespace doesn't require working type
    // references anymore, so we can load everything in parallel
    if (util.isArray(filename))
        filename.forEach(function(file) {
            fetch(file, true, false);
        });
    else if (util.isString(filename))
        fetch(filename, true, false);
    else
        throw util._TypeError("filename", "a string or array");

    if (!queued)
        finish(null);
    return undefined;
};

/**
 * Handles a (pending) declaring extension field by creating a sister field to represent it
 * within its extended type.
 * @param {Field} field Declaring extension field witin the declaring type
 * @returns {boolean} `true` if successfully added to the extended type, `false` otherwise
 * @inner
 * @ignore
 */
function handleExtension(field) {
    var extendedType = field.parent.lookup(field.extend);
    if (extendedType) {
        var sisterField = new Field(field.fullName, field.id, field.type, field.rule, undefined, field.options);
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
    }
    return false;
}

/**
 * Called when any object is added to this root or its sub-namespaces.
 * @param {ReflectionObject} object Object added
 * @returns {undefined}
 * @private
 */
RootPrototype._handleAdd = function handleAdd(object) {
    // Try to handle any pending extensions
    var newPendingExtensions = this.pendingExtensions.slice();
    this.pendingExtensions = []; // because the loop calls handleAdd
    for (var i = 0; i < newPendingExtensions.length;) {
        if (handleExtension(newPendingExtensions[i]))
            newPendingExtensions.splice(i, 1);
        else
            ++i;
    }
    this.pendingExtensions = newPendingExtensions;
    // Handle new declaring extension fields without a sister field yet
    if (object instanceof Field && object.extend !== undefined && !object.extensionField && !handleExtension(object) && this.pendingExtensions.indexOf(object) < 0)
        this.pendingExtensions.push(object);
    else if (object instanceof Namespace)
        object.each(this._handleAdd, this); // recurse into the namespace
};

/**
 * Called when any object is removed from this root or its sub-namespaces.
 * @param {ReflectionObject} object Object removed
 * @returns {undefined}
 * @private
 */
RootPrototype._handleRemove = function handleRemove(object) {
    if (object instanceof Field) {
        // If a pending declaring extension field, cancel the extension
        if (object.extend !== undefined && !object.extensionField) {
            var index = this.pendingExtensions.indexOf(object);
            if (index > -1)
                this.pendingExtensions.splice(index, 1);
        }
        // If a declaring extension field with a sister field, remove its sister field
        if (object.extensionField) {
            object.extensionField.parent.remove(object.extensionField);
            object.extensionField = null;
        }
    } else if (object instanceof Namespace)
        object.each(this._handleRemove, this); // recurse into the namespace
};

/**
 * @override
 */
RootPrototype.toString = function toString() {
    return this.constructor.name;
};

},{"./enum":5,"./field":6,"./namespace":11,"./oneof":13,"./parse":14,"./type":21,"./util":23}],18:[function(require,module,exports){
module.exports = Service;

var Namespace = require("./namespace");
/** @alias Service.prototype */
var ServicePrototype = Namespace.extend(Service, [ "methods" ]);

var Method    = require("./method"),
    util      = require("./util");

/**
 * Reflected service.
 * @extends Namespace
 * @constructor
 * @param {string} name Service name
 * @param {Object.<string,*>} [options] Service options
 * @throws {TypeError} If arguments are invalid
 */
function Service(name, options) {
    Namespace.call(this, name, options);

    /**
     * Service methods.
     * @type {Object.<string,Method>}
     */
    this.methods = {}; // exposed, marker
}

/**
 * Tests if the specified JSON object describes a service.
 * @param {Object} json JSON object to test
 * @returns {boolean} `true` if the object describes a service
 */
Service.testJSON = function testJSON(json) {
    return Boolean(json && json.methods);
};

/**
 * Constructs a service from JSON.
 * @param {string} name Service name
 * @param {Object} json JSON object
 * @returns {Service} Created service
 * @throws {TypeError} If arguments are invalid
 */
Service.fromJSON = function fromJSON(name, json) {
    return new Service(name, json.options);
};

/**
 * @override
 */
ServicePrototype.resolveAll = function resolve() {
    this.each(function(method) {
        method.resolve();
    }, this, this.methods);
    return Namespace.prototype.resolve.call(this);
};

/**
 * Adds a method to this service.
 * @param {Method} method Method to add
 * @returns {Service} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there are duplicate names
 */
ServicePrototype.add = function add(method) {
    if (!(method instanceof Method))
        throw util._TypeError("method", "a Method");
    if (this.methods[method.name])
        throw Error("duplicate name '" + method.name + "' in " + this);
    this.methods[method.name] = method;
    method.service = this;
    return this;
};

/**
 * Removes a method from this service.
 * @param {Method} method Method to remove
 * @returns {Service} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If the method is not a member of this service
 */
ServicePrototype.remove = function remove(method) {
    if (!(method instanceof Method))
        throw util._TypeError("method", "a Method");
    if (this.methods[method.name] !== method)
        throw Error(method + " is not a member of " + this);
    delete this.methods[method.name];
    method.service = null;
    return this;
};

},{"./method":10,"./namespace":11,"./util":23}],19:[function(require,module,exports){
// This module provides minimal support for 64 bit values. It's just enough to read and write
// JavaScript numbers and Long-like objects without sacrificing performance. Note that always
// converting hence and forth between longs and strings would yield terrible performance.

// For values less than or equal Number.MAX_SAFE_INTEGER and greater than or equal
// Number.MIN_SAFE_INTEGER, JavaScript numbers are returned. Unsafe values are returned as an
// object with a low and high property corresponding to their respective low and high 32 bits.

// If your application does not deal with unsafe integers, then this implementation is fine for
// you. If you need to properly work with larger numbers, then you don't need to craft this by
// yourself but should install long.js alongside protobuf.js, which will make this module
// reliably return proper Long instances for all 64 bit numbers.

var long_ = exports;

var util = require("../util");

/**
 * Temporary low bits of a 64 bit value.
 * @type {number}
 * @private
 */
long_._lo = 0;

/**
 * Temporary high bits of a 64 bit value.
 * @type {number}
 * @private
 */
long_._hi = 0;

// ref: https://github.com/google/protobuf/blob/master/js/binary/encoder.js

// Reading

/**
 * Reads a varint from the specified reader and stores its low and high bits.
 * @param {Reader} reader Reader to read from
 * @param {function(Reader, number=)} indexOutOfRange Error message function
 * @returns {Object} `this`
 * @private
 */
long_._read = function long_read(reader, indexOutOfRange) {
    var i, b;
    for (i = this._lo = this._hi = 0; i < 4; ++i) {
        if (reader.pos >= reader.len)
            throw RangeError(indexOutOfRange(reader));
        b = reader.buf[reader.pos++];
        this._lo |= (b & 0x7f) << i * 7;
        if (b < 128) {
            this._lo >>>= 0;
            this._hi = 0;
            return long_;
        }
    }
    if (reader.pos >= reader.len)
        throw RangeError(indexOutOfRange(reader));
    b = reader.buf[reader.pos++];
    this._lo |= (b & 0x7f) << 28;
    this._hi |= (b & 0x7f) >> 4;
    if (b < 128) {
        this._lo >>>= 0;
        this._hi >>>= 0;
        return long_;
    }
    for (i = 0; i < 5; ++i) {
        if (reader.pos >= reader.len)
            throw RangeError(indexOutOfRange(reader));
        b = reader.buf[reader.pos++];
        this._hi |= (b & 0x7F) << i * 7 + 3;
        if (b < 128) {
            this._lo >>>= 0;
            this._hi >>>= 0;
            return long_;
        }
    }
    throw Error("illegal varint encoding");
};

/**
 * Reads fixed 64 bits from the specified reader and stores the low and high bits.
 * @param {Reader} reader Reader to read from
 * @returns {Object} `this`
 * @private
 */
long_._readFixed = function long_readFixed(reader) {
    this._lo = (reader.buf[reader.pos++]
              | reader.buf[reader.pos++] << 8
              | reader.buf[reader.pos++] << 16
              | reader.buf[reader.pos++] << 24) >>> 0;
    this._hi = (reader.buf[reader.pos++]
              | reader.buf[reader.pos++] << 8
              | reader.buf[reader.pos++] << 16
              | reader.buf[reader.pos++] << 24) >>> 0;
    return long_;
};

// Writing

/**
 * Writes the low and high bits to the specified writer, as a varint.
 * @param {Writer} writer Writer to write to
 * @param {function(Writer, number)} expand Expand function
 * @returns {Writer} writer
 * @private
 */
long_._write = function long_write(writer, expand) {
    if (writer.len - writer.pos > 9) // fast route
        while (this._hi || this._lo > 127) {
            writer.buf[writer.pos++] = this._lo & 127 | 128;
            this._lo = (this._lo >>> 7 | this._hi << 25) >>> 0;
            this._hi >>>= 7;
        }
    else {
        while (this._hi || this._lo > 127) {
            if (writer.pos >= writer.len)
                expand(writer, 1);
            writer.buf[writer.pos++] = this._lo & 127 | 128;
            this._lo = (this._lo >>> 7 | this._hi << 25) >>> 0;
            this._hi >>>= 7;
        }
        if (writer.pos >= writer.len)
            expand(writer, 1);
    }
    writer.buf[writer.pos++] = this._lo;
    return writer;
};

/**
 * Writes the low and high bits to the specified writer, as fixed 64 bits.
 * @param {Writer} writer Writer to write to
 * @returns {Writer} writer
 * @private
 */
long_._writeFixed = function long_writeFixed(writer) {
    writer.buf[writer.pos++] = this._lo        & 255;
    writer.buf[writer.pos++] = this._lo >>> 8  & 255;
    writer.buf[writer.pos++] = this._lo >>> 16 & 255;
    writer.buf[writer.pos++] = this._lo >>> 24      ;
    writer.buf[writer.pos++] = this._hi        & 255;
    writer.buf[writer.pos++] = this._hi >>> 8  & 255;
    writer.buf[writer.pos++] = this._hi >>> 16 & 255;
    writer.buf[writer.pos++] = this._hi >>> 24      ;
    return writer;
};

// Get / Set

/**
 * Gets the low and high bits as a JavaScript number, long-like object or actual Long.
 * @param {boolean} unsigned Whether unsigned or not
 * @returns {number|!{ low: number, high: number, unsigned: boolean }|!Long} Value read
 * @private
 */
long_._get = function long_get(unsigned) {
    if (util.Long)
        return util.Long.fromBits(this._lo, this._hi, unsigned);
    var neg = this._hi > 2147483647,
        lo = this._lo,
        hi = this._hi;
    if (!unsigned && neg) {
        lo = ~lo + 1 >>> 0;
        hi = ~hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
    }
    var num = lo + hi * 4294967296;
    if (num <= 9007199254740991)
        return neg ? -num : num;
    return { low: this._lo, high: this._hi, unsigned: unsigned };
};

/**
 * Gets the low and high bits as an 8 characters long hash string.
 * @returns {string} Hashed string
 * @private
 */
long_._getHash = function long_getHash() {
    return String.fromCharCode(
        this._lo        & 255,
        this._lo >>> 8  & 255,
        this._lo >>> 16 & 255,
        this._lo >>> 24 & 255,
        this._hi        & 255,
        this._hi >>> 8  & 255,
        this._hi >>> 16 & 255,
        this._hi >>> 24 & 255
    );
};

/**
 * Sets the low and high bits from a number, long-like object or hash string.
 * @param {number|{ low: number, high: number }|Long|string} value Value to set
 * @returns {Object} `this`
 * @private
 */
long_._set = function long_set(value) {
    if (typeof value === 'number') {
        var sign = value < 0;
           value = Math.abs(value);
        this._lo = value >>> 0;
        this._hi = (value - this._lo) / 4294967296 >>> 0;
        if (sign) {
            this._hi = ~this._hi >>> 0;
            this._lo = ~this._lo >>> 0;
            if (++this._lo > 4294967295) {
                this._lo = 0;
                if (++this._hi > 4294967295)
                    this._hi = 0;
            }
        }
    } else if (typeof value === 'object') {
        this._lo = value.low  >>> 0;
        this._hi = value.high >>> 0;
    } else
        long_setHash(value);
    return long_;
};

var charCodeAt = String.prototype.charCodeAt;

function long_setHash(hash) {
    long_._lo = (charCodeAt.call(hash, 0)
                |  charCodeAt.call(hash, 1) << 8
                |  charCodeAt.call(hash, 2) << 16
                |  charCodeAt.call(hash, 3) << 24) >>> 0;
    long_._hi = (charCodeAt.call(hash, 4)
                |  charCodeAt.call(hash, 5) << 8
                |  charCodeAt.call(hash, 6) << 16
                |  charCodeAt.call(hash, 7) << 24) >>> 0;
    return long_;
}

/**
 * Sets the low and high bits from a 8 characters long hash string.
 * @function
 * @param {string} Hashed value to set
 * @returns {Object} `this`
 * @private
 */
long_._setHash = long_setHash;

// Zig-zag encoding

/**
 * Zig-zag encodes the low and high bits.
 * @returns {Object} `this`
 * @private
 */
long_._zigZagEncode = function long_zigZagEncode() { // (n << 1) ^ (n >> 63)
    var mask = -(this._hi >>> 31);
    this._hi = ((this._hi << 1 | this._lo >>> 31) ^ mask) >>> 0;
    this._lo = ( this._lo << 1                    ^ mask) >>> 0;
    return long_;
};

/**
 * Zig-zag decodes the low and high bits.
 * @returns {Object} `this`
 * @private
 */
long_._zigZagDecode = function long_zigZagDecode() { // (n >>> 1) ^ -(n & 1)
    var mask = -(this._lo & 1);
    this._lo = ((this._lo >>> 1 | (this._hi & 1) << 31) ^ mask) >>> 0;
    this._hi = ( this._hi >>> 1                         ^ mask) >>> 0;
    return long_;
};

},{"../util":23}],20:[function(require,module,exports){
/* eslint-disable default-case, callback-return */

module.exports = tokenize;

var delimRe        = /[\s{}=;:\[\],'"\(\)<>]/g,
    stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
    stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;

/**
 * Tokenizes the given .proto source and returns an object with useful utility functions.
 * @param {string} source Source contents
 * @returns {Object} Tokenizer handle
 */
function tokenize(source) {
    source = source.toString();
    
    var offset = 0,
        length = source.length,
        line = 1;
    
    var stack = [];

    var stringDelim = null;

    function readString() {
        var re = stringDelim === '"' ? stringDoubleRe : stringSingleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match)
            throw Error("unterminated string (line " + line + ")");
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return match[1];
    }

    function next() {
        if (stack.length > 0)
            return stack.shift();
        if (stringDelim)
            return readString();
        var repeat,
            prev,
            curr;
        do {
            if (offset === length)
                return null;
            repeat = false;
            while (/\s/.test(curr = source.charAt(offset))) {
                if (curr === '\n')
                    ++line;
                if (++offset === length)
                    return null;
            }
            if (source.charAt(offset) === '/') {
                if (++offset === length)
                    throw Error("unterminated comment (line " + line + ")");
                if (source.charAt(offset) === '/') { // Line
                    while (source.charAt(++offset) !== '\n')
                        if (offset === length)
                            return null;
                    ++offset;
                    ++line;
                    repeat = true;
                } else if ((curr = source.charAt(offset)) === '*') { /* Block */
                    do {
                        if (curr === '\n')
                            ++line;
                        if (++offset === length)
                            return null;
                        prev = curr;
                        curr = source.charAt(offset);
                    } while (prev !== '*' || curr !== '/');
                    ++offset;
                    repeat = true;
                } else
                    return '/';
            }
        } while (repeat);

        if (offset === length)
            return null;
        var end = offset;
        delimRe.lastIndex = 0;
        var delim = delimRe.test(source.charAt(end++));
        if (!delim)
            while (end < length && !delimRe.test(source.charAt(end)))
                ++end;
        var token = source.substring(offset, offset = end);
        if (token === '"' || token === "'")
            stringDelim = token;
        return token;
    }

    function push(token) {
        stack.push(token);
    }

    function peek() {
        if (!stack.length) {
            var token = next();
            if (token === null)
                return null;
            push(token);
        }
        return stack[0];
    }

    function skip(expected) {
        var actual = next();
        if (actual !== expected)
            throw Error("illegal token '" + actual + "' ('" + expected + "' expected, line " + line + ")");
    }

    function omit(optional) {
        var actual = peek();
        if (actual === optional) {
            next();
            return true;
        }
        return false;
    }

    return {
        line: function() { return line; },
        next: next,
        push: push,
        peek: peek,
        skip: skip,
        omit: omit
    };
}
},{}],21:[function(require,module,exports){
module.exports = Type; 

var Namespace = require("./namespace");
/** @alias Namespace.prototype */
var NamespacePrototype = Namespace.prototype;
/** @alias Type.prototype */
var TypePrototype = Namespace.extend(Type, [ "fields", "oneofs", "extensions", "reserved" ]);

var Enum      = require("./enum"),
    OneOf     = require("./oneof"),
    Field     = require("./field"),
    Service   = require("./service"),
    Prototype = require("./prototype"),
    inherits  = require("./inherits"),
    util      = require("./util"),
    Reader    = require("./reader"),
    Writer    = require("./writer"),
    Encoder   = require("./encoder"),
    Decoder   = require("./decoder"),
    codegen   = require("./codegen");

/**
 * Reflected message type.
 * @extends Namespace
 * @constructor
 * @param {string} name Message name
 * @param {Object.<string,*>} [options] Message options
 */
function Type(name, options) {
    Namespace.call(this, name, options);

    /**
     * Message fields.
     * @type {Object.<string,Field>}
     */
    this.fields = {};  // exposed, marker

    /**
     * Oneofs declared within this namespace, if any.
     * @type {Object.<string,OneOf>}
     */
    this.oneofs = undefined; // exposed

    /**
     * Extension ranges, if any.
     * @type {number[][]}
     */
    this.extensions = undefined; // exposed

    /**
     * Reserved ranges, if any.
     * @type {number[][]}
     */
    this.reserved = undefined; // exposed

    /**
     * Cached fields by id.
     * @type {?Object.<number,Field>}
     * @private
     */
    this._fieldsById = null;

    /**
     * Cached fields as an array.
     * @type {?Field[]}
     * @private
     */
    this._fieldsArray = null;

    /**
     * Cached oneofs as an array.
     * @type {?OneOf[]}
     * @private
     */
    this._oneofsArray = null;

    /**
     * Cached prototype.
     * @type {?Prototype}
     * @private
     */
    this._prototype = null;

    /**
     * Registered constructor.
     * @type {?Function}
     * @private
     */
    this._constructor = null;
}

/**
 * Whether to use code generation or not. Will be set to `false` automatically if code generation
 * on any type or field failed.
 * @type {boolean}
 */
Type.useCodegen = true;

Object.defineProperties(TypePrototype, {

    /**
     * Message fields by id.
     * @name Type#fieldsById
     * @type {Object.<number,Field>}
     * @readonly
     */
    fieldsById: {
        get: function() {
            if (this._fieldsById)
                return this._fieldsById;
            this._fieldsById = {};
            var names = Object.keys(this.fields);
            for (var i = 0, k = names.length; i < k; ++i) {
                var field = this.fields[names[i]],
                    id = field.id;
                if (this._fieldsById[id])
                    throw Error("duplicate id " + id + " in " + this);
                this._fieldsById[id] = field;
            }
            return this._fieldsById;
        }
    },

    /**
     * Fields of this message as an array for iteration.
     * @name Type#fieldsArray
     * @type {Field[]}
     * @readonly
     */
    fieldsArray: {
        get: function() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
    },

    /**
     * Oneofs of this message as an array for iteration.
     * @name Type#oneofsArray
     * @type {OneOf[]}
     * @readonly
     */
    oneofsArray: {
        get: function() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
    },

    /**
     * Runtime prototype of this message.
     * @name Type#prototype
     * @type {Prototype}
     * @readonly
     */
    prototype: {
        get: function() {
            return this._prototype || (this._prototype = inherits.defineProperties(new Prototype(), this));
        }
    }
});

/**
 * Clears the internal cache on a message type.
 * @param {Type} type Message type
 * @returns {Type} type
 * @inner
 * @ignore
 */
function clearCache(type) {
    type._fieldsById = type._fieldsArray = type._oneofsArray = type._prototype = null;
    delete type.encode_;
    delete type.decode_;
    return type;
}

/**
 * Tests if the specified JSON object describes a message type.
 * @param {*} json JSON object to test
 * @returns {boolean} `true` if the object describes a message type
 */
Type.testJSON = function testJSON(json) {
    return Boolean(json && json.fields);
};

var nestedTypes = [ Enum, Type, Service ];

/**
 * Creates a type from JSON.
 * @param {string} name Message name
 * @param {Object} json JSON object
 * @returns {Type} Created message type
 */
Type.fromJSON = function fromJSON(name, json) {
    var type = new Type(name, json.options);
    type.extensions = json.extensions;
    type.reserved = json.reserved;
    if (json.fields)
        Object.keys(json.fields).forEach(function(fieldName) {
            type.add(Field.fromJSON(fieldName, json.fields[fieldName]));
        });
    if (json.oneofs)
        Object.keys(json.oneofs).forEach(function(oneOfName) {
            type.add(OneOf.fromJSON(oneOfName, json.oneofs[oneOfName]));
        });
    if (json.nested)
        Object.keys(json.nested).forEach(function(nestedName) {
            var nested = json.nested[nestedName];
            for (var i = 0, k = nestedTypes.length, clazz; i < k; ++i)
                if ((clazz = nestedTypes[i]).testJSON(nested)) {
                    type.add(clazz.fromJSON(nestedName, nested));
                    return;
                }
            throw Error("invalid nested object in " + type + ": " + nestedName);
        });
    return type;
};

/**
 * @override
 */
TypePrototype.resolveAll = function resolve() {
    this.each(function(field) {
        field.resolve();
    }, this, this.fields);
    if (this.oneofs)
        this.each(function(oneof) {
            oneof.resolve();
        }, this, this.oneofs);
    return NamespacePrototype.resolve.call(this);
};

/**
 * @override
 */
TypePrototype.get = function get(name) {
    return NamespacePrototype.get.call(this, name) || this.fields && this.fields[name] || this.oneofs && this.oneofs[name] || null;
};

/**
 * @override
 */
TypePrototype.add = function add(object) {
    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + '" in ' + this);
    if (object instanceof Field) {
        // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
        // The root object takes care of adding distinct sister-fields to the respective extended
        // type instead.
        if (object.extend === undefined) {
            if (object.parent)
                object.parent.remove(object);
            clearCache(this).fields[object.name] = object;
            object.message = this;
            object.onAdd(this);
        } else {
            if (!this.nested)
                this.nested = {};
            else if (this.get(object.name))
                throw Error("duplicate name '" + object.name + "' in " + this);
            this.nested[object.name] = object;
            object.onAdd(this);
        }
        return this;
    }
    if (object instanceof OneOf) {
        if (!this.oneofs)
            this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return this;
    }
    return NamespacePrototype.add.call(this, object);
};

/**
 * @override
 */
TypePrototype.remove = function remove(object) {
    if (object instanceof Field && object.extend === undefined) {
        // See Type#add for the reason why extension fields are excluded here.
        if (this.fields[object.name] !== object)
            throw Error("not a member of " + this);
        delete clearCache(this).fields[object.name];
        object.message = null;
        return this;
    }
    return NamespacePrototype.remove.call(this, object);
};

/**
 * Registers the specified constructor with this type.
 * @param {?Function} constructor Constructor to use for message instances or `null` to unregister
 *  the current constructor
 * @returns {Type} `this`
 */
TypePrototype.register = function register(constructor) {
    if (constructor !== null && typeof constructor !== 'function')
        throw util._TypeError("constructor", "a function or null");
    this._constructor = constructor;
    return this;
};

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object} [properties] Properties to set
 * @param {?Function} [constructor] Optional constructor to use or null to use the internal
 *  prototype. If a constructor, it should extend {@link Prototype}.
 * @returns {Prototype} Message instance
 */
TypePrototype.create = function create(properties, constructor) {
    if (typeof properties === 'function') {
        constructor = properties;
        properties = undefined;
    } else if (properties /* already */ instanceof Prototype)
        return properties;
    if (!constructor)
        constructor = this._constructor;
    if (constructor)
        return new constructor(properties);
    var message = Object.create(this.prototype);
    if (properties) {
        var keys = Object.keys(properties);
        for (var i = 0, k = keys.length, key; i < k; ++i)
            message[key = keys[i]] = properties[key];
    }
    return message;
};

/**
 * Creates a new message of this type by using the registered constructor or internal prototype.
 * @returns {Prototype} Message instance
 */
TypePrototype.create_ = function create_internal() {
    return this._constructor
        ? new this._constructor()
        : Object.create(this.prototype);
};

/**
 * Encodes a message of this type.
 * @param {Prototype|Object} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encode = function encode(message, writer) {
    return this.encode_(message, writer || Writer());
};

/**
 * Encodes a message of this type. This method differs from {@link Type#encode} in that it expects
 * already type checked and known to be present arguments.
 * @param {Prototype|Object} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encode_ = function encode_internal(message, writer) {
    var encoder = new Encoder(this);
    this.encode_ = codegen.supported
        ? encoder.generate()
        : encoder.encode.bind(encoder);
    return this.encode_(message, writer);
};

/**
 * Encodes a message of this type preceeded by its byte length as a varint.
 * @param {Prototype|Object} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encodeDelimited_(message, writer || Writer());
};

/**
 * Encodes a message of this type preceeded by its byte length as a varint. This method differs
 * from {@link Type#encodeDelimited} in that it expects already type checked and known to be present arguments.
 * @param {Prototype|Object} message Message instance or plain object
 * @param {Writer} writer Writer to encode to
 * @returns {Writer} writer
 */
TypePrototype.encodeDelimited_ = function encodeDelimited_internal(message, writer) {
    return writer.bytes(this.encode_(message, writer.fork()).finish());
};

/**
 * Decodes a message of this type.
 * @param {Reader|number[]} readerOrBuffer Reader or buffer to decode from
 * @param {Function} [constructor] Optional constructor of the created message, see {@link Type#create}
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Prototype} Decoded message
 */
TypePrototype.decode = function decode(readerOrBuffer, constructor, length) {
    if (typeof constructor === 'number') {
        length = constructor;
        constructor = this._constructor;
    } else if (!constructor)
        constructor = this._constructor;
    var reader  = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader(readerOrBuffer),
        message = this._constructor ? new this._constructor() : Object.create(this.prototype),
        limit   = length === undefined ? reader.len : reader.pos + length;
    return this.decode_(reader, message, limit);
};

/**
 * Decodes a message of this type. This method differs from {@link Type#decode} in that it expects
 * already type checked and known to be present arguments.
 * @function
 * @param {Reader} reader Reader to decode from
 * @param {Prototype} message Message instance to populate
 * @param {number} limit Maximum read offset
 * @returns {Prototype} Populated message instance
 */
TypePrototype.decode_ = function decode_internal(reader, message, limit) {
    var decoder = new Decoder(this);
    this.decode_ = codegen.supported
        ? decoder.generate()
        : decoder.decode.bind(decoder);
    return this.decode_(reader, message, limit);
};

/**
 * Decodes a message of this type preceeded by its byte length as a varint.
 * @param {Reader|number[]} readerOrBuffer Reader or buffer to decode from
 * @param {Function} [constructor] Optional constructor of the created message, see {@link Type#create}
 * @returns {Prototype} Decoded message
 */
TypePrototype.decodeDelimited = function decodeDelimited(readerOrBuffer, constructor) {
    var reader = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader(readerOrBuffer);
    return this.decode(reader, constructor, reader.uint32());
};

/**
 * Decodes a message of this type preceeded by its byte length as a varint. This method differs
 * from {@link Type#decodeDelimited} in that it expects already type checked and known to be
 * present arguments.
 * @param {Reader} reader Reader to decode from
 * @param {Prototype} message Message instance to populate
 * @returns {Prototype} Populated message instance
 */
TypePrototype.decodeDelimited_ = function decodeDelimited_internal(reader, message) {
    return this.decode_(reader, message, reader.uint32() + reader.pos);
};

},{"./codegen":2,"./decoder":3,"./encoder":4,"./enum":5,"./field":6,"./inherits":8,"./namespace":11,"./oneof":13,"./prototype":15,"./reader":16,"./service":18,"./util":23,"./writer":24}],22:[function(require,module,exports){
// NOTE: These types are structured in a way that makes looking up wire types and similar fast,
// but not necessarily comfortable. Do not modify them unless you know exactly what you are doing.

/**
 * Common type constants.
 * @namespace
 */
var types = module.exports = {};

/**
 * Basic type wire types.
 * @type {Object.<string,number>}
 */
types.wireTypes = {

    double   : 1,
    float    : 5,
    int32    : 0,
    uint32   : 0,
    sint32   : 0,
    int64    : 0,
    uint64   : 0,
    sint64   : 0,
    fixed32  : 5,
    sfixed32 : 5,
    fixed64  : 1,
    sfixed64 : 1,
    bool     : 0,
    string   : 2,
    bytes    : 2
    
};

/**
 * Basic long type wire types.
 * @type {Object.<string,number>}
 */
types.longWireTypes = {

    int64    : 0,
    uint64   : 0,
    sint64   : 0,
    fixed64  : 1,
    sfixed64 : 1

};

/**
 * Basic type defaults.
 * @type {Object.<string,*>}
 */
types.defaults = {

    double   : 0,
    float    : 0,
    int32    : 0,
    uint32   : 0,
    sint32   : 0,
    int64    : 0,
    uint64   : 0,
    sint64   : 0,
    fixed32  : 0,
    sfixed32 : 0,
    fixed64  : 0,
    sfixed64 : 0,
    bool     : false,
    string   : "",
    bytes    : null

};

/**
 * Allowed types for map keys with their associated wire type.
 * @type {Object.<string,number>}
 */
types.mapKeyWireTypes = {

    int32    : 0,
    uint32   : 0,
    sint32   : 0,
    int64    : 0,
    uint64   : 0,
    sint64   : 0,
    fixed32  : 5,
    sfixed32 : 5,
    fixed64  : 1,
    sfixed64 : 1,
    bool     : 0,
    string   : 2

};

/**
 * Allowed types for packed repeated fields with their associated wire type.
 * @type {Object.<string,number>}
 */
types.packableWireTypes = {

    int32    : 0,
    uint32   : 0,
    sint32   : 0,
    int64    : 0,
    uint64   : 0,
    sint64   : 0,
    fixed32  : 5,
    sfixed32 : 5,
    fixed64  : 1,
    sfixed64 : 1,
    bool     : 0

};

},{}],23:[function(require,module,exports){
/**
 * Utility functions.
 * @namespace
 */
var util = module.exports = {};

var Reader = require("./reader"),
    Writer = require("./writer"),
    long_  = require("./support/long");

/**
 * Optional buffer class to use. If you assign any compatible buffer implementation to this
 * property, the library will use it.
 * @memberof util
 * @type {?Function}
 */
Object.defineProperty(util, "Buffer", {
    get: function() {
        return Writer.Buffer;
    },
    set: function(value) {
        Writer.Buffer = Reader.Buffer = value;
    }
});

try { util.Buffer = require("buffer").Buffer; } catch (e) {} // eslint-disable-line no-empty

/**
 * Optional Long class to use. If you assign any compatible long implementation to this property,
 * the library will use it.
 * @type {?Function}
 */
util.Long = null;

try { util.Long = require("long"); } catch (e) {} // eslint-disable-line no-empty

/**
 * Tests if the specified value is a string.
 * @memberof util
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

util.isString = isString;

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return Boolean(value && typeof value === 'object');
};

/**
 * Tests if the specified value is an array.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an array
 */
util.isArray = Array.isArray;

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

/**
 * Converts an object's values to an array.
 * @param {Object.<string,*>} object Object to convert
 * @returns {Array.<*>} Converted array
 */
util.toArray = function toArray(object) {
    if (!object)
        return [];
    var names = Object.keys(object),
        length = names.length;
    var array = new Array(length);
    for (var i = 0; i < length; ++i)
        array[i] = object[names[i]];
    return array;
};

/**
 * Creates a type error.
 * @param {string} name Argument name
 * @param {string} [description=a string] Expected argument descripotion
 * @returns {TypeError} Created type error
 * @private
 */
util._TypeError = function(name, description) {
    return TypeError(name + " must be " + (description || "a string"));
};

/**
 * Returns a promise from a node-style function.
 * @memberof util
 * @param {function(Error, ...*)} fn Function to call
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn/*, varargs */) {
    return new Promise(function(resolve, reject) {
        fn.apply(null, Array.prototype.slice.call(arguments, 1).concat([
            function(err/*, varargs */) {
                if (err) reject(err);
                else resolve.apply(null, Array.prototype.slice.call(arguments, 1));
            }
        ]));
    });
}

util.asPromise = asPromise;

/**
 * Fetches the contents of a file.
 * @memberof util
 * @param {string} path File path or url
 * @param {function(?Error, string=)} [callback] Node-style callback
 * @returns {Promise<string>|undefined} Promise if callback has been omitted 
 */
function fetch(path, callback) {
    if (!callback)
        return asPromise(fetch, path);
    var fs; try { fs = require("fs"); } catch (e) {} // eslint-disable-line no-empty
    if (fs && fs.readFile)
        return fs.readFile(path, "utf8", callback);
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status !== 0 && xhr.status !== 200)
            return callback(Error("status " + xhr.status));
        if (isString(xhr.responseText))
            return callback(null, xhr.responseText);
        return callback(Error("request failed"));
    };
    xhr.onerror = function() {
        return callback(Error("request failed"));
    };
    xhr.open("GET", path, true);
    return undefined;
}

util.fetch = fetch;

/**
 * Tests if the specified path is absolute.
 * @memberof util
 * @param {string} path Path to test
 * @returns {boolean} `true` if path is absolute
 */
function isAbsolutePath(path) {
    return /^(?:\/|[a-zA-Z0-9]+:)/.test(path);
}

util.isAbsolutePath = isAbsolutePath;

/**
 * Normalizes the specified path.
 * @memberof util
 * @param {string} path Path to normalize
 * @returns {string} Normalized path
 */
function normalizePath(path) {
    path = path.replace(/\\/g, '/')
               .replace(/\/{2,}/g, '/');
    var parts = path.split('/');
    var abs = isAbsolutePath(path);
    var prefix = "";
    if (abs)
        prefix = parts.shift() + '/';
    for (var i = 0, k = parts.length, part; i < k;)
        if ((part = parts[i]) === '..') {
            if (i > 0)
                parts.splice(--i, 2);
            else if (abs)
                parts.splice(i, 1);
            else
                ++i;
        } else if (part === '.')
            parts.splice(i, 1);
        else
            ++i;    return prefix + parts.join('/');
}

util.normalizePath = normalizePath;

/**
 * Resolves the specified include path against the specified origin path.
 * @param {string} originPath Path that was used to fetch the origin file
 * @param {string} importPath Import path specified in the origin file
 * @param {boolean} [alreadyNormalized] `true` if both paths are already known to be normalized
 * @returns {string} Path to the imported file
 */
util.resolvePath = function resolvePath(originPath, importPath, alreadyNormalized) {
    if (!alreadyNormalized)
        importPath = normalizePath(importPath);
    if (isAbsolutePath(importPath))
        return importPath;
    if (!alreadyNormalized)
        originPath = normalizePath(originPath);
    originPath = originPath.replace(/\/[^/]+$/, '');
    return originPath.length ? normalizePath(originPath + '/' + importPath) : importPath;
};

/**
 * Converts a number or long-like object to an 8 characters long hash string.
 * @param {number|{ low: number, high: number }} value Value to convert
 * @returns {string} Hashed value
 */
util.toHash = function toHash(value) {
    return long_._set(value)._getHash();
};

/**
 * Converts an 8 characters long hash string to a number or long-like object.
 * @param {string} hash Hashed value to convert
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number|{ low: number, high: number, unsigned: boolean }} Original value
 */
util.fromHash = function fromHash(hash, unsigned) {
    return long_._setHash(hash)._get(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @param {Object} dst Destination object
 * @param {Object} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object} Destination object
 */
util.merge = function merge(dst, src, ifNotSet) {
    if (src) {
        var keys = Object.keys(src);
        for (var i = 0, k = keys.length, key; i < k; ++i)
            if (!dst[key = keys[i]] || !ifNotSet)
                dst[key] = src[key];
    }
    return dst;
};

},{"./reader":16,"./support/long":19,"./writer":24,"buffer":"buffer","fs":undefined,"long":"long"}],24:[function(require,module,exports){
module.exports = Writer;

/**
 * Buffer implementation, if available.
 * @type {?Function}
 */
Writer.Buffer = null;

Writer.BufferWriter = BufferWriter;

var long_   = require("./support/long"),
    ieee754 = require("../lib/ieee754");

/**
 * Default buffer size.
 * @type {number}
 */
Writer.BUFFER_SIZE = 1024;

/**
 * Wire format writer using arrays.
 * @exports Writer
 * @constructor
 */
function Writer() {
    if (!(this instanceof Writer))
        return Writer.Buffer
            ? new BufferWriter()
            : new Writer();

    /**
     * Current buffer.
     * @type {?number[]}
     */
    this.buf = null;

    /**
     * Current buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Completed buffers.
     * @type {number[][]}
     */
    this.bufs = [];

    /**
     * Forked states stack.
     * @type {number[][][]}
     * @private
     */
    this._stack = [];
}

/** @alias Writer.prototype */
var WriterPrototype = Writer.prototype;

var emptyArray = null;

/**
 * Sets up the Writer class before first use. This is done automatically when the first buffer is
 * allocated.
 * @returns {Function} `Writer`
 */
Writer.setup = function setup() {
    var ArrayImpl = typeof Uint8Array !== 'undefined'
        ? Uint8Array
        : Array;

    WriterPrototype._slice = ArrayImpl.prototype.slice || ArrayImpl.prototype.subarray;

    WriterPrototype._set = ArrayImpl.prototype.set || function set_array(array, offset) {
        if (offset + array.length > this.length)
            throw RangeError("offset would store beyond the end of the array");
        for (var i = 0, k = array.length; i < k; ++i)
            this[offset + i] = array[i];
    };

    function alloc_array(size) {
        alloc_array.count++;
        alloc_array.bytes += size;
        return new ArrayImpl(size);
    }
    alloc_array.count = alloc_array.total = 0;
    Writer.alloc = alloc_array;

    emptyArray = Writer.alloc(0);
    if (Object.freeze)
        try { Object.freeze(emptyArray); } catch(e) {} // eslint-disable-line no-empty

    return Writer;
};

/**
 * Allocates a chunk of memory.
 * @param {number} size Buffer size
 * @returns {number[]} Allocated buffer
 */
Writer.alloc = function alloc_array_setup(size) {
    return Writer.setup().alloc(size); // overrides this method
};

/**
 * Allocates more memory on the specified writer.
 * @param {Writer} writer Writer to expand
 * @param {number} writeLength Write length requested
 * @returns {undefined}
 * @inner
 * @ignore
 */
function expand(writer, writeLength) {
    if (writer.pos)
        writer.bufs.push(writer._slice.call(writer.buf, 0, writer.pos));
    writer.buf = writer.constructor.alloc(writer.len = Math.max(writeLength, Writer.BUFFER_SIZE));
    writer.pos = 0;
}

/**
 * Writes a tag.
 * @param {number} id Field id
 * @param {number} wireType Wire type
 * @returns {Writer} `this`
 */
WriterPrototype.tag = function write_tag(id, wireType) {
    if (this.pos + 1 > this.len)
        expand(this, 1);
    this.buf[this.pos++] = (id << 3 | wireType & 7) & 255;
    return this;
};

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.uint32 = function write_uint32(value) {
    value >>>= 0;
    if (this.len - this.pos > 4) // fast route
        while (value > 127) {
            this.buf[this.pos++] = value & 127 | 128;
            value >>>= 7;
        }
    else {
        while (value > 127) {
            if (this.pos >= this.len)
                expand(this, 1);
            this.buf[this.pos++] = value & 127 | 128;
            value >>>= 7;
        }
        if (this.pos >= this.len)
            expand(this, 1);
    }
    this.buf[this.pos++] = value;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.int32 = WriterPrototype.uint32;

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.sint32 = function write_sint32(value) {
    return this.uint32(value << 1 ^ value >> 31);
};

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {number|{ low: number, high: number }|Long} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.uint64 = function write_uint64(value) {
    return long_._set(value)
                ._write(this, expand);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {number|{ low: number, high: number }|Long} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.int64 = WriterPrototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {number|{ low: number, high: number }|Long} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.sint64 = function sint64(value) {
    return long_._set(value)
                ._zigZagEncode()
                ._write(this, expand);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.bool = function write_bool(value) {
    if (this.pos >= this.len)
        expand(this, 1);
    this.buf[this.pos++] = value ? 1 : 0;
    return this;
};

/**
 * Writes a 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.fixed32 = function write_fixed32(value) {
    if (this.pos + 4 > this.len)
        expand(this, 4);
    this.buf[this.pos++] = (value >>>= 0) & 255;
    this.buf[this.pos++] =  value >>> 8   & 255;
    this.buf[this.pos++] =  value >>> 16  & 255;
    this.buf[this.pos++] =  value >>> 24  & 255;
    return this;
};

/**
 * Writes a 32 bit value as fixed 32 bits, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.sfixed32 = function write_sfixed32(value) {
    return this.fixed32(value << 1 ^ value >> 31);
};

/**
 * Writes a 64 bit value as fixed 64 bits.
 * @param {number|{ low: number, high: number }|Long} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.fixed64 = function write_fixed64(value) {
    if (this.pos + 8 > this.len)
        expand(this, 8);
    return long_._set(value)
                ._writeFixed(this);
};

/**
 * Writes a 64 bit value as fixed 64 bits, zig-zag encoded.
 * @param {number|{ low: number, high: number }|Long} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.sfixed64 = function write_sfixed64(value) {
    if (this.pos + 8 > this.len)
        expand(this, 8);
    return long_._set(value)
                ._zigZagEncode()
                ._writeFixed(this);
};

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.float = function write_float(value) {
    if (this.pos + 4 > this.len)
        expand(this, 4);
    ieee754.write(this.buf, value, this.pos, true, 23, 4);
    this.pos += 4;
    return this;
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.double = function write_double(value) {
    if (this.pos + 8 > this.len)
        expand(this, 8);
    ieee754.write(this.buf, value, this.pos, true, 52, 8);
    this.pos += 8;
    return this;
};

/**
 * Writes a sequence of bytes.
 * @param {number[]} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.bytes = function write_bytes(value) {
    var len = value.length;
    if (len) {
        this.uint32(len);
        if (this.pos + len > this.len)
            expand(this, len);
        this._set.call(this.buf, value, this.pos);
        this.pos += len;
    } else {
        if (this.pos >= this.len)
            expand(this, 1);
        this.buf[this.pos++] = 0;
    }
    return this;
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.string = function write_string(value) {
    // ref: https://github.com/google/closure-library/blob/master/closure/goog/crypt/crypt.js
    var len = value.length;
    if (len) {
        var out = new Array(len << 2), p = 0;
        for (var i = 0; i < len; i++) {
            var c1 = value.charCodeAt(i), c2;
            if (c1 < 128) {
                out[p++] = c1;
            } else if (c1 < 2048) {
                out[p++] = c1 >> 6 | 192;
                out[p++] = c1 & 63 | 128;
            } else if ((c1 & 0xFC00) === 0xD800 && i + 1 < len && ((c2 = value.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
                c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
                ++i;
                out[p++] =  c1 >> 18      | 240;
                out[p++] =  c1 >> 12 & 63 | 128;
                out[p++] =  c1 >> 6  & 63 | 128;
                out[p++] =  c1       & 63 | 128;
            } else {
                out[p++] = c1 >> 12      | 224;
                out[p++] = c1 >> 6  & 63 | 128;
                out[p++] = c1       & 63 | 128;
            }
        }
        return this.bytes(out.slice(0, p));
    }
    if (this.pos >= this.len)
        expand(this, 1);
    this.buf[this.pos++] = 0;
    return this;
};

/**
 * Writer state.
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {
    this.bufs = writer.bufs;
    this.buf  = writer.buf;
    this.pos  = writer.pos;
    this.len  = writer.len;
}

/**
 * Applies this state to the specified writer.
 * @param {Writer} writer Writer to copy state to
 * @returns {undefined}
 * @ignore
 */
State.prototype.apply = function apply(writer) {
    writer.bufs = this.bufs;
    writer.buf  = this.buf;
    writer.pos  = this.pos;
    writer.len  = this.len;
};

/**
 * Forks this writer's state by pushing it to a stack and reusing the remaining buffer
 * for a new set of write operations. A call to {@link Writer#reset} or {@link Writer#finish}
 * resets the writer to the previous state.
 * @returns {Writer} `this`
 */
WriterPrototype.fork = function fork() {
    this._stack.push(new State(this));
    this.bufs = [];
    this.buf = null;
    this.pos = this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state. If there is no last state, all references
 * to previous buffers will be cleared.
 * @returns {Writer} `this`
 */
WriterPrototype.reset = function reset() {
    if (this._stack.length)
        this._stack.pop().apply(this);
    else {
        this.bufs = [];
        this.buf = null;
        this.pos = this.len = 0;
    }
    return this;
};

/**
 * Finishes the current sequence of write operations and frees all resources.
 * @returns {number[]} Finished buffer
 */
WriterPrototype.finish = function finish() {
    var bufs = this.bufs,
        buf  = this.buf,
        pos  = this.pos,
        len  = this.len;
    this.reset();
    if (buf) {
        if (pos < len)
            buf = this._slice.call(buf, 0, pos);
        if (!bufs.length)
            return buf;
    } else
        return emptyArray;
    len = pos;
    pos = 0;
    var i = 0,
        k = bufs.length;
    while (i < k)
        len += bufs[i++].length;
    var concat = this.constructor.alloc(len),
        sub;
    i = 0;
    while (i < k) {
        this._set.call(concat, sub = bufs[i++], pos);
        pos += sub.length;
    }
    this._set.call(concat, buf, pos);
    return concat;
};

/**
 * Wire format writer using node buffers.
 * @exports BufferWriter
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/** @alias BufferWriter.prototype */
var BufferWriterPrototype = BufferWriter.prototype = Object.create(Writer.prototype);
BufferWriterPrototype.constructor = BufferWriter;

var emptyBuffer = null;

/**
 * Sets up the BufferWriter class to use the available buffer implementation. This is done
 * automatically when the first buffer is allocated. If the Buffer implementation is changed
 * after the first buffer has been allocated, this method must be called again manually.
 * @returns {Function} `BufferWriter`
 */
BufferWriter.setup = function setup_buffer() {
    if (!Writer.Buffer)
        throw Error("Buffer is not supported");

    BufferWriterPrototype._slice = Writer.Buffer.prototype.slice;

    BufferWriter.alloc = Writer.Buffer.allocUnsafe || Writer.Buffer.alloc || function alloc_buffer(size) { return new Writer.Buffer(size); };

    emptyBuffer = BufferWriter.alloc(0);
    if (Object.freeze)
        try { Object.freeze(emptyBuffer); } catch (e) {} // eslint-disable-line no-empty

    return BufferWriter;
};

/**
 * Allocates a chunk of memory using node buffers.
 * @param {number} size Buffer size
 * @returns {Buffer} Allocated buffer
 */
BufferWriter.alloc = function alloc_buffer_setup(size) {
    return BufferWriter.setup().alloc(size); // overrides this method
};

/**
 * Writes a float (32 bit) using node buffers.
 * @param {number} value Value to write
 * @returns {BufferWriter} `this`
 */
BufferWriterPrototype.float = function write_float_buffer(value) {
    if (this.pos + 4 > this.len)
        expand(this, 4);
    this.buf.writeFloatLE(value, this.pos, true);
    this.pos += 4;
    return this;
};

/**
 * Writes a double (64 bit float) using node buffers.
 * @param {number} value Value to write
 * @returns {BufferWriter} `this`
 */
BufferWriterPrototype.double = function write_double_buffer(value) {
    if (this.pos + 8 > this.len)
        expand(this, 8);
    this.buf.writeDoubleLE(value, this.pos, true);
    this.pos += 8;
    return this;
};

/**
 * Writes a sequence of bytes using node buffers.
 * @param {Buffer} value Value to write
 * @returns {BufferWriter} `this`
 */
BufferWriterPrototype.bytes = function write_bytes_buffer(value) {
    var len = value.length;
    this.uint32(len);
    if (len) {
        if (this.pos + len > this.len)
            expand(this, len);
        value.copy(this.buf, this.pos, 0, len);
        this.pos += len;
    }
    return this;
};

/**
 * Writes a string using node buffers.
 * @param {string} value Value to write
 * @returns {BufferWriter} `this`
 */
BufferWriterPrototype.string = function write_string_buffer(value) {
    var len = Writer.Buffer.byteLength(value);
    this.uint32(len);
    if (len) {
        if (this.pos + len > this.len)
            expand(this, len);
        this.buf.write(value, this.pos, len, "utf8");
        this.pos += len;
    }
    return this;
};

/**
 * Finishes the current sequence of write operations using node buffers and frees all resources.
 * @returns {Buffer} Finished buffer
 */
BufferWriterPrototype.finish = function finish_buffer() {
    var bufs = this.bufs,
        buf  = this.buf,
        pos  = this.pos;
    this.reset();
    if (buf) {
        if (bufs.length === 0)
            return buf.slice(0, pos);
        bufs.push(buf.slice(0, pos));
        return Writer.Buffer.concat(bufs);
    }
    return emptyBuffer;
};

},{"../lib/ieee754":1,"./support/long":19}]},{},[7])


//# sourceMappingURL=protobuf.js.map
