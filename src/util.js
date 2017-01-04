"use strict";

/**
 * Various utility functions.
 * @namespace
 */
var util = module.exports = require("./util/runtime");

util.asPromise    = require("@protobufjs/aspromise");
util.codegen      = require("@protobufjs/codegen");
util.EventEmitter = require("@protobufjs/eventemitter");
util.extend       = require("@protobufjs/extend");
util.fetch        = require("@protobufjs/fetch");
util.path         = require("@protobufjs/path");

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
    return object ? Object.values ? Object.values(object) : Object.keys(object).map(function(key) {
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
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Converts the first character of a string to upper case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.ucFirst = function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
};

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number} [size=0] Buffer size
 * @returns {Uint8Array} Buffer
 */
util.newBuffer = function newBuffer(size) {
    size = size || 0;
    return util.Buffer
        ? util.Buffer.allocUnsafe(size)
        : new (typeof Uint8Array !== "undefined" ? Uint8Array : Array)(size);
};
