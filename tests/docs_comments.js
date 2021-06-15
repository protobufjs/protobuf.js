var tape = require("tape");

var protobuf = require("..");

tape.test("proto comments", function(test) {
    test.plan(11);
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
        test.equal(root.lookup("Test3").comments.THREE, "Preferred value with a comment.", "should parse lines for enum values and prefer on top over trailing");
        test.equal(root.lookup("Test3").comments.FOUR, "Other value with a comment.", "should not confuse previous trailing comments with comments for the next field");
        test.equal(root.lookup("Test3").comments.FIVE, "Leading comment for value with both types of comments after field with trailing comment.", "should not confuse previous field with trailing comment when leading comment is present");

        test.end();
    });
});

tape.test("proto comments with trailing comment preferred", function(test) {
    test.plan(11);
    var options = {preferTrailingComment: true};
    var root = new protobuf.Root();
    root.load("tests/data/comments.proto", options, function(err, root) {
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
        test.equal(root.lookup("Test3").comments.THREE, "Value with a comment.", "should prefer trailing comment when preferTrailingComment option enabled");
        test.equal(root.lookup("Test3").comments.FOUR, "Other value with a comment.", "should not confuse previous trailing comments with comments for the next field");
        test.equal(root.lookup("Test3").comments.FIVE, "Trailing comment for value with both types of comments after field with trailing comment.", "should not confuse previous field with trailing comment when leading comment is present");

        test.end();
    });
});
