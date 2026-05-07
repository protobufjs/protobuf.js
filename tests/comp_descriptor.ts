import * as protobuf from "../index";
import * as descriptor from "../ext/descriptor";

const root = protobuf.Root.fromJSON({
    nested: {
        Message: {
            fields: {
                value: {
                    type: "int32",
                    id: 1
                }
            }
        }
    }
});
root.resolveAll();

const descriptorSet = root.toDescriptor("proto3");
const descriptorBytes = descriptor.FileDescriptorSet.encode(descriptorSet).finish();
const fieldDescriptor: descriptor.IFieldDescriptorProto = { name: "value", number: 1, label: 1, type: 5, proto3Optional: true };

protobuf.Root.fromDescriptor(descriptorSet);
protobuf.Root.fromDescriptor(descriptorBytes);
protobuf.Root.fromDescriptor(protobuf.Reader.create(descriptorBytes));
protobuf.Field.fromDescriptor(fieldDescriptor, "proto3");
