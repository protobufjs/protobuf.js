// Tests for pbjs null default and null semantics output.

var tape = require("tape");
var path = require("path");
var fs = require("fs");
var protobuf = require("..");
var cliTest = require("./helpers/cli");

tape.test("without null-defaults, absent optional fields have zero values", async function(test) {
    await cliTest(test, async function() {
        var root = await protobuf.load("tests/data/cli/null-defaults.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
        }, function(err, jsCode) {
            test.error(err, 'static code generation worked');

            // jsCode is the generated code; we'll eval it
            // (since this is what we normally does with the code, right?)
            // This is a test code. Do not use this in production.
            var $protobuf = protobuf;
            eval(jsCode);

            var OptionalFields = protobuf.roots.default.OptionalFields;
            test.ok(OptionalFields, "type is loaded");

            // Check default values
            var msg = OptionalFields.fromObject({});
            test.equal(msg.a, null, "default submessage is null");
            test.equal(msg.b, "", "default string is empty");
            test.equal(msg.c, 0, "default integer is 0");

            test.end();
        });
    });
});

tape.test("with null-defaults, absent optional fields have null values", async function(test) {
    await cliTest(test, async function() {
        var root = await protobuf.load("tests/data/cli/null-defaults.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            "null-defaults": true,
        }, function(err, jsCode) {
            test.error(err, 'static code generation worked');

            // jsCode is the generated code; we'll eval it
            // (since this is what we normally does with the code, right?)
            // This is a test code. Do not use this in production.
            var $protobuf = protobuf;
            eval(jsCode);

            var OptionalFields = protobuf.roots.default.OptionalFields;
            test.ok(OptionalFields, "type is loaded");

            // Check default values
            var msg = OptionalFields.fromObject({});
            test.equal(msg.a, null, "default submessage is null");
            test.equal(msg.b, null, "default string is null");
            test.equal(msg.c, null, "default integer is null");

            test.end();
        });
    });
});

tape.test("with --null-semantics, optional fields are handled correctly in proto2", async function(test) {
    await cliTest(test, async function() {
        var root = await protobuf.load("tests/data/cli/null-defaults.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            comments: true,
            "null-semantics": true,
        }, function(err, jsCode) {

            test.error(err, 'static code generation worked');

            test.ok(jsCode.includes("@property {OptionalFields.SubMessage.$Properties|null} [a] OptionalFields a"), "Property for a should use a properties interface")
            test.ok(jsCode.includes("@member {OptionalFields.SubMessage|null} a"), "Member for a should use a message type")
            test.ok(jsCode.includes("OptionalFields.prototype.a = null;"), "Initializer for a should be null")

            test.ok(jsCode.includes("@property {number|null} [c] OptionalFields c"), "Property for c should be nullable")
            test.ok(jsCode.includes("@member {number|null} c"), "Member for c should be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.c = null;"), "Initializer for c should be null")

            test.ok(jsCode.includes("@property {number} d OptionalFields d"), "Property for d should not be nullable")
            test.ok(jsCode.includes("@member {number} d"), "Member for d should not be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.d = 0;"), "Initializer for d should be zero")

            test.end();
        });
    });
});

tape.test("with --null-semantics, optional fields are handled correctly in proto3", async function(test) {
    await cliTest(test, async function() {
        var root = await protobuf.load("tests/data/cli/null-defaults-proto3.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            comments: true,
            "null-semantics": true,
        }, function(err, jsCode) {

            test.error(err, 'static code generation worked');

            test.ok(jsCode.includes("@property {OptionalFields.SubMessage.$Properties|null} [a] OptionalFields a"), "Property for a should use a properties interface")
            test.ok(jsCode.includes("@member {OptionalFields.SubMessage|null} a"), "Member for a should use a message type")
            test.ok(jsCode.includes("OptionalFields.prototype.a = null;"), "Initializer for a should be null")

            test.ok(jsCode.includes("@property {number|null} [c] OptionalFields c"), "Property for c should be nullable")
            test.ok(jsCode.includes("@member {number|null} c"), "Member for c should be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.c = null;"), "Initializer for c should be null")

            test.ok(jsCode.includes("@property {number} [d] OptionalFields d"), "Property for d should be optional but not nullable")
            test.ok(jsCode.includes("@member {number} d"), "Member for d should not be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.d = 0;"), "Initializer for d should be zero")

            test.end();
        });
    });
});

tape.test("with --null-semantics, optional fields are handled correctly in editions", async function(test) {
    await cliTest(test, async function() {
        var root = await protobuf.load("tests/data/cli/null-defaults-edition2023.proto");
        root.resolveAll();

        var staticTarget = require("../cli/targets/static");

        staticTarget(root, {
            create: true,
            decode: true,
            encode: true,
            convert: true,
            comments: true,
            "null-semantics": true,
        }, function(err, jsCode) {

            test.error(err, 'static code generation worked');

            test.ok(jsCode.includes("@property {OptionalFields.SubMessage.$Properties|null} [a] OptionalFields a"), "Property for a should use a properties interface")
            test.ok(jsCode.includes("@member {OptionalFields.SubMessage|null} a"), "Member for a should use a message type")
            test.ok(jsCode.includes("OptionalFields.prototype.a = null;"), "Initializer for a should be null")

            test.ok(jsCode.includes("@property {string|null} [e] OptionalFields e"), "Property for e should be nullable")
            test.ok(jsCode.includes("@member {string|null} e"), "Member for e should be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.e = null;"), "Initializer for e should be null")

            test.ok(jsCode.includes("@property {number} r OptionalFields r"), "Property for r should not be nullable")
            test.ok(jsCode.includes("@member {number} r"), "Member for r should not be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.r = 0;"), "Initializer for r should be zero")

            test.ok(jsCode.includes("@property {number} [i] OptionalFields i"), "Property for i should be optional but not nullable")
            test.ok(jsCode.includes("@member {number} i"), "Member for i should not be nullable")
            test.ok(jsCode.includes("OptionalFields.prototype.i = 0;"), "Initializer for i should be zero")

            test.end();
        });
    });
});

tape.test("with --null-semantics, pbts preserves proto3 optional nullability", function(test) {
    cliTest(test, function() {
        var pbjs = require("../cli/pbjs");
        var pbts = require("../cli/pbts");
        var prefix = path.join(".tmp", "pbjs-null-semantics-dts-" + process.pid + "-" + Date.now());
        var protoOut = prefix + ".proto";
        var jsOut = prefix + ".js";
        var dtsOut = prefix + ".d.ts";

        if (!fs.existsSync(".tmp"))
            fs.mkdirSync(".tmp");

        function cleanup() {
            [ protoOut, jsOut, dtsOut ].forEach(function(file) {
                try {
                    fs.unlinkSync(file);
                } catch (e) {
                    // best effort cleanup
                }
            });
        }

        cleanup();
        fs.writeFileSync(protoOut, [
            "syntax = \"proto3\";",
            "",
            "package Protos;",
            "",
            "message Address {",
            "  string type = 1;",
            "  string address_1 = 2;",
            "  optional string address_2 = 3;",
            "}"
        ].join("\n"));

        pbjs.main([
            "--force-message",
            "--null-semantics",
            "--target", "static-module",
            "--force-number",
            "--dependency", "protobufjs/minimal.js",
            "--es6",
            "--out", jsOut,
            protoOut
        ], function(pbjsErr) {
            test.error(pbjsErr, "static-module generation worked");

            pbts.main([ "--out", dtsOut, jsOut ], function(pbtsErr) {
                test.error(pbtsErr, "definition generation worked");

                var tsCode = fs.readFileSync(dtsOut, "utf8");
                test.ok(tsCode.indexOf("type?: string;") >= 0, "keeps non-optional string property non-nullable");
                test.ok(tsCode.indexOf("address_1?: string;") >= 0, "keeps second non-optional string property non-nullable");
                test.ok(tsCode.indexOf("address_2?: (string|null);") >= 0, "keeps proto3 optional string property nullable");
                test.ok(tsCode.indexOf("type: string;") >= 0, "keeps non-optional string member non-nullable");
                test.ok(tsCode.indexOf("address_1: string;") >= 0, "keeps second non-optional string member non-nullable");
                test.ok(tsCode.indexOf("address_2: (string|null);") >= 0, "keeps proto3 optional string member nullable");
                test.equal(tsCode.indexOf("type?: (string|null|undefined);"), -1, "does not make non-optional property nullable");
                test.equal(tsCode.indexOf("address_1?: (string|null|undefined);"), -1, "does not make second non-optional property nullable");
                test.equal(tsCode.indexOf("type?: (string|undefined);"), -1, "does not add explicit undefined to optional properties");
                test.equal(tsCode.indexOf("address_2?: (string|null|undefined);"), -1, "does not add explicit undefined to nullable optional properties");
                test.equal(tsCode.indexOf("type: (string|null);"), -1, "does not make non-optional member nullable");
                test.equal(tsCode.indexOf("address_1: (string|null);"), -1, "does not make second non-optional member nullable");

                cleanup();
                test.end();
            });
        });
    });
});
