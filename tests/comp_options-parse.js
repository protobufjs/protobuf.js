var tape = require("tape");
var protobuf = require("..");

tape.test("Options", function (test) {
    var root = protobuf.loadSync("tests/data/options_test.proto");

    test.test(test.name + " - field options (Int)", function (test) {
        var TestFieldOptionsInt = root.lookup("TestFieldOptionsInt");
        test.equal(TestFieldOptionsInt.fields.field1.options["(fo_rep_int)"], 2, "should take second repeated int option");
        test.equal(TestFieldOptionsInt.fields.field2.options["(fo_single_int)"], 3, "should correctly parse single int option");
        test.end();
    });

    test.test(test.name + " - message options (Int)", function (test) {
        var TestMessageOptionsInt = root.lookup("TestMessageOptionsInt");
        test.equal(TestMessageOptionsInt.options["(mo_rep_int)"], 2, "should take second repeated int message option");
        test.equal(TestMessageOptionsInt.options["(mo_single_int)"], 3, "should correctly parse single int message option");
        test.end();
    });

    test.test(test.name + " - field options (Message)", function (test) {
        var TestFieldOptionsMsg = root.lookup("TestFieldOptionsMsg");
        test.equal(TestFieldOptionsMsg.fields.field1.options["(fo_rep_msg).value"], 4, "should take second repeated message option");
        test.equal(TestFieldOptionsMsg.fields.field1.options["(fo_rep_msg).rep_value"], 6, "should take second repeated int in second repeated option");
        test.equal(TestFieldOptionsMsg.fields.field2.options["(fo_single_msg).value"], 7, "should correctly parse single msg option");
        test.equal(TestFieldOptionsMsg.fields.field2.options["(fo_single_msg).rep_value"], 9, "should take second repeated int in single msg option");
        test.end();
    });

    test.test(test.name + " - message options (Message)", function (test) {
        var TestMessageOptionsMsg = root.lookup("TestMessageOptionsMsg");
        test.equal(TestMessageOptionsMsg.options["(mo_rep_msg).value"], 4, "should take second repeated message option");
        test.equal(TestMessageOptionsMsg.options["(mo_rep_msg).rep_value"], 6, "should take second repeated int in second repeated option");
        test.equal(TestMessageOptionsMsg.options["(mo_single_msg).value"], 7, "should correctly parse single msg option");
        test.equal(TestMessageOptionsMsg.options["(mo_single_msg).rep_value"], 9, "should take second repeated int in single msg option");
        test.end();
    });

    test.test(test.name + " - field options (Nested)", function (test) {
        var TestFieldOptionsNested = root.lookup("TestFieldOptionsNested");
        test.equal(TestFieldOptionsNested.fields.field1.options["(fo_rep_msg).value"], 1, "should merge repeated options messages");
        test.equal(TestFieldOptionsNested.fields.field1.options["(fo_rep_msg).rep_value"], 3, "should parse in any order");
        test.equal(TestFieldOptionsNested.fields.field1.options["(fo_rep_msg).nested.nested.value"], "x", "should correctly parse nested field options");
        test.equal(TestFieldOptionsNested.fields.field1.options["(fo_rep_msg).rep_nested.value"], "z", "should take second repeated nested options");
        test.equal(TestFieldOptionsNested.fields.field1.options["(fo_rep_msg).nested.value"], "w", "should merge nested options");

        test.equal(TestFieldOptionsNested.fields.field2.options["(fo_single_msg).nested.value"], "x", "should correctly parse nested property name");
        test.equal(TestFieldOptionsNested.fields.field2.options["(fo_single_msg).rep_nested.value"], "y", "should take second repeated nested options");

        test.equal(TestFieldOptionsNested.fields.field3.options["(fo_single_msg).nested.value"], "x", "should correctly parse nested field options");
        test.equal(TestFieldOptionsNested.fields.field3.options["(fo_single_msg).nested.nested.nested.value"], "y", "should correctly parse several nesting levels");

        test.end();
    });

    test.test(test.name + " - message options (Nested)", function (test) {
        var TestMessageOptionsNested = root.lookup("TestMessageOptionsNested");
        test.equal(TestMessageOptionsNested.options["(mo_rep_msg).value"], 1, "should merge repeated options messages");
        test.equal(TestMessageOptionsNested.options["(mo_rep_msg).rep_value"], 3, "should parse in any order");
        test.equal(TestMessageOptionsNested.options["(mo_rep_msg).nested.nested.value"], "x", "should correctly parse nested field options");
        test.equal(TestMessageOptionsNested.options["(mo_rep_msg).rep_nested.value"], "z", "should take second repeated nested options");
        test.equal(TestMessageOptionsNested.options["(mo_rep_msg).nested.value"], "w", "should merge nested options");

        test.equal(TestMessageOptionsNested.options["(mo_single_msg).nested.value"], "x", "should correctly parse nested property name");
        test.equal(TestMessageOptionsNested.options["(mo_single_msg).rep_nested.value"], "y", "should take second repeated nested options");
        test.equal(TestMessageOptionsNested.options["(mo_single_msg).rep_nested.nested.nested.value"], "y", "should correctly parse several nesting levels");

        test.end();
    });

    test.end();
});
