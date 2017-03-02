// this example demonstrates how to use the reader/writer interface directly to read and write the
// protobuf wire format.

/*eslint-disable strict, no-console*/
var protobuf = require("../runtime"); // require("protobufjs/runtime");

// writing
var buffer = protobuf.Writer.create()
    .uint32((1 << 3 | 2) >>> 0) // id 1, wireType 2
    .string("hello world!")
    .finish();

// reading
var reader = protobuf.Reader.create(buffer);
while (reader.pos < reader.len) {
    var tag = reader.uint32();
    switch (/*id*/ tag >>> 3) {
        case 1:
            console.log(reader.string());
            break;
        default:
            reader.skipType(/*wireType*/ tag & 7);
            break;
    }
}
