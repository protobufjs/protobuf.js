var tape = require("tape");

var protobuf = require(".."),
    utf8 = require("../src/util/utf8");

var size = 1000000;

tape.test("utf8", function(test) {

    if (protobuf.util.isNode) {

        var data = require("fs").readFileSync("tests/data/utf8.txt").toString("utf8");
        var len, buf;

        while (data.length < size)
            data += data;
        data = data.substring(0, size);

        test.test("write", function(test) {

            len = utf8.length(data);
            buf = protobuf.util.newBuffer(len);
            test.equal(utf8.write(data, buf, 0), len, "should encode " + len + " bytes");

            var comp = new Buffer(data, "utf8");
            test.equal(buf.length, comp.length, "should produce a buffer length equal to node");
            for (var i = 0; i < buf.length; ++i) {
                if (buf[i] !== comp[i]) {
                    test.fail("should produce the same encoding as node (offset " + i + ")");
                    return;
                }
            }
            test.pass("should produce the same encoding as node");
            test.end();

        });

        test.test("read", function(test) {

            var comp = utf8.read(buf, 0, buf.length);
            test.equal(comp, data, "should read back the original data");

            test.end();
        });

    }
    test.end();

});