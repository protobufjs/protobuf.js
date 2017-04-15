import * as $protobuf from "../..";

export interface IFileDescriptorSet {
    file: IFileDescriptorProto[];
}

export interface IFileDescriptorProto {
    name?: string;
    package?: string;
    dependency?: any;
    publicDependency?: any;
    weakDependency?: any;
    messageType?: IDescriptorProto[];
    enumType?: IEnumDescriptorProto[];
    service?: IServiceDescriptorProto[];
    extension?: IFieldDescriptorProto[];
    options?: IFileOptions;
    sourceCodeInfo?: any;
    syntax?: string;
}

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

type IFileOptionsOptimizeMode = number;

export interface IDescriptorProto {
    name?: string;
    field?: IFieldDescriptorProto[];
    extension?: IFieldDescriptorProto[];
    nestedType?: IDescriptorProto[];
    enumType?: IEnumDescriptorProto[];
    extensionRange?: IDescriptorProtoExtensionRange[];
    oneofDecl?: IOneofDescriptorProto[];
    options?: IMessageOptions;
    reservedRange?: IDescriptorProtoReservedRange[];
    reservedName?: string[];
}

export interface IMessageOptions {
    mapEntry?: boolean;
}

export interface IDescriptorProtoExtensionRange {
    start?: number;
    end?: number;
}

export interface IDescriptorProtoReservedRange {
    start?: number;
    end?: number;
}

export interface IFieldDescriptorProto {
    name?: string;
    number?: number;
    label?: IFieldDescriptorProtoLabel;
    type?: IFieldDescriptorProtoType;
    typeName?: string;
    extendee?: string;
    defaultValue?: string;
    oneofIndex?: number;
    jsonName?: any;
    options?: IFieldOptionsProperties;
}

type IFieldDescriptorProtoLabel = number;

type IFieldDescriptorProtoType = number;

export interface IFieldOptions {
    packed?: boolean;
    jstype?: IFieldOptionsJSType;
}

type IFieldOptionsJSType = number;

export interface IEnumDescriptorProto {
    name?: string;
    value?: IEnumValueDescriptorProto[];
    options?: IEnumOptions;
}

export interface IEnumValueDescriptorProto {
    name?: string;
    number?: number;
    options?: any;
}

export interface IEnumOptions {
    allowAlias?: boolean;
    deprecated?: boolean;
}

export interface IOneofDescriptorProto {
    name?: string;
    options?: any;
}

export interface IServiceDescriptorProto {
    name?: string;
    method?: IMethodDescriptorProto[];
    options?: IServiceOptions;
}

export interface IServiceOptions {
    deprecated?: boolean;
}

export interface IMethodDescriptorProto {
    name?: string;
    inputType?: string;
    outputType?: string;
    options?: IMethodOptions;
    clientStreaming?: boolean;
    serverStreaming?: boolean;
}

export interface IMethodOptions {
    deprecated?: boolean;
}

export const FileDescriptorSet: $protobuf.Type;

export const FileDescriptorProto: $protobuf.Type;

export const DescriptorProto: $protobuf.Type;

export const DescriptorProtoExtensionRange: $protobuf.Type;

export const DescriptorProtoReservedRange: $protobuf.Type;

export const FieldDescriptorProto: $protobuf.Type;

export const FieldDescriptorProtoLabel: $protobuf.Enum;

export const FieldDescriptorProtoType: $protobuf.Enum;

export const OneofDescriptorProto: $protobuf.Type;

export const EnumDescriptorProto: $protobuf.Type;

export const ServiceDescriptorProto: $protobuf.Type;

export const EnumValueDescriptorProto: $protobuf.Type;

export const MethodDescriptorProto: $protobuf.Type;

export const FileOptions: $protobuf.Type;

export const FileOptionsOptimizeMode: $protobuf.Enum;

export const MessageOptions: $protobuf.Type;

export const FieldOptions: $protobuf.Type;

export const FieldOptionsCType: $protobuf.Enum;

export const FieldOptionsJSType: $protobuf.Enum;

export const OneofOptions: $protobuf.Type;

export const EnumOptions: $protobuf.Type;

export const EnumValueOptions: $protobuf.Type;

export const ServiceOptions: $protobuf.Type;

export const MethodOptions: $protobuf.Type;

export const UninterpretedOption: $protobuf.Type;

export const UninterpretedOptionNamePart: $protobuf.Type;

export const SourceCodeInfo: $protobuf.Type;

export const SourceCodeInfoLocation: $protobuf.Type;

export const GeneratedCodeInfo: $protobuf.Type;

export const GeneratedCodeInfoAnnotation: $protobuf.Type;
