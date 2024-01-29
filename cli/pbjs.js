"use strict";
var path     = require("path"),
    fs       = require("fs"),
    minimist = require("minimist"),
    chalk    = require("chalk"),
    pkg      = require("./package.json"),
    util     = require("./util"),
    glob     = require("glob"),
    protobuf = require("protobufjs"),
    inputArgs = require("./inputArgs");


var targets  = util.requireAll("./targets");

/**
 * Runs pbjs programmatically.
 * @param {string[]} args Command line arguments
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
exports.main = function main(args, callback) {
    var lintDefault = "eslint-disable " + [
        "block-scoped-var",
        "id-length",
        "no-control-regex",
        "no-magic-numbers",
        "no-prototype-builtins",
        "no-redeclare",
        "no-shadow",
        "no-var",
        "sort-vars"
    ].join(", ");
    var argv = minimist(args, {
        alias: {
            [inputArgs.TARGET]: "t",
            [inputArgs.OUT]: "o",
            [inputArgs.PATH]: "p",
            [inputArgs.WRAP]: "w",
            [inputArgs.ROOT]: "r",
            [inputArgs.LINT]: "l",
            [inputArgs.UNIFY_NAMES]: "u",
            // backward compatibility:
            [inputArgs.FORCE_LONG]: "strict-long",
            [inputArgs.FORCE_MESSAGE]: "strict-message"
        },
        string: [ inputArgs.TARGET, inputArgs.OUT, inputArgs.PATH, inputArgs.WRAP, inputArgs.DEPENDENCY, inputArgs.ROOT, inputArgs.LINT, inputArgs.FILTER ],
        boolean: [ inputArgs.CREATE, inputArgs.ENCODE, inputArgs.DECODE, inputArgs.VERIFY, inputArgs.CONVERT,
            inputArgs.DELIMITED, inputArgs.TYPEURL, inputArgs.BEAUTIFY, 
            inputArgs.COMMENTS, inputArgs.SERVICE, inputArgs.ES6, inputArgs.SPARSE, inputArgs.KEEP_CASE,
            inputArgs.ALT_COMMENT, inputArgs.FORCE_LONG, inputArgs.FORCE_NUMBER, 
            inputArgs.FORCE_ENUM_STRING, inputArgs.FORCE_MESSAGE, inputArgs.NULL_DEFAULTS, inputArgs.UNIFY_NAMES,
             inputArgs.USE_IMPORTS],
        default: {
            [inputArgs.TARGET]: "json",
            [inputArgs.CREATE]: true,
            [inputArgs.ENCODE]: true,
            [inputArgs.DECODE]: true,
            [inputArgs.VERIFY]: true,
            [inputArgs.CONVERT]: true,
            [inputArgs.DELIMITED]: true,
            [inputArgs.TYPEURL]: true,
            [inputArgs.BEAUTIFY]: true,
            [inputArgs.COMMENTS]: true,
            [inputArgs.SERVICE]: true,
            [inputArgs.ES6]: null,
            [inputArgs.LINT]: lintDefault,
            [inputArgs.KEEP_CASE]: false,
            [inputArgs.ALT_COMMENT]: false,
            [inputArgs.FORCE_LONG]: false,
            [inputArgs.FORCE_NUMBER]: false,
            [inputArgs.FORCE_ENUM_STRING]: false,
            [inputArgs.FORCE_MESSAGE]: false,
            [inputArgs.NULL_DEFAULTS]: false,
            [inputArgs.UNIFY_NAMES]: false,
            [inputArgs.IMPORTS]: false,
        }
    });

    var target = targets[argv[inputArgs.TARGET]],
        files  = argv._,
        paths  = typeof argv[inputArgs.PATH] === "string" ? [ argv[inputArgs.PATH] ] : argv[inputArgs.PATH] || [];

    // alias hyphen args in camel case
    Object.keys(argv).forEach(function(key) {
        var camelKey = key.replace(/-([a-z])/g, function($0, $1) { return $1.toUpperCase(); });
        if (camelKey !== key)
            argv[camelKey] = argv[key];
    });

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
                "  -t, --" + inputArgs.TARGET + "     Specifies the target format. Also accepts a path to require a custom target.",
                "",
                descs.join("\n"),
                "",
                "  -p, --" + inputArgs.PATH + "       Adds a directory to the include path.",
                "",
                "  -o, --" + inputArgs.OUT + "        Saves to a file instead of writing to stdout.",
                "",
                "  --" + inputArgs.SPARSE + "         Exports only those types referenced from a main file (experimental).",
                "",
                "  -u, --" + inputArgs.UNIFY_NAMES + "   Unify names of nested Namespaces in case then they are the same",
                "  --" + inputArgs.FILTER + "         Set up a filter to configure only those messages you need and their dependencies to compile, this will effectively reduce the final file size",
                "                   Set A json file path, Example of file content: {\"messageNames\":[\"mypackage.messageName1\", \"messageName2\"] } ",
                "",
                "  -o, --" + inputArgs.OUT + "        Saves to a file instead of writing to stdout.",
                "",
                "  --" + inputArgs.USE_IMPORTS + "    Use imports. If this flag is used all code from imports will be put into one generated file. If this flag is not used, generated file will contain definitions for all imported code. Works for static targets only.",
                "",
                chalk.bold.gray("  Module targets only:"),
                "",
                "  -w, --" + inputArgs.WRAP + "       Specifies the wrapper to use. Also accepts a path to require a custom wrapper.",
                "",
                "                   default   Default wrapper supporting both CommonJS and AMD",
                "                   commonjs  CommonJS wrapper",
                "                   amd       AMD wrapper",
                "                   es6       ES6 wrapper (implies --es6)",
                "                   closure   A closure adding to protobuf.roots where protobuf is a global",
                "",
                "  --" + inputArgs.DEPENDENCY + "     Specifies which version of protobuf to require. Accepts any valid module id",
                "",
                "  -r, --" + inputArgs.ROOT + "       Specifies an alternative protobuf.roots name.",
                "",
                "  -l, --" + inputArgs.LINT + "       Linter configuration. Defaults to protobuf.js-compatible rules:",
                "",
                "                   " + lintDefault,
                "",
                "  --" + inputArgs.ES6 + "            Enables ES6 syntax (const/let instead of var)",
                "",
                chalk.bold.gray("  Proto sources only:"),
                "",
                "  --" + inputArgs.KEEP_CASE + "      Keeps field casing instead of converting to camel case.",
                "  --" + inputArgs.ALT_COMMENT + "    Turns on an alternate comment parsing mode that preserves more comments.",
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
                "  --" + inputArgs.FORCE_LONG + "     Enforces the use of 'Long' for s-/u-/int64 and s-/fixed64 fields.",
                "  --" + inputArgs.FORCE_NUMBER + "   Enforces the use of 'number' for s-/u-/int64 and s-/fixed64 fields.",
                "  --" + inputArgs.FORCE_MESSAGE + "  Enforces the use of message instances instead of plain objects.",
                "",
                "  --" + inputArgs.NULL_DEFAULTS + "  Default value for optional fields is null instead of zero value.",
                "",
                "usage: " + chalk.bold.green("pbjs") + " [options] file1.proto file2.json ..." + chalk.gray("  (or pipe)  ") + "other | " + chalk.bold.green("pbjs") + " [options] -",
                ""
            ].join("\n"));
        return 1;
    }

    if (typeof argv[inputArgs.STRICT_LONG] === "boolean")
        argv[inputArgs.FORCE_LONG] = argv[inputArgs.STRICT_LONG];

    // Resolve glob expressions
    for (var i = 0; i < files.length;) {
        if (glob.hasMagic(files[i])) {
            var matches = glob.sync(files[i]);
            Array.prototype.splice.apply(files, [i, 1].concat(matches));
            i += matches.length;
        } else
            ++i;
    }

    // Require custom target
    if (!target)
        target = require(path.resolve(process.cwd(), argv[inputArgs.TARGET]));

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

    // `--wrap es6` implies `--es6` but not the other way around. You can still use e.g. `--es6 --wrap commonjs`
    if (argv[inputArgs.WRAP] === "es6") {
        argv[inputArgs.ES6] = true;
    }

    var parseOptions = {
        "keepCase": argv[inputArgs.KEEP_CASE] || false,
        "alternateCommentMode": argv[inputArgs.ALT_COMMENT] || false,
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
            if (argv[inputArgs.SPARSE]) {
                sparsify(root);
            }
            if (argv[inputArgs.USE_IMPORTS]) {
                markUndefinedInMainFile(root);
                printImports(root, files, paths);
            }
            if (argv[inputArgs.UNIFY_NAMES]) {
                unifyNames(root);
            }
            callTarget();
        } catch (err) {
            if (callback) {
                callback(err);
                return undefined;
            }
            throw err;
        }
    }

    function printImports(root, files, paths) {
        const imports = new Set();
        if (!files) {
            return;
        }
        files.forEach(function(file) {

            const importsInFile = findAllImports(findProtobufFile(file, paths));
            importsInFile.forEach(function(item) {
                if (item.endsWith('.proto')) {
                    item = item.substring(0, item.length - '.proto'.length);
                }
                item.replaceAll("/", "-");
                imports.add(item);
            });
        });
        root.imports = imports;
    }

    function findProtobufFile(file, paths) {
        for (let i = 0; i < paths.length; ++i) {
            var iresolved = paths[i] + "/" + file;
            if (fs.existsSync(iresolved)) {
                return iresolved;
            }
        }
        return undefined;
    }

    function findAllImports(file) {
        const fileContent = fs.readFileSync(file, 'utf-8');

        const result = [];
        const re = /\nimport "(.*?)";/g;
        var m;
        while (m = re.exec(fileContent)) {
            const importedLib = m[1];
            if (importedLib.startsWith("google")) {
                continue;
            }
            console.log("found import:" + importedLib);
            result.push(importedLib);
        }
        return result;
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

    function contains(mainFiles, filename) {
        return mainFiles.reduce( 
            (acc, file) => acc = filename.endsWith(file), 
        false)
    }

    function fixFilename(obj) {
        if (obj.fullName.startsWith(".google") && !obj.filename) {
            obj.filename = "DtkProtoTypes/DtkProtoTypes.proto";
        }
    }

    function unifyNames(obj) {
        if (obj.name) {
            const parentNames = findAllParentsNames(obj);
            while (parentNames.has(obj.name)) {
                let postfix = "Ns";
                if (obj instanceof protobuf.Service) {
                    postfix = "Service";
                }
                obj.name = obj.name + postfix;
            }
        }

        obj.nestedArray?.forEach(unifyNames)
    }

    function findAllParentsNames(obj) {
        const parentNames = new Set();
        let parent = obj;
        while (parent.parent) {
            parent = parent.parent;
            parentNames.add(parent.name);
        }
        return parentNames;
    }

    function markUndefinedInMainFile(root) {
        util.traverse(root, function(obj) { // loop over all items
            fixFilename(obj);

            obj.undefinedInMainProto = false;
            if (!obj.filename)
                return;
            if (contains(mainFiles, obj.filename))
                return;
            obj.undefinedInMainProto = true;
            let protoFrom = obj.filename;
            if (protoFrom.endsWith('.proto')) {
                protoFrom = protoFrom.substring(0, protoFrom.length - '.proto'.length);
            }
            const lastSlashIndex = protoFrom.lastIndexOf('/');
            if (lastSlashIndex != -1) {
                protoFrom = protoFrom.substring(lastSlashIndex + 1);
            }
            obj.protoFrom = protoFrom + "_pb";
        });
        unifyNames(root);
    }

    function sparsify(root) {

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
        target(root, argv, function targetCallback(err, output) {
            if (err) {
                if (callback)
                    return callback(err);
                throw err;
            }
            try {
                if (argv[inputArgs.OUT])
                    fs.writeFileSync(argv[inputArgs.OUT], output, { encoding: "utf8" });
                else if (!callback)
                    process.stdout.write(output, "utf8");
                return callback
                    ? callback(null, output)
                    : undefined;
            } catch (err) {
                if (callback)
                    return callback(err);
                throw err;
            }
        });
    }

    return undefined;
};
