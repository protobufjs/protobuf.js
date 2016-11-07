// This module provides support for encoding and decoding of utf8 strings to and from bytes within
// browsers. It intentionally uses arrays for intermediate storage in case typed arrays are not
// supported (we'd have to also polyfill Uint32Array and Uint16Array otherwise).

// ref: https://github.com/google/closure-library/blob/master/closure/goog/crypt/crypt.js

var string_ = exports;

/**
 * Encodes a string to UTF8 bytes.
 * @param {string} str String to encode
 * @returns {number[]} Array of encoded bytes
 * @private
 */
string_._encode = function string_encode_utf8(str) {
    var l = str.length;
    if (!l)
        return [];
    var out = new Array(l << 2), p = 0;
    for (var i = 0; i < l; i++) {
        var c1 = str.charCodeAt(i), c2;
        if (c1 < 128) {
            out[p++] = c1;
        } else if (c1 < 2048) {
            out[p++] = c1 >> 6 | 192;
            out[p++] = c1 & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && i + 1 < l && ((c2 = str.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            out[p++] =  c1 >> 18      | 240;
            out[p++] =  c1 >> 12 & 63 | 128;
            out[p++] =  c1 >> 6  & 63 | 128;
            out[p++] =  c1       & 63 | 128;
        } else {
            out[p++] = c1 >> 12      | 224;
            out[p++] = c1 >> 6  & 63 | 128;
            out[p++] = c1       & 63 | 128;
        }
    }
    return out.slice(0, p);
};

/**
 * Decodes a string from UTF8 bytes.
 * @param {number[]} bytes Bytes to decode
 * @returns {string} Decoded string
 * @private
 */
string_._decode = function string_decode_utf8(bytes) {
    var l = bytes.length;
    if (!l)
        return "";
    var out = new Array(l), p = 0, c = 0;
    while (p < l) {
        var c1 = bytes[p++];
        if (c1 < 128)
            out[c++] = c1;
        else if (c1 > 191 && c1 < 224)
            out[c++] = (c1 & 31) << 6 | bytes[p++] & 63;
        else if (c1 > 239 && c1 < 365) {
            var u = ((c1 & 7) << 18 | (bytes[p++] & 63) << 12 | (bytes[p++] & 63) << 6 | bytes[p++] & 63) - 0x10000;
            out[c++] = 0xD800 + (u >> 10);
            out[c++] = 0xDC00 + (u & 1023);
        } else
            out[c++] = (c1 & 15) << 12 | (bytes[p++] & 63) << 6 | bytes[p++] & 63;
    }
    return String.fromCharCode.apply(String, out.slice(0, c));
};
