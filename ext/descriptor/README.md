protobufjs/ext/descriptor
=========================

Experimental [protobuf.js](https://github.com/dcodeIO/protobuf.js) extension for interoperability with descriptor.proto types.

Usage
-----

```js
var protobuf   = require("protobufjs"),
    descriptor = require("protobufjs/ext/descriptor");

var descriptor = ...; // either a FieldDescriptorSet buffer, a FieldDescriptorSet message instance or a corresponding valid JSON object
var root = protobuf.Root.fromDescriptor(descriptor);
var rootDescriptor = root.toDescriptor("proto3");
```

API
---

The extension adds `.fromDescriptor(descriptor[, syntax])` and `#toDescriptor([syntax])` methods to reflection objects and exports the `.google.protobuf` namespace of the internally used `Root` instance containing the types present in descriptor.proto.
