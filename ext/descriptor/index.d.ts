import * as $protobuf from "../..";

type FileDescriptorSetProperties = {
    file: FileDescriptorProtoProperties[];
};

type FileDescriptorProtoProperties = {
    name?: string;
    package?: string;
    dependency?: any;
    publicDependency?: any;
    weakDependency?: any;
    messageType?: DescriptorProtoProperties[];
    enumType?: EnumDescriptorProtoProperties[];
    service?: ServiceDescriptorProtoProperties[];
    extension?: FieldDescriptorProtoProperties[];
    options?: any;
    sourceCodeInfo?: any;
    syntax?: string;
};

type DescriptorProtoProperties = {
    name?: string;
    field?: FieldDescriptorProtoProperties[];
    extension?: FieldDescriptorProtoProperties[];
    nestedType?: DescriptorProtoProperties[];
    enumType?: EnumDescriptorProtoProperties[];
    extensionRange?: ExtensionRangeProperties[];
    oneofDecl?: OneofDescriptorProtoProperties[];
    options?: MessageOptionsProperties;
    reservedRange?: ReservedRangeProperties[];
    reservedName?: string[];
};

type MessageOptionsProperties = {
    mapEntry?: boolean;
};

type ExtensionRangeProperties = {
    start?: number;
    end?: number;
};

type ReservedRangeProperties = {
    start?: number;
    end?: number;
};

type FieldOptionsProperties = {
    packed?: boolean;
};

type FieldDescriptorProtoProperties = {
    name?: string;
    number?: number;
    label?: FieldDescriptorProtoLabel;
    type?: FieldDescriptorProtoType;
    typeName?: string;
    extendee?: string;
    defaultValue?: any;
    oneofIndex?: number;
    jsonName?: any;
    options?: FieldOptionsProperties;
};

type FieldDescriptorProtoLabel = number;

type FieldDescriptorProtoType = number;

type EnumDescriptorProtoProperties = {
    name?: string;
    value?: EnumValueDescriptorProtoProperties[];
    options?: EnumOptionsProperties;
};

type EnumValueDescriptorProtoProperties = {
    name?: string;
    number?: number;
    options?: any;
};

type EnumOptionsProperties = {
    allowAlias?: boolean;
};

type OneofDescriptorProtoProperties = {
    name?: string;
    options?: any;
};

type ServiceDescriptorProtoProperties = {
    name?: string;
    method?: MethodDescriptorProtoProperties[];
    options?: any;
};

type MethodDescriptorProtoProperties = {
    name?: string;
    inputType?: string;
    outputType?: string;
    options?: any;
    clientStreaming?: boolean;
    serverStreaming?: boolean;
};
export const FileDescriptorSet: $protobuf.Type;
export const FileDescriptorProto: $protobuf.Type;
export const DescriptorProto: $protobuf.Type;
export const FieldDescriptorProto: $protobuf.Type;
export const OneofDescriptorProto: $protobuf.Type;
export const EnumDescriptorProto: $protobuf.Type;
export const ServiceDescriptorProto: $protobuf.Type;
export const EnumValueDescriptorProto: $protobuf.Type;
export const MethodDescriptorProto: $protobuf.Type;
export const FileOptions: $protobuf.Type;
export const MessageOptions: $protobuf.Type;
export const FieldOptions: $protobuf.Type;
export const OneofOptions: $protobuf.Type;
export const EnumOptions: $protobuf.Type;
export const EnumValueOptions: $protobuf.Type;
export const ServiceOptions: $protobuf.Type;
export const MethodOptions: $protobuf.Type;
export const UninterpretedOption: $protobuf.Type;
export const SourceCodeInfo: $protobuf.Type;
export const GeneratedCodeInfo: $protobuf.Type;
