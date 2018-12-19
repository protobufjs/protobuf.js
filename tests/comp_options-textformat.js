var tape = require("tape");

var protobuf = require("..");

var proto = "syntax = \"proto3\";\
import \"google/protobuf/descriptor.proto\";\
message MyOptions {\
  string a = 1;\
  string b = 2;\
  MyOptions c = 3;\
  repeated string d = 4;\
  repeated MyOptions e = 5;\
}\
extend google.protobuf.FieldOptions {\
  MyOptions my_options = 50000;\
}\
message Test {\
  string value = 1 [(my_options) = { a: \"foo\" b: \"bar\" }];\
  string value2 = 2 [(my_options) = { a: \"foo\" c { a: \"bar\" } }];\
  string value3 = 3 [(my_options) = { a: \"foo\", b: \"bar\" }];\
  string value4 = 4 [(my_options) = { d: [\"foo\", \"bar\"] }];\
  string value5 = 5 [(my_options) = { e: [ { d: [\"foo\", \"bar\"] } ] }];\
}";

tape.test("options in textformat", function(test) {
    var root = protobuf.parse(proto).root;
    var Test = root.lookup("Test");
    test.same(Test.fields.value.options, { "(my_options).a": "foo", "(my_options).b": "bar" }, "should parse correctly");
    test.same(Test.fields.value2.options, { "(my_options).a": "foo", "(my_options).c.a": "bar" }, "should parse correctly when nested");
    test.same(Test.fields.value3.options, { "(my_options).a": "foo", "(my_options).b": "bar" }, "should parse correctly when comma-separated");
    test.same(Test.fields.value4.options, { "(my_options).d": ["foo", "bar"] }, "should parse repeated option correctly");
    test.same(Test.fields.value5.options, { "(my_options).e.d": ["foo", "bar"] }, "should parse nested repeated option correctly");
    test.end();
});
