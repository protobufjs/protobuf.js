var tap = require("tap");

var protobuf = require(".."),
    pkg = require("../package.json");

tap.test("google.protobuf.Any type", function(test) {

    protobuf.load("tests/data/package.proto", function(err, root) {
        if (err)
            return test.threw(err);
        try {
            var Package = root.lookup("Package");
            var myPackage = Package.create(pkg);

            pkg.dependencies = {}; // create initializes with {}
            test.deepEqual(myPackage, pkg);

            var buf = Package.encode(myPackage).finish();
            var decoded = Package.decode(buf);
            test.deepEqual(decoded, myPackage);

        } catch (e) {
            test.threw(e);
        }
        test.end();
    });

});
