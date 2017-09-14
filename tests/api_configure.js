var tape = require("tape");

var protobuf = require("..");

var Root = protobuf.Root;

tape.test("configure origin paths", function(test) {

    test.test(test.name + " - failed import", function(test) {
        var root = new Root();
        root.load("tests/data/somepath/somemessage.proto", function(err) {
            if (!err)
                return test.fail("import should fail without configuring additional origin paths");
            test.pass("import is failing as expected w/o configuring additional origin paths");
            test.end();
        });
    });

    test.test(test.name + " - successful import", function(test) {
        protobuf.configureOriginPaths([
            "tests/data/",
        ]);
        var root = new Root();
        root.load("tests/data/somepath/somemessage.proto", function(err) {
            if (err)
                return test.fail("import should pass after configuring additional origin paths", err);
            test.pass("import is passing as expected after configuring additional origin paths");
            test.end();
        });
    });

});
