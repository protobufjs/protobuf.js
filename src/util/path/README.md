@protobufjs/path
================
[![npm](https://img.shields.io/npm/v/@protobufjs/path.svg)](https://www.npmjs.com/package/@protobufjs/path)

A minimal path module to resolve Unix, Windows and URL paths alike.

API
---

* **path.isAbsolute(path: `string`): `boolean`**<br />
  Tests if the specified path is absolute.

* **path.normalize(path: `string`): `string`**<br />
  Normalizes the specified path.

* **path.resolve(originPath: `string`, includePath: `string`, [alreadyNormalized=false: `boolean`]): `string`**<br />
  Resolves the specified include path against the specified origin path.

**License:** [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)
