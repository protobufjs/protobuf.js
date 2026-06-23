import * as $protobuf from "../..";
import Long = require("long");

export interface IOpenMessage extends OpenMessage.$Properties {
}

export class OpenMessage {
    constructor(properties?: OpenMessage.$Properties);
    $unknowns?: Uint8Array[];
    singular: OpenMessage.OpenEnum;
    repeated: OpenMessage.OpenEnum[];
    packed: OpenMessage.OpenEnum[];
    values: { [k: string]: OpenMessage.OpenEnum };
    static create(properties: OpenMessage.$Shape): OpenMessage & OpenMessage.$Shape;
    static create(properties?: OpenMessage.$Properties): OpenMessage;
    static encode(message: OpenMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: OpenMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OpenMessage & OpenMessage.$Shape;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OpenMessage & OpenMessage.$Shape;
    static verify(message: { [k: string]: any }): (string|null);
    static fromObject(object: { [k: string]: any }): OpenMessage;
    static toObject(message: OpenMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };
    toJSON(): { [k: string]: any };
    static getTypeUrl(prefix?: string): string;
}

export namespace OpenMessage {
    interface $Properties {
        singular?: (OpenMessage.OpenEnum|null);
        repeated?: (OpenMessage.OpenEnum[]|null);
        packed?: (OpenMessage.OpenEnum[]|null);
        values?: ({ [k: string]: OpenMessage.OpenEnum }|null);
        $unknowns?: Uint8Array[];
    }
    type $Shape = OpenMessage.$Properties;

    enum OpenEnum {
        ZERO = 0,
        ONE = 1
    }
}

export interface IClosedMessage extends ClosedMessage.$Properties {
}

export class ClosedMessage {
    constructor(properties?: ClosedMessage.$Properties);
    $unknowns?: Uint8Array[];
    singular: ClosedMessage.ClosedEnum;
    repeated: ClosedMessage.ClosedEnum[];
    packed: ClosedMessage.ClosedEnum[];
    values: { [k: string]: ClosedMessage.ClosedEnum };
    static create(properties: ClosedMessage.$Shape): ClosedMessage & ClosedMessage.$Shape;
    static create(properties?: ClosedMessage.$Properties): ClosedMessage;
    static encode(message: ClosedMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: ClosedMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ClosedMessage & ClosedMessage.$Shape;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ClosedMessage & ClosedMessage.$Shape;
    static verify(message: { [k: string]: any }): (string|null);
    static fromObject(object: { [k: string]: any }): ClosedMessage;
    static toObject(message: ClosedMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };
    toJSON(): { [k: string]: any };
    static getTypeUrl(prefix?: string): string;
}

export namespace ClosedMessage {
    interface $Properties {
        singular?: (ClosedMessage.ClosedEnum|null);
        repeated?: (ClosedMessage.ClosedEnum[]|null);
        packed?: (ClosedMessage.ClosedEnum[]|null);
        values?: ({ [k: string]: ClosedMessage.ClosedEnum }|null);
        $unknowns?: Uint8Array[];
    }
    type $Shape = ClosedMessage.$Properties;

    enum ClosedEnum {
        ZERO = 0,
        ONE = 1
    }
}

export interface IClosedImplicitMessage extends ClosedImplicitMessage.$Properties {
}

export class ClosedImplicitMessage {
    constructor(properties?: ClosedImplicitMessage.$Properties);
    $unknowns?: Uint8Array[];
    singular: ClosedImplicitMessage.ClosedEnum;
    static create(properties: ClosedImplicitMessage.$Shape): ClosedImplicitMessage & ClosedImplicitMessage.$Shape;
    static create(properties?: ClosedImplicitMessage.$Properties): ClosedImplicitMessage;
    static encode(message: ClosedImplicitMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: ClosedImplicitMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ClosedImplicitMessage & ClosedImplicitMessage.$Shape;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ClosedImplicitMessage & ClosedImplicitMessage.$Shape;
    static verify(message: { [k: string]: any }): (string|null);
    static fromObject(object: { [k: string]: any }): ClosedImplicitMessage;
    static toObject(message: ClosedImplicitMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };
    toJSON(): { [k: string]: any };
    static getTypeUrl(prefix?: string): string;
}

export namespace ClosedImplicitMessage {
    interface $Properties {
        singular?: (ClosedImplicitMessage.ClosedEnum|null);
        $unknowns?: Uint8Array[];
    }
    type $Shape = ClosedImplicitMessage.$Properties;

    enum ClosedEnum {
        ZERO = 0,
        ONE = 1
    }
}
