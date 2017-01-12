// This file exports just the bare minimum required to work with statically generated code.
// Can be used as a drop-in replacement for the full library as it has the same general structure.
"use strict";
var protobuf = global.protobuf = exports;

protobuf.Writer       = require("../src/writer");
protobuf.BufferWriter = require("../src/writer_buffer");
protobuf.Reader       = require("../src/reader");
protobuf.BufferReader = require("../src/reader_buffer");
protobuf.util         = require("../src/util/runtime");
protobuf.roots        = {};
protobuf.configure    = configure;

function configure() {
    protobuf.Reader._configure();
}

// Be nice to AMD
if (typeof define === "function" && define.amd)
    define(["long"], function(Long) {
        if (Long) {
            protobuf.util.Long = Long;
            configure();
        }
        return protobuf;
    });
