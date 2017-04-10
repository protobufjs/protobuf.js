var tape = require("tape");

var protobuf = require(".."),
    Message  = protobuf.Message;

tape.test("google.protobuf.Any class", function(test) {

    test.plan(1);

    protobuf.load("tests/data/common.proto", function(err, root) {
        if (err)
            return test.fail(err.message);

        function Any(properties) {
            Message.call(this, properties);
        }
        root.lookup("google.protobuf.Any").ctor = Any;

        var valueBuffer = protobuf.util.newBuffer(1);
        valueBuffer[0] = 0;
        var any = new Any({
            type_url: "some.type",
            value: valueBuffer
        });

        test.test(test.name + " - instances", function(test) {

            test.ok(any instanceof protobuf.Message, "should extend Message");
            test.ok(any instanceof Any, "should extend the custom class");
            test.deepEqual(any, {
                type_url: "some.type",
                value: valueBuffer
            }, "should be populated with the contents we provided");

            var buf;

            test.test(test.name + " - should encode", function(test) {

                buf = Any.encode(any).finish();

                test.equal(buf[0]    , 1 << 3 | 2, "a tag with id 1, wire type 2");
                test.equal(buf[1]    , 9         , "a field length of 9");
                test.equal(buf[11]   , 2 << 3 | 2, "a tag with id 2, wire type 2");
                test.equal(buf[12]   , 1         , "a field length of 1");
                test.equal(buf.length, 14        , "14 bytes in total");

                test.end();
            });

            test.test(test.name + " - should decode", function(test) {

                msg = Any.decode(buf);
                test.ok(msg instanceof Any, "to an object that extends the custom class");
                test.deepEqual(msg, any, "an equal message");

                test.end();
            });

            test.test(test.name + " - should encodeDelimited", function(test) {

                buf = Any.encodeDelimited(any).finish();

                test.equal(buf[0]    , 14        , "a length of 14");
                test.equal(buf[1]    , 1 << 3 | 2, "a tag with id 1, wire type 2");
                test.equal(buf[2]    , 9         , "a field length of 9");
                test.equal(buf[12]   , 2 << 3 | 2, "a tag with id 2, wire type 2");
                test.equal(buf[13]   , 1         , "a field length of 1");
                test.equal(buf.length, 15        , "15 bytes in total");

                test.end();
            });

            test.test(test.name + " - should decodeDelimited", function(test) {

                msg = Any.decodeDelimited(buf);
                test.ok(msg instanceof Any, "to an object that extends the custom class");
                test.deepEqual(msg, any, "an equal message");

                test.end();
            });

            test.end();
        });
    });
});
