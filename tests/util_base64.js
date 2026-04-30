var tape = require("tape");

var base64 = require("../src/util/base64");

var strings = {
    "": "",
    "a": "YQ==",
    "ab": "YWI=",
    "abcdefg": "YWJjZGVmZw==",
    "abcdefgh": "YWJjZGVmZ2g=",
    "abcdefghi": "YWJjZGVmZ2hp"
};

tape.test("base64", function(test) {

    Object.keys(strings).forEach(function(str) {
        var enc = strings[str];

        test.equal(base64.test(enc), true, "should detect '" + enc + "' to be base64 encoded");

        var len = base64.length(enc);
        test.equal(len, str.length, "should calculate '" + enc + "' as " + str.length + " bytes");

        var buf = new Array(len);
        var len2 = base64.decode(enc, buf, 0);
        test.equal(len2, len, "should decode '" + enc + "' to " + len + " bytes");

        test.equal(String.fromCharCode.apply(String, buf), str, "should decode '" + enc + "' to '" + str + "'");

        var enc2 = base64.encode(buf, 0, buf.length);
        test.equal(enc2, enc, "should encode '" + str + "' to '" + enc + "'");

    });

    test.throws(function() {
        var buf = new Array(10);
        base64.decode("YQ!", buf, 0);
    }, Error, "should throw if encoding is invalid");

    test.throws(function() {
        var buf = new Array(10);
        base64.decode("Y", buf, 0);
    }, Error, "should throw if string is truncated");

    test.equal(base64.test("teststr"), false, "should not detect ambiguous strings as base64 encoded");

    var unpadded = "AQI";
    test.equal(base64.length(unpadded), 2, "should calculate unpadded base64 length");
    var unpaddedBuf = new Array(2);
    test.equal(base64.decode(unpadded, unpaddedBuf, 0), 2, "should decode unpadded base64");
    test.same(unpaddedBuf, [ 1, 2 ], "should decode unpadded base64 bytes");

    [ "-_8=", "-_8" ].forEach(function(enc) {
        test.equal(base64.test(enc), true, "should detect '" + enc + "' to be base64 encoded");

        var len = base64.length(enc);
        test.equal(len, 2, "should calculate '" + enc + "' as 2 bytes");

        var buf = new Array(len);
        var len2 = base64.decode(enc, buf, 0);
        test.equal(len2, len, "should decode '" + enc + "' to " + len + " bytes");
        test.same(buf, [ 251, 255 ], "should decode URL-safe base64");
    });

    test.end();
});
