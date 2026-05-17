"use strict";

// Measures encode, decode, and round-trip throughput for the benchmark fixture.
// JSON cases include binary conversion so all variants operate on transferable bytes.

var newSuite  = require("./suite");

var Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from || function(value, encoding) { return new Buffer(value, encoding); };

(async function main() {

var payload = {
    string: "Lorem ipsum dolor sit amet.",
    uint32: 9000,
    inner: {
        int32: 20161110,
        innerInner: {
            long: 649540169042971n,
            enum: 1,
            sint32: -42
        },
        outer: {
            bool: [ true, false, false, true, false, false, true ],
            double: 204.8
        }
    },
    float: 0.25
};

// protobuf.js dynamic: load the proto and set up a buffer
var pbjsRelectCls = (await require("..").load(require.resolve("./data/bench.proto"))).resolveAll().lookup("Test");
var pbjsReflectBuf = pbjsRelectCls.encode(payload).finish();
var pbjsReflectMsg = pbjsRelectCls.decode(pbjsReflectBuf);

// protobuf.js static: load the proto and decode to its native representation
var pbjsStaticCls = require("./data/bench_protobufjs.js").Test;
var pbjsStaticBuf = pbjsStaticCls.encode(payload).finish();
var pbjsStaticMsg = pbjsStaticCls.decode(pbjsStaticBuf);

// JSON: set up string-keyed and semantic bigint variants
var jsonStringMsg = {
    string: payload.string,
    uint32: payload.uint32,
    inner: {
        int32: payload.inner.int32,
        innerInner: {
            long: payload.inner.innerInner.long.toString(),
            enum: payload.inner.innerInner.enum,
            sint32: payload.inner.innerInner.sint32
        },
        outer: payload.inner.outer
    },
    float: payload.float
};
var jsonBigIntMsg = payload;
var jsonStringStr = JSON.stringify(jsonStringMsg);
var jsonStringBuf = Buffer_from(jsonStringStr, "utf8");
var jsonBigIntStr = JSON.stringify(jsonBigIntMsg, jsonReplacer);
var jsonBigIntBuf = Buffer_from(jsonBigIntStr, "utf8");

// protoc-gen-js: load the proto, set up an Uint8Array and a message
var jsCls = require("./data/bench_protoc_gen_js.js").Test;
var jsBuf = new Uint8Array(Array.prototype.slice.call(pbjsReflectBuf));
var jsMsg = jsCls.deserializeBinary(jsBuf);

// protoc-gen-es: load the schema, set up a buffer and a message
var es  = require("@bufbuild/protobuf");
var esCls = require("./data/bench_protoc_gen_es.js").TestSchema;
var esBuf = new Uint8Array(Array.prototype.slice.call(pbjsReflectBuf));
var esMsg = es.fromBinary(esCls, esBuf);

newSuite("encode")

.add("protobuf.js reflect", function() {
    pbjsRelectCls.encode(pbjsReflectMsg).finish();
})
.add("protobuf.js static", function() {
    pbjsStaticCls.encode(pbjsStaticMsg).finish();
})
.add("JSON encode (string)", function() {
    Buffer_from(JSON.stringify(jsonStringMsg), "utf8");
})
.add("JSON encode (bigint)", function() {
    Buffer_from(JSON.stringify(jsonBigIntMsg, jsonReplacer), "utf8");
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
    pbjsRelectCls.decode(pbjsReflectBuf);
})
.add("protobuf.js static", function() {
    pbjsStaticCls.decode(pbjsStaticBuf);
})
.add("JSON decode (string)", function() {
    JSON.parse(jsonStringBuf.toString("utf8"));
})
.add("JSON decode (bigint)", function() {
    var msg = JSON.parse(jsonBigIntBuf.toString("utf8"));
    msg.inner.innerInner.long = BigInt(msg.inner.innerInner.long);
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
    pbjsRelectCls.decode(pbjsRelectCls.encode(pbjsReflectMsg).finish());
})
.add("protobuf.js static", function() {
    pbjsStaticCls.decode(pbjsStaticCls.encode(pbjsStaticMsg).finish());
})
.add("JSON en/decode (string)", function() {
    JSON.parse(Buffer_from(JSON.stringify(jsonStringMsg), "utf8").toString("utf8"));
})
.add("JSON en/decode (bigint)", function() {
    var msg = JSON.parse(Buffer_from(JSON.stringify(jsonBigIntMsg, jsonReplacer), "utf8").toString("utf8"));
    msg.inner.innerInner.long = BigInt(msg.inner.innerInner.long);
})
.add("protoc-gen-js", function() {
    jsCls.deserializeBinary(jsMsg.serializeBinary());
})
.add("protoc-gen-es", function() {
    es.fromBinary(esCls, es.toBinary(esCls, esMsg));
})
.run();

}()).catch(function(err) {
    process.stderr.write((err && err.stack || err) + "\n");
    process.exitCode = 1;
});

function jsonReplacer(_key, value) {
    return typeof value === "bigint" ? value.toString() : value;
}
