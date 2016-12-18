/*!
 * protobuf.js v6.3.0 (c) 2016 Daniel Wirtz
 * Compiled Sun, 18 Dec 2016 20:06:01 UTC
 * Licensed under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/protobuf.js for details
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright (c) 2008, Fair Oaks Labs, Inc.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
//
//  * Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
//  * Neither the name of Fair Oaks Labs, Inc. nor the names of its contributors
//    may be used to endorse or promote products derived from this software
//    without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
//
// Modifications to writeIEEE754 to support negative zeroes made by Brian White

// ref: https://github.com/nodejs/node/blob/87286cc7371886d9856edf424785aaa890ba05a9/lib/buffer_ieee754.js

exports.read = function readIEEE754(buffer, offset, isBE, mLen, nBytes) {
    var e, m,
        eLen = nBytes * 8 - mLen - 1,
        eMax = (1 << eLen) - 1,
        eBias = eMax >> 1,
        nBits = -7,
        i = isBE ? 0 : (nBytes - 1),
        d = isBE ? 1 : -1,
        s = buffer[offset + i];

    i += d;

    e = s & ((1 << (-nBits)) - 1);
    s >>= (-nBits);
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

    m = e & ((1 << (-nBits)) - 1);
    e >>= (-nBits);
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

    if (e === 0) {
        e = 1 - eBias;
    } else if (e === eMax) {
        return m ? NaN : ((s ? -1 : 1) * Infinity);
    } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function writeIEEE754(buffer, value, offset, isBE, mLen, nBytes) {
    var e, m, c,
        eLen = nBytes * 8 - mLen - 1,
        eMax = (1 << eLen) - 1,
        eBias = eMax >> 1,
        rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
        i = isBE ? (nBytes - 1) : 0,
        d = isBE ? -1 : 1,
        s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

    value = Math.abs(value);

    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) {
            value += rt / c;
        } else {
            value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
            e++;
            c /= 2;
        }

        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }

    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

    buffer[offset + i - d] |= s * 128;
};

},{}],2:[function(require,module,exports){
"use strict";

/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var string = []; // alt: new Array(Math.ceil((end - start) / 3) * 4);
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                string[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                string[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                string[i++] = b64[t | b >> 6];
                string[i++] = b64[b & 63];
                j = 0;
                break;
        }
    }
    if (j) {
        string[i++] = b64[t];
        string[i  ] = 61;
        if (j === 1)
            string[i + 1] = 61;
    }
    return String.fromCharCode.apply(String, string);
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

},{}],3:[function(require,module,exports){
"use strict";
module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}

},{}],4:[function(require,module,exports){
"use strict";
module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}

},{}],5:[function(require,module,exports){
"use strict";

/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = [],
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            parts.push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (i)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
    return parts.join("");
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};

},{}],6:[function(require,module,exports){
// This file exports just the bare minimum required to work with statically generated code.
// Can be used as a drop-in replacement for the full library as it has the same general structure.
var protobuf = exports;

protobuf.Writer = require(11);
protobuf.BufferWriter = require(12);
protobuf.Reader = require(7);
protobuf.BufferReader = require(8);
protobuf.util = require(10);
protobuf.roots = {};
protobuf.configure = configure;

function configure() {
    Reader._configure();
}

// Be nice to AMD
if (typeof define === "function" && define.amd)
    define(["long"], function(Long) {
        if (Long) {
            protobuf.util.Long = Long;
            configure();
        }
        return protobuf;
    });

},{"10":10,"11":11,"12":12,"7":7,"8":8}],7:[function(require,module,exports){
"use strict";
module.exports = Reader;

var util      = require(10),
    ieee754   = require(1);

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

var ArrayImpl = typeof Uint8Array !== "undefined" ? Uint8Array : Array;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {
    
    /**
     * Read buffer.
     * @type {Uint8Array}
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

/**
 * Creates a new reader using the specified buffer.
 * @param {Uint8Array} buffer Buffer to read from
 * @returns {BufferReader|Reader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 */
Reader.create = function create(buffer) {
    if (util.Buffer) {
        if (!BufferReader)
            BufferReader = require(8);
        return new BufferReader(buffer);
    }
    return new Reader(buffer);
};

/** @alias Reader.prototype */
var ReaderPrototype = Reader.prototype;

ReaderPrototype._slice = ArrayImpl.prototype.subarray || ArrayImpl.prototype.slice;

var read_uint32 = 
/**
 * Reads a varint as an unsigned 32 bit value.
 * @returns {number} Value read
 */
ReaderPrototype.uint32 = function read_uint32() {
    // FIXME: tends to soft-deopt with "Insufficient type feedback for generic named access", which
    // is not a problem, but with --trace-deopt, node v4-v7 always crashes when the above happens.
    var value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;
    /* istanbul ignore next */
    if ((this.pos += 5) > this.len) {
        this.pos = this.len;
        throw indexOutOfRange(this, 10);
    }
    return value;
};

// See comment above. While unnecessary code, this prevents crashing with --trace-deopt (node 6.9.1).
read_uint32.call({
    buf: [255,255,255,255,15],
    pos: 0,
    len: 5
});

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
ReaderPrototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
ReaderPrototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0),
        i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (i = 0; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
    } else {
        for (i = 0; i < 4; ++i) {
            /* istanbul ignore next */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        /* istanbul ignore next */
        if (this.pos >= this.len)
            throw indexOutOfRange(this);
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (i = 0; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (i = 0; i < 5; ++i) {
            /* istanbul ignore next */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    throw Error("invalid varint encoding");
}

function read_int64_long() {
    return readLongVarint.call(this).toLong();
}

function read_int64_number() {
    return readLongVarint.call(this).toNumber();
}

function read_uint64_long() {
    return readLongVarint.call(this).toLong(true);
}

function read_uint64_number() {
    return readLongVarint.call(this).toNumber(true);
}

function read_sint64_long() {
    return readLongVarint.call(this).zzDecode().toLong();
}

function read_sint64_number() {
    return readLongVarint.call(this).zzDecode().toNumber();
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long|number} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long|number} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long|number} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
ReaderPrototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32(buf, end) {
    return buf[end - 4]
         | buf[end - 3] << 8
         | buf[end - 2] << 16
         | buf[end - 1] << 24;
}

/**
 * Reads fixed 32 bits as a number.
 * @returns {number} Value read
 */
ReaderPrototype.fixed32 = function read_fixed32() {

    /* istanbul ignore next */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32(this.buf, this.pos += 4);
};

/**
 * Reads zig-zag encoded fixed 32 bits as a number.
 * @returns {number} Value read
 */
ReaderPrototype.sfixed32 = function read_sfixed32() {
    var value = this.fixed32();
    return value >>> 1 ^ -(value & 1);
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore next */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32(this.buf, this.pos += 4), readFixed32(this.buf, this.pos += 4));
}

function read_fixed64_long() {
    return readFixed64.call(this).toLong(true);
}

function read_fixed64_number() {
    return readFixed64.call(this).toNumber(true);
}

function read_sfixed64_long() {
    return readFixed64.call(this).zzDecode().toLong();
}

function read_sfixed64_number() {
    return readFixed64.call(this).zzDecode().toNumber();
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long|number} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long|number} Value read
 */

var readFloat = typeof Float32Array !== "undefined"
    ? (function() { // eslint-disable-line wrap-iife
        var f32 = new Float32Array(1),
            f8b = new Uint8Array(f32.buffer);
        f32[0] = -0;
        return f8b[3] // already le?
            ? function readFloat_f32(buf, pos) {
                f8b[0] = buf[pos    ];
                f8b[1] = buf[pos + 1];
                f8b[2] = buf[pos + 2];
                f8b[3] = buf[pos + 3];
                return f32[0];
            }
            : function readFloat_f32_le(buf, pos) {
                f8b[3] = buf[pos    ];
                f8b[2] = buf[pos + 1];
                f8b[1] = buf[pos + 2];
                f8b[0] = buf[pos + 3];
                return f32[0];
            };
    })()
    : function readFloat_ieee754(buf, pos) {
        return ieee754.read(buf, pos, false, 23, 4);
    };

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
ReaderPrototype.float = function read_float() {

    /* istanbul ignore next */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = readFloat(this.buf, this.pos);
    this.pos += 4;
    return value;
};

var readDouble = typeof Float64Array !== "undefined"
    ? (function() { // eslint-disable-line wrap-iife
        var f64 = new Float64Array(1),
            f8b = new Uint8Array(f64.buffer);
        f64[0] = -0;
        return f8b[7] // already le?
            ? function readDouble_f64(buf, pos) {
                f8b[0] = buf[pos    ];
                f8b[1] = buf[pos + 1];
                f8b[2] = buf[pos + 2];
                f8b[3] = buf[pos + 3];
                f8b[4] = buf[pos + 4];
                f8b[5] = buf[pos + 5];
                f8b[6] = buf[pos + 6];
                f8b[7] = buf[pos + 7];
                return f64[0];
            }
            : function readDouble_f64_le(buf, pos) {
                f8b[7] = buf[pos    ];
                f8b[6] = buf[pos + 1];
                f8b[5] = buf[pos + 2];
                f8b[4] = buf[pos + 3];
                f8b[3] = buf[pos + 4];
                f8b[2] = buf[pos + 5];
                f8b[1] = buf[pos + 6];
                f8b[0] = buf[pos + 7];
                return f64[0];
            };
    })()
    : function readDouble_ieee754(buf, pos) {
        return ieee754.read(buf, pos, false, 52, 8);
    };

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
ReaderPrototype.double = function read_double() {

    /* istanbul ignore next */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = readDouble(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
ReaderPrototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore next */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
ReaderPrototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
ReaderPrototype.skip = function skip(length) {
    if (length === undefined) {
        do {
            /* istanbul ignore next */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    } else {
        /* istanbul ignore next */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
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
                wireType = this.uint32() & 7;
                if (wireType === 4)
                    break;
                this.skipType(wireType);
            } while (true);
            break;
        case 5:
            this.skip(4);
            break;
        
        /* istanbul ignore next */
        default:
            throw Error("invalid wire type: " + wireType);
    }
    return this;
};

/**
 * Resets this instance and frees all resources.
 * @param {Uint8Array} [buffer] New buffer for a new sequence of read operations
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
 * @param {Uint8Array} [buffer] New buffer for a new sequence of read operations
 * @returns {Uint8Array} Finished buffer
 */
ReaderPrototype.finish = function finish(buffer) {
    var remain = this.pos
        ? this._slice.call(this.buf, this.pos)
        : this.buf;
    this.reset(buffer);
    return remain;
};

function configure() {
    if (util.Long) {
        ReaderPrototype.int64 = read_int64_long;
        ReaderPrototype.uint64 = read_uint64_long;
        ReaderPrototype.sint64 = read_sint64_long;
        ReaderPrototype.fixed64 = read_fixed64_long;
        ReaderPrototype.sfixed64 = read_sfixed64_long;
    } else {
        ReaderPrototype.int64 = read_int64_number;
        ReaderPrototype.uint64 = read_uint64_number;
        ReaderPrototype.sint64 = read_sint64_number;
        ReaderPrototype.fixed64 = read_fixed64_number;
        ReaderPrototype.sfixed64 = read_sfixed64_number;
    }
}

Reader._configure = configure;

configure();

},{"1":1,"10":10,"8":8}],8:[function(require,module,exports){
"use strict";
module.exports = BufferReader;

var Reader = require(7);
/** @alias BufferReader.prototype */
var BufferReaderPrototype = BufferReader.prototype = Object.create(Reader.prototype);
BufferReaderPrototype.constructor = BufferReader;

var util = require(10);

// One time function to initialize BufferReader with the now-known buffer implementation's slice method
var initBufferReader = function() {

    /* istanbul ignore next */
    if (!util.Buffer)
        throw Error("Buffer is not supported");
    
    BufferReaderPrototype._slice = util.Buffer.prototype.slice;
    readStringBuffer = util.Buffer.prototype.utf8Slice // around forever, but not present in browser buffer
        ? readStringBuffer_utf8Slice
        : readStringBuffer_toString;
    initBufferReader = false;
};

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    if (initBufferReader)
        initBufferReader();
    Reader.call(this, buffer);
}

var readStringBuffer;

function readStringBuffer_utf8Slice(buf, start, end) {
    return buf.utf8Slice(start, end); // fastest
}

function readStringBuffer_toString(buf, start, end) {
    return buf.toString("utf8", start, end); // 2nd, again assertions
}

/**
 * @override
 */
BufferReaderPrototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return readStringBuffer(this.buf, this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * @override
 */
BufferReaderPrototype.finish = function finish_buffer(buffer) {
    var remain = this.pos ? this.buf.slice(this.pos) : this.buf;
    this.reset(buffer);
    return remain;
};

},{"10":10,"7":7}],9:[function(require,module,exports){
"use strict";

module.exports = LongBits;

var util = require(10);

/**
 * Any compatible Long instance.
 * @typedef Long
 * @type {Object}
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low bits
 * @param {number} hi High bits
 */
function LongBits(lo, hi) { // make sure to always call this with unsigned 32bits for proper optimization

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi;
}

/** @alias util.LongBits.prototype */
var LongBitsPrototype = LongBits.prototype;

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign  = value < 0;
        value = Math.abs(value);
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (typeof value === "string") {
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBitsPrototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        this.lo = ~this.lo + 1 >>> 0;
        this.hi = ~this.hi     >>> 0;
        if (!this.lo)
            this.hi = this.hi + 1 >>> 0;
        return -(this.lo + this.hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBitsPrototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo, this.hi, unsigned)
        : { low: this.lo, high: this.hi, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBitsPrototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24 & 255,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24 & 255
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBitsPrototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBitsPrototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBitsPrototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    if (part2 === 0) {
        if (part1 === 0)
            return part0 < 1 << 14
                ? part0 < 1 << 7 ? 1 : 2
                : part0 < 1 << 21 ? 3 : 4;
        return part1 < 1 << 14
            ? part1 < 1 << 7 ? 5 : 6
            : part1 < 1 << 21 ? 7 : 8;
    }
    return part2 < 1 << 7 ? 9 : 10;
};

},{"10":10}],10:[function(require,module,exports){
(function (global){
"use strict";

var util = exports;

util.LongBits = require(9);
util.base64   = require(2);
util.inquire  = require(3);
util.utf8     = require(5);
util.pool     = require(4);

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);

/**
 * Node's Buffer class if available.
 * @type {?function(new: Buffer)}
 */
util.Buffer = (util.Buffer = util.inquire("buffer")) && util.Buffer.Buffer || null;

/**
 * Long.js's Long class if available.
 * @type {?function(new: Long)}
 */
util.Long = global.dcodeIO && global.dcodeIO.Long || util.inquire("long");

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return Boolean(value && typeof value === "object");
};

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : "\0\0\0\0\0\0\0\0";
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Tests if two possibly long values are not equal.
 * @param {number|Long} a First value
 * @param {number|Long} b Second value
 * @returns {boolean} `true` if not equal
 * @deprecated
 * @see Use {@link util.longNe} instead
 */
util.longNeq = function longNeq(a, b) {
    return typeof a === "number"
         ? typeof b === "number"
            ? a !== b
            : (a = util.LongBits.fromNumber(a)).lo !== b.low || a.hi !== b.high
         : typeof b === "number"
            ? (b = util.LongBits.fromNumber(b)).lo !== a.low || b.hi !== a.high
            : a.low !== b.low || a.high !== b.high;
};

/**
 * Tests if a possibily long value equals the specified low and high bits.
 * @param {number|string|Long} val Value to test
 * @param {number} lo Low bits to test against
 * @param {number} hi High bits to test against
 * @returns {boolean} `true` if not equal
 */
util.longNe = function longNe(val, lo, hi) {
    if (typeof val === "object") // Long-like, null is invalid and throws
        return val.low !== lo || val.high !== hi;
    var bits = util.LongBits.from(val);
    return bits.lo !== lo || bits.hi !== hi;
};

/**
 * Defines the specified properties on the specified target. Also adds getters and setters for non-ES5 environments.
 * @param {Object} target Target object
 * @param {Object} descriptors Property descriptors
 * @returns {undefined}
 */
util.props = function props(target, descriptors) {
    Object.keys(descriptors).forEach(function(key) {
        util.prop(target, key, descriptors[key]);
    });
};

/**
 * Defines the specified property on the specified target. Also adds getters and setters for non-ES5 environments.
 * @param {Object} target Target object
 * @param {string} key Property name
 * @param {Object} descriptor Property descriptor
 * @returns {undefined}
 */
util.prop = function prop(target, key, descriptor) {
    var ie8 = !-[1,];
    var ucKey = key.substring(0, 1).toUpperCase() + key.substring(1);
    if (descriptor.get)
        target["get" + ucKey] = descriptor.get;
    if (descriptor.set)
        target["set" + ucKey] = ie8
            ? function(value) {
                  descriptor.set.call(this, value);
                  this[key] = value;
              }
            : descriptor.set;
    if (ie8) {
        if (descriptor.value !== undefined)
            target[key] = descriptor.value;
    } else
        Object.defineProperty(target, key, descriptor);
};

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 */
util.emptyArray = Object.freeze([]);

/**
 * An immutable empty object.
 * @type {Object}
 */
util.emptyObject = Object.freeze({});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"3":3,"4":4,"5":5,"9":9}],11:[function(require,module,exports){
"use strict";
module.exports = Writer;

var util      = require(10),
    ieee754   = require(1);

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

var ArrayImpl = typeof Uint8Array !== "undefined" ? Uint8Array : Array;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @memberof Writer
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @private
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    // this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

Writer.Op = Op;

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @private
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {?State}
     */
    this.next = writer.states;
}

Writer.State = State;

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {?Object}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling linked operations with already prepared values.
}

/**
 * Creates a new writer.
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = function create() {
    if (util.Buffer) {
        if (!BufferWriter)
            BufferWriter = require(12);
        return new BufferWriter();
    }
    return new Writer();
};

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new ArrayImpl(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
if (ArrayImpl !== Array)
    Writer.alloc = util.pool(Writer.alloc, ArrayImpl.prototype.subarray || ArrayImpl.prototype.slice);

/** @alias Writer.prototype */
var WriterPrototype = Writer.prototype;

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.uint32 = function write_uint32(value) {
    value = value >>> 0;
    return this.push(writeVarint32,
          value < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5
    , value);
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.int32 = function write_int32(value) {
    return value < 0
        ? this.push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
WriterPrototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this.push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
WriterPrototype.int64 = WriterPrototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
WriterPrototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this.push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.bool = function write_bool(value) {
    return this.push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos++] =  val         & 255;
    buf[pos++] =  val >>> 8   & 255;
    buf[pos++] =  val >>> 16  & 255;
    buf[pos  ] =  val >>> 24;
}

/**
 * Writes a 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.fixed32 = function write_fixed32(value) {
    return this.push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a 32 bit value as fixed 32 bits, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.sfixed32 = function write_sfixed32(value) {
    return this.push(writeFixed32, 4, value << 1 ^ value >> 31);
};

/**
 * Writes a 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
WriterPrototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this.push(writeFixed32, 4, bits.lo).push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a 64 bit value as fixed 64 bits, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
WriterPrototype.sfixed64 = function write_sfixed64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this.push(writeFixed32, 4, bits.lo).push(writeFixed32, 4, bits.hi);
};

var writeFloat = typeof Float32Array !== "undefined"
    ? (function() { // eslint-disable-line wrap-iife
        var f32 = new Float32Array(1),
            f8b = new Uint8Array(f32.buffer);
        f32[0] = -0;
        return f8b[3] // already le?
            ? function writeFloat_f32(val, buf, pos) {
                f32[0] = val;
                buf[pos++] = f8b[0];
                buf[pos++] = f8b[1];
                buf[pos++] = f8b[2];
                buf[pos  ] = f8b[3];
            }
            : function writeFloat_f32_le(val, buf, pos) {
                f32[0] = val;
                buf[pos++] = f8b[3];
                buf[pos++] = f8b[2];
                buf[pos++] = f8b[1];
                buf[pos  ] = f8b[0];
            };
    })()
    : function writeFloat_ieee754(val, buf, pos) {
        ieee754.write(buf, val, pos, false, 23, 4);
    };

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.float = function write_float(value) {
    return this.push(writeFloat, 4, value);
};

var writeDouble = typeof Float64Array !== "undefined"
    ? (function() { // eslint-disable-line wrap-iife
        var f64 = new Float64Array(1),
            f8b = new Uint8Array(f64.buffer);
        f64[0] = -0;
        return f8b[7] // already le?
            ? function writeDouble_f64(val, buf, pos) {
                f64[0] = val;
                buf[pos++] = f8b[0];
                buf[pos++] = f8b[1];
                buf[pos++] = f8b[2];
                buf[pos++] = f8b[3];
                buf[pos++] = f8b[4];
                buf[pos++] = f8b[5];
                buf[pos++] = f8b[6];
                buf[pos  ] = f8b[7];
            }
            : function writeDouble_f64_le(val, buf, pos) {
                f64[0] = val;
                buf[pos++] = f8b[7];
                buf[pos++] = f8b[6];
                buf[pos++] = f8b[5];
                buf[pos++] = f8b[4];
                buf[pos++] = f8b[3];
                buf[pos++] = f8b[2];
                buf[pos++] = f8b[1];
                buf[pos  ] = f8b[0];
            };
    })()
    : function writeDouble_ieee754(val, buf, pos) {
        ieee754.write(buf, val, pos, false, 52, 8);
    };

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.double = function write_double(value) {
    return this.push(writeDouble, 8, value);
};

var writeBytes = ArrayImpl.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos);
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
WriterPrototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (typeof value === "string" && len) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return len
        ? this.uint32(len).push(writeBytes, len, value)
        : this.push(writeByte, 1, 0);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len).push(utf8.write, len, value)
        : this.push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset} or {@link Writer#ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
WriterPrototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
WriterPrototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @param {number} [id] Id with wire type 2 to prepend as a tag where applicable
 * @returns {Writer} `this`
 */
WriterPrototype.ldelim = function ldelim(id) {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset();
    if (typeof id === "number")
        this.uint32((id << 3 | 2) >>> 0);
    this.uint32(len);
    this.tail.next = head.next; // skip noop
    this.tail = tail;
    this.len += len;
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
WriterPrototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    this.head = this.tail = null; // gc
    return buf;
};

},{"1":1,"10":10,"12":12}],12:[function(require,module,exports){
"use strict";
module.exports = BufferWriter;

var Writer = require(11);
/** @alias BufferWriter.prototype */
var BufferWriterPrototype = BufferWriter.prototype = Object.create(Writer.prototype);
BufferWriterPrototype.constructor = BufferWriter;

var util = require(10);

var utf8 = util.utf8;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
BufferWriter.alloc = function alloc_buffer(size) {
    BufferWriter.alloc = util.Buffer.allocUnsafe
        ? util.Buffer.allocUnsafe
        : function allocUnsafeNew(size) { return new util.Buffer(size); };
    return BufferWriter.alloc(size);
};

function writeBytesBuffer(val, buf, pos) {
    val.copy(buf, pos, 0, val.length);
}

var Buffer_from = util.Buffer && util.Buffer.from || function(value, encoding) { return new util.Buffer(value, encoding); };

/**
 * @override
 */
BufferWriterPrototype.bytes = function write_bytes_buffer(value) {
    if (typeof value === "string")
        value = Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this.push(writeBytesBuffer, len, value);
    return this;
};

var writeStringBuffer = (function() { // eslint-disable-line wrap-iife
    return util.Buffer && util.Buffer.prototype.utf8Write // around forever, but not present in browser buffer
        ? function writeString_buffer_utf8Write(val, buf, pos) {
            if (val.length < 40)
                utf8.write(val, buf, pos);
            else
                buf.utf8Write(val, pos);
        }
        : function writeString_buffer_write(val, buf, pos) {
            if (val.length < 40)
                utf8.write(val, buf, pos);
            else
                buf.write(val, pos);
        };
    // Note that the plain JS encoder is faster for short strings, probably because of redundant assertions.
    // For a raw utf8Write, the breaking point is about 20 characters, for write it is around 40 characters.
    // Unfortunately, this does not translate 1:1 to real use cases, hence the common "good enough" limit of 40.
})();

/**
 * @override
 */
BufferWriterPrototype.string = function write_string_buffer(value) {
    var len = value.length < 40
        ? utf8.length(value)
        : util.Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this.push(writeStringBuffer, len, value);
    return this;
};

},{"10":10,"11":11}]},{},[6])


//# sourceMappingURL=protobuf.js.map
