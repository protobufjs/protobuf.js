"use strict";

/**
 * A minimal path module to resolve Unix, Windows and URL paths alike.
 * @memberof util
 * @namespace
 */
var path = exports;

var absolutePrefix =
/**
 * Gets the prefix of an absolute Windows, UNC, or Unix path or a URL that indicates it's absolute.
 * @param {string} path Path to test
 * @returns {string|null} the prefix, or null if path is relative
 */
path.absolutePrefix = function absolutePrefix(path) {
    var match;
    if (path.startsWith("\\\\")) {
        // UNC path
        return "\\\\";
    } else if ((match = /^\w*:\/\//.exec(path)) !== null) {
        // URL
        return match[0];
    } else if ((match = /^\w:/.exec(path)) !== null) {
        // Windows path
        return match[0];
    } else if (path.startsWith("/")) {
        // Unix path
        return "/";
    } else {
        return null;
    }
}

var isAbsolute =
/**
 * Tests if the specified path is absolute.
 * @param {string} path Path to test
 * @returns {boolean} `true` if path is absolute
 */
path.isAbsolute = function isAbsolute(path) {
    return absolutePrefix(path) !== null;
};

var normalize =
/**
 * Normalizes the specified path.
 * @param {string} path Path to normalize
 * @returns {string} Normalized path
 */
path.normalize = function normalize(path) {
    var absolute = false;
    var prefix = absolutePrefix(path);
    if (prefix !== null) {
        absolute = true;
        path = path.substring(prefix.length);
    } else {
        prefix = "";
    }

    path = path.replace(/\\/g, "/")
               .replace(/\/{2,}/g, "/");
    var parts = path.split("/");
    for (var i = 0; i < parts.length;) {
        if (parts[i] === "..") {
            if (i > 0 && parts[i - 1] !== "..")
                parts.splice(--i, 2);
            else if (absolute)
                parts.splice(i, 1);
            else
                ++i;
        } else if (parts[i] === ".")
            parts.splice(i, 1);
        else
            ++i;
    }
    return prefix + parts.join("/");
};

/**
 * Resolves the specified include path against the specified origin path.
 * @param {string} originPath Path to the origin file
 * @param {string} includePath Include path relative to origin path
 * @param {boolean} [alreadyNormalized=false] `true` if both paths are already known to be normalized
 * @returns {string} Path to the include file
 */
path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
    if (!alreadyNormalized)
        includePath = normalize(includePath);
    if (isAbsolute(includePath))
        return includePath;
    if (!alreadyNormalized)
        originPath = normalize(originPath);
    return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
};
