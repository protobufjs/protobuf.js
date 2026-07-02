var tape = require("tape");

var utf8 = require("../src/util/utf8");

var data = require("fs").readFileSync(require.resolve("./data/util_utf8/utf8.txt")),
    dataStr = data.toString("utf8");

var surrogatePairErr = require("fs").readFileSync(require.resolve("./data/util_utf8/surrogate_pair_bug.txt")),
    surrogatePairErrStr = data.toString("utf8");

tape.test("utf8", function(test) {

    test.test(test.name + " - length", function(test) {
        test.equal(utf8.length(""), 0, "should return a byte length of zero for an empty string");

        test.equal(utf8.length(dataStr), Buffer.byteLength(dataStr), "should return the same byte length as node buffers");

        test.end();
    });

    test.test(test.name + " - read", function(test) {
        var comp = utf8.read([], 0, 0);
        test.equal(comp, "", "should decode an empty buffer to an empty string");

        comp = utf8.read(data, 0, data.length);
        test.equal(comp, data.toString("utf8"), "should decode to the same byte data as node buffers");

        var longData = Buffer.concat([data, data, data, data]);
        comp = utf8.read(longData, 0, longData.length);
        test.equal(comp, longData.toString("utf8"), "should decode to the same byte data as node buffers (long)");

        var chunkData = new Buffer(data.toString("utf8").substring(0, 8192));
        comp = utf8.read(chunkData, 0, chunkData.length);
        test.equal(comp, chunkData.toString("utf8"), "should decode to the same byte data as node buffers (chunk size)");

        comp = utf8.read(surrogatePairErr, 0, surrogatePairErr.length);
        test.equal(comp, surrogatePairErr.toString("utf8"), "should decode to the same byte data as node buffers (surrogate pair over chunk)");

        [
            [0xC0, 0x80],             // U+0000 encoded as two bytes
            [0xE0, 0x81, 0xBF],       // U+007F encoded as three bytes
            [0xF0, 0x80, 0x9F, 0xBF], // U+07FF encoded as four bytes
            [0xF4, 0x90, 0x80, 0x80]  // >U+10FFFF encoded as four bytes
        ].forEach(function(bytes) {
            var overlong = new Buffer(bytes);
            comp = utf8.read(overlong, 0, overlong.length);
            test.equal(comp, "\ufffd", "should decode overlong UTF-8 sequences as replacement characters");
        });

        // A large non-ASCII string forces the whole payload down the JS fallback
        // (utf8_read_js) and past its 8192-unit flush boundary many times over,
        // exercising the batched accumulation.
        var longMultibyteStr = "\u20ac\u00df\u7a7a\u03bb\ud835\udd4f".repeat(20000); // 3-byte, 2-byte and surrogate-pair code points
        var longMultibyte = Buffer.from(longMultibyteStr, "utf8");
        comp = utf8.read(longMultibyte, 0, longMultibyte.length);
        test.equal(comp, longMultibyteStr, "should decode a large multibyte string spanning many flush boundaries");

        // An ASCII prefix followed by non-ASCII exercises the handoff from the
        // ASCII fast path into utf8_read_js with a non-empty `str` prefix.
        var prefixedStr = "a" + "\u03bb".repeat(9000);
        var prefixed = Buffer.from(prefixedStr, "utf8");
        comp = utf8.read(prefixed, 0, prefixed.length);
        test.equal(comp, prefixedStr, "should preserve the ASCII prefix when falling back to the JS decoder");

        test.end();
    });

    test.test(test.name + " - write", function(test) {
        var buf = new Buffer(0);
        test.equal(utf8.write("", buf, 0), 0, "should encode an empty string to an empty buffer");

        var len = utf8.length(dataStr);
        buf = new Buffer(len);
        test.equal(utf8.write(dataStr, buf, 0), len, "should encode to exactly " + len + " bytes");

        test.equal(buf.length, data.length, "should encode to a buffer length equal to that of node buffers");

        for (var i = 0; i < buf.length; ++i) {
            if (buf[i] !== data[i]) {
                test.fail("should encode to the same buffer data as node buffers (offset " + i + ")");
                return;
            }
        }
        test.pass("should encode to the same buffer data as node buffers");

        test.end();
    });

});
