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

* **path.absolutePrefix(path: `string`): `string|null`**<br />
  Gets the prefix of an absolute Windows, UNC, or Unix path or a URL that indicates it's absolute.

**License:** [BSD 3-Clause License](https://opensource.org/licenses/BSD-3-Clause)
