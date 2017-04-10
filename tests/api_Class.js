var tape = require("tape");

var protobuf = require("..");

var proto = "message Something {}";

tape.test("reflected classes", function(test) {

    var root = protobuf.parse(proto).root,
        Something = root.lookup("Something");

    test.throws(function() {
        protobuf.Class("a");
    }, TypeError, "Class should throw if first argument is not a Type");

    test.throws(function() {
        protobuf.Class(Something, "a");
    }, TypeError, "Class should throw if second argument is not a function");

    test.end();
});