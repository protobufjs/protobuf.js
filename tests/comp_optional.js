var tape = require("tape");

var protobuf = require("..");

var proto = "syntax = \"proto3\";\
\
message Nested {\
}\
\
message Message {\
    int32 regular_int32 = 1;\
    optional int32 optional_int32 = 2;\
    oneof _oneof_int32 {\
        int32 oneof_int32 = 3;\
    }\
    string regular_string = 4;\
    bytes regular_bytes = 5;\
    int64 regular_int64 = 6;\
    bool regular_bool = 7;\
    Nested regular_message = 8;\
}\
";

tape.test("proto3 optional", function(test) {
    var root = protobuf.parse(proto).root;

    var Message = root.lookup("Message");
    test.equal(Message.fields.optionalInt32.optional, true);
    test.equal(Message.fields.optionalInt32.options.proto3_optional, true);
    test.equal(Message.oneofs._optionalInt32.name, '_optionalInt32');
    test.deepEqual(Message.oneofs._optionalInt32.oneof, ['optionalInt32']);

    var m = Message.create({});
    test.strictEqual(m.regularInt32, 0);
    test.strictEqual(m.optionalInt32, null);

    test.end();
});

tape.test("proto3 implicit scalar defaults", function(test) {
    var root = protobuf.parse(proto).root;
    root.resolveAll();

    var Message = root.lookupType("Message");

    function reencode(buf) {
        return Array.prototype.slice.call(Message.encode(Message.decode(buf)).finish());
    }

    test.same(reencode([8, 0]), [], "should omit default int32");
    test.same(reencode([26, 0]), [], "should omit default string");
    test.same(reencode([34, 0]), [], "should omit default bytes");
    test.same(reencode([48, 0]), [], "should omit default int64");
    test.same(reencode([56, 0]), [], "should omit default bool");
    test.same(reencode([16, 0]), [16, 0], "should preserve proto3 optional default");
    test.same(reencode([24, 0]), [24, 0], "should preserve oneof default");
    test.same(reencode([66, 0]), [66, 0], "should preserve empty message");

    test.end();
});
