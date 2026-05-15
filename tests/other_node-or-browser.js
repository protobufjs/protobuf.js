var tape = require("tape");

var protobuf = require("..");

var util = protobuf.util;

if (util.isNode)
    tape.test("under node.js", function(test) {
        test.ok(util.isNode, "should detect node.js");
        test.ok(util.Long && util.Long.isLong, "the long module should be available");
        test.end();
    });
else
    tape.test("in the browser", function(test) {
        test.notOk(util.isNode, "should detect browser");
        test.ok(util.Long && util.Long.isLong, "the long module should be available to test cases");
        test.end();
    });
