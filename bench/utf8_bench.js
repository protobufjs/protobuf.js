"use strict";

var newSuite = require("./suite");
var utf8 = require("../lib/utf8");

const textDecoder = new TextDecoder("utf8");
const textEncoder = new TextEncoder("utf8");

const sizes = {
    "very small": 7,
    small: 20,
    medium: 100,
    large: 1000,
};

// Generates a random unicode string in the Basic Multilingual Plane, as a Uint8Array.
function generateUnicodeBuffer(length) {
    let unicodeString = "";
    const minUnicode = 0x0020; // Space
    const maxUnicode = 0xFFFF; // Last code point in Basic Multilingual Plane.
    for (let i = 0; i < length; i++) {
        const randomCodePoint = Math.floor(Math.random() * (maxUnicode - minUnicode + 1)) + minUnicode;

        // Convert the code point to a character and append it
        unicodeString += String.fromCharCode(randomCodePoint);
    }

    // Slice it again so we end up with a Uint8Array of the appropriate length.
    return textEncoder.encode(unicodeString).subarray(0, length);
}

// Generates a random ascii string, as a Uint8Array.
function generateAsciiBuffer(length) {
    let asciiString = "";
    const minAscii = 32;
    const maxAscii = 126;
    for (let i = 0; i < length; i++) {
        const randomCodePoint = Math.floor(Math.random() * (maxAscii - minAscii + 1)) + minAscii;
        asciiString += String.fromCharCode(randomCodePoint);
    }
    return textEncoder.encode(asciiString);
}

const bufferGeneratorFunctions = {
    ascii: generateAsciiBuffer,
    nonAscii: generateUnicodeBuffer,
};


// Define Suites

for (const [size, length] of Object.entries(sizes)) {
    for (const [stringType, generatorFunction] of Object.entries(bufferGeneratorFunctions)) {
        const buffer = generatorFunction(length);

        newSuite(`${stringType} decoding - ${size} strings (${length} bytes)`)
            .add("Fallback implementation", function () {
                utf8._utf8_decode_fallback(buffer, 0, buffer.length);
            })
            .add("Ascii optimized implementation", function () {
                utf8._ascii_decode_unrolled(buffer, 0, buffer.length);
            })
            .add("Optimized implementation", function () {
                utf8.read(buffer, 0, buffer.length);
            })
            .add("Node Buffer.toString", function () {
                const nodeBuffer = Buffer.from(buffer);
                nodeBuffer.toString("utf8", 0, buffer.length);
            })
            .add("TextDecoder", function () {
                textDecoder.decode(buffer);
            })
            .run();
    }
}

