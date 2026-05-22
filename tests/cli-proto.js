// Tests for pbjs proto text targets.

var tape = require("tape");
var protobuf = require("..");
var cliTest = require("./helpers/cli");

tape.test("proto3 roundtrip", function(test) {
    const proto = `syntax = "proto3";

message OptionalFields {

    optional SubMessage a = 1;
    optional string b = 2;
    repeated uint32 c = 3 [packed=false];
    uint32 d = 4;

    message SubMessage {

        string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(proto).root.resolveAll();
        var protoTarget = require("../cli/targets/proto3");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto);

            test.end();
        });
    });
});

tape.test("proto3 enum reserved max roundtrip", function(test) {
    const proto = `syntax = "proto3";

enum Values {

    ZERO = 0;
    OK = 1;

    reserved -2 to -1, 40 to max;
    reserved "OLD";
}`;
    cliTest(test, function() {
        var root = protobuf.parse(proto).root.resolveAll();
        var protoTarget = require("../cli/targets/proto3");

        protoTarget(root, {}, function(err, output) {
            test.error(err, "proto code generation worked");

            test.equal(output, proto);

            test.end();
        });
    });
});

tape.test("proto2 roundtrip", function(test) {
    const proto = `syntax = "proto2";

message OptionalFields {

    optional OptionalFields a = 1;
    required string b = 2;
    repeated uint32 c = 3 [packed=true];
    optional float d = 4 [default=0.1];
    optional group OptionalGroup = 5 {

        optional string a = 1;
    }
    repeated group RepeatedGroup = 6 {

        optional string a = 1;
    }
    required group RequiredGroup = 7 {

        optional string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(proto).root.resolveAll();
        var protoTarget = require("../cli/targets/proto2");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto);

            test.end();
        });
    });
});

tape.test("proto3 to proto2 valid", function(test) {
    const proto3 = `syntax = "proto3";

message OptionalFields {
    message SubMessage {
        optional string a = 1;
    }

    optional SubMessage a = 1;
    repeated int32 b = 2;
    repeated uint32 c = 3 [packed=false];

}`;
    const proto2 = `syntax = "proto2";

message OptionalFields {

    optional SubMessage a = 1;
    repeated int32 b = 2 [packed=true];
    repeated uint32 c = 3;

    message SubMessage {

        optional string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(proto3).root.resolveAll();
        var protoTarget = require("../cli/targets/proto2");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto2);

            test.end();
        });
    });
});

tape.test("proto2 to proto3 valid", function(test) {
    const proto2 = `syntax = "proto2";

message OptionalFields {
    message SubMessage {
        optional string a = 1;
    }

    optional SubMessage a = 1;
    repeated int32 b = 2;
    repeated uint32 c = 3 [packed=true];
}`;
    const proto3 = `syntax = "proto3";

message OptionalFields {

    optional SubMessage a = 1;
    repeated int32 b = 2 [packed=false];
    repeated uint32 c = 3;

    message SubMessage {

        optional string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(proto2).root.resolveAll();
        var protoTarget = require("../cli/targets/proto3");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto3);

            test.end();
        });
    });
});

tape.test("edition 2023 to proto2 valid", function(test) {
    const editions = `edition = "2023";
option features.repeated_field_encoding = EXPANDED;

message OptionalFields {
    message SubMessage {
        string a = 1 [features.field_presence = LEGACY_REQUIRED];
    }

    SubMessage a = 1;
    repeated int32 b = 2 [features.repeated_field_encoding = PACKED];
    repeated uint32 c = 3;
}`;
    const proto2 = `syntax = "proto2";

message OptionalFields {

    optional SubMessage a = 1;
    repeated int32 b = 2 [packed=true];
    repeated uint32 c = 3;

    message SubMessage {

        required string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(editions).root.resolveAll();
        var protoTarget = require("../cli/targets/proto2");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto2);

            test.end();
        });
    });
});

tape.test("edition 2023 to proto3 valid", function(test) {
    const editions = `edition = "2023";
option features.repeated_field_encoding = EXPANDED;

message OptionalFields {
    message SubMessage {
        string a = 1 [features.field_presence = IMPLICIT];
    }

    SubMessage a = 1;
    repeated int32 b = 2 [features.repeated_field_encoding = PACKED];
    repeated uint32 c = 3;
}`;
    const proto3 = `syntax = "proto3";

message OptionalFields {

    optional SubMessage a = 1;
    repeated int32 b = 2;
    repeated uint32 c = 3 [packed=false];

    message SubMessage {

        string a = 1;
    }
}`;
    cliTest(test, function() {
        var root = protobuf.parse(editions).root.resolveAll();
        var protoTarget = require("../cli/targets/proto3");

        protoTarget(root, {}, function(err, output) {
            test.error(err, 'proto code generation worked');

            test.equal(output, proto3);

            test.end();
        });
    });
});
