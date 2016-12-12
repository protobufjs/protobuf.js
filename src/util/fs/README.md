@protobufjs/fs
==============
[![npm](https://img.shields.io/npm/v/@protobufjs/fs.svg)](https://www.npmjs.com/package/@protobufjs/fs)

Provides node's fs module only if available.

Usage
-----

```js
var fs = require("@protobufjs/fs");
```

You can then feature-check using:

```js
if (fs.readFile) {
    ...
}
```

**License:** [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)
