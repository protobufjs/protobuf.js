"use strict";
var newSuite = require("./suite"),
    ieee754  = require("../lib/ieee754");

// This benchmark compares raw data type performance of Uint8Array and Buffer.

var array  = new Uint8Array(8);
var buffer = new Buffer(8);

// raw fixed32 write speed
newSuite("fixed32")
.add("shift array", function() {
    var val = 0x7fffffff;
    array[0] =  val         & 255;
    array[1] =  val >>> 8   & 255;
    array[2] =  val >>> 16  & 255;
    array[3] =  val >>> 24;
})
.add("shift buffer", function() {
    var val = 0x7fffffff;
    buffer[0] =  val         & 255;
    buffer[1] =  val >>> 8   & 255;
    buffer[2] =  val >>> 16  & 255;
    buffer[3] =  val >>> 24;
})
.add("writeUInt32LE buffer", function() {
    var val = 0x7fffffff;
    buffer.writeUInt32LE(val, 0, true);
})
.run();

var f64 = new Float64Array(1);
var f32 = new Float32Array(f64.buffer);
var f8b = new Uint8Array(f64.buffer);

// raw float write speed
newSuite("float")
.add("ieee754 array", function() {
    ieee754.write(array, 0.1, 0, false, 23, 4);
})
.add("ieee754 buffer", function() {
    ieee754.write(buffer, 0.1, 0, false, 23, 4);
})
.add("f32 array", function() {
    f32[0] = 0.1;
    array[0]   = f8b[0];
    array[0+1] = f8b[1];
    array[0+2] = f8b[2];
    array[0+3] = f8b[3];
})
.add("f32 buffer", function() {
    f32[0] = 0.1;
    buffer[0]   = f8b[0];
    buffer[0+1] = f8b[1];
    buffer[0+2] = f8b[2];
    buffer[0+3] = f8b[3];
})
.add("writeFloatLE buffer", function() {
    buffer.writeFloatLE(0.1, 0, true);
})
.run();

// raw double write speed
newSuite("double")
.add("ieee754 array", function() {
    ieee754.write(array, 0.1, 0, false, 52, 8);
})
.add("ieee754 buffer", function() {
    ieee754.write(buffer, 0.1, 0, false, 52, 8);
})
.add("f64 array", function() {
    f64[0] = 0.1;
    array[0]   = f8b[0];
    array[0+1] = f8b[1];
    array[0+2] = f8b[2];
    array[0+3] = f8b[3];
    array[0+4] = f8b[4];
    array[0+5] = f8b[5];
    array[0+6] = f8b[6];
    array[0+7] = f8b[7];
})
.add("f64 buffer", function() {
    f64[0]      = 0.1;
    buffer[0]   = f8b[0];
    buffer[0+1] = f8b[1];
    buffer[0+2] = f8b[2];
    buffer[0+3] = f8b[3];
    buffer[0+4] = f8b[4];
    buffer[0+5] = f8b[5];
    buffer[0+6] = f8b[6];
    buffer[0+7] = f8b[7];
})
.add("writeDoubleLE buffer", function() {
    buffer.writeDoubleLE(0.1, 0, true);
})
.run();

var source = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
array  = new Uint8Array(16);
buffer = new Buffer(16);

// raw bytes write speed
newSuite("bytes")
.add("set array", function() {
    array.set(source, 0);
})
.add("for array", function() {
    for (var i = 0; i < source.length; ++i)
        array[i] = source[i];
})
.add("set buffer", function() {
    buffer.set(source, 0);
})
.add("for buffer", function() {
    for (var i = 0; i < source.length; ++i)
        buffer[i] = source[i];
})
.add("copy buffer", function() {
    source.copy(buffer, 0);
})
.run();

function writeString(buf, pos, val) {
    for (var i = 0; i < val.length; ++i) {
        var c1 = val.charCodeAt(i), c2;
        if (c1 < 128) {
            buf[pos++] = c1;
        } else if (c1 < 2048) {
            buf[pos++] = c1 >> 6       | 192;
            buf[pos++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = val.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
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
}

/* function byteLength(val) {
    var strlen = val.length >>> 0;
    var len = 0;
    for (var i = 0; i < strlen; ++i) {
        var c1 = val.charCodeAt(i);
        if (c1 < 128)
            len += 1;
        else if (c1 < 2048)
            len += 2;
        else if ((c1 & 0xFC00) === 0xD800 && (val.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
} */

array = new Uint8Array(1000);
buffer = new Buffer(1000);

[
    "Lorem ipsu",
    "Lorem ipsum dolo",
    "Lorem ipsum dolor ",
    "Lorem ipsum dolor s",
    "Lorem ipsum dolor si",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore ipsum."
].forEach(function(str) {
    // raw string write speed
    newSuite("string[" + str.length + "]")
    .add("writeString array", function() {
        writeString(array, 0, str);
    })
    .add("writeString buffer", function() {
        writeString(buffer, 0, str)
    })
    .add("write buffer", function() {
        buffer.write(str, 0)
    })
    .add("utf8Write buffer", function() {
        buffer.utf8Write(str, 0)
    })
    /* .add("byteLength array", function() {
        byteLength(str)
    })
    .add("byteLength buffer", function() {
        Buffer.byteLength(str)
    }) */
    .run();
});
