var tape = require("tape");

var protobuf = require("..");

var proto = "syntax = \"proto3\";\
message A {\
  string whatever = 1;\
}\
message B {\
  A A = 1;\
}";

tape.test("ambiguous names", function(test) {
    protobuf.parse(proto);
    test.pass("should parse without errors");
    test.end();
});
