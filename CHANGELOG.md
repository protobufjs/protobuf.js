# [6.3.0](https://github.com/dcodeIO/protobuf.js/releases/tag/6.3.0)

## Breaking
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/22a64c641d4897965035cc80e92667bd243f182f) Removed dead parts of the Reader API<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/964f65a9dd94ae0a18b8be3d9a9c1b0b1fdf6424) Refactored BufferReader/Writer to their own files and removed unnecessary operations (node always has FloatXXArray and browser buffer uses ieee anyway)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/bfac0ea9afa3dbaf5caf79ddf0600c3c7772a538) Stripped out fallback encoder/decoder/verifier completely (even IE8 supports codegen), significantly reduces bundle size, can use static codegen elsewhere<br />

## Fixed
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/7fac9d6a39bf42d316c1676082a2d0804bc55934) Properly check Buffer.prototype.set with node v4<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3ad8108eab57e2b061ee6f1fddf964abe3f4cbc7) Prevent NRE and properly annotate verify signature in tsd-jsdoc, fixed [#572](https://github.com/dcodeIO/protobuf.js/issues/572)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/6c2415d599847cbdadc17dee3cdf369fc9facade) Fix directly using Buffer instead of util.Buffer<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ea7ba8b83890084d61012cb5386dc11dadfb3908) Fixed release links in README files [ci skip]<br />

## New
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ef43acff547c0cd84cfb7a892fe94504a586e491) Added Namespace#getEnum and changed #lookupEnum to the same behavior, see [#576](https://github.com/dcodeIO/protobuf.js/issues/576)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/1fcfdfe21c1b321d975a8a96d133a452c9a9c0d8) Added a heap of coverage comments for usually unused code paths to open things up<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/c234de7f0573ee30ed1ecb15aa82b74c0f994876) Added codegen test to determine if any ancient browsers don't actually support it<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/fed2000e7e461efdb1c3a1a1aeefa8b255a7c20b) Added legacy groups support to pbjs, see [#568](https://github.com/dcodeIO/protobuf.js/issues/568)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/974a1321da3614832aa0a5b2e7c923f66e4ba8ae) Initial support for legacy groups + test case, see [#568](https://github.com/dcodeIO/protobuf.js/issues/568)<br />

## CLI
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/3e7e4fc59e6d2d6c862410b4b427fbedccdb237b) Removed type/ns alias comment in static target to not confuse jsdoc unnecessarily<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/99ad9cc08721b834a197d4bbb67fa152d7ad79aa) Made pbjs use loadSync for deterministic outputs, see [#573](https://github.com/dcodeIO/protobuf.js/issues/573)<br />

## Docs
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/7939a4bd8baca5f7e07530fc93f27911a6d91c6f) Updated README and bundler according to dynamic require calls<br />

## Other
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/ab3e236a967a032a98267a648f84d129fdb4d4a6) Enums can't be map key types<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/8ef6975b0bd372b79e9b638f43940424824e7176) Use custom require (now a micromodule) for all optional modules, see [#571](https://github.com/dcodeIO/protobuf.js/issues/571)<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/19e906c2a15acc6178b3bba6b19c2f021e681176) Reverted aliases frequently used in codegen for better gzip ratio<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/47b51ec95a540681cbed0bac1b2f02fc4cf0b73d) Shrinked bundle size - a bit<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/f8451f0058fdf7a1fac15ffc529e4e899c6b343c) Can finally run with --trace-deopt again without crashes<br />
[:hash:](https://github.com/dcodeIO/protobuf.js/commit/9c9a66bf393d9d6927f35a9c18abf5d1c31db912) Other minor optimizations<br />
