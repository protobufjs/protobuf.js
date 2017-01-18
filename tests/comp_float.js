var tape = require("tape");

// To test the ieee754 implementation on node:
// delete global.Float32Array;
// delete global.Float64Array;

var protobuf = require("..");

tape.test("float values", function(test) {

    // The following assertions were meant to validate that using float literals instead of pre-calculated
    // vars is safe. Turned out that these tests pass on all platforms except Edge 13/14 (which doesn't even
    // use the float fallback), where it failed because of the complete opposite: Math.pow(2, -1074) => 0

    // test.equal(1.401298464324817e-45, Math.pow(2, -149), "literal 2^-149 should match calculated");
    // test.equal(5e-324, Math.pow(2, -1074), "literal 2^-1074 should match calculated");
    
    var common = [
        0,
        -0,
        Infinity,
        -Infinity,
        0.125,
        1024.5,
        -4096.5,
    ];

    test.test(test.name + " - using 32 bits", function(test) {
        common.concat([
            3.4028234663852886e+38,
            1.1754943508222875e-38,
            1.1754946310819804e-39
        ])
        .forEach(function(value) {
            var writer = new protobuf.Writer();
            var buffer = writer.float(value).finish();
            var comp   = new protobuf.Reader(buffer).float();
            var strval = value === 0 && 1 / value < 0 ? "-0" : value.toString();
            test.equal(comp, value, "should write and read back " + strval);
        });
        test.end();
    });

    test.test(test.name + " - using 64 bits", function(test) {
        common.concat([
            1.7976931348623157e+308,
            2.2250738585072014e-308,
            2.2250738585072014e-309
        ])
        .forEach(function(value) {
            var writer = new protobuf.Writer();
            var buffer = writer.double(value).finish();
            var comp   = new protobuf.Reader(buffer).double();
            var strval = value === 0 && 1 / value < 0 ? "-0" : value.toString();
            test.equal(comp, value, "should write and read back " + strval);
        });
        test.end();
    });

    test.end();
});
