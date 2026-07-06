"use strict";
module.exports = setup;
module.exports.caseName = "vector-tile";
module.exports.schema = {
    name: "vector_tile",
    root: "bench_vector_tile",
    proto: require.resolve("./vector_tile.proto"),
    outDir: require("path").join(__dirname, "..", "..", "generated", "vector-tile")
};

var fs      = require("fs"),
    support = require("../support");

function setup() {
    var pbjsCls = require("../../..").loadSync(require.resolve("./vector_tile.proto")).resolveAll().lookup("vector_tile.Tile");
    var pbjsBuf = fs.readFileSync(require.resolve("./vector_tile.bin"));
    var pbjsMsg = pbjsCls.decode(pbjsBuf);

    var pbjsStaticCls = require("../../generated/vector-tile/vector_tile_protobufjs.js").vector_tile.Tile;

    var jsonMsg = pbjsCls.toObject(pbjsMsg, { longs: Number, enums: Number, bytes: Array });
    var jsonBuf = support.Buffer_from(JSON.stringify(jsonMsg), "utf8");

    var jsCls = require("../../generated/vector-tile/vector_tile_protoc_gen_js.js").Tile;
    var jsBuf = support.copyBytes(pbjsBuf);
    var jsMsg = jsCls.deserializeBinary(jsBuf);

    var es = require("@bufbuild/protobuf");
    var esCls = require("../../generated/vector-tile/vector_tile_protoc_gen_es.js").TileSchema;
    var esBuf = support.copyBytes(pbjsBuf);
    var esMsg = es.fromBinary(esCls, esBuf);

    return {
        title: "Vector tile",
        variants: support.protobufjs(pbjsCls, pbjsMsg, pbjsBuf, pbjsStaticCls).concat([
            support.json(jsonMsg, jsonBuf),
            support.protocGenJs(jsCls, jsBuf, jsMsg),
            support.protocGenEs(es, esCls, esBuf, esMsg)
        ])
    };
}
