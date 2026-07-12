var tape = require("tape");

var protobuf = require("..");

tape.test("common types", function(test) {

    protobuf.common("google/protobuf/foo.proto", {
        nested: {
            google: {
                nested: {
                    protobuf: {
                        nested: {
                            Foo: {
                                fields: {}
                            }
                        }
                    }
                }
            }
        }
    });

    test.ok(protobuf.common["google/protobuf/foo.proto"], "should expose custom definitions");
    test.same(protobuf.common.get("google/protobuf/any.proto"), protobuf.common["google/protobuf/any.proto"], "should also get() any definition");
    test.equal(protobuf.common.get("google/protobuf/doesntexist.proto"), null, "should return null from get() if there is no such definition");
    test.end();
});

tape.test("common types preserve proto field names", function(test) {

    var root = new protobuf.Root().loadSync("google/protobuf/struct.proto", { keepCase: true });
    var Value = root.lookupType("google.protobuf.Value");

    test.ok(Value.fields.numberValue, "should preserve the existing runtime field name");
    test.notOk(Value.fields.number_value, "should not change runtime field names with keepCase");
    test.equal(Value.fields.numberValue.protoName, "number_value", "should expose the original proto field name");
    test.equal(Value.fields.numberValue.jsonName, "numberValue", "should expose the derived JSON field name");

    test.end();
});
