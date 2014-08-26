var ProtoBuf = require("../index.js");

var sample = {
    id: 1,
    name: "John123",
    password: "helloworld"
};

console.log("Sample: `"+JSON.stringify(sample, null, 4));
console.log("\n");

var proto = " message Sample {" +
    "required uint32 id = 1;" +
    "required string name = 2;" +
    "required string password = 3;" +
    "}";

var builder = ProtoBuf.loadProto(proto, "bench.proto"),
    Sample = builder.build("Sample");

// Compare size
console.log("Encoding size");
console.log("-------------");
var jsonData = new Buffer(JSON.stringify(sample), "utf8"),
    protoData = new Sample(sample).toBuffer();
console.log("* Encoded sample size as JSON: "+jsonData.length+" bytes");
console.log("* Encoded sample size as protocol buffer: "+protoData.length+" bytes");
console.log("");

// Compare encoding speed
console.log("Encoding speed");
console.log("--------------");
(function() {
    // Assuming that a receive buffer is used
    var buf = ProtoBuf.ByteBuffer.allocate(64);
    var protoSample = new Sample(sample),
        n = 100000, k = (n/1000)+'k';
    console.time("* ProtoBuf encode "+k);
    for (var i=0; i<n; ++i)
        protoSample.encode(buf, true),
        buf.flip();
    console.timeEnd("* ProtoBuf encode "+k);
    console.time("* ProtoBuf decode "+k);
    for (var i=0; i<n; ++i)
        Sample.decode(buf),
        buf.flip();
    console.timeEnd("* ProtoBuf decode "+k);
})();
