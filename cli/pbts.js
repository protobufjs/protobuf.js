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

    // There is no proper API for jsdoc, so this executes the CLI and writes to types/types.d.ts
    var child = child_process.exec("node node_modules/jsdoc/jsdoc.js -c jsdoc.types.json " + files.join(' '), {
        cwd: path.join(__dirname, ".."),
        argv0: "node",
        stdio: "pipe"
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on("close", function(code) {
        if (code)
            throw Error("exited with " + code);
        
        var dir = path.join(__dirname, "..", "types");
        var dts = fs.readFileSync(path.join(dir, "types.d.ts"), "utf8");
        fs.unlinkSync(path.join(dir, "types.d.ts"));

        var header = [
            "// $> pbts " + process.argv.slice(2).join(' '),
            "// Generated " + (new Date()).toUTCString().replace(/GMT/, "UTC"),
            ""
        ];

        // Remove declare statements and wrap everything in a module
        dts = dts.replace(/\bdeclare\s/g, "");
        dts = dts.replace(/^/mg, "   ");
        dts = header.join('\n')+"\ndeclare module " + JSON.stringify(argv.name || "mymodule") + " {\n\n" + dts + "\n}\n";

        if (argv.out)
            fs.writeFileSync(argv.out, dts);
        else
            process.stdout.write(dts, "utf8");
    });

    return undefined;
};
