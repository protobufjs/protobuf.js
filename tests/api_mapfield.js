var tape = require("tape");

var protobuf = require("..");

var def = {
    keyType: "bytes",
    type: "string",
    id: 1,
    extend: undefined,
    options: undefined
};

tape.test("reflected map fields", function(test) {

    test.ok(protobuf.MapField.testJSON(def), "should recognize a mapfield definition as JSON");

    var field = protobuf.MapField.fromJSON("a", def);
    test.same(field.toJSON(), def, "should construct from and convert back to JSON");

    test.throws(function() {
        field.resolve();
    }, Error, "should throw for invalid key types");

    test.end();
});
