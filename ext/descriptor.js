// [WIP] Extension for reflection interoperability with descriptor.proto types
// var protobuf   = require("protobufjs"),
//     descriptor = require("protobufjs/ext/descriptor");
// ...
"use strict";

var protobuf = require("..");

/**
 * Descriptor extension (ext/descriptor).
 * @namespace
 */

var descriptor = module.exports = protobuf.Root.fromJSON(require("../google/protobuf/descriptor.json")).lookup(".google.protobuf");

var google   = descriptor,
    Root     = protobuf.Root,
    Enum     = protobuf.Enum,
    Type     = protobuf.Type,
    Field    = protobuf.Field,
    OneOf    = protobuf.OneOf,
    Service  = protobuf.Service,
    Method   = protobuf.Method;

// --- Root ---

/**
 * Reflected type describing a root.
 * @name descriptor.FileDescriptorSet
 * @type {Type}
 */

/**
 * @interface IFileDescriptorSet
 * @property {IFileDescriptorProto[]} file
 */

/**
 * @interface IFileDescriptorProto
 * @property {string} [name]
 * @property {string} [package]
 * @property {*} [dependency]
 * @property {*} [publicDependency]
 * @property {*} [weakDependency]
 * @property {IDescriptorProto[]} [messageType]
 * @property {IEnumDescriptorProto[]} [enumType]
 * @property {IServiceDescriptorProto[]} [service]
 * @property {IFieldDescriptorProto[]} [extension]
 * @property {*} [options]
 * @property {*} [sourceCodeInfo]
 * @property {string} [syntax="proto2"]
 */

/**
 * Creates a root from a descriptor set.
 * @param {Properties<IFileDescriptorSet>|Reader|Uint8Array} descriptor Descriptor
 * @returns {Root} Root instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Root.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = google.FileDescriptorSet.decode(descriptor);

    var root = new Root();

    if (descriptor.file) {
        var fileDescriptor,
            filePackage;
        for (var j = 0, i; j < descriptor.file.length; ++j) {
            fileDescriptor = descriptor.file[j];
            filePackage = root;
            if (fileDescriptor.name && fileDescriptor.name.length)
                root.files.push(fileDescriptor.name);
            if (fileDescriptor["package"] && fileDescriptor["package"].length)
                filePackage = root.define(fileDescriptor["package"]);
            if (fileDescriptor.messageType)
                for (i = 0; i < fileDescriptor.messageType.length; ++i)
                    filePackage.add(Type.fromDescriptor(fileDescriptor.messageType[i], fileDescriptor.syntax));
            if (fileDescriptor.enumType)
                for (i = 0; i < fileDescriptor.enumType.length; ++i)
                    filePackage.add(Enum.fromDescriptor(fileDescriptor.enumType[i]));
            if (fileDescriptor.extension)
                for (i = 0; i < fileDescriptor.extension.length; ++i)
                    filePackage.add(Field.fromDescriptor(fileDescriptor.extension[i]));
        }
    }

    return root;
};

function traverseNamespace(ns, file) {
    for (var i = 0; i < ns.nestedArray.length; ++i)
        ( ns._nestedArray[i] instanceof Type ? file.messageType
        : ns._nestedArray[i] instanceof Enum ? file.enumType
        : ns._nestedArray[i] instanceof Field ? file.extension
        : ns._nestedArray[i] instanceof Service ? file.service : []).push(ns._nestedArray[i].toDescriptor(file.syntax));
}

/**
 * Converts a root to a descriptor set.
 * @returns {Message<IFileDescriptorSet>} Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Root.prototype.toDescriptor = function toDescriptor(syntax) {
    var file = google.FileDescriptorProto.create({ name: "bundle.proto" });
    if (syntax)
        file.syntax = syntax;
    traverseNamespace(this, file);
    // return google.FileDescriptorSet.create({ file: [ file ] });

    // not working, packages need to be split to individual files first because there is no support
    // for plain namespaces
    throw Error("not implemented");
};

// --- Type ---

/**
 * Reflected type describing a type.
 * @name descriptor.DescriptorProto
 * @type {Type}
 */

/**
 * @interface IDescriptorProto
 * @property {string} [name]
 * @property {IFieldDescriptorProto[]} [field]
 * @property {IFieldDescriptorProto[]} [extension]
 * @property {IDescriptorProto[]} [nestedType]
 * @property {IEnumDescriptorProto[]} [enumType]
 * @property {IExtensionRange[]} [extensionRange]
 * @property {IOneofDescriptorProto[]} [oneofDecl]
 * @property {IMessageOptions} [options]
 * @property {IReservedRange[]} [reservedRange]
 * @property {string[]} [reservedName]
 */

/**
 * @interface IMessageOptions
 * @property {*} [mapEntry]
 */

/**
 * @interface IExtensionRange
 * @property {number} [start]
 * @property {number} [end]
 */

/**
 * @interface IReservedRange
 * @property {number} [start]
 * @property {number} [end]
 */

var unnamedMessageIndex = 0;

/**
 * Creates a type from a descriptor.
 * @param {Properties<IDescriptorProto>|Reader|Uint8Array} descriptor Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @returns {Type} Type instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Type.fromDescriptor = function fromDescriptor(descriptor, syntax) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = google.DescriptorProto.decode(descriptor);

    // Create the message type
    var type = new Type(descriptor.name.length ? descriptor.name : "Type" + unnamedMessageIndex++),
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
 * @returns {Message<IDescriptorProto>} Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Type.prototype.toDescriptor = function toDescriptor(syntax) {
    var descriptor = google.DescriptorProto.create({ name: this.name }),
        i;

    /* Fields */ for (i = 0; i < this.fieldsArray.length; ++i)
        descriptor.field.push(this._fieldsArray[i].toDescriptor(syntax));
    /* Nested... */ for (i = 0; i < this.nestedArray.length; ++i) {
        /* Extension fields */ if (this._nestedArray[i] instanceof Field)
            descriptor.field.push(this._nestedArray[i].toDescriptor(syntax));
        /* Oneofs */ else if (this._nestedArray[i] instanceof OneOf)
            descriptor.oneofDecl.push(this._nestedArray[i].toDescriptor());
        /* Types */ else if (this._nestedArray[i] instanceof Type)
            descriptor.nestedType.push(this._nestedArray[i].toDescriptor(syntax));
        /* Enums */ else if (this._nestedArray[i] instanceof Enum)
            descriptor.enumType.push(this._nestedArray[i].toDescriptor());
        // descriptor doesn't use / support plain nested namespaces
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

// --- Field ---

/**
 * Reflected type describing a field.
 * @name descriptor.FieldDescriptorProto
 * @type {Type}
 * @property {Enum} Label Reflected descriptor describing a field label (rule)
 * @property {Enum} Type Reflected descriptor describing a field type
 */

/**
 * @interface IFieldDescriptorProto
 * @property {string} [name]
 * @property {number} [number}
 * @property {IFieldDescriptorProto_Label} [label]
 * @property {IFieldDescriptorProto_Type} [type]
 * @property {string} [typeName]
 * @property {string} [extendee]
 * @property {*} [defaultValue]
 * @property {number} [oneofIndex]
 * @property {*} [jsonName]
 * @property {IFieldOptions} [options]
 */

/**
 * @typedef IFieldDescriptorProto_Label
 * @type {number}
 * @property {number} LABEL_OPTIONAL=1
 * @property {number} LABEL_REQUIRED=2
 * @property {number} LABEL_REPEATED=3
 */

/**
 * @typedef IFieldDescriptorProto_Type
 * @type {number}
 * @property {number} TYPE_DOUBLE=1
 * @property {number} TYPE_FLOAT=2
 * @property {number} TYPE_INT64=3
 * @property {number} TYPE_UINT64=4
 * @property {number} TYPE_INT32=5
 * @property {number} TYPE_FIXED64=6
 * @property {number} TYPE_FIXED32=7
 * @property {number} TYPE_BOOL=8
 * @property {number} TYPE_STRING=9
 * @property {number} TYPE_GROUP=10
 * @property {number} TYPE_MESSAGE=11
 * @property {number} TYPE_BYTES=12
 * @property {number} TYPE_UINT32=13
 * @property {number} TYPE_ENUM=14
 * @property {number} TYPE_SFIXED32=15
 * @property {number} TYPE_SFIXED64=16
 * @property {number} TYPE_SINT32=17
 * @property {number} TYPE_SINT64=18
 */

/**
 * @interface IFieldOptions
 * @property {boolean} [packed]
 */

/**
 * Creates a field from a descriptor.
 * @param {IFieldDescriptorProto|Reader|Uint8Array} descriptor Descriptor
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
    if (descriptor.typeName.length)
        fieldType = descriptor.typeName;
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

    var field = new Field(
        descriptor.name.length ? descriptor.name : "field" + descriptor.number,
        descriptor.number,
        fieldType,
        fieldRule,
        descriptor.extendee.length ? descriptor.extendee : undefined
    );

    if (syntax === "proto3") {
        if (descriptor.options && !descriptor.options.packed)
            field.setOption("packed", false);
    } else if (!(descriptor.options && descriptor.options.packed))
        field.setOption("packed", false);

    return field;
};

/**
 * Converts a field to a descriptor.
 * @returns {Message<IFieldDescriptorProto>} Descriptor
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

    // Handle extension field
    descriptor.extendee = this.extensionField ? this.extensionField.parent.fullName : this.extend;

    // Handle part of oneof
    if (this.partOf)
        if ((descriptor.oneofIndex = this.parent.oneofsArray.indexOf(this.partOf)) < 0)
            throw Error("missing oneof");

    if (syntax === "proto3") {
        if (!this.packed)
            descriptor.options = google.FieldOptions.create({ packed: false });
    } else if (this.packed)
        descriptor.options = google.FieldOptions.create({ packed: true });

    return descriptor;
};

// --- Enum ---

/**
 * Reflected type describing an enum.
 * @name descriptor.EnumDescriptorProto
 * @type {Type}
 */

/**
 * Reflected type describing an enum value.
 * @name descriptor.EnumValueDescriptorProto
 * @type {Type}
 */

/**
 * Reflected type describing enum options.
 * @name descriptor.EnumOptions
 * @type {Type}
 */

/**
 * @interface IEnumDescriptorProto
 * @property {string} [name]
 * @property {IEnumValueDescriptorProto[]} [value]
 * @property {IEnumOptions} [options]
 */

/**
 * @interface IEnumValueDescriptorProto
 * @property {string} [name]
 * @property {number} [number]
 * @property {*} [options]
 */

/**
 * @interface IEnumOptions
 * @property {boolean} [allowAlias]
 */

var unnamedEnumIndex = 0;

/**
 * Creates an enum from a descriptor.
 * @param {IEnumDescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @returns {Enum} Enum instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Enum.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = google.EnumDescriptorProto.decode(descriptor);

    // Values object
    var values = {};
    if (descriptor.value)
        for (var i = 0; i < descriptor.value.length; ++i) {
            var name  = descriptor.value[i].name,
                value = descriptor.value[i].number || 0;
            values[name && name.length ? name : "NAME" + value] = value;
        }

    return new Enum(
        descriptor.name && descriptor.name.length ? descriptor.name : "Enum" + unnamedEnumIndex++,
        values
    );
};

/**
 * Converts an enum to a descriptor.
 * @returns {Message<IEnumDescriptorProto>} Descriptor
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Enum.prototype.toDescriptor = function toDescriptor() {
    var values = [];

    for (var i = 0, ks = Object.keys(this.values), valueDescriptor; i < ks.length; ++i) {
        values.push(valueDescriptor = google.EnumValueDescriptorProto.create({ name: ks[i] }));
        if (this.values[ks[i]])
            valueDescriptor.value = this.values[ks[i]];
    }
    return google.EnumDescriptorProto.create({
        name: this.name,
        values: values
    });
};

// --- OneOf ---

/**
 * Reflected type describing a oneof.
 * @name descriptor.OneofDescriptorProto
 * @type {Type}
 */

/**
 * @interface IOneofDescriptorProto
 * @property {string} [name]
 * @property {*} [options]
 */

var unnamedOneOfIndex = 0;

/**
 * Creates a oneof from a descriptor.
 * @param {IOneofDescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @returns {OneOf} OneOf instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
OneOf.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = google.OneofDescriptorProto.decode(descriptor);

    return new OneOf(
        // unnamedOneOfIndex is global, not per type, because we have no ref to a type here
        descriptor.name && descriptor.name.length ? descriptor.name : "oneof" + unnamedOneOfIndex++
    );
};

/**
 * Converts a oneof to a descriptor.
 * @returns {Message<IOneofDescriptorProto>} Descriptor
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
OneOf.prototype.toDescriptor = function toDescriptor() {
    return google.OneofDescriptorProto.create({
        name: this.name
    });
};

// --- Service ---

/**
 * Reflected type describing a service.
 * @name descriptor.ServiceDescriptorProto
 * @type {Type}
 */

/**
 * @interface IServiceDescriptorProto
 * @property {string} [name]
 * @property {IMethodDescriptorProto[]} [method]
 * @property {*} [options]
 */

var unnamedServiceIndex = 0;

/**
 * Creates a service from a descriptor.
 * @param {Properties<IServiceDescriptorProto>|Reader|Uint8Array} descriptor Descriptor
 * @returns {Service} Service instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Service.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = google.ServiceDescriptorProto.decode(descriptor);

    var service = new Service(descriptor.name && descriptor.name.length ? descriptor.name : "Service" + unnamedServiceIndex++);
    if (descriptor.method)
        for (var i = 0; i < descriptor.method.length; ++i)
            service.add(Method.fromDescriptor(descriptor.method[i]));

    return service;
};

/**
 * Converts a service to a descriptor.
 * @returns {Message<IServiceDescriptorProto>} Descriptor
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Service.prototype.toDescriptor = function toDescriptor() {
    var methods = [];

    for (var i = 0; i < this.methodsArray; ++i)
        methods.push(this._methodsArray[i].toDescriptor());

    return google.ServiceDescriptorProto.create({
        name: this.name,
        methods: methods
    });
};

// --- Method ---

/**
 * Reflected type describing a method.
 * @name descriptor.MethodDescriptorProto
 * @type {Type}
 */

/**
 * @interface IMethodDescriptorProto
 * @property {string} [name]
 * @property {string} [inputType]
 * @property {string} [outputType]
 * @property {*} [options]
 * @property {boolean} [clientStreaming]
 * @property {boolean} [serverStreaming]
 */

var unnamedMethodIndex = 0;

/**
 * Creates a method from a descriptor.
 * @param {IMethodDescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @returns {Method} Reflected method instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Method.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = google.MethodDescriptorProto.decode(descriptor);

    return new Method(
        // unnamedMethodIndex is global, not per service, because we have no ref to a service here
        descriptor.name && descriptor.name.length ? descriptor.name : "Method" + unnamedMethodIndex++,
        "rpc",
        descriptor.inputType,
        descriptor.outputType,
        Boolean(descriptor.clientStreaming),
        Boolean(descriptor.serverStreaming)
    );
};

/**
 * Converts a method to a descriptor.
 * @returns {Message<IMethodDescriptorProto>} Descriptor
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Method.prototype.toDescriptor = function toDescriptor() {
    return google.MethodDescriptorProto.create({
        name: this.name,
        inputType: this.resolvedRequestType ? this.resolvedRequestType.fullName : this.requestType,
        outputType: this.resolvedResponseType ? this.resolvedResponseType.fullName : this.responseType,
        clientStreaming: this.requestStream,
        serverStreaming: this.responseStream
    });
};
