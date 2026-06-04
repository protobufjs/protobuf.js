// DO NOT EDIT! This is a generated file. Edit the source file instead and regenerate.

import * as $protobuf from "..";

/** ProtoJSON conversion options. */
export interface IProtoJsonOptions {

    /** Ignores unknown object members and unrecognized enum names while parsing. */
    ignoreUnknownFields?: boolean;
}

/**
 * Parses a message from an already-parsed ProtoJSON value using the specified reflected type.
 * @param type Reflected message type
 * @param json Already-parsed ProtoJSON value
 * @param [options] Conversion options
 * @returns Message instance
 */
export function fromJson(type: $protobuf.Type, json: any, options?: IProtoJsonOptions): $protobuf.Message<{}>;

/**
 * Parses a message from ProtoJSON text using the specified reflected type.
 * @param type Reflected message type
 * @param json ProtoJSON text
 * @param [options] Conversion options
 * @returns Message instance
 */
export function fromJsonString(type: $protobuf.Type, json: string, options?: IProtoJsonOptions): $protobuf.Message<{}>;

/**
 * Formats a message as ProtoJSON using the specified reflected type.
 * @param type Reflected message type
 * @param message Message instance or plain object
 * @param [options] Conversion options
 * @returns ProtoJSON value (object, array, string, number, boolean or null)
 */
export function toJson(type: $protobuf.Type, message: ($protobuf.Message<{}>|{ [k: string]: any }), options?: IProtoJsonOptions): any;

/**
 * Formats a message as ProtoJSON text using the specified reflected type.
 * @param type Reflected message type
 * @param message Message instance or plain object
 * @param [options] Conversion options
 * @returns ProtoJSON text
 */
export function toJsonString(type: $protobuf.Type, message: ($protobuf.Message<{}>|{ [k: string]: any }), options?: IProtoJsonOptions): string;

/** Installs reflected {@link Type} convenience methods. */
export function install(): void;
