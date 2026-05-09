"use strict";

var path = require("path");

var protobuf = require("protobufjs");
var descriptor = require("protobufjs/ext/descriptor");

var pbjs = require("./pbjs");
var util = require("./util");

var pluginJson = require("protobufjs/google/protobuf/compiler/plugin.json");
if (!descriptor.root.lookup(".google.protobuf.compiler"))
    descriptor.addJSON(pluginJson.nested.google.nested.protobuf.nested).resolveAll();
var pluginRoot = descriptor.root;

exports.CodeGeneratorRequest = pluginRoot.lookupType("google.protobuf.compiler.CodeGeneratorRequest");
exports.CodeGeneratorResponse = pluginRoot.lookupType("google.protobuf.compiler.CodeGeneratorResponse");

var FEATURE_PROTO3_OPTIONAL = 1;
var FEATURE_SUPPORTS_EDITIONS = 2;
var EDITION_2023 = 1000;
var EDITION_2024 = 1001;

var targets = new Set([ "static-module", "json-module" ]);
var wrappers = new Set([ "default", "commonjs", "amd", "esm", "es6", "closure" ]);
var stringOptions = new Set([ "file", "target", "wrap", "root", "dependency", "lint" ]);
var booleanOptions = new Set([
    "dts",
    "create",
    "encode",
    "decode",
    "verify",
    "convert",
    "delimited",
    "typeurl",
    "beautify",
    "comments",
    "service",
    "sparse",
    "keep-case",
    "force-long",
    "force-number",
    "force-enum-string",
    "force-message",
    "null-defaults",
    "null-semantics",
    "es6"
]);

var optionDefaults = {
    file: "index.js",
    target: "static-module",
    wrap: "esm"
};

/**
 * @typedef {Message<{}>} CodeGeneratorResponseMessage
 */

/**
 * Runs the protoc plugin on an encoded CodeGeneratorRequest.
 * @param {Uint8Array} input Encoded CodeGeneratorRequest
 * @param {function(?Error, CodeGeneratorResponseMessage=)} callback Completion callback
 * @returns {undefined}
 */
exports.run = function run(input, callback) {
    var request;
    try {
        request = exports.CodeGeneratorRequest.decode(input);
    } catch (err) {
        return callback(err);
    }

    var options;
    try {
        options = parseParameters(request.parameter || "");
        validateOptions(options);
    } catch (err) {
        return callback(null, response([], err.message));
    }

    var root;
    try {
        root = rootFromRequest(request, options["keep-case"]);
        if (options.sparse)
            pbjs.sparsify(root, request.fileToGenerate || []);
    } catch (err) {
        return callback(null, response([], err.message));
    }

    pbjs.generate(root, options, function(err, jsOutput, dtsOutput) {
        if (err)
            return callback(null, response([], err.message));

        var files = [
            {
                name: options.file,
                content: jsOutput
            }
        ];
        if (dtsOutput) {
            files.push({
                name: pbjs.deriveDtsPath(options.file),
                content: dtsOutput
            });
        }
        return callback(null, response(files));
    });
    return undefined;
};

function parseParameters(parameter) {
    var options = protobuf.util.merge({}, optionDefaults);
    if (!parameter)
        return options;

    parameter.split(",").forEach(function(part) {
        var name,
            value,
            eq;
        if (!part)
            return;
        eq = part.indexOf("=");
        if (eq >= 0) {
            name = part.substring(0, eq);
            value = part.substring(eq + 1);
        } else {
            name = part;
            value = "true";
        }
        if (name.substring(0, 3) === "no-" && !stringOptions.has(name)) {
            name = name.substring(3);
            value = "false";
        }
        if (stringOptions.has(name)) {
            options[name] = value;
        } else if (booleanOptions.has(name)) {
            options[name] = parseBoolean(name, value);
        } else {
            throw Error("unknown option: " + name);
        }
    });
    return options;
}

function parseBoolean(name, value) {
    if (value === "true" || value === "1")
        return true;
    if (value === "false" || value === "0")
        return false;
    throw Error("invalid boolean value for " + name + ": " + value);
}

function validateOptions(options) {
    var normalizedFile;
    if (path.isAbsolute(options.file) || path.posix.isAbsolute(options.file) || path.win32.isAbsolute(options.file))
        throw Error("file must be relative: " + options.file);
    normalizedFile = options.file.replace(/\\/g, "/");
    if (normalizedFile.split("/").indexOf("..") >= 0)
        throw Error("file must not contain '..': " + options.file);
    normalizedFile = path.posix.normalize(normalizedFile);
    if (!/\.[cm]?js$/i.test(normalizedFile))
        throw Error("file must end in .js, .mjs or .cjs: " + options.file);
    options.file = normalizedFile;

    if (!targets.has(options.target))
        throw Error("unsupported target: " + options.target);
    if (!wrappers.has(options.wrap))
        throw Error("unsupported wrapper: " + options.wrap);
    if (options.dts && options.wrap !== "commonjs" && !util.isEsmWrapper(options.wrap))
        throw Error("dts requires wrap=commonjs or wrap=esm");
}

function rootFromRequest(request, keepCase) {
    var files = (request.protoFile || []).map(function(file) {
        return cloneDescriptor(file, keepCase);
    });
    return protobuf.Root.fromDescriptor(descriptor.FileDescriptorSet.create({
        file: files
    }));
}

function cloneDescriptor(file, keepCase) {
    var object = descriptor.FileDescriptorProto.toObject(file, {
        defaults: false,
        arrays: true,
        objects: true
    });
    if (!keepCase) {
        (object.messageType || []).forEach(camelCaseMembers);
        (object.extension || []).forEach(camelCaseField);
    }
    return object;
}

function camelCaseMembers(message) {
    (message.field || []).forEach(camelCaseField);
    (message.extension || []).forEach(camelCaseField);
    (message.nestedType || []).forEach(camelCaseMembers);
    (message.oneofDecl || []).forEach(function(oneof) {
        if (oneof.name)
            oneof.name = protobuf.util.camelCase(oneof.name);
    });
}

function camelCaseField(field) {
    if (field.name)
        field.name = protobuf.util.camelCase(field.name);
}

function response(files, error) {
    return exports.CodeGeneratorResponse.create({
        error: error || undefined,
        supportedFeatures: FEATURE_PROTO3_OPTIONAL | FEATURE_SUPPORTS_EDITIONS,
        minimumEdition: EDITION_2023,
        maximumEdition: EDITION_2024,
        file: files
    });
}

/**
 * Runs the protoc plugin.
 * @returns {undefined}
 */
exports.main = function main() {
    var chunks = [];
    process.stdin.on("data", function(chunk) {
        chunks.push(chunk);
    });
    process.stdin.on("end", function() {
        exports.run(Buffer.concat(chunks), function(err, res) {
            if (err) {
                process.stderr.write(err.message + "\n");
                process.exitCode = 1;
                return;
            }
            process.stdout.write(Buffer.from(exports.CodeGeneratorResponse.encode(res).finish()));
        });
    });
};
