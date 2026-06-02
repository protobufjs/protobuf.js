# protobuf.js Extensions

## descriptor

Optional `google/protobuf/descriptor.proto` interoperability layer for reflected roots and objects.

```js
import protobuf from "protobufjs";
import descriptor from "protobufjs/ext/descriptor.js";

// Convert an existing root to a FileDescriptorSet message.
const root = ...;
const set = root.toDescriptor("proto2");

// Encode descriptor buffers.
const buffer = descriptor.FileDescriptorSet.encode(set).finish();

// Convert a FileDescriptorSet message or buffer back to a root.
const decodedRoot = protobuf.Root.fromDescriptor(buffer);
```

The extension requires reflection metadata and also works with `protobufjs/light.js` when schemas are loaded from JSON or otherwise provided as reflection objects.

Importing the extension adds `.fromDescriptor(descriptor[, syntaxOrEdition])` and `#toDescriptor([syntaxOrEdition])` methods to reflected types and exports reflected descriptor types from `google.protobuf`. Descriptor inputs can be decoded messages, readers, or `Uint8Array`s for the corresponding descriptor message.

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

## protojson

Optional ProtoJSON support for reflected message types.

> [!NOTE]
> Specialized code generation for the `pbjs` static-module target is a potential future extension. If you need this for high-throughput JSON transcoding or REST fallbacks in production, consider getting in touch and supporting the codegen and conformance work.

```js
import protobuf from "protobufjs";
import protojson from "protobufjs/ext/protojson.js";

const root = ...;
const MyType = root.lookupType("MyType");
const message = protojson.fromJson(MyType, { value: 1 });
const json = protojson.toJson(MyType, message);
```

```js
const messageFromString = protojson.fromJsonString(MyType, '{"value":1}');
const jsonString = protojson.toJsonString(MyType, messageFromString);
```

Importing the extension has no prototype side effects. Calling `protojson.install()` installs `fromJson`, `fromJsonString`, `toJson` and `toJsonString` convenience methods on `protobuf.Type.prototype`. It works with `protobufjs/light.js` when schemas are loaded from JSON or otherwise provided as reflection objects.

Unknown fields can be ignored while parsing by passing `{ ignoreUnknownFields: true }` to `fromJson` or `fromJsonString`.

## textformat

Optional Text Format support for reflected message types.

```js
import protobuf from "protobufjs";
import textformat from "protobufjs/ext/textformat.js";

const root = ...;
const MyType = root.lookupType("MyType");
const message = textformat.fromText(MyType, "value: 1");
const text = textformat.toText(MyType, message);
```

Importing the extension has no prototype side effects. Calling `textformat.install()` installs `fromText` and `toText` convenience methods on `protobuf.Type.prototype`. It works with `protobufjs/light.js` when schemas are loaded from JSON or otherwise provided as reflection objects.

Unknown fields can be printed with numeric field names by passing `{ unknowns: true }` to `toText`.
