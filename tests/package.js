var tap = require("tap");

var protobuf = require(".."),
    pkg = require("../package.json");

tap.test("package.json", function(test) {

    protobuf.load("tests/data/package.proto", function(err, root) {
        if (err)
            return test.threw(err);
        try {
            
            var Package = root.lookup("Package");
            var myPackage = Package.create(pkg);

            pkg.dependencies = {}; // create initializes with {}
            test.deepEqual(myPackage, pkg, "should have equal contents as a created message");

            var writer = Package.encode(myPackage);
            test.type(writer, protobuf.BufferWriter, "should use BufferWriter to encode");
            var buf = writer.finish();
            var decoded = Package.decode(buf);
            test.deepEqual(decoded, pkg, "should still have equal contents when encoded and decoded again");

        } catch (e) {
            test.threw(e);
        }
        test.end();
    });

});
