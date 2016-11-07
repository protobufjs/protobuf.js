var tap = require("tap");

var util  = require("../src/util"),
    long_ = require("../src/support/long"),
    Long  = util.Long;

function isEqual(a, b) {
    return Long.fromValue(a).eq(Long.fromValue(b));
}

function toString(a) {
    return Long.fromValue(a).toString();
}

function unhash(h) {
    var bytes = new Array(8);
    for (var i = 0; i < 8; ++i)
        bytes[i] = h.charCodeAt(i);
    return bytes;
}

tap.test("long support", function(test) {
    var values = [
        [ 0, { low: 0, high: 0 }],
        [ 1, { low: 1, high: 0 }]
        // TODO
    ];

    // test.fail("should be tested with more values");

    [ Long, null ].forEach(function(TLong) {
        values.forEach(function(val) {
            util.Long = TLong;
            var num = val[0];
            if (TLong && typeof num === 'number')
                num = TLong.fromNumber(num);
            long_._set(num);
            test.ok(isEqual({ low: long_._lo, high: long_._hi }, val[1]), "should set the correct low and high bits for " + toString(val[0]));
            var ret = long_._get(num.unsigned || false);
            test.ok(isEqual(ret, num), "should get back the low and high bits as " + toString(val[0]));
        });
    });
    
    util.Long = Long;

    test.test("should hash", function(test) {

        values.forEach(function(val) {
            var hash = util.toHash(val[1]);
            test.type(hash, "string", toString(val[1]) + " as a string");
            test.equal(hash.length, 8, toString(val[1]) + " to a length of 8");
            test.deepEqual(unhash(util.toHash(val[1])), Long.fromValue(val[1]).toBytesLE(), toString(val[1]) + " equal to its LE bytes representation");
            test.deepEqual(util.fromHash(hash, false), { low: val[1].low, high: val[1].high, unsigned: false }, toString(val[1]) + " back to the original value as if signed");
            test.deepEqual(util.fromHash(hash, true) , { low: val[1].low, high: val[1].high, unsigned: true }, toString(val[1]) + " back to the original value as if unsigned");
        });

        test.end();
    });

    test.test("should zig-zag", function(test) {

        var values = [
            [ 0, 0],
            [-1, 1],
            [ 1, 2],
            [-2, 3],
            [ 2147483647, 4294967294],
            [-2147483648, 4294967295]
        ];
        util.Long = null;
        values.forEach(function(val, i) {
            long_._set(val[0]);
            long_._zigZagEncode();
            test.ok(isEqual(long_._get(false), val[1]), "encode " + toString(val[0]) + " as " + toString(val[1]));
            long_._zigZagDecode();
            test.ok(isEqual(long_._get(false), val[0]), "decode " + toString(val[1]) + " as " + toString(val[0]));
        });
        util.Long = Long;

        test.end();
    });

    test.end();
});
