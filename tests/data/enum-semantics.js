/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
"use strict";

var $protobuf = require("../../minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
var $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $Array = $util.global.Array, $TypeError = $util.global.TypeError, $String = $util.global.String;

// Exported root namespace
var $root = $protobuf.roots["test_enum-semantics"] || ($protobuf.roots["test_enum-semantics"] = {});

$root.OpenMessage = (function() {

    /**
     * Properties of an OpenMessage.
     * @typedef {Object} OpenMessage.$Properties
     * @property {OpenMessage.OpenEnum|null} [singular] OpenMessage singular
     * @property {Array.<OpenMessage.OpenEnum>|null} [repeated] OpenMessage repeated
     * @property {Array.<OpenMessage.OpenEnum>|null} [packed] OpenMessage packed
     * @property {Object.<string,OpenMessage.OpenEnum>|null} [values] OpenMessage values
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of an OpenMessage.
     * @exports IOpenMessage
     * @interface IOpenMessage
     * @augments OpenMessage.$Properties
     * @deprecated Use OpenMessage.$Properties instead.
     */

    /**
     * Shape of an OpenMessage.
     * @typedef {OpenMessage.$Properties} OpenMessage.$Shape
     */

    /**
     * Constructs a new OpenMessage.
     * @exports OpenMessage
     * @classdesc Represents an OpenMessage.
     * @constructor
     * @param {OpenMessage.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    var OpenMessage = function (properties) {
        this.repeated = [];
        this.packed = [];
        this.values = {};
        if (properties)
            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * OpenMessage singular.
     * @member {OpenMessage.OpenEnum} singular
     * @memberof OpenMessage
     * @instance
     */
    OpenMessage.prototype.singular = 0;

    /**
     * OpenMessage repeated.
     * @member {Array.<OpenMessage.OpenEnum>} repeated
     * @memberof OpenMessage
     * @instance
     */
    OpenMessage.prototype.repeated = $util.emptyArray;

    /**
     * OpenMessage packed.
     * @member {Array.<OpenMessage.OpenEnum>} packed
     * @memberof OpenMessage
     * @instance
     */
    OpenMessage.prototype.packed = $util.emptyArray;

    /**
     * OpenMessage values.
     * @member {Object.<string,OpenMessage.OpenEnum>} values
     * @memberof OpenMessage
     * @instance
     */
    OpenMessage.prototype.values = $util.emptyObject;

    /**
     * Creates a new OpenMessage instance using the specified properties.
     * @function create
     * @memberof OpenMessage
     * @static
     * @param {OpenMessage.$Properties=} [properties] Properties to set
     * @returns {OpenMessage} OpenMessage instance
     * @type {{
     *   (properties: OpenMessage.$Shape): OpenMessage & OpenMessage.$Shape;
     *   (properties?: OpenMessage.$Properties): OpenMessage;
     * }}
     */
    OpenMessage.create = function(properties) {
        return new OpenMessage(properties);
    };

    /**
     * Encodes the specified OpenMessage message. Does not implicitly {@link OpenMessage.verify|verify} messages.
     * @function encode
     * @memberof OpenMessage
     * @static
     * @param {OpenMessage.$Properties} message OpenMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OpenMessage.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.singular != null && $Object.hasOwnProperty.call(message, "singular"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.singular);
        if (message.repeated != null && message.repeated.length)
            for (var i = 0; i < message.repeated.length; ++i)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.repeated[i]);
        if (message.packed != null && message.packed.length) {
            writer.uint32(/* id 3, wireType 2 =*/26).fork();
            for (var i = 0; i < message.packed.length; ++i)
                writer.int32(message.packed[i]);
            writer.ldelim();
        }
        if (message.values != null && $Object.hasOwnProperty.call(message, "values"))
            for (var keys = $Object.keys(message.values), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.values[keys[i]]).ldelim();
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified OpenMessage message, length delimited. Does not implicitly {@link OpenMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof OpenMessage
     * @static
     * @param {OpenMessage.$Properties} message OpenMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OpenMessage.encodeDelimited = function(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes an OpenMessage message from the specified reader or buffer.
     * @function decode
     * @memberof OpenMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {OpenMessage & OpenMessage.$Shape} OpenMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OpenMessage.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.OpenMessage(), key, value;
        while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.singular = reader.int32();
                    continue;
                }
            case 2: {
                    if (wireType === 2) {
                        if (!(message.repeated && message.repeated.length))
                            message.repeated = [];
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.repeated.push(reader.int32());
                        continue;
                    }
                    if (wireType !== 0)
                        break;
                    if (!(message.repeated && message.repeated.length))
                        message.repeated = [];
                    message.repeated.push(reader.int32());
                    continue;
                }
            case 3: {
                    if (wireType === 2) {
                        if (!(message.packed && message.packed.length))
                            message.packed = [];
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.packed.push(reader.int32());
                        continue;
                    }
                    if (wireType !== 0)
                        break;
                    if (!(message.packed && message.packed.length))
                        message.packed = [];
                    message.packed.push(reader.int32());
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    if (message.values === $util.emptyObject)
                        message.values = {};
                    var end2 = reader.uint32() + reader.pos;
                    key = "";
                    value = 0;
                    while (reader.pos < end2) {
                        var tag2 = reader.tag();
                        wireType = tag2 & 7;
                        switch (tag2 >>>= 3) {
                        case 1:
                            if (wireType !== 2)
                                break;
                            key = reader.stringVerify();
                            continue;
                        case 2:
                            if (wireType !== 0)
                                break;
                            value = reader.int32();
                            continue;
                        }
                        reader.skipType(wireType, _depth, tag2);
                    }
                    if (key === "__proto__")
                        $util.makeProp(message.values, key);
                    message.values[key] = value;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes an OpenMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof OpenMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {OpenMessage & OpenMessage.$Shape} OpenMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OpenMessage.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an OpenMessage message.
     * @function verify
     * @memberof OpenMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    OpenMessage.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.singular != null && $Object.hasOwnProperty.call(message, "singular"))
            if (typeof message.singular !== "number" || (message.singular | 0) !== message.singular)
                return "singular: enum value expected";
        if (message.repeated != null && $Object.hasOwnProperty.call(message, "repeated")) {
            if (!$Array.isArray(message.repeated))
                return "repeated: array expected";
            for (var i = 0; i < message.repeated.length; ++i)
                if (typeof message.repeated[i] !== "number" || (message.repeated[i] | 0) !== message.repeated[i])
                    return "repeated: enum value[] expected";
        }
        if (message.packed != null && $Object.hasOwnProperty.call(message, "packed")) {
            if (!$Array.isArray(message.packed))
                return "packed: array expected";
            for (var i = 0; i < message.packed.length; ++i)
                if (typeof message.packed[i] !== "number" || (message.packed[i] | 0) !== message.packed[i])
                    return "packed: enum value[] expected";
        }
        if (message.values != null && $Object.hasOwnProperty.call(message, "values")) {
            if (!$util.isObject(message.values))
                return "values: object expected";
            var key = $Object.keys(message.values);
            for (var i = 0; i < key.length; ++i)
                if (typeof message.values[key[i]] !== "number" || (message.values[key[i]] | 0) !== message.values[key[i]])
                    return "values: enum value{k:string} expected";
        }
        return null;
    };

    /**
     * Creates an OpenMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof OpenMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {OpenMessage} OpenMessage
     */
    OpenMessage.fromObject = function (object, _depth) {
        if (object instanceof $root.OpenMessage)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".OpenMessage: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        var message = new $root.OpenMessage();
        switch (object.singular) {
        case "ZERO":
        case 0:
            message.singular = 0;
            break;
        case "ONE":
        case 1:
            message.singular = 1;
            break;
        default:
            if (typeof object.singular === "number" && (object.singular | 0) === object.singular)
                message.singular = object.singular;
        }
        if (object.repeated) {
            if (!$Array.isArray(object.repeated))
                throw $TypeError(".OpenMessage.repeated: array expected");
            message.repeated = [];
            for (var i = 0; i < object.repeated.length; ++i)
                switch (object.repeated[i]) {
                case "ZERO":
                case 0:
                    message.repeated[message.repeated.length] = 0;
                    break;
                case "ONE":
                case 1:
                    message.repeated[message.repeated.length] = 1;
                    break;
                default:
                    if (typeof object.repeated[i] === "number" && (object.repeated[i] | 0) === object.repeated[i])
                        message.repeated[message.repeated.length] = object.repeated[i];
                }
        }
        if (object.packed) {
            if (!$Array.isArray(object.packed))
                throw $TypeError(".OpenMessage.packed: array expected");
            message.packed = [];
            for (var i = 0; i < object.packed.length; ++i)
                switch (object.packed[i]) {
                case "ZERO":
                case 0:
                    message.packed[message.packed.length] = 0;
                    break;
                case "ONE":
                case 1:
                    message.packed[message.packed.length] = 1;
                    break;
                default:
                    if (typeof object.packed[i] === "number" && (object.packed[i] | 0) === object.packed[i])
                        message.packed[message.packed.length] = object.packed[i];
                }
        }
        if (object.values) {
            if (!$util.isObject(object.values))
                throw $TypeError(".OpenMessage.values: object expected");
            message.values = {};
            for (var keys = $Object.keys(object.values), i = 0; i < keys.length; ++i) {
                if (keys[i] === "__proto__")
                    $util.makeProp(message.values, keys[i]);
                switch (object.values[keys[i]]) {
                case "ZERO":
                case 0:
                    message.values[keys[i]] = 0;
                    break;
                case "ONE":
                case 1:
                    message.values[keys[i]] = 1;
                    break;
                default:
                    if (typeof object.values[keys[i]] === "number" && (object.values[keys[i]] | 0) === object.values[keys[i]])
                        message.values[keys[i]] = object.values[keys[i]];
                }
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an OpenMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof OpenMessage
     * @static
     * @param {OpenMessage} message OpenMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    OpenMessage.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        var object = {};
        if (options.arrays || options.defaults) {
            object.repeated = [];
            object.packed = [];
        }
        if (options.objects || options.defaults)
            object.values = {};
        if (options.defaults)
            object.singular = options.enums === $String ? "ZERO" : 0;
        if (message.singular != null && $Object.hasOwnProperty.call(message, "singular"))
            object.singular = options.enums === $String ? $root.OpenMessage.OpenEnum[message.singular] === $undefined ? message.singular : $root.OpenMessage.OpenEnum[message.singular] : message.singular;
        if (message.repeated && message.repeated.length) {
            object.repeated = $Array(message.repeated.length);
            for (var j = 0; j < message.repeated.length; ++j)
                object.repeated[j] = options.enums === $String ? $root.OpenMessage.OpenEnum[message.repeated[j]] === $undefined ? message.repeated[j] : $root.OpenMessage.OpenEnum[message.repeated[j]] : message.repeated[j];
        }
        if (message.packed && message.packed.length) {
            object.packed = $Array(message.packed.length);
            for (var j = 0; j < message.packed.length; ++j)
                object.packed[j] = options.enums === $String ? $root.OpenMessage.OpenEnum[message.packed[j]] === $undefined ? message.packed[j] : $root.OpenMessage.OpenEnum[message.packed[j]] : message.packed[j];
        }
        var keys2;
        if (message.values && (keys2 = $Object.keys(message.values)).length) {
            object.values = {};
            for (var j = 0; j < keys2.length; ++j) {
                if (keys2[j] === "__proto__")
                    $util.makeProp(object.values, keys2[j]);
                object.values[keys2[j]] = options.enums === $String ? $root.OpenMessage.OpenEnum[message.values[keys2[j]]] === $undefined ? message.values[keys2[j]] : $root.OpenMessage.OpenEnum[message.values[keys2[j]]] : message.values[keys2[j]];
            }
        }
        return object;
    };

    /**
     * Converts this OpenMessage to JSON.
     * @function toJSON
     * @memberof OpenMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    OpenMessage.prototype.toJSON = function() {
        return OpenMessage.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for OpenMessage
     * @function getTypeUrl
     * @memberof OpenMessage
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    OpenMessage.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/OpenMessage";
    };

    /**
     * OpenEnum enum.
     * @name OpenMessage.OpenEnum
     * @enum {number}
     * @property {number} ZERO=0 ZERO value
     * @property {number} ONE=1 ONE value
     */
    OpenMessage.OpenEnum = (function() {
        var valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "ZERO"] = 0;
        values[valuesById[1] = "ONE"] = 1;
        return values;
    })();

    return OpenMessage;
})();

$root.ClosedMessage = (function() {

    /**
     * Properties of a ClosedMessage.
     * @typedef {Object} ClosedMessage.$Properties
     * @property {ClosedMessage.ClosedEnum|null} [singular] ClosedMessage singular
     * @property {Array.<ClosedMessage.ClosedEnum>|null} [repeated] ClosedMessage repeated
     * @property {Array.<ClosedMessage.ClosedEnum>|null} [packed] ClosedMessage packed
     * @property {Object.<string,ClosedMessage.ClosedEnum>|null} [values] ClosedMessage values
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a ClosedMessage.
     * @exports IClosedMessage
     * @interface IClosedMessage
     * @augments ClosedMessage.$Properties
     * @deprecated Use ClosedMessage.$Properties instead.
     */

    /**
     * Shape of a ClosedMessage.
     * @typedef {ClosedMessage.$Properties} ClosedMessage.$Shape
     */

    /**
     * Constructs a new ClosedMessage.
     * @exports ClosedMessage
     * @classdesc Represents a ClosedMessage.
     * @constructor
     * @param {ClosedMessage.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    var ClosedMessage = function (properties) {
        this.repeated = [];
        this.packed = [];
        this.values = {};
        if (properties)
            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * ClosedMessage singular.
     * @member {ClosedMessage.ClosedEnum} singular
     * @memberof ClosedMessage
     * @instance
     */
    ClosedMessage.prototype.singular = 0;

    /**
     * ClosedMessage repeated.
     * @member {Array.<ClosedMessage.ClosedEnum>} repeated
     * @memberof ClosedMessage
     * @instance
     */
    ClosedMessage.prototype.repeated = $util.emptyArray;

    /**
     * ClosedMessage packed.
     * @member {Array.<ClosedMessage.ClosedEnum>} packed
     * @memberof ClosedMessage
     * @instance
     */
    ClosedMessage.prototype.packed = $util.emptyArray;

    /**
     * ClosedMessage values.
     * @member {Object.<string,ClosedMessage.ClosedEnum>} values
     * @memberof ClosedMessage
     * @instance
     */
    ClosedMessage.prototype.values = $util.emptyObject;

    /**
     * Creates a new ClosedMessage instance using the specified properties.
     * @function create
     * @memberof ClosedMessage
     * @static
     * @param {ClosedMessage.$Properties=} [properties] Properties to set
     * @returns {ClosedMessage} ClosedMessage instance
     * @type {{
     *   (properties: ClosedMessage.$Shape): ClosedMessage & ClosedMessage.$Shape;
     *   (properties?: ClosedMessage.$Properties): ClosedMessage;
     * }}
     */
    ClosedMessage.create = function(properties) {
        return new ClosedMessage(properties);
    };

    /**
     * Encodes the specified ClosedMessage message. Does not implicitly {@link ClosedMessage.verify|verify} messages.
     * @function encode
     * @memberof ClosedMessage
     * @static
     * @param {ClosedMessage.$Properties} message ClosedMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClosedMessage.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.singular != null && $Object.hasOwnProperty.call(message, "singular"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.singular);
        if (message.repeated != null && message.repeated.length)
            for (var i = 0; i < message.repeated.length; ++i)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.repeated[i]);
        if (message.packed != null && message.packed.length) {
            writer.uint32(/* id 3, wireType 2 =*/26).fork();
            for (var i = 0; i < message.packed.length; ++i)
                writer.int32(message.packed[i]);
            writer.ldelim();
        }
        if (message.values != null && $Object.hasOwnProperty.call(message, "values"))
            for (var keys = $Object.keys(message.values), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.values[keys[i]]).ldelim();
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified ClosedMessage message, length delimited. Does not implicitly {@link ClosedMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ClosedMessage
     * @static
     * @param {ClosedMessage.$Properties} message ClosedMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClosedMessage.encodeDelimited = function(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes a ClosedMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ClosedMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ClosedMessage & ClosedMessage.$Shape} ClosedMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClosedMessage.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.ClosedMessage(), key, value;
        while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    value = reader.int32();
                    if ($root.ClosedMessage.ClosedEnum[value] !== $undefined)
                        message.singular = value;
                    else if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    continue;
                }
            case 2: {
                    if (wireType === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            start = reader.pos;
                            value = reader.int32();
                            if ($root.ClosedMessage.ClosedEnum[value] !== $undefined) {
                                if (!(message.repeated && message.repeated.length))
                                    message.repeated = [];
                                message.repeated.push(value);
                            } else if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push($util.rawField(2, 0, reader.raw(start, reader.pos)));
                            }
                        }
                        continue;
                    }
                    if (wireType !== 0)
                        break;
                    value = reader.int32();
                    if ($root.ClosedMessage.ClosedEnum[value] !== $undefined) {
                        if (!(message.repeated && message.repeated.length))
                            message.repeated = [];
                        message.repeated.push(value);
                    } else if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    continue;
                }
            case 3: {
                    if (wireType === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            start = reader.pos;
                            value = reader.int32();
                            if ($root.ClosedMessage.ClosedEnum[value] !== $undefined) {
                                if (!(message.packed && message.packed.length))
                                    message.packed = [];
                                message.packed.push(value);
                            } else if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push($util.rawField(3, 0, reader.raw(start, reader.pos)));
                            }
                        }
                        continue;
                    }
                    if (wireType !== 0)
                        break;
                    value = reader.int32();
                    if ($root.ClosedMessage.ClosedEnum[value] !== $undefined) {
                        if (!(message.packed && message.packed.length))
                            message.packed = [];
                        message.packed.push(value);
                    } else if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    var end2 = reader.uint32() + reader.pos;
                    key = "";
                    value = 0;
                    while (reader.pos < end2) {
                        var tag2 = reader.tag();
                        wireType = tag2 & 7;
                        switch (tag2 >>>= 3) {
                        case 1:
                            if (wireType !== 2)
                                break;
                            key = reader.stringVerify();
                            continue;
                        case 2:
                            if (wireType !== 0)
                                break;
                            value = reader.int32();
                            continue;
                        }
                        reader.skipType(wireType, _depth, tag2);
                    }
                    if ($root.ClosedMessage.ClosedEnum[value] === $undefined) {
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                        continue;
                    }
                    if (message.values === $util.emptyObject)
                        message.values = {};
                    if (key === "__proto__")
                        $util.makeProp(message.values, key);
                    message.values[key] = value;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a ClosedMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ClosedMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ClosedMessage & ClosedMessage.$Shape} ClosedMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClosedMessage.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ClosedMessage message.
     * @function verify
     * @memberof ClosedMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ClosedMessage.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.singular != null && $Object.hasOwnProperty.call(message, "singular"))
            switch (message.singular) {
            default:
                return "singular: enum value expected";
            case 0:
            case 1:
                break;
            }
        if (message.repeated != null && $Object.hasOwnProperty.call(message, "repeated")) {
            if (!$Array.isArray(message.repeated))
                return "repeated: array expected";
            for (var i = 0; i < message.repeated.length; ++i)
                switch (message.repeated[i]) {
                default:
                    return "repeated: enum value[] expected";
                case 0:
                case 1:
                    break;
                }
        }
        if (message.packed != null && $Object.hasOwnProperty.call(message, "packed")) {
            if (!$Array.isArray(message.packed))
                return "packed: array expected";
            for (var i = 0; i < message.packed.length; ++i)
                switch (message.packed[i]) {
                default:
                    return "packed: enum value[] expected";
                case 0:
                case 1:
                    break;
                }
        }
        if (message.values != null && $Object.hasOwnProperty.call(message, "values")) {
            if (!$util.isObject(message.values))
                return "values: object expected";
            var key = $Object.keys(message.values);
            for (var i = 0; i < key.length; ++i)
                switch (message.values[key[i]]) {
                default:
                    return "values: enum value{k:string} expected";
                case 0:
                case 1:
                    break;
                }
        }
        return null;
    };

    /**
     * Creates a ClosedMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ClosedMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ClosedMessage} ClosedMessage
     */
    ClosedMessage.fromObject = function (object, _depth) {
        if (object instanceof $root.ClosedMessage)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".ClosedMessage: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        var message = new $root.ClosedMessage();
        switch (object.singular) {
        case "ZERO":
        case 0:
            message.singular = 0;
            break;
        case "ONE":
        case 1:
            message.singular = 1;
            break;
        default:
        }
        if (object.repeated) {
            if (!$Array.isArray(object.repeated))
                throw $TypeError(".ClosedMessage.repeated: array expected");
            message.repeated = [];
            for (var i = 0; i < object.repeated.length; ++i)
                switch (object.repeated[i]) {
                case "ZERO":
                case 0:
                    message.repeated[message.repeated.length] = 0;
                    break;
                case "ONE":
                case 1:
                    message.repeated[message.repeated.length] = 1;
                    break;
                default:
                }
        }
        if (object.packed) {
            if (!$Array.isArray(object.packed))
                throw $TypeError(".ClosedMessage.packed: array expected");
            message.packed = [];
            for (var i = 0; i < object.packed.length; ++i)
                switch (object.packed[i]) {
                case "ZERO":
                case 0:
                    message.packed[message.packed.length] = 0;
                    break;
                case "ONE":
                case 1:
                    message.packed[message.packed.length] = 1;
                    break;
                default:
                }
        }
        if (object.values) {
            if (!$util.isObject(object.values))
                throw $TypeError(".ClosedMessage.values: object expected");
            message.values = {};
            for (var keys = $Object.keys(object.values), i = 0; i < keys.length; ++i) {
                if (keys[i] === "__proto__")
                    $util.makeProp(message.values, keys[i]);
                switch (object.values[keys[i]]) {
                case "ZERO":
                case 0:
                    message.values[keys[i]] = 0;
                    break;
                case "ONE":
                case 1:
                    message.values[keys[i]] = 1;
                    break;
                default:
                }
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a ClosedMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ClosedMessage
     * @static
     * @param {ClosedMessage} message ClosedMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ClosedMessage.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        var object = {};
        if (options.arrays || options.defaults) {
            object.repeated = [];
            object.packed = [];
        }
        if (options.objects || options.defaults)
            object.values = {};
        if (options.defaults)
            object.singular = options.enums === $String ? "ZERO" : 0;
        if (message.singular != null && $Object.hasOwnProperty.call(message, "singular"))
            object.singular = options.enums === $String ? $root.ClosedMessage.ClosedEnum[message.singular] === $undefined ? message.singular : $root.ClosedMessage.ClosedEnum[message.singular] : message.singular;
        if (message.repeated && message.repeated.length) {
            object.repeated = $Array(message.repeated.length);
            for (var j = 0; j < message.repeated.length; ++j)
                object.repeated[j] = options.enums === $String ? $root.ClosedMessage.ClosedEnum[message.repeated[j]] === $undefined ? message.repeated[j] : $root.ClosedMessage.ClosedEnum[message.repeated[j]] : message.repeated[j];
        }
        if (message.packed && message.packed.length) {
            object.packed = $Array(message.packed.length);
            for (var j = 0; j < message.packed.length; ++j)
                object.packed[j] = options.enums === $String ? $root.ClosedMessage.ClosedEnum[message.packed[j]] === $undefined ? message.packed[j] : $root.ClosedMessage.ClosedEnum[message.packed[j]] : message.packed[j];
        }
        var keys2;
        if (message.values && (keys2 = $Object.keys(message.values)).length) {
            object.values = {};
            for (var j = 0; j < keys2.length; ++j) {
                if (keys2[j] === "__proto__")
                    $util.makeProp(object.values, keys2[j]);
                object.values[keys2[j]] = options.enums === $String ? $root.ClosedMessage.ClosedEnum[message.values[keys2[j]]] === $undefined ? message.values[keys2[j]] : $root.ClosedMessage.ClosedEnum[message.values[keys2[j]]] : message.values[keys2[j]];
            }
        }
        return object;
    };

    /**
     * Converts this ClosedMessage to JSON.
     * @function toJSON
     * @memberof ClosedMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ClosedMessage.prototype.toJSON = function() {
        return ClosedMessage.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for ClosedMessage
     * @function getTypeUrl
     * @memberof ClosedMessage
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    ClosedMessage.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/ClosedMessage";
    };

    /**
     * ClosedEnum enum.
     * @name ClosedMessage.ClosedEnum
     * @enum {number}
     * @property {number} ZERO=0 ZERO value
     * @property {number} ONE=1 ONE value
     */
    ClosedMessage.ClosedEnum = (function() {
        var valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "ZERO"] = 0;
        values[valuesById[1] = "ONE"] = 1;
        return values;
    })();

    return ClosedMessage;
})();

$root.ClosedImplicitMessage = (function() {

    /**
     * Properties of a ClosedImplicitMessage.
     * @typedef {Object} ClosedImplicitMessage.$Properties
     * @property {ClosedImplicitMessage.ClosedEnum|null} [singular] ClosedImplicitMessage singular
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a ClosedImplicitMessage.
     * @exports IClosedImplicitMessage
     * @interface IClosedImplicitMessage
     * @augments ClosedImplicitMessage.$Properties
     * @deprecated Use ClosedImplicitMessage.$Properties instead.
     */

    /**
     * Shape of a ClosedImplicitMessage.
     * @typedef {ClosedImplicitMessage.$Properties} ClosedImplicitMessage.$Shape
     */

    /**
     * Constructs a new ClosedImplicitMessage.
     * @exports ClosedImplicitMessage
     * @classdesc Represents a ClosedImplicitMessage.
     * @constructor
     * @param {ClosedImplicitMessage.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    var ClosedImplicitMessage = function (properties) {
        if (properties)
            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * ClosedImplicitMessage singular.
     * @member {ClosedImplicitMessage.ClosedEnum} singular
     * @memberof ClosedImplicitMessage
     * @instance
     */
    ClosedImplicitMessage.prototype.singular = 0;

    /**
     * Creates a new ClosedImplicitMessage instance using the specified properties.
     * @function create
     * @memberof ClosedImplicitMessage
     * @static
     * @param {ClosedImplicitMessage.$Properties=} [properties] Properties to set
     * @returns {ClosedImplicitMessage} ClosedImplicitMessage instance
     * @type {{
     *   (properties: ClosedImplicitMessage.$Shape): ClosedImplicitMessage & ClosedImplicitMessage.$Shape;
     *   (properties?: ClosedImplicitMessage.$Properties): ClosedImplicitMessage;
     * }}
     */
    ClosedImplicitMessage.create = function(properties) {
        return new ClosedImplicitMessage(properties);
    };

    /**
     * Encodes the specified ClosedImplicitMessage message. Does not implicitly {@link ClosedImplicitMessage.verify|verify} messages.
     * @function encode
     * @memberof ClosedImplicitMessage
     * @static
     * @param {ClosedImplicitMessage.$Properties} message ClosedImplicitMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClosedImplicitMessage.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.singular != null && $Object.hasOwnProperty.call(message, "singular") && message.singular !== 0)
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.singular);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (var i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified ClosedImplicitMessage message, length delimited. Does not implicitly {@link ClosedImplicitMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ClosedImplicitMessage
     * @static
     * @param {ClosedImplicitMessage.$Properties} message ClosedImplicitMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClosedImplicitMessage.encodeDelimited = function(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes a ClosedImplicitMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ClosedImplicitMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ClosedImplicitMessage & ClosedImplicitMessage.$Shape} ClosedImplicitMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClosedImplicitMessage.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.ClosedImplicitMessage(), value;
        while (reader.pos < end) {
            var start = reader.pos;
            var tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            var wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    value = reader.int32();
                    if ($root.ClosedImplicitMessage.ClosedEnum[value] !== $undefined)
                        if (value !== 0)
                            message.singular = value;
                        else
                            delete message.singular;
                    else if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a ClosedImplicitMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ClosedImplicitMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ClosedImplicitMessage & ClosedImplicitMessage.$Shape} ClosedImplicitMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClosedImplicitMessage.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ClosedImplicitMessage message.
     * @function verify
     * @memberof ClosedImplicitMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ClosedImplicitMessage.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.singular != null && $Object.hasOwnProperty.call(message, "singular"))
            switch (message.singular) {
            default:
                return "singular: enum value expected";
            case 0:
            case 1:
                break;
            }
        return null;
    };

    /**
     * Creates a ClosedImplicitMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ClosedImplicitMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ClosedImplicitMessage} ClosedImplicitMessage
     */
    ClosedImplicitMessage.fromObject = function (object, _depth) {
        if (object instanceof $root.ClosedImplicitMessage)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".ClosedImplicitMessage: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        var message = new $root.ClosedImplicitMessage();
        if (object.singular !== 0 && (typeof object.singular !== "string" || $root.ClosedImplicitMessage.ClosedEnum[object.singular] !== 0))
            switch (object.singular) {
            case "ZERO":
            case 0:
                message.singular = 0;
                break;
            case "ONE":
            case 1:
                message.singular = 1;
                break;
            default:
            }
        return message;
    };

    /**
     * Creates a plain object from a ClosedImplicitMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ClosedImplicitMessage
     * @static
     * @param {ClosedImplicitMessage} message ClosedImplicitMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ClosedImplicitMessage.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        var object = {};
        if (options.defaults)
            object.singular = options.enums === $String ? "ZERO" : 0;
        if (message.singular != null && $Object.hasOwnProperty.call(message, "singular"))
            object.singular = options.enums === $String ? $root.ClosedImplicitMessage.ClosedEnum[message.singular] === $undefined ? message.singular : $root.ClosedImplicitMessage.ClosedEnum[message.singular] : message.singular;
        return object;
    };

    /**
     * Converts this ClosedImplicitMessage to JSON.
     * @function toJSON
     * @memberof ClosedImplicitMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ClosedImplicitMessage.prototype.toJSON = function() {
        return ClosedImplicitMessage.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for ClosedImplicitMessage
     * @function getTypeUrl
     * @memberof ClosedImplicitMessage
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    ClosedImplicitMessage.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/ClosedImplicitMessage";
    };

    /**
     * ClosedEnum enum.
     * @name ClosedImplicitMessage.ClosedEnum
     * @enum {number}
     * @property {number} ZERO=0 ZERO value
     * @property {number} ONE=1 ONE value
     */
    ClosedImplicitMessage.ClosedEnum = (function() {
        var valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "ZERO"] = 0;
        values[valuesById[1] = "ONE"] = 1;
        return values;
    })();

    return ClosedImplicitMessage;
})();

module.exports = $root;
