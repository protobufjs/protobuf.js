"use strict";

exports.Buffer_from = Buffer.from;
exports.copyBytes = copyBytes;
exports.protobufjs = protobufjs;
exports.json = json;
exports.protocGenJs = protocGenJs;
exports.protocGenEs = protocGenEs;

function copyBytes(buffer) {
    return new Uint8Array(Array.prototype.slice.call(buffer));
}

function protobufjs(reflectedType, message, buffer, staticType) {
    return [
        {
            name: "protobuf.js reflect",
            encode: function() { reflectedType.encode(message).finish(true); },
            decode: function() { reflectedType.decode(buffer); }
        },
        {
            name: "protobuf.js static",
            encode: function() { staticType.encode(message).finish(true); },
            decode: function() { staticType.decode(buffer); }
        }
    ];
}

function json(message, buffer) {
    return {
        name: "JSON",
        encode: function() { exports.Buffer_from(JSON.stringify(message), "utf8"); },
        decode: function() { JSON.parse(buffer.toString("utf8")); }
    };
}

function protocGenJs(type, buffer, message) {
    return {
        name: "protoc-gen-js",
        encode: function() { message.serializeBinary(); },
        decode: function() { type.deserializeBinary(buffer); }
    };
}

function protocGenEs(runtime, schema, buffer, message) {
    return {
        name: "protoc-gen-es",
        encode: function() { runtime.toBinary(schema, message); },
        decode: function() { runtime.fromBinary(schema, buffer); }
    };
}
