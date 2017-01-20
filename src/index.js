"use strict";
var protobuf = module.exports = require("./index-light");

protobuf.build = "full";

// Parser
protobuf.tokenize         = require("./tokenize");
protobuf.parse            = require("./parse");
protobuf.common           = require("./common");

protobuf.Root._configure(protobuf.parse, protobuf.common);
