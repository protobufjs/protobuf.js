var path = require("path");
var tape = require("tape");
var protobuf = require("../index");
var descriptor = require("../ext/descriptor");

tape.test("descriptor - proto2 to proto3", function (test) {
    // load document with extended field imported multiple times
    var root = protobuf.loadSync(path.resolve(__dirname, "data/test.proto"));

    // convert to Descriptor Set
    var decodedDescriptorSet = root.toDescriptor("proto3");

    // load back from descriptor set
    var root2 = protobuf.Root.fromDescriptor(decodedDescriptorSet);

    var Simple1 = root2.lookup("Simple1");
    test.notOk(Simple1.fields.aString.required, "required fields don't exist in proto3");
    test.notOk(Simple1.fields.aBoolean.hasPresence, "presence is not preserved");

    test.pass("should parse and resolve without errors");
    test.end();
});

tape.test("descriptor - proto2 roundtrip", function (test) {
    // load document with extended field imported multiple times
    var root = protobuf.parse(`syntax = "proto2";

        message Message {
            optional string explicit = 1;
            required string required = 2;
            repeated int32 packed = 3 [packed = true];
            repeated int32 unpacked = 4;
            optional int32 repeated_options = 5 [targets = TARGET_TYPE_SERVICE, targets = TARGET_TYPE_FILE];
        }
    `).root.resolveAll();

    // convert to Descriptor Set
    var decodedDescriptorSet = root.toDescriptor("proto2");

    // load back from descriptor set
    var root2 = protobuf.Root.fromDescriptor(decodedDescriptorSet);

    test.same(root.toJSON(), root2.toJSON(), "JSON should roundtrip");

    var Message = root2.lookup("Message");
    test.ok(Message.fields.required.required, "required field preserved");
    test.ok(Message.fields.explicit.hasPresence, "presence is preserved");
    test.ok(Message.fields.packed.packed, "packed is preserved");
    test.notOk(Message.fields.unpacked.packed, "expanded is preserved");

    test.end();
});

tape.test("descriptor - proto3 roundtrip", function (test) {
    var root = protobuf.parse(`syntax = "proto3";

        message Message {
            optional string explicit = 1;
            string implicit = 2;
            repeated int32 packed = 3;
            repeated int32 unpacked = 4 [packed = false];
        }
    `).root.resolveAll();

    // convert to Descriptor Set
    const decodedDescriptorSet = root.toDescriptor("proto3");

    // load back from descriptor set
    const root2 = protobuf.Root.fromDescriptor(decodedDescriptorSet);

    var Message = root2.lookup("Message");

    test.same(root2.toJSON(), root.toJSON(), "JSON should roundtrip");

    test.ok(Message.fields.explicit.hasPresence, "should have explicit presence");
    test.notOk(Message.fields.implicit.hasPresence, "should have implicit presence");
    test.ok(Message.fields.packed.packed, "packed is preserved");
    test.notOk(Message.fields.unpacked.packed, "expanded is preserved");

    test.end();
});

tape.test("descriptor - proto3 optional in extend toDescriptor", function (test) {
  var root = protobuf.parse(`syntax = "proto3";

    message SomeMessage {
      string foo = 1;
    }

    extend SomeMessage {
      optional string bar = 2;
    }
  `).root.resolveAll();

  var decodedDescriptorSet;
  try {
    decodedDescriptorSet = root.toDescriptor("proto3");
    test.pass("toDescriptor should not throw");
  } catch (err) {
    test.fail(err);
    test.end();
    return;
  }

  test.ok(decodedDescriptorSet.file[0].extension && decodedDescriptorSet.file[0].extension.length === 1,
    "should include extension field");

  var encodedDescriptorSet = descriptor.FileDescriptorSet.decode(
      descriptor.FileDescriptorSet.encode(decodedDescriptorSet).finish()
  );

  var ext = encodedDescriptorSet.file[0].extension[0];
  test.equal(ext.name, "bar", "extension field name is preserved");
  test.equal(ext.proto3Optional, true, "proto3 optional flag is preserved");
  test.notOk(Object.prototype.hasOwnProperty.call(ext, "proto3_optional"), "does not emit legacy snake_case descriptor property");

  var root2 = protobuf.Root.fromDescriptor(encodedDescriptorSet),
      ext2 = root2.lookup("bar");
  test.equal(ext2.options.proto3_optional, true, "proto3 optional flag is restored");

  test.end();
});

tape.test("descriptor - edition 2023 file roundtrip", function (test) {
    var json = {
      nested: { Message: {
          edition: "2023",
          options: { "features": { "field_presence": "IMPLICIT" } },
          fields: {
              explicit: { type: "string", id: 1, options: { "features": { "field_presence": "EXPLICIT" } } },
              implicit: { type: "string", id: 2 },
              required: { type: "string", id: 3, options: { "features": { "field_presence": "LEGACY_REQUIRED" }} },
          },
          nested: { Nested: { fields: {
              explicit: { type: "string", id: 1, options: { "features": { "field_presence": "EXPLICIT" } } },
              implicit: { type: "string", id: 2 },
          } } }
      } }
    };
    var root = protobuf.Root.fromJSON(json);

    // convert to Descriptor Set
    const decodedDescriptorSet = root.toDescriptor("2023");
    
    // load back from descriptor set
    const root2 = protobuf.Root.fromDescriptor(decodedDescriptorSet);

    var Type = root2.lookup("Message");
    var Nested = Type.nested.Nested;

    test.same(root2.toJSON(), json, "JSON should roundtrip");

    test.ok(Type.fields.explicit.hasPresence, "should have explicit presence");
    test.notOk(Type.fields.implicit.hasPresence, "should have implicit presence");

    test.ok(Nested.fields.explicit.hasPresence, "nested should have explicit presence");
    test.notOk(Nested.fields.implicit.hasPresence, "nested should have implicit presence");

    test.end();
});


tape.test("descriptor - proto2 root-less type", function (test) {
    var Message = protobuf.Type.fromJSON("Message", {
      "edition": "proto2",
      "fields": {
        "explicit": {
          "type": "string",
          "id": 1
        },
        "required": {
          "rule": "required",
          "type": "string",
          "id": 2
        },
        "packed": {
          "rule": "repeated",
          "type": "int32",
          "id": 3,
          "options": {
            "packed": true
          }
        },
        "unpacked": {
          "rule": "repeated",
          "type": "int32",
          "id": 4
        },
        "nested": {
          "type": "Nested",
          "id": 5
        }
      },
      "nested": {
        "Nested": {
          "fields": {
            "a": {
              "type": "int32",
              "id": 1
            }
          }
        }
      }
    }).resolveAll();

    // convert to Descriptor Set
    const decodedDescriptorSet = Message.toDescriptor("proto2");
    
    // load back from descriptor set
    const Message2 = protobuf.Type.fromDescriptor(decodedDescriptorSet, "proto2").resolveAll();

    test.same(Message2.toJSON(), Message.toJSON(), "JSON should roundtrip");

    test.ok(Message2.fields.explicit.hasPresence, "should have explicit presence");
    test.ok(Message2.fields.required.required, "should have required presence");
    test.ok(Message2.fields.packed.packed, "should have packed encoding");
    test.notOk(Message2.fields.unpacked.packed, "should have expanded encoding");
    test.same(Message2.fields.nested.resolvedType, Message2.nested.Nested, "should have cross linkage");

    test.end();
});


tape.test("descriptor - unsupported edition", function (test) {
    var json = {
      nested: { Message: {
          edition: "2023",
          options: { "features": { "field_presence": "IMPLICIT" } },
          fields: {
              explicit: { type: "string", id: 1, options: { "features": { "field_presence": "EXPLICIT" } } },
              implicit: { type: "string", id: 2 },
          },
          nested: { Nested: { fields: {
              explicit: { type: "string", id: 1, options: { "features": { "field_presence": "EXPLICIT" } } },
              implicit: { type: "string", id: 2 },
          } } }
      } }
    };
    var root = protobuf.Root.fromJSON(json);

    // convert to Descriptor Set
    test.throws(function() {
        root.toDescriptor("2030")
    }, /Unsupported edition 2030/, "unsupported edition output throws");

    const decodedDescriptorSet = root.toDescriptor("2023");
    decodedDescriptorSet.file[0].edition = descriptor.Edition.EDITION_99997_TEST_ONLY
    
    test.throws(function() {
        protobuf.Root.fromDescriptor(decodedDescriptorSet)
    }, /Unsupported edition 99997/, "unsupported edition input throws");

    test.end();
});

tape.test("descriptor - descriptor type names", function(test) {
    var field = descriptor.FieldDescriptorProto.create({
        name: "field",
        number: 1,
        label: 1,
        type: 11,
        typeName: ".pkg.Message"
    });

    test.equal(protobuf.Field.fromDescriptor(field).type, ".pkg.Message", "should accept qualified type names");

    field.typeName = ".pkg.Message;bad";
    test.throws(function() {
        protobuf.Field.fromDescriptor(field);
    }, /illegal type name/, "should reject invalid type names");

    field.typeName = ".pkg.Message";
    field.extendee = ".pkg.Message;bad";
    test.throws(function() {
        protobuf.Field.fromDescriptor(field);
    }, /illegal type name/, "should reject invalid extendee names");

    var method = descriptor.MethodDescriptorProto.create({
        name: "Call",
        inputType: ".pkg.Request",
        outputType: ".pkg.Response"
    });
    test.equal(protobuf.Method.fromDescriptor(method).requestType, ".pkg.Request", "should accept method type names");

    method.inputType = ".pkg.Request;bad";
    test.throws(function() {
        protobuf.Method.fromDescriptor(method);
    }, /illegal type name/, "should reject invalid method type names");

    test.end();
});

tape.test("descriptor - encoded descriptor inputs", function(test) {
    var root = protobuf.parse("syntax = \"proto3\"; message Message { string value = 1; }").root.resolveAll(),
        descriptorSet = root.toDescriptor("proto3"),
        descriptorBytes = descriptor.FileDescriptorSet.encode(descriptorSet).finish(),
        fieldDescriptor = descriptor.FieldDescriptorProto.create({
            name: "value",
            number: 1,
            label: 1,
            type: 9
        }),
        fieldBytes = descriptor.FieldDescriptorProto.encode(fieldDescriptor).finish();

    test.equal(protobuf.Root.fromDescriptor(descriptorBytes).lookupType("Message").fields.value.type, "string", "decodes root descriptor buffers");
    test.equal(protobuf.Root.fromDescriptor(protobuf.Reader.create(descriptorBytes)).lookupType("Message").fields.value.type, "string", "decodes root descriptor readers");
    test.equal(protobuf.Field.fromDescriptor(fieldBytes).type, "string", "decodes field descriptor buffers");
    test.equal(protobuf.Field.fromDescriptor(protobuf.Reader.create(fieldBytes)).type, "string", "decodes field descriptor readers");

    test.end();
});

tape.test("descriptor - nesting", function(test) {
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

tape.test("descriptor - proto3 optional field without options", function(test) {
    var fieldDescriptor = descriptor.FieldDescriptorProto.create({
        name: "value",
        number: 1,
        label: 1,
        type: 5,
        proto3Optional: true
    });

    test.equal(protobuf.Field.fromDescriptor(fieldDescriptor, "proto3").options.proto3_optional, true, "accepts proto3 optional without field options");

    test.end();
});

tape.test("descriptor - oneof and enum value options", function(test) {
    var fieldPresence = descriptor.FeatureSet.lookup("FieldPresence").values.EXPLICIT,
        oneofDescriptor = descriptor.OneofDescriptorProto.create({
            name: "choice",
            options: {
                features: {
                    fieldPresence: fieldPresence
                }
            }
        }),
        oneof = protobuf.OneOf.fromDescriptor(oneofDescriptor),
        enumDescriptor = descriptor.EnumDescriptorProto.create({
            name: "State",
            value: [{
                name: "ON",
                number: 0,
                options: {
                    deprecated: true,
                    features: {
                        fieldPresence: fieldPresence
                    }
                }
            }]
        }),
        enm = protobuf.Enum.fromDescriptor(enumDescriptor);

    test.same(oneof.options, { features: { field_presence: "EXPLICIT" } }, "preserves oneof options");
    test.equal(oneof.toDescriptor().options.features.fieldPresence, fieldPresence, "emits oneof options");
    test.same(enm.valuesOptions.ON, { deprecated: true, features: { field_presence: "EXPLICIT" } }, "preserves enum value options");
    test.equal(enm.toDescriptor().value[0].options.deprecated, true, "emits enum value options");
    test.equal(enm.toDescriptor().value[0].options.features.fieldPresence, fieldPresence, "emits enum value features");

    test.end();
});

tape.test("descriptor - map field roundtrip", function(test) {
    var root = protobuf.parse(`syntax = "proto3";

        message Child {
            string value = 1;
        }

        message Message {
            map<string, int32> numbers = 1;
            map<string, Child> children = 2;
        }
    `).root.resolveAll();

    var Message = root.lookupType("Message"),
        bytes = Message.encode(Message.create({
            numbers: { a: 1 },
            children: { b: { value: "x" } }
        })).finish(),
        descriptorSet = descriptor.FileDescriptorSet.decode(descriptor.FileDescriptorSet.encode(root.toDescriptor("proto3")).finish()),
        root2 = protobuf.Root.fromDescriptor(descriptorSet).resolveAll(),
        Message2 = root2.lookupType("Message");

    test.ok(Message2.fields.numbers instanceof protobuf.MapField, "reconstructs scalar map fields");
    test.ok(Message2.fields.children instanceof protobuf.MapField, "reconstructs message map fields");
    test.notOk(Message2.nested && Message2.nested.Numbers, "does not expose synthetic map entry types");
    test.same(Message2.toObject(Message2.decode(bytes)), {
        numbers: { a: 1 },
        children: { b: { value: "x" } }
    }, "decodes descriptor maps as map objects");

    test.end();
});

tape.test("descriptor - protoc map entry", function(test) {
    var root = protobuf.Root.fromDescriptor(descriptor.FileDescriptorSet.create({
        file: [{
            name: "maps.proto",
            package: "pkg",
            syntax: "proto3",
            messageType: [{
                name: "Child",
                field: [{
                    name: "value",
                    number: 1,
                    label: 1,
                    type: 9
                }]
            }, {
                name: "Message",
                field: [{
                    name: "numbers",
                    number: 1,
                    label: 3,
                    type: 11,
                    typeName: ".pkg.Message.NumbersEntry"
                }, {
                    name: "children",
                    number: 2,
                    label: 3,
                    type: 11,
                    typeName: ".pkg.Message.ChildrenEntry"
                }],
                nestedType: [{
                    name: "NumbersEntry",
                    field: [
                        { name: "key", number: 1, label: 1, type: 9 },
                        { name: "value", number: 2, label: 1, type: 5 }
                    ],
                    options: { mapEntry: true }
                }, {
                    name: "ChildrenEntry",
                    field: [
                        { name: "key", number: 1, label: 1, type: 9 },
                        { name: "value", number: 2, label: 1, type: 11, typeName: ".pkg.Child" }
                    ],
                    options: { mapEntry: true }
                }]
            }]
        }]
    })).resolveAll();

    var Message = root.lookupType("pkg.Message");

    test.ok(Message.fields.numbers instanceof protobuf.MapField, "reconstructs protoc-style map entry types");
    test.equal(Message.fields.numbers.keyType, "string", "keeps map key type");
    test.equal(Message.fields.numbers.type, "int32", "keeps map value type");
    test.ok(Message.fields.children instanceof protobuf.MapField, "reconstructs message-valued map entry types");
    test.equal(Message.fields.children.resolvedType.fullName, ".pkg.Child", "resolves qualified map value type");

    test.end();
});
