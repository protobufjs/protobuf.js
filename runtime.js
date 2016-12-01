"use strict";

/**
 * Minimal static code generator runtime.
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
var util = runtime.util = {};

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? LongBits.from(value).toHash()
        : '\0\0\0\0\0\0\0\0';
};

/**
 * Tests if two possibly long values are not equal.
 * @param {number|Long} a First value
 * @param {number|Long} b Second value
 * @returns {boolean} `true` if not equal
 */
util.longNeq = function longNeq(a, b) {
    return typeof a === 'number'
         ? typeof b === 'number'
            ? a !== b
            : (a = LongBits.fromNumber(a)).lo !== b.low || a.hi !== b.high
         : typeof b === 'number'
            ? (b = LongBits.fromNumber(b)).lo !== a.low || b.hi !== a.high
            : a.low !== b.low || a.high !== b.high;
};

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
