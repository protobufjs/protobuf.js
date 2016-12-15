var protobuf = require("..");

var writer = protobuf.Writer.create();
var buffer = writer
    .int32(1 << 3 | 2) // id 1, wireType 2
    .string("hello world!")
    .finish();

var reader = protobuf.Reader.create(buffer);
while (reader.pos < reader.len) {
    var tag = reader.int32();
    switch (tag>>>3) {
        case 1:
            console.log(reader.string());
            break;
        default:
            reader.skipType(tag&7);
            break;
    }
}