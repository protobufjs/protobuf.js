"use strict";
module.exports = pool;

/**
 * A drop-in buffer pool, similar in functionality to what node uses for buffers.
 * @memberof util
 * @function
 * @param {function(number):Uint8Array} alloc Allocator
 * @param {function(number, number):Uint8Array} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {function(number):Uint8Array} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
};
