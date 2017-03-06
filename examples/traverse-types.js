// this example demonstrates how to traverse through a root instance by calling a custom function
// for each message type within.

/*eslint-disable strict, no-console*/
var protobuf = require(".."); // require("protobufjs");

// traverse-types.proto
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

// the following is loading a string.
// in a real application, it'd be more like protobuf.load("traverse-types.proto", ...)
protobuf.parse.filename = "traverse-types.proto";
var root = protobuf.parse(proto).root;

function traverseTypes(current, fn) {
    if (current instanceof protobuf.Type) // and/or protobuf.Enum, protobuf.Service etc.
        fn(current);
    if (current.nestedArray)
        current.nestedArray.forEach(function(nested) {
            traverseTypes(nested, fn);
        });
}

traverseTypes(root, function(type) {
    console.log(
        type.constructor.className + " " + type.name
        + "\n  fully qualified name: " + type.fullName
        + "\n  defined in: " + type.filename
        + "\n  parent: " + type.parent + " in " + type.parent.filename
    );
});
