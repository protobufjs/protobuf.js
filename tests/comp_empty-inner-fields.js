var tape = require("tape");

var protobuf = require("..");

tape.test("empty inner fields", function(test) {
    var root = protobuf.Root.fromJSON({
        nested: {
            Inner: {
                fields: {
                }
            },
            Outer: {
                oneofs: {
                    child: {
                        oneof: ["inner"]
                    }
                },
                fields: {
                    inner: {
                        id: 1,
                        type: "Inner"
                    }
                }
            }
        }
    });
    var Outer = root.lookup("Outer");
    var msg = Outer.fromObject({
        inner: {}
    });
    var buf = Outer.encode(msg).finish();
    test.equal(buf.length, 2, "should always be present on the wire");
    test.equal(buf[0], 1 << 3 | 2, "should write id 1, wireType 2");
    test.equal(buf[1], 0, "should write a length of 0");
    test.end();
});