"use strict";
var util = exports;

util.base64   = require("@protobufjs/base64");
util.inquire  = require("@protobufjs/inquire");
util.utf8     = require("@protobufjs/utf8");
util.pool     = require("@protobufjs/pool");

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ [];

/**
 * An immutable empty object.
 * @type {Object}
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {};

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
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

    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util.Buffer.allocUnsafe(sizeOrArray) // polyfilled
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util.Buffer.from(sizeOrArray) // polyfilled
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {?function(new: Uint8Array, *)}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

util.LongBits = require("./longbits");

/**
 * Long.js's Long class if available.
 * @type {?function(new: Long)}
 */
util.Long = /* istanbul ignore next */ global.dcodeIO && /* istanbul ignore next */ global.dcodeIO.Long || util.inquire("long");

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
 * Merges the properties of the source object into the destination object.
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
util.merge = function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
};

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {function():string|undefined} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    fieldNames.forEach(function(name) {
        fieldMap[name] = 1;
    });
    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {function(?string):undefined} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {
    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Lazily resolves fully qualified type names against the specified root.
 * @param {Root} root Root instanceof
 * @param {Object.<number,string|ReflectionObject>} lazyTypes Type names
 * @returns {undefined}
 */
util.lazyResolve = function lazyResolve(root, lazyTypes) {
    lazyTypes.forEach(function(types) {
        Object.keys(types).forEach(function(index) {
            var path = types[index |= 0].split("."),
                ptr  = root;
            while (path.length)
                ptr = ptr[path.shift()];
            types[index] = ptr;
        });
    });
};

/**
 * Default conversion options used for toJSON implementations.
 * @type {ConversionOptions}
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String
};
