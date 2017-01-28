"use strict";

var protobuf  = require(".."),
    newSuite  = require("./suite"),
    data      = require("./bench.json");

// NOTE: This benchmark is flawed in that it compares protocol buffers, which is purely a binary
// format, to JSON, which is purely a string format.
//
// This matters because the encoder must convert JavaScript strings from UTF16 LE characters to
// UTF8 bytes with every string operation while JSON does not require a mechanism for this by its
// own. Ultimately, also strings produced by JSON must be converted to UTF8 somewhere down the
// road, but this implementation detail is hidden from JS code and cannot be reliably measured
// here without using some sort of networking layer, i.e. a tcp socket, in between, which would
// most likely introduce other statistical difficulties.
//
// Hence, this benchmark compares to both pure string performance of JSON and additional binary
// conversion of the same data using node buffers, which is probably slower than what a modern
// VM uses under the hood when sending string data over the network. Comparable JSON performance
// should be somewhere in between what is displayed as "to string" and "to buffer", though.
//
// To experience the impact by yourself, increase string lengths within bench.json.

var root = protobuf.loadSync(require.resolve("./bench.proto")),
    Test = root.resolveAll().lookup("Test");

// protobuf.util.codegen.verbose = true;

var buf = Test.encode(data).finish();

// warm up
process.stdout.write("warming up ...\n");
var i;
for (i = 0; i < 500000; ++i)
    Test.encode(data).finish();
for (i = 0; i < 1000000; ++i)
    Test.decode(buf);
for (i = 0; i < 500000; ++i)
    Test.verify(data);
process.stdout.write("\n");

// give the optimizer some time to do its job
setTimeout(function() {
    var str    = JSON.stringify(data),
        strbuf = protobuf.util._Buffer_from(str, "utf8");

    newSuite("encoding")
    .add("Type.encode to buffer", function() {
        Test.encode(data).finish();
    })
    .add("JSON.stringify to string", function() {
        JSON.stringify(data);
    })
    .add("JSON.stringify to buffer", function() {
        protobuf.util._Buffer_from(JSON.stringify(data), "utf8");
    })
    .run();

    newSuite("decoding")
    .add("Type.decode from buffer", function() {
        Test.decode(buf); // no allocation overhead, if you wondered
    })
    .add("JSON.parse from string", function() {
        JSON.parse(str);
    })
    .add("JSON.parse from buffer", function() {
        JSON.parse(strbuf.toString("utf8"));
    })
    .run();

    newSuite("combined")
    .add("Type to/from buffer", function() {
        Test.decode(Test.encode(data).finish());
    })
    .add("JSON to/from string", function() {
        JSON.parse(JSON.stringify(data));
    })
    .add("JSON to/from buffer", function() {
        JSON.parse(protobuf.util._Buffer_from(JSON.stringify(data), "utf8").toString("utf8"));
    })
    .run();

    newSuite("verifying")
    .add("Type.verify", function() {
        var r = Test.verify(data);
        if (r)
            throw Error(r);
    })
    .run();

    var dataMessage = Test.from(data);
    var dataObject = dataMessage.toObject();

    newSuite("message from object")
    .add("Type.fromObject", function() {
        Test.fromObject(dataObject);
    })
    .run();
    
    newSuite("message to object")
    .add("Type.toObject", function() {
        Test.toObject(dataMessage);
    })
    .run();

}, 3000);
