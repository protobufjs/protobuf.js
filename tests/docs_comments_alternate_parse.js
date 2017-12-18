var tape = require("tape");

var protobuf = require("..");

tape.test("proto comments in alternate-parse mode", function(test) {
    test.plan(17);
    var options = {alternateCommentMode: true};
    var root = new protobuf.Root();
    root.load("tests/data/comments-alternate-parse.proto", options, function(err, root) {
        if (err)
            throw test.fail(err.message);

        test.equal(root.lookup("Test1").comment, "Message with\na\nmulti-line comment.", "should parse double-slash multiline comment");
        test.equal(root.lookup("Test2").comment, "Message\nwith\na multiline plain slash-star\ncomment.", "should parse slash-star multiline comment");
        test.equal(root.lookup("Test3").comment, "Message\nwith\na\ncomment and stars.", "should parse doc-block multiline comment");

        test.equal(root.lookup("Test1.field1").comment, "Field with a doc-block comment.", "should parse doc-block field comment");
        test.equal(root.lookup("Test1.field2").comment, "Field with a single-line comment starting with two slashes.", "should parse double-slash field comment");
        test.equal(root.lookup("Test1.field3").comment, "Field with a single-line comment starting with three slashes.", "should parse triple-slash field comment");
        test.equal(root.lookup("Test1.field4").comment, "Field with a single-line slash-star comment.", "should parse single-line slash-star field comment");
        test.equal(root.lookup("Test1.field5").comment, "Field with a trailing single-line two-slash comment.", "should parse trailing double-slash comment");
        test.equal(root.lookup("Test1.field6").comment, "Field with a trailing single-line three-slash comment.", "should parse trailing triple-slash comment");
        test.equal(root.lookup("Test1.field7").comment, "Field with a trailing single-line slash-star comment.", "should parse trailing slash-star comment");
        test.equal(root.lookup("Test1.field8").comment, null, "should parse no comment");
        test.equal(root.lookup("Test1.field9").comment, "Field with a\nmulti-line comment.", "should parse multiline double-slash field comment");
        test.equal(root.lookup("Test1.field10").comment, "Field with a\nmulti-line doc-block comment.", "should parse multiline doc-block field comment");

        test.equal(root.lookup("Test3").comments.ONE, "Value with a comment.", "should parse blocks for enum values");
        test.equal(root.lookup("Test3").comments.TWO, "Value with a single-line comment.", "should parse double-slash comments for enum values");
        test.equal(root.lookup("Test3").comments.THREE, "Value with a triple-slash comment.", "should parse lines for enum values and prefer on top over trailing");
        test.equal(root.lookup("Test3").comments.FOUR, "Other value with a comment.", "should not confuse previous trailing comments with comments for the next field");

        test.end();
    });
});
