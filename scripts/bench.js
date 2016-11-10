var protobuf = require(__dirname + "/../src/index"),
    path     = require("path"),
    pkg      = require(__dirname + "/../package.json");
var JSONPoly = require("./lib/jsonpoly");

var times = process.argv.length > 2 ? parseInt(process.argv[2], 10) : 100000;
console.log("usage: " + path.basename(process.argv[1]) + " [iterations="+times+"] [protobufOnly]\n");
console.log("encoding/decoding " + times + " iterations ...\n");

// NOTE: This benchmark measures message to buffer respectively buffer to message performance.

var testData = {
    foo: 'hello',
    hello: 42,
    payload: new Buffer('a'),
    meh: {
        b: {
            tmp: {
                baz: 1000
            }
        },
        lol: 'lol'
    }
};

protobuf.load(__dirname + "/bench.proto", function(err, root) {
    if (err)
        throw err;

    try {
        var Test = root.lookup("Test");

        var t = Test.create();
        
        function summarize(name, start, length) {
            var time = Date.now() - start;
            var sb = [ pad(name, 24, 1), " : ", pad(time + "ms", 10), "   ", pad(length + " bytes", 15) ];
            console.log(sb.join(''));
        }

        function bench_protobuf() {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Test.encode(testData).finish();
                len += buf.length;
            }
            summarize("encode protobuf." + "js", start, len);
            start = Date.now();
            len = 0;
            for (var i = 0; i < times; ++i) {
                var msg = Test.decode(buf);
                len += buf.length;
            }
            summarize("decode protobuf." + "js", start, len);
            console.log();
        }

        function bench_protobuf_rw() {
            var reader = protobuf.Reader(new Buffer(0)),
                writer = protobuf.Writer();
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Test.encode_(testData, writer).finish();
                len += buf.length;
            }
            summarize("encode protobuf." + "js r/w", start, len);
            start = Date.now();
            len = 0;
            for (var i = 0; i < times; ++i) {
                var msg = Test.decode_(reader.reset(buf), Object.create(Test.prototype), buf.length);
                len += buf.length;
            }
            summarize("decode protobuf." + "js r/w", start, len);
            console.log();
        }

        function bench_json(name, JSON) {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Buffer.from(JSON.stringify(testData), "utf8");
                len += buf.length;
            }
            summarize("encode JSON " + name, start, len);
            start = Date.now();
            len = 0;
            for (var i = 0; i < times; ++i) {
                var msg = JSON.parse(buf.toString("utf8"));
                len += buf.length;
            }
            summarize("decode JSON " + name, start, len);
            console.log();
        }

        bench_protobuf();
        bench_protobuf_rw();
        if (process.argv.length < 4) {
            bench_json("native", JSON);
            bench_json("polyfill", JSONPoly);
        }

        console.log("--- warmed up ---\n");
        bench_protobuf();
        bench_protobuf_rw();
        if (process.argv.length < 4) {
            bench_json("native", JSON);
            bench_json("polyfill", JSONPoly);
        }

    } catch (e) {
        console.error(e);
    }        

});

function pad(str, len, l) {
    while (str.length < len)
        str = l ? str + " " : " " + str;
    return str;
}