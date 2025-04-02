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

    test.test(test.name + " - missing import", function(test) {
        var root = new Root();
        test.plan(2);
        root.load("tests/data/badimport.proto", function(err) {
            test.ok(err, "should return an error when an imported file does not exist");
            test.match(err.toString(), /nonexistent\.proto/, "should mention the file name which was not found");
            test.end();
        });
    });

    test.test(test.name + " - missing import, sync load", function(test) {
        var root = new Root();
        test.plan(2);
        try {
            root.loadSync("tests/data/badimport.proto");
            root.resolveAll();
        } catch (err) {
            test.ok(err, "should return an error when an imported file does not exist");
            test.match(err.toString(), /nonexistent\.proto/, "should mention the file name which was not found");
        }
        test.end();
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


tape.test("feature resolution legacy proto3", function(test) {
    var json = {
        nested: { Message: {
            fields: {
                packed: { type: "int32", id: 2, rule: "repeated" },
                unpacked: { type: "int32", id: 3, rule: "repeated", options: { packed: false } }
            },
            nested: { Nested: { fields: {
                packed: { type: "int32", id: 2, rule: "repeated" },
                unpacked: { type: "int32", id: 3, rule: "repeated", options: { packed: false } }
            } } }
        } }
    };
    var root = protobuf.Root.fromJSON(json);
    var Type = root.lookup("Message");
    var Nested = Type.nested.Nested;

    test.same(root.toJSON(), json, "JSON should roundtrip");

    test.ok(Type.fields.packed.packed, "should have packed encoding by default");
    test.notOk(Type.fields.unpacked.packed, "should override expanded encoding");

    test.ok(Nested.fields.packed.packed, "nested should have packed encoding by default");
    test.notOk(Nested.fields.unpacked.packed, "nested should override expanded encoding");

    test.end();
});

tape.test("feature resolution proto2", function(test) {
    var json = {
        nested: { Message: {
            edition: "proto2",
            fields: {
                packed: { type: "int32", id: 3, rule: "repeated", options: { packed: true } },
                unpacked: { type: "int32", id: 4, rule: "repeated"}
            },
            nested: { Nested: { fields: {
                packed: { type: "int32", id: 2, rule: "repeated", options: { packed: true } },
                unpacked: { type: "int32", id: 3, rule: "repeated" }
            } } }
        } }
    };
    var root = protobuf.Root.fromJSON(json);
    var Type = root.lookup("Message");
    var Nested = Type.nested.Nested;

    test.same(root.toJSON(), json, "JSON should roundtrip");

    test.ok(Type.fields.packed.packed, "should override packed encoding");
    test.notOk(Type.fields.unpacked.packed, "should have expanded encoding by default");

    test.notOk(Nested.fields.unpacked.packed, "nested should have expanded encoding by default");
    test.ok(Nested.fields.packed.packed, "nested should override packed encoding");

    test.end();
});


tape.test("feature resolution edition 2023", function(test) {
    var json = {
        nested: { Message: {
            edition: "2023",
            options: { "features": { "field_presence": "IMPLICIT" } },
            fields: {
                explicit: { type: "string", id: 1, options: { "features": { "field_presence": "EXPLICIT" } } },
                implicit: { type: "string", id: 2 },
            },
            nested: { Nested: { fields: {
                explicit: { type: "string", id: 1, options: { "features": { "field_presence": "EXPLICIT" } } },
                implicit: { type: "string", id: 2 },
            } } }
        } }
    };
    var root = protobuf.Root.fromJSON(json);
    var Type = root.lookup("Message");
    var Nested = Type.nested.Nested;

    test.same(root.toJSON(), json, "JSON should roundtrip");

    test.ok(Type.fields.explicit.hasPresence, "should have explicit presence");
    test.notOk(Type.fields.implicit.hasPresence, "should have implicit presence");

    test.ok(Nested.fields.explicit.hasPresence, "nested should have explicit presence");
    test.notOk(Nested.fields.implicit.hasPresence, "nested should have implicit presence");

    test.end();
});
