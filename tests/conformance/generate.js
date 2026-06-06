"use strict";

var child_process = require("child_process"),
    fs = require("fs"),
    path = require("path");

var rootDir = path.resolve(__dirname, "../.."),
    upstreamDir = process.env.PROTOBUF_UPSTREAM || path.join(__dirname, "upstream"),
    protoc = process.env.PROTOC,
    outputDir = path.join(__dirname, "generated"),
    outputFile = path.join(outputDir, "messages.js"),
    outputJsonFile = path.join(outputDir, "messages.json"),
    staticPluginDir = path.join(outputDir, "static-plugin"),
    reflectPluginDir = path.join(outputDir, "reflect-plugin"),
    staticPluginFile = path.join(staticPluginDir, "messages.js"),
    reflectPluginFile = path.join(reflectPluginDir, "messages.js"),
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
removeFile(staticPluginFile);
removeFile(reflectPluginFile);

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

if (protoc) {
    runProtocPbjs({
        target: "static-module",
        wrap: "commonjs",
        dependency: "../../../../minimal",
        root: "conformanceStaticPlugin",
        out: staticPluginFile
    }, [ outputDir ].concat(importRoots.map(fromUpstream)), schemaFiles.map(fromSchemaFile));

    runProtocPbjs({
        target: "json-module",
        wrap: "commonjs",
        dependency: "../../../../light",
        root: "conformanceReflectPlugin",
        out: reflectPluginFile
    }, [ outputDir ].concat(importRoots.map(fromUpstream)), schemaFiles.map(fromSchemaFile));
} else {
    console.error("skipping protoc-gen-pbjs conformance artifacts; set PROTOC to enable them");
}

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

function runProtocPbjs(options, importPaths, protoFiles) {
    var outDir = path.dirname(options.out),
        pluginPath = protocGenPbjsPath(),
        args = [];

    fs.mkdirSync(outDir, { recursive: true });

    importPaths.forEach(function(importPath) {
        args.push("-I", importPath);
    });
    args.push("--plugin=protoc-gen-pbjs=" + pluginPath);
    args.push("--pbjs_out=" + outDir);
    args.push("--pbjs_opt=" + [
        "file=" + path.basename(options.out),
        "target=" + options.target,
        "wrap=" + options.wrap,
        "dependency=" + options.dependency,
        "root=" + options.root
    ].join(","));
    Array.prototype.push.apply(args, protoFiles);

    var result = child_process.spawnSync(protoc, args, {
        cwd: rootDir,
        stdio: "inherit"
    });

    if (result.error)
        throw result.error;

    if (result.status)
        process.exit(result.status);
}

function protocGenPbjsPath() {
    var plugin = path.join(rootDir, "cli/bin/protoc-gen-pbjs");
    if (process.platform !== "win32")
        return plugin;
    // protobufjs-cli is not a dependency but in-repo here, so we can't rely on npm
    // to create the .cmd wrapper for us, hence we create a simple one ourselves.
    var wrapper = path.join(outputDir, "protoc-gen-pbjs.cmd");
    fs.writeFileSync(wrapper,
        "@echo off\r\n" +
        "\"" + process.execPath + "\" \"" + plugin + "\" %*\r\n"
    );
    return wrapper;
}

function removeFile(file) {
    if (!fs.existsSync(file))
        return;
    fs.unlinkSync(file);
}
