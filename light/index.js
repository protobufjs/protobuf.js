"use strict";
var protobuf = global.protobuf = exports;

protobuf.build = "light";

function load(filename, root, callback) {
    if (typeof root === "function") {
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback);
}

protobuf.load = load;

function loadSync(filename, root) {
    if (!root)
        root = new protobuf.Root();
    return root.loadSync(filename);
}

protobuf.loadSync = loadSync;

protobuf.roots = {};

// Serialization
protobuf.Writer           = require("../src/writer");
protobuf.BufferWriter     = require("../src/writer_buffer");
protobuf.Reader           = require("../src/reader");
protobuf.BufferReader     = require("../src/reader_buffer");
protobuf.encoder          = require("../src/encoder");
protobuf.decoder          = require("../src/decoder");
protobuf.verifier         = require("../src/verifier");
protobuf.converter        = require("../src/converter");

// Reflection
protobuf.ReflectionObject = require("../src/object");
protobuf.Namespace        = require("../src/namespace");
protobuf.Root             = require("../src/root");
protobuf.Enum             = require("../src/enum");
protobuf.Type             = require("../src/type");
protobuf.Field            = require("../src/field");
protobuf.OneOf            = require("../src/oneof");
protobuf.MapField         = require("../src/mapfield");
protobuf.Service          = require("../src/service");
protobuf.Method           = require("../src/method");

// Runtime
protobuf.Class            = require("../src/class");
protobuf.Message          = require("../src/message");

// Utility
protobuf.types            = require("../src/types");
protobuf.rpc              = require("../src/rpc");
protobuf.util             = require("../src/util");
protobuf.configure        = configure;

function configure() {
    protobuf.Reader._configure();
}

if (typeof define === "function" && define.amd)
    define(["long"], function(Long) {
        if (Long) {
            protobuf.util.Long = Long;
            configure();
        }
        return protobuf;
    });
