// WARNING: highly experimental.
// might eventually become a starting point for a real debug build.

"use strict";
var protobuf = module.exports = require(".");

// Count number of calls to any generated function
protobuf.util.codegen = (function(codegen) { return function codegen_debug() {
    codegen_debug.supported = codegen.supported;
    codegen_debug.verbose = codegen.verbose;
    var gen = codegen.apply(null, Array.prototype.slice.call(arguments));
    gen.str = (function(str) { return function str_debug() {
        return str.apply(null, Array.prototype.slice.call(arguments)).replace(/function ([^(]+)\(([^)]*)\) {/g, "function $1($2) {\n\t$1.calls=($1.calls|0)+1");
    };})(gen.str);
    return gen;
};})(protobuf.util.codegen);

/**
 * Debugging utility functions. Only present in debug builds.
 * @namespace
 */
var debug = protobuf.debug = {};

/**
 * Returns a list of unused types within the specified root.
 * @param {NamespaceBase} ns Namespace to search
 * @returns {Type[]} Unused types
 */
debug.unusedTypes = function unusedTypes(ns) {

    /* istanbul ignore next */
    if (!(ns instanceof protobuf.Namespace))
        throw TypeError("ns must be a namespace");
    /* istanbul ignore next */
    if (!ns.nested)
        return [];

    var unused = [];
    Object.keys(ns.nested).forEach(function(name) {
        var nested = ns.nested[name];
        if (nested instanceof protobuf.Type) {
            var calls = (nested.encode.calls|0)
                      + (nested.decode.calls|0)
                      + (nested.verify.calls|0)
                      + (nested.toObject.calls|0)
                      + (nested.fromObject.calls|0);
            if (!calls)
                unused.push(nested);
        } else if (nested instanceof protobuf.Namespace)
            Array.prototype.push.apply(unused, unusedTypes(nested));
    });
    return unused;
};
