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
}";

tape.test("options in textformat", function(test) {
    var root = protobuf.parse(proto).root;
    var Test = root.lookup("Test");
    test.same(Test.fields.value.options, { "(my_options).a": "foo", "(my_options).b": "bar" }, "should parse correctly");
    test.same(Test.fields.value2.options, { "(my_options).a": "foo", "(my_options).b.c": "bar" }, "should parse correctly when nested");
    test.same(Test.fields.value3.options, { "(my_options).a": "foo", "(my_options).b": "bar" }, "should parse correctly when comma-separated");
    test.end();
});
