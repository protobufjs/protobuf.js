"use strict";
module.exports = json_module;

var util = require("../util");

var protobuf = require("protobufjs");

var Type      = protobuf.Type,
    Service   = protobuf.Service,
    Enum      = protobuf.Enum,
    Namespace = protobuf.Namespace;

json_module.description = "JSON bundle as a module";
json_module.defaultExportDoc =
    "/**\n" +
    " * Reflected root namespace.\n" +
    " * @type {$protobuf.Root}\n" +
    " */\n";

function jsonSafeProp(json) {
    return json.replace(/^( +)"(\w+)":/mg, function($0, $1, $2) {
        return protobuf.util.safeProp($2).charAt(0) === "."
            ? $1 + $2 + ":"
            : $0;
    });
}

function escapeName(name) {
    if (!name)
        return "$root";
    name = name.replace(/\W/g, "");
    if (!name)
        return "_";
    if (/^\d/.test(name))
        name = "_" + name;
    return protobuf.util.patterns.reservedRe.test(name) ? name + "_" : name;
}

function json_module(root, options, callback) {
    try {
        var rootProp = protobuf.util.safeProp(options.root || "default");
        var output = [
            (options.es6 ? "const" : "var") + " $root = ($protobuf.roots" + rootProp + " || ($protobuf.roots" + rootProp + " = new $protobuf.Root()))\n"
        ];
        if (root.options) {
            var optionsJson = jsonSafeProp(JSON.stringify(root.options, null, 2));
            output.push(".setOptions(" + optionsJson + ")\n");
        }
        var json = jsonSafeProp(JSON.stringify(root.nested, null, 2).trim());
        output.push(".addJSON(" + json + ");");

        // Add ES module named exports for top-level reflected symbols
        if (util.isEsmWrapper(options.wrap) && root.nestedArray) {
            var exports = [],
                seenExportNames = new Set();
            root.nestedArray.forEach(function(nested) {
                if (nested instanceof Service && !options.service)
                    return;
                if (!(nested instanceof Type || nested instanceof Service || nested instanceof Enum || nested instanceof Namespace))
                    return;

                var exportName = escapeName(nested.name);
                if (seenExportNames.has(exportName))
                    return;
                seenExportNames.add(exportName);

                var suffix = nested instanceof Enum ? ".values" : "";
                exports.push("export const " + exportName + " = $root.get(" + JSON.stringify(nested.name) + ")" + suffix + ";");
            });
            if (exports.length)
                output.push("\n" + exports.join("\n"));
        }

        output = util.wrap(output.join(""), protobuf.util.merge({
            dependency: util.isEsmWrapper(options.wrap)
                ? "protobufjs/light.js"
                : "protobufjs/light",
            defaultExport: options.comments !== false
                ? json_module.defaultExportDoc
                : undefined
        }, options));

        process.nextTick(function() {
            callback(null, output);
        });
    } catch (e) {
        return callback(e);
    }
    return undefined;
}
