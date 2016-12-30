export = base64;

/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
declare namespace base64 {

    /**
     * Calculates the byte length of a base64 encoded string.
     * @param {string} string Base64 encoded string
     * @returns {number} Byte length
     */
    function length(string: string): number;

    /**
     * Encodes a buffer to a base64 encoded string.
     * @param {Uint8Array} buffer Source buffer
     * @param {number} start Source start
     * @param {number} end Source end
     * @returns {string} Base64 encoded string
     */
    function encode(buffer: Uint8Array, start: number, end: number): string;

    /**
     * Decodes a base64 encoded string to a buffer.
     * @param {string} string Source string
     * @param {Uint8Array} buffer Destination buffer
     * @param {number} offset Destination offset
     * @returns {number} Number of bytes written
     * @throws {Error} If encoding is invalid
     */
    function decode(string: string, buffer: Uint8Array, offset: number): number;
}
