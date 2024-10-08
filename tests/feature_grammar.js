var tape = require("tape");

var protobuf = require("..");

tape.test("editions required keyword", function(test) {
    test.throws(function() {
        protobuf.parse(`edition = "2023";
    message A {\
        required uint32 a = 1;\
    }`);
    }, Error, "Error: illegal token 'required'");
    
    test.end();
});

tape.test("editions optional keyword", function(test) {
    test.throws(function() {
        protobuf.parse(`edition = "2023";
        message A {\
        optional uint32 a = 1;\
    }`);
    }, Error, "Error: illegal token 'optional'");

    test.end();
});

tape.test("editions group keyword", function(test) {
    test.throws(function() {
        protobuf.parse(`edition = "2023";
        message A {\
        group uint32 a = 1;\
    }`);
    }, Error, "Error: illegal token 'group'");

    test.end();
});

tape.test("editions no quote", function(test) {
    test.ok(protobuf.parse(`edition = "2023";
    message Foo {
        reserved bar, baz;
    }`));
    
    test.end();
});

