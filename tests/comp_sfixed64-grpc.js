var tape = require("tape");

var protobuf = require("..");

tape.test("sfixed64 (grpc)", function(test) {

    var root = protobuf.Root.fromJSON({
        nested: {
            test: {
                nested: {
                    Test: {
                        fields: {
                            int_64: {
                                type: 'sfixed64',
                                id: 1
                            }
                        }
                    }
                }
            }
        }
    });

    var Test = root.lookup("test.Test");

    var buffer = Test.encode({
        int_64: '-9095674951825889465'
    }).finish();

    test.equal(buffer.length, 9, "should encode a total of 9 bytes");
    test.equal(buffer[0], 9, "should encode id 1, wireType 1");

    var decoded = Test.decode(buffer);
    test.ok(decoded.int_64 == '-9095674951825889465', "should decode back the original value");

    test.end();

});
