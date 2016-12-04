protobuf.js 5 [![Build Status](https://travis-ci.org/dcodeIO/protobuf.js.svg?branch=ProtoBuf5)](https://travis-ci.org/dcodeIO/protobuf.js) [![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=dcode%40dcode.io&item_name=%3C3%20protobuf.js)
=====================================
**Protocol Buffers** are a language-neutral, platform-neutral, extensible way of serializing structured data for use
in communications protocols, data storage, and more, originally designed at Google ([see](https://developers.google.com/protocol-buffers/docs/overview)).

**protobuf.js** is a pure JavaScript implementation on top of [bytebuffer.js](https://github.com/dcodeIO/bytebuffer.js)
including a .proto parser, message class building and simple encoding and decoding. There is no compilation step
required, it's super easy to use and it works out of the box on .proto files!

Getting started
---------------
* **Step 1:** Become familar with [Google's Protocol Buffers (protobuf)](https://developers.google.com/protocol-buffers/docs/overview)
* **Step 2:** Read on or head straight to [our wiki](https://github.com/dcodeIO/protobuf.js/wiki) for additional information
* **Step 3:** Build something cool! :-)

Features
--------
* [RequireJS](http://requirejs.org/)/AMD compatible
* [node.js](http://nodejs.org)/CommonJS compatible, also available via [npm](https://npmjs.org/package/protobufjs)
* Browser compatible
* [Closure Compiler](https://developers.google.com/closure/compiler/) compatible (fully annotated, [externs](https://github.com/dcodeIO/protobuf.js/tree/master/externs))
* Fully documented using [jsdoc3](https://github.com/jsdoc3/jsdoc)
* Well tested through [test.js](https://github.com/dcodeIO/test.js)
* [bytebuffer.js](https://github.com/dcodeIO/bytebuffer.js) is the only production dependency
* Fully compatible to the official implementation including advanced features
* proto2js command line utility

Installation
------------

### node.js / CommonJS

```
$> npm install protobufjs
```

```js
var ProtoBuf = require("protobufjs");
...
```

### RequireJS / AMD

Requires [bytebuffer.js](http://github.com/dcodeIO/bytebuffer.js). Optionally depends on [long.js](https://github.com/dcodeIO/long.js) for long (int64) support. If you do not require long support, you can skip the Long.js config. RequireJS example:

```js
require(["protobuf"], function(ProtoBuf) {
    ...
});
```

Or as a module dependency:

```js
define("MyModule", ["protobuf"], function(ProtoBuf) {
    ...
});
```

### Browser

Requires [bytebuffer.js](http://github.com/dcodeIO/bytebuffer.js). Optionally depends on [long.js](https://github.com/dcodeIO/long.js) for long (int64) support. If you do not require long support, you can skip the Long.js include.

```html
<!-- Order is important -->
<script src="long.min.js"></script>
<script src="bytebuffer.min.js"></script>
<script src="protobuf.min.js"></script>
```

```js
var ProtoBuf = dcodeIO.ProtoBuf;
...
```

Getting started
---------------

*Note:* You'll need the full build to load .proto data. light builds are able to load JSON only.

### Loading .proto files

To load a .proto file, use:

**API:** `ProtoBuf.loadProtoFile(source[, callback[, builder]]):Builder|undefined`

```js
// Synchronously
var builder = ProtoBuf.loadProtoFile("path/to/file.proto");

// Asynchronously
ProtoBuf.loadProtoFile("path/to/file.proto", function(err, builder) {
    ...
});
```

`ProtoBuf.loadProtoFile` also accepts an object specifying the import root directory and the file to load as its first parameter: `{root: string, file: string}`. Additionally, an already created and then reused builder can be specified as the last argument, which is useful if all the definitions shall reside in a single namespace.

### Loading .proto strings

**API:** `ProtoBuf.loadProto(source[, builder][, filename]):Builder`

```js
var builder = ProtoBuf.loadProto(...protoString..., "myproto.proto");
```

### Loading JSON files and strings

To load the (raw) JSON counterpart generated through pbjs, use `ProtoBuf.loadJsonFile` respectively `ProtoBuf.loadJson`. It's the same API.

If you generated classes or modules with it, loading is done just by including respectively requiring the resulting file. Loading is handled transparently in this case.

When using JSON only, you can use protobuf-light.js or protobuf-light.min.js instead, which do NOT include the ProtoBuf.DotProto package for parsing and are therefore smaller.

Command line
------------
Since ProtoBuf.js 4.0.0 the library ships with the `pbjs` command line utility. With it it's possible to convert between .proto and JSON descriptors and even to generate the code required to access runtime structures as pure JS (classes), an AMD module or a CommonJS module.

```

 _ |_ . _
|_)|_)|_)           ProtoBuf.js v4.0.0-b3 https://github.com/dcodeIO/ProtoBuf.js
|     '

CLI utility to convert between .proto and JSON syntax / to generate classes.

Usage: pbjs <filename> [options] [> outFile]

Options:
  --help, -h        Show help  [boolean]
  --version, -v     Show version number  [boolean]
  --source, -s      Specifies the source format. Valid formats are:

                       json       Plain JSON descriptor
                       proto      Plain .proto descriptor

  --target, -t      Specifies the target format. Valid formats are:

                       amd        Runtime structures as AMD module
                       commonjs   Runtime structures as CommonJS module
                       js         Runtime structures
                       json       Plain JSON descriptor
                       proto      Plain .proto descriptor

  --using, -u       Specifies an option to apply to the volatile builder
                    loading the source, e.g. convertFieldsToCamelCase.
  --min, -m         Minifies the output.  [default: false]
  --path, -p        Adds a directory to the include path.
  --legacy, -l      Includes legacy descriptors from google/protobuf/ if
                    explicitly referenced.  [default: false]
  --quiet, -q       Suppresses any informatory output to stderr.  [default: false]
  --use, -i         Specifies an option to apply to the emitted builder
                    utilized by your program, e.g. populateAccessors.
  --exports, -e     Specifies the namespace to export. Defaults to export
                    the root namespace.
  --dependency, -d  Library dependency to use when generating classes.
                    Defaults to 'protobufjs' for CommonJS, 'ProtoBuf' for
                    AMD modules and 'dcodeIO.ProtoBuf' for classes.
```

Documentation
-------------
* [Read the official protobuf guide](https://developers.google.com/protocol-buffers/docs/overview)
* [Read the API docs](http://htmlpreview.github.io/?https://raw.githubusercontent.com/dcodeIO/protobuf.js/ProtoBuf5/docs/ProtoBuf.html)
* [Check out the examples](https://github.com/dcodeIO/protobuf.js/tree/ProtoBuf5/examples)

Tests
-----
* [View source](https://github.com/dcodeIO/protobuf.js/blob/ProtoBuf5/tests/suite.js)

Downloads
---------
* [Distributions](https://github.com/dcodeIO/protobuf.js/tree/ProtoBuf5/dist)
* [ZIP-Archive](https://github.com/dcodeIO/protobuf.js/archive/ProtoBuf5.zip)
* [Tarball](https://github.com/dcodeIO/protobuf.js/tarball/ProtoBuf5)

CDN usage
---------
```html
<script src="//cdn.rawgit.com/dcodeIO/protobuf.js/5.0.1/dist/protobuf.min.js"></script>
```
With the version pointing to the exact [release](https://github.com/dcodeIO/protobuf.js/releases) your project depends upon.

**License:** [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)
