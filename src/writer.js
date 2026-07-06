"use strict";
module.exports = Writer;

var util      = require("./util/minimal");

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array`.
 * @constructor
 */
function Writer() {

    /**
     * Write cursor into {@link Writer#buf}.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Backing buffer.
     * @type {Uint8Array}
     */
    this.buf = this.constructor.alloc(64);

    /**
     * Cached DataView over {@link Writer#buf}.
     * @type {DataView|null}
     */
    this.view = null;

    /**
     * Stack of forked length-prefix positions.
     * @type {Array<number>|null}
     */
    this.states = null;
}

/**
 * Current write position.
 * @name Writer#len
 * @type {number}
 * @deprecated Use {@link Writer#pos} instead.
 */
Object.defineProperty(Writer.prototype, "len", {
    configurable: true,
    enumerable: true,
    get: function get_len() {
        return this.pos;
    }
});

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup() {
            return (Writer.create = function create_buffer() {
                return new BufferWriter();
            })();
        }
        /* istanbul ignore next */
        : function create_array() {
            return new Writer();
        };
};

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = create();

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new Uint8Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
Writer.alloc = util.pool(Writer.alloc, Uint8Array.prototype.subarray);

/**
 * Calculates the number of bytes a value occupies as a varint.
 * @param {number} value Value to size (unsigned)
 * @returns {number} Byte length (1..5)
 * @ignore
 */
function sizeVarint32(value) {
    return value         < 128       ? 1
         : value         < 16384     ? 2
         : value         < 2097152   ? 3
         : value         < 268435456 ? 4
         :                             5;
}

/**
 * Ensures that at least `n` more bytes fit into the backing buffer, doubling it if not.
 * @param {number} n Number of additional bytes required
 * @returns {undefined}
 * @private
 */
Writer.prototype._reserve = function _reserve(n) {
    var need = this.pos + n;
    if (need > this.buf.length) {
        var size = this.buf.length << 1;
        if (size < need)
            size = need;
        var buf = this.constructor.alloc(size);
        buf.set(this.buf.subarray(0, this.pos), 0);
        this.buf = buf;
        this.view = null; // invalidate
    }
};

function writeStringAscii(val, buf, pos) {
    for (var i = 0; i < val.length;)
        buf[pos++] = val.charCodeAt(i++);
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
    return pos + 1;
}

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    value = value >>> 0;
    this._reserve(5);
    var pos = this.pos;
    this.pos = writeVarint32(value, this.buf, pos);
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    if ((value |= 0) < 0) { // 10 bytes per spec
        this._reserve(10);
        writeVarint64(LongBits.fromNumber(value), this.buf, this.pos);
        this.pos += 10;
        return this;
    }
    return this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    var lo = val.lo,
        hi = val.hi;
    while (hi) {
        buf[pos++] = lo & 127 | 128;
        lo = (lo >>> 7 | hi << 25) >>> 0;
        hi >>>= 7;
    }
    while (lo > 127) {
        buf[pos++] = lo & 127 | 128;
        lo = lo >>> 7;
    }
    buf[pos] = lo;
    return pos + 1;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    this._reserve(10);
    var pos = this.pos;
    this.pos = writeVarint64(bits, this.buf, pos);
    return this;
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    this._reserve(10);
    var pos = this.pos;
    this.pos = writeVarint64(bits, this.buf, pos);
    return this;
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    this._reserve(1);
    this.buf[this.pos++] = value ? 1 : 0;
    return this;
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    this._reserve(4);
    writeFixed32(value >>> 0, this.buf, this.pos);
    this.pos += 4;
    return this;
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    this._reserve(8);
    writeFixed32(bits.lo, this.buf, this.pos);
    writeFixed32(bits.hi, this.buf, this.pos + 4);
    this.pos += 8;
    return this;
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    this._reserve(4);
    util.float.writeFloatLE(value, this.buf, this.pos);
    this.pos += 4;
    return this;
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    this._reserve(8);
    util.float.writeDoubleLE(value, this.buf, this.pos);
    this.pos += 8;
    return this;
};

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len) {
        this._reserve(1);
        this.buf[this.pos++] = 0;
        return this;
    }
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    this.uint32(len);
    this._reserve(len);
    this.buf.set(value, this.pos);
    this.pos += len;
    return this;
};

/**
 * Writes raw bytes without a tag or length prefix.
 * @param {Uint8Array} value Raw bytes
 * @returns {Writer} `this`
 */
Writer.prototype.raw = function write_raw(value) {
    var len = value.length >>> 0;
    if (!len)
        return this;
    this._reserve(len);
    this.buf.set(value, this.pos);
    this.pos += len;
    return this;
};

/**
 * Backfills the length varint.
 * @param {number} pos Position of reserved length byte
 * @param {number} len Length of content after length varint
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._delim = function _delim(pos, len) {
    var n = sizeVarint32(len);
    if (n > 1)
        this.buf.copyWithin(pos + n, pos + 1, pos + 1 + len);
    writeVarint32(len, this.buf, pos);
    this.pos = pos + n + len;
    return this;
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var n = value.length;
    if (!n) {
        this._reserve(1);
        this.buf[this.pos++] = 0;
        return this;
    }
    if (n < 0x80) {
        this._reserve(n * 3 + 5); // worst case
        var lenPos = this.pos;
        return this._delim(lenPos, utf8.write(value, this.buf, lenPos + 1));
    }
    var len = utf8.length(value);
    this.uint32(len);
    this._reserve(len);
    if (len === value.length)
        writeStringAscii(value, this.buf, this.pos);
    else
        utf8.write(value, this.buf, this.pos);
    this.pos += len;
    return this;
};

/**
 * Writes an array of unsigned 32 bit values as a packed repeated field.
 * @param {number[]} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32s = function write_uint32s(value) {
    var n = value.length;
    this._reserve(n * 5 + 5); // worst case: 5 bytes per value + length varint
    var buf = this.buf, lenPos = this.pos, p = lenPos + 1;
    for (var i = 0; i < n; ++i)
        p = writeVarint32(value[i] >>> 0, buf, p);
    return this._delim(lenPos, p - lenPos - 1);
};

/**
 * Writes an array of signed 32 bit values as a packed repeated field.
 * @param {number[]} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32s = function write_int32s(value) {
    var n = value.length;
    this._reserve(n * 10 + 5); // worst case: 10 bytes per negative value + length varint
    var buf = this.buf, lenPos = this.pos, pos = lenPos + 1, val;
    for (var i = 0; i < n; ++i) {
        if ((val = value[i] | 0) < 0) { // negatives are 10 bytes per spec
            pos = writeVarint64(LongBits.fromNumber(val), buf, pos);
        } else {
            pos = writeVarint32(val, buf, pos);
        }
    }
    return this._delim(lenPos, pos - lenPos - 1);
};

/**
 * Writes an array of 32 bit values as packed, zig-zag encoded varints.
 * @param {number[]} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32s = function write_sint32s(value) {
    var n = value.length;
    this._reserve(n * 5 + 5);
    var buf = this.buf, lenPos = this.pos, pos = lenPos + 1;
    for (var i = 0; i < n; ++i)
        pos = writeVarint32((value[i] << 1 ^ value[i] >> 31) >>> 0, buf, pos);
    return this._delim(lenPos, pos - lenPos - 1);
};

/**
 * Writes an array of unsigned 64 bit values as a packed repeated field.
 * @param {Array.<Long|number|string>} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint64s = function write_uint64s(value) {
    var n = value.length;
    this._reserve(n * 10 + 5);
    var buf = this.buf, lenPos = this.pos, pos = lenPos + 1;
    for (var i = 0; i < n; ++i) {
        pos = writeVarint64(LongBits.from(value[i]), buf, pos);
    }
    return this._delim(lenPos, pos - lenPos - 1);
};

/**
 * Writes an array of signed 64 bit values as a packed repeated field.
 * @function
 * @param {Array.<Long|number|string>} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.int64s = Writer.prototype.uint64s;

/**
 * Writes an array of 64 bit values as packed, zig-zag encoded varints.
 * @param {Array.<Long|number|string>} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint64s = function write_sint64s(value) {
    var n = value.length;
    this._reserve(n * 10 + 5);
    var buf = this.buf, lenPos = this.pos, pos = lenPos + 1;
    for (var i = 0; i < n; ++i) {
        pos = writeVarint64(LongBits.from(value[i]).zzEncode(), buf, pos);
    }
    return this._delim(lenPos, pos - lenPos - 1);
};

/**
 * Writes an array of boolish values as a packed repeated field.
 * @param {boolean[]} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.bools = function write_bools(value) {
    var n = value.length;
    this.uint32(n); // one byte per value
    this._reserve(n);
    var buf = this.buf, p = this.pos;
    for (var i = 0; i < n; ++i)
        buf[p++] = value[i] ? 1 : 0;
    this.pos += n;
    return this;
};

// The view allocation only pays off when amortized over enough writes
var VIEW_THRESHOLD_FLOAT = 16,
    VIEW_THRESHOLD_INT   = 128;

function getLazyView(writer, count, threshold) {
    var view = writer.view;
    if (view || count < threshold)
        return view;
    var buf = writer.buf;
    return writer.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
}

/**
 * Writes an array of unsigned 32 bit values as packed, fixed 32 bits.
 * @param {number[]} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32s = function write_fixed32s(value) {
    var n = value.length, bytes = n * 4;
    this.uint32(bytes); // length is known exactly
    this._reserve(bytes);
    var p = this.pos, i, dv = getLazyView(this, n, VIEW_THRESHOLD_INT);
    if (dv)
        for (i = 0; i < n; ++i) { dv.setUint32(p, value[i] >>> 0, true); p += 4; }
    else {
        var buf = this.buf;
        for (i = 0; i < n; ++i) { writeFixed32(value[i] >>> 0, buf, p); p += 4; }
    }
    this.pos += bytes;
    return this;
};

/**
 * Writes an array of signed 32 bit values as packed, fixed 32 bits.
 * @function
 * @param {number[]} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32s = Writer.prototype.fixed32s;

/**
 * Writes an array of unsigned 64 bit values as packed, fixed 64 bits.
 * @param {Array.<Long|number|string>} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed64s = function write_fixed64s(value) {
    var n = value.length, bytes = n * 8;
    this.uint32(bytes);
    this._reserve(bytes);
    var p = this.pos, i, bits, dv = getLazyView(this, n, VIEW_THRESHOLD_INT);
    if (dv)
        for (i = 0; i < n; ++i) { bits = LongBits.from(value[i]); dv.setUint32(p, bits.lo, true); dv.setUint32(p + 4, bits.hi, true); p += 8; }
    else {
        var buf = this.buf;
        for (i = 0; i < n; ++i) { bits = LongBits.from(value[i]); writeFixed32(bits.lo, buf, p); writeFixed32(bits.hi, buf, p + 4); p += 8; }
    }
    this.pos += bytes;
    return this;
};

/**
 * Writes an array of signed 64 bit values as packed, fixed 64 bits.
 * @function
 * @param {Array.<Long|number|string>} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed64s = Writer.prototype.fixed64s;

/**
 * Writes an array of floats (32 bit) as a packed repeated field.
 * @param {number[]} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.floats = function write_floats(value) {
    var n = value.length, bytes = n * 4;
    this.uint32(bytes);
    this._reserve(bytes);
    var p = this.pos, i, dv = getLazyView(this, n, VIEW_THRESHOLD_FLOAT);
    if (dv)
        for (i = 0; i < n; ++i) { dv.setFloat32(p, value[i], true); p += 4; }
    else {
        var buf = this.buf;
        for (i = 0; i < n; ++i) { util.float.writeFloatLE(value[i], buf, p); p += 4; }
    }
    this.pos += bytes;
    return this;
};

/**
 * Writes an array of doubles (64 bit float) as a packed repeated field.
 * @param {number[]} value Values to write
 * @returns {Writer} `this`
 */
Writer.prototype.doubles = function write_doubles(value) {
    var n = value.length, bytes = n * 8;
    this.uint32(bytes);
    this._reserve(bytes);
    var p = this.pos, i, dv = getLazyView(this, n, VIEW_THRESHOLD_FLOAT);
    if (dv)
        for (i = 0; i < n; ++i) { dv.setFloat64(p, value[i], true); p += 8; }
    else {
        var buf = this.buf;
        for (i = 0; i < n; ++i) { util.float.writeDoubleLE(value[i], buf, p); p += 8; }
    }
    this.pos += bytes;
    return this;
};

/**
 * Forks this writer's state by pushing it to a stack.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this._reserve(1);
    (this.states || (this.states = [])).push(this.pos);
    this.pos += 1;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    var states = this.states;
    if (states && states.length) {
        this.pos = states.pop();
    } else {
        this.pos = 0;
    }
    return this;
};

/**
 * Resets to the last state and prepends the fork state's current write length as a varint.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var states = this.states,
        len,
        vlen;
    if (states && states.length) {
        var lenPos = states.pop();
        len = this.pos - lenPos - 1;
        vlen = sizeVarint32(len);
        if (vlen > 1) { // grow the reserved single byte and shift content forward
            this._reserve(vlen - 1);
            this.buf.copyWithin(lenPos + vlen, lenPos + 1, lenPos + 1 + len);
            this.pos += vlen - 1;
            writeVarint32(len, this.buf, lenPos);
        } else {
            this.buf[lenPos] = len;
        }
    } else { // not forked: prefix the entire buffer with its length
        // TODO: Compatibility with older generated code.
        // Remove this branch in the next major release.
        len = this.pos;
        vlen = sizeVarint32(len);
        this._reserve(vlen);
        this.buf.copyWithin(vlen, 0, len);
        writeVarint32(len, this.buf, 0);
        this.pos += vlen;
    }
    return this;
};

/**
 * Finishes the write operation.
 * Returns a buffer sized to the written data by default.
 * @param {boolean} [shared=false] Whether to return a shared view instead of a unique copy
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish(shared) {
    if (shared)
        return this.buf.subarray(0, this.pos);
    var buf = this.constructor.alloc(this.pos);
    buf.set(this.buf.subarray(0, this.pos), 0);
    return buf;
};

/**
 * Finishes the write operation, writing into the provided buffer.
 * The caller must ensure that `buf` has enough space starting at `offset`
 * to hold {@link Writer#pos} bytes.
 * @param {T} buf Target buffer
 * @param {number} [offset=0] Offset to start writing at
 * @returns {T} The provided buffer
 * @template T extends Uint8Array
 */
Writer.prototype.finishInto = function finishInto(buf, offset) {
    if (offset === undefined)
        offset = 0;
    buf.set(this.buf.subarray(0, this.pos), offset);
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
    Writer.create = create();
    BufferWriter._configure();
};
