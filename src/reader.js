var util    = require("./util"),
    long_   = require("./support/long"),
    string_ = require("./support/string"),
    float_  = require("./support/float");

module.exports = Reader;

/**
 * @param {!Reader} reader
 * @param {number} [writerLength]
 * @inner
 */
function indexOutOfRange(reader, writeLength) {
    return "index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len;
}

/**
 * Reader using typed arrays.
 * @constructor
 * @param {!Uint8Array} buffer
 */
function Reader(buffer) {
    if (!(this instanceof Reader)) {
        if (util.Buffer && (!buffer || util.Buffer.isBuffer(buffer)))
            return new BufferReader(buffer);
        return new Reader(buffer);
    }

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer || null;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer ? buffer.length : 0;
}

var ReaderPrototype = Reader.prototype;

/**
 * Reads a tag.
 * @returns {!{id: number, wireType: number}}
 */
ReaderPrototype.tag = function read_tag() {
    if (this.pos >= this.len)
        throw RangeError(indexOutOfRange(this));
    var octet = this.buf[this.pos++];
    return {
        id: octet >>> 3,
        wireType: octet & 7
    };
};

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number}
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
 * @returns {number}
 */
ReaderPrototype.uint32 = function read_uint32() {
    return this.int32() >>> 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number}
 */
ReaderPrototype.sint32 = function read_sint32() {
    var value = this.int32();
    return value >>> 1 ^ -(value & 1);
};

/**
 * Reads a varint as a signed 64 bit value.
 * @returns {number|!{ low: number, high: number, unsigned: false }|!Long}
 */
ReaderPrototype.int64 = function read_int64() {
    return long_._read(this, indexOutOfRange)
                ._get(false);
};

/**
 * Reads a varint as an unsigned 64 bit value.
 * @returns {number|!{ low: number, high: number, unsigned: true }|!Long}
 */
ReaderPrototype.uint64 = function read_uint64() {
    return long_._read(this, indexOutOfRange)
                ._get(true);
};

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @returns {number|!{ low: number, high: number, unsigned: false }|!Long}
 */
ReaderPrototype.sint64 = function read_sint64() {
    return long_._read(this, indexOutOfRange)
                ._zigZagDecode()
                ._get(false);
};

/**
 * Reads a varint as a boolean.
 * @returns {number}
 */
ReaderPrototype.bool = function read_bool() {
    if (this.pos >= this.length)
        throw RangeError(indexOutOfRange(this));
    var octet = this.buf[this.pos];
    return octet === 0 ? false
         : octet === 1 ? true
         : this.int32() !== 0;
};

/**
 * Reads fixed 32 bits as a number.
 * @returns {number}
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
 * @returns {number}
 */
ReaderPrototype.sfixed32 = function read_sfixed32() {
    var value = this.fixed32();
    return value >>> 1 ^ -(value & 1);
};

/**
 * Reads fixed 64 bits as a Long.
 * @returns {number|!{ low: number, high: number, unsigned: true }|!Long}
 */
ReaderPrototype.fixed64 = function read_fixed64() {
    if (this.pos + 8 > this.len)
        throw RangeError(indexOutOfRange(this, 8));
    return long_._readFixed(this)
                ._get(true);
};

/**
 * Reads zig-zag encoded 64 bits as a Long.
 * @returns {number|!{ low: numbeer, high: number, unsigned: false }|!Long}
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
 * @returns {number}
 */
ReaderPrototype.float = function read_float() {
    if (this.pos + 4 > this.len)
        throw RangeError(indexOutOfRange(this, 4));
    return float_._read(this, 4);
};

/**
 * Reads a double (64 bit float) as a number.
 * @returns {number}
 */
ReaderPrototype.double = function read_double() {
    if (this.pos + 8 > this.len)
        throw RangeError(indexOutOfRange(this, 4));
    return float_._read(this, 8);
};

/**
 * Reads a sequence of bytes.
 * @param {number} [length]
 * @returns {!Uint8Array}
 */
ReaderPrototype.bytes = function read_bytes(length) {
    if (length === undefined)
        length = this.uint32();
    var start = this.pos,
        end = this.pos + length;
    if (end > this.len)
        throw RangeError(indexOutOfRange(this, length));
    this.pos += length;
    return this.buf.slice
        ? this.buf.slice(start, end)
        : this.buf.subarray(start, end);
};

/**
 * Reads a string.
 * @param {number} [length]
 * @returns {string}
 */
ReaderPrototype.string = function read_string(length) {
    return string_._decode(this.bytes(length));
};

/**
 * Skips some bytes.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {!Reader} this
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
 * Resets this instance and frees all resources.
 * Optionally accepts a new buffer for a new sequence of read operations.
 * @param {!Uint8Array=} buffer
 * @returns {!Reader} this
 */
ReaderPrototype.reset = function reset(buffer) {
    if (buffer) {
        this.buf = buffer;
        this.len = buffer.length;
    } else {
        this.buf = null;
        this.len = 0;
    }
    this.pos = 0;
    return this;
};

/**
 * Finishes the current sequence of read operations, frees all resources and returns the remaining buffer.
 * Optionally accepts a new buffer for a new sequence of read operations.
 * @param {!Uint8Array=} buffer
 * @returns {!Uint8Array}
 */
ReaderPrototype.finish = function finish(buffer) {
    var remain = this.pos
        ? this.buf.slice
            ? this.buf.slice(this.pos)
            : this.buf.subarray(this.pos)
        : this.buf;
    this.reset(buffer);
    return remain;
};

/**
 * Reader using node buffers.
 * @memberof Reader
 * @constructor
 * @param {!Buffer} buffer
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);
}

var BufferReaderPrototype = BufferReader.prototype = Object.create(Reader.prototype);
BufferReaderPrototype.constructor = BufferReader;

Reader.BufferReader = BufferReader;

/**
 * Reads a float (32 bit) as a number using node buffers.
 * @returns {number}
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
 * @returns {number}
 */
BufferReaderPrototype.double = function read_double_buffer() {
    if (this.pos + 8 > this.len)
        throw RangeError(indexOutOfRange(this, 8));
    var value = this.buf.readDoubleLE(this.pos, true);
    this.pos += 8;
    return value;
};

/**
 * Finishes the current sequence of read operations using node buffers, frees all resources and returns the remaining buffer.
 * Optionally accepts a new buffer for a new sequence of read operations using node buffers.
 * @param {!Buffer=} buffer
 * @returns {!Buffer}
 */
BufferReaderPrototype.finish = function finish_buffer(buffer) {
    var remain = this.pos ? this.buf.slice(this.pos) : this.buf;
    this.reset(buffer);
    return remain;
};
