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
