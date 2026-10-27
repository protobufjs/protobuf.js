var tape = require("tape");

var protobuf = require("..");

var def = {};

var proto = "package ns;\
enum Enm {\
    ONE = 1;\
    TWO = 2;\
}\
message Msg {\
    message Enm {}\
}\
service Svc {}";

tape.test("reflected namespaces", function(test) {

    var ns = protobuf.Namespace.fromJSON("ns", def);
    test.same(ns.toJSON(), def, "should construct from and convert back to JSON");

    var root = protobuf.parse(proto).root;
    ns = root.lookup("ns").resolveAll();
    test.same(ns.getEnum("Enm"), { ONE: 1, TWO: 2 }, "should get enums");

    test.throws(function() {
        ns.getEnum("Msg");
    }, Error, "should throw when getting a message as an enum");

    test.throws(function() {
        ns.getEnum("NOTFOUND");
    }, Error, "should throw when getting null as an enum");

    test.ok(ns.lookupType("Msg"), "should lookup types");

    test.equal(ns.get("Msg").lookupTypeOrEnum("Enm"), ns.lookup(".ns.Msg.Enm"), "should lookup the nearest type or enum");

    var collisionRoot = protobuf.parse("syntax = \"proto3\";\
message NestedMessage { int32 id = 1; }\
message TestMessage {\
    message NestedMessage {\
        int32 id = 1;\
        string name = 2;\
    }\
    NestedMessage nested = 1;\
}").root.resolveAll();
    var TestMessage = collisionRoot.lookupType("TestMessage");
    test.equal(TestMessage.fields.nested.resolvedType.fullName, ".TestMessage.NestedMessage", "should prefer nested types over global types with the same name");
    test.equal(TestMessage.decode(TestMessage.encode({ nested: { id: 1, name: "hello" } }).finish()).nested.name, "hello", "should encode fields from the nested type");

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
        ns.define(null);
    }, "should throw when path is not a string or array");

    test.throws(function() {
        ns.define(".sub", {});
    }, "should throw when defining absolute .sub");

    test.throws(function() {
        ns.define(["", "sub"], {});
    }, "should throw when defining absolute [\"\", \"sub\"]");

    var sub = ns.define("sub", {});
    test.equal(ns.lookup("sub"), sub, "should define sub namespaces");

    var recursionLimit = protobuf.util.recursionLimit;
    protobuf.util.recursionLimit = 3;
    try {
        test.doesNotThrow(function() {
            ns.define("a.b.c");
        }, "should define namespace paths up to the recursion limit");
        test.throws(function() {
            ns.define("a.b.c.d");
        }, /max depth exceeded/, "should reject excessively nested namespace paths");
    } finally {
        protobuf.util.recursionLimit = recursionLimit;
    }

    test.throws(function() {
        ns.add(new protobuf.ReflectionObject("invalid"));
    }, TypeError, "should throw when adding invalid nested objects");

    test.throws(function() {
        ns.add(new protobuf.Enum("sub"));
    }, Error, "should throw on duplicate names");

    sub = ns.define("sub.sub");
    test.equal(ns.lookup("sub.sub"), sub, "should define sub sub namespaces");

    test.throws(function() {
        ns.remove(true);
    }, TypeError, "should throw when trying to remove non-reflection objects");

    test.throws(function() {
        ns.remove(new protobuf.Enum("Enm"));
    }, Error, "should throw when trying to remove non-children");

    var renamed = new protobuf.Type("RenamedBefore");
    ns.add(renamed);
    renamed.name = "RenamedAfter";
    ns.remove(renamed);
    test.equal(renamed.parent, null, "should remove renamed nested objects");
    test.equal(ns.get("RenamedBefore"), null, "should remove renamed nested objects from the original key");

    test.throws(function() {
        ns.add(new protobuf.Enum("MyEnum", {}));
        ns.define("MyEnum");
    }, Error, "should throw when trying to define a path conflicting with non-namespace objects");

    var specialRoot = protobuf.Root.fromJSON(JSON.parse("{\"nested\":{\"__proto__\":{\"fields\":{}},\"constructor\":{\"fields\":{}}}}"));
    test.equal(specialRoot.lookup("__proto__"), null, "should ignore reserved nested object names");
    test.equal(Object.getPrototypeOf(specialRoot._lookupCache), null, "should isolate lookup cache keys");

    var fallbackRoot = protobuf.Root.fromJSON({
        nested: {
            A: {
                nested: {
                    Point3D: { fields: {} }
                }
            },
            C: {
                nested: {
                    Point3D: { fields: {} }
                }
            },
            B: {
                fields: {
                    p: { type: "Point3D", id: 1 }
                }
            }
        }
    }).resolveAll();
    test.equal(fallbackRoot.lookupType("B").fields.p.resolvedType.fullName, ".A.Point3D", "should preserve legacy first-match nested fallback lookup");

    ns = protobuf.Namespace.fromJSON("My", {
        nested: {
            Message: { fields: {} },
            Enum: { values: {} },
            Service: { methods: {} },
            extensionField: { type: "string", id: 1000, extend: "Message" },
            Other: { nested: {} }
        }
    });
    test.same(ns.toJSON(), {
        nested: {
            Message: { fields: {} },
            Enum: { values: {} },
            Service: { methods: {} },
            extensionField: { extend: "Message", id: 1000, type: "string" },
            Other: { }
        }
    }, "should create from Type, Enum, Service, extension Field and Namespace JSON");

    test.end();
});

tape.test("JSON descriptor nesting", function(test) {
    function nestedNamespaceDescriptor(depth) {
        var root = { nested: {} };
        var nested = root.nested;
        for (var i = 0; i < depth; ++i) {
            nested["Level" + i] = { nested: {} };
            nested = nested["Level" + i].nested;
        }
        return root;
    }

    function nestedTypeDescriptor(depth) {
        var root = { nested: {} };
        var nested = root.nested;
        for (var i = 0; i < depth; ++i) {
            nested["Message" + i] = { fields: {}, nested: {} };
            nested = nested["Message" + i].nested;
        }
        return root;
    }

    function nestedServiceDescriptor(depth) {
        var root = { nested: {} };
        var nested = root.nested;
        for (var i = 0; i < depth; ++i) {
            nested["Service" + i] = { methods: {}, nested: {} };
            nested = nested["Service" + i].nested;
        }
        return root;
    }

    function nestedOptionPathDescriptor(depth) {
        var path = "features";
        for (var i = 0; i < depth; ++i)
            path += ".a";
        var descriptor = { options: {}, nested: {} };
        descriptor.options[path] = true;
        return descriptor;
    }

    var recursionLimit = protobuf.util.recursionLimit,
        nestingLimit = protobuf.util.nestingLimit;
    try {
        protobuf.util.recursionLimit = 3;
        protobuf.util.nestingLimit = 100;
        test.doesNotThrow(function() {
            protobuf.Root.fromJSON(nestedNamespaceDescriptor(3));
        }, "should load namespace descriptors up to the recursion limit");
        test.throws(function() {
            protobuf.Root.fromJSON(nestedNamespaceDescriptor(4));
        }, /max depth exceeded/, "should reject excessively nested namespace descriptors");

        protobuf.util.recursionLimit = 100;
        protobuf.util.nestingLimit = 3;
        test.doesNotThrow(function() {
            protobuf.Root.fromJSON(nestedTypeDescriptor(3));
        }, "should load type descriptors up to the nesting limit");
        test.throws(function() {
            protobuf.Root.fromJSON(nestedTypeDescriptor(4));
        }, /max depth exceeded/, "should reject excessively nested type descriptors");

        protobuf.util.recursionLimit = 3;
        protobuf.util.nestingLimit = 100;
        test.doesNotThrow(function() {
            protobuf.Root.fromJSON(nestedServiceDescriptor(3));
        }, "should load service descriptors up to the recursion limit");
        test.throws(function() {
            protobuf.Root.fromJSON(nestedServiceDescriptor(4));
        }, /max depth exceeded/, "should reject excessively nested service descriptors");
        test.doesNotThrow(function() {
            protobuf.Root.fromJSON(nestedOptionPathDescriptor(2));
        }, "should load option paths up to the recursion limit");
        test.throws(function() {
            protobuf.Root.fromJSON(nestedOptionPathDescriptor(3));
        }, /max depth exceeded/, "should reject excessively nested option paths");
    } finally {
        protobuf.util.recursionLimit = recursionLimit;
        protobuf.util.nestingLimit = nestingLimit;
    }

    test.end();
});

tape.test("nested type lookup from enclosing scopes", function(test) {

    function parseTree(pkg) {
        var prefix = pkg ? "." + pkg : "";
        return protobuf.parse("syntax = \"proto3\";" + (pkg ? "package " + pkg + ";" : "") + "\
message Node { string id = 1; }\
enum Kind { KIND_UNSPECIFIED = 0; KIND_GLOBAL = 1; }\
message Tree {\
    message Node {\
        string label = 1;\
        repeated Node children = 2;\
        Kind kind = 3;\
    }\
    enum Kind { KIND_UNSPECIFIED = 0; KIND_LEAF = 1; }\
    message Branch {\
        Node node = 1;\
        message Twig {\
            Node node = 1;\
            " + prefix + ".Node global_node = 2;\
            " + prefix + ".Kind global_kind = 3;\
        }\
    }\
    message Leaf {\
        message Node { string tag = 1; }\
        Node node = 1;\
    }\
    repeated Node roots = 1;\
    Kind kind = 2;\
}\
message Forest {\
    message Leaf {\
        message Node { string tag = 1; }\
    }\
    message Branch {\
        Node node = 1;\
    }\
}\
message Outer {\
    string Node = 1;\
    message Inner {\
        Node node = 1;\
    }\
}", { keepCase: true }).root.resolveAll();
    }

    ["", "pkg"].forEach(function(pkg) {
        var prefix = pkg ? "." + pkg : "";
        var root = parseTree(pkg);
        var label = pkg ? " (with package)" : " (without package)";
        function resolved(type, field) {
            return root.lookupType(prefix + "." + type).fields[field].resolvedType.fullName;
        }
        test.equal(resolved("Tree", "roots"), prefix + ".Tree.Node", "should resolve a nested type from its parent" + label);
        test.equal(resolved("Tree", "kind"), prefix + ".Tree.Kind", "should resolve a nested enum from its parent" + label);
        test.equal(resolved("Tree.Node", "children"), prefix + ".Tree.Node", "should resolve a nested type from inside that type" + label);
        test.equal(resolved("Tree.Node", "kind"), prefix + ".Tree.Kind", "should resolve a nested enum from a sibling nested type" + label);
        test.equal(resolved("Tree.Branch", "node"), prefix + ".Tree.Node", "should resolve a nested type from a sibling nested type" + label);
        test.equal(resolved("Tree.Branch.Twig", "node"), prefix + ".Tree.Node", "should resolve a nested type from a scope two levels down" + label);
        test.equal(resolved("Tree.Leaf", "node"), prefix + ".Tree.Leaf.Node", "should prefer the innermost scope when several enclosing scopes declare the name" + label);
        test.equal(resolved("Forest.Branch", "node"), prefix + ".Node", "should not let a type nested in a sibling scope shadow a root type" + label);
        test.equal(resolved("Outer.Inner", "node"), prefix + ".Node", "should skip a field named like the type in an enclosing scope" + label);
        test.equal(resolved("Tree.Branch.Twig", "global_node"), prefix + ".Node", "should resolve a leading dot from the root" + label);
        test.equal(resolved("Tree.Branch.Twig", "global_kind"), prefix + ".Kind", "should resolve a leading dot to a root enum" + label);

        var Tree = root.lookupType(prefix + ".Tree");
        var buf = Tree.encode(Tree.fromObject({ roots: [{ label: "a", children: [{ label: "b", kind: "KIND_LEAF" }] }] })).finish();
        test.equal(Buffer.from(buf).toString("hex"), "0a0a0a016112050a01621801", "should encode nested fields with the nested types' layout, as protoc does" + label);
        test.deepEqual(Tree.toObject(Tree.decode(buf), { enums: String }), { roots: [{ label: "a", children: [{ label: "b", kind: "KIND_LEAF" }] }] }, "should decode what it encoded" + label);
        test.equal(root.lookupType(prefix + ".Outer.Inner").lookup("Node"), root.lookupType(prefix + ".Node"), "should skip a field named like the type in an enclosing scope in an unfiltered lookup" + label);
        test.equal(root.lookupType(prefix + ".Outer").lookup("Node"), root.lookupType(prefix + ".Outer").fields.Node, "should still find a field by its name in an unfiltered lookup" + label);
        test.equal(root.lookupType(prefix + ".Tree.Branch.Twig").lookup((prefix + ".Node").slice(1), true), root.lookupType(prefix + ".Node"), "should keep the absolute-path fallback when the enclosing scopes are skipped" + label);
    });
    test.end();
});
