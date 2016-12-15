var path     = require("path"),
    fs       = require("fs"),
    pkg      = require(path.join(__dirname, "..", "package.json")),
    util     = require("./util");
var child_process = require("child_process");

var minimist = util.require("minimist", pkg.devDependencies.minimist),
    chalk    = util.require("chalk", pkg.devDependencies.chalk),
    glob     = util.require("glob", pkg.devDependencies.glob);

var jsdoc    = util.require("jsdoc/package.json", pkg.devDependencies.jsdoc),
    tsdjsdoc = util.require("tsd-jsdoc/package.json", pkg.devDependencies['tsd-jsdoc']);

var protobuf = require("..");

exports.main = function(args) {
    var argv = minimist(args.slice(2), {
        alias: {
            name: "n",
            out : "o"
        },
        string: [ "name", "out" ]
    });

    var files  = argv._;

    if (!files.length) {
        console.log([
            "protobuf.js v" + pkg.version + " cli for TypeScript",
            "",
            "Generates TypeScript definitions from annotated JavaScript files.",
            "",
            "  -n, --name      Specifies the module name.",
            "",
            "  -o, --out       Saves to a file instead of writing to stdout.",
            "",
            "usage: " + chalk.bold.green(path.basename(process.argv[1])) + " [options] file1.js file2.js ..."
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

    // There is no proper API for jsdoc, so this executes the CLI and pipes the output
    var basedir = path.join(__dirname, "..");
    var moduleName = argv.name || "mymodule";
    var child = child_process.exec("node \"" + basedir + "/node_modules/jsdoc/jsdoc.js\" -c \"" + basedir + "/jsdoc.types.json\" -q \"module=" + encodeURIComponent(moduleName) + "\" " + files.map(function(file) { return '"' + file + '"'; }).join(' '), {
        cwd: process.cwd(),
        argv0: "node",
        stdio: "pipe"
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
            process.exit(code);
            return;
        }

        var output = [
            "// $> pbts " + process.argv.slice(2).join(' '),
            "// Generated " + (new Date()).toUTCString().replace(/GMT/, "UTC"),
        ].join('\n') + "\n" + out.join('');

        if (argv.out)
            fs.writeFileSync(argv.out, output);
        else
            process.stdout.write(output, "utf8");
    });

    return undefined;
};
