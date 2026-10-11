var tape = require("tape");
var protobuf = require("..");

tape.test("load resolution errors", function(test) {
    var filename = "tests/data/unresolved-type.proto";

    test.test("callback receives the resolution error", function(test) {
        protobuf.load(filename, function(err, root) {
            test.ok(err instanceof Error, "should report an error");
            if (err)
                test.match(err.message, /no such Type or Enum 'Missing'/, "should preserve the resolution error");
            test.equal(root, undefined, "should not return an unresolved root");
            test.end();
        });
    });

    test.test("promise rejects with the resolution error", function(test) {
        protobuf.load(filename).then(function() {
            test.fail("should not resolve an invalid root");
            test.end();
        }, function(err) {
            test.match(err.message, /no such Type or Enum 'Missing'/, "should reject with the resolution error");
            test.end();
        });
    });

    test.test("synchronous load still throws the resolution error", function(test) {
        test.throws(function() {
            protobuf.loadSync(filename);
        }, /no such Type or Enum 'Missing'/, "should throw synchronously");
        test.end();
    });
});
