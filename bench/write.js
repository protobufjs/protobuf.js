var protobuf = require("../src/index"),
    newSuite = require("./suite");

// This benchmark compares raw data type performance of Uint8Array and Buffer.
// This uses internal finish machinery because overall difference is otherwise mainly caused by allocation.

var array  = new Uint8Array(8);
var buffer = new Buffer(8);

// The following is a possible alternative to float / double writing - where supported. Quite a bit faster.

var f32 = new Float32Array(1);
var i8 = new Uint8Array(f32.buffer);

function writeF32Array(buf, pos, val) {
    f32[0] = val;
    for (var i = 0; i < 4; ++i)
        buf[pos + i] = i8[i];
}

// raw float write speed
newSuite("float")
.add("Writer#float", function() {
    var writer = new protobuf.Writer();
    writer.float(0.1);
    writer._finish(writer.head, array);
})
.add("Writer#writeF32Array", function() {
    var writer = new protobuf.Writer();
    writer.push(writeF32Array, 4, 0.1);
    writer._finish(writer.head, array);
})
.add("BufferWriter#float", function() {
    var writer = new protobuf.BufferWriter();
    writer.float(0.1);
    writer._finish(writer.head, buffer);
})
.add("BufferWriter#writeF32Array", function() {
    var writer = new protobuf.BufferWriter();
    writer.push(writeF32Array, 4, 0.1);
    writer._finish(writer.head, buffer);
})
.run();

// raw double write speed
newSuite("double")
.add("Writer#double", function() {
    var writer = new protobuf.Writer();
    writer.double(0.1);
    writer._finish(writer.head, array);
})
.add("BufferWriter#double", function() {
    var writer = new protobuf.BufferWriter();
    writer.double(0.1);
    writer._finish(writer.head, buffer);
})
.run();

var arrayPlus1 = new Uint8Array(array.length + 1);
var bufferPlus1 = new Buffer(buffer.length + 1);

// raw bytes write speed
// interestingly, Uint8Array#set is faster than Buffer#copy, but only on actual Uint8Arrays.
newSuite("bytes")
.add("Writer#bytes", function() {
    var writer = new protobuf.Writer();
    writer.bytes(array);
    writer._finish(writer.head, arrayPlus1);
})
.add("BufferWriter#bytes", function() {
    var writer = new protobuf.BufferWriter();
    writer.bytes(buffer);
    writer._finish(writer.head, bufferPlus1);
})
.run();
