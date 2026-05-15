import * as $protobuf from "../..";
import Long = require("long");

export class MyService extends $protobuf.rpc.Service {
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);
    static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): MyService;
    myMethod(request: IMyRequest, callback: MyService.MyMethodCallback): void;
    myMethod(request: IMyRequest): Promise<MyResponse>;
}

export namespace MyService {
    type MyMethodCallback = (error: (Error|null), response?: MyResponse) => void;
}

export interface IMyRequest extends MyRequest.$Properties {
}

export class MyRequest {
    constructor(properties?: MyRequest.$Properties);
    $unknowns?: Uint8Array[];
    path: string;
    static create(properties: MyRequest.$Shape): MyRequest & MyRequest.$Shape;
    static create(properties?: MyRequest.$Properties): MyRequest;
    static encode(message: MyRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: MyRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyRequest & MyRequest.$Shape;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyRequest & MyRequest.$Shape;
    static verify(message: { [k: string]: any }): (string|null);
    static fromObject(object: { [k: string]: any }): MyRequest;
    static toObject(message: MyRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };
    toJSON(): { [k: string]: any };
    static getTypeUrl(prefix?: string): string;
}

export namespace MyRequest {
    interface $Properties {
        path?: (string|null);
        $unknowns?: Uint8Array[];
    }
    type $Shape = MyRequest.$Properties;
}

export interface IMyResponse extends MyResponse.$Properties {
}

export class MyResponse {
    constructor(properties?: MyResponse.$Properties);
    $unknowns?: Uint8Array[];
    status: number;
    static create(properties: MyResponse.$Shape): MyResponse & MyResponse.$Shape;
    static create(properties?: MyResponse.$Properties): MyResponse;
    static encode(message: MyResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static encodeDelimited(message: MyResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyResponse & MyResponse.$Shape;
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyResponse & MyResponse.$Shape;
    static verify(message: { [k: string]: any }): (string|null);
    static fromObject(object: { [k: string]: any }): MyResponse;
    static toObject(message: MyResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };
    toJSON(): { [k: string]: any };
    static getTypeUrl(prefix?: string): string;
}

export namespace MyResponse {
    interface $Properties {
        status?: (number|null);
        $unknowns?: Uint8Array[];
    }
    type $Shape = MyResponse.$Properties;
}
