var tape = require("tape");

var protobuf = require("..");

tape.test("enums", function(test) {
    var enm = new protobuf.Enum("Test", {
        a: 1,
        b: 2
    });
    test.deepEqual(enm.valuesById, valsById = {
        1: 'a',
        2: 'b'
    }, "should also expose their values by id");

    enm.add("c", 3);
    test.deepEqual(enm.values, {
        a: 1,
        b: 2,
        c: 3
    }, "should allow adding new values");
    test.deepEqual(enm.valuesById, {
        1: 'a',
        2: 'b',
        3: 'c'
    }, "should also expose any new values by id");

    enm.remove("b");
    test.deepEqual(enm.values, {
        a: 1,
        c: 3
    }, "should allow removing existing values");
    test.deepEqual(enm.valuesById, {
        1: 'a',
        3: 'c'
    }, "should no longer expose any removed values by id");

    test.end();
});