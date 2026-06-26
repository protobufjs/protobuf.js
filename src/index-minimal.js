"use strict";

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
exports.build = "minimal";

// Serialization
exports.Writer       = require("./writer");
exports.BufferWriter = require("./writer_buffer");
exports.Reader       = require("./reader");
exports.BufferReader = require("./reader_buffer");

// Utility
exports.util         = require("./util/minimal");
exports.rpc          = require("./rpc");
exports.roots        = require("./roots");
exports.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    exports.Writer._configure(exports.BufferWriter);
    exports.Reader._configure(exports.BufferReader);
}

// Set up buffer utility according to the environment
configure();
