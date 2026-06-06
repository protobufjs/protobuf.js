import * as $protobuf from "..";
import {
    IDescriptorProto,
    IDescriptorContext,
    IEnumDescriptorProto,
    IFieldDescriptorProto,
    IFileDescriptorSet,
    IMethodDescriptorProto,
    IOneofDescriptorProto,
    IServiceDescriptorProto
} from "./descriptor.generated";

export * from "./descriptor.generated";

type DescriptorInput<T> = T | $protobuf.Reader | Uint8Array;

declare module ".." {
    namespace Root {
        /** Creates a root from a descriptor set. */
        function fromDescriptor(descriptor: DescriptorInput<IFileDescriptorSet>, options?: { keepCase?: boolean }): $protobuf.Root;
    }

    interface Root {
        /** Converts this root to a descriptor set. */
        toDescriptor(edition?: string): $protobuf.Message<IFileDescriptorSet> & IFileDescriptorSet;
    }

    namespace Type {
        /** Creates a type from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IDescriptorProto>, editionOrContext?: string | IDescriptorContext): $protobuf.Type;
    }

    interface Type {
        /** Converts this type to a descriptor. */
        toDescriptor(edition?: string): $protobuf.Message<IDescriptorProto> & IDescriptorProto;
    }

    namespace Field {
        /** Creates a field from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IFieldDescriptorProto>, editionOrContext?: string | IDescriptorContext): $protobuf.Field;
    }

    interface Field {
        /** Converts this field to a descriptor. */
        toDescriptor(edition?: string): $protobuf.Message<IFieldDescriptorProto> & IFieldDescriptorProto;
    }

    namespace Enum {
        /** Creates an enum from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IEnumDescriptorProto>, editionOrContext?: string | IDescriptorContext): $protobuf.Enum;
    }

    interface Enum {
        /** Converts this enum to a descriptor. */
        toDescriptor(): $protobuf.Message<IEnumDescriptorProto> & IEnumDescriptorProto;
    }

    namespace OneOf {
        /** Creates a oneof from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IOneofDescriptorProto>, editionOrContext?: string | IDescriptorContext): $protobuf.OneOf;
    }

    interface OneOf {
        /** Converts this oneof to a descriptor. */
        toDescriptor(): $protobuf.Message<IOneofDescriptorProto> & IOneofDescriptorProto;
    }

    namespace Service {
        /** Creates a service from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IServiceDescriptorProto>, editionOrContext?: string | IDescriptorContext): $protobuf.Service;
    }

    interface Service {
        /** Converts this service to a descriptor. */
        toDescriptor(): $protobuf.Message<IServiceDescriptorProto> & IServiceDescriptorProto;
    }

    namespace Method {
        /** Creates a method from a descriptor. */
        function fromDescriptor(descriptor: DescriptorInput<IMethodDescriptorProto>, editionOrContext?: string | IDescriptorContext): $protobuf.Method;
    }

    interface Method {
        /** Converts this method to a descriptor. */
        toDescriptor(): $protobuf.Message<IMethodDescriptorProto> & IMethodDescriptorProto;
    }
}
