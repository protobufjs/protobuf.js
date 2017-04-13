protobufjs/ext/descriptor
=========================

Experimental extension for interoperability with descriptor.proto types.

Usage
-----

```js
var protobuf   = require("protobufjs"),
    descriptor = require("protobufjs/ext/descriptor");

// take any extisting root object
var root = ...;

// convert it to the corresponding descriptor type
var fileDescriptorSet = root.toDescriptor("proto2");

// encode it
var buffer = descriptor.FileDescriptorSet.encode(fileDescriptorSet).finish();

// decode it back
var decoded = descriptor.FileDescriptorSet.decode(buffer);

// convert it back to a protobuf.js root
root = protobuf.Root.fromDescriptor(decoded, "proto2");

// and start all over again
```

API
---

The extension adds `.fromDescriptor(descriptor[, syntax])` and `#toDescriptor([syntax])` methods to reflection objects and exports the `.google.protobuf` namespace of the internally used `Root` instance containing the following types present in descriptor.proto.

| Descriptor type          | protobuf.js type | Remarks
|--------------------------|------------------|---------
| FileDescriptorSet        | Root             |
| FileDescriptorProto      | Root             | not supported: dependencies, sourceCodeInfo
| FileOptions              | Root             | not supported
| DescriptorProto          | Type             |
| MessageOptions           | Type             | not supported
| FieldDescriptorProto     | Field            | not supported: defaultValue, jsonValue
| FieldOptions             | Field            | only packed
| OneofDescriptorProto     | OneOf            |
| OneofOptions             | OneOf            | not supported
| EnumDescriptorProto      | Enum             |
| EnumValueDescriptorProto | Enum             |
| EnumOptions              | Enum             | only allowAlias
| EnumValueOptions         | Enum             | not supported
| ServiceDescriptorProto   | Service          |
| ServiceOptions           | Service          | not supported
| MethodDescriptorProto    | Method           |
| MethodOptions            | Method           | not supported
| UninterpretedOption      |                  | not supported
| SourceCodeInfo           |                  | not supported
| GeneratedCodeInfo        |                  | not supported

Additionally, not all features of descriptor.proto translate perfectly to a protobuf.js root instance. A root instance has only limited knowlege of packages or individual files for example, which is then compensated by guessing.
