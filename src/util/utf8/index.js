"use strict";

/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} str String
 * @returns {number} Byte length
 */
utf8.length = function length(str) {
    var strlen = str.length >>> 0;
    var len = 0,
        c = 0;
    for (var i = 0; i < strlen; ++i) {
        c = str.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (str.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Writes a string as UTF8 bytes.
 * @param {Uint8Array} buf Destination buffer
 * @param {number} pos Destination offset
 * @param {string} str Source string
 * @returns {number} Bytes written
 */
utf8.write = function(buf, pos, str) {
    var start = pos;
    for (var i = 0; i < str.length; ++i) {
        var c1 = str.charCodeAt(i), c2;
        if (c1 < 128) {
            buf[pos++] = c1;
        } else if (c1 < 2048) {
            buf[pos++] = c1 >> 6       | 192;
            buf[pos++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = str.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buf[pos++] = c1 >> 18      | 240;
            buf[pos++] = c1 >> 12 & 63 | 128;
            buf[pos++] = c1 >> 6  & 63 | 128;
            buf[pos++] = c1       & 63 | 128;
        } else {
            buf[pos++] = c1 >> 12      | 224;
            buf[pos++] = c1 >> 6  & 63 | 128;
            buf[pos++] = c1       & 63 | 128;
        }
    }
    return pos - start;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source offset
 * @param {number} len Source length
 * @returns {string} String read
 */
utf8.read = function(buf, pos, len) {
    if (len) {
        var out = [],
            i = 0, // char offset
            t;     // temporary
        while (pos < len) {
            t = buf[pos++];
            if (t < 128)
                out[i++] = t;
            else if (t > 191 && t < 224)
                out[i++] = (t & 31) << 6 | buf[pos++] & 63;
            else if (t > 239 && t < 365) {
                t = ((t & 7) << 18 | (buf[pos++] & 63) << 12 | (buf[pos++] & 63) << 6 | buf[pos++] & 63) - 0x10000;
                out[i++] = 0xD800 + (t >> 10);
                out[i++] = 0xDC00 + (t & 1023);
            } else
                out[i++] = (t & 15) << 12 | (buf[pos++] & 63) << 6 | buf[pos++] & 63;
        }
        return String.fromCharCode.apply(String, out.slice(0, i));
    }
    return "";
};
