var tape = require("tape");

var protobuf = require("..");

tape.test("reflected enums", function(test) {

    var enm = new protobuf.Enum("Test", {
        a: 1,
        b: 2,
    });

    var enm_allow_alias = new protobuf.Enum( 'AliasTest',
    { a: 0 }, { allow_alias: true } );

    test.throws(function() {
        new protobuf.Enum("Test", true);
    }, TypeError, "should throw if values is specified but not an object");

    test.same(enm.valuesById, {
        1: "a",
        2: "b"
    }, "should also expose their values by id");

    test.throws(function() {
        enm.add(2, 2);
    }, TypeError, "should throw if name is not a string");

    test.throws(function() {
        enm.add("c", 1.5);
    }, TypeError, "should throw if id is not an integer");

    test.throws(function() {
        enm.add("b", 2);
    }, Error, "should throw if name is a duplicate");

    test.throws(function() {
        enm.add("c", 2);
    }, Error, "should throw if id is a duplicate, without allow_alias option");

    enm.add("c", 3);
    test.same(enm.values, {
        a: 1,
        b: 2,
        c: 3
    }, "should allow adding new values");
    test.same(enm.valuesById, {
        1: "a",
        2: "b",
        3: "c"
    }, "should also expose any new values by id");

    test.throws(function() {
        enm.remove(1);
    }, TypeError, "should throw if name is not a string");

    test.throws(function() {
        enm.remove("d");
    }, Error, "should throw if name is not present");

    enm.remove("b");
    test.same(enm.values, {
        a: 1,
        c: 3
    }, "should allow removing existing values");
    test.same(enm.valuesById, {
        1: "a",
        3: "c"
    }, "should no longer expose any removed values by id");

    test.same(enm.toJSON(), {
        values: {
            a: 1,
            c: 3
        }
    }, "should export values to JSON");

    enm_allow_alias.add( 'b', 0 );
    test.same( enm_allow_alias.values, {
      a: 0,
      b: 0
    });

    enm.add('e', 4, undefined, {'(test_option)': 'test_value'});
    test.same( enm.valuesOptions, {
        'e': {
            '(test_option)': 'test_value'
        }
    });
    enm.remove("e");
    test.same( enm.valuesOptions, {}, "should clean up value options");

    enm.reserved = [[100,200], "BAD_NAME"];
    test.throws(function() {
        enm.add("d", 101);
    }, Error, "should throw if id is a reserved number");

    test.throws(function() {
        enm.add("BAD_NAME", 5);
    }, Error, "should throw if id is a reserved name");

    test.end();
});

tape.test("feature resolution legacy proto3", function(test) {
    var json = {
        values: {
            a: 0, b: 1
        }
    };
    var messageJson = {
        fields: {},
        nested: { Enum: { values: {
            a: 0, b:1
        } } }
    };
    var root = new protobuf.Root();
    var Enum = protobuf.Enum.fromJSON("Enum", json);
    var Message = protobuf.Type.fromJSON("Message", messageJson)
    var Nested = Message.nested.Enum;
    root.add(Enum).add(Message).resolveAll();

    test.same(Enum.toJSON(), json, "JSON should roundtrip");
    test.same(Message.toJSON(), messageJson, "container JSON should roundtrip");
    test.same(Nested.toJSON(), messageJson.nested.Enum, "nested JSON should roundtrip");

    test.equal(Enum._edition, "proto3", "should infer proto3 syntax");
    test.equal(Enum._features.enum_type, "OPEN", "should be open by default");

    test.equal(Nested._edition, null, "should not set edition");
    test.equal(Nested._features.enum_type, "OPEN", "should be open by default");

    test.end();
});

tape.test("feature resolution proto2", function(test) {
    var json = {
        edition: "proto2",
        values: {
            a: 0, b: 1
        }
    };
    var messageJson = {
        edition: "proto2",
        fields: {},
        nested: { Enum: { values: {
            a: 0, b: 1
        } } }
    };
    var root = new protobuf.Root();
    var Enum = protobuf.Enum.fromJSON("Enum", json);
    var Message = protobuf.Type.fromJSON("Message", messageJson)
    var Nested = Message.nested.Enum;
    root.add(Enum).add(Message).resolveAll();

    test.same(Enum.toJSON(), json, "JSON should roundtrip");
    test.same(Message.toJSON(), messageJson, "container JSON should roundtrip");
    test.same(Nested.toJSON(), messageJson.nested.Enum, "nested JSON should roundtrip");

    test.equal(Enum._edition, "proto2", "should set edition");
    test.equal(Enum._features.enum_type, "CLOSED", "should be closed by default");

    test.equal(Nested._edition, null, "should not set edition");
    test.equal(Nested._features.enum_type, "CLOSED", "should be closed by default");

    test.end();
});

tape.test("feature resolution legacy proto3", function(test) {
    var json = {
        edition: "2023",
        values: {
            a: 0, b: 1
        }
    };
    var messageJson = {
        edition: "2023",
        options: { features: { enum_type: "CLOSED" } },
        fields: {},
        nested: { Enum: { values: {
            a: 0, b: 1
        } } }
    };
    var root = new protobuf.Root();
    var Enum = protobuf.Enum.fromJSON("Enum", json);
    var Message = protobuf.Type.fromJSON("Message", messageJson)
    var Nested = Message.nested.Enum;
    root.add(Enum).add(Message).resolveAll();

    test.same(Enum.toJSON(), json, "JSON should roundtrip");
    test.same(Message.toJSON(), messageJson, "container JSON should roundtrip");
    test.same(Nested.toJSON(), messageJson.nested.Enum, "nested JSON should roundtrip");

    test.equal(Enum._edition, "2023", "should set edition");
    test.equal(Enum._features.enum_type, "OPEN", "should be open by default");

    test.equal(Nested._edition, null, "should not set edition");
    test.equal(Nested._features.enum_type, "CLOSED", "should inherit override");

    test.end();
});
