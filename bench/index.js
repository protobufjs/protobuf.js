var benchmark = require("benchmark"),
    chalk     = require("chalk");
    
var protobuf  = require("../src/index"),
    suite     = new benchmark.Suite(),
    data      = require("./bench.json");

// NOTE: This benchmark is flawed in that it compares protocol buffers, which is purely a binary
// format, to JSON, which is purely a string format.
//
// This matters because the encoder must convert JavaScript strings from UTF16 LE characters to
// UTF8 bytes with every string operation while JSON does not require a mechanism for this by its
// own. Ultimately, also strings produced by JSON must be converted to UTF8 somewhere down the
// road, but this implementation detail is hidden from JS code and cannot be reliably measured
// here without using some sort of networking layer, i.e. a tcp socket, in between, which would
// most likely introduce other statistical difficulties.
//
// Hence, this benchmark compares to both pure string performance of JSON and additional binary
// conversion of the same data using node buffers, which is probably slower than what a modern
// VM uses under the hood when sending string data over the network. Comparable JSON performance
// should be somewhere in between what is displayed as "to string" and "to buffer", though.
//
// To experience the impact by yourself, increase string lengths within bench.json.

protobuf.load(require.resolve("./bench.proto"), function onload(err, root) {
    var Test = root.lookup("Test");

    protobuf.util.codegen.verbose = true;
    var buf = Test.encode(data).finish(),
        dec = Test.decode(buf);

    var str = JSON.stringify(data),
        strbuf = Buffer.from(str, "utf8");

    newSuite("encoding")
    .add("Type.encode to buffer", function() {
        Test.encode(data).finish();
    })
    .add("JSON.stringify to string", function() {
        JSON.stringify(data);
    })
    .add("JSON.stringify to buffer", function() {
        new Buffer(JSON.stringify(data), "utf8");
    })
    .run();

    newSuite("decoding")
    .add("Type.decode from buffer", function() {
        Test.decode(buf);
    })
    .add("JSON.parse from string", function() {
        JSON.parse(str);
    })
    .add("JSON.parse from buffer", function() {
        JSON.parse(strbuf.toString("utf8"));
    })
    .run();

    newSuite("combined")
    .add("Type to/from buffer", function() {
        Test.decode(Test.encode(data).finish());
    })
    .add("JSON to/from string", function() {
        JSON.parse(JSON.stringify(data));
    })
    .add("JSON to/from buffer", function() {
        JSON.parse(new Buffer(JSON.stringify(data), "utf8").toString("utf8"));
    })
    .run();

});

var padSize = 27;

function newSuite(name) {
    var benches = [];
    return new benchmark.Suite(name)
    .on("add", function(event) {
        benches.push(event.target);
    })
    .on("start", function() {
        console.log("benchmarking " + name + " performance ...\n");
    })
    .on("error", function(err) {
        console.log("ERROR:", err);
    })
    .on("cycle", function(event) {
        console.log(String(event.target));
    })
    .on("complete", function(event) {
        var fastest = this.filter('fastest'),
            slowest = this.filter('slowest');
        var fastestHz = getHz(fastest[0]);
        console.log("\n" + chalk.white(pad(fastest[0].name, padSize)) + " was " + chalk.green("fastest"));
        benches.forEach(function(bench) {
            if (fastest.indexOf(bench) > -1)
                return;
            var hz = hz = getHz(bench);
            var percent = (1 - (hz / fastestHz)) * 100;
            console.log(chalk.white(pad(bench.name, padSize)) + " was " + chalk.red(percent.toFixed(1)+'% slower'));
        });
        console.log();
    });
}

function getHz(bench) {
    return 1 / (bench.stats.mean + bench.stats.moe);
}

function pad(str, len, l) {
    while (str.length < len)
        str = l ? str + " " : " " + str;
    return str;
}