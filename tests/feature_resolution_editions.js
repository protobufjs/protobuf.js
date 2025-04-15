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

var protoEditions2024 = `edition = "2024";  message Foo {}`;
var protoEditions2023 = `edition = "2023";  message Foo {}`;

var proto2 = `syntax = "proto2";  message Foo {}`;

var proto3 = `syntax = "proto3";  message Foo {}`;

var editions2024Defaults = {enum_type: "OPEN", field_presence: "EXPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY", enforce_naming_style: "STYLE2024", default_symbol_visibility: "EXPORT_TOP_LEVEL" };
var editions2023Defaults = {enum_type: "OPEN", field_presence: "EXPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY", enforce_naming_style: "STYLE_LEGACY", default_symbol_visibility: "EXPORT_ALL" };
var proto2Defaults = {enum_type: "CLOSED", field_presence: "EXPLICIT", json_format: "LEGACY_BEST_EFFORT", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "EXPANDED", utf8_validation: "NONE", enforce_naming_style: "STYLE_LEGACY", default_symbol_visibility: "EXPORT_ALL" };
var proto3Defaults = {enum_type: "OPEN", field_presence: "IMPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY", enforce_naming_style: "STYLE_LEGACY", default_symbol_visibility: "EXPORT_ALL" };

tape.test("feature resolution defaults", function(test) {
    var rootEditions = protobuf.parse(protoEditions2024).root;
    rootEditions.resolveAll();
    test.same(rootEditions.Foo._features, editions2024Defaults);

    var rootProto2 = protobuf.parse(proto2).root;
    rootProto2.resolveAll();
    test.same(rootProto2.Foo._features, proto2Defaults);

    var rootProto3 = protobuf.parse(proto3).root;
    rootProto3.resolveAll();
    test.same(rootProto3.Foo._features, proto3Defaults);

    test.end();
})

tape.test("unresolved feature options", function(test) {
    var root = protobuf.parse(`edition = "2023";
    option features.json_format = LEGACY_BEST_EFFORT;
    option features.(abc).d_e = deeply_nested_false;

    message Message {
        option features.enum_type = CLOSED;
        string string_val = 1;
        string string_repeated = 2;
    }`).root.resolveAll();

    test.same(root.lookup("Message").options.features, {
        "enum_type": "CLOSED",
        "json_format": "LEGACY_BEST_EFFORT",
        "(abc)": { "d_e": "deeply_nested_false" },
    });

    test.end();
});

tape.test("aggregate feature parsing", function(test) {
    var rootEditionsOverriden = protobuf.parse(`edition = "2023";
    option features = {
        utf8_validation: VERIFY
        json_format: LEGACY_BEST_EFFORT
        field_presence: IMPLICIT
    };

    message Message {
        option features = {
            utf8_validation: NONE
            enum_type: OPEN
        };
        string string_val = 1;
        string string_repeated = 2 [features = { enum_type: CLOSED field_presence: LEGACY_REQUIRED }];
    }`).root.resolveAll();

    test.same(rootEditionsOverriden.lookup("Message").fields.stringRepeated._features, {
        enum_type: 'CLOSED',
        field_presence: 'LEGACY_REQUIRED',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'NONE',
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL"
    })
    
    test.end();
});

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
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
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
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
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
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
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
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.same(rootEditionsOverriden.lookupEnum("SomeEnum")._valuesFeatures["TWO"], {
        enum_type: 'OPEN',
        field_presence: 'IMPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'VERIFY',
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
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
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
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
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
        '(abc)': { d_e: 'deeply_nested_false' }
    })

    test.same(rootEditionsOverriden.lookup("SomeOneOf").fieldsArray.find(x => x.name === 'b')._features, {
        enum_type: 'OPEN',
        field_presence: 'EXPLICIT',
        json_format: 'ALLOW',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'VERIFY',
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
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
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
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
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
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
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.same(rootEditionsOverriden.lookup("Message").lookup("SomeEnum")._features, {
        enum_type: 'OPEN',
        field_presence: 'EXPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'NONE',
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
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
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
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
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
        '(abc)': { d_e: 'deeply_nested_false' } 
    })

    test.same(rootEditionsOverriden.lookup("MyService").lookup("MyMethod")._features, {
        enum_type: 'OPEN',
        field_presence: 'IMPLICIT',
        json_format: 'LEGACY_BEST_EFFORT',
        message_encoding: 'LENGTH_PREFIXED',
        repeated_field_encoding: 'PACKED',
        utf8_validation: 'NONE',
        enforce_naming_style: "STYLE_LEGACY",
        default_symbol_visibility: "EXPORT_ALL",
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
            enum_type: 'OPEN',
            field_presence: 'EXPLICIT',
            json_format: 'ALLOW',
            message_encoding: 'LENGTH_PREFIXED',
            repeated_field_encoding: 'PACKED',
            utf8_validation: 'VERIFY',
            enforce_naming_style: "STYLE_LEGACY",
            default_symbol_visibility: "EXPORT_ALL",
            amazing_feature: 'G'
        })
        test.end();
    });
});

tape.test("feature resolution extension sister", function(test) {
    var root = protobuf.parse(`edition = "2023";
        message A {
            message B {
                message One {
                    extensions 1000 to max;
                    reserved 900 to 999, 899, a, b;
                }
            }
            message C {
                option features.repeated_field_encoding = EXPANDED;
                message Two {
                    extend B.One {
                        repeated int32 ext = 1000 [features.fake = 2];
                    }
                }
            }
    }`).root.resolveAll();
    var extension = root.lookup("A.C.Two").nested.ext;
    var sister = root.lookup("A.B.One").fields[".A.C.Two.ext"];

    test.notOk(extension.packed);
    test.notOk(sister.packed);
    test.equal(extension._features.repeated_field_encoding, "EXPANDED");
    test.equal(extension._features.fake, 2);
    test.equal(sister._features.repeated_field_encoding, "EXPANDED");
    test.equal(sister._features.fake, 2);

    test.end();
});

tape.test("feature resolution inferred proto2 repeated encoding", function(test) {
    var root = protobuf.parse(`syntax = "proto2";
    message Message {
        repeated int32 default = 1;
        repeated int32 packed = 2 [packed = true];
        repeated int32 unpacked = 3 [packed = false];
    }`).root.resolveAll();

    var msg = root.lookup("Message");
    test.notOk(msg.fields.default.packed)
    test.equal(msg.fields.default._features.repeated_field_encoding, "EXPANDED")
    test.ok(msg.fields.packed.packed)
    test.equal(msg.fields.packed._features.repeated_field_encoding, "PACKED")
    test.notOk(msg.fields.unpacked.packed)
    test.equal(msg.fields.unpacked._features.repeated_field_encoding, "EXPANDED")

    test.end();
});

tape.test("feature resolution inferred proto3 repeated encoding", function(test) {
    var root = protobuf.parse(`syntax = "proto3";
    message Message {
        repeated int32 default = 1;
        repeated int32 packed = 2 [packed = true];
        repeated int32 unpacked = 3 [packed = false];
    }`).root.resolveAll();

    var msg = root.lookup("Message");
    test.ok(msg.fields.default.packed)
    test.equal(msg.fields.default._features.repeated_field_encoding, "PACKED")
    test.ok(msg.fields.packed.packed)
    test.equal(msg.fields.packed._features.repeated_field_encoding, "PACKED")
    test.notOk(msg.fields.unpacked.packed)
    test.equal(msg.fields.unpacked._features.repeated_field_encoding, "EXPANDED")

    test.end();
});


tape.test("feature resolution inferred proto2 presence", function(test) {
    var root = protobuf.parse(`syntax = "proto2";
    message Message {
        optional int32 default = 1;
        required int32 required = 2;
        repeated int32 repeated = 3;
    }`).root.resolveAll();

    var msg = root.lookup("Message");
    test.ok(msg.fields.default.optional);
    test.notOk(msg.fields.default.required);
    test.ok(msg.fields.default.hasPresence);
    test.notOk(msg.fields.required.optional);
    test.ok(msg.fields.required.required);
    test.equal(msg.fields.required._features.field_presence, "LEGACY_REQUIRED");
    test.notOk(msg.fields.repeated.hasPresence, "repeated fields never have presence");

    test.end();
});

tape.test("feature resolution mixed syntax different package", function(test) {
    var root = protobuf.parse(`syntax = "proto2";
    package proto2;
    message Message {
        optional int32 default = 1;
        required int32 required = 2;
        repeated int32 unpacked = 3;
    }`).root;
    protobuf.parse(`syntax = "proto3";
    package proto3;
    message Message {
        optional int32 explicit = 1;
        int32 implicit = 2;
        repeated int32 packed = 3;
    }`, root);
    root.resolveAll();

    var proto2 = root.lookup("proto2.Message");
    test.ok(proto2.fields.default.hasPresence, "proto2 uses explicit presence");
    test.ok(proto2.fields.required.required, "proto2 has required fields");
    test.notOk(proto2.fields.unpacked.packed, "proto2 is expanded by default");

    var proto3 = root.lookup("proto3.Message");
    test.ok(proto3.fields.explicit.hasPresence, "proto3 optional has explicit presence");
    test.notOk(proto3.fields.implicit.hasPresence, "proto3 is implicit presence by default");
    test.ok(proto3.fields.packed.packed, "proto3 is packed by default");

    test.end();
});

tape.test("feature resolution mixed file features different package", function(test) {
    var root = protobuf.parse(`edition = "2023";
    package expanded;
    option features.repeated_field_encoding = EXPANDED;
    message Message {
        repeated int32 expanded = 1;
        repeated int32 packed = 2 [features.repeated_field_encoding = PACKED];
    }`).root;
    protobuf.parse(`edition = "2023";
    package packed;
    option features.repeated_field_encoding = PACKED;
    message Message {
        repeated int32 packed = 1;
        repeated int32 expanded = 2 [features.repeated_field_encoding = EXPANDED];
    }`, root);
    root.resolveAll();

    var expanded = root.lookup("expanded.Message");
    test.notOk(expanded.fields.expanded.packed, "expanded by default");
    test.ok(expanded.fields.packed.packed, "packed override");

    var packed = root.lookup("packed.Message");
    test.ok(packed.fields.packed.packed, "packed by default");
    test.notOk(packed.fields.expanded.packed, "expanded override");

    test.end();
});

tape.test("feature resolution mixed file features same package", function(test) {
    var root = protobuf.parse(`edition = "2023";
    option features.repeated_field_encoding = EXPANDED;
    message Message1 {
        repeated int32 expanded = 1;
        int32 explicit = 2;
    }`).root;
    protobuf.parse(`edition = "2023";
    option features.field_presence = IMPLICIT;
    message Message2 {
        repeated int32 packed = 1;
        int32 implicit = 3;
    }`, root);
    root.resolveAll();

    var msg1 = root.lookup("Message1");
    test.notOk(msg1.fields.expanded.packed, "expanded by default");
    test.ok(msg1.fields.explicit.hasPresence, "explicit by default");

    var msg2 = root.lookup("Message2");
    test.ok(msg2.fields.packed.packed, "packed by default");
    test.notOk(msg2.fields.implicit.hasPresence, "implicit by default");

    test.end();
});

tape.test("feature resolution mixed file features same package", function(test) {
    var root = protobuf.parse(`edition = "2023";
    option features.repeated_field_encoding = EXPANDED;
    message Message1 {
        repeated int32 expanded = 1;
        repeated int32 packed = 2 [features.repeated_field_encoding = PACKED];
    }`).root;
    protobuf.parse(`edition = "2023";
    option features.repeated_field_encoding = PACKED;
    message Message2 {
        repeated int32 packed = 1;
        repeated int32 expanded = 2 [features.repeated_field_encoding = EXPANDED];
    }`, root);
    root.resolveAll();

    var expanded = root.lookup("Message1");
    test.notOk(expanded.fields.expanded.packed, "expanded by default");
    test.ok(expanded.fields.packed.packed, "packed override");

    var packed = root.lookup("Message2");
    test.ok(packed.fields.packed.packed, "packed by default");
    test.notOk(packed.fields.expanded.packed, "expanded override");

    test.end();
});

tape.test("feature resolution mixed syntax same package", function(test) {
    var root = protobuf.parse(`syntax = "proto2";
    message Message2 {
        optional int32 default = 1;
        required int32 required = 2;
        repeated int32 unpacked = 3;
    }`).root;
    protobuf.parse(`syntax = "proto3";
    message Message3 {
        optional int32 explicit = 1;
        int32 implicit = 2;
        repeated int32 packed = 3;
    }`, root);
    root.resolveAll();

    var proto2 = root.lookup("Message2");
    test.ok(proto2.fields.default.hasPresence, "proto2 uses explicit presence");
    test.ok(proto2.fields.required.required, "proto2 has required fields");
    test.notOk(proto2.fields.unpacked.packed, "proto2 is expanded by default");

    var proto3 = root.lookup("Message3");
    test.ok(proto3.fields.explicit.hasPresence, "proto3 optional has explicit presence");
    test.notOk(proto3.fields.implicit.hasPresence, "proto3 is implicit presence by default");
    test.ok(proto3.fields.packed.packed, "proto3 is packed by default");

    test.end();
});

