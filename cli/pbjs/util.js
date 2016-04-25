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
var ProtoBuf = require("../../index.js");

/**
 * Utility namespace.
 * @exports pbjs/util
 * @namespace
 */
var util = module.exports = {};

/**
 * Extracts builder options with the specified prefix from a set of CLI options.
 * @param {!Object.<string,*>} options CLI options
 * @param {string} prefix Prefix
 * @returns {!Object.<string,*>}
 */
util.getBuilderOptions = function(options, prefix) {
    if (!options[prefix])
        return {};
    var builderOptions = {};
    options[prefix].forEach(function(kv) {
        var key, val;
        var p = kv.indexOf("=");
        if (p < 0) {
            key = kv;
            val = true;
        } else {
            key = kv.substring(0, p);
            val = kv.substring(p+1);
            if (val === "true")
                val = true;
            else if (val === "false")
                val = false;
            else {
                var intval = parseInt(val, 10);
                if (intval == val)
                    val = intval;
            }
        }
        builderOptions[key] = val;
    });
    return builderOptions;
};

/**
 * Pads a string to the specified length.
 * @param {string} str String to pad
 * @param {number} len Pad length
 * @param {boolean=} left Whether to pad to the left, defaults to `false`
 * @returns {string}
 */
util.pad = function(str, len, left) {
    while (str.length < len)
        left ? str = " "+str : str += " ";
    return str;
};

/**
 * Indents a string by the specified whitespace.
 * @param {string} str String to indent
 * @param {string|number} ws Whitespace string or number of whitespaces
 * @returns {string}
 */
util.indent = function(str, ws) {
    if (ws === 0 || ws === "")
        return str;
    var lines = str.split(/\r?\n/);
    if (typeof ws === 'number') {
        var n = ws; ws = "";
        while (ws.length < n) ws += " ";
    }
    for (var i=1; i<lines.length; ++i)
        lines[i] = ws+lines[i];
    return lines.join("\n");
};

/**
 * Extends an object with additional properties.
 * @param {!Object.<string,*>} subject Subject to extend
 * @param {!Object.<string,*>} extension Extensions to apply
 */
util.extend = function(subject, extension) {
    Object.keys(extension).forEach(function(key) {
        subject[key] = extension[key];
    });
};

/**
 * Groups extensions by extended message.
 * @param {!ProtoBuf.Reflect.Namespace} ns Namespace
 * @returns {?Object.<string,!Array.<!ProtoBuf.Reflect.Message.ExtensionField>>}
 */
util.groupExtensions = function(ns) {
    var exts = {},
        n = 0;
    ns.getChildren(ProtoBuf.Reflect.Extension).forEach(function(ext) {
        var msg = ext.field.parent,
            fqn = msg.fqn();
        if (!exts[fqn])
            exts[fqn] = [];
        exts[fqn].push(ext.field);
        n++;
    });
    return n > 0 ? exts : null;
};

/**
 * Tests if the specified import name is referencing an internal descriptor.
 * @param {string} name Import name
 * @returns {boolean}
 */
util.isDescriptor = function(name) {
    return /^google\/protobuf\/descriptor/.test(name);
};