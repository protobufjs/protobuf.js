var util    = require("./util"),
    long_   = require("./support/long"),
    string_ = require("./support/string"),
    float_  = require("./support/float"),
    array_  = require("./support/array");

module.exports = Reader;

function indexOutOfRange(reader, writeLength) {
    return "index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len;
}

/**
 * Wire format reader using arrays.
 * @memberof protobuf
 * @constructor
 * @param {number[]} buffer Buffer to read from
 */
function Reader(buffer) {
    if (!(this instanceof Reader)) {
        if (util.Buffer && (!buffer || util.Buffer.isBuffer(buffer)))
            return new BufferReader(buffer);
        return new Reader(buffer);
    }

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

/**
 * @alias protobuf.Reader.prototype
 */
var ReaderPrototype = Reader.prototype;

ReaderPrototype._slice = array_._slice;

/**
 * Reads a tag.
 * @returns {{id: number, wireType: number}} Field id and wire type
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
 * @returns {number|{ low: numbeer, high: number, unsigned: false }|Long} Value read
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
 * @returns {number} Value read
 */
ReaderPrototype.float = function read_float() {
    if (this.pos + 4 > this.len)
        throw RangeError(indexOutOfRange(this, 4));
    return float_._read(this, 4);
};

/**
 * Reads a double (64 bit float) as a number.
 * @returns {number} Value read
 */
ReaderPrototype.double = function read_double() {
    if (this.pos + 8 > this.len)
        throw RangeError(indexOutOfRange(this, 4));
    return float_._read(this, 8);
};

/**
 * Reads a sequence of bytes.
 * @param {number} [length] Optional number of bytes to read, if known beforehand
 * @returns {number[]} Value read
 */
ReaderPrototype.bytes = function read_bytes(length) {
    if (length === undefined)
        length = this.int32() >>> 0;
    var start = this.pos,
        end   = this.pos + length;
    if (end > this.len)
        throw RangeError(indexOutOfRange(this, length));
    this.pos += length;
    return this._slice.call(this.buf, start, end);
};

/**
 * Reads a string.
 * @param {number} [length] Optional number of bytes to read, if known beforehand
 * @returns {string} Value read
 */
ReaderPrototype.string = function read_string(length) {
    return string_._decode(this.bytes(length));
};

/**
 * Skips some bytes.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} this
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
 * @returns {Reader}this
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
 * @returns {Reader} this
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
    if (!util.Buffer)
        throw Error("Buffer is not supported");
    BufferReaderPrototype._slice = util.Buffer.prototype.slice;
    initBufferReader = false;
};

/**
 * Wire format reader using node buffers.
 * @memberof protobuf
 * @extends protobuf.Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    if (initBufferReader)
        initBufferReader();
    Reader.call(this, buffer);
}

/**
 * @alias protobuf.BufferReader.prototype
 */
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
