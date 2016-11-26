"use strict";
module.exports = Writer;

Writer.BufferWriter = BufferWriter;

var util     = require("./util"),
    ieee754  = require("../lib/ieee754");
var LongBits = util.LongBits;

/**
 * Constructs a new writer operation.
 * @classdesc Scheduled writer operation.
 * @memberof Writer
 * @constructor
 * @param {function(number[], number, *)} fn Function to call
 * @param {*} val Value to write
 * @param {number} len Value byte length
 * @private
 * @ignore
 */
function Op(fn, val, len) {

    /**
     * Function to call.
     * @type {function(number[], number, *)}
     */
    this.fn = fn;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {?Writer.Op}
     */
    this.next = null;
}

Writer.Op = Op;

function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state.
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
}

Writer.State = State;

var ArrayImpl =  typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

/**
 * Constructs a new writer.
 * When called as a function, returns an appropriate writer for the current environment.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @exports Writer
 * @constructor
 */
function Writer() {
    if (!(this instanceof Writer))
        return util.Buffer
            ? new BufferWriter()
            : new Writer();

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
     * State stack.
     * @type {Object[]}
     */
    this.stack = [];

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling linked operations with already prepared values.
}

/** @alias Writer.prototype */
var WriterPrototype = Writer.prototype;

/**
 * Pushes a new operation to the queue.
 * @param {function(number[], number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.push = function push(fn, len, val) {
    var op = new Op(fn, val, len);
    this.tail.next = op;
    this.tail = op;
    this.len += len;
    return this;
};

function writeByte(buf, pos, val) {
    buf[pos] = val;
}

/**
 * Writes a tag.
 * @param {number} id Field id
 * @param {number} wireType Wire type
 * @returns {Writer} `this`
 */
WriterPrototype.tag = function write_tag(id, wireType) {
    return this.push(writeByte, 1, (id << 3 | wireType & 7) & 255);
};

function writeVarint32(buf, pos, val) {
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
    value >>>= 0;
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
WriterPrototype.int32 = WriterPrototype.uint32;

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.sint32 = function write_sint32(value) {
    return this.uint32(value << 1 ^ value >> 31);
};

function writeVarint64(buf, pos, val) {
    // tends to deoptimize. stays optimized when using bits directly.
    while (val.hi || val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.uint64 = function write_uint64(value) {
    var bits;
    if (typeof value === 'number')
        bits = value ? LongBits.fromNumber(value) : LongBits.zero;
    else if (value.low || value.high)
        bits = new LongBits(value.low >>> 0, value.high >>> 0);
    else
        bits = LongBits.zero;
    return this.push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.int64 = WriterPrototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.sint64 = function sint64(value) {
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

function writeFixed32(buf, pos, val) {
    buf[pos++] =  val         & 255;
    buf[pos++] =  val >>> 8   & 255;
    buf[pos++] =  val >>> 16  & 255;
    buf[pos  ] =  val >>> 24  & 255;
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

function writeFixed64(buf, pos, val) {
    buf[pos++] = val.lo        & 255;
    buf[pos++] = val.lo >>> 8  & 255;
    buf[pos++] = val.lo >>> 16 & 255;
    buf[pos++] = val.lo >>> 24      ;
    buf[pos++] = val.hi        & 255;
    buf[pos++] = val.hi >>> 8  & 255;
    buf[pos++] = val.hi >>> 16 & 255;
    buf[pos  ] = val.hi >>> 24      ;
}

/**
 * Writes a 64 bit value as fixed 64 bits.
 * @param {Long|number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.fixed64 = function write_fixed64(value) {
    return this.push(writeFixed64, 8, LongBits.from(value));
};

/**
 * Writes a 64 bit value as fixed 64 bits, zig-zag encoded.
 * @param {Long|number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.sfixed64 = function write_sfixed64(value) {
    return this.push(writeFixed64, 8, LongBits.from(value).zzEncode());
};

function writeFloat(buf, pos, val) {
    ieee754.write(buf, val, pos, false, 23, 4);
}

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.float = function write_float(value) {
    return this.push(writeFloat, 4, value);
};

function writeDouble(buf, pos, val) {
    ieee754.write(buf, val, pos, false, 52, 8);
}

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
    ? function writeBytes_set(buf, pos, val) { buf.set(val, pos); }
    : function writeBytes_for(buf, pos, val) { for (var i = 0; i < val.length; ++i) buf[pos + i] = val[i]; };

/**
 * Writes a sequence of bytes.
 * @param {number[]} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    return len
        ? this.uint32(len).push(writeBytes, len, value)
        : this.push(writeByte, 1, 0);
};

function writeString(buf, pos, val) {
    for (var i = 0, len = val.length, c1, c2; i < len; ++i) {
        c1 = val.charCodeAt(i);
        if (c1 < 128) {
            buf[pos++] = c1;
        } else if (c1 < 2048) {
            buf[pos++] = c1 >> 6 | 192;
            buf[pos++] = c1 & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && i + 1 < len && ((c2 = val.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buf[pos++] = c1 >> 18      | 240;
            buf[pos++] = c1 >> 12 & 63 | 128;
            buf[pos++] = c1 >> 6  & 63 | 128;
            buf[pos++] = c1       & 63 | 128;
        } else {
            buf[pos++] = c1 >> 12      | 224;
            buf[pos++] = c1 >> 6  & 63 | 128;
            buf[pos++] = c1       & 63 | 128;
        }
    }
}

function byteLength(val) {
    var strlen = val.length >>> 0;
    if (strlen) {
        var len = 0;
        for (var i = 0, c1; i < strlen; ++i) {
            c1 = val.charCodeAt(i);
            if (c1 < 128)
                len += 1;
            else if (c1 < 2048)
                len += 2;
            else if ((c1 & 0xFC00) === 0xD800 && i + 1 < strlen && (val.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
                ++i;
                len += 4;
            } else
                len += 3;
        }
        return len;
    }
    return 0;
}

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
WriterPrototype.string = function write_string(value) {
    var len = byteLength(value);
    return len
        ? this.uint32(len).push(writeString, len, value)
        : this.push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#ldelim}, {@link Writer#reset} or {@link Writer#finish} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
WriterPrototype.fork = function fork() {
    this.stack.push(new State(this));
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
WriterPrototype.reset = function reset() {
    if (this.stack.length) {
        var state = this.stack.pop();
        this.head = state.head;
        this.tail = state.tail;
        this.len  = state.len;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @param {number} [id] Id with wire type 2 to prepend where applicable
 * @returns {Writer} `this`
 */
WriterPrototype.ldelim = function ldelim(id) {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset();
    if (id !== undefined)
        this.tag(id, 2);
    this.uint32(len);
    this.tail.next = head.next; // skip noop
    this.tail = tail;
    this.len += len;
    return this;
};

/**
 * Finishes the current sequence of write operations and frees all resources.
 * @returns {number[]} Finished buffer
 */
WriterPrototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = new ArrayImpl(this.len),
        pos  = 0;
    this.reset();
    while (head) {
        head.fn(buf, pos, head.val);
        pos += head.len;
        head = head.next;
    }
    return buf;
};

/**
 * Constructs a new buffer writer.
 * @classdesc Wire format writer using node buffers.
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

function writeFloatBuffer(buf, pos, val) {
    buf.writeFloatLE(val, pos, true);
}

/**
 * Writes a float (32 bit) using node buffers.
 * @param {number} value Value to write
 * @returns {BufferWriter} `this`
 */
BufferWriterPrototype.float = function write_float_buffer(value) {
    return this.push(writeFloatBuffer, 4, value);
};

function writeDoubleBuffer(buf, pos, val) {
    buf.writeDoubleLE(val, pos, true);
}

/**
 * Writes a double (64 bit float) using node buffers.
 * @param {number} value Value to write
 * @returns {BufferWriter} `this`
 */
BufferWriterPrototype.double = function write_double_buffer(value) {
    return this.push(writeDoubleBuffer, 8, value);
};

function writeBytesBuffer(buf, pos, val) {
    if (val.length)
        val.copy(buf, pos, 0, val.length);
}

/**
 * Writes a sequence of bytes using node buffers.
 * @param {Buffer} value Value to write
 * @returns {BufferWriter} `this`
 */
BufferWriterPrototype.bytes = function write_bytes_buffer(value) {
    var len = value.length >>> 0;
    return len
        ? this.uint32(len).push(writeBytesBuffer, len, value)
        : this.push(writeByte, 1, 0);
};

function writeStringBuffer(buf, pos, val) {
    buf.write(val, pos);
}

/**
 * Writes a string using node buffers.
 * @param {string} value Value to write
 * @returns {BufferWriter} `this`
 */
BufferWriterPrototype.string = function write_string_buffer(value) {
    var len = byteLength(value);
    return len
        ? this.uint32(len).push(writeStringBuffer, len, value)
        : this.push(writeByte, 1, 0);
};

/**
 * Finishes the current sequence of write operations using node buffers and frees all resources.
 * @returns {Buffer} Finished buffer
 */
BufferWriterPrototype.finish = function finish_buffer() {
    var head = this.head.next, // skip noop
        buf  = util.Buffer.allocUnsafe && util.Buffer.allocUnsafe(this.len) || new util.Buffer(this.len),
        pos  = 0;
    this.reset();
    while (head) {
        head.fn(buf, pos, head.val);
        pos += head.len;
        head = head.next;
    }
    return buf;
};
