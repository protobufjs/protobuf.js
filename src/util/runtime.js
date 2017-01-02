"use strict";

var util = exports;

util.LongBits = require("./longbits");
util.base64   = require("@protobufjs/base64");
util.inquire  = require("@protobufjs/inquire");
util.utf8     = require("@protobufjs/utf8");
util.pool     = require("@protobufjs/pool");

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);

/**
 * Whether running within IE8 or not.
 * @memberof util
 * @type {boolean}
 */
util.isIE8 = false; try { util.isIE8 = eval("!-[1,]"); } catch (e) {} // eslint-disable-line no-eval, no-empty

/**
 * Node's Buffer class if available.
 * @type {?function(new: Buffer)}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;

        /* istanbul ignore next */
        if (!Buffer.prototype.utf8Write) // refuse to use non-node buffers (performance)
            return null;

        /* istanbul ignore next */
        if (!Buffer.from)
            Buffer.from = function from(value, encoding) { return new Buffer(value, encoding); };

        /* istanbul ignore next */
        if (!Buffer.allocUnsafe)
            Buffer.allocUnsafe = function allocUnsafe(size) { return new Buffer(size); };

        return Buffer;

    /* istanbul ignore next */
    } catch (e) {
        return null;
    }
})();

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {?function(new: Uint8Array, *)}
 */
util.Array = typeof Uint8Array === "undefined" ? Array : Uint8Array;

/**
 * Long.js's Long class if available.
 * @type {?function(new: Long)}
 */
util.Long = global.dcodeIO && global.dcodeIO.Long || util.inquire("long");

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
    return value && typeof value === "object";
};

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Tests if a possibily long value equals the specified low and high bits.
 * @param {number|string|Long} val Value to test
 * @param {number} lo Low bits to test against
 * @param {number} hi High bits to test against
 * @returns {boolean} `true` if not equal
 */
util.longNe = function longNe(val, lo, hi) {
    if (typeof val === "object") // Long-like, null is invalid and throws
        return val.low !== lo || val.high !== hi;
    var bits = util.LongBits.from(val);
    return bits.lo !== lo || bits.hi !== hi;
};

/**
 * Converts the first character of a string to upper case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.ucFirst = function ucFirst(str) { // lcFirst counterpart is in core util
    return str.charAt(0).toUpperCase() + str.substring(1);
};

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : [];

/**
 * An immutable empty object.
 * @type {Object}
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : {};
