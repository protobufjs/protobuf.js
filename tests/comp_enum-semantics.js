var tape = require("tape");

var protobuf = require("..");
var protojson = require("../ext/protojson");
var textformat = require("../ext/textformat");
var statik = require("./data/enum-semantics");

var INT32_MIN = -2147483648;
var INT32_MAX = 2147483647;

function bytes(buffer) {
    return Array.prototype.slice.call(buffer);
}

function object(value) {
    return Object.assign({}, value);
}

function closedPayload() {
    return protobuf.Writer.create()
        .uint32(8).int32(2)
        .uint32(16).int32(0)
        .uint32(16).int32(2)
        .uint32(16).int32(1)
        .uint32(26).fork().int32(0).int32(2).int32(1).ldelim()
        .uint32(34).fork().uint32(10).string("x").uint32(16).int32(2).ldelim()
        .finish();
}

function decodePreserve(Type, payload) {
    var reader = protobuf.Reader.create(payload);
    reader.discardUnknown = false;
    return Type.decode(reader);
}

function implicitClosedPayload(value) {
    return protobuf.Writer.create()
        .uint32(8).int32(value)
        .finish();
}

function runImplicitTypeTests(test, label, ClosedImplicitMessage) {
    var known = ClosedImplicitMessage.decode(implicitClosedPayload(1));
    test.equal(known.singular, 1, label + " decodes implicit closed declared enum numbers");

    var discard = ClosedImplicitMessage.decode(implicitClosedPayload(2));
    test.equal(Object.prototype.hasOwnProperty.call(discard, "singular"), false, label + " drops implicit closed unknown enum numbers");
    test.equal(discard.$unknowns, undefined, label + " discards implicit closed unknown enum numbers by default");

    var preserve = decodePreserve(ClosedImplicitMessage, implicitClosedPayload(2));
    test.equal(Object.prototype.hasOwnProperty.call(preserve, "singular"), false, label + " does not assign preserved implicit closed unknown enum numbers");
    test.same(preserve.$unknowns.map(bytes), [
        [ 8, 2 ]
    ], label + " preserves implicit closed unknown enum numbers as unknown fields");
}

function runTypeTests(test, label, OpenMessage, ClosedMessage) {
    var open = OpenMessage.decode(OpenMessage.encode({
        singular: 2,
        repeated: [ 0, 2, 1 ],
        packed: [ 0, 2, 1 ],
        values: { x: 2 }
    }).finish());

    test.equal(open.singular, 2, label + " preserves open singular unknown enum numbers");
    test.same(open.repeated, [ 0, 2, 1 ], label + " preserves open unpacked repeated unknown enum numbers");
    test.same(open.packed, [ 0, 2, 1 ], label + " preserves open packed repeated unknown enum numbers");
    test.same(object(open.values), { x: 2 }, label + " preserves open map unknown enum numbers");

    test.equal(OpenMessage.verify({ singular: 2 }), null, label + " verifies open unknown enum numbers");
    test.equal(OpenMessage.verify({ singular: INT32_MIN }), null, label + " verifies open int32 minimum");
    test.equal(OpenMessage.verify({ singular: INT32_MAX }), null, label + " verifies open int32 maximum");
    test.equal(OpenMessage.verify({ singular: INT32_MAX + 1 }), "singular: enum value expected", label + " rejects open enum numbers above int32");
    test.equal(OpenMessage.verify({ singular: 1.5 }), "singular: enum value expected", label + " rejects fractional open enum numbers");

    var convertedOpen = OpenMessage.fromObject({
        singular: 2,
        repeated: [ 0, 2, INT32_MAX, INT32_MAX + 1, "ONE", "NOPE" ],
        packed: [ INT32_MIN, INT32_MIN - 1 ],
        values: { keep: 2, drop: INT32_MAX + 1 }
    });
    test.equal(convertedOpen.singular, 2, label + " converts open unknown enum numbers");
    test.same(convertedOpen.repeated, [ 0, 2, INT32_MAX, 1 ], label + " drops invalid open repeated enum values");
    test.same(convertedOpen.packed, [ INT32_MIN ], label + " drops invalid open packed enum values");
    test.same(object(convertedOpen.values), { keep: 2 }, label + " drops invalid open map enum values");

    var convertedClosed = ClosedMessage.fromObject({
        singular: 2,
        repeated: [ 0, 2, 1, "ONE", "NOPE" ],
        packed: [ 0, 2, 1 ],
        values: { keep: 1, drop: 2 }
    });
    test.equal(Object.prototype.hasOwnProperty.call(convertedClosed, "singular"), false, label + " drops closed singular unknown enum numbers");
    test.same(convertedClosed.repeated, [ 0, 1, 1 ], label + " drops closed repeated unknown enum numbers");
    test.same(convertedClosed.packed, [ 0, 1 ], label + " drops closed packed unknown enum numbers");
    test.same(object(convertedClosed.values), { keep: 1 }, label + " drops closed map unknown enum numbers");

    test.equal(ClosedMessage.verify({ singular: 1 }), null, label + " verifies closed declared enum numbers");
    test.equal(ClosedMessage.verify({ singular: 2 }), "singular: enum value expected", label + " rejects closed unknown enum numbers");
    test.equal(ClosedMessage.verify({ singular: INT32_MAX + 1 }), "singular: enum value expected", label + " rejects closed out-of-range enum numbers");

    var closedDiscard = ClosedMessage.decode(closedPayload());
    test.equal(Object.prototype.hasOwnProperty.call(closedDiscard, "singular"), false, label + " does not assign closed singular unknown enum numbers");
    test.same(closedDiscard.repeated, [ 0, 1 ], label + " keeps only known unpacked repeated closed enum numbers");
    test.same(closedDiscard.packed, [ 0, 1 ], label + " keeps only known packed repeated closed enum numbers");
    test.same(object(closedDiscard.values), {}, label + " drops map entries with unknown closed enum values");
    test.equal(closedDiscard.$unknowns, undefined, label + " discards unknown closed enum numbers by default");

    var closedPreserve = decodePreserve(ClosedMessage, closedPayload());
    test.same(closedPreserve.repeated, [ 0, 1 ], label + " preserves known closed repeated values with unknown preservation enabled");
    test.same(closedPreserve.packed, [ 0, 1 ], label + " preserves known closed packed values with unknown preservation enabled");
    test.same(closedPreserve.$unknowns.map(bytes), [
        [ 8, 2 ],
        [ 16, 2 ],
        [ 24, 2 ],
        [ 34, 5, 10, 1, 120, 16, 2 ]
    ], label + " preserves unknown closed enum values as unknown fields");
}

tape.test("open and closed enum semantics", function(test) {
    var root = protobuf.loadSync("tests/data/enum-semantics.proto").resolveAll();
    var OpenMessage = root.lookupType("OpenMessage"),
        ClosedMessage = root.lookupType("ClosedMessage"),
        ClosedImplicitMessage = root.lookupType("ClosedImplicitMessage");

    runTypeTests(test, "reflected", OpenMessage, ClosedMessage);
    runImplicitTypeTests(test, "reflected", ClosedImplicitMessage);
    runTypeTests(test, "static", statik.OpenMessage, statik.ClosedMessage);
    runImplicitTypeTests(test, "static", statik.ClosedImplicitMessage);

    var protoJsonOpen = protojson.fromJson(OpenMessage, {
        singular: 2,
        repeated: [ 2 ],
        packed: [ 2 ],
        values: { x: 2 }
    });
    test.equal(protoJsonOpen.singular, 2, "ProtoJSON preserves open singular unknown enum numbers");
    test.same(protoJsonOpen.repeated, [ 2 ], "ProtoJSON preserves open repeated unknown enum numbers");
    test.same(protoJsonOpen.packed, [ 2 ], "ProtoJSON preserves open packed unknown enum numbers");
    test.same(object(protoJsonOpen.values), { x: 2 }, "ProtoJSON preserves open map unknown enum numbers");
    test.throws(function() {
        protojson.fromJson(OpenMessage, { singular: INT32_MAX + 1 });
    }, /invalid enum number/, "ProtoJSON rejects open out-of-range enum numbers");
    test.throws(function() {
        protojson.fromJson(ClosedMessage, { singular: 2 });
    }, /unknown enum value/, "ProtoJSON rejects closed unknown enum numbers");
    test.throws(function() {
        protojson.fromJson(ClosedMessage, { repeated: [ 2 ] });
    }, /unknown enum value/, "ProtoJSON rejects closed repeated unknown enum numbers");
    test.throws(function() {
        protojson.fromJson(ClosedMessage, { packed: [ 2 ] });
    }, /unknown enum value/, "ProtoJSON rejects closed packed unknown enum numbers");
    test.throws(function() {
        protojson.fromJson(ClosedMessage, { values: { x: 2 } });
    }, /unknown enum value/, "ProtoJSON rejects closed map unknown enum numbers");

    var textOpen = textformat.fromText(OpenMessage, [
        "singular: 2",
        "repeated: 2",
        "packed: 2",
        "values { key: \"x\" value: 2 }"
    ].join("\n"));
    test.equal(textOpen.singular, 2, "Text Format preserves open singular unknown enum numbers");
    test.same(textOpen.repeated, [ 2 ], "Text Format preserves open repeated unknown enum numbers");
    test.same(textOpen.packed, [ 2 ], "Text Format preserves open packed unknown enum numbers");
    test.same(object(textOpen.values), { x: 2 }, "Text Format preserves open map unknown enum numbers");
    test.throws(function() {
        textformat.fromText(OpenMessage, "singular: 2147483648");
    }, /integer value out of range/, "Text Format rejects open out-of-range enum numbers");
    test.throws(function() {
        textformat.fromText(ClosedMessage, "singular: 2");
    }, /enum value expected/, "Text Format rejects closed unknown enum numbers");
    test.throws(function() {
        textformat.fromText(ClosedMessage, "repeated: 2");
    }, /enum value expected/, "Text Format rejects closed repeated unknown enum numbers");
    test.throws(function() {
        textformat.fromText(ClosedMessage, "packed: 2");
    }, /enum value expected/, "Text Format rejects closed packed unknown enum numbers");
    test.throws(function() {
        textformat.fromText(ClosedMessage, "values { key: \"x\" value: 2 }");
    }, /enum value expected/, "Text Format rejects closed map unknown enum numbers");

    test.end();
});
