/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
var description = "Plain .proto descriptor";

var ProtoBuf = require(__dirname+"/../../../index.js"),
    util = require("../util.js");

/**
 * pbjs target: Plain .proto descriptor
 * @exports pbjs/targets/proto
 * @function
 * @param {!ProtoBuf.Builder} builder Builder
 * @param {!Object.<string,*>=} options Options
 * @returns {string}
 */
var proto = module.exports = function(builder, options) {
    options = options || {};
    builder.resolveAll();

    // Set the pointer to the lowest common namespace (with options)
    var ptr = builder.ns;
    while (ptr.children.length === 1 && Object.keys(ptr.options).length === 0 && ptr.children[0].className === "Namespace")
        ptr = ptr.children[0];

    var out = [];

    function trim() {
        out[out.length-1] = out[out.length-1].replace(/\n{2,}$/, "\n");
    }

    // Builds a set of top level options
    function buildOptions(opt, indent) {
        var keys;
        if ((keys = Object.keys(opt)).length === 0)
            return;
        keys.forEach(function(key) {
            if (!options.min)
                out.push(indent);
            out.push("option ", key, options.min ? "=" : " = ", value(opt[key]), options.min ? ";" : ";\n");
        });
        if (!options.min)
            out[out.length-1] += "\n";
    }

    // Builds everything within a namespace
    function buildNamespace(ns, indent) {
        ns.getChildren(ProtoBuf.Reflect.Enum).forEach(function(enm) {
            buildEnum(enm, indent);
        });
        ns.getChildren(ProtoBuf.Reflect.Message).forEach(function(msg) {
            buildMessage(msg, indent);
        });
        var exts = util.groupExtensions(ns);
        if (exts !== null) {
            Object.keys(exts).forEach(function(extFqn) {
                var extMsg = ns.resolve(extFqn),
                    extFields = exts[extFqn];
                if (!options.min)
                    out.push(indent);
                out.push("extend ", ns.qn(extMsg), options.min ? "{" : " {\n");
                extFields.forEach(function(extField) {
                    buildMessageField(ns, extField, indent+"    ", false);
                });
                if (!options.min)
                    out.push(indent);
                out.push(options.min ? "}" : "}\n\n");
            });
        }
        ns.getChildren(ProtoBuf.Reflect.Service).forEach(function(svc) {
            buildService(svc, indent);
        });
        ns.getChildren(ProtoBuf.Reflect.Namespace).forEach(function(innerNs) {
            if (innerNs.className !== "Namespace")
                return;
            if (!options.min)
                out.push(indent);
            out.push("message ", innerNs.name, options.min ? "{" : " {\n");
            buildNamespace(innerNs, indent+"    ");
            if (!options.min)
                out.push(indent);
            out.push(options.min ? "}" : "}\n");
        });
        trim();
    }

    // Builds a message
    function buildMessage(msg, indent) {
        if (!options.min)
            out.push(indent);
        out.push("message ", msg.name, options.min ? "{" : " {\n");
        buildOptions(msg.options, indent+"    ");
        var n = 0, oneofFields = [];
        msg.getChildren(ProtoBuf.Reflect.Message.OneOf).forEach(function(oneof) {
            if (!options.min)
                out.push(indent, "    ");
            out.push("oneof ", oneof.name, options.min ? "{" : " {\n");
            oneof.fields.forEach(function(fld) {
                buildMessageField(msg, fld, indent+"        ", true);
                oneofFields.push(fld);
            });
            if (!options.min)
                out.push(indent, "    ");
            out.push(options.min ? "}" : "}\n");
        });
        msg.getChildren(ProtoBuf.Reflect.Message.Field).forEach(function(fld) {
            if (fld instanceof ProtoBuf.Reflect.Message.ExtensionField)
                return;
            if (oneofFields.indexOf(fld) >= 0)
                return;
            buildMessageField(msg, fld, indent+"    ", false);
            n++;
        });
        if (n > 0 && !options.min)
            out[out.length-1] += "\n";
        if (msg.extensions[0] !== ProtoBuf.ID_MIN || msg.extensions[1] !== ProtoBuf.ID_MAX) {
            if (!options.min)
                out.push(indent, "    ");
            out.push("extensions ", value(msg.extensions[0]), " to ", msg.extensions[1] === ProtoBuf.ID_MAX ? "max" : value(msg.extensions[1]), options.min ? ";" : ";\n\n");
        }
        buildNamespace(msg, indent+"    ");
        if (!options.min)
            out.push(indent);
        out.push(options.min ? "}" : "}\n\n");
    }

    // Builds a message field
    function buildMessageField(msg, fld, indent, isOneOf) {
        if (!options.min)
            out.push(indent);
        if (!isOneOf)
            out.push(fld.required ? "required " : "optional ");
        if (fld.resolvedType !== null)
            out.push(msg.qn(fld.resolvedType));
        else
            out.push(fld.type['name']);
        out.push(" ", fld instanceof ProtoBuf.Reflect.Message.ExtensionField ? fld.name.substring(fld.name.lastIndexOf(".")+1) : fld.name, options.min ? "=" : " = ", fld.id);
        var keys = Object.keys(fld.options);
        if (keys.length > 0) {
            out.push(options.min ? "[" : " [");
            var n = 0;
            keys.forEach(function(key) {
                if (n > 0)
                    out.push(options.min ? "," : ", ");
                out.push(key, options.min ? "=" : " = ",
                    // BEWARE: Monkey patch for string enum defaults
                    key === "default" && fld.type === ProtoBuf.TYPES["enum"] && typeof fld.options[key] === 'string' ? fld.options[key] : value(fld.options[key])
                );
                n++;
            });
            out.push("]");
        }
        out.push(options.min ? ";" : ";\n");
    }

    // Builds an enum
    function buildEnum(enm, indent) {
        if (!options.min)
            out.push(indent);
        out.push("enum ", enm.name, options.min ? "{" : " {\n");
        buildOptions(enm.options, indent+"    ");
        enm.getChildren(ProtoBuf.Reflect.Enum.Value).forEach(function(val) {
            if (!options.min)
                out.push(indent, "    ");
            out.push(val.name, options.min ? "=" : " = ", val.id, options.min? ";" : ";\n");
        });
        if (!options.min)
            out.push(indent);
        out.push(options.min ? "}" : "}\n\n");
    }

    // Builds a service
    function buildService(svc, indent) {
        if (!options.min)
            out.push(indent);
        out.push("service ", svc.name, options.min ? "{" : " {\n");
        buildOptions(svc.options, indent+"    ");
        svc.getChildren(ProtoBuf.Reflect.Service.RPCMethod).forEach(function(rpc) {
            if (!options.min)
                out.push(indent+"    ");
            out.push("rpc ", rpc.name, "(", svc.qn(rpc.resolvedRequestType), ") returns(", svc.qn(rpc.resolvedResponseType), ")");
            var keys = Object.keys(rpc.options);
            if (keys.length === 0) {
                out.push(options.min ? ";" : ";\n")
            } else {
                out.push(options.min ? "{" : " {\n");
                buildOptions(rpc.options, indent+"        ");
                trim();
                if (!options.min)
                    out.push(indent+"    ");
                out.push(options.min ? "}" : "}\n");
            }
            if (!options.min)
                out[out.length-1] += "\n";
        });
        trim();
        out.push(options.min ? "}" : "}\n");
    }

    // Start by building the package namespace
    var pkg = ptr.fqn().substring(1);
    if (pkg !== "")
        out.push("package ", pkg, options.min ? ";" : ";\n\n");
    buildOptions(ptr.options, "");
    buildNamespace(ptr, "");
    return out.join('');
};

/**
 * Module description.
 * @type {string}
 */
proto.description = description;

/**
 * Converts a JavaScript value to a .proto value.
 * @param {*} v Value
 * @returns {string} Dot proto value
 */
function value(v) {
    switch (typeof v) {
        case 'boolean':
            return v ? 'true' : 'false';
        case 'number':
            return v.toString();
        case 'string':
            return '"'+v.replace(/"/g, '\\"')+'"';
        default:
            throw new Error("illegal value type: "+typeof(v));
    }
}
