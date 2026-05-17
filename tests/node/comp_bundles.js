var path = require("path"),
    url  = require("url"),
    tape = require("tape");

var distPath = path.join(__dirname, "..", "..", "dist");

function verifyLoad(test, dist, protobuf) {
    test.equal(protobuf.build, dist.name, "should load the " + dist.name + " build");
    test.notOk("default" in protobuf, "should not export default");
    dist.verify(test, protobuf);
}

function verifyPresent(test, protobuf, names) {
    names.forEach(function(name) {
        test.ok(name in protobuf, "should export " + name);
    });
}

function verifyMissing(test, protobuf, names) {
    names.forEach(function(name) {
        test.notOk(name in protobuf, "should not export " + name);
    });
}

var minimalExports = [
    "Writer",
    "BufferWriter",
    "Reader",
    "BufferReader",
    "util",
    "rpc",
    "roots",
    "configure"
];

var lightExports = [
    "load",
    "encoder",
    "decoder",
    "verifier",
    "converter",
    "ReflectionObject",
    "Namespace",
    "Root",
    "Enum",
    "Type",
    "Field",
    "OneOf",
    "MapField",
    "Service",
    "Method",
    "Message",
    "wrappers",
    "types"
];

var fullExports = [
    "parse",
    "tokenize",
    "common"
];

[
    {
        name: "full",
        file: path.join(distPath, "index.js"),
        verify: function(test, protobuf) {
            verifyPresent(test, protobuf, [ ...minimalExports, ...lightExports, ...fullExports ]);
        }
    },
    {
        name: "light",
        file: path.join(distPath, "light.js"),
        verify: function(test, protobuf) {
            verifyPresent(test, protobuf, [ ...minimalExports, ...lightExports ]);
            verifyMissing(test, protobuf, fullExports);
        }
    },
    {
        name: "minimal",
        file: path.join(distPath, "minimal.js"),
        verify: function(test, protobuf) {
            verifyPresent(test, protobuf, minimalExports);
            verifyMissing(test, protobuf, [ ...lightExports, ...fullExports ]);
        }
    }
]
.forEach(function(dist) {

    tape.test(dist.name + " ESM bundle", async function(test) {
        var protobuf = await import(url.pathToFileURL(dist.file).href);
        verifyLoad(test, dist, protobuf);
        test.end();
    });

    tape.test(dist.name + " ESM bundle via require", function(test) {
        var protobuf = require(dist.file);
        verifyLoad(test, dist, protobuf);
        test.end();
    });

});
