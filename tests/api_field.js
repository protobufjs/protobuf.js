var tape = require("tape");

var protobuf = require("..");

tape.test("reflected fields", function(test) {

    test.throws(function() {
        new protobuf.Field(1);
    }, TypeError, "should throw if name is not a string");

    test.throws(function() {
        new protobuf.Field("a", 1.5);
    }, TypeError, "should throw if id is not an integer");

    test.throws(function() {
        new protobuf.Field("a", -5);
    }, TypeError, "should throw if id is negative");

    test.throws(function() {
        new protobuf.Field("a", 1, 5);
    }, TypeError, "should throw if type is not a string");

    test.throws(function() {
        new protobuf.Field("a", 1, "uint32", "optiona");
    }, TypeError, "should throw if rule is specified but not a rule string");

    test.throws(function() {
        new protobuf.Field("a", 1, "uint32", "optional", 1);
    }, TypeError, "should throw if extend is specified but not a string");

    test.throws(function() {
        new protobuf.Field("a", 1, "uint32", "optional", "B", true);
    }, TypeError, "should throw if options is specified but not an object");

    test.throws(function() {
        var field = new protobuf.Field("a", 1, "UnDeFiNeD");
        new protobuf.Root().add(new protobuf.Type("A").add(field));
        field.resolve();
    }, Error, "should throw if type cannot be resolved");

    var root = new protobuf.Root(),
        type,
        field = new protobuf.Field("a", 1, "uint32", /* rule */ undefined, /* skipped extend, */ /* options */ {});

    test.same(field.toJSON(), {
        type: "uint32",
        id: 1,
        options: {}
    }, "should export to JSON");

    root.add(
        type = new protobuf.Type("Test").add(
            field = new protobuf.Field("a", 1, "Enm", /* skipped rule and extend, */ { "default": "ONE" })
        )
    ).add(
        new protobuf.Enum("Enm", { "ONE": 1, "TWO": 2 })
    ).resolveAll();

    test.ok(field.resolvedType instanceof protobuf.Enum, "should resolve to an enum");

    test.equal(field.typeDefault, 1, "should recognize enum default values as strings");

    field.resolved = false;
    field.options["default"] = 2;
    field.resolve();

    test.equal(field.typeDefault, 2, "should recognize enum default values as numbers");

    type.add(field = new protobuf.Field("b", 2, "bytes", { default: "dGVzdA=="}));
    field.resolve();

    test.same(Array.prototype.slice.call(field.typeDefault), "test".split("").map(function(c) { return c.charCodeAt(0); }), "should recognize bytes default values as base64 encoded strings");

    field.resolved = false;
    field.options["default"] = "teststr"; // quirk: length not a multiple of 4 if using a subset of base64 chars
    field.resolve();

    test.same(Array.prototype.slice.call(field.typeDefault), "teststr".split("").map(function(c) { return c.charCodeAt(0); }), "should recognize bytes default values as strings");

    field.resolved = 2;
    field.resolve();
    test.equal(field.resolved, 2, "should not resolve again if already resolved");

    test.end();
});