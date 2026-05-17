import * as $protobuf from "../..";

export interface ITest1 extends Test1.$Properties {
}

export class Test1 {
    constructor(properties?: Test1.$Properties);
    $unknowns?: Uint8Array[];
    field1: string;
    field2: number;
    field3: boolean;
    static create(properties: Test1.$Shape): Test1 & Test1.$Shape;
    static create(properties?: Test1.$Properties): Test1;
    static encode(message: Test1.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: Test1.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Test1 & Test1.$Shape;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Test1 & Test1.$Shape;
    static verify(message: { [k: string]: any }): (string|null);
    static fromObject(object: { [k: string]: any }): Test1;
    static toObject(message: Test1, options?: $protobuf.IConversionOptions): { [k: string]: any };
    toJSON(): { [k: string]: any };
    static getTypeUrl(prefix?: string): string;
}

export namespace Test1 {
    interface $Properties {
        field1?: (string|null);
        field2?: (number|null);
        field3?: (boolean|null);
        $unknowns?: Uint8Array[];
    }
    type $Shape = Test1.$Properties;
}

export interface ITest2 extends Test2.$Properties {
}

export class Test2 {
    constructor(properties?: Test2.$Properties);
    $unknowns?: Uint8Array[];
    static create(properties: Test2.$Shape): Test2 & Test2.$Shape;
    static create(properties?: Test2.$Properties): Test2;
    static encode(message: Test2.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: Test2.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Test2 & Test2.$Shape;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Test2 & Test2.$Shape;
    static verify(message: { [k: string]: any }): (string|null);
    static fromObject(object: { [k: string]: any }): Test2;
    static toObject(message: Test2, options?: $protobuf.IConversionOptions): { [k: string]: any };
    toJSON(): { [k: string]: any };
    static getTypeUrl(prefix?: string): string;
}

export namespace Test2 {
    interface $Properties {
        $unknowns?: Uint8Array[];
    }
    type $Shape = Test2.$Properties;
}

export enum Test3 {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5
}
