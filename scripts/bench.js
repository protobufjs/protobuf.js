var protobuf = require(__dirname + "/../src/index"),
    path     = require("path"),
    pkg      = require(__dirname + "/../package.json");
var JSONPoly = require("./lib/jsonpoly");

var times = process.argv.length > 2 ? parseInt(process.argv[2], 10) : 100000;
console.log("usage: " + path.basename(process.argv[1]) + " [iterations="+times+"] [protobufOnly]\n");
console.log("encoding/decoding " + times + " iterations ...\n");

protobuf.load(__dirname + "/bench.proto", function(err, root) {
    if (err)
        throw err;

    try {
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
        var Test = root.lookup("Test");
        Test.decode(Test.encode(testData).finish());
        
        function summarize(name, start, length) {
            var time = Date.now() - start;
            var sb = [ pad(name, 15, 1), " : ", pad(time + "ms", 10), "   ", pad(length + " bytes", 15) ];
            console.log(sb.join(''));
        }

        function bench_protobuf_object() {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Test.encode(testData).finish();
                Test.decode(buf);
                len += buf.length;
            }
            summarize("PBJS " + "object", start, len);
        }

        function TestClass(properties) {
            protobuf.Prototype.call(this, properties);
        }
        protobuf.inherits(TestClass, Test);

        var instance = new TestClass(testData);

        function bench_protobuf_class() {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = TestClass.encode(instance);
                TestClass.decode(buf);
                len += buf.length;
            }
            summarize("PBJS " + "class", start, len);
        }

        function bench_json(name, JSON) {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Buffer.from(JSON.stringify(testData), "utf8");
                JSON.parse(buf.toString("utf8"));
                len += buf.length;
            }
            summarize("JSON " + name, start, len);
        }

        bench_protobuf_object();
        bench_protobuf_class();
        if (process.argv.length < 4) {
            bench_json("native", JSON);
            bench_json("poly", JSONPoly);
        }

        console.log("\n--- warmed up ---");
        bench_protobuf_object();
        bench_protobuf_class();
        if (process.argv.length < 4) {
            bench_json("native", JSON);
            bench_json("poly", JSONPoly);
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