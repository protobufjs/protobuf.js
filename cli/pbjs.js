/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
var ProtoBuf = require(__dirname+"/../index.js"),
    fs       = require("fs"),
    path     = require("path"),
    cli      = require("ascli")("pbjs"),
    yargs    = require("yargs"),
    util     = require("./pbjs/util.js"),
    glob     = require("glob"),
    pkg      = require("../package.json");

/**
 * pbjs namespace.
 * @exports pbjs
 * @namespace
 */
var pbjs = module.exports = {};

/**
 * @alias pbjs/util
 */
pbjs.util = util;

/**
 * Source formats.
 * @type {!Object.<string,!function(string,!Object.<string,*>)>}
 */
pbjs.sources = {};
fs.readdirSync(__dirname+"/pbjs/sources").forEach(function(source) {
    if (/\.js$/.test(source)) {
        var src = require(__dirname + "/pbjs/sources/" + source);
        if (!src.exclude)
            pbjs.sources[source.substring(0, source.lastIndexOf("."))] = src;
    }
});

/**
 * Target formats.
 * @type {!Object.<string,!function(!ProtoBuf.Builder,!Object.<string,*>)>}
 */
pbjs.targets = {};
fs.readdirSync(__dirname+"/pbjs/targets").forEach(function(target) {
    if (/\.js$/.test(target))
        pbjs.targets[target.substring(0, target.lastIndexOf("."))] = require(__dirname + "/pbjs/targets/" + target);
});

/**
 * Status code: Operation successful
 * @type {number}
 */
pbjs.STATUS_OK = 0;

/**
 * Status code: Displaying usage information
 * @type {number}
 */
pbjs.STATUS_USAGE = 1;

/**
 * Status code: No such include directory
 * @type {number}
 */
pbjs.STATUS_ERR_INCLUDE_DIR = 2;

/**
 * Status code: No such source format
 * @type {number}
 */
pbjs.STATUS_ERR_SOURCE_FORMAT = 3;

/**
 * Status code: No such target format
 * @type {number}
 */
pbjs.STATUS_ERR_TARGET_FORMAT = 4;

/**
 * Status code: No such namespace
 * @type {number}
 */
pbjs.STATUS_ERR_NAMESPACE = 5;

/**
 * Status code: Illegal dependency
 * @type {number}
 */
pbjs.STATUS_ERR_DEPENDENCY = 6;

/**
 * Status code: No matching source files
 * @type {number}
 */
pbjs.STATUS_ERR_NOSOURCE = 7;

// Makes a table of available source or target formats
function mkOptions(obj) {
    var str = '';
    Object.keys(obj).forEach(function(key) {
        str += "\n   "+util.pad(key, 10)+" "+obj[key].description;
    });
    return str;
}

/**
 * Executes the program.
 * @param {!Array.<string>} argv Command line arguments
 * @returns {number} Status code
 */
pbjs.main = function(argv) {
    var options = yargs
        .usage(cli("pb".white.bold+"js".green.bold, util.pad("ProtoBuf.js v"+pkg['version'], 31, true)+" "+pkg['homepage'].grey) + "\n" +
                    "CLI utility to convert between .proto and JSON syntax / to generate classes.\n\n" +
                    "Usage: ".white.bold+path.basename(argv[1]).green.bold+" <source files...> [options] [> outFile]")
        .help("help")
        .version(pkg["version"])
        .wrap(null)
        .options({
            source: {
                alias: "s",
                describe: "Specifies the source format. Valid formats are:\n" + mkOptions(pbjs.sources)+"\n"
            },
            target: {
                alias: "t",
                describe: "Specifies the target format. Valid formats are:\n" + mkOptions(pbjs.targets)+"\n"
            },
            using: {
                alias: "u",
                describe: "Specifies an option to apply to the volatile builder\nloading the source, e.g. convertFieldsToCamelCase.",
                type: "array"
            },
            min: {
                alias: "m",
                describe: "Minifies the output.",
                default: false
            },
            path: {
                alias: "p",
                describe: "Adds a directory to the include path."
            },
            legacy: {
                alias: "l",
                describe: "Includes legacy descriptors from google/protobuf/ if\nexplicitly referenced.",
                default: false
            },
            quiet: {
                alias: "q",
                describe: "Suppresses any informatory output to stderr.",
                default: false
            },
            out: {
                alias: "o",
                describe: "Send output to file instead of stdout.",
            },
            use: {
                alias: "i",
                describe: "Specifies an option to apply to the emitted builder\nutilized by your program, e.g. populateAccessors.",
                type: "array"
            },
            exports: {
                alias: "e",
                describe: "Specifies the namespace to export. Defaults to export\nthe root namespace."
            },
            dependency: {
                alias: "d",
                describe: "Library dependency to use when generating classes.\nDefaults to 'protobufjs' for CommonJS, 'protobuf' for\nAMD modules and 'dcodeIO.ProtoBuf' for classes."
            }
        })
        .alias("help", "h")
        .alias("version", "v")
        .check(function (args) {
            if (args.source && typeof pbjs.sources[args.source] !== "function") {
                return "Unrecognized source format: '" + args.source + "'";
            }

            if (args.target && typeof pbjs.targets[args.target] !== "function") {
                return "Unrecognized target format: '" + args.target + "'";
            }

            if (args._.length < 3) {
                return "The filename to parse is required.";
            }

            return true;
        })
        .parse(argv);

    var start = Date.now(),
        sourceFiles = options._.slice(2);

    // Expand glob expressions
    var sourceFilesExpand = [];
    for (var i=0; i<sourceFiles.length; ++i) {
        var filename = sourceFiles[i],
            files = glob.sync(filename);
        if (files.length === 0) {
            cli.fail("No matching source files: "+filename);
            return pbjs.STATUS_ERR_NOSOURCE;
        }
        files.forEach(function(filename) {
            if (sourceFilesExpand.indexOf(filename) === -1)
                sourceFilesExpand.push(filename);
        });
    }
    sourceFiles = sourceFilesExpand;

    if (!options.target)
        options.target = "json";

    // Set up include paths
    var includePath = Array.isArray(options['path']) ? options['path'] : (typeof options['path'] === 'string' ? [options['path']] : []);
    sourceFiles.forEach(function (sourceFile) {
        var dir = path.dirname(sourceFile);
        if (includePath.indexOf(dir) === -1) {
            includePath.push(dir);
        }
    });
    includePath.forEach(function(path) { // Verify that include paths actually exist
        if (!fs.existsSync(path)) {
            if (!options.quiet)
                cli.fail("No such include directory: "+path);
            return pbjs.STATUS_ERR_INCLUDE_DIR;
        }
    });
    options.path = includePath;

    // Detect source format if not specified, then verify
    if (typeof options.source !== 'string') {
        var source = fs.readFileSync(sourceFiles[0]).toString("utf8").trim();
        if (source.substring(0,1) === "{")
            options.source = "json";
        else
            options.source = "proto";
    }

    // Load the source files to a common builder
    var builder = pbjs.sources[options.source](sourceFiles, options);

    // Validate exports and dependency if set
    if (typeof options.exports !== 'undefined') {
        if (!(builder.lookup(options.exports) instanceof ProtoBuf.Reflect.Namespace)) {
            if (!options.quiet)
                cli.fail("No such export namespace: "+options.exports);
            return pbjs.STATUS_ERR_NAMESPACE;
        }
        if (options.exports.charAt(0) === '.')
            options.exports = options.exports.substring(1);
    }
    if (typeof options.dependency !== 'undefined')
        if (typeof options.dependency !== 'string' || !options.dependency) {
            if (!options.quiet)
                cli.fail("Illegal dependency: "+options.dependency);
            return pbjs.STATUS_ERR_DEPENDENCY;
        }

    // Perform target conversion
    if (!options.quiet)
        cli.error("\nProcessing: "+sourceFiles.join(", ")+" ...\n");
    var res = pbjs.targets[options.target](builder, options);
    if (options.out){
        fs.writeFileSync(options.out, res);
    }else
    process.stdout.write(res);
    if (!options.quiet)
        cli.error(""),
        cli.ok("Converted "+sourceFiles.length+" source files to "+options.target+" ("+res.length+" bytes, "+(Date.now()-start)+" ms)");

    return pbjs.STATUS_OK;
};
