![protobuf.js - Protocol Buffers for JavaScript. Finally.](https://raw.github.com/dcodeIO/protobuf.js/master/protobuf.png)
=====================================
**Protocol Buffers** are a language-neutral, platform-neutral, extensible way of serializing structured data for use
in communications protocols, data storage, and more, originally designed at Google ([see](https://developers.google.com/protocol-buffers/docs/overview)).

**protobuf.js** is a pure JavaScript implementation on top of [bytebuffer.js](https://github.com/dcodeIO/bytebuffer.js)
including a .proto parser, message class building and simple encoding and decoding. There is no compilation step
required, it's super easy to use and it works out of the box on .proto files!

[![Build Status](https://travis-ci.org/dcodeIO/protobuf.js.svg?branch=master)](https://travis-ci.org/dcodeIO/protobuf.js)
[![Donate](https://raw.githubusercontent.com/dcodeIO/protobuf.js/master/donate.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=dcode%40dcode.io&item_name=%3C3%20protobuf.js)

Getting started
---------------
* **Step 1:** Become familar with [Google's Protocol Buffers (protobuf)](https://developers.google.com/protocol-buffers/docs/overview)
* **Step 2:** Head straight to [our wiki for up to date usage information, changes and examples](https://github.com/dcodeIO/protobuf.js/wiki)
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

Documentation
-------------
* [Read the official protobuf guide](https://developers.google.com/protocol-buffers/docs/overview)
* [Read our wiki](https://github.com/dcodeIO/protobuf.js/wiki)
* [Read the API docs](http://htmlpreview.github.io/?https://raw.githubusercontent.com/dcodeIO/protobuf.js/master/docs/ProtoBuf.html)
* [Check out the examples](https://github.com/dcodeIO/protobuf.js/tree/master/examples)

Tests
-----
* [View source](https://github.com/dcodeIO/protobuf.js/blob/master/tests/suite.js)
* [View report](https://travis-ci.org/dcodeIO/protobuf.js)

Downloads
---------
* [Distributions](https://github.com/dcodeIO/protobuf.js/tree/master/dist)
* [ZIP-Archive](https://github.com/dcodeIO/protobuf.js/archive/master.zip)
* [Tarball](https://github.com/dcodeIO/protobuf.js/tarball/master)

CDN usage
---------
```html
<script src="//cdn.rawgit.com/dcodeIO/protobuf.js/VERSION/dist/protobuf.js"></script>
```
With `VERSION` replaced by [a valid tag](https://github.com/dcodeIO/protobuf.js/releases) or just `master` for testing
the latest master build.

Contributors
------------
[Daniel Wirtz](https://github.com/dcodeIO) (maintainer), [Frank Xu](https://github.com/yyfrankyy),
[Dretch](https://github.com/Dretch), [shirmin](https://github.com/shirmin), [Nikolai Vavilov](https://github.com/seishun)

**License:** [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html) - Logo derived from [W3C HTML5 Logos](http://www.w3.org/html/logo/) (CC A 3.0)
