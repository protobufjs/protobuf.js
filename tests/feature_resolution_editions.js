/*
edition = "2023";

option features.amazing_feature = A;
option (mo_single_msg).nested.value = "x";
service MyService {
    option features.amazing_feature = E;
    message MyRequest {};
    message MyResponse {};
    rpc MyMethod (MyRequest) returns (MyResponse) {
        option features.amazing_feature = L;
    };
}

message Message {
    option features.amazing_feature = B;

    string string_val = 1;
    string string_repeated = 2 [features.amazing_feature = F];

    uint64 uint64_val = 3;
    uint64 uint64_repeated = 4;

    bytes bytes_val = 5;
    bytes bytes_repeated = 6;

    SomeEnum enum_val = 7;
    SomeEnum enum_repeated = 8;

    extensions 10 to 100;
    extend Message {
        int32 bar = 10 [features.amazing_feature = I];
    }

    message Nested {
        option features.amazing_feature = H;
        int64 count = 9;
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
    int32 bar = 16 [features.amazing_feature = D];
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

tape.test("feature resolution defaults", function(test) {
    var rootEditions = protobuf.parse(protoEditions2023).root;
    rootEditions.resolveAll();
    test.same(rootEditions._features, editions2023Defaults);

    var rootProto2 = protobuf.parse(proto2).root;
    rootProto2.resolveAll();
    test.same(rootProto2._features, proto2Defaults);

    var rootProto3 = protobuf.parse(proto3).root;
    rootProto3.resolveAll();
    test.same(rootProto3._features, proto3Defaults);

    test.end();
})

tape.test("feature resolution inheritance file to message", function(test) {
    var rootEditionsOverriden = protobuf.parse(`edition = "2023";
    option features.json_format = LEGACY_BEST_EFFORT;
    option features.(abc).d_e = deeply_nested_false;

    message Message {
        string string_val = 1;
        string string_repeated = 2 [features.enum_type = CLOSED];
    }`).root.resolveAll();

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
    
    test.end();
});

tape.test("feature resolution inheritance message to field", function(test) {
    var rootEditionsOverriden = protobuf.parse(`edition = "2023";

    message Message {
        option features.json_format = LEGACY_BEST_EFFORT;
        option features.(abc).d_e = deeply_nested_false;
        string string_val = 1;
        string string_repeated = 2 [features.enum_type = CLOSED];
    }`).root.resolveAll();

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
    
    test.end();
});

tape.test("feature resolution inheritance message to nested message", function(test) {
    var rootEditionsOverriden = protobuf.parse(`edition = "2023"; 
    message Message {
        option features.json_format = LEGACY_BEST_EFFORT;
        option features.(abc).d_e = deeply_nested_false;
        string string_val = 1;
        string string_repeated = 2 [features.enum_type = CLOSED];

    message Nested {
        option features.(abc).d_e = deeply_nested_true;
        option features.field_presence = IMPLICIT;
        int64 count = 9;
    }
    }`).root.resolveAll();

    test.same(rootEditionsOverriden.lookup("Message").lookup("Nested")._features, {
        enum_type: 'OPEN',
        field_presence: 'IMPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'VERIFY',
        '(abc)': { d_e: 'deeply_nested_true' } 
    });
    test.end();
});

tape.test("feature resolution inheritance enum to enum value", function(test) {
    var rootEditionsOverriden = protobuf.parse(`edition = "2023";
    option features.json_format = LEGACY_BEST_EFFORT;

    option features.(abc).d_e = deeply_nested_false;
    message Message {
        enum SomeEnum {
            option features.field_presence = IMPLICIT;
            ONE = 1 [features.repeated_field_encoding = EXPANDED];
            TWO = 2;
        }
    }`).root.resolveAll();

    test.same(rootEditionsOverriden.lookupEnum("SomeEnum")._valuesFeatures["ONE"], {
        enum_type: 'OPEN',
        field_presence: 'IMPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'EXPANDED',
        utf8_validation: 'VERIFY',
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.same(rootEditionsOverriden.lookupEnum("SomeEnum")._valuesFeatures["TWO"], {
        enum_type: 'OPEN',
        field_presence: 'IMPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'VERIFY',
        '(abc)': { d_e: 'deeply_nested_false' } 
    });

    test.end();
});

tape.test("feature resolution inheritance message to oneofs", function(test) {

    var rootEditionsOverriden = protobuf.parse(`
    edition = "2023";
    option features.(abc).d_e = deeply_nested_false;
    message Message {
        option features.json_format = LEGACY_BEST_EFFORT;
        oneof SomeOneOf {
            int32 a = 13;
            string b = 14;
        }
    }`).root.resolveAll();

    test.same(rootEditionsOverriden.lookup("SomeOneOf")._features, {
        enum_type: 'OPEN',
        field_presence: 'EXPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'VERIFY',
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.end();
});


tape.test("feature resolution inheritance oneofs", function(test) {

    var rootEditionsOverriden = protobuf.parse(`
    edition = "2023";
    option features.(abc).d_e = deeply_nested_false;
    message Message {
        oneof SomeOneOf {
            option features.json_format = LEGACY_BEST_EFFORT;
            int32 a = 13;
            string b = 14 [features.json_format = ALLOW];
        }
    }`).root.resolveAll();

    test.same(rootEditionsOverriden.lookup("SomeOneOf")._features, {
        enum_type: 'OPEN',
        field_presence: 'EXPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'VERIFY',
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.same(rootEditionsOverriden.lookup("SomeOneOf").fieldsArray.find(x => x.name === 'b')._features, {
        enum_type: 'OPEN',
        field_presence: 'EXPLICIT',
        json_format: 'ALLOW',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'VERIFY',
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.end();
});

tape.test("feature resolution inheritance file to extensions", function(test) {

    var rootEditionsOverriden = protobuf.parse(`
    edition = "2023";
    option features.json_format = LEGACY_BEST_EFFORT;
    option features.(abc).d_e = deeply_nested_false;

    extend Message {
        int32 bar = 10 [features.utf8_validation = NONE];
    }
    message Message {
        option features.field_presence = IMPLICIT;
    }`).root.resolveAll();

    test.same(rootEditionsOverriden.lookup(".bar")._features, {
        enum_type: 'OPEN',
        field_presence: 'EXPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'NONE',
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.end();
});

tape.test("feature resolution inheritance message to extensions", function(test) {

    var rootEditionsOverriden = protobuf.parse(`
    edition = "2023";
    option features.json_format = LEGACY_BEST_EFFORT;
    option features.(abc).d_e = deeply_nested_false;

    message Message {
        option features.utf8_validation = NONE;
        extend Message {
            int32 bar = 10 [features.field_presence = IMPLICIT];
        }
    }`).root.resolveAll();

    test.same(rootEditionsOverriden.lookup(".bar")._features, {
        enum_type: 'OPEN',
        field_presence: 'IMPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'NONE',
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.end();
});

tape.test("feature resolution inheritance message to enum", function(test) {

    var rootEditionsOverriden = protobuf.parse(`edition = "2023";
    option features.json_format = LEGACY_BEST_EFFORT;
    option features.(abc).d_e = deeply_nested_false;
    message Message {
        option features.utf8_validation = NONE;
        enum SomeEnum {
            ONE = 1 [features.field_presence = IMPLICIT];
            TWO = 2;
        }
    }`).root.resolveAll();

    test.same(rootEditionsOverriden.lookup("Message").lookup("SomeEnum")._valuesFeatures["ONE"], {
        enum_type: 'OPEN',
        field_presence: 'IMPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'NONE',
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.same(rootEditionsOverriden.lookup("Message").lookup("SomeEnum")._features, {
        enum_type: 'OPEN',
        field_presence: 'EXPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'NONE',
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.end();
});

tape.test("feature resolution inheritance file to enum", function(test) {

    var rootEditionsOverriden = protobuf.parse(`edition = "2023";
    option features.json_format = LEGACY_BEST_EFFORT;
    option features.(abc).d_e = deeply_nested_false;
    enum SomeEnum {
        option features.utf8_validation = NONE;
        ONE = 1;
        TWO = 2;
    }`).root.resolveAll();

    test.same(rootEditionsOverriden.lookup("SomeEnum")._features, {
        enum_type: 'OPEN',
        field_presence: 'EXPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'NONE',
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.end();
});

tape.test("feature resolution inheritance file to service and service to method", function(test) {
    var rootEditionsOverriden = protobuf.parse(`edition = "2023";
    option features.json_format = LEGACY_BEST_EFFORT;
    option features.(abc).d_e = deeply_nested_false;
    service MyService {
        option features.field_presence = IMPLICIT;
        message MyRequest {};
        message MyResponse {};
        rpc MyMethod (MyRequest) returns (MyResponse) {
            option features.utf8_validation = NONE;
        };
    }`).root.resolveAll();

    test.same(rootEditionsOverriden.lookup("MyService")._features, {
        enum_type: 'OPEN',
        field_presence: 'IMPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'VERIFY',
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.same(rootEditionsOverriden.lookup("MyService").lookup("MyMethod")._features, {
        enum_type: 'OPEN',
        field_presence: 'IMPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'NONE',
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.end();
});

tape.test("feature resolution editions precedence", function(test) {
    protobuf.load("tests/data/feature-resolution.proto", function(err, root) {
        if (err)
            throw test.fail(err.message);

    test.same(root.lookup("Message").lookupEnum("SomeEnumInMessage")._features,
    {
        enum_type: 'CLOSED',
        field_presence: 'EXPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'EXPANDED',
        utf8_validation: 'NONE',
        amazing_feature: 'G'
      })
    test.end();    
    });
})
