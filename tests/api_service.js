var tape = require("tape");

var protobuf = require("..");

var def = {
    methods: {
        Get: {
            type: undefined,
            requestType: "MyRequest",
            requestStream: true,
            responseType: "MyResponse",
            responseStream: true,
            options: {}
        }
    },
    nested: undefined,
    options: undefined
};

tape.test("service", function(test) {

    test.equal(protobuf.Service.testJSON(def), true, "should recognize services as JSON");
    test.equal(protobuf.Method.testJSON(def.methods.Get), true, "should recognize methods as JSON");

    var MyService = protobuf.Service.fromJSON("MyService", def);
    test.same(MyService.toJSON(), def, "should construct from and convert back to JSON");

    test.end();
});