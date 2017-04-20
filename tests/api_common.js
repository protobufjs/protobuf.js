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