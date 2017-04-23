import * as $protobuf from "../..";

export interface IMessage {
    stringVal?: string;
    stringRepeated?: string[];
    uint64Val?: (number|Long);
    uint64Repeated?: (number|Long)[];
    bytesVal?: Uint8Array;
    bytesRepeated?: Uint8Array[];
    enumVal?: Message.SomeEnum;
    enumRepeated?: Message.SomeEnum[];
    int64Map?: { [k: string]: (number|Long) };
}

export class Message {
    constructor(properties?: IMessage);
    public stringVal: string;
    public stringRepeated: string[];
    public uint64Val: (number|Long);
    public uint64Repeated: (number|Long)[];
    public bytesVal: Uint8Array;
    public bytesRepeated: Uint8Array[];
    public enumVal: Message.SomeEnum;
    public enumRepeated: Message.SomeEnum[];
    public int64Map: { [k: string]: (number|Long) };
    public static create(properties?: IMessage): Message;
    public static encode(message: IMessage, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: IMessage, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Message;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Message;
    public static verify(message: { [k: string]: any }): (string|null);
    public static fromObject(object: { [k: string]: any }): Message;
    public static toObject(message: Message, options?: $protobuf.IConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export namespace Message {

    enum SomeEnum {
        ONE = 1,
        TWO = 2
    }
}
