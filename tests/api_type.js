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
    test.notOk(typeof MyMessageManual.encode === "function", "should not populate static methods on assigned constructors if already extending message");

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
            a: { extend: undefined, id: 1, options: undefined, rule: undefined, type: "string" }
        },
        oneofs: undefined,
        extensions: undefined,
        reserved: [[900, 999], "b"],
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

    test.throws(function() {
        type.add(new protobuf.Field("c", 900, "uint32"));
    }, Error, "should throw when trying to add reserved ids");

    test.throws(function() {
        type.add(new protobuf.Field("b", 2, "uint32"));
    }, Error, "should throw when trying to add reserved names");


    test.end();
});
