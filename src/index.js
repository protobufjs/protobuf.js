"use strict";
module.exports = require("./index-light");

module.exports.build = "full";

// Parser
module.exports.tokenize         = require("./tokenize");
module.exports.parse            = require("./parse");
module.exports.common           = require("./common");

// Configure parser
module.exports.Root._configure(module.exports.Type, module.exports.parse, module.exports.common);
