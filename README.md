![ProtoBuf.js - protobuf for JavaScript](https://raw.github.com/dcodeIO/ProtoBuf.js/master/ProtoBuf.png)
=====================================

A protobuf implementation on top of [ByteBuffer.js](https://github.com/dcodeIO/ByteBuffer.js) including a .proto parser,
reflection, message class building and simple encoding and decoding in plain JavaScript. No compilation step required,
works out of the box on .proto files. It's also used for the cross-platform multiplayer component in
[eSoccer](http://www.esoccer.me), an HTML5 game developed at [University of Applied Sciences Bonn](http://www.h-brs.de).

Features
--------
* [CommonJS](http://www.commonjs.org/) compatible
* [RequireJS](http://requirejs.org/)/AMD compatible
* Shim compatible (include the script, then use `var ProtoBuf = dcodeIO.ProtoBuf;`)
* [node.js](http://nodejs.org) compatible, also available via [npm](https://npmjs.org/package/protobufjs)
* [Closure Compiler](https://developers.google.com/closure/compiler/) compatible (fully annotated, [externs](https://github.com/dcodeIO/ProtoBuf.js/tree/master/externs))
* Fully documented using [jsdoc3](https://github.com/jsdoc3/jsdoc)
* Well tested through [nodeunit](https://github.com/caolan/nodeunit)
* [ByteBuffer.js](https://github.com/dcodeIO/ByteBuffer.js) is the only production dependency
* Small footprint (even smaller if you use a noparse build)

Builder
-------
Probably the core component of ProtoBuf.js. Resolves all type references, performs all the necessary checks and returns
ready to use classes. Can be created from a .proto file or from a JSON definition. The later does not even require the
.proto parser to be included ([see](https://github.com/dcodeIO/ProtoBuf.js#using-json-without-the-proto-parser)).

Install: `npm install protobufjs`

#### Using .proto files ####

Example: [tests/complex.proto](https://github.com/dcodeIO/ProtoBuf.js/tree/master/tests/complex.proto)

```javascript
var ProtoBuf = require("protobufjs");

var builder = ProtoBuf.protoFromFile("tests/complex.proto");
var Game = builder.build("Game");
var Car = Game.Cars.Car;

// Construct with arguments list in field order:
var car = new Car("Rusty", new Car.Vendor("Iron Inc.", new Car.Vendor.Address("US")), Car.Speed.SUPERFAST);

// OR: Construct with values from an object, implicit message creation (address) and enum values as strings:
var car = new Car({
    "model": "Rusty",
    "vendor": {
        "name": "Iron Inc.",
        "address": {
            "country": "US"
        }
    },
    "speed": "SUPERFAST" // also equivalent to "speed": 2
});

// OR: It's also possible to mix all of this!

// Afterwards, just encode your message:
var buffer = car.encode();

// And send it over the wire:
var socket = ...;
socket.send(buffer.toArrayBuffer());

// OR: Short...
socket.send(car.toArrayBuffer());
```

#### Putting multiple .proto files into a common namespace ####

Example: [tests/example1.proto](https://github.com/dcodeIO/ProtoBuf.js/tree/master/tests/example1.proto),
[tests/example2.proto](https://github.com/dcodeIO/ProtoBuf.js/tree/master/tests/example2.proto)

```javascript
var builder = ProtoBuf.protoFromFile("tests/example1.proto");
ProtoBuf.protoFromFile("tests/example2.proto", builder);
var root = builder.build();
var test1 = new root.Test1(123);
var test2 = new root.Test2("123");
...
```

#### Using JSON without the .proto parser ####

Example: [tests/complex.json](https://github.com/dcodeIO/ProtoBuf.js/tree/master/tests/complex.json)

```javascript
var ProtoBuf = require("protobufjs");

var builder = ProtoBuf.newBuilder();    // Alternatively:
builder.define("Game");                 // var builder = ProtoBuf.newBuilder("Game");
builder.create([
      {
          "name": "Car",
          "fields": [
              {
                  "rule": "required",
                  "type": "string",
                  "name": "model",
                  "id": 1
              },
              ...
          ],
          "messages": [
              {
                  "name": "Vendor",
                  "fields": ...,
              },
              ...
          ],
          "enums": [
              {
                  "name": "Speed",
                  "values": [
                      {
                          "name": "FAST",
                          "id": 1
                      },
                      ...
                  ]
              }
          ]
      }
]);

var Game = builder.build("Game");
var Car = Game.Cars.Car;
... actually the same as above ...
```

When using JSON only, you can use [ProtoBuf.noparse.js](https://github.com/dcodeIO/ProtoBuf.js/blob/master/ProtoBuf.noparse.js)
/ [ProtoBuf.noparse.min.js](https://github.com/dcodeIO/ProtoBuf.js/blob/master/ProtoBuf.noparse.min.js) instead, which
do NOT include the `ProtoBuf.DotProto` package for parsing and are therefore even smaller.

Encoder / Decoder
-----------------
Built into all message classes. Just call `YourMessage#encode([buffer])` respectively `YourMessage.decode(buffer)`.

#### Encoding a message ####

```javascript
...
var YourMessage = builder.build("YourMessage");
var myMessage = new YourMessage(...);
var byteBuffer = myMessage.encode();
var buffer = byteBuffer.toArrayBuffer();

// OR: Short...
var buffer = myMessage.toArrayBuffer();

var socket = ...; // E.g. a WebSocket
socket.send(buffer);
```

#### Decoding from an ArrayBuffer/ByteBuffer ####

```javascript
...
var YourMessage = builder.build("YourMessage");
var buffer = ...; // E.g. a buffer received on a WebSocket
var myMessage = YourMessage.decode(buffer);
```

Command line utility
--------------------
It's also possible to transform .proto files into their JSON counterparts or to transform entire namespaces into
ready-to-use message classes and enum objects by using the `proto2js` command line utility.

```
  Usage: proto2js protoFile [-class[=My.Package]|-commonjs[=My.Package]|-amd[=My.Package]] [-min] [> outFile]

  Options:

    -class[=My.Package]     Creates the classes instead of just a JSON definition.
                            If you do not specify a package, the package
                            declaration from the .proto file is used instead.

    -commonjs[=My.Package]  Creates a CommonJS export instead of just a JSON def.
                            If you do not specify a package, the package
                            declaration from the .proto file is used instead.

    -amd[=My.Package]       Creates an AMD define instead of just a JSON def.
                            If you do not specify a package, the package
                            declaration from the .proto file is used instead.

    -min                    Minifies the output.
```

So, to create a JSON definition from the [tests/complex.proto](https://github.com/dcodeIO/ProtoBuf.js/blob/master/tests/complex.proto)
file, run:

```bash
proto2js tests/complex.proto > tests/complex.json
```

Or to create classes/a CommonJS export/an AMD define for the entire `Game` namespace, run:

```bash
proto2js tests/complex.proto -class=Game > tests/complex.js
```

```bash
proto2js tests/complex.proto -commonjs=Game > tests/complex.js
# ^ The resulting code will implicitly call require("protobufjs");
```

```bash
proto2js tests/complex.proto -amd=Game.Cars > tests/complex.js
# ^ The resulting code will implicitly use ["ProtoBuf"] as its
#   declared dependencies and "Game/Cars" as the module name
```

Parser
------
Only available in the full build (i.e. not in "noparse" builds). Compliant with the protobuf parser to the following extend:

* Required, optional, repeated and packed repeated fields:

  ```protobuf
  message Test {
      required int32 a = 1;
      optional int32 b = 2 [default=100];
      repeated int32 c = 3;
      repeated int32 c = 4 [packed=true];
  }
  ```

* Data types: int32, uint32, sint32, fixed32, sfixed32, int64, uint64, sint64, fixed64, sfixed64, bool, enum, string,
  bytes, messages, embedded messages, float, double
  
  ```protobuf
  message Test {
      required int32 a = 1; // Varint encoded
      required uint32 b = 2; // Varint encoded
      required sint32 c = 3; // Varint zigzag encoded
      required bool d = 4; // Varint encoded
    
      enum Priority {
          LOW = 1;
          MEDIUM = 2;
          HIGH = 3;
      }
    
      optional Priority e = 5 [default=MEDIUM]; // Varint encoded
      required string f = 6; // Varint length delimited
      required bytes g = 7; // Varint length delimited
      required Embedded h = 8; // Varint length delimited
    
      message Embedded {
          repeated int32 a = 1; // Multiple tags
          repeated int32 b = 2 [packed=true]; // One tag, length delimited
          
          required sfixed32 c = 3; // Fixed 4 bytes int32
          required fixed32 d = 4; // Fixed 4 bytes uint32
          required float e = 5; // Fixed 4 bytes
          required double f = 6; // Fixed 8 bytes
          
          // Through ByteBuffer.js loaded with Long.js:
          optional int64 g = 7; // Varint encoded
          optional uint64 h = 8; // Varint encoded
          optional sint64 i = 9; // Varint zigzag encoded
          required sfixed64 j = 10; // Fixed 8 bytes int64
          required fixed64 k = 11; // Fixed 8 bytes uint64
      }
  }
  ```
  
* Packages

  ```protobuf
  package My.Game;
  
  message Test {
      ...
  }
  
  message Test2 {
      required My.Game.Test test = 1;
  }
  ```
  
* Qualified and fully qualified name resolving:

  ```protobuf
  package My.Game;
  
  message Test {
      ...
      
      enum Priority {
          LOW = 1;
          MEDIUM = 2;
          HIGH = 3;
      }
  }
  
  message Test2 {
      required .My.Game.Test.Priority priority_fqn = 1 [default=LOW];
      required Test.Priority priority_qn = 2 [default=MEDIUM];
  }
  ```  

* Options on all levels:
  
  ```protobuf
  option toplevel_1 = 10;
  option toplevel_2 = "Hello!";
  
  message Test {
      option inmessage = "World!";
      optional int32 somenumber = 1 [default=123]; // Actually the only one used
  }
  ```
  
  Paranthesis around option names, like `option (inmessage) = ...` are ignored for compatibility with custom options.
  Accessing arbitrary options on namespace objects emitted by a builder is also possible (requires an ECMAScript 5 /
  Javascript 1.8.5 compatible environment, e.g. node.js or any modern browser):
  
  ```javascript
  ...
  var root = builder.build();
  console.log(root.$options); // { 'toplevel_1': 10, 'toplevel_2': 'Hello!' }
  console.log(root.Test.$options); // { 'inmessage': 'World!' }
  ```

* Imports:

  ```protobuf
  package My; // Not used by the following imports
  import public "example1.proto"; // The "public" keyword is ignored
  import "example2.proto";
  
  message Test2 {
      required Test1 test1 = 0; // Unique name
      required .Test2 test2 = 1; // Duplicate name resolved absolutely
  }
  ```
  
  See also: [example1.proto](https://github.com/dcodeIO/ProtoBuf.js/tree/master/tests/example1.proto),
  [example2.proto](https://github.com/dcodeIO/ProtoBuf.js/tree/master/tests/example2.proto)
  
  ```javascript
  var builder = ProtoBuf.protoFromFile("tests/imports.proto");
  var root = builder.build();
  // root now contains:
  // - .Test1
  // - .Test2
  // - .My.Test2 using .Test1 for field 'test1' and .Test2 for field 'test2'
  ```
  
  **NOTE:** Importing .proto files is available in the full build (not in the noparse build) only. Importing the .json
  counterpart of a .proto file (e.g. generated by proto2js) is supported regardless of the build you are using. Imports
  are also always fetched *synchronously*, so it's a good idea to package everything into a single file when using it in
  the browser.
  
* Extensions:
  
  ```protobuf
  extend something {
      ...
  }
  ```
  
  ```protobuf
  import "google/protobuf/descriptor.proto";
  ```
  
  These statements are actually simply ignored to make existing definitions compile fine. Low-level bootstrapping
  is not required by ProtoBuf.js.
  
#### Not (yet) supported ####
* *Extensions* (what for?) and *services* (you roll your own, don't you?). If you need anything of this, please open an
  issue and explain your exact requirements. It's just that I have no idea how to benefit from that and therefore I am
  not sure how to design it.

#### Calling the parser on your own ####
  
```javascript
var ProtoBuf = require("protobufjs"),
    fs = require("fs"),
    util = require("util");

var parser = new ProtoBuf.DotProto.Parser(fs.readFileSync("tests/complex.proto"));
var ast = parser.parse();
console.log(util.inspect(ast, false, null, true));
```

CommonJS, AMD and browser (shim)
--------------------------------

#### node.js / CommonJS ####

```bash
npm install protobufjs
```

```javascript
var ProtoBuf = require("protobufjs");
...
```

#### RequireJS / AMD ####

Requires [ByteBuffer.js](http://github.com/dcodeIO/ByteBuffer.js). Optionally depends on [Long.js](https://github.com/dcodeIO/Long.js)
for long (int64) support. If you do not require long support, you can skip the Long.js config. [Require.js](http://requirejs.org/)
example:

```javascript
require.config({
    ...
    "paths": {
        "Long": "/path/to/Long.js",
        "ByteBuffer": "/path/to/ByteBuffer.js",
        "ProtoBuf": "/path/to/ProtoBuf.js"
    },
    ...
});
require(["ProtoBuf"], function(ProtoBuf) {
    ...
});
```

Or as a module dependency:

```javascript
define("MyModule", ["ProtoBuf"], function(ProtoBuf) {
    ...
});
```

#### Browser (shim) ####

Requires [ByteBuffer.js](http://github.com/dcodeIO/ByteBuffer.js). Optionally depends on [Long.js](https://github.com/dcodeIO/Long.js)
for long (int64) support. If you do not require long support, you can skip the Long.js include.

```html
<script src="//raw.github.com/dcodeIO/Long.js/master/Long.min.js"></script>
<script src="//raw.github.com/dcodeIO/ByteBuffer.js/master/ByteBuffer.min.js"></script>
<script src="//raw.github.com/dcodeIO/ProtoBuf.js/master/ProtoBuf.min.js"></script>
```

```javascript
var ProtoBuf = dcodeIO.ProtoBuf;
...
```

On long (int64) support
-----------------------
Full 64bit support is available since 0.10.0 and requires ByteBuffer.js >=1.2.3 with Long.js >=1.1.2.
* [See also](https://github.com/dcodeIO/ByteBuffer.js#on-long-int64-support)

On endianess before 0.11
--------------------------
Till 0.10, ProtoBuf.js mistakenly used big endian byte order when en-/decoding non-varint values as [reported by
bertdouglas](https://github.com/dcodeIO/ProtoBuf.js/pull/5). This has been corrected in 0.11.0. However, versions before
0.11 are now to consider **incompatible** with later versions when using non-varint values, so please upgrade to the
latest version to ensure compatibility with the official protobuf specification.

Downloads
---------
* [ZIP-Archive](https://github.com/dcodeIO/ProtoBuf.js/archive/master.zip)
* [Tarball](https://github.com/dcodeIO/ProtoBuf.js/tarball/master)

Documentation
-------------
* [View documentation](http://htmlpreview.github.com/?http://github.com/dcodeIO/ProtoBuf.js/master/docs/ProtoBuf.html)

Tests (& Examples) [![Build Status](https://travis-ci.org/dcodeIO/ProtoBuf.js.png?branch=master)](https://travis-ci.org/dcodeIO/ProtoBuf.js)
------------------
* [View source](https://github.com/dcodeIO/ProtoBuf.js/blob/master/tests/suite.js)
* [View node report](https://travis-ci.org/dcodeIO/ProtoBuf.js)
* [View browser report](http://htmlpreview.github.com/?http://github.com/dcodeIO/ProtoBuf.js/master/tests/suite.html)

Contributors
------------
[Frank Xu](https://github.com/yyfrankyy)

License
-------
Apache License, Version 2.0 - http://www.apache.org/licenses/LICENSE-2.0.html
