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
var description = "Runtime structures";

var util = require("../util.js"),
    json = require("./json.js");

/**
 * pbjs target: Runtime structures
 * @exports pbjs/targets/js
 * @function
 * @param {!ProtoBuf.Builder} builder Builder
 * @param {!Object.<string,*>=} options Options
 * @returns {string}
 */
var js = module.exports = function(builder, options) {
    options = options || {};
    var varName = "_root";
    if (options.exports)
        varName = options.exports.substring(options.exports.lastIndexOf(".")+1);
    return [
        "var ", varName, options.min ? "=" : " = ", options.dependency || "dcodeIO.ProtoBuf",
        js.build(builder, options)
    ].join('');
};

/**
 * Builds the core js target.
 * @param {!ProtoBuf.Builder} builder Builder
 * @param {!Object.<string,*>=} options Options
 * @returns {string}
 */
js.build = function(builder, options) {
    options = options || {};
    return [
        ".newBuilder(",
        JSON.stringify(util.getBuilderOptions(options, "use"), null, options.min ? 0 : 4),
        ")['import'](",
        json(builder, options),
        ").build(",
        options.exports === 'string' ? JSON.stringify(options.exports.split(".")) : "",
        ");"
    ].join('');
};

/**
 * Module description.
 * @type {string}
 */
js.description = description;
