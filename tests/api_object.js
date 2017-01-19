var tape = require("tape");

var protobuf = require("..");

tape.test("reflection objects", function(test) {

    test.throws(function() { new protobuf.ReflectionObject(null); }, TypeError, "should throw on construction if name is not a string");
    test.throws(function() { new protobuf.ReflectionObject("name", true); }, TypeError, "should throw on construction if options is not an object if not omitted");

    var obj = new protobuf.ReflectionObject("Test");

    obj.resolve();
    test.equal(obj.resolved, false, "should not resolve when not part of a root");

    obj.resolved = 2;
    obj.resolve();
    test.equal(obj.resolved, 2, "should not resolve again when already resolved");
    obj.resolved = false;

    obj.setOptions({ a: 1, b: 2 });
    test.same(obj.options, { a: 1, b: 2 }, "should set multiple options");
    obj.setOptions(undefined);
    test.same(obj.options, { a: 1, b: 2 }, "should accept undefined as options");    
    obj.setOption("c", 3);
    test.same(obj.options, { a: 1, b: 2, c: 3 }, "should set single options");

    test.equal(obj.toString(), "ReflectionObject Test", "should convert to a string (even if not part of a root)");
    obj.name = "";
    test.equal(obj.toString(), "ReflectionObject", "should convert to a string even with no full name");

    test.end();
});