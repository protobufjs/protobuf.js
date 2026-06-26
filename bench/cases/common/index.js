"use strict";
module.exports = setup;
module.exports.caseName = "common";
module.exports.schema = {
    name: "bench",
    root: "bench_common",
    proto: require.resolve("./bench.proto"),
    outDir: require("path").join(__dirname, "..", "..", "generated", "common")
};

var support = require("../support");

var BigInt_from = global.BigInt,
    BigInt_32 = BigInt_from(32);

function setup() {
    var payload = require("./bench.json");

    var pbjsCls = require("../../..").loadSync(require.resolve("./bench.proto")).resolveAll().lookup("Test");
    var pbjsMsg = payload;
    var pbjsBuf = pbjsCls.encode(pbjsMsg).finish();

    var pbjsStaticCls = require("../../generated/common/bench_protobufjs.js").Test;

    var jsonMsg = payload;
    var jsonBuf = support.Buffer_from(JSON.stringify(jsonMsg), "utf8");

    var jsCls = require("../../generated/common/bench_protoc_gen_js.js").Test;
    var jsBuf = support.copyBytes(pbjsBuf);
    var jsMsg = jsCls.deserializeBinary(jsBuf);

    var es = require("@bufbuild/protobuf");
    var esCls = require("../../generated/common/bench_protoc_gen_es.js").TestSchema;
    var esBuf = support.copyBytes(pbjsBuf);
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

    return {
        title: "Common",
        variants: support.protobufjs(pbjsCls, pbjsMsg, pbjsBuf, pbjsStaticCls).concat([
            support.json(jsonMsg, jsonBuf),
            support.protocGenJs(jsCls, jsBuf, jsMsg),
            support.protocGenEs(es, esCls, esBuf, esMsg)
        ])
    };
}
