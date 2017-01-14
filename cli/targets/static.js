"use strict";
module.exports = static_target;

var protobuf = require("../.."),
    cliUtil  = require("../util"),
    UglifyJS = require("uglify-js");

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
        if (config.comments)
            push("// Lazily resolved type references");
        push("var $lazyTypes = [];");
        push("");
        if (config.comments) {
            if (root.comment)
                pushComment("@fileoverview " + root.comment);
            else
                push("// Exported root namespace");
        }
        push("var $root = {};");
        buildNamespace(null, root);
        push("");
        if (config.comments)
            push("// Resolve lazy types");
        push("$lazyTypes.forEach(function(types) {");
            ++indent;
            push("types.forEach(function(path, i) {");
                ++indent;
                push("if (!path)");
                    ++indent;
                    push("return;");
                    --indent;
                push("path = path.split(\".\");");
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
    if (!config.comments)
        return;
    var split = [];
    for (var i = 0; i < lines.length; ++i)
        if (lines[i] !== null && lines[i].substring(0, 8) !== "@exclude")
            Array.prototype.push.apply(split, lines[i].split(/\r?\n/g));
    push("/**");
    split.forEach(function(line) {
        if (line === null)
            return;
        push(" * " + line.replace(/\*\//g, "* /"));
    });
    push(" */");
}

function name(name) {
    if (!name)
        return "$root";
    return cliUtil.reserved(name) ? name + "_" : name;
}

function aOrAn(name) {
    return ((/^[hH](?:ou|on|ei)/.test(name) || /^[aeiouAEIOU][a-z]/.test(name)) && !/^us/i.test(name)
        ? "an "
        : "a ") + name;
}

// generate dot-notation property accessors where possible. this saves a few chars (i.e. m.hello
// instead of m["hello"]) but has no measurable performance impact (on V8). not present within the
// library itself because the reserved words check requires a rather longish regex.
util.safeProp = (function(safeProp) {
    return function safeProp_dn(name) {
        return !/^[$\w]+$/.test(name) || cliUtil.reserved(name)
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
            ns.comment || "Namespace " + ns.name + ".",
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

function beautify(code) {
    return UglifyJS.minify(code
        .replace(/\b(?!\\)r\b/g, "reader")
        .replace(/\b(?!\\)w\b/g, "writer")
        .replace(/\b(?!\\)m\b/g, "message")
        .replace(/\b(?!\\)t\b/g, "tag")
        .replace(/\b(?!\\)l\b/g, "len")
        .replace(/\b(?!\\)c\b/g, "end")
        .replace(/\b(?!\\)c2\b/g, "end2")
        .replace(/\b(?!\\)k\b/g, "key")
        .replace(/\b(?!\\)ks\b/g, "keys")
        .replace(/\b(?!\\)ks2\b/g, "keys2")
        .replace(/\b(?!\\)e\b/g, "err")
        .replace(/\b(?!\\)f\b/g, "impl")
        .replace(/\b(?!\\)o\b/g, "options")
        .replace(/\b(?!\\)d\b/g, "object")
        .replace(/\b(?!\\)n\b/g, "long"),
        {
            fromString: true,
            compress: false,
            mangle: false,
            output: {
                beautify: true,
                bracketize: true
            }
        }
    ).code.replace(/ {4}/g, "\t");
}

function buildFunction(type, functionName, gen, scope) {
    var code = gen.str(functionName)
        .replace(/\(this.ctor\)/g, " $root" + type.fullName) // types: construct directly instead of using reflected ctor
        .replace(/(types\[\d+])(\.values)/g, "$1"); // enums: use types[N] instead of reflected types[N].values

    if (config.beautify)
        code = beautify(code);

    // remove unused scope vars
    Object.keys(scope).forEach(function(key) {
        if (!new RegExp("\\b(" + key + ")\\b", "g").test(code))
            delete scope[key];
    });

    // enclose all but the first and last line in an iife returning our properly scoped function
    var lines = code.split(/\n/g);
    push(name(type.name) + "." + functionName + " = (function(" + Object.keys(scope).join(", ") + ") { return " + lines[0]);
    lines.slice(1, lines.length - 1).forEach(function(line) {
        var prev = indent;
        var i = 0;
        while (line.charAt(i++) === "\t")
            ++indent;
        push(line.trim());
        indent = prev;
    });
    push("};})(" + Object.keys(scope).map(function(key) { return scope[key]; }).join(", ") + ");");
}

function toJsType(field) {
    switch (field.type) {
        case "double":
        case "float":
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
            return "number";
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
            return "number|$protobuf.Long";
        case "bool":
            return "boolean";
        case "string":
            return "string";
        case "bytes":
            return "Uint8Array";
        default:
            if (field.resolvedType instanceof Enum)
                return "number";
            if (field.resolvedType instanceof Type)
                return field.resolvedType.fullName.substring(1);
            return "*"; // should not happen
    }
}

function buildType(ref, type) {
    var fullName = type.fullName.substring(1);

    push("");
    pushComment([
        "Constructs a new " + type.name + ".",
        type.comment ? "@classdesc " + type.comment : null,
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

    if (type.fieldsArray.length || type.oneofsArray.length || config.convert) {
        push("");
        if (config.comments)
            push("/** @alias " + fullName + ".prototype */");
        push("var $prototype = " + name(type.name) + ".prototype;");
    }

    // default values
    type.fieldsArray.forEach(function(field) {
        field.resolve();
        var jsType = toJsType(field);
        if (field.map)
            jsType = "Object.<string," + jsType + ">"; // keys are always strings
        else if (field.repeated)
            jsType = "Array.<" + jsType + ">";
        var prop = util.safeProp(field.name);
        if (config.comments) {
            push("");
            pushComment([
                field.comment || type.name + " " + field.name + ".",
                prop.charAt(0) !== "." ? "@name " + fullName + "#" + field.name : null,
                "@type {" + jsType + "}"
            ]);
        }
        if (field.repeated)
            push("$prototype" + prop + " = $protobuf.util.emptyArray;");
        else if (field.map)
            push("$prototype" + prop + " = $protobuf.util.emptyObject;");
        else if (field.long)
            push("$prototype" + prop + " = $protobuf.util.Long ? $protobuf.util.Long.fromBits("
                    + JSON.stringify(field.typeDefault.low) + ","
                    + JSON.stringify(field.typeDefault.high) + ","
                    + JSON.stringify(field.typeDefault.unsigned)
                + ") : " + field.typeDefault.toNumber(field.type.charAt(0) === "u") + ";");
        else if (field.bytes) {
            push("$prototype" + prop + " = $protobuf.util.newBuffer(" + JSON.stringify(Array.prototype.slice.call(field.typeDefault)) + ");");
        } else
            push("$prototype" + prop + " = " + JSON.stringify(field.typeDefault) + ";");
    });

    // virtual oneof fields
    var firstOneOf = true;;
    type.oneofsArray.forEach(function(oneof) {
        if (firstOneOf) {
            firstOneOf = false;
            push("");
            if (config.comments)
                push("// OneOf field names bound to virtual getters and setters");
            push("var $oneOfFields;");
        }
        oneof.resolve();
        push("");
        pushComment([
            oneof.comment || type.name + " " + oneof.name + ".",
            "@name " + fullName + "#" + name(oneof.name),
            "@type {string|undefined}"
        ]);
        push("Object.defineProperty($prototype, " + JSON.stringify(oneof.name) +", {");
        ++indent;
            push("get: $protobuf.util.oneOfGetter($oneOfFields = [" + oneof.oneof.map(JSON.stringify).join(", ") + "]),");
            push("set: $protobuf.util.oneOfSetter($oneOfFields)");
        --indent;
        push("});");
    });

    var hasTypes = false;
    var types = type.fieldsArray.map(function(field) {
        if (field.resolve().resolvedType) { // including enums!
            hasTypes = true;
            return JSON.stringify(field.resolvedType.fullName.substring(1));
        }
        return "null";
    }).join(", ");

    if (hasTypes && (config.encode || config.decode || config.verify || config.convert)) {
        push("");
        if (config.comments)
            push("// Referenced types");
        push("var $types = [" + types + "]; $lazyTypes.push($types);");
    }

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
            "Encodes the specified " + type.name + " message.",
            "@function",
            "@param {" + fullName + "|Object} message " + type.name + " message or plain object to encode",
            "@param {$protobuf.Writer} [writer] Writer to encode to",
            "@returns {$protobuf.Writer} Writer"
        ]);
        buildFunction(type, "encode", protobuf.encoder(type), {
            Writer : "$protobuf.Writer",
            util   : "$protobuf.util",
            types  : hasTypes ? "$types" : undefined
        });

        if (config.delimited) {
            push("");
            pushComment([
                "Encodes the specified " + type.name + " message, length delimited.",
                "@param {" + fullName + "|Object} message " + type.name + " message or plain object to encode",
                "@param {$protobuf.Writer} [writer] Writer to encode to",
                "@returns {$protobuf.Writer} Writer"
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
            "Decodes " + aOrAn(type.name) + " message from the specified reader or buffer.",
            "@function",
            "@param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from",
            "@param {number} [length] Message length if known beforehand",
            "@returns {" + fullName + "} " + type.name
        ]);
        buildFunction(type, "decode", protobuf.decoder(type), {
            Reader : "$protobuf.Reader",
            util   : "$protobuf.util",
            types  : hasTypes ? "$types" : undefined
        });

        if (config.delimited) {
            push("");
            pushComment([
                "Decodes " + aOrAn(type.name) + " message from the specified reader or buffer, length delimited.",
                "@param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from",
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
            "Verifies " + aOrAn(type.name) + " message.",
            "@function",
            "@param {" + fullName + "|Object} message " + type.name + " message or plain object to verify",
            "@returns {?string} `null` if valid, otherwise the reason why it is not"
        ]);
        buildFunction(type, "verify", protobuf.verifier(type), {
            util  : "$protobuf.util",
            types : hasTypes ? "$types" : undefined
        });

    }

    if (config.convert) {
        push("");
        pushComment([
            "Creates " + aOrAn(type.name) + " message from a plain object. Also converts values to their respective internal types.",
            "@param {Object.<string,*>} object Plain object",
            "@returns {" + fullName + "} " + type.name
        ]);
        buildFunction(type, "fromObject", protobuf.converter.fromObject(type), {
            util  : "$protobuf.util",
            types : hasTypes ? "$types" : undefined
        });

        push("");
        pushComment([
            "Creates " + aOrAn(type.name) + " message from a plain object. Also converts values to their respective internal types.",
            "This is an alias of {@link " + fullName + ".fromObject}.",
            "@function",
            "@param {Object.<string,*>} object Plain object",
            "@returns {" + fullName + "} " + type.name
        ]);
        push(name(type.name) + ".from = " + name(type.name) + ".fromObject;");

        push("");
        pushComment([
            "Creates a plain object from " + aOrAn(type.name) + " message. Also converts values to other types if specified.",
            "@param {" + fullName + "} message " + type.name,
            "@param {$protobuf.ConversionOptions} [options] Conversion options",
            "@returns {Object.<string,*>} Plain object"
        ]);
        buildFunction(type, "toObject", protobuf.converter.toObject(type), {
            util  : "$protobuf.util",
            types : hasTypes ? "$types" : undefined
        });

        push("");
        pushComment([
            "Creates a plain object from this " + type.name + " message. Also converts values to other types if specified.",
            "@param {$protobuf.ConversionOptions} [options] Conversion options",
            "@returns {Object.<string,*>} Plain object"
        ]);
        push("$prototype.toObject = function toObject(options) {");
        ++indent;
            push("return this.constructor.toObject(this, options);");
        --indent;
        push("};");

        push("");
        pushComment([
            "Converts this " + type.name + " to JSON.",
            "@returns {Object.<string,*>} JSON object"
        ]);
        push("$prototype.toJSON = function toJSON() {");
        ++indent;
            push("return this.constructor.toObject(this, {");
            ++indent;
                push("longs: String,");
                push("enums: String,");
                push("bytes: String");
            --indent;
            push("});");
        --indent;
        push("};");
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
             "@param {$protobuf.Method} method Reflected method being called",
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
        "Constructs a new " + service.name + " service.",
        service.comment ? "@classdesc " + service.comment : null,
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
    push("}");

    service.methodsArray.forEach(function(method) {
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
            method.comment || "Calls " + method.name + ".",
            "@param {" + method.resolvedRequestType.fullName.substring(1) + "|Object} request " + method.resolvedRequestType.name + " message or plain object",
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
                push("(typeof setImmediate === \"function\" ? setImmediate : setTimeout)(function() { callback(err); });");
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
    var parentFullName = enm.parent.fullName.substring(1);
    push("");
    var comment = [
        enm.comment || enm.name + " enum.",
    ];
    if (parentFullName.length) // member
        comment.push(
            "@name " + name(enm.name),
            "@memberof " + parentFullName,
            "@enum {number}"
        );
    else // export
        comment.push(
            "@exports " + name(enm.name),
            "@enum {number}"
        );
    Object.keys(enm.values).forEach(function(key) {
        var val = enm.values[key];
        comment.push("@property {number} " + key + "=" + val + " " + (enm.comments[key] || key + " value"));
    });
    pushComment(comment);
    push(name(ref) + "." + name(enm.name) + " = (function() {");
    ++indent;
        push("var valuesById = {},");
        push("    values = Object.create(valuesById);");
        Object.keys(enm.values).forEach(function(key) {
            var val = enm.values[key];
            push("values[valuesById[" + val + "] = " + JSON.stringify(key) + "] = " + val + ";");
        });
        push("return values;");
    --indent;
    push("})();");
}
