var tape = require("tape");

var protobuf = require("..");

tape.test("codegen", function(test) {
    test.equal(protobuf.util.codegen.supported, true, "should be supported");
    test.end();
});
