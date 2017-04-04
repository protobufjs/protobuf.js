import * as $protobuf from "../..";

export class MyService extends $protobuf.rpc.Service {
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): MyService;
    public myMethod(request: (MyRequest|{ [k: string]: any }), callback: MyService_myMethod_Callback): void;
    public myMethod(request: (MyRequest|{ [k: string]: any })): Promise<MyResponse>;
}

type MyService_myMethod_Callback = (error: Error, response?: MyResponse) => void;

type MyRequest$Properties = {
    path?: string;
};

export class MyRequest {
    constructor(properties?: MyRequest$Properties);
    public path: string;
    public static create(properties?: MyRequest$Properties): MyRequest;
    public static encode(message: MyRequest$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: MyRequest$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyRequest;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyRequest;
    public static verify(message: { [k: string]: any }): string;
    public static fromObject(object: { [k: string]: any }): MyRequest;
    public static from(object: { [k: string]: any }): MyRequest;
    public static toObject(message: MyRequest, options?: $protobuf.ConversionOptions): { [k: string]: any };
    public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}

type MyResponse$Properties = {
    status?: number;
};

export class MyResponse {
    constructor(properties?: MyResponse$Properties);
    public status: number;
    public static create(properties?: MyResponse$Properties): MyResponse;
    public static encode(message: MyResponse$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    public static encodeDelimited(message: MyResponse$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyResponse;
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyResponse;
    public static verify(message: { [k: string]: any }): string;
    public static fromObject(object: { [k: string]: any }): MyResponse;
    public static from(object: { [k: string]: any }): MyResponse;
    public static toObject(message: MyResponse, options?: $protobuf.ConversionOptions): { [k: string]: any };
    public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };
    public toJSON(): { [k: string]: any };
}
