var tape = require("tape");

var protobuf = require("..");

var root = new protobuf.Root().addJSON(protobuf.common["google/protobuf/wrappers.proto"].nested).addJSON({
    Foo: {
        fields: {
            stringValue: {
                id: 1,
                type: "google.protobuf.StringValue"
            },
            int64Value: {
                id: 2,
                type: "google.protobuf.Int64Value"
            },
            boolValue: {
                id: 3,
                type: "google.protobuf.BoolValue"
            },
            bytesValue: {
                id: 4,
                type: "google.protobuf.BytesValue"
            }
        }
    }
}).resolveAll();

var Foo = root.lookupType("Foo"),
    StringValue = root.lookupType("google.protobuf.StringValue");

tape.test("google.protobuf wrapper types", function(test) {

    var foo = Foo.fromObject({
        stringValue: "abc",
        int64Value: "123",
        boolValue: false,
        bytesValue: "AQI="
    });

    test.same(Foo.toObject(foo, { json: true, bytes: String, longs: String }), {
        stringValue: "abc",
        int64Value: "123",
        boolValue: false,
        bytesValue: "AQI="
    }, "should convert wrapper fields using their JSON scalar representation");

    foo = Foo.fromObject({
        stringValue: {
            value: "abc"
        }
    });

    test.same(Foo.toObject(foo), {
        stringValue: {
            value: "abc"
        }
    }, "should preserve the existing object representation without json conversion");

    var stringValue = StringValue.fromObject("abc");

    test.same(StringValue.toObject(stringValue), {
        value: "abc"
    }, "should preserve direct wrapper objects without json conversion");
    test.equal(StringValue.toObject(stringValue, { json: true }), "abc", "should unwrap direct wrapper objects with json conversion");

    test.end();
});
