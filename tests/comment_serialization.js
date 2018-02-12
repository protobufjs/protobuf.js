var tape = require("tape");

var protobuf = require("..");

tape.test("by default, drop comments through de/serialization", function(test) {
    test.plan(16);
    protobuf.load("tests/data/comment_serialization.proto", function(err, root) {
        if (err) {
            throw test.fail(err.message);
        }

        var copy = protobuf.Root.fromJSON(root.toJSON());
        test.ok(root.lookup("TestMessage").comment);
        test.notOk(copy.lookup("TestMessage").comment);
        test.ok(root.lookup("TestMessage.testField").comment);
        test.notOk(copy.lookup("TestMessage.testField").comment);
        test.ok(root.lookup("TestMessage.testMap").comment);
        test.notOk(copy.lookup("TestMessage.testMap").comment);
        test.ok(root.lookup("TestMessage.testOneof").comment);
        test.notOk(copy.lookup("TestMessage.testOneof").comment);

        var rootService = root.lookupService("TestService");
        var copyService = copy.lookupService("TestService");
        test.ok(rootService.comment);
        test.notOk(copyService.comment);
        test.ok(rootService.methods["testMethod"].comment);
        test.notOk(copyService.methods["testMethod"].comment);

        var rootEnum = root.lookup("TestEnum");
        var copyEnum = copy.lookup("TestEnum");
        test.ok(rootEnum.comment);
        test.notOk(copyEnum.comment);
        test.ok(rootEnum.comments.VALUE);
        test.notOk(copyEnum.comments.VALUE);

        test.end();
    });
});

tape.test("preserve comments through de/serialization if option set", function(test) {
    test.plan(8);
    protobuf.load("tests/data/comment_serialization.proto", function(err, root) {
        if (err) {
            throw test.fail(err.message);
        }

        var toJSONOptions = {keepComments: true};
        var copy = protobuf.Root.fromJSON(root.toJSON(toJSONOptions));
        test.equal(root.lookup("TestMessage").comment, copy.lookup("TestMessage").comment);
        test.equal(root.lookup("TestMessage.testField").comment, copy.lookup("TestMessage.testField").comment);
        test.equal(root.lookup("TestMessage.testMap").comment, copy.lookup("TestMessage.testMap").comment);
        test.equal(root.lookup("TestMessage.testOneof").comment, copy.lookup("TestMessage.testOneof").comment);

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
