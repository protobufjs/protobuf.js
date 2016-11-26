"use strict";
var protobuf = global.protobuf = exports;

var util = require("./util");

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @param {function(?Error, Root=)} [callback] Callback function
 * @returns {Promise<Root>|Object} A promise if callback has been omitted, otherwise the protobuf namespace
 * @throws {TypeError} If arguments are invalid
 */
function load(filename, root, callback) {
    if (typeof root === 'function') {
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback) || protobuf;
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
protobuf.util             = util;
