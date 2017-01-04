"use strict";

var util = exports;

util.base64   = require("@protobufjs/base64");
util.inquire  = require("@protobufjs/inquire");
util.utf8     = require("@protobufjs/utf8");
util.pool     = require("@protobufjs/pool");

util.LongBits = require("./longbits");

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);

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

/**
 * Tests if two arrays are not equal.
 * @param {Array.<*>} a Array 1
 * @param {Array.<*>} b Array 2
 * @returns {boolean} `true` if not equal, otherwise `false`
 */
util.arrayNe = function arrayNe(a, b) {
    if (a.length === b.length)
        for (var i = 0; i < a.length; ++i)
            if (a[i] !== b[i])
                return true;
    return false;
};

/**
 * Merges the properties of the source object into the destination object.
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
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
