"use strict";
module.exports = Reader;

Reader.BufferReader = BufferReader;

var util     = require("./util"),
    ieee754  = require("../lib/ieee754");
var LongBits = util.LongBits,
    Long     = util.Long;

function indexOutOfRange(reader, writeLength) {
    return "index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len;
}

/**
 * Constructs a new reader using the specified buffer.
 * When called as a function, returns an appropriate reader for the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {number[]} buffer Buffer to read from
 */
function Reader(buffer) {
    if (!(this instanceof Reader))
        return util.Buffer && (!buffer || util.Buffer.isBuffer(buffer))
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
    return new Tag(this.buf[this.pos] >>> 3, this.buf[this.pos++] & 7);
};

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
ReaderPrototype.int32 = function read_int32() {
    var value = 0,
        shift = 0,
        octet = 0;
    do {
        if (this.pos >= this.len)
            throw RangeError(indexOutOfRange(this));
        octet = this.buf[this.pos++];
        if (shift < 32)
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
 * Reads a possibly 64 bits varint.
 * @returns {LongBits} Long bits
 * @this {Reader}
 * @inner
 * @ignore
 */
function readLongVarint() {
    var lo = 0, hi = 0,
        i  = 0, b  = 0;
    if (this.len - this.pos > 9) { // fast route
        for (i = 0; i < 4; ++i) {
            b = this.buf[this.pos++];
            lo |= (b & 127) << i * 7;
            if (b < 128)
                return new LongBits(lo >>> 0, hi >>> 0);
        }
        b = this.buf[this.pos++];
        lo |= (b & 127) << 28;
        hi |= (b & 127) >> 4;
        if (b < 128)
            return new LongBits(lo >>> 0, hi >>> 0);
        for (i = 0; i < 5; ++i) {
            b = this.buf[this.pos++];
            hi |= (b & 127) << i * 7 + 3;
            if (b < 128)
                return new LongBits(lo >>> 0, hi >>> 0);
        }
    } else {
        for (i = 0; i < 4; ++i) {
            if (this.pos >= this.len)
                throw RangeError(indexOutOfRange(this));
            b = this.buf[this.pos++];
            lo |= (b & 127) << i * 7;
            if (b < 128)
                return new LongBits(lo >>> 0, hi >>> 0);
        }
        if (this.pos >= this.len)
            throw RangeError(indexOutOfRange(this));
        b = this.buf[this.pos++];
        lo |= (b & 127) << 28;
        hi |= (b & 127) >> 4;
        if (b < 128)
            return new LongBits(lo >>> 0, hi >>> 0);
        for (i = 0; i < 5; ++i) {
            if (this.pos >= this.len)
                throw RangeError(indexOutOfRange(this));
            b = this.buf[this.pos++];
            hi |= (b & 127) << i * 7 + 3;
            if (b < 128)
                return new LongBits(lo >>> 0, hi >>> 0);
        }
    }
    throw Error("invalid varint encoding");
}

function read_int64_long() {
    return readLongVarint.call(this).toLong(); // eslint-disable-line no-invalid-this
}

function read_int64_number() {
    return readLongVarint.call(this).toNumber(); // eslint-disable-line no-invalid-this
}

/**
 * Reads a varint as a signed 64 bit value.
 * @function
 * @returns {Long|number} Value read
 */
ReaderPrototype.int64 = Long && read_int64_long || read_int64_number;

function read_uint64_long() {
    return readLongVarint.call(this).toLong(true); // eslint-disable-line no-invalid-this
}

function read_uint64_number() {
    return readLongVarint.call(this).toNumber(true); // eslint-disable-line no-invalid-this
}

/**
 * Reads a varint as an unsigned 64 bit value.
 * @function
 * @returns {Long|number} Value read
 */
ReaderPrototype.uint64 = Long && read_uint64_long || read_uint64_number;

function read_sint64_long() {
    return readLongVarint.call(this).zzDecode().toLong(); // eslint-disable-line no-invalid-this
}

function read_sint64_number() {
    return readLongVarint.call(this).zzDecode().toNumber(); // eslint-disable-line no-invalid-this
}

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @function
 * @returns {Long|number} Value read
 */
ReaderPrototype.sint64 = Long && read_sint64_long || read_sint64_number;

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
 * Reads a 64 bit value.
 * @returns {LongBits} Long bits
 * @this {Reader}
 * @inner 
 * @ignore
 */
function readLongFixed() {
    if (this.pos + 8 > this.len)
        throw RangeError(indexOutOfRange(this, 8));
    return new LongBits(
      ( this.buf[this.pos++]
      | this.buf[this.pos++] << 8
      | this.buf[this.pos++] << 16
      | this.buf[this.pos++] << 24 ) >>> 0
    ,
      ( this.buf[this.pos++]
      | this.buf[this.pos++] << 8
      | this.buf[this.pos++] << 16
      | this.buf[this.pos++] << 24 ) >>> 0
    );
}

function read_fixed64_long() {
    return readLongFixed.call(this).toLong(true); // eslint-disable-line no-invalid-this
}

function read_fixed64_number() {
    return readLongFixed.call(this).toNumber(true); // eslint-disable-line no-invalid-this
}

/**
 * Reads fixed 64 bits.
 * @function
 * @returns {Long|number} Value read
 */
ReaderPrototype.fixed64 = Long && read_fixed64_long || read_fixed64_number;

function read_sfixed64_long() {
    return readLongFixed.call(this).zzDecode().toLong(); // eslint-disable-line no-invalid-this
}

function read_sfixed64_number() {
    return readLongFixed.call(this).zzDecode().toNumber(); // eslint-disable-line no-invalid-this
}

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @returns {Long|number} Value read
 */
ReaderPrototype.sfixed64 = Long && read_sfixed64_long || read_sfixed64_number;

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
ReaderPrototype.float = function read_float() {
    if (this.pos + 4 > this.len)
        throw RangeError(indexOutOfRange(this, 4));
    var value = ieee754.read(this.buf, this.pos, false, 23, 4);
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
    var value = ieee754.read(this.buf, this.pos, false, 52, 8);
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
 * Skips the specified number of bytes if specified, otherwise skips a varint.
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
 * @param {number[]} [buffer] New buffer for a new sequence of read operations
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
 * @param {number[]} [buffer] New buffer for a new sequence of read operations
 * @returns {number[]} Finished buffer
 */
ReaderPrototype.finish = function finish(buffer) {
    var remain = this.pos
        ? this._slice.call(this.buf, this.pos)
        : this.buf;
    this.reset(buffer);
    return remain;
};

// One time function to initialize BufferReader with the now-known buffer implementation's slice method
var initBufferReader = function() {
    if (!util.Buffer)
        throw Error("Buffer is not supported");
    BufferReaderPrototype._slice = util.Buffer.prototype.slice;
    initBufferReader = false;
};

/**
 * Constructs a new buffer reader.
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

/** @alias BufferReader.prototype */
var BufferReaderPrototype = BufferReader.prototype = Object.create(Reader.prototype);

BufferReaderPrototype.constructor = BufferReader;

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
 * @returns {string} Value read
 */
BufferReaderPrototype.string = function read_string_buffer() {
    var length = this.int32() >>> 0,
        start = this.pos,
        end   = this.pos + length;
    if (end > this.len)
        throw RangeError(indexOutOfRange(this, length));
    this.pos += length;
    return this.buf.toString("utf8", start, end);
};

/**
 * Finishes the current sequence of read operations using node buffers, frees all resources and returns the remaining buffer.
 * @param {Buffer} [buffer] New buffer for a new sequence of read operations
 * @returns {Buffer} Finished buffer
 */
BufferReaderPrototype.finish = function finish_buffer(buffer) {
    var remain = this.pos ? this.buf.slice(this.pos) : this.buf;
    this.reset(buffer);
    return remain;
};
