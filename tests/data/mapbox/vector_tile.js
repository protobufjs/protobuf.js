/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("../../../minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = $protobuf.roots.test_vector_tile || ($protobuf.roots.test_vector_tile = {});

$root.vector_tile = (function() {

    /**
     * Namespace vector_tile.
     * @exports vector_tile
     * @namespace
     */
    var vector_tile = {};

    vector_tile.Tile = (function() {

        /**
         * Constructs a new Tile.
         * @exports vector_tile.Tile
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function Tile(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
        }

        /**
         * Tile layers.
         * @type {Array.<vector_tile.Tile.Layer>}
         */
        Tile.prototype.layers = $util.emptyArray;

        // Lazily resolved type references
        var $types = {
            0: "vector_tile.Tile.Layer"
        }; $lazyTypes.push($types);

        /**
         * Creates a new Tile instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {vector_tile.Tile} Tile instance
         */
        Tile.create = function create(properties) {
            return new Tile(properties);
        };

        /**
         * Encodes the specified Tile message.
         * @param {vector_tile.Tile|Object} message Tile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tile.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.layers !== undefined && message.hasOwnProperty("layers"))
                for (var i = 0; i < message.layers.length; ++i)
                    $types[0].encode(message.layers[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Tile message, length delimited.
         * @param {vector_tile.Tile|Object} message Tile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Tile message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vector_tile.Tile} Tile
         */
        Tile.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 3:
                    if (!(message.layers && message.layers.length))
                        message.layers = [];
                    message.layers.push($types[0].decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Tile message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {vector_tile.Tile} Tile
         */
        Tile.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Tile message.
         * @param {vector_tile.Tile|Object} message Tile message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Tile.verify = function verify(message) {
            if (message.layers !== undefined) {
                if (!Array.isArray(message.layers))
                    return "layers: array expected";
                for (var i = 0; i < message.layers.length; ++i) {
                    var error = $types[0].verify(message.layers[i]);
                    if (error)
                        return "layers." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Tile message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {vector_tile.Tile} Tile
         */
        Tile.fromObject = function fromObject(object) {
            if (object instanceof $root.vector_tile.Tile)
                return object;
            var message = new $root.vector_tile.Tile();
            if (object.layers) {
                if (!Array.isArray(object.layers))
                    throw TypeError(".vector_tile.Tile.layers: array expected");
                message.layers = [];
                for (var i = 0; i < object.layers.length; ++i) {
                    if (typeof object.layers[i] !== "object")
                        throw TypeError(".vector_tile.Tile.layers: object expected");
                    message.layers[i] = $types[0].fromObject(object.layers[i]);
                }
            }
            return message;
        };

        /**
         * Creates a Tile message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link vector_tile.Tile.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {vector_tile.Tile} Tile
         */
        Tile.from = Tile.fromObject;

        /**
         * Creates a plain object from a Tile message. Also converts values to other types if specified.
         * @param {vector_tile.Tile} message Tile
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Tile.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.layers = [];
            if (message.layers !== undefined && message.layers !== null && message.hasOwnProperty("layers")) {
                object.layers = [];
                for (var j = 0; j < message.layers.length; ++j)
                    object.layers[j] = $types[0].toObject(message.layers[j], options);
            }
            return object;
        };

        /**
         * Creates a plain object from this Tile message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Tile.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Tile to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Tile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * GeomType enum.
         * @name GeomType
         * @memberof vector_tile.Tile
         * @enum {number}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} POINT=1 POINT value
         * @property {number} LINESTRING=2 LINESTRING value
         * @property {number} POLYGON=3 POLYGON value
         */
        Tile.GeomType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "POINT"] = 1;
            values[valuesById[2] = "LINESTRING"] = 2;
            values[valuesById[3] = "POLYGON"] = 3;
            return values;
        })();

        Tile.Value = (function() {

            /**
             * Constructs a new Value.
             * @exports vector_tile.Tile.Value
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * Value stringValue.
             * @type {string}
             */
            Value.prototype.stringValue = "";

            /**
             * Value floatValue.
             * @type {number}
             */
            Value.prototype.floatValue = 0;

            /**
             * Value doubleValue.
             * @type {number}
             */
            Value.prototype.doubleValue = 0;

            /**
             * Value intValue.
             * @type {number|$protobuf.Long}
             */
            Value.prototype.intValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Value uintValue.
             * @type {number|$protobuf.Long}
             */
            Value.prototype.uintValue = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Value sintValue.
             * @type {number|$protobuf.Long}
             */
            Value.prototype.sintValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Value boolValue.
             * @type {boolean}
             */
            Value.prototype.boolValue = false;

            /**
             * Creates a new Value instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {vector_tile.Tile.Value} Value instance
             */
            Value.create = function create(properties) {
                return new Value(properties);
            };

            /**
             * Encodes the specified Value message.
             * @param {vector_tile.Tile.Value|Object} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.stringValue !== undefined && message.hasOwnProperty("stringValue"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringValue);
                if (message.floatValue !== undefined && message.hasOwnProperty("floatValue"))
                    writer.uint32(/* id 2, wireType 5 =*/21).float(message.floatValue);
                if (message.doubleValue !== undefined && message.hasOwnProperty("doubleValue"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.doubleValue);
                if (message.intValue !== undefined && message.intValue !== null && message.hasOwnProperty("intValue"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.intValue);
                if (message.uintValue !== undefined && message.uintValue !== null && message.hasOwnProperty("uintValue"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.uintValue);
                if (message.sintValue !== undefined && message.sintValue !== null && message.hasOwnProperty("sintValue"))
                    writer.uint32(/* id 6, wireType 0 =*/48).sint64(message.sintValue);
                if (message.boolValue !== undefined && message.hasOwnProperty("boolValue"))
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.boolValue);
                return writer;
            };

            /**
             * Encodes the specified Value message, length delimited.
             * @param {vector_tile.Tile.Value|Object} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Value message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Value} Value
             */
            Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile.Value();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.stringValue = reader.string();
                        break;
                    case 2:
                        message.floatValue = reader.float();
                        break;
                    case 3:
                        message.doubleValue = reader.double();
                        break;
                    case 4:
                        message.intValue = reader.int64();
                        break;
                    case 5:
                        message.uintValue = reader.uint64();
                        break;
                    case 6:
                        message.sintValue = reader.sint64();
                        break;
                    case 7:
                        message.boolValue = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Value message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {vector_tile.Tile.Value} Value
             */
            Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Value message.
             * @param {vector_tile.Tile.Value|Object} message Value message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Value.verify = function verify(message) {
                if (message.stringValue !== undefined)
                    if (!$util.isString(message.stringValue))
                        return "stringValue: string expected";
                if (message.floatValue !== undefined)
                    if (typeof message.floatValue !== "number")
                        return "floatValue: number expected";
                if (message.doubleValue !== undefined)
                    if (typeof message.doubleValue !== "number")
                        return "doubleValue: number expected";
                if (message.intValue !== undefined)
                    if (!$util.isInteger(message.intValue) && !(message.intValue && $util.isInteger(message.intValue.low) && $util.isInteger(message.intValue.high)))
                        return "intValue: integer|Long expected";
                if (message.uintValue !== undefined)
                    if (!$util.isInteger(message.uintValue) && !(message.uintValue && $util.isInteger(message.uintValue.low) && $util.isInteger(message.uintValue.high)))
                        return "uintValue: integer|Long expected";
                if (message.sintValue !== undefined)
                    if (!$util.isInteger(message.sintValue) && !(message.sintValue && $util.isInteger(message.sintValue.low) && $util.isInteger(message.sintValue.high)))
                        return "sintValue: integer|Long expected";
                if (message.boolValue !== undefined)
                    if (typeof message.boolValue !== "boolean")
                        return "boolValue: boolean expected";
                return null;
            };

            /**
             * Creates a Value message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {vector_tile.Tile.Value} Value
             */
            Value.fromObject = function fromObject(object) {
                if (object instanceof $root.vector_tile.Tile.Value)
                    return object;
                var message = new $root.vector_tile.Tile.Value();
                if (object.stringValue !== undefined && object.stringValue !== null)
                    message.stringValue = String(object.stringValue);
                if (object.floatValue !== undefined && object.floatValue !== null)
                    message.floatValue = Number(object.floatValue);
                if (object.doubleValue !== undefined && object.doubleValue !== null)
                    message.doubleValue = Number(object.doubleValue);
                if (object.intValue !== undefined && object.intValue !== null)
                    if ($util.Long)
                        (message.intValue = $util.Long.fromValue(object.intValue)).unsigned = false;
                    else if (typeof object.intValue === "string")
                        message.intValue = parseInt(object.intValue, 10);
                    else if (typeof object.intValue === "number")
                        message.intValue = object.intValue;
                    else if (typeof object.intValue === "object")
                        message.intValue = new $util.LongBits(object.intValue.low, object.intValue.high).toNumber();
                if (object.uintValue !== undefined && object.uintValue !== null)
                    if ($util.Long)
                        (message.uintValue = $util.Long.fromValue(object.uintValue)).unsigned = true;
                    else if (typeof object.uintValue === "string")
                        message.uintValue = parseInt(object.uintValue, 10);
                    else if (typeof object.uintValue === "number")
                        message.uintValue = object.uintValue;
                    else if (typeof object.uintValue === "object")
                        message.uintValue = new $util.LongBits(object.uintValue.low, object.uintValue.high).toNumber(true);
                if (object.sintValue !== undefined && object.sintValue !== null)
                    if ($util.Long)
                        (message.sintValue = $util.Long.fromValue(object.sintValue)).unsigned = false;
                    else if (typeof object.sintValue === "string")
                        message.sintValue = parseInt(object.sintValue, 10);
                    else if (typeof object.sintValue === "number")
                        message.sintValue = object.sintValue;
                    else if (typeof object.sintValue === "object")
                        message.sintValue = new $util.LongBits(object.sintValue.low, object.sintValue.high).toNumber();
                if (object.boolValue !== undefined && object.boolValue !== null)
                    message.boolValue = Boolean(object.boolValue);
                return message;
            };

            /**
             * Creates a Value message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link vector_tile.Tile.Value.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {vector_tile.Tile.Value} Value
             */
            Value.from = Value.fromObject;

            /**
             * Creates a plain object from a Value message. Also converts values to other types if specified.
             * @param {vector_tile.Tile.Value} message Value
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.stringValue = "";
                    object.floatValue = 0;
                    object.doubleValue = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.intValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.intValue = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.uintValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.uintValue = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.sintValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.sintValue = options.longs === String ? "0" : 0;
                    object.boolValue = false;
                }
                if (message.stringValue !== undefined && message.stringValue !== null && message.hasOwnProperty("stringValue"))
                    object.stringValue = message.stringValue;
                if (message.floatValue !== undefined && message.floatValue !== null && message.hasOwnProperty("floatValue"))
                    object.floatValue = message.floatValue;
                if (message.doubleValue !== undefined && message.doubleValue !== null && message.hasOwnProperty("doubleValue"))
                    object.doubleValue = message.doubleValue;
                if (message.intValue !== undefined && message.intValue !== null && message.hasOwnProperty("intValue"))
                    if (typeof message.intValue === "number")
                        object.intValue = options.longs === String ? String(message.intValue) : message.intValue;
                    else
                        object.intValue = options.longs === String ? $util.Long.prototype.toString.call(message.intValue) : options.longs === Number ? new $util.LongBits(message.intValue.low, message.intValue.high).toNumber() : message.intValue;
                if (message.uintValue !== undefined && message.uintValue !== null && message.hasOwnProperty("uintValue"))
                    if (typeof message.uintValue === "number")
                        object.uintValue = options.longs === String ? String(message.uintValue) : message.uintValue;
                    else
                        object.uintValue = options.longs === String ? $util.Long.prototype.toString.call(message.uintValue) : options.longs === Number ? new $util.LongBits(message.uintValue.low, message.uintValue.high).toNumber(true) : message.uintValue;
                if (message.sintValue !== undefined && message.sintValue !== null && message.hasOwnProperty("sintValue"))
                    if (typeof message.sintValue === "number")
                        object.sintValue = options.longs === String ? String(message.sintValue) : message.sintValue;
                    else
                        object.sintValue = options.longs === String ? $util.Long.prototype.toString.call(message.sintValue) : options.longs === Number ? new $util.LongBits(message.sintValue.low, message.sintValue.high).toNumber() : message.sintValue;
                if (message.boolValue !== undefined && message.boolValue !== null && message.hasOwnProperty("boolValue"))
                    object.boolValue = message.boolValue;
                return object;
            };

            /**
             * Creates a plain object from this Value message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Value.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this Value to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Value;
        })();

        Tile.Feature = (function() {

            /**
             * Constructs a new Feature.
             * @exports vector_tile.Tile.Feature
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function Feature(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * Feature id.
             * @type {number|$protobuf.Long}
             */
            Feature.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Feature tags.
             * @type {Array.<number>}
             */
            Feature.prototype.tags = $util.emptyArray;

            /**
             * Feature type.
             * @type {number}
             */
            Feature.prototype.type = 0;

            /**
             * Feature geometry.
             * @type {Array.<number>}
             */
            Feature.prototype.geometry = $util.emptyArray;

            // Lazily resolved type references
            var $types = {
                2: "vector_tile.Tile.GeomType"
            }; $lazyTypes.push($types);

            /**
             * Creates a new Feature instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {vector_tile.Tile.Feature} Feature instance
             */
            Feature.create = function create(properties) {
                return new Feature(properties);
            };

            /**
             * Encodes the specified Feature message.
             * @param {vector_tile.Tile.Feature|Object} message Feature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Feature.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id !== undefined && message.id !== null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
                if (message.tags && message.tags.length && message.hasOwnProperty("tags")) {
                    writer.uint32(/* id 2, wireType 2 =*/18).fork();
                    for (var i = 0; i < message.tags.length; ++i)
                        writer.uint32(message.tags[i]);
                    writer.ldelim();
                }
                if (message.type !== undefined && message.hasOwnProperty("type"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.type);
                if (message.geometry && message.geometry.length && message.hasOwnProperty("geometry")) {
                    writer.uint32(/* id 4, wireType 2 =*/34).fork();
                    for (var i = 0; i < message.geometry.length; ++i)
                        writer.uint32(message.geometry[i]);
                    writer.ldelim();
                }
                return writer;
            };

            /**
             * Encodes the specified Feature message, length delimited.
             * @param {vector_tile.Tile.Feature|Object} message Feature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Feature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Feature message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Feature} Feature
             */
            Feature.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile.Feature();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.uint64();
                        break;
                    case 2:
                        if (!(message.tags && message.tags.length))
                            message.tags = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.tags.push(reader.uint32());
                        } else
                            message.tags.push(reader.uint32());
                        break;
                    case 3:
                        message.type = reader.uint32();
                        break;
                    case 4:
                        if (!(message.geometry && message.geometry.length))
                            message.geometry = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.geometry.push(reader.uint32());
                        } else
                            message.geometry.push(reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Feature message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {vector_tile.Tile.Feature} Feature
             */
            Feature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Feature message.
             * @param {vector_tile.Tile.Feature|Object} message Feature message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Feature.verify = function verify(message) {
                if (message.id !== undefined)
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                if (message.tags !== undefined) {
                    if (!Array.isArray(message.tags))
                        return "tags: array expected";
                    for (var i = 0; i < message.tags.length; ++i)
                        if (!$util.isInteger(message.tags[i]))
                            return "tags: integer[] expected";
                }
                if (message.type !== undefined)
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.geometry !== undefined) {
                    if (!Array.isArray(message.geometry))
                        return "geometry: array expected";
                    for (var i = 0; i < message.geometry.length; ++i)
                        if (!$util.isInteger(message.geometry[i]))
                            return "geometry: integer[] expected";
                }
                return null;
            };

            /**
             * Creates a Feature message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {vector_tile.Tile.Feature} Feature
             */
            Feature.fromObject = function fromObject(object) {
                if (object instanceof $root.vector_tile.Tile.Feature)
                    return object;
                var message = new $root.vector_tile.Tile.Feature();
                if (object.id !== undefined && object.id !== null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low, object.id.high).toNumber(true);
                if (object.tags) {
                    if (!Array.isArray(object.tags))
                        throw TypeError(".vector_tile.Tile.Feature.tags: array expected");
                    message.tags = [];
                    for (var i = 0; i < object.tags.length; ++i)
                        message.tags[i] = object.tags[i] >>> 0;
                }
                switch (object.type) {
                case "UNKNOWN":
                case 0:
                    message.type = 0;
                    break;
                case "POINT":
                case 1:
                    message.type = 1;
                    break;
                case "LINESTRING":
                case 2:
                    message.type = 2;
                    break;
                case "POLYGON":
                case 3:
                    message.type = 3;
                    break;
                }
                if (object.geometry) {
                    if (!Array.isArray(object.geometry))
                        throw TypeError(".vector_tile.Tile.Feature.geometry: array expected");
                    message.geometry = [];
                    for (var i = 0; i < object.geometry.length; ++i)
                        message.geometry[i] = object.geometry[i] >>> 0;
                }
                return message;
            };

            /**
             * Creates a Feature message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link vector_tile.Tile.Feature.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {vector_tile.Tile.Feature} Feature
             */
            Feature.from = Feature.fromObject;

            /**
             * Creates a plain object from a Feature message. Also converts values to other types if specified.
             * @param {vector_tile.Tile.Feature} message Feature
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Feature.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.tags = [];
                    object.geometry = [];
                }
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    object.type = options.enums === String ? "UNKNOWN" : 0;
                }
                if (message.id !== undefined && message.id !== null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low, message.id.high).toNumber(true) : message.id;
                if (message.tags !== undefined && message.tags !== null && message.hasOwnProperty("tags")) {
                    object.tags = [];
                    for (var j = 0; j < message.tags.length; ++j)
                        object.tags[j] = message.tags[j];
                }
                if (message.type !== undefined && message.type !== null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $types[2][message.type] : message.type;
                if (message.geometry !== undefined && message.geometry !== null && message.hasOwnProperty("geometry")) {
                    object.geometry = [];
                    for (var j = 0; j < message.geometry.length; ++j)
                        object.geometry[j] = message.geometry[j];
                }
                return object;
            };

            /**
             * Creates a plain object from this Feature message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Feature.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this Feature to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            Feature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Feature;
        })();

        Tile.Layer = (function() {

            /**
             * Constructs a new Layer.
             * @exports vector_tile.Tile.Layer
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function Layer(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * Layer version.
             * @type {number}
             */
            Layer.prototype.version = 1;

            /**
             * Layer name.
             * @type {string}
             */
            Layer.prototype.name = "";

            /**
             * Layer features.
             * @type {Array.<vector_tile.Tile.Feature>}
             */
            Layer.prototype.features = $util.emptyArray;

            /**
             * Layer keys.
             * @type {Array.<string>}
             */
            Layer.prototype.keys = $util.emptyArray;

            /**
             * Layer values.
             * @type {Array.<vector_tile.Tile.Value>}
             */
            Layer.prototype.values = $util.emptyArray;

            /**
             * Layer extent.
             * @type {number}
             */
            Layer.prototype.extent = 4096;

            // Lazily resolved type references
            var $types = {
                2: "vector_tile.Tile.Feature",
                4: "vector_tile.Tile.Value"
            }; $lazyTypes.push($types);

            /**
             * Creates a new Layer instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {vector_tile.Tile.Layer} Layer instance
             */
            Layer.create = function create(properties) {
                return new Layer(properties);
            };

            /**
             * Encodes the specified Layer message.
             * @param {vector_tile.Tile.Layer|Object} message Layer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Layer.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 15, wireType 0 =*/120).uint32(message.version);
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.features !== undefined && message.hasOwnProperty("features"))
                    for (var i = 0; i < message.features.length; ++i)
                        $types[2].encode(message.features[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.keys !== undefined && message.hasOwnProperty("keys"))
                    for (var i = 0; i < message.keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.keys[i]);
                if (message.values !== undefined && message.hasOwnProperty("values"))
                    for (var i = 0; i < message.values.length; ++i)
                        $types[4].encode(message.values[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.extent !== undefined && message.hasOwnProperty("extent"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.extent);
                return writer;
            };

            /**
             * Encodes the specified Layer message, length delimited.
             * @param {vector_tile.Tile.Layer|Object} message Layer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Layer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Layer message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Layer} Layer
             */
            Layer.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile.Layer();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 15:
                        message.version = reader.uint32();
                        break;
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        if (!(message.features && message.features.length))
                            message.features = [];
                        message.features.push($types[2].decode(reader, reader.uint32()));
                        break;
                    case 3:
                        if (!(message.keys && message.keys.length))
                            message.keys = [];
                        message.keys.push(reader.string());
                        break;
                    case 4:
                        if (!(message.values && message.values.length))
                            message.values = [];
                        message.values.push($types[4].decode(reader, reader.uint32()));
                        break;
                    case 5:
                        message.extent = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Layer message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {vector_tile.Tile.Layer} Layer
             */
            Layer.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Layer message.
             * @param {vector_tile.Tile.Layer|Object} message Layer message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Layer.verify = function verify(message) {
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
                if (!$util.isString(message.name))
                    return "name: string expected";
                if (message.features !== undefined) {
                    if (!Array.isArray(message.features))
                        return "features: array expected";
                    for (var i = 0; i < message.features.length; ++i) {
                        var error = $types[2].verify(message.features[i]);
                        if (error)
                            return "features." + error;
                    }
                }
                if (message.keys !== undefined) {
                    if (!Array.isArray(message.keys))
                        return "keys: array expected";
                    for (var i = 0; i < message.keys.length; ++i)
                        if (!$util.isString(message.keys[i]))
                            return "keys: string[] expected";
                }
                if (message.values !== undefined) {
                    if (!Array.isArray(message.values))
                        return "values: array expected";
                    for (var i = 0; i < message.values.length; ++i) {
                        var error = $types[4].verify(message.values[i]);
                        if (error)
                            return "values." + error;
                    }
                }
                if (message.extent !== undefined)
                    if (!$util.isInteger(message.extent))
                        return "extent: integer expected";
                return null;
            };

            /**
             * Creates a Layer message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {vector_tile.Tile.Layer} Layer
             */
            Layer.fromObject = function fromObject(object) {
                if (object instanceof $root.vector_tile.Tile.Layer)
                    return object;
                var message = new $root.vector_tile.Tile.Layer();
                if (object.version !== undefined && object.version !== null)
                    message.version = object.version >>> 0;
                if (object.name !== undefined && object.name !== null)
                    message.name = String(object.name);
                if (object.features) {
                    if (!Array.isArray(object.features))
                        throw TypeError(".vector_tile.Tile.Layer.features: array expected");
                    message.features = [];
                    for (var i = 0; i < object.features.length; ++i) {
                        if (typeof object.features[i] !== "object")
                            throw TypeError(".vector_tile.Tile.Layer.features: object expected");
                        message.features[i] = $types[2].fromObject(object.features[i]);
                    }
                }
                if (object.keys) {
                    if (!Array.isArray(object.keys))
                        throw TypeError(".vector_tile.Tile.Layer.keys: array expected");
                    message.keys = [];
                    for (var i = 0; i < object.keys.length; ++i)
                        message.keys[i] = String(object.keys[i]);
                }
                if (object.values) {
                    if (!Array.isArray(object.values))
                        throw TypeError(".vector_tile.Tile.Layer.values: array expected");
                    message.values = [];
                    for (var i = 0; i < object.values.length; ++i) {
                        if (typeof object.values[i] !== "object")
                            throw TypeError(".vector_tile.Tile.Layer.values: object expected");
                        message.values[i] = $types[4].fromObject(object.values[i]);
                    }
                }
                if (object.extent !== undefined && object.extent !== null)
                    message.extent = object.extent >>> 0;
                return message;
            };

            /**
             * Creates a Layer message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link vector_tile.Tile.Layer.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {vector_tile.Tile.Layer} Layer
             */
            Layer.from = Layer.fromObject;

            /**
             * Creates a plain object from a Layer message. Also converts values to other types if specified.
             * @param {vector_tile.Tile.Layer} message Layer
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Layer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.features = [];
                    object.keys = [];
                    object.values = [];
                }
                if (options.defaults) {
                    object.version = 1;
                    object.name = "";
                    object.extent = 4096;
                }
                if (message.version !== undefined && message.version !== null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.name !== undefined && message.name !== null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.features !== undefined && message.features !== null && message.hasOwnProperty("features")) {
                    object.features = [];
                    for (var j = 0; j < message.features.length; ++j)
                        object.features[j] = $types[2].toObject(message.features[j], options);
                }
                if (message.keys !== undefined && message.keys !== null && message.hasOwnProperty("keys")) {
                    object.keys = [];
                    for (var j = 0; j < message.keys.length; ++j)
                        object.keys[j] = message.keys[j];
                }
                if (message.values !== undefined && message.values !== null && message.hasOwnProperty("values")) {
                    object.values = [];
                    for (var j = 0; j < message.values.length; ++j)
                        object.values[j] = $types[4].toObject(message.values[j], options);
                }
                if (message.extent !== undefined && message.extent !== null && message.hasOwnProperty("extent"))
                    object.extent = message.extent;
                return object;
            };

            /**
             * Creates a plain object from this Layer message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Layer.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this Layer to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            Layer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Layer;
        })();

        return Tile;
    })();

    return vector_tile;
})();

// Resolve lazy type references to actual types
$util.lazyResolve($root, $lazyTypes);

module.exports = $root;
