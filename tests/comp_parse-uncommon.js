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

tape.test("numeric defaults", function(test) {
    var Type = protobuf.parse("syntax = \"proto2\";\
        message M {\
            optional float float_value = 1 [default = -0];\
            optional double double_value = 2 [default = -0];\
            optional double zero_value = 3 [default = 0];\
            optional int32 int_value = 4 [default = -0];\
            optional int32 hex_int_value = 5 [default = -0x0];\
        }").root.lookupType("M");

    Type.resolveAll();
    test.ok(Object.is(Type.fields.floatValue.defaultValue, -0), "should preserve a negative zero float default");
    test.ok(Object.is(Type.fields.doubleValue.defaultValue, -0), "should preserve a negative zero double default");
    test.ok(Object.is(Type.fields.zeroValue.defaultValue, 0), "should preserve a positive zero default");
    test.ok(Object.is(Type.fields.intValue.defaultValue, 0), "should normalize a negative integer zero default");
    test.ok(Object.is(Type.fields.hexIntValue.defaultValue, 0), "should normalize a negative hexadecimal zero default");
    var Enum = protobuf.parse("syntax = \"proto3\"; enum E { ZERO = -0; }").root.lookupEnum("E");
    test.ok(Object.is(Enum.values.ZERO, 0), "should normalize a negative zero enum value");
    test.throws(function() {
        protobuf.parse("syntax = \"proto2\"; message M { optional uint32 value = 1 [default = -0]; }");
    }, /illegal integer '-0'/, "should reject a negative unsigned default");
    test.throws(function() {
        protobuf.parse("syntax = \"proto2\"; message M { optional int32 value = 1 [default = 1.5]; }");
    }, /illegal integer '1\.5'/, "should reject a non-integer default");
    test.end();
});

tape.test("exact 64-bit defaults", function(test) {
    require("../ext/descriptor");
    var cases = [
        ["int64", "9007199254740993", "9007199254740993"],
        ["int64", "-9007199254740993", "-9007199254740993"],
        ["uint64", "9007199254740993", "9007199254740993"],
        ["sint64", "-0x20000000000001", "-9007199254740993"],
        ["fixed64", "0x8000000000000001", "9223372036854775809"],
        ["sfixed64", "-0400000000000000001", "-9007199254740993"],
        ["int64", "9223372036854775807", "9223372036854775807"],
        ["int64", "-9223372036854775808", "-9223372036854775808"],
        ["uint64", "18446744073709551615", "18446744073709551615"],
        ["fixed64", "0xffffffffffffffff", "18446744073709551615"],
        ["sint64", "-0777777777777777777777", "-9223372036854775807"],
        ["sfixed64", "-0x7FFFFFFFFFFFFFFF", "-9223372036854775807"],
        ["uint64", "01777777777777777777777", "18446744073709551615"],
        ["int64", "0x000020000000000001", "9007199254740993"],
        ["int64", "000400000000000000001", "9007199254740993"],
        ["int64", "0x20000000000000", "9007199254740992"]
    ];
    function defaultValue(root) {
        var Type = root.lookupType("M");
        return Type.toObject(Type.decode(new Uint8Array(0)), { defaults: true, longs: String }).value;
    }
    cases.forEach(function(item) {
        var label = item[0] + " " + item[1],
            root = protobuf.parse("syntax = \"proto2\"; message M { optional " + item[0] + " value = 1 [default = " + item[1] + "]; }").root;
        test.equal(root.lookupType("M").fields.value.options.default, item[2], label + " keeps an exact decimal option");
        test.equal(defaultValue(root), item[2], label + " is the default of an empty message");
        test.equal(defaultValue(protobuf.Root.fromJSON(JSON.parse(JSON.stringify(root.toJSON())))), item[2], label + " survives JSON export and import");
        test.equal(defaultValue(protobuf.Root.fromDescriptor(root.toDescriptor("proto2"))), item[2], label + " survives descriptor export and import");
    });
    test.end();
});

tape.test("64-bit default compatibility", function(test) {
    function parseDefault(type, value) {
        return protobuf.parse("syntax = \"proto2\"; message M { optional " + type + " value = 1 [default = " + value + "]; }").root.lookupType("M");
    }
    ["int64", "uint64", "sint64", "fixed64", "sfixed64"].forEach(function(type) {
        ["0", "17", "0x11", "021", "9007199254740991"].forEach(function(value) {
            test.equal(typeof parseDefault(type, value).fields.value.options.default, "number", type + " " + value + " stays a numeric option");
        });
        ["08", "1.5", "1e3", "inf", "nan", "\"123\""].forEach(function(value) {
            test.throws(function() { parseDefault(type, value); }, /illegal integer/, type + " rejects " + value);
        });
    });
    ["-0", "-00", "-0x0"].forEach(function(value) {
        test.ok(Object.is(parseDefault("int64", value).fields.value.options.default, 0), value + " stays a positive integer zero");
        test.throws(function() { parseDefault("uint64", value); }, /illegal integer/, "uint64 still rejects " + value);
    });
    test.equal(parseDefault("int64", "-9007199254740991").fields.value.options.default, -9007199254740991, "a safe negative default stays numeric");

    // Values outside the field's range retain the existing Number conversion.
    test.equal(parseDefault("int64", "0xffffffffffffffff").create().value.toString(), "9223372036854775807", "an out-of-range signed default does not start wrapping");
    test.equal(parseDefault("uint64", "18446744073709551616").create().value.toString(), "18446744073709551615", "an out-of-range unsigned default does not start wrapping");

    var Long = protobuf.util.Long;
    try {
        protobuf.util.Long = null;
        var Type = parseDefault("int64", "9007199254740993");
        test.equal(Type.create().value, 9007199254740992, "without Long the existing numeric fallback remains available");
    } finally {
        protobuf.util.Long = Long;
    }
    test.end();
});

tape.test("negative enum reserved values", function(test) {
    test.doesNotThrow(function() {
        var Enum = protobuf.parse("syntax = \"proto3\"; enum Values { reserved -1; INVALID = 0; OK = 1; }").root.lookupEnum("Values");
        test.same(Enum.reserved, [[-1, -1]], "should parse negative singleton enum reserved value");
    }, "should parse negative enum reserved values");

    test.throws(function() {
        protobuf.parse("syntax = \"proto3\"; enum Values { reserved -2 to -1; INVALID = 0; RESERVED = -1; }");
    }, /id -1 is reserved/, "should reject negative reserved enum range end ids");

    test.throws(function() {
        protobuf.parse("syntax = \"proto3\"; enum Values { reserved 1 to max; INVALID = 0; RESERVED = 2147483647; }");
    }, /id 2147483647 is reserved/, "should use int32 max for enum reserved max");

    test.throws(function() {
        protobuf.parse("syntax = \"proto3\"; enum Values { reserved -1; INVALID = 0; RESERVED = -1; }");
    }, /id -1 is reserved/, "should reject negative reserved enum value ids");

    test.throws(function() {
        protobuf.parse("syntax = \"proto3\"; message M { reserved -1; int32 value = 1; }");
    }, /illegal id '-1'/, "should still reject negative message reserved field ids");

    test.end();
});

tape.test("enum declarations are order-independent", function(test) {
    var Enum = protobuf.parse("syntax = \"proto3\"; enum Values { INVALID = 0; UNKNOWN = 0; option allow_alias = true; OK = 1; }").root.lookupEnum("Values");
    test.same(Object.keys(Enum.values).map(function(name) {
        return [name, Enum.values[name]];
    }), [
        ["INVALID", 0],
        ["UNKNOWN", 0],
        ["OK", 1]
    ], "should allow aliases declared before allow_alias");

    test.throws(function() {
        protobuf.parse("syntax = \"proto3\"; enum Values { INVALID = 0; UNKNOWN = 0; option allow_alias = false; }");
    }, /duplicate id 0/, "should reject aliases when allow_alias is false");

    test.throws(function() {
        protobuf.parse("syntax = \"proto3\"; enum Values { INVALID = 0; RESERVED = 1; reserved 1; }");
    }, /id 1 is reserved/, "should apply reserved declarations to preceding values");

    test.end();
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

tape.test("EOF / truncated input", function(test) {
    function throwsIllegalNotTypeError(source, message) {
        test.throws(function() {
            try {
                protobuf.parse(source);
            } catch (err) {
                test.notEqual(err && err.name, "TypeError", message + " should not throw TypeError");
                throw err;
            }
        }, /illegal/, message);
    }

    throwsIllegalNotTypeError("message M { repeated int32 f = ", "should reject missing field id");
    throwsIllegalNotTypeError("message M { repeated ", "should reject missing field type");
    throwsIllegalNotTypeError("message M { repeated int32", "should reject missing field name");
    throwsIllegalNotTypeError("message ", "should reject missing message type name");
    throwsIllegalNotTypeError("message M { oneof ", "should reject missing oneof name");
    throwsIllegalNotTypeError("message M { optional group ", "should reject missing group name");
    throwsIllegalNotTypeError("message M { map<string, Foo> ", "should reject missing map field name");
    throwsIllegalNotTypeError("enum ", "should reject missing enum name");
    throwsIllegalNotTypeError("service ", "should reject missing service name");
    throwsIllegalNotTypeError("extend ", "should reject missing extend reference");
    throwsIllegalNotTypeError("package ", "should reject missing package name");
    throwsIllegalNotTypeError("message M { reserved ", "should reject missing reserved range");
    throwsIllegalNotTypeError("message M { optional Foo.", "should reject truncated dotted field type");
    test.end();
});
