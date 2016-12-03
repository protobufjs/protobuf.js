var protobuf = require("../src/index"),
    newSuite = require("./suite");

newSuite("float")
.add("Writer#float", function() {
    var writer = new protobuf.Writer();
    writer.float(0.1);
    writer.finish();
})
.add("BufferWriter#float", function() {
    var writer = new protobuf.BufferWriter();
    writer.float(0.1);
    writer.finish();
})
.run();

newSuite("double")
.add("Writer#double", function() {
    var writer = new protobuf.Writer();
    writer.double(0.1);
    writer.finish();
})
.add("BufferWriter#double", function() {
    var writer = new protobuf.BufferWriter();
    writer.double(0.1);
    writer.finish();
})
.run();

var bytes = [0, 0, 0, 0, 0, 0, 0, 0];
var arrayBytes = new Uint8Array(bytes);
var bufferBytes = Buffer.from(bytes);

newSuite("bytes")
.add("Writer#bytes", function() {
    var writer = new protobuf.Writer();
    writer.bytes(arrayBytes);
    writer.finish();
})
.add("BufferWriter#bytes", function() {
    var writer = new protobuf.BufferWriter();
    writer.bytes(bufferBytes);
    writer.finish();
})
.run();
