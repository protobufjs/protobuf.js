var childProcess = require("child_process"),
    fs = require("fs"),
    path = require("path"),
    tape = require("tape");

var rootDir = path.join(__dirname, "..", "..");

tape.test("loads and runs after HardenedJS initialization", function(test) {
    var script = [
        "\"use strict\";",
        "require(\"@endo/init\");",
        "var protobuf = require(process.cwd());",
        "var root = protobuf.Root.fromJSON({ nested: { Example: { fields: { value: { type: \"string\", id: 1 } } } } });",
        "var Example = root.lookupType(\"Example\");",
        "var decoded = Example.decode(Example.encode(Example.create({ value: \"ok\" })).finish());",
        "if (decoded.value !== \"ok\") throw Error(\"unexpected decode result\");"
    ].join("\n");
    var result = childProcess.spawnSync(process.execPath, ["-e", script], {
        cwd: rootDir,
        encoding: "utf8"
    });

    test.equal(result.status, 0, result.stderr || result.stdout);
    test.end();
});

tape.test("does not use prototype assignments that fail on hardened inherited properties", function(test) {
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
