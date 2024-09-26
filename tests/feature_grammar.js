var tape = require("tape");

var protobuf = require("..");

var protoEditionsRequired = `edition = "2023";
    message A {\
        required uint32 a = 1;\
    }`;
var protoEditionsOptional = `edition = "2023";
    message A {\
        optional uint32 a = 1;\
    }`;

var protoEditionsGroup = `edition = "2023";
    message A {\
        group uint32 a = 1;\
    }`;

var noQuote = `edition = "2023";
   message Foo {
        reserved bar, baz;
   }`;

tape.test("editions grammar", function(test) {
    test.throws(function() {
        protobuf.parse(protoEditionsRequired);
    }, Error, "Error: illegal token 'required'");

    test.throws(function() {
        protobuf.parse(protoEditionsOptional);
    }, Error, "Error: illegal token 'optional'");

    test.throws(function() {
        protobuf.parse(protoEditionsGroup);
    }, Error, "Error: illegal token 'group'");

    test.ok(protobuf.parse(noQuote));
    
    test.end();
});
