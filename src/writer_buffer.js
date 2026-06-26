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
    var len = util.Buffer.byteLength(value);
    this.uint32(len);
    this._reserve(len);
    writeStringBuffer(value, this.buf, this.pos);
    this.pos += len;
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */

BufferWriter._configure();
