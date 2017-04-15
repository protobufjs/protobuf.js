import * as $protobuf from "../..";

export class MyService extends $protobuf.rpc.Service {
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);
    public myMethod(request: IMyRequest): Promise<MyResponse>;
}

type MyService_myMethod_Callback = (error: Error, response?: MyResponse) => void;

export class MyRequest {
    constructor(properties?: IMyRequest);
}

export interface IMyRequest {
    path?: string;
}

export class MyResponse {
    constructor(properties?: IMyResponse);
}

export interface IMyResponse {
    status?: number;
}
