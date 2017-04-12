import * as $protobuf from "../..";

declare const descriptor: $protobuf.Namespace;

interface IFileDescriptorSet {
    file: IFileDescriptorProto[];
}

interface IFileDescriptorProto {
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

interface IDescriptorProto {
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

interface IMessageOptions {
    mapEntry?: boolean;
}

interface IExtensionRange {
    start?: number;
    end?: number;
}

interface IReservedRange {
    start?: number;
    end?: number;
}

interface IFieldOptions {
    packed?: boolean;
}

interface IFieldDescriptorProto {
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

interface IEnumDescriptorProto {
    name?: string;
    value?: IEnumValueDescriptorProto[];
    options?: IEnumOptions;
}

interface IEnumValueDescriptorProto {
    name?: string;
    number?: number;
    options?: any;
}

interface IEnumOptions {
    allowAlias?: boolean;
}

interface IOneofDescriptorProto {
    name?: string;
    options?: any;
}

interface IServiceDescriptorProto {
    name?: string;
    method?: IMethodDescriptorProto[];
    options?: any;
}

interface IMethodDescriptorProto {
    name?: string;
    inputType?: string;
    outputType?: string;
    options?: any;
    clientStreaming?: boolean;
    serverStreaming?: boolean;
}

export = descriptor;
