var tape = require("tape");

var protobuf = require("..");

var util = protobuf.util;

if (util.isNode)
    tape.test("under node.js", function(test) {
        test.ok(util.isNode, "should detect node.js");
        test.end();
    });
else
    tape.test("in the browser", function(test) {
        test.notOk(util.isNode, "should detect browser");
        test.end();
    });
