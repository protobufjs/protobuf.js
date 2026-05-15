var path = require("path"),
    url  = require("url"),
    tape = require("tape");

var distPath = path.join(__dirname, "..", "..", "dist");

[
    {
        name: "full",
        file: path.join(distPath, "index.js"),
        verify: function(test, protobuf) {
            test.equal(protobuf.build, "full", "should load the full build");
            test.ok(protobuf.Root, "should export reflection");
            test.ok(protobuf.parse, "should export parser");
        }
    },
    {
        name: "light",
        file: path.join(distPath, "light.js"),
        verify: function(test, protobuf) {
            test.equal(protobuf.build, "light", "should load the light build");
            test.ok(protobuf.Root, "should export reflection");
            test.notOk(protobuf.parse, "should not export parser");
        }
    },
    {
        name: "minimal",
        file: path.join(distPath, "minimal.js"),
        verify: function(test, protobuf) {
            test.equal(protobuf.build, "minimal", "should load the minimal build");
            test.ok(protobuf.Reader, "should export reader");
            test.ok(protobuf.Writer, "should export writer");
        }
    }
]
.forEach(function(dist) {

    tape.test(dist.name + " ESM bundle", async function(test) {
        var previous = globalThis.protobuf;
        delete globalThis.protobuf;
        var protobuf = await import(url.pathToFileURL(dist.file).href);
        dist.verify(test, protobuf);
        test.ok(protobuf.util, "should export util");
        test.ok(protobuf.util.Long && protobuf.util.Long.isLong, "should bundle long.js");
        test.equal(globalThis.protobuf, undefined, "should not install a global");
        if (previous !== undefined)
            globalThis.protobuf = previous;
        test.end();
    });

});
