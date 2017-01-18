var tape = require("tape");

var protobuf = require("../..");

tape.test("load sync", function(test) {
    var root = protobuf.loadSync("tests/data/common.proto");

    test.ok(root.lookup("Something"), "should parse message Something");

    test.throws(function() {
        protobuf.loadSync("tests/data/__NOTFOUND__", root);
    }, Error, "should throw if not found");

    test.end();
});
