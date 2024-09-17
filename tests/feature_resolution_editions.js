/*
1. Defaults
2. File - A
3. Message - B
4. Enum - C
5. File extension - D
6. File service - E
7. Message Field - F
8. Message Enum - G
9. Message Message - H
10. Message Extension - I
11. "one of" Field - J
12. Enum value - K
13. Service method - L



edition = "2023";

option features.amazing_feature = A;

service MyService {
    option features.amazing_feature = E;
    rpc MyMethod (MyRequest) returns (MyResponse) {
        option features.amazing_feature = L;
    };
}

message Message {
    option features.amazing_feature = B;

    string string_val = 1;
    repeated string string_repeated = 2 [features.amazing_feature = F];

    uint64 uint64_val = 3;
    repeated uint64 uint64_repeated = 4;

    bytes bytes_val = 5;
    repeated bytes bytes_repeated = 6;

    SomeEnum enum_val = 7;
    repeated SomeEnum enum_repeated = 8;

    extensions 10 to 100;
    extend Message {
        required int32 bar = 10 [features.amazing_feature = I];
    }

    message Nested {
        option features.amazing_feature = H;
        optional int64 count = 9;
    }

    enum SomeEnumInMessage {
        option features.amazing_feature = G;
        ONE = 11;
        TWO = 12;
    }
    
    oneof SomeOneOf {
        option features.amazing_feature = J;
        int32 a = 13;
        string b = 14;
    }

    map<string,int64> int64_map = 15;
}

extend Message {
    required int32 bar = 16 [features.amazing_feature = D];
}

enum SomeEnum {
    option features.amazing_feature = C;
    ONE = 1 [features.amazing_feature = K];
    TWO = 2;
}

*/

var tape = require("tape");

var protobuf = require("..");

var protoEditions2023 = `edition = "2023";`;

var proto2 = `syntax = "proto2";`;

var proto3 = `syntax = "proto3";`;

var editions2023Defaults = {enum_type: 'OPEN', field_presence: 'EXPLICIT', json_format: 'ALLOW', message_encoding: 'LENGTH_PREFIXED', repeated_field_encoding: 'PACKED', utf8_validation: 'VERIFY'}
var proto2Defaults = {enum_type: 'CLOSED', field_presence: 'EXPLICIT', json_format: 'LEGACY_BEST_EFFORT', message_encoding: 'LENGTH_PREFIXED', repeated_field_encoding: 'EXPANDED', utf8_validation: 'NONE'}
var proto3Defaults = {enum_type: 'OPEN', field_presence: 'IMPLICIT', json_format: 'ALLOW', message_encoding: 'LENGTH_PREFIXED', repeated_field_encoding: 'PACKED', utf8_validation: 'VERIFY'}


var protoEditions2023Overridden = `edition = "2023";
option features.json_format = LEGACY_BEST_EFFORT;

option features.a.b.c.d_e = deeply_nested_false;

message Message {
    string string_val = 1;
    string string_repeated = 2 [features.enum_type = CLOSED];

    message Nested {
        option features.a.b.c.d_e = deeply_nested_true;
        option features.field_presence = IMPLICIT;
        int64 count = 9;
    }
}
`
tape.test("feautre resolution defaults", function(test) {
    var rootEditions = protobuf.parse(protoEditions2023).root;
    test.same(rootEditions._features, editions2023Defaults);

    var rootProto2 = protobuf.parse(proto2).root;
    test.same(rootProto2._features, proto2Defaults);

    var rootProto3 = protobuf.parse(proto3).root;
    test.same(rootProto3._features, proto3Defaults);

    test.end();
})

tape.test("feature resolution inheritance", function(test) {
    var rootEditionsOverriden = protobuf.parse(protoEditions2023Overridden).root

    rootEditionsOverriden.resolveAll();

    // Should flip enum_type from default setting, inherit from Message,
    // and keep everything else
    test.same(rootEditionsOverriden.lookup("Message").fields.stringRepeated._features, {
        enum_type: 'CLOSED',
        field_presence: 'EXPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'VERIFY',
        a: { b: { c: { d_e: 'deeply_nested_false' } } }
      })

    // Should inherit from default, and Message, only change field_presence
    test.same(rootEditionsOverriden.lookup("Message").lookup("Nested")._features, 
    { enum_type: 'OPEN', field_presence: 'IMPLICIT', json_format: 'LEGACY_BEST_EFFORT', message_encoding: 'LENGTH_PREFIXED', repeated_field_encoding: 'PACKED', utf8_validation: 'VERIFY', a: { b: { c: { d_e: 'deeply_nested_true' } } } })

    // Supports extensions
    test.same(rootEditionsOverriden._features, 
        { enum_type: 'OPEN', field_presence: 'EXPLICIT', json_format: 'LEGACY_BEST_EFFORT', message_encoding: 'LENGTH_PREFIXED', repeated_field_encoding: 'PACKED', utf8_validation: 'VERIFY', a: { b: { c: { d_e: 'deeply_nested_false' } } } })

    // Supports overriding extensions
    test.same(rootEditionsOverriden.lookup("Message").lookup("Nested")._features, 
    { enum_type: 'OPEN', field_presence: 'IMPLICIT', json_format: 'LEGACY_BEST_EFFORT', message_encoding: 'LENGTH_PREFIXED', repeated_field_encoding: 'PACKED', utf8_validation: 'VERIFY', a: { b: { c: { d_e: 'deeply_nested_true' } } } })

    test.end();
})
// Tests precedence for different levels of feature resolution
tape.test("feature resolution editions precedence", function(test) {

    protobuf.load("tests/data/feature-resolution.proto", function(err, root) {
        if (err)
            return test.fail(err.message);
        test.same(root._features.amazing_feature, 'A', "should");
        test.same(root.lookup("Message")._features.amazing_feature, 'B', "should")
        test.same(root.lookupEnum("SomeEnum")._features.amazing_feature, 'C', "should")
        test.same(root.lookup("Message").fields[".bar"].declaringField._features.amazing_feature, 'D', "should")
        test.same(root.lookupService("MyService")._features.amazing_feature, 'E', "should");
        test.same(root.lookup("Message").fields.stringRepeated._features.amazing_feature, 'F', "should")
        test.same(root.lookup("Message").lookupEnum("SomeEnumInMessage")._features.amazing_feature, 'G', "should")
        test.same(root.lookup("Message").lookup("Nested")._features.amazing_feature, 'H', "should")
        test.same(root.lookup("Message").lookup(".Message.bar")._features.amazing_feature, 'I', "should")
        test.same(root.lookup("Message").lookup("SomeOneOf")._features.amazing_feature, 'J', "should")
        test.same(root.lookupEnum("SomeEnum")._valuesFeatures["ONE"].amazing_feature, 'K', "should")
        test.same(root.lookupService("MyService").lookup("MyMethod")._features.amazing_feature, 'L', "should")

        test.end();    
    })
    // test.end();
})