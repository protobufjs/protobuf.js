protobufjs-cli
==============
[![npm](https://img.shields.io/npm/v/protobufjscli.svg)](https://www.npmjs.com/package/protobufjs-cli)

Command line interface (CLI) for [protobuf.js](https://github.com/dcodeIO/protobuf.js). Translates between file formats and generates static code as well as TypeScript definitions.

**Note** that moving the CLI to its own package is a work in progress. At the moment, it's still part of the main package.

Contents
--------

<!--

* [Installation](#installation)<br />
  How to get started using the CLI.

-->

* [Usage](#usage)<br />
  An introduction to the toolset.

* [API](#api)<br />
  Details on using pbjs and pbts programmatically.

<!--

Installation
------------

```
$> npm install protobufjs protobufjs-cli [--save --save-prefix=~]
```

Note that the CLI package is tightly coupled to the main package, so don't forget to update it as well.

-->

Usage
-----

### pbjs

```
Translates between file formats and generates static code.

  -t, --target    Specifies the target format. Also accepts a path to require a custom target.

                  json          JSON representation
                  json-module   JSON representation as a module
                  proto2        Protocol Buffers, Version 2
                  proto3        Protocol Buffers, Version 3
                  static        Static code without reflection
                  static-module Static code without reflection as a module

  -p, --path      Adds a directory to the include path.

  -o, --out       Saves to a file instead of writing to stdout.

  Module targets only:

  -w, --wrap      Specifies the wrapper to use. Also accepts a path to require a custom wrapper.

                  default   Default wrapper supporting both CommonJS and AMD
                  commonjs  CommonJS wrapper
                  amd       AMD wrapper
                  es6       ES6 wrapper (implies --es6)

  -r, --root      Specifies an alternative protobuf.roots name.

  -l, --lint      Linter configuration. Defaults to protobuf.js-compatible rules:

                  eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins

  --es6           Enables ES6 syntax (const/let instead of var)

  Proto sources only:

  --keep-case     Keeps field casing instead of converting to camel case.

  Static targets only:

  --no-create     Does not generate create functions used for reflection compatibility.
  --no-encode     Does not generate encode functions.
  --no-decode     Does not generate decode functions.
  --no-verify     Does not generate verify functions.
  --no-convert    Does not generate convert functions like from/toObject
  --no-delimited  Does not generate delimited encode/decode functions.
  --no-beautify   Does not beautify generated code.
  --no-comments   Does not output any JSDoc comments.

usage: pbjs [options] file1.proto file2.json ...  (or)  other | pbjs [options] -
```

For production environments it is recommended to bundle all your .proto files to a single .json file, which minimizes the number of network requests and avoids any parser overhead (hint: works with just the **light** library):

```
$> pbjs -t json file1.proto file2.proto > bundle.json
```

Now, either include this file in your final bundle:

```js
var root = protobuf.Root.fromJSON(require("./bundle.json"));
```

or load it the usual way:

```js
protobuf.load("bundle.json", function(err, root) {
    ...
});
```

Generated static code, on the other hand, works with just the **minimal** library. For example

```
$> pbjs -t static-module -w commonjs -o compiled.js file1.proto file2.proto
```

will generate static code for definitions within `file1.proto` and `file2.proto` to a CommonJS module `compiled.js`.

**ProTip!** Documenting your .proto files with `/** ... */`-blocks or (trailing) `/// ...` lines translates to generated static code.


### pbts

```
Generates TypeScript definitions from annotated JavaScript files.

  -o, --out       Saves to a file instead of writing to stdout.

  -g, --global    Name of the global object in browser environments, if any.

  --no-comments   Does not output any JSDoc comments.

  Internal flags:

  -n, --name      Wraps everything in a module of the specified name.

  -m, --main      Whether building the main library without any imports.

usage: pbts [options] file1.js file2.js ...  (or)  other | pbts [options] -
```

Picking up on the example above, the following not just generates static code to a CommonJS module `compiled.js` but also its respective TypeScript definitions to `compiled.d.ts`:

```
$> pbjs -t static-module -w commonjs -o compiled.js file1.proto file2.proto
$> pbts -o compiled.d.ts compiled.js
```

Additionally, TypeScript definitions of static modules are compatible with their reflection-based counterparts (i.e. as exported by JSON modules), as long as the following conditions are met:

1. Instead of using `new SomeMessage(...)`, always use `SomeMessage.create(...)` because reflection objects do not provide a constructor.
2. Types, services and enums must start with an uppercase letter to become available as properties of the reflected types as well (i.e. to be able to use `MyMessage.MyEnum` instead of `root.lookup("MyMessage.MyEnum")`).

For example, the following generates a JSON module `bundle.js` and a `bundle.d.ts`, but no static code:

```
$> pbjs -t json-module -w commonjs -o bundle.js file1.proto file2.proto
$> pbjs -t static-module file1.proto file2.proto | pbts -o bundle.d.ts -
```

### Reflection vs. static code

While using .proto files directly requires the full library respectively pure reflection/JSON the light library, pretty much all code but the relatively short descriptors is shared.

Static code, on the other hand, requires just the minimal library, but generates additional, albeit editable, source code without any reflection features.

There is no significant difference performance-wise as the code generated statically is pretty much the same as generated at runtime and both are largely interchangeable as seen in the previous section.

API
---

Both utilities can be used programmatically by providing command line arguments and a callback to their respective `main` functions:

```js
var pbjs = require("protobufjs-cli/pbjs"); // or require("protobufjs-cli").pbjs / .pbts

pbjs.main([ "--target", "json-module", "path/to/myproto.proto" ], function(err, output) {
    if (err)
        throw err;
    // do something with output
});
```

**License:** [BSD 3-Clause License](https://opensource.org/licenses/BSD-3-Clause)
