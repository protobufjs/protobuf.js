"use strict";
module.exports = static_target;

// - Static code does not have any reflection or JSON features.

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

static_target.description = "Static code without reflection";

function static_target(root, options, callback) {
    try {
        push("// Lazily resolved type references");
        push("var $lazyTypes = [];");
        push("");
        push("// Exported root namespace");
        push("var $root = {};");
        buildNamespace(null, root);
        push("");
        push("// Resolve lazy types");
        push("$lazyTypes.forEach(function(types) {");
            ++indent;
            push("types.forEach(function(path, i) {");
                ++indent;
                push("if (!path)");
                    ++indent;
                    push("return;");
                    --indent;
                push("path = path.split('.');");
                push("var ptr = $root;");
                push("while (path.length)");
                    ++indent;
                    push("ptr = ptr[path.shift()];");
                    --indent;
                push("types[i] = ptr;");
                --indent;
            push("});");
            --indent;
        push("});");
        callback(null, out.join('\n'));
    } catch (err) {
        callback(err);
    } finally {
        out = [];
        indent = 0;
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
    if (ns.name !== "") {
        push("");
        push("/** @alias " + ns.fullName.substring(1) + " */");
        push(name(ref) + "." + name(ns.name) + " = (function() {");
        ++indent;
    }

    if (ns instanceof Type) {
        buildType(undefined, ns);
    } else if (ns instanceof Service)
        buildService(undefined, ns);
    else if (ns.name !== "") {
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
    if (ns.name !== "") {
        push("");
        push("return " + name(ns.name) + ";");
        --indent;
        push("})();");
    }
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
    var fullName = service.fullName.substring(1);

    push("");
    pushComment([
        "Constructs a new " + service.name + ".",
        "@exports " + fullName,
        "@constructor",
        "@param {function(function, Uint8Array, function)} rpc RPC implementation",
        "@param {boolean} [requestDelimited=false] Whether requests are length-delimited",
        "@param {boolean} [responseDelimited=false] Whether responses are length-delimited"
    ]);
    push("function " + name(service.name) + "(rpc, requestDelimited, responseDelimited) {");
    ++indent;
    push("");
    pushComment([
        "RPC implementation.",
        "@type {function(function, Uint8Array, function)}"
    ]);
    push("this.rpc = rpc;");
    push("");
    pushComment([
        "Whether requests are length-delimited.",
        "@type {boolean}"
    ]);
    push("this.requestDelimited = Boolean(requestDelimited);");
    push("");
    pushComment([
        "Whether responses are length-delimited.",
        "@type {boolean}"
    ]);
    push("this.responseDelimited = Boolean(responseDelimited);");
    --indent;
    push("};");
    service.getMethodsArray().forEach(function(method) {
        method.resolve();
        var lcName = method.name.substring(0, 1).toLowerCase() + method.name.substring(1);
        push("");
        pushComment([
            "Calls " + method.name + ".",
            "@param {" + method.resolvedRequestType.fullName.substring(1) + "|Object} request " + method.resolvedRequestType.name + " or plain object",
            "@param {function(?Error, " + method.resolvedResponseType.fullName.substring(1) + "=)} callback Node-style callback called with the error, if any, and " + method.resolvedResponseType.name,
            "@returns {undefined}"
        ]);
        push(name(service.name) + ".prototype." + name(lcName) + " = function " + name(lcName) + "(request, callback) {");
            ++indent;
            push("var requestData;");
            push("try {");
                ++indent;
                push("requestData = (this.requestDelimited && $root" + name(method.resolvedRequestType.fullName) + ".encodeDelimited(request) || $root" + name(method.resolvedRequestType.fullName) + ".encode(request)).finish();");
                --indent;
            push("} catch (err) {");
                ++indent;
                push("(typeof setImmediate === 'function' && setImmediate || setTimeout)(function() { callback(err); });");
                push("return;");
                --indent;
            push("}");
            push("var self = this;");
            push("this.rpc(" + name(lcName) + ", requestData, function(err, responseData) {");
                ++indent;
                push("if (err) {");
                    ++indent;
                    push("callback(err);");
                    push("return;");
                    --indent;
                push("}");
                push("var response;");
                push("try {");
                    ++indent;
                    push("response = self.responseDelimited && $root" + name(method.resolvedResponseType.fullName) + ".decodeDelimited(responseData) || $root" + name(method.resolvedResponseType.fullName) + ".decode(responseData);");
                    --indent;
                push("} catch (err2) {");
                    ++indent;
                    push("callback(err2);");
                    push("return;");
                    --indent;
                push("}");
                push("callback(null, response);");
                --indent;
            push("});");
        --indent;
        push("};");
    });
}

function buildEnum(ref, enm) {
    push("");
    pushComment([
        enm.name + " values.",
        "@exports " + enm.fullName.substring(1),
        "@type {Object.<string,number>}"
    ]);
    push(name(ref) + "." + name(enm.name) + " = {");
    push("");
    ++indent;
    var keys = Object.keys(enm.values);
    for (var i = 0; i < keys.length; ++i) {
        push(name(keys[i]) + ": " + enm.values[keys[i]].toString(10) + (i < keys.length - 1 ? "," : ""));
    }
    --indent;
    push("};");
}
