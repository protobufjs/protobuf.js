"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var tape = require("tape");
var protobuf = require("../index");

// to extend Root
var descriptor = require("../ext/descriptor");

tape.test("extensions - proto2 to proto3", function (test) {
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

tape.test("extensions - proto2 roundtrip", function (test) {
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

tape.test("extensions - proto3 roundtrip", function (test) {
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

tape.test("extensions - edition 2023 file roundtrip", function (test) {
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


tape.test("extensions - proto2 root-less type", function (test) {
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


tape.test("extensions - unsupported edition", function (test) {
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
