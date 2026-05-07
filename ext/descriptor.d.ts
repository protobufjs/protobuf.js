import * as $protobuf from "..";

type DescriptorInput<T> = T | $protobuf.Reader | Uint8Array;

declare module ".." {
    namespace Root {
        /** Creates a root from a descriptor set. */
        function fromDescriptor(descriptor: DescriptorInput<IFileDescriptorSet>): $protobuf.Root;
    }

    interface Root {
        /** Converts this root to a descriptor set. */
        toDescriptor(edition?: string): $protobuf.Message<IFileDescriptorSet> & IFileDescriptorSet;
    }

    namespace Type {
        /** Creates a type from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IDescriptorProto>, edition?: string, nested?: boolean): $protobuf.Type;
    }

    interface Type {
        /** Converts this type to a descriptor. */
        toDescriptor(edition?: string): $protobuf.Message<IDescriptorProto> & IDescriptorProto;
    }

    namespace Field {
        /** Creates a field from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IFieldDescriptorProto>, edition?: string, nested?: boolean): $protobuf.Field;
    }

    interface Field {
        /** Converts this field to a descriptor. */
        toDescriptor(edition?: string): $protobuf.Message<IFieldDescriptorProto> & IFieldDescriptorProto;
    }

    namespace Enum {
        /** Creates an enum from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IEnumDescriptorProto>, edition?: string, nested?: boolean): $protobuf.Enum;
    }

    interface Enum {
        /** Converts this enum to a descriptor. */
        toDescriptor(): $protobuf.Message<IEnumDescriptorProto> & IEnumDescriptorProto;
    }

    namespace OneOf {
        /** Creates a oneof from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IOneofDescriptorProto>): $protobuf.OneOf;
    }

    interface OneOf {
        /** Converts this oneof to a descriptor. */
        toDescriptor(): $protobuf.Message<IOneofDescriptorProto> & IOneofDescriptorProto;
    }

    namespace Service {
        /** Creates a service from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IServiceDescriptorProto>, edition?: string, nested?: boolean): $protobuf.Service;
    }

    interface Service {
        /** Converts this service to a descriptor. */
        toDescriptor(): $protobuf.Message<IServiceDescriptorProto> & IServiceDescriptorProto;
    }

    namespace Method {
        /** Creates a method from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IMethodDescriptorProto>): $protobuf.Method;
    }

    interface Method {
        /** Converts this method to a descriptor. */
        toDescriptor(): $protobuf.Message<IMethodDescriptorProto> & IMethodDescriptorProto;
    }
}

export const FileDescriptorSet: $protobuf.Type;

export const FileDescriptorProto: $protobuf.Type;

export const DescriptorProto: $protobuf.Type & {
    ExtensionRange: $protobuf.Type,
    ReservedRange: $protobuf.Type
};

export const FieldDescriptorProto: $protobuf.Type & {
    Label: $protobuf.Enum,
    Type: $protobuf.Enum
};

export const OneofDescriptorProto: $protobuf.Type;

export const EnumDescriptorProto: $protobuf.Type;

export const ServiceDescriptorProto: $protobuf.Type;

export const EnumValueDescriptorProto: $protobuf.Type;

export const MethodDescriptorProto: $protobuf.Type;

export const FileOptions: $protobuf.Type & {
    OptimizeMode: $protobuf.Enum
};

export const MessageOptions: $protobuf.Type;

export const FieldOptions: $protobuf.Type & {
    CType: $protobuf.Enum,
    JSType: $protobuf.Enum
};

export const OneofOptions: $protobuf.Type;

export const EnumOptions: $protobuf.Type;

export const EnumValueOptions: $protobuf.Type;

export const ServiceOptions: $protobuf.Type;

export const MethodOptions: $protobuf.Type;

export const UninterpretedOption: $protobuf.Type & {
    NamePart: $protobuf.Type
};

export const SourceCodeInfo: $protobuf.Type & {
    Location: $protobuf.Type
};

export const GeneratedCodeInfo: $protobuf.Type & {
    Annotation: $protobuf.Type
};

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
    edition?: IEdition;
}

type IEdition = number;

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
    options?: IFieldOptions;
    proto3Optional?: boolean;
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
