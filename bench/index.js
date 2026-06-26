"use strict";

// Measures encode and decode throughput for benchmark fixtures.
// JSON cases include binary conversion so all variants operate on transferable bytes.

var fs       = require("fs"),
    os       = require("os"),
    path     = require("path"),
    newSuite = require("./suite");

var resultsFile = path.join(__dirname, "results", "latest.json");

var caseFactories = [
    require("./cases/common"),
    require("./cases/vector-tile"),
    require("./cases/buf-perf")
];

var operations = [ "encode", "decode" ];

try {
    main();
} catch (err) {
    process.stderr.write((err && err.stack || err) + "\n");
    process.exitCode = 1;
}

function main() {
    var options = parseArgs(process.argv.slice(2)),
        cases = caseFactories.filter(function(createCase) {
            return options.caseName === "all" || createCase.caseName === options.caseName;
        }).map(function(createCase) {
            return createCase();
        });

    if (!cases.length)
        throw Error("unknown benchmark case '" + options.caseName + "'");

    var result = {
        node: process.version,
        cpu: cpuName(),
        operations: []
    };

    operations.filter(function(operation) {
        return !options.only || options.only === operation;
    }).forEach(function(operation) {
        var opResult = {
            name: operation,
            title: operation,
            cases: []
        };
        result.operations.push(opResult);

        cases.forEach(function(benchCase) {
            var caseResult = {
                title: benchCase.title,
                variants: []
            };
            opResult.cases.push(caseResult);

            var suite = newSuite(benchCase.title + " " + operation, {
                onComplete: function(variants) {
                    caseResult.variants = variants;
                }
            });
            benchCase.variants.filter(function(variant) {
                return typeof variant[operation] === "function";
            }).forEach(function(variant) {
                suite.add(variant.name, variant[operation]);
                for (var i = 0; i < 10; ++i)
                    variant[operation](); // warmup
            });
            if (typeof global.gc === "function") {
                suite.on("cycle", function() {
                    global.gc();
                });
            }
            suite.run();
        });
    });

    if (options.save) {
        write(resultsFile, JSON.stringify(result, null, 2) + "\n");
        process.stdout.write("wrote " + relative(resultsFile) + "\n");
    }
}

function parseArgs(args) {
    var options = {
        caseName: "all",
        only: "",
        save: false
    };

    for (var i = 0; i < args.length; ++i) {
        var arg = args[i];
        if (arg === "--case") {
            options.caseName = args[++i] || "";
        } else if (arg.indexOf("--case=") === 0) {
            options.caseName = arg.substring("--case=".length);
        } else if (arg === "--only") {
            options.only = args[++i] || "";
        } else if (arg.indexOf("--only=") === 0) {
            options.only = arg.substring("--only=".length);
        } else if (arg === "--save") {
            options.save = true;
        } else {
            usage();
            throw Error("unknown argument '" + arg + "'");
        }
    }

    if (options.only && operations.indexOf(options.only) < 0)
        throw Error("unknown operation '" + options.only + "'");
    if (options.save && (options.caseName !== "all" || options.only))
        throw Error("--save requires a complete benchmark run");

    return options;
}

function usage() {
    process.stderr.write([
        "usage: node bench/index.js [--case all|common|vector-tile|buf-perf]",
        "                           [--only encode|decode]",
        "                           [--save]",
        ""
    ].join("\n"));
}

function write(file, data) {
    var dir = path.dirname(file);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, data);
}

function relative(file) {
    return path.relative(path.resolve(__dirname, ".."), file).replace(/\\/g, "/");
}

function cpuName() {
    var cpus = os.cpus();
    return cpus.length ? cpus[0].model.trim() : "";
}
