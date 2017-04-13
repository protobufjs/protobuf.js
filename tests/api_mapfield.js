var tape = require("tape");

var protobuf = require("..");

var def = {
    keyType: "bytes",
    type: "string",
    id: 1
};

tape.test("reflected map fields", function(test) {

    var field = protobuf.MapField.fromJSON("a", def);
    test.same(field.toJSON(), def, "should construct from and convert back to JSON");

    test.throws(function() {
        field.resolve();
    }, Error, "should throw for invalid key types");

    test.end();
});
