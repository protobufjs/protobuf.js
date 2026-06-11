// Copyright 2021 Google LLC
// Copyright 2026 The protobuf.js Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Derived from proto3-json-serializer v3.0.4 and modified by The protobuf.js Authors.

"use strict";
var protobuf = require("../light");

/* global BigInt */

var Type = protobuf.Type,
    Enum = protobuf.Enum,
    util = protobuf.util;

var protojson = protobuf.protojson = module.exports = {};

function isExtension(field) {
    return Boolean(field.declaringField) || field.name.charAt(0) === ".";
}

function extensionName(field) {
    var df = field.declaringField || field,
        full = df.fullName.charAt(0) === "." ? df.fullName.slice(1) : df.fullName;
    return "[" + (df.protoName ? full.replace(/[^.]+$/, df.protoName) : full) + "]";
}

function indexField(index, key, field, type) {
    var existing = index[key];
    if (existing !== undefined && existing !== field)
        throw Error(type.fullName + ": duplicate ProtoJSON field name " + JSON.stringify(key));
    index[key] = field;
}

function fieldsByJsonName(type) {
    if (type._fieldsByJsonName)
        return type._fieldsByJsonName;
    var index = Object.create(null),
        fields = type.fieldsArray,
        i = 0;
    for (; i < fields.length; ++i) {
        var field = fields[i].resolve();
        if (isExtension(field))
            indexField(index, extensionName(field), field, type);
        else {
            indexField(index, field.name, field, type);
            indexField(index, field.jsonName, field, type);
            indexField(index, field.protoName, field, type);
        }
    }
    type._fieldsByJsonName = index;
    return index;
}

// --- reading scalars ---

var INT_RANGE = {
    int32:    ["-2147483648", "2147483647"],
    sint32:   ["-2147483648", "2147483647"],
    sfixed32: ["-2147483648", "2147483647"],
    uint32:   ["0", "4294967295"],
    fixed32:  ["0", "4294967295"],
    int64:    ["-9223372036854775808", "9223372036854775807"],
    sint64:   ["-9223372036854775808", "9223372036854775807"],
    sfixed64: ["-9223372036854775808", "9223372036854775807"],
    uint64:   ["0", "18446744073709551615"],
    fixed64:  ["0", "18446744073709551615"]
};

var LONG_TYPE = { int64: 1, uint64: 1, sint64: 1, fixed64: 1, sfixed64: 1 };

var MAX_FLOAT = 3.4028234663852886e38;
var hasBigInt = typeof BigInt !== "undefined";

var NUMERIC_RE = /^[+-]?(?:[0-9]*\.[0-9]+|[0-9]+\.?)(?:[eE][+-]?[0-9]+)?$/;

var SKIP = {};

function invalid(name, value, what) {
    return Error(name + ": " + what + ": " + JSON.stringify(value));
}

function parseIntegerString(value, type, name) {
    var str;
    if (typeof value === "number") {
        if (!isFinite(value) || Math.floor(value) !== value)
            throw invalid(name, value, "not an integer");
        str = numberToIntString(value);
    } else if (typeof value === "string") {
        if (value.length === 0 || /^\s|\s$/.test(value))
            throw invalid(name, value, "invalid integer");
        if (/^[+-]?[0-9]+$/.test(value))
            str = value;
        else if (NUMERIC_RE.test(value)) {
            var num = Number(value);
            if (!isFinite(num) || Math.floor(num) !== num)
                throw invalid(name, value, "not an integer");
            str = numberToIntString(num);
        } else
            throw invalid(name, value, "invalid integer");
    } else
        throw invalid(name, value, "expected integer (number or string)");

    var range = INT_RANGE[type];
    if (LONG_TYPE[type]) {
        if (hasBigInt) {
            var big = BigInt(str);
            if (big < BigInt(range[0]) || big > BigInt(range[1]))
                throw invalid(name, value, "out of range for " + type);
        }
    } else if (Number(str) < Number(range[0]) || Number(str) > Number(range[1]))
        throw invalid(name, value, "out of range for " + type);
    return str;
}

function parseMapIntegerKey(key, type, name) {
    var unsigned = type === "uint32" || type === "fixed32" || type === "uint64" || type === "fixed64";
    if (!(unsigned ? /^[0-9]+$/ : /^-?[0-9]+$/).test(key))
        throw invalid(name, key, "invalid " + type + " map key");
    if (hasBigInt) {
        var big = BigInt(key),
            range = INT_RANGE[type];
        if (big < BigInt(range[0]) || big > BigInt(range[1]))
            throw invalid(name, key, "out of range for " + type + " map key");
        return big.toString();
    }
    parseIntegerString(key, type, name);
    if (LONG_TYPE[type]) {
        var normalized = key.replace(/^-?0+(?=\d)/, key.charAt(0) === "-" ? "-" : "");
        return normalized === "-0" ? "0" : normalized;
    }
    return String(Number(key));
}

function numberToIntString(num) {
    if (num >= -9007199254740991 && num <= 9007199254740991)
        return String(num);
    return num.toFixed(0);
}

function parseFloat32Or64(value, isFloat, name) {
    var num;
    if (typeof value === "number") {
        if (!isFinite(value))
            throw invalid(name, value, "number out of range");
        num = value;
    } else if (value === "NaN")
        return NaN;
    else if (value === "Infinity")
        return Infinity;
    else if (value === "-Infinity")
        return -Infinity;
    else if (typeof value === "string") {
        if (value.length === 0 || /^\s|\s$/.test(value) || !NUMERIC_RE.test(value))
            throw invalid(name, value, "invalid number");
        num = Number(value);
        if (!isFinite(num))
            throw invalid(name, value, "invalid number");
    } else
        throw invalid(name, value, "expected number");
    if (isFloat && Math.abs(num) > MAX_FLOAT)
        throw invalid(name, value, "out of range for float");
    return num;
}

function validateUtf16(value, name) {
    for (var i = 0; i < value.length; ++i) {
        var c = value.charCodeAt(i);
        if (c >= 0xD800 && c <= 0xDBFF) {
            var next = value.charCodeAt(i + 1);
            if (!(next >= 0xDC00 && next <= 0xDFFF))
                throw invalid(name, value, "unpaired high surrogate");
            ++i;
        } else if (c >= 0xDC00 && c <= 0xDFFF)
            throw invalid(name, value, "unpaired low surrogate");
    }
}

function parseBytes(value, name) {
    if (typeof value !== "string")
        throw invalid(name, value, "expected base64 string");
    var s = value.replace(/-/g, "+").replace(/_/g, "/");
    while (s.length % 4)
        s += "=";
    var buffer = util.newBuffer(util.base64.length(s));
    util.base64.decode(s, buffer, 0);
    return buffer;
}

function longFromString(str, unsigned) {
    return util.Long ? util.Long.fromString(str, unsigned) : parseInt(str, 10);
}

function readScalar(type, value, name) {
    switch (type) {
        case "int32": case "sint32": case "sfixed32":
        case "uint32": case "fixed32":
            return Number(parseIntegerString(value, type, name));
        case "int64": case "sint64": case "sfixed64":
            return longFromString(parseIntegerString(value, type, name), false);
        case "uint64": case "fixed64":
            return longFromString(parseIntegerString(value, type, name), true);
        case "float":
            return parseFloat32Or64(value, true, name);
        case "double":
            return parseFloat32Or64(value, false, name);
        case "bool":
            if (typeof value !== "boolean")
                throw invalid(name, value, "expected boolean");
            return value;
        case "string":
            if (typeof value !== "string")
                throw invalid(name, value, "expected string");
            validateUtf16(value, name);
            return value;
        case "bytes":
            return parseBytes(value, name);
        default:
            throw Error(name + ": unsupported scalar type " + type);
    }
}

function readEnum(enm, value, name, options) {
    if (typeof value === "string") {
        var num = enm.values[value];
        if (num !== undefined)
            return num;
        if (options.ignoreUnknownFields)
            return SKIP;
        throw invalid(name, value, "unknown enum value");
    }
    if (typeof value === "number") {
        if (!isFinite(value) || Math.floor(value) !== value)
            throw invalid(name, value, "invalid enum number");
        return value;
    }
    if (value === null && enm.fullName === ".google.protobuf.NullValue")
        return 0;
    throw invalid(name, value, "expected enum string or number");
}

function readMapKey(field, key) {
    switch (field.keyType) {
        case "bool":
            if (key !== "true" && key !== "false")
                throw invalid(field.fullName, key, "invalid bool map key");
            return key;
        case "string":
            validateUtf16(key, field.fullName);
            return key;
        case "int32": case "sint32": case "sfixed32":
        case "uint32": case "fixed32":
        case "int64": case "sint64": case "sfixed64":
        case "uint64": case "fixed64":
            return parseMapIntegerKey(key, field.keyType, field.fullName);
        default:
            throw Error(field.fullName + ": unsupported map key type " + field.keyType);
    }
}

// --- reading messages ---

function readField(field, value, options, depth) {
    if (field.map) {
        if (value === null || typeof value !== "object" || Array.isArray(value))
            throw invalid(field.fullName, value, "expected object for map");
        var map = Object.create(null), k;
        for (k in value)
            if (hasOwn(value, k)) {
                var mk = readMapKey(field, k),
                    mv = readSingular(field, value[k], options, depth);
                if (mv !== SKIP) {
                    if (hasOwn(map, mk))
                        throw invalid(field.fullName, k, "duplicate map key");
                    map[mk] = mv;
                }
            }
        return map;
    }
    if (field.repeated) {
        if (!Array.isArray(value))
            throw invalid(field.fullName, value, "expected array");
        var arr = [], i = 0;
        for (; i < value.length; ++i) {
            if (value[i] === null && !isValueType(field.resolvedType))
                throw invalid(field.fullName, null, "null element");
            var el = readSingular(field, value[i], options, depth);
            if (el !== SKIP)
                arr.push(el);
        }
        return arr;
    }
    return readSingular(field, value, options, depth);
}

function readSingular(field, value, options, depth) {
    if (field.resolvedType instanceof Type)
        return readMessage(field.resolvedType, value, options, depth + 1);
    if (field.resolvedType instanceof Enum)
        return readEnum(field.resolvedType, value, field.fullName, options);
    return readScalar(field.type, value, field.fullName);
}

function isValueType(type) {
    return type instanceof Type && type.fullName === ".google.protobuf.Value";
}

function isImplicitDefault(field, value) {
    if (field.hasPresence || field.repeated || field.map || field.resolvedType instanceof Type)
        return false;
    if (field.resolvedType instanceof Enum)
        return value === 0;
    switch (field.type) {
        case "bool": return value === false;
        case "string": return value === "";
        case "bytes": return value == null || value.length === 0;
        default: return longToNumber(value) === 0;
    }
}

function readMessage(type, value, options, depth) {
    if (depth > util.recursionLimit)
        throw Error("max depth exceeded");

    var wkt = WKT_FROM[type.fullName];
    if (wkt)
        return wkt(type, value, options, depth);

    if (value === null || typeof value !== "object" || Array.isArray(value))
        throw invalid(type.fullName, value, "expected object");

    var index = fieldsByJsonName(type),
        out = {},
        seenFields = Object.create(null),
        seenOneofs = Object.create(null),
        key;

    for (key in value) {
        if (!hasOwn(value, key))
            continue;
        var field = index[key];
        if (field === undefined) {
            if (options.ignoreUnknownFields)
                continue;
            throw invalid(type.fullName, key, "unknown field");
        }
        if (seenFields[field.name])
            throw invalid(type.fullName, key, "duplicate field");
        seenFields[field.name] = true;
        var fv = value[key], fieldValue;
        if (fv === null) {
            if (isValueType(field.resolvedType))
                fieldValue = { nullValue: 0 };
            else if (field.resolvedType instanceof Enum && field.resolvedType.fullName === ".google.protobuf.NullValue")
                fieldValue = 0;
            else
                continue;
        } else
            fieldValue = readField(field, fv, options, depth);
        if (fieldValue === SKIP)
            continue;
        if (field.partOf) {
            if (seenOneofs[field.partOf.name])
                throw Error(type.fullName + ": multiple values for oneof " + field.partOf.name);
            seenOneofs[field.partOf.name] = true;
        }
        if (!isImplicitDefault(field, fieldValue))
            out[field.name] = fieldValue;
    }
    return out;
}

// --- writing messages ---

function hasOwn(o, k) {
    return o != null && Object.prototype.hasOwnProperty.call(o, k);
}

function setOwn(o, k, v) {
    if (k === "__proto__")
        util.makeProp(o, k);
    o[k] = v;
}

function wktFieldName(type, name) {
    var field = fieldsByJsonName(type)[name];
    return field ? field.name : name;
}

function wktFieldValue(type, message, name) {
    var field = fieldsByJsonName(type)[name];
    if (!field)
        return message && message[name];
    if (hasOwn(message, field.name))
        return message[field.name];
    if (hasOwn(message, field.protoName))
        return message[field.protoName];
    if (hasOwn(message, field.jsonName))
        return message[field.jsonName];
    return undefined;
}

function writeScalar(type, value) {
    switch (type) {
        case "int64": case "sint64": case "sfixed64":
        case "uint64": case "fixed64":
            return value == null ? "0" : String(value);
        case "float": case "double":
            return typeof value === "number" && !isFinite(value) ? String(value) : value;
        case "bytes":
            return value == null ? "" : util.base64.encode(value, 0, value.length);
        default:
            return value;
    }
}

function writeSingular(field, value, options, depth) {
    if (field.resolvedType instanceof Type)
        return toJsonValue(field.resolvedType, value, options, depth + 1);
    if (field.resolvedType instanceof Enum) {
        if (field.resolvedType.fullName === ".google.protobuf.NullValue")
            return null;
        var name = field.resolvedType.valuesById[value];
        return name === undefined ? value : name;
    }
    return writeScalar(field.type, value);
}

function toJsonValue(type, message, options, depth) {
    if (depth > util.recursionLimit)
        throw Error("max depth exceeded");

    var wkt = WKT_TO[type.fullName];
    if (wkt)
        return wkt(type, message, options, depth);

    var out = {},
        fields = type.fieldsArray,
        i = 0;
    for (; i < fields.length; ++i) {
        var field = fields[i].resolve(),
            value = message[field.name];
        if (value == null)
            continue;
        var key = isExtension(field) ? extensionName(field) : field.jsonName;
        if (field.map) {
            var mk = Object.keys(value);
            if (!mk.length)
                continue;
            var longKey = LONG_TYPE[field.keyType],
                unsignedKey = field.keyType === "uint64" || field.keyType === "fixed64",
                mo = {}, ki = 0;
            for (; ki < mk.length; ++ki) {
                var outKey = longKey ? util.longFromKey(mk[ki], unsignedKey).toString() : mk[ki];
                setOwn(mo, outKey, writeSingular(field, value[mk[ki]], options, depth));
            }
            setOwn(out, key, mo);
        } else if (field.repeated) {
            if (!value.length)
                continue;
            var arr = new Array(value.length), j = 0;
            for (; j < value.length; ++j)
                arr[j] = writeSingular(field, value[j], options, depth);
            setOwn(out, key, arr);
        } else {
            if (!hasOwn(message, field.name) || isImplicitDefault(field, value))
                continue;
            setOwn(out, key, writeSingular(field, value, options, depth));
        }
    }
    return out;
}

// --- well-known types ---

function longToNumber(value) {
    if (value == null) return 0;
    if (typeof value === "number") return value;
    if (typeof value.toNumber === "function") return value.toNumber();
    return Number(value) || 0;
}

function nanosToString(nanos) {
    var str = String(nanos < 0 ? -nanos : nanos);
    while (str.length < 9) str = "0" + str;
    while (str.length > 3 && str.slice(str.length - 3) === "000") str = str.slice(0, str.length - 3);
    return str;
}

function fracToNanos(frac) {
    while (frac.length < 9) frac += "0";
    return parseInt(frac.slice(0, 9), 10);
}

function daysInMonth(year, month) {
    switch (month) {
        case 2:
            return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        default:
            return 31;
    }
}

function camelToSnake(path) {
    return path.replace(/[A-Z]/g, function ($0) { return "_" + $0.toLowerCase(); });
}

var WKT_FROM = {};
var WKT_TO = {};

WKT_FROM[".google.protobuf.Duration"] = function (type, value) {
    if (typeof value !== "string")
        throw invalid(type.fullName, value, "expected duration string");
    var match = /^(-)?([0-9]+)(?:\.([0-9]{1,9}))?s$/.exec(value);
    if (!match)
        throw invalid(type.fullName, value, "invalid duration");
    var sign = match[1] ? -1 : 1,
        seconds = parseInt(match[2], 10) * sign || 0,
        nanos = match[3] ? fracToNanos(match[3]) * sign || 0 : 0;
    if (seconds > 315576000000 || seconds < -315576000000)
        throw invalid(type.fullName, value, "duration out of range");
    var message = {};
    if (seconds !== 0)
        message.seconds = seconds;
    if (nanos !== 0)
        message.nanos = nanos;
    return message;
};
WKT_TO[".google.protobuf.Duration"] = function (type, message) {
    var seconds = longToNumber(message.seconds),
        nanos = message.nanos || 0;
    if (seconds > 315576000000 || seconds < -315576000000)
        throw Error("google.protobuf.Duration out of range");
    if (nanos > 999999999 || nanos < -999999999 || seconds && nanos && seconds < 0 !== nanos < 0)
        throw Error("google.protobuf.Duration nanos invalid");
    var result = (seconds < 0 || nanos < 0 ? "-" : "") + Math.abs(seconds);
    if (nanos)
        result += "." + nanosToString(nanos);
    return result + "s";
};

WKT_FROM[".google.protobuf.Timestamp"] = function (type, value) {
    if (typeof value !== "string")
        throw invalid(type.fullName, value, "expected timestamp string");
    var match = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.(\d{1,9}))?(Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/.exec(value);
    if (!match)
        throw invalid(type.fullName, value, "invalid timestamp");
    var year = parseInt(match[1], 10),
        month = parseInt(match[2], 10),
        day = parseInt(match[3], 10);
    if (day > daysInMonth(year, month))
        throw invalid(type.fullName, value, "invalid timestamp date");
    var millis = new Date(value).getTime();
    if (isNaN(millis))
        throw invalid(type.fullName, value, "invalid timestamp");
    var seconds = Math.floor(millis / 1000),
        nanos = match[7] ? fracToNanos(match[7]) : 0;
    if (seconds < -62135596800 || seconds > 253402300799)
        throw invalid(type.fullName, value, "timestamp out of range");
    var message = {};
    if (seconds !== 0)
        message.seconds = seconds;
    if (nanos !== 0)
        message.nanos = nanos;
    return message;
};
WKT_TO[".google.protobuf.Timestamp"] = function (type, message) {
    var seconds = longToNumber(message.seconds),
        nanos = message.nanos || 0;
    if (seconds < -62135596800 || seconds > 253402300799)
        throw Error("google.protobuf.Timestamp out of range");
    if (nanos < 0 || nanos > 999999999)
        throw Error("google.protobuf.Timestamp nanos out of range");
    var iso = new Date(seconds * 1000).toISOString();
    return nanos
        ? iso.replace(/\.\d+Z$/, "." + nanosToString(nanos) + "Z")
        : iso.replace(/\.\d+Z$/, "Z");
};

WKT_FROM[".google.protobuf.FieldMask"] = function (type, value) {
    if (typeof value !== "string")
        throw invalid(type.fullName, value, "expected field mask string");
    if (value.indexOf("_") !== -1)
        throw invalid(type.fullName, value, "field mask path must be lowerCamelCase");
    var paths = value.length ? value.split(",") : [],
        i = 0;
    for (; i < paths.length; ++i)
        paths[i] = camelToSnake(paths[i]);
    return { paths: paths };
};
WKT_TO[".google.protobuf.FieldMask"] = function (type, message) {
    var paths = message.paths || [],
        out = [],
        i = 0;
    for (; i < paths.length; ++i) {
        var camel = util.jsonName(paths[i]);
        if (camelToSnake(camel) !== paths[i])
            throw Error("google.protobuf.FieldMask path does not round-trip: " + paths[i]);
        out.push(camel);
    }
    return out.join(",");
};

["DoubleValue", "FloatValue", "Int64Value", "UInt64Value", "Int32Value",
 "UInt32Value", "BoolValue", "StringValue", "BytesValue"].forEach(function (name) {
    var fullName = ".google.protobuf." + name;
    WKT_FROM[fullName] = function (type, value, options, depth) {
        var field = type.fields.value.resolve(),
            fieldValue = readSingular(field, value, options, depth),
            message = {};
        if (!isImplicitDefault(field, fieldValue))
            message.value = fieldValue;
        return message;
    };
    WKT_TO[fullName] = function (type, message, options, depth) {
        var field = type.fields.value.resolve(),
            value = wktFieldValue(type, message, "value");
        return writeSingular(field, value === undefined ? field.defaultValue : value, options, depth);
    };
});

function valueFromJson(json, depth) {
    if (depth > util.recursionLimit)
        throw Error("max depth exceeded");
    if (json === null)
        return { nullValue: 0 };
    switch (typeof json) {
        case "number":
            if (!isFinite(json))
                throw Error("google.protobuf.Value cannot hold a non-finite number");
            return { numberValue: json };
        case "string":
            validateUtf16(json, "google.protobuf.Value.string_value");
            return { stringValue: json };
        case "boolean":
            return { boolValue: json };
    }
    if (Array.isArray(json)) {
        var values = new Array(json.length), i = 0;
        for (; i < json.length; ++i)
            values[i] = valueFromJson(json[i], depth + 1);
        return { listValue: { values: values } };
    }
    return { structValue: { fields: structFieldsFromJson(json, depth + 1) } };
}
function structFieldsFromJson(json, depth) {
    var fields = Object.create(null), k;
    for (k in json)
        if (hasOwn(json, k)) {
            validateUtf16(k, "google.protobuf.Struct.fields");
            fields[k] = valueFromJson(json[k], depth);
        }
    return fields;
}
WKT_FROM[".google.protobuf.Value"] = function (type, value, options, depth) {
    return valueFromJson(value, depth);
};
WKT_FROM[".google.protobuf.Struct"] = function (type, value, options, depth) {
    if (value === null || typeof value !== "object" || Array.isArray(value))
        throw invalid(type.fullName, value, "google.protobuf.Struct must be an object");
    return { fields: structFieldsFromJson(value, depth + 1) };
};
WKT_FROM[".google.protobuf.ListValue"] = function (type, value, options, depth) {
    if (!Array.isArray(value))
        throw invalid(type.fullName, value, "google.protobuf.ListValue must be an array");
    var values = new Array(value.length), i = 0;
    for (; i < value.length; ++i)
        values[i] = valueFromJson(value[i], depth + 1);
    return { values: values };
};

function valueToJson(message, options, depth) {
    if (depth > util.recursionLimit)
        throw Error("max depth exceeded");
    if (message == null || hasOwn(message, "nullValue"))
        return null;
    if (hasOwn(message, "numberValue")) {
        if (typeof message.numberValue === "number" && !isFinite(message.numberValue))
            throw Error("google.protobuf.Value cannot hold a non-finite number");
        return message.numberValue;
    }
    if (hasOwn(message, "stringValue")) return message.stringValue;
    if (hasOwn(message, "boolValue")) return message.boolValue;
    if (hasOwn(message, "structValue")) return structToJson(message.structValue, options, depth + 1);
    if (hasOwn(message, "listValue")) return listToJson(message.listValue, options, depth + 1);
    return null;
}
function structToJson(message, options, depth) {
    var out = {}, fields = message && message.fields, k;
    if (fields)
        for (k in fields)
            if (hasOwn(fields, k))
                setOwn(out, k, valueToJson(fields[k], options, depth));
    return out;
}
function listToJson(message, options, depth) {
    var values = message && message.values;
    if (!values) return [];
    var arr = new Array(values.length), i = 0;
    for (; i < values.length; ++i)
        arr[i] = valueToJson(values[i], options, depth);
    return arr;
}
WKT_TO[".google.protobuf.Value"] = function (type, message, options, depth) {
    return valueToJson(message, options, depth);
};
WKT_TO[".google.protobuf.Struct"] = function (type, message, options, depth) {
    return structToJson(message, options, depth);
};
WKT_TO[".google.protobuf.ListValue"] = function (type, message, options, depth) {
    return listToJson(message, options, depth);
};

WKT_FROM[".google.protobuf.Any"] = function (type, value, options, depth) {
    if (value === null || typeof value !== "object" || Array.isArray(value))
        throw invalid(type.fullName, value, "google.protobuf.Any must be an object");
    var typeUrl = value["@type"];
    if (typeUrl === undefined)
        return {};
    if (typeof typeUrl !== "string")
        throw Error("google.protobuf.Any @type must be a string");
    var name = typeUrl.substring(typeUrl.lastIndexOf("/") + 1),
        msgType = type.root.lookupType(name),
        custom = WKT_FROM[msgType.fullName] !== undefined,
        body;
    if (custom)
        body = value.value;
    else {
        body = {};
        for (var k in value)
            if (hasOwn(value, k) && k !== "@type")
                setOwn(body, k, value[k]);
    }
    var inner = readMessage(msgType, body, options, depth + 1);
    var url = typeUrl.charAt(0) === "." ? typeUrl.slice(1) : typeUrl,
        out = {};
    if (url.indexOf("/") === -1)
        url = "/" + url;
    out[wktFieldName(type, "type_url")] = url;
    var bytes = msgType.encode(inner).finish();
    if (bytes.length)
        out[wktFieldName(type, "value")] = bytes;
    return out;
};
WKT_TO[".google.protobuf.Any"] = function (type, message, options, depth) {
    var typeUrl = wktFieldValue(type, message, "type_url");
    if (!typeUrl)
        return {};
    var name = typeUrl.substring(typeUrl.lastIndexOf("/") + 1),
        msgType = type.root.lookupType(name),
        value = wktFieldValue(type, message, "value"),
        decoded = msgType.decode(value || util.emptyArray),
        body = toJsonValue(msgType, decoded, options, depth + 1),
        result;
    if (WKT_TO[msgType.fullName])
        result = { "@type": typeUrl, "value": body };
    else {
        result = { "@type": typeUrl };
        for (var k in body)
            if (hasOwn(body, k))
                setOwn(result, k, body[k]);
    }
    return result;
};

// --- duplicate keys ---

// JSON.parse keeps the last duplicate key, but ProtoJSON rejects duplicates.
function checkDuplicateKeys(str) {
    var stack = [],
        expectKey = false,
        i = 0,
        n = str.length;
    while (i < n) {
        var c = str.charAt(i);
        if (c === "{") {
            stack.push(Object.create(null));
            expectKey = true;
            ++i;
        } else if (c === "[") {
            stack.push(null);
            expectKey = false;
            ++i;
        } else if (c === "}" || c === "]") {
            stack.pop();
            expectKey = false;
            ++i;
        } else if (c === ":") {
            expectKey = false;
            ++i;
        } else if (c === ",") {
            expectKey = stack.length > 0 && stack[stack.length - 1] !== null;
            ++i;
        } else if (c === "\"") {
            var start = i++;
            while (i < n) {
                var ch = str.charAt(i++);
                if (ch === "\\") ++i;
                else if (ch === "\"") break;
            }
            if (expectKey) {
                var seen = stack[stack.length - 1],
                    name = JSON.parse(str.slice(start, i));
                if (seen[name])
                    throw Error("duplicate key in JSON object: " + JSON.stringify(name));
                seen[name] = true;
                expectKey = false;
            }
        } else
            ++i;
    }
}

// --- public API ---

/**
 * ProtoJSON conversion options.
 * @interface IProtoJsonOptions
 * @property {boolean} [ignoreUnknownFields=false] Ignores unknown object members and unrecognized enum names while parsing.
 */

/**
 * Parses a message from an already-parsed ProtoJSON value using the specified reflected type.
 * @function fromJson
 * @name fromJson
 * @param {$protobuf.Type} type Reflected message type
 * @param {*} json Already-parsed ProtoJSON value
 * @param {IProtoJsonOptions} [options] Conversion options
 * @returns {$protobuf.Message<{}>} Message instance
 */
protojson.fromJson = function fromJson(type, json, options) {
    if (!(type instanceof Type))
        throw TypeError("type must be a Type");
    type.root.resolveAll();
    return type.create(readMessage(type, json, options || {}, 0));
};

/**
 * Parses a message from ProtoJSON text using the specified reflected type.
 * @function fromJsonString
 * @name fromJsonString
 * @param {$protobuf.Type} type Reflected message type
 * @param {string} json ProtoJSON text
 * @param {IProtoJsonOptions} [options] Conversion options
 * @returns {$protobuf.Message<{}>} Message instance
 */
protojson.fromJsonString = function fromJsonString(type, json, options) {
    if (typeof json !== "string")
        throw TypeError("json must be a string");
    checkDuplicateKeys(json);
    return protojson.fromJson(type, JSON.parse(json), options);
};

/**
 * Formats a message as ProtoJSON using the specified reflected type.
 * @function toJson
 * @name toJson
 * @param {$protobuf.Type} type Reflected message type
 * @param {$protobuf.Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {IProtoJsonOptions} [options] Conversion options
 * @returns {*} ProtoJSON value (object, array, string, number, boolean or null)
 */
protojson.toJson = function toJson(type, message, options) {
    if (!(type instanceof Type))
        throw TypeError("type must be a Type");
    type.root.resolveAll();
    return toJsonValue(type, message, options || {}, 0);
};

/**
 * Formats a message as ProtoJSON text using the specified reflected type.
 * @function toJsonString
 * @name toJsonString
 * @param {$protobuf.Type} type Reflected message type
 * @param {$protobuf.Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {IProtoJsonOptions} [options] Conversion options
 * @returns {string} ProtoJSON text
 */
protojson.toJsonString = function toJsonString(type, message, options) {
    return JSON.stringify(protojson.toJson(type, message, options));
};

/**
 * Installs reflected {@link Type} convenience methods.
 * @function install
 * @name install
 * @returns {undefined}
 */
protojson.install = function install() {
    /**
     * Parses a message of this type from an already-parsed ProtoJSON value. Convenience for {@link protojson.fromJson}.
     * @param {*} json Already-parsed ProtoJSON value
     * @param {IProtoJsonOptions} [options] Conversion options
     * @returns {Message<{}>} Message instance
     */
    Type.prototype.fromJson = function fromJson(json, options) {
        return protojson.fromJson(this, json, options);
    };

    /**
     * Parses a message of this type from ProtoJSON text. Convenience for {@link protojson.fromJsonString}.
     * @param {string} json ProtoJSON text
     * @param {IProtoJsonOptions} [options] Conversion options
     * @returns {Message<{}>} Message instance
     */
    Type.prototype.fromJsonString = function fromJsonString(json, options) {
        return protojson.fromJsonString(this, json, options);
    };

    /**
     * Formats a message of this type as ProtoJSON. Convenience for {@link protojson.toJson}.
     * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
     * @param {IProtoJsonOptions} [options] Conversion options
     * @returns {*} ProtoJSON value
     */
    Type.prototype.toJson = function toJson(message, options) {
        return protojson.toJson(this, message, options);
    };

    /**
     * Formats a message of this type as ProtoJSON text. Convenience for {@link protojson.toJsonString}.
     * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
     * @param {IProtoJsonOptions} [options] Conversion options
     * @returns {string} ProtoJSON text
     */
    Type.prototype.toJsonString = function toJsonString(message, options) {
        return protojson.toJsonString(this, message, options);
    };
};
