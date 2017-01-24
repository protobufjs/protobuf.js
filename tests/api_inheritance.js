var tape = require("tape");

var protobuf = require("..");

var objects = [
    protobuf.Enum,
    protobuf.Field,
    protobuf.MapField,
    protobuf.Method,
    protobuf.Namespace,
    protobuf.Root,
    protobuf.Service,
    protobuf.Type
];

var namespaces = [
    protobuf.Root,
    protobuf.Service,
    protobuf.Type
];

var fields = [
    protobuf.MapField
];

tape.test("inheritance", function(test) {

    objects.forEach(function(object) {
        test.ok(object.prototype instanceof protobuf.ReflectionObject, object.className + " should extend ReflectionObject");
    });

    namespaces.forEach(function(ns) {
        test.ok(ns.prototype instanceof protobuf.Namespace, ns.className + " should extend Namespace");
    });

    fields.forEach(function(field) {
        test.ok(field.prototype instanceof protobuf.Field, field.className + " should extend Field");
    });

    test.end();

});