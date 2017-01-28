/*eslint-disable no-new*//*global ArrayBuffer*/
"use strict";

var newSuite = require("./suite"),
    protobuf = require("..");

var poolAlloc = protobuf.util.pool(function(size) {
    return new Uint8Array(size);
}, Uint8Array.prototype.subarray);

[
    64,
    256,
    1024
]
.forEach(function(size) {

    newSuite("buffer[" + size + "]")
    .add("new Uint8Array", function() {
        new Uint8Array(size);
    })
    .add("Buffer.alloc", function() {
        Buffer.alloc(size);
    })
    .add("poolAlloc<Uint8Array>", function() {
        poolAlloc(size);
    })
    .add("Buffer.allocUnsafe", function() {
        Buffer.allocUnsafe(size);
    })
    .add("new Buffer", function() {
        new Buffer(size);
    })
    .run();

    var ab = new ArrayBuffer(size);

    newSuite("wrap[" + size + "]")
    .add("new Uint8Array(ArrayBuffer)", function() {
        new Uint8Array(ab);
    })
    .add("Buffer.from(ArrayBuffer)", function() {
        Buffer.from(ab);
    })
    .run();

});
