var tape = require("tape");

var protobuf  = require("..");

tape.test("exposure handlers", function(test) {
    var root = new protobuf.Root();

    var ns = new protobuf.Namespace("MyNamespace");
    root.add(ns);
    test.ok(root.MyNamespace, "should expose namespaces on roots");

    var type = new protobuf.Type("MyType");
    ns.add(type);
    test.ok(root.MyNamespace.MyType, "should expose types on namespaces");

    var lcType = new protobuf.Type("myType");
    ns.add(lcType);
    test.notOk(root.MyNamespace.myType, "should not expose lower-cased types on namespaces");

    var enm = new protobuf.Enum("MyEnum", {});
    type.add(enm);
    test.ok(root.MyNamespace.MyType.MyEnum, "should expose enums on types");

    var lcEnm = new protobuf.Enum("myEnum", {});
    type.add(lcEnm);
    test.notOk(root.MyNamespace.MyType.myEnum, "should not expose lower-cased enums on types");

    ns.remove(type);
    test.notOk(root.MyNamespace.MyType, "should unexpose types on namespaces");

    type.remove(enm);
    test.notOk(type.MyEnum, "should unexpose enums on types, even if no longer part of a root");

    root.remove(ns);
    test.notOk(root.MyNamespace, "should unexpose namespaces on roots");

    test.end();
});