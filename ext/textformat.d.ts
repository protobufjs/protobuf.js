import type { TextFormatOptions } from "./textformat.generated";

export * from "./textformat.generated";

declare const textformat: {
    /** Maximum recursion depth for formatting length-delimited unknown fields. */
    unknownRecursionLimit: number;
};

export default textformat;

declare module ".." {
    interface Type {
        /** Parses this type from protobuf text format. */
        fromText(text: string): Message<{}>;

        /** Formats a message of this type as protobuf text format. */
        toText(message: (Message<{}>|{ [k: string]: any }), options?: TextFormatOptions): string;
    }
}
