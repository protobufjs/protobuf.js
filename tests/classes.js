var tap = require("tap");

var protobuf = require("..");

tap.test("google.protobuf.Any class", function(test) {
    var root = new protobuf.Root();

    function Any(properties) {
        protobuf.Prototype.call(this, properties);
    }
    protobuf.Prototype.extend(Any, root.lookup("google.protobuf.Any"));

    var valueBuffer;
    var any = new Any({
        type_url: "some.type",
        value: valueBuffer = Buffer.alloc(0)
    });

    test.test("instances", function(test) {

        test.ok(any instanceof protobuf.Prototype, "should extend Prototype");
        test.ok(any instanceof Any, "should extend the custom class");
        test.deepEqual(any, {
            type_url: "some.type",
            value: valueBuffer
        }, "should be populated with the contents we provided");

        var buf;

        test.test("should encode", function(test) {

            buf = Any.encode(any);
            test.ok(Buffer.isBuffer(buf)     , "to a Buffer");

            test.equal(buf[0]    , 1 << 3 | 2, "a tag with id 1, wire type 2");
            test.equal(buf[1]    , 9         , "a field length of 9");
            test.equal(buf[11]   , 2 << 3 | 2, "a tag with id 2, wire type 2");
            test.equal(buf[12]   , 0         , "a field length of 0");
            test.equal(buf.length, 13        , "13 bytes in total");

            test.end();
        });

        test.test("should encodeDelimited", function(test) {

            buf = Any.encodeDelimited(any);
            test.ok(Buffer.isBuffer(buf)     , "to a Buffer");

            test.equal(buf[0]    , 13        , "a length of 13");
            test.equal(buf[1]    , 1 << 3 | 2, "a tag with id 1, wire type 2");
            test.equal(buf[2]    , 9         , "a field length of 9");
            test.equal(buf[12]   , 2 << 3 | 2, "a tag with id 2, wire type 2");
            test.equal(buf[13]   , 0         , "a field length of 0");
            test.equal(buf.length, 14        , "14 bytes in total");

            test.end();
        });

        test.end();
    });

    test.end();
});
