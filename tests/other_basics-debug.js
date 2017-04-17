/* var tape = require("tape");

var protobuf = require("../debug");

tape.test("google.protobuf.Any type", function(test) {
    protobuf.debug.enable();
    protobuf.load("tests/data/common.proto", function(err, root) {
        if (err)
            return test.fail(err.message);

        var google_protobuf = root.resolveAll().lookup("google.protobuf");
        test.ok(google_protobuf.Any, "should expose Any as a property on the reflected google.protobuf namespace");

        var Any = root.lookup("google.protobuf.Any");

        test.ok(Any instanceof protobuf.Type, "should extend Type");

        var valueBuffer = protobuf.util.newBuffer(1);
        valueBuffer[0] = 0;
        var any = Any.create({
            type_url: "some.type",
            value: valueBuffer
        });

        test.test(test.name + " - instances", function(test) {

            test.ok(any instanceof protobuf.Message, "should extend Message");
            test.deepEqual(any, {
                type_url: "some.type",
                value: valueBuffer
            }, "should be populated with the contents we provided");

            var writer = Any.encode(any),
                buf;

            function verifyEncode(test, buf) {
                test.equal(buf[0]    , 1 << 3 | 2, "a tag with id 1, wire type 2");
                test.equal(buf[1]    , 9         , "a field length of 9");
                test.equal(buf[11]   , 2 << 3 | 2, "a tag with id 2, wire type 2");
                test.equal(buf[12]   , 1         , "a field length of 1");
                test.equal(buf.length, 14        , "14 bytes in total");
            }

            test.test(test.name + " - should encode", function(test) {
                
                writer = Any.encode(any);
                buf = writer.finish();

                verifyEncode(test, buf);

                test.end();
            });

            test.test(test.name + " - should decode", function(test) {

                var msg = Any.decode(buf);

                test.deepEqual(msg, any, "an equal message");

                test.end();
            });

            test.test(test.name + " - should encodeDelimited", function(test) {

                writer = Any.encodeDelimited(any);
                buf = writer.finish();
                
                test.equal(buf[0]    , 14        , "a length of 14");
                test.equal(buf[1]    , 1 << 3 | 2, "a tag with id 1, wire type 2");
                test.equal(buf[2]    , 9         , "a field length of 9");
                test.equal(buf[12]   , 2 << 3 | 2, "a tag with id 2, wire type 2");
                test.equal(buf[13]   , 1         , "a field length of 1");
                test.equal(buf.length, 15        , "15 bytes in total");

                test.end();
            });

            test.test(test.name + " - should decodeDelimited", function(test) {

                var msg = Any.decodeDelimited(buf);
                test.deepEqual(msg, any, "an equal message");

                test.end();
            });

            test.test(test.name + " - debug", function(test) {
                var unused = protobuf.debug.unusedTypes(root).map(function(type) { return type.fullName; });
                test.same(unused, [
                    ".Something",
                    ".google.protobuf.Duration",
                    ".google.protobuf.Empty",
                    ".google.protobuf.Struct",
                    ".google.protobuf.Value",
                    ".google.protobuf.ListValue",
                    ".google.protobuf.Timestamp"
                ], "should recognize unused types (all but .google.protobuf.Any)");
                
                protobuf.debug.disable();
                test.end();
            });

            test.end();
        });

        test.end();

    });
}); */