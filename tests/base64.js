var tape = require("tape");

var protobuf = require("..");

tape.test("base64", function(test) {

    var strings = {
        "": "",
        "a": "YQ==",
        "ab": "YWI=",
        "abcdefg": "YWJjZGVmZw==",
        "abcdefgh": "YWJjZGVmZ2g=",
        "abcdefghi": "YWJjZGVmZ2hp"
    };

    Object.keys(strings).forEach(function(str) {
        var enc = strings[str];

        var len = protobuf.util.length64(enc);
        test.equal(len, str.length, "should calculate '" + enc + "' as " + str.length + " bytes");

        var buf = protobuf.util.newBuffer(len);
        var len2 = protobuf.util.decode64(enc, buf, 0);
        test.equal(len2, len, "should decode '" + enc + "' to " + len + " bytes");

        if (protobuf.util.isNode && protobuf.util.Buffer)
            test.equal(buf.toString("utf8"), str, "should decode '" + enc + "' to '" + str + "'");

        var enc2 = protobuf.util.encode64(buf, 0, buf.length);
        test.equal(enc2, enc, "should encode '" + str + "' to '" + enc + "'");

        var writer = protobuf.Writer.create();
        var buf2 = writer.bytes(enc).finish();
        for (var i = 0; i < buf.length; ++i)
            test.equal(buf2[i + buf2.length - buf.length], buf[i], "should write byte " + buf[i] + " at " + (i + buf2.length - buf.length));
    });

    test.end();

});
