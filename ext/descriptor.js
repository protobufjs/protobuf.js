// [WIP] Extension for reflection interoperability with descriptor.proto types
// var protobuf   = require("protobufjs"),
//     descriptor = require("protobufjs/ext/descriptor");
// ...
"use strict";

var protobuf = require("..");

/**
 * Descriptor extension (ext/descriptor).
 * @namespace
 * @property {Type} FileDescriptorSet Descriptor set describing a root
 * @property {Type} DescriptorProto Descriptor describing a type
 * @property {Type} FieldDescriptorProto Descriptor describing a field
 */
var descriptor = module.exports = protobuf.Root.fromJSON(require("../google/protobuf/descriptor.json")).lookup(".google.protobuf");

var google   = descriptor,
    Root     = protobuf.Root,
    Enum     = protobuf.Enum,
    Type     = protobuf.Type,
    Field    = protobuf.Field,
    OneOf    = protobuf.OneOf;

// Root : FileDescriptorSet
// ------------------------
// [ ] repeated FileDescriptorProto file = 1;
//  ├ [ ] optional string name = 1;
//  ├ [ ] optional string package = 2;
//  ├ [ ] repeated string dependency = 3;
//  ├ [ ] repeated int32 public_dependency = 10;
//  ├ [ ] repeated int32 weak_dependency = 11;
//  ├ [ ] repeated DescriptorProto message_type = 4;
//  ├ [ ] repeated EnumDescriptorProto enum_type = 5;
//  ├ [ ] repeated ServiceDescriptorProto service = 6;
//  ├ [ ] repeated FieldDescriptorProto extension = 7;
//  ├ [ ] optional FileOptions options = 8;
//  ├ [ ] optional SourceCodeInfo source_code_info = 9;
//  └ [x] optional string syntax = 12;

/**
 * Creates a root from a descriptor set.
 * @param {FileDescriptorSet|Reader|Uint8Array} descriptor Descriptor
 * @returns {Root} Root instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Root.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = google.FileDescriptorSet.decode(descriptor);

    var root = new Root();
    root.descriptorRoot = descriptor;
    throw Error("not implemented");
};

/**
 * Converts a root to a descriptor set.
 * @returns {FileDescriptorSet} Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Root.prototype.toDescriptor = function toDescriptor(syntax) {
    throw Error("not implemented");
};

// Type : DescriptorProto
// ----------------------
// [x] optional string name = 1;
// [x] repeated FieldDescriptorProto field = 2;
// [x] repeated FieldDescriptorProto extension = 6;
// [x] repeated DescriptorProto nested_type = 3;
// [x] repeated EnumDescriptorProto enum_type = 4;
// [x] repeated ExtensionRange extension_range = 5;
//  ├ optional int32 start = 1;
//  └ optional int32 end = 2;
// [x] repeated OneofDescriptorProto oneof_decl = 8;
// [ ] optional MessageOptions options = 7;
//  └ [ ] optional bool map_entry = 7;
// [x] repeated ReservedRange reserved_range = 9;
//  ├ optional int32 start = 1;
//  └ optional int32 end = 2;
// [x] repeated string reserved_name = 10;

var unnamedMessageIndex = 0;

/**
 * Creates a type from a descriptor.
 * @param {DescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @returns {Type} Type instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Type.fromDescriptor = function fromDescriptor(descriptor, syntax) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = google.DescriptorProto.decode(descriptor);

    // Create the message type
    var type = new Type(descriptor.name.length ? descriptor.name : "Unnamed" + unnamedMessageIndex++),
        i;

    /* Fields */ for (i = 0; i < descriptor.field.length; ++i)
        type.add(protobuf.Field.fromDescriptor(descriptor.field[i], syntax));
    /* Extension fields */ for (i = 0; i < descriptor.extension.length; ++i)
        type.add(protobuf.Field.fromDescriptor(descriptor.extension[i], syntax));
    /* Oneofs */ for (i = 0; i < descriptor.oneofDecl.length; ++i)
        type.add(protobuf.OneOf.fromDescriptor(descriptor.oneofDecl[i]));
    /* Nested types */ for (i = 0; i < descriptor.nestedType.length; ++i)
        type.add(protobuf.Type.fromDescriptor(descriptor.nestedType[i], syntax));
    /* Nested enums */ for (i = 0; i < descriptor.enumType.length; ++i)
        type.add(protobuf.Enum.fromDescriptor(descriptor.enumType[i]));
    /* Extension ranges */ if (descriptor.extensionRange.length) {
        type.extensions = [];
        for (i = 0; i < descriptor.extensionRange.length; ++i)
            type.extensions.push([ descriptor.extensionRange[i].start, descriptor.extensionRange[i].end ]);
    }
    /* Reserved ranges and names */ if (descriptor.reservedRange.length || descriptor.reservedName.length) {
        type.reserved = [];
        for (i = 0; i < descriptor.reservedRange.length; ++i)
            type.reserved.push([ descriptor.reservedRange[i].start, descriptor.reservedRange[i].end ]);
        for (i = 0; i < descriptor.reservedName.length; ++i)
            type.reserved.push(descriptor.reservedName[i]);
    }

    return type;
};

/**
 * Converts a type to a descriptor.
 * @returns {DescriptorProto} Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Type.prototype.toDescriptor = function toDescriptor(syntax) {
    var descriptor = google.DescriptorProto.create({ name: this.name }),
        i;

    /* Fields */ for (i = 0; i < this.fieldsArray.length; ++i)
        descriptor.field.push(this._fieldsArray[i].toDescriptor(syntax));
    /* Nested... */ for (i = 0; i < this.nestedArray.length; ++i) {
        var nested = this.nestedArray[i];
        /* Extension fields */ if (nested instanceof Field)
            descriptor.field.push(nested.toDescriptor(syntax));
        /* Oneofs */ else if (nested instanceof OneOf)
            descriptor.oneofDecl.push(nested.toDescriptor());
        /* Types */ else if (nested instanceof Type)
            descriptor.nestedType.push(nested.toDescriptor(syntax));
        /* Enums */ else if (nested instanceof Enum)
            descriptor.enumType.push(nested.toDescriptor());
    }
    /* Extension ranges */ if (this.extensions) for (i = 0; i < this.extensions.length; ++i)
        descriptor.extensionRange.push(google.DescriptorProto.ExtensionRange.create({ start: this.extensions[i][0], end: this.extensions[i][1] }));
    /* Reserved ranges and names */ if (this.reserved) for (i = 0; i < this.reserved.length; ++i)
        if (typeof this.reserved[i] === "string")
            descriptor.reservedName.push(this.reserved[i]);
        else
            descriptor.reservedRange.push(google.DescriptorProto.ReservedRange.create({ start: this.reserved[i][0], end: this.reserved[i][1] }));

    return descriptor;
};

// Field : FieldDescriptorProto
// ----------------------------
// [x] optional string name = 1;
// [x] optional int32 number = 3;
// [x] optional Label label = 4;
//  ├ LABEL_OPTIONAL = 1;
//  ├ LABEL_REQUIRED = 2;
//  └ LABEL_REPEATED = 3;
// [x] optional Type type = 5;
//  ├ TYPE_DOUBLE = 1;
//  ├ TYPE_FLOAT = 2;
//  ├ TYPE_INT64 = 3;
//  ├ TYPE_UINT64 = 4;
//  ├ TYPE_INT32 = 5;
//  ├ TYPE_FIXED64 = 6;
//  ├ TYPE_FIXED32 = 7;
//  ├ TYPE_BOOL = 8;
//  ├ TYPE_STRING = 9;
//  ├ TYPE_GROUP = 10;
//  ├ TYPE_MESSAGE = 11;
//  ├ TYPE_BYTES = 12;
//  ├ TYPE_UINT32 = 13;
//  ├ TYPE_ENUM = 14;
//  ├ TYPE_SFIXED32 = 15;
//  ├ TYPE_SFIXED64 = 16;
//  ├ TYPE_SINT32 = 17;
//  └ TYPE_SINT64 = 18;
// [x] optional string type_name = 6;
// [x] optional string extendee = 2;
// [ ] optional string default_value = 7;
// [ ] optional int32 oneof_index = 9;
// [ ] optional string json_name = 10;
// [~] optional FieldOptions options = 8;
//  └ [x] optional bool packed = 2;

/**
 * Creates a field from a descriptor.
 * @param {FieldDescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @returns {Field} Field instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Field.fromDescriptor = function fromDescriptor(descriptor, syntax) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = google.DescriptorProto.decode(descriptor);

    // Rewire field type
    var fieldType;
    if (descriptor.type_name.length)
        fieldType = descriptor.type_name;
    else switch (descriptor.type) {
        // 0 is reserved for errors
        case 1: fieldType = "double"; break;
        case 2: fieldType = "float"; break;
        case 3: fieldType = "int64"; break;
        case 4: fieldType = "uint64"; break;
        case 5: fieldType = "int32"; break;
        case 6: fieldType = "fixed64"; break;
        case 7: fieldType = "fixed32"; break;
        case 8: fieldType = "bool"; break;
        case 9: fieldType = "string"; break;
        case 10: throw Error("unnamed group");
        case 11: throw Error("unnamed message");
        case 12: fieldType = "bytes"; break;
        case 13: fieldType = "uint32"; break;
        case 14: throw Error("unnamed enum");
        case 15: fieldType = "sfixed32"; break;
        case 16: fieldType = "sfixed64"; break;
        case 17: fieldType = "sint32"; break;
        case 18: fieldType = "sint64"; break;
        default: throw Error("illegal type: " + descriptor.type);
    }

    // Rewire field rule
    var fieldRule;
    switch (descriptor.label) {
        // 0 is reserved for errors
        case 1: fieldRule = undefined; break;
        case 2: fieldRule = "required"; break;
        case 3: fieldRule = "repeated"; break;
        default: throw Error("illegal label: " + descriptor.label);
    }

    var field = new Field(descriptor.name.length ? descriptor.name : "unnamed" + descriptor.number, descriptor.number, fieldType, fieldRule, descriptor.extendee.length ? descriptor.extendee : undefined);
    if (syntax === "proto3") {
        if (descriptor.options && !descriptor.options.packed)
            field.setOption("packed", false);
    } else if (!(descriptor.options && descriptor.options.packed))
        field.setOption("packed", false);
    return field;
};

/**
 * Converts a field to a descriptor.
 * @returns {FieldDescriptorProto} Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Field.prototype.toDescriptor = function toDescriptor(syntax) {
    var descriptor = google.FieldDescriptorProto.create({ name: this.name, number: this.id });

    // Rewire field type
    switch (this.type) {
        case "double": descriptor.type = 1; break;
        case "float": descriptor.type = 2; break;
        case "int64": descriptor.type = 3; break;
        case "uint64": descriptor.type = 4; break;
        case "int32": descriptor.type = 5; break;
        case "fixed64": descriptor.type = 6; break;
        case "fixed32": descriptor.type = 7; break;
        case "bool": descriptor.type = 8; break;
        case "string": descriptor.type = 9; break;
        case "bytes": descriptor.type = 12; break;
        case "uint32": descriptor.type = 13; break;
        case "sfixed32": descriptor.type = 15; break;
        case "sfixed64": descriptor.type = 16; break;
        case "sint32": descriptor.type = 17; break;
        case "sint64": descriptor.type = 18; break;
        default:
            descriptor.type_name = this.resolvedType ? this.resolvedType.fullName : this.type;
            if (this.resolvedType instanceof Enum)
                descriptor.type = 14;
            else if (this.resolvedType instanceof Type)
                descriptor.type = this.resolvedType.group ? 10 : 11;
            else
                throw Error("illegal type: " + this.type);
            break;
    }

    // Rewire field rule
    switch (this.rule) {
        case "repeated": descriptor.label = 3; break;
        case "required": descriptor.label = 2; break;
        default: descriptor.label = 1; break;
    }

    descriptor.extendee = this.extensionField ? this.extensionField.parent.fullName : this.extend;

    if (syntax === "proto3") {
        if (!this.packed)
            descriptor.options = new google.FieldOptions({ packed: false });
    } else if (this.packed)
        descriptor.options = new google.FieldOptions({ packed: true });

    return descriptor;
};

// Enum : EnumDescriptorProto
// --------------------------
// [ ] optional string name = 1;
// [ ] repeated EnumValueDescriptorProto value = 2;
//  ├ [ ] optional string name = 1;
//  ├ [ ] optional int32 number = 2;
//  └ [ ] optional EnumValueOptions options = 3;
// [ ] optional EnumOptions options = 3;
//  └ [ ] optional bool allow_alias = 2;

// OneOf : OneofDescriptorProto
// ----------------------------
// [ ] optional string name = 1;
// [ ] optional OneofOptions options = 2;

// Service : ServiceDescriptorProto
// --------------------------------
// [ ] optional string name = 1;
// [ ] repeated MethodDescriptorProto method = 2;
// [ ] optional ServiceOptions options = 3;

// Method: MethodDescriptorProto
// -----------------------------
// [ ] optional string name = 1;
// [ ] optional string input_type = 2;
// [ ] optional string output_type = 3;
// [ ] optional MethodOptions options = 4;
// [ ] optional bool client_streaming = 5;
// [ ] optional bool server_streaming = 6;
