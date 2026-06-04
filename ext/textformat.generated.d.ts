// DO NOT EDIT! This is a generated file. Edit the source file instead and regenerate.

import * as $protobuf from "..";

/** Maximum recursion depth for formatting length-delimited unknown fields. */
export let unknownRecursionLimit: number;

/** Text format options. */
export interface ITextFormatOptions {

    /** Also includes and formats unknown fields. */
    unknowns?: boolean;
}

/**
 * Parses a message from protobuf text format using the specified reflected type.
 * @param type Reflected message type
 * @param text Text format input
 * @returns Message instance
 */
export function fromText(type: $protobuf.Type, text: string): $protobuf.Message<{}>;

/**
 * Formats a message as protobuf text format using the specified reflected type.
 * @param type Reflected message type
 * @param message Message instance or plain object
 * @param [options] Text format options
 * @returns Text format output
 */
export function toText(type: $protobuf.Type, message: ($protobuf.Message<{}>|{ [k: string]: any }), options?: ITextFormatOptions): string;

/** Installs reflected {@link Type} convenience methods. */
export function install(): void;
