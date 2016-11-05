// This module provides unified access to Uint8Array methods. If Uint8Array isn't supported, it
// falls back to plain arrays.

var isTypedArray = typeof Uint8Array !== 'undefined';

var ArrayImpl = isTypedArray ? Uint8Array : Array;

/**
 * Supported array implementation
 * @type {Function}
 * @private
 */
exports._Array = ArrayImpl;

/**
 * Allocates a new array.
 * @param {number} size Array size
 * @returns {number[]} Allocated array
 * @private
 */
exports._alloc = function(size) {
    return new ArrayImpl(size);
};

/**
 * Slices an array with slice, if supported, otherwise falls back to subarray.
 * @function
 * @param {number} start Start offset
 * @param {number} [end] End offset
 * @returns {number[]}
 * @private
 */
exports._slice = ArrayImpl.prototype.slice || ArrayImpl.prototype.subarray;

/**
 * Sets the contents of another array on this array. Polyfilled for plain arrays.
 * @function
 * @param {number[]} array Array to set
 * @param {number} offset Offset to begin setting at
 * @returns {undefined}
 * @private
 */
exports._set = ArrayImpl.prototype.set || function set_array(array, offset) {
    if (offset + array.length > this.length)
        throw RangeError("offset would store beyond the end of the array");
    for (var i = 0, k = array.length; i < k; ++i)
        this[offset + i] = array[i];
};

/**
 * Empty array instance, if immutable, otherwise null.
 * @type {?number[]}
 * @private
 */
exports._empty = isTypedArray ? new Uint8Array(0) : null;
