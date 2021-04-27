var tape = require("tape");

var protobuf = require("..");

var proto = "syntax = \"proto3\";\
\
message Message {\
    int32 regular_int32 = 1;\
    optional int32 optional_int32 = 2;\
    oneof _oneof_int32 {\
        int32 oneof_int32 = 3;\
    }\
}\
";

tape.test("proto3 optional", function(test) {
    var root = protobuf.parse(proto).root;

    var Message = root.lookup("Message");
    test.equal(Message.fields.optionalInt32.optional, true);
    test.equal(Message.fields.optionalInt32.options.proto3_optional, true);
    test.equal(Message.oneofs._optionalInt32.name, '_optionalInt32');
    test.deepEqual(Message.oneofs._optionalInt32.oneof, ['optionalInt32']);

    test.end();
});
