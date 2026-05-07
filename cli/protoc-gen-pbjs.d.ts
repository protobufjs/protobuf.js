import { Long, Message, Reader, Type, Writer } from "protobufjs";

export interface ICodeGeneratorRequest {
    fileToGenerate?: string[];
    parameter?: string;
    protoFile?: unknown[];
    sourceFileDescriptors?: unknown[];
    compilerVersion?: unknown;
}

export interface ICodeGeneratorResponseFile {
    name?: string;
    insertionPoint?: string;
    content?: string;
    generatedCodeInfo?: unknown;
}

export interface ICodeGeneratorResponse {
    error?: string;
    supportedFeatures?: number | Long;
    minimumEdition?: number;
    maximumEdition?: number;
    file?: ICodeGeneratorResponseFile[];
}

export type CodeGeneratorRequestMessage = Message<ICodeGeneratorRequest> & ICodeGeneratorRequest;

export type CodeGeneratorResponseMessage = Message<ICodeGeneratorResponse> & ICodeGeneratorResponse;

export interface PluginMessageType<T extends object, M extends Message<T> & T> extends Type {
    create(properties?: T): M;
    encode(message: T, writer?: Writer): Writer;
    decode(reader: Reader | Uint8Array, length?: number): M;
}

export const CodeGeneratorRequest: PluginMessageType<ICodeGeneratorRequest, CodeGeneratorRequestMessage>;

export const CodeGeneratorResponse: PluginMessageType<ICodeGeneratorResponse, CodeGeneratorResponseMessage>;

export type RunCallback = (err: Error | null, response?: CodeGeneratorResponseMessage) => void;

/**
 * Runs the protoc plugin on an encoded CodeGeneratorRequest.
 */
export function run(input: Uint8Array, callback: RunCallback): void;

/**
 * Runs the protoc plugin.
 */
export function main(): void;
