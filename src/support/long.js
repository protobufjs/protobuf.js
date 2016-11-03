// This module provides minimal support for 64 bit values. It's just enough to read and write
// JavaScript numbers and Long-like objects without sacrificing performance. Note that always
// converting hence and forth with strings would yield terrible performance.

// For values less than or equal Number.MAX_SAFE_INTEGER respectively greater than or equal
// Number.MIN_SAFE_INTEGER, JavaScript numbers are returned. Larger values are returned as an
// object with a low and high property corresponding to their respective low and high 32 bits.

// If your application does not deal with numbers larger than Number.MAX_SAFE_INTEGER, then
// this implementation is fine for you. If you need to properly work with larger numbers, then
// you don't need to craft this by yourself but should install long.js alongside protobuf.js,
// which will make this module reliably return proper Long instances for all 64 bit numbers.

var util = require("../util");

/**
 * Temporary low bits of a 64 bit value.
 * @type {number}
 * @private
 */
exports._lo = 0;

/**
 * Temporary high bits of a 64 bit value.
 * @type {number}
 * @private
 */
exports._hi = 0;

// ref: https://github.com/google/protobuf/blob/master/js/binary/encoder.js

// Reading

/**
 * Reads a varint from the specified reader and stores its low and high bits.
 * @param {!Reader} reader Reader to read from
 * @param {!function(!Reader, number=)} indexOutOfRange Error message function
 * @returns {!Object} this
 */
exports._read = function long_read(reader, indexOutOfRange) {
    var i, b;
    for (i = this._lo = this._hi = 0; i < 4; ++i) {
        if (reader.pos >= reader.len)
            throw RangeError(indexOutOfRange(reader));
        b = reader.buf[reader.pos++];
        this._lo |= (b & 0x7f) << i * 7;
        if (b < 128) {
            this._lo >>>= 0;
            this._hi = 0;
            return exports;
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
        return exports;
    }
    for (i = 0; i < 5; ++i) {
        if (reader.pos >= reader.len)
            throw RangeError(indexOutOfRange(reader));
        b = reader.buf[reader.pos++];
        this._hi |= (b & 0x7F) << i * 7 + 3;
        if (b < 128) {
            this._lo >>>= 0;
            this._hi >>>= 0;
            return exports;
        }
    }
    throw Error("illegal varint encoding");
};

/**
 * Reads fixed 64 bits from the specified reader and stores the low and high bits.
 * @param {!Reader} reader Reader to read from
 * @returns {!Object} this
 */
exports._readFixed = function long_readFixed(reader) {
    this._lo = (reader.buf[reader.pos++]
              | reader.buf[reader.pos++] << 8
              | reader.buf[reader.pos++] << 16
              | reader.buf[reader.pos++] << 24) >>> 0;
    this._hi = (reader.buf[reader.pos++]
              | reader.buf[reader.pos++] << 8
              | reader.buf[reader.pos++] << 16
              | reader.buf[reader.pos++] << 24) >>> 0;
    return exports;
};

// Writing

/**
 * Writes the low and high bits to the specified writer, as a varint.
 * @param {!Writer} writer Writer to write to
 * @param {!function(!Writer, number)} expand Expand function
 * @returns {!Writer} writer
 * @private
 */
exports._write = function long_write(writer, expand) {
    var len = this._hi ?
              this._hi < 8 ? 5
            : this._hi < 1024 ? 6
            : this._hi < 131072 ? 7
            : this._hi < 16777216 ? 8
            : this._hi < 2147483648 ? 9
            : 10
            : this._lo < 128 ? 1
            : this._lo < 16384 ? 2
            : this._lo < 2097152 ? 3
            : this._lo < 268435456 ? 4
            : 5;
    if (writer.pos + len > writer.len)
        expand(writer, len);
    while (this._hi || this._lo > 127) {
        writer.buf[writer.pos++] = this._lo | 0x80;
        this._lo = (this._lo >>> 7 | this._hi << 25) >>> 0;
        this._hi >>>= 7;
    }
    writer.buf[writer.pos++] = this._lo;
    return writer;
};

/**
 * Writes the low and high bits to the specified writer, as fixed 64 bits.
 * @param {!Writer} writer Writer to write to
 * @returns {!Writer} writer
 * @private
 */
exports._writeFixed = function long_writeFixed(writer) {
    writer.buf[writer.pos++] = this._lo;
    writer.buf[writer.pos++] = this._lo >>> 8;
    writer.buf[writer.pos++] = this._lo >>> 16;
    writer.buf[writer.pos++] = this._lo >>> 24;
    writer.buf[writer.pos++] = this._hi;
    writer.buf[writer.pos++] = this._hi >>> 8;
    writer.buf[writer.pos++] = this._hi >>> 16;
    writer.buf[writer.pos++] = this._hi >>> 24;
    return writer;
};

// Get / Set

/**
 * Gets the low and high bits as a JavaScript number, long-like object or actual Long.
 * @param {boolean} unsigned Whether unsigned or not
 * @returns {number|!{ low: number, high: number, unsigned: boolean }|!Long} Value read
 */
exports._get = function long_get(unsigned) {
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
 * Sets the low and high bits from a number or long-like object.
 * @param {number|!{ low: number, high: number }|!Long} value Value to set
 * @returns {!Object} this
 * @private
 */
exports._set = function long_set(value) {
    var sign;
    if (util.isNumber(value)) {
        sign = value < 0;
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
    } else {
        this._lo = value.low  >>> 0;
        this._hi = value.high >>> 0;
    }
    return exports;
};

// Zig-zag encoding

/**
 * Zig-zag encodes the low and high bits.
 * @returns {!Object} this
 */
exports._zigZagEncode = function long_zigZagEncode() { // (n << 1) ^ (n >> 63)
    var mask = -(this._hi >>> 31);
    this._hi = ((this._hi << 1 | this._lo >>> 31) ^ mask) >>> 0;
    this._lo = ( this._lo << 1                    ^ mask) >>> 0;
    return exports;
};

/**
 * Zig-zag decodes the low and high bits.
 * @returns {!Object} this
 */
exports._zigZagDecode = function long_zigZagDecode() { // (n >>> 1) ^ -(n & 1)
    var mask = -(this._lo & 1);
    this._lo = ((this._lo >>> 1 | (this._hi & 1) << 31) ^ mask) >>> 0;
    this._hi = ( this._hi >>> 1                         ^ mask) >>> 0;
    return exports;
};
