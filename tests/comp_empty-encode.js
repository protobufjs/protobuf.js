var tape = require("tape");

var protobuf = require("..");

tape.test("empty messages", function(test) {
    var root = new protobuf.Root().addJSON({
        "Test": {
            fields: {}
        }
    });

    var Test = root.lookup("Test");

    var buf = Test.encodeDelimited({}).finish();

    test.equal(buf.length, 1, "should encodeDelimited to a buffer of length 1");
    test.equal(buf[0], 0, "should encodeDelimited a length of 0");
    
    test.end();
});
