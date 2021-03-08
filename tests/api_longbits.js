var tape = require("tape");

var protobuf = require("..");
var LongBits = protobuf.util.LongBits;
var Long = require('long');

tape.test("longbits", function(test) {

    test.test(test.name + " - zero", function(test) {
        var zero = LongBits.zero;
        test.equal(zero.lo, 0, "should have low bits of 0");
        test.equal(zero.hi, 0, "should have high bits of 0");
        test.equal(zero.toBigInt(), 0n, "should convert to number 0 (signed)");
        test.equal(zero.toBigInt(true), 0n, "should convert to number 0 (unsigned)");
        test.equal(zero.zzEncode(), zero, "should return itself when zig-zag encoded");
        test.equal(zero.length(), 1, "should return a byte length of 1");
        test.equal(LongBits.fromNumber(0), zero, "should be returned by fromNumber(0)");
        test.equal(LongBits.from(0), zero, "should be returned by from(0)");
        test.equal(LongBits.from(0n), zero, "should be returned by from(0n)");
        test.same(zero.toBigInt(), 0n, "should equal 0n (signed)");
        test.same(zero.toBigInt(true), 0n, "should equal 0n (unsigned)");
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
        var bits = LongBits.from(value);
        var bigint = bits.toBigInt();
        test.equal(bits.lo, value.low, bigint + " should have equal low bits");
        test.equal(bits.hi, value.high, bigint + " should have equal high bits");
        test.equal(bits.length(), value.length, bigint + " should return an equal length");
        
        console.log(value);
        var long = BigInt(Long.fromValue(value).toString());
        test.equal(bits.toBigInt(value.unsigned), long, long + " should convert to an equal number, unsigned="+value.unsigned);

        if (bigint < (1 >> 32) && bigint >= -(1 >> 31)) 
            test.same(LongBits.fromNumber(Number(bigint)), bits, bigint + " should convert hence and forth equally (where safe)");
        
        test.same(bits.toBigInt(), bigint, bigint + " should convert to an equal Long");
    });

    var num = -4294967296 * 4294967296;
    var bits = LongBits.fromNumber(num);
    test.equal(bits.lo, 0, "lo and hi should properly overflow when converting " + num);
    test.equal(bits.hi, 0, "lo and hi should properly overflow when converting " + num);

    test.end();
});

// LongBits { lo: 4294967295, hi: 7 } { low: -1, high: 7, unsigned: false, length: 5 } 34359738367n