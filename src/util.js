"use strict";

/**
 * Various utility functions.
 * @namespace
 */
var util = module.exports = require("./util/minimal");

util.codegen = require("@protobufjs/codegen");
util.extend  = require("@protobufjs/extend");
util.fetch   = require("@protobufjs/fetch");
util.path    = require("@protobufjs/path");

/**
 * Node's fs module if available.
 * @type {Object.<string,*>}
 */
util.fs = util.inquire("fs");

/**
 * Converts an object's values to an array.
 * @param {Object.<string,*>} object Object to convert
 * @returns {Array.<*>} Converted array
 */
util.toArray = function toArray(object) {
    return object ? Object.keys(object).map(function(key) {
        return object[key];
    }) : [];
};

/**
 * Returns a safe property accessor for the specified properly name.
 * @param {string} prop Property name
 * @returns {string} Safe accessor
 */
util.safeProp = function safeProp(prop) {
    return "[\"" + prop.replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\"]";
};

/**
 * Converts the first character of a string to upper case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.ucFirst = function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
};
