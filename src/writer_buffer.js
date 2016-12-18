"use strict";
module.exports = BufferWriter;

var Writer = require("./writer");
/** @alias BufferWriter.prototype */
var BufferWriterPrototype = BufferWriter.prototype = Object.create(Writer.prototype);
BufferWriterPrototype.constructor = BufferWriter;

var util = require("./util/runtime");

var utf8   = util.utf8,
    Buffer = util.Buffer;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
BufferWriter.alloc = function alloc_buffer(size) {
    return (BufferWriter.alloc = Buffer.allocUnsafe
        ? Buffer.allocUnsafe
        : function allocUnsafe_new(size) {
            return new Buffer(size);
        })(size);
};

var writeBytesBuffer = Buffer && Buffer.from && Buffer.prototype.set.name !== "deprecated"
    ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node > 0.12)
    }
    : function writeBytesBuffer_copy(val, buf, pos) {
        val.copy(buf, pos, 0, val.length);
    };

var Buffer_from = Buffer && Buffer.from || function(value, encoding) { return new Buffer(value, encoding); };

/**
 * @override
 */
BufferWriterPrototype.bytes = function write_bytes_buffer(value) {
    if (typeof value === "string")
        value = Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this.push(writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        utf8.write(val, buf, pos);
    else
        buf.utf8Write(val, pos);
}

/**
 * @override
 */
BufferWriterPrototype.string = function write_string_buffer(value) {
    var len = Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this.push(writeStringBuffer, len, value);
    return this;
};
