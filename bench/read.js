"use strict";
var newSuite = require("./suite"),
    ieee754  = require("../lib/ieee754");

// This benchmark compares raw data type performance of Uint8Array and Buffer.

var data = [ 0xCD, 0xCC, 0xCC, 0x3D ]; // ~0.10000000149011612 LE
var array  = new Uint8Array(data);
var buffer = Buffer.from(data);

var f64 = new Float64Array(1);
var f32 = new Float32Array(f64.buffer);
var f8b = new Uint8Array(f64.buffer);

// raw float read speed
newSuite("float")
.add("ieee754 array", function() {
    ieee754.read(array, 0, false, 23, 4);
})
.add("ieee754 buffer", function() {
    ieee754.read(buffer, 0, false, 23, 4);
})
.add("f32 array", function() {
    var pos = 0;
    f8b[pos++] = array[0];
    f8b[pos++] = array[1];
    f8b[pos++] = array[2];
    f8b[pos  ] = array[3];
    return f32[0];
})
.add("f32 buffer", function() {
    var pos = 0;
    f8b[pos++] = buffer[0];
    f8b[pos++] = buffer[1];
    f8b[pos++] = buffer[2];
    f8b[pos  ] = buffer[3];
    return f32[0];
})
.add("readFloatLE buffer", function() {
    buffer.readFloatLE(0, true);
})
.run();

data = [ 0x9A, 0x99, 0x99, 0x99, 0x99, 0x99, 0xB9, 0x3F ]; // 0.1 LE
array  = new Uint8Array(data);
buffer = Buffer.from(data);

// raw double read speed
newSuite("double")
.add("ieee754 array", function() {
    ieee754.read(array, 0, false, 52, 8);
})
.add("ieee754 buffer", function() {
    ieee754.read(buffer, 0, false, 52, 8);
})
.add("f64 array", function() {
    var pos = 0;
    f8b[pos++] = array[0];
    f8b[pos++] = array[1];
    f8b[pos++] = array[2];
    f8b[pos++] = array[3];
    f8b[pos++] = array[4];
    f8b[pos++] = array[5];
    f8b[pos++] = array[6];
    f8b[pos  ] = array[7];
    return f64[0];
})
.add("f64 buffer", function() {
    var pos = 0;
    f8b[pos++] = buffer[0];
    f8b[pos++] = buffer[1];
    f8b[pos++] = buffer[2];
    f8b[pos++] = buffer[3];
    f8b[pos++] = buffer[4];
    f8b[pos++] = buffer[5];
    f8b[pos++] = buffer[6];
    f8b[pos  ] = buffer[7];
    return f64[0];
})
.add("readDoubleLE buffer", function() {
    buffer.readDoubleLE(0, true);
})
.run();

function readString(bytes) {
    var len = bytes.length;
    if (len) {
        var out = new Array(len), p = 0, c = 0;
        while (p < len) {
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
    }
    return "";
}

// raw string read speed
[
    "Lorem ipsu",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore ipsum."
].forEach(function(str) {

    var buffer = Buffer.from(str, "utf8"),
        array  = new Uint8Array(buffer.length);
    for (var i = 0; i < buffer.length; ++i)
        array[i] = buffer[i];

    newSuite("string[" + str.length + "]")
    .add("readString array", function() {
        readString(array);
    })
    .add("readString buffer", function() {
        readString(buffer)
    })
    .add("toString buffer", function() {
        buffer.toString("utf8", 0, buffer.length);
    })
    .add("utf8Slice buffer", function() {
        buffer.utf8Slice(0, buffer.length);
    })
    .run();
});
