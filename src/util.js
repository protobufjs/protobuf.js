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
 * @type {Object}
 */
util.fs = util.inquire("fs");

/**
 * Converts an object's values to an array.
 * @param {Object.<string,*>} object Object to convert
 * @returns {Array.<*>} Converted array
 */
util.toArray = function toArray(object) {
    if (!object)
        return [];
    var names = Object.keys(object),
        length = names.length;
    var array = new Array(length);
    for (var i = 0; i < length; ++i)
        array[i] = object[names[i]];
    return array;
};

/**
 * Creates a type error.
 * @param {string} name Argument name
 * @param {string} [description="a string"] Expected argument descripotion
 * @returns {TypeError} Created type error
 * @private
 */
util._TypeError = function(name, description) {
    return TypeError(name + " must be " + (description || "a string"));
};

/**
 * Merges the properties of the source object into the destination object.
 * @param {Object} dst Destination object
 * @param {Object} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object} Destination object
 */
util.merge = function merge(dst, src, ifNotSet) {
    if (src) {
        var keys = Object.keys(src);
        for (var i = 0; i < keys.length; ++i)
            if (dst[keys[i]] === undefined || !ifNotSet)
                dst[keys[i]] = src[keys[i]];
    }
    return dst;
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
 * Converts the second character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) { // ucFirst counterpart is in runtime util
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number} [size=0] Buffer size
 * @returns {Uint8Array} Buffer
 */
util.newBuffer = function newBuffer(size) {
    size = size || 0;
    return util.Buffer
        ? util.Buffer.allocUnsafe ? util.Buffer.allocUnsafe(size) : new util.Buffer(size)
        : new (typeof Uint8Array !== "undefined" ? Uint8Array : Array)(size);
};
