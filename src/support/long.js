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
 * @returns {Object} this
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
 * @returns {Object} this
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
 * @returns {Object} this
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
 * @returns {Object} this
 * @private
 */
long_._setHash = long_setHash;

// Zig-zag encoding

/**
 * Zig-zag encodes the low and high bits.
 * @returns {Object} this
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
 * @returns {Object} this
 * @private
 */
long_._zigZagDecode = function long_zigZagDecode() { // (n >>> 1) ^ -(n & 1)
    var mask = -(this._lo & 1);
    this._lo = ((this._lo >>> 1 | (this._hi & 1) << 31) ^ mask) >>> 0;
    this._hi = ( this._hi >>> 1                         ^ mask) >>> 0;
    return long_;
};
