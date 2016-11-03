/*
ieee754 is Copyright (c) 2008, Fair Oaks Labs, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

 * Neither the name of Fair Oaks Labs, Inc. nor the names of its contributors
   may be used to endorse or promote products derived from this software
   without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
*/
var ieee754 = require("ieee754");

/**
 * Writes a float to the specified writer.
 * @param {!Writer} writer Writer to write to
 * @param {number} value Value to write
 * @param {number} size Size in bytes
 * @returns {!Writer} writer
 * @private
 */
exports._write = function float_write(writer, value, size) {
    ieee754.write(writer.buf, value, writer.pos, true, size === 4 ? 23 : 52, size);
    writer.pos += size;
    return writer;
};

/**
 * Reads a float from the specified reader.
 * @param {!Reader} reader Reader to read from
 * @param {number} size Size in bytes
 * @returns {number} Value read
 * @private
 */
exports._read = function float_read(reader, size) {
    var value = ieee754.read(reader.buf, reader.pos, true, size === 4 ? 23 : 52, size);
    reader.pos += size;
    return value;
};
