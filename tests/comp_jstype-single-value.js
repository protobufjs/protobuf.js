const tape = require("tape");
const protobuf = require("..");

tape.test("should handle jstype = JS_STRING for int64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        int64 id = 1 [jstype = JS_STRING];
      }`;
    var expectedMessage = {
        id: "111111111111111"
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_STRING for uint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        uint64 id = 1 [jstype = JS_STRING];
      }`;
    var expectedMessage = {
        id: "111111111111111"
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_STRING for sint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        sint64 id = 1 [jstype = JS_STRING];
      }`;
    var expectedMessage = {
        id: "111111111111111"
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_STRING for fixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        fixed64 id = 1 [jstype = JS_STRING];
      }`;
    var expectedMessage = {
        id: "111111111111111"
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_STRING for sfixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        sfixed64 id = 1 [jstype = JS_STRING];
      }`;
    var expectedMessage = {
        id: "111111111111111"
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NUMBER for int64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        int64 id = 1 [jstype = JS_NUMBER];
      }`;
    var expectedMessage = {
        id: 1111111111
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NUMBER for uint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        uint64 id = 1 [jstype = JS_NUMBER];
      }`;
    var expectedMessage = {
        id: 1111111111
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NUMBER for sint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        sint64 id = 1 [jstype = JS_NUMBER];
      }`;
    var expectedMessage = {
        id: 1111111111
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NUMBER for fixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        fixed64 id = 1 [jstype = JS_NUMBER];
      }`;
    var expectedMessage = {
        id: 1111111111
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NUMBER for sfixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        sfixed64 id = 1 [jstype = JS_NUMBER];
      }`;
    var expectedMessage = {
        id: 1111111111
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NORMAL for int64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        int64 id = 1 [jstype = JS_NORMAL];
      }`;
    var expectedMessage = {
        id: protobuf.util.Long.fromNumber(1111111111, false)
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NORMAL for uint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        uint64 id = 1 [jstype = JS_NORMAL];
      }`;
    var expectedMessage = {
        id: protobuf.util.Long.fromNumber(1111111111, true)
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NORMAL for sint64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        sint64 id = 1 [jstype = JS_NORMAL];
      }`;
    var expectedMessage = {
        id: protobuf.util.Long.fromNumber(1111111111, false)
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NORMAL for fixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        fixed64 id = 1 [jstype = JS_NORMAL];
      }`;
    var expectedMessage = {
        id: protobuf.util.Long.fromNumber(1111111111, true)
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});

tape.test("should handle jstype = JS_NORMAL for sfixed64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        sfixed64 id = 1 [jstype = JS_NORMAL];
      }`;
    var expectedMessage = {
        id: protobuf.util.Long.fromNumber(1111111111, false)
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});