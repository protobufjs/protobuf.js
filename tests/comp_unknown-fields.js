var tape = require("tape");

var protobuf = require("..");

var proto = "message Simple_v1 {\
  optional string name  = 1;\
  optional string value = 3;\
}\
message Simple_v2 {\
  optional string name  = 1;\
  optional int32  flags = 2;\
  optional string value = 3;\
}";

var msg = { inner: [{}, {}, {}] };

tape.test("unknown fields", function (test) {
    var root = protobuf.parse(proto).root,
        Simple_v1 = root.lookup("Simple_v1");
        Simple_v2 = root.lookup("Simple_v2");

    var s2 = Simple_v2.create({ name: "v2", flags: 2, value: "dummy" });
    var s1 = Simple_v1.decode(Simple_v2.encode(s2).finish());

    var restored = Simple_v2.decode(Simple_v1.encode(s1).finish());

    test.equal(s2.name, restored.name, "assert: even known fields are missing");

    test.equal(2, restored.flags, "are preserved by default");
    test.end();
});

tape.test("discarded unknown fields", function (test) {
    var root = protobuf.parse(proto).root,
        Simple_v1 = root.lookup("Simple_v1");
        Simple_v2 = root.lookup("Simple_v2");

    var s2 = Simple_v2.create({ name: "v2", flags: 2, value: "dummy" });
    var s1 = Simple_v1.decode(Simple_v2.encode(s2).finish());

    try {
        Simple_v1.discardUnknownFields(s1);
    }
    catch (ex) {
        test.end("discardUnknownFields() exception: " + ex);
        return;
    }

    var restored = Simple_v2.decode(Simple_v1.encode(s1).finish());

    test.equal(0, restored.flags, "are removed from the message");
    test.end();
});

tape.test("multiple unknown fields", function (test) {
    var proto = "message Simple_v1 {\
      optional string name  = 1;\
      optional string value = 3;\
    }\
    message Simple_v2 {\
      optional string name  = 1;\
      optional int32  flags = 2;\
      optional string value = 3;\
      optional int32  options = 4;\
    }";

    var root = protobuf.parse(proto).root,
        Simple_v1 = root.lookup("Simple_v1");
        Simple_v2 = root.lookup("Simple_v2");

    var s2 = Simple_v2.create({ name: "v2", flags: 2, value: "dummy", options: 3 });
    var s1 = Simple_v1.decode(Simple_v2.encode(s2).finish());

    var restored = Simple_v2.decode(Simple_v1.encode(s1).finish());

    test.equal(2, restored.flags, "are preserved by default");
    test.equal(3, restored.options, "are preserved by default");
    test.end();
});

tape.test("nested unknown fields", function (test) {
    var proto = "message Simple_v1 {\
      optional string name  = 1;\
      optional string value = 3;\
    }\
    message Simple_v2 {\
      optional string name  = 1;\
      optional int32  flags = 2;\
      optional string value = 3;\
    }\
    message Container_v1 {\
      optional Simple_v1 elem = 1;\
    }\
    message Container_v2 {\
      optional Simple_v2 elem = 1;\
    }";

    var root = protobuf.parse(proto).root,
        Container_v1 = root.lookup("Container_v1");
        Container_v2 = root.lookup("Container_v2");

    var c2 = Container_v2.create({ elem: { name: "v2", flags: 2, value: "dummy" } });
    var c1 = Container_v1.decode(Container_v2.encode(c2).finish());

    var restored = Container_v2.decode(Container_v1.encode(c1).finish());

    test.equal(c2.elem.name, restored.elem.name, "assert: even known fields are missing");

    test.equal(2, restored.elem.flags, "are preserved by default");
    test.end();
});

