var tape = require("tape");

var protobuf = require("..");


tape.test("invalid edition", function(test) {
    test.throws(function() {
        protobuf.parse(`edition = "2022"; message A {}`);
    }, Error, /Error: illegal edition '2022'/, "unknown past edition should be rejected");

    test.throws(function() {
        protobuf.parse(`edition = "2030"; message A {}`);
    }, Error, /Error: illegal edition '2030'/, "unknown future edition should be rejected");
    
    test.end();
});

tape.test("edition 2023 banned keywords", function(test) {
    test.throws(function() {
        protobuf.parse(`edition = "2023";
    message A {\
        required uint32 a = 1;\
    }`);
    }, Error,  /Error: illegal token 'required'/, "required should be banned");

    test.throws(function() {
        protobuf.parse(`edition = "2023";
        message A {\
        optional uint32 a = 1;\
    }`);
    }, Error, /Error: illegal token 'optional'/, "optional should be banned");

    test.throws(function() {
        protobuf.parse(`edition = "2023";
        message A {\
        group uint32 a = 1;\
    }`);
    }, Error, /Error: illegal token 'group'/);

    test.end();
});

tape.test("edition 2023 reserved", function(test) {
    var root = protobuf.parse(`edition = "2023";
    message Foo {
        reserved bar, baz;
    }`).root.resolveAll();
    test.same(root.Foo.reserved, ["bar", "baz"], "reserved fields should be parsed");

    root = protobuf.parse(`edition = "2023";
    enum Foo {
        reserved BAR, BAZ_BAZ;
    }`).root.resolveAll();
    test.same(root.nested.Foo.reserved, ["BAR", "BAZ_BAZ"], "reserved values should be parsed");

    test.throws(function() {
        protobuf.parse(`edition = "2023";
        message Foo {
            reserved "bar", "baz";
        }`);
    }, /Error: illegal id 'bar'/, "reserved field strings should be banned");

    test.throws(function() {
        protobuf.parse(`edition = "2023";
        enum Foo {
            reserved "BAR", "BAZ";
        }`);
    }, /Error: illegal id 'BAR'/, "reserved enum value strings should be banned");

    test.throws(function() {
        protobuf.parse(`syntax = "proto3";
        message Foo {
            reserved bar, baz;
        }`);
    }, /Error: illegal id 'bar'/, "reserved field strings should be banned");

    test.throws(function() {
        protobuf.parse(`syntax = "proto3";
        enum Foo {
            reserved BAR, BAZ;
        }`);
    }, /Error: illegal id 'BAR'/, "reserved enum value strings should be banned");

    test.end();
});

tape.test("edition 2024 visibility", function(test) {
    var root = protobuf.parse(`edition = "2024";
        local message LocalMessage {}
        export enum ExportedEnum {}
        message Outer {
            export message ExportedMessage {}
            local enum LocalEnum { ZERO = 0; }
        }
    `).root;
    test.equal(root.lookupType("LocalMessage").visibility, "local", "messages should preserve local modifier");
    test.equal(root.lookupEnum("ExportedEnum").visibility, "export", "enums should preserve export modifier");
    test.equal(root.lookupType("Outer.ExportedMessage").visibility, "export", "nested messages should preserve export modifier");
    test.equal(root.lookupEnum("Outer.LocalEnum").visibility, "local", "nested enums should preserve local modifier");
    var roundtrip = protobuf.Root.fromJSON(root.toJSON());
    test.equal(roundtrip.lookupType("LocalMessage").visibility, "local", "reflection JSON should preserve message visibility");
    test.equal(roundtrip.lookupEnum("ExportedEnum").visibility, "export", "reflection JSON should preserve enum visibility");

    test.throws(function() {
        protobuf.parse(`edition = "2023"; export message Foo {}`)
    }, /Error: illegal token 'export'/, "export should be banned before edition 2024");
    test.throws(function() {
        protobuf.parse(`edition = "2024"; export service Foo {}`)
    }, /Error: illegal token 'export'/, "export should be banned on services");
    test.throws(function() {
        protobuf.parse(`edition = "2024";
            message Empty {}
            service Foo {
                export rpc Method(Empty) returns (Empty);
            }`)
    }, /Error: illegal token 'export'/, "export should be banned on methods");
    test.throws(function() {
        protobuf.parse(`edition = "2024"; export option foo = 1;`)
    }, /Error: illegal token 'export'/, "export should be banned on options");

    test.throws(function() {
        protobuf.parse(`edition = "2023"; local message Foo {}`)
    }, /Error: illegal token 'local'/, "local should be banned before edition 2024");
    test.throws(function() {
        protobuf.parse(`edition = "2024"; local service Foo {}`)
    }, /Error: illegal token 'local'/, "local should be banned on services");
    test.throws(function() {
        protobuf.parse(`edition = "2024";
            message Empty {}
            service Foo {
                local rpc Method(Empty) returns (Empty);
            }`)
    }, /Error: illegal token 'local'/, "local should be banned on methods");
    test.throws(function() {
        protobuf.parse(`edition = "2024"; local option foo = 1;`)
    }, /Error: illegal token 'local'/, "local should be banned on options");

    test.end();
});

tape.test("edition 2024 import option", function(test) {
    test.same(protobuf.parse(`edition = "2024"; import "foo.proto";`).imports, ["foo.proto"], "regular options should fetch");
    test.equals(protobuf.parse(`edition = "2024"; import option "foo.proto";`).imports, undefined, "import option should not fetch");
    test.same(protobuf.parse(`edition = "2024";
        import option "foo.proto";
        import "bar.proto";
        import option "foo2.proto";
    `).imports, ["bar.proto"], "multiple import options should not fetch");

    test.throws(function() {
        protobuf.parse(`edition = "2023"; import option "foo.proto";`);
    }, /Error: illegal token 'option'/, "import option should be banned before edition 2024");

    var root = new protobuf.Root();
    root.loadSync("tests/data/import-option-bad.proto");
    root.resolveAll();

    test.end();
});

tape.test("edition 2024 local visibility enforcement", function(test) {

    // Parses several sources into one Root, each under its own file name, the
    // way Root#load does (it sets parse.filename before each parse call).
    function parseFiles(files) {
        var root = new protobuf.Root();
        Object.keys(files).forEach(function(filename) {
            protobuf.parse.filename = filename;
            protobuf.parse(files[filename], root);
        });
        return root;
    }

    test.doesNotThrow(function() {
        parseFiles({
            "a.proto": `edition = "2024";
                local message Hidden { int32 value = 1; }
                message User { Hidden hidden = 1; }`
        }).resolveAll();
    }, "local message should resolve within its own file");

    test.doesNotThrow(function() {
        parseFiles({
            "a.proto": `edition = "2024";
                local enum Hidden { ZERO = 0; }
                message User { Hidden hidden = 1; }`
        }).resolveAll();
    }, "local enum should resolve within its own file");

    test.throws(function() {
        parseFiles({
            "a.proto": `edition = "2024"; local message Hidden { int32 value = 1; }`,
            "b.proto": `edition = "2024"; message User { Hidden hidden = 1; }`
        }).resolveAll();
    }, /is local to 'a\.proto' and cannot be referenced from 'b\.proto'/, "local message should not resolve from another file");

    test.throws(function() {
        parseFiles({
            "a.proto": `edition = "2024"; local enum Hidden { ZERO = 0; }`,
            "b.proto": `edition = "2024"; message User { Hidden hidden = 1; }`
        }).resolveAll();
    }, /is local to 'a\.proto' and cannot be referenced from 'b\.proto'/, "local enum should not resolve from another file");

    test.throws(function() {
        parseFiles({
            "a.proto": `edition = "2024"; message Outer { local message Hidden { int32 value = 1; } }`,
            "b.proto": `edition = "2024"; message User { Outer.Hidden hidden = 1; }`
        }).resolveAll();
    }, /is local to 'a\.proto' and cannot be referenced from 'b\.proto'/, "nested local message should not resolve from another file");

    test.doesNotThrow(function() {
        parseFiles({
            "a.proto": `edition = "2024"; export message Shared { int32 value = 1; }`,
            "b.proto": `edition = "2024"; message User { Shared shared = 1; }`
        }).resolveAll();
    }, "export message should resolve from another file");

    test.doesNotThrow(function() {
        parseFiles({
            "a.proto": `edition = "2024"; message Plain { int32 value = 1; }`,
            "b.proto": `edition = "2024"; message User { Plain plain = 1; }`
        }).resolveAll();
    }, "unmodified message should resolve from another file");

    test.doesNotThrow(function() {
        parseFiles({
            "a.proto": `edition = "2023"; message Plain { int32 value = 1; }`,
            "b.proto": `edition = "2023"; message User { Plain plain = 1; }`
        }).resolveAll();
    }, "edition 2023 cross-file references should be untouched");

    test.doesNotThrow(function() {
        parseFiles({
            "a.proto": `syntax = "proto2"; message Plain { optional int32 value = 1; }`,
            "b.proto": `syntax = "proto3"; message User { Plain plain = 1; }`
        }).resolveAll();
    }, "proto2/proto3 cross-file references should be untouched");

    // Objects built without a file name cannot be proven to be cross-file, so
    // they must keep resolving (programmatic construction, fromJSON, commons).
    test.doesNotThrow(function() {
        protobuf.Root.fromJSON({
            nested: {
                Hidden: { fields: { value: { type: "int32", id: 1 } } },
                User: { fields: { hidden: { type: "Hidden", id: 1 } } }
            }
        }).resolveAll();
    }, "objects without a file name should keep resolving");

    test.end();
});
