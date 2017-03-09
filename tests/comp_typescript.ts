import * as protobuf from "..";

export const proto = {
    nested: {
        Hello: {
            fields: {
                value: {
                    rule: "required",
                    type: "string",
                    id: 1
                }
            }
        }
    }
};

const root = protobuf.Root.fromJSON(proto);

export class Hello extends protobuf.Message {
    constructor (properties?: { [k: string]: any }) {
        super(properties);
    }

    public foo() {
        this["value"] = "hi";
        return this;
    }
}
protobuf.Class.create(root.lookupType("Hello"), Hello);

let hello = new Hello();

let buf = Hello.encode(hello.foo()).finish();

let hello2 = Hello.decode(buf) as Hello;
process.stdout.write(JSON.stringify(hello2.foo().toObject(), null, 2));

export const utf8 = protobuf.util.utf8;
