var tape = require("tape");

var staticRoot = require("./data/test");

tape.test("static maps - omitted message value", function(test) {

    var TestMapFields = staticRoot.jspb.test.TestMapFieldsNoBinary;
    var MapValueMessage = staticRoot.jspb.test.MapValueMessageNoBinary;
    var dec = TestMapFields.decode(Uint8Array.of(0x3a, 0x03, 0x0a, 0x01, 0x61));

    test.ok(dec.mapStringMsg.a instanceof MapValueMessage, "should decode an omitted message value as a default message");
    test.deepEqual(
        Array.prototype.slice.call(TestMapFields.encode(dec).finish()),
        [ 0x3a, 0x05, 0x0a, 0x01, 0x61, 0x12, 0x00 ],
        "should re-encode the default message value"
    );

    test.end();
});

tape.test("static maps - repeated message values merge", function(test) {

    var TestMapFields = staticRoot.jspb.test.TestMapFieldsNoBinary;

    var dec = TestMapFields.decode(Uint8Array.of(
        0x3a, 0x09,
        0x0a, 0x01, 0x61,
        0x12, 0x03, 0x08, 0x96, 0x01,
        0x12, 0x00
    ));

    test.deepEqual(TestMapFields.toObject(dec), {
        mapStringMsg: {
            a: {
                foo: 150
            }
        }
    }, "should merge repeated message-valued map entry fields");

    test.end();
});
