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


tape.test("feature resolution editions", function(test) {

    protobuf.load("tests/data/feature-resolution.proto", function(err, root) {
        if (err)
            return test.fail(err.message);
        test.same(root.features.amazing_feature, 'A');
        test.same(root.lookup("Message").features.amazing_feature, 'B')
        test.same(root.lookupEnum("SomeEnum").features.amazing_feature, 'C')
        test.same(root.deferred[0].features.amazing_feature, 'D')
        test.same(root.lookupService("MyService").features.amazing_feature, 'E');
        test.same(root.lookup("Message").fields.stringRepeated.features.amazing_feature, 'F')
        test.same(root.lookup("Message").lookupEnum("SomeEnumInMessage").features.amazing_feature, 'G')
        test.same(root.lookup("Message").lookup("Nested").features.amazing_feature, 'H')
        test.same(root.lookup("Message").lookup(".Message.bar").features.amazing_feature, 'I')
        test.same(root.lookup("Message").lookup("SomeOneOf").features.amazing_feature, 'J')
        test.same(root.lookupEnum("SomeEnum").valuesFeatures.ONE.amazing_feature, 'K')
        test.same(root.lookupService("MyService").lookup("MyMethod").features.amazing_feature, 'L')
        
        test.end();    
    })
})
