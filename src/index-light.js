"use strict";
exports = module.exports = require("./index-minimal");

exports.build = "light";

/**
 * A node-style callback as used by {@link load} and {@link Root#load}.
 * @typedef LoadCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Root} [root] Root, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} root Root namespace, defaults to create a new one if omitted.
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 */
function load(filename, root, callback) {
    if (typeof root === "function") {
        callback = root;
        root = new exports.Root();
    } else if (!root)
        root = new exports.Root();
    return root.load(filename, callback);
}

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and returns a promise.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Promise<Root>} Promise
 * @see {@link Root#load}
 * @variation 3
 */
// function load(filename:string, [root:Root]):Promise<Root>

exports.load = load;

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into a common root namespace (node only).
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 * @see {@link Root#loadSync}
 */
function loadSync(filename, root) {
    if (!root)
        root = new exports.Root();
    return root.loadSync(filename);
}

exports.loadSync = loadSync;

// Serialization
exports.encoder          = require("./encoder");
exports.decoder          = require("./decoder");
exports.verifier         = require("./verifier");
exports.converter        = require("./converter");

// Reflection
exports.ReflectionObject = require("./object");
exports.Namespace        = require("./namespace");
exports.Root             = require("./root");
exports.Enum             = require("./enum");
exports.Type             = require("./type");
exports.Field            = require("./field");
exports.OneOf            = require("./oneof");
exports.MapField         = require("./mapfield");
exports.Service          = require("./service");
exports.Method           = require("./method");

// Runtime
exports.Message          = require("./message");
exports.wrappers         = require("./wrappers");

// Utility
exports.types            = require("./types");
exports.util             = require("./util");

// Set up possibly cyclic reflection dependencies
exports.ReflectionObject._configure(exports.Root);
exports.Namespace._configure(exports.Type, exports.Service, exports.Enum);
exports.Root._configure(exports.Type, undefined, {});
exports.Field._configure(exports.Type);
