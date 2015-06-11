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
var description = "Plain .proto descriptor";

var ProtoBuf = require(__dirname+"/../../../index.js"),
    util = require(__dirname+"/../util.js"),
    fs = require("fs"),
    node_path = require("path");

/**
 * pbjs source: Plain .proto descriptor
 * @exports pbjs/sources/proto
 * @function
 * @param {!Array.<string>} filenames Source files
 * @param {!Object.<string,*>=} options Options
 * @returns {!ProtoBuf.Builder}
 */
var proto = module.exports = function(filenames, options) {
    options = options || [];
    var builder = ProtoBuf.newBuilder(util.getBuilderOptions(options, "using")),
        loaded = [];
    filenames.forEach(function(filename) {
        var data = proto.load(filename, options, loaded);
        builder["import"](data, filename);
    });
    builder.resolveAll();
    return builder;
};

/**
 * Module description.
 * @type {string}
 */
proto.description = description;

/**
 * Loads a .proto descriptor including imports.
 * @param {string} filename Source file
 * @param {!Object.<string,*>} options Options
 * @param {!Array.<string>=} loaded An array of already loaded filenames
 * @returns {*} JSON descriptor
 */
proto.load = function(filename, options, loaded) {
    filename = node_path.resolve(filename);
    loaded = loaded || [];
    if (loaded.indexOf(filename) >= 0)
        return {};
    var parser = new ProtoBuf.DotProto.Parser(fs.readFileSync(filename).toString("utf8")),
        data = parser.parse();
    loaded.push(filename);
    if (Array.isArray(data['imports'])) {
        var imports = data['imports'];
        for (var i=0; i<imports.length; i++) {
            // Skip pulled imports and legacy descriptors
            if (typeof imports[i] !== 'string' || (util.isDescriptor(imports[i]) && !options.legacy))
                continue;
            // Merge imports, try include paths
            (function() {
                var path = options.path || [];
                for (var j=0; j<path.length; ++j) {
                    var import_filename = node_path.resolve(path[j] + "/", imports[i]);
                    if (!fs.existsSync(import_filename))
                        continue;
                    imports[i] = proto.load(import_filename, options, loaded);
                    return;
                }
                throw Error("File not found: "+imports[i]);
            })();
        }
    }
    return data;
};
