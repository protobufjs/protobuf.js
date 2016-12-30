var protobuf = require("..");

var writer = protobuf.Writer.create();
var buffer = writer
    .uint32((1 << 3 | 2) >>> 0) // id 1, wireType 2
    .string("hello world!")
    .finish();

var reader = protobuf.Reader.create(buffer);
while (reader.pos < reader.len) {
    var tag = reader.uint32();
    switch (tag>>>3) {
        case 1:
            console.log(reader.string());
            break;
        default:
            reader.skipType(tag&7);
            break;
    }
}