var isTypedArray = typeof Uint8Array !== 'undefined';
var ArrayImpl = isTypedArray ? Uint8Array : Array;

// Array implementation used
exports._Array = ArrayImpl;

// Common allocation function
exports._alloc = function(size) {
    return new ArrayImpl(size);
};

// Polyfill for Uint8Array.prototype.slice
exports._slice = ArrayImpl.prototype.slice || ArrayImpl.prototype.subarray;

// Polyfill for Uint8Array.prototype.set
exports._set = ArrayImpl.prototype.set || function set_array(array, offset) {
    if (offset + array.length > this.length)
        throw RangeError("offset would store beyond the end of the array");
    for (var i = 0, k = array.length; i < k; ++i)
        this[offset + i] = array[i];
};

// Empty buffer (null if mutable)
exports._empty = isTypedArray ? new Uint8Array(0) : null;
