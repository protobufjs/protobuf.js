var fs       = require("fs"),
    path     = require("path");
var protobuf = require("..");

// A profiling stub to measure just raw encoding / decoding performance using benchmark data.

var root = protobuf.parse(fs.readFileSync(require.resolve("../bench/bench.proto")).toString("utf8")).root;
var Test = root.lookup("Test");
var data = require("../bench/bench.json");

var count = process.argv.length > 3 && parseInt(process.argv[3], 10) || 10000000;

function setupBrowser() {
    protobuf.Writer.create = function create_browser() { return new protobuf.Writer(); };
    protobuf.Reader.create = function create_browser(buf) { return new protobuf.Reader(buf); };
}

switch (process.argv[2]) {
    default:
        console.error("usage: " + path.basename(process.argv[1]) + " <encode|decode|encode-browser|decode-browser> [iterations=10000000]");
        process.exit(1);
        return;
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
