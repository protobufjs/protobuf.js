var tap = require("tap");

var protobuf = require(".."),
    pkg = require("../package.json");

tap.test("package.json", function(test) {

    protobuf.load("tests/data/package.proto", function(err, root) {
        if (err)
            return test.threw(err);
        try {
            
            var Package = root.lookup("Package");
            var Repository = root.lookup("Package.Repository");
            var myPackage = Package.create(pkg);

            test.test("runtime message", function(test) {

                test.type(myPackage, protobuf.Prototype, "should extend Prototype");
                test.equal(myPackage.$type, Package, "should reference Package as its reflected type");
                test.deepEqual(myPackage, pkg, "should have equal contents");

                test.end();
            });

            test.test("decoded message", function(test) {

                var writer = Package.encode(myPackage);
                var buf = writer.finish();
                var decoded = Package.decode(buf);

                test.type(decoded, protobuf.Prototype, "should extend Prototype");
                test.equal(decoded.$type, Package, "should reference Package as its reflected type");
                test.type(decoded.repository, protobuf.Prototype, "submessages should also extend Prototype");
                test.equal(decoded.repository.$type, Repository, "repository submessage should reference Repository as its reflected type");
                test.deepEqual(decoded, pkg, "should have equal contents");

                test.end();
            });

        } catch (e) {
            test.threw(e);
        }
        test.end();
    });

});
