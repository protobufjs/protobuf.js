import * as $protobuf from "../..";

export class MyService extends $protobuf.rpc.Service {
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): MyService;
    public myMethod(request: (MyRequest|Object), callback: MyService_myMethod_Callback): void;
    public myMethod(request: (MyRequest|Object)): Promise<MyResponse>;
}

type MyService_myMethod_Callback = (error: Error, response?: MyResponse) => void;

export class MyRequest {
    constructor(properties?: Object);
    public path?: string;
    public static create(properties?: Object): MyRequest;
    public static encode(message: (MyRequest|Object), writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: (MyRequest|Object), writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyRequest;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyRequest;
    public static verify(message: (MyRequest|Object)): string;
    public static fromObject(object: { [k: string]: any }): MyRequest;
    public static from(object: { [k: string]: any }): MyRequest;
    public static toObject(message: MyRequest, options?: $protobuf.ConversionOptions): { [k: string]: any };
    public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

export class MyResponse {
    constructor(properties?: Object);
    public status?: number;
    public static create(properties?: Object): MyResponse;
    public static encode(message: (MyResponse|Object), writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: (MyResponse|Object), writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyResponse;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyResponse;
    public static verify(message: (MyResponse|Object)): string;
    public static fromObject(object: { [k: string]: any }): MyResponse;
    public static from(object: { [k: string]: any }): MyResponse;
    public static toObject(message: MyResponse, options?: $protobuf.ConversionOptions): { [k: string]: any };
    public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}
