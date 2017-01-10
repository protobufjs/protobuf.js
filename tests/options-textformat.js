var tape = require("tape");

var protobuf = require("..");

tape.test("options in textformat", function(test) {

    protobuf.load("tests/data/options-textformat.proto", function(err, root) {
        if (err)
            throw err;
        var Test = root.lookup("Test");
        test.same(Test.fields.value.options, { "(my_options).a": "foo", "(my_options).b": "bar" }, "should parse correctly");
        test.end();
    });

});