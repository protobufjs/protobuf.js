import { Op, Writer, writeByte, writeStringAscii, writeStringUtf8Short } from "./writer.js";
import { util } from "./util/minimal.js";
import { write as writeUtf8 } from "./util/utf8.js";

/* eslint-disable no-invalid-this */

// extends Writer
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

BufferWriter._configure = function () {
    /**
     * Allocates a buffer of the specified size.
     * @function
     * @param {number} size Buffer size
     * @returns {util.Buffer} Buffer
     */
    BufferWriter.alloc = util._Buffer_allocUnsafe;

    BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set"
        ? function writeBytesBuffer_set(buf, pos) {
          buf.set(this.val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
          // also works for plain array values
        }
        /* istanbul ignore next */
        : function writeBytesBuffer_copy(buf, pos) {
          var val = this.val;
          if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
          else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
        };
};

/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    if (len)
        this.uint32(len).len += (this.tail = this.tail.next = new Op(BufferWriter.writeBytesBuffer, len, value)).len;
    else
        this.len += (this.tail = this.tail.next = new Op(writeByte, 1, 0)).len;
    return this;
};

/**
 * Writes raw bytes without a tag or length prefix.
 * @name BufferWriter#raw
 * @function
 * @param {Uint8Array} value Raw bytes
 * @returns {BufferWriter} `this`
 */
BufferWriter.prototype.raw = function write_raw_buffer(value) {
    var len = value.length >>> 0;
    if (len)
        this.len += (this.tail = this.tail.next = new Op(BufferWriter.writeBytesBuffer, len, value)).len;
    return this;
};

function writeStringBuffer(buf, pos) {
    if (buf.utf8Write)
        buf.utf8Write(this.val, pos);
    else if (buf.write)
        buf.write(this.val, pos);
    else /* finishInto(Uint8Array) */
        writeUtf8(this.val, buf, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = util.Buffer.byteLength(value);
    if (len)
        this.uint32(len).len += (this.tail = this.tail.next = new Op(len < 40 ? len === value.length ? writeStringAscii : writeStringUtf8Short : writeStringBuffer, len, value)).len;
    else
        this.len += (this.tail = this.tail.next = new Op(writeByte, 1, 0)).len;
    return this;
};

/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {util.Buffer} Finished buffer
 */

BufferWriter._configure();

export { BufferWriter };
