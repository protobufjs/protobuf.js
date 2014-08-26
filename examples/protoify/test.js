var protoify = require("./index.js"),
    jsonify = protoify.jsonify,
    ByteBuffer = require("protobufjs").ByteBuffer,
    assert = require("assert");

var samples = [
    1, -1, 0x80000000|0, 0x7fffffff|0,
    0.1,
    "John",
    true, false,
    null,
    [],
    {},
    undefined,
    [1,0.1,"John", true, false, null, [], {}],
    {
        1: 1,
        0.1: 0.1,
        "John": "John",
        true: true,
        false: false,
        null: null,
        array: [],
        object: {},
        undefined: undefined
    }
];

samples.forEach(function(sample) {
    var buf = protoify(sample);

    console.log(JSON.stringify(sample));
    console.log("-------------------------------------------------------------------");
    console.log(ByteBuffer.wrap(buf).toDebug(true));

    var json = jsonify(buf);
    assert.deepEqual(sample, json);
});

console.log("OK");
