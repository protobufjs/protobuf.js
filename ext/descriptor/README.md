protobufjs/ext/descriptor
=========================

Experimental extension for interoperability with [descriptor.proto](https://github.com/google/protobuf/blob/master/src/google/protobuf/descriptor.proto) types.

Usage
-----

```js
var protobuf   = require("protobufjs"), // requires the full library
    descriptor = require("protobufjs/ext/descriptor");

var root = ...;

// convert any existing root instance to the corresponding descriptor type
var descriptor = root.toDescriptor("proto2");
// ^ returns a FileDescriptorSet message, see table below

// encode to a descriptor buffer
var buffer = descriptor.FileDescriptorSet.encode(descriptor).finish();

// decode from a descriptor buffer
var decodedDescriptor = descriptor.FileDescriptorSet.decode(buffer);

// convert any existing descriptor to a root instance
root = protobuf.Root.fromDescriptor(decodedDescriptor);
// ^ expects a FileDescriptorSet message or buffer, see table below

// and start all over again
```

API
---

The extension adds `.fromDescriptor(descriptor[, syntax])` and `#toDescriptor([syntax])` methods to reflection objects and exports the `.google.protobuf` namespace of the internally used `Root` instance containing the following types present in descriptor.proto:

| Descriptor type                | protobuf.js type | Remarks
|--------------------------------|------------------|---------
| **FileDescriptorSet**          | Root             |
| FileDescriptorProto            |                  | dependencies are not supported
| FileOptions                    |                  |
| FileOptions_OptimizeMode       |                  |
| SourceCodeInfo                 |                  | not supported
| SourceCodeInfo_Location        |                  |
| GeneratedCodeInfo              |                  | not supported
| GeneratedCodeInfo_Annotation   |                  |
| **DescriptorProto**            | Type             |
| MessageOptions                 |                  |
| DescriptorProto_ExtensionRange |                  |
| DescriptorProto_ReservedRange  |                  |
| **FieldDescriptorProto**       | Field            |
| FieldDescriptorProto_Label     |                  |
| FieldDescriptorProto_Type      |                  |
| FieldOptions                   |                  |
| FieldOptions_CType             |                  |
| FieldOptions_JSType            |                  |
| **OneofDescriptorProto**       | OneOf            |
| OneofOptions                   |                  |
| **EnumDescriptorProto**        | Enum             |
| EnumOptions                    |                  |
| EnumValueDescriptorProto       |                  |
| EnumValueOptions               |                  | not supported
| **ServiceDescriptorProto**     | Service          |
| ServiceOptions                 |                  |
| **MethodDescriptorProto**      | Method           |
| MethodOptions                  |                  |
| UninterpretedOption            |                  | not supported
| UninterpretedOption_NamePart   |                  |

Note that not all features of descriptor.proto translate perfectly to a protobuf.js root instance. A root instance has only limited knowlege of packages or individual files for example, which is then compensated by guessing and generating fictional file names.

When using TypeScript, the respective `...$Properties` types can be used to reference specific message types (i.e. `protobuf.Message<DescriptorProto$Properties>`).
