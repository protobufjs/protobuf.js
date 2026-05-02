var tape = require("tape");

var protobuf = require("..");

var proto = "message Outer {\
    repeated Inner inner = 1;\
}\
message Inner {\
}";

var msg = { inner: [{}, {}, {}] };

tape.test("repeated messages", function(test) {
    var root = protobuf.parse(proto).root,
        Outer = root.lookup("Outer");
    
    var dec = Outer.decode(Outer.encode(msg).finish());
    test.same(dec, msg, "should encode and decode back to the original values");
    test.end();
});

tape.test("singular message fields merge on decode", function(test) {
    var root = protobuf.parse("syntax = \"proto3\";\
        message Outer {\
            Inner inner = 1;\
        }\
        message Inner {\
            int32 a = 1;\
            int32 b = 2;\
            Inner child = 3;\
        }").root,
        Outer = root.lookup("Outer");

    var dec = Outer.decode(Uint8Array.of(
        10, 2, 8, 1,          // inner: { a: 1 }
        10, 2, 16, 2,         // inner: { b: 2 }
        10, 4, 26, 2, 8, 3,   // inner: { child: { a: 3 } }
        10, 4, 26, 2, 16, 4   // inner: { child: { b: 4 } }
    ));

    test.deepEqual(Outer.toObject(dec), {
        inner: {
            a: 1,
            b: 2,
            child: {
                a: 3,
                b: 4
            }
        }
    }, "should merge repeated occurrences of singular message fields");
    test.end();
});
