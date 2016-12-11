"use strict";
module.exports = json_module;

var path = require("path"),
    fs   = require("fs"),
    util = require("../util");

var protobuf = require("../..");

json_module.description = "JSON representation as a module (AMD, CommonJS, global)"

function json_module(root, options, callback) {
    try {
        var output = JSON.stringify(root, null, 2).replace(/^(?!$)/mg, "    ").trim();
        output = util.wrap(options.wrap || "json-module", output, options.root);
        process.nextTick(function() {
            callback(null, output);
        });
    } catch (e) {
        callback(e);
    }
}
