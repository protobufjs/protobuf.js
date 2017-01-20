"use strict";
var protobuf = global.protobuf = exports;

protobuf.build = "minimal";

protobuf.roots = {};

// Serialization
protobuf.Writer       = require("../src/writer");
protobuf.BufferWriter = require("../src/writer_buffer");
protobuf.Reader       = require("../src/reader");
protobuf.BufferReader = require("../src/reader_buffer");

// Utility
protobuf.util         = require("../src/util/minimal");
protobuf.configure    = configure;

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
