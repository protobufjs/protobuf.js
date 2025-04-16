# protobuf

## Introduction

Protocol buffers (ProtoBuf) is a language-neutral, platform-neutral extensible mechanism for serializing structured data. It is used in (data) communication protocols and for data storage. As a flexible, efficient, and automatic structured data serialization method, ProtoBuf is smaller, faster, and simpler than XML.

In this project, [protobuf.js 7.2.4](https://github.com/protobufjs/protobuf.js) has been adapted for use with OpenHarmony.

## How to Install

1. Install protobufjs.

```
ohpm install @ohos/protobufjs
```
For details about the OpenHarmony ohpm environment configuration, see [OpenHarmony HAR](https://gitcode.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.en.md).


2. Define a message body struct in a .proto file.

For example, define a message body struct in the **userproto.proto** file.

```
syntax = "proto3";

package user;
message UserLoginResponse{
   string sessionId = 1;
   string userPrivilege = 2;
   bool isTokenType = 3;
   int64 formatTimestamp = 5;
   bytes data =6;
}
```

3. Generate .js and .d.ts files.

```
Install protobufjs globally.
npm install -g protobufjs@7.2.4
Install protobufjs-cli globally.
npm install -g protobufjs-cli

Run the following commands in the .proto file directory:
pbjs -t static-module -w es6 -o user.js user.proto
pbts user.js  -o user.d.ts
```

4. Modify the generated files.

```
1. In the .js file, change import * as $protobuf from "protobufjs/minimal"; to
**import { index } from "@ohos/protobufjs"; 
const $protobuf = index;**.

2. In the generated .d.ts file, change import * as $protobuf from "protobufjs"; to
**import * as $protobuf from "@ohos/protobufjs";**.

3. In the generated .js file, add the following code below const $protobuf = index;:
import Long from 'long';
$protobuf.util.Long=Long
$protobuf.configure()
```

5. Install long in the **entry** directory.

```
ohpm install long
```

6. use BigInt

```
In the generated JS file, add $protobuf.util Set Long to undefined

import Long from 'long';
$protobuf.util.Long = undefined
$protobuf.configure()

let msg = user.UserLoginResponse.create({
   sessionId: "215135415351435",
   userPrivilege: "John123",
   isTokenType: false,
   formatTimestamp: BigInt("9223372036854775807"),
);
```

7. Copy the generated .js and .d.ts files to the project.

## Using protobufjs-cli
```
Translate between file formats and generate static code.
  -t, --target Specifies the target format, which can be any of the following:
                   json          JSON
                   json-module   JSON representation as a module
                   proto2        Protocol Buffers, Version 2
                   proto3        Protocol Buffers, Version 3
                   static        Static code without reflection (non-functional on its own)
                   static-module Static code without reflection as a module
  -p, --path Adds a directory to the include path.
  -o, --out Saves a file instead of writing to stdout.
  --sparse Exports only those types referenced from a main file (experimental).
  Module targets only:
  -w, --wrap       Specifies the wrapper to use, which can be any of the following:
                   default   Default wrapper supporting both CommonJS and AMD
                   commonjs  CommonJS wrapper
                   amd       AMD wrapper
                   es6       ES6 wrapper
                   closure   A closure added to protobuf.roots where protobuf is global
  --dependency     Specifies the protobuf version. A valid module ID is accepted.
  -r, --root       Specifies an alternative protobuf.roots name.
  -l, --lint       Linter configuration. Defaults to protobuf.js-compatible rules:
                   eslint-disable block-scoped-var, id-length, 
                   no-control-regex, no-magic-numbers, no-prototype-builtins, 
                   no-redeclare, no-shadow, no-var, sort-vars
  --es6            Enables ES6 syntax.
  Proto sources only:
  --keep-case      Keeps field casing instead of converting to camel case.
  Static targets only:
  --no-create      Does not generate create functions used for reflection compatibility.
  --no-encode      Does not generate encode functions.
  --no-decode      Does not generate decode functions.
  --no-verify      Does not generate verify functions.
  --no-convert     Does not generate convert functions.
  --no-delimited   Does not generate delimited encode/decode functions.
  --no-beautify    Does not beautify generated code.
  --no-comments    Does not output any JSDoc annotations.
  --force-long     Enforces the use of 'Long' for s-/u-/int64 and s-/fixed64 fields.
  --force-number   Enforces the use of 'number' for s-/u-/int64 and s-/fixed64 fields.
  --force-message  Enforces the use of message instances instead of plain objects.
```
For details, see https://github.com/protobufjs/protobuf.js/blob/master/cli/README.md.

## How to Use

1. Proto code

```
import { user } from './user.js'

 let msg = user.UserLoginResponse.create({
     sessionId: "testSynchronouslyLoadProtoFile",
     userPrivilege: "John123",
     isTokenType: false,
     formatTimestamp: "12342222"
 });

 let arrayBuffer: Uint8Array = user.UserLoginResponse.encode(msg).finish()
```

2. Proto code
```
let decodeMsg = user.UserLoginResponse.decode(arrayBuffer);
```

## Available APIs

**create**

create(properties?: { [k: string]: any }): Message<{}>

Creates a message object.

Parameters:

| Name    | Type  | Mandatory| Description          |
| ---------- | ------ | ---- | -------------- |
| properties | Object | No  | Properties to set.|

Return value:

| Type   | Description         |
| ------- | ------------- |
| Message | **Message** instance created.|

**encode**

encode(message: (Message<{}>|{ [k: string]: any }), writer?: Writer): Writer

Encodes a message.

Parameters:

| Name | Type                        | Mandatory| Description                     |
| ------- | ---------------------------- | ---- | ------------------------- |
| message | Message<{}>  &#124;   Object | Yes  | Message instance or object to encode.|
| writer  | Writer                       | No  | Writer used to encode the message.           |

Return value:

| Type  | Description              |
| ------ | ------------------ |
| Writer | Protocol message body builder.|

**decode**

decode(reader: (Reader|Uint8Array), length?: number): Message<{}>

Decodes a message.

| Name| Type                    | Mandatory| Description                  |
| ------ | ------------------------ | ---- | ---------------------- |
| reader | Reader &#124; Uint8Array | Yes  | Reader or buffer for decoding.|
| length | number                   | No  | Length.                |

Return value:

| Type       | Description        |
| ----------- | ------------ |
| Message<{}> | Decoded message.|

**verify**

static verify(message: { [k: string]: any }): (string|null)

Verifies the message validity.

| Name | Type    | Mandatory| Description      |
| ------- | -------- | ---- | ---------- |
| message | Object.| Yes  | Message to verify.|

Return value:

| Type              | Description                           |
| ------------------ | ------------------------------- |
| string &#124; null | Returns **null** if the value is valid; returns a specific cause otherwise.|

**fromObject**

static fromObject(object: { [k: string]: any }): Message<{}>

Creates a message instance of this type from an object, and converts values to their respective internal types.

Parameters:

| Name| Type  | Mandatory| Description    |
| ------ | ------ | ---- | -------- |
| object | Object | Yes  | Object.|

Return value:

| Type  | Description      |
| ------ | ---------- |
| object | Object created.|

**toObject**

static toObject(message: Message<{}>, options?: IConversionOptions): { [k: string]: any }

Converts an array of key-value pairs to an object, omitting undefined values.

| Name | Type              | Mandatory| Description          |
| ------- | ------------------ | ---- | -------------- |
| message | Message            | Yes  | Message to convert.|
| options | IConversionOptions | No  | Conversion options.    |

Return value:

| Type  | Description      |
| ------ | ---------- |
| object | Object obtained.|


## Constraints
This project has been verified in the following version:

-  DevEco Studio: 4.1 Canary (4.1.3.317), OpenHarmony SDK: API 11 (4.1.0.36)

## Directory Structure

```
|---- protobuf
|     |---- AppScrope  # Sample code
|     |---- entry  # Sample code
|     |---- library  # Core library
|           |---- src/main  # Module code
|                |---- ets/   # Module code
|                     |---- dist     # Package file
|            |---- index.ets          # Entry file
|            |---- .ohpmignore        # Ignore files released by ohpm
|            |---- *.json5      # Configuration file
|     |---- README.md  # Readme
|     |---- README_zh.md  # Readme
|     |---- README.OpenSource  # Open source description
|     |---- CHANGELOG.md  # Changelog
```

## How to Contribute

If you find any problem when using the project, submit an [issue](https://gitcode.com/openharmony-tpc/protobuf/issues) or a [PR](https://gitcode.com/openharmony-tpc/protobuf/pulls).

## License

This project is licensed under [BSD License](https://gitcode.com/openharmony-tpc/protobuf/blob/master/LICENSE).
