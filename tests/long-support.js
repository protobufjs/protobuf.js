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
