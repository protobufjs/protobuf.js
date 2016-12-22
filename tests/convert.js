var tape = require("tape");
var protobuf  = require("..");

tape.test("convert", function(test) {

    protobuf.load("tests/data/convert.proto", function(err, root) {
        if (err)
            return test.fail(err.message);

        var Message = root.lookup("Message");

        test.test("Message#asJSON", function(test) {

            test.test("called with defaults = true", function(test) {
                var obj = Message.create().asJSON({ defaults: true });

                test.equal(obj.stringVal, "", "should set stringVal");
                test.same(obj.stringRepeated, [], "should set stringRepeated");

                test.same(obj.uint64Val, { low: 0, high: 0, unsigned: true }, "should set uint64Val");
                test.same(obj.uint64Repeated, [], "should set uint64Repeated");

                test.same(obj.bytesVal, protobuf.util.newBuffer(0), "should set bytesVal");
                test.same(obj.bytesRepeated, [], "should set bytesRepeated");

                test.equal(obj.enumVal, 0, "should set enumVal");
                test.same(obj.enumRepeated, [], "should set enumRepeated");

                test.end();
            });

            test.test("called with defaults = undefined", function(test) {
                var obj = Message.create().asJSON();

                test.equal(obj.stringVal, undefined, "should not set stringVal");
                test.equal(obj.stringRepeated, undefined, "should not set stringRepeated");

                test.equal(obj.uint64Val, undefined, "should not set uint64Val");
                test.equal(obj.uint64Repeated, undefined, "should not set uint64Repeated");

                test.equal(obj.bytesVal, undefined, "should not set bytesVal");
                test.equal(obj.bytesRepeated, undefined, "should not set bytesRepeated");

                test.equal(obj.enumVal, undefined, "should not set enumVal");
                test.equal(obj.enumRepeated, undefined, "should not set enumRepeated");

                test.end();
            });

            test.test("should convert", function(test) {
                var buf = protobuf.util.newBuffer(3);
                buf[0] = buf[1] = buf[2] = 49; // "111"
                var msg = Message.create({
                    uint64Val: protobuf.util.Long.fromNumber(1),
                    uint64Repeated: [2, 3],
                    bytesVal: buf,
                    bytesRepeated: [buf, buf],
                    enumVal: 1,
                    enumRepeated: [1, 2]
                });

                test.equal(msg.asJSON({ long: Number }).uint64Val, 1, "longs to numbers");
                test.equal(msg.asJSON({ long: String }).uint64Val, "1", "longs to strings");

                test.equal(Object.prototype.toString.call(msg.asJSON({ bytes: Array }).bytesVal), "[object Array]", "bytes to arrays");
                test.equal(msg.asJSON({ bytes: String }).bytesVal, "MTEx", "bytes to base64 strings");
                if (protobuf.util.isNode)
                    test.ok(Buffer.isBuffer(msg.asJSON({ bytes: Buffer }).bytesVal), "bytes to buffers");

                test.equal(msg.asJSON({ enum: String }).enumVal, "ONE", "enums to strings");

                test.end();
            });

            test.end();
        });

        test.test("Message.from", function(test) {
           
            var msg = Message.from({
                uint64Val: 1,
                uint64Repeated: [1, "2"],
                bytesVal: "MTEx",
                bytesRepeated: ["MTEx", [49, 49, 49]],
                enumVal: "ONE",
                enumRepeated: [2, "TWO"]
            });
            var buf = protobuf.util.newBuffer(3);
            buf[0] = buf[1] = buf[2] = 49; // "111"

            test.same(msg.uint64Val, { low: 1, high: 0, unsigned: true }, "should set uint64Val from a number");
            test.same(msg.uint64Repeated, [ { low: 1, high: 0, unsigned: true}, { low: 2, high: 0, unsigned: true } ], "should set uint64Repeated from a number and a string");
            test.same(msg.bytesVal, buf, "should set bytesVal from a base64 string");
            test.same(msg.bytesRepeated, [ buf, buf ], "should set bytesRepeated from a base64 string and a plain array");
            test.equal(msg.enumVal, 1, "should set enumVal from a string");
            test.same(msg.enumRepeated, [ 2, 2 ], "should set enumRepeated from a number and a string");

            test.end();
        });
        
        test.end();
    });

});
