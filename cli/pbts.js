"use strict";
var child_process = require("child_process"),
    path     = require("path"),
    fs       = require("fs"),
    pkg      = require("./package.json"),
    minimist = require("minimist"),
    chalk    = require("chalk"),
    glob     = require("glob"),
    tmp      = require("tmp"),
    inputArgs = require("./inputArgs");

/**
 * Runs pbts programmatically.
 * @param {string[]} args Command line arguments
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
exports.main = function(args, callback) {
    var argv = minimist(args, {
        alias: {
            [inputArgs.NAME]: "n",
            [inputArgs.OUT] : "o",
            [inputArgs.MAIN]: "m",
            [inputArgs.GLOBAL]: "g",
            [inputArgs.IMPORT]: "i"
        },
        string: [ inputArgs.NAME, inputArgs.OUT, inputArgs.GLOBAL, inputArgs.IMPORT ],
        boolean: [ inputArgs.COMMENTS, inputArgs.MAIN, inputArgs.USE_IMPORTS ],
        default: {
            [inputArgs.COMMENTS]: true,
            [inputArgs.MAIN]: false,
            [inputArgs.USE_IMPORTS]: false,
        }
    });

    var files  = argv._;

    if (!files.length) {
        if (callback)
            callback(Error("usage")); // eslint-disable-line callback-return
        else
            process.stderr.write([
                "protobuf.js v" + pkg.version + " CLI for TypeScript",
                "",
                chalk.bold.white("Generates TypeScript definitions from annotated JavaScript files."),
                "",
                "  -o, --" + inputArgs.OUT + "       Saves to a file instead of writing to stdout.",
                "",
                "  -g, --" + inputArgs.GLOBAL + "    Name of the global object in browser environments, if any.",
                "",
                "  -i, --" + inputArgs.IMPORT + "    Comma delimited list of imports. Local names will equal camelCase of the basename.",
                "",
                "  --" + inputArgs.NO_COMMENTS + "no-comments   Does not output any JSDoc comments.",
                "",
                " --" + inputArgs.USE_IMPORTS + "",
                "",
                chalk.bold.gray("  Internal flags:"),
                "",
                "  -n, --" + inputArgs.NAME + "      Wraps everything in a module of the specified name.",
                "",
                "  -m, --" + inputArgs.MAIN + "      Whether building the main library without any imports.",
                "",
                "usage: " + chalk.bold.green("pbts") + " [options] file1.js file2.js ..." + chalk.bold.gray("  (or)  ") + "other | " + chalk.bold.green("pbts") + " [options] -",
                ""
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

    var cleanup = [];

    // Read from stdin (to a temporary file)
    if (files.length === 1 && files[0] === "-") {
        var data = [];
        process.stdin.on("data", function(chunk) {
            data.push(chunk);
        });
        process.stdin.on("end", function() {
            files[0] = tmp.tmpNameSync() + ".js";
            fs.writeFileSync(files[0], Buffer.concat(data));
            cleanup.push(files[0]);
            callJsdoc();
        });

    // Load from disk
    } else {
        callJsdoc();
    }

    function callJsdoc() {

        // There is no proper API for jsdoc, so this executes the CLI and pipes the output
        var basedir = path.join(__dirname, ".");
        var moduleName = argv[inputArgs.NAME] || "null";
        var nodePath = process.execPath;
        var cmd = "\"" + nodePath + "\" \"" + require.resolve("jsdoc/jsdoc.js") + "\" -c \"" + path.join(basedir, "lib", "tsd-jsdoc.json") + "\" -q \"module=" + encodeURIComponent(moduleName) + "&comments=" + Boolean(argv.comments) + "\" " + files.map(function(file) { return "\"" + file + "\""; }).join(" ");
        var child = child_process.exec(cmd, {
            cwd: process.cwd(),
            argv0: "node",
            stdio: "pipe",
            maxBuffer: 1 << 24 // 16mb
        });
        var out = [];
        var ended = false;
        var closed = false;
        child.stdout.on("data", function(data) {
            out.push(data);
        });
        child.stdout.on("end", function() {
            if (closed) finish();
            else ended = true;
        });
        child.stderr.pipe(process.stderr);
        child.on("close", function(code) {
            // clean up temporary files, no matter what
            try { cleanup.forEach(fs.unlinkSync); } catch(e) {/**/} cleanup = [];

            if (code) {
                out = out.join("").replace(/\s*JSDoc \d+\.\d+\.\d+ [^$]+/, "");
                process.stderr.write(out);
                var err = Error("code " + code);
                if (callback)
                    return callback(err);
                throw err;
            }

            if (ended) return finish();
            closed = true;
            return undefined;
        });

        function getImportName(importItem) {
            return path.basename(importItem, ".js").replace(/([-_~.+]\w)/g, function(match) {
                return match[1].toUpperCase();
            });
        }

        function finish() {
            var output = [];
            if (argv[inputArgs.MAIN])
                output.push(
                    "// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run build:types'.",
                    ""
                );
            if (argv[inputArgs.GLOBAL])
                output.push(
                    "export as namespace " + argv[inputArgs.GLOBAL] + ";",
                    ""
                );

            if (!argv[inputArgs.MAIN]) {
                // Ensure we have a usable array of imports
                var importArray = typeof argv[inputArgs.IMPORT] === "string" ? argv[inputArgs.IMPORT].split(",") : argv[inputArgs.IMPORT] || [];

                // Build an object of imports and paths
                var imports = {
                    $protobuf: "protobufjs"
                };
                importArray.forEach(function(importItem) {
                    imports[getImportName(importItem)] = importItem;
                });
                if (argv[inputArgs.USE_IMPORTS]) {
                    const jsFile = fs.readFileSync(argv._[0], { encoding: "utf8" }); //todo: make a loop
                    var re = /\nconst (.*?) = require\((.*?)\);/g;
                    var m;
                    while (m = re.exec(jsFile)) {
                        imports[m[1]] = m[2];
                    }

                }

                // Write out the imports
                Object.keys(imports).forEach(function(key) {
                    output.push("import * as " + key + " from " + imports[key] + ";");
                });

                output.push("import Long = require(\"long\");");
            }

            output = output.join("\n") + "\n" + out.join("");

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
        }
    }

    return undefined;
};
