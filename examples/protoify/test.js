var protoify = require("./index.js"),
    ByteBuffer = require("protobufjs").ByteBuffer,
    assert = require("assert");

// Array of samples to test
var samples = [
    1, -1, 0x80000000|0, 0x7fffffff|0,                    // Integers
    0.1, 0.2, 1.234,                                      // Doubles
    "John",                                               // String
    true, false,                                          // Booleans
    null,                                                 // null
    [],                                                   // Array
    {},                                                   // Object
    undefined,                                            // undefined
    [                                                     // Array holding each data type
        1,
        0.1,
        "John",
        true,
        false,
        null,
        [],
        {},
        undefined
    ],
    {                                                     // Object holding each data type
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
    // Encode each sample to a Buffer
    var buf = protoify(sample);

    // Print some nice debugging information
    console.log(JSON.stringify(sample));
    console.log("-------------------------------------------------------------------");
    console.log(ByteBuffer.wrap(buf).toDebug(true));

    // Decode the Buffer back to JSON
    var decodedSample = protoify.parse(buf);

    // And assert that it's actually equal
    assert.deepEqual(decodedSample, sample);
});

// If no assertion errors are thrown, print
console.log("OK");
