"use strict";
module.exports = require("./index-minimal");

module.exports.build = "light";

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
        root = new module.exports.Root();
    } else if (!root)
        root = new module.exports.Root();
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

module.exports.load = load;

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
        root = new module.exports.Root();
    return root.loadSync(filename);
}

module.exports.loadSync = loadSync;

// Serialization
module.exports.encoder          = require("./encoder");
module.exports.decoder          = require("./decoder");
module.exports.verifier         = require("./verifier");
module.exports.converter        = require("./converter");

// Reflection
module.exports.ReflectionObject = require("./object");
module.exports.Namespace        = require("./namespace");
module.exports.Root             = require("./root");
module.exports.Enum             = require("./enum");
module.exports.Type             = require("./type");
module.exports.Field            = require("./field");
module.exports.OneOf            = require("./oneof");
module.exports.MapField         = require("./mapfield");
module.exports.Service          = require("./service");
module.exports.Method           = require("./method");

// Runtime
module.exports.Message          = require("./message");
module.exports.wrappers         = require("./wrappers");

// Utility
module.exports.types            = require("./types");
module.exports.util             = require("./util");

// Set up possibly cyclic reflection dependencies
module.exports.ReflectionObject._configure(module.exports.Root);
module.exports.Namespace._configure(module.exports.Type, module.exports.Service, module.exports.Enum);
module.exports.Root._configure(module.exports.Type, undefined, {});
module.exports.Field._configure(module.exports.Type);
