"use strict";

// Measures encode, decode, and round-trip throughput for the benchmark fixture.
// JSON cases include binary conversion so all variants operate on transferable bytes.

var newSuite  = require("./suite"),
    payload   = require("./data/bench.json");

var Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from || function(value, encoding) { return new Buffer(value, encoding); };
var BigInt_from = global.BigInt;
var BigInt_32 = BigInt_from(32);

// protobuf.js dynamic: load the proto and set up a buffer
var pbjsCls = require("..").loadSync(require.resolve("./data/bench.proto")).resolveAll().lookup("Test");
var pbjsMsg = payload; // alt: pbjsCls.fromObject(payload);
var pbjsBuf = pbjsCls.encode(pbjsMsg).finish();

// protobuf.js static: load the proto
var pbjsStaticCls = require("./data/bench_protobufjs.js").Test;

// JSON: set up a string and a buffer
var jsonMsg = payload;
var jsonStr = JSON.stringify(jsonMsg);
var jsonBuf = Buffer_from(jsonStr, "utf8");

// protoc-gen-js: load the proto, set up an Uint8Array and a message
var jsCls = require("./data/bench_protoc_gen_js.js").Test;
var jsBuf = new Uint8Array(Array.prototype.slice.call(pbjsBuf));
var jsMsg = jsCls.deserializeBinary(jsBuf);

// protoc-gen-es: load the schema, set up a buffer and a message
var es  = require("@bufbuild/protobuf");
var esCls = require("./data/bench_protoc_gen_es.js").TestSchema;
var esBuf = new Uint8Array(Array.prototype.slice.call(pbjsBuf));
var esMsg = es.create(esCls, {
    string: payload.string,
    uint32: payload.uint32,
    inner: {
        int32: payload.inner.int32,
        innerInner: {
            long: BigInt_from(payload.inner.innerInner.long.high) << BigInt_32 | BigInt_from(payload.inner.innerInner.long.low >>> 0),
            enum: payload.inner.innerInner.enum,
            sint32: payload.inner.innerInner.sint32
        },
        outer: payload.inner.outer
    },
    float: payload.float
});

newSuite("encode")

.add("protobuf.js reflect", function() {
    pbjsCls.encode(pbjsMsg).finish();
})
.add("protobuf.js static", function() {
    pbjsStaticCls.encode(pbjsMsg).finish();
})
.add("JSON encode", function() {
    Buffer_from(JSON.stringify(jsonMsg), "utf8");
})
.add("protoc-gen-js", function() {
    jsMsg.serializeBinary();
})
.add("protoc-gen-es", function() {
    es.toBinary(esCls, esMsg);
})
.run();

newSuite("decode")

.add("protobuf.js reflect", function() {
    pbjsCls.decode(pbjsBuf);
})
.add("protobuf.js static", function() {
    pbjsStaticCls.decode(pbjsBuf);
})
.add("JSON decode", function() {
    JSON.parse(jsonBuf.toString("utf8"));
})
.add("protoc-gen-js", function() {
    jsCls.deserializeBinary(jsBuf);
})
.add("protoc-gen-es", function() {
    es.fromBinary(esCls, esBuf);
})
.run();

newSuite("round-trip")

.add("protobuf.js reflect", function() {
    pbjsCls.decode(pbjsCls.encode(pbjsMsg).finish());
})
.add("protobuf.js static", function() {
    pbjsStaticCls.decode(pbjsStaticCls.encode(pbjsMsg).finish());
})
.add("JSON encode/decode", function() {
    JSON.parse(Buffer_from(JSON.stringify(jsonMsg), "utf8").toString("utf8"));
})
.add("protoc-gen-js", function() {
    jsCls.deserializeBinary(jsMsg.serializeBinary());
})
.add("protoc-gen-es", function() {
    es.fromBinary(esCls, es.toBinary(esCls, esMsg));
})
.run();
