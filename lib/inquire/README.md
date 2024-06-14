@protobufjs/inquire
===================
[![npm](https://img.shields.io/npm/v/@protobufjs/inquire.svg)](https://www.npmjs.com/package/@protobufjs/inquire)

Requires a module only if available and hides the require call from bundlers.

API
---

* **inquire(moduleName: `string`): `?Object`**<br />
  Requires a module only if available.

Browser Bundler Compatibility
---
Inquire can be used in browser modules if these configurations are set:
 1) If a bundler is used, all modules loaded with inquire() must be added to the bundle config field "externals". This is supported by [webpack](https://webpack.js.org/configuration/externals/), [browserify](https://github.com/browserify/browserify#usage) ([gulp](https://benclinkinbeard.com/posts/external-bundles-for-faster-browserify-builds/)), [rollup](https://rollupjs.org/guide/en/#inputoptions-object), and possibly others.
 2) When used in node/npm packages for distribution (including protobufjs) all modules loaded with inquire() must be [ignored in the package.json browser option](https://github.com/defunctzombie/package-browser-field-spec#ignore-a-module). This is also [supported by webpack, browserify and rollup](https://github.com/webpack/webpack/issues/8826#issuecomment-491081733).

**License:** [BSD 3-Clause License](https://opensource.org/licenses/BSD-3-Clause)
