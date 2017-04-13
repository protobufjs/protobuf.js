"use strict";
var $protobuf = require("../..");
module.exports = exports = $protobuf.descriptor = $protobuf.Root.fromJSON(require("../../google/protobuf/descriptor.json")).lookup(".google.protobuf");

var Namespace = $protobuf.Namespace,
    Root      = $protobuf.Root,
    Enum      = $protobuf.Enum,
    Type      = $protobuf.Type,
    Field     = $protobuf.Field,
    MapField  = $protobuf.MapField,
    OneOf     = $protobuf.OneOf,
    Service   = $protobuf.Service,
    Method    = $protobuf.Method;

// --- Root ---

/**
 * Properties of a FileDescriptorSet message.
 * @typedef FileDescriptorSetProperties
 * @type {Object}
 * @property {FileDescriptorProtoProperties[]} file Files
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

/**
 * Properties of a FileDescriptorProto message.
 * @typedef FileDescriptorProtoProperties
 * @type {Object}
 * @property {string} [name] File name
 * @property {string} [package] Package
 * @property {*} [dependency] Not supported
 * @property {*} [publicDependency] Not supported
 * @property {*} [weakDependency] Not supported
 * @property {DescriptorProtoProperties[]} [messageType] Nested message types
 * @property {EnumDescriptorProtoProperties[]} [enumType] Nested enums
 * @property {ServiceDescriptorProtoProperties[]} [service] Nested services
 * @property {FieldDescriptorProtoProperties[]} [extension] Nested extension fields
 * @property {*} [options] Not supported
 * @property {*} [sourceCodeInfo] Not supported
 * @property {string} [syntax="proto2"] Syntax
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

/**
 * Creates a root from a descriptor set.
 * @param {FileDescriptorSetProperties|Reader|Uint8Array} descriptor Descriptor
 * @returns {Root} Root instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Root.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = exports.FileDescriptorSet.decode(descriptor);

    var root = new Root();

    if (descriptor.file) {
        var fileDescriptor,
            filePackage;
        for (var j = 0, i; j < descriptor.file.length; ++j) {
            filePackage = root;
            if ((fileDescriptor = descriptor.file[j])["package"] && fileDescriptor["package"].length)
                filePackage = root.define(fileDescriptor["package"]);
            if (fileDescriptor.name && fileDescriptor.name.length)
                root.files.push(filePackage.filename = fileDescriptor.name);
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

// Traverses a namespace and assembles the descriptor set
function traverseNamespace(ns, files, syntax) {

    // Create a new file
    var file = exports.FileDescriptorProto.create({ name: ns.filename || (ns.fullName.substring(1).replace(/\./g, "_") || "root") + ".proto" });
    if (syntax)
        file.syntax = syntax;
    if (!(ns instanceof Root))
        file["package"] = ns.fullName.substring(1);

    // Add nested types
    for (var i = 0, nested; i < ns.nestedArray.length; ++i)
        if ((nested = ns._nestedArray[i]) instanceof Type)
            file.messageType.push(nested.toDescriptor(syntax));
        else if (nested instanceof Enum)
            file.enumType.push(nested.toDescriptor());
        else if (nested instanceof Field)
            file.extension.push(nested.toDescriptor(syntax));
        else if (nested instanceof Service)
            file.service.push(nested.toDescriptor());
        else if (nested instanceof /* plain */ Namespace)
            traverseNamespace(nested, files, syntax); // requires new file

    // And keep the file only if there is at least one nested object
    if (file.messageType.length + file.enumType.length + file.extension.length + file.service.length)
        files.push(file);
}

/**
 * Converts a root to a descriptor set.
 * @returns {Message<FileDescriptorSetProperties>} Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Root.prototype.toDescriptor = function toDescriptor(syntax) {
    var set = exports.FileDescriptorSet.create();
    traverseNamespace(this, set.file, syntax);
    return set;
};

// --- Type ---

/**
 * Properties of a DescriptorProto message.
 * @typedef DescriptorProtoProperties
 * @type {Object}
 * @property {string} [name] Message type name
 * @property {FieldDescriptorProtoProperties[]} [field] Fields
 * @property {FieldDescriptorProtoProperties[]} [extension] Extension fields
 * @property {DescriptorProtoProperties[]} [nestedType] Nested message types
 * @property {EnumDescriptorProtoProperties[]} [enumType] Nested enums
 * @property {ExtensionRangeProperties[]} [extensionRange] Extension ranges
 * @property {OneofDescriptorProtoProperties[]} [oneofDecl] Oneofs
 * @property {MessageOptionsProperties} [options] Not supported
 * @property {ReservedRangeProperties[]} [reservedRange] Reserved ranges
 * @property {string[]} [reservedName] Reserved names
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

/**
 * Properties of a MessageOptions message.
 * @typedef MessageOptionsProperties
 * @type {Object}
 * @property {boolean} [mapEntry=false] Whether this message is a map entry
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

/**
 * Properties of an ExtensionRange message.
 * @typedef ExtensionRangeProperties
 * @type {Object}
 * @property {number} [start] Start field id
 * @property {number} [end] End field id
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

/**
 * Properties of a ReservedRange message.
 * @typedef ReservedRangeProperties
 * @type {Object}
 * @property {number} [start] Start field id
 * @property {number} [end] End field id
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

var unnamedMessageIndex = 0;

/**
 * Creates a type from a descriptor.
 * @param {DescriptorProtoProperties|Reader|Uint8Array} descriptor Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @returns {Type} Type instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Type.fromDescriptor = function fromDescriptor(descriptor, syntax) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = exports.DescriptorProto.decode(descriptor);

    // Create the message type
    var type = new Type(descriptor.name.length ? descriptor.name : "Type" + unnamedMessageIndex++),
        i;

    /* Fields */ if (descriptor.field)
        for (i = 0; i < descriptor.field.length; ++i)
            type.add(Field.fromDescriptor(descriptor.field[i], syntax));
    /* Extension fields */ if (descriptor.extension)
        for (i = 0; i < descriptor.extension.length; ++i)
            type.add(Field.fromDescriptor(descriptor.extension[i], syntax));
    /* Oneofs */ if (descriptor.oneofDecl)
        for (i = 0; i < descriptor.oneofDecl.length; ++i)
            type.add(OneOf.fromDescriptor(descriptor.oneofDecl[i]));
    /* Nested types */ if (descriptor.nestedType)
        for (i = 0; i < descriptor.nestedType.length; ++i) {
            type.add(Type.fromDescriptor(descriptor.nestedType[i], syntax));
            if (descriptor.nestedType[i].options && descriptor.nestedType[i].options.mapEntry)
                type.setOption("map_entry", true);
        }
    /* Nested enums */ if (descriptor.enumType)
        for (i = 0; i < descriptor.enumType.length; ++i)
            type.add(Enum.fromDescriptor(descriptor.enumType[i]));
    /* Extension ranges */ if (descriptor.extensionRange && descriptor.extensionRange.length) {
        type.extensions = [];
        for (i = 0; i < descriptor.extensionRange.length; ++i)
            type.extensions.push([ descriptor.extensionRange[i].start, descriptor.extensionRange[i].end ]);
    }
    /* Reserved... */ if (descriptor.reservedRange && descriptor.reservedRange.length || descriptor.reservedName && descriptor.reservedName.length) {
        type.reserved = [];
        /* Ranges */ if (descriptor.reservedRange)
            for (i = 0; i < descriptor.reservedRange.length; ++i)
                type.reserved.push([ descriptor.reservedRange[i].start, descriptor.reservedRange[i].end ]);
        /* Names */ if (descriptor.reservedName)
            for (i = 0; i < descriptor.reservedName.length; ++i)
                type.reserved.push(descriptor.reservedName[i]);
    }

    return type;
};

/**
 * Converts a type to a descriptor.
 * @returns {Message<DescriptorProtoProperties>} Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Type.prototype.toDescriptor = function toDescriptor(syntax) {
    var descriptor = exports.DescriptorProto.create({ name: this.name }),
        i;

    /* Fields */ for (i = 0; i < this.fieldsArray.length; ++i) {
        descriptor.field.push(this._fieldsArray[i].toDescriptor(syntax));
        if (this._fieldsArray[i] instanceof MapField) { // map fields are repeated FieldNameEntry
            var keyType = toDescriptorType(this._fieldsArray[i].keyType, this._fieldsArray[i].resolvedKeyType),
                valueType = toDescriptorType(this._fieldsArray[i].type, this._fieldsArray[i].resolvedType),
                valueTypeName = valueType === 11 || valueType === 14
                    ? this._fieldsArray[i].resolvedType && this._fieldsArray[i].resolvedType.fullName || this._fieldsArray[i].type
                    : undefined;
            descriptor.nestedType.push(exports.DescriptorProto.create({
                name: descriptor.field[descriptor.field.length - 1].type_name,
                field: [
                    exports.FieldDescriptorProto.create({ name: "key", number: 1, label: 1, type: keyType }), // can't be message
                    exports.FieldDescriptorProto.create({ name: "value", number: 2, label: 1, type: valueType, typeName: valueTypeName })
                ],
                options: exports.MessageOptions({ mapEntry: true })
            }));
        }
    }
    /* Nested... */ for (i = 0; i < this.nestedArray.length; ++i) {
        /* Extension fields */ if (this._nestedArray[i] instanceof Field)
            descriptor.field.push(this._nestedArray[i].toDescriptor(syntax));
        /* Oneofs */ else if (this._nestedArray[i] instanceof OneOf)
            descriptor.oneofDecl.push(this._nestedArray[i].toDescriptor());
        /* Types */ else if (this._nestedArray[i] instanceof Type)
            descriptor.nestedType.push(this._nestedArray[i].toDescriptor(syntax));
        /* Enums */ else if (this._nestedArray[i] instanceof Enum)
            descriptor.enumType.push(this._nestedArray[i].toDescriptor());
        // plain nested namespaces become packages instead in Root#toDescriptor
    }
    /* Extension ranges */ if (this.extensions)
        for (i = 0; i < this.extensions.length; ++i)
            descriptor.extensionRange.push(exports.DescriptorProto.ExtensionRange.create({ start: this.extensions[i][0], end: this.extensions[i][1] }));
    /* Reserved... */ if (this.reserved)
        for (i = 0; i < this.reserved.length; ++i)
            /* Names */ if (typeof this.reserved[i] === "string")
                descriptor.reservedName.push(this.reserved[i]);
            /* Ranges */ else
                descriptor.reservedRange.push(exports.DescriptorProto.ReservedRange.create({ start: this.reserved[i][0], end: this.reserved[i][1] }));

    if (this.options && this.options.map_entry)
        descriptor.options = exports.MessageOptions.create({ map_entry: true });

    return descriptor;
};

// --- Field ---

/**
 * Properties of a FieldDescriptorProto message.
 * @typedef FieldDescriptorProtoProperties
 * @type {Object}
 * @property {string} [name] Field name
 * @property {number} [number] Field id
 * @property {FieldDescriptorProtoLabel} [label] Field rule
 * @property {FieldDescriptorProtoType} [type] Field basic type
 * @property {string} [typeName] Field type name
 * @property {string} [extendee] Extended type name
 * @property {*} [defaultValue] Not supported
 * @property {number} [oneofIndex] Oneof index if part of a oneof
 * @property {*} [jsonName] Not supported
 * @property {FieldOptionsProperties} [options] Field options
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

/**
 * Values of the FieldDescriptorProto.Label enum.
 * @typedef FieldDescriptorProtoLabel
 * @type {number}
 * @property {number} LABEL_OPTIONAL=1
 * @property {number} LABEL_REQUIRED=2
 * @property {number} LABEL_REPEATED=3
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

/**
 * Values of the FieldDescriptorProto.Type enum.
 * @typedef FieldDescriptorProtoType
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
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

/**
 * Properties of a FieldOptions message.
 * @typedef FieldOptionsProperties
 * @type {Object}
 * @property {boolean} [packed] Whether packed or not (defaults to `false` for proto2 and `true` for proto3)
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

// Converts a descriptor type to a protobuf.js basic type
function fromDescriptorType(type) {
    switch (type) {
        // 0 is reserved for errors
        case 1: return "double";
        case 2: return "float";
        case 3: return "int64";
        case 4: return "uint64";
        case 5: return "int32";
        case 6: return "fixed64";
        case 7: return "fixed32";
        case 8: return "bool";
        case 9: return "string";
        case 12: return "bytes";
        case 13: return "uint32";
        case 15: return "sfixed32";
        case 16: return "sfixed64";
        case 17: return "sint32";
        case 18: return "sint64";
    }
    throw Error("illegal type: " + type);
}

// Tests if a descriptor type is packable
function packableDescriptorType(type) {
    switch (type) {
        case 1: // double
        case 2: // float
        case 3: // int64
        case 4: // uint64
        case 5: // int32
        case 6: // fixed64
        case 7: // fixed32
        case 8: // bool
        case 13: // uint32
        case 14: // enum (!)
        case 15: // sfixed32
        case 16: // sfixed64
        case 17: // sint32
        case 18: // sint64
            return true;
    }
    return false;
}

/**
 * Creates a field from a descriptor.
 * @param {FieldDescriptorProtoProperties|Reader|Uint8Array} descriptor Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @returns {Field} Field instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Field.fromDescriptor = function fromDescriptor(descriptor, syntax) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = exports.DescriptorProto.decode(descriptor);

    if (typeof descriptor.number !== "number")
        throw Error("missing field id");

    // Rewire field type
    var fieldType;
    if (descriptor.typeName && descriptor.typeName.length)
        fieldType = descriptor.typeName;
    else
        fieldType = fromDescriptorType(descriptor.type);

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

    if (packableDescriptorType(descriptor.type)) {
        if (syntax === "proto3") { // defaults to packed=true (internal preset is packed=true)
            if (descriptor.options && !descriptor.options.packed)
                field.setOption("packed", false);
        } else if (!(descriptor.options && descriptor.options.packed)) // defaults to packed=false
            field.setOption("packed", false);
    }

    return field;
};

// Converts a protobuf.js basic type to a descriptor type
function toDescriptorType(type, resolvedType) {
    switch (type) {
        // 0 is reserved for errors
        case "double": return 1;
        case "float": return 2;
        case "int64": return 3;
        case "uint64": return 4;
        case "int32": return 5;
        case "fixed64": return 6;
        case "fixed32": return 7;
        case "bool": return 8;
        case "string": return 9;
        case "bytes": return 12;
        case "uint32": return 13;
        case "sfixed32": return 15;
        case "sfixed64": return 16;
        case "sint32": return 17;
        case "sint64": return 18;
    }
    if (resolvedType instanceof Enum)
        return 14;
    if (resolvedType instanceof Type)
        return resolvedType.group ? 10 : 11;
    throw Error("illegal type: " + type);
}

/**
 * Converts a field to a descriptor.
 * @returns {Message<FieldDescriptorProtoProperties>} Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Field.prototype.toDescriptor = function toDescriptor(syntax) {
    var descriptor = exports.FieldDescriptorProto.create({ name: this.name, number: this.id });

    if (this.map) {

        descriptor.type = 11; // message
        descriptor.typeName = $protobuf.util.ucFirst(this.name); // fieldName -> FieldNameEntry (built in Type#toDescriptor)
        descriptor.label = 3; // repeated

    } else {

        // Rewire field type
        switch (descriptor.type = toDescriptorType(this.type, this.resolve().resolvedType)) {
            case 10: // group
            case 11: // type
            case 14: // enum
                descriptor.typeName = this.resolvedType ? this.resolvedType.fullName : this.type;
                break;
        }

        // Rewire field rule
        switch (this.rule) {
            case "repeated": descriptor.label = 3; break;
            case "required": descriptor.label = 2; break;
            default: descriptor.label = 1; break;
        }

    }

    // Handle extension field
    descriptor.extendee = this.extensionField ? this.extensionField.parent.fullName : this.extend;

    // Handle part of oneof
    if (this.partOf)
        if ((descriptor.oneofIndex = this.parent.oneofsArray.indexOf(this.partOf)) < 0)
            throw Error("missing oneof");

    if (syntax === "proto3") { // defaults to packed=true
        if (!this.packed)
            descriptor.options = exports.FieldOptions.create({ packed: false });
    } else if (this.packed) // defaults to packed=false
        descriptor.options = exports.FieldOptions.create({ packed: true });

    return descriptor;
};

// --- Enum ---

/**
 * Properties of an EnumDescriptorProto message.
 * @typedef EnumDescriptorProtoProperties
 * @type {Object}
 * @property {string} [name] Enum name
 * @property {EnumValueDescriptorProtoProperties[]} [value] Enum values
 * @property {EnumOptionsProperties} [options] Enum options
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

/**
 * Properties of an EnumValueDescriptorProto message.
 * @typedef EnumValueDescriptorProtoProperties
 * @type {Object}
 * @property {string} [name] Name
 * @property {number} [number] Value
 * @property {*} [options] Not supported
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

/**
 * Properties of an EnumOptions message.
 * @typedef EnumOptionsProperties
 * @type {Object}
 * @property {boolean} [allowAlias] Whether aliases are allowed
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

var unnamedEnumIndex = 0;

/**
 * Creates an enum from a descriptor.
 * @param {EnumDescriptorProtoProperties|Reader|Uint8Array} descriptor Descriptor
 * @returns {Enum} Enum instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Enum.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = exports.EnumDescriptorProto.decode(descriptor);

    // Construct values object
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
 * @returns {Message<EnumDescriptorProtoProperties>} Descriptor
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Enum.prototype.toDescriptor = function toDescriptor() {

    // Values
    var values = [];
    for (var i = 0, ks = Object.keys(this.values); i < ks.length; ++i)
        values.push(exports.EnumValueDescriptorProto.create({ name: ks[i], number: this.values[ks[i]] }));

    return exports.EnumDescriptorProto.create({
        name: this.name,
        value: values
    });
};

// --- OneOf ---

/**
 * Properties of a OneofDescriptorProto message.
 * @typedef OneofDescriptorProtoProperties
 * @type {Object}
 * @property {string} [name] Oneof name
 * @property {*} [options] Not supported
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

var unnamedOneofIndex = 0;

/**
 * Creates a oneof from a descriptor.
 * @param {OneofDescriptorProtoProperties|Reader|Uint8Array} descriptor Descriptor
 * @returns {OneOf} OneOf instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
OneOf.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = exports.OneofDescriptorProto.decode(descriptor);

    return new OneOf(
        // unnamedOneOfIndex is global, not per type, because we have no ref to a type here
        descriptor.name && descriptor.name.length ? descriptor.name : "oneof" + unnamedOneofIndex++
    );
};

/**
 * Converts a oneof to a descriptor.
 * @returns {Message<OneofDescriptorProtoProperties>} Descriptor
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
OneOf.prototype.toDescriptor = function toDescriptor() {
    return exports.OneofDescriptorProto.create({
        name: this.name
    });
};

// --- Service ---

/**
 * Properties of a ServiceDescriptorProto message.
 * @typedef ServiceDescriptorProtoProperties
 * @type {Object}
 * @property {string} [name] Service name
 * @property {MethodDescriptorProtoProperties[]} [method] Methods
 * @property {*} [options] Not supported
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

var unnamedServiceIndex = 0;

/**
 * Creates a service from a descriptor.
 * @param {ServiceDescriptorProtoProperties|Reader|Uint8Array} descriptor Descriptor
 * @returns {Service} Service instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Service.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = exports.ServiceDescriptorProto.decode(descriptor);

    var service = new Service(descriptor.name && descriptor.name.length ? descriptor.name : "Service" + unnamedServiceIndex++);
    if (descriptor.method)
        for (var i = 0; i < descriptor.method.length; ++i)
            service.add(Method.fromDescriptor(descriptor.method[i]));

    return service;
};

/**
 * Converts a service to a descriptor.
 * @returns {Message<ServiceDescriptorProtoProperties>} Descriptor
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Service.prototype.toDescriptor = function toDescriptor() {

    // Methods
    var methods = [];
    for (var i = 0; i < this.methodsArray; ++i)
        methods.push(this._methodsArray[i].toDescriptor());

    return exports.ServiceDescriptorProto.create({
        name: this.name,
        methods: methods
    });
};

// --- Method ---

/**
 * Properties of a MethodDescriptorProto message.
 * @typedef MethodDescriptorProtoProperties
 * @type {Object}
 * @property {string} [name] Method name
 * @property {string} [inputType] Request type name
 * @property {string} [outputType] Response type name
 * @property {*} [options] Not supported
 * @property {boolean} [clientStreaming=false] Whether requests are streamed
 * @property {boolean} [serverStreaming=false] Whether responses are streamed
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */

var unnamedMethodIndex = 0;

/**
 * Creates a method from a descriptor.
 * @param {MethodDescriptorProtoProperties|Reader|Uint8Array} descriptor Descriptor
 * @returns {Method} Reflected method instance
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Method.fromDescriptor = function fromDescriptor(descriptor) {

    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number")
        descriptor = exports.MethodDescriptorProto.decode(descriptor);

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
 * @returns {Message<MethodDescriptorProtoProperties>} Descriptor
 * @see Part of the {@link descriptor} extension (ext/descriptor)
 */
Method.prototype.toDescriptor = function toDescriptor() {
    return exports.MethodDescriptorProto.create({
        name: this.name,
        inputType: this.resolvedRequestType ? this.resolvedRequestType.fullName : this.requestType,
        outputType: this.resolvedResponseType ? this.resolvedResponseType.fullName : this.responseType,
        clientStreaming: this.requestStream,
        serverStreaming: this.responseStream
    });
};

// --- exports ---

/**
 * Reflected file descriptor set.
 * @name FileDescriptorSet
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected file descriptor proto.
 * @name FileDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected descriptor proto.
 * @name DescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected field descriptor proto.
 * @name FieldDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected oneof descriptor proto.
 * @name OneofDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected enum descriptor proto.
 * @name EnumDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected service descriptor proto.
 * @name ServiceDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected enum value descriptor proto.
 * @name EnumValueDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected method descriptor proto.
 * @name MethodDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected file options.
 * @name FileOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected message options.
 * @name MessageOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected field options.
 * @name FieldOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected oneof options.
 * @name OneofOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected enum options.
 * @name EnumOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected enum value options.
 * @name EnumValueOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected service options.
 * @name ServiceOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected method options.
 * @name MethodOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected uninterpretet option.
 * @name UninterpretedOption
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected source code info.
 * @name SourceCodeInfo
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */

/**
 * Reflected generated code info.
 * @name GeneratedCodeInfo
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */
