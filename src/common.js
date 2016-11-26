"use strict";

module.exports = common;

/**
 * Provides common type definitions.
 * Can also be used to provide additional google types or your own custom types.
 * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
 * @param {Object} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
 * @returns {undefined}
 * @property {Object} google/protobuf/any.proto Any
 * @property {Object} google/protobuf/duration.proto Duration
 * @property {Object} google/protobuf/empty.proto Empty
 * @property {Object} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
 * @property {Object} google/protobuf/timestamp.proto Timestamp
 */
function common(name, json) {
    if (!/\/|\./.test(name)) {
        name = "google/protobuf/" + name + ".proto";
        json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
    }
    common[name] = json;
}

// Not provided because of limited use (feel free to discuss or to provide yourself):
// - google/protobuf/descriptor.proto
// - google/protobuf/field_mask.proto
// - google/protobuf/source_context.proto
// - google/protobuf/type.proto
// - google/protobuf/wrappers.proto

common("any", {
    Any: {
        fields: {
            type_url: {
                type: "string",
                id: 1
            },
            value: {
                type: "bytes",
                id: 2
            }
        }
    }
});

var timeType;

common("duration", {
    Duration: timeType = {
        fields: {
            seconds: {
                type: "int64",
                id: 1
            },
            nanos: {
                type: "int32",
                id: 2
            }
        }
    }
});

common("timestamp", {
    Timestamp: timeType
});

common("empty", {
    Empty: {
        fields: {}
    }
});

common("struct", {
    Struct: {
        fields: {
            fields: {
                keyType: "string",
                type: "Value",
                id: 1
            }
        }
    },
    Value: {
        oneofs: {
            kind: {
                oneof: [ "nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue" ]
            }
        },
        fields: {
            nullValue: {
                type: "NullValue",
                id: 1
            },
            numberValue: {
                type: "double",
                id: 2
            },
            stringValue: {
                type: "string",
                id: 3
            },
            boolValue: {
                type: "bool",
                id: 4
            },
            structValue: {
                type: "Struct",
                id: 5
            },
            listValue: {
                type: "ListValue",
                id: 6
            }
        }
    },
    NullValue: {
        values: {
            NULL_VALUE: 0
        }
    },
    ListValue: {
        fields: {
            values: {
                rule: "repeated",
                type: "Value",
                id: 1
            }
        }
    }
});
