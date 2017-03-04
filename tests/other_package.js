"use strict";
var tape = require("tape");

var protobuf = require(".."),
    pkg = require("../package.json");

tape.test("package.json (reflected)", function(test) {

    test.plan(2);

    protobuf.load("tests/data/package.proto", function(err, root) {
        if (err) {
            test.fail(err.message);
            return;
        }
        
        var Package = root.lookup("Package"),
            Repository = root.lookup("Package.Repository");
            
        var myPackage = Package.create(pkg);

        test.test(test.name + " - runtime message", function(test) {

            test.ok(myPackage instanceof protobuf.Message, "should extend Message");
            test.equal(myPackage.$type, Package, "should reference Package as its reflected type");
            test.deepEqual(myPackage, pkg, "should have equal contents");

            test.end();
        });

        test.test(test.name + " - decoded message", function(test) {

            var writer = Package.encode(myPackage);
            var buf = writer.finish();
            var decoded = Package.decode(buf);

            test.ok(decoded instanceof protobuf.Message, "should extend Message");
            test.equal(decoded.$type, Package, "should reference Package as its reflected type");
            test.ok(decoded.repository instanceof protobuf.Message, "submessages should also extend Message");
            test.equal(decoded.repository.$type, Repository, "repository submessage should reference Repository as its reflected type");
            test.deepEqual(decoded, pkg, "should have equal contents");

            test.end();
        });
    });
});
