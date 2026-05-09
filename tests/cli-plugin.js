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

    try {
        testFunc();
    } finally {
        // Rollback all the require() related mess we made
        delete require.cache.protobufjs;
        Module._resolveFilename = savedResolveFilename;
    }
}

tape.test("protoc-gen-pbjs generates static-module responses", function(test) {
    cliTest(test, function() {
        var descriptor = require("../ext/descriptor");
        var plugin = require("../cli/protoc-gen-pbjs");
        var root = protobuf.loadSync("tests/data/cli/test.proto").resolveAll();
        var set = root.toDescriptor("proto3");
        var request = plugin.CodeGeneratorRequest.encode({
            fileToGenerate: [ "tests/data/cli/test.proto" ],
            parameter: "file=awesome.js,target=static-module,wrap=esm,dts",
            protoFile: set.file
        }).finish();

        test.ok(descriptor.FileDescriptorSet, "descriptor extension loaded");
        plugin.run(request, function(err, response) {
            test.error(err, "plugin request decoded");
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
            test.ok(response.file[1].content.indexOf("constructor(properties?: IOneofContainer);") >= 0, "emits constructable static declarations");
            test.end();
        });
    });
});

tape.test("protoc-gen-pbjs generates json-module responses", function(test) {
    cliTest(test, function() {
        var plugin = require("../cli/protoc-gen-pbjs");
        var root = protobuf.loadSync("tests/data/package.proto").resolveAll();
        var set = root.toDescriptor("proto3");
        var request = plugin.CodeGeneratorRequest.encode({
            fileToGenerate: [ "tests/data/package.proto" ],
            parameter: "file=bundle.js,target=json-module,wrap=esm,dts",
            protoFile: set.file
        }).finish();

        plugin.run(request, function(err, response) {
            test.error(err, "plugin request decoded");
            test.notOk(response.error, "response has no error");
            test.equal(response.file.length, 2, "writes js and dts files");
            test.ok(response.file[0].content.indexOf("protobufjs/light.js") >= 0, "uses light runtime for esm json module");
            test.ok(response.file[0].content.indexOf("export const Package") >= 0, "emits named export for reflected type");
            test.ok(response.file[1].content.indexOf("private constructor();") >= 0, "marks reflection-backed declarations as non-constructable");
            test.ok(response.file[1].content.indexOf("Reflection-backed declarations are not constructable. Use Package.create(...) instead.") >= 0, "explains create usage");
            test.end();
        });
    });
});

tape.test("protoc-gen-pbjs validates options", function(test) {
    cliTest(test, function() {
        var plugin = require("../cli/protoc-gen-pbjs");
        var root = protobuf.loadSync("tests/data/package.proto").resolveAll();
        var set = root.toDescriptor("proto3");

        function request(parameter) {
            return plugin.CodeGeneratorRequest.encode({
                fileToGenerate: [ "tests/data/package.proto" ],
                parameter: parameter,
                protoFile: set.file
            }).finish();
        }

        plugin.run(request("target=static-module"), function(defaultErr, defaultResponse) {
            test.error(defaultErr, "default file request decoded");
            test.notOk(defaultResponse.error, "default file response has no error");
            test.equal(defaultResponse.file[0].name, "index.js", "defaults to index.js");

            plugin.run(request("file=./normalized.js,target=static-module"), function(normalizedErr, normalizedResponse) {
                test.error(normalizedErr, "normalized file request decoded");
                test.notOk(normalizedResponse.error, "normalized file response has no error");
                test.equal(normalizedResponse.file[0].name, "normalized.js", "normalizes current-directory path components");

                plugin.run(request("file=gen/./normalized.js,target=static-module"), function(nestedErr, nestedResponse) {
                    test.error(nestedErr, "nested normalized file request decoded");
                    test.notOk(nestedResponse.error, "nested normalized file response has no error");
                    test.equal(nestedResponse.file[0].name, "gen/normalized.js", "normalizes nested current-directory path components");

                    plugin.run(request("file=../bad.js,target=static-module"), function(pathErr, pathResponse) {
                        test.error(pathErr, "bad path request decoded");
                        test.equal(pathResponse.error, "file must not contain '..': ../bad.js", "rejects parent paths");

                        plugin.run(request("file=gen/../bad.js,target=static-module"), function(nestedPathErr, nestedPathResponse) {
                            test.error(nestedPathErr, "nested bad path request decoded");
                            test.equal(nestedPathResponse.error, "file must not contain '..': gen/../bad.js", "rejects nested parent paths");

                            plugin.run(request("file=bad.txt,target=static-module"), function(extErr, extResponse) {
                                test.error(extErr, "bad extension request decoded");
                                test.equal(extResponse.error, "file must end in .js, .mjs or .cjs: bad.txt", "rejects non-js output files");

                                plugin.run(request("file=bad.js,target=json"), function(targetErr, targetResponse) {
                                    test.error(targetErr, "bad target request decoded");
                                    test.equal(targetResponse.error, "unsupported target: json", "rejects unsupported target");

                                    plugin.run(request("file=bad.js,unknown=true"), function(optionErr, optionResponse) {
                                        test.error(optionErr, "unknown option request decoded");
                                        test.equal(optionResponse.error, "unknown option: unknown", "rejects unknown option");
                                        test.end();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

tape.test("protoc-gen-pbjs supports keep-case and edition 2024 descriptors", function(test) {
    cliTest(test, function() {
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

        plugin.run(request, function(err, response) {
            test.error(err, "plugin request decoded");
            test.notOk(response.error, "response has no error");
            test.equal(response.maximumEdition, 1001, "advertises edition 2024");
            test.ok(response.file[0].content.indexOf("some_field") >= 0, "keeps snake_case when requested");
            test.end();
        });
    });
});

tape.test("protoc-gen-pbjs binary reads request and writes response", function(test) {
    cliTest(test, function() {
        var plugin = require("../cli/protoc-gen-pbjs");
        var root = protobuf.loadSync("tests/data/package.proto").resolveAll();
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
        child.on("close", function(code) {
            test.equal(code, 0, "binary exits successfully");
            test.equal(Buffer.concat(stderr).toString("utf8"), "", "binary writes no stderr");
            var response = plugin.CodeGeneratorResponse.decode(Buffer.concat(stdout));
            test.notOk(response.error, "response has no error");
            test.equal(response.file.length, 1, "writes one js file by default");
            test.equal(response.file[0].name, "index.js", "writes default file");
            test.end();
        });
        child.stdin.end(Buffer.from(request));
    });
});
