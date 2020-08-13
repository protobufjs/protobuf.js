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

    obj.setParsedOption("opt1", {a: 1, b: 2});
    test.same(obj.parsedOptions, [{"opt1": {a: 1, b: 2}}], "should set single parsed option");
    obj.setParsedOption("opt1", {a: 3, b: 4});
    test.same(obj.parsedOptions, [{"opt1": {a: 1, b: 2}}, {"opt1": {a: 3, b: 4}}], "should allow same option twice");
    obj.setParsedOption("opt2", 1, "x");
    test.same(obj.parsedOptions, [{"opt1": {a: 1, b: 2}}, {"opt1": {a: 3, b: 4}}, {"opt2": {x: 1}}], "should create new option using property path");
    obj.setParsedOption("opt2", 5, "a.b");
    test.same(obj.parsedOptions, [{"opt1": {a: 1, b: 2}}, {"opt1": {a: 3, b: 4}}, {"opt2": {x: 1, a: {b :5}}}], "should merge new property path in existing option");
    obj.setParsedOption("opt2", 6, "x");
    test.same(obj.parsedOptions, [{"opt1": {a: 1, b: 2}}, {"opt1": {a: 3, b: 4}}, {"opt2": {x: [1,6], a: {b :5}}}], "should convert property to array when set more than once");


    test.equal(obj.toString(), "ReflectionObject Test", "should convert to a string (even if not part of a root)");
    obj.name = "";
    test.equal(obj.toString(), "ReflectionObject", "should convert to a string even with no full name");

    test.end();
});