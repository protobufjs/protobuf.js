var tape = require("tape");

var protobuf = require("..");

tape.test("reflected enums", function(test) {

    var enm = new protobuf.Enum("Test", {
        a: 1,
        b: 2
    });

    test.same(enm.valuesById, {
        1: "a",
        2: "b"
    }, "should also expose their values by id");

    enm.add("c", 3);
    test.same(enm.values, {
        a: 1,
        b: 2,
        c: 3
    }, "should allow adding new values");
    test.same(enm.valuesById, {
        1: "a",
        2: "b",
        3: "c"
    }, "should also expose any new values by id");

    enm.remove("b");
    test.same(enm.values, {
        a: 1,
        c: 3
    }, "should allow removing existing values");
    test.same(enm.valuesById, {
        1: "a",
        3: "c"
    }, "should no longer expose any removed values by id");

    test.same(enm.toJSON(), {
        options: undefined,
        values: {
            a: 1,
            c: 3
        }
    }, "should export options and values to JSON");

    test.end();
});