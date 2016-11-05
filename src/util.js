var fs     = require("fs"),
    buffer = require("buffer");
var long_,
    Long; try { Long = require("long"); } catch (e) {} // eslint-disable-line no-empty

/**
 * Utility functions.
 * @namespace
 */
var util = module.exports = {};

/**
 * Whether running under node.js or not.
 * @type {boolean}
 */
util.isNode = Boolean(typeof process !== 'undefined' && process.versions);

/**
 * Optional buffer class to use. If you assign any compatible buffer implementation to this
 * property, the library will use it.
 * @type {?function(new:Buffer)}
 */
util.Buffer = buffer && buffer.Buffer || null;

/**
 * Optional Long class to use. If you assign any compatible long implementation to this property,
 * the library will use it.
 * @type {?function(new:Long)}
 */
util.Long = Long || null;

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
 * Tests if the specified value is a function.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a function
 */
util.isFunction = function isFunction(value) {
    return typeof value === 'function';
};

/**
 * Tests if the specified value is a number.
 * @memberof util
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a number
 */
function isNumber(value) {
    return typeof value === 'number';
}

util.isNumber = isNumber;

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || function isInteger(value) {
    return isNumber(value) && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a boolean.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a boolean
 */
util.isBoolean = function isBoolean(value) {
    return typeof value === 'boolean';
};

/**
 * Creates a type error.
 * @param {string} name Argument name
 * @param {string} [typeName=string] Expected argument type name
 * @returns {!TypeError} Created type error
 * @private
 */
util._TypeError = function(name, typeName) {
    return TypeError(name + " must be of type " + (typeName || "string"));
};

/**
 * Returns a promise from a node-style function.
 * @memberof util
 * @param {function(Error, ...*)} fn Function to call
 * @returns {!Promise} Promisified function
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
 * @returns {!Promise|undefined} Promise if callback has been omitted 
 */
function fetch(path, callback) { // eslint-disable-line consistent-return
    if (!callback)
        return asPromise(fetch, path);
    if (fs && fs.readFile) {
        fs.readFile(path, "utf8", function(err, data) {
            if (data) data = data.toString();
            callback(err, data);
        });
        return; // eslint-disable-line consistent-return
    }
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
            ++i;
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
    originPath = originPath.replace(/\/[^/]+$/, '');
    return originPath.length ? normalizePath(originPath + '/' + importPath) : importPath;
};

// One time function to initialize long support
var initLongSupport = function() {
    long_ = require("./support/long");
    util.toHash = toHash;
    util.fromHash = fromHash;
    initLongSupport = false;
};

/**
 * Converts a number or long-like object to an 8 characters long hash string.
 * @memberof util
 * @param {number|!{ low: number, high: number }} value Value to convert
 * @returns {string} Hashed value
 */
function toHash(value) {
    return long_._set(value)._getHash();
}

util.toHash = function(value) { // becomes overridden by initLongSupport
    if (initLongSupport)
        initLongSupport();
    return toHash(value);
};

/**
 * Converts an 8 characters long hash string to a number or long-like object.
 * @memberof util
 * @param {string} hash Hashed value to convert
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number|!{ low: number, high: number, unsigned: boolean }} Original value
 */
function fromHash(hash, unsigned) {
    return long_._setHash(hash)._get(Boolean(unsigned));
}

util.fromHash = function(hash, unsigned) { // becomes overridden by initLongSupport
    if (initLongSupport)
        initLongSupport();
    return fromHash(hash, unsigned);
};
