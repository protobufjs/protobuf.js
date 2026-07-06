"use strict";
/* eslint-disable no-process-env */

var childProcess = require("child_process"),
    fs           = require("fs"),
    path         = require("path"),
    pbjs         = require("../cli/pbjs");

var rootDir = path.resolve(__dirname, ".."),
    benchDir = __dirname,
    binDir = path.join(benchDir, "node_modules", ".bin"),
    protocBin;

var schemas = [
    require("./cases/common"),
    require("./cases/vector-tile"),
    require("./cases/buf-perf")
].map(function(createCase) {
    return createCase.schema;
});

Promise.all(schemas.map(generateProtobufJs)).then(function() {
    if (!protocPath())
        throw Error("protoc-gen-* plugins require protoc. Install protoc and make sure it is on PATH, or set PROTOC.");
    schemas.forEach(function(schema) {
        generateProtocGenJs(schema);
        generateProtocGenEs(schema);
    });
}).catch(function(err) {
    process.stderr.write((err && err.stack || err) + "\n");
    process.exitCode = 1;
});

// protobuf.js
function generateProtobufJs(schema) {
    var out = path.join(schema.outDir, schema.name + "_protobufjs.js");
    mkdir(schema.outDir);
    return new Promise(function(resolve, reject) {
        pbjs.main([
            "--target", "static-module",
            "--wrap", "commonjs",
            "--root", schema.root,
            schema.proto,
            "--no-create",
            "--no-verify",
            "--no-delimited",
            "--no-convert",
            "--no-typeurl",
            "--no-comments"
        ], function(err, output) {
            if (err) {
                reject(err);
                return;
            }
            var pathToProtobufjs = path.relative(path.dirname(out), path.join(rootDir, "minimal")).replace(/\\/g, "/");
            write(out, output.replace(/"protobufjs\/minimal"/g, JSON.stringify(pathToProtobufjs)));
            resolve();
        });
    });
}

// protoc-gen-js
function generateProtocGenJs(schema) {
    var generated = path.join(path.dirname(schema.proto), path.basename(schema.proto, ".proto") + "_pb.js"),
        out = path.join(schema.outDir, schema.name + "_protoc_gen_js.js"),
        protoArg = relative(schema.proto);

    mkdir(schema.outDir);
    run(protocPath(), [
        "--proto_path=" + rootDir,
        "--js_out=import_style=commonjs,binary:" + rootDir,
        protoArg
    ]);
    fs.renameSync(generated, out);
    process.stdout.write("protoc-gen-js: " + protoArg + " -> " + relative(out) + "\n");
}

// protoc-gen-es
function generateProtocGenEs(schema) {
    var generated = path.join(path.dirname(schema.proto), path.basename(schema.proto, ".proto") + "_pb.js"),
        out = path.join(schema.outDir, schema.name + "_protoc_gen_es.js"),
        protoArg = relative(schema.proto);

    mkdir(schema.outDir);
    run(protocPath(), [
        "--proto_path=" + rootDir,
        "--es_out=target=js,js_import_style=legacy_commonjs:" + rootDir,
        protoArg
    ]);
    fs.renameSync(generated, out);
    process.stdout.write("protoc-gen-es: " + protoArg + " -> " + relative(out) + "\n");
}

function write(file, output) {
    mkdir(path.dirname(file));
    fs.writeFileSync(file, output);
    process.stdout.write(relative(file) + "\n");
}

function mkdir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function run(cmd, args) {
    childProcess.execFileSync(cmd, args, {
        cwd: benchDir,
        env: Object.assign({}, process.env, {
            PATH: binDir + path.delimiter + process.env.PATH
        }),
        stdio: "inherit"
    });
}

function protocPath() {
    if (protocBin)
        return protocBin;
    if (process.env.PROTOC)
        return protocBin = process.env.PROTOC;
    try {
        protocBin = childProcess.execFileSync(process.platform === "win32" ? "where.exe" : "which", ["protoc"], {
            encoding: "utf8",
            env: Object.assign({}, process.env, {
                PATH: externalPath()
            }),
            stdio: ["ignore", "pipe", "ignore"]
        }).split(/\r?\n/)[0];
    } catch (err) {
        protocBin = "";
    }
    return protocBin;
}

function externalPath() {
    return (process.env.PATH || "").split(path.delimiter).filter(function(entry) {
        return !/[\\/]node_modules[\\/]\.bin$/i.test(entry);
    }).join(path.delimiter);
}

function relative(file) {
    return path.relative(rootDir, file).replace(/\\/g, "/");
}
