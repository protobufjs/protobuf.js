"use strict";
var path     = require("path"),
    fs       = require("fs"),
    pkg      = require(path.join(__dirname, "..", "package.json")),
    util     = require("./util");

util.setup();

var protobuf = require(".."),
    minimist = require("minimist"),
    chalk    = require("chalk"),
    glob     = require("glob");

var targets  = util.requireAll("./targets");

/**
 * Runs pbjs programmatically.
 * @param {string[]} args Command line arguments
 * @param {function(?Error)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
exports.main = function(args, callback) {
    var lintDefault = "eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins";
    var argv = minimist(args, {
        alias: {
            target : "t",
            out    : "o",
            path   : "p",
            wrap   : "w",
            root   : "r",
            lint   : "l"
        },
        string: [ "target", "out", "path", "wrap", "root", "lint" ],
        boolean: [ "keep-case", "create", "encode", "decode", "verify", "convert", "delimited", "beautify", "comments", "es6" ],
        default: {
            target    : "json",
            create    : true,
            encode    : true,
            decode    : true,
            verify    : true,
            convert   : true,
            delimited : true,
            beautify  : true,
            comments  : true,
            es6       : null,
            lint      : lintDefault
        }
    });

    var target = targets[argv.target],
        files  = argv._,
        paths  = typeof argv.path === "string" ? [ argv.path ] : argv.path || [];

    if (!files.length) {
        var descs = Object.keys(targets).filter(function(key) { return !targets[key].private; }).map(function(key) {
            return "                  " + util.pad(key, 14, true) + targets[key].description;
        });
        if (callback)
            callback(Error("usage"));
        else
            console.error([
                "protobuf.js v" + pkg.version + " CLI for JavaScript",
                "",
                chalk.bold.white("Consolidates imports and converts between file formats."),
                "",
                "  -t, --target    Specifies the target format. Also accepts a path to require a custom target.",
                "",
                descs.join('\n'),
                "",
                "  -p, --path      Adds a directory to the include path.",
                "",
                "  -o, --out       Saves to a file instead of writing to stdout.",
                "",
                chalk.bold.gray("  Module targets only:"),
                "",
                "  -w, --wrap      Specifies the wrapper to use. Also accepts a path to require a custom wrapper.",
                "",
                "                  default   Default wrapper supporting both CommonJS and AMD",
                "                  commonjs  CommonJS wrapper",
                "                  amd       AMD wrapper",
                "                  es6       ES6 wrapper (implies --es6)",
                "",
                "  -r, --root      Specifies an alternative protobuf.roots name.",
                "",
                "  -l, --lint      Linter configuration. Defaults to protobuf.js-compatible rules:",
                "",
                "                  " + lintDefault,
                "",
                "  --es6           Enables ES6 syntax (const/let instead of var)",
                "",
                chalk.bold.gray("  Proto sources only:"),
                "",
                "  --keep-case     Keeps field casing instead of converting to camel case.",
                "",
                chalk.bold.gray("  Static targets only:"),
                "",
                "  --no-create     Does not generate create functions used for reflection compatibility.",
                "  --no-encode     Does not generate encode functions.",
                "  --no-decode     Does not generate decode functions.",
                "  --no-verify     Does not generate verify functions.",
                "  --no-convert    Does not generate convert functions like from/toObject",
                "  --no-delimited  Does not generate delimited encode/decode functions.",
                "  --no-beautify   Does not beautify generated code.",
                "  --no-comments   Does not output any JSDoc comments.",
                "",
                "usage: " + chalk.bold.green("pbjs") + " [options] file1.proto file2.json ..." + chalk.gray("  (or)  ") + "other | " + chalk.bold.green("pbjs") + " [options] -"
            ].join("\n"));
        return 1;
    }

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
        target = require(path.resolve(process.cwd(), argv.target));

    var root = new protobuf.Root();

    // Search include paths when resolving imports
    root.resolvePath = function pbjsResolvePath(origin, target) {
        var filepath = protobuf.util.path.resolve(origin, target);
        if (fs.existsSync(filepath))
            return filepath;
        for (var i = 0; i < paths.length; ++i) {
            var ifilepath = protobuf.util.path.resolve(paths[i] + "/", target);
            if (fs.existsSync(ifilepath))
                return ifilepath;
        }
        return filepath;
    };

    // Use es6 syntax if not explicitly specified on the command line and the es6 wrapper is used
    if (argv.wrap === "es6" && argv.es6 === null)
        argv.es6 = true;

    var parseOptions = {
        "keepCase": argv["keep-case"] || false
    };

    // Read from stdin
    if (files.length === 1 && files[0] === "-") {
        var data = [];
        process.stdin.on("data", function(chunk) {
            data.push(chunk);
        });
        process.stdin.on("end", function() {
            var source = Buffer.concat(data).toString("utf8");
            if (source.charAt(0) !== "{") {
                protobuf.parse(source, root, parseOptions);
            } else {
                var json = JSON.parse(source);
                root.setOptions(json.options).addJSON(json);
            }
            callTarget();
        });

    // Load from disk
    } else {
        try {
            root.loadSync(files, parseOptions); // sync is deterministic while async is not
            callTarget();
        } catch (err) {
            if (callback) {
                callback(err);
                return undefined;
            }
            throw err;
        }
    }

    function callTarget() {
        target(root, argv, function targetCallback(err, output) {
            if (err) {
                if (callback)
                    return callback(err);
                throw err;
            }
            if (output !== "") {
                if (argv.out)
                    fs.writeFileSync(argv.out, output, { encoding: "utf8" });
                else
                    process.stdout.write(output, "utf8");
            }
            return callback 
                ? callback(null)
                : undefined;
        });
    }
};
