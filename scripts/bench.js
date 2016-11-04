var protobuf = require("..");
var pkg = require(__dirname + "/../package.json");

protobuf.load(__dirname + "/../tests/data/package.proto", function(err, root) {
    if (err)
        throw err;

    try {

        // Hotspots:
        // Type#decode, Type#create

        var Package = root.lookup("Package");
        var myPackage = Package.create(pkg);

        var times = 10000;

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
