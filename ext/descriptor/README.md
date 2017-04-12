protobufjs/ext/descriptor
=========================

Experimental [protobuf.js](https://github.com/dcodeIO/protobuf.js) extension for interoperability with descriptor.proto types.

Usage
-----

```js
var protobuf   = require("protobufjs"),
    descriptor = require("protobufjs/ext/descriptor");

var descriptor = ...; // either a FieldDescriptorSet buffer or JSON object
var root = protobuf.Root.fromDescriptor(descriptor);
var rootDescriptor = root.toDescriptor("proto3");
```

API
---

The extension adds `.fromDescriptor(descriptor[, syntax])` and `#toDescriptor([syntax])` methods to reflection objects and exports the internally used `Root` instance that contains the types present in descriptor.proto.
