var tap = require("tap");

var protobuf  = require(".."),
    Namespace = protobuf.Namespace,
    Type      = protobuf.Type,
    Field     = protobuf.Field;

tap.test("extension fields", function(test) {

    var root = new protobuf.Root({ noGoogleTypes: true }),
        ns = new Namespace("my"),
        type = new Type("DeclaringType"),
        declaringField = new Field("declaringField", 1, "string", "optional", "ExtendedType");
    root.add(ns.add(type.add(declaringField)));

    test.deepEqual(root.pendingExtensions[0], declaringField, "should be pending until their extended type can be resolved");

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

    test.end();
});
