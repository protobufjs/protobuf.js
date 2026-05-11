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

tape.test("invalid lookup", async function(test) {
    try {
        await protobuf.load("tests/data/invalid-lookup.proto");
        test.fail("should have thrown");
    } catch(err) {
        test.match(err.message, /illegal token 'required'/, "failed to parse");
    }
});

tape.test("parser nesting", function(test) {
    function nestedMessages(depth) {
        var source = "";
        for (var i = 0; i < depth; ++i)
            source += "message M" + i + " {";
        for (i = 0; i < depth; ++i)
            source += "}";
        return source;
    }

    function nestedGroups(depth) {
        var source = "syntax = \"proto2\"; message Root {";
        for (var i = 0; i < depth; ++i)
            source += "optional group Group" + i + " = " + (i + 1) + " {";
        for (i = 0; i < depth; ++i)
            source += "}";
        return source + "}";
    }

    function nestedOptionValue(depth) {
        var source = "message M { option foo = {";
        for (var i = 0; i < depth; ++i)
            source += "a {";
        for (i = 0; i < depth; ++i)
            source += "}";
        return source + "}; }";
    }

    var recursionLimit = protobuf.util.recursionLimit;
    protobuf.util.recursionLimit = 3;
    try {
        test.doesNotThrow(function() {
            protobuf.parse(nestedMessages(3));
        }, "should parse message nesting up to the recursion limit");
        test.throws(function() {
            protobuf.parse(nestedMessages(4));
        }, /max depth exceeded/, "should reject excessively nested messages");
        test.doesNotThrow(function() {
            protobuf.parse(nestedGroups(2));
        }, "should parse group nesting up to the recursion limit");
        test.throws(function() {
            protobuf.parse(nestedGroups(3));
        }, /max depth exceeded/, "should reject excessively nested groups");
        test.doesNotThrow(function() {
            protobuf.parse(nestedOptionValue(3));
        }, "should parse aggregate option nesting up to the recursion limit");
        test.throws(function() {
            protobuf.parse(nestedOptionValue(4));
        }, /max depth exceeded/, "should reject excessively nested aggregate options");
    } finally {
        protobuf.util.recursionLimit = recursionLimit;
    }

    test.end();
});

