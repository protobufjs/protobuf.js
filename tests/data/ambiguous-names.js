/*eslint-disable block-scoped-var, no-redeclare, no-control-regex*/
"use strict";

var $protobuf = require("../../runtime");

// Common aliases
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util   = $protobuf.util;

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

    /**
     * A whatever.
     * @type {string}
     */
    A.prototype.whatever = "";

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
     * @param {A|Object} message A message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    A.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.whatever !== undefined && message.whatever !== "")
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.whatever);
        return writer;
    };

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
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {A} A
     */
    A.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.A();
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
    };

    /**
     * Decodes a A message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {A} A
     */
    A.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a A message.
     * @param {A|Object} message A message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    A.verify = function verify(message) {
        if (message.whatever !== undefined)
            if (!$util.isString(message.whatever))
                return "whatever: string expected";
        return null;
    };

    /**
     * Creates a A message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {A} A
     */
    A.fromObject = function fromObject(object) {
        var message = new $root.A();
        if (object.whatever !== undefined && object.whatever !== null)
            message.whatever = String(object.whatever);
        return message;
    };

    /**
     * Creates a A message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link A.fromObject}.
     * @param {Object.<string,*>} object Plain object
     * @returns {A} A
     */
    A.from = A.fromObject;

    /**
     * Creates a plain object from a A message. Also converts values to other types if specified.
     * @param {A} message A
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    A.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.whatever = "";
        for (var keys = Object.keys(message), i = 0; i < keys.length; ++i)
            if (message[keys[i]] !== undefined && message[keys[i]] !== null)
                switch (keys[i]) {
                case "whatever":
                    object.whatever = message.whatever;
                    break;
                }
        return object;
    };

    /**
     * Creates a plain object from this A message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    A.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this A to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    A.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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

    /**
     * B A.
     * @type {A}
     */
    B.prototype.A = null;

    // Lazily resolved type references
    var $types = {
        0: "A"
    }; $lazyTypes.push($types);

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
     * @param {B|Object} message B message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    B.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.A !== undefined && message.A !== null)
            $types[0].encode(message.A, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

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
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {B} B
     */
    B.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.B();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.A = $types[0].decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a B message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {B} B
     */
    B.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a B message.
     * @param {B|Object} message B message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    B.verify = function verify(message) {
        if (message.A !== undefined && message.A !== null) {
            var error = $types[0].verify(message.A);
            if (error)
                return "A." + error;
        }
        return null;
    };

    /**
     * Creates a B message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {B} B
     */
    B.fromObject = function fromObject(object) {
        var message = new $root.B();
        if (object.A !== undefined && object.A !== null)
            message.A = $types[0].fromObject(object.A);
        return message;
    };

    /**
     * Creates a B message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link B.fromObject}.
     * @param {Object.<string,*>} object Plain object
     * @returns {B} B
     */
    B.from = B.fromObject;

    /**
     * Creates a plain object from a B message. Also converts values to other types if specified.
     * @param {B} message B
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    B.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.A = null;
        for (var keys = Object.keys(message), i = 0; i < keys.length; ++i)
            if (message[keys[i]] !== undefined && message[keys[i]] !== null)
                switch (keys[i]) {
                case "A":
                    object.A = $types[0].toObject(message.A, options);
                    break;
                }
        return object;
    };

    /**
     * Creates a plain object from this B message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    B.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this B to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    B.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return B;
})();

// Resolve lazy type references to actual types
$util.lazyResolve($root, $lazyTypes);

module.exports = $protobuf.roots["test_ambiguous-names"] = $root;
