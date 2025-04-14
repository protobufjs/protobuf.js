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
    test.ok(protobuf.parse(`edition = "2024"; export message Foo {}`), "messages should allow export modifier");;
    test.ok(protobuf.parse(`edition = "2024"; export enum Foo {}`), "enums should allow export modifier");;
    test.ok(protobuf.parse(`edition = "2024"; local message Foo {}`), "messages should allow local modifier");;
    test.ok(protobuf.parse(`edition = "2024"; local enum Foo {}`), "enums should allow local modifier");;
    test.ok(protobuf.parse(`edition = "2024";
        message Foo {
            export message Export {}
            local message Local {}
        }`), "nested messages should allow visibility modifiers");;
    test.ok(protobuf.parse(`edition = "2024";
        message Foo {
            export enum Export {}
            local enum Local {}
        }`), "nested enums should allow visibility modifiers");;

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
