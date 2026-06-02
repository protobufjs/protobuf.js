# protobuf.js Extensions

## descriptor

Optional `descriptor.proto` support for converting reflected protobuf.js roots and objects to and from descriptor messages.

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

Importing the extension adds `.fromDescriptor(descriptor[, syntaxOrEdition])` and `#toDescriptor([syntaxOrEdition])` methods to reflection objects and exports the bundled descriptor types from `google.protobuf`. Descriptor inputs can be decoded messages, readers, or buffers of the corresponding descriptor messages.

The conversion covers descriptor messages that correspond to protobuf.js reflection objects: files and file sets, messages, fields and map fields, oneofs, enums, services and methods. Descriptor-only metadata such as source locations, generated-code annotations and uninterpreted options remains available through the exported descriptor message types, but is not mapped onto reflection objects. File names are inferred when generating descriptors because roots do not retain exact file/package boundaries.

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
