"use strict";
/* eslint-disable no-process-env */

var childProcess = require("child_process"),
    fs           = require("fs"),
    path         = require("path"),
    pbjs         = require("../cli/pbjs");

var rootDir = path.resolve(__dirname, ".."),
    benchDir = __dirname,
    dataDir = path.join(benchDir, "data"),
    protoFile = path.join(dataDir, "bench.proto"),
    protoArg = path.relative(rootDir, protoFile).replace(/\\/g, "/"),
    binDir = path.join(benchDir, "node_modules", ".bin"),
    protocBin;

generateProtobufJs().then(function() {
    if (!protocPath())
        throw Error("protoc-gen-* plugins require protoc. Install protoc and make sure it is on PATH, or set PROTOC.");
    generateProtocGenJs();
    generateProtocGenEs();
}).catch(function(err) {
    process.stderr.write((err && err.stack || err) + "\n");
    process.exitCode = 1;
});

// protobuf.js
function generateProtobufJs() {
    var out = path.join(dataDir, "bench_protobufjs.js");
    return new Promise(function(resolve, reject) {
        pbjs.main([
            "--target", "static-module",
            "--wrap", "commonjs",
            "--root", "test_bench",
            protoFile,
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
function generateProtocGenJs() {
    var generated = path.join(dataDir, "bench_pb.js"),
        out = path.join(dataDir, "bench_protoc_gen_js.js");

    run(protocPath(), [
        "--proto_path=" + rootDir,
        "--js_out=import_style=commonjs,binary:" + rootDir,
        protoArg
    ]);
    fs.renameSync(generated, out);
    process.stdout.write("protoc-gen-js: " + protoArg + " -> " + relative(out) + "\n");
}

// protoc-gen-es
function generateProtocGenEs() {
    var generated = path.join(dataDir, "bench_pb.js"),
        out = path.join(dataDir, "bench_protoc_gen_es.js");

    run(protocPath(), [
        "--proto_path=" + rootDir,
        "--es_out=target=js,js_import_style=legacy_commonjs:" + rootDir,
        protoArg
    ]);
    fs.renameSync(generated, out);
    process.stdout.write("protoc-gen-es: " + protoArg + " -> " + relative(out) + "\n");
}

function write(file, output) {
    fs.writeFileSync(file, output);
    process.stdout.write(relative(file) + "\n");
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
