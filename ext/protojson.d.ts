import * as $protobuf from "..";
import { IProtoJsonOptions } from "./protojson.generated";

export * from "./protojson.generated";

declare module ".." {
    interface Type {
        /** Installed by `protojson.install()`. Parses an already-parsed ProtoJSON value. */
        fromJson(json: any, options?: IProtoJsonOptions): $protobuf.Message<{}>;

        /** Installed by `protojson.install()`. Parses ProtoJSON text. */
        fromJsonString(json: string, options?: IProtoJsonOptions): $protobuf.Message<{}>;

        /** Installed by `protojson.install()`. Formats a message as ProtoJSON. */
        toJson(message: ($protobuf.Message<{}>|{ [k: string]: any }), options?: IProtoJsonOptions): any;

        /** Installed by `protojson.install()`. Formats a message as ProtoJSON text. */
        toJsonString(message: ($protobuf.Message<{}>|{ [k: string]: any }), options?: IProtoJsonOptions): string;
    }
}
