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
    options?: any;
    sourceCodeInfo?: any;
    syntax?: string;
}

export interface IDescriptorProto {
    name?: string;
    field?: IFieldDescriptorProto[];
    extension?: IFieldDescriptorProto[];
    nestedType?: IDescriptorProto[];
    enumType?: IEnumDescriptorProto[];
    extensionRange?: IExtensionRange[];
    oneofDecl?: IOneofDescriptorProto[];
    options?: IMessageOptions;
    reservedRange?: IReservedRange[];
    reservedName?: string[];
}

export interface IMessageOptions {
    mapEntry?: boolean;
}

export interface IExtensionRange {
    start?: number;
    end?: number;
}

export interface IReservedRange {
    start?: number;
    end?: number;
}

export interface IFieldOptions {
    packed?: boolean;
}

export interface IFieldDescriptorProto {
    name?: string;
    number?: number;
    label?: IFieldDescriptorProto_Label;
    type?: IFieldDescriptorProto_Type;
    typeName?: string;
    extendee?: string;
    defaultValue?: any;
    oneofIndex?: number;
    jsonName?: any;
    options?: IFieldOptions;
}

type IFieldDescriptorProto_Label = number;

type IFieldDescriptorProto_Type = number;

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
}

export interface IOneofDescriptorProto {
    name?: string;
    options?: any;
}

export interface IServiceDescriptorProto {
    name?: string;
    method?: IMethodDescriptorProto[];
    options?: any;
}

export interface IMethodDescriptorProto {
    name?: string;
    inputType?: string;
    outputType?: string;
    options?: any;
    clientStreaming?: boolean;
    serverStreaming?: boolean;
}
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
