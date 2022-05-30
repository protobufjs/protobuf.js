const tape = require("tape");
const protobuf = require("..");

tape.test("should handle jstype = JS_STRING for repeated int64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated int64 ids = 1 [jstype = JS_STRING];
      }`;
    var expectedMessage = {
        ids: ["111111111111111", "222222222222222"]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_STRING for repeated uint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated uint64 ids = 1 [jstype = JS_STRING];
      }`;
    var expectedMessage = {
        ids: ["111111111111111", "222222222222222"]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_STRING for repeated sint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated sint64 ids = 1 [jstype = JS_STRING];
      }`;
    var expectedMessage = {
        ids: ["111111111111111", "222222222222222"]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_STRING for repeated fixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated fixed64 ids = 1 [jstype = JS_STRING];
      }`;
    var expectedMessage = {
        ids: ["111111111111111", "222222222222222"]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_STRING for repeated sfixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated sfixed64 ids = 1 [jstype = JS_STRING];
      }`;
    var expectedMessage = {
        ids: ["111111111111111", "222222222222222"]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NUMBER for repeated int64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated int64 ids = 1 [jstype = JS_NUMBER];
      }`;
    var expectedMessage = {
        ids: [11111111, 222222222]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NUMBER for repeated uint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated uint64 ids = 1 [jstype = JS_NUMBER];
      }`;
    var expectedMessage = {
        ids: [11111111, 222222222]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NUMBER for repeated sint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated sint64 ids = 1 [jstype = JS_NUMBER];
      }`;
    var expectedMessage = {
        ids: [11111111, 222222222]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NUMBER for repeated fixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated fixed64 ids = 1 [jstype = JS_NUMBER];
      }`;
    var expectedMessage = {
        ids: [11111111, 222222222]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NUMBER for repeated sfixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated sfixed64 ids = 1 [jstype = JS_NUMBER];
      }`;
    var expectedMessage = {
        ids: [11111111, 222222222]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NORMAL for repeated int64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated int64 ids = 1 [jstype = JS_NORMAL];
      }`;
    var expectedMessage = {
        ids: [protobuf.util.Long.fromNumber(11111111, false), protobuf.util.Long.fromNumber(222222222, false)]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NORMAL for repeated uint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated uint64 ids = 1 [jstype = JS_NORMAL];
      }`;
    var expectedMessage = {
        ids: [protobuf.util.Long.fromNumber(11111111, true), protobuf.util.Long.fromNumber(222222222, true)]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NORMAL for repeated sint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated sint64 ids = 1 [jstype = JS_NORMAL];
      }`;
    var expectedMessage = {
        ids: [protobuf.util.Long.fromNumber(11111111, false), protobuf.util.Long.fromNumber(222222222, false)]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NORMAL for repeated fixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated fixed64 ids = 1 [jstype = JS_NORMAL];
      }`;
    var expectedMessage = {
        ids: [protobuf.util.Long.fromNumber(11111111, true), protobuf.util.Long.fromNumber(222222222, true)]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NORMAL for repeated sfixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        repeated sfixed64 ids = 1 [jstype = JS_NORMAL];
      }`;
    var expectedMessage = {
        ids: [protobuf.util.Long.fromNumber(11111111, false), protobuf.util.Long.fromNumber(222222222, false)]
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});