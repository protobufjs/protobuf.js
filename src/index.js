var protobuf = global.protobuf = exports;

var util = require("./util");

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @param {function(?Error, Root=)} [callback] Callback function
 * @param {Object} [ctx] Optional callback context
 * @returns {Promise<Root>|Object} A promise if callback has been omitted, otherwise the protobuf namespace
 * @throws {TypeError} If arguments are invalid
 */
function load(filename, root, callback, ctx) {
    if (typeof root === 'function') {
        ctx = callback;
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback, ctx) || protobuf;
}

protobuf.load = load;

// Parser
protobuf.tokenize         = require("./tokenize");
protobuf.parse            = require("./parse");

// Serialization
protobuf.Writer           = require("./writer");
protobuf.BufferWriter     = protobuf.Writer.BufferWriter;
protobuf.Reader           = require("./reader");
protobuf.BufferReader     = protobuf.Reader.BufferReader;
protobuf.Encoder          = require("./encoder");
protobuf.Decoder          = require("./decoder");

// Reflection
protobuf.ReflectionObject = require("./object");
protobuf.Namespace        = require("./namespace");
protobuf.Root             = require("./root");
protobuf.Type             = require("./type");
protobuf.Field            = require("./field");
protobuf.MapField         = require("./mapfield");
protobuf.Enum             = require("./enum");
protobuf.Service          = require("./service");
protobuf.Method           = require("./method");

// Runtime
protobuf.Prototype        = require("./prototype");
protobuf.inherits         = require("./inherits");

// Utility
protobuf.types            = require("./types");
protobuf.util             = util;
