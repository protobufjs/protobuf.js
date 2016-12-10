// This file exports just the bare minimum required to work with statically generated code.
// Can be used as a drop-in replacement for the full library as it has the same general structure.
var protobuf_rt = exports;
protobuf_rt.Reader = require("../src/reader");
protobuf_rt.Writer = require("../src/writer");
protobuf_rt.util   = require("../src/util/runtime");
