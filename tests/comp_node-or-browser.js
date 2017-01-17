var tape = require("tape");

var protobuf = require("..");

var util = protobuf.util;

if (util.isNode)
    tape.test("under node.js", function(test) {
        test.ok(util.fs && util.fs.readFile, "the fs module should be available");
        test.ok(util.Long && util.Long.isLong, "the long module should be available");
        test.end();
    });
else
    tape.test("in the browser", function(test) {
        test.ok(util.fs === null, "the fs module should not be available");
        test.ok(util.Long && util.Long.isLong, "the long module should be available to test cases");
        test.end();
    });
