// $> pbjs --target static-module --wrap commonjs --root test_ambiguous-names --out tests/data/ambiguous-names.js tests/data/ambiguous-names.proto
// Generated Mon, 02 Jan 2017 21:00:30 UTC

/*eslint-disable block-scoped-var, no-redeclare, no-control-regex*/
"use strict";

var $protobuf = require("../../runtime");

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = {};

$root.A = (function() {

    /**
     * Constructs a new A.
     * @exports A
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function A(properties) {
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias A.prototype */
    var $prototype = A.prototype;

    /**
     * A whatever.
     * @type {string}
     */
    $prototype.whatever = "";

    /**
     * Creates a new A instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {A} A instance
     */
    A.create = function create(properties) {
        return new A(properties);
    };

    /**
     * Encodes the specified A message.
     * @function
     * @param {A|Object} message A message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    A.encode = (function(Writer) { return function encode(message, writer) {
        if (!writer) {
            writer = Writer.create();
        }
        if (message.whatever !== undefined && message.whatever !== "") {
            writer.uint32(10).string(message.whatever);
        }
        return writer;
    };})($protobuf.Writer);

    /**
     * Encodes the specified A message, length delimited.
     * @param {A|Object} message A message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    A.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a A message from the specified reader or buffer.
     * @function
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {A} A
     */
    A.decode = (function(Reader) { return function decode(reader, len) {
        if (!(reader instanceof Reader)) {
            reader = Reader.create(reader);
        }
        var end = len === undefined ? reader.len : reader.pos + len, message = new $root.A();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.whatever = reader.string();
                break;

            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };})($protobuf.Reader);

    /**
     * Decodes a A message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {A} A
     */
    A.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a A message.
     * @function
     * @param {A|Object} message A message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    A.verify = (function(util) { return function verify(message) {
        if (message.whatever !== undefined) {
            if (!util.isString(message.whatever)) {
                return "A.whatever: string expected";
            }
        }
        return null;
    };})($protobuf.util);

    /**
     * Converts a A message.
     * @function
     * @param {A|Object} source A message or plain object to convert
     * @param {*} impl Converter implementation to use
     * @param {Object.<string,*>} [options] Conversion options
     * @returns {A|Object} Converted message
     */
    A.convert = (function() { return function convert(src, impl, options) {
        if (!options) {
            options = {};
        }
        var dst = impl.create(src, this, options);
        if (dst) {
            if (dst.whatever === undefined && options.defaults) {
                dst.whatever = "";
            }
        }
        return dst;
    };})();

    /**
     * Creates a A message from JSON.
     * @param {Object.<string,*>} source Source object
     * @param {Object.<string,*>} [options] Conversion options
     * @returns {A} A
     */
    A.from = function from(source, options) {
        return this.convert(source, $protobuf.converters.message, options);
    };

    /**
     * Converts this A message to JSON.
     * @param {Object.<string,*>} [options] Conversion options
     * @returns {Object.<string,*>} JSON object
     */
    $prototype.asJSON = function asJSON(options) {
        return this.constructor.convert(this, $protobuf.converters.json, options);
    };

    return A;
})();

$root.B = (function() {

    /**
     * Constructs a new B.
     * @exports B
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function B(properties) {
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias B.prototype */
    var $prototype = B.prototype;

    /**
     * B A.
     * @type {A}
     */
    $prototype.A = null;

    // Referenced types
    var $types = ["A"]; $lazyTypes.push($types);

    /**
     * Creates a new B instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {B} B instance
     */
    B.create = function create(properties) {
        return new B(properties);
    };

    /**
     * Encodes the specified B message.
     * @function
     * @param {B|Object} message B message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    B.encode = (function(Writer, types) { return function encode(message, writer) {
        if (!writer) {
            writer = Writer.create();
        }
        if (message.A !== undefined && message.A !== null) {
            types[0].encode(message.A, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    };})($protobuf.Writer, $types);

    /**
     * Encodes the specified B message, length delimited.
     * @param {B|Object} message B message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    B.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a B message from the specified reader or buffer.
     * @function
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {B} B
     */
    B.decode = (function(Reader, types) { return function decode(reader, len) {
        if (!(reader instanceof Reader)) {
            reader = Reader.create(reader);
        }
        var end = len === undefined ? reader.len : reader.pos + len, message = new $root.B();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.A = types[0].decode(reader, reader.uint32());
                break;

            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };})($protobuf.Reader, $types);

    /**
     * Decodes a B message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {B} B
     */
    B.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a B message.
     * @function
     * @param {B|Object} message B message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    B.verify = (function(types) { return function verify(message) {
        if (message.A !== undefined && message.A !== null) {
            var err;
            if (err = types[0].verify(message.A)) {
                return err;
            }
        }
        return null;
    };})($types);

    /**
     * Converts a B message.
     * @function
     * @param {B|Object} source B message or plain object to convert
     * @param {*} impl Converter implementation to use
     * @param {Object.<string,*>} [options] Conversion options
     * @returns {B|Object} Converted message
     */
    B.convert = (function(types) { return function convert(src, impl, options) {
        if (!options) {
            options = {};
        }
        var dst = impl.create(src, this, options);
        if (dst) {
            dst.A = types[0].convert(src.A, impl, options);
        }
        return dst;
    };})($types);

    /**
     * Creates a B message from JSON.
     * @param {Object.<string,*>} source Source object
     * @param {Object.<string,*>} [options] Conversion options
     * @returns {B} B
     */
    B.from = function from(source, options) {
        return this.convert(source, $protobuf.converters.message, options);
    };

    /**
     * Converts this B message to JSON.
     * @param {Object.<string,*>} [options] Conversion options
     * @returns {Object.<string,*>} JSON object
     */
    $prototype.asJSON = function asJSON(options) {
        return this.constructor.convert(this, $protobuf.converters.json, options);
    };

    return B;
})();

// Resolve lazy types
$lazyTypes.forEach(function(types) {
    types.forEach(function(path, i) {
        if (!path)
            return;
        path = path.split(".");
        var ptr = $root;
        while (path.length)
            ptr = ptr[path.shift()];
        types[i] = ptr;
    });
});

$protobuf.roots["test_ambiguous-names"] = $root;

module.exports = $root;
