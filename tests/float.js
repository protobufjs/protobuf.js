var tape = require("tape");

/*
// To test the ieee754 implementation on node:
delete global.Float32Array;
delete global.Float64Array;
*/

var protobuf = require("..");

tape.test("floats", function(test) {

    test.test("using 32 bits", function(test) {
        [
            0,
            -0,
            Infinity,
            -Infinity,
            0.125,
            1024.5,
            3.4028234663852886e+38,
            1.1754943508222875e-38,
            1.1754946310819804e-39
        ]
        .forEach(function(value) {
            var writer = new protobuf.Writer();
            var buffer = writer.float(value).finish();
            var comp   = new protobuf.Reader(buffer).float();
            var strval = value === 0 && 1 / value < 0 ? "-0" : value.toString();
            test.equal(comp, value, "should write and read back " + strval);
        });
        test.end();
    });

    test.test("using 64 bits", function(test) {
        [
            0,
            -0,
            Infinity,
            -Infinity,
            0.125,
            1024.5,
            1.7976931348623157e+308,
            2.2250738585072014e-308,
            2.2250738585072014e-309
        ]
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
