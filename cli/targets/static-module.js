"use strict";
module.exports = static_module_target;

// - The default wrapper supports AMD, CommonJS and the global scope (as window.root), in this order.
// - You can specify a custom wrapper with the --wrap argument.
// - CommonJS modules depend on the minimal static runtime for reduced package size with browserify.
// - AMD and global scope depend on the full library for now.

var path = require("path"),
    fs   = require("fs");

var protobuf = require("../..");

static_module_target.description = "Static code without reflection as a module (AMD, CommonJS, global)";

function static_module_target(root, options, callback) {
    if (options.wrap)
        options.wrap = path.resolve(process.cwd(), options.wrap);
    else
        options.wrap = path.join(__dirname, "static-module.tpl");
    try {
        var wrap = fs.readFileSync(options.wrap).toString("utf8");
        require("./static")(root, options, function(err, output) {
            if (err)
                return callback(err);
            callback(null, wrap.replace(/%OUTPUT%/, output.replace(/^(?!$)/mg, "    ")));
        });
    } catch (err) {
        callback(err);
    }
}
