var tape = require("tape");

var protobuf = require("..");

var proto = "message Something {}";

tape.test("reflected classes", function(test) {

    var root = protobuf.parse(proto).root,
        Something = root.lookup("Something");

    test.plan(4);

    test.equal(protobuf.Class.create, protobuf.Class, "Class.create should be an alias of Class (constructor)");

    test.throws(function() {
        protobuf.Class.create("a");
    }, TypeError, "Class.create should throw if first argument is not a Type");

    test.throws(function() {
        protobuf.Class.create(Something, "a");
    }, TypeError, "Class.create should throw if second argument is not a function");

    test.test(test.name + " - should construct equally using Class.create or new Class", function(test) {
        var proto1 = new protobuf.Class(Something),
            proto2 = protobuf.Class.create(Something);
        for (var key in proto1) {
            if (typeof proto1[key] === "function")
                test.equal(proto1[key].toString(), proto2[key].toString(), "with the same " + key + " function");
            else
                test.same(proto1[key], proto2[key], "with the same " + key + " value");
        }
        test.end();
    });
});