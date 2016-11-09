module.exports = Writer;

/**
 * Buffer implementation, if available.
 * @type {?Function}
 */
Writer.Buffer = null;

Writer.BufferWriter = BufferWriter;

var long_   = require("./support/long"),
    ieee754 = require("./support/ieee754");

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
