"use strict";
var fs   = require("fs"),
    path = require("path"),
    pbjs = require("../cli/pbjs"),
    pbts = require("../cli/pbts");

[
    { file: "tests/data/comments.proto", flags: [] },
    { file: "tests/data/convert.proto", flags: [] },
    { file: "tests/data/mapbox/vector_tile.proto", flags: [] },
    { file: "tests/data/package.proto", flags: [] },
    { file: "tests/data/rpc.proto", flags: [ "es6" ] },
    { file: "tests/data/rpc.proto", flags: [] },
    { file: "tests/data/rpc-reserved.proto", flags: [] },
    { file: "tests/data/test.proto", flags: [] },
    { file: "tests/data/type_url.proto", flags: [] },
    { file: "bench/data/bench.proto", flags: ["no-create", "no-verify", "no-delimited", "no-convert", "no-verify", "no-typeurl", "no-comments"], out: "bench/data/static_pbjs.js" }
]
.forEach(function({ file, flags, out }) {
    var basename = file.replace(/\.proto$/, "");
    if (!out)
        out = [ basename ].concat(flags).join("-") + ".js";
    pbjs.main([
        "--target", "static-module",
        "--wrap", flags.includes('es6') ? 'es6' : "commonjs",
        "--root", "test_" + path.basename(basename, ".js"),
        file
    ].concat(flags.map(function(flag) {
        return "--" + flag;
    })), function(err, output) {
        if (err)
            throw err;
        var pathToProtobufjs = path.relative(path.dirname(out), "minimal").replace(/\\/g, "/");
        fs.writeFileSync(out, output.replace(/"protobufjs\/minimal"/g, JSON.stringify(pathToProtobufjs)));
        process.stdout.write("pbjs: " + file + " -> " + out + "\n");
        try {
            require(path.join(__dirname, "..", out));
        } catch (err) {
            if (!flags.includes("es6")) {
                process.stderr.write("ERROR: " + err.message + "\n");
            }
        }
    });
});

process.stdout.write("\n");

[
    { file: "tests/data/comments.js" },
    { file: "tests/data/convert.js" },
    { file: "tests/data/mapbox/vector_tile.js" },
    { file: "tests/data/package.js" },
    { file: "tests/data/rpc.js" },
    { file: "tests/data/rpc-es6.js" },
    { file: "tests/data/rpc-reserved.js" },
    { file: "tests/data/test.js" },
    { file: "ext/descriptor/index.js", ext: true }
]
.forEach(function({ file, ext }) {
    var out = file.replace(/\.js$/, ".d.ts"),
        args = [ "--no-comments" ];
    pbts.main(args.concat(file), function(err, output) {
        if (err)
            throw err;
        var pathToProtobufjs = path.relative(path.dirname(out), "").replace(/\\/g, "/");
        output = output.replace(/"protobufjs"/g, JSON.stringify(pathToProtobufjs));
        fs.writeFileSync(out, output);
        process.stdout.write("pbts: " + file + " -> " + out + "\n");
    });
});
