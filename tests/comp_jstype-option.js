const tape = require("tape");
const protobuf = require("..");

tape.test("should handle jstype = JS_STRING for int64 field", function(test) {
    var proto = `
    syntax = \"proto3\";
    message Info {
        int64 id = 1 [jstype = JS_STRING];
      }`;
    var expectedMessage = {
        id: "111111111111111"
    };

    const root = protobuf.parse(proto).root;
    const Info = root.lookup("Info");
    
    var actualMessage = Info.decode(Info.encode(expectedMessage).finish());
    test.same(actualMessage, expectedMessage, "should encode and decode back to the original values");
    test.end();
});