import { util } from "./util/minimal.js";

var BufferReader; // cyclic

var utf8 = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array`.
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

function create_array(buffer) {
    if (buffer instanceof Uint8Array)
        return new Reader(buffer);
    throw Error("illegal buffer");
}

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup(buffer) {
            return (Reader.create = function create_buffer(buffer) {
                return util.Buffer.isBuffer(buffer)
                    ? new BufferReader(buffer)
                    /* istanbul ignore next */
                    : create_array(buffer);
            })(buffer);
        }
        /* istanbul ignore next */
        : create_array;
};

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|util.Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = create();

Reader.prototype._slice = Uint8Array.prototype.subarray;

/**
 * Returns raw bytes from the backing buffer without advancing the reader.
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Raw bytes
 */
Reader.prototype.raw = function read_raw(start, end) {
    if (start === end) // fix for IE 10/Win8 and others' subarray returning array of size 1
        return new this.buf.constructor(0);
    return this._slice.call(this.buf, start, end);
};

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = function read_uint32() {
    var buf = this.buf,
        pos = this.pos,
        value = (buf[pos] & 127) >>> 0;
    if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
    }
    value = (value | (buf[pos] & 127) << 7) >>> 0;
    if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
    }
    value = (value | (buf[pos] & 127) << 14) >>> 0;
    if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
    }
    value = (value | (buf[pos] & 127) << 21) >>> 0;
    if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
    }
    value = (value | (buf[pos] & 15) << 28) >>> 0;
    if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
    }

    for (var i = 0; i < 5; ++i) {
        /* istanbul ignore if */
        if (pos >= this.len) {
            this.pos = pos;
            throw indexOutOfRange(this);
        }
        if (buf[pos++] < 128) {
            this.pos = pos;
            return value;
        }
    }
    /* istanbul ignore next */
    this.pos = pos;
    throw Error("invalid varint encoding");
};

/**
 * Reads a field tag.
 * @function
 * @returns {number} Tag read
 */
Reader.prototype.tag = function read_tag() {
    var buf = this.buf,
        pos = this.pos,
        value = (buf[pos] & 127) >>> 0;
    if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
    }
    value = (value | (buf[pos] & 127) << 7) >>> 0;
    if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
    }
    value = (value | (buf[pos] & 127) << 14) >>> 0;
    if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
    }
    value = (value | (buf[pos] & 127) << 21) >>> 0;
    if (buf[pos++] < 128) {
        this.pos = pos;
        return value;
    }
    value = (value | (buf[pos] & 15) << 28) >>> 0;
    if (buf[pos] < 128 && (buf[pos] & 112) === 0) {
        this.pos = pos + 1;
        return value;
    }

    this.pos = pos + 1;
    throw Error("invalid tag encoding");
};

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

var longLo = 0 | 0,
    longHi = 0 | 0,
    longDv = new DataView(new ArrayBuffer(8));

function readVarint64LoFast(buf, pos) {
    // 1st..4th
    var lo = buf[pos] & 127;
    if (buf[pos++] < 128) {
        longLo = lo;
        longHi = 0;
        return pos;
    }
    lo |= (buf[pos] & 127) << 7;
    if (buf[pos++] < 128) {
        longLo = lo;
        longHi = 0;
        return pos;
    }
    lo |= (buf[pos] & 127) << 14;
    if (buf[pos++] < 128) {
        longLo = lo;
        longHi = 0;
        return pos;
    }
    lo |= (buf[pos] & 127) << 21;
    if (buf[pos++] < 128) {
        longLo = lo;
        longHi = 0;
        return pos;
    }
    // 5th
    lo |= (buf[pos] & 127) << 28;
    var hi = (buf[pos] & 127) >> 4;
    if (buf[pos++] < 128) {
        longLo = lo;
        longHi = hi;
        return pos;
    }
    longLo = lo;
    longHi = hi;
    return ~pos;
}

function readVarint64LoSlow(buf, pos, len) {
    var i = 0,
        lo = 0 | 0,
        hi = 0 | 0;

    for (; i < 3; ++i) {
        /* istanbul ignore if */
        if (pos >= len)
            throw indexOutOfRange({ pos: pos, len: len });
        // 1st..3th
        lo |= (buf[pos] & 127) << i * 7;
        if (buf[pos++] < 128) { longLo = lo; longHi = hi; return pos; }
    }
    // 4th
    lo |= (buf[pos++] & 127) << i * 7;
    longLo = lo;
    longHi = hi;
    return pos;
}

function readVarint64HiFast(buf, pos) {
    var hi = longHi;

    for (var i = 0; i < 5; ++i) {
        // 6th..10th
        hi |= (buf[pos] & 127) << i * 7 + 3;
        if (buf[pos++] < 128) {
            longHi = hi;
            return pos;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

function readVarint64HiSlow(buf, pos, len) {
    var hi = longHi;

    for (var i = 0; i < 5; ++i) {
        /* istanbul ignore if */
        if (pos >= len)
            throw indexOutOfRange({ pos: pos, len: len });
        // 6th..10th
        hi |= (buf[pos] & 127) << i * 7 + 3;
        if (buf[pos++] < 128) {
            longHi = hi;
            return pos;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

function readVarint64(buf, pos, len) {
    pos = len - pos > 4
        ? readVarint64LoFast(buf, pos)
        : readVarint64LoSlow(buf, pos, len);
    if (pos >= 0)
        return pos;
    pos = ~pos;
    return len - pos > 4
        ? readVarint64HiFast(buf, pos)
        : readVarint64HiSlow(buf, pos, len);
}

/**
 * Reads a varint as a signed 64 bit value.
 * @returns {bigint} Value read
 */
Reader.prototype.int64 = function read_int64() {
    this.pos = readVarint64(this.buf, this.pos, this.len);
    if (longHi === 0)
        return BigInt(longLo >>> 0);
    return BigInt(longHi) * 4294967296n + BigInt(longLo >>> 0);
};

/**
 * Reads a varint as an unsigned 64 bit value.
 * @returns {bigint} Value read
 */
Reader.prototype.uint64 = function read_uint64() {
    this.pos = readVarint64(this.buf, this.pos, this.len);
    if (longHi === 0)
        return BigInt(longLo >>> 0);
    if (longHi > 0)
        return BigInt(longHi) * 4294967296n + BigInt(longLo >>> 0);
    longDv.setUint32(0, longLo, true);
    longDv.setUint32(4, longHi, true);
    return longDv.getBigUint64(0, true);
};

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @returns {bigint} Value read
 */
Reader.prototype.sint64 = function read_sint64() {
    this.pos = readVarint64(this.buf, this.pos, this.len);
    var mask = -(longLo & 1);
    return BigInt(longHi >>> 1 ^ mask) * 4294967296n + BigInt(((longLo >>> 1 | longHi << 31) ^ mask) >>> 0);
};

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    var value = false,
        b;
    for (var i = 0; i < 10; ++i) {
        /* istanbul ignore if */
        if (this.pos >= this.len) throw indexOutOfRange(this);
        b = this.buf[this.pos++];
        if (b & 127) value = true;
        if (b < 128) return value;
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/**
 * Reads fixed 64 bits.
 * @returns {bigint} Value read
 */
Reader.prototype.fixed64 = function read_fixed64() {
    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    var lo = readFixed32_end(this.buf, this.pos += 4),
        hi = readFixed32_end(this.buf, this.pos += 4);
    return BigInt(hi) * 4294967296n + BigInt(lo);
};

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @returns {bigint} Value read
 */
Reader.prototype.sfixed64 = function read_sfixed64() {
    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    var lo = readFixed32_end(this.buf, this.pos += 4),
        hi = readFixed32_end(this.buf, this.pos += 4) | 0;
    return BigInt(hi) * 4294967296n + BigInt(lo);
};

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos = end;
    return this.raw(start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos = end;
    return utf8.read(this.buf, start, end);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Recursion limit.
 * @type {number}
 */
Reader.recursionLimit = util.recursionLimit;

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @param {number} [depth] Depth of recursion to control nested calls; 0 if omitted
 * @param {number} [fieldNumber] Field number for validating group end tags
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType, depth, fieldNumber) {
    if (depth === undefined) depth = 0;
    if (depth > Reader.recursionLimit)
        throw Error("max depth exceeded");
    if (fieldNumber === 0)
        throw Error("illegal tag: field number 0");
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
            while (true) {
                var tag = this.tag();
                var nestedField = tag >>> 3;
                wireType = tag & 7;
                if (!nestedField)
                    throw Error("illegal tag: field number 0");
                if (wireType === 4) {
                    if (fieldNumber !== undefined && nestedField !== fieldNumber)
                        throw Error("invalid end group tag");
                    break;
                }
                this.skipType(wireType, depth + 1, nestedField);
            }
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;
    Reader.create = create();
    BufferReader._configure();
};

export { Reader };
