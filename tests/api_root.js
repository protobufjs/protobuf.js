var tape = require("tape");

var protobuf = require("..");

var Root = protobuf.Root;

var def = {
    nested: {},
    options: { javaPackage: "com.something" }
};

tape.test("reflected roots", function(test) {

    test.test(test.name + " - construct", function(test) {
        var root = Root.fromJSON(def);
        test.ok(root instanceof Root, "should construct from JSON");
        var root2 = Root.fromJSON(def, root);
        test.equal(root2, root, "should construct from JSON and reuse specified Root");
        test.end();
    });

    if (typeof Promise !== "undefined")
    test.test(test.name + " - promise", function(test) {
        var root = new Root();
        var promise = root.load("tests/data/common.proto");
        test.ok(promise instanceof Promise, "should return a Promise when loading without a callback");
        promise
        .then(function() {
            test.pass("should resolve");
            test.end();
        })
        .catch(function() {
            test.fail("should not reject");
        });
    });

    test.test(test.name + " - json", function(test) {
        var root = new Root();
        test.plan(3);
        root.load("tests/data/common.json", function(err) {
            if (err)
                return test.fail("should not return an error when loading JSON files: " + err.message);
            test.ok(root.lookupType("google.protobuf.Any"), "should load JSON files");
            root.load("tests/data/common.json", function(err) {
                test.same(root.files, [ "tests/data/common.json" ], "should not attempt to load the same file twice");
                test.notOk(err, "should not return an error when loading files twice");
                test.end();
            });
        });
    });

    test.test(test.name + " - weak", function(test) {
        var root = new Root();
        test.plan(1);        
        root.load(["tests/data/weak.proto"], function (err) {
            test.notOk(err, "should ignore missing weak imports");
            test.end();
        });
    });

    test.test(test.name + " - missing", function(test) {
        var root = new Root();
        test.plan(1);
        root.load("tests/data/NOTFOUND", function(err) {
            test.ok(err, "should return an error when trying to load missing protos");
            test.end();
        });
    });

    test.test(test.name + " - skipped", function(test) {
        var root = new Root();
        root.resolvePath = function() {
            return null;
        };
        test.plan(1);
        root.load("tests/data/NOTFOUND2", function(err) {
            test.notOk(err, "should skip files without error when resolvePath returns null");
            test.end();
        });
    });

    test.test(test.name + " - skipped import", function(test) {
        var root = new Root();
        root.resolvePath = function(origin, target) {
            if (/weak\.proto$/.test(target))
                return protobuf.util.path.resolve(origin, target);
            return null;
        };
        test.plan(1);
        root.load("tests/data/weak.proto", function(err) {
            test.notOk(err, "should skip files without error when resolvePath returns null");
            test.end();
        });
    });
});
