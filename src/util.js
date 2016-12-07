"use strict";

/**
 * Utility functions.
 * @namespace
 */
var util = exports;

/**
 * Tests if the specified value is a string.
 * @memberof util
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

util.isString = isString;

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return Boolean(value && typeof value === 'object');
};

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

/**
 * Converts an object's values to an array.
 * @param {Object.<string,*>} object Object to convert
 * @returns {Array.<*>} Converted array
 */
util.toArray = function toArray(object) {
    if (!object)
        return [];
    var names = Object.keys(object),
        length = names.length;
    var array = new Array(length);
    for (var i = 0; i < length; ++i)
        array[i] = object[names[i]];
    return array;
};

/**
 * Creates a type error.
 * @param {string} name Argument name
 * @param {string} [description="a string"] Expected argument descripotion
 * @returns {TypeError} Created type error
 * @private
 */
util._TypeError = function(name, description) {
    return TypeError(name + " must be " + (description || "a string"));
};

/**
 * Returns a promise from a node-style function.
 * @memberof util
 * @param {function(Error, ...*)} fn Function to call
 * @param {Object} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var args = [];
    for (var i = 2; i < arguments.length; ++i)
        args.push(arguments[i]);
    return new Promise(function(resolve, reject) {
        fn.apply(ctx, args.concat(
            function(err/*, varargs */) {
                if (err) reject(err);
                else resolve.apply(null, Array.prototype.slice.call(arguments, 1));
            }
        ));
    });
}

util.asPromise = asPromise;

/**
 * Fetches the contents of a file.
 * @memberof util
 * @param {string} path File path or url
 * @param {function(?Error, string=)} [callback] Node-style callback
 * @returns {Promise<string>|undefined} A Promise if `callback` has been omitted 
 */
function fetch(path, callback) {
    if (!callback)
        return asPromise(fetch, util, path);
    var fs; try { fs = require("fs"); } catch (e) {} // eslint-disable-line no-empty
    if (fs && fs.readFile)
        return fs.readFile(path, "utf8", callback);
    var xhr = new XMLHttpRequest();
    function onload() {
        if (xhr.status !== 0 && xhr.status !== 200)
            return callback(Error("status " + xhr.status));
        if (isString(xhr.responseText))
            return callback(null, xhr.responseText);
        return callback(Error("request failed"));
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4)
            onload();
    };
    xhr.open("GET", path, true);
    xhr.send();
    return undefined;
}

util.fetch = fetch;

/**
 * Tests if the specified path is absolute.
 * @memberof util
 * @param {string} path Path to test
 * @returns {boolean} `true` if path is absolute
 */
function isAbsolutePath(path) {
    return /^(?:\/|[a-zA-Z0-9]+:)/.test(path);
}

util.isAbsolutePath = isAbsolutePath;

/**
 * Normalizes the specified path.
 * @memberof util
 * @param {string} path Path to normalize
 * @returns {string} Normalized path
 */
function normalizePath(path) {
    path = path.replace(/\\/g, '/')
               .replace(/\/{2,}/g, '/');
    var parts = path.split('/');
    var abs = isAbsolutePath(path);
    var prefix = "";
    if (abs)
        prefix = parts.shift() + '/';
    for (var i = 0; i < parts.length;) {
        if (parts[i] === '..') {
            if (i > 0)
                parts.splice(--i, 2);
            else if (abs)
                parts.splice(i, 1);
            else
                ++i;
        } else if (parts[i] === '.')
            parts.splice(i, 1);
        else
            ++i;
    }
    return prefix + parts.join('/');
}

util.normalizePath = normalizePath;

/**
 * Resolves the specified include path against the specified origin path.
 * @param {string} originPath Path that was used to fetch the origin file
 * @param {string} importPath Import path specified in the origin file
 * @param {boolean} [alreadyNormalized] `true` if both paths are already known to be normalized
 * @returns {string} Path to the imported file
 */
util.resolvePath = function resolvePath(originPath, importPath, alreadyNormalized) {
    if (!alreadyNormalized)
        importPath = normalizePath(importPath);
    if (isAbsolutePath(importPath))
        return importPath;
    if (!alreadyNormalized)
        originPath = normalizePath(originPath);
    originPath = originPath.replace(/(?:\/|^)[^/]+$/, '');
    return originPath.length ? normalizePath(originPath + '/' + importPath) : importPath;
};

/**
 * Merges the properties of the source object into the destination object.
 * @param {Object} dst Destination object
 * @param {Object} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object} Destination object
 */
util.merge = function merge(dst, src, ifNotSet) {
    if (src) {
        var keys = Object.keys(src);
        for (var i = 0; i < keys.length; ++i)
            if (dst[keys[i]] === undefined || !ifNotSet)
                dst[keys[i]] = src[keys[i]];
    }
    return dst;
};

/**
 * Returns a safe property accessor for the specified properly name.
 * @param {string} prop Property name
 * @returns {string} Safe accessor
 */
util.safeProp = function safeProp(prop) {
    return "['" + prop.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "']";
};

/**
 * Minimalistic sprintf.
 * @param {string} format Format string
 * @param {...*} args Replacements
 * @returns {string} Formatted string
 */
util.sprintf = function sprintf(format) {
    var params = Array.prototype.slice.call(arguments, 1),
        index  = 0;
    return format.replace(/%([djs])/g, function($0, $1) {
        var param = params[index++];
        switch ($1) {
            case "j":
                return JSON.stringify(param);
            case "p":
                return util.safeProp(param);
            default:
                return String(param);
        }
    });
};

/**
 * Converts a string to camel case notation.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.camelCase = function camelCase(str) {
    return str.substring(0,1)
         + str.substring(1)
               .replace(/_([a-z])(?=[a-z]|$)/g, function($0, $1) { return $1.toUpperCase(); });
};

/**
 * Converts a string to underscore notation.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.underScore = function underScore(str) {
    return str.substring(0,1)
         + str.substring(1)
               .replace(/([A-Z])(?=[a-z]|$)/g, function($0, $1) { return "_" + $1.toLowerCase(); });
};

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number} [size=0] Buffer size
 * @returns {Uint8Array} Buffer
 */
util.newBuffer = function newBuffer(size) {
    size = size || 0; 
    return util.Buffer
        ? util.Buffer.allocUnsafe && util.Buffer.allocUnsafe(size) || new util.Buffer(size)
        : new (typeof Uint8Array !== 'undefined' && Uint8Array || Array)(size);
};

// Merge in runtime utility
util.merge(util, require("./util/runtime"));
