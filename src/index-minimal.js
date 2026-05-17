import { Writer } from "./writer.js";
import { BufferWriter } from "./writer_buffer.js";
import { Reader } from "./reader.js";
import { BufferReader } from "./reader_buffer.js";
import { util } from "./util/minimal.js";
import { rpc } from "./rpc.js";
import { roots } from "./roots.js";

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
var build = "minimal";

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    util._configure();
    Writer._configure(BufferWriter);
    Reader._configure(BufferReader);
}

// Set up buffer utility according to the environment
configure();

export {
    build,
    Writer,
    BufferWriter,
    Reader,
    BufferReader,
    util,
    rpc,
    roots,
    configure
};
