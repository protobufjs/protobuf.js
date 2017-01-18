var tape = require("tape");

var protobuf = require("..");

var def = {
    nested: undefined,
    options: undefined
};

var proto = "package ns;\
enum Enm {\
    ONE = 1;\
    TWO = 2;\
}\
message Msg {}\
service Svc {}";

tape.test("reflected namespaces", function(test) {
    test.ok(protobuf.Namespace.testJSON(def), "should recognize namespaces as JSON");

    var ns = protobuf.Namespace.fromJSON("ns", def);
    test.same(ns.toJSON(), def, "should construct from and convert back to JSON");

    var root = protobuf.parse(proto).root;
    ns = root.lookup("ns").resolveAll();

    test.same(ns.getEnum("Enm"), { ONE: 1, TWO: 2 }, "should get enums");
    test.throws(function() {
        ns.getEnum("Msg");
    }, Error, "should throw when getting a message as an enum")
    test.throws(function() {
        ns.getEnum("NOTFOUND");
    }, Error, "should throw when getting null as an enum")

    test.ok(ns.lookupType("Msg"), "should lookup types");
    test.throws(function() {
        ns.lookupType("Enm");
    }, Error, "should throw when looking up an enum as a type");
    test.throws(function() {
        ns.lookupType("NOTFOUND");
    }, Error, "should throw when looking up null as a type");

    test.ok(ns.lookupEnum("Enm"), "should lookup enums");
    test.throws(function() {
        ns.lookupEnum("Msg");
    }, Error, "should throw when looking up a type as an enum");
    test.throws(function() {
        ns.lookupEnum("NOTFOUND");
    }, Error, "should throw when looking up null as an enum");

    test.ok(ns.lookupService("Svc"), "should lookup services");
    test.throws(function() {
        ns.lookupService("Msg");
    }, Error, "should throw when looking up a type as a service");
    test.throws(function() {
        ns.lookupService("NOTFOUND");
    }, Error, "should throw when looking up null as a service");

    test.equal(ns.lookup(""), ns, "should lookup itself for an empty path");
    test.equal(ns.lookup([]), ns, "should lookup itself for []");
    test.ok(ns.lookup(".") instanceof protobuf.Root, "should lookup root for .");
    test.ok(ns.lookup([""]) instanceof protobuf.Root, "should lookup root for [\"\"]");

    test.throws(function() {
        ns.define(".sub", {});
    }, "should throw when defining absolute .sub");
    test.throws(function() {
        ns.define(["", "sub"], {});
    }, "should throw when defining absolute [\"\", \"sub\"]");
    var sub = ns.define("sub", {});
    test.equal(ns.lookup("sub"), sub, "should define sub namespaces");
    sub = ns.define("sub.sub");
    test.equal(ns.lookup("sub.sub"), sub, "should define sub sub namespaces");

    test.end();
});
