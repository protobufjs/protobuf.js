var tape = require("tape");

var protobuf = require("..");

var packedOption = "message Test {\
  repeated uint32 a = 1 [packed = true];\
}";

var unpackedOption = "message Test {\
  repeated uint32 a = 1 [packed = false];\
}";

var packedFeature = "edition = \"2023\";\
message Test {\
  repeated uint32 a = 1 [features.repeated_field_encoding = PACKED];\
}";

var unpackedFeature = "edition = \"2023\";\
message Test {\
  repeated uint32 a = 1 [features.repeated_field_encoding = EXPANDED];\
}";

var regular = "message Test {\
  repeated uint32 a = 1;\
}";

var msg = {
    a: [1,2,3]
};

tape.test("packed repeated values roundtrip", function(test) {
    var root1 = protobuf.parse(packedOption).root.resolveAll(),
        root2 = protobuf.parse(unpackedOption).root.resolveAll();
    var Test1 = root1.lookup("Test"),
        Test2 = root2.lookup("Test");

    var dec1 = Test2.decode(Test1.encode(msg).finish());
    test.same(dec1, msg, "should decode packed even if defined non-packed");
    var dec2 = Test1.decode(Test2.encode(msg).finish());
    test.same(dec2, msg, "should decode non-packed even if defined packed");

    test.end();
});

tape.test("packed repeated values encode", function(top) {
    [
        packedOption,
        `syntax = "proto3";\n` + regular,
        `syntax = "proto3";\n` + packedOption,
        `edition = "2023";\n` + regular,
        packedFeature,
    ].forEach(function(proto, index) {
        tape.test("proto " + index, function(test) {
            var root = protobuf.parse(proto).root.resolveAll();
            var Test = root.lookup("Test");

            var buf = Test.encode(msg).finish();
            test.equal(buf.length, 5, "a total of 4 bytes");
            test.equal(buf[0], 1 << 3 | 2, "id 1, wireType 2");
            test.equal(buf[1], 3, "length 3");
            test.equal(buf[2], 1, "element 1");
            test.equal(buf[3], 2, "element 2");
            test.equal(buf[4], 3, "element 3");

            test.end();
        });
    });

    top.end()
});

tape.test("packed repeated values encode", function(top) {
    [
        unpackedOption,
        regular,
        `syntax = "proto3";\n` + unpackedOption,
        unpackedFeature,
    ].forEach(function(proto, index) {
        tape.test("proto " + index, function(test) {
            var root = protobuf.parse(proto).root.resolveAll();
            var Test = root.lookup("Test");

            var buf = Test.encode(msg).finish();
            test.equal(buf.length, 6, "a total of 6 bytes");
            test.equal(buf[0], 1 << 3 | 0, "id 1, wireType 0");
            test.equal(buf[1], 1, "element 1");
            test.equal(buf[2], 1 << 3 | 0, "id 1, wireType 0");
            test.equal(buf[3], 2, "element 2");
            test.equal(buf[4], 1 << 3 | 0, "id 1, wireType 0");
            test.equal(buf[5], 3, "element 3");

            test.end()
        });
    });

    top.end()
});

tape.test("packed unpackable fields", function(test) {
    var root = protobuf.parse(`message Test {
      repeated Test a = 1 [packed = true];
      repeated Test b = 2 [packed = true, foo = true];
    }`).root.resolveAll();
    var Test = root.lookup("Test");

    test.equal(Test.fields.a.options, undefined, "should have no options")
    test.equal(Test.fields.b.options.packed, undefined, "should have no packed option")
    test.equal(Test.fields.b.options.foo, true, "should retain other option")

    test.end();
});
