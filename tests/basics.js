var tape = require("tape");

var protobuf = require("..");

tape.test("google.protobuf.Any type", function(test) {
    protobuf.load("tests/data/common.proto", function(err, root) {
        if (err)
            return test.fail(err.message);

        var Any = root.lookup("google.protobuf.Any");

        test.ok(Any instanceof protobuf.Type, "should extend Type");

        var valueBuffer = protobuf.util.newBuffer(0);
        var any = Any.create({
            type_url: "some.type",
            value: valueBuffer
        });

        test.test("instances", function(test) {

            test.ok(any instanceof protobuf.Message, "should extend Message");
            test.deepEqual(any, {
                type_url: "some.type",
                value: valueBuffer
            }, "should be populated with the contents we provided");

            var writer = Any.encode(any),
                buf,
                msg;

            function verifyEncode(test, buf) {
                test.equal(buf[0]    , 1 << 3 | 2, "a tag with id 1, wire type 2");
                test.equal(buf[1]    , 9         , "a field length of 9");
                test.equal(buf[11]   , 2 << 3 | 2, "a tag with id 2, wire type 2");
                test.equal(buf[12]   , 0         , "a field length of 0");
                test.equal(buf.length, 13        , "13 bytes in total");
            }

            test.test("should encode", function(test) {
                
                writer = Any.encode(any);
                buf = writer.finish();

                verifyEncode(test, buf);

                test.end();
            });

            test.test("should encode (fallback)", function(test) {
                
                writer = protobuf.codegen.encode.fallback.call(Any, any);
                buf = writer.finish();

                verifyEncode(test, buf);

                test.end();
            });

            test.test("should decode", function(test) {

                msg = Any.decode(buf);

                test.deepEqual(msg, any, "an equal message");

                test.end();
            });

            test.test("should decode (fallback)", function(test) {

                msg = protobuf.codegen.decode.fallback.call(Any, buf);

                test.deepEqual(msg, any, "an equal message");

                test.end();
            });

            test.test("should encodeDelimited", function(test) {

                writer = Any.encodeDelimited(any);
                buf = writer.finish();
                
                test.equal(buf[0]    , 13        , "a length of 13");
                test.equal(buf[1]    , 1 << 3 | 2, "a tag with id 1, wire type 2");
                test.equal(buf[2]    , 9         , "a field length of 9");
                test.equal(buf[12]   , 2 << 3 | 2, "a tag with id 2, wire type 2");
                test.equal(buf[13]   , 0         , "a field length of 0");
                test.equal(buf.length, 14        , "14 bytes in total");

                test.end();
            });

            test.test("should decodeDelimited", function(test) {

                msg = Any.decodeDelimited(buf);
                test.deepEqual(msg, any, "an equal message");

                test.end();
            });

            test.end();
        });

        test.end();

    });
});
