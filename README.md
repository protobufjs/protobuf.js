<h1><p align="center"><img alt="protobuf.js" src="https://github.com/protobufjs/protobuf.js/raw/master/pbjs.svg" height="100" /><br/>protobuf.js</p></h1>
<p align="center">
  <a href="https://github.com/protobufjs/protobuf.js/actions/workflows/test.yml"><img src="https://img.shields.io/github/actions/workflow/status/protobufjs/protobuf.js/test.yml?branch=master&label=build&logo=github" alt=""></a>
  <a href="https://github.com/protobufjs/protobuf.js/actions/workflows/release.yaml"><img src="https://img.shields.io/github/actions/workflow/status/protobufjs/protobuf.js/release.yaml?branch=master&label=release&logo=github" alt=""></a>
  <a href="https://npmjs.org/package/protobufjs"><img src="https://img.shields.io/npm/v/protobufjs.svg?logo=npm" alt=""></a>
  <a href="https://npmjs.org/package/protobufjs"><img src="https://img.shields.io/npm/dm/protobufjs.svg?label=downloads&logo=npm" alt=""></a>
  <a href="https://www.jsdelivr.com/package/npm/protobufjs"><img src="https://img.shields.io/jsdelivr/npm/hm/protobufjs?label=requests&logo=jsdelivr" alt=""></a>
</p>

**Protocol Buffers** are a language-neutral, platform-neutral, extensible way of serializing structured data for use in communications protocols, data storage, and more, originally designed at Google ([see](https://protobuf.dev/)).

**protobuf.js** is a standalone JavaScript implementation of Protocol Buffers with TypeScript support for Node.js and the browser. It works with `.proto` files out of the box, is optimized for fast binary I/O, and supports runtime reflection as well as static code generation.

## Getting started

### Install

```sh
npm install protobufjs
```

The [command line utility](./cli/) for generating reflection bundles, static code and TypeScript declarations is published as an add-on package:

```sh
npm install --save-dev protobufjs-cli
```

The CLI is a small but capable standalone protobuf.js toolchain. It does not require `protoc` or a language plugin.

### Choose a runtime

| Import                  | Includes           | Use when
| ----------------------- | ------------------ | --------
| `protobufjs`            | Reflection, Parser | You load `.proto` files at runtime
| `protobufjs/light.js`   | Reflection         | You load JSON bundles or build schemas programmatically
| `protobufjs/minimal.js` | Static runtime     | You only use generated static code

The full build includes the light build, and the light build includes the minimal runtime.

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

Browser builds support CommonJS and AMD loaders and export globally as `window.protobuf`.

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

Install [`long`](https://github.com/dcodeIO/long.js) with protobuf.js when exact 64-bit integer support is required.

### Convert plain objects

```js
const message = AwesomeMessage.fromObject({ awesomeField: 42 });
const object = AwesomeMessage.toObject(message, {
  longs: String,
  enums: String,
  bytes: String
});
```

Common `ConversionOptions` are:

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

## Message API

Message types expose focused methods for validation, conversion, and binary I/O.

* **verify**(object: `object`): `null | string`  
  Checks whether a plain object can be encoded as-is. Returns `null` if valid, otherwise an error message.

* **create**(properties?: `object`): `Message`  
  Creates a message instance from already valid data.

* **fromObject**(object: `object`): `Message`  
  Converts broader JavaScript input into a message instance.

* **toObject**(message: `Message`, options?: `ConversionOptions`): `object`  
  Converts a message instance to a plain object for JSON or interoperability.

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

## Code generation

Use [`protobufjs-cli`](./cli/) to generate reflection bundles, static JavaScript code and TypeScript declarations, either directly with `pbjs` or through its `protoc-gen-pbjs` plugin.

Reflection keeps schemas as descriptors and generates optimized functions at runtime. Static code emits the same optimized functions ahead of time. The main tradeoffs are how schemas are loaded, how bundle size scales with schema size, whether runtime code generation is allowed by your environment, and whether reflection metadata should remain available at runtime.

| Target | Output | Minimum Runtime |
|--------|--------|-----------------|
| `json` | JSON bundle | `protobufjs/light.js` |
| `json-module` | JSON bundle module | `protobufjs/light.js` |
| `static` | Static code | custom wrapper/integration, not standalone |
| `static-module` | Static code module | `protobufjs/minimal.js` |

Module targets support `--wrap default` for CommonJS and AMD, plus `commonjs`, `amd`, `esm`, and `closure`; `--wrap` can also load a custom wrapper module.

### Static modules

Static modules generate dedicated JavaScript code for your schema, so they only need `protobufjs/minimal.js`.

```sh
npx pbjs -t static-module -w esm -o awesome.js --dts awesome.proto
```

```ts
import { awesomepackage } from "./awesome.js";

const message = awesomepackage.AwesomeMessage.create({ awesomeField: "hello" });
```

### Reflection bundles

Bundling schemas avoids reparsing `.proto` files at runtime and can reduce browser requests when schemas would otherwise be loaded separately. While reflection requires at least `protobufjs/light.js`, large schemas often produce smaller bundles than equivalent static modules because most code is shared via reflection.

```sh
npx pbjs -t json -o awesome.json awesome1.proto awesome2.proto ...
```

```js
const bundle = require("./awesome.json");

const root = protobuf.Root.fromJSON(bundle);
const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
```

```sh
npx pbjs -t json-module -w esm -o awesome.js --dts awesome.proto
```

```js
import { awesomepackage } from "./awesome.js";

const AwesomeMessage = awesomepackage.AwesomeMessage;
```

JSON modules export the reflection root and, with `-w esm`, also provide top-level named exports that align with static modules. Their declarations mirror `static-module` typings, but because JSON modules are backed by reflection objects, message instances should be created with `MyMessage.create(...)` instead of constructors. Code using `create(...)` works with static modules as well.

### TypeScript integration

TypeScript is a first-class target in protobuf.js. The runtime API is typed, and with `--dts`, both `json-module` and `static-module` emit ready-to-run JavaScript modules together with matching TypeScript declarations. No separate transpile step is necessary.

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

### Descriptors

For `google/protobuf/descriptor.proto` interoperability, see [ext/descriptor](./ext/README.md#descriptor). Note that because protobuf.js does not use `descriptor.proto` internally, options are parsed and presented literally.

### Text format

Protocol Buffers [Text Format](https://protobuf.dev/reference/protobuf/textformat-spec/) is supported via [ext/textformat](./ext/README.md#textformat).

### Content Security Policy

In [CSP](https://w3c.github.io/webappsec-csp/)-restricted environments that disallow unsafe-eval, use generated static code instead of runtime code generation.

## Conformance

protobuf.js targets full binary wire-format conformance for **Proto2**, **Proto3** and **Editions**. CI runs the official Protocol Buffers conformance suite, with logs uploaded as artifacts.

| Syntax   |               Total |          Required |       Recommended |
| -------- | ------------------: | ----------------: | ----------------: |
| Proto2   |   100.00% (694/694) | 100.00% (485/485) | 100.00% (209/209) |
| Proto3   |   100.00% (689/689) | 100.00% (482/482) | 100.00% (207/207) |
| Editions | 100.00% (1176/1176) | 100.00% (926/926) | 100.00% (250/250) |

## Performance

In both reflection and static modes, protobuf.js builds specialized encoders and decoders instead of interpreting descriptors at runtime.

The repository includes a [small benchmark](./bench). It compares protobuf.js reflection and static code against JSON encode/decode, protoc-gen-js, and protoc-gen-es. Results depend on hardware, Node.js version, and message shape, so they should be treated as indicative rather than absolute.

One run on an AMD Ryzen 9 9950X3D with Node.js 24.15.0 produced:

```
benchmarking encode performance ...

protobuf.js reflect x 2,430,103 ops/sec ±0.62% (95 runs sampled)
protobuf.js static x 2,390,407 ops/sec ±0.42% (96 runs sampled)
JSON encode x 2,155,918 ops/sec ±0.63% (92 runs sampled)
protoc-gen-js x 995,429 ops/sec ±0.18% (98 runs sampled)
protoc-gen-es x 403,334 ops/sec ±0.14% (96 runs sampled)

    protobuf.js reflect was fastest
     protobuf.js static was 1.4% ops/sec slower (factor 1.0)
            JSON encode was 11.3% ops/sec slower (factor 1.1)
          protoc-gen-js was 58.9% ops/sec slower (factor 2.4)
          protoc-gen-es was 83.3% ops/sec slower (factor 6.0)

benchmarking decode performance ...

protobuf.js reflect x 6,440,387 ops/sec ±0.25% (97 runs sampled)
protobuf.js static x 6,463,283 ops/sec ±0.27% (101 runs sampled)
JSON decode x 1,409,923 ops/sec ±0.11% (97 runs sampled)
protoc-gen-js x 947,647 ops/sec ±0.15% (99 runs sampled)
protoc-gen-es x 731,819 ops/sec ±0.28% (98 runs sampled)

     protobuf.js static was fastest
    protobuf.js reflect was 0.3% ops/sec slower (factor 1.0)
            JSON decode was 78.2% ops/sec slower (factor 4.6)
          protoc-gen-js was 85.3% ops/sec slower (factor 6.8)
          protoc-gen-es was 88.7% ops/sec slower (factor 8.8)

benchmarking round-trip performance ...

protobuf.js reflect x 1,310,677 ops/sec ±0.21% (97 runs sampled)
protobuf.js static x 1,310,926 ops/sec ±0.26% (101 runs sampled)
JSON encode/decode x 741,714 ops/sec ±0.24% (99 runs sampled)
protoc-gen-js x 472,844 ops/sec ±0.09% (96 runs sampled)
protoc-gen-es x 254,044 ops/sec ±0.05% (101 runs sampled)

    protobuf.js reflect was fastest
     protobuf.js static was 0.0% ops/sec slower (factor 1.0)
     JSON encode/decode was 43.4% ops/sec slower (factor 1.8)
          protoc-gen-js was 63.9% ops/sec slower (factor 2.8)
          protoc-gen-es was 80.6% ops/sec slower (factor 5.2)
```

Run it locally with:

```sh
npm --prefix bench install
npm run bench
```

## Compatibility

Supported runtimes are browsers, Node.js v12+, Deno and Bun. When using the CLI with Bun, Node.js must also be installed.

## Security

protobuf.js favors transparent disclosure. Security-impacting reports are handled through coordinated GitHub Security Advisories where appropriate. See [SECURITY.md](./SECURITY.md) for supported release lines, reporting instructions, and notes on untrusted schema input.

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
* [Protocol Buffers Documentation](https://protobuf.dev/)
