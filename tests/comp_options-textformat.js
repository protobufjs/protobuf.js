var tape = require("tape");

var protobuf = require("..");

var proto = "syntax = \"proto3\";\
import \"google/protobuf/descriptor.proto\";\
message MyOptions {\
  string a = 1;\
  string b = 2;\
}\
extend google.protobuf.FieldOptions {\
  MyOptions my_options = 50000;\
}\
message Test {\
  string value = 1 [(my_options) = { a: \"foo\" b: \"bar\" }];\
  string value2 = 2 [(my_options) = { a: \"foo\" b { c: \"bar\" } }];\
  string value3 = 3 [(my_options) = { a: \"foo\", b: \"bar\" }];\
}\
message TestRepeated {\
  string value = 1 [(my_options) = { a: \"foo\" a:\"foo2\" b: \"bar\" } , (my_options) = { a: \"foo3\" a:\"foo4\" b: \"bar2\" }];\
  string value2 = 2 [(my_options) = { a: \"foo\" b { c: \"bar\" }, b { c: \"bar2\"} }];\
  string value3 = 3 [(my_options) = { a: \"foo\", b: \"bar\", b: \"bar2\" }];\
}\
";

tape.test("options in textformat", function(test) {
    var root = protobuf.parse(proto).root;
    test.test("test single options", function (test) {
        var Test = root.lookup("Test");
        test.same(Test.fields.value.options, { "(my_options).a": "foo", "(my_options).b": "bar" }, "should parse correctly");
        test.same(Test.fields.value.rawOptions, [{"(my_options).a": "foo"}, {"(my_options).b": "bar"}], "should parse rawOptions correctly");

        test.same(Test.fields.value2.options, { "(my_options).a": "foo", "(my_options).b.c": "bar" }, "should parse correctly when nested");
        test.same(Test.fields.value2.rawOptions, [{"(my_options).a": "foo"}, {"(my_options).b.c": "bar"}], "should parse rawOptions correctly when nested");

        test.same(Test.fields.value3.options, { "(my_options).a": "foo", "(my_options).b": "bar" }, "should parse correctly when comma-separated");
        test.same(Test.fields.value3.rawOptions, [{"(my_options).a": "foo"}, {"(my_options).b": "bar"}], "should parse rawOptions correctly when comma-separated");
        test.end();
    });

    test.test("test repeated options", function (test) {
        var Test = root.lookup("TestRepeated");
        test.same(Test.fields.value.options, { "(my_options).a": "foo4", "(my_options).b": "bar2" }, "should take last repeated option");
        test.same(Test.fields.value.rawOptions, [{"(my_options).a": "foo"},{"(my_options).a": "foo2"}, {"(my_options).b": "bar"},
            {"(my_options).a": "foo3"},{"(my_options).a": "foo4"}, {"(my_options).b": "bar2"}], "should parse all repeated option");

        test.same(Test.fields.value2.options, { "(my_options).a": "foo", "(my_options).b.c": "bar2" }, "should take last repeated option when nested");
        test.same(Test.fields.value2.rawOptions, [{"(my_options).a": "foo"}, {"(my_options).b.c": "bar"}, {"(my_options).b.c": "bar2"}], "should parse all repeated option when nested");

        test.same(Test.fields.value3.options, { "(my_options).a": "foo", "(my_options).b": "bar2" }, "should take last repeated option when comma-separated");
        test.same(Test.fields.value3.rawOptions, [{"(my_options).a": "foo"}, {"(my_options).b": "bar"}, {"(my_options).b": "bar2"}], "should parse all repeated option when comma-separated");
        test.end();
    });

});
