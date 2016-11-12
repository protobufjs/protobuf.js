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
var description = "Plain JSON descriptor";

var ProtoBuf = require(__dirname+"/../../../index.js"),
    util = require("../util.js");

/**
 * pbjs target: Plain JSON descriptor
 * @exports pbjs/targets/json
 * @function
 * @param {!ProtoBuf.Builder} builder Builder
 * @param {!Object.<string,*>=} options Options
 * @returns {string}
 */
var json = module.exports = function(builder, options) {
    options = options || {};
    builder.resolveAll();

    // Set the pointer to the lowest common namespace (with options)
    var ptr = builder.ns;
    while (ptr.children.length === 1 && Object.keys(ptr.options).length === 0 && ptr.children[0].className === "Namespace")
        ptr = ptr.children[0];

    // Start by building the package namespace
    var pkg = ptr.fqn().substring(1),
        out = {
            "package": pkg !== "" ? pkg : null
        };
    buildNamespace(ptr, out);
    return JSON.stringify(out, null, options.min ? 0 : 4);
};

/**
 * Module description.
 * @type {string}
 */
json.description = description;

/**
 * Builds all structures in a namespace.
 * @param {!ProtoBuf.Reflect.Namespace} ns Namespace to build
 * @param {!Object.<string,*>} out Extended output object
 */
function buildNamespace(ns, out) {
    var messages, enums, services;
    util.extend(out, {
        "syntax"   : ns.syntax   || 'proto2',
        "options"  : out.options || {},
        "messages" : messages = [],
        "enums"    : enums    = [],
        "services" : services = []
    });
    if (!(ns instanceof ProtoBuf.Reflect.Message))
        out['isNamespace'] = true;
    util.extend(out["options"], buildOptions(ns.options));
    ns.getChildren(ProtoBuf.Reflect.Enum).forEach(function(enm) {
        enums.push(buildEnum(enm));
    });
    if (enums.length === 0)
        delete out["enums"];
    ns.getChildren(ProtoBuf.Reflect.Message).forEach(function(msg) {
        messages.push(buildMessage(msg));
    });
    ns.getChildren(ProtoBuf.Reflect.Service).forEach(function(svc) {
        services.push(buildService(svc));
    });
    if (services.length === 0)
        delete out["services"];
    Array.prototype.push.apply(messages, buildExtensions(ns));
    ns.getChildren(ProtoBuf.Reflect.Namespace).forEach(function(innerNs) {
        if (innerNs.className !== "Namespace")
            return;
        var emptyMessage = {
            "name": innerNs.name,
            "fields": []
        };
        buildNamespace(innerNs, emptyMessage);
        messages.push(emptyMessage);
    });
    if (messages.length === 0)
        delete out["messages"];
    if (Object.keys(out["options"]).length === 0)
        delete out["options"];
}

/**
 * Builds extensions declared in the specified namespace.
 * @param {!ProtoBuf.Reflect.Namespace} ns Namespace
 * @returns {!Array.<!*>}
 */
function buildExtensions(ns) {
    var exts = util.groupExtensions(ns);
    if (exts === null)
        return [];
    var messages = [];
    Object.keys(exts).forEach(function(extFqn) {
        var extMsg = ns.resolve(extFqn),
            extFields = exts[extFqn];
        var fields, ext = {
            "ref"    : ns.qn(extMsg),
            "fields" : fields = []
        };
        extFields.forEach(function(extField) {
            fields.push(buildMessageField(extField));
        });
        messages.push(ext);
    });
    return messages;
}

/**
 * Builds block-level options.
 * @param {!Object.<string,*>} options Options
 * @returns {!Object.<string,*>}
 */
function buildOptions(options) {
    Object.keys(options = options || {}).forEach(function(key) {
        var val = options[key];
        switch (typeof val) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'object':
                break;
            default:
                throw Error("Illegal option type: "+typeof(val));
        }
    });
    return options;
}

/**
 * Builds a message.
 * @param {!ProtoBuf.Reflect.Message} msg Message
 * @returns {!*}
 */
function buildMessage(msg) {
    var fields, oneofs;
    var out = {
        "name"     : msg.name,
        "syntax"   : msg.syntax || 'proto2',
        "options"  : {},
        "fields"   : fields   = [],
        "oneofs"   : oneofs   = {}
    };
    msg.getChildren(ProtoBuf.Reflect.Message.Field).forEach(function(fld) {
        if (fld instanceof ProtoBuf.Reflect.Message.ExtensionField)
            return;
        fields.push(buildMessageField(fld));
    });
    msg.getChildren(ProtoBuf.Reflect.Message.OneOf).forEach(function(oneof) {
        oneofs[oneof.name] = buildMessageOneof(oneof);
    });
    if (msg.extensions)
        out["extensions"] = msg.extensions;
    if (Object.keys(oneofs).length === 0)
        delete out["oneofs"];
    buildNamespace(msg, out);
    return out;
}

/**
 * Builds a message field.
 * @param {!ProtoBuf.Reflect.Message.Field} fld Message field
 * @returns {!*}
 */
function buildMessageField(fld) {
    return {
        "rule"    : fld.map ? "map" : (fld.repeated ? "repeated" : (fld.required ? "required" : "optional")),
        "type"    : fld.resolvedType ? fld.parent.qn(fld.resolvedType) : fld.type['name'],
        "keytype" : (typeof(fld.keyType) === 'string') ? fld.keyType : (fld.keyType !== null ? fld.keyType.name : undefined),
        "name"    : fld instanceof ProtoBuf.Reflect.Message.ExtensionField ? fld.name.substring(fld.name.lastIndexOf(".")+1): fld.name,
        "id"      : fld.id,
        "options" : Object.keys(fld.options).length > 0 ? buildOptions(fld.options) : undefined,
        "oneof"   : fld.oneof ? fld.oneof.name : undefined
    };
}

/**
 * Builds a message oneof.
 * @param {!ProtoBuf.Reflect.message.OneOf} oneof Message oneof
 * @returns {!Array.<!*>}
 */
function buildMessageOneof(oneof) {
    var out = [];
    oneof.fields.forEach(function(fld) {
        out.push(fld.id);
    });
    return out;
}

/**
 * Builds an enum.
 * @param {!ProtoBuf.Reflect.Enum} enm Enum
 * @returns {!*}
 */
function buildEnum(enm) {
    var values;
    var out = {
        "name"    : enm.name,
        "syntax"  : enm.syntax || 'proto2',
        "values"  : values = []
    };
    enm.getChildren(ProtoBuf.Reflect.Enum.Value).forEach(function(val) {
        values.push(buildEnumValue(val));
    });
    if (Object.keys(enm.options).length > 0)
        out["options"] = buildOptions(enm.options);
    return out;
}

/**
 * Builds an enum value.
 * @param {!ProtoBuf.Reflect.Enum.Value} val Enum value
 * @returns {!*}
 */
function buildEnumValue(val) {
    return {
        "name"    : val.name,
        "id"      : val.id
    };
}

/**
 * Builds a service.
 * @param {!ProtoBuf.Reflect.Service} svc Service
 * @returns {!*}
 */
function buildService(svc) {
    var rpc;
    var out = {
        "name": svc.name,
        "options": buildOptions(svc.options),
        "rpc": rpc = {}
    };
    svc.getChildren(ProtoBuf.Reflect.Service.RPCMethod).forEach(function(mtd) {
        rpc[mtd.name] = {
            "request": svc.qn(mtd.resolvedRequestType),
            "request_stream": mtd.requestStream,
            "response": svc.qn(mtd.resolvedResponseType),
            "response_stream": mtd.responseStream,
            "options": buildOptions(mtd.options)
        };
    });
    return out;
}
