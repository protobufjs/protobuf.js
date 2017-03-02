// this example demonstrates how to traverse through a root instance by calling a custom function
// for each message type within.

/*eslint-disable strict, no-console*/
var protobuf = require(".."); // require("protobufjs");

var proto = "syntax=\"proto3\";\
package example;\
message Foo {\
  string a = 1;\
}\
message Bar {\
  uint32 b = 1;\
  \
  message Inner {\
    bytes c = 1;\
  }\
}";

function traverseTypes(current, fn) {
    if (current instanceof protobuf.Type)
        fn(current);
    if (current.nestedArray)
        current.nestedArray.forEach(function(nested) {
            traverseTypes(nested, fn);
        });
}

var root = protobuf.parse(proto).root;

traverseTypes(root, function(type) {
    console.log(type.fullName);
});
