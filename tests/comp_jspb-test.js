var tape = require("tape");
var protobuf  = require("..");

tape.test("jspb test proto", function(test) {
    var existingRoot = new protobuf.Root();
    protobuf.load("tests/data/test.proto", existingRoot, function(err, root) {
        if (err)
            return test.fail(err.message);

        test.pass("should parse without errors");
        test.equal(root, existingRoot, "should reuse existing root");

        test.doesNotThrow(function() {
            root.resolveAll();
            traverse(root);
        }, "should resolve all types and generate code for them without errors");

        test.end();
    });

});

function traverse(ns) {
    ns.nestedArray.forEach(function(nested) {
        if (nested instanceof protobuf.Type)
            nested.setup();
        if (nested instanceof protobuf.Namespace)
            traverse(nested);
    });
}
