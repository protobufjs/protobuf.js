var tape = require("tape");

var protobuf = require("..");

var def = {
    methods: {},
    nested: {
        SomeEnum: {
            values: {}
        }
    }
};

var methodDef = {
    requestType: "MyRequest",
    requestStream: true,
    responseType: "MyResponse",
    responseStream: true,
    options: {}
};

tape.test("reflected services", function(test) {

    var MyService = protobuf.Service.fromJSON("MyService", def);
    test.same(MyService.toJSON(), def, "should construct without methods from and convert back to JSON");

    var MyMethod = protobuf.Method.fromJSON("MyMethod", methodDef);
    test.same(MyMethod.toJSON(), methodDef, "should constructos methods from and convert back to JSON");

    MyService.add(MyMethod);
    test.ok(MyService.get("MyMethod"), "should allow adding methods");
    var other = new protobuf.Enum("Other", {});
    MyService.add(other);
    test.ok(MyService.get("Other"), "should allow adding other nested objects");
    MyService.remove(other);
    test.notOk(MyService.get("Other"), "should allow removing other nested objects");
    MyService.remove(MyMethod);
    test.notOk(MyService.get("Other"), "should allow removing methods");
    test.same(MyService.toJSON(), def, "should convert to initial JSON afterwards");

    def.methods.MyMethod = methodDef;
    MyService = protobuf.Service.fromJSON("MyService", def);
    test.same(MyService.toJSON(), def, "should construct with methods from and convert back to JSON");
    MyMethod = MyService.get("MyMethod");

    test.end();
});