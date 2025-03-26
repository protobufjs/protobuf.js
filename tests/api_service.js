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

tape.test("feature resolution legacy proto3", function(test) {
    var json = {
        methods: {
            Method: {
                requestType: "Empty",
                responseType: "Empty",
            }
        },
        nested: {
            Empty: { fields: {} }
        }
    };
    var root = new protobuf.Root();
    var Service = protobuf.Service.fromJSON("Service", json);
    root.add(Service).resolveAll();

    var Method = Service.methods.Method;

    test.same(Service.toJSON(), json, "JSON should roundtrip");
    test.same(Method.toJSON(), json.methods.Method, "method JSON should roundtrip");

    test.equal(Service._edition, "proto3", "should infer proto3 syntax");
    test.equal(Service._features.field_presence, "IMPLICIT", "should have implicit presence by default");

    test.equal(Method._edition, null, "should not infer proto3 syntax");
    test.equal(Method._features.field_presence, "IMPLICIT", "should have implicit presence by default");

    test.end();
});

tape.test("feature resolution proto2", function(test) {
    var json = {
        edition: "proto2",
        methods: {
            Method: {
                requestType: "Empty",
                responseType: "Empty",
            }
        },
        nested: {
            Empty: { fields: {} }
        }
    };
    var root = new protobuf.Root();
    var Service = protobuf.Service.fromJSON("Service", json);
    root.add(Service).resolveAll();

    var Method = Service.methods.Method;

    test.same(Service.toJSON(), json, "JSON should roundtrip");
    test.same(Method.toJSON(), json.methods.Method, "method JSON should roundtrip");

    test.equal(Service._edition, "proto2", "should infer proto2 syntax");
    test.equal(Service._features.field_presence, "EXPLICIT", "should have explicit presence by default");

    test.equal(Method._edition, null, "should not infer proto2 syntax");
    test.equal(Method._features.field_presence, "EXPLICIT", "should have explicit presence by default");

    test.end();
});


tape.test("feature resolution edition 2023", function(test) {
    var json = {
        edition: "2023",
        options: { features: { "(foo)": { "bar": "VALUE" } } },
        methods: {
            Method: {
                requestType: "Empty",
                responseType: "Empty",
            }
        },
        nested: {
            Empty: { fields: {} }
        }
    };
    var root = new protobuf.Root();
    var Service = protobuf.Service.fromJSON("Service", json);
    root.add(Service).resolveAll();

    var Method = Service.methods.Method;
    var Empty = Service.nested.Empty;

    test.same(Service.toJSON(), json, "JSON should roundtrip");
    test.same(Method.toJSON(), json.methods.Method, "method JSON should roundtrip");

    test.equal(Service._edition, "2023", "should set edition");
    test.equal(Service._features.field_presence, "EXPLICIT", "should have explicit presence by default");
    test.equal(Service._features["(foo)"].bar, "VALUE", "should get file features");

    test.equal(Method._edition, null, "should not set edition");
    test.equal(Method._features.field_presence, "EXPLICIT", "should have explicit presence by default");
    test.equal(Method._features["(foo)"].bar, "VALUE", "should get file features");

    test.equal(Empty._edition, null, "should not set edition");
    test.equal(Empty._features.field_presence, "EXPLICIT", "should have explicit presence by default");
    test.equal(Empty._features["(foo)"].bar, "VALUE", "should get file features");

    test.end();
});
