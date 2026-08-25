var tape = require("tape");

var protobuf = require("..");

tape.test("decoder respects enclosing message boundaries", function(test) {
    var constructed;
    var Inner = new protobuf.Type("Inner")
        .add(new protobuf.Field("ix", 1, "int32"))
        .add(new protobuf.Field("iy", 2, "int32"))
        .add(new protobuf.Field("iz", 3, "int32"));
    Inner.ctor = function Inner() {
        constructed = this;
    };
    var Mid = new protobuf.Type("Mid")
        .add(new protobuf.Field("inner", 1, "Inner"))
        .add(new protobuf.Field("mx", 2, "int32"))
        .add(new protobuf.Field("my", 3, "int32"))
        .add(Inner);
    var Outer = new protobuf.Type("Outer")
        .add(new protobuf.Field("mid", 1, "Mid"))
        .add(new protobuf.Field("ox", 2, "int32"))
        .add(new protobuf.Field("oy", 3, "int32"))
        .add(Mid);

    test.throws(function() {
        Outer.decode([ 0x0a, 0x08, 0x0a, 0x08, 0x08, 0x07, 0x10, 0x65, 0x18, 0x78, 0x10, 0x64, 0x18, 0x7b ]);
    }, RangeError, "rejects a nested message that consumes its parent's following fields");
    test.notOk(constructed, "rejects the nested length before constructing the message");

    test.throws(function() {
        Outer.decode([ 0x0a, 0x04, 0x0a, 0x02, 0x08, 0x80, 0x10, 0x64 ]);
    }, RangeError, "rejects a scalar value that crosses the nested boundary");
    test.ok(constructed, "constructs a message within a valid declared length");
    test.notOk(Object.hasOwnProperty.call(constructed, "ix"), "does not assign bytes from the parent field");
    test.end();
});

tape.test("decoder respects map-entry boundaries", function(test) {
    var Type = new protobuf.Type("MapMessage")
        .add(new protobuf.MapField("values", 1, "string", "uint32"))
        .add(new protobuf.Field("after", 2, "uint32"))
        .add(new protobuf.Field("tail", 3, "uint32"));

    test.throws(function() {
        Type.decode([ 0x0a, 0x03, 0x0a, 0x02, 0x41, 0x10, 0x18, 0x07 ]);
    }, RangeError, "rejects a map key that consumes the following field");
    test.end();
});

tape.test("decoder respects packed-field boundaries", function(test) {
    var Type = new protobuf.Type("PackedMessage")
        .add(new protobuf.Field("values", 1, "uint32", "repeated", { packed: true }))
        .add(new protobuf.Field("after", 2, "uint32"))
        .add(new protobuf.Field("tail", 3, "uint32"));

    test.throws(function() {
        Type.decode([ 0x0a, 0x01, 0x80, 0x10, 0x18, 0x07 ]);
    }, RangeError, "rejects a packed varint that consumes the following field");
    test.end();
});

tape.test("decoder respects packed closed-enum boundaries", function(test) {
    var Type = protobuf.parse([
        "syntax = \"proto2\";",
        "enum Value { ZERO = 0; }",
        "message ClosedEnumMessage {",
        "  repeated Value values = 1 [packed = true];",
        "  optional uint32 after = 2;",
        "  optional uint32 tail = 3;",
        "}"
    ].join("\n")).root.lookupType("ClosedEnumMessage");

    test.throws(function() {
        Type.decode([ 0x0a, 0x01, 0x80, 0x10, 0x18, 0x07 ]);
    }, RangeError, "rejects a packed enum that consumes the following field");
    test.end();
});
