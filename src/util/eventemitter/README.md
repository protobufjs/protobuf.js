@protobufjs/eventemitter
========================
[![npm](https://img.shields.io/npm/v/@protobufjs/eventemitter.svg)](https://www.npmjs.com/package/@protobufjs/eventemitter)

A minimal event emitter.

API
---

* **new EventEmitter()**<br />
  Constructs a new event emitter instance.

* **EventEmitter#on(evt: `string`, fn: `function`, [ctx: `Object`]): `EventEmitter`**<br />
  Registers an event listener.

* **EventEmitter#off([evt: `string`], [fn: `function`]): `EventEmitter`**<br />
  Removes an event listener or any matching listeners if arguments are omitted.

* **EventEmitter#emit(evt: `string`, ...args: `*`): `EventEmitter`**<br />
  Emits an event by calling its listeners with the specified arguments.

**License:** [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)
