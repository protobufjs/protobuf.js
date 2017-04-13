var tape = require("tape");

var protobuf = require("..");

var def = {
    oneof: ["a", "b"],
    options: {}
};

var proto = "syntax = \"proto3\";\
message Test {\
    oneof kind {\
        uint32 a = 1;\
        string b = 2;\
    }\
    bool c = 3;\
}";

tape.test("reflected oneofs", function(test) {

    var oneof = protobuf.OneOf.fromJSON("kind", {
        oneof: ["a", "b"],
        options: {}
    });
    test.same(oneof.toJSON(), def, "should construct from and convert back to JSON");

    var root = protobuf.parse(proto).root;
    var Test = root.lookup("Test");
    var kind = Test.get("kind");
    var field = Test.get("c");

    kind.add(field);
    test.same(kind.toJSON(), {
        oneof: ["a", "b", "c"]
    }, "should allow adding fields");
    test.ok(Test.get("c"), "should still have the field on the parent");

    kind.remove(field);
    test.same(kind.toJSON(), {
        oneof: ["a", "b"]
    }, "should allow removing fields");
    test.ok(Test.get("c"), "should still have the field on the parent");

    var Test2 = new protobuf.Type("Test2");
    root.add(Test2);
    Test2.add(field);
    kind.add(field);
    test.notOk(Test2.get("c"), "should remove the field from the previous parent");

    var looseField = new protobuf.Field("d", 4, "float");
    kind.add(looseField); // no parent
    Test.remove(looseField);
    Test.remove(kind);
    test.same(Test.fields, {}, "should remove all fields from the parent");
    test.same(kind.oneof, ["a","b","c","d"], "should still have the fields on the oneof");

    test.end();
});
