ProtoBuf.js protoify example
============================
This example shows the general usage of ProtoBuf.js by converting JSON structures to protocol buffers and vice versa
using a definition describing JSON itself. While this works as an example, it does not provide any benefits in general.

Instructions
------------
1. Set up dependencies: `npm install`
2. Run: `npm test`

Now you know no more and no less than that it works and you might want to inspect the following files to get the 'how':

Files
-----
* **index.js** contains the sample's source code
* **json.proto** contains the protobuf definition used
* **json.json** contains the protobuf definition converted through `proto2js json.proto > json.json`
* **json.js** contains the protobuf definition converted through `proto2js json.proto -commonjs=js > json.js`
* **test.js** contains our simple test suite
