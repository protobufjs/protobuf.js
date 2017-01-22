var tape = require("tape");

var protobuf = require("..");

var Root = protobuf.Root;

var def = {
    nested: {},
    options: { javaPackage: "com.something" }
};

tape.test("reflected roots", function(test) {

    test.equal(Root.testJSON, protobuf.Namespace.testJSON, "should inherit testJSON via NamespaceBase");

    var root = Root.fromJSON(def);
    test.ok(root instanceof Root, "should construct from JSON");

    var root2 = Root.fromJSON(def, root);
    test.equal(root2, root, "should construct from JSON and reuse specified Root");

    if (typeof Promise !== "undefined")
        test.ok(root.load("tests/data/common.proto") instanceof Promise, "should return a Promise when loading without a callback");

    var count = 0, total = 4;

    root = new Root();
    root.load("tests/data/common.json", function(err, root) {
        if (err)
            return test.fail("should not return an error when loading JSON files: " + err.message);
        test.ok(root.lookupType("google.protobuf.Any"), "should load JSON files");
        if (++count === total)
            test.end();
    });
    root.load("tests/data/common.json", function(err, root) {
        test.same(root.files, [ "tests/data/common.json" ], "should not attempt to load the same file twice");
        test.notOk(err, "should not return an error when loading files twice");
        test.ok(root, "should return itself when loading files twice");
        if (++count === total)
            test.end();
    });

    root = new Root();
    root.load(["tests/data/weak.proto"], function (err, root) {
        test.notOk(err, "should ignore missing weak imports");
        if (++count === total)
            test.end();
    });

    root.load("tests/data/NOTFOUND", function(err, root) {
        test.ok(err, "should return an error when trying to load missing protos");
        if (++count === total)
            test.end();
    });
});