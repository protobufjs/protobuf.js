var protobuf = require(".."),
    newSuite = require("./suite");

var pool = require("../src/util/pool"),
    poolAlloc = pool(function(size) {
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
        var buf = new Uint8Array(size);
    })
    .add("Buffer.alloc", function() {
        var buf = Buffer.alloc(size);
    })
    .add("poolAlloc<Uint8Array>", function() {
        var buf = poolAlloc(size);
    })
    .add("Buffer.allocUnsafe", function() {
        var buf = Buffer.allocUnsafe(size);
    })
    .add("new Buffer", function() {
        var buf = new Buffer(size);
    })
    .run();

    var ab = new ArrayBuffer(size);

    newSuite("wrap[" + size + "]")
    .add("new Uint8Array(ArrayBuffer)", function() {
        var buf = new Uint8Array(ab);
    })
    .add("Buffer.from(ArrayBuffer)", function() {
        var buf = Buffer.from(ab);
    })
    .run();

});
