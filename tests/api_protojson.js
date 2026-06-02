var tape = require("tape");

var protobuf = require("..");
var protojson = require("../ext/protojson");

function owns(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

var proto = "syntax = \"proto3\";\
message Msg { int32 value = 1; }\
enum Choice { A = 0; B = 1; }\
message Inner { int32 value = 1; }\
message Outer {\
  Inner inner = 1;\
  Choice choice = 2;\
  repeated Choice choices = 3;\
  map<string, Choice> choice_map = 4;\
}\
message MapMsg {\
  map<int32, string> int32_map = 1;\
  map<uint64, string> uint64_map = 2;\
  map<bool, string> bool_map = 3;\
  map<string, string> string_map = 4;\
}";

var root = protobuf.parse(proto).root,
    Msg = root.lookupType("Msg"),
    Outer = root.lookupType("Outer"),
    MapMsg = root.lookupType("MapMsg"),
    timestampRoot = protobuf.Root.fromJSON({
        nested: {
            google: {
                nested: {
                    protobuf: {
                        nested: {
                            Timestamp: {
                                fields: {
                                    seconds: { type: "int64", id: 1 },
                                    nanos: { type: "int32", id: 2 }
                                }
                            },
                            Duration: {
                                fields: {
                                    seconds: { type: "int64", id: 1 },
                                    nanos: { type: "int32", id: 2 }
                                }
                            }
                        }
                    }
                }
            },
            WithTimestamp: {
                fields: {
                    ts: { type: "google.protobuf.Timestamp", id: 1 }
                }
            },
            WithDuration: {
                fields: {
                    duration: { type: "google.protobuf.Duration", id: 1 }
                }
            }
        }
    }),
    WithTimestamp = timestampRoot.lookupType("WithTimestamp"),
    WithDuration = timestampRoot.lookupType("WithDuration");

function createWktRoot() {
    var root = new protobuf.Root();
    protobuf.parse("syntax = \"proto3\";\
package google.protobuf;\
message Any { string type_url = 1; bytes value = 2; }\
message Empty {}\
message Duration { int64 seconds = 1; int32 nanos = 2; }\
message Timestamp { int64 seconds = 1; int32 nanos = 2; }\
message FieldMask { repeated string paths = 1; }\
message StringValue { string value = 1; }\
message Int64Value { int64 value = 1; }\
message BytesValue { bytes value = 1; }\
enum NullValue { NULL_VALUE = 0; }\
message Struct { map<string, Value> fields = 1; }\
message ListValue { repeated Value values = 1; }\
message Value {\
  oneof kind {\
    NullValue null_value = 1;\
    double number_value = 2;\
    string string_value = 3;\
    bool bool_value = 4;\
    Struct struct_value = 5;\
    ListValue list_value = 6;\
  }\
}", root);
    protobuf.parse("syntax = \"proto3\";\
package test;\
message Payload { string name = 1; int32 count = 2; }\
message WktMsg {\
  google.protobuf.Any any = 1;\
  google.protobuf.Any duration_any = 2;\
  google.protobuf.Value value = 3;\
  google.protobuf.Struct struct = 4;\
  google.protobuf.ListValue list = 5;\
  google.protobuf.StringValue string_wrapper = 6;\
  google.protobuf.Int64Value int64_wrapper = 7;\
  google.protobuf.BytesValue bytes_wrapper = 8;\
  google.protobuf.FieldMask field_mask = 9;\
  google.protobuf.Empty empty = 10;\
  google.protobuf.Duration duration = 11;\
  google.protobuf.Timestamp timestamp = 12;\
  bytes bytes_field = 13;\
}\
message NullMsg {\
  int32 value = 1;\
  repeated string names = 2;\
  map<string, string> labels = 3;\
  google.protobuf.Duration duration = 4;\
  google.protobuf.StringValue string_wrapper = 5;\
  google.protobuf.Value value_msg = 6;\
}", root);
    return root.resolveAll();
}

var wktRoot = createWktRoot(),
    wktRoots = [
        { name: "parsed proto", root: wktRoot },
        { name: "JSON descriptor", root: protobuf.Root.fromJSON(wktRoot.toJSON()).resolveAll() }
    ];

tape.test("protojson - installs reflected Type convenience methods", function(test) {
    delete protobuf.Type.prototype.fromJson;
    delete protobuf.Type.prototype.fromJsonString;
    delete protobuf.Type.prototype.toJson;
    delete protobuf.Type.prototype.toJsonString;

    protojson.install();
    test.equal(typeof protobuf.Type.prototype.fromJson, "function", "installs fromJson");
    test.equal(typeof protobuf.Type.prototype.fromJsonString, "function", "installs fromJsonString");
    test.equal(typeof protobuf.Type.prototype.toJson, "function", "installs toJson");
    test.equal(typeof protobuf.Type.prototype.toJsonString, "function", "installs toJsonString");
    test.end();
});

tape.test("protojson - rejects duplicate keys in string input", function(test) {
    test.throws(function() {
        protojson.fromJsonString(Msg, "{\"value\":1,\"value\":2}");
    }, /duplicate key/, "rejects duplicate keys through fromJsonString");

    test.throws(function() {
        protojson.fromJsonString(Msg, "{\"value\":1,\"\\u0076alue\":2}");
    }, /duplicate key/, "rejects duplicate escaped keys through fromJsonString");

    test.throws(function() {
        Msg.fromJsonString("{\"value\":1,\"value\":2}");
    }, /duplicate key/, "rejects duplicate keys through Type#fromJsonString");

    test.end();
});

tape.test("protojson - accepts already-parsed input", function(test) {
    var message = protojson.fromJson(Msg, { value: 1 });
    test.equal(message.value, 1, "parses object input");
    test.end();
});

tape.test("protojson - rejects JSON name collisions", function(test) {
    var Collision = protobuf.Root.fromJSON({
        nested: {
            Collision: {
                fields: {
                    first: { type: "int32", id: 1, jsonName: "same" },
                    second: { type: "int32", id: 2, jsonName: "same" }
                }
            }
        }
    }).resolveAll().lookupType("Collision");

    test.throws(function() {
        protojson.fromJson(Collision, { same: 1 });
    }, /duplicate ProtoJSON field name "same"/, "rejects ambiguous JSON name lookup");

    test.end();
});

tape.test("protojson - reads legacy json_name reflection options", function(test) {
    var Legacy = protobuf.Root.fromJSON({
        nested: {
            Legacy: {
                fields: {
                    value: {
                        type: "int32",
                        id: 1,
                        options: { json_name: "customValue" }
                    },
                    labels: {
                        keyType: "string",
                        type: "string",
                        id: 2,
                        options: { json_name: "customLabels" }
                    }
                }
            }
        }
    }).resolveAll().lookupType("Legacy");

    var message = protojson.fromJson(Legacy, {
        customValue: 1,
        customLabels: { key: "value" }
    });

    test.equal(message.value, 1, "uses json_name option for ordinary fields");
    test.equal(message.labels.key, "value", "uses json_name option for map fields");
    test.deepEqual(protojson.toJson(Legacy, message), {
        customValue: 1,
        customLabels: { key: "value" }
    }, "emits lifted json_name values");
    test.end();
});

tape.test("protojson - separates parsed values from document strings", function(test) {
    var message = protojson.fromJsonString(Msg, "{\"value\":1}");
    test.equal(message.value, 1, "parses JSON document strings explicitly");
    test.equal(protojson.toJsonString(Msg, message), "{\"value\":1}", "formats JSON document strings explicitly");

    test.throws(function() {
        protojson.fromJson(Msg, "{\"value\":1}");
    }, /expected object/, "fromJson treats strings as already-parsed JSON string values");

    for (var i = 0; i < wktRoots.length; ++i) {
        var root = wktRoots[i].root,
            label = wktRoots[i].name,
            Timestamp = root.lookupType("google.protobuf.Timestamp"),
            StringValue = root.lookupType("google.protobuf.StringValue"),
            Value = root.lookupType("google.protobuf.Value"),
            timestamp = protojson.fromJson(Timestamp, "1970-01-01T00:00:00Z"),
            timestampString = protojson.fromJsonString(Timestamp, "\"1970-01-01T00:00:00Z\""),
            stringValue = protojson.fromJson(StringValue, "{}"),
            value = protojson.fromJson(Value, "{}");

        test.equal(String(timestamp.seconds), "0", label + ": parses already-parsed Timestamp string values");
        test.equal(String(timestampString.seconds), "0", label + ": parses Timestamp document strings");
        test.equal(stringValue.value, "{}", label + ": parses already-parsed StringValue string values");
        test.equal(protojson.toJson(StringValue, stringValue), "{}", label + ": emits parsed StringValue string values");
        test.equal(protojson.toJsonString(StringValue, stringValue), "\"{}\"", label + ": emits StringValue document strings");
        test.equal(value.stringValue, "{}", label + ": parses already-parsed Value string values");
    }

    test.end();
});

tape.test("protojson - passes ignoreUnknownFields through options", function(test) {
    test.throws(function() {
        protojson.fromJson(Outer, { inner: { value: 1, extra: 2 } });
    }, /unknown field/, "rejects nested unknown fields by default");

    var message = protojson.fromJson(Outer, {
        inner: { value: 1, extra: 2 },
        choice: "NOPE",
        choices: ["A", "NOPE", "B"],
        choiceMap: { keep: "B", drop: "NOPE" }
    }, { ignoreUnknownFields: true });

    test.equal(message.inner.value, 1, "ignores nested unknown fields");
    test.equal(Object.prototype.hasOwnProperty.call(message, "choice"), false, "ignores unknown singular enum strings");
    test.deepEqual(message.choices, [0, 1], "drops unknown repeated enum strings");
    test.deepEqual(message.choiceMap, { keep: 1 }, "drops map entries with unknown enum strings");

    test.throws(function() {
        protojson.fromJson(Outer, { nope: 1 });
    }, /unknown field/, "does not leak ignoreUnknownFields to later calls");

    test.end();
});

tape.test("protojson - validates and canonicalizes map keys", function(test) {
    var message = protojson.fromJson(MapMsg, {
        int32Map: { "-0": "zero", "01": "one" },
        uint64Map: { "18446744073709551615": "max" },
        boolMap: { "true": "yes", "false": "no" },
        stringMap: { "name": "value" }
    });

    test.equal(message.int32Map["0"], "zero", "canonicalizes signed zero map key");
    test.equal(message.int32Map["1"], "one", "canonicalizes integer map key");
    test.equal(message.uint64Map["18446744073709551615"], "max", "accepts max uint64 map key");
    test.equal(message.boolMap["true"], "yes", "accepts true bool map key");
    test.equal(message.boolMap["false"], "no", "accepts false bool map key");

    test.throws(function() {
        protojson.fromJson(MapMsg, { int32Map: { "1.2": "bad" } });
    }, /invalid int32 map key/, "rejects non-integer map key");

    test.throws(function() {
        protojson.fromJson(MapMsg, { int32Map: { "2147483648": "bad" } });
    }, /out of range for int32 map key/, "rejects out-of-range int32 map key");

    test.throws(function() {
        protojson.fromJson(MapMsg, { uint64Map: { "-1": "bad" } });
    }, /invalid uint64 map key/, "rejects negative uint64 map key");

    test.throws(function() {
        protojson.fromJson(MapMsg, { uint64Map: { "18446744073709551616": "bad" } });
    }, /out of range for uint64 map key/, "rejects out-of-range uint64 map key");

    test.throws(function() {
        protojson.fromJson(MapMsg, { boolMap: { "1": "bad" } });
    }, /invalid bool map key/, "rejects numeric bool map key");

    test.throws(function() {
        protojson.fromJson(MapMsg, { stringMap: { "\ud800": "bad" } });
    }, /unpaired high surrogate/, "rejects invalid UTF-16 string map key");

    test.throws(function() {
        protojson.fromJson(MapMsg, { int32Map: { "01": "one", "1": "other" } });
    }, /duplicate map key/, "rejects map keys that canonicalize to the same value");

    test.end();
});

tape.test("protojson - preserves reserved object keys as data", function(test) {
    var mapMessage = protojson.fromJson(MapMsg, {
        stringMap: JSON.parse("{\"__proto__\":\"value\"}")
    });
    var mapOut = protojson.toJson(MapMsg, mapMessage).stringMap;
    test.equal(owns(mapOut, "__proto__"), true, "emits __proto__ as an own map key");
    test.equal(mapOut.__proto__, "value", "keeps map key value");
    test.equal(Object.getPrototypeOf(mapOut), Object.prototype, "does not mutate map output prototype");

    for (var i = 0; i < wktRoots.length; ++i) {
        var Struct = wktRoots[i].root.lookupType("google.protobuf.Struct"),
            label = wktRoots[i].name,
            structMessage = protojson.fromJson(Struct, JSON.parse("{\"__proto__\":{\"polluted\":true}}")),
            structOut = protojson.toJson(Struct, structMessage);

        test.equal(owns(structOut, "__proto__"), true, label + ": emits __proto__ as an own Struct key");
        test.deepEqual(structOut.__proto__, { polluted: true }, label + ": keeps Struct key value");
        test.equal(Object.getPrototypeOf(structOut), Object.prototype, label + ": does not mutate Struct output prototype");
    }

    test.end();
});

tape.test("protojson - round trips well-known types", function(test) {
    var json = {
        any: {
            "@type": "type.googleapis.com/test.Payload",
            name: "alpha",
            count: 7
        },
        durationAny: {
            "@type": "type.googleapis.com/google.protobuf.Duration",
            value: "2s"
        },
        value: {
            nested: ["x", null, true],
            count: 1.5
        },
        struct: {
            ok: true,
            name: "struct"
        },
        list: ["x", null, { child: false }],
        stringWrapper: "wrapped",
        int64Wrapper: "9007199254740993",
        bytesWrapper: "AQI=",
        fieldMask: "fooBar,baz.qux",
        empty: {},
        duration: "1.500s",
        timestamp: "1970-01-01T00:00:00.000000001Z",
        bytesField: "-_8"
    };
    var expected = {
        any: json.any,
        durationAny: json.durationAny,
        value: json.value,
        struct: json.struct,
        list: json.list,
        stringWrapper: json.stringWrapper,
        int64Wrapper: json.int64Wrapper,
        bytesWrapper: json.bytesWrapper,
        fieldMask: json.fieldMask,
        empty: json.empty,
        duration: json.duration,
        timestamp: json.timestamp,
        bytesField: "+/8="
    };

    for (var i = 0; i < wktRoots.length; ++i) {
        var root = wktRoots[i].root,
            label = wktRoots[i].name,
            WktMsg = root.lookupType("test.WktMsg"),
            Payload = root.lookupType("test.Payload"),
            Duration = root.lookupType("google.protobuf.Duration"),
            message = protojson.fromJson(WktMsg, json),
            payload = Payload.decode(message.any.value),
            duration = Duration.decode(message.durationAny.value);

        test.equal(payload.name, "alpha", label + ": decodes regular Any payload");
        test.equal(payload.count, 7, label + ": decodes regular Any payload fields");
        test.equal(String(duration.seconds), "2", label + ": decodes WKT Any payload");
        test.equal(message.timestamp.nanos, 1, label + ": parses timestamp nanos");
        test.deepEqual(protojson.toJson(WktMsg, message), expected, label + ": emits canonical ProtoJSON");
    }

    test.end();
});

tape.test("protojson - accepts null fields as absent", function(test) {
    var message = protojson.fromJson(Msg, { value: null });
    test.equal(owns(message, "value"), false, "singular scalar null is absent");

    message = protojson.fromJson(Outer, {
        inner: null,
        choice: null,
        choices: null,
        choiceMap: null
    });
    test.equal(owns(message, "inner"), false, "singular message null is absent");
    test.equal(owns(message, "choice"), false, "singular enum null is absent");
    test.deepEqual(protojson.toJson(Outer, message), {}, "repeated and map field nulls are absent in JSON output");

    for (var i = 0; i < wktRoots.length; ++i) {
        var NullMsg = wktRoots[i].root.lookupType("test.NullMsg"),
            label = wktRoots[i].name,
            nulls = protojson.fromJson(NullMsg, {
                value: null,
                names: null,
                labels: null,
                duration: null,
                stringWrapper: null,
                valueMsg: null
            });
        test.equal(owns(nulls, "value"), false, label + ": scalar null is absent");
        test.equal(owns(nulls, "duration"), false, label + ": WKT message null is absent");
        test.equal(owns(nulls, "stringWrapper"), false, label + ": wrapper null is absent");
        test.equal(nulls.valueMsg.nullValue, 0, label + ": google.protobuf.Value null is NULL_VALUE");
        test.deepEqual(protojson.toJson(NullMsg, nulls), { valueMsg: null }, label + ": null fields emit only google.protobuf.Value");
    }

    test.end();
});

tape.test("protojson - rejects null repeated elements and map values", function(test) {
    test.throws(function() {
        protojson.fromJson(Outer, { choices: ["A", null] });
    }, /null element/, "rejects null repeated enum element");

    test.throws(function() {
        protojson.fromJson(MapMsg, { stringMap: { key: null } });
    }, /expected string/, "rejects null map value");

    test.end();
});

tape.test("protojson - rejects invalid UTF-16 in well-known values", function(test) {
    for (var i = 0; i < wktRoots.length; ++i) {
        var root = wktRoots[i].root,
            label = wktRoots[i].name,
            Value = root.lookupType("google.protobuf.Value"),
            Struct = root.lookupType("google.protobuf.Struct");

        test.throws(function() {
            protojson.fromJson(Value, JSON.parse("\"\\ud800\""));
        }, /unpaired high surrogate/, label + ": rejects invalid google.protobuf.Value string");

        test.throws(function() {
            protojson.fromJson(Struct, JSON.parse("{\"\\ud800\":1}"));
        }, /unpaired high surrogate/, label + ": rejects invalid google.protobuf.Struct key");
    }

    test.end();
});

tape.test("protojson - parses timestamp string shape strictly", function(test) {
    var message = protojson.fromJson(WithTimestamp, {
        ts: "1970-01-01T00:00:00.000000001Z"
    });
    test.equal(message.ts.seconds, 0, "parses timestamp seconds");
    test.equal(message.ts.nanos, 1, "parses timestamp nanos");

    test.throws(function() {
        protojson.fromJson(WithTimestamp, { ts: "1970-01-01T00:00:00.1234567890Z" });
    }, /invalid timestamp/, "rejects timestamp fractions beyond nanos precision");

    test.throws(function() {
        protojson.fromJson(WithTimestamp, { ts: "2020-01-01T24:00:00Z" });
    }, /invalid timestamp/, "rejects normalized timestamp hours");

    test.throws(function() {
        protojson.fromJson(WithTimestamp, { ts: "1970-01-01t00:00:00Z" });
    }, /invalid timestamp/, "rejects lowercase timestamp separator");

    var leapDay = protojson.fromJson(WithTimestamp, { ts: "2020-02-29T00:00:00Z" });
    test.equal(leapDay.ts.seconds, 1582934400, "accepts valid leap day");

    test.throws(function() {
        protojson.fromJson(WithTimestamp, { ts: "2019-02-29T00:00:00Z" });
    }, /invalid timestamp date/, "rejects invalid leap day");

    test.end();
});

tape.test("protojson - parses duration string shape strictly", function(test) {
    var message = protojson.fromJson(WithDuration, {
        duration: "1.5s"
    });
    test.equal(message.duration.seconds, 1, "parses duration seconds");
    test.equal(message.duration.nanos, 500000000, "parses duration nanos");

    var negative = protojson.fromJson(WithDuration, {
        duration: "-0.5s"
    });
    test.equal(negative.duration.seconds, 0, "parses negative zero duration seconds");
    test.equal(negative.duration.nanos, -500000000, "parses negative duration nanos");

    test.throws(function() {
        protojson.fromJson(WithDuration, { duration: "s" });
    }, /invalid duration/, "rejects missing duration seconds");

    test.throws(function() {
        protojson.fromJson(WithDuration, { duration: ".s" });
    }, /invalid duration/, "rejects empty duration");

    test.throws(function() {
        protojson.fromJson(WithDuration, { duration: "1.s" });
    }, /invalid duration/, "rejects empty duration fraction");

    test.throws(function() {
        protojson.fromJson(WithDuration, { duration: "1.1234567890s" });
    }, /invalid duration/, "rejects duration fractions beyond nanos precision");

    test.throws(function() {
        protojson.fromJson(WithDuration, { duration: "315576000001.000000000s" });
    }, /duration out of range/, "rejects duration seconds out of range");

    test.end();
});
