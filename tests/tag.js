var tape = require("tape");

var protobuf = require("..");

var root = protobuf.Root.fromJSON({
    nested: {
        Message: {
            fields: {
                val: {
                    type: "uint32",
                    id: 0x1FFFFFFF
                }
            }
        }
    }
});

tape.test("long tags", function(test) {

    var Message = root.lookup("Message");
    var message = { val: 1 };
    var buf = Message.encode(message).finish();
    
    test.equal(buf[0], 0xf8, "should write F8 (78)");
    test.equal(buf[1], 0xff, "should write FF (7F)");
    test.equal(buf[2], 0xff, "should write FF (7F)");
    test.equal(buf[3], 0xff, "should write FF (7F)");
    test.equal(buf[4], 0x0f, "should write 1111b");
    test.equal(buf[5], 1, "should write value 1");

    var comp = Message.decode(buf);
    test.deepEqual(comp, message, "should decode back the original data");

    test.end();
});
