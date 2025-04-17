"use strict";

/**
 * A minimal UTF8 implementation for Uint8Arrays.
 *
 * This implementation uses a combination of techniques for optimal performance:
 * - TextDecoder for longer strings and non-ASCII content
 * - 8-byte unrolling for ASCII-only content
 * - Inspired by the approach taken in avsc:
 *   https://github.com/mtth/avsc/blob/91d653f72906102448a059cb81692177bb678f52/lib/utils.js#L796
 *
 * @memberof util
 * @namespace
 */
var utf8 = exports;

// TextDecoder is not available in IE or browsers from before 2017.
var TEXT_DECODER_AVAILABLE = typeof TextDecoder !== "undefined";
var textDecoder = TEXT_DECODER_AVAILABLE ? new TextDecoder("utf-8") : null;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

// Manually decodes UTF8 bytes to string. This function supports old browsers
// without TextDecoder.
function utf8_decode_fallback(buffer, start, end, initialStr, initialPos) {
    var str = initialStr || "";
    var i = initialPos || start;

    for (; i < end;) {
        var t = buffer[i++];
        if (t <= 0x7F) {
            str += String.fromCharCode(t);
        } else if (t >= 0xC0 && t < 0xE0) {
            str += String.fromCharCode((t & 0x1F) << 6 | buffer[i++] & 0x3F);
        } else if (t >= 0xE0 && t < 0xF0) {
            str += String.fromCharCode((t & 0xF) << 12 | (buffer[i++] & 0x3F) << 6 | buffer[i++] & 0x3F);
        } else if (t >= 0xF0) {
            var t2 = ((t & 7) << 18 | (buffer[i++] & 0x3F) << 12 | (buffer[i++] & 0x3F) << 6 | buffer[i++] & 0x3F) - 0x10000;
            str += String.fromCharCode(0xD800 + (t2 >> 10));
            str += String.fromCharCode(0xDC00 + (t2 & 0x3FF));
        }
    }

    return str;
}

// Export fallback function for direct benchmarking.
utf8._utf8_decode_fallback = utf8_decode_fallback;

// Fast path for ASCII-only strings. This falls back to utf8_decode_fallback if
// it encounters a non-ASCII character. This function works in all browsers,
// but will only be faster than TextDecoder on short ASCII strings.
function ascii_decode_unrolled(buffer, start, end, initialStr, initialPos) {
    var str = initialStr || "";
    var i = initialPos || start;

    // process 8 bytes at a time when possible
    for (; i + 7 < end; i += 8) {
        // Check all 8 bytes at once for non-ASCII using bitwise OR
        if (buffer[i] > 0x7F || buffer[i + 1] > 0x7F || buffer[i + 2] > 0x7F || buffer[i + 3] > 0x7F || buffer[i + 4] > 0x7F || buffer[i + 5] > 0x7F || buffer[i + 6] > 0x7F || buffer[i + 7] > 0x7F) {
            // Non-ASCII character detected, fall back to the generic utf8 implementation
            return utf8_decode_fallback(buffer, start, end, str, i);
        }
        // Process 8 ASCII bytes at once
        str += String.fromCharCode(
            buffer[i],
            buffer[i + 1],
            buffer[i + 2],
            buffer[i + 3],
            buffer[i + 4],
            buffer[i + 5],
            buffer[i + 6],
            buffer[i + 7]
        );
    }

    // Handle remaining ASCII bytes one by one
    for (; i < end; i++) {
        var t = buffer[i];
        if (t > 0x7F) {
            // Non-ASCII character detected, fall back to the generic utf8 implementation
            return utf8_decode_fallback(buffer, start, end, str, i);
        }
        str += String.fromCharCode(t);
    }

    return str;
}

// Export ascii function for direct benchmarking.
utf8._ascii_decode_unrolled = ascii_decode_unrolled;


// Slices bytes according to a start and an end. This avoids creating a new
// Uint8Array if start and end already correspond to the start and end of the
// input.
//
// This is an important optimization because `src/reader:Reader` will
// often create a subarray immediately before passing it to utf8_read. Creating
// an additional subarray object is expensive and not useful.
function subarray(buffer, start, end) {
    if (start === 0 && end === buffer.length) {
        return buffer;
    }
    return buffer.subarray(start, end);
}

/**
 * Reads UTF8 bytes as a string. This attempts to take the most optimal
 * approach of the above implementations:
 *
 * - Special case the empty string
 * - If the string is long and TextDecoder is available, use TextDecoder
 * - If the string is ASCII only, use ascii_decode_unrolled
 * - Otherwise, use utf8_decode_fallback
 *
 * See the code in `bench/utf8_bench.js` if attempting to tune this code.
 *
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    if (end - start < 1) {
        return "";
    }

    // Use TextDecoder for strings longer than 24 characters
    if (end - start > 24 && TEXT_DECODER_AVAILABLE) {
        return textDecoder.decode(subarray(buffer, start, end));
    }

    return ascii_decode_unrolled(buffer, start, end);

};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};
