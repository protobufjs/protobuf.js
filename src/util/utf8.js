var encoder = new TextEncoder(),
    decoder = new TextDecoder("utf-8", { ignoreBOM: true }),
    strictDecoder = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true });

/**
 * Calculates the UTF8 byte length of a string.
 * @private
 * @param {string} string String
 * @returns {number} Byte length
 */
export function length(string) {
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
}

function decode(decoder, buffer, start, end) {
    return decoder.decode(start === 0 && end === buffer.length
        ? buffer
        : buffer.subarray(start, end));
}

function readWithDecoder(buffer, start, end, decoder) {
    if (end - start < 1)
        return "";

    var str = "",
        i = start,
        c1, c2, c3, c4, c5, c6, c7, c8;

    for (; i + 7 < end; i += 8) {
        c1 = buffer[i];
        c2 = buffer[i + 1];
        c3 = buffer[i + 2];
        c4 = buffer[i + 3];
        c5 = buffer[i + 4];
        c6 = buffer[i + 5];
        c7 = buffer[i + 6];
        c8 = buffer[i + 7];
        if ((c1 | c2 | c3 | c4 | c5 | c6 | c7 | c8) & 0x80)
            return str + decode(decoder, buffer, i, end);
        str += String.fromCharCode(c1, c2, c3, c4, c5, c6, c7, c8);
    }

    for (; i < end; ++i) {
        c1 = buffer[i];
        if (c1 & 0x80)
            return str + decode(decoder, buffer, i, end);
        str += String.fromCharCode(c1);
    }

    return str;
}

/**
 * Reads UTF8 bytes as a string.
 * @private
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
export function read(buffer, start, end) {
    return readWithDecoder(buffer, start, end, decoder);
}

/**
 * Reads UTF8 bytes as a string, rejecting invalid UTF8.
 * @private
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
export function readStrict(buffer, start, end) {
    return readWithDecoder(buffer, start, end, strictDecoder);
}

/**
 * Writes a string as UTF8 bytes.
 * @private
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
export function write(string, buffer, offset) {
    return encoder.encodeInto(string, offset
        ? buffer.subarray(offset)
        : buffer).written;
}
