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

option features.(abc).d_e = deeply_nested_false;

message Message {
    string string_val = 1;
    string string_repeated = 2 [features.enum_type = CLOSED];

    message Nested {
        option features.(abc).d_e = deeply_nested_true;
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
    console.log(rootEditionsOverriden._features)

    // Should flip enum_type from default setting, inherit from Message,
    // and keep everything else
    test.same(rootEditionsOverriden.lookup("Message").fields.stringRepeated._features, {
        enum_type: 'CLOSED',
        field_presence: 'EXPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'VERIFY',
        '(abc)': { d_e: 'deeply_nested_false' }
      })

    // Should inherit from default, and Message, only change field_presence and the custom extension
    test.same(rootEditionsOverriden.lookup("Message").lookup("Nested")._features, 
    { enum_type: 'OPEN', field_presence: 'IMPLICIT', json_format: 'LEGACY_BEST_EFFORT', message_encoding: 'LENGTH_PREFIXED', repeated_field_encoding: 'PACKED', utf8_validation: 'VERIFY', '(abc)': { d_e: 'deeply_nested_true' } })

    test.end();
})
// Tests precedence for different levels of feature resolution
tape.test("feature resolution editions precedence", function(test) {

    protobuf.load("tests/data/feature-resolution.proto", function(err, root) {
        if (err)
            return test.fail(err.message);
        test.same(root._features.amazing_feature, 'A');
        test.same(root.lookup("Message")._features.amazing_feature, 'B')
        test.same(root.lookupEnum("SomeEnum")._features.amazing_feature, 'C')
        test.same(root.lookup("Message").fields[".bar"].declaringField._features.amazing_feature, 'D')
        test.same(root.lookupService("MyService")._features.amazing_feature, 'E');
        test.same(root.lookup("Message").fields.stringRepeated._features.amazing_feature, 'F')
        test.same(root.lookup("Message").lookupEnum("SomeEnumInMessage")._features.amazing_feature, 'G')
        test.same(root.lookup("Message").lookup("Nested")._features.amazing_feature, 'H')
        test.same(root.lookup("Message").lookup(".Message.bar")._features.amazing_feature, 'I')
        test.same(root.lookup("Message").lookup("SomeOneOf")._features.amazing_feature, 'J')
        test.same(root.lookupEnum("SomeEnum")._valuesFeatures["ONE"].amazing_feature, 'K')
        test.same(root.lookupService("MyService").lookup("MyMethod")._features.amazing_feature, 'L')

        test.end();    
    })
})