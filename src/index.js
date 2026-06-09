"use strict";
exports = module.exports = require("./index-light");

exports.build = "full";

// Parser
exports.tokenize         = require("./tokenize");
exports.parse            = require("./parse");
exports.common           = require("./common");

// Configure parser
exports.Root._configure(exports.Type, exports.parse, exports.common);
