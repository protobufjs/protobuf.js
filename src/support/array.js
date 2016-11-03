var ArrayImpl = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

exports._Array = ArrayImpl;

exports._alloc = function(size) {
    return new ArrayImpl(size);
};

exports._slice = ArrayImpl.prototype.slice || ArrayImpl.prototype.subarray;

exports._set = ArrayImpl.prototype.set || function set_array(array, offset) {
    if (array.length > this.length + offset)
        throw RangeError("offset would store beyond the end of the array");
    for (var i = 0, k = array.length; i < k; ++i)
        this[offset + i] = array[i];
};
