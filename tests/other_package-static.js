var tape = require("tape");

var protobuf = require(".."),
    pkg = require("../package.json");

tape.test("package.json (static)", function(test) {

    var root = require("./data/package.js");

    var Package = root.Package,
        Repository = root.Package.Repository;

    var myPackage = new Package(pkg);

    test.test(test.name + " - runtime message", function(test) {

        test.ok(myPackage instanceof Package, "should extend Package");
        test.deepEqual(myPackage, pkg, "should have equal contents");

        test.end();
    });

    test.test(test.name + " - decoded message", function(test) {

        var decoded = Package.decode(Package.encode(myPackage).finish());

        test.ok(decoded instanceof Package, "should extend Package");
        test.ok(decoded.repository instanceof Repository, "submessage should extend Repository");
        test.deepEqual(decoded, pkg, "should have equal contents");

        test.end();
    });

    test.end();

});
