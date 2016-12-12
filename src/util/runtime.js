"use strict";

var util = exports;

var LongBits = util.LongBits = require("./longbits");

util.base64 = require("@protobufjs/base64");
util.utf8   = require("@protobufjs/utf8");
util.pool   = require("@protobufjs/pool");

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
var isNode = util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);

/**
 * Optional buffer class to use.
 * If you assign any compatible buffer implementation to this property, the library will use it.
 * @type {*}
 */
util.Buffer = null;

if (isNode)
    try { util.Buffer = require("buffer").Buffer; } catch (e) {} // eslint-disable-line no-empty

/**
 * Optional Long class to use.
 * If you assign any compatible long implementation to this property, the library will use it.
 * @type {*}
 */
util.Long = global.dcodeIO && global.dcodeIO.Long || null;

if (!util.Long && isNode)
    try { util.Long = require("long"); } catch (e) {} // eslint-disable-line no-empty

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return Boolean(value && typeof value === "object");
};

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? LongBits.from(value).toHash()
        : "\0\0\0\0\0\0\0\0";
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Tests if two possibly long values are not equal.
 * @param {number|Long} a First value
 * @param {number|Long} b Second value
 * @returns {boolean} `true` if not equal
 */
util.longNeq = function longNeq(a, b) {
    return typeof a === "number"
         ? typeof b === "number"
            ? a !== b
            : (a = LongBits.fromNumber(a)).lo !== b.low || a.hi !== b.high
         : typeof b === "number"
            ? (b = LongBits.fromNumber(b)).lo !== a.low || b.hi !== a.high
            : a.low !== b.low || a.high !== b.high;
};

/**
 * Defines the specified properties on the specified target. Also adds getters and setters for non-ES5 environments.
 * @param {Object} target Target object
 * @param {Object} descriptors Property descriptors
 * @returns {undefined}
 */
util.props = function props(target, descriptors) {
    Object.keys(descriptors).forEach(function(key) {
        util.prop(target, key, descriptors[key]);
    });
};

/**
 * Defines the specified property on the specified target. Also adds getters and setters for non-ES5 environments.
 * @param {Object} target Target object
 * @param {string} key Property name
 * @param {Object} descriptor Property descriptor
 * @returns {undefined}
 */
util.prop = function prop(target, key, descriptor) {
    var ie8 = !-[1,];
    var ucKey = key.substring(0, 1).toUpperCase() + key.substring(1);
    if (descriptor.get)
        target["get" + ucKey] = descriptor.get;
    if (descriptor.set)
        target["set" + ucKey] = ie8
            ? function(value) {
                  descriptor.set.call(this, value);
                  this[key] = value;
              }
            : descriptor.set;
    if (ie8) {
        if (descriptor.value !== undefined)
            target[key] = descriptor.value;
    } else
        Object.defineProperty(target, key, descriptor);
};

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 */
util.emptyArray = Object.freeze([]);

/**
 * An immutable empty object.
 * @type {Object}
 */
util.emptyObject = Object.freeze({});
