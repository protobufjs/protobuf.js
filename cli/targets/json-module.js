"use strict";
module.exports = json_module;

var util = require("../util");

json_module.description = "JSON representation as a module"

function json_module(root, options, callback) {
    try {
        var output = "var $root = protobuf.Root.fromJSON(" + JSON.stringify(root, null, 2).replace(/^(?!$)/mg, "    ").trim() + ");";
        output = util.wrap(output, options);
        process.nextTick(function() {
            callback(null, output);
        });
    } catch (e) {
        return callback(e);
    }
    return undefined;
}
