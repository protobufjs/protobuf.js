var tape = require("tape");

var protobuf = require("..");

var proto1 = "message Test {\
  repeated uint32 a = 1 [packed = true];\
}";

var proto2 = "message Test {\
  repeated uint32 a = 1 [packed = false];\
}";

var msg = {
    a: [1,2,3]
};

tape.test("packed repeated values", function(test) {
    var root1 = protobuf.parse(proto1).root,
        root2 = protobuf.parse(proto2).root;
    var Test1 = root1.lookup("Test"),
        Test2 = root2.lookup("Test");
    
    var dec1 = Test2.decode(Test1.encode(msg).finish());
    test.same(dec1, msg, "should decode packed even if defined non-packed");
    var dec2 = Test1.decode(Test2.encode(msg).finish());
    test.same(dec2, msg, "should decode non-packed even if defined packed");

    test.end();
});
