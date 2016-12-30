var path     = require("path"),
    fs       = require("fs"),
    pkg      = require(path.join(__dirname, "..", "package.json")),
    util     = require("./util");
var child_process = require("child_process");

var minimist = util.require("minimist", pkg.devDependencies.minimist),
    chalk    = util.require("chalk", pkg.devDependencies.chalk),
    glob     = util.require("glob", pkg.devDependencies.glob);

var jsdoc    = util.require("jsdoc/package.json", pkg.devDependencies.jsdoc);

var protobuf = require("..");

/**
 * Runs pbts programmatically.
 * @param {string[]} args Command line arguments
 * @param {function(?Error)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
exports.main = function(args, callback) {
    var argv = minimist(args, {
        alias: {
            name: "n",
            out : "o"
        },
        string: [ "name", "out" ],
        boolean: [ "comments" ],
        default: {
            comments: true
        }
    });

    var files  = argv._;

    if (!files.length) {
        if (callback)
            callback(Error("usage"));
        else
            console.error([
                "protobuf.js v" + pkg.version + " cli for TypeScript",
                "",
                "Generates TypeScript definitions from annotated JavaScript files.",
                "",
                "  -n, --name      Wraps everything in a module of the specified name.",
                "",
                "  -o, --out       Saves to a file instead of writing to stdout.",
                "",
                "  --no-comments   Does not output any JSDoc comments.",
                "",
                "usage: " + chalk.bold.green("pbts") + " [options] file1.js file2.js ..."
            ].join("\n"));
        if (callback)
            callback(Error("usage"));
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

    // There is no proper API for jsdoc, so this executes the CLI and pipes the output
    var basedir = path.join(__dirname, "..");
    var moduleName = argv.name || "null";
    var child = child_process.exec("node \"" + basedir + "/node_modules/jsdoc/jsdoc.js\" -c \"" + basedir + "/jsdoc.types.json\" -q \"module=" + encodeURIComponent(moduleName) + "&comments=" + Boolean(argv.comments) + "\" " + files.map(function(file) { return '"' + file + '"'; }).join(' '), {
        cwd: process.cwd(),
        argv0: "node",
        stdio: "pipe",
        maxBuffer: 1 << 24 // 16mb
    });
    var out = [];
    child.stdout.on("data", function(data) {
        out.push(data);
    });
    child.stderr.pipe(process.stderr);
    child.on("close", function(code) {
        if (code) {
            out = out.join('').replace(/\s*JSDoc \d+\.\d+\.\d+ [^$]+/, "");
            process.stderr.write(out);
            var err = Error("code " + code);
            if (callback)
                callback(err);
            else
                throw err;
            return;
        }

        var output = [
            "// $> pbts " + args.join(" "),
            "// Generated " + (new Date()).toUTCString().replace(/GMT/, "UTC"),
            ""
        ];
        if (argv.name !== "protobuf")
            output.push(
                "import * as $protobuf from \"protobufjs\";",
                ""
            );
        output = output.join('\n') + "\n" + out.join('');

        try {
            if (argv.out)
                fs.writeFileSync(argv.out, output);
            else
                process.stdout.write(output, "utf8");
            if (callback)
                callback(null);
        } catch (err) {
            if (callback)
                callback(err);
            else
                throw err;
        }
    });

    return undefined;
};
