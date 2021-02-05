"use strict";
module.exports = inquire;

/**
 * Requires a module only if available.
 * All modules requested with inquire must be set as externals in browserify.json, e.g.
 *   "externals": [
 *     "long",
 *     "buffer"
 *   ]
 * and added ignored in the package.json browser field, e.g.
 *     "browser": {
 *         "long": false,
 *         "buffer": false
 *     }
 *
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = require(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}

/*
// maybe worth a shot to prevent renaming issues:
// see: https://github.com/webpack/webpack/blob/master/lib/dependencies/CommonJsRequireDependencyParserPlugin.js
// triggers on:
// - expression require.cache
// - expression require (???)
// - call require
// - call require:commonjs:item
// - call require:commonjs:context

Object.defineProperty(Function.prototype, "__self", { get: function() { return this; } });
var r = require.__self;
delete Function.prototype.__self;
*/
