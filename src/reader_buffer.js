"use strict";
module.exports = BufferReader;

var Reader = require("./reader");
/** @alias BufferReader.prototype */
var BufferReaderPrototype = BufferReader.prototype = Object.create(Reader.prototype);
BufferReaderPrototype.constructor = BufferReader;

var util = require("./util/runtime");

// One time function to initialize BufferReader with the now-known buffer implementation's slice method
var initBufferReader = function() {

    /* istanbul ignore next */
    if (!util.Buffer)
        throw Error("Buffer is not supported");
    
    BufferReaderPrototype._slice = util.Buffer.prototype.slice;
    readStringBuffer = util.Buffer.prototype.utf8Slice // around forever, but not present in browser buffer
        ? readStringBuffer_utf8Slice
        : readStringBuffer_toString;
    initBufferReader = false;
};

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    if (initBufferReader)
        initBufferReader();
    Reader.call(this, buffer);
}

var readStringBuffer;

function readStringBuffer_utf8Slice(buf, start, end) {
    return buf.utf8Slice(start, end); // fastest
}

function readStringBuffer_toString(buf, start, end) {
    return buf.toString("utf8", start, end); // 2nd, again assertions
}

/**
 * @override
 */
BufferReaderPrototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return readStringBuffer(this.buf, this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * @override
 */
BufferReaderPrototype.finish = function finish_buffer(buffer) {
    var remain = this.pos ? this.buf.slice(this.pos) : this.buf;
    this.reset(buffer);
    return remain;
};
