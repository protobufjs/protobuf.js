var tape = require("tape");

var protobuf = require(".."),
    pkg = require("../package.json");

tape.test("package.json (static)", function(test) {

    var root = require("./data/package.js");

    var Package = root.Package;
    var Repository = root.Package.Repository;
    var myPackage = new Package(pkg);

    test.test("runtime message", function(test) {

        test.ok(myPackage instanceof Package, "should extend Package");
        test.deepEqual(myPackage, pkg, "should have equal contents");

        test.end();
    });

    test.test("decoded message", function(test) {

        var writer = Package.encode(myPackage);
        var buf = writer.finish();
        var decoded = Package.decode(buf);

        test.ok(decoded instanceof Package, "should extend Package");
        test.ok(decoded.repository instanceof Repository, "submessage should extend Repository");
        test.deepEqual(decoded, pkg, "should have equal contents");

        test.end();
    });

    test.end();

});
