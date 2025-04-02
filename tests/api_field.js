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

tape.test("feature resolution legacy proto3", function(test) {
    var json = {
        type: "string", id: 1000, extend: "Message"
    };
    var messageJson = {
        fields: {
            a: { type: "string", id: 1}
        },
        extensions: [[1, 100000]],    
    };
    var root = new protobuf.Root();
    var ext = protobuf.Field.fromJSON("ext", json);
    var Message = protobuf.Type.fromJSON("Message", messageJson)
    var field = Message.fields.a;
    root.add(ext).add(Message).resolveAll();

    test.same(ext.toJSON(), json, "JSON should roundtrip");
    test.same(Message.toJSON(), messageJson, "container JSON should roundtrip");
    test.same(field.toJSON(), messageJson.fields.a, "nested JSON should roundtrip");

    test.equal(ext._edition, "proto3", "should set edition");
    test.equal(ext._features.utf8_validation, "VERIFY", "should verify by default");
    test.ok(ext.hasPresence, "should have explicit presence");

    test.equal(field._edition, null, "should not set edition");
    test.equal(ext._features.utf8_validation, "VERIFY", "should verify by default");
    test.notOk(field.hasPresence, "should be implicit by default");

    test.end();
});

tape.test("feature resolution proto2", function(test) {
    var json = {
        edition: "proto2",
        type: "string", id: 1000, extend: "Message"
    };
    var messageJson = {
        edition: "proto2",
        fields: {
            a: { type: "string", id: 1}
        },
        extensions: [[1, 100000]],    
    };
    var root = new protobuf.Root();
    var ext = protobuf.Field.fromJSON("ext", json);
    var Message = protobuf.Type.fromJSON("Message", messageJson)
    var field = Message.fields.a;
    root.add(ext).add(Message).resolveAll();

    test.same(ext.toJSON(), json, "JSON should roundtrip");
    test.same(Message.toJSON(), messageJson, "container JSON should roundtrip");
    test.same(field.toJSON(), messageJson.fields.a, "nested JSON should roundtrip");

    test.equal(ext._edition, "proto2", "should set edition");
    test.ok(ext.hasPresence, "should have explicit presence");
    test.equal(ext._features.utf8_validation, "NONE", "should not verify by default");

    test.equal(field._edition, null, "should not set edition");
    test.ok(field.hasPresence, "should be explicit by default");
    test.equal(ext._features.utf8_validation, "NONE", "should not verify by default");

    test.end();
});

tape.test("feature resolution editions", function(test) {
    var json = {
        edition: "2023",
        options: { features: { utf8_validation: "NONE" } },
        type: "string", id: 1000, extend: "Message"
    };
    var messageJson = {
        edition: "2023",
        options: { features: { field_presence: "IMPLICIT" } },
        fields: {
            a: { type: "string", id: 1}
        },
        extensions: [[1, 100000]],    
    };
    var root = new protobuf.Root();
    var ext = protobuf.Field.fromJSON("ext", json);
    var Message = protobuf.Type.fromJSON("Message", messageJson)
    var field = Message.fields.a;
    root.add(ext).add(Message).resolveAll();

    test.same(ext.toJSON(), json, "JSON should roundtrip");
    test.same(Message.toJSON(), messageJson, "container JSON should roundtrip");
    test.same(field.toJSON(), messageJson.fields.a, "nested JSON should roundtrip");

    test.equal(ext._edition, "2023", "should set edition");
    test.ok(ext.hasPresence, "should be explicit by default");
    test.equal(ext._features.utf8_validation, "NONE", "should get file overrides");

    test.equal(field._edition, null, "should not set edition");
    test.notOk(field.hasPresence, "should get message overrides");
    test.equal(field._features.utf8_validation, "VERIFY", "should verify by default");

    test.end();
});
