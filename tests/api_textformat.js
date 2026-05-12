var tape = require("tape");

var protobuf = require("..");
require("../ext/textformat");

var proto = "syntax = \"proto3\";\
message Child { string name = 1; }\
enum Kind { ZERO = 0; ONE = 1; }\
message Msg {\
  int32 int32_field = 1;\
  uint32 uint32_field = 2;\
  int64 int64_field = 3;\
  uint64 uint64_field = 4;\
  double double_field = 5;\
  float float_field = 6;\
  bool bool_field = 7;\
  string string_field = 8;\
  bytes bytes_field = 9;\
  repeated int32 repeated_int32 = 10;\
  Child child = 11;\
  repeated Child children = 12;\
  map<string, int32> string_map = 13;\
  Kind kind = 14;\
  oneof pick { string first = 15; string second = 16; }\
  reserved \"old_field\";\
}";

var root = protobuf.parse(proto).root,
    Msg = root.lookupType("Msg"),
    Child = root.lookupType("Child"),
    Kind = root.lookupEnum("Kind");

tape.test("textformat - parses scalar, repeated, map and nested fields", function(test) {
    var msg = Msg.fromText(
        "int32_field: - 052\n" +
        "uint32_field: 0x2a\n" +
        "int64_field: - 9007199254740991\n" +
        "uint64_field: 18446744073709551615\n" +
        "double_field: - inf\n" +
        "float_field: nan\n" +
        "bool_field: t\n" +
        "string_field: \"hello\" \" \" \"\\303\\274\"\n" +
        "bytes_field: \"\\000\\xff\\n\"\n" +
        "repeated_int32: [1, 2]\n" +
        "repeated_int32: 3\n" +
        "child { name: \"kid\" }\n" +
        "children: [{ name: \"a\" }, { name: \"b\" }]\n" +
        "string_map { key: \"b\" value: 2 }\n" +
        "string_map { key: \"a\" value: 1 }\n" +
        "kind: ONE\n" +
        "first: \"choice\"\n" +
        "old_field: \"ignored\"\n"
    );

    test.equal(msg.int32Field, -42, "parses signed octal int32");
    test.equal(msg.uint32Field, 42, "parses unsigned hex uint32");
    test.equal(msg.int64Field.toString(), "-9007199254740991", "parses int64");
    test.equal(msg.uint64Field.toString(), "18446744073709551615", "parses uint64");
    test.equal(msg.doubleField, -Infinity, "parses signed infinity");
    test.ok(isNaN(msg.floatField), "parses nan");
    test.equal(msg.boolField, true, "parses bool shorthand");
    test.equal(msg.stringField, "hello \u00fc", "parses concatenated utf8 strings");
    test.same(Array.prototype.slice.call(msg.bytesField), [0, 255, 10], "parses bytes");
    test.same(msg.repeatedInt32, [1, 2, 3], "parses repeated list and repeated field occurrences");
    test.equal(msg.child.name, "kid", "parses nested message");
    test.same(msg.children.map(function(child) { return child.name; }), ["a", "b"], "parses repeated message list");
    test.same(msg.stringMap, { a: 1, b: 2 }, "parses map entries");
    test.equal(msg.kind, Kind.values.ONE, "parses enum names");
    test.equal(msg.first, "choice", "parses oneof member");
    test.end();
});

tape.test("textformat - formats deterministically", function(test) {
    var text = Msg.toText(Msg.create({
        stringMap: { b: 2, a: 1 },
        child: Child.create({ name: "kid" }),
        repeatedInt32: [2, 1],
        stringField: "a\nb",
        bytesField: protobuf.util.newBuffer([0, 10, 255]),
        kind: Kind.values.ONE
    }));

    test.equal(text, [
        "string_field: \"a\\nb\"",
        "bytes_field: \"\\000\\n\\377\"",
        "repeated_int32: 2",
        "repeated_int32: 1",
        "child {",
        "  name: \"kid\"",
        "}",
        "string_map {",
        "  key: \"a\"",
        "  value: 1",
        "}",
        "string_map {",
        "  key: \"b\"",
        "  value: 2",
        "}",
        "kind: ONE"
    ].join("\n"), "formats in field-number order with sorted map keys");
    test.end();
});

tape.test("textformat - rejects duplicate singular and oneof fields", function(test) {
    test.throws(function() {
        Msg.fromText("string_field: \"a\" string_field: \"b\"");
    }, /multiple values/, "rejects duplicate singular fields");
    test.throws(function() {
        Msg.fromText("first: \"a\" second: \"b\"");
    }, /multiple values/, "rejects multiple oneof fields");
    test.throws(function() {
        Msg.fromText("unknown_field: 1");
    }, /unknown field/, "rejects unknown fields");
    test.throws(function() {
        Msg.fromText("string_field: \"\\xff\"");
    }, /invalid UTF-8/, "rejects invalid UTF-8 strings");
    test.throws(function() {
        Msg.fromText("repeated_int32: 1,, repeated_int32: 2");
    }, /unexpected separator/, "rejects duplicate separators");
    test.throws(function() {
        Msg.fromText("bytes_field: \"\\ud800\"");
    }, /illegal unicode escape/, "rejects surrogate unicode escapes");
    test.end();
});

tape.test("textformat - parses groups", function(test) {
    var GroupRoot = protobuf.parse("syntax = \"proto2\"; message WithGroup { optional group MyGroup = 1 { optional int32 group_value = 2; } }").root,
        WithGroup = GroupRoot.lookupType("WithGroup"),
        msg = WithGroup.fromText("MyGroup { group_value: 7 }");
    test.equal(msg.myGroup.groupValue, 7, "parses group field by group name");
    test.equal(WithGroup.toText(msg), "MyGroup {\n  group_value: 7\n}", "formats group field by group name");
    test.end();
});

tape.test("textformat - parses extensions", function(test) {
    var ExtRoot = protobuf.parse("syntax = \"proto2\"; package pkg; message Base { extensions 100 to max; } extend Base { optional string ext_field = 100; }").root,
        Base = ExtRoot.lookupType("pkg.Base"),
        msg = Base.fromText("[pkg.ext_field]: \"x\"");
    test.equal(msg[".pkg.extField"], "x", "parses extension field");
    test.equal(Base.toText(msg), "[pkg.ext_field]: \"x\"", "formats extension field with proto-style name");
    test.end();
});

tape.test("textformat - parses group extensions by field name", function(test) {
    var ExtRoot = protobuf.parse("syntax = \"proto2\"; package pkg; message Base { extensions 100 to max; } extend Base { optional group GroupField = 100 { optional int32 group_value = 1; } }").root,
        Base = ExtRoot.lookupType("pkg.Base"),
        msg = Base.fromText("[pkg.groupfield] { group_value: 1 }");
    test.equal(msg[".pkg.groupField"].groupValue, 1, "parses group extension field name");
    test.equal(Base.toText(msg), "[pkg.groupfield] {\n  group_value: 1\n}", "formats group extension field name");
    test.throws(function() {
        Base.fromText("[pkg.GroupField] { group_value: 1 }");
    }, /unknown extension/, "rejects group type name as extension field name");
    test.end();
});

tape.test("textformat - parses Any expansion", function(test) {
    var AnyRoot = protobuf.parse("syntax = \"proto3\"; package google.protobuf; message Any { string type_url = 1; bytes value = 2; }").root;
    protobuf.parse("syntax = \"proto3\"; message Payload { string value = 1; } message Wrap { google.protobuf.Any any = 1; }", AnyRoot);
    var
        Wrap = AnyRoot.lookupType("Wrap"),
        Payload = AnyRoot.lookupType("Payload"),
        msg = Wrap.fromText("any { [type.googleapis.com/Payload] { value: \"x\" } }"),
        payload = Payload.decode(msg.any.value);
    test.equal(msg.any.typeUrl, "type.googleapis.com/Payload", "sets Any type_url");
    test.equal(payload.value, "x", "encodes expanded Any payload");
    test.end();
});

tape.test("textformat - preserves explicit defaults", function(test) {
    var OpenRoot = protobuf.parse("syntax = \"proto3\"; enum E { A = 0; } message M { float value = 1; E choice = 2; }").root,
        M = OpenRoot.lookupType("M"),
        msg = M.fromText("value: -0 choice: 42");
    test.equal(1 / msg.value, -Infinity, "preserves explicit negative zero");
    test.equal(msg.choice, 42, "preserves unknown open enum number");
    test.equal(M.toText(msg), "value: -0\nchoice: 42", "formats explicit default and open enum number");
    test.end();
});

tape.test("textformat - enforces recursion limit", function(test) {
    var RecRoot = protobuf.parse("syntax = \"proto3\"; message Node { Node child = 1; reserved \"old\"; }").root,
        Node = RecRoot.lookupType("Node"),
        limit = protobuf.util.recursionLimit;
    protobuf.util.recursionLimit = 1;
    try {
        test.doesNotThrow(function() {
            Node.fromText("child {}");
        }, "parses nesting at limit");
        test.throws(function() {
            Node.fromText("child { child {} }");
        }, /max depth exceeded/, "rejects parse nesting over limit");
        test.throws(function() {
            Node.fromText("old { old {} }");
        }, /max depth exceeded/, "rejects reserved value nesting over limit");
        test.doesNotThrow(function() {
            Node.toText({ child: {} });
        }, "formats nesting at limit");
        test.throws(function() {
            Node.toText({ child: { child: {} } });
        }, /max depth exceeded/, "rejects format nesting over limit");
    } finally {
        protobuf.util.recursionLimit = limit;
    }
    test.end();
});

tape.test("textformat - optionally formats unknown fields", function(test) {
    var UnknownRoot = protobuf.parse("syntax = \"proto3\"; message M { int32 known = 1; }").root,
        M = UnknownRoot.lookupType("M"),
        nested = protobuf.Writer.create().uint32(8).uint32(111).finish(),
        bytes = protobuf.util.newBuffer([0, 255]),
        encoded = protobuf.Writer.create()
            .uint32(1001 << 3 | 0).uint32(123)
            .uint32(1002 << 3 | 2).bytes(nested)
            .uint32(1003 << 3 | 2).bytes(bytes)
            .uint32(1004 << 3 | 5).fixed32(0x12345678)
            .uint32(1005 << 3 | 1).raw([0xf0, 0xde, 0xbc, 0x9a, 0x78, 0x56, 0x34, 0x12])
            .uint32(1006 << 3 | 3).uint32(8).uint32(321).uint32(1006 << 3 | 4)
            .finish(),
        msg = M.decode(encoded);

    test.equal(M.toText(msg), "", "omits unknown fields by default");
    test.equal(M.toText(msg, { unknowns: true }), [
        "1001: 123",
        "1002 {",
        "  1: 111",
        "}",
        "1003: \"\\000\\377\"",
        "1004: 0x12345678",
        "1005: 0x123456789abcdef0",
        "1006 {",
        "  1: 321",
        "}"
    ].join("\n"), "formats unknown fields with numeric text format syntax");

    var unknownLimit = protobuf.textformat.unknownRecursionLimit,
        nestedOnly = M.decode(protobuf.Writer.create().uint32(1002 << 3 | 2).bytes(nested).finish());
    protobuf.textformat.unknownRecursionLimit = 0;
    try {
        test.equal(M.toText(nestedOnly, { unknowns: true }), "1002: \"\\010o\"", "unknown recursion limit disables nested heuristic");
    } finally {
        protobuf.textformat.unknownRecursionLimit = unknownLimit;
    }
    test.end();
});
