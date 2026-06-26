"use strict";
module.exports = setup;
module.exports.caseName = "buf-perf";
module.exports.schema = {
    name: "perf",
    root: "bench_buf_perf",
    proto: require.resolve("./perf.proto"),
    outDir: require("path").join(__dirname, "..", "..", "generated", "buf-perf")
};

var fs      = require("fs"),
    support = require("../support");

function setup() {
    var pbjsCls = require("../../..").loadSync(require.resolve("./perf.proto")).resolveAll().lookup("perf.v1.PerfMessage");
    var pbjsBuf = fs.readFileSync(require.resolve("./perf-payload.bin"));
    var pbjsMsg = pbjsCls.decode(pbjsBuf);

    var pbjsStaticCls = require("../../generated/buf-perf/perf_protobufjs.js").perf.v1.PerfMessage;

    var jsonMsg = pbjsCls.toObject(pbjsMsg, { longs: Number, enums: Number, bytes: Array });
    var jsonBuf = support.Buffer_from(JSON.stringify(jsonMsg), "utf8");

    var jsCls = require("../../generated/buf-perf/perf_protoc_gen_js.js").PerfMessage;
    var jsBuf = support.copyBytes(pbjsBuf);
    var jsMsg = jsCls.deserializeBinary(jsBuf);

    var es = require("@bufbuild/protobuf");
    var esCls = require("../../generated/buf-perf/perf_protoc_gen_es.js").PerfMessageSchema;
    var esBuf = support.copyBytes(pbjsBuf);
    var esMsg = es.fromBinary(esCls, esBuf);

    return {
        title: "Buf perf",
        variants: support.protobufjs(pbjsCls, pbjsMsg, pbjsBuf, pbjsStaticCls).concat([
            support.json(jsonMsg, jsonBuf),
            support.protocGenJs(jsCls, jsBuf, jsMsg),
            support.protocGenEs(es, esCls, esBuf, esMsg)
        ])
    };
}
