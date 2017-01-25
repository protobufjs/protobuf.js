@protobufjs/codegen
===================
[![npm](https://img.shields.io/npm/v/@protobufjs/codegen.svg)](https://www.npmjs.com/package/@protobufjs/codegen)

A closure for generating functions programmatically.

API
---

* **codegen(...params: `string`): `function(format: string, ...args: string): self`**<br />
  Begins generating a function programmatically.

* **codegen#str([name: `string`]): `string`**<br />
  Stringifies the so far generated function source.

* **codegen#eof([name?: `string`], [scope: `Object`]): `function`**<br />
  Ends generation and builds the function whilst applying a scope.

**License:** [BSD 3-Clause License](https://opensource.org/licenses/BSD-3-Clause)
