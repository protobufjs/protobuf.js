"use strict";
module.exports = json_module;

var path = require("path"),
    fs   = require("fs");

var protobuf = require("../..");

json_module.description = "JSON representation as a module (AMD, CommonJS, global)"

function json_module(root, options, callback) {
    if (options.wrap)
        options.wrap = path.resolve(process.cwd(), options.wrap);
    else
        options.wrap = path.join(__dirname, "json-module.tpl");
    var wrap = fs.readFileSync(options.wrap).toString("utf8");
    callback(null, wrap.replace(/%OUTPUT%/, JSON.stringify(root, null, 2).replace(/^(?!$)/mg, "    ").trim()));    
}
