var tape = require("tape");

var protobuf = require("..");

tape.test("ambiguous names", function(test) {
    protobuf.load("tests/data/ambiguous-names.proto", function(err, root) {
        if (err)
            return test.fail(err.message);

        test.pass("should parse without errors");
        test.end();
    });
});
