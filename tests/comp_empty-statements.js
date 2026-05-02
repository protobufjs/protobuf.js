var tape = require("tape");
var protobuf = require("..");

tape.test("empty statements", function(test) {
    var root = protobuf.parse("syntax = \"proto3\";;" +
        "message Request { string value = 1;; }" +
        "message Response { oneof result { string value = 1; }; }" +
        "enum Status { UNKNOWN = 0;; OK = 1; ; }" +
        "service TestService { ; rpc Get(Request) returns (Response) { ; option deprecated = true;; }; }").root;

    var proto2Root = protobuf.parse("syntax = \"proto2\";" +
        "message Legacy { optional group Group = 1 { ; optional string value = 2;; } }").root;

    test.ok(root.lookupType("Request").fields.value, "should parse message fields");
    test.ok(root.lookupType("Response").oneofs.result, "should parse oneof fields");
    test.equal(root.lookupEnum("Status").values.OK, 1, "should parse enum values");
    test.ok(root.lookupService("TestService").methods.Get, "should parse service methods");
    test.ok(proto2Root.lookupType("Legacy.Group").fields.value, "should parse group fields");
    test.end();
});
