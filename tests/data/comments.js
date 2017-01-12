/*eslint-disable block-scoped-var, no-redeclare, no-control-regex*/
"use strict";

var $protobuf = require("../../runtime");

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = {};

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
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias Test1.prototype */
    var $prototype = Test1.prototype;

    /**
     * Field with a comment.
     * @type {string}
     */
    $prototype.field1 = "";

    /**
     * Test1 field2.
     * @type {number}
     */
    $prototype.field2 = 0;

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
     * @function
     * @param {Test1|Object} message Test1 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Test1.encode = (function(Writer) { return function encode(message, writer) {
        if (!writer) {
            writer = Writer.create();
        }
        if (message.field1 !== undefined && message.field1 !== "") {
            writer.uint32(10).string(message.field1);
        }
        if (message.field2 !== undefined && message.field2 !== 0) {
            writer.uint32(16).uint32(message.field2);
        }
        return writer;
    };})($protobuf.Writer);

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
     * @function
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Test1} Test1
     */
    Test1.decode = (function(Reader) { return function decode(reader, len) {
        if (!(reader instanceof Reader)) {
            reader = Reader.create(reader);
        }
        var end = len === undefined ? reader.len : reader.pos + len, message = new $root.Test1();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.field1 = reader.string();
                break;

            case 2:
                message.field2 = reader.uint32();
                break;

            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };})($protobuf.Reader);

    /**
     * Decodes a Test1 message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {Test1} Test1
     */
    Test1.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a Test1 message.
     * @function
     * @param {Test1|Object} message Test1 message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    Test1.verify = (function(util) { return function verify(message) {
        if (message.field1 !== undefined) {
            if (!util.isString(message.field1)) {
                return "Test1.field1: string expected";
            }
        }
        if (message.field2 !== undefined) {
            if (!util.isInteger(message.field2)) {
                return "Test1.field2: integer expected";
            }
        }
        return null;
    };})($protobuf.util);

    /**
     * Creates a Test1 message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {Test1} Test1
     */
    Test1.fromObject = (function() { return function fromObject(object) {
        var message = new $root.Test1();
        if (object.field1 !== undefined && object.field1 !== null) {
            message.field1 = String(object.field1);
        }
        if (object.field2 !== undefined && object.field2 !== null) {
            message.field2 = object.field2 >>> 0;
        }
        return message;
    };})();

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
    Test1.toObject = (function() { return function toObject(message, options) {
        if (!options) {
            options = {};
        }
        var object = {};
        if (options.defaults) {
            object.field1 = "";
            object.field2 = 0;
        }
        for (var keys = Object.keys(message), i = 0; i < keys.length; ++i) {
            switch (keys[i]) {
            case "field1":
                if (message.field1 !== undefined && message.field1 !== null) {
                    object.field1 = message.field1;
                }
                break;

            case "field2":
                if (message.field2 !== undefined && message.field2 !== null) {
                    object.field2 = message.field2;
                }
                break;
            }
        }
        return object;
    };})();

    /**
     * Creates a plain object from this Test1 message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    $prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this Test1 to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    $prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, {
            longs: String,
            enums: String,
            bytes: String
        });
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
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias Test2.prototype */
    var $prototype = Test2.prototype;

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
     * @function
     * @param {Test2|Object} message Test2 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Test2.encode = (function(Writer) { return function encode(message, writer) {
        if (!writer) {
            writer = Writer.create();
        }
        return writer;
    };})($protobuf.Writer);

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
     * @function
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Test2} Test2
     */
    Test2.decode = (function(Reader) { return function decode(reader, len) {
        if (!(reader instanceof Reader)) {
            reader = Reader.create(reader);
        }
        var end = len === undefined ? reader.len : reader.pos + len, message = new $root.Test2();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };})($protobuf.Reader);

    /**
     * Decodes a Test2 message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {Test2} Test2
     */
    Test2.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a Test2 message.
     * @function
     * @param {Test2|Object} message Test2 message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    Test2.verify = (function() { return function verify() {
        return null;
    };})();

    /**
     * Creates a Test2 message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {Test2} Test2
     */
    Test2.fromObject = (function() { return function fromObject(object) {
        var message = new $root.Test2();
        return message;
    };})();

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
    Test2.toObject = (function() { return function toObject() {
        return {};
    };})();

    /**
     * Creates a plain object from this Test2 message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    $prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this Test2 to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    $prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, {
            longs: String,
            enums: String,
            bytes: String
        });
    };

    return Test2;
})();

/**
 * Test3 enum.
 * @exports Test3
 * @enum {number}
 * @property {number} ONE=1 Value with a comment.
 * @property {number} TWO=2 TWO value
 */
$root.Test3 = (function() {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[1] = "ONE"] = 1;
    values[valuesById[2] = "TWO"] = 2;
    return values;
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

$protobuf.roots["test_comments"] = $root;

module.exports = $root;
