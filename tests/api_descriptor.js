var tape = require("tape");

var protobuf = require(".."),
    descriptor = require("../ext/descriptor");

tape.test("descriptor nesting", function(test) {
    function nestedMessageDescriptor(depth) {
        var root = descriptor.DescriptorProto.create({ name: "Message0" }),
            nested = root;
        for (var i = 1; i <= depth; ++i) {
            var child = descriptor.DescriptorProto.create({ name: "Message" + i });
            nested.nestedType.push(child);
            nested = child;
        }
        return root;
    }

    function packageDescriptor(depth) {
        var packageName = "a";
        for (var i = 1; i < depth; ++i)
            packageName += ".a";
        return descriptor.FileDescriptorSet.create({
            file: [ descriptor.FileDescriptorProto.create({
                name: "test.proto",
                "package": packageName
            }) ]
        });
    }

    var recursionLimit = protobuf.util.recursionLimit,
        nestingLimit = protobuf.util.nestingLimit;
    try {
        protobuf.util.recursionLimit = 100;
        protobuf.util.nestingLimit = 3;
        test.doesNotThrow(function() {
            protobuf.Type.fromDescriptor(nestedMessageDescriptor(3), "proto3");
        }, "should load descriptor message nesting up to the nesting limit");
        test.throws(function() {
            protobuf.Type.fromDescriptor(nestedMessageDescriptor(4), "proto3");
        }, /max depth exceeded/, "should reject excessively nested descriptor messages");

        protobuf.util.recursionLimit = 3;
        protobuf.util.nestingLimit = 100;
        test.doesNotThrow(function() {
            protobuf.Root.fromDescriptor(packageDescriptor(3));
        }, "should load descriptor package paths up to the recursion limit");
        test.throws(function() {
            protobuf.Root.fromDescriptor(packageDescriptor(4));
        }, /max depth exceeded/, "should reject excessively nested descriptor package paths");
    } finally {
        protobuf.util.recursionLimit = recursionLimit;
        protobuf.util.nestingLimit = nestingLimit;
    }

    test.end();
});
