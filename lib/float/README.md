@protobufjs/float
=================
[![npm](https://img.shields.io/npm/v/@protobufjs/float.svg)](https://www.npmjs.com/package/@protobufjs/float)

Reads / writes floats / doubles from / to buffers in both modern and ancient browsers. Fast.

API
---

* **writeFloatLE(val: `number`, buf: `Uint8Array`, pos: `number`)**<br />
  Writes a 32 bit float to a buffer using little endian byte order.

* **writeFloatBE(val: `number`, buf: `Uint8Array`, pos: `number`)**<br />
  Writes a 32 bit float to a buffer using big endian byte order.

* **readFloatLE(buf: `Uint8Array`, pos: `number`): `number`**<br />
  Reads a 32 bit float from a buffer using little endian byte order.

* **readFloatBE(buf: `Uint8Array`, pos: `number`): `number`**<br />
  Reads a 32 bit float from a buffer using big endian byte order.

* **writeDoubleLE(val: `number`, buf: `Uint8Array`, pos: `number`)**<br />
  Writes a 64 bit double to a buffer using little endian byte order.

* **writeDoubleBE(val: `number`, buf: `Uint8Array`, pos: `number`)**<br />
  Writes a 64 bit double to a buffer using big endian byte order.

* **readDoubleLE(buf: `Uint8Array`, pos: `number`): `number`**<br />
  Reads a 64 bit double from a buffer using little endian byte order.

* **readDoubleBE(buf: `Uint8Array`, pos: `number`): `number`**<br />
  Reads a 64 bit double from a buffer using big endian byte order.


**License:** [BSD 3-Clause License](https://opensource.org/licenses/BSD-3-Clause)
