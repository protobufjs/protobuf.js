var tape = require("tape");

var protobuf = require("..");

var def = {
    fields: {}
};

var def2 = {
    fields: {
        a: {
            type: "uint32",
            id: 1
        }
    },
    oneofs: {
        kind: {
            oneof: ["a"]
        }
    },
    extensions: [[1000, 2000]],
    reserved: [[900, 999], "b"],
    nested: {
        Type: {
            values: { ONE: 1, TWO: 2 }
        },
        Service: {
            methods: {}
        }
    },
    options: {
        custom: true
    }
};

tape.test("reflected types", function(test) {

    var type = protobuf.Type.fromJSON("Test", def);
    test.same(type.toJSON(), def, "should construct from and convert back to JSON");
    type = protobuf.Type.fromJSON("Test", def2);
    test.same(JSON.parse(JSON.stringify(type)), JSON.parse(JSON.stringify(def2)), "should construct from and convert back to JSON (complex parsed)");

    function MyMessageAuto() {}
    type.ctor = MyMessageAuto;
    test.ok(MyMessageAuto.prototype instanceof protobuf.Message, "should properly register a constructor through assignment");
    test.ok(typeof MyMessageAuto.encode === "function", "should populate static methods on assigned constructors");

    function MyMessageManual() {}
    MyMessageManual.prototype = Object.create(protobuf.Message.prototype);
    type.ctor = MyMessageManual;
    test.ok(MyMessageManual.prototype instanceof protobuf.Message, "should properly register a constructor through assignment if already extending message");
    test.ok(typeof MyMessageManual.encode === "function", "should populate static methods on assigned constructors");

    type = protobuf.Type.fromJSON("My", {
        fields: {
            a: {
                type: "string",
                id: 1
            }
        },
        reserved: [[900, 999], "b"],
        nested: {
            Type: { fields: {} },
            Enum: { values: {} },
            Service: { methods: {} },
            extensionField: { type: "string", id: 1000, extend: "Message" },
            Other: { nested: {} }
        }
    });
    test.same(type.toJSON(), {
        fields: {
            a: { id: 1, type: "string" }
        },
        reserved: [[900, 999], "b"],
        nested: {
            Type: { fields: {} },
            Enum: { values: {} },
            Service: { methods: {} },
            extensionField: { extend: "Message", id: 1000, type: "string" },
            Other: { }
        }
    }, "should create from Field, Type, Enum, Service, extension Field and Namespace JSON");

    test.throws(function() {
        type.add(new protobuf.Enum("Enum"));
    }, Error, "should throw when trying to add duplicate names");

    test.throws(function() {
        type.add(new protobuf.Field("c", 1, "uint32"));
    }, Error, "should throw when trying to add duplicate ids");

    test.throws(function() {
        type.add(new protobuf.Field("c", 900, "uint32"));
    }, Error, "should throw when trying to add reserved ids");

    test.throws(function() {
        type.add(new protobuf.Field("b", 2, "uint32"));
    }, Error, "should throw when trying to add reserved names");


    test.end();
});

tape.test("feature resolution legacy proto3", function(test) {
    var json = {
        fields: {
            regular: { type: "string", id: 1 },
            packed: { type: "int32", id: 2, rule: "repeated" },
            unpacked: { type: "int32", id: 3, rule: "repeated", options: { packed: false } }
        },
        nested: { Nested: { fields: {
            regular: { type: "string", id: 1 },
            packed: { type: "int32", id: 2, rule: "repeated" },
            unpacked: { type: "int32", id: 3, rule: "repeated", options: { packed: false } }
        } } }
    };
    var root = new protobuf.Root();
    var Type = protobuf.Type.fromJSON("My", json);
    root.add(Type).resolveAll();

    var Nested = Type.nested.Nested;

    test.same(Type.toJSON(), json, "JSON should roundtrip");
    test.same(Nested.toJSON(), json.nested.Nested, "nested JSON should roundtrip");

    test.equal(Type._edition, "proto3", "should infer proto3 syntax");
    test.notOk(Type.fields.regular.hasPresence, "should have implicit presence by default");
    test.ok(Type.fields.packed.packed, "should have packed encoding by default");
    test.notOk(Type.fields.unpacked.packed, "should override expanded encoding");

    test.equal(Nested._edition, null, "should not infer proto3 syntax");
    test.notOk(Nested.fields.regular.hasPresence, "nested should have implicit presence by default");
    test.ok(Nested.fields.packed.packed, "nested should have packed encoding by default");
    test.notOk(Nested.fields.unpacked.packed, "nested should override expanded encoding");

    test.end();
});

tape.test("feature resolution proto2", function(test) {
    var json = {
        edition: "proto2",
        fields: {
            regular: { type: "string", id: 1 },
            required: { type: "string", id: 2, rule: "required" },
            packed: { type: "int32", id: 3, rule: "repeated", options: { packed: true } },
            unpacked: { type: "int32", id: 4, rule: "repeated"}
        },
        nested: { Nested: { fields: {
            regular: { type: "string", id: 1 },
            packed: { type: "int32", id: 2, rule: "repeated", options: { packed: true } },
            unpacked: { type: "int32", id: 3, rule: "repeated" }
        } } }
    };
    var root = new protobuf.Root();
    var Type = protobuf.Type.fromJSON("My", json);
    root.add(Type).resolveAll();

    var Nested = Type.nested.Nested;

    test.same(Type.toJSON(), json, "JSON should roundtrip");
    test.same(Nested.toJSON(), json.nested.Nested, "nested JSON should roundtrip");

    test.equal(Type._edition, "proto2", "should set edition");
    test.ok(Type.fields.regular.hasPresence, "should have explicit presence by default");
    test.ok(Type.fields.required.required, "should have required fields");
    test.ok(Type.fields.packed.packed, "should override packed encoding");
    test.notOk(Type.fields.unpacked.packed, "should have expanded encoding by default");

    test.equal(Nested._edition, null, "should not set edition");
    test.ok(Nested.fields.regular.hasPresence, "nested should have explicit presence by default");
    test.notOk(Nested.fields.unpacked.packed, "nested should have expanded encoding by default");
    test.ok(Nested.fields.packed.packed, "nested should override packed encoding");

    test.end();
});


tape.test("feature resolution edition 2023", function(test) {
    var json = {
        edition: "2023",
        fields: {
            explicit: { type: "string", id: 1 },
            implicit: { type: "string", id: 2, options: { "features": { "field_presence": "IMPLICIT" } } },
            required: { type: "string", id: 3, rule: "required", options: { "features": { "field_presence": "LEGACY_REQUIRED" } } },
            packed: { type: "int32", id: 4, rule: "repeated" },
            unpacked: { type: "int32", id: 5, rule: "repeated", options: { "features": { "repeated_field_encoding": "EXPANDED" } } }
        },
        nested: { Nested: { fields: {
            explicit: { type: "string", id: 1 },
            implicit: { type: "string", id: 2, options: { "features": { "field_presence": "IMPLICIT" } } },
            packed: { type: "int32", id: 3, rule: "repeated" },
            unpacked: { type: "int32", id: 4, rule: "repeated", options: { "features": { "repeated_field_encoding": "EXPANDED" } } }
        } } }
    };
    var root = new protobuf.Root();
    var Type = protobuf.Type.fromJSON("My", json);
    root.add(Type).resolveAll();

    var Nested = Type.nested.Nested;

    test.same(Type.toJSON(), json, "JSON should roundtrip");
    test.same(Nested.toJSON(), json.nested.Nested, "nested JSON should roundtrip");

    test.equal(Type._edition, "2023", "should set edition");
    test.ok(Type.fields.explicit.hasPresence, "should have explicit presence");
    test.notOk(Type.fields.implicit.hasPresence, "should have implicit presence");
    test.ok(Type.fields.required.required, "should have required presence");
    test.ok(Type.fields.packed.packed, "should have packed encoding");
    test.notOk(Type.fields.unpacked.packed, "should have expanded encoding");

    test.equal(Nested._edition, null, "should not set edition");
    test.ok(Nested.fields.explicit.hasPresence, "nested should have explicit presence");
    test.notOk(Nested.fields.implicit.hasPresence, "nested should have implicit presence");
    test.ok(Nested.fields.packed.packed, "nested should have packed encoding");
    test.notOk(Nested.fields.unpacked.packed, "nested should have expanded encoding");

    test.end();
});
