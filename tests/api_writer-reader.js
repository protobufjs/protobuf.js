var tape = require("tape");

var protobuf = require("..");

var Writer = protobuf.Writer,
    Reader = protobuf.Reader;

tape.test("writer & reader", function(test) {

    test.throws(function() {
        Reader.create(1);
    }, "should throw when creating a Reader from something else than a buffer");

    test.doesNotThrow(function() {
        Reader.create([]);
    }, "should not throw when creating a Reader from an array (comp)");

    // uint32, int32, sint32

    var values = [
        [ 0, [ 0 ] ],
        [ 127, [ 127 ] ],
        [ 128, [ 128, 1] ],
        [ 16383, [ 255, 127 ] ],
        [ 16384, [ 128, 128, 1] ],
        [ 2097151, [ 255, 255, 127 ] ],
        [ 2097152, [ 128, 128, 128, 1 ] ],
        [ 268435455, [ 255, 255, 255, 127 ] ],
        [ 268435456, [ 128, 128, 128, 128, 1 ] ],
        [ 2147483647, [ 255, 255, 255, 255, 7 ] ]
    ];
    values.forEach(function(val) {
         test.ok(expect("uint32", val[0] >>> 0, val[1]), "should write " + val[0] + " as an unsigned varint of length " + val[1].length + " and read it back equally");
         test.ok(expect("int32", val[0] | 0, val[1]), "should write " + val[0] + " as a signed varint of length " + val[1].length + " and read it back equally");
         var zzBaseVal = val[0] >>> 1 ^ -(val[0] & 1) | 0;
         test.ok(expect("sint32", zzBaseVal, val[1]), "should write " + zzBaseVal + " as a signed zig-zag encoded varint of length " + val[1].length + " and read it back equally");
    });

    test.ok(expect("uint32", -1 >>> 0, [ 255, 255, 255, 255, 15 ]), "should write -1 as an unsigned varint of length 5");
    test.ok(expect("int32", -1, [ 255, 255, 255, 255, 255, 255, 255, 255, 255, 1 ]), "should write -1 as a signed varint of length 10");
    test.ok(expect("sint32", -1, [ 1 ]), "should write -1 as a signed zig-zag encoded varint of length 1");

    // fixed32, sfixed32

    if (typeof Uint32Array !== "undefined")
        values.forEach(function(val) {
            // the same for all sorts of writers anyway

            var buffer = Writer.create().fixed32(val[0]).finish();
            var comp = new Uint8Array(new Uint32Array([ val[0] ]).buffer);
            test.same(Array.prototype.slice.call(buffer), Array.prototype.slice.call(comp), "should write " + val[0] + " as fixed 32 bits");
            test.equal(Reader.create(buffer).fixed32(), val[0], "should read back "+ val[0] + " equally");

            var signedVal = val[0] | 0;
            buffer = Writer.create().sfixed32(signedVal).finish();
            comp = new Uint8Array(new Uint32Array([ val[0] ]).buffer);
            test.same(Array.prototype.slice.call(buffer), Array.prototype.slice.call(comp), "should write " + signedVal + " as fixed 32 bits (signed)");
            test.equal(Reader.create(buffer).sfixed32(), signedVal, "should read back "+ signedVal + " equally");
        });

    test.ok(expect("fixed32", 4294967295, [ 255, 255, 255, 255 ]), "should write 4294967295 as fixed 32 bits");
    test.ok(expect("fixed32", 4294967294, [ 254, 255, 255, 255 ]), "should write 4294967294 as fixed 32 bits");
    test.ok(expect("sfixed32", -1, [ 255, 255, 255, 255 ]), "should write -1 as fixed 32 bits (signed)");
    test.ok(expect("sfixed32", -2, [ 254, 255, 255, 255 ]), "should write -2 as fixed 32 bits (signed)");

    // uint64, int64, sint64

    protobuf.util.merge(values, [
        [ 549755813887, [ 255, 255, 255, 255, 255, 15 ] ],
        [ 140737488355327, [ 255, 255, 255, 255, 255, 255, 31 ] ]
    ]);

    test.ok(protobuf.util.Long, "should use long.js");
    values.forEach(function(val) {
        var longVal = protobuf.util.Long.fromNumber(val[0], false);
        
        test.ok(expect("uint64", longVal, val[1]), "should write " + longVal + " as an unsigned varint of length " + val[1].length + " and read it back equally");
        test.ok(expect("int64", longVal, val[1]), "should write " + longVal + " as a signed varint of length " + val[1].length + " and read it back equally");
        var zzBaseVal = longVal.shru(1).xor(longVal.and(1).negate());
        test.ok(expect("sint64", zzBaseVal, val[1]), "should write " + zzBaseVal + " as a signed zig-zag encoded varint of length " + val[1].length + " and read it back equally");
    });

    // fixed64, sfixed64 -> see also see comp_fixed/sfixed64 (grpc)

    // TODO

    // float, double -> see comp_float

    // bool

    test.ok(expect("bool", true, [1]), "should write true as a varint of length 1 and read it back equally");
    test.ok(expect("bool", false, [0]), "should write false as a varint of length 1 and read it back equally");

    // string, see also lib_utf8

    test.ok(expect("string", "123", [3,49,50,51]), "should write \"123\" as a string prefixed with its length as a varint and read it back equally");
    test.ok(expect("string", "", [0]), "should write \"\" as a string prefixed with its length as a varint and read it back equally");

    // bytes

    test.ok(expect("bytes", [1,2,3], [3,1,2,3]), "should write [1,2,3] as bytes prefixed with its length as a varint and read it back equally");
    test.ok(expect("bytes", [], [0]), "should write [] as bytes prefixed with its length as a varint and read it back equally");
    test.ok(expect("bytes", "MTIz", [3,49,50,51]), "should write MTIz as bytes prefixed with its length as a varint and read it back equally");

    // skipType

    test.test(test.name + " - should allow to skip", function(test) {
        var reader = Reader.create(Writer.create()
            .uint32(1)
            .double(0.1)
            .string("123")
            .uint32(1 << 3 | 1).double(0.1).uint32(4)
            .uint32(4)
            .float(0.125)
            .finish()
        );
        reader.skipType(0);
        test.equal(reader.pos, 1, "varints");
        reader.skipType(1);
        test.equal(reader.pos, 9, "fixed 64 bits");
        reader.skipType(2);
        test.equal(reader.pos, 13, "length delimited values");
        reader.skipType(3);
        test.equal(reader.pos, 23, "legacy groups");
        reader.skipType(3);
        test.equal(reader.pos, 24, "empty legacy groups");
        reader.skipType(5);
        test.equal(reader.pos, 28, "fixed 32 bits");
        test.end();
    });

    test.end();
});

function expect(type, value, expected, WriterToTest) {
    if (!WriterToTest)
        WriterToTest = Writer.create().constructor;
    var writer = new WriterToTest();
    var actual = writer[type](value).finish();
    if (actual.length !== expected.length) {
        console.error("actual", Array.prototype.slice.call(actual), "!= expected", expected);
        return false;
    }
    for (var i = 0; i < expected.length; ++i)
        if (actual[i] !== expected[i]) {
            console.error("actual", Array.prototype.slice.call(actual), "!= expected", expected);
            return false;
        }
    var longActual = protobuf.util.newBuffer(20);
    for (var l = 0; l < actual.length; ++l)
        longActual[l] = actual[l];
    [ actual, longActual ] // also test readLongVarint fast route
    .forEach(function(actual) {
        var reader = Reader.create(actual);
        var actualValue = reader[type]();
        if (typeof actualValue === "object") { // buffer
            var buf;
            if (typeof value === "string") { // initial value is a base64 encoded string
                buf = protobuf.util.newBuffer(protobuf.util.base64.length(value));
                protobuf.util.base64.decode(value, buf, 0);
            } else
                buf = value;
            if (buf.length !== actualValue.length)
                return false;
            for (var j = 0; j < buf.length; ++j)
                if (actualValue[j] !== buf[j])
                    return false;
        } else if (actualValue !== value) {
            console.error("actual value", actualValue, "!= expected", value);
            return false;
        }
    });
    // also test browser writer if running under node
    if (WriterToTest !== protobuf.Writer) {
        if (!expect(type, value, expected, Writer)) {
            console.error("in browser writer");
            return false;
        }
    }
    return true;
}