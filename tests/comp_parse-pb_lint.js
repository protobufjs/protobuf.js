var tape = require("tape");

var protobuf = require("..");

tape.test("pb lint", function (test) {
    test.plan(1);
    protobuf.load("tests/data/pb-lint.proto", function (err, root) {
        if (err || !root)
            test.fail(err && err.message || "should parse without errors");

        test.pass("should parse without errors");

        test.end();
    });
});
