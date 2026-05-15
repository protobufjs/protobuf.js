// DO NOT EDIT! This is a generated file. Edit the source file instead and regenerate.

import * as $protobuf from "..";

/** Values of he FileOptions.OptimizeMode enum. */
export type FileOptionsOptimizeMode = number;

/** Values of the FieldDescriptorProto.Label enum. */
export type FieldDescriptorProtoLabel = number;

/** Values of the FieldDescriptorProto.Type enum. */
export type FieldDescriptorProtoType = number;

/** Values of the FieldOptions.JSType enum. */
export type FieldOptionsJSType = number;

/** Reflected descriptor root. */
export const root: $protobuf.Root;

/** Reflected file descriptor set. */
export const FileDescriptorSet: $protobuf.Type;

export namespace FileDescriptorSet {

    /** Properties of a FileDescriptorSet message. */
    interface $Properties {

        /** Files */
        file: FileDescriptorProto.$Properties[];
    }
}

/** Reflected file descriptor proto. */
export const FileDescriptorProto: $protobuf.Type;

export namespace FileDescriptorProto {

    /** Properties of a FileDescriptorProto message. */
    interface $Properties {

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
        messageType?: DescriptorProto.$Properties[];

        /** Nested enums */
        enumType?: EnumDescriptorProto.$Properties[];

        /** Nested services */
        service?: ServiceDescriptorProto.$Properties[];

        /** Nested extension fields */
        extension?: FieldDescriptorProto.$Properties[];

        /** Options */
        options?: FileOptions.$Properties;

        /** Not supported */
        sourceCodeInfo?: any;

        /** Syntax */
        syntax?: string;

        /** Edition */
        edition?: Edition.$Value;
    }
}

/** Reflected descriptor proto. */
export const DescriptorProto: $protobuf.Type & {
    ExtensionRange: $protobuf.Type,
    ReservedRange: $protobuf.Type
};

export namespace DescriptorProto {

    /** Properties of a DescriptorProto message. */
    interface $Properties {

        /** Message type name */
        name?: string;

        /** Fields */
        field?: FieldDescriptorProto.$Properties[];

        /** Extension fields */
        extension?: FieldDescriptorProto.$Properties[];

        /** Nested message types */
        nestedType?: DescriptorProto.$Properties[];

        /** Nested enums */
        enumType?: EnumDescriptorProto.$Properties[];

        /** Extension ranges */
        extensionRange?: DescriptorProto.ExtensionRange.$Properties[];

        /** Oneofs */
        oneofDecl?: OneofDescriptorProto.$Properties[];

        /** Not supported */
        options?: MessageOptions.$Properties;

        /** Reserved ranges */
        reservedRange?: DescriptorProto.ReservedRange.$Properties[];

        /** Reserved names */
        reservedName?: string[];
    }

    /** Reflected extension range descriptor proto. */
    namespace ExtensionRange {

        /** Properties of an ExtensionRange message. */
        interface $Properties {

            /** Start field id */
            start?: number;

            /** End field id */
            end?: number;
        }
    }

    /** Reflected reserved range descriptor proto. */
    namespace ReservedRange {

        /** Properties of a ReservedRange message. */
        interface $Properties {

            /** Start field id */
            start?: number;

            /** End field id */
            end?: number;
        }
    }
}

/** Reflected field descriptor proto. */
export const FieldDescriptorProto: $protobuf.Type & {
    Label: $protobuf.Enum,
    Type: $protobuf.Enum
};

export namespace FieldDescriptorProto {

    /** Properties of a FieldDescriptorProto message. */
    interface $Properties {

        /** Field name */
        name?: string;

        /** Field id */
        number?: number;

        /** Field rule */
        label?: FieldDescriptorProtoLabel;

        /** Field basic type */
        type?: FieldDescriptorProtoType;

        /** Field type name */
        typeName?: string;

        /** Extended type name */
        extendee?: string;

        /** Literal default value */
        defaultValue?: string;

        /** Oneof index if part of a oneof */
        oneofIndex?: number;

        /** Not supported */
        jsonName?: any;

        /** Field options */
        options?: FieldOptions.$Properties;

        /** Whether this is a proto3 optional field */
        proto3Optional?: boolean;
    }
}

/** Reflected oneof descriptor proto. */
export const OneofDescriptorProto: $protobuf.Type;

export namespace OneofDescriptorProto {

    /** Properties of a OneofDescriptorProto message. */
    interface $Properties {

        /** Oneof name */
        name?: string;

        /** Oneof options */
        options?: OneofOptions.$Properties;
    }
}

/** Reflected enum descriptor proto. */
export const EnumDescriptorProto: $protobuf.Type;

export namespace EnumDescriptorProto {

    /** Properties of an EnumDescriptorProto message. */
    interface $Properties {

        /** Enum name */
        name?: string;

        /** Enum values */
        value?: EnumValueDescriptorProto.$Properties[];

        /** Enum options */
        options?: EnumOptions.$Properties;
    }
}

/** Reflected service descriptor proto. */
export const ServiceDescriptorProto: $protobuf.Type;

export namespace ServiceDescriptorProto {

    /** Properties of a ServiceDescriptorProto message. */
    interface $Properties {

        /** Service name */
        name?: string;

        /** Methods */
        method?: MethodDescriptorProto.$Properties[];

        /** Options */
        options?: ServiceOptions.$Properties;
    }
}

/** Reflected enum value descriptor proto. */
export const EnumValueDescriptorProto: $protobuf.Type;

export namespace EnumValueDescriptorProto {

    /** Properties of an EnumValueDescriptorProto message. */
    interface $Properties {

        /** Name */
        name?: string;

        /** Value */
        number?: number;

        /** Enum value options */
        options?: EnumValueOptions.$Properties;
    }
}

/** Reflected method descriptor proto. */
export const MethodDescriptorProto: $protobuf.Type;

export namespace MethodDescriptorProto {

    /** Properties of a MethodDescriptorProto message. */
    interface $Properties {

        /** Method name */
        name?: string;

        /** Request type name */
        inputType?: string;

        /** Response type name */
        outputType?: string;

        /** Not supported */
        options?: MethodOptions.$Properties;

        /** Whether requests are streamed */
        clientStreaming?: boolean;

        /** Whether responses are streamed */
        serverStreaming?: boolean;
    }
}

/** Reflected file options. */
export const FileOptions: $protobuf.Type & {
    OptimizeMode: $protobuf.Enum
};

export namespace FileOptions {

    /** Properties of a FileOptions message. */
    interface $Properties {
        javaPackage?: string;
        javaOuterClassname?: string;
        javaMultipleFiles?: boolean;
        javaGenerateEqualsAndHash?: boolean;
        javaStringCheckUtf8?: boolean;
        optimizeFor?: FileOptionsOptimizeMode;
        goPackage?: string;
        ccGenericServices?: boolean;
        javaGenericServices?: boolean;
        pyGenericServices?: boolean;
        deprecated?: boolean;
        ccEnableArenas?: boolean;
        objcClassPrefix?: string;
        csharpNamespace?: string;
    }
}

/** Reflected message options. */
export const MessageOptions: $protobuf.Type;

export namespace MessageOptions {

    /** Properties of a MessageOptions message. */
    interface $Properties {

        /** Whether this message is a map entry */
        mapEntry?: boolean;
    }
}

/** Reflected field options. */
export const FieldOptions: $protobuf.Type & {
    CType: $protobuf.Enum,
    JSType: $protobuf.Enum
};

export namespace FieldOptions {

    /** Properties of a FieldOptions message. */
    interface $Properties {

        /** Whether packed or not (defaults to `false` for proto2 and `true` for proto3) */
        packed?: boolean;

        /** JavaScript value type (not used by protobuf.js) */
        jstype?: FieldOptionsJSType;
    }
}

/** Reflected oneof options. */
export const OneofOptions: $protobuf.Type;

export namespace OneofOptions {

    /** Properties of a OneofOptions message. */
    interface $Properties {
        features?: FeatureSet.$Properties;
        uninterpretedOption?: any[];
    }
}

/** Reflected enum options. */
export const EnumOptions: $protobuf.Type;

export namespace EnumOptions {

    /** Properties of an EnumOptions message. */
    interface $Properties {

        /** Whether aliases are allowed */
        allowAlias?: boolean;
        deprecated?: boolean;
    }
}

/** Reflected enum value options. */
export const EnumValueOptions: $protobuf.Type;

export namespace EnumValueOptions {

    /** Properties of an EnumValueOptions message. */
    interface $Properties {
        deprecated?: boolean;
        features?: FeatureSet.$Properties;
        debugRedact?: boolean;
        featureSupport?: any;
        uninterpretedOption?: any[];
    }
}

/** Reflected service options. */
export const ServiceOptions: $protobuf.Type;

export namespace ServiceOptions {

    /** Properties of a ServiceOptions message. */
    interface $Properties {
        deprecated?: boolean;
    }
}

/** Reflected method options. */
export const MethodOptions: $protobuf.Type;

export namespace MethodOptions {

    /**
     * Properties of a MethodOptions message.
     *
     * Warning: this is not safe to use with editions protos, since it discards relevant file context.
     *
     */
    interface $Properties {
        deprecated?: boolean;
    }
}

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

export namespace FeatureSet {

    /** Properties of a FeatureSet message. */
    interface $Properties {
        fieldPresence?: number;
        enumType?: number;
        repeatedFieldEncoding?: number;
        utf8Validation?: number;
        messageEncoding?: number;
        jsonFormat?: number;
        enforceNamingStyle?: number;
        defaultSymbolVisibility?: number;
    }
}

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

/** Reflected edition enum. */
export const Edition: $protobuf.Enum;

export namespace Edition {

    /** Values of the Edition enum. */
    type $Value = number;
}
