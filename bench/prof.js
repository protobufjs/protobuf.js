var fs       = require("fs"),
    path     = require("path");

// A profiling stub to measure encoding / decoding performance using benchmark data.

var commands = ["encode", "decode", "encode-browser", "decode-browser"];
if (commands.indexOf(process.argv[2]) < 0) { // 0: node, 1: prof.js
    console.error("usage: " + path.basename(process.argv[1]) + " <" + commands.join('|') + "> [iterations=10000000]");
    process.exit(0);
}

// Spin up a node process with profiling enabled and process the generated log
if (process.execArgv.indexOf("--prof") < 0) {
    console.log("cleaning up old logs ...");
    var child_process = require("child_process");
    var logRe = /^isolate\-[0-9A-F]+\-v8\.log$/;
    fs.readdirSync(process.cwd()).forEach(function(file) {
        if (logRe.test(file))
            fs.unlink(file);
    });
    console.log("generating profile (may take a while) ...");
    child_process.execSync("node --prof --trace-deopt " + process.argv.slice(1).join(' '), {
        cwd: process.cwd(),
        stdio: 'inherit'
    });
    console.log("processing profile ...");
    fs.readdirSync(process.cwd()).forEach(function(file) {
        if (logRe.test(file)) {
            child_process.execSync("node --prof-process " + file, {
                cwd: process.cwd(),
                stdio: 'inherit'
            });
            fs.unlink(file);
        }
    });
    console.log("done.");
    process.exit(0);
}

// Actual profiling code
var protobuf = require("..");

var root = protobuf.parse(fs.readFileSync(require.resolve("../bench/bench.proto")).toString("utf8")).root;
var Test = root.lookup("Test");
var data = require("../bench/bench.json");

var count = process.argv.length > 3 && parseInt(process.argv[3], 10) || 10000000;

function setupBrowser() {
    protobuf.Writer.create = function create_browser() { return new protobuf.Writer(); };
    protobuf.Reader.create = function create_browser(buf) { return new protobuf.Reader(buf); };
}

switch (process.argv[2]) {
    case "encode-browser":
        setupBrowser();
    case "encode":
        for (var i = 0; i < count; ++i)
            Test.encode(data).finish();
        break;
    case "decode-browser":
        setupBrowser();
    case "decode":
        var buf = Test.encode(data).finish();
        for (var i = 0; i < count; ++i)
            Test.decode(buf);
        break;
}
