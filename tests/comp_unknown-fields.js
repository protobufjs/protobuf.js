"use strict";

var tape = require("tape");

var protobuf = require("..");

var proto = "syntax = \"proto3\";\n"
    + "message SimpleV1 {\n"
    + "  int32 known = 1;\n"
    + "}\n"
    + "message SimpleV2 {\n"
    + "  int32 known = 1;\n"
    + "  bool future_bool = 2;\n"
    + "  string future_string = 3;\n"
    + "}\n";

tape.test("unknown fields - preserve through decode and encode", function(test) {
    var root = protobuf.parse(proto).root,
        SimpleV1 = root.lookupType("SimpleV1"),
        SimpleV2 = root.lookupType("SimpleV2");

    var original = {
        known: 1,
        futureBool: true,
        futureString: "hello"
    };
    var decoded = SimpleV1.decode(SimpleV2.encode(original).finish());

    test.equal(decoded.known, 1, "should decode known fields");
    test.deepEqual(Object.keys(decoded), [ "known" ], "should keep unknown fields non-enumerable");
    test.equal(decoded.$unknowns.length, 2, "should store unknown fields");

    var restored = SimpleV2.decode(SimpleV1.encode(decoded).finish());
    test.equal(restored.known, original.known, "should preserve known fields");
    test.equal(restored.futureBool, original.futureBool, "should preserve unknown bool field");
    test.equal(restored.futureString, original.futureString, "should preserve unknown string field");
    test.end();
});

tape.test("unknown fields - preserve unknown field order", function(test) {
    var root = protobuf.parse(proto).root,
        SimpleV1 = root.lookupType("SimpleV1");

    var original = protobuf.Writer.create()
        .uint32(26).string("abc")
        .uint32(16).bool(true)
        .uint32(26).string("def")
        .finish();
    var decoded = SimpleV1.decode(original);

    test.deepEqual(SimpleV1.encode(decoded).finish(), original, "should preserve relative unknown field order");
    test.end();
});

tape.test("unknown fields - can be discarded", function(test) {
    var root = protobuf.parse(proto).root,
        SimpleV1 = root.lookupType("SimpleV1"),
        SimpleV2 = root.lookupType("SimpleV2");

    var decoded = SimpleV1.decode(SimpleV2.encode({
        known: 1,
        futureBool: true,
        futureString: "hello"
    }).finish());

    delete decoded.$unknowns;

    var restored = SimpleV2.decode(SimpleV1.encode(decoded).finish());
    test.equal(restored.known, 1, "should preserve known fields");
    test.equal(Object.hasOwnProperty.call(restored, "futureBool"), false, "should discard unknown bool field");
    test.equal(Object.hasOwnProperty.call(restored, "futureString"), false, "should discard unknown string field");
    test.end();
});

tape.test("unknown fields - only encode own unknown fields", function(test) {
    var root = protobuf.parse(proto).root,
        SimpleV1 = root.lookupType("SimpleV1"),
        SimpleV2 = root.lookupType("SimpleV2");

    var unknownBool = SimpleV2.encode({ futureBool: true }).finish();
    var message = Object.create({ $unknowns: [ unknownBool ] });
    message.known = 1;

    var restored = SimpleV2.decode(SimpleV1.encode(message).finish());
    test.equal(restored.known, 1, "should preserve known fields");
    test.equal(Object.hasOwnProperty.call(restored, "futureBool"), false, "should ignore inherited unknown fields");

    message.$unknowns = [ unknownBool ];
    restored = SimpleV2.decode(SimpleV1.encode(message).finish());
    test.equal(restored.futureBool, true, "should encode own unknown fields");
    test.end();
});

tape.test("unknown fields - ignore nullish own unknown fields", function(test) {
    var root = protobuf.parse(proto).root,
        SimpleV1 = root.lookupType("SimpleV1"),
        SimpleV2 = root.lookupType("SimpleV2");

    var message = { known: 1, $unknowns: null };
    var restored = SimpleV2.decode(SimpleV1.encode(message).finish());
    test.equal(restored.known, 1, "should encode with null unknown fields");
    test.equal(Object.hasOwnProperty.call(restored, "futureBool"), false, "should ignore null unknown fields");

    message.$unknowns = undefined;
    restored = SimpleV2.decode(SimpleV1.encode(message).finish());
    test.equal(restored.known, 1, "should encode with undefined unknown fields");
    test.equal(Object.hasOwnProperty.call(restored, "futureBool"), false, "should ignore undefined unknown fields");
    test.end();
});
