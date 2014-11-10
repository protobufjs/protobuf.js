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
fs.readdirSync(__dirname+"/pbjs/sources").forEach(function(source) {
    if (/\.js$/.test(source))
        pbjs.sources[source.substring(0, source.lastIndexOf("."))] = require(__dirname+"/pbjs/sources/"+source);
});

/**
 * Target formats.
 * @type {!Object.<string,!function(!ProtoBuf.Builder,!Object.<string,*>)>}
 */
pbjs.targets = {};
fs.readdirSync(__dirname+"/pbjs/targets").forEach(function(target) {
    if (/\.js$/.test(target))
        pbjs.targets[target.substring(0, target.lastIndexOf("."))] = require(__dirname+"/pbjs/targets/"+target);
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
 * Executes the program.
 * @param {!Array.<string>} argv Command line arguments
 * @returns {number} Status code
 */
pbjs.main = function(argv) {

    // Display usage information
    if (argv.length < 3) {
        cli.banner("pb".white.bold+"js".green.bold, util.pad("ProtoBuf.js v"+pkg['version'], 31, true)+" "+"https://github.com/dcodeIO/ProtoBuf.js".grey);
        cli.log("CLI utility to convert between .proto and JSON syntax / to generate classes.\n");
        cli.log("Usage: ".white.bold+path.basename(argv[1]).green.bold+" filename -target=FORMAT [-min] [> outFile]\n");
        cli.log("General options:\n");
        cli.log("  -source=FORMAT          Specifies the source format. Valid formats are:\n");
        Object.keys(pbjs.sources).forEach(function(key) {
            cli.log("                             "+util.pad(key, 10)+"   "+pbjs.sources[key].description);
        });
        cli.log("");
        cli.log("                          If omitted, the application will try to detect it.\n");
        cli.log("  -target=FORMAT          Specifies the target format. Valid formats are:\n");
        Object.keys(pbjs.targets).forEach(function(key) {
            cli.log("                             "+util.pad(key, 10)+"   "+pbjs.targets[key].description);
        });
        cli.log("");
        cli.log("                          If omitted, target format defaults to json.\n");
        cli.log("  -using:NAME[=VALUE]     Specifies an option to apply to the volatile builder");
        cli.log("                          loading the source, e.g. convertFieldsToCamelCase.\n");
        cli.log("  -min                    Minifies the output.\n");
        cli.log("  -path=DIR               Adds a directory to the include path.\n");
        cli.log("  -legacy                 Includes legacy descriptors from google/protobuf/ if");
        cli.log("                          explicitly referenced.\n");
        cli.log("  -quiet                  Suppresses any informatory output to stderr.\n");
        cli.log("Specific to classes:\n");
        cli.log("  -use:NAME[=VALUE]       Specifies an option to apply to the emitted builder");
        cli.log("                          utilized by your program, e.g. populateAccessors\n");
        cli.log("  -exports=FQN            Specifies the namespace to export. Defaults to export");
        cli.log("                          the root namespace.\n");
        cli.log("  -dependency=ProtoBuf    Library dependency to use when generating classes.");
        cli.log("                          Defaults to 'protobufjs' for CommonJS, 'ProtoBuf' for");
        cli.log("                          AMD modules and 'dcodeIO.ProtoBuf' for classes.\n");
        return pbjs.STATUS_USAGE;
    }

    var start = Date.now(),
        sourceFile = argv[2];

    // Parse options
    var options = {};
    for (var i=3; i<argv.length; i++) {
        var option = argv[i];
        if (option.substring(0,1) == "-") {
            var opt = option.split("=", 2), key = opt[0].substring(1);
            if (typeof options[key] === 'string' && typeof opt[1] === 'string')
                options[key] = [options[key], opt[1]]; // Make it an array
            else if (Array.isArray(options[key]) && typeof opt[1] === 'string')
                options[key].push(opt[1]); // Add it
            else
                options[key] = opt.length == 2 ? opt[1] : true; // Create or overwrite
        }
    }

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
