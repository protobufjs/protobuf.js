/* eslint-disable block-scoped-var, no-redeclare, no-control-regex, strict */
"use strict";

var $protobuf = require("../../../runtime");

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = {};

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
            if (properties) {
                var keys = Object.keys(properties);
                for (var i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
            }
        }

        /** @alias vector_tile.Tile.prototype */
        var $prototype = Tile.prototype;

        /**
         * Tile layers.
         * @type {Array.<vector_tile.Tile.Layer>}
         */
        $prototype.layers = $protobuf.util.emptyArray;

        // Referenced types
        var $types = ["vector_tile.Tile.Layer"]; $lazyTypes.push($types);

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
         * @function
         * @param {vector_tile.Tile|Object} message Tile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tile.encode = (function(Writer, types) { return function encode(message, writer) {
            if (!writer) {
                writer = Writer.create();
            }
            if (message.layers) {
                for (var i = 0; i < message.layers.length; ++i) {
                    types[0].encode(message.layers[i], writer.uint32(26).fork()).ldelim();
                }
            }
            return writer;
        };})($protobuf.Writer, $types);

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
         * @function
         * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vector_tile.Tile} Tile
         */
        Tile.decode = (function(Reader, types) { return function decode(reader, len) {
            if (!(reader instanceof Reader)) {
                reader = Reader.create(reader);
            }
            var end = len === undefined ? reader.len : reader.pos + len, message = new $root.vector_tile.Tile();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 3:
                    if (!(message.layers && message.layers.length)) {
                        message.layers = [];
                    }
                    message.layers.push(types[0].decode(reader, reader.uint32()));
                    break;

                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };})($protobuf.Reader, $types);

        /**
         * Decodes a Tile message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @returns {vector_tile.Tile} Tile
         */
        Tile.decodeDelimited = function decodeDelimited(readerOrBuffer) {
            readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };

        /**
         * Verifies a Tile message.
         * @function
         * @param {vector_tile.Tile|Object} message Tile message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Tile.verify = (function(types) { return function verify(message) {
            if (message.layers !== undefined) {
                if (!Array.isArray(message.layers)) {
                    return "vector_tile.Tile.layers: array expected";
                }
                for (var i = 0; i < message.layers.length; ++i) {
                    var err;
                    if (err = types[0].verify(message.layers[i])) {
                        return err;
                    }
                }
            }
            return null;
        };})($types);

        /**
         * Converts a Tile message.
         * @function
         * @param {vector_tile.Tile|Object} source Tile message or plain object to convert
         * @param {*} impl Converter implementation to use
         * @param {Object.<string,*>} [options] Conversion options
         * @returns {vector_tile.Tile|Object} Converted message
         */
        Tile.convert = (function(types) { return function convert(src, impl, options) {
            if (!options) {
                options = {};
            }
            var dst = impl.create(src, this, options);
            if (dst) {
                if (src.layers && src.layers.length) {
                    dst.layers = [];
                    for (var i = 0; i < src.layers.length; ++i) {
                        dst.layers.push(types[0].convert(src.layers[i], impl, options));
                    }
                } else {
                    if (options.defaults || options.arrays) {
                        dst.layers = [];
                    }
                }
            }
            return dst;
        };})($types);

        /**
         * Creates a Tile message from JSON.
         * @param {Object.<string,*>} source Source object
         * @param {Object.<string,*>} [options] Conversion options
         * @returns {vector_tile.Tile} Tile
         */
        Tile.from = function from(source, options) {
            return this.convert(source, $protobuf.converters.message, options);
        };

        /**
         * Converts this Tile message to JSON.
         * @param {Object.<string,*>} [options] Conversion options
         * @returns {Object.<string,*>} JSON object
         */
        $prototype.asJSON = function asJSON(options) {
            return this.constructor.convert(this, $protobuf.converters.json, options);
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
            var valuesById = {},
                values = Object.create(valuesById);
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
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias vector_tile.Tile.Value.prototype */
            var $prototype = Value.prototype;

            /**
             * Value stringValue.
             * @type {string}
             */
            $prototype.stringValue = "";

            /**
             * Value floatValue.
             * @type {number}
             */
            $prototype.floatValue = 0;

            /**
             * Value doubleValue.
             * @type {number}
             */
            $prototype.doubleValue = 0;

            /**
             * Value intValue.
             * @type {number|Long}
             */
            $prototype.intValue = $protobuf.util.emptyObject;

            /**
             * Value uintValue.
             * @type {number|Long}
             */
            $prototype.uintValue = $protobuf.util.emptyObject;

            /**
             * Value sintValue.
             * @type {number|Long}
             */
            $prototype.sintValue = $protobuf.util.emptyObject;

            /**
             * Value boolValue.
             * @type {boolean}
             */
            $prototype.boolValue = false;

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
             * @function
             * @param {vector_tile.Tile.Value|Object} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encode = (function(Writer, util) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.stringValue !== undefined && message.stringValue !== "") {
                    writer.uint32(10).string(message.stringValue);
                }
                if (message.floatValue !== undefined && message.floatValue !== 0) {
                    writer.uint32(21).float(message.floatValue);
                }
                if (message.doubleValue !== undefined && message.doubleValue !== 0) {
                    writer.uint32(25).double(message.doubleValue);
                }
                if (message.intValue !== undefined && message.intValue !== null && util.longNe(message.intValue, 0, 0)) {
                    writer.uint32(32).int64(message.intValue);
                }
                if (message.uintValue !== undefined && message.uintValue !== null && util.longNe(message.uintValue, 0, 0)) {
                    writer.uint32(40).uint64(message.uintValue);
                }
                if (message.sintValue !== undefined && message.sintValue !== null && util.longNe(message.sintValue, 0, 0)) {
                    writer.uint32(48).sint64(message.sintValue);
                }
                if (message.boolValue !== undefined && message.boolValue !== false) {
                    writer.uint32(56).bool(message.boolValue);
                }
                return writer;
            };})($protobuf.Writer, $protobuf.util);

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
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Value} Value
             */
            Value.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.vector_tile.Tile.Value();
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
            };})($protobuf.Reader);

            /**
             * Decodes a Value message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {vector_tile.Tile.Value} Value
             */
            Value.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Value message.
             * @function
             * @param {vector_tile.Tile.Value|Object} message Value message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Value.verify = (function(util) { return function verify(message) {
                if (message.stringValue !== undefined) {
                    if (!util.isString(message.stringValue)) {
                        return "vector_tile.Tile.Value.stringValue: string expected";
                    }
                }
                if (message.floatValue !== undefined) {
                    if (typeof message.floatValue !== "number") {
                        return "vector_tile.Tile.Value.floatValue: number expected";
                    }
                }
                if (message.doubleValue !== undefined) {
                    if (typeof message.doubleValue !== "number") {
                        return "vector_tile.Tile.Value.doubleValue: number expected";
                    }
                }
                if (message.intValue !== undefined) {
                    if (!util.isInteger(message.intValue) && !(message.intValue && util.isInteger(message.intValue.low) && util.isInteger(message.intValue.high))) {
                        return "vector_tile.Tile.Value.intValue: integer|Long expected";
                    }
                }
                if (message.uintValue !== undefined) {
                    if (!util.isInteger(message.uintValue) && !(message.uintValue && util.isInteger(message.uintValue.low) && util.isInteger(message.uintValue.high))) {
                        return "vector_tile.Tile.Value.uintValue: integer|Long expected";
                    }
                }
                if (message.sintValue !== undefined) {
                    if (!util.isInteger(message.sintValue) && !(message.sintValue && util.isInteger(message.sintValue.low) && util.isInteger(message.sintValue.high))) {
                        return "vector_tile.Tile.Value.sintValue: integer|Long expected";
                    }
                }
                if (message.boolValue !== undefined) {
                    if (typeof message.boolValue !== "boolean") {
                        return "vector_tile.Tile.Value.boolValue: boolean expected";
                    }
                }
                return null;
            };})($protobuf.util);

            /**
             * Converts a Value message.
             * @function
             * @param {vector_tile.Tile.Value|Object} source Value message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {vector_tile.Tile.Value|Object} Converted message
             */
            Value.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.stringValue === undefined && options.defaults) {
                        dst.stringValue = "";
                    }
                    if (dst.floatValue === undefined && options.defaults) {
                        dst.floatValue = 0;
                    }
                    if (dst.doubleValue === undefined && options.defaults) {
                        dst.doubleValue = 0;
                    }
                    dst.intValue = impl.longs(src.intValue, 0, 0, false, options);
                    dst.uintValue = impl.longs(src.uintValue, 0, 0, true, options);
                    dst.sintValue = impl.longs(src.sintValue, 0, 0, false, options);
                    if (dst.boolValue === undefined && options.defaults) {
                        dst.boolValue = false;
                    }
                }
                return dst;
            };})();

            /**
             * Creates a Value message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {vector_tile.Tile.Value} Value
             */
            Value.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this Value message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
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
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias vector_tile.Tile.Feature.prototype */
            var $prototype = Feature.prototype;

            /**
             * Feature id.
             * @type {number|Long}
             */
            $prototype.id = $protobuf.util.emptyObject;

            /**
             * Feature tags.
             * @type {Array.<number>}
             */
            $prototype.tags = $protobuf.util.emptyArray;

            /**
             * Feature type.
             * @type {number}
             */
            $prototype.type = 0;

            /**
             * Feature geometry.
             * @type {Array.<number>}
             */
            $prototype.geometry = $protobuf.util.emptyArray;

            // Referenced types
            var $types = [null, null, "vector_tile.Tile.GeomType", null]; $lazyTypes.push($types);

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
             * @function
             * @param {vector_tile.Tile.Feature|Object} message Feature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Feature.encode = (function(Writer, util) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.id !== undefined && message.id !== null && util.longNe(message.id, 0, 0)) {
                    writer.uint32(8).uint64(message.id);
                }
                if (message.tags && message.tags.length) {
                    writer.uint32(18).fork();
                    for (var i = 0; i < message.tags.length; ++i) {
                        writer.uint32(message.tags[i]);
                    }
                    writer.ldelim();
                }
                if (message.type !== undefined && message.type !== 0) {
                    writer.uint32(24).uint32(message.type);
                }
                if (message.geometry && message.geometry.length) {
                    writer.uint32(34).fork();
                    for (var i = 0; i < message.geometry.length; ++i) {
                        writer.uint32(message.geometry[i]);
                    }
                    writer.ldelim();
                }
                return writer;
            };})($protobuf.Writer, $protobuf.util);

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
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Feature} Feature
             */
            Feature.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.vector_tile.Tile.Feature();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.uint64();
                        break;

                    case 2:
                        if (!(message.tags && message.tags.length)) {
                            message.tags = [];
                        }
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2) {
                                message.tags.push(reader.uint32());
                            }
                        } else {
                            message.tags.push(reader.uint32());
                        }
                        break;

                    case 3:
                        message.type = reader.uint32();
                        break;

                    case 4:
                        if (!(message.geometry && message.geometry.length)) {
                            message.geometry = [];
                        }
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2) {
                                message.geometry.push(reader.uint32());
                            }
                        } else {
                            message.geometry.push(reader.uint32());
                        }
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes a Feature message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {vector_tile.Tile.Feature} Feature
             */
            Feature.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Feature message.
             * @function
             * @param {vector_tile.Tile.Feature|Object} message Feature message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Feature.verify = (function(util) { return function verify(message) {
                if (message.id !== undefined) {
                    if (!util.isInteger(message.id) && !(message.id && util.isInteger(message.id.low) && util.isInteger(message.id.high))) {
                        return "vector_tile.Tile.Feature.id: integer|Long expected";
                    }
                }
                if (message.tags !== undefined) {
                    if (!Array.isArray(message.tags)) {
                        return "vector_tile.Tile.Feature.tags: array expected";
                    }
                    for (var i = 0; i < message.tags.length; ++i) {
                        if (!util.isInteger(message.tags[i])) {
                            return "vector_tile.Tile.Feature.tags: integer[] expected";
                        }
                    }
                }
                if (message.type !== undefined) {
                    switch (message.type) {
                    default:
                        return "vector_tile.Tile.Feature.type: enum value expected";

                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                }
                if (message.geometry !== undefined) {
                    if (!Array.isArray(message.geometry)) {
                        return "vector_tile.Tile.Feature.geometry: array expected";
                    }
                    for (var i = 0; i < message.geometry.length; ++i) {
                        if (!util.isInteger(message.geometry[i])) {
                            return "vector_tile.Tile.Feature.geometry: integer[] expected";
                        }
                    }
                }
                return null;
            };})($protobuf.util);

            /**
             * Converts a Feature message.
             * @function
             * @param {vector_tile.Tile.Feature|Object} source Feature message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {vector_tile.Tile.Feature|Object} Converted message
             */
            Feature.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    dst.id = impl.longs(src.id, 0, 0, true, options);
                    if (src.tags && src.tags.length) {
                        dst.tags = [];
                        for (var i = 0; i < src.tags.length; ++i) {
                            dst.tags.push(src.tags[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.tags = [];
                        }
                    }
                    dst.type = impl.enums(src.type, 0, types[2], options);
                    if (src.geometry && src.geometry.length) {
                        dst.geometry = [];
                        for (var i = 0; i < src.geometry.length; ++i) {
                            dst.geometry.push(src.geometry[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.geometry = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a Feature message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {vector_tile.Tile.Feature} Feature
             */
            Feature.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this Feature message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
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
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias vector_tile.Tile.Layer.prototype */
            var $prototype = Layer.prototype;

            /**
             * Layer version.
             * @type {number}
             */
            $prototype.version = 1;

            /**
             * Layer name.
             * @type {string}
             */
            $prototype.name = "";

            /**
             * Layer features.
             * @type {Array.<vector_tile.Tile.Feature>}
             */
            $prototype.features = $protobuf.util.emptyArray;

            /**
             * Layer keys.
             * @type {Array.<string>}
             */
            $prototype.keys = $protobuf.util.emptyArray;

            /**
             * Layer values.
             * @type {Array.<vector_tile.Tile.Value>}
             */
            $prototype.values = $protobuf.util.emptyArray;

            /**
             * Layer extent.
             * @type {number}
             */
            $prototype.extent = 4096;

            // Referenced types
            var $types = [null, null, "vector_tile.Tile.Feature", null, "vector_tile.Tile.Value", null]; $lazyTypes.push($types);

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
             * @function
             * @param {vector_tile.Tile.Layer|Object} message Layer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Layer.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                writer.uint32(120).uint32(message.version);
                writer.uint32(10).string(message.name);
                if (message.features) {
                    for (var i = 0; i < message.features.length; ++i) {
                        types[2].encode(message.features[i], writer.uint32(18).fork()).ldelim();
                    }
                }
                if (message.keys) {
                    for (var i = 0; i < message.keys.length; ++i) {
                        writer.uint32(26).string(message.keys[i]);
                    }
                }
                if (message.values) {
                    for (var i = 0; i < message.values.length; ++i) {
                        types[4].encode(message.values[i], writer.uint32(34).fork()).ldelim();
                    }
                }
                if (message.extent !== undefined && message.extent !== 4096) {
                    writer.uint32(40).uint32(message.extent);
                }
                return writer;
            };})($protobuf.Writer, $types);

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
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Layer} Layer
             */
            Layer.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.vector_tile.Tile.Layer();
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
                        if (!(message.features && message.features.length)) {
                            message.features = [];
                        }
                        message.features.push(types[2].decode(reader, reader.uint32()));
                        break;

                    case 3:
                        if (!(message.keys && message.keys.length)) {
                            message.keys = [];
                        }
                        message.keys.push(reader.string());
                        break;

                    case 4:
                        if (!(message.values && message.values.length)) {
                            message.values = [];
                        }
                        message.values.push(types[4].decode(reader, reader.uint32()));
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
            };})($protobuf.Reader, $types);

            /**
             * Decodes a Layer message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {vector_tile.Tile.Layer} Layer
             */
            Layer.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Layer message.
             * @function
             * @param {vector_tile.Tile.Layer|Object} message Layer message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Layer.verify = (function(util, types) { return function verify(message) {
                if (!util.isInteger(message.version)) {
                    return "vector_tile.Tile.Layer.version: integer expected";
                }
                if (!util.isString(message.name)) {
                    return "vector_tile.Tile.Layer.name: string expected";
                }
                if (message.features !== undefined) {
                    if (!Array.isArray(message.features)) {
                        return "vector_tile.Tile.Layer.features: array expected";
                    }
                    for (var i = 0; i < message.features.length; ++i) {
                        var err;
                        if (err = types[2].verify(message.features[i])) {
                            return err;
                        }
                    }
                }
                if (message.keys !== undefined) {
                    if (!Array.isArray(message.keys)) {
                        return "vector_tile.Tile.Layer.keys: array expected";
                    }
                    for (var i = 0; i < message.keys.length; ++i) {
                        if (!util.isString(message.keys[i])) {
                            return "vector_tile.Tile.Layer.keys: string[] expected";
                        }
                    }
                }
                if (message.values !== undefined) {
                    if (!Array.isArray(message.values)) {
                        return "vector_tile.Tile.Layer.values: array expected";
                    }
                    for (var i = 0; i < message.values.length; ++i) {
                        var err;
                        if (err = types[4].verify(message.values[i])) {
                            return err;
                        }
                    }
                }
                if (message.extent !== undefined) {
                    if (!util.isInteger(message.extent)) {
                        return "vector_tile.Tile.Layer.extent: integer expected";
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a Layer message.
             * @function
             * @param {vector_tile.Tile.Layer|Object} source Layer message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {vector_tile.Tile.Layer|Object} Converted message
             */
            Layer.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.version === undefined && options.defaults) {
                        dst.version = 1;
                    }
                    if (dst.name === undefined && options.defaults) {
                        dst.name = "";
                    }
                    if (src.features && src.features.length) {
                        dst.features = [];
                        for (var i = 0; i < src.features.length; ++i) {
                            dst.features.push(types[2].convert(src.features[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.features = [];
                        }
                    }
                    if (src.keys && src.keys.length) {
                        dst.keys = [];
                        for (var i = 0; i < src.keys.length; ++i) {
                            dst.keys.push(src.keys[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.keys = [];
                        }
                    }
                    if (src.values && src.values.length) {
                        dst.values = [];
                        for (var i = 0; i < src.values.length; ++i) {
                            dst.values.push(types[4].convert(src.values[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.values = [];
                        }
                    }
                    if (dst.extent === undefined && options.defaults) {
                        dst.extent = 4096;
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a Layer message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {vector_tile.Tile.Layer} Layer
             */
            Layer.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this Layer message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return Layer;
        })();

        return Tile;
    })();

    return vector_tile;
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

$protobuf.roots["test_vector_tile"] = $root;

module.exports = $root;
