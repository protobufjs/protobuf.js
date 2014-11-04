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
var description = "Plain JSON descriptor";

var ProtoBuf = require(__dirname+"/../../../index.js"),
    util = require(__dirname+"/../util.js"),
    fs = require("fs");

/**
 * pbjs source: Plain JSON descriptor
 * @exports pbjs/sources/json
 * @function
 * @param {string} filename Source file
 * @param {!Object.<string,*>=} options Options
 * @returns {!ProtoBuf.Builder}
 */
var json = module.exports = function(filename, options) {
    options = options || [];
    var builder = ProtoBuf.newBuilder(util.getBuilderOptions(options, "using")),
        data = json.load(filename, options);
    ProtoBuf.loadJson(data, builder, filename);
    return builder;
};

/**
 * Module description.
 * @type {string}
 */
json.description = description;

/**
 * Loads a JSON descriptor including imports.
 * @param {string} filename Source file
 * @param {!Object.<string,*>} options Options
 * @returns {*} JSON descriptor
 */
json.load = function(filename, options) {
    var data = JSON.parse(fs.readFileSync(filename).toString("utf8")),
        imports = data['imports'];
    if (Array.isArray(imports)) {
        for (var i=0; i<imports.length; ++i) {
            // Skip pulled imports and legacy descriptors
            if (typeof imports[i] !== 'string' || (util.isDescriptor(imports[i]) && !options.legacy))
                continue;
            // Merge imports, try include paths
            (function() {
                var path = options.path || [];
                for (var j=0; j<path.length; ++j) {
                    try {
                        imports[i] = json.load(path[j]+"/"+imports[i], options);
                        return;
                    } catch (e) {}
                }
                throw Error("File not found: "+imports[i]);
            })();
        }
    }
    return data;
};
