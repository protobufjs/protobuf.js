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
    fs = require("fs");

/**
 * pbjs source: Plain .proto descriptor
 * @exports pbjs/sources/proto
 * @function
 * @param {string} filename Source file
 * @param {!Object.<string,*>=} options Options
 * @returns {!ProtoBuf.Builder}
 */
var proto = module.exports = function(filename, options) {
    options = options || [];
    var builder = ProtoBuf.newBuilder(util.getBuilderOptions(options, "using")),
        data = proto.load(filename, options);
    ProtoBuf.loadJson(data, builder, filename);
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
 * @returns {*} JSON descriptor
 */
proto.load = function(filename, options) {
    var parser = new ProtoBuf.DotProto.Parser(fs.readFileSync(filename).toString("utf8")),
        data = parser.parse();
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
                    try {
                        imports[i] = proto.load(path[j]+"/"+imports[i], options);
                        return;
                    } catch (e) {}
                }
                throw Error("File not found: "+imports[i]);
            })();
        }
    }
    return data;
};
