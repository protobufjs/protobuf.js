var tape = require("tape");

var protobuf = require("..");

var def = {
    fields: {}
};

var def2 = {
    fields: {
        a: {
            type: "uint32",
            id: 1
        }
    },
    oneofs: {
        kind: {
            oneof: ["a"]
        }
    },
    extensions: [[1000, 2000]],
    reserved: [[900, 999], "b"],
    nested: {
        Type: {
            values: { ONE: 1, TWO: 2 }
        },
        Service: {
            methods: {}
        }
    },
    options: {
        custom: true
    }
};

tape.test("reflected types", function(test) {

    var type = protobuf.Type.fromJSON("Test", def);
    test.same(type.toJSON(), def, "should construct from and convert back to JSON");
    type = protobuf.Type.fromJSON("Test", def2);
    test.same(JSON.parse(JSON.stringify(type)), JSON.parse(JSON.stringify(def2)), "should construct from and convert back to JSON (complex parsed)");

    function MyMessageAuto() {}
    type.ctor = MyMessageAuto;
    test.ok(MyMessageAuto.prototype instanceof protobuf.Message, "should properly register a constructor through assignment");
    test.ok(typeof MyMessageAuto.encode === "function", "should populate static methods on assigned constructors");
    test.equal(new MyMessageAuto().a, 0, "should initialize prototype defaults on assigned constructors");

    function MyMessageManual() {}
    MyMessageManual.prototype = Object.create(protobuf.Message.prototype);
    type.ctor = MyMessageManual;
    test.ok(MyMessageManual.prototype instanceof protobuf.Message, "should properly register a constructor through assignment if already extending message");
    test.ok(typeof MyMessageManual.encode === "function", "should populate static methods on assigned constructors");
    test.equal(new MyMessageManual().a, 0, "should initialize prototype defaults on assigned constructors if already extending message");

    type = protobuf.Type.fromJSON("My", {
        fields: {
            a: {
                type: "string",
                id: 1
            }
        },
        reserved: [[900, 999], "b"],
        nested: {
            Type: { fields: {} },
            Enum: { values: {} },
            Service: { methods: {} },
            extensionField: { type: "string", id: 1000, extend: "Message" },
            Other: { nested: {} }
        }
    });
    test.same(type.toJSON(), {
        fields: {
            a: { id: 1, type: "string" }
        },
        reserved: [[900, 999], "b"],
        nested: {
            Type: { fields: {} },
            Enum: { values: {} },
            Service: { methods: {} },
            extensionField: { extend: "Message", id: 1000, type: "string" },
            Other: { }
        }
    }, "should create from Field, Type, Enum, Service, extension Field and Namespace JSON");

    test.throws(function() {
        type.add(new protobuf.Enum("Enum"));
    }, Error, "should throw when trying to add duplicate names");

    test.throws(function() {
        type.add(new protobuf.Field("c", 1, "uint32"));
    }, Error, "should throw when trying to add duplicate ids");

    test.throws(function() {
        type.add(new protobuf.Field("c", 900, "uint32"));
    }, Error, "should throw when trying to add reserved ids");

    test.throws(function() {
        type.add(new protobuf.Field("b", 2, "uint32"));
    }, Error, "should throw when trying to add reserved names");


    test.end();
});

tape.test("generated message constructors", function(test) {
    var root = protobuf.Root.fromJSON({
        nested: {
            Message: {
                fields: {
                    value: { type: "uint32", id: 1 }
                }
            }
        }
    });
    var Message = root.lookupType("Message");
    var msg = new Message.ctor(JSON.parse("{\"__proto__\":{\"marker\":true},\"value\":1}"));

    test.equal(msg.value, 1, "should copy regular properties");
    test.equal(msg.marker, undefined, "should ignore reserved properties");

    var type = new protobuf.Type("Type");
    type.add(new protobuf.Field("__proto__", 2, "uint32"));
    test.equal(type.get("__proto__"), null, "should ignore reserved field names");
    type.add(new protobuf.OneOf("__proto__"));
    test.equal(type.get("__proto__"), null, "should ignore reserved oneof names");

    ["1Message", "default"].forEach(function(name) {
        var root = protobuf.Root.fromJSON({
            nested: {
                [name]: {
                    fields: {
                        value: { type: "uint32", id: 1 }
                    }
                }
            }
        });
        var Type = root.lookupType(name);
        test.equal(Type.create({ value: 1 }).value, 1, "should create messages with generated-safe type names");
    });

    test.end();
});

tape.test("decode nesting", function(test) {
    function varint(value) {
        var bytes = [];
        do {
            var b = value & 0x7F;
            value >>>= 7;
            if (value)
                b |= 0x80;
            bytes.push(b);
        } while (value);
        return bytes;
    }

    function nestedPayload(depth) {
        var payload = [ 0x10, 0x2A ];
        for (var i = 0; i < depth; ++i)
            payload = [ 0x0A ].concat(varint(payload.length), payload);
        return protobuf.util.newBuffer(payload);
    }

    var root = protobuf.Root.fromJSON({
        nested: {
            Node: {
                fields: {
                    child: { type: "Node", id: 1 },
                    value: { type: "int32", id: 2 }
                }
            }
        }
    });
    var Node = root.lookupType("Node");
    var recursionLimit = protobuf.Reader.recursionLimit;

    protobuf.Reader.recursionLimit = 3;
    try {
        test.equal(Node.decode(nestedPayload(2)).child.child.value, 42, "should decode below the limit");
        test.throws(function() {
            Node.decode(nestedPayload(4));
        }, /max depth exceeded/, "should reject excessive nesting");
    } finally {
        protobuf.Reader.recursionLimit = recursionLimit;
    }

    test.end();
});

tape.test("decode known fields by wire type", function(test) {
    var root = protobuf.Root.fromJSON({
        nested: {
            Message: {
                fields: {
                    value: { type: "int32", id: 1 }
                }
            }
        }
    });
    var Message = root.lookupType("Message");
    var field0Varint = [ 0, 0 ];
    var field1WireType6 = [ 1 << 3 | 6, 0 ];
    var field1WireType7 = [ 1 << 3 | 7, 0 ];
    var field1Fixed64 = [ 1 << 3 | 1, 1, 2, 3, 4, 5, 6, 7, 8 ];
    var field1Group = [ 1 << 3 | 3, 1 << 3 | 4 ];
    var field1GroupField2End = [ 1 << 3 | 3, 2 << 3 | 4 ];

    test.throws(function() {
        Message.decode(protobuf.util.newBuffer(field0Varint));
    }, /illegal tag: field number 0/, "should reject field number 0");

    test.throws(function() {
        Message.decode(protobuf.util.newBuffer(field1WireType6));
    }, /invalid wire type 6/, "should reject invalid wire types for known fields");

    test.throws(function() {
        Message.decode(protobuf.util.newBuffer(field1WireType7));
    }, /invalid wire type 7/, "should reject invalid wire types for known fields");

    var message = Message.decode(protobuf.util.newBuffer(field1Fixed64));
    test.notOk(Object.prototype.hasOwnProperty.call(message, "value"), "should skip valid but unexpected wire types");

    message = Message.decode(protobuf.util.newBuffer(field1Group));
    test.notOk(Object.prototype.hasOwnProperty.call(message, "value"), "should skip valid but unexpected groups");

    test.throws(function() {
        Message.decode(protobuf.util.newBuffer(field1GroupField2End));
    }, /invalid end group tag/, "should reject mismatched unknown group tags");
    test.end();
});

tape.test("object conversion nesting", function(test) {
    function nestedObject(depth) {
        var object = { value: 42 };
        for (var i = 0; i < depth; ++i)
            object = { child: object };
        return object;
    }

    var root = protobuf.Root.fromJSON({
        nested: {
            Node: {
                fields: {
                    child: { type: "Node", id: 1 },
                    value: { type: "int32", id: 2 }
                }
            }
        }
    });
    var Node = root.lookupType("Node");
    var recursionLimit = protobuf.util.recursionLimit;

    protobuf.util.recursionLimit = 3;
    try {
        test.equal(Node.verify(nestedObject(2)), null, "should verify below the limit");
        test.match(Node.verify(nestedObject(4)), /max depth exceeded/, "should reject excessive nesting while verifying");
        test.equal(Node.fromObject(nestedObject(2)).child.child.value, 42, "should convert below the limit");
        test.throws(function() {
            Node.fromObject(nestedObject(4));
        }, /max depth exceeded/, "should reject excessive nesting while converting");
    } finally {
        protobuf.util.recursionLimit = recursionLimit;
    }

    test.end();
});

tape.test("feature resolution legacy proto3", function(test) {
    var json = {
        fields: {
            regular: { type: "string", id: 1 },
            packed: { type: "int32", id: 2, rule: "repeated" },
            unpacked: { type: "int32", id: 3, rule: "repeated", options: { packed: false } }
        },
        nested: { Nested: { fields: {
            regular: { type: "string", id: 1 },
            packed: { type: "int32", id: 2, rule: "repeated" },
            unpacked: { type: "int32", id: 3, rule: "repeated", options: { packed: false } }
        } } }
    };
    var root = new protobuf.Root();
    var Type = protobuf.Type.fromJSON("My", json);
    root.add(Type).resolveAll();

    var Nested = Type.nested.Nested;

    test.same(Type.toJSON(), json, "JSON should roundtrip");
    test.same(Nested.toJSON(), json.nested.Nested, "nested JSON should roundtrip");

    test.equal(Type._edition, "proto3", "should infer proto3 syntax");
    test.notOk(Type.fields.regular.hasPresence, "should have implicit presence by default");
    test.ok(Type.fields.packed.packed, "should have packed encoding by default");
    test.notOk(Type.fields.unpacked.packed, "should override expanded encoding");

    test.equal(Nested._edition, null, "should not infer proto3 syntax");
    test.notOk(Nested.fields.regular.hasPresence, "nested should have implicit presence by default");
    test.ok(Nested.fields.packed.packed, "nested should have packed encoding by default");
    test.notOk(Nested.fields.unpacked.packed, "nested should override expanded encoding");

    test.end();
});

tape.test("feature resolution proto2", function(test) {
    var json = {
        edition: "proto2",
        fields: {
            regular: { type: "string", id: 1 },
            required: { type: "string", id: 2, rule: "required" },
            packed: { type: "int32", id: 3, rule: "repeated", options: { packed: true } },
            unpacked: { type: "int32", id: 4, rule: "repeated"}
        },
        nested: { Nested: { fields: {
            regular: { type: "string", id: 1 },
            packed: { type: "int32", id: 2, rule: "repeated", options: { packed: true } },
            unpacked: { type: "int32", id: 3, rule: "repeated" }
        } } }
    };
    var root = new protobuf.Root();
    var Type = protobuf.Type.fromJSON("My", json);
    root.add(Type).resolveAll();

    var Nested = Type.nested.Nested;

    test.same(Type.toJSON(), json, "JSON should roundtrip");
    test.same(Nested.toJSON(), json.nested.Nested, "nested JSON should roundtrip");

    test.equal(Type._edition, "proto2", "should set edition");
    test.ok(Type.fields.regular.hasPresence, "should have explicit presence by default");
    test.ok(Type.fields.required.required, "should have required fields");
    test.ok(Type.fields.packed.packed, "should override packed encoding");
    test.notOk(Type.fields.unpacked.packed, "should have expanded encoding by default");

    test.equal(Nested._edition, null, "should not set edition");
    test.ok(Nested.fields.regular.hasPresence, "nested should have explicit presence by default");
    test.notOk(Nested.fields.unpacked.packed, "nested should have expanded encoding by default");
    test.ok(Nested.fields.packed.packed, "nested should override packed encoding");

    test.end();
});


tape.test("feature resolution edition 2023", function(test) {
    var json = {
        edition: "2023",
        fields: {
            explicit: { type: "string", id: 1 },
            implicit: { type: "string", id: 2, options: { "features": { "field_presence": "IMPLICIT" } } },
            required: { type: "string", id: 3, rule: "required", options: { "features": { "field_presence": "LEGACY_REQUIRED" } } },
            packed: { type: "int32", id: 4, rule: "repeated" },
            unpacked: { type: "int32", id: 5, rule: "repeated", options: { "features": { "repeated_field_encoding": "EXPANDED" } } }
        },
        nested: { Nested: { fields: {
            explicit: { type: "string", id: 1 },
            implicit: { type: "string", id: 2, options: { "features": { "field_presence": "IMPLICIT" } } },
            packed: { type: "int32", id: 3, rule: "repeated" },
            unpacked: { type: "int32", id: 4, rule: "repeated", options: { "features": { "repeated_field_encoding": "EXPANDED" } } }
        } } }
    };
    var root = new protobuf.Root();
    var Type = protobuf.Type.fromJSON("My", json);
    root.add(Type).resolveAll();

    var Nested = Type.nested.Nested;

    test.same(Type.toJSON(), json, "JSON should roundtrip");
    test.same(Nested.toJSON(), json.nested.Nested, "nested JSON should roundtrip");

    test.equal(Type._edition, "2023", "should set edition");
    test.ok(Type.fields.explicit.hasPresence, "should have explicit presence");
    test.notOk(Type.fields.implicit.hasPresence, "should have implicit presence");
    test.ok(Type.fields.required.required, "should have required presence");
    test.ok(Type.fields.packed.packed, "should have packed encoding");
    test.notOk(Type.fields.unpacked.packed, "should have expanded encoding");

    test.equal(Nested._edition, null, "should not set edition");
    test.ok(Nested.fields.explicit.hasPresence, "nested should have explicit presence");
    test.notOk(Nested.fields.implicit.hasPresence, "nested should have implicit presence");
    test.ok(Nested.fields.packed.packed, "nested should have packed encoding");
    test.notOk(Nested.fields.unpacked.packed, "nested should have expanded encoding");

    test.end();
});
