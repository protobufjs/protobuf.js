import {
    Writer,
    BufferWriter,
    Reader,
    BufferReader,
    rpc,
    roots,
    configure
} from "./index-minimal.js";
import { encoder } from "./encoder.js";
import { decoder } from "./decoder.js";
import { verifier } from "./verifier.js";
import { converter } from "./converter.js";
import { ReflectionObject } from "./object.js";
import { Namespace } from "./namespace.js";
import { Root } from "./root.js";
import { Enum } from "./enum.js";
import { Type } from "./type.js";
import { Field } from "./field.js";
import { OneOf } from "./oneof.js";
import { MapField } from "./mapfield.js";
import { Service } from "./service.js";
import { Method } from "./method.js";
import { Message } from "./message.js";
import { wrappers } from "./wrappers.js";
import { types } from "./types.js";
import { util } from "./util.js";

var build = "light";

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Promise<Root>} Promise
 * @see {@link Root#load}
 */
function load(filename, root) {
    if (!root)
        root = new Root();
    return root.load(filename);
}

// Set up possibly cyclic reflection dependencies
ReflectionObject._configure(Root);
Namespace._configure(Type, Service, Enum);
Root._configure(Type, undefined, {});
Field._configure(Type);
util._configure(Type, Enum, Root);

export * from "./index-minimal.js";
export {
    build,
    load,
    encoder,
    decoder,
    verifier,
    converter,
    ReflectionObject,
    Namespace,
    Root,
    Enum,
    Type,
    Field,
    OneOf,
    MapField,
    Service,
    Method,
    Message,
    wrappers,
    types,
    util,
    Writer,
    BufferWriter,
    Reader,
    BufferReader,
    rpc,
    roots,
    configure
};
