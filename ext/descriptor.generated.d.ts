// DO NOT EDIT! This is a generated file. Edit the source file instead and regenerate.

import * as $protobuf from "..";

/** Reflected file descriptor set. */
export const FileDescriptorSet: $protobuf.Type;

/** Reflected file descriptor proto. */
export const FileDescriptorProto: $protobuf.Type;

/** Reflected descriptor proto. */
export const DescriptorProto: $protobuf.Type & {
    ExtensionRange: $protobuf.Type,
    ReservedRange: $protobuf.Type
};

/** Reflected field descriptor proto. */
export const FieldDescriptorProto: $protobuf.Type & {
    Label: $protobuf.Enum,
    Type: $protobuf.Enum
};

/** Reflected oneof descriptor proto. */
export const OneofDescriptorProto: $protobuf.Type;

/** Reflected enum descriptor proto. */
export const EnumDescriptorProto: $protobuf.Type;

/** Reflected service descriptor proto. */
export const ServiceDescriptorProto: $protobuf.Type;

/** Reflected enum value descriptor proto. */
export const EnumValueDescriptorProto: $protobuf.Type;

/** Reflected method descriptor proto. */
export const MethodDescriptorProto: $protobuf.Type;

/** Reflected file options. */
export const FileOptions: $protobuf.Type & {
    OptimizeMode: $protobuf.Enum
};

/** Reflected message options. */
export const MessageOptions: $protobuf.Type;

/** Reflected field options. */
export const FieldOptions: $protobuf.Type & {
    CType: $protobuf.Enum,
    JSType: $protobuf.Enum
};

/** Reflected oneof options. */
export const OneofOptions: $protobuf.Type;

/** Reflected enum options. */
export const EnumOptions: $protobuf.Type;

/** Reflected enum value options. */
export const EnumValueOptions: $protobuf.Type;

/** Reflected service options. */
export const ServiceOptions: $protobuf.Type;

/** Reflected method options. */
export const MethodOptions: $protobuf.Type;

/** Reflected feature set. */
export const FeatureSet: $protobuf.Type & {
    FieldPresence: $protobuf.Enum,
    EnumType: $protobuf.Enum,
    RepeatedFieldEncoding: $protobuf.Enum,
    Utf8Validation: $protobuf.Enum,
    MessageEncoding: $protobuf.Enum,
    JsonFormat: $protobuf.Enum,
    EnforceNamingStyle: $protobuf.Enum,
    VisibilityFeature: $protobuf.Type
};

/** Reflected feature set defaults. */
export const FeatureSetDefaults: $protobuf.Type & {
    FeatureSetEditionDefault: $protobuf.Type
};

/** Reflected uninterpretet option. */
export const UninterpretedOption: $protobuf.Type & {
    NamePart: $protobuf.Type
};

/** Reflected source code info. */
export const SourceCodeInfo: $protobuf.Type & {
    Location: $protobuf.Type
};

/** Reflected generated code info. */
export const GeneratedCodeInfo: $protobuf.Type & {
    Annotation: $protobuf.Type
};

/** Properties of a FileDescriptorSet message. */
export interface IFileDescriptorSet {

    /** Files */
    file: IFileDescriptorProto[];
}

/** Properties of a FileDescriptorProto message. */
export interface IFileDescriptorProto {

    /** File name */
    name?: string;

    /** Package */
    package?: string;

    /** Not supported */
    dependency?: any;

    /** Not supported */
    publicDependency?: any;

    /** Not supported */
    weakDependency?: any;

    /** Nested message types */
    messageType?: IDescriptorProto[];

    /** Nested enums */
    enumType?: IEnumDescriptorProto[];

    /** Nested services */
    service?: IServiceDescriptorProto[];

    /** Nested extension fields */
    extension?: IFieldDescriptorProto[];

    /** Options */
    options?: IFileOptions;

    /** Not supported */
    sourceCodeInfo?: any;

    /** Syntax */
    syntax?: string;

    /** Edition */
    edition?: IEdition;
}

/** Values of the Edition enum. */
export type IEdition = number;

/** Properties of a FileOptions message. */
export interface IFileOptions {
    javaPackage?: string;
    javaOuterClassname?: string;
    javaMultipleFiles?: boolean;
    javaGenerateEqualsAndHash?: boolean;
    javaStringCheckUtf8?: boolean;
    optimizeFor?: IFileOptionsOptimizeMode;
    goPackage?: string;
    ccGenericServices?: boolean;
    javaGenericServices?: boolean;
    pyGenericServices?: boolean;
    deprecated?: boolean;
    ccEnableArenas?: boolean;
    objcClassPrefix?: string;
    csharpNamespace?: string;
}

/** Values of he FileOptions.OptimizeMode enum. */
export type IFileOptionsOptimizeMode = number;

/** Properties of a DescriptorProto message. */
export interface IDescriptorProto {

    /** Message type name */
    name?: string;

    /** Fields */
    field?: IFieldDescriptorProto[];

    /** Extension fields */
    extension?: IFieldDescriptorProto[];

    /** Nested message types */
    nestedType?: IDescriptorProto[];

    /** Nested enums */
    enumType?: IEnumDescriptorProto[];

    /** Extension ranges */
    extensionRange?: IDescriptorProtoExtensionRange[];

    /** Oneofs */
    oneofDecl?: IOneofDescriptorProto[];

    /** Not supported */
    options?: IMessageOptions;

    /** Reserved ranges */
    reservedRange?: IDescriptorProtoReservedRange[];

    /** Reserved names */
    reservedName?: string[];
}

/** Properties of a MessageOptions message. */
export interface IMessageOptions {

    /** Whether this message is a map entry */
    mapEntry?: boolean;
}

/** Properties of an ExtensionRange message. */
export interface IDescriptorProtoExtensionRange {

    /** Start field id */
    start?: number;

    /** End field id */
    end?: number;
}

/** Properties of a ReservedRange message. */
export interface IDescriptorProtoReservedRange {

    /** Start field id */
    start?: number;

    /** End field id */
    end?: number;
}

/** Properties of a FieldDescriptorProto message. */
export interface IFieldDescriptorProto {

    /** Field name */
    name?: string;

    /** Field id */
    number?: number;

    /** Field rule */
    label?: IFieldDescriptorProtoLabel;

    /** Field basic type */
    type?: IFieldDescriptorProtoType;

    /** Field type name */
    typeName?: string;

    /** Extended type name */
    extendee?: string;

    /** Literal default value */
    defaultValue?: string;

    /** Oneof index if part of a oneof */
    oneofIndex?: number;

    /** JSON name (lowerCamelCase) */
    jsonName?: string;

    /** Field options */
    options?: IFieldOptions;

    /** Whether this is a proto3 optional field */
    proto3Optional?: boolean;
}

/** Values of the FieldDescriptorProto.Label enum. */
export type IFieldDescriptorProtoLabel = number;

/** Values of the FieldDescriptorProto.Type enum. */
export type IFieldDescriptorProtoType = number;

/** Properties of a FieldOptions message. */
export interface IFieldOptions {

    /** Whether packed or not (defaults to `false` for proto2 and `true` for proto3) */
    packed?: boolean;

    /** JavaScript value type (not used by protobuf.js) */
    jstype?: IFieldOptionsJSType;
}

/** Values of the FieldOptions.JSType enum. */
export type IFieldOptionsJSType = number;

/** Properties of an EnumDescriptorProto message. */
export interface IEnumDescriptorProto {

    /** Enum name */
    name?: string;

    /** Enum values */
    value?: IEnumValueDescriptorProto[];

    /** Enum options */
    options?: IEnumOptions;
}

/** Properties of an EnumValueDescriptorProto message. */
export interface IEnumValueDescriptorProto {

    /** Name */
    name?: string;

    /** Value */
    number?: number;

    /** Enum value options */
    options?: IEnumValueOptions;
}

/** Properties of an EnumValueOptions message. */
export interface IEnumValueOptions {
    deprecated?: boolean;
    features?: IFeatureSet;
    debugRedact?: boolean;
    featureSupport?: any;
    uninterpretedOption?: any[];
}

/** Properties of an EnumOptions message. */
export interface IEnumOptions {

    /** Whether aliases are allowed */
    allowAlias?: boolean;
    deprecated?: boolean;
}

/** Properties of a FeatureSet message. */
export interface IFeatureSet {
    fieldPresence?: number;
    enumType?: number;
    repeatedFieldEncoding?: number;
    utf8Validation?: number;
    messageEncoding?: number;
    jsonFormat?: number;
    enforceNamingStyle?: number;
    defaultSymbolVisibility?: number;
}

/** Properties of a OneofDescriptorProto message. */
export interface IOneofDescriptorProto {

    /** Oneof name */
    name?: string;

    /** Oneof options */
    options?: IOneofOptions;
}

/** Properties of a OneofOptions message. */
export interface IOneofOptions {
    features?: IFeatureSet;
    uninterpretedOption?: any[];
}

/** Properties of a ServiceDescriptorProto message. */
export interface IServiceDescriptorProto {

    /** Service name */
    name?: string;

    /** Methods */
    method?: IMethodDescriptorProto[];

    /** Options */
    options?: IServiceOptions;
}

/** Properties of a ServiceOptions message. */
export interface IServiceOptions {
    deprecated?: boolean;
}

/** Properties of a MethodDescriptorProto message. */
export interface IMethodDescriptorProto {

    /** Method name */
    name?: string;

    /** Request type name */
    inputType?: string;

    /** Response type name */
    outputType?: string;

    /** Not supported */
    options?: IMethodOptions;

    /** Whether requests are streamed */
    clientStreaming?: boolean;

    /** Whether responses are streamed */
    serverStreaming?: boolean;
}

/**
 * Properties of a MethodOptions message.
 *
 * Warning: this is not safe to use with editions protos, since it discards relevant file context.
 *
 */
export interface IMethodOptions {
    deprecated?: boolean;
}
