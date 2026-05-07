# protobuf.js Extensions

## descriptor

Optional `google/protobuf/descriptor.proto` interoperability layer for reflected roots and objects.

```js
import protobuf from "protobufjs";
import descriptor from "protobufjs/ext/descriptor.js";

// Convert an existing root to a FileDescriptorSet message.
const root = protobuf.Root.fromJSON(bundle);
const set = root.toDescriptor("proto2");

// Encode descriptor buffers.
const buffer = descriptor.FileDescriptorSet.encode(set).finish();

// Convert a FileDescriptorSet message or buffer back to a root.
const decodedRoot = protobuf.Root.fromDescriptor(buffer);
```

The extension requires reflection metadata and also works with `protobufjs/light.js` when schemas are loaded from JSON or otherwise provided as reflection objects.

Importing the extension adds `.fromDescriptor(descriptor[, syntaxOrEdition])` and `#toDescriptor([syntaxOrEdition])` methods to reflection objects and exports reflected descriptor types from `google.protobuf`. Descriptor inputs can be decoded messages, readers, or `Uint8Array`s for the corresponding descriptor message.

| Descriptor type               | protobuf.js type | Remarks |
|-------------------------------|------------------|---------|
| **FileDescriptorSet**         | Root             | |
| FileDescriptorProto           |                  | dependencies and source info are ignored on input and not emitted |
| FileOptions                   |                  | |
| FileOptionsOptimizeMode       |                  | |
| SourceCodeInfo                |                  | exported descriptor type; not mapped to reflection |
| SourceCodeInfoLocation        |                  | |
| GeneratedCodeInfo             |                  | exported descriptor type; not mapped to reflection |
| GeneratedCodeInfoAnnotation   |                  | |
| **DescriptorProto**           | Type             | |
| MessageOptions                |                  | |
| DescriptorProtoExtensionRange |                  | |
| DescriptorProtoReservedRange  |                  | |
| **FieldDescriptorProto**      | Field / MapField | map entries are reconstructed as map fields |
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
| EnumValueOptions              |                  | |
| **ServiceDescriptorProto**    | Service          | |
| ServiceOptions                |                  | |
| **MethodDescriptorProto**     | Method           | |
| MethodOptions                 |                  | |
| FeatureSet                    |                  | exported descriptor type; used by edition-aware options |
| FeatureSetDefaults            |                  | exported descriptor type |
| UninterpretedOption           |                  | exported descriptor type; options are not interpreted |
| UninterpretedOptionNamePart   |                  | |

Not all `descriptor.proto` features translate perfectly to a protobuf.js root. A root has only limited knowledge of packages and individual files, for example, which is compensated by guessing and generating file names.

The exported TypeScript interfaces can be used to reference specific descriptor message instances, for example `protobuf.Message<IDescriptorProto>`.
