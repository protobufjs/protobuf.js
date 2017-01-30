/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("../../minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = $protobuf.roots.test_comments || ($protobuf.roots.test_comments = {});

$root.Test1 = (function() {

    /**
     * Constructs a new Test1.
     * @classdesc Message
     * with
     * a
     * comment.
     * @exports Test1
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function Test1(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
    }

    /**
     * Field with a comment.
     * @type {string}
     */
    Test1.prototype.field1 = "";

    /**
     * Test1 field2.
     * @type {number}
     */
    Test1.prototype.field2 = 0;

    /**
     * Field with a comment and a <a href="http://example.com/foo/">link</a>
     * @type {boolean}
     */
    Test1.prototype.field3 = false;

    /**
     * Creates a new Test1 instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {Test1} Test1 instance
     */
    Test1.create = function create(properties) {
        return new Test1(properties);
    };

    /**
     * Encodes the specified Test1 message.
     * @param {Test1|Object} message Test1 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Test1.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.field1 !== undefined && message.hasOwnProperty("field1"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.field1);
        if (message.field2 !== undefined && message.hasOwnProperty("field2"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.field2);
        if (message.field3 !== undefined && message.hasOwnProperty("field3"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.field3);
        return writer;
    };

    /**
     * Encodes the specified Test1 message, length delimited.
     * @param {Test1|Object} message Test1 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Test1.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Test1 message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Test1} Test1
     */
    Test1.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Test1();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.field1 = reader.string();
                break;
            case 2:
                message.field2 = reader.uint32();
                break;
            case 3:
                message.field3 = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Test1 message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Test1} Test1
     */
    Test1.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Test1 message.
     * @param {Test1|Object} message Test1 message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    Test1.verify = function verify(message) {
        if (message.field1 !== undefined)
            if (!$util.isString(message.field1))
                return "field1: string expected";
        if (message.field2 !== undefined)
            if (!$util.isInteger(message.field2))
                return "field2: integer expected";
        if (message.field3 !== undefined)
            if (typeof message.field3 !== "boolean")
                return "field3: boolean expected";
        return null;
    };

    /**
     * Creates a Test1 message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {Test1} Test1
     */
    Test1.fromObject = function fromObject(object) {
        if (object instanceof $root.Test1)
            return object;
        var message = new $root.Test1();
        if (object.field1 !== undefined && object.field1 !== null)
            message.field1 = String(object.field1);
        if (object.field2 !== undefined && object.field2 !== null)
            message.field2 = object.field2 >>> 0;
        if (object.field3 !== undefined && object.field3 !== null)
            message.field3 = Boolean(object.field3);
        return message;
    };

    /**
     * Creates a Test1 message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link Test1.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {Test1} Test1
     */
    Test1.from = Test1.fromObject;

    /**
     * Creates a plain object from a Test1 message. Also converts values to other types if specified.
     * @param {Test1} message Test1
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Test1.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.field1 = "";
            object.field2 = 0;
            object.field3 = false;
        }
        if (message.field1 !== undefined && message.field1 !== null && message.hasOwnProperty("field1"))
            object.field1 = message.field1;
        if (message.field2 !== undefined && message.field2 !== null && message.hasOwnProperty("field2"))
            object.field2 = message.field2;
        if (message.field3 !== undefined && message.field3 !== null && message.hasOwnProperty("field3"))
            object.field3 = message.field3;
        return object;
    };

    /**
     * Creates a plain object from this Test1 message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Test1.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this Test1 to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    Test1.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Test1;
})();

$root.Test2 = (function() {

    /**
     * Constructs a new Test2.
     * @exports Test2
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function Test2(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Test2 instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {Test2} Test2 instance
     */
    Test2.create = function create(properties) {
        return new Test2(properties);
    };

    /**
     * Encodes the specified Test2 message.
     * @param {Test2|Object} message Test2 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Test2.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Test2 message, length delimited.
     * @param {Test2|Object} message Test2 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Test2.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Test2 message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Test2} Test2
     */
    Test2.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Test2();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Test2 message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Test2} Test2
     */
    Test2.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Test2 message.
     * @param {Test2|Object} message Test2 message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    Test2.verify = function verify() {
        return null;
    };

    /**
     * Creates a Test2 message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {Test2} Test2
     */
    Test2.fromObject = function fromObject(object) {
        if (object instanceof $root.Test2)
            return object;
        return new $root.Test2();
    };

    /**
     * Creates a Test2 message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link Test2.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {Test2} Test2
     */
    Test2.from = Test2.fromObject;

    /**
     * Creates a plain object from a Test2 message. Also converts values to other types if specified.
     * @param {Test2} message Test2
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Test2.toObject = function toObject() {
        return {};
    };

    /**
     * Creates a plain object from this Test2 message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Test2.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this Test2 to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    Test2.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Test2;
})();

/**
 * Test3 enum.
 * @exports Test3
 * @enum {number}
 * @property {number} ONE=1 Value with a comment.
 * @property {number} TWO=2 TWO value
 * @property {number} THREE=3 Value with a comment.
 */
$root.Test3 = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "ONE"] = 1;
    values[valuesById[2] = "TWO"] = 2;
    values[valuesById[3] = "THREE"] = 3;
    return values;
})();

// Resolve lazy type references to actual types
$util.lazyResolve($root, $lazyTypes);

module.exports = $root;
