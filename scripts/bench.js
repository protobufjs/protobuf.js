var protobuf = require(".."),
    nativeStringify = JSON.stringify;
var JSON3 = require("./lib/json3");

if (JSON3.stringify === nativeStringify)
    throw Error("something went wrong");

var pkg = require(__dirname + "/../package.json");

protobuf.load(__dirname + "/../tests/data/package.proto", function(err, root) {
    if (err)
        throw err;

    try {

        // NOTE: This is currently testing string-heavy data, exactly where JSON excels.
        // On my machine, protobuf is 6 times slower, which isn't bad considering that JSON
        // is all native and heavily optimized. Compared with JSON3, protobuf is slightly faster.

        // Our goal should be to reduce function calls and reflection iterations to a minimum.
        // This is where code generation comes into play.

        var Package = root.lookup("Package");
        var myPackage = Package.decode(Package.encode(Package.create(pkg)).finish());
        
        var times = 50000;

        console.log("running " + times + " iterations ...");

        function bench_protobuf() {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Package.encode(myPackage).finish();
                Package.decode(buf);
                len += buf.length;
            }
            console.log("protobuf encode/decode: " + (Date.now() - start) + "ms (" + len + " bytes)");
        }

        function bench_json_native() {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Buffer.from(JSON.stringify(pkg), "utf8");
                JSON.parse(buf.toString("utf8"));
                len += buf.length;
            }
            console.log("JSON [native] stringify/parse: " + (Date.now() - start) + "ms (" + len + " bytes)");
        }

        function bench_json3() {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Buffer.from(JSON3.stringify(pkg), "utf8");
                JSON3.parse(buf.toString("utf8"));
                len += buf.length;
            }
            console.log("JSON3 stringify/parse: " + (Date.now() - start) + "ms (" + len + " bytes)");
        }

        bench_protobuf();
        bench_json_native();
        bench_json3();

    } catch (e) {
        console.error(e);
    }        

});
