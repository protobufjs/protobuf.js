var tape = require("tape");

var protobuf = require("..");
var LongBits = protobuf.util.LongBits;
var Long = protobuf.util.Long;

tape.test("longbits", function(test) {

    test.test(test.name + " - zero", function(test) {
        var zero = LongBits.zero;
        test.equal(zero.lo, 0, "should have low bits of 0");
        test.equal(zero.hi, 0, "should have high bits of 0");
        test.equal(zero.toNumber(), 0, "should convert to number 0 (signed)");
        test.equal(zero.toNumber(true), 0, "should convert to number 0 (unsigned)");
        test.equal(zero.zzEncode(), zero, "should return itself when zig-zag encoded");
        test.equal(zero.length(), 1, "should return a byte length of 1");
        test.equal(LongBits.fromNumber(0), zero, "should be returned by fromNumber(0)");
        test.equal(LongBits.from(0), zero, "should be returned by from(0)");
        test.equal(LongBits.from(Long.ZERO), zero, "should be returned by from(Long.ZERO)");
        test.same(zero.toLong(), Long.ZERO, "should equal Long.ZERO (signed)");
        test.same(zero.toLong(true), Long.UZERO, "should equal Long.UZERO (unsigned)");
        test.equal(zero.toHash(), "\0\0\0\0\0\0\0\0", "should convert to a binary hash of 8x0");
        test.equal(protobuf.util.longToHash(0), "\0\0\0\0\0\0\0\0", "should convert to a binary hash of 8x0 (number 0 through util.longToHash)");
        test.equal(LongBits.fromHash("\0\0\0\0\0\0\0\0"), zero, "should be returned for a binary hash of 8x0");
        protobuf.util.Long = null;
        test.equal(protobuf.util.longFromHash("\0\0\0\0\0\0\0\0"), 0, "should be returned for a binary hash of 8x0 (number 0 through util.longFromHash)");
        protobuf.util.Long = Long;
        test.end();
    });

    [
        { low: 0, high: 0, unsigned: false, length: 1 },
        { low: 0, high: 0, unsigned: true, length: 1 },
        { low: (1 << 7) - 1, high: 0, unsigned: false, length: 1 },
        { low: (1 << 7) - 1, high: 0, unsigned: true, length: 1 },
        { low: (1 << 14) - 1, high: 0, unsigned: false, length: 2 },
        { low: (1 << 14) - 1, high: 0, unsigned: true, length: 2 },
        { low: (1 << 21) - 1, high: 0, unsigned: false, length: 3 },
        { low: (1 << 21) - 1, high: 0, unsigned: true, length: 3 },
        { low: (1 << 28) - 1, high: 0, unsigned: false, length: 4 },
        { low: (1 << 28) - 1, high: 0, unsigned: true, length: 4 },
        { low: -1, high: (1 << 3) - 1, unsigned: false, length: 5 },
        { low: -1, high: (1 << 3) - 1, unsigned: true, length: 5 },
        { low: -1, high: (1 << 10) - 1, unsigned: false, length: 6 },
        { low: -1, high: (1 << 10) - 1, unsigned: true, length: 6 },
        { low: -1, high: (1 << 17) - 1, unsigned: false, length: 7 },
        { low: -1, high: (1 << 17) - 1, unsigned: true, length: 7 },
        { low: -1, high: (1 << 24) - 1, unsigned: false, length: 8 },
        { low: -1, high: (1 << 24) - 1, unsigned: true, length: 8 },
        { low: -1, high: (1 << 31) - 1 | 0, unsigned: false, length: 9 },
        { low: -1, high: (1 << 31) - 1 | 0, unsigned: true, length: 9 },
        { low: -1, high: -1, unsigned: false, length: 10 },
        { low: -1, high: -1, unsigned: true, length: 10 },
        { low: 0, high: 1 << 31, unsigned: false, length: 10 },
        { low: 0, high: 1 << 31, unsigned: true, length: 10 },
        { low: 0, high: -1, unsigned: false, length: 10 }
    ]
    .forEach(function(value) {
        var long = Long.fromValue(value);
        test.equal(long.unsigned, value.unsigned, long + " should be signed/unsigned");
        var bits = LongBits.from(value);
        test.equal(bits.lo, long.low >>> 0, long + " should have equal low bits");
        test.equal(bits.hi, long.high >>> 0, long + " should have equal high bits");
        test.equal(bits.length(), value.length, long + " should return an equal length");
        test.equal(bits.toNumber(value.unsigned), long.toNumber(), long + " should convert to an equal number");
        var number = long.toNumber(value.unsigned);
        if (number <= 9007199254740991 && number >= -9007199254740991)
            test.same(LongBits.fromNumber(number), bits, long + " should convert hence and forth equally (where safe)");
        test.same(bits.toLong(value.unsigned), long, long + " should convert to an equal Long");
        var comp = String.fromCharCode.apply(String, long.toBytesLE());
        test.equal(bits.toHash(), comp, long + " should convert to an equal hash");
        test.equal(protobuf.util.longToHash(long), comp, long + " should convert to an equal hash through util.longToHash");
        test.same(LongBits.fromHash(comp), bits, long + " should convert back to an equal value");
        test.same(protobuf.util.longFromHash(comp, long.unsigned), long, long + " should convert back to an equal value through util.longFromHash");
    });

    var num = -4294967296 * 4294967296;
    var bits = LongBits.fromNumber(num);
    test.same(bits, { lo: 0, hi: 0 }, "lo and hi should properly overflow when converting " + num);

    test.end();
});