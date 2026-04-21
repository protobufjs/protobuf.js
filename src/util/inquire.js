"use strict";
module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
  try {
    if (typeof require !== "function") {
      return null;
    }
    var mod = require(moduleName);
    if (mod && (mod.length || Object.keys(mod).length)) return mod;
    return null;
  } catch (err) {
    // ignore
    return null;
  }
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
