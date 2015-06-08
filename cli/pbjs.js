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
var ProtoBuf = require(__dirname+"/../dist/ProtoBuf.js"),
    fs       = require("fs"),
    path     = require("path"),
    cli      = require("ascli")("pbjs"),
    yargs    = require("yargs"),
    util     = require("./pbjs/util.js"),
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
var availableSources = [];
fs.readdirSync(__dirname+"/pbjs/sources").forEach(function(source) {
    if (/\.js$/.test(source)) {
        var name = source.substring(0, source.lastIndexOf("."));
        var info = pbjs.sources[name] = require(__dirname + "/pbjs/sources/" + source);
        availableSources.push(util.pad(name, 10)+info.description);
    }
});

/**
 * Target formats.
 * @type {!Object.<string,!function(!ProtoBuf.Builder,!Object.<string,*>)>}
 */
pbjs.targets = {};
var availableTargets = [];
fs.readdirSync(__dirname+"/pbjs/targets").forEach(function(target) {
    if (/\.js$/.test(target)) {
        var name = target.substring(0, target.lastIndexOf("."));
        var info = pbjs.targets[name] = require(__dirname + "/pbjs/targets/" + target);
        availableTargets.push(util.pad(name, 10)+info.description);
    }
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

function _options(obj) {
    var str = '';

    Object.keys(obj).forEach(function(key) {
        str += "\n    "+util.pad(key, 10)+"   "+obj[key].description;
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
                    "CLI utility to convert between .proto and JSON syntax / to generate classes.\n" +
                    "Usage: ".white.bold+path.basename(argv[1]).green.bold+" <filename> [options] [> outFile]\n")
        .help("help")
        .version(pkg["version"])
        .wrap(null)
        .options({
            source: {
                alias: "s",
                describe: "Specifies the source format. Valid formats are:" + _options(pbjs.sources)
            },
            target: {
                alias: "t",
                describe: "Specifies the target format. Valid formats are:" + _options(pbjs.targets),
                default: "json"
            },
            using: {
                alias: "u",
                describe: "Specifies an option to apply to the volatile builder\nloading the source, e.g. convertFieldsToCamelCase."
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
            use: {
                alias: "i",
                describe: "Specifies an option to apply to the emitted builder\nutilized by your program, e.g. populateAccessors."
            },
            exports: {
                alias: "e",
                describe: "Specifies the namespace to export. Defaults to export\nthe root namespace."
            },
            dependency: {
                alias: "d",
                describe: "Library dependency to use when generating classes.\nDefaults to 'protobufjs' for CommonJS, 'ProtoBuf' for\nAMD modules and 'dcodeIO.ProtoBuf' for classes."
            }
        })
        .check(function (args) {
            if (args.source && Object.keys(pbjs.sources).indexOf(args.source) === -1) {
                return "Unrecognized source format: '" + args.source + "'";
            }

            if (args.target && Object.keys(pbjs.targets).indexOf(args.target) === -1) {
                return "Unrecognized target format: '" + args.target + "'";
            }

            if (args._.length < 3) {
                return "The filename to parse is required.";
            }

            return true;
        })
        .parse(argv);

    var start = Date.now(),
        sourceFile = options._[2];

    // Set up include paths
    var includePath = Array.isArray(options['path']) ? options['path'] : (typeof options['path'] === 'string' ? [options['path']] : []);
    includePath.push(path.dirname(sourceFile));
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
        var source = fs.readFileSync(sourceFile).toString("utf8").trim();
        if (source.substring(0,1) === "{")
            options.source = "json";
        else
            options.source = "proto";
    }
    if (!pbjs.sources.hasOwnProperty(options.source) || typeof pbjs.sources[options.source] !== 'function') {
        if (!options.quiet)
            cli.fail("No such source format: "+options.source);
        return pbjs.STATUS_ERR_SOURCE_FORMAT;
    }

    // Set default target format if not specified, then verify
    if (typeof options.target !== 'string')
        options.target = "json";
    if (!pbjs.targets.hasOwnProperty(options.target) || typeof pbjs.targets[options.target] !== 'function') {
        if (!options.quiet)
            cli.fail("No such target format: "+options.target);
        return pbjs.STATUS_ERR_TARGET_FORMAT;
    }

    // Load the source file to a builder
    var builder = pbjs.sources[options.source](sourceFile, options);

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
        cli.error("\nProcessing '"+sourceFile+"' ...\n");
    var res = pbjs.targets[options.target](builder, options);
    process.stdout.write(res);
    if (!options.quiet)
        cli.error(""),
        cli.ok("Converted '"+sourceFile+"' to "+options.target+" ("+res.length+" bytes, "+(Date.now()-start)+" ms)");

    return pbjs.STATUS_OK;
};
