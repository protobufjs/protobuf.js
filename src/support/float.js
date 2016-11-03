var i8  = new Uint8Array(8),
    f32 = new Float32Array(i8.buffer),
    f64 = new Float64Array(i8.buffer),
    be  = Boolean((f32[0] = 2) && i8[0]);

/**
 * Writes a float to the specified writer.
 * @param {!Writer} writer
 * @param {number} value
 * @param {number} size
 * @returns {!Writer}
 * @private
 */
exports._write = function float_write(writer, value, size) {
    var i = 0, s = 1;
    if (be) {
        i = size;
        s = -1;
    }
    (size === 4 ? f32 : f64)[0] = value;
    for (var j = 0; j < size; ++j, i +=s)
        writer.buf[writer.pos++] = i8[i];
    return writer;
};

/**
 * Reads a float from the specified reader.
 * @param {!Reader} reader
 * @param {number} size
 * @returns {number}
 * @private
 */
exports._read = function float_read(reader, size) {
    var i = 0, s = 1;
    if (be) {
        i = size;
        s = -1;
    }
    for (var j = 0; j < size; ++j, i += s)
        i8[i] = reader.buf[reader.pos++];
    return (size === 4 ? f32 : f64)[0];
};
