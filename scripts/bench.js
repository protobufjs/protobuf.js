var protobuf = require(__dirname + "/../src/index"),
    path     = require("path"),
    pkg      = require(__dirname + "/../package.json");
var JSONPoly = require("./lib/jsonpoly");
    JSON3    = require("./lib/json3");

var pkg = require(__dirname + "/../package.json");

var times = process.argv.length > 2 ? parseInt(process.argv[2], 10) : 10000;
console.log("usage: " + path.basename(process.argv[1]) + " [iterations=10000] [protobufOnly]\n");
console.log("encoding/decoding " + times + " iterations ...\n");

protobuf.load(__dirname + "/../tests/data/package.proto", function(err, root) {
    if (err)
        throw err;

    try {

        // Compared to native JSON, protobuf.js is 5-6 times slower on my machine.
        // Compared to polyfilled JSON, protobuf.js is 2-3 times slower on my machine.

        var Package = root.lookup("Package");
        
        function summarize(name, start, length, allocCount, allocBytes) {
            var time = Date.now() - start;
            var sb = [ pad(name, 15, 1), " : ", pad(time + "ms", 10), "   ", pad(length + " bytes", 15) ];
            if (allocCount !== undefined)
                sb.push("   ", pad(allocCount.toString(), 7));
            if (allocBytes !== undefined)
                sb.push("   ", pad(allocBytes.toString(), 9));
            console.log(sb.join(''));
        }

        function bench_protobuf_object() {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Package.encode(pkg).finish();
                Package.decode(buf);
                len += buf.length;
            }
            summarize("PBJS " + "object", start, len, protobuf.BufferWriter.alloc.count, protobuf.BufferWriter.alloc.bytes);
        }

        function PackageClass(properties) {
            protobuf.Prototype.call(this, properties);
        }
        protobuf.inherits(PackageClass, Package);
        var myPackage = new PackageClass(pkg);

        function bench_protobuf_class() {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = PackageClass.encode(myPackage);
                Package.decode(buf);
                len += buf.length;
            }
            summarize("PBJS " + "class", start, len, protobuf.BufferWriter.alloc.count, protobuf.BufferWriter.alloc.bytes);
        }

        function bench_json(name, JSON) {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Buffer.from(JSON.stringify(pkg), "utf8");
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
            bench_json("3", JSON3);
        }

        console.log("\n--- warmed up ---");
        bench_protobuf_object();
        bench_protobuf_class();
        if (process.argv.length < 4) {
            bench_json("native", JSON);
            bench_json("poly", JSONPoly);
            bench_json("3", JSON3);
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