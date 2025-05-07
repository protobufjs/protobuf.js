var tape = require("tape");

var protobuf = require("..");

var root = new protobuf.Root().addJSON(protobuf.common["google/protobuf/any.proto"].nested).addJSON({
    Foo: {
        fields: {
            foo: {
                id: 1,
                type: "google.protobuf.Any"
            }
        }
    },
    Bar: {
        fields: {
            bar: {
                id: 1,
                type: "string"
            }
        }
    }
}).resolveAll();

var Any = root.lookupType("protobuf.Any"),
    Foo = root.lookupType(".Foo"),
    Bar = root.lookupType(".Bar");

tape.test("google.protobuf.Any", function(test) {

    var foo = Foo.fromObject({
        foo: {
            type_url: "Bar",
            value: [1 << 3 | 2, 1, 97] // value = "a"
        }
    });
    test.ok(foo.foo instanceof Any.ctor, "should keep explicit Any in fromObject");
    test.same(foo.foo, { type_url: "Bar", value: [10, 1, 97] }, "should keep explicit Any in fromObject properly");

    var obj = Foo.toObject(foo);
    test.same(obj.foo, { type_url: "Bar", value: [10, 1, 97] }, "should keep explicit Any in toObject properly");

    obj = Foo.toObject(foo, { json: true });
    test.same(obj.foo, { "@type": "type.googleapis.com/Bar", bar: "a" }, "should decode explicitly Any in toObject if requested");

    foo = Foo.fromObject({
        foo: {
            "@type": ".Bar",
            bar: "a"
        }
    });
    test.ok(foo.foo instanceof Any.ctor, "should convert to Any in fromObject");
    test.same(foo.foo, { type_url: "/Bar", value: protobuf.util.newBuffer([10, 1, 97]) }, "should have correct Any object when converted with fromObject");

    var baz = Foo.fromObject({
        foo: {
            type_url: "type.someurl.com/Bar",
            value: [1 << 3 | 2, 1, 97] // value = "a"
        }
    });
    obj = Foo.toObject(baz, { json: true });
    test.same(obj.foo, { "@type": "type.someurl.com/Bar", bar: "a" }, "should keep prefix in type url");

    test.end();
});
