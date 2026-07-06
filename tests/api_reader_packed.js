var tape = require("tape");

var protobuf = require("..");

var Writer = protobuf.Writer,
    Reader = protobuf.Reader;

// [ packed method, sample values ]; methods ending in "64s" return Long|number
var cases = [
    [ "uint32s",   [ 0, 1, 127, 128, 16384, 2097152, 4294967295 ] ],
    [ "int32s",    [ 0, 1, -1, 2147483647, -2147483648, 127 ] ],
    [ "sint32s",   [ 0, 1, -1, 63, -64, 1000000, -1000000 ] ],
    [ "bools",     [ true, false, true, true, false ] ],
    [ "fixed32s",  [ 0, 1, 4294967295, 123456, 255 ] ],
    [ "sfixed32s", [ 0, -1, 1, 2147483647, -2147483648 ] ],
    [ "floats",    [ 0, 1.5, -2.25, 0.125, 100 ] ],
    [ "doubles",   [ 0, 1.5, -2.25, 204.8, 12345.678 ] ],
    [ "uint64s",   [ 0, 1, 1000, 4294967295, 123456789 ] ],
    [ "int64s",    [ 0, 1, 1000, 4294967295, 123456789 ] ],
    [ "sint64s",   [ 0, 1, -1, 1000, -1000, 123456789 ] ],
    [ "fixed64s",  [ 0, 1, 4294967295, 123456789 ] ],
    [ "sfixed64s", [ 0, -1, 1, 123456789 ] ]
];

function norm(arr, is64) {
    return is64 ? Array.prototype.map.call(arr, Number) : Array.prototype.slice.call(arr);
}

tape.test("packed reader methods", function(test) {
    cases.forEach(function(c) {
        var name = c[0], vals = c[1], is64 = /64s$/.test(name);

        // basic roundtrip (Reader.create picks BufferReader on node)
        var buf = Writer.create()[name](vals).finish();
        test.same(norm(Reader.create(buf)[name](), is64), vals, name + " roundtrips");

        // empty packed field
        var ebuf = Writer.create()[name]([]).finish();
        test.same(norm(Reader.create(ebuf)[name](), is64), [], name + " empty");

        // large array (crosses the fixed-width DataView threshold of 32)
        var big = [];
        for (var i = 0; i < 100; ++i) big.push(vals[i % vals.length]);
        var bbuf = Writer.create()[name](big).finish();
        test.same(norm(Reader.create(bbuf)[name](), is64), big, name + " large (view path)");

        // plain-array reader exercises the non-DataView fallback
        var abuf = Array.prototype.slice.call(Writer.create()[name](vals).finish());
        test.same(norm(Reader.create(abuf)[name](), is64), vals, name + " array reader (fallback)");

        // reading into an existing array appends (split packed field semantics)
        var seed = [ vals[0] ];
        Reader.create(buf)[name](seed);
        test.same(norm(seed, is64), [ is64 ? Number(vals[0]) : vals[0] ].concat(vals), name + " appends into existing array");
    });
    test.end();
});

var fixedWidthCases = [
    [ "fixed32s",  4 ],
    [ "sfixed32s", 4 ],
    [ "floats",    4 ],
    [ "doubles",   8 ],
    [ "fixed64s",  8 ],
    [ "sfixed64s", 8 ]
];

tape.test("packed reader methods reject invalid fixed-width lengths", function(test) {
    fixedWidthCases.forEach(function(c) {
        var name = c[0], width = c[1],
            values = [ width + 1 ],
            seed = [ 123 ];
        for (var i = 0; i <= width; ++i)
            values.push(0);

        test.throws(function() {
            Reader.create(values)[name](seed);
        }, RangeError, name + " should reject leftover bytes");
        test.equal(seed.length, 2, name + " should append complete values before rejecting");
        test.equal(Number(seed[1]), 0, name + " should append the complete value");
    });
    test.end();
});
