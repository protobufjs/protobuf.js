var tape = require("tape");

var protobuf = require("..");

tape.test("uncommon statements", function(test) {
    test.plan(3);
    protobuf.load("tests/data/uncommon.proto", function(err, root) {
        if (err || !root)
            test.fail(err && err.message || "should parse without errors");
        new protobuf.Root().load("tests/data/uncommon.proto", { keepCase: true }, function(err, root) {
            if (err || !root) {
                test.fail(err && err.message || "should parse without errors");
                return;
            }
            test.pass("should parse without errors");
            test.doesNotThrow(function() {
                root.resolveAll();
            }, "should resolve without errors");
            test.doesNotThrow(function() {
                traverseTypes(root, function(type) {
                    type.setup();
                });
            }, "should setup all types without errors");
            test.end();
        });
    });
});

function traverseTypes(current, fn) {
    if (current instanceof protobuf.Type) // and/or protobuf.Enum, protobuf.Service etc.
        fn(current);
    if (current.nestedArray)
        current.nestedArray.forEach(function(nested) {
            traverseTypes(nested, fn);
        });
}
