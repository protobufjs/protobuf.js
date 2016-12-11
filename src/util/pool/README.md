@protobufjs/pool
================
[![npm](https://img.shields.io/npm/v/@protobufjs/pool.svg)](https://www.npmjs.com/package/@protobufjs/pool)

A general purpose buffer pool.

API
---

* **pool(alloc: `function(size: number): Uint8Array`, slice: `function(this: Uint8Array, start: number, end: number): Uint8Array`, [size=8192: `number`]): `function(size: number): Uint8Array`**<br />
  Creates a pooled allocator.

**License:** [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)