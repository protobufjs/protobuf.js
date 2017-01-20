"use strict";
module.exports = static_target;

var protobuf   = require("../.."),
    cliUtil    = require("../util"),
    UglifyJS   = require("uglify-js"),
    esprima    = require("esprima"),
    escodegen  = require("escodegen"),
    estraverse = require("estraverse");

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
            push("// Common aliases");
        push("var $Reader = $protobuf.Reader,");
        push("    $Writer = $protobuf.Writer,");
        push("    $util   = $protobuf.util;");
        push("");
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
            push("// Resolve lazy type references to actual types");
        push("$util.lazyResolve($root, $lazyTypes);");
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

var reduceableBlockStatements = {
    IfStatement: true,
    ForStatement: true,
    WhileStatement: true
};

function beautifyCode(code) {
    // Rename short vars
    code = code
        .replace(/\b(?!\\)r\b/g, "reader")
        .replace(/\b(?!\\)w\b/g, "writer")
        .replace(/\b(?!\\)m\b/g, "message")
        .replace(/\b(?!\\)t\b/g, "tag")
        .replace(/\b(?!\\)l\b/g, "length")
        .replace(/\b(?!\\)c\b/g, "end")
        .replace(/\b(?!\\)c2\b/g, "end2")
        .replace(/\b(?!\\)k\b/g, "key")
        .replace(/\b(?!\\)ks\b/g, "keys")
        .replace(/\b(?!\\)ks2\b/g, "keys2")
        .replace(/\b(?!\\)e\b/g, "error")
        .replace(/\b(?!\\)f\b/g, "impl")
        .replace(/\b(?!\\)o\b/g, "options")
        .replace(/\b(?!\\)d\b/g, "object")
        .replace(/\b(?!\\)n\b/g, "long");
    // Add semicolons
    code = UglifyJS.minify(code, {
        fromString: true,
        compress: false,
        mangle: false,
        output: {
            beautify: true
        }
    }).code;
    // Properly beautify
    var ast = esprima.parse(code);
    estraverse.replace(ast, {
        enter: function(node, parent) {
            // remove braces around block statements with a single child
            if (node.type === "BlockStatement" && reduceableBlockStatements[parent.type] && node.body.length === 1)
                return node.body[0];
            return undefined;
        }
    });
    code = escodegen.generate(ast, {
        format: {
            newline: "\r\n",
            quotes: "double"
        }
    });
    // Add id, wireType comments
    if (config.comments)
        code = code.replace(/\.uint32\((\d+)\)/g, function($0, $1) {
            var id = $1 >>> 3,
                wireType = $1 & 7;
            return ".uint32(/* id " + id + ", wireType " + wireType + " =*/" + $1 + ")";
        });
    return code;
}

function buildFunction(type, functionName, gen, scope) {
    var code = gen.str(functionName)
        .replace(/this\.ctor/g, " $root" + type.fullName) // types: construct directly instead of using reflected ctor
        .replace(/(types\[\d+])(\.values)/g, "$1")        // enums: use types[N] instead of reflected types[N].values
        .replace(/\b(?!\.)Writer\b/g, "$Writer")          // use common aliases instead of binding through an iife
        .replace(/\b(?!\.)Reader\b/g, "$Reader")          // "
        .replace(/\b(?!\.)util\.\b/g, "$util.")           // "
        .replace(/\b(?!\.)types\[\b/g, "$types[");        // "

    if (config.beautify)
        code = beautifyCode(code);
    
    code = code.replace(/ {4}/g, "\t");

    var hasScope = scope && Object.keys(scope).length;

    if (hasScope) // remove unused scope vars
        Object.keys(scope).forEach(function(key) {
            if (!new RegExp("\\b(" + key + ")\\b", "g").test(code))
                delete scope[key];
        });

    var lines = code.split(/\n/g);
    if (hasScope) // enclose in an iife
        push(name(type.name) + "." + functionName + " = (function(" + Object.keys(scope).join(", ") + ") { return " + lines[0]);
    else
        push(name(type.name) + "." + functionName + " = " + lines[0]);
    lines.slice(1, lines.length - 1).forEach(function(line) {
        var prev = indent;
        var i = 0;
        while (line.charAt(i++) === "\t")
            ++indent;
        push(line.trim());
        indent = prev;
    });
    if (hasScope)
        push("};})(" + Object.keys(scope).map(function(key) { return scope[key]; }).join(", ") + ");");
    else
        push("};");
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

    // default values
    var firstField = true;
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
        } else if (firstField) {
            push("");
            firstField = false;
        }
        if (field.repeated)
            push(name(type.name) + ".prototype" + prop + " = $util.emptyArray;");
        else if (field.map)
            push(name(type.name) + ".prototype" + prop + " = $util.emptyObject;");
        else if (field.long)
            push(name(type.name) + ".prototype" + prop + " = $util.Long ? $util.Long.fromBits("
                    + JSON.stringify(field.typeDefault.low) + ","
                    + JSON.stringify(field.typeDefault.high) + ","
                    + JSON.stringify(field.typeDefault.unsigned)
                + ") : " + field.typeDefault.toNumber(field.type.charAt(0) === "u") + ";");
        else if (field.bytes) {
            push(name(type.name) + ".prototype" + prop + " = $util.newBuffer(" + JSON.stringify(Array.prototype.slice.call(field.typeDefault)) + ");");
        } else
            push(name(type.name) + ".prototype" + prop + " = " + JSON.stringify(field.typeDefault) + ";");
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
        push("Object.defineProperty(" + name(type.name) + ".prototype, " + JSON.stringify(oneof.name) +", {");
        ++indent;
            push("get: $util.oneOfGetter($oneOfFields = [" + oneof.oneof.map(JSON.stringify).join(", ") + "]),");
            push("set: $util.oneOfSetter($oneOfFields)");
        --indent;
        push("});");
    });

    var hasTypes = false;
    var types = [];
    type.fieldsArray.forEach(function(field, index) {
        if (field.resolve().resolvedType) { // including enums!
            hasTypes = true;
            types.push(index + ": "+JSON.stringify(field.resolvedType.fullName.substring(1)));
        }
    });

    if (hasTypes && (config.encode || config.decode || config.verify || config.convert)) {
        push("");
        if (config.comments)
            push("// Lazily resolved type references");
        push("var $types = {");
        ++indent;
            types.forEach(function(line, i) {
                push(line + (i === types.length - 1 ? "" : ","));
            });
        --indent;
        push("}; $lazyTypes.push($types);");
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
            "@param {" + fullName + "|Object} " + (config.beautify ? "message" : "m") + " " + type.name + " message or plain object to encode",
            "@param {$protobuf.Writer} [" + (config.beautify ? "writer" : "w") + "] Writer to encode to",
            "@returns {$protobuf.Writer} Writer"
        ]);
        buildFunction(type, "encode", protobuf.encoder(type));

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
            "@param {$protobuf.Reader|Uint8Array} " + (config.beautify ? "reader" : "r") + " Reader or buffer to decode from",
            "@param {number} [" + (config.beautify ? "length" : "l") + "] Message length if known beforehand",
            "@returns {" + fullName + "} " + type.name
        ]);
        buildFunction(type, "decode", protobuf.decoder(type));

        if (config.delimited) {
            push("");
            pushComment([
                "Decodes " + aOrAn(type.name) + " message from the specified reader or buffer, length delimited.",
                "@param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from",
                "@returns {" + fullName + "} " + type.name
            ]);
            push(name(type.name) + ".decodeDelimited = function decodeDelimited(reader) {");
            ++indent;
                push("if (!(reader instanceof $Reader))");
                ++indent;
                    push("reader = $Reader(reader);");
                --indent;
                push("return this.decode(reader, reader.uint32());");
            --indent;
            push("};");

        }
    }

    if (config.verify) {
        push("");
        pushComment([
            "Verifies " + aOrAn(type.name) + " message.",
            "@param {" + fullName + "|Object} " + (config.beautify ? "message" : "m") + " " + type.name + " message or plain object to verify",
            "@returns {?string} `null` if valid, otherwise the reason why it is not"
        ]);
        buildFunction(type, "verify", protobuf.verifier(type));

    }

    if (config.convert) {
        push("");
        pushComment([
            "Creates " + aOrAn(type.name) + " message from a plain object. Also converts values to their respective internal types.",
            "@param {Object.<string,*>} " + (config.beautify ? "object" : "d") + " Plain object",
            "@returns {" + fullName + "} " + type.name
        ]);
        buildFunction(type, "fromObject", protobuf.converter.fromObject(type));

        push("");
        pushComment([
            "Creates " + aOrAn(type.name) + " message from a plain object. Also converts values to their respective internal types.",
            "This is an alias of {@link " + fullName + ".fromObject}.",
            "@param {Object.<string,*>} object Plain object",
            "@returns {" + fullName + "} " + type.name
        ]);
        push(name(type.name) + ".from = " + name(type.name) + ".fromObject;");

        push("");
        pushComment([
            "Creates a plain object from " + aOrAn(type.name) + " message. Also converts values to other types if specified.",
            "@param {" + fullName + "} " + (config.beautify ? "message" : "m") + " " + type.name,
            "@param {$protobuf.ConversionOptions} [" + (config.beautify ? "options" : "o") + "] Conversion options",
            "@returns {Object.<string,*>} Plain object"
        ]);
        buildFunction(type, "toObject", protobuf.converter.toObject(type));

        push("");
        pushComment([
            "Creates a plain object from this " + type.name + " message. Also converts values to other types if specified.",
            "@param {$protobuf.ConversionOptions} [options] Conversion options",
            "@returns {Object.<string,*>} Plain object"
        ]);
        push(name(type.name) + ".prototype.toObject = function toObject(options) {");
        ++indent;
            push("return this.constructor.toObject(this, options);");
        --indent;
        push("};");

        push("");
        pushComment([
            "Converts this " + type.name + " to JSON.",
            "@returns {Object.<string,*>} JSON object"
        ]);
        push(name(type.name) + ".prototype.toJSON = function toJSON() {");
        ++indent;
            push("return this.constructor.toObject(this, $protobuf.util.toJSONOptions);");
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
             "@param {function} method Method being called",
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
        "@extends $protobuf.util.EventEmitter",
        "@constructor",
        "@param {RPCImpl} rpc RPC implementation",
        "@param {boolean} [requestDelimited=false] Whether requests are length-delimited",
        "@param {boolean} [responseDelimited=false] Whether responses are length-delimited",
    ]);
    push("function " + name(service.name) + "(rpc, requestDelimited, responseDelimited) {");
    ++indent;
    push("$util.EventEmitter.call(this);");
    
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
    push("");
    push("(" + name(service.name) + ".prototype = Object.create($util.EventEmitter.prototype)).constructor = " + name(service.name) + ";");

    if (config.create) {
        push("");
        pushComment([
            "Creates a runtime service using the specified rpc implementation.",
            "@param {RPCImpl} rpcImpl RPC implementation",
            "@param {boolean} [requestDelimited=false] Whether requests are length-delimited",
            "@param {boolean} [responseDelimited=false] Whether responses are length-delimited",
            "@returns {" + name(service.name) + "} RPC service. Useful where requests and/or responses are streamed."
        ]);
        push(name(service.name) + ".create = function create(rpcImpl, requestDelimited, responseDelimited) {");
            ++indent;
            push("return new this(rpcImpl, requestDelimited, responseDelimited);");
            --indent;
        push("};");
    }

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
            "@param {" + method.resolvedResponseType.fullName.substring(1) + "} [response] " + method.resolvedResponseType.name + " or `null` if the service has been terminated server-side"
        ]);
        push("");
        pushComment([
            method.comment || "Calls " + method.name + ".",
            "@param {" + method.resolvedRequestType.fullName.substring(1) + "|Object} request " + method.resolvedRequestType.name + " message or plain object",
            "@param {" + cbName + "} callback Node-style callback called with the error, if any, and " + method.resolvedResponseType.name,
            "@returns {undefined}"
        ]);
        push(name(service.name) + ".prototype" + util.safeProp(lcName) + " = function " + name(lcName) + "(request, callback) {");
            ++indent;
            push("if (!request)");
                ++indent;
                push("throw TypeError(\"request must be specified\");");
                --indent;
            push("if (!callback)");
                ++indent;
                push("return $util.asPromise(" + name(lcName) + ", this, request);");
                --indent;
            push("var $self = this;");
            push("this.rpc(" + name(lcName) + ", (this.requestDelimited");
                ++indent;
                push("? $root" + method.resolvedRequestType.fullName + ".encodeDelimited(request)");
                push(": $root" + method.resolvedRequestType.fullName + ".encode(request)");
                --indent;
            push(").finish(), function $rpcCallback(err, response) {");
                ++indent;
                push("if (err) {");
                    ++indent;
                    push("$self.emit(\"error\", err, " + name(lcName) + ");");
                    push("return callback(err);");
                    --indent;
                push("}");
                push("if (response === null) {");
                    ++indent;
                    push("$self.end(true);");
                    push("return undefined;");
                    --indent;
                push("}");
                push("if (!(response instanceof $root" + method.resolvedResponseType.fullName + ")) {");
                    ++indent;
                    push("try {");
                        ++indent;
                        push("response = $self.responseDelimited");
                            ++indent;
                            push("? $root" + method.resolvedResponseType.fullName + ".decodeDelimited(response)");
                            push(": $root" + method.resolvedResponseType.fullName + ".decode(response);");
                            --indent;
                        --indent;
                    push("} catch (err2) {");
                        ++indent;
                        push("$self.emit(\"error\", err2, " + name(lcName) + ");");
                        push("return callback(err2);");
                        --indent;
                    push("}");
                    --indent;
                push("}");
                push("$self.emit(\"data\", response, " + name(lcName) + ");");
                push("return callback(null, response);");
                --indent;
            push("});");
            push("return undefined;");
        --indent;
        push("};");
        if (config.comments)
            push("");
        pushComment([
            method.comment || "Calls " + method.name + ".",
            "@name " + name(service.name) + "#" + lcName,
            "@function",
            "@param {" + method.resolvedRequestType.fullName.substring(1) + "|Object} request " + method.resolvedRequestType.name + " message or plain object",
            "@returns {Promise<"+method.resolvedResponseType.fullName.substring(1)+">} Promise",
            "@variation 2"
        ]);
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
