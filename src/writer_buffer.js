"use strict";
module.exports = BufferWriter;

var Writer = require("./writer");
/** @alias BufferWriter.prototype */
var BufferWriterPrototype = BufferWriter.prototype = Object.create(Writer.prototype);
BufferWriterPrototype.constructor = BufferWriter;

var util = require("./util/runtime");

var utf8 = util.utf8;

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
    BufferWriter.alloc = util.Buffer.allocUnsafe
        ? util.Buffer.allocUnsafe
        : function allocUnsafeNew(size) { return new util.Buffer(size); };
    return BufferWriter.alloc(size);
};

function writeBytesBuffer(val, buf, pos) {
    val.copy(buf, pos, 0, val.length);
}

var Buffer_from = util.Buffer && util.Buffer.from || function(value, encoding) { return new util.Buffer(value, encoding); };

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

var writeStringBuffer = (function() { // eslint-disable-line wrap-iife
    return util.Buffer && util.Buffer.prototype.utf8Write // around forever, but not present in browser buffer
        ? function writeString_buffer_utf8Write(val, buf, pos) {
            if (val.length < 40)
                utf8.write(val, buf, pos);
            else
                buf.utf8Write(val, pos);
        }
        : function writeString_buffer_write(val, buf, pos) {
            if (val.length < 40)
                utf8.write(val, buf, pos);
            else
                buf.write(val, pos);
        };
    // Note that the plain JS encoder is faster for short strings, probably because of redundant assertions.
    // For a raw utf8Write, the breaking point is about 20 characters, for write it is around 40 characters.
    // Unfortunately, this does not translate 1:1 to real use cases, hence the common "good enough" limit of 40.
})();

/**
 * @override
 */
BufferWriterPrototype.string = function write_string_buffer(value) {
    var len = value.length < 40
        ? utf8.length(value)
        : util.Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this.push(writeStringBuffer, len, value);
    return this;
};
