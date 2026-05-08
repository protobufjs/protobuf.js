"use strict";
var path     = require("path"),
    fs       = require("fs"),
    minimist = require("minimist"),
    chalk    = require("chalk"),
    pkg      = require("./package.json"),
    util     = require("./util"),
    glob     = require("glob"),
    protobuf = require("protobufjs");

var targets  = util.requireAll("./targets");

var lintDefault = "eslint-disable " + [
    "block-scoped-var",
    "id-length",
    "no-control-regex",
    "no-magic-numbers",
    "no-prototype-builtins",
    "no-redeclare",
    "no-shadow",
    "no-var",
    "sort-vars",
    "default-case",
    "jsdoc/require-param"
].join(", ");

var defaults = {
    "target": "json",
    "create": true,
    "encode": true,
    "decode": true,
    "verify": true,
    "convert": true,
    "delimited": true,
    "typeurl": true,
    "beautify": true,
    "comments": true,
    "service": true,
    "dts": false,
    "es6": null,
    "lint": lintDefault,
    "keep-case": false,
    "alt-comment": false,
    "force-long": false,
    "force-number": false,
    "force-enum-string": false,
    "force-message": false,
    "null-defaults": false,
    "null-semantics": false
};

var opts = {
    alias: {
        target: "t",
        out: "o",
        path: "p",
        wrap: "w",
        root: "r",
        dts: "d",
        lint: "l",
        // backward compatibility:
        "force-long": "strict-long",
        "force-message": "strict-message"
    },
    string: [ "target", "out", "path", "wrap", "dependency", "root", "lint", "filter" ],
    boolean: [ "create", "encode", "decode", "verify", "convert", "delimited", "typeurl", "beautify", "comments", "service", "es6", "dts", "sparse", "keep-case", "alt-comment", "force-long", "force-number", "force-enum-string", "force-message", "null-defaults", "null-semantics"],
    default: defaults
};

function normalizeOptions(options) {
    options = protobuf.util.merge({}, options || {});
    protobuf.util.merge(options, defaults, true);

    Object.keys(options).forEach(function(key) {
        var camelKey = key.replace(/-([a-z])/g, function($0, $1) {
            return $1.toUpperCase();
        });
        if (camelKey !== key)
            options[camelKey] = options[key];
    });

    if (util.isEsmWrapper(options.wrap))
        options.es6 = true;

    return options;
}

/**
 * Generates JavaScript and optional TypeScript declarations from a root.
 * @param {Root} root Reflected root
 * @param {Object} options pbjs options
 * @param {function(?Error, string=, string=)} callback Completion callback
 * @returns {undefined}
 * @private
 */
exports.generate = function generate(root, options, callback) {
    options = normalizeOptions(options);
    var target = targets[options.target];
    if (!target) {
        // Require custom target
        try {
            target = require(path.resolve(process.cwd(), options.target));
        } catch (err) {
            return callback(err);
        }
    }

    target(root, options, function targetCallback(err, output) {
        if (err)
            return callback(err);
        if (options.dts)
            return generateDts(root, options, output, function(dtsErr, dtsOutput) {
                if (dtsErr)
                    return callback(dtsErr);
                return callback(null, output, dtsOutput);
            });
        return callback(null, output);
    });
    return undefined;
};

exports.deriveDtsPath = deriveDtsPath;
exports.sparsify = sparsify;

function deriveDtsPath(out) {
    return out.replace(/\.(?:[cm]?js)$/i, "") + ".d.ts";
}

function generateDts(root, argv, output, done) {
    function runPbts(jsOutput) {
        var pbtsArgs = [];
        if (argv.target === "json-module")
            pbtsArgs.push("--no-constructor");
        if (!argv.comments)
            pbtsArgs.push("--no-comments");

        require("./pbts").process(jsOutput, pbtsArgs, done);
    }

    if (argv.target === "static-module")
        return runPbts(output);

    var dtsOptions = protobuf.util.merge({}, argv);
    // The temporary static module can expose the reflected root as a default export
    // only for ES module declarations. CommonJS has no equivalent default export here.
    if (util.isEsmWrapper(argv.wrap))
        dtsOptions.defaultExport = targets["json-module"].defaultExportDoc;
    return targets["static-module"](root, dtsOptions, function(err, staticOutput) {
        if (err)
            return done(err);
        return runPbts(staticOutput);
    });
}

function markReferenced(tobj) {
    tobj.referenced = true;
    // also mark a type's fields and oneofs
    if (tobj.fieldsArray)
        tobj.fieldsArray.forEach(function(fobj) {
            fobj.referenced = true;
        });
    if (tobj.oneofsArray)
        tobj.oneofsArray.forEach(function(oobj) {
            oobj.referenced = true;
        });
    // also mark an extension field's extended type, but not its (other) fields
    if (tobj.extensionField)
        tobj.extensionField.parent.referenced = true;
}

function sparsify(root, mainFiles) {

    // 1. mark directly or indirectly referenced objects
    util.traverse(root, function(obj) {
        if (!obj.filename)
            return;
        if (mainFiles.indexOf(obj.filename) > -1)
            util.traverseResolved(obj, markReferenced);
    });

    // 2. empty unreferenced objects
    util.traverse(root, function(obj) {
        var parent = obj.parent;
        if (!parent || obj.referenced) // root or referenced
            return;
        // remove unreferenced namespaces
        if (obj instanceof protobuf.Namespace) {
            var hasReferenced = false;
            util.traverse(obj, function(iobj) {
                if (iobj.referenced)
                    hasReferenced = true;
            });
            if (hasReferenced) { // replace with plain namespace if a namespace subclass
                if (obj instanceof protobuf.Type || obj instanceof protobuf.Service) {
                    var robj = new protobuf.Namespace(obj.name, obj.options);
                    robj.nested = obj.nested;
                    parent.add(robj);
                }
            } else // remove completely if nothing inside is referenced
                parent.remove(obj);

        // remove everything else unreferenced
        } else if (!(obj instanceof protobuf.Namespace))
            parent.remove(obj);
    });

    // 3. validate that everything is fine
    root.resolveAll();
}

/**
 * Runs pbjs programmatically.
 * @param {string[]} args Command line arguments
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
exports.main = function main(args, callback) {
    var argv = normalizeOptions(minimist(args, opts));

    var files  = argv._,
        paths  = typeof argv.path === "string" ? [ argv.path ] : argv.path || [];

    // protobuf.js package directory contains additional, otherwise non-bundled google types
    paths.push(path.relative(process.cwd(), path.join(__dirname, "../protobufjs")) || ".");

    if (!files.length) {
        var descs = Object.keys(targets).filter(function(key) { return !targets[key].private; }).map(function(key) {
            return "                   " + util.pad(key, 14, true) + targets[key].description;
        });
        if (callback)
            callback(Error("usage")); // eslint-disable-line callback-return
        else
            process.stderr.write([
                "protobuf.js v" + pkg.version + " CLI for JavaScript",
                "",
                chalk.bold.white("Translates between file formats and generates static code."),
                "",
                "  -t, --target     Specifies the target format. Also accepts a path to require a custom target.",
                "",
                descs.join("\n"),
                "",
                "  -p, --path       Adds a directory to the include path.",
                "",
                "  --filter         Path to a JSON file listing messages and their dependencies to keep.",
                "                   Example: {\"messageNames\":[\"mypackage.Message\",\"Message2\"]}",
                "",
                "  -o, --out        Saves to a file instead of writing to stdout.",
                "",
                "  -d, --dts        Also saves a .d.ts file next to --out for static-module and json-module.",
                "",
                "  --sparse         Exports only those types referenced from a main file (experimental).",
                "",
                chalk.bold.gray("  Module targets only:"),
                "",
                "  -w, --wrap       Specifies the wrapper to use. Also accepts a path to require a custom wrapper.",
                "",
                "                   default   Default wrapper supporting both CommonJS and AMD",
                "                   commonjs  CommonJS wrapper",
                "                   amd       AMD wrapper",
                "                   esm       ESM wrapper (implies --es6)",
                "                   closure   A closure adding to protobuf.roots where protobuf is a global",
                "",
                "  --dependency     Specifies which version of protobuf to require. Accepts any valid module id",
                "",
                "  -r, --root       Specifies an alternative protobuf.roots name.",
                "",
                "  -l, --lint       Linter configuration. Defaults to protobuf.js-compatible rules:",
                "",
                "                   " + lintDefault,
                "",
                "  --es6            Enables ES6 syntax (const/let instead of var)",
                "",
                chalk.bold.gray("  Proto sources only:"),
                "",
                "  --keep-case      Keeps field casing instead of converting to camel case.",
                "  --alt-comment    Turns on an alternate comment parsing mode that preserves more comments.",
                "",
                chalk.bold.gray("  Static targets only:"),
                "",
                "  --no-create      Does not generate create functions used for reflection compatibility.",
                "  --no-encode      Does not generate encode functions.",
                "  --no-decode      Does not generate decode functions.",
                "  --no-verify      Does not generate verify functions.",
                "  --no-convert     Does not generate convert functions like from/toObject",
                "  --no-delimited   Does not generate delimited encode/decode functions.",
                "  --no-typeurl     Does not generate getTypeUrl function.",
                "  --no-beautify    Does not beautify generated code.",
                "  --no-comments    Does not output any JSDoc comments.",
                "  --no-service     Does not output service classes.",
                "",
                "  --force-long     Enforces the use of 'Long' for s-/u-/int64 and s-/fixed64 fields.",
                "  --force-number   Enforces the use of 'number' for s-/u-/int64 and s-/fixed64 fields.",
                "  --force-message  Enforces the use of message instances instead of plain objects.",
                "",
                "  --null-defaults  Default value for optional fields is null instead of zero value.",
                "  --null-semantics Make nullable fields match protobuf semantics (overrides --null-defaults).",
                "",
                "usage: " + chalk.bold.green("pbjs") + " [options] file1.proto file2.json ..." + chalk.gray("  (or pipe)  ") + "other | " + chalk.bold.green("pbjs") + " [options] -",
                ""
            ].join("\n"));
        return 1;
    }

    if (typeof argv["strict-long"] === "boolean")
        argv["force-long"] = argv["strict-long"];

    // Resolve glob expressions
    for (var i = 0; i < files.length;) {
        if (glob.hasMagic(files[i])) {
            var matches = glob.sync(files[i]);
            Array.prototype.splice.apply(files, [i, 1].concat(matches));
            i += matches.length;
        } else
            ++i;
    }

    var root = new protobuf.Root();

    var mainFiles = [];

    // Search include paths when resolving imports
    root.resolvePath = function pbjsResolvePath(origin, target) {
        var normOrigin = protobuf.util.path.normalize(origin),
            normTarget = protobuf.util.path.normalize(target);
        if (!normOrigin)
            mainFiles.push(normTarget);

        var resolved = protobuf.util.path.resolve(normOrigin, normTarget, true);
        var idx = resolved.lastIndexOf("google/protobuf/");
        if (idx > -1) {
            var altname = resolved.substring(idx);
            if (altname in protobuf.common)
                resolved = altname;
        }

        if (fs.existsSync(resolved))
            return resolved;

        for (var i = 0; i < paths.length; ++i) {
            var iresolved = protobuf.util.path.resolve(paths[i] + "/", target);
            if (fs.existsSync(iresolved))
                return iresolved;
        }

        return resolved;
    };

    if (argv.dts) {
        var dtsError = null;
        if (!argv.out)
            dtsError = Error("--dts requires --out");
        else if (argv.target !== "static-module" && argv.target !== "json-module")
            dtsError = Error("--dts requires --target static-module or json-module");
        else if (argv.wrap !== "commonjs" && !util.isEsmWrapper(argv.wrap))
            dtsError = Error("--dts requires --wrap commonjs or esm");
        if (dtsError) {
            if (callback) {
                callback(dtsError);
                return undefined;
            }
            throw dtsError;
        }
    }

    var parseOptions = {
        "keepCase": argv["keep-case"] || false,
        "alternateCommentMode": argv["alt-comment"] || false,
    };

    // Read from stdin
    if (files.length === 1 && files[0] === "-") {
        var data = [];
        process.stdin.on("data", function(chunk) {
            data.push(chunk);
        });
        process.stdin.on("end", function() {
            var source = Buffer.concat(data).toString("utf8");
            try {
                if (source.charAt(0) !== "{") {
                    protobuf.parse.filename = "-";
                    protobuf.parse(source, root, parseOptions);
                } else {
                    var json = JSON.parse(source);
                    root.setOptions(json.options).addJSON(json);
                }
                callTarget();
            } catch (err) {
                if (callback) {
                    callback(err);
                    return;
                }
                throw err;
            }
        });

    // Load from disk
    } else {
        try {
            root.loadSync(files, parseOptions).resolveAll(); // sync is deterministic while async is not
            if (argv.sparse)
                sparsify(root, mainFiles);
            callTarget();
        } catch (err) {
            if (callback) {
                callback(err);
                return undefined;
            }
            throw err;
        }
    }

    function filterMessage() {
        if (argv.filter) {
            // This is a piece of degradable logic
            try {
                const needMessage = JSON.parse(fs.readFileSync(argv.filter));
                util.filterMessage(root, needMessage);
            } catch (error) {
                process.stderr.write(`The filter not work, please check whether the file is correct: ${error.message}\n`);
            }
        }
    }

    function callTarget() {
        filterMessage();
        exports.generate(root, argv, function targetCallback(err, output, dtsOutput) {
            if (err) {
                if (callback)
                    return callback(err);
                throw err;
            }
            return writeOutputs(output, dtsOutput);
        });
    }

    function writeOutputs(output, dtsOutput) {
        try {
            if (argv.out) {
                fs.writeFileSync(argv.out, output, { encoding: "utf8" });
                if (dtsOutput)
                    fs.writeFileSync(deriveDtsPath(argv.out), dtsOutput, { encoding: "utf8" });
            } else if (!callback)
                process.stdout.write(output, "utf8");
            return callback
                ? callback(null, output)
                : undefined;
        } catch (err) {
            if (callback)
                return callback(err);
            throw err;
        }
    }

    return undefined;
};
