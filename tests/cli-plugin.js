// Tests for the protoc-gen-pbjs plugin.

var tape = require("tape");
var path = require("path");
var Module = require("module");
var protobuf = require("..");
var child_process = require("child_process");

function cliTest(test, testFunc) {
    // pbjs does not seem to work with Node v4, so skip this test if we're running on it
    if (process.versions.node.match(/^4\./)) {
        test.end();
        return;
    }

    // Alter the require cache to make the cli work since it requires "protobufjs"
    // and we don't want to mess with "npm link"
    var savedResolveFilename = Module._resolveFilename;
    Module._resolveFilename = function(request, parent) {
        if (request === "protobufjs")
            return request;
        if (request === "protobufjs/ext/descriptor")
            return path.resolve("ext/descriptor/index.js");
        if (request === "protobufjs/google/protobuf/compiler/plugin.json")
            return path.resolve("google/protobuf/compiler/plugin.json");
        return savedResolveFilename(request, parent);
    };
    require.cache.protobufjs = require.cache[path.resolve("index.js")];

    function restore() {
        delete require.cache.protobufjs;
        Module._resolveFilename = savedResolveFilename;
    }

    try {
        var result = testFunc();
        if (result && typeof result.finally === "function")
            return result.finally(restore);
        restore();
        return result;
    } catch (err) {
        restore();
        throw err;
    }
}

function runPlugin(test, plugin, request, message) {
    return new Promise(function(resolve) {
        plugin.run(request, function(err, response) {
            test.error(err, message);
            resolve(response);
        });
    });
}

tape.test("protoc-gen-pbjs generates static-module responses", async function(test) {
    await cliTest(test, async function() {
        var descriptor = require("../ext/descriptor");
        var plugin = require("../cli/protoc-gen-pbjs");
        var root = await protobuf.load("tests/data/cli/test.proto");
        var set = root.toDescriptor("proto3");
        var request = plugin.CodeGeneratorRequest.encode({
            fileToGenerate: [ "tests/data/cli/test.proto" ],
            parameter: "file=awesome.js,target=static-module,wrap=esm,dts",
            protoFile: set.file
        }).finish();

        test.ok(descriptor.FileDescriptorSet, "descriptor extension loaded");
        var response = await runPlugin(test, plugin, request, "plugin request decoded");
        test.notOk(response.error, "response has no error");
        test.equal(response.supportedFeatures, 3, "advertises proto3 optional and editions support");
        test.equal(response.minimumEdition, 1000, "advertises minimum edition 2023");
        test.equal(response.maximumEdition, 1001, "advertises maximum edition 2024");
        test.equal(response.file.length, 2, "writes js and dts files");
        test.equal(response.file[0].name, "awesome.js", "writes requested js file");
        test.equal(response.file[1].name, "awesome.d.ts", "derives dts file");
        test.ok(response.file[0].content.indexOf("protobufjs/minimal.js") >= 0, "uses minimal runtime for esm static module");
        test.ok(response.file[0].content.indexOf("regularField") >= 0, "camel-cases descriptor field names by default");
        test.ok(response.file[0].content.indexOf("regular_field") < 0, "does not keep snake_case by default");
        test.ok(response.file[1].content.indexOf("constructor(properties?: OneofContainer.$Properties);") >= 0, "emits constructable static declarations");
        test.end();
    });
});

tape.test("protoc-gen-pbjs generates json-module responses", async function(test) {
    await cliTest(test, async function() {
        var plugin = require("../cli/protoc-gen-pbjs");
        var root = await protobuf.load("tests/data/package.proto");
        var set = root.toDescriptor("proto3");
        var request = plugin.CodeGeneratorRequest.encode({
            fileToGenerate: [ "tests/data/package.proto" ],
            parameter: "file=bundle.js,target=json-module,wrap=esm,dts",
            protoFile: set.file
        }).finish();

        var response = await runPlugin(test, plugin, request, "plugin request decoded");
        test.notOk(response.error, "response has no error");
        test.equal(response.file.length, 2, "writes js and dts files");
        test.ok(response.file[0].content.indexOf("protobufjs/light.js") >= 0, "uses light runtime for esm json module");
        test.ok(response.file[0].content.indexOf("export const Package") >= 0, "emits named export for reflected type");
        test.ok(response.file[1].content.indexOf("private constructor();") >= 0, "marks reflection-backed declarations as non-constructable");
        test.ok(response.file[1].content.indexOf("Reflection-backed declarations are not constructable. Use Package.create(...) instead.") >= 0, "explains create usage");
        test.end();
    });
});

tape.test("protoc-gen-pbjs validates options", async function(test) {
    await cliTest(test, async function() {
        var plugin = require("../cli/protoc-gen-pbjs");
        var root = await protobuf.load("tests/data/package.proto");
        var set = root.toDescriptor("proto3");

        function request(parameter) {
            return plugin.CodeGeneratorRequest.encode({
                fileToGenerate: [ "tests/data/package.proto" ],
                parameter: parameter,
                protoFile: set.file
            }).finish();
        }

        var response = await runPlugin(test, plugin, request("target=static-module"), "default file request decoded");
        test.notOk(response.error, "default file response has no error");
        test.equal(response.file[0].name, "index.js", "defaults to index.js");

        response = await runPlugin(test, plugin, request("file=./normalized.js,target=static-module"), "normalized file request decoded");
        test.notOk(response.error, "normalized file response has no error");
        test.equal(response.file[0].name, "normalized.js", "normalizes current-directory path components");

        response = await runPlugin(test, plugin, request("file=gen/./normalized.js,target=static-module"), "nested normalized file request decoded");
        test.notOk(response.error, "nested normalized file response has no error");
        test.equal(response.file[0].name, "gen/normalized.js", "normalizes nested current-directory path components");

        response = await runPlugin(test, plugin, request("file=../bad.js,target=static-module"), "bad path request decoded");
        test.equal(response.error, "file must not contain '..': ../bad.js", "rejects parent paths");

        response = await runPlugin(test, plugin, request("file=gen/../bad.js,target=static-module"), "nested bad path request decoded");
        test.equal(response.error, "file must not contain '..': gen/../bad.js", "rejects nested parent paths");

        response = await runPlugin(test, plugin, request("file=bad.txt,target=static-module"), "bad extension request decoded");
        test.equal(response.error, "file must end in .js, .mjs or .cjs: bad.txt", "rejects non-js output files");

        response = await runPlugin(test, plugin, request("file=bad.js,target=json"), "bad target request decoded");
        test.equal(response.error, "unsupported target: json", "rejects unsupported target");

        response = await runPlugin(test, plugin, request("file=bad.js,unknown=true"), "unknown option request decoded");
        test.equal(response.error, "unknown option: unknown", "rejects unknown option");
        test.end();
    });
});

tape.test("protoc-gen-pbjs supports keep-case and edition 2024 descriptors", async function(test) {
    await cliTest(test, async function() {
        var descriptor = require("../ext/descriptor");
        var plugin = require("../cli/protoc-gen-pbjs");
        var set = descriptor.FileDescriptorSet.create({
            file: [ {
                name: "edition.proto",
                syntax: "editions",
                edition: descriptor.Edition.EDITION_2024,
                messageType: [ {
                    name: "EditionMessage",
                    field: [ {
                        name: "some_field",
                        number: 1,
                        label: 1,
                        type: 9
                    } ]
                } ]
            } ]
        });

        var request = plugin.CodeGeneratorRequest.encode({
            fileToGenerate: [ "edition.proto" ],
            parameter: "file=edition.js,keep-case",
            protoFile: set.file
        }).finish();

        var response = await runPlugin(test, plugin, request, "plugin request decoded");
        test.notOk(response.error, "response has no error");
        test.equal(response.maximumEdition, 1001, "advertises edition 2024");
        test.ok(response.file[0].content.indexOf("some_field") >= 0, "keeps snake_case when requested");
        test.end();
    });
});

tape.test("protoc-gen-pbjs binary reads request and writes response", async function(test) {
    await cliTest(test, async function() {
        var plugin = require("../cli/protoc-gen-pbjs");
        var root = await protobuf.load("tests/data/package.proto");
        var request = plugin.CodeGeneratorRequest.encode({
            fileToGenerate: [ "tests/data/package.proto" ],
            parameter: "",
            protoFile: root.toDescriptor("proto3").file
        }).finish();
        var child = child_process.spawn(process.execPath, [ "cli/bin/protoc-gen-pbjs" ], {
            stdio: [ "pipe", "pipe", "pipe" ]
        });
        var stdout = [];
        var stderr = [];

        child.stdout.on("data", function(chunk) {
            stdout.push(chunk);
        });
        child.stderr.on("data", function(chunk) {
            stderr.push(chunk);
        });
        var done = new Promise(function(resolve) {
            child.on("close", resolve);
        });
        child.stdin.end(Buffer.from(request));
        var code = await done;
        test.equal(code, 0, "binary exits successfully");
        test.equal(Buffer.concat(stderr).toString("utf8"), "", "binary writes no stderr");
        var response = plugin.CodeGeneratorResponse.decode(Buffer.concat(stdout));
        test.notOk(response.error, "response has no error");
        test.equal(response.file.length, 1, "writes one js file by default");
        test.equal(response.file[0].name, "index.js", "writes default file");
        test.end();
    });
});
