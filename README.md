<h1><p align="center"><img alt="protobuf.js" src="https://github.com/protobufjs/protobuf.js/raw/master/pbjs.svg" height="100" /><br/>protobuf.js</p></h1>
<p align="center">
  <a href="https://github.com/protobufjs/protobuf.js/actions/workflows/test.yml"><img src="https://img.shields.io/github/actions/workflow/status/protobufjs/protobuf.js/test.yml?branch=master&label=build&logo=github" alt=""></a>
  <a href="https://github.com/protobufjs/protobuf.js/actions/workflows/release.yaml"><img src="https://img.shields.io/github/actions/workflow/status/protobufjs/protobuf.js/release.yaml?branch=master&label=release&logo=github" alt=""></a>
  <a href="https://npmjs.org/package/protobufjs"><img src="https://img.shields.io/npm/v/protobufjs.svg?logo=npm" alt=""></a>
  <a href="https://npmjs.org/package/protobufjs"><img src="https://img.shields.io/npm/dm/protobufjs.svg?label=downloads&logo=npm" alt=""></a>
  <a href="https://www.jsdelivr.com/package/npm/protobufjs"><img src="https://img.shields.io/jsdelivr/npm/hm/protobufjs?label=requests&logo=jsdelivr" alt=""></a>
</p>

**Protocol Buffers** are a language-neutral, platform-neutral, extensible way of serializing structured data for use in communications protocols, data storage, and more, originally designed at Google ([see](https://protobuf.dev/)).

**protobuf.js** is a freestanding JavaScript implementation of Protocol Buffers with TypeScript support for Node.js and the browser. It works with `.proto` files out of the box and can generate optimized encoders and decoders at runtime or emit them statically.

## Getting started

### Install

```sh
npm install protobufjs
```

The [command line utility](./cli/) for generating reflection bundles, static code and TypeScript declarations is published as an add-on package:

```sh
npm install --save-dev protobufjs-cli
```

The CLI is a small but capable standalone protobuf.js toolchain. It does not require `protoc`.

### Choose a runtime

| Import                  | Includes           | Use when
| ----------------------- | ------------------ | --------
| `protobufjs`            | Reflection, Parser | You load `.proto` files at runtime
| `protobufjs/light.js`   | Reflection         | You load JSON bundles or build schemas programmatically
| `protobufjs/minimal.js` | Static runtime     | You only use generated static code

Builds with reflection include just-in-time code generation. Use the CLI to emit the same optimized code ahead of time and run it on the minimal runtime. The full build includes the light build, and the light build includes the minimal runtime.

### Browser builds

Pick the distribution matching your runtime variant and pin an exact version:

```html
<!-- Full -->
<script src="https://cdn.jsdelivr.net/npm/protobufjs@8.X.X/dist/protobuf.min.js"></script>
<!-- Light -->
<script src="https://cdn.jsdelivr.net/npm/protobufjs@8.X.X/dist/light/protobuf.min.js"></script>
<!-- Minimal -->
<script src="https://cdn.jsdelivr.net/npm/protobufjs@8.X.X/dist/minimal/protobuf.min.js"></script>
```

Browser builds support CommonJS and AMD loaders and export globally as `window.protobuf`. Native ESM support is planned for a future release.

## Usage

The examples below use this schema:

```proto
syntax = "proto3";

package awesomepackage;

message AwesomeMessage {
  string awesome_field = 1;
}
```

protobuf.js converts `.proto` field names to camelCase by default, so `awesome_field` is used as `awesomeField` in JavaScript. Use the `keepCase` option when loading or parsing `.proto` files to preserve field names as written.

### Load a schema

```js
const protobuf = require("protobufjs");

const root = protobuf.loadSync("awesome.proto");
const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
```

Use `protobuf.load()` for the asynchronous variant.

### Encode and decode

```js
const payload = { awesomeField: "hello" };

// Optionally verify if the payload is of uncertain shape
const err = AwesomeMessage.verify(payload);
if (err) throw Error(err);

// Optionally create a message instance from already valid data
const message = AwesomeMessage.create(payload);

const encoded = AwesomeMessage.encode(message).finish();
const decoded = AwesomeMessage.decode(encoded);
```

`encode` expects a message instance or equivalent plain object and does not verify input implicitly. Use `verify` for plain objects whose shape is not guaranteed, `create` to create a message instance from already valid data when useful, and `fromObject` when conversion from broader JavaScript input is needed.

Plain objects can be encoded directly when they already use protobuf.js runtime types: numbers for 32-bit numeric fields, booleans for `bool`, strings for `string`, `Uint8Array` or `Buffer` for `bytes`, arrays for repeated fields, and plain objects for maps. Map keys are the string representation of the respective value or an 8-character hash string for 64-bit/`Long` keys. Use `fromObject` when input may use broader JSON-style forms such as enum names, base64 strings for bytes, or decimal strings for 64-bit values.

Install [`long`](https://github.com/dcodeIO/long.js) with protobuf.js when exact 64-bit integer support is required. Native `BigInt` support is planned for a future release.

### Convert plain objects

```js
const message = AwesomeMessage.fromObject({ awesomeField: 42 });
const object = AwesomeMessage.toObject(message, {
  longs: String,
  enums: String,
  bytes: String
});
```

## Message API

Message types expose focused methods for validation, conversion, and binary I/O.

* **verify**(object: `object`): `null | string`  
  Checks whether a plain object can be encoded as-is. Returns `null` if valid, otherwise an error message.

* **create**(properties?: `object`): `Message`  
  Creates a message instance from already valid data.

* **fromObject**(object: `object`): `Message`  
  Converts broader JavaScript input into a message instance.

* **toObject**(message: `Message`, options?: `ConversionOptions`): `object`  
  Converts a message instance to a plain object for JSON or interoperability. Common options:

  | Option | Effect |
  |--------|--------|
  | `longs: String` | Converts 64-bit values to decimal strings |
  | `longs: Number` | Converts 64-bit values to JS numbers (may lose precision) |
  | `enums: String` | Converts enum values to names |
  | `bytes: String` | Converts bytes to base64 strings |
  | `defaults: true` | Includes default values for unset fields |
  | `arrays: true` | Includes empty arrays for repeated fields |
  | `objects: true` | Includes empty objects for map fields |
  | `oneofs: true` | Includes virtual oneof discriminator properties |

* **encode**(message: `Message | object`, writer?: `Writer`): `Writer`  
  Encodes a message or equivalent plain object. Call `.finish()` on the returned writer to obtain a buffer.

* **encodeDelimited**(message: `Message | object`, writer?: `Writer`): `Writer`  
  Encodes a length-delimited message.

* **decode**(reader: `Reader | Uint8Array`): `Message`  
  Decodes a message from protobuf binary data.

* **decodeDelimited**(reader: `Reader | Uint8Array`): `Message`  
  Decodes a length-delimited message.

* **message#toJSON**(): `object`  
  Converts a message instance to JSON-compatible output using default conversion options.

Length-delimited methods read and write a varint byte length before the message, which is useful for streams and framed protocols.

If required fields are missing while decoding proto2 data, `decode` throws `protobuf.util.ProtocolError` with the partially decoded message available as `err.instance`.

## Schemas and code generation

Use [`protobufjs-cli`](./cli/) to generate reflection bundles, static JavaScript code and TypeScript declarations.

Reflection keeps schemas as descriptors and generates optimized functions at runtime. Static code emits the same optimized functions ahead of time. The main tradeoffs are how schemas are loaded, how bundle size scales with schema size, whether runtime code generation is allowed by your environment, and whether reflection metadata should remain available at runtime.

| Target | Output | Minimum Runtime |
|--------|--------|-----------------|
| `json` | JSON bundle | `protobufjs/light.js` |
| `json-module` | JSON bundle module | `protobufjs/light.js` |
| `static` | Static code | custom wrapper/integration, not standalone |
| `static-module` | Static code module | `protobufjs/minimal.js` |

Module targets support `--wrap default` for CommonJS and AMD, plus `commonjs`, `amd`, `es6`, and `closure`; `--wrap` can also load a custom wrapper module.

### Reflection bundles

Bundling schemas to JSON avoids reparsing `.proto` files and can reduce browser requests when schemas would otherwise be loaded separately.

```sh
npx pbjs -t json -o awesome.json awesome1.proto awesome2.proto ...
```

```js
const bundle = require("./awesome.json");

const root = protobuf.Root.fromJSON(bundle);
const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
```

```sh
npx pbjs -t json-module -w es6 -o awesome.json awesome.proto
```

```js
const root = require("./awesome.js");

const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
```

Reflection bundles can be loaded with `protobufjs/light.js` because the `.proto` parser is not required.

### Static modules

```sh
npx pbjs -t static-module -w es6 -o awesome.js awesome.proto
npx pbts -o awesome.d.ts awesome.js
```

```ts
import { awesomepackage } from "./awesome.js";

const message = awesomepackage.AwesomeMessage.create({ awesomeField: "hello" });
```

Generated static code only needs `protobufjs/minimal.js`.

### TypeScript integration

The protobuf.js runtime API is typed, but fields of dynamically loaded messages are only known at runtime. For statically typed messages and fields, either generate static code with declarations, or use reflection bundles with declarations generated from the equivalent static module:

```sh
npx pbjs -t json-module -w commonjs -o awesome.js awesome.proto
npx pbjs -t static-module awesome.proto | npx pbts -o awesome.d.ts -
```

Use `create(...)` instead of constructors with reflection-backed declarations.

## Advanced usage

### Programmatic schemas

The full and light builds can construct schemas directly through reflection:

```js
const AwesomeMessage = new protobuf.Type("AwesomeMessage")
  .add(new protobuf.Field("awesomeField", 1, "string"));

const root = new protobuf.Root()
  .define("awesomepackage")
  .add(AwesomeMessage);
```

### Custom message classes

Message classes can be extended by reusing the generated constructor:

```js
const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage").ctor;

AwesomeMessage.customStaticMethod = function() {
  // ...
};
AwesomeMessage.prototype.customInstanceMethod = function() {
  // ...
};
```

Alternatively, a custom constructor can be registered:

```js
function AwesomeMessage(properties) {
  // ...
}

root.lookupType("awesomepackage.AwesomeMessage").ctor = AwesomeMessage;
```

Custom constructors are populated with static `create`, `encode`, `encodeDelimited`, `decode`, `decodeDelimited`, `verify`, `fromObject`, `toObject`, and the instance method `toJSON`. The reflected type is available as `AwesomeMessage.$type` and `message.$type`.

### Services

protobuf.js supports service clients built from reflected service definitions. The service API is transport-agnostic: provide an `rpcImpl` function to connect it to HTTP, WebSocket, gRPC, or another transport. See [examples/streaming-rpc.js](./examples/streaming-rpc.js) for details.

### Decorators

Experimental decorators are available for defining message classes directly in code.

* **Type.d(typeName?: `string`)** &nbsp; *(optional)*<br />
  Annotates a class as a protobuf message type.

* **Field.d&lt;T>(fieldId: `number`, fieldType: `string | Constructor<T>`, fieldRule?: `"optional" | "required" | "repeated"`, defaultValue?: `T`)**<br />
  Annotates a property as a protobuf field.

* **MapField.d&lt;T extends { [key: string]: any }>(fieldId: `number`, fieldKeyType: `string`, fieldValueType: `string | Constructor<{}>`)**<br />
  Annotates a property as a protobuf map field.

* **OneOf.d&lt;T extends string>(...fieldNames: `string[]`)**<br />
  Annotates a property as a protobuf oneof discriminator.

See [examples/decorators.ts](./examples/decorators.ts) for an example.

### Descriptors

For protobuf descriptor interoperability, see [ext/descriptor](./ext/descriptor). Note that because the internals of this package do not rely on `google/protobuf/descriptor.proto`, options are parsed and presented literally.

### Content Security Policy

In [CSP](https://w3c.github.io/webappsec-csp/)-restricted environments that disallow unsafe-eval, use generated static code instead of runtime code generation.

## Performance

The repository includes a small benchmark for the bundled fixture in [`bench/`](./bench/). It compares protobuf.js reflection and static code against native `JSON.stringify`/`JSON.parse` and [google-protobuf](https://www.npmjs.com/package/google-protobuf). Results depend on hardware, Node.js version, and the message shape, so they should be treated as indicative rather than absolute.

One run on an AMD Ryzen 9 9950X3D with Node.js 24.13.0 and google-protobuf 4.0.2 produced:

```
benchmarking encoding performance ...

protobuf.js (reflect) x 2,459,953 ops/sec ±0.49% (96 runs sampled)
protobuf.js (static) x 2,419,506 ops/sec ±0.46% (97 runs sampled)
JSON (string) x 2,595,666 ops/sec ±0.23% (97 runs sampled)
JSON (buffer) x 2,132,901 ops/sec ±0.62% (94 runs sampled)
google-protobuf x 989,928 ops/sec ±0.23% (98 runs sampled)

          JSON (string) was fastest
  protobuf.js (reflect) was 5.5% ops/sec slower (factor 1.1)
   protobuf.js (static) was 7.0% ops/sec slower (factor 1.1)
          JSON (buffer) was 18.1% ops/sec slower (factor 1.2)
        google-protobuf was 61.9% ops/sec slower (factor 2.6)

benchmarking decoding performance ...

protobuf.js (reflect) x 5,088,330 ops/sec ±0.28% (95 runs sampled)
protobuf.js (static) x 5,880,419 ops/sec ±0.31% (95 runs sampled)
JSON (string) x 1,593,466 ops/sec ±0.15% (100 runs sampled)
JSON (buffer) x 1,392,336 ops/sec ±0.15% (99 runs sampled)
google-protobuf x 943,360 ops/sec ±0.21% (101 runs sampled)

   protobuf.js (static) was fastest
  protobuf.js (reflect) was 13.4% ops/sec slower (factor 1.2)
          JSON (string) was 72.9% ops/sec slower (factor 3.7)
          JSON (buffer) was 76.3% ops/sec slower (factor 4.2)
        google-protobuf was 83.9% ops/sec slower (factor 6.2)

benchmarking combined performance ...

protobuf.js (reflect) x 1,282,090 ops/sec ±0.31% (98 runs sampled)
protobuf.js (static) x 1,296,277 ops/sec ±0.16% (101 runs sampled)
JSON (string) x 850,941 ops/sec ±0.13% (98 runs sampled)
JSON (buffer) x 728,772 ops/sec ±0.31% (99 runs sampled)
google-protobuf x 471,130 ops/sec ±0.14% (99 runs sampled)

   protobuf.js (static) was fastest
  protobuf.js (reflect) was 1.2% ops/sec slower (factor 1.0)
          JSON (string) was 34.3% ops/sec slower (factor 1.5)
          JSON (buffer) was 43.9% ops/sec slower (factor 1.8)
        google-protobuf was 63.6% ops/sec slower (factor 2.8)
```

Run it locally with:

```sh
npm run bench
```

## Development

```sh
git clone https://github.com/protobufjs/protobuf.js
cd protobuf.js
npm install
```

Running the tests:

```sh
npm test
```

Building the development and production versions with their respective source maps to `dist/`:

```sh
npm run build
```

## Additional documentation

* [API Documentation](https://protobufjs.github.io/protobuf.js)
* [Changelog](./CHANGELOG.md)
* [Security Policy](./SECURITY.md)
* [Protocol Buffers Documentation](https://protobuf.dev/)
