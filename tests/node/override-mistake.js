var childProcess = require("child_process"),
    fs = require("fs"),
    path = require("path"),
    tape = require("tape");

var rootDir = path.join(__dirname, "..", "..");

// Regression for JavaScript's "override mistake":
// https://github.com/tc39/how-we-work/blob/main/terminology.md#override-mistake
//
// In strict mode, assignment cannot create an own property when the same key
// is inherited as non-writable. Freezing the base prototypes models this
// condition for properties protobuf.js intentionally shadows, such as
// "constructor" or "toString".
tape.test("loads and runs when base prototypes are frozen", function(test) {
    var script = [
        "\"use strict\";",
        "Object.freeze(Object.prototype);",
        "Object.freeze(Error.prototype);",
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

    test.equal(result.status, 0, result.stderr || result.stdout);
    test.end();
});

tape.test("does not use prototype assignments that trigger the override mistake", function(test) {
    var files = [
        "src/enum.js",
        "src/field.js",
        "src/mapfield.js",
        "src/method.js",
        "src/namespace.js",
        "src/object.js",
        "src/oneof.js",
        "src/reader_buffer.js",
        "src/root.js",
        "src/rpc/service.js",
        "src/service.js",
        "src/type.js",
        "src/writer_buffer.js",
        "cli/targets/static.js"
    ];
    var unsafePatterns = [
        /prototype\.toString\s*=/,
        /prototype\s*=\s*Object\.create\([^;\n]+\.constructor\s*=/,
        /prototype\s*=\s*new Message\(\)\)\.constructor\s*=/
    ];
    var violations = [];

    files.forEach(function(file) {
        var source = fs.readFileSync(path.join(rootDir, file), "utf8");
        unsafePatterns.forEach(function(pattern) {
            if (pattern.test(source))
                violations.push(file + " matches " + pattern);
        });
    });

    test.equal(violations.join("\n"), "", "should define shadowing prototype properties with descriptors");
    test.end();
});
