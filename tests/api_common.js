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
    test.end();
});