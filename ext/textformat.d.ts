import * as $protobuf from "..";

export interface ITextFormatOptions {
    /** Also includes and formats unknown fields`. */
    unknowns?: boolean;
}

/** Maximum recursion depth for text format parsing and formatting. Defaults to util.recursionLimit. */
export let recursionLimit: number;

/** Maximum recursion depth for formatting length-delimited unknown fields. */
export let unknownRecursionLimit: number;

declare module ".." {
    namespace textformat {
        /** Maximum recursion depth for text format parsing and formatting. Defaults to util.recursionLimit. */
        let recursionLimit: number;

        /** Maximum recursion depth for formatting length-delimited unknown fields. */
        let unknownRecursionLimit: number;
    }

    interface Type {
        /** Parses this type from protobuf text format. */
        fromText(text: string): $protobuf.Message<{}>;

        /** Formats a message of this type as protobuf text format. */
        toText(message: ($protobuf.Message<{}>|{ [k: string]: any }), options?: ITextFormatOptions): string;
    }
}
