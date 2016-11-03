var tap = require("tap"),
    fs  = require("fs");

var util    = require("../src/util"),
    string_ = require("../src/support/string");

tap.test("string support", function(test) {
    var testdata = fs.readFileSync(__dirname + '/data/string-support.txt', "utf8");
    var buf = Buffer.from(testdata, "utf8");

    test.ok(buf.length > 9000, "should be compared to a Buffer using longish test data");

    var encoded = string_._encode(testdata);
    test.equal(encoded.length, buf.length, "should encode the same number of bytes like a Buffer");
    test.equal(Buffer.compare(Buffer.from(encoded), buf), 0, "should encode to the same bytes like a Buffer");

    var decoded = string_._decode(encoded);
    test.equal(decoded, buf.toString("utf8"), "should decode back to a string like a Buffer");
    test.equal(decoded, testdata, "should decode back to the original string");

    test.end();
});
