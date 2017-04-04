"use strict";
module.exports = static_target;

var protobuf   = require("../.."),
    cliUtil    = require("../util"),
    UglifyJS   = require("uglify-js"),
    espree     = require("espree"),
    escodegen  = require("escodegen"),
    estraverse = require("estraverse");

var Type      = protobuf.Type,
    Service   = protobuf.Service,
    Enum      = protobuf.Enum,
    Namespace = protobuf.Namespace,
    Class     = protobuf.Class,
    util      = protobuf.util;

var out = [];
var indent = 0;
var config = {};

static_target.description = "Static code without reflection (non-functional on its own)";

function static_target(root, options, callback) {
    config = options;
    try {
        var aliases = [];
        if (config.decode)
            aliases.push("Reader");
        if (config.encode)
            aliases.push("Writer");
        aliases.push("util");
        if (aliases.length) {
            if (config.comments)
                push("// Common aliases");
            push((config.es6 ? "const " : "var ") + aliases.map(function(name) { return "$" + name + " = $protobuf." + name; }).join(", ") + ";");
            push("");
        }
        if (config.comments) {
            if (root.comment)
                pushComment("@fileoverview " + root.comment);
            else
                push("// Exported root namespace");
        }
        var rootProp = cliUtil.safeProp(config.root || "default");
        push((config.es6 ? "const" : "var") + " $root = $protobuf.roots" + rootProp + " || ($protobuf.roots" + rootProp + " = {});");
        buildNamespace(null, root);
        return callback(null, out.join("\n"));
    } catch (err) {
        return callback(err);
    } finally {
        out = [];
        indent = 0;
        config = {};
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

function buildNamespace(ref, ns) {
    if (!ns)
        return;
    if (ns.name !== "") {
        push("");
        if (!ref && config.es6)
            push("export const " + name(ns.name) + " = " + name(ref) + "." + name(ns.name) + " = (() => {");
        else
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
        push((config.es6 ? "const" : "var") + " " + name(ns.name) + " = {};");
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

var shortVars = {
    "r": "reader",
    "w": "writer",
    "m": "message",
    "t": "tag",
    "l": "length",
    "c": "end", "c2": "end2",
    "k": "key",
    "ks": "keys", "ks2": "keys2",
    "e": "error",
    "f": "impl",
    "o": "options",
    "d": "object",
    "n": "long",
    "p": "properties"
};

function beautifyCode(code) {
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
    var ast = espree.parse(code);
    estraverse.replace(ast, {
        enter: function(node, parent) {
            // rename short vars
            if (node.type === "Identifier" && (parent.property !== node || parent.computed) && shortVars[node.name])
                return {
                    "type": "Identifier",
                    "name": shortVars[node.name]
                };
            // replace var with let if es6
            if (config.es6 && node.type === "VariableDeclaration" && node.kind === "var") {
                node.kind = "let";
                return undefined;
            }
            // remove braces around block statements with a single child
            if (node.type === "BlockStatement" && reduceableBlockStatements[parent.type] && node.body.length === 1)
                return node.body[0];
            return undefined;
        }
    });
    code = escodegen.generate(ast, {
        format: {
            newline: "\n",
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

var renameVars = {
    "Writer": "$Writer",
    "Reader": "$Reader",
    "util": "$util"
};

function buildFunction(type, functionName, gen, scope) {
    var code = gen.str(functionName)
        .replace(/((?!\.)types\[\d+])(\.values)/g, "$1"); // enums: use types[N] instead of reflected types[N].values

    var ast = espree.parse(code);
    /* eslint-disable no-extra-parens */
    estraverse.replace(ast, {
        enter: function(node, parent) {
            // rename vars
            if (
                node.type === "Identifier" && renameVars[node.name]
                && (
                    (parent.type === "MemberExpression" && parent.object === node)
                 || (parent.type === "BinaryExpression" && parent.right === node)
                )
            )
                return {
                    "type": "Identifier",
                    "name": renameVars[node.name]
                };
            // replace this.ctor with the actual ctor
            if (
                node.type === "MemberExpression"
             && node.object.type === "ThisExpression"
             && node.property.type === "Identifier" && node.property.name === "ctor"
            )
                return {
                    "type": "Identifier",
                    "name": "$root" + type.fullName
                };
            // replace types[N] with the field's actual type
            if (
                node.type === "MemberExpression"
             && node.object.type === "Identifier" && node.object.name === "types"
             && node.property.type === "Literal"
            )
                return {
                    "type": "Identifier",
                    "name": "$root" + type.fieldsArray[node.property.value].resolvedType.fullName
                };
            return undefined;
        }
    });
    /* eslint-enable no-extra-parens */
    code = escodegen.generate(ast, {
        format: {
            newline: "\n",
            quotes: "double"
        }
    });

    if (config.beautify)
        code = beautifyCode(code);

    code = code.replace(/ {4}/g, "\t");

    var hasScope = scope && Object.keys(scope).length,
        isCtor = functionName === type.name;

    if (hasScope) // remove unused scope vars
        Object.keys(scope).forEach(function(key) {
            if (!new RegExp("\\b(" + key + ")\\b", "g").test(code))
                delete scope[key];
        });

    var lines = code.split(/\n/g);
    if (isCtor) // constructor
        push(lines[0]);
    else if (hasScope) // enclose in an iife
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
    if (isCtor)
        push("}");
    else if (hasScope)
        push("};})(" + Object.keys(scope).map(function(key) { return scope[key]; }).join(", ") + ");");
    else
        push("};");
}

function toJsType(field) {
    var type;
    switch (field.type) {
        case "double":
        case "float":
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
            type = "number";
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
            type = config.forceLong ? "Long" : "number|Long";
            break;
        case "bool":
            type = "boolean";
            break;
        case "string":
            type = "string";
            break;
        case "bytes":
            type = "Uint8Array";
            break;
        default:
            if (field.resolve().resolvedType instanceof Enum)
                type = field.resolvedType.fullName.substring(1); // reference the enum
            else if (field.resolvedType instanceof Type)
                type = field.resolvedType.fullName.substring(1) + (config.forceMessage ? "" : "$Properties"); // reference the typedef
            else
                type = "*"; // should not happen
            break;
    }
    if (field.map)
        return "Object.<string," + type + ">";
    if (field.repeated)
        return "Array.<" + type + ">";
    return type;
}

function buildType(ref, type) {
    var fullName = type.fullName.substring(1);

    if (config.comments) {
        var typeDef = [
            "Properties of " + aOrAn(type.name) + ".",
            "@typedef " + fullName + "$Properties",
            "@type {Object}"
        ];
        type.fieldsArray.forEach(function(field) {
            var prop = util.safeProp(field.name);
            prop = prop.substring(1, prop.charAt(0) === "[" ? prop.length - 1 : prop.length);
            typeDef.push("@property {" + toJsType(field) + "} " + (field.optional ? "[" + prop + "]" : field.name) + " " + (field.comment || type.name + " " + field.name + "."));
        });
        push("");
        pushComment(typeDef);
    }

    // constructor
    push("");
    pushComment([
        "Constructs a new " + type.name + ".",
        type.comment ? "@classdesc " + type.comment : null,
        "@exports " + fullName,
        "@constructor",
        "@param {" + fullName + "$Properties=} [" + (config.beautify ? "properties" : "p") + "] Properties to set"
    ]);
    buildFunction(type, type.name, Class.generate(type));

    // default values
    var firstField = true;
    type.fieldsArray.forEach(function(field) {
        field.resolve();
        var prop = util.safeProp(field.name);
        if (config.comments) {
            push("");
            var jsType = toJsType(field);
            if (field.optional && !field.map && !field.repeated && field.resolvedType instanceof Type)
                jsType = "(" + jsType + "|null)";
            pushComment([
                field.comment || type.name + " " + field.name + ".",
                "@type {" + jsType + "}"
            ]);
        } else if (firstField) {
            push("");
            firstField = false;
        }
        if (field.repeated)
            push(name(type.name) + ".prototype" + prop + " = $util.emptyArray;"); // overwritten in constructor
        else if (field.map)
            push(name(type.name) + ".prototype" + prop + " = $util.emptyObject;"); // overwritten in constructor
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
    var firstOneOf = true;
    type.oneofsArray.forEach(function(oneof) {
        if (firstOneOf) {
            firstOneOf = false;
            push("");
            if (config.comments)
                push("// OneOf field names bound to virtual getters and setters");
            push((config.es6 ? "let" : "var") + " $oneOfFields;");
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

    if (config.create) {
        push("");
        pushComment([
            "Creates a new " + type.name + " instance using the specified properties.",
            "@param {" + fullName + "$Properties=} [properties] Properties to set",
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
            "Encodes the specified " + type.name + " message. Does not implicitly {@link " + fullName + ".verify|verify} messages.",
            "@param {" + fullName + (config.forceMessage ? "" : "$Properties") + "} " + (config.beautify ? "message" : "m") + " " + type.name + " message or plain object to encode",
            "@param {$protobuf.Writer} [" + (config.beautify ? "writer" : "w") + "] Writer to encode to",
            "@returns {$protobuf.Writer} Writer"
        ]);
        buildFunction(type, "encode", protobuf.encoder(type));

        if (config.delimited) {
            push("");
            pushComment([
                "Encodes the specified " + type.name + " message, length delimited. Does not implicitly {@link " + fullName + ".verify|verify} messages.",
                "@param {" + fullName + (config.forceMessage ? "" : "$Properties") + "} message " + type.name + " message or plain object to encode",
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
            "@returns {" + fullName + "} " + type.name,
            "@throws {Error} If the payload is not a reader or valid buffer",
            "@throws {$protobuf.util.ProtocolError} If required fields are missing"
        ]);
        buildFunction(type, "decode", protobuf.decoder(type));

        if (config.delimited) {
            push("");
            pushComment([
                "Decodes " + aOrAn(type.name) + " message from the specified reader or buffer, length delimited.",
                "@param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from",
                "@returns {" + fullName + "} " + type.name,
                "@throws {Error} If the payload is not a reader or valid buffer",
                "@throws {$protobuf.util.ProtocolError} If required fields are missing"
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
            "@param {Object.<string,*>} " + (config.beautify ? "message" : "m") + " Plain object to verify",
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
            "@function",
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

    push("");
    pushComment([
        "Constructs a new " + service.name + " service.",
        service.comment ? "@classdesc " + service.comment : null,
        "@exports " + fullName,
        "@extends $protobuf.rpc.Service",
        "@constructor",
        "@param {$protobuf.RPCImpl} rpcImpl RPC implementation",
        "@param {boolean} [requestDelimited=false] Whether requests are length-delimited",
        "@param {boolean} [responseDelimited=false] Whether responses are length-delimited"
    ]);
    push("function " + name(service.name) + "(rpcImpl, requestDelimited, responseDelimited) {");
    ++indent;
    push("$protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);");
    --indent;
    push("}");
    push("");
    push("(" + name(service.name) + ".prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = " + name(service.name) + ";");

    if (config.create) {
        push("");
        pushComment([
            "Creates new " + service.name + " service using the specified rpc implementation.",
            "@param {$protobuf.RPCImpl} rpcImpl RPC implementation",
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
            // This is a more specialized version of protobuf.rpc.ServiceCallback
            "@typedef " + cbName,
            "@type {function}",
            "@param {?Error} error Error, if any",
            "@param {" + method.resolvedResponseType.fullName.substring(1) + "} [response] " + method.resolvedResponseType.name
        ]);
        push("");
        pushComment([
            method.comment || "Calls " + method.name + ".",
            "@param {" + method.resolvedRequestType.fullName.substring(1) + "|Object.<string,*>} request " + method.resolvedRequestType.name + " message or plain object",
            "@param {" + cbName + "} callback Node-style callback called with the error, if any, and " + method.resolvedResponseType.name,
            "@returns {undefined}"
        ]);
        push(name(service.name) + ".prototype" + util.safeProp(lcName) + " = function " + name(lcName) + "(request, callback) {");
            ++indent;
            push("return this.rpcCall(" + name(lcName) + ", $root" + method.resolvedRequestType.fullName + ", $root" + method.resolvedResponseType.fullName + ", request, callback);");
            --indent;
        push("};");
        if (config.comments)
            push("");
        pushComment([
            method.comment || "Calls " + method.name + ".",
            "@name " + name(service.name) + "#" + lcName,
            "@function",
            "@param {" + method.resolvedRequestType.fullName.substring(1) + "|Object.<string,*>} request " + method.resolvedRequestType.name + " message or plain object",
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
        push((config.es6 ? "const" : "var") + " valuesById = {}, values = Object.create(valuesById);");
        var aliased = [];
        Object.keys(enm.values).forEach(function(key) {
            var val = enm.values[key];
            if (aliased.indexOf(val) > -1)
                push("values[" + JSON.stringify(key) + "] = " + val + ";");
            else {
                push("values[valuesById[" + val + "] = " + JSON.stringify(key) + "] = " + val + ";");
                aliased.push(val);
            }
        });
        push("return values;");
    --indent;
    push("})();");
}
