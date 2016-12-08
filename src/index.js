"use strict";
var protobuf = global.protobuf = exports;

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} root Root namespace, defaults to create a new one if omitted.
 * @param {function(?Error, Root=)} callback Callback function
 * @returns {undefined}
 * @throws {TypeError} If arguments are invalid
 */
function load(filename, root, callback) {
    if (typeof root === 'function') {
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback);
}
// function load(filename:string, root:Root, callback:function):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {function(?Error, Root=)} callback Callback function
 * @returns {undefined}
 * @throws {TypeError} If arguments are invalid
 * @variation 2
 */
// function load(filename:string, callback:function):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and returns a promise.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Promise<Root>} Promise
 * @throws {TypeError} If arguments are invalid
 * @variation 3
 */
// function load(filename:string, [root:Root]):Promise<Root>

protobuf.load = load;

// Parser
protobuf.tokenize         = require("./tokenize");
protobuf.parse            = require("./parse");

// Serialization
protobuf.Writer           = require("./writer");
protobuf.BufferWriter     = protobuf.Writer.BufferWriter;
protobuf.Reader           = require("./reader");
protobuf.BufferReader     = protobuf.Reader.BufferReader;
protobuf.codegen          = require("./codegen");

// Reflection
protobuf.ReflectionObject = require("./object");
protobuf.Namespace        = require("./namespace");
protobuf.Root             = require("./root");
protobuf.Enum             = require("./enum");
protobuf.Type             = require("./type");
protobuf.Field            = require("./field");
protobuf.OneOf            = require("./oneof");
protobuf.MapField         = require("./mapfield");
protobuf.Service          = require("./service");
protobuf.Method           = require("./method");

// Runtime
protobuf.Prototype        = require("./prototype");
protobuf.inherits         = require("./inherits");

// Utility
protobuf.types            = require("./types");
protobuf.common           = require("./common");
protobuf.rpc              = require("./rpc");
protobuf.util             = require("./util");

// Be nice to AMD
if (typeof define === 'function' && define.amd)
    define(["long"], function(Long) {
        if (Long) {
            protobuf.util.Long = Long;
            protobuf.Reader.configure();
        }
        return protobuf;
    });
