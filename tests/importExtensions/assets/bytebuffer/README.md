![ByteBuffer.js - A Java-like ByteBuffer](https://raw.github.com/dcodeIO/ByteBuffer.js/master/ByteBuffer.png)
======================================
Provides a Java-like, Netty-inspired ByteBuffer implementation using typed arrays. It also tries to abstract a bit of
the complexity away by providing convenience methods for those who just want to write stuff without caring about signed,
unsigned and the actual bit sizes. It's also one of the components driving [ProtoBuf.js](https://github.com/dcodeIO/ProtoBuf.js).

ByteBuffer
----------
* Mimics [Java ByteBuffers](http://docs.oracle.com/javase/1.5.0/docs/api/java/nio/ByteBuffer.html) as close as reasonable while using typed array terms
* Full 64bit support via [Long.js](https://github.com/dcodeIO/Long.js) (optional)
* Simple allocation (`new ByteBuffer(capacity[, littleEndian])` or `ByteBuffer.allocate(capacity[, littleEndian])`)
* Wrapping of quite everything which is or includes an ArrayBuffer (`ByteBuffer.wrap(buffer[, littleEndian])`)
* Cloning using the same (`ByteBuffer#clone()`) and copying using an independent backing buffer (`ByteBuffer#copy()`)
* Slicing using the same (`ByteBuffer#slice(begin, end)`) and using an indepentent backing buffer (`ByteBuffer#sliceAndCompact(begin, end)`)
* Manual offset (`ByteBuffer#offset` and `ByteBuffer#length`) and array manipulation (`ByteBuffer#array`)
* Remaining readable bytes (`ByteBuffer#remaining()`) and backing buffer capacity getters (`ByteBuffer#capacity()`)
* Explicit (`ByteBuffer#resize(capacity)`) and implicit resizing (`ByteBuffer#ensureCapacity(capacity)`)
* Efficient implicit resizing by doubling the current capacity
* Flipping (`ByteBuffer#flip()`), marking (`ByteBuffer#mark([offset])`) and resetting (`ByteBuffer#reset()`)
* Compacting of the backing buffer (`ByteBuffer#compact()`)
* Conversion to ArrayBuffer (`ByteBuffer#toArrayBuffer([forceCopy])`) (i.e. to send data over the wire, e.g. a WebSocket
  with `binaryType="arraybuffer"`)
* Conversion to Buffer (`ByteBuffer#toBuffer()`) if running inside of node.js
* Reversing (`ByteBuffer#reverse()`), appending (`ByteBuffer#append(src[, offset])`) and prepending
  (`ByteBuffer#prepend(src[, offset])`) of other ByteBuffers with implicit capacity management
* Explicit destruction (`ByteBuffer#destroy()`)
* `ByteBuffer#writeUint/Int8/16/32/64(value[, offset])` and `ByteBuffer#readUint/Int8/16/32/64([offset])`
* `ByteBuffer#writeVarint32/64(value[, offset])` and `ByteBuffer#readVarint32/64([offset])` to write a base 128
  variable-length integer as used in [protobuf](https://developers.google.com/protocol-buffers/docs/encoding#varints)
* `ByteBuffer#writeZigZagVarint32/64(value[, offset])` and `ByteBuffer#readZigZagVarint32/64([offset])` to write a
  zig-zag encoded base 128 variable-length integer as used in protobuf for efficient encoding of signed values
* `ByteBuffer#writeFloat32/64(value[, offset])` and `ByteBuffer#readFloat32/64([offset])`
* `ByteBuffer#write/readByte`, `ByteBuffer#write/readShort`, `ByteBuffer#write/readInt`, `ByteBuffer#write/readLong`
  (all signed), `ByteBuffer#write/readVarint` and `ByteBuffer#write/readZigZagVarint` (both 32bit signed),
  `ByteBuffer#write/readFloat`, `ByteBuffer#write/readDouble` aliases for the above for convenience
* `ByteBuffer#writeUTF8String(str[, offset])`, `ByteBuffer#readUTF8String(chars[, offset])` and 
  `ByteBuffer#readUTF8StringBytes(length[, offset])` using the included UTF8 en-/decoder (full 6 bytes,
  [ref](http://en.wikipedia.org/wiki/UTF-8#Description))
* `ByteBuffer.encode64(bb)`, `ByteBuffer.decode64(str)` and `ByteBuffer#toBase64()` using the included Base64
  en/-decoder.
* `ByteBuffer#writeLString(str[, offset]))` and `ByteBuffer#readLString([offset])` to write respectively read a
  length-prepended (number of characters as UTF8 char) string
* `ByteBuffer#writeVString(str[, offset]))` and `ByteBuffer#readVString([offset])` to write respectively read a
  length-prepended (number of bytes as base 128 variable-length 32bit integer) string
* `ByteBuffer#writeCString(str[, offset])` and `ByteBuffer#readCString([offset])` to write respectively read a
  NULL-terminated (Uint8 0x00) string
* `ByteBuffer#writeJSON(data[, offset[, stringify]])` and `ByteBuffer#readJSON([offset[, parse]])` to write respectively
  read arbitraty object data. Allows overriding the default stringify (default: JSON.stringify) and parse (default: 
  JSON.parse) implementations.
* All with implicit offset advance if the offset parameter is omitted or without, if specified
* Chaining of all operations that allow this (i.e. do not return some specific value like in read operations), e.g.

  ```javascript
  var bb = new ByteBuffer();
  ...
  bb.reset().writeInt(1).writeLString("Hello world!").flip().compact()...
  ```
  
* Switching between little endian and big endian byte order through `ByteBuffer#LE()` and `ByteBuffer#BE()`, e.g.
  
  ```javascript
  var bb = new ByteBuffer(8).LE().writeInt(1).BE().writeInt(2).flip(); // toHex: <01 00 00 00 00 00 00 02>
  ```
  
* `ByteBuffer#toString([enc])`, `ByteBuffer#toHex([wrap])`, `ByteBuffer#toASCII([wrap])`, `ByteBuffer#toUTF8()`,
  `ByteBuffer#toBase64()` and `ByteBuffer#printDebug()` (emits hex + ASCII + offsets to console, looks like your
  favourite hex editor) for pain-free debugging
  
Features
--------
* [CommonJS](http://www.commonjs.org/) compatible
* [RequireJS](http://requirejs.org/)/AMD compatible
* [node.js](http://nodejs.org) compatible, also available via [npm](https://npmjs.org/package/bytebuffer)
* Browser compatible
* [Closure Compiler](https://developers.google.com/closure/compiler/) ADVANCED_OPTIMIZATIONS compatible (fully annotated,
  `ByteBuffer.min.js` has been compiled this way, `ByteBuffer.min.map` is the source map)
* Fully documented using [jsdoc3](https://github.com/jsdoc3/jsdoc)
* Well tested through [nodeunit](https://github.com/caolan/nodeunit)
* Zero production dependencies (Long.js is optional)
* Small footprint

Usage
-----
### Node.js / CommonJS ###
* Install: `npm install bytebuffer`

```javascript
var ByteBuffer = require("bytebuffer");
var bb = new ByteBuffer();
bb.writeLString("Hello world!");
bb.flip();
console.log(bb.readLString()+" from ByteBuffer.js");
```

### Browser ###

Optionally depends on [Long.js](https://github.com/dcodeIO/Long.js) for long (int64) support. If you do not require long
support, you can skip the Long.js include.

```html
<script src="//raw.github.com/dcodeIO/Long.js/master/Long.min.js"></script>
<script src="//raw.github.com/dcodeIO/ByteBuffer.js/master/ByteBuffer.min.js"></script>
```

```javascript
var ByteBuffer = dcodeIO.ByteBuffer;
var bb = new ByteBuffer();
bb.writeLString("Hello world!");
bb.flip();
alert(bb.readLString()+" from ByteBuffer.js");
```

### Require.js / AMD ###

Optionally depends on [Long.js](https://github.com/dcodeIO/Long.js) for long (int64) support. If you do not require long
support, you can skip the Long.js config. [Require.js](http://requirejs.org/) example:

```javascript
require.config({
    "paths": {
        "Long": "/path/to/Long.js"
        "ByteBuffer": "/path/to/ByteBuffer.js"
    }
});
require(["ByteBuffer"], function(ByteBuffer) {
    var bb = new ByteBuffer();
    bb.writeLString("Hello world!");
    bb.flip();
    alert(bb.readLString()+" from ByteBuffer.js");
});
```

On long (int64) support
-----------------------
As of the [ECMAScript specification](http://ecma262-5.com/ELS5_HTML.htm#Section_8.5), number types have a maximum value
of 2^53. Beyond that, behaviour might be unexpected. However, real long support requires the full 64 bits
with the possibility to perform bitwise operations on the value for varint en-/decoding. So, to enable true long support
in ByteBuffer.js, it optionally depends on [Long.js](https://github.com/dcodeIO/Long.js), which actually utilizes two
32 bit numbers internally. If you do not require long support at all, you can skip it and save the additional bandwidth.
On node, long support is available by default through the [long](https://npmjs.org/package/long) dependency.

Downloads
---------
* [ZIP-Archive](https://github.com/dcodeIO/ByteBuffer.js/archive/master.zip)
* [Tarball](https://github.com/dcodeIO/ByteBuffer.js/tarball/master)

Documentation
-------------
* [View documentation](http://htmlpreview.github.com/?http://github.com/dcodeIO/ByteBuffer.js/master/docs/ByteBuffer.html)

Tests (& Examples) [![Build Status](https://travis-ci.org/dcodeIO/ByteBuffer.js.png?branch=master)](https://travis-ci.org/dcodeIO/ByteBuffer.js)
------------------
* [View source](https://github.com/dcodeIO/ByteBuffer.js/blob/master/tests/suite.js)
* [View report](https://travis-ci.org/dcodeIO/ByteBuffer.js)

Prerequisites to run it against IE<10, FF<15, Chrome<9 etc.
-----------------------------------------------------------
* Working ArrayBuffer & DataView implementations (i.e. use a [polyfill](https://github.com/inexorabletash/polyfill#typed-arrays-polyfill))

Usage with Closure Compiler's advanced optimizations
----------------------------------------------------
You basically have the following three options:

#### ByteBuffer.js as external dependency ####
If you compile your code but want to use ByteBuffer.js as an external dependency that's not actually compiled "into"
your project, add the provided [externs file](https://github.com/dcodeIO/ByteBuffer.js/blob/master/externs/ByteBuffer.js)
to your compilation step (which usually excludes compilation of ByteBuffer.js).
  
#### ByteBuffer.js compiled into your project and exposed ####
Use [ByteBuffer.js](https://github.com/dcodeIO/ByteBuffer.js/blob/master/ByteBuffer.js) if you want the ByteBuffer class
to be exposed to the outside world (of JavaScript) so it can be called by external scripts. This also removes the
requirement of using externs but the compiler will also keep possibly unused code.

#### ByteBuffer.js fully compiled into your project ####
Use [ByteBuffer.noexpose.js](https://github.com/dcodeIO/ByteBuffer.js/blob/master/ByteBuffer.noexpose.js) if you want
the ByteBuffer class to be fully integrated into your (single file) project. Of course no external scripts will be able
to call it or its method (trivially) because quite everything will become renamed, some parts inlined and moved around.
This will also allow the compiler to actually remove unused code.

Contributors
------------
[Dretch](https://github.com/Dretch) (IE8 comp.)

License
-------
Apache License, Version 2.0 - http://www.apache.org/licenses/LICENSE-2.0.html