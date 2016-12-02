/// <reference path="./protobuf.js.d.ts" />

import * as protobuf from "protobufjs";

export const proto = {"nested":{"Hello":{"fields":{"value":{"rule":"required","type":"string","id":1}}}}};

const root = protobuf.Root.fromJSON(proto);

export class Hello {
    constructor (properties: any) {
        protobuf.Prototype.call(this, properties);
    }
}

protobuf.inherits(Hello, root.lookup("Hello") as protobuf.Type);
