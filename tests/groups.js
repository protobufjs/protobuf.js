var tape = require("tape");

var protobuf = require("..");

var proto = "message Test {\
    required group MyGroup = 1 {\
        option foo = \"bar\";\
        required uint32 a = 2;\
    };\
}";

tape.test("legacy groups", function(test) {
    var root = protobuf.parse(proto).root;

    var Test = root.resolveAll().lookup("Test");
    var MyGroupType = Test.get("MyGroup");
    var MyGroupField = Test.get("myGroup");

    test.ok(MyGroupType instanceof protobuf.Type && MyGroupField instanceof protobuf.Field, "should parse to a type and a field");
    test.equal(MyGroupType.group, true, "should have the group flag set on the type");
    test.equal(MyGroupField.resolvedType, MyGroupType, "should reference the type from the field");

    var msg = {
        myGroup: {
            a: 111
        }
    };

    test.test("should encode", function(test) {
        var buf = Test.encode(msg).finish();
        verifyEncode(test, buf);
        test.deepEqual(Test.decode(buf), msg, "and decode back the original message");
        test.end();
    });

    var json = MyGroupType.toJSON();
    test.equal(json.group, true, "should export group=true to JSON");

    var MyGroupType2 = protobuf.Type.fromJSON("MyGroup", json);
    test.equal(MyGroupType2.group, true, "should import group=true from JSON");
    // NOTE: fromJSON alone does not add the sister-field.
    // The parser does this explicitly and the field is part of the exported JSON itself.

    test.end();
});

function verifyEncode(test, buf) {
    test.equal(buf.length, 4, "a total of 4 bytes");
    test.equal(buf[0], 1 << 3 | 3, "id 1, wireType 3");
    test.equal(buf[1], 2 << 3 | 0, "id 2, wireType 0");
    test.equal(buf[2], 111, "111");
    test.equal(buf[3], 1 << 3 | 4, "id 1, wireType 4");
}
