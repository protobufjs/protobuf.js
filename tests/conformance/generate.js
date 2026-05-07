"use strict";

var child_process = require("child_process"),
    fs = require("fs"),
    path = require("path");

var rootDir = path.resolve(__dirname, "../.."),
    upstreamDir = process.env.PROTOBUF_UPSTREAM || path.join(__dirname, "upstream"),
    outputDir = path.join(__dirname, "generated"),
    outputFile = path.join(outputDir, "messages.js"),
    outputJsonFile = path.join(outputDir, "messages.json"),
    upstreamUnstableSchemaFile = "conformance/test_protos/test_messages_edition_unstable.proto",
    unstableSchemaFile = path.join(outputDir, "test_messages_edition_unstable.proto"),
    importRoots = [
        "src",
        "conformance",
        "conformance/test_protos",
        "editions/golden"
    ],
    schemaFiles = [
        "conformance/conformance.proto",
        "src/google/protobuf/test_messages_proto2.proto",
        "src/google/protobuf/test_messages_proto3.proto",
        "conformance/test_protos/test_messages_edition2023.proto",
        "editions/golden/test_messages_proto2_editions.proto",
        "editions/golden/test_messages_proto3_editions.proto"
    ];

if (!fs.existsSync(upstreamDir)) {
    console.error("missing upstream protobuf checkout: " + upstreamDir);
    process.exit(1);
}

upstreamDir = path.resolve(upstreamDir);

fs.mkdirSync(outputDir, { recursive: true });

// Upstream v34+ includes REQUIRED EditionUnstable conformance tests even with
// --maximum_edition 2024. Optionally use a local stable-edition copy because
// the parser intentionally only supports released editions.
if (fs.existsSync(fromUpstream(upstreamUnstableSchemaFile))) {
    fs.writeFileSync(
        unstableSchemaFile,
        fs.readFileSync(fromUpstream(upstreamUnstableSchemaFile), "utf8")
            .replace("edition = \"UNSTABLE\";", "edition = \"2024\";")
    );
    schemaFiles.push(unstableSchemaFile);
}

runPbjs({
    target: "static-module",
    wrap: "commonjs",
    dependency: "../../../minimal",
    out: outputFile
}, importRoots.map(fromUpstream), schemaFiles.map(fromSchemaFile));

runPbjs({
    target: "json",
    out: outputJsonFile
}, importRoots.map(fromUpstream), schemaFiles.map(fromSchemaFile));

function fromUpstream(relativePath) {
    return path.join(upstreamDir, relativePath);
}

function fromSchemaFile(schemaFile) {
    return path.isAbsolute(schemaFile) ? schemaFile : fromUpstream(schemaFile);
}

function runPbjs(options, importPaths, protoFiles) {
    var args = [
        path.join(rootDir, "cli/bin/pbjs"),
        "-t", options.target
    ];
    if (options.wrap)
        args.push("-w", options.wrap);
    if (options.dependency)
        args.push("--dependency", options.dependency);
    args.push("-o", options.out);

    importPaths.forEach(function(importPath) {
        args.push("-p", importPath);
    });
    Array.prototype.push.apply(args, protoFiles);

    var result = child_process.spawnSync(process.execPath, args, {
        cwd: rootDir,
        stdio: "inherit"
    });

    if (result.error)
        throw result.error;

    if (result.status)
        process.exit(result.status);
}
