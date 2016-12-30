import * as protobuf from "..";
import * as Long from "long";

export const proto = {
    nested: {
        Hello: {
            fields: {
                aString: {
                    rule: "required",
                    type: "string",
                    id: 1
                },
                aLong: {
                    type: "uint64",
                    id: 2
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
}
protobuf.Class.create(root.lookupType("Hello"), Hello);

var hello = new Hello({
    aString: "hi",
    aLong: Long.fromNumber(123)
});

var buf = Hello.encode(hello).finish();

var hello2 = Hello.decode(buf) as Hello;
console.log(hello2.asJSON());
