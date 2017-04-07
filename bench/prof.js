"use strict";

var fs   = require("fs"),
    path = require("path");

// A profiling stub to measure encoding / decoding performance using benchmark data.

var commands = ["encode", "decode", "encode-browser", "decode-browser", "fromjson"];
if (commands.indexOf(process.argv[2]) < 0) { // 0: node, 1: prof.js
    process.stderr.write("usage: " + path.basename(process.argv[1]) + " <" + commands.join("|") + "> [iterations=10000000]\n");
    return;
}

// Spin up a node process with profiling enabled and process the generated log
if (process.execArgv.indexOf("--prof") < 0) {
    process.stdout.write("cleaning up old logs ...\n");
    var child_process = require("child_process");
    var logRe = /^isolate-[0-9A-F]+-v8\.log$/;
    fs.readdirSync(process.cwd()).forEach(function readdirSync_it(file) {
        if (logRe.test(file))
            fs.unlink(file);
    });
    process.stdout.write("generating profile (may take a while) ...\n");
    child_process.execSync("node --prof --trace-deopt " + process.execArgv.join(" ") + " " + process.argv.slice(1).join(" "), {
        cwd: process.cwd(),
        stdio: "inherit"
    });
    process.stdout.write("processing profile ...\n");
    fs.readdirSync(process.cwd()).forEach(function readdirSync_it(file) {
        if (logRe.test(file)) {
            child_process.execSync("node --prof-process " + file, {
                cwd: process.cwd(),
                stdio: "inherit"
            });
            // fs.unlink(file);
        }
    });
    process.stdout.write("done.\n");
    return;
}

// Actual profiling code
var protobuf = require("..");

// protobuf.util.codegen.verbose = true;

var root, json;

if (process.argv[2] === "fromjson") {
    json = require("../tests/data/test.json");
    if (process.argv.indexOf("--resolve") < 0)
        for (var k = 0; k < 10000; ++k)
            protobuf.Root.fromJSON(json);
    else
        for (var l = 0; l < 10000; ++l)
            protobuf.Root.fromJSON(json).resolveAll();
    return;
}

var Test, data, count;

if (process.argv.indexOf("--alt") < 0) {
    root = protobuf.parse(fs.readFileSync(require.resolve("../bench/data/bench.proto")).toString("utf8")).root;
    Test = root.lookup("Test");
    json = JSON.stringify(root);
    data = require("../bench/data/bench.json");
    count = 10000000;
    process.stdout.write("bench.proto");
} else {
    root = protobuf.parse(fs.readFileSync(require.resolve("../tests/data/mapbox/vector_tile.proto")).toString("utf8")).root;
    Test = root.lookup("vector_tile.Tile");
    data = Test.decode(fs.readFileSync(require.resolve("../tests/data/mapbox/vector_tile.bin")));
    count = 1000;
    process.stdout.write("vector_tile.proto");
}

if (process.argv.length > 3 && /^\d+$/.test(process.argv[3]))
    count = parseInt(process.argv[3], 10);
process.stdout.write(" x " + count + "\n");

function setupBrowser() {
    protobuf.Writer.create = function create_browser() { return new protobuf.Writer(); };
    protobuf.Reader.create = function create_browser(buf) { return new protobuf.Reader(buf); };
}

switch (process.argv[2]) {
    case "encode-browser":
        setupBrowser();
        // eslint-disable-line no-fallthrough
    case "encode":
        for (var i = 0; i < count; ++i)
            Test.encode(data).finish();
        break;
    case "decode-browser":
        setupBrowser();
        // eslint-disable-line no-fallthrough
    case "decode":
        var buf = Test.encode(data).finish();
        for (var j = 0; j < count; ++j)
            Test.decode(buf);
        break;
}
