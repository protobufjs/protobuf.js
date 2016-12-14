// This file exports just the bare minimum required to work with statically generated code.
// Can be used as a drop-in replacement for the full library as it has the same general structure.
var protobuf = exports;

var Writer = protobuf.Writer = require("../src/writer");
protobuf.BufferWriter = Writer.BufferWriter;
var Reader = protobuf.Reader = require("../src/reader");
protobuf.BufferReader = Reader.BufferReader;
protobuf.util = require("../src/util/runtime");
protobuf.roots = {};
protobuf.configure = configure;

function configure() {
    Reader._configure();
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
