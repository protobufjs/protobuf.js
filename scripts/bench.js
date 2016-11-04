var protobuf = require("..");
var pkg = require(__dirname + "/../package.json");

protobuf.load(__dirname + "/../tests/data/package.proto", function(err, root) {
    if (err)
        throw err;

    try {

        // NOTE: This is currently testing string-heavy data, exactly where JSON excels.
        // On my machine, protobuf is 6 times slower, which isn't bad considering that JSON
        // is all native and heavily optimized.

        // Our goal should be to reduce function calls and reflection iterations to a minimum.
        // This is where code generation comes into play.

        var Package = root.lookup("Package");
        var myPackage = Package.decode(Package.encode(Package.create(pkg)).finish());
        
        var times = 50000;

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

        function bench_json() {
            var start = Date.now(),
                len = 0;
            for (var i = 0; i < times; ++i) {
                var buf = Buffer.from(JSON.stringify(pkg), "utf8");
                JSON.parse(buf.toString("utf8"));
                len += buf.length;
            }
            console.log("JSON stringify/parse: " + (Date.now() - start) + "ms (" + len + " bytes)");
        }

        bench_json();
        bench_protobuf();

    } catch (e) {
        console.error(e);
    }        

});
