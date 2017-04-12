// Extension for reflection interoperability with descriptor.proto types
// var protobuf   = require("protobufjs"),
//     descriptor = require("protobufjs/ext/descriptor");
// ...
"use strict";

var protobuf = require("..");

/**
 * Descriptor extension.
 * @namespace
 * @property {Type} FileDescriptorSet Descriptor set describing a root
 * @property {Type} DescriptorProto Descriptor describing a type
 * @property {Type} FieldDescriptorProto Descriptor describing a field
 */
var descriptor = module.exports = protobuf.Root.fromJSON(require("../google/protobuf/descriptor.json")).lookup(".google.protobuf");

var Root  = protobuf.Root,
    Type  = protobuf.Type,
    Field = protobuf.Field;

var FileDescriptorSet    = descriptor.FileDescriptorSet,
    DescriptorProto      = descriptor.DescriptorProto,
    FieldDescriptorProto = descriptor.FieldDescriptorProto;

// Root

/**
 * Creates a root from a descriptor set.
 * @param {FileDescriptorSet|Reader|Uint8Array} descriptor Descriptor
 * @returns {Root} Root instance
 */
protobuf.Root.fromDescriptor = function fromDescriptorSet(descriptor) {
    throw Error("not implemented");
};

/**
 * Converts a root to a descriptor set.
 * @returns {FileDescriptorSet} Descriptor
 */
protobuf.Root.prototype.toDescriptor = function toDescriptorSet() {
    throw Error("not implemented");
};

// Type

/**
 * Creates a type from a descriptor.
 * @param {DescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @returns {Type} Type instance
 */
protobuf.Type.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = DescriptorProto.decode(reader);

    // Create the message type
    var type = new protobuf.Type(descriptor.name);

    // Add fields
    descriptor.field.map(protobuf.Field.fromDescriptor).forEach(protobuf.Type.prototype.add.bind(type));

    // etc.

    return type;
};

/**
 * Converts a type to a descriptor.
 * @returns {DescriptorProto}
 */
protobuf.Type.prototype.toDescriptor = function toDescriptor() {
    throw Error("not implemented");
};

// Field

/**
 * Creates a field from a descriptor.
 * @param {FieldDescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @returns {Field} Field instance
 */
protobuf.Field.fromDescriptor = function fromDescriptor(descriptor) {
    throw Error("not implemented");
};

/**
 * Converts a field to a descriptor.
 * @returns {FieldDescriptorProto} Descriptor
 */
protobuf.Field.prototype.toDescriptor = function toDescriptor() {
    throw Error("not implemented");
};
