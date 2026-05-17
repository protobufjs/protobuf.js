// Tests for pbts TypeScript declaration generation.

var tape = require("tape");
var path = require("path");
var fs = require("fs");
var EventEmitter = require("events").EventEmitter;
var child_process = require("child_process");

tape.test("pbts passes jsdoc arguments without a shell", function(test) {
    var pbts = require("../cli/pbts");
    var originalSpawn = child_process.spawn;
    var file = "file with \"quotes\" `backticks` 'apostrophes' and ;.js";

    test.plan(5);

    child_process.spawn = function(cmd, args, options) {
        var child = new EventEmitter();
        child.stdout = new EventEmitter();
        child.stderr = { pipe: function() {} };
        var nodePath = typeof Bun !== "undefined"
            ? process.env.npm_node_execpath || "node"
            : process.execPath;

        test.equal(cmd, nodePath, "should execute node directly");
        test.ok(/jsdoc[\\/]jsdoc\.js$/.test(args[0]), "should execute jsdoc directly");
        test.equal(args[args.length - 1], file, "should pass file path as a single argument");
        test.equal(options.stdio, "pipe", "should pipe jsdoc output");

        process.nextTick(function() {
            child.stdout.emit("data", "declare namespace test {}\n");
            child.stdout.emit("end");
            child.emit("close", 0);
        });

        return child;
    };

    pbts.main([file], function(err) {
        child_process.spawn = originalSpawn;
        test.error(err, "should generate definitions");
    });
});

tape.test("pbts supports explicit import mappings", function(test) {
    var pbts = require("../cli/pbts");

    pbts.process([
        "/**",
        " * Reflected foo.",
        " * @name Foo",
        " * @type {$protobuf.Type}",
        " * @const",
        " */"
    ].join("\n"), ["--import", "\\$protobuf=.."], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf("import * as $protobuf from \"..\";") >= 0, "overrides the protobuf import");
        test.end();
    });
});

tape.test("pbts supports explicit imports with main output", function(test) {
    var pbts = require("../cli/pbts");

    pbts.process([
        "/**",
        " * Reflected foo.",
        " * @name Foo",
        " * @type {$protobuf.Type}",
        " * @const",
        " */"
    ].join("\n"), ["--main", "--import", "\\$protobuf=.."], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf("// DO NOT EDIT!") >= 0, "emits generated header");
        test.ok(tsCode.indexOf("import * as $protobuf from \"..\";") >= 0, "emits explicit import");
        test.end();
    });
});

tape.test("pbts emits exported overloads", function(test) {
    var pbts = require("../cli/pbts");

    pbts.process([
        "/**",
        " * Makes a value.",
        " * @name make",
        " * @function",
        " * @type {{",
        " *   (name: string): number;",
        " *   (id: number): number;",
        " * }}",
        " */"
    ].join("\n"), [], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf("export function make(name: string): number;") >= 0, "exports first overload");
        test.ok(tsCode.indexOf("export function make(id: number): number;") >= 0, "exports subsequent overload");
        test.end();
    });
});

tape.test("pbts emits overloads with nested parameter types", function(test) {
    var pbts = require("../cli/pbts");

    pbts.process([
        "/**",
        " * Makes a value.",
        " * @name makeNested",
        " * @function",
        " * @type {{",
        " *   (callback: (value: string) => void): number;",
        " *   (name: string): number;",
        " * }}",
        " */"
    ].join("\n"), [], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf("export function makeNested(callback: (value: string) => void): number;") >= 0, "keeps nested function parameter type");
        test.ok(tsCode.indexOf("export function makeNested(name: string): number;") >= 0, "keeps second overload");
        test.end();
    });
});

tape.test("pbts preserves multiline TypeScript @type expressions", function(test) {
    var pbts = require("../cli/pbts");

    pbts.process([
        "/**",
        " * Reflected descriptor proto.",
        " * @name DescriptorProto",
        " * @type {$protobuf.Type & {",
        " *     ExtensionRange: $protobuf.Type,",
        " *     ReservedRange: $protobuf.Type",
        " * }}",
        " * @const",
        " */"
    ].join("\n"), ["--import", "\\$protobuf=.."], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf("export const DescriptorProto: $protobuf.Type & {\n    ExtensionRange: $protobuf.Type,\n    ReservedRange: $protobuf.Type\n};") >= 0, "preserves multiline object type");
        test.end();
    });
});

tape.test("pbts preserves qualified Object type names", function(test) {
    var pbts = require("../cli/pbts");

    pbts.process([
        "/**",
        " * Uses plain Object.",
        " * @name PlainObjectUser",
        " * @type {Object}",
        " * @const",
        " */",
        "",
        "/**",
        " * Uses a generated message named Object.",
        " * @name ObjectUser",
        " * @type {foo.Object}",
        " * @const",
        " */",
        ""
    ].join("\n"), [], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf("export const PlainObjectUser: object;") >= 0, "converts plain Object to object");
        test.ok(tsCode.indexOf("export const ObjectUser: foo.Object;") >= 0, "preserves qualified Object names");
        test.equal(tsCode.indexOf("foo.object"), -1, "does not lower-case qualified Object names");
        test.end();
    });
});

tape.test("pbts ignores unknown JSDoc tags", function(test) {
    var pbts = require("../cli/pbts");

    pbts.process([
        "/**",
        " * Reflected tagged value.",
        " * @customTag generated-by-tool",
        " * @name TaggedValue",
        " * @type {number}",
        " * @const",
        " */"
    ].join("\n"), [], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf("export const TaggedValue: number;") >= 0, "emits tagged declaration");
        test.equal(tsCode.indexOf("customTag"), -1, "does not emit unknown tag");
        test.end();
    });
});

tape.test("pbts preserves deprecated JSDoc tags", function(test) {
    var pbts = require("../cli/pbts");

    pbts.process([
        "/**",
        " * @deprecated",
        " */",
        "function emptyDeprecated() {}",
        "",
        "/**",
        " * @deprecated Use textDeprecated instead.",
        " */",
        "function textDeprecated() {}"
    ].join("\n"), [], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf(" * @deprecated\n") >= 0, "keeps bare deprecated tag");
        test.ok(tsCode.indexOf(" * @deprecated Use textDeprecated instead.") >= 0, "keeps deprecated tag text");
        test.end();
    });
});

tape.test("pbts preserves enum value comments", function(test) {
    var pbts = require("../cli/pbts");

    pbts.process([
        "/**",
        " * Example enum.",
        " * @enum {number}",
        " * @property {number} ONE=1 Custom comment.",
        " * @property {number} TWO=2 TWO value",
        " */",
        "var Example;"
    ].join("\n"), [], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf("/** Custom comment. */\n    ONE = 1,") >= 0, "keeps custom enum value comment");
        test.ok(tsCode.indexOf("/** TWO value */\n    TWO = 2") >= 0, "keeps fallback enum value comment");
        test.end();
    });
});

tape.test("pbts emits abstract class methods", function(test) {
    var pbts = require("../cli/pbts");

    pbts.process([
        "/**",
        " * @abstract",
        " * @class",
        " */",
        "function AbstractService() {}",
        "",
        "/**",
        " * @abstract",
        " * @function call",
        " * @memberof AbstractService",
        " * @instance",
        " * @returns {number}",
        " */",
        "AbstractService.prototype.call = function() {};"
    ].join("\n"), [], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf("abstract call(): number;") >= 0, "emits abstract instance method");
        test.end();
    });
});

tape.test("pbts emits qualified typedefs in namespaces", function(test) {
    var pbts = require("../cli/pbts");
    var file = path.join(".tmp", "pbts-qualified-typedef-" + process.pid + "-" + Date.now() + ".js");

    if (!fs.existsSync(".tmp"))
        fs.mkdirSync(".tmp");

    fs.writeFileSync(file, [
        "/** @constructor */",
        "function Foo() {}",
        "",
        "/**",
        " * Bar object.",
        " * @typedef {Object} Foo.Bar",
        " * @property {string} name",
        " */",
        "",
        "/**",
        " * Identifier.",
        " * @typedef {string|number} Foo.Id",
        " */"
    ].join("\n"));

    pbts.main([file], function(err, tsCode) {
        try {
            fs.unlinkSync(file);
        } catch (e) {
            // best effort cleanup
        }

        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf("export namespace Foo") >= 0, "emits qualified typedef namespace");
        test.ok(tsCode.indexOf("interface Bar") >= 0, "emits object typedef as interface");
        test.ok(tsCode.indexOf("name: string;") >= 0, "emits object typedef properties");
        test.ok(tsCode.indexOf("type Id = (string|number);") >= 0, "emits non-object typedef as type alias");
        test.end();
    });
});

tape.test("pbts emits class properties for extension fields", function(test) {
    var pbts = require("../cli/pbts");

    pbts.main(["tests/data/test.js"], function(err, tsCode) {
        test.error(err, "definition generation worked");
        test.ok(tsCode.indexOf('".jspb.test.IndirectExtension.str": string;') >= 0, "should emit scalar extension property on the class");
        test.ok(tsCode.indexOf('".jspb.test.CloneExtension.extField"?: (jspb.test.CloneExtension.$Properties|null);') >= 0, "should emit message extension property on the class");
        test.end();
    });
});
