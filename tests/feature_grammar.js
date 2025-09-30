var tape = require("tape");

var protobuf = require("..");

tape.test("editions required keyword", function(test) {
    test.throws(function() {
        protobuf.parse(`edition = "2023";
    message A {\
        required uint32 a = 1;\
    }`);
    }, /Error: illegal token 'required'/);
    
    test.end();
});

tape.test("editions optional keyword", function(test) {
    test.throws(function() {
        protobuf.parse(`edition = "2023";
        message A {\
        optional uint32 a = 1;\
    }`);
    }, /Error: illegal token 'optional'/);

    test.end();
});

tape.test("editions group keyword", function(test) {
    test.throws(function() {
        protobuf.parse(`edition = "2023";
        message A {\
            group uint32 a = 1;\
        }`);
    }, /Error: illegal token 'group'/);

    test.end();
});

tape.test("editions no quote", function(test) {
    test.ok(protobuf.parse(`edition = "2023";
    message Foo {
        reserved bar, baz;
    }`));
    
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
