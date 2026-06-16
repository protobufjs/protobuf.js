var childProcess = require("child_process"),
    path = require("path"),
    tape = require("tape");

var rootDir = path.join(__dirname, "..", "..");

// Regression for JavaScript's "override mistake":
// https://github.com/tc39/how-we-work/blob/main/terminology.md#override-mistake
//
// In strict mode, assignment cannot create an own property when the same key
// is inherited as non-writable. Freezing the relevant base prototypes models
// this condition for properties protobuf.js intentionally shadows, such as
// "constructor" or "toString".
tape.test("loads and runs when base prototypes are frozen", function(test) {
    var script = [
        "\"use strict\";",
        "// Do not freeze Error.prototype here: Node 12's warning internals assign",
        "// warning.name while emitting the deprecated root/global warning during require.",
        "Object.freeze(Object.prototype);",
        "Object.freeze(Function.prototype);",
        "var protobuf = require(process.cwd());",
        "var root = protobuf.Root.fromJSON({ nested: { Example: { fields: { value: { type: \"string\", id: 1 } } } } });",
        "var Example = root.lookupType(\"Example\");",
        "var decoded = Example.decode(Example.encode(Example.create({ value: \"ok\" })).finish());",
        "if (decoded.value !== \"ok\") throw Error(\"unexpected decode result\");",
        "if (String(Example) !== \"Type .Example\") throw Error(\"unexpected type string\");",
        "var err = protobuf.util.ProtocolError(\"missing\", { instance: decoded });",
        "if (err.name !== \"ProtocolError\" || err.instance !== decoded) throw Error(\"unexpected protocol error\");"
    ].join("\n");
    var result = childProcess.spawnSync(process.execPath, ["-e", script], {
        cwd: rootDir,
        encoding: "utf8"
    });

    test.equal(result.status, 0, result.error || result.signal || result.stderr || result.stdout);
    test.end();
});
