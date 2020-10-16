var tape = require("tape");

var some_pkg_1 = require("./data/same_package_1").some_pkg;
var some_pkg_2 = require("./data/same_package_2").some_pkg; // adds to $root.some_pkg as a side-effect

tape.test("multiple .protos with the same package", function(test) {
    test.equal(some_pkg_1, some_pkg_2, "should have one instance of a package node when using the default root setting");
    test.ok("MessageA" in some_pkg_1, "should have message from first .proto");
    test.ok("MessageB" in some_pkg_1, "should have message from second .proto");
    test.end();
});
