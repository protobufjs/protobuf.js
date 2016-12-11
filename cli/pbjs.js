var path     = require("path"),
    fs       = require("fs"),
    pkg      = require(path.join(__dirname, "..", "package.json")),
    util     = require("./util");

var minimist = util.require("minimist", pkg.devDependencies.minimist),
    chalk    = util.require("chalk", pkg.devDependencies.chalk),
    glob     = util.require("glob", pkg.devDependencies.glob);

var protobuf = require(".."),
    targets  = util.requireAll("./targets"),
    pkg      = require("../package.json");

exports.main = function(args) {
    var argv = minimist(args.slice(2), {
        alias: {
            target : "t",
            out    : "o",
            path   : "p",
            wrap   : "w",
            root   : "r"
        },
        string: [ "target", "out", "path", "wrap", "root" ],
        default: {
            target: "json"
        }
    });

    var target = targets[argv.target],
        files  = argv._,
        paths  = typeof argv.path === 'string' ? [ argv.path ] : argv.path || [];

    if (!files.length) {
        var descs = Object.keys(targets).filter(function(key) { return !targets[key].private; }).map(function(key) {
            return "                  " + util.pad(key, 14, true) + targets[key].description;
        });
        console.log([
            "protobuf.js v" + pkg.version + " cli",
            "",
            "Consolidates imports and converts between file formats.",
            "",
            "  -t, --target    Specifies the target format. Also accepts a path to require a custom target.",
            "",
            descs.join('\n'),
            "",
            "  -p, --path      Adds a directory to the include path.",
            "",
            "  -o, --out       Saves to a file instead of writing to stdout.",
            "",
            "  -w, --wrap      Specifies the wrapper to use for *-module targets. Also accepts a path.",
            "",
            "                  default   Default wrapper supporting both CommonJS and AMD",
            "                  commonjs  CommonJS only wrapper",
            "                  amd       AMD only wrapper",
            "",
            "  -r, --root      Specifies an alternative protobuf.roots name for *-module targets.",
            "",
            "usage: " + chalk.bold.green(path.basename(process.argv[1])) + " [options] file1.proto file2.json ..."
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
        var filepath = protobuf.util.resolvePath(origin, target);
        if (fs.existsSync(filepath))
            return filepath;
        for (var i = 0; i < paths.length; ++i) {
            var ifilepath = protobuf.util.resolvePath(paths[i] + "/", target);
            if (fs.existsSync(ifilepath))
                return ifilepath;
        }
        return filepath;
    };

    root.load(files, function(err) {
        if (err)
            throw err;
        target(root, argv, function(err, output) {
            if (err)
                throw err;
            if (output !== "") {
                if (argv.out)
                    fs.writeFileSync(argv.out, output, { encoding: "utf8" });
                else
                    process.stdout.write(output, "utf8");
            }
            process.exit(0);
        });
    });
};
