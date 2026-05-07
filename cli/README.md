# protobufjs-cli

[![npm](https://img.shields.io/npm/v/protobufjs-cli.svg)](https://www.npmjs.com/package/protobufjs-cli)

Command line add-on for [protobuf.js](https://github.com/protobufjs/protobuf.js). Generates static code, reflection bundles, and TypeScript definitions.

```sh
npm install --save-dev protobufjs-cli
```

## pbjs for JavaScript

```sh
npx pbjs --help
```

```
Translates between file formats and generates static code.

  -t, --target     Specifies the target format. Also accepts a path to require a custom target.

                   json          JSON bundle
                   json-module   JSON bundle as a module
                   proto2        Protocol Buffers, Version 2
                   proto3        Protocol Buffers, Version 3
                   static        Static code without reflection (non-functional on its own)
                   static-module Static code without reflection as a module

  -p, --path       Adds a directory to the include path.

  --filter         Path to a JSON file listing messages and their dependencies to keep.
                   Example: {"messageNames":["mypackage.Message","Message2"]}

  -o, --out        Saves to a file instead of writing to stdout.

  -d, --dts        Also saves a .d.ts file next to --out for static-module and json-module.

  --sparse         Exports only those types referenced from a main file (experimental).

  Module targets only:

  -w, --wrap       Specifies the wrapper to use. Also accepts a path to require a custom wrapper.

                   default   Default wrapper supporting both CommonJS and AMD
                   commonjs  CommonJS wrapper
                   amd       AMD wrapper
                   esm       ESM wrapper (implies --es6)
                   closure   A closure adding to protobuf.roots where protobuf is a global

  --dependency     Specifies which version of protobuf to require. Accepts any valid module id

  -r, --root       Specifies an alternative protobuf.roots name.

  -l, --lint       Linter configuration. Defaults to protobuf.js-compatible rules:

                   eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param

  --es6            Enables ES6 syntax (const/let instead of var)

  Proto sources only:

  --keep-case      Keeps field casing instead of converting to camel case.
  --alt-comment    Turns on an alternate comment parsing mode that preserves more comments.

  Static targets only:

  --no-create      Does not generate create functions used for reflection compatibility.
  --no-encode      Does not generate encode functions.
  --no-decode      Does not generate decode functions.
  --no-verify      Does not generate verify functions.
  --no-convert     Does not generate convert functions like from/toObject
  --no-delimited   Does not generate delimited encode/decode functions.
  --no-typeurl     Does not generate getTypeUrl function.
  --no-beautify    Does not beautify generated code.
  --no-comments    Does not output any JSDoc comments.
  --no-service     Does not output service classes.

  --force-long     Enforces the use of 'Long' for s-/u-/int64 and s-/fixed64 fields.
  --force-number   Enforces the use of 'number' for s-/u-/int64 and s-/fixed64 fields.
  --force-message  Enforces the use of message instances instead of plain objects.

  --null-defaults  Default value for optional fields is null instead of zero value.
  --null-semantics Make nullable fields match protobuf semantics (overrides --null-defaults).

usage: pbjs [options] file1.proto file2.json ...  (or pipe)  other | pbjs [options] -
```

## pbts for TypeScript

```sh
npx pbts --help
```

```
Generates TypeScript definitions from annotated JavaScript files.

  -o, --out       Saves to a file instead of writing to stdout.

  -g, --global    Name of the global object in browser environments, if any.

  -i, --import    Comma delimited list of imports. Local names will equal camelCase of the basename.

  --no-constructor Emits private constructors for reflection-backed declarations.

  --no-comments   Does not output any JSDoc comments.

  Internal flags:

  -n, --name      Wraps everything in a module of the specified name.

  -m, --main      Whether building the main library without any imports.

usage: pbts [options] file1.js file2.js ...  (or)  other | pbts [options] -
```

## Common commands

Generate static code and a matching declaration file:

```sh
npx pbjs -t static-module -w commonjs -o compiled.js --dts file1.proto file2.proto
```

Generate a reflection bundle and a matching declaration file:

```sh
npx pbjs -t json-module -w commonjs -o bundle.js --dts file1.proto file2.proto
```

Note that declarations generated for JSON modules describe reflection-backed message types. Use `MyMessage.create(...)` instead of constructors.

For nested reflected properties like `MyMessage.MyEnum`, type, service and enum names must start with an uppercase letter. Otherwise, use reflection lookups such as `root.lookupType(...)`.

## Command line API

Both utilities can be used programmatically by providing command line arguments and a callback to their respective `main` functions:

```js
const { pbjs, pbts } = require("protobufjs-cli");

pbjs.main(["--target", "json-module", "path/to/myproto.proto"], function(err, output) {
  if (err) throw err;
  // do something with output
});
```

## Additional documentation

See the [protobuf.js README](https://github.com/protobufjs/protobuf.js) for runtime variants, usage examples, and additional documentation.
