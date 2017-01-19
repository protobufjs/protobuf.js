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

    test.ok(protobuf.Type.testJSON(def), "should recognize types as JSON");
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

    test.end();
});
