import * as $protobuf from "../..";

type FileDescriptorSet$Properties = {
    file: FileDescriptorProto$Properties[];
};

type FileDescriptorProto$Properties = {
    name?: string;
    package?: string;
    dependency?: any;
    publicDependency?: any;
    weakDependency?: any;
    messageType?: DescriptorProto$Properties[];
    enumType?: EnumDescriptorProto$Properties[];
    service?: ServiceDescriptorProto$Properties[];
    extension?: FieldDescriptorProto$Properties[];
    options?: FileOptions$Properties;
    sourceCodeInfo?: any;
    syntax?: string;
};

type FileOptions$Properties = {
    javaPackage?: string;
    javaOuterClassname?: string;
    javaMultipleFiles?: boolean;
    javaGenerateEqualsAndHash?: boolean;
    javaStringCheckUtf8?: boolean;
    optimizeFor?: FileOptions$OptimizeMode;
    goPackage?: string;
    ccGenericServices?: boolean;
    javaGenericServices?: boolean;
    pyGenericServices?: boolean;
    deprecated?: boolean;
    ccEnableArenas?: boolean;
    objcClassPrefix?: string;
    csharpNamespace?: string;
};

type FileOptions$OptimizeMode = number;

type DescriptorProto$Properties = {
    name?: string;
    field?: FieldDescriptorProto$Properties[];
    extension?: FieldDescriptorProto$Properties[];
    nestedType?: DescriptorProto$Properties[];
    enumType?: EnumDescriptorProto$Properties[];
    extensionRange?: ExtensionRange$Properties[];
    oneofDecl?: OneofDescriptorProto$Properties[];
    options?: MessageOptions$Properties;
    reservedRange?: ReservedRange$Properties[];
    reservedName?: string[];
};

type MessageOptions$Properties = {
    mapEntry?: boolean;
};

type ExtensionRange$Properties = {
    start?: number;
    end?: number;
};

type ReservedRange$Properties = {
    start?: number;
    end?: number;
};

type FieldDescriptorProto$Properties = {
    name?: string;
    number?: number;
    label?: FieldDescriptorProto$Label;
    type?: FieldDescriptorProto$Type;
    typeName?: string;
    extendee?: string;
    defaultValue?: string;
    oneofIndex?: number;
    jsonName?: any;
    options?: FieldOptions$Properties;
};

type FieldDescriptorProto$Label = number;

type FieldDescriptorProto$Type = number;

type FieldOptions$Properties = {
    packed?: boolean;
    jstype?: FieldOptions$JSType;
};

type FieldOptions$JSType = number;

type EnumDescriptorProto$Properties = {
    name?: string;
    value?: EnumValueDescriptorProto$Properties[];
    options?: EnumOptions$Properties;
};

type EnumValueDescriptorProto$Properties = {
    name?: string;
    number?: number;
    options?: any;
};

type EnumOptions$Properties = {
    allowAlias?: boolean;
    deprecated?: boolean;
};

type OneofDescriptorProto$Properties = {
    name?: string;
    options?: any;
};

type ServiceDescriptorProto$Properties = {
    name?: string;
    method?: MethodDescriptorProto$Properties[];
    options?: ServiceOptions$Properties;
};

type ServiceOptions$Properties = {
    deprecated?: boolean;
};

type MethodDescriptorProto$Properties = {
    name?: string;
    inputType?: string;
    outputType?: string;
    options?: MethodOptions$Properties;
    clientStreaming?: boolean;
    serverStreaming?: boolean;
};

type MethodOptions$Properties = {
    deprecated?: boolean;
};

export const FileDescriptorSet: $protobuf.Type;

export const FileDescriptorProto: $protobuf.Type;

export const DescriptorProto: $protobuf.Type;

export const DescriptorProto_ExtensionRange: $protobuf.Type;

export const DescriptorProto_ReservedRange: $protobuf.Type;

export const FieldDescriptorProto: $protobuf.Type;

export const FieldDescriptorProto_Label: $protobuf.Enum;

export const FieldDescriptorProto_Type: $protobuf.Enum;

export const OneofDescriptorProto: $protobuf.Type;

export const EnumDescriptorProto: $protobuf.Type;

export const ServiceDescriptorProto: $protobuf.Type;

export const EnumValueDescriptorProto: $protobuf.Type;

export const MethodDescriptorProto: $protobuf.Type;

export const FileOptions: $protobuf.Type;

export const FileOptions_OptimizeMode: $protobuf.Enum;

export const MessageOptions: $protobuf.Type;

export const FieldOptions: $protobuf.Type;

export const FieldOptions_CType: $protobuf.Enum;

export const FieldOptions_JSType: $protobuf.Enum;

export const OneofOptions: $protobuf.Type;

export const EnumOptions: $protobuf.Type;

export const EnumValueOptions: $protobuf.Type;

export const ServiceOptions: $protobuf.Type;

export const MethodOptions: $protobuf.Type;

export const UninterpretedOption: $protobuf.Type;

export const UninterpretedOption_NamePart: $protobuf.Type;

export const SourceCodeInfo: $protobuf.Type;

export const SourceCodeInfo_Location: $protobuf.Type;

export const GeneratedCodeInfo: $protobuf.Type;

export const GeneratedCodeInfo_Annotation: $protobuf.Type;
