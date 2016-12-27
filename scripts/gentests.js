var fs   = require("fs"),
    path = require("path"),
    pbjs = require("../cli/pbjs");

[
    "tests/data/package.proto",
    "tests/data/rpc.proto",
    "tests/data/mapbox/vector_tile.proto",
    "tests/data/ambiguous-names.proto",
    "tests/data/test.proto"
]
.forEach(function(file) {
    var out = file.replace(/\.proto$/, ".js");
    pbjs.main([
        "--target", "static-module",
        "--wrap", "commonjs",
        "--root", "test_" + path.basename(out, ".js"),
        "--out", out,
        file
    ], function(err) {
        if (err)
            throw err;
        fs.writeFileSync(out, fs.readFileSync(out).toString("utf8").replace(/\"protobufjs\/runtime\"/, "\"../../runtime\""), "utf8");
    })
});
