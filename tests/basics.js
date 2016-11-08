var tap = require("tap");

var protobuf = require(".."),
    codegen  = require(__dirname + "/../src/codegen");

codegen.verbose = true;

tap.test("google.protobuf.Any type", function(test) {
    var root = new protobuf.Root(),
        Any = root.lookup("google.protobuf.Any");

    test.ok(Any instanceof protobuf.Type, "should extend Type");

    var valueBuffer;
    var any = Any.create({
        type_url: "some.type",
        value: valueBuffer = Buffer.alloc ? Buffer.alloc(0) : new Buffer(0)
    });

    test.test("instances", function(test) {

        test.ok(any instanceof protobuf.Prototype, "should extend Prototype");
        test.deepEqual(any.$values, {
            type_url: "some.type",
            value: valueBuffer
        }, "should be populated with the contents we provided");

        var writer = Any.encode(any),
            buf,
            msg;

        test.test("should encode", function(test) {
            
            writer = Any.encode(any, new protobuf.BufferWriter());
            test.type(writer, protobuf.BufferWriter, "using a BufferWriter");
            buf = writer.finish();

            test.type(buf, Buffer, "to a Buffer");

            test.equal(buf[0]    , 1 << 3 | 2, "a tag with id 1, wire type 2");
            test.equal(buf[1]    , 9         , "a field length of 9");
            test.equal(buf[11]   , 2 << 3 | 2, "a tag with id 2, wire type 2");
            test.equal(buf[12]   , 0         , "a field length of 0");
            test.equal(buf.length, 13        , "13 bytes in total");

            test.end();
        });

        test.test("should decode", function(test) {

            msg = Any.decode(buf);
            test.deepEqual(msg, any, "an equal message");

            test.end();
        });

        test.test("should encodeDelimited", function(test) {

            writer = Any.encodeDelimited(any, new protobuf.Writer());
            test.ok(writer instanceof protobuf.Writer && !(writer instanceof protobuf.BufferWriter), "using a Writer");
            buf = writer.finish();

            test.ok(buf instanceof Uint8Array && !Buffer.isBuffer(buf), "to an Uint8Array");
            
            test.equal(buf[0]    , 13        , "a length of 13");
            test.equal(buf[1]    , 1 << 3 | 2, "a tag with id 1, wire type 2");
            test.equal(buf[2]    , 9         , "a field length of 9");
            test.equal(buf[12]   , 2 << 3 | 2, "a tag with id 2, wire type 2");
            test.equal(buf[13]   , 0         , "a field length of 0");
            test.equal(buf.length, 14        , "14 bytes in total");

            test.end();
        });

        test.test("should decodeDelimited", function(test) {

            any.value = new Uint8Array(0); // in node 0.12 buffers aren't typed arrays
            msg = Any.decodeDelimited(buf);
            test.deepEqual(msg, any, "an equal message");

            test.end();
        });

        test.end();
    });

    test.end();
});

codegen.verbose = false;
