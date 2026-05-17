import { util } from "./util/minimal.js";
import { length as utf8Length, write as writeUtf8 } from "./util/utf8.js";

/* eslint-disable no-invalid-this */

var BufferWriter; // cyclic

var base64 = util.base64;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @param {*} [val2] Second value to write
 * @ignore
 */
function Op(fn, len, val, val2) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies

    /**
     * Second value to write.
     * @type {*}
     */
    this.val2 = val2; // type varies
}

/**
 * Applies this operation to the specified buffer.
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target offset
 */
Op.prototype.apply = function apply(buf, pos) {
    this.fn(buf, pos);
};

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Op}
     * @private
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Op}
     * @private
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {State|null}
     * @private
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

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

function writeByte(buf, pos) {
    buf[pos] = this.val & 255;
}

function writeStringAscii(buf, pos) {
    var val = this.val;
    for (var i = 0; i < val.length;)
        buf[pos++] = val.charCodeAt(i++);
}

function writeStringUtf8Short(buf, pos) {
    var val = this.val,
        c1,
        c2;
    for (var i = 0; i < val.length; ++i) {
        c1 = val.charCodeAt(i);
        if (c1 < 128) {
            buf[pos++] = c1;
        } else if (c1 < 2048) {
            buf[pos++] = c1 >> 6 | 192;
            buf[pos++] = c1 & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = val.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buf[pos++] = c1 >> 18 | 240;
            buf[pos++] = c1 >> 12 & 63 | 128;
            buf[pos++] = c1 >> 6 & 63 | 128;
            buf[pos++] = c1 & 63 | 128;
        } else if ((c1 & 0xF800) === 0xD800) {
            buf[pos++] = 0xEF;
            buf[pos++] = 0xBF;
            buf[pos++] = 0xBD;
        } else {
            buf[pos++] = c1 >> 12 | 224;
            buf[pos++] = c1 >> 6 & 63 | 128;
            buf[pos++] = c1 & 63 | 128;
        }
    }
}

function writeVarint32(buf, pos) {
    var val = this.val;
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
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new Op(writeVarint32,
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    if (value < 0) {
        this.len += (this.tail = this.tail.next = new Op(writeVarint64, 10, value >>> 0, 0xffffffff)).len; // 10 bytes per spec
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

function writeVarint64(buf, pos) {
    var lo = this.val,
        hi = this.val2;
    while (hi) {
        buf[pos++] = lo & 127 | 128;
        lo = (lo >>> 7 | hi << 25) >>> 0;
        hi >>>= 7;
    }
    while (lo > 127) {
        buf[pos++] = lo & 127 | 128;
        lo = lo >>> 7;
    }
    buf[pos++] = lo;
}

function lengthVarint64(lo, hi) {
    var part0 = lo,
        part1 = (lo >>> 28 | hi << 4) >>> 0,
        part2 = hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
}

var bitsLo = 0,
    bitsHi = 0,
    view64 = new DataView(new ArrayBuffer(8));

function setBits_bigint(value) {
    view64.setBigUint64(0, value, true);
    bitsLo = view64.getUint32(0, true);
    bitsHi = view64.getUint32(4, true);
}

function setBits_number(value) {
    var sign = value < 0;
    if (sign)
        value = -value;

    bitsLo = value >>> 0;
    bitsHi = (value - bitsLo) / 4294967296 >>> 0;

    if (sign) {
        bitsHi = ~bitsHi >>> 0;
        bitsLo = ~bitsLo >>> 0;
        if (++bitsLo > 4294967295) {
            bitsLo = 0;
            if (++bitsHi > 4294967295)
                bitsHi = 0;
        }
    }
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {number|bigint} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint64 = function write_uint64(value) {
    if (typeof value === "bigint")
        setBits_bigint(value);
    else if (typeof value === "number")
        setBits_number(value);
    else
        throw TypeError("value must be a number or bigint");
    this.len += (this.tail = this.tail.next = new Op(writeVarint64, lengthVarint64(bitsLo, bitsHi), bitsLo, bitsHi)).len;
    return this;
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {number|bigint} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {number|bigint} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint64 = function write_sint64(value) {
    if (typeof value === "bigint")
        setBits_bigint(value);
    else if (typeof value === "number")
        setBits_number(value);
    else
        throw TypeError("value must be a number or bigint");
    var mask = bitsHi >> 31,
        lo = (bitsLo << 1 ^ mask) >>> 0,
        hi = ((bitsHi << 1 | bitsLo >>> 31) ^ mask) >>> 0;
    this.len += (this.tail = this.tail.next = new Op(writeVarint64, lengthVarint64(lo, hi), lo, hi)).len;
    return this;
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    this.tail = this.tail.next = new Op(writeByte, 1, value ? 1 : 0);
    this.len += 1;
    return this;
};

function writeFixed32(buf, pos) {
    var val = this.val;
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
    this.tail = this.tail.next = new Op(writeFixed32, 4, value >>> 0);
    this.len += 4;
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
 * @param {number|bigint} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    if (typeof value === "bigint")
        setBits_bigint(value);
    else if (typeof value === "number")
        setBits_number(value);
    else
        throw TypeError("value must be a number or bigint");
    this.tail = this.tail.next = new Op(writeFixed32, 4, bitsLo);
    this.tail = this.tail.next = new Op(writeFixed32, 4, bitsHi);
    this.len += 8;
    return this;
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {number|bigint} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    this.len += (this.tail = this.tail.next = new Op(writeFloat, 4, value)).len;
    return this;
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    this.len += (this.tail = this.tail.next = new Op(writeDouble, 8, value)).len;
    return this;
};

function writeFloat(buf, pos) {
    util.float.writeFloatLE(this.val, buf, pos);
}

function writeDouble(buf, pos) {
    util.float.writeDoubleLE(this.val, buf, pos);
}

function writeBytes(buf, pos) {
    buf.set(this.val, pos); // also works for plain array values
}

function writeStringUtf8(buf, pos) {
    writeUtf8(this.val, buf, pos);
}

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len) {
        this.len += (this.tail = this.tail.next = new Op(writeByte, 1, 0)).len;
        return this;
    }
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    this.uint32(len).len += (this.tail = this.tail.next = new Op(writeBytes, len, value)).len;
    return this;
};

/**
 * Writes raw bytes without a tag or length prefix.
 * @param {Uint8Array} value Raw bytes
 * @returns {Writer} `this`
 */
Writer.prototype.raw = function write_raw(value) {
    var len = value.length >>> 0;
    if (len)
        this.len += (this.tail = this.tail.next = new Op(writeBytes, len, value)).len;
    return this;
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8Length(value);
    if (len) {
        this.uint32(len).len += (this.tail = this.tail.next = new Op(len === value.length ? writeStringAscii : len < 40 ? writeStringUtf8Short : writeStringUtf8, len, value)).len;
    } else {
        this.len += (this.tail = this.tail.next = new Op(writeByte, 1, 0)).len;
    }
    return this;
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    return this.finishInto(this.constructor.alloc(this.len), 0);
};

/**
 * Finishes the write operation, writing into the provided buffer.
 * The caller must ensure that `buf` has enough space starting at `offset`
 * to hold {@link Writer#len} bytes.
 * @param {T} buf Target buffer
 * @param {number} [offset=0] Offset to start writing at
 * @returns {T} The provided buffer
 * @template T extends Uint8Array
 */
Writer.prototype.finishInto = function finishInto(buf, offset) {
    if (offset === undefined)
        offset = 0;
    var head = this.head.next,
        pos  = offset;
    while (head) {
        head.apply(buf, pos);
        pos += head.len;
        head = head.next;
    }
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
    Writer.create = create();
    BufferWriter._configure();
};

export { Op, Writer, writeByte, writeStringAscii, writeStringUtf8Short };
