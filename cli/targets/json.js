"use strict";
module.exports = json_target;

var protobuf = require("../..");

json_target.description = "JSON representation"

function json_target(root, options, callback) {
    callback(null, JSON.stringify(root, null, 2));    
}
