# protobuf.js Extensions

## descriptor

Optional `google/protobuf/descriptor.proto` interoperability layer for reflected roots and objects.

```js
import protobuf from "protobufjs";
import descriptor from "protobufjs/ext/descriptor.js";

// Convert an existing root to a FileDescriptorSet message.
const set = root.toDescriptor("proto2");

// Encode and decode descriptor buffers.
const buffer = descriptor.FileDescriptorSet.encode(set).finish();
const decoded = descriptor.FileDescriptorSet.decode(buffer);

// Convert a FileDescriptorSet message or buffer back to a root.
const root = protobuf.Root.fromDescriptor(decoded);
```

The extension requires reflection metadata and also works with `protobufjs/light.js` when schemas are loaded from JSON or otherwise provided as reflection objects.

The extension adds `.fromDescriptor(descriptor[, syntaxOrEdition])` and `#toDescriptor([syntaxOrEdition])` methods to reflection objects and exports reflected descriptor types from `google.protobuf`:

| Descriptor type               | protobuf.js type | Remarks |
|-------------------------------|------------------|---------|
| **FileDescriptorSet**         | Root             | |
| FileDescriptorProto           |                  | dependencies are not supported |
| FileOptions                   |                  | |
| FileOptionsOptimizeMode       |                  | |
| SourceCodeInfo                |                  | not supported |
| SourceCodeInfoLocation        |                  | |
| GeneratedCodeInfo             |                  | not supported |
| GeneratedCodeInfoAnnotation   |                  | |
| **DescriptorProto**           | Type             | |
| MessageOptions                |                  | |
| DescriptorProtoExtensionRange |                  | |
| DescriptorProtoReservedRange  |                  | |
| **FieldDescriptorProto**      | Field            | |
| FieldDescriptorProtoLabel     |                  | |
| FieldDescriptorProtoType      |                  | |
| FieldOptions                  |                  | |
| FieldOptionsCType             |                  | |
| FieldOptionsJSType            |                  | |
| **OneofDescriptorProto**      | OneOf            | |
| OneofOptions                  |                  | |
| **EnumDescriptorProto**       | Enum             | |
| EnumOptions                   |                  | |
| EnumValueDescriptorProto      |                  | |
| EnumValueOptions              |                  | not supported |
| **ServiceDescriptorProto**    | Service          | |
| ServiceOptions                |                  | |
| **MethodDescriptorProto**     | Method           | |
| MethodOptions                 |                  | |
| UninterpretedOption           |                  | not supported |
| UninterpretedOptionNamePart   |                  | |

Not all `descriptor.proto` features translate perfectly to a protobuf.js root. A root has only limited knowledge of packages and individual files, for example, which is compensated by guessing and generating file names.

The exported TypeScript interfaces can be used to reference specific descriptor message instances, for example `protobuf.Message<IDescriptorProto>`.
