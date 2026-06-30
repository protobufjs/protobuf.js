var tape = require("tape");

var protobuf = require("..");

// A schema-controlled, non-string default value for a bytes field must not
// reach the generated toObject conversion code unescaped. See GHSA-66ff-xgx4-vchm.
tape.test("converter - bytes field default is not emitted as raw code", function(test) {

    var root = protobuf.Root.fromJSON({
        nested: {
            Test: {
                fields: {
                    b: {
                        type: "bytes",
                        id: 1,
                        options: { "default": ["1];test.fail('bytes default executed as code');void[2"] }
                    }
                }
            }
        }
    });

    var Test = root.lookupType("Test");
    var obj = Test.toObject(Test.create(), { defaults: true, bytes: Array });

    test.same(obj.b, ["1];test.fail('bytes default executed as code');void[2"], "should keep the default as data, not execute it");

    test.end();
});
