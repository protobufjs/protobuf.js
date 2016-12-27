"use strict";
module.exports = static_target;

// - Static code does not have any reflection or JSON features.

var protobuf = require("../.."),
    cliUtil  = require("../util");

var Type      = protobuf.Type,
    Service   = protobuf.Service,
    Enum      = protobuf.Enum,
    Namespace = protobuf.Namespace,
    util      = protobuf.util;

var out = [];
var indent = 0;
var config = {};
var firstService = true;

static_target.description = "Static code without reflection";

function static_target(root, options, callback) {
    config = options;
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
        return callback(null, out.join("\n"));
    } catch (err) {
        return callback(err);
    } finally {
        out = [];
        indent = 0;
        config = {};
        firstService = true;
    }
}

function push(line) {
    if (line === "")
        return out.push("");
    var ind = "";
    for (var i = 0; i < indent; ++i)
        ind += "    ";
    return out.push(ind + line);
}

function pushComment(lines) {
    push("/**");
    lines.forEach(function(line) {
        push(" * " + line);
    });
    push(" */");
}

function name(name) {
    if (!name)
        return "$root";
    return cliUtil.reserved(name) ? name + "_" : name;
}

// generate dot-notation property accessors where possible. this saves a few chars (i.e. m.hello
// instead of m["hello"]) but has no measurable performance impact (on V8). not present within the
// library itself because the reserved words check requires a rather longish regex.
util.safeProp = (function(safeProp) {
    return function safeProp_dn(name) {
        return /^[$\w]+$/.test(name) && cliUtil.reserved(name)
            ? safeProp(name)
            : "." + name;
    }
})(util.safeProp);

function buildNamespace(ref, ns) {
    if (!ns)
        return;
    if (ns.name !== "") {
        push("");
        push(name(ref) + "." + name(ns.name) + " = (function() {");
        ++indent;
    }

    if (ns instanceof Type) {
        buildType(undefined, ns);
    } else if (ns instanceof Service)
        buildService(undefined, ns);
    else if (ns.name !== "") {
        push("");
        pushComment([
            "Namespace " + ns.name + ".",
            "@exports " + ns.fullName.substring(1),
            "@namespace"
        ]);
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
    }).join(",") + "]);");
    push("return " + lines[0]);
    lines.slice(1).forEach(function(line) {
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

    if (type.fieldsArray.length || type.oneofsArray.length) {
        push("");
        push("/** @alias " + fullName + ".prototype */");
        push("var $prototype = " + name(type.name) + ".prototype;");
    }

    // default values
    type.fieldsArray.forEach(function(field) {
        field.resolve();
        var jsType;
        switch (field.type) {
            case "double":
            case "float":
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32":
                jsType = "number";
                break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
                jsType = "number|Long";
                break;
            case "bool":
                jsType = "boolean";
                break;
            case "string":
                jsType = "string";
                break;
            case "bytes":
                jsType = "Uint8Array";
                break;
            default:
                if (field.resolvedType instanceof Enum) {
                    jsType = "number";
                } else if (field.resolvedType instanceof Type) {
                    jsType = field.resolvedType.fullName.substring(1);
                } else {
                    jsType = "*"; // should not happen
                }
                break;
        }
        if (field.repeated)
            jsType = "Array.<" + jsType + ">";
        push("");
        pushComment([
            type.name + " " + field.name + ".",
            "@name " + fullName + "#" + name(field.name),
            "@type {" + jsType + "}"
        ]);
        if (Array.isArray(field.defaultValue)) {
            push("$prototype[" + JSON.stringify(field.name) + "] = $protobuf.util.emptyArray;");
        } else if (util.isObject(field.defaultValue))
            push("$prototype[" + JSON.stringify(field.name) + "] = $protobuf.util.emptyObject;");
        else
            push("$prototype[" + JSON.stringify(field.name) + "] = " + JSON.stringify(field.defaultValue) + ";");
    });

    // virtual oneof fields
    type.oneofsArray.forEach(function(oneof) {
        oneof.resolve();
        push("");
        pushComment([
            type.name + " " + oneof.name + ".",
            "@name " + fullName + "#" + name(oneof.name),
            "@type {string|undefined}"
        ]);
        push("$protobuf.util.prop($prototype, " + JSON.stringify(oneof.name) +", {");
        ++indent;
            push("get: function getVirtual() {");
            ++indent;
            oneof.oneof.forEach(function(name) {
                push("if (this[" + JSON.stringify(name) + "] !== undefined)");
                ++indent;
                    push("return " + JSON.stringify(name) + ";");
                --indent;
            });
            push("return undefined;");
            --indent;
            push("},");
            push("set: function setVirtual(value) {");
            ++indent;
            oneof.oneof.forEach(function(name) {
                push("if (value !== " + JSON.stringify(name) + ")");
                ++indent;
                    push("delete this[" + JSON.stringify(name) + "];");
                --indent;
            });
            --indent;
            push("}");
        --indent;
        push("});");
    });

    if (config.create) {
        push("");
        pushComment([
            "Creates a new " + type.name + " instance using the specified properties.",
            "@param {Object} [properties] Properties to set",
            "@returns {" + fullName + "} " + type.name + " instance"
        ]);
        push(name(type.name) + ".create = function create(properties) {");
            ++indent;
            push("return new " + name(type.name) + "(properties);");
            --indent;
        push("};");
    }

    
    if (config.encode) {
        push("");
        pushComment([
            "Encodes the specified " + type.name + ".",
            "@function",
            "@param {" + fullName + "|Object} message " + type.name + " or plain object to encode",
            "@param {Writer} [writer] Writer to encode to",
            "@returns {Writer} Writer"
        ]);
        buildFunction(type, "encode", protobuf.encoder(type), {
            Writer : "$protobuf.Writer",
            util   : "$protobuf.util"
        });

        if (config.delimited) {
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

        }

    }

    if (config.decode) {
        push("");
        pushComment([
            "Decodes a " + type.name + " from the specified reader or buffer.",
            "@function",
            "@param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from",
            "@param {number} [length] Message length if known beforehand",
            "@returns {" + fullName + "} " + type.name
        ]);
        buildFunction(type, "decode", protobuf.decoder(type), {
            Reader : "$protobuf.Reader",
            util   : "$protobuf.util"
        });

        if (config.delimited) {
            push("");
            pushComment([
                "Decodes a " + type.name + " from the specified reader or buffer, length delimited.",
                "@param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from",
                "@returns {" + fullName + "} " + type.name
            ]);
            push(name(type.name) + ".decodeDelimited = function decodeDelimited(readerOrBuffer) {");
            ++indent;
            push("readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);");
            push("return this.decode(readerOrBuffer, readerOrBuffer.uint32());");
            --indent;
            push("};");

        }
    }

    if (config.verify) {
        push("");
        pushComment([
            "Verifies a " + type.name + ".",
            "@function",
            "@param {" + fullName + "|Object} message " + type.name + " or plain object to verify",
            "@returns {?string} `null` if valid, otherwise the reason why it is not"
        ]);
        buildFunction(type, "verify", protobuf.verifier(type), {
            util : "$protobuf.util"
        });

    }
}

function buildService(ref, service) {
    var fullName = service.fullName.substring(1);

    if (firstService) {
        firstService = false;

        push("");
        pushComment([
             "RPC implementation passed to services performing a service request on network level, i.e. by utilizing http requests or websockets.",
             "@typedef RPCImpl",
             "@type {function}",
             "@param {Method} method Reflected method being called",
             "@param {Uint8Array} requestData Request data",
             "@param {RPCCallback} callback Callback function",
             "@returns {undefined}"
        ]);

        push("");
        pushComment([
             "Node-style callback as used by {@link RPCImpl}.",
             "@typedef RPCCallback",
             "@type {function}",
             "@param {?Error} error Error, if any, otherwise `null`",
             "@param {Uint8Array} [responseData] Response data or `null` to signal end of stream, if there hasn't been an error",
             "@returns {undefined}"
        ]);
    }

    push("");
    pushComment([
        "Constructs a new " + service.name + ".",
        "@exports " + fullName,
        "@constructor",
        "@param {RPCImpl} rpc RPC implementation",
        "@param {boolean} [requestDelimited=false] Whether requests are length-delimited",
        "@param {boolean} [responseDelimited=false] Whether responses are length-delimited"
    ]);
    push("function " + name(service.name) + "(rpc, requestDelimited, responseDelimited) {");
    ++indent;
    
    push("");
    pushComment([
        "RPC implementation.",
        "@type {RPCImpl}"
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
        var cbName = name(service.name) + "_" + name(lcName) + "_Callback";
        pushComment([
            "Callback as used by {@link " + name(service.name) + "#" + name(lcName) + "}.",
            "@typedef " + cbName,
            "@type {function}",
            "@param {?Error} error Error, if any",
            "@param {" + method.resolvedResponseType.fullName.substring(1) + "} [response] " + method.resolvedResponseType.name
        ]);
        push("");
        pushComment([
            "Calls " + method.name + ".",
            "@param {" + method.resolvedRequestType.fullName.substring(1) + "|Object} request " + method.resolvedRequestType.name + " or plain object",
            "@param {" + cbName + "} callback Node-style callback called with the error, if any, and " + method.resolvedResponseType.name,
            "@returns {undefined}"
        ]);
        push(name(service.name) + ".prototype[" + JSON.stringify(lcName) + "] = function " + name(lcName) + "(request, callback) {");
            ++indent;
            push("var requestData;");
            push("try {");
                ++indent;
                push("requestData = (this.requestDelimited ? $root" + name(method.resolvedRequestType.fullName) + ".encodeDelimited(request) : $root" + name(method.resolvedRequestType.fullName) + ".encode(request)).finish();");
                --indent;
            push("} catch (err) {");
                ++indent;
                push("(typeof setImmediate === 'function' ? setImmediate : setTimeout)(function() { callback(err); });");
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
                    push("response = self.responseDelimited ? $root" + name(method.resolvedResponseType.fullName) + ".decodeDelimited(responseData) : $root" + name(method.resolvedResponseType.fullName) + ".decode(responseData);");
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
