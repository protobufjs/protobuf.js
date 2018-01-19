var tape = require("tape");

var protobuf = require("..");

tape.test("preserve comments through de/serialization", function(test) {
    test.plan(6);
    protobuf.load("tests/data/comment_serialization.proto", function(err, root) {
        if (err) {
            throw test.fail(err.message);
        }

        var copy = protobuf.Root.fromJSON(root.toJSON());
        test.equal(root.lookup("TestMessage").comment, copy.lookup("TestMessage").comment);
        test.equal(root.lookup("TestMessage.testField").comment, copy.lookup("TestMessage.testField").comment);

        var rootService = root.lookupService("TestService");
        var copyService = copy.lookupService("TestService");
        test.equal(rootService.comment, copyService.comment);
        test.equal(rootService.methods["testMethod"].comment, copyService.methods["testMethod"].comment);

        var rootEnum = root.lookup("TestEnum");
        var copyEnum = copy.lookup("TestEnum");
        test.equal(rootEnum.comment, copyEnum.comment);
        test.equal(rootEnum.comments.VALUE, copyEnum.comments.VALUE);

        test.end();
    });
});
