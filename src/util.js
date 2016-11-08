/**
 * Utility functions.
 * @namespace
 */
var util = module.exports = {};

var Reader = require("./reader"),
    Writer = require("./writer"),
    long_  = require("./support/long");

/**
 * Optional buffer class to use. If you assign any compatible buffer implementation to this
 * property, the library will use it.
 * @memberof util
 * @type {?Function}
 */
Object.defineProperty(util, "Buffer", {
    get: function() {
        return Writer.Buffer;
    },
    set: function(value) {
        Writer.Buffer = Reader.Buffer = value;
    }
});

try { util.Buffer = require("buffer").Buffer; } catch (e) {} // eslint-disable-line no-empty

/**
 * Optional Long class to use. If you assign any compatible long implementation to this property,
 * the library will use it.
 * @type {?Function}
 */
util.Long = null;

try { util.Long = require("long"); } catch (e) {} // eslint-disable-line no-empty

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
 * Tests if the specified value is an array.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an array
 */
util.isArray = Array.isArray;

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
 * @param {string} [description=a string] Expected argument descripotion
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
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn/*, varargs */) {
    return new Promise(function(resolve, reject) {
        fn.apply(null, Array.prototype.slice.call(arguments, 1).concat([
            function(err/*, varargs */) {
                if (err) reject(err);
                else resolve.apply(null, Array.prototype.slice.call(arguments, 1));
            }
        ]));
    });
}

util.asPromise = asPromise;

/**
 * Fetches the contents of a file.
 * @memberof util
 * @param {string} path File path or url
 * @param {function(?Error, string=)} [callback] Node-style callback
 * @returns {Promise<string>|undefined} Promise if callback has been omitted 
 */
function fetch(path, callback) {
    if (!callback)
        return asPromise(fetch, path);
    var fs; try { fs = require("fs"); } catch (e) {} // eslint-disable-line no-empty
    if (fs && fs.readFile)
        return fs.readFile(path, "utf8", callback);
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status !== 0 && xhr.status !== 200)
            return callback(Error("status " + xhr.status));
        if (isString(xhr.responseText))
            return callback(null, xhr.responseText);
        return callback(Error("request failed"));
    };
    xhr.onerror = function() {
        return callback(Error("request failed"));
    };
    xhr.open("GET", path, true);
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
    for (var i = 0, k = parts.length, part; i < k;)
        if ((part = parts[i]) === '..') {
            if (i > 0)
                parts.splice(--i, 2);
            else if (abs)
                parts.splice(i, 1);
            else
                ++i;
        } else if (part === '.')
            parts.splice(i, 1);
        else
            ++i;    return prefix + parts.join('/');
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
    originPath = originPath.replace(/\/[^/]+$/, '');
    return originPath.length ? normalizePath(originPath + '/' + importPath) : importPath;
};

/**
 * Converts a number or long-like object to an 8 characters long hash string.
 * @param {number|{ low: number, high: number }} value Value to convert
 * @returns {string} Hashed value
 */
util.toHash = function toHash(value) {
    return long_._set(value)._getHash();
};

/**
 * Converts an 8 characters long hash string to a number or long-like object.
 * @param {string} hash Hashed value to convert
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number|{ low: number, high: number, unsigned: boolean }} Original value
 */
util.fromHash = function fromHash(hash, unsigned) {
    return long_._setHash(hash)._get(Boolean(unsigned));
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
        for (var i = 0, k = keys.length, key; i < k; ++i)
            if (!dst[key = keys[i]] || !ifNotSet)
                dst[key] = src[key];
    }
    return dst;
};