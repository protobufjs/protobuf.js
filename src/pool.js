"use strict";

/**
 * A drop-in buffer pool for Uint8Array, just like node uses for buffers.
 * @exports pool
 * @param {function(number):Uint8Array} alloc Allocator
 * @param {number} [size=8192] Slab size
 * @returns {function(number):Uint8Array} Pooled allocator
 */
module.exports = function create_pool(alloc, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function alloc_from_pool(size) {
        if (size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slab.subarray(offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
};
