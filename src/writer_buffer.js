"use strict";
module.exports = BufferWriter;

// extends Writer
var Writer = require("./writer");
BufferWriter.prototype = Object.create(Writer.prototype, {
    constructor: {
        value: BufferWriter,
        writable: true,
        enumerable: false,
        configurable: true
    }
});

var util = require("./util/minimal");

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

var writeStringBuffer;

BufferWriter._configure = function () {
    /**
     * Allocates a buffer of the specified size.
     * @function
     * @param {number} size Buffer size
     * @returns {Buffer} Buffer
     */
    BufferWriter.alloc = util.Buffer && util.Buffer.allocUnsafe;

    writeStringBuffer = util.Buffer && util.Buffer.prototype.utf8Write
        ? function writeStringBuffer_utf8Write(val, buf, pos) {
            return buf.utf8Write(val, pos);
        }
        : function writeStringBuffer_write(val, buf, pos) {
            return buf.write(val, pos);
        };
};


/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util.Buffer.from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len) {
        this._reserve(len);
        this.buf.set(value, this.pos);
        this.pos += len;
    }
    return this;
};

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var n = value.length;
    if (!n) {
        this._reserve(1);
        this.buf[this.pos++] = 0;
        return this;
    }
    if (n < 0x80) {
        this._reserve(n * 3 + 5); // worst case
        var pos = this.pos,
            buf = this.buf;
        return this._delim(pos,
            n < 40
                ? util.utf8.write(value, buf, pos + 1)
                : writeStringBuffer(value, buf, pos + 1)
        );
    }
    if (n <= 0x10000)
        return writeStringOnePass(this, value, n);
    var len = util.Buffer.byteLength(value);
    this.uint32(len);
    this._reserve(len);
    writeStringBuffer(value, this.buf, this.pos);
    this.pos += len;
    return this;
};

// Writes a string of 128 to 65536 chars without measuring it first: writes after a length
// prefix sized for the minimum byte length (n) and moves the bytes if the prefix must grow.
function writeStringOnePass(writer, value, n) {
    var vlen = sizeVarint32(n);
    writer._reserve(n * 3 + 5); // worst case
    var pos = writer.pos,
        buf = writer.buf,
        len = writeStringBuffer(value, buf, pos + vlen),
        lv = sizeVarint32(len);
    if (lv !== vlen)
        buf.copyWithin(pos + lv, pos + vlen, pos + vlen + len);
    writer.uint32(len);
    writer.pos += len;
    return writer;
}

function sizeVarint32(value) {
    return value < 16384     ? 2 // >= 128 here
         : value < 2097152   ? 3
         : value < 268435456 ? 4
         :                     5;
}


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */

BufferWriter._configure();
