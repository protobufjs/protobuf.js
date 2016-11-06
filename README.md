protobuf.js
===========

**Protocol Buffers** are a language-neutral, platform-neutral, extensible way of serializing structured data for use 
in communications protocols, data storage, and more, originally designed at Google ([see](https://developers.google.com/protocol-buffers/docs/overview)).

**protobuf.js** is a pure JavaScript implementation for node and the browser with zero dependencies. It efficiently
encodes plain objects and custom classes and works out of the box with .proto files.

**This is the development branch of protobuf.js 6.** Are you looking for the [current stable branch](https://github.com/dcodeIO/protobuf.js/tree/ProtoBuf5)?

Examples
--------

```
$> npm install protobufjs
```

### Using .proto files

```protobuf
// awesome.proto
package awesomepackage;
syntax = "proto3";

message AwesomeMessage {
    string awesomefield = 1;
}
```

```js
var protobuf = require("protobufjs");

protobuf.load("awesome.proto", function(err, root) {
    if (err) throw err;
    
    // Obtain a message type
    var AwesomeMessage = root.lookup("awesomepackage.AwesomeMessage");

    // Create a new message
    var message = AwesomeMessage.create({ awesomefield: "AwesomeString" });

    // Encode a message (note that reflection encodes to a writer and we need to call finish)
    var buffer = AwesomeMessage.encode(message).finish();
    // ... do something with buffer

    // Or, encode a plain object (note that reflection encodes to a writer and we need to call finish)
    var buffer = AwesomeMessage.encode({ awesomefield: "AwesomeString" }).finish();
    // ... do something with buffer

    // Decode a buffer
    var message = AwesomeMessage.decode(buffer);
    // ... do something with message
});
```

You can also use promises by omitting the callback:

```js
protobuf.load("awesome.proto")
    .then(function(root) {
       ...
    });
``` 

### Using reflection only

```js
...
var Root  = protobuf.Root,
    Type  = protobuf.Type,
    Field = protobuf.Field;

var AwesomeMessage = new Type("AwesomeMessage").add(new Field(1, "awesomefield", "string"));

var root = new Root().define("awesomepackage").add(AwesomeMessage);

// Continue at "Create a new message" above
...
```

### Using your own classes (wip)

```js
...
var Prototype = protobuf.Prototype;

function AwesomeMessage(properties) {
    Prototype.call(this, properties);
}
Prototype.extend(AwesomeMessage, root.lookup("awesomepackage.AwesomeMessage") /* or use reflection */);

var message = new AwesomeMessage({ awesomefield: "AwesomeString" });

// Encode a message (note that classes encode to a buffer directly)
var buffer = AwesomeMessage.encode(message);
// ... do something with buffer

// Or, encode a plain object (note that classes encode to a buffer directly)
var buffer = AwesomeMessage.encode({ awesomefield: "AwesomeString" });
// ... do something with buffer

// Decode a buffer
var message = AwesomeMessage.decode(buffer);
// ... do something with message
```

Structure
---------
The library exports a flat `protobuf` namespace with the following members, ordered by category:

### Parser

* **load(filename: `string|Array`, [root: `Root`], [callback: `function(err: Error, [root: Root])`]): `Promise`** [[source](./src/index.js)]<br />
  Loads one or multiple .proto files into the specified root or creates a new one when omitted.

* **tokenize(source: `string`): `Object`** [[source](./src/tokenize.js)]<br />
  Tokenizes the given .proto source and returns an object with useful utility functions.

* **parse(source: `string`): `Object`** [[source](./src/parse.js)]<br />
  Parses the given .proto source and returns an object with the parsed contents.
  
  * **package: `string|undefined`**<br />
    The package name, if declared.

  * **imports: `Array|undefined`**<br />
    File names of imported files, if any.

  * **publicImports: `Array|undefined`**<br />
    File names of publicly imported files, if any.

  * **weakImports: `Array|undefined`**<br />
    File names of weakly imported files, if any.

  * **syntax: `string|undefined`**<br />
    Source syntax, if defined.
 
  * **root: `Root`**<br />
    The root namespace.

### Serialization

* **Writer** [[source](./src/writer.js)]<br />
  Wire format writer.

* **BufferWriter** _extends **Writer**_ [[source](./src/writer.js)]<br />
  Wire format writer, node version.

* **Reader** [[source](./src/reader.js)]<br />
  Wire format reader.

* **BufferReader** _extends **Reader**_ [[source](./src/reader.js)]<br />
  Wire format reader, node version.

### Reflection

* **ReflectionObject** [[source](./src/object.js)]<br />
  Base class of all reflection objects.

* **Namespace** _extends **ReflectionObject**_ [[source](./src/namespace.js)]<br />
  Base class of all reflection objects containing nested objects.

* **Root** _extends **Namespace**_ [[source](./src/root.js)]<br />
  Root namespace.

* **Type** _extends **Namespace**_ [[source](./src/type.js)]<br />
  Reflected message type.

* **Field** _extends **ReflectionObject**_ [[source](./src/field.js)]<br />
  Reflected message field.

* **MapField** _extends **Field**_ [[source](./src/mapfield.js)]<br />
  Reflected message map field.

* **Enum** _extends **ReflectionObject**_ [[source](./src/enum.js)]<br />
  Reflected enum.

* **Service** _extends **Namespace**_ [[source](./src/service.js)]<br />
  Reflected service.

* **Method** _extends **ReflectionObject**_ [[source](./src/method.js)]<br />
  Reflected service method.

### Runtime

* **Prototype** [[source](./src/prototype.js)]<br />
  Runtime message prototype ready to be extended by custom classes or generated code.

### Utility

* **util: `Object`** [[source](./src/util.js)]<br />
  Utility functions.

* **types: `Object`** [[source](./src/types.js)]<br />
  Common type constants.

Documentation
-------------

You can find documentation on these objects within the respective source files or alternatively build
the documentation by first installing the development dependencies (if you haven't already) through
running

```
$> npm install --dev
```

and then building the documentation to `docs/` through running

```
$> npm run docs
```

Building
--------

To build production and development versions with their respective source maps for the browser, first
install the development dependencies (if you haven't already) through running

```
$> npm install --dev
```

and then build the development and production versions to `dist/` through running

```
$> npm run build
```

Compatibility
-------------
* This library requires an ES5-capable browser. To load .proto files, it requires XMLHttpRequest. If typed arrays are not
  supported, it uses plain arrays instead.

* If you'd like to use node's buffer API in the browser, you can use [feross/buffer](https://github.com/feross/buffer)
  for example and assign its constructor, or that of any compatible library, to `protobuf.util.Buffer`.

* If you need a proper way to work with 64 bit values (uint64, int64 etc.), you can install
  [long.js](https://github.com/dcodeIO/long.js) alongside this library. Just as with buffers, you
  can assign its constructor, or that of any compatible library, to `protobuf.util.Long`. All 64
  bit numbers will then be returned as a `Long` instance. That's not a requirement, though ([see](./src/support/long.js)).

**License:** [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)
