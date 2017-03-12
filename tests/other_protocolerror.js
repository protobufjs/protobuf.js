var tape = require("tape");

var protobuf = require("..");

var ProtocolError = protobuf.util.ProtocolError;

tape.test("a protocol error", function(test) {

    test.ok(ProtocolError("test1") instanceof ProtocolError, "should construct by calling the constructor as a function");
    test.ok(new ProtocolError("test2") instanceof ProtocolError, "should construct by using the 'new' keyword");

    var root = new protobuf.Root().add(
        new protobuf.Type("Test").add(
            new protobuf.Field("foo", 1, "uint32", "optional")
        ).add(
            new protobuf.Field("bar", 2, "string", "required")
        )
    );
    
    var Test = root.lookup("Test");
    var buf  = protobuf.util.newBuffer(2);
    buf[0] = 1 << 3 | 0;
    buf[1] = 0x02;

    try {
        Test.decode(buf);
        test.fail("should be thrown if a message is missing required fields");
    } catch (e) {
        test.ok(e instanceof ProtocolError, "should be thrown if a message is missing required fields");
        test.ok(e.message, "should have an error message");
        test.ok(typeof e.stack === "string", "should have a stack trace (empty string if not supported)");
        test.equal(e.name, "ProtocolError", "should have the correct name");
        test.ok(/^ProtocolError: /.test(e.toString()), "should correctly convert toString");
        test.same(e.instance, {
            foo: 2
        }, "should still return the so far decoded message");
    }

    test.end();

});
