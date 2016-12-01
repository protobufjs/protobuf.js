module.exports = static_target;

static_target.private = true;

// Currently, this file contains initial static code for CommonJS modules.

// TBD:
// - Generate a single file or scaffold an entire project directory? Both?
// - Targets: ES5, ES6, TypeScript? CommonJS? AMD?
// - What about generating typescript definitions for non-ts targets?

var protobuf = require("../..");

var Type      = protobuf.Type,
    Service   = protobuf.Service,
    Enum      = protobuf.Enum,
    Namespace = protobuf.Namespace,
    encoder   = protobuf.encoder,
    decoder   = protobuf.decoder,
    verifier  = protobuf.verifier,
    util      = protobuf.util;

var out = [];
var indent = 0;

function static_target(root, options, callback) {
    tree = {};
    try {
        buildNamespace("module.exports", root);
        callback(null, out.join('\n'));
    } catch (err) {
        callback(err);
    } finally {
        out = [];
    }
}

function push(line) {
    if (line === "")
        return out.push("");
    var ind = "";
    for (var i = 0; i < indent; ++i)
        ind += "    ";
    out.push(ind + line);
}

function pushComment(lines) {
    push("/**");
    lines.forEach(function(line, i) {
        push(" * " + line);
    });
    push(" */");
}

function name(name) {
    if (!name)
        return "$root";
    return name;
}

function buildNamespace(ref, ns) {
    if (!ns)
        return;
    if (ns.name === "") { // root
        push(name(ref) + " = (function() {");
        ++indent;
        push('"use strict";');
        push("");
        push("// Minimal static codegen runtime");
        push("var $runtime = require(\"protobufjs/runtime\");")
        push("");
        push("// Lazily resolved type references");
        push("var $lazyTypes = [];");
    } else {
        push("");
        push("/** @alias " + ns.fullName.substring(1) + " */");
        push(name(ref) + "." + name(ns.name) + " = (function() {");
        ++indent;
    }

    if (ns instanceof Type) {
        buildType(undefined, ns);
    } else if (ns instanceof Service)
        buildService(undefined, ns);
    else {
        push("");
        push("/** @alias " + (ns.name && ns.fullName.substring(1) || "exports") + " */");
        push("var " + name(ns.name) + " = {};");
    }

    ns.nestedArray.forEach(function(nested) {
        if (nested instanceof Enum)
            buildEnum(ns.name, nested);
        else if (nested instanceof Namespace)
            buildNamespace(ns.name, nested);
    });
    push("");
    if (ns.name === "") // root
        push("return $runtime.resolve($root, $lazyTypes);");
    else
        push("return " + name(ns.name) + ";");
    --indent;
    push("})();");
}

function buildFunction(type, functionName, gen, scope) {
    var lines = gen.str(functionName)
    .replace("(this.getCtor())", " $root" + type.fullName)
    .split(/\n/g);
    push(name(type.name) + "." + functionName + " = (function() {");
    ++indent;
    push("/* eslint-disable */");
    Object.keys(scope).forEach(function(key) {
        push("var " + key + " = " + scope[key] + ";");
    });
    push("var types; $lazyTypes.push(types = [" + type.fieldsArray.map(function(field) {
        return field.resolve().resolvedType
            ? JSON.stringify(field.resolvedType.fullName.substring(1))
            : "null";
    }).join(',') + "]);");
    push("return " + lines[0]);
    lines.slice(1).forEach(function(line) {
        if (line === '\t"use strict"')
            return;
        var prev = indent;
        var i = 0;
        while (line.charAt(i++) === "\t")
            ++indent;
        push(line.trim());
        indent = prev;
    });
    push("/* eslint-enable */");
    --indent;
    push("})();");
}

function buildType(ref, type) {
    var fullName = type.fullName.substring(1);

    push("");
    pushComment([
        "Constructs a new " + type.name + ".",
        "@exports " + fullName,
        "@constructor",
        "@param {Object} [properties] Properties to set"
    ]);
    push("function " + name(type.name) + "(properties) {");
    ++indent;
    push("if (properties) {");
    ++indent;
    push("var keys = Object.keys(properties);");
    push("for (var i = 0; i < keys.length; ++i)");
    ++indent;
    push("this[keys[i]] = properties[keys[i]];");
    --indent;
    --indent;
    push("}");
    --indent;
    push("}");
    push("");
    type.fieldsArray.forEach(function(field) {
        field.resolve();
        if (typeof field.defaultValue === 'object' && field.defaultValue)
            return;
        push(name(type.name) + ".prototype." + name(field.name) + " = " +JSON.stringify(field.defaultValue) + ";");
    });
    
    // #encode
    push("");
    pushComment([
        "Encodes the specified " + type.name + ".",
        "@function",
        "@param {" + fullName + "|Object} message " + type.name + " or plain object to encode",
        "@param {Writer} [writer] Writer to encode to",
        "@returns {Writer} Writer"
    ]);
    buildFunction(type, "encode", encoder.generate(type), {
        Writer : "$runtime.Writer",
        util   : "$runtime.util"
    });

    // #encodeDelimited
    push("");
    pushComment([
        "Encodes the specified " + type.name + ", length delimited.",
        "@param {" + fullName + "|Object} message " + type.name + " or plain object to encode",
        "@param {Writer} [writer] Writer to encode to",
        "@returns {Writer} Writer"
    ]);
    push(name(type.name) + ".encodeDelimited = function encodeDelimited(message, writer) {");
    ++indent;
    push("return this.encode(message, writer).ldelim();");
    --indent;
    push("};");

    // #decode
    push("");
    pushComment([
        "Decodes a " + type.name + " from the specified reader or buffer.",
        "@function",
        "@param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from",
        "@param {number} [length] Message length if known beforehand",
        "@returns {" + fullName + "} " + type.name
    ]);
    buildFunction(type, "decode", decoder.generate(type), {
        Reader : "$runtime.Reader",
        util   : "$runtime.util"
    });

    // #decodeDelimited
    push("");
    pushComment([
        "Decodes a " + type.name + " from the specified reader or buffer, length delimited.",
        "@param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from",
        "@returns {" + fullName + "} " + type.name
    ]);
    push(name(type.name) + ".decodeDelimited = function decodeDelimited(readerOrBuffer) {");
    ++indent;
    push("readerOrBuffer = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader(readerOrBuffer);");
    push("return this.decode(readerOrBuffer, readerOrBuffer.uint32());");
    --indent;
    push("};");

    // #verify
    push("");
    pushComment([
        "Verifies a " + type.name + ".",
        "@param {" + fullName + "|Object} message " + type.name + " or plain object to verify",
        "@returns {?string} `null` if valid, otherwise the reason why it is not"
    ]);
    buildFunction(type, "verify", verifier.generate(type), {});
}

function buildService(ref, service) {
    push("");
    push(name(ref) + "." + name(service.name) + " = {};"); // currently just an empty object
}

function buildEnum(ref, enm) {
    push("");
    push(ref + "." + enm.name + " = {");
    ++indent;
    push("");
    Object.keys(enm.values).forEach(function(key) {
        push(name(key) + ": " + enm.values[key].toString(10) + ",");
    });
    --indent;
    push("};");
}
