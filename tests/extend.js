var tape = require("tape");

var protobuf  = require("..");

tape.test("extensions", function(test) {

    protobuf.load("tests/data/extend.proto", function(err, root) {
        if (err)
            return test.fail(err.message);
        root.resolveAll();
        test.pass("should parse and resolve without errors");
        test.end();
    });

});