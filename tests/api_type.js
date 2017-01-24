var tape = require("tape");

var protobuf = require("..");

var def = {
    fields: {},
    oneofs: undefined,
    extensions: undefined,
    reserved: undefined,
    group: undefined,
    nested: undefined,
    options: undefined,
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
    extensions: [1000, 2000],
    reserved: [999],
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

    function MyMessage() {}

    test.throws(function() {
        type.ctor = MyMessage;
    }, TypeError, "should throw when registering a constructor that doesn't extend Message");
    
    MyMessage.prototype = Object.create(protobuf.Message.prototype);

    test.doesNotThrow(function() {
        type.ctor = MyMessage;
    }, "should not throw when registering a constructor that extends Message");

    type = protobuf.Type.fromJSON("My", {
        fields: {
            a: {
                type: "string",
                id: 1
            }
        },
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
            a: { extend: undefined, id: 1, options: undefined, rule: undefined, type: "string" }
        },
        oneofs: undefined,
        extensions: undefined,
        reserved: undefined,
        group: undefined,
        nested: {
            Type: { extensions: undefined, fields: {}, group: undefined, nested: undefined, oneofs: undefined, options: undefined, reserved: undefined },
            Enum: { options: undefined, values: {} },
            Service: { methods: {}, nested: undefined, options: undefined },
            extensionField: { extend: "Message", id: 1000, options: undefined, rule: undefined, type: "string" },
            Other: { nested: undefined, options: undefined }
        },
        options: undefined
    }, "should create from Field, Type, Enum, Service, extension Field and Namespace JSON");

    test.throws(function() {
        type.add(new protobuf.Enum("Enum"));
    }, Error, "should throw when trying to add duplicate names");

    test.throws(function() {
        type.add(new protobuf.Field("c", 1, "uint32"));
    }, Error, "should throw when trying to add duplicate ids");

    test.end();
});
