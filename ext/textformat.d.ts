import * as $protobuf from "..";
import { ITextFormatOptions } from "./textformat.generated";

export * from "./textformat.generated";

declare module ".." {
    namespace textformat {
        /** Maximum recursion depth for formatting length-delimited unknown fields. */
        let unknownRecursionLimit: number;
    }

    interface Type {
        /** Installed by `textformat.install()`. Parses this type from protobuf text format. */
        fromText(text: string): $protobuf.Message<{}>;

        /** Installed by `textformat.install()`. Formats a message of this type as protobuf text format. */
        toText(message: ($protobuf.Message<{}>|{ [k: string]: any }), options?: ITextFormatOptions): string;
    }
}
