var tape = require("tape");

var protobuf = require("..");

tape.test("proto comments", function(test) {
    test.plan(9);
    protobuf.load("tests/data/comments.proto", function(err, root) {
        if (err)
            throw test.fail(err.message);

        test.equal(root.lookup("Test1").comment, "Message\nwith\na\ncomment.", "should parse /**-blocks");
        test.equal(root.lookup("Test2").comment, null, "should not parse //-blocks");
        test.equal(root.lookup("Test3").comment, null, "should not parse /*-blocks");

        test.equal(root.lookup("Test1.field1").comment, "Field with a comment.", "should parse blocks for message fields");
        test.equal(root.lookup("Test1.field2").comment, null, "should not parse lines for message fields");
        test.equal(root.lookup("Test1.field3").comment, "Field with a comment and a <a href=\"http://example.com/foo/\">link</a>", "should parse triple-slash lines for message fields");

        test.equal(root.lookup("Test3").comments.ONE, "Value with a comment.", "should parse blocks for enum values");
        test.equal(root.lookup("Test3").comments.TWO, null, "should not parse lines for enum values");
        test.equal(root.lookup("Test3").comments.THREE, "Value with a comment.", "should parse triple-slash lines for enum values");

        test.end();
    });
});
