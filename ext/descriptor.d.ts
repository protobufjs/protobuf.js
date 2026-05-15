import type * as descriptorGenerated from "./descriptor.generated";

export * from "./descriptor.generated";

declare const descriptor: typeof descriptorGenerated;

export default descriptor;

declare module ".." {
    namespace Root {
        /** Creates a root from a descriptor set. */
        function fromDescriptor(descriptor: descriptorGenerated.FileDescriptorSet.$Properties | Reader | Uint8Array): Root;
    }

    interface Root {
        /** Converts this root to a descriptor set. */
        toDescriptor(edition?: string): Message<descriptorGenerated.FileDescriptorSet.$Properties> & descriptorGenerated.FileDescriptorSet.$Properties;
    }

    namespace Type {
        /** Creates a type from a descriptor. */
        function fromDescriptor(descriptor: descriptorGenerated.DescriptorProto.$Properties | Reader | Uint8Array, edition?: string, nested?: boolean): Type;
    }

    interface Type {
        /** Converts this type to a descriptor. */
        toDescriptor(edition?: string): Message<descriptorGenerated.DescriptorProto.$Properties> & descriptorGenerated.DescriptorProto.$Properties;
    }

    namespace Field {
        /** Creates a field from a descriptor. */
        function fromDescriptor(descriptor: descriptorGenerated.FieldDescriptorProto.$Properties | Reader | Uint8Array, edition?: string, nested?: boolean): Field;
    }

    interface Field {
        /** Converts this field to a descriptor. */
        toDescriptor(edition?: string): Message<descriptorGenerated.FieldDescriptorProto.$Properties> & descriptorGenerated.FieldDescriptorProto.$Properties;
    }

    namespace Enum {
        /** Creates an enum from a descriptor. */
        function fromDescriptor(descriptor: descriptorGenerated.EnumDescriptorProto.$Properties | Reader | Uint8Array, edition?: string, nested?: boolean): Enum;
    }

    interface Enum {
        /** Converts this enum to a descriptor. */
        toDescriptor(): Message<descriptorGenerated.EnumDescriptorProto.$Properties> & descriptorGenerated.EnumDescriptorProto.$Properties;
    }

    namespace OneOf {
        /** Creates a oneof from a descriptor. */
        function fromDescriptor(descriptor: descriptorGenerated.OneofDescriptorProto.$Properties | Reader | Uint8Array): OneOf;
    }

    interface OneOf {
        /** Converts this oneof to a descriptor. */
        toDescriptor(): Message<descriptorGenerated.OneofDescriptorProto.$Properties> & descriptorGenerated.OneofDescriptorProto.$Properties;
    }

    namespace Service {
        /** Creates a service from a descriptor. */
        function fromDescriptor(descriptor: descriptorGenerated.ServiceDescriptorProto.$Properties | Reader | Uint8Array, edition?: string, nested?: boolean): Service;
    }

    interface Service {
        /** Converts this service to a descriptor. */
        toDescriptor(): Message<descriptorGenerated.ServiceDescriptorProto.$Properties> & descriptorGenerated.ServiceDescriptorProto.$Properties;
    }

    namespace Method {
        /** Creates a method from a descriptor. */
        function fromDescriptor(descriptor: descriptorGenerated.MethodDescriptorProto.$Properties | Reader | Uint8Array): Method;
    }

    interface Method {
        /** Converts this method to a descriptor. */
        toDescriptor(): Message<descriptorGenerated.MethodDescriptorProto.$Properties> & descriptorGenerated.MethodDescriptorProto.$Properties;
    }
}
