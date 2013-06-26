![ProtoBuf.js - protobuf for JavaScript](https://raw.github.com/dcodeIO/ProtoBuf.js/master/ProtoBuf.png)
=====================================

When working with binary data on the network level, Google's Protocol Buffers aka protobuf is probably the best tool for
the job as it supports putting together entire message and even sub-message structures assembled from a variety of
useful data types while still remaining extensible for future cases.

Unfortunately, Google's reference implementations are available for C and Java only. Because of this, some protobuf
implementations have popped up for JavaScript lately but most of them have some fundamental restrictions.
Some of them implement just a subset of protobuf's functionality while others require some level of cross-compilation
towards using Google's protoc. As a result I found myself compiling things that didn't work or, if they did, missing
features that I really need. **Fortunately, that's where ProtoBuf.js comes into play!**

**ProtoBuf.js** is a protobuf implementation on top of [ByteBuffer.js](https://github.com/dcodeIO/ByteBuffer.js) including
a .proto parser, reflection, message class building and simple encoding and decoding in plain JavaScript. There is no
compilation step required, it's super easy to use and it works out of the box on .proto files!

Usage
-----
In the process of ProtoBuf.js becoming mature, documentation had been extended to cover so many details, that it's best to
split it up to a few easy to grasp sections. So:

* Step 1: Become familar with [Google's Protocol Buffers (protobuf)](https://developers.google.com/protocol-buffers/docs/overview)
* Step 2: Head straight to our wiki for up to date [usage, examples and further documentation](https://github.com/dcodeIO/ProtoBuf.js/wiki)

Features
--------
* [CommonJS](http://www.commonjs.org/) compatible
* [RequireJS](http://requirejs.org/)/AMD compatible
* [node.js](http://nodejs.org) compatible, also available via [npm](https://npmjs.org/package/protobufjs)
* Browser compatible
* [Closure Compiler](https://developers.google.com/closure/compiler/) compatible (fully annotated, [externs](https://github.com/dcodeIO/ProtoBuf.js/tree/master/externs))
* Fully documented using [jsdoc3](https://github.com/jsdoc3/jsdoc)
* Well tested through [test.js](https://github.com/dcodeIO/test.js)
* [ByteBuffer.js](https://github.com/dcodeIO/ByteBuffer.js) is the only production dependency
* Small footprint (even smaller if you use a noparse build)
* proto2js command line tool

Contributors
------------
[Frank Xu](https://github.com/yyfrankyy), [Dretch](https://github.com/Dretch), [shirmin](https://github.com/shirmin)

**License:** [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)
