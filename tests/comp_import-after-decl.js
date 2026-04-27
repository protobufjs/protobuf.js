var tape = require("tape");
var protobuf = require("..");

tape.test("imports after declarations", function(test) {
    var parsed = protobuf.parse("syntax = \"proto3\";" +
        "message Foo { string name = 1; }" +
        "import \"bar.proto\";" +
        "enum Status { UNKNOWN = 0; }" +
        "import weak \"baz.proto\";");

    test.deepEqual(parsed.imports, [ "bar.proto" ], "should parse imports after messages");
    test.deepEqual(parsed.weakImports, [ "baz.proto" ], "should parse weak imports after enums");
    test.end();
});
