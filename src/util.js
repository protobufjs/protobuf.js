var fs     = require("fs"),
    buffer = require("buffer");
var Long; try { Long = require("long"); } catch (e) {} // eslint-disable-line no-empty

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
 * Optional buffer class to use.
 * @type {?function(new:Buffer)}
 */
util.Buffer = buffer && buffer.Buffer || null;

/**
 * Optional Long class to use.
 * @type {?function(new:Long)}
 */
util.Long = Long || null;

/**
 * Tests if the specified value is a string.
 * @memberof util
 * @param {*} value
 * @returns {boolean}
 */
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

util.isString = isString;

/**
 * Tests if the specified value is an non-null object.
 * @param {*} value
 * @returns {boolean}
 */
util.isObject = function isObject(value) {
    return Boolean(value && typeof value === 'object');
};

/**
 * Tests if the specified value is an array.
 * @function
 * @param {*} value
 * @returns {boolean}
 */
util.isArray = Array.isArray;

/**
 * Tests if the specified value is a function.
 * @param {*} value
 * @returns {boolean}
 */
util.isFunction = function isFunction(value) {
    return typeof value === 'function';
};

/**
 * Tests if the specified value is a number.
 * @param {*} value
 * @returns {boolean}
 */
util.isNumber = function isNumber(value) {
    return typeof value === 'number';
};

/**
 * Tests if the specified value is a boolean.
 * @param {*} value
 * @returns {boolean}
 */
util.isBoolean = function isBoolean(value) {
    return typeof value === 'boolean';
};

/**
 * Returns a promise from a node-style function.
 * @memberof util
 * @param {function(Error, ...)} fn Function to call
 * @returns {!Promise}
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
 * @param {function(?Error, string=)=} callback
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
 * @param {string} path
 * @returns {boolean}
 */
function isAbsolutePath(path) {
    return /^(?:\/|[a-zA-Z0-9]+:)/.test(path);
}

util.isAbsolutePath = isAbsolutePath;

/**
 * Normalizes the specified path.
 * @memberof util
 * @param {string} path
 * @returns {string}
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
