var util    = require("./util"),
    long_   = require("./support/long"),
    string_ = require("./support/string"),
    float_  = require("./support/float"),
    array_  = require("./support/array");

module.exports = Writer;

/**
 * Default buffer size.
 * @type {number}
 */
Writer.BUFFER_SIZE = 1024;

/**
 * Writer using typed arrays.
 * @constructor
 */
function Writer() {
    if (!(this instanceof Writer)) {
        if (util.Buffer)
            return new BufferWriter();
        return new Writer();
    }

    /**
     * Current buffer.
     * @type {?Array}
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
     * @type {!Array.<!Array>}
     */
    this.bufs = [];

    /**
     * Forked states stack.
     * @type {!Array.<!Array.<!Array>>}
     * @private
     */
    this._stack = [];
}

var WriterPrototype = Writer.prototype;

/**
 * Allocates a chunk of memory.
 * @function
 * @param {number} size Buffer size
 * @returns {!Array} Allocated buffer
 */
Writer.alloc = array_._alloc;

WriterPrototype._slice = array_._slice;

/**
 * Allocates more memory on the specified writer.
 * @param {!Writer} writer Writer to expand
 * @param {number} writeLength Write length requested
 * @returns {undefined}
 * @inner
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
 * @returns {!Writer} this
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
 * @returns {!Writer} this
 */
WriterPrototype.uint32 = function write_uint32(value) {
    value >>>= 0;
    while (value > 127) {
        if (this.pos >= this.len)
            expand(this, 1);
        this.buf[this.pos++] = value & 127 | 128;
        value >>>= 7;
    }
    if (this.pos >= this.len)
        expand(this, 1);
    this.buf[this.pos++] = value;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {!Writer} this
 */
WriterPrototype.int32 = WriterPrototype.uint32;

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {!Writer} this
 */
WriterPrototype.sint32 = function write_sint32(value) {
    return this.uint32(value << 1 ^ value >> 31);
};

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {number|!{ low: number, high: number }|!Long} value Value to write
 * @returns {!Writer} this
 */
WriterPrototype.uint64 = function write_uint64(value) {
    return long_._set(value)
                ._write(this, expand);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {number|!{ low: number, high: number }|!Long} value Value to write
 * @returns {!Writer} this
 */
WriterPrototype.int64 = WriterPrototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {number|!{ low: number, high: number }|!Long} value Value to write
 * @returns {!Writer} this
 */
WriterPrototype.sint64 = function sint64(value) {
    return long_._set(value)
                ._zigZagEncode()
                ._write(this, expand);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {!Writer} this
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
 * @returns {!Writer} this
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
 * @returns {!Writer} this
 */
WriterPrototype.sfixed32 = function write_sfixed32(value) {
    return this.fixed32(value << 1 ^ value >> 31);
};

/**
 * Writes a 64 bit value as fixed 64 bits.
 * @param {number|!{ low: number, high: number }|!Long} value Value to write
 * @returns {!Writer} this
 */
WriterPrototype.fixed64 = function write_fixed64(value) {
    if (this.pos + 8 > this.len)
        expand(this, 8);
    return long_._set(value)
                ._writeFixed(this);
};

/**
 * Writes a 64 bit value as fixed 64 bits, zig-zag encoded.
 * @param {number|!{ low: number, high: number }|!Long} value Value to write
 * @returns {!Writer} this
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
 * @param {number} value Value to write
 * @returns {!Writer} this
 */
WriterPrototype.float = function write_float(value) {
    if (this.pos + 4 > this.len)
        expand(this, 4);
    return float_._write(this, value, 4);
};

/**
 * Writes a double (64 bit float).
 * @param {number} value Value to write
 * @returns {!Writer} this
 */
WriterPrototype.double = function write_double(value) {
    if (this.pos + 8 > this.len)
        expand(this, 8);
    return float_._write(this, value, 8);
};

/**
 * Writes a sequence of bytes.
 * @param {!Array} value Value to write
 * @returns {!Writer} this
 */
WriterPrototype.bytes = function write_bytes(value) {
    var len = value.length;
    this.uint32(len);
    if (len) {
        if (this.pos + len > this.len)
            expand(this, len);
        array_._set.call(this.buf, value, this.pos);
        this.pos += len;
    }
    return this;
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {!Writer} this
 */
WriterPrototype.string = function write_string(value) {
    return this.bytes(string_._encode(value));
};

/**
 * Forks this writer's state by pushing it to a stack and reusing the remaining buffer
 * for a new set of write operations. A call to {@link Writer#reset} or {@link Writer#finish}
 * resets the writer to the previous state.
 * @returns {!Writer} this
 */
WriterPrototype.fork = function fork() {
    if (this.buf && this.pos) {
        var remain = this.buf;
        if (this.pos < this.len) {
            this.bufs.push(this._slice.call(remain, 0, this.pos));
            remain = this._slice.call(remain, this.pos);
            this.len = remain.length;
        } else {
            this.bufs.push(remain);
            remain = null;
            this.len = 0;
        }
        this._stack.push(this.bufs);
        this.bufs = [];
        this.buf = remain;
        this.pos = 0;
    }
    return this;
};

/**
 * Resets this instance to the last state. If there is no last state, all references
 * to previous buffers will be cleared.
 * @param {boolean} [clearForkedStates] `true` to clear all previously forked states
 * @returns {!Writer} this
 */
WriterPrototype.reset = function reset(clearForkedStates) {
    if (this._stack.length)
        this.bufs = clearForkedStates ? [] : this._stack.pop();
    else
        this.bufs = [];
    this.buf = null;
    this.pos = this.len = 0;
    return this;
};

/**
 * Finishes the current sequence of write operations and frees all resources.
 * @param {boolean} [clearForkedStates] `true` to clear all previously forked states
 * @returns {!Array} Finished buffer
 */
WriterPrototype.finish = function finish(clearForkedStates) {
    var bufs = this.bufs,
        buf  = this.buf,
        pos  = this.pos,
        len  = this.len;
    this.reset(clearForkedStates);
    if (buf) {
        if (pos < len)
            buf = this._slice.call(buf, 0, pos);
        if (!bufs.length)
            return buf;
    } else
        return array_._empty || [];
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
        array_._set.call(concat, sub = bufs[i++], pos);
        pos += sub.length;
    }
    array_._set.call(concat, buf, pos);
    return concat;
};

// One time function to initialize BufferWriter with the now-known buffer
// implementation's slice method
var initBufferWriter = function() {
    if (util.Buffer) {
        BufferWriterPrototype._slice = util.Buffer.prototype.slice;
        BufferWriter.alloc = util.Buffer.alloc || function(size) { return new util.Buffer(size); };
        initBufferWriter = undefined;
        emptyBuffer = BufferWriter.alloc(0);
    }
};

var emptyBuffer = null;

/**
 * Writer using node buffers.
 * @memberof Writer
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    if (initBufferWriter)
        initBufferWriter();
    Writer.call(this);
}

var BufferWriterPrototype = BufferWriter.prototype = Object.create(Writer.prototype);
BufferWriterPrototype.constructor = BufferWriter;

Writer.BufferWriter = BufferWriter;

/**
 * Allocates a chunk of memory using node buffers.
 * @name BufferWriter.alloc
 * @param {number} size Buffer size
 * @returns {!Buffer} Allocated buffer
 * @override
 */
BufferWriter.alloc = function alloc_buffer(size) {
    // This becomes overridden by initBufferWriter but it's here in case that alloc is used earlier
    return util.Buffer.alloc
        ? util.Buffer.alloc(size)
        : new util.Buffer(size);
};

/**
 * Writes a float (32 bit) using node buffers.
 * @param {number} value Value to write
 * @returns {!BufferWriter} this
 * @override
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
 * @returns {!BufferWriter} this
 * @override
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
 * @param {!Buffer} value Value to write
 * @returns {!BufferWriter} this
 * @override
 */
BufferWriterPrototype.bytes = function write_bytes_buffer(value) {
    var len = value.length;
    this.uint32(len);
    if (len) {
        if (this.pos + len > this.len)
            expand(this, len);
        value.copy(this.buf, this.pos);
        this.pos += len;
    }
    return this;
};

/**
 * Writes a string using node buffers.
 * @param {string} value Value to write
 * @returns {!BufferWriter} this
 * @override
 */
BufferWriterPrototype.string = function write_string_buffer(value) {
    var len = util.Buffer.byteLength(value);
    this.uint32(len);
    if (len) {
        if (this.pos + len > this.len)
            expand(this, len);
        this.buf.write(value, this.pos);
        this.pos += len;
    }
    return this;
};

/**
 * Finishes the current sequence of write operations using node buffers and frees all resources.
 * @param {boolean} [clearForkedStates] `true` to clear all previously forked states
 * @returns {!Buffer} Finished buffer
 * @override
 */
BufferWriterPrototype.finish = function finish_buffer(clearForkedStates) {
    var bufs = this.bufs,
        buf  = this.buf,
        pos  = this.pos;
    this.reset(clearForkedStates);
    if (buf) {
        if (!bufs.length)
            return buf.slice(0, pos);
        if (pos)
            bufs.push(buf.slice(0, pos));
        return util.Buffer.concat(bufs);
    }
    return emptyBuffer;
};
