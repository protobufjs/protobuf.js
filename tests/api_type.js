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

    function MyDecodeMessage() {}
    type = protobuf.Type.fromJSON("DecodeTest", {
        fields: {
            a: { type: "uint32", id: 1 }
        }
    });
    var buf = protobuf.Writer.create().uint32(8).uint32(42).finish();
    test.notOk(type.decode(buf) instanceof MyDecodeMessage, "should decode with the generated constructor before assignment");
    test.notOk(type.fromObject({ a: 42 }) instanceof MyDecodeMessage, "should convert with the generated constructor before assignment");
    type.ctor = MyDecodeMessage;
    test.ok(type.decode(buf) instanceof MyDecodeMessage, "should decode with assigned constructor after setup");
    test.ok(type.fromObject({ a: 42 }) instanceof MyDecodeMessage, "should convert with assigned constructor after setup");

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

tape.test("encode nesting", function(test) {
    function nestedObject(depth, field) {
        var object = { value: 42 };
        for (var i = 0; i < depth; ++i) {
            if (field === "child")
                object = { child: object };
            else if (field === "children")
                object = { children: [ object ] };
            else
                object = { childMap: { child: object } };
        }
        return object;
    }

    var root = protobuf.Root.fromJSON({
        nested: {
            Node: {
                fields: {
                    child: { type: "Node", id: 1 },
                    children: { rule: "repeated", type: "Node", id: 2 },
                    childMap: { keyType: "string", type: "Node", id: 3 },
                    value: { type: "int32", id: 4 }
                }
            }
        }
    });
    var Node = root.lookupType("Node");
    var recursionLimit = protobuf.util.recursionLimit;

    protobuf.util.recursionLimit = 3;
    try {
        test.ok(Node.encode(nestedObject(2, "child")).finish().length, "should encode singular messages below the limit");
        test.throws(function() {
            Node.encode(nestedObject(4, "child")).finish();
        }, /max depth exceeded/, "should reject excessive singular message nesting");

        test.ok(Node.encode(nestedObject(2, "children")).finish().length, "should encode repeated messages below the limit");
        test.throws(function() {
            Node.encode(nestedObject(4, "children")).finish();
        }, /max depth exceeded/, "should reject excessive repeated message nesting");

        test.ok(Node.encode(nestedObject(2, "childMap")).finish().length, "should encode map message values below the limit");
        test.throws(function() {
            Node.encode(nestedObject(4, "childMap")).finish();
        }, /max depth exceeded/, "should reject excessive map message value nesting");
    } finally {
        protobuf.util.recursionLimit = recursionLimit;
    }

    test.end();
});

tape.test("encode setup preserves nesting", function(test) {
    var root = protobuf.Root.fromJSON({
        nested: {
            Parent: {
                fields: {
                    child: { type: "Child", id: 1 }
                }
            },
            Child: {
                fields: {
                    next: { type: "Child", id: 1 },
                    value: { type: "int32", id: 2 }
                }
            }
        }
    });
    var Parent = root.lookupType("Parent");
    var recursionLimit = protobuf.util.recursionLimit;

    protobuf.util.recursionLimit = 1;
    try {
        test.throws(function() {
            Parent.encode({ child: { next: { value: 42 } } }).finish();
        }, /max depth exceeded/, "should preserve depth through nested type setup");
    } finally {
        protobuf.util.recursionLimit = recursionLimit;
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
    var field1TagWithContinuation = 1 << 3 | 128;
    var fieldNumberTooHigh = [ field1TagWithContinuation, 128, 128, 128, 128, 15, 210, 9 ];
    var fieldNumberSlightlyTooHigh = [ field1TagWithContinuation, 128, 128, 128, 64, 210, 9 ];
    var overlongTagVarint = [ field1TagWithContinuation, 128, 128, 128, 128, 128, 128, 128, 0, 210, 9 ];
    var tagVarintMoreThanTenBytes = [ field1TagWithContinuation, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 0, 210, 9 ];

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

    test.throws(function() {
        Message.decode(protobuf.util.newBuffer(fieldNumberTooHigh));
    }, /invalid tag encoding/, "should reject tags above the maximum field number");

    test.throws(function() {
        Message.decode(protobuf.util.newBuffer(fieldNumberSlightlyTooHigh));
    }, /invalid tag encoding/, "should reject tags above uint32 range");

    test.throws(function() {
        Message.decode(protobuf.util.newBuffer(overlongTagVarint));
    }, /invalid tag encoding/, "should reject overlong tag varints");

    test.throws(function() {
        Message.decode(protobuf.util.newBuffer(tagVarintMoreThanTenBytes));
    }, /invalid tag encoding/, "should reject tag varints longer than ten bytes");
    test.end();
});

tape.test("decode string fields by utf8_validation feature", function(test) {
    var root = protobuf.Root.fromJSON({
        nested: {
            Verify: {
                fields: {
                    singular: { type: "string", id: 1 },
                    repeated: { rule: "repeated", type: "string", id: 2 },
                    map: { keyType: "string", type: "string", id: 3 },
                    choice: { type: "string", id: 4 }
                },
                oneofs: {
                    kind: { oneof: [ "choice" ] }
                }
            },
            Proto2: {
                edition: "proto2",
                fields: {
                    value: { type: "string", id: 1 }
                }
            },
            EditionNone: {
                edition: "2023",
                options: { features: { utf8_validation: "NONE" } },
                fields: {
                    value: { type: "string", id: 1 }
                }
            }
        }
    });
    var Verify = root.lookupType("Verify");
    var Proto2 = root.lookupType("Proto2");
    var EditionNone = root.lookupType("EditionNone");
    var invalid = [ 0xA0, 0xB0, 0xC0, 0xD0 ];
    var surrogate = [ 0xED, 0xA0, 0x80 ];
    var valid = [ 0x66, 0x6F, 0x6F ];
    var invalidReplacement = new Buffer(invalid).toString("utf8");
    var surrogateReplacement = new Buffer(surrogate).toString("utf8");

    function stringField(id, value) {
        return [ id << 3 | 2, value.length ].concat(value);
    }

    function mapField(key, value) {
        var entry = stringField(1, key).concat(stringField(2, value));
        return [ 3 << 3 | 2, entry.length ].concat(entry);
    }

    test.throws(function() {
        Verify.decode(protobuf.util.newBuffer(stringField(1, invalid)));
    }, /utf-?8|encoded data/i, "should reject invalid singular strings when verification is enabled");

    test.throws(function() {
        Verify.decode(protobuf.util.newBuffer(stringField(2, invalid)));
    }, /utf-?8|encoded data/i, "should reject invalid repeated strings when verification is enabled");

    test.throws(function() {
        Verify.decode(protobuf.util.newBuffer(stringField(4, invalid)));
    }, /utf-?8|encoded data/i, "should reject invalid oneof strings when verification is enabled");

    test.throws(function() {
        Verify.decode(protobuf.util.newBuffer(mapField(invalid, valid)));
    }, /utf-?8|encoded data/i, "should reject invalid map string keys when verification is enabled");

    test.throws(function() {
        Verify.decode(protobuf.util.newBuffer(mapField(valid, invalid)));
    }, /utf-?8|encoded data/i, "should reject invalid map string values when verification is enabled");

    test.throws(function() {
        Verify.decode(protobuf.util.newBuffer(stringField(1, surrogate)));
    }, /utf-?8|encoded data/i, "should reject UTF8-encoded lone surrogates when verification is enabled");

    test.equal(
        Proto2.decode(protobuf.util.newBuffer(stringField(1, invalid))).value,
        invalidReplacement,
        "should replace malformed strings when verification is disabled by proto2 defaults"
    );

    test.equal(
        EditionNone.decode(protobuf.util.newBuffer(stringField(1, invalid))).value,
        invalidReplacement,
        "should replace malformed strings when verification is disabled by editions features"
    );

    test.equal(
        Proto2.decode(protobuf.util.newBuffer(stringField(1, surrogate))).value,
        surrogateReplacement,
        "should replace UTF8-encoded lone surrogates when verification is disabled by proto2 defaults"
    );

    test.equal(
        EditionNone.decode(protobuf.util.newBuffer(stringField(1, surrogate))).value,
        surrogateReplacement,
        "should replace UTF8-encoded lone surrogates when verification is disabled by editions features"
    );

    test.end();
});

// TODO: Protoc rejects open enums whose first value is not zero.
// We should do the same, but for v8 this would be a regression.
// Remove this test once we enforce this restriction.
tape.test("decode implicit enum zero with non-zero default", function(test) {
    var Message = protobuf.Root.fromJSON({
        nested: {
            Op: { values: { UNKNOWN: -1, INSERT: 0 } },
            Message: {
                fields: {
                    op: { type: "Op", id: 4 }
                }
            }
        }
    }).lookupType("Message");

    test.notOk(Message.fields.op.hasPresence, "enum field should have implicit presence");
    test.equal(Message.fields.op.typeDefault, -1, "enum field should use the first value as default");
    test.equal(Message.decode(protobuf.util.newBuffer([0x20, 0x00])).op, 0, "should preserve explicit enum zero");

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
