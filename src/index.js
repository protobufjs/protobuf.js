var util = require("./util");

var protobuf = module.exports = {};

/**
 * Loads one or multiple .proto files into a common root namespace.
 * @param {string|!Array.<string>} filename One or multiple files to load
 * @param {!Root} [root] Root namespace, defaults to create a new one if omitted.
 * @param {!function(Error, !Root=)} [callback] Callback function
 * @param {!Object} [ctx] Optional callback context
 * @returns {!Promise} If callback has been omitted
 * @throws {TypeError} If arguments are invalid
 */
protobuf.load = function load(filename, root, callback, ctx) {
    if (util.isFunction(root)) {
        ctx = callback;
        callback = root;
        root = undefined;
    }
    if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback, ctx);
};

// Parser
protobuf.tokenize = require("./tokenize");
protobuf.parse = require("./parse");

// Serialization
protobuf.Writer = require("./writer");
protobuf.BufferWriter = protobuf.Writer.BufferWriter;
protobuf.Reader = require("./reader");
protobuf.BufferReader = protobuf.Reader.BufferReader;

// Reflection
protobuf.ReflectionObject = require("./object");
protobuf.Namespace = require("./namespace");
protobuf.Root = require("./root");
protobuf.Type = require("./type");
protobuf.Field = require("./field");
protobuf.MapField = require("./mapfield");
protobuf.Enum = require("./enum");
protobuf.Service = require("./service");
protobuf.Method = require("./method");

// Runtime
protobuf.Prototype = require("./prototype");

// Utility
protobuf.util = util;
protobuf.types = require("./types");
