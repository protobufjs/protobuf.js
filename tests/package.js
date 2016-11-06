var tap = require("tap");

var protobuf = require(".."),
    pkg = require("../package.json");

function toValues(message) {
    var values = {};
    Object.keys(message.$values).forEach(function(key) {
        var value = message[key];
        if (value instanceof protobuf.Prototype)
            values[key] = toValues(value);
        else
            values[key] = value;
    });
    return values;
}

tap.test("package.json", function(test) {

    protobuf.load("tests/data/package.proto", function(err, root) {
        if (err)
            return test.threw(err);
        try {
            
            var Package = root.lookup("Package");
            var Repository = root.lookup("Package.Repository");
            var myPackage = Package.create(pkg);
            pkg.dependencies = {}; // Type#create initializes with {}

            test.test("runtime message", function(test) {

                test.type(myPackage, protobuf.Prototype, "should extend Prototype");
                test.equal(myPackage.$type, Package, "should reference Package as its reflected type");
                test.type(myPackage.repository, protobuf.Prototype, "submessages should also extend Prototype");
                test.equal(myPackage.repository.$type, Repository, "repository submessage should reference Repository as its reflected type");
                test.deepEqual(toValues(myPackage), pkg, "should have equal contents");

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
                test.deepEqual(toValues(decoded), pkg, "should have equal contents");

                test.end();
            });

        } catch (e) {
            test.threw(e);
        }
        test.end();
    });

});
