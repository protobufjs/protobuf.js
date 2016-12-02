"use strict";

/**
 * Minimal static codegen runtime.
 * @namespace
 */
var runtime = exports;

/**
 * @alias Reader
 */
runtime.Reader = require("./src/reader");

/**
 * @alias Writer
 */
runtime.Writer = require("./src/writer");

/**
 * Runtime utility.
 * @memberof runtime
 */
runtime.util = require("./src/util/runtime");

/**
 * Resolves lazy type references.
 * @param {Object} root Root object
 * @param {string[][]} lazyTypes Lazy type references
 * @returns {Object} `root`
 */
runtime.resolve = function resolve(root, lazyTypes) {
    lazyTypes.forEach(function(types) {
        types.forEach(function(path, i) {
            if (!path)
                return;
            path = path.split('.');
            var ptr = root;
            while (path.length)
                ptr = ptr[path.shift()];
            types[i] = ptr;
        });
    });
    return root;
};
