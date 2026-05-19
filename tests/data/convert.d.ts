import * as $protobuf from "../..";
import Long = require("long");

export interface IMessage extends Message.$Properties {
}

export class Message {
    constructor(properties?: Message.$Properties);
    $unknowns?: Uint8Array[];
    stringVal: string;
    stringRepeated: string[];
    uint64Val: (number|Long);
    uint64Repeated: (number|Long)[];
    bytesVal: Uint8Array;
    bytesRepeated: Uint8Array[];
    enumVal: Message.SomeEnum;
    enumRepeated: Message.SomeEnum[];
    int64Map: { [k: string]: (number|Long) };
    static create(properties: Message.$Shape): Message & Message.$Shape;
    static create(properties?: Message.$Properties): Message;
    static encode(message: Message.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: Message.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Message & Message.$Shape;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Message & Message.$Shape;
    static verify(message: { [k: string]: any }): (string|null);
    static fromObject(object: { [k: string]: any }): Message;
    static toObject(message: Message, options?: $protobuf.IConversionOptions): { [k: string]: any };
    toJSON(): { [k: string]: any };
    static getTypeUrl(prefix?: string): string;
}

export namespace Message {
    interface $Properties {
        stringVal?: (string|null);
        stringRepeated?: (string[]|null);
        uint64Val?: (number|Long|null);
        uint64Repeated?: ((number|Long)[]|null);
        bytesVal?: (Uint8Array|null);
        bytesRepeated?: (Uint8Array[]|null);
        enumVal?: (Message.SomeEnum|null);
        enumRepeated?: (Message.SomeEnum[]|null);
        int64Map?: ({ [k: string]: (number|Long) }|null);
        $unknowns?: Uint8Array[];
    }
    type $Shape = Message.$Properties;

    enum SomeEnum {
        ONE = 1,
        TWO = 2
    }
}
