"use strict";

/**
 * Minimal static codegen runtime.
 * @namespace
 */
var runtime = exports;

/** @alias Reader */
runtime.Reader = require("./src/reader");

/** @alias Writer */
runtime.Writer = require("./src/writer");

/** @alias util */
runtime.util = require("./src/util/runtime");
