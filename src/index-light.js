import {
    Writer,
    BufferWriter,
    Reader,
    BufferReader,
    rpc,
    roots,
    configure
} from "./index-minimal.js";
import { encoder } from "./encoder.js";
import { decoder } from "./decoder.js";
import { verifier } from "./verifier.js";
import { converter } from "./converter.js";
import { ReflectionObject } from "./object.js";
import { Namespace } from "./namespace.js";
import { Root } from "./root.js";
import { Enum } from "./enum.js";
import { Type } from "./type.js";
import { Field } from "./field.js";
import { OneOf } from "./oneof.js";
import { MapField } from "./mapfield.js";
import { Service } from "./service.js";
import { Method } from "./method.js";
import { Message } from "./message.js";
import { wrappers } from "./wrappers.js";
import { types } from "./types.js";
import { util } from "./util.js";

var build = "light";

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
        root = new Root();
    } else if (!root)
        root = new Root();
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
        root = new Root();
    return root.loadSync(filename);
}

// Set up possibly cyclic reflection dependencies
ReflectionObject._configure(Root);
Namespace._configure(Type, Service, Enum);
Root._configure(Type);
Field._configure(Type);
util._configure(Type, Enum, Root);

export * from "./index-minimal.js";
export {
    build,
    load,
    loadSync,
    encoder,
    decoder,
    verifier,
    converter,
    ReflectionObject,
    Namespace,
    Root,
    Enum,
    Type,
    Field,
    OneOf,
    MapField,
    Service,
    Method,
    Message,
    wrappers,
    types,
    util,
    Writer,
    BufferWriter,
    Reader,
    BufferReader,
    rpc,
    roots,
    configure
};
