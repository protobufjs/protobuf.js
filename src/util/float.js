/**
 * Reads / writes floats / doubles from / to buffers.
 * @namespace util.float
 */
var f32 = new Float32Array([ -0 ]),
    f32b = new Uint8Array(f32.buffer),
    f32le = f32b[3] === 128,
    f64 = new Float64Array([ -0 ]),
    f64b = new Uint8Array(f64.buffer),
    f64le = f64b[7] === 128;

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */
export var writeFloatLE = f32le ? writeFloat_cpy : writeFloat_rev;

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */
export var writeFloatBE = f32le ? writeFloat_rev : writeFloat_cpy;

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */
export var readFloatLE = f32le ? readFloat_cpy : readFloat_rev;

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */
export var readFloatBE = f32le ? readFloat_rev : readFloat_cpy;

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */
export var writeDoubleLE = f64le ? writeDouble_cpy : writeDouble_rev;

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */
export var writeDoubleBE = f64le ? writeDouble_rev : writeDouble_cpy;

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */
export var readDoubleLE = f64le ? readDouble_cpy : readDouble_rev;

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */
export var readDoubleBE = f64le ? readDouble_rev : readDouble_cpy;

function writeFloat_cpy(val, buf, pos) {
    f32[0] = val;
    buf[pos    ] = f32b[0];
    buf[pos + 1] = f32b[1];
    buf[pos + 2] = f32b[2];
    buf[pos + 3] = f32b[3];
}

function writeFloat_rev(val, buf, pos) {
    f32[0] = val;
    buf[pos    ] = f32b[3];
    buf[pos + 1] = f32b[2];
    buf[pos + 2] = f32b[1];
    buf[pos + 3] = f32b[0];
}

function readFloat_cpy(buf, pos) {
    f32b[0] = buf[pos    ];
    f32b[1] = buf[pos + 1];
    f32b[2] = buf[pos + 2];
    f32b[3] = buf[pos + 3];
    return f32[0];
}

function readFloat_rev(buf, pos) {
    f32b[3] = buf[pos    ];
    f32b[2] = buf[pos + 1];
    f32b[1] = buf[pos + 2];
    f32b[0] = buf[pos + 3];
    return f32[0];
}

function writeDouble_cpy(val, buf, pos) {
    f64[0] = val;
    buf[pos    ] = f64b[0];
    buf[pos + 1] = f64b[1];
    buf[pos + 2] = f64b[2];
    buf[pos + 3] = f64b[3];
    buf[pos + 4] = f64b[4];
    buf[pos + 5] = f64b[5];
    buf[pos + 6] = f64b[6];
    buf[pos + 7] = f64b[7];
}

function writeDouble_rev(val, buf, pos) {
    f64[0] = val;
    buf[pos    ] = f64b[7];
    buf[pos + 1] = f64b[6];
    buf[pos + 2] = f64b[5];
    buf[pos + 3] = f64b[4];
    buf[pos + 4] = f64b[3];
    buf[pos + 5] = f64b[2];
    buf[pos + 6] = f64b[1];
    buf[pos + 7] = f64b[0];
}

function readDouble_cpy(buf, pos) {
    f64b[0] = buf[pos    ];
    f64b[1] = buf[pos + 1];
    f64b[2] = buf[pos + 2];
    f64b[3] = buf[pos + 3];
    f64b[4] = buf[pos + 4];
    f64b[5] = buf[pos + 5];
    f64b[6] = buf[pos + 6];
    f64b[7] = buf[pos + 7];
    return f64[0];
}

function readDouble_rev(buf, pos) {
    f64b[7] = buf[pos    ];
    f64b[6] = buf[pos + 1];
    f64b[5] = buf[pos + 2];
    f64b[4] = buf[pos + 3];
    f64b[3] = buf[pos + 4];
    f64b[2] = buf[pos + 5];
    f64b[1] = buf[pos + 6];
    f64b[0] = buf[pos + 7];
    return f64[0];
}
