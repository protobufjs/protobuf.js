ProtoBuf.js - protobuf for JavaScript
=====================================

Till now: Provides a parser for .proto files in plain JavaScript. More is planned.

Parser
------
Should be compliant with protoc. No validation of type references yet, just parsing.

```
npm install protobufjs
```

```javascript
var ProtoBuf = require("protobufjs"),
    fs = require("fs"),
    util = require("util");

var proto = fs.readFileSync("test.proto");
var parser = new ProtoBuf.DotProto.Parser(proto);
var ast = parser.parse();
console.log(util.inspect(ast, false, null, true));
```

Builder
-------
TODO

Encoder
-------
TODO

Decoder
-------
TODO

Features
--------
* [CommonJS](http://www.commonjs.org/) compatible
* [RequireJS](http://requirejs.org/)/AMD compatible
* Shim compatible (include the script, then use `var ProtoBuf = dcodeIO.ProtoBuf;`)
* [node.js](http://nodejs.org) compatible, also available via [npm](https://npmjs.org/package/protobufjs)
* [Closure Compiler](https://developers.google.com/closure/compiler/) ADVANCED_OPTIMIZATIONS compatible (fully annotated)
* Fully documented ([jsdoc3](https://github.com/jsdoc3/jsdoc))
* [ByteBuffer.js](https://github.com/dcodeIO/ByteBuffer.js) is the only dependency
* Small footprint

License
-------
Apache License, Version 2.0 - http://www.apache.org/licenses/LICENSE-2.0.html