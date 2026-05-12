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

    function nestedExportMessages(depth) {
        var source = "edition = \"2024\";";
        for (var i = 0; i < depth; ++i)
            source += "export message M" + i + " {";
        for (i = 0; i < depth; ++i)
            source += "}";
        return source;
    }

    function nestedOptionValue(depth) {
        var source = "message M { option foo = {";
        for (var i = 0; i < depth; ++i)
            source += "a {";
        for (i = 0; i < depth; ++i)
            source += "}";
        return source + "}; }";
    }

    function dottedOptionPath(depth) {
        var source = "syntax = \"proto2\"; message M { optional int32 a = 1 [(.foo)";
        for (var i = 0; i < depth; ++i)
            source += ".a";
        return source + " = 1]; }";
    }

    function packagePath(depth) {
        var source = "syntax = \"proto3\"; package a";
        for (var i = 1; i < depth; ++i)
            source += ".a";
        return source + ";";
    }

    var recursionLimit = protobuf.util.recursionLimit,
        nestingLimit = protobuf.util.nestingLimit;
    try {
        protobuf.util.recursionLimit = 100;
        protobuf.util.nestingLimit = 3;
        test.doesNotThrow(function() {
            protobuf.parse(nestedMessages(3));
        }, "should parse message nesting up to the nesting limit");
        test.throws(function() {
            protobuf.parse(nestedMessages(4));
        }, /max depth exceeded/, "should reject excessively nested messages");
        protobuf.util.recursionLimit = 1;
        test.doesNotThrow(function() {
            protobuf.parse(nestedMessages(3));
        }, "should not apply recursion limit to message declarations");
        protobuf.util.recursionLimit = 100;
        test.doesNotThrow(function() {
            protobuf.parse(nestedGroups(2));
        }, "should parse group nesting up to the nesting limit");
        test.throws(function() {
            protobuf.parse(nestedGroups(3));
        }, /max depth exceeded/, "should reject excessively nested groups");
        test.doesNotThrow(function() {
            protobuf.parse(nestedExportMessages(3));
        }, "should parse exported message nesting up to the nesting limit");
        test.throws(function() {
            protobuf.parse(nestedExportMessages(4));
        }, /max depth exceeded/, "should reject excessively nested exported messages");

        protobuf.util.recursionLimit = 3;
        protobuf.util.nestingLimit = 100;
        test.doesNotThrow(function() {
            protobuf.parse(nestedOptionValue(3));
        }, "should parse aggregate option nesting up to the recursion limit");
        test.throws(function() {
            protobuf.parse(nestedOptionValue(4));
        }, /max depth exceeded/, "should reject excessively nested aggregate options");
        test.doesNotThrow(function() {
            protobuf.parse(dottedOptionPath(3));
        }, "should parse dotted option paths up to the recursion limit");
        test.throws(function() {
            protobuf.parse(dottedOptionPath(4));
        }, /max depth exceeded/, "should reject excessively nested dotted option paths");
        test.doesNotThrow(function() {
            protobuf.parse(packagePath(3));
        }, "should parse package paths up to the recursion limit");
        test.throws(function() {
            protobuf.parse(packagePath(4));
        }, /max depth exceeded/, "should reject excessively nested package paths");
    } finally {
        protobuf.util.recursionLimit = recursionLimit;
        protobuf.util.nestingLimit = nestingLimit;
    }

    test.end();
});

