var tape = require("tape");

var protobuf = require(".."),
    util = protobuf.util;

tape.test("bench.proto and bench.json", function(test) {
    test.plan(4);
    protobuf.load("bench/data/bench.proto", undefined, function(err, root) { // no require.resolve to support browsers
        if (err)
            return test.fail(err.message);

        var Test = root.lookup("Test");

        var data = require("../bench/data/bench.json");

        test.equal(Test.verify(data), null, "should verify our test data");
        test.equal(Test.ctor.verify(data), null, "should verify our test data (static)");

        var decoded = Test.decode(Test.encode(data).finish());
        test.deepEqual(decoded, data, "should reproduce the original data when encoded and decoded again");

        test.deepEqual(Test.toObject(decoded), data, "should convert back to the original object");

        test.end();
    });
});