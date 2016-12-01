module.exports = static_target;

static_target.private = true;

// This file contains the beginnings of static code generation.
// It doesn't generate anything useful, yet, but can be used as a starting point.

// TBD:
// - Generate a single file or scaffold an entire project directory? Both?
// - Targets: ES5, ES6, TypeScript? CommonJS? AMD?
// - Is there a need for a minimal runtime composed only of Reader/Writer/minimal util?
// - What about generating comments and typescript definitions for non-ts targets?

var protobuf = require("../..");

var Type      = protobuf.Type,
    Service   = protobuf.Service,
    Enum      = protobuf.Enum,
    Namespace = protobuf.Namespace,
    codegen   = protobuf.util.codegen;

var out = [];

function static_target(root, options, callback) {
    tree = {};
    try {
        out.push("var protobuf = require(\"protobufjs\");");
        out.push("var root = exports;");
        buildNamespace("root", root);
        callback(null, out.join('\n'));
    } catch (err) {
        callback(err);
    } finally {
        out = [];
    }
}

function buildNamespace(ref, ns) {
    if (!ns)
        return;
    ns.nestedArray.forEach(function(nested) {
        if (nested instanceof Type)
            buildType(ref, nested);
        else if (nested instanceof Service)
            buildService(ref, nested);
        else if (nested instanceof Enum)
            buildEnum(ref, nested);
        else if (nested instanceof Namespace)
            buildNamespace(ref, nested);
    });
}

function buildType(ref, type) {
    out.push("");
    out.push(ref + "." + type.name + " = function " + type.name + "() {};"); // currently just an empty function
    buildNamespace(ref + "." + type.name, type);
}

function buildService(ref, service) {
    out.push("");
    out.push(ref + "." + service.name + " = {};"); // currently just an empty object
}

function buildEnum(ref, enm) {
    out.push("");
    out.push(ref + "." + enm.name + " = " + JSON.stringify(enm.values, null, "\t") + ";");
}
