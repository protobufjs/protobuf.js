// uncomment for browser only / non long.js versions
/*
/// <reference path="../stub-long.d.ts" />
/// <reference path="../stub-node.d.ts" />
*/

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

let writer = Hello.encode(hello.foo()) as protobuf.BufferWriter;
let buf = writer.finish();

let hello2 = Hello.decode(buf) as Hello;
// console.log(JSON.stringify(hello2.foo().toObject(), null, 2));

export const utf8 = protobuf.util.utf8;
