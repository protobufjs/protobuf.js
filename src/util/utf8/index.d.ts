/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
declare module utf8 {

    /**
     * Calculates the UTF8 byte length of a string.
     * @param {string} string String
     * @returns {number} Byte length
     */
    function length(string: string): number;

    /**
     * Reads UTF8 bytes as a string.
     * @param {Uint8Array} buffer Source buffer
     * @param {number} start Source start
     * @param {number} end Source end
     * @returns {string} String read
     */
    function read(buffer: Uint8Array, start: number, end: number): string;

    /**
     * Writes a string as UTF8 bytes.
     * @param {string} string Source string
     * @param {Uint8Array} buffer Destination buffer
     * @param {number} offset Destination offset
     * @returns {number} Bytes written
     */
    function write(string: string, buffer: Uint8Array, offset: number): number;
}
