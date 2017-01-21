import * as $protobuf from "../..";

export class MyService extends $protobuf.rpc.Service {
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);
    static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): MyService;
    myMethod(request: (MyRequest|Object), callback: MyService_myMethod_Callback): void;
    myMethod(request: (MyRequest|Object)): Promise<MyResponse>;
}

type MyService_myMethod_Callback = (error: Error, response?: MyResponse) => void;

export class MyRequest {
    constructor(properties?: Object);
    path: string;
    static create(properties?: Object): MyRequest;
    static encode(message: (MyRequest|Object), writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: (MyRequest|Object), writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyRequest;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyRequest;
    static verify(message: (MyRequest|Object)): string;
    static fromObject(object: { [k: string]: any }): MyRequest;
    static from(object: { [k: string]: any }): MyRequest;
    static toObject(message: MyRequest, options?: $protobuf.ConversionOptions): { [k: string]: any };
    toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
    toJSON(): { [k: string]: any };
}

export class MyResponse {
    constructor(properties?: Object);
    status: number;
    static create(properties?: Object): MyResponse;
    static encode(message: (MyResponse|Object), writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: (MyResponse|Object), writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyResponse;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyResponse;
    static verify(message: (MyResponse|Object)): string;
    static fromObject(object: { [k: string]: any }): MyResponse;
    static from(object: { [k: string]: any }): MyResponse;
    static toObject(message: MyResponse, options?: $protobuf.ConversionOptions): { [k: string]: any };
    toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
    toJSON(): { [k: string]: any };
}
