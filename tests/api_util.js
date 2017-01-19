var tape = require("tape");

var protobuf = require("..");

var util = protobuf.util;

tape.test("util", function(test) {

    test.test(test.name + " - merge", function(test) {
        var o = {};
        util.merge(o, {});
        test.same(o, {}, "should do nothing if both objects are empty");
        util.merge(o, { a: 1 });
        test.same(o, { a: 1 }, "should merge non-existing keys");
        util.merge(o, { a: 2 });
        test.same(o, { a: 2 }, "should merge existing keys");
        util.merge(o, { a: 3 }, true);
        test.same(o, { a: 2 }, "should not merge existing keys");
        test.end();
    });

    test.test(test.name + " - lcFirst", function(test) {
        test.equal(util.lcFirst("ABC"), "aBC", "should convert the first character to lower case");
        test.end();
    });

    test.test(test.name + " - ucFirst", function(test) {
        test.equal(util.ucFirst("abc"), "Abc", "should convert the first character to upper case");
        test.end();
    });

    test.end();
});