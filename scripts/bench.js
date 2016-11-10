var protobuf = require(__dirname + "/../src/index"),
    Long     = require("long"),
    path     = require("path"),
    assert   = require("assert");

var JSONPoly = require("./lib/jsonpoly");

var times = process.argv.length > 2 ? parseInt(process.argv[2], 10) : 100000;

// NOTE: This benchmark measures message to buffer respectively buffer to message performance.

var data = {
    string : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    uint32 : 9000,
    inner : {
        int32 : 20161110,
        innerInner : {
            long : new Long(1051, 151234, false),
            enum : 1,
            sint32: -42
        },
        outer : {
            bool : true
        }
    }
};

protobuf.load(__dirname + "/bench.proto", function(err, root) {
    if (err)
        throw err;

    try {

        // Set up our test message and verify that it encodes/decodes what we provided
        var Test = root.lookup("Test");
        protobuf.codegen.verbose = true;
        var decoded = Test.decode(Test.encode(data).finish());
        protobuf.codegen.verbose = false;
        assert.deepEqual(decoded, data);

        console.log("\nusage: " + path.basename(process.argv[1]) + " [iterations="+times+"] [protobufOnly]\n");
        console.log("encoding/decoding " + times + " iterations ...\n");
        
        function summarize(name, start, length) {
            var time = Date.now() - start;
            var sb = [ pad(name, 24, 1), " : ", pad(time + "ms", 10), "   ", pad(length + " bytes", 15) ];
            console.log(sb.join(''));
        }

        function bench_protobuf() {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Test.encode(data).finish();
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
                var buf = Test.encode_(data, writer).finish();
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
                var buf = Buffer.from(JSON.stringify(data), "utf8");
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