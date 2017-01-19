import * as protobuf from "..";

export const proto = {
    nested: {
        Hello: {
            fields: {
                value: {
                    rule: "required",
                    type: "string",
                    id:1
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

    foo() {
        this["value"] = "hi";
        return this;
    }
}
protobuf.Class.create(root.lookupType("Hello"), Hello);

var hello = new Hello();

var buf = Hello.encode(hello.foo()).finish();

var hello2 = Hello.decode(buf) as Hello;
console.log(hello2.foo().toObject());

export var utf8 = protobuf.util.utf8;
