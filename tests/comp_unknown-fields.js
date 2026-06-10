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

function decodePreserving(type, buffer) {
    var reader = protobuf.Reader.create(buffer);
    reader.preserveUnknown = true;
    return type.decode(reader);
}

tape.test("unknown fields - discard by default", function(test) {
    var root = protobuf.parse(proto).root,
        SimpleV1 = root.lookupType("SimpleV1"),
        SimpleV2 = root.lookupType("SimpleV2");

    var decoded = SimpleV1.decode(SimpleV2.encode({
        known: 1,
        futureBool: true,
        futureString: "hello"
    }).finish());

    test.equal(decoded.known, 1, "should decode known fields");
    test.equal(Object.hasOwnProperty.call(decoded, "$unknowns"), false, "should not retain unknown fields");

    var restored = SimpleV2.decode(SimpleV1.encode(decoded).finish());
    test.equal(restored.known, 1, "should preserve known fields");
    test.equal(Object.hasOwnProperty.call(restored, "futureBool"), false, "should discard unknown bool field");
    test.equal(Object.hasOwnProperty.call(restored, "futureString"), false, "should discard unknown string field");
    test.end();
});

tape.test("unknown fields - preserve through decode and encode", function(test) {
    var root = protobuf.parse(proto).root,
        SimpleV1 = root.lookupType("SimpleV1"),
        SimpleV2 = root.lookupType("SimpleV2");

    var original = {
        known: 1,
        futureBool: true,
        futureString: "hello"
    };
    var decoded = decodePreserving(SimpleV1, SimpleV2.encode(original).finish());

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
    var decoded = decodePreserving(SimpleV1, original);

    test.deepEqual(SimpleV1.encode(decoded).finish(), original, "should preserve relative unknown field order");
    test.end();
});

tape.test("unknown fields - can be discarded", function(test) {
    var root = protobuf.parse(proto).root,
        SimpleV1 = root.lookupType("SimpleV1"),
        SimpleV2 = root.lookupType("SimpleV2");

    var decoded = decodePreserving(SimpleV1, SimpleV2.encode({
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

tape.test("unknown fields - reader preserveUnknown option", function(test) {
    var root = protobuf.parse(proto).root,
        SimpleV1 = root.lookupType("SimpleV1"),
        SimpleV2 = root.lookupType("SimpleV2"),
        encoded = SimpleV2.encode({
            known: 1,
            futureBool: true,
            futureString: "hello"
        }).finish(),
        reader = protobuf.Reader.create(encoded);

    reader.preserveUnknown = false;
    var decoded = SimpleV1.decode(reader);

    test.equal(decoded.known, 1, "should decode known fields");
    test.equal(Object.hasOwnProperty.call(decoded, "$unknowns"), false, "should not retain unknown fields");

    var restored = SimpleV2.decode(SimpleV1.encode(decoded).finish());
    test.equal(restored.known, 1, "should preserve known fields");
    test.equal(Object.hasOwnProperty.call(restored, "futureBool"), false, "should discard unknown bool field");
    test.equal(Object.hasOwnProperty.call(restored, "futureString"), false, "should discard unknown string field");
    test.end();
});

tape.test("unknown fields - reader discardUnknown compatibility option", function(test) {
    var reader = protobuf.Reader.create([]);
    reader.discardUnknown = false;
    test.equal(reader.preserveUnknown, true, "should invert discardUnknown on reader instances");
    reader.discardUnknown = true;
    test.equal(reader.preserveUnknown, false, "should keep discardUnknown compatibility setter");
    test.end();
});

tape.test("unknown fields - reader preserveUnknown option propagates to nested messages", function(test) {
    var nestedProto = "syntax = \"proto3\";\n"
        + "message InnerV1 {\n"
        + "  int32 known = 1;\n"
        + "}\n"
        + "message InnerV2 {\n"
        + "  int32 known = 1;\n"
        + "  string future = 2;\n"
        + "}\n"
        + "message OuterV1 {\n"
        + "  InnerV1 inner = 1;\n"
        + "}\n"
        + "message OuterV2 {\n"
        + "  InnerV2 inner = 1;\n"
        + "  string future = 2;\n"
        + "}\n",
        root = protobuf.parse(nestedProto).root,
        OuterV1 = root.lookupType("OuterV1"),
        OuterV2 = root.lookupType("OuterV2"),
        encoded = OuterV2.encode({
            inner: {
                known: 1,
                future: "nested"
            },
            future: "outer"
        }).finish(),
        reader = protobuf.Reader.create(encoded);

    reader.preserveUnknown = false;
    var decoded = OuterV1.decode(reader);

    test.equal(decoded.inner.known, 1, "should decode known nested fields");
    test.equal(Object.hasOwnProperty.call(decoded, "$unknowns"), false, "should not retain outer unknown fields");
    test.equal(Object.hasOwnProperty.call(decoded.inner, "$unknowns"), false, "should not retain nested unknown fields");
    test.end();
});

tape.test("unknown fields - reader preserveUnknown option applies to decodeDelimited", function(test) {
    var root = protobuf.parse(proto).root,
        SimpleV1 = root.lookupType("SimpleV1"),
        SimpleV2 = root.lookupType("SimpleV2"),
        encoded = SimpleV2.encodeDelimited({
            known: 1,
            futureBool: true
        }).finish(),
        reader = protobuf.Reader.create(encoded);

    reader.preserveUnknown = false;
    var decoded = SimpleV1.decodeDelimited(reader);

    test.equal(decoded.known, 1, "should decode known fields");
    test.equal(Object.hasOwnProperty.call(decoded, "$unknowns"), false, "should not retain unknown fields");
    test.end();
});

tape.test("unknown fields - Reader.preserveUnknown default", function(test) {
    var root = protobuf.parse(proto).root,
        SimpleV1 = root.lookupType("SimpleV1"),
        SimpleV2 = root.lookupType("SimpleV2"),
        preserveUnknown = protobuf.Reader.preserveUnknown,
        encoded = SimpleV2.encode({
            known: 1,
            futureBool: true
        }).finish();

    try {
        protobuf.Reader.preserveUnknown = true;

        var decoded = SimpleV1.decode(encoded);
        test.equal(decoded.known, 1, "should decode known fields");
        test.equal(decoded.$unknowns.length, 1, "should use the reader default");

        protobuf.Reader.discardUnknown = true;
        test.equal(protobuf.Reader.preserveUnknown, false, "should invert discardUnknown on Reader");
    } finally {
        protobuf.Reader.preserveUnknown = preserveUnknown;
    }
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
