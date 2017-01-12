/*eslint-disable block-scoped-var, no-redeclare, no-control-regex*/
"use strict";

var $protobuf = require("../../runtime");

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = {};

$root.Message = (function() {

    /**
     * Constructs a new Message.
     * @exports Message
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function Message(properties) {
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias Message.prototype */
    var $prototype = Message.prototype;

    /**
     * Message stringVal.
     * @type {string}
     */
    $prototype.stringVal = "";

    /**
     * Message stringRepeated.
     * @type {Array.<string>}
     */
    $prototype.stringRepeated = $protobuf.util.emptyArray;

    /**
     * Message uint64Val.
     * @type {number|$protobuf.Long}
     */
    $prototype.uint64Val = $protobuf.util.Long ? $protobuf.util.Long.fromBits(0,0,true) : 0;

    /**
     * Message uint64Repeated.
     * @type {Array.<number|$protobuf.Long>}
     */
    $prototype.uint64Repeated = $protobuf.util.emptyArray;

    /**
     * Message bytesVal.
     * @type {Uint8Array}
     */
    $prototype.bytesVal = $protobuf.util.newBuffer([]);

    /**
     * Message bytesRepeated.
     * @type {Array.<Uint8Array>}
     */
    $prototype.bytesRepeated = $protobuf.util.emptyArray;

    /**
     * Message enumVal.
     * @type {number}
     */
    $prototype.enumVal = 1;

    /**
     * Message enumRepeated.
     * @type {Array.<number>}
     */
    $prototype.enumRepeated = $protobuf.util.emptyArray;

    /**
     * Message int64Map.
     * @type {Object.<string,number|$protobuf.Long>}
     */
    $prototype.int64Map = $protobuf.util.emptyObject;

    // Referenced types
    var $types = [null, null, null, null, null, null, "Message.SomeEnum", "Message.SomeEnum", null]; $lazyTypes.push($types);

    /**
     * Creates a new Message instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {Message} Message instance
     */
    Message.create = function create(properties) {
        return new Message(properties);
    };

    /**
     * Encodes the specified Message message.
     * @function
     * @param {Message|Object} message Message message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Message.encode = (function(Writer, util) { return function encode(message, writer) {
        if (!writer) {
            writer = Writer.create();
        }
        if (message.stringVal !== undefined && message.stringVal !== "") {
            writer.uint32(10).string(message.stringVal);
        }
        if (message.stringRepeated) {
            for (var i = 0; i < message.stringRepeated.length; ++i) {
                writer.uint32(18).string(message.stringRepeated[i]);
            }
        }
        if (message.uint64Val !== undefined && message.uint64Val !== null && util.longNe(message.uint64Val, 0, 0)) {
            writer.uint32(24).uint64(message.uint64Val);
        }
        if (message.uint64Repeated && message.uint64Repeated.length) {
            writer.uint32(34).fork();
            for (var i = 0; i < message.uint64Repeated.length; ++i) {
                writer.uint64(message.uint64Repeated[i]);
            }
            writer.ldelim();
        }
        if (message.bytesVal && message.bytesVal.length) {
            writer.uint32(42).bytes(message.bytesVal);
        }
        if (message.bytesRepeated) {
            for (var i = 0; i < message.bytesRepeated.length; ++i) {
                writer.uint32(50).bytes(message.bytesRepeated[i]);
            }
        }
        if (message.enumVal !== undefined && message.enumVal !== 1) {
            writer.uint32(56).uint32(message.enumVal);
        }
        if (message.enumRepeated && message.enumRepeated.length) {
            writer.uint32(66).fork();
            for (var i = 0; i < message.enumRepeated.length; ++i) {
                writer.uint32(message.enumRepeated[i]);
            }
            writer.ldelim();
        }
        if (message.int64Map && message.int64Map !== util.emptyObject) {
            for (var keys = Object.keys(message.int64Map), i = 0; i < keys.length; ++i) {
                writer.uint32(74).fork().uint32(10).string(keys[i]).uint32(16).int64(message.int64Map[keys[i]]).ldelim();
            }
        }
        return writer;
    };})($protobuf.Writer, $protobuf.util);

    /**
     * Encodes the specified Message message, length delimited.
     * @param {Message|Object} message Message message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Message.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Message message from the specified reader or buffer.
     * @function
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Message} Message
     */
    Message.decode = (function(Reader, util) { return function decode(reader, len) {
        if (!(reader instanceof Reader)) {
            reader = Reader.create(reader);
        }
        var end = len === undefined ? reader.len : reader.pos + len, message = new $root.Message();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.stringVal = reader.string();
                break;

            case 2:
                if (!(message.stringRepeated && message.stringRepeated.length)) {
                    message.stringRepeated = [];
                }
                message.stringRepeated.push(reader.string());
                break;

            case 3:
                message.uint64Val = reader.uint64();
                break;

            case 4:
                if (!(message.uint64Repeated && message.uint64Repeated.length)) {
                    message.uint64Repeated = [];
                }
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2) {
                        message.uint64Repeated.push(reader.uint64());
                    }
                } else {
                    message.uint64Repeated.push(reader.uint64());
                }
                break;

            case 5:
                message.bytesVal = reader.bytes();
                break;

            case 6:
                if (!(message.bytesRepeated && message.bytesRepeated.length)) {
                    message.bytesRepeated = [];
                }
                message.bytesRepeated.push(reader.bytes());
                break;

            case 7:
                message.enumVal = reader.uint32();
                break;

            case 8:
                if (!(message.enumRepeated && message.enumRepeated.length)) {
                    message.enumRepeated = [];
                }
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2) {
                        message.enumRepeated.push(reader.uint32());
                    }
                } else {
                    message.enumRepeated.push(reader.uint32());
                }
                break;

            case 9:
                reader.skip().pos++;
                if (message.int64Map === util.emptyObject) {
                    message.int64Map = {};
                }
                var key = reader.string();
                reader.pos++;
                message.int64Map[typeof key === "object" ? util.longToHash(key) : key] = reader.int64();
                break;

            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };})($protobuf.Reader, $protobuf.util);

    /**
     * Decodes a Message message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {Message} Message
     */
    Message.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a Message message.
     * @function
     * @param {Message|Object} message Message message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    Message.verify = (function(util) { return function verify(message) {
        if (message.stringVal !== undefined) {
            if (!util.isString(message.stringVal)) {
                return "Message.stringVal: string expected";
            }
        }
        if (message.stringRepeated !== undefined) {
            if (!Array.isArray(message.stringRepeated)) {
                return "Message.stringRepeated: array expected";
            }
            for (var i = 0; i < message.stringRepeated.length; ++i) {
                if (!util.isString(message.stringRepeated[i])) {
                    return "Message.stringRepeated: string[] expected";
                }
            }
        }
        if (message.uint64Val !== undefined) {
            if (!util.isInteger(message.uint64Val) && !(message.uint64Val && util.isInteger(message.uint64Val.low) && util.isInteger(message.uint64Val.high))) {
                return "Message.uint64Val: integer|Long expected";
            }
        }
        if (message.uint64Repeated !== undefined) {
            if (!Array.isArray(message.uint64Repeated)) {
                return "Message.uint64Repeated: array expected";
            }
            for (var i = 0; i < message.uint64Repeated.length; ++i) {
                if (!util.isInteger(message.uint64Repeated[i]) && !(message.uint64Repeated[i] && util.isInteger(message.uint64Repeated[i].low) && util.isInteger(message.uint64Repeated[i].high))) {
                    return "Message.uint64Repeated: integer|Long[] expected";
                }
            }
        }
        if (message.bytesVal !== undefined) {
            if (!(message.bytesVal && typeof message.bytesVal.length === "number" || util.isString(message.bytesVal))) {
                return "Message.bytesVal: buffer expected";
            }
        }
        if (message.bytesRepeated !== undefined) {
            if (!Array.isArray(message.bytesRepeated)) {
                return "Message.bytesRepeated: array expected";
            }
            for (var i = 0; i < message.bytesRepeated.length; ++i) {
                if (!(message.bytesRepeated[i] && typeof message.bytesRepeated[i].length === "number" || util.isString(message.bytesRepeated[i]))) {
                    return "Message.bytesRepeated: buffer[] expected";
                }
            }
        }
        if (message.enumVal !== undefined) {
            switch (message.enumVal) {
            default:
                return "Message.enumVal: enum value expected";

            case 1:
            case 2:
                break;
            }
        }
        if (message.enumRepeated !== undefined) {
            if (!Array.isArray(message.enumRepeated)) {
                return "Message.enumRepeated: array expected";
            }
            for (var i = 0; i < message.enumRepeated.length; ++i) {
                switch (message.enumRepeated[i]) {
                default:
                    return "Message.enumRepeated: enum value[] expected";

                case 1:
                case 2:
                    break;
                }
            }
        }
        if (message.int64Map !== undefined) {
            if (!util.isObject(message.int64Map)) {
                return "Message.int64Map: object expected";
            }
            var key = Object.keys(message.int64Map);
            for (var i = 0; i < key.length; ++i) {
                if (!util.isInteger(message.int64Map[key[i]]) && !(message.int64Map[key[i]] && util.isInteger(message.int64Map[key[i]].low) && util.isInteger(message.int64Map[key[i]].high))) {
                    return "Message.int64Map: integer|Long{key:string} expected";
                }
            }
        }
        return null;
    };})($protobuf.util);

    /**
     * Creates a Message message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {Message} Message
     */
    Message.fromObject = (function(util) { return function fromObject(object) {
        var message = new $root.Message();
        if (object.stringVal !== undefined && object.stringVal !== null) {
            message.stringVal = String(object.stringVal);
        }
        if (object.stringRepeated) {
            message.stringRepeated = [];
            for (var i = 0; i < object.stringRepeated.length; ++i) {
                message.stringRepeated[i] = String(object.stringRepeated[i]);
            }
        }
        if (object.uint64Val !== undefined && object.uint64Val !== null) {
            if (util.Long) {
                (message.uint64Val = util.Long.fromValue(object.uint64Val)).unsigned = true;
            } else {
                if (typeof object.uint64Val === "string") {
                    message.uint64Val = parseInt(object.uint64Val, 10);
                } else {
                    if (typeof object.uint64Val === "number") {
                        message.uint64Val = object.uint64Val;
                    } else {
                        if (typeof object.uint64Val === "object") {
                            message.uint64Val = new util.LongBits(object.uint64Val.low, object.uint64Val.high).toNumber(true);
                        }
                    }
                }
            }
        }
        if (object.uint64Repeated) {
            message.uint64Repeated = [];
            for (var i = 0; i < object.uint64Repeated.length; ++i) {
                if (util.Long) {
                    (message.uint64Repeated[i] = util.Long.fromValue(object.uint64Repeated[i])).unsigned = true;
                } else {
                    if (typeof object.uint64Repeated[i] === "string") {
                        message.uint64Repeated[i] = parseInt(object.uint64Repeated[i], 10);
                    } else {
                        if (typeof object.uint64Repeated[i] === "number") {
                            message.uint64Repeated[i] = object.uint64Repeated[i];
                        } else {
                            if (typeof object.uint64Repeated[i] === "object") {
                                message.uint64Repeated[i] = new util.LongBits(object.uint64Repeated[i].low, object.uint64Repeated[i].high).toNumber(true);
                            }
                        }
                    }
                }
            }
        }
        if (object.bytesVal !== undefined && object.bytesVal !== null) {
            if (typeof object.bytesVal === "string") {
                util.base64.decode(object.bytesVal, message.bytesVal = util.newBuffer(util.base64.length(object.bytesVal)), 0);
            } else {
                if (object.bytesVal && object.bytesVal.length) {
                    message.bytesVal = object.bytesVal;
                }
            }
        }
        if (object.bytesRepeated) {
            message.bytesRepeated = [];
            for (var i = 0; i < object.bytesRepeated.length; ++i) {
                if (typeof object.bytesRepeated[i] === "string") {
                    util.base64.decode(object.bytesRepeated[i], message.bytesRepeated[i] = util.newBuffer(util.base64.length(object.bytesRepeated[i])), 0);
                } else {
                    if (object.bytesRepeated[i] && object.bytesRepeated[i].length) {
                        message.bytesRepeated[i] = object.bytesRepeated[i];
                    }
                }
            }
        }
        switch (object.enumVal) {
        case "ONE":
        case 1:
            message.enumVal = 1;
            break;

        case "TWO":
        case 2:
            message.enumVal = 2;
            break;
        }
        if (object.enumRepeated) {
            message.enumRepeated = [];
            for (var i = 0; i < object.enumRepeated.length; ++i) {
                switch (object.enumRepeated[i]) {
                default:
                case "ONE":
                case 1:
                    message.enumRepeated[i] = 1;
                    break;

                case "TWO":
                case 2:
                    message.enumRepeated[i] = 2;
                    break;
                }
            }
        }
        if (object.int64Map) {
            message.int64Map = {};
            for (var keys = Object.keys(object.int64Map), i = 0; i < keys.length; ++i) {
                if (util.Long) {
                    (message.int64Map[keys[i]] = util.Long.fromValue(object.int64Map[keys[i]])).unsigned = false;
                } else {
                    if (typeof object.int64Map[keys[i]] === "string") {
                        message.int64Map[keys[i]] = parseInt(object.int64Map[keys[i]], 10);
                    } else {
                        if (typeof object.int64Map[keys[i]] === "number") {
                            message.int64Map[keys[i]] = object.int64Map[keys[i]];
                        } else {
                            if (typeof object.int64Map[keys[i]] === "object") {
                                message.int64Map[keys[i]] = new util.LongBits(object.int64Map[keys[i]].low, object.int64Map[keys[i]].high).toNumber();
                            }
                        }
                    }
                }
            }
        }
        return message;
    };})($protobuf.util);

    /**
     * Creates a Message message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link Message.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {Message} Message
     */
    Message.from = Message.fromObject;

    /**
     * Creates a plain object from a Message message. Also converts values to other types if specified.
     * @param {Message} message Message
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Message.toObject = (function(util, types) { return function toObject(message, options) {
        if (!options) {
            options = {};
        }
        var object = {};
        if (options.arrays || options.defaults) {
            object.stringRepeated = [];
            object.uint64Repeated = [];
            object.bytesRepeated = [];
            object.enumRepeated = [];
        }
        if (options.objects || options.defaults) {
            object.int64Map = {};
        }
        if (options.defaults) {
            object.stringVal = "";
            if (util.Long) {
                var long = new util.Long(0, 0, true);
                object.uint64Val = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else {
                object.uint64Val = options.longs === String ? "0" : 0;
            }
            object.bytesVal = options.bytes === String ? "" : [];
            object.enumVal = options.enums === String ? "ONE" : 1;
        }
        for (var keys = Object.keys(message), i = 0; i < keys.length; ++i) {
            switch (keys[i]) {
            case "stringVal":
                if (message.stringVal !== undefined && message.stringVal !== null) {
                    object.stringVal = message.stringVal;
                }
                break;

            case "stringRepeated":
                if (message.stringRepeated.length) {
                    object.stringRepeated = [];
                    for (var j = 0; j < message.stringRepeated.length; ++j) {
                        object.stringRepeated[j] = message.stringRepeated[j];
                    }
                }
                break;

            case "uint64Val":
                if (message.uint64Val !== undefined && message.uint64Val !== null) {
                    if (typeof message.uint64Val === "number") {
                        object.uint64Val = options.longs === String ? String(message.uint64Val) : message.uint64Val;
                    } else {
                        object.uint64Val = options.longs === String ? util.Long.prototype.toString.call(message.uint64Val) : options.longs === Number ? new util.LongBits(message.uint64Val.low, message.uint64Val.high).toNumber(true) : message.uint64Val;
                    }
                }
                break;

            case "uint64Repeated":
                if (message.uint64Repeated.length) {
                    object.uint64Repeated = [];
                    for (var j = 0; j < message.uint64Repeated.length; ++j) {
                        if (typeof message.uint64Repeated[j] === "number") {
                            object.uint64Repeated[j] = options.longs === String ? String(message.uint64Repeated[j]) : message.uint64Repeated[j];
                        } else {
                            object.uint64Repeated[j] = options.longs === String ? util.Long.prototype.toString.call(message.uint64Repeated[j]) : options.longs === Number ? new util.LongBits(message.uint64Repeated[j].low, message.uint64Repeated[j].high).toNumber(true) : message.uint64Repeated[j];
                        }
                    }
                }
                break;

            case "bytesVal":
                if (message.bytesVal !== undefined && message.bytesVal !== null) {
                    object.bytesVal = options.bytes === String ? util.base64.encode(message.bytesVal, 0, message.bytesVal.length) : options.bytes === Array ? Array.prototype.slice.call(message.bytesVal) : message.bytesVal;
                }
                break;

            case "bytesRepeated":
                if (message.bytesRepeated.length) {
                    object.bytesRepeated = [];
                    for (var j = 0; j < message.bytesRepeated.length; ++j) {
                        object.bytesRepeated[j] = options.bytes === String ? util.base64.encode(message.bytesRepeated[j], 0, message.bytesRepeated[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.bytesRepeated[j]) : message.bytesRepeated[j];
                    }
                }
                break;

            case "enumVal":
                if (message.enumVal !== undefined && message.enumVal !== null) {
                    object.enumVal = options.enums === String ? types[6][message.enumVal] : message.enumVal;
                }
                break;

            case "enumRepeated":
                if (message.enumRepeated.length) {
                    object.enumRepeated = [];
                    for (var j = 0; j < message.enumRepeated.length; ++j) {
                        object.enumRepeated[j] = options.enums === String ? types[7].values[message.enumRepeated[j]] : message.enumRepeated[j];
                    }
                }
                break;

            case "int64Map":
                if (message.int64Map && message.int64Map !== util.emptyObject) {
                    object.int64Map = {};
                    for (var keys2 = Object.keys(message.int64Map), j = 0; j < keys2.length; ++j) {
                        if (typeof message.int64Map[keys2[j]] === "number") {
                            object.int64Map[keys2[j]] = options.longs === String ? String(message.int64Map[keys2[j]]) : message.int64Map[keys2[j]];
                        } else {
                            object.int64Map[keys2[j]] = options.longs === String ? util.Long.prototype.toString.call(message.int64Map[keys2[j]]) : options.longs === Number ? new util.LongBits(message.int64Map[keys2[j]].low, message.int64Map[keys2[j]].high).toNumber() : message.int64Map[keys2[j]];
                        }
                    }
                }
                break;
            }
        }
        return object;
    };})($protobuf.util, $types);

    /**
     * Creates a plain object from this Message message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    $prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this Message to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    $prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, {
            longs: String,
            enums: String,
            bytes: String
        });
    };

    /**
     * SomeEnum enum.
     * @name SomeEnum
     * @memberof Message
     * @enum {number}
     * @property {number} ONE=1 ONE value
     * @property {number} TWO=2 TWO value
     */
    Message.SomeEnum = (function() {
        var valuesById = {},
            values = Object.create(valuesById);
        values[valuesById[1] = "ONE"] = 1;
        values[valuesById[2] = "TWO"] = 2;
        return values;
    })();

    return Message;
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

$protobuf.roots["test_convert"] = $root;

module.exports = $root;
