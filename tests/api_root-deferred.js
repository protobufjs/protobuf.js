var tape = require("tape");

var protobuf  = require(".."),
    Namespace = protobuf.Namespace,
    Type      = protobuf.Type,
    Field     = protobuf.Field;

tape.test("extension fields", function(test) {

    var root = new protobuf.Root({ noGoogleTypes: true }),
        ns = new Namespace("my"),
        type = new Type("DeclaringType"),
        declaringField = new Field("declaringField", 1, "string", "optional", "ExtendedType");
    root.add(ns.add(type.add(declaringField)));

    test.deepEqual(root.deferred[0], declaringField, "should be deferred until their extended type can be resolved");

    var extendedType = new Type("ExtendedType");
    ns.add(extendedType);
    var extensionField = extendedType.get(declaringField.fullName);
    test.equal(extensionField, declaringField.extensionField, "should become available once their extended type is known");

    type.remove(declaringField);
    extensionField = extendedType.get(declaringField.fullName);
    test.equal(extensionField, null, "should become unavailable when their declaring field is removed");

    type.add(declaringField);
    extensionField = extendedType.get(declaringField.fullName);
    test.equal(extensionField, declaringField.extensionField, "should become instantly available if their extended type is knwon");

    ns.remove(extendedType);
    type.remove(declaringField);
    type.add(declaringField);
    test.throws(function() {
        root.resolveAll();
    }, Error, "should throw on resolveAll if there are unresolvable extensions");
    type.remove(declaringField);

    test.end();
});
