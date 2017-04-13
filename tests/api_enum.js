var tape = require("tape");

var protobuf = require("..");

tape.test("reflected enums", function(test) {

    var enm = new protobuf.Enum("Test", {
        a: 1,
        b: 2
    });

    var enm_allow_alias = new protobuf.Enum( 'AliasTest',
    { a: 0 }, { allow_alias: true } );

    test.throws(function() {
        new protobuf.Enum("Test", true);
    }, TypeError, "should throw if values is specified but not an object");

    test.same(enm.valuesById, {
        1: "a",
        2: "b"
    }, "should also expose their values by id");

    test.throws(function() {
        enm.add(2, 2);
    }, TypeError, "should throw if name is not a string");

    test.throws(function() {
        enm.add("c", 1.5);
    }, TypeError, "should throw if id is not an integer");

    test.throws(function() {
        enm.add("b", 2);
    }, Error, "should throw if name is a duplicate");

    test.throws(function() {
        enm.add("c", 2);
    }, Error, "should throw if id is a duplicate, without allow_alias option");

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

    test.throws(function() {
        enm.remove(1);
    }, TypeError, "should throw if name is not a string");

    test.throws(function() {
        enm.remove("d");
    }, Error, "should throw if name is not present");

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
        values: {
            a: 1,
            c: 3
        }
    }, "should export values to JSON");

    enm_allow_alias.add( 'b', 0 );
    test.same( enm_allow_alias.values, {
      a: 0,
      b: 0
    });

    test.end();
});
