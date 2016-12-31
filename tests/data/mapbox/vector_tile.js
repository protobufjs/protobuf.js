"use strict"; // eslint-disable-line strict

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

        /**
         * Creates a new Tile instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {vector_tile.Tile} Tile instance
         */
        Tile.create = function create(properties) {
            return new Tile(properties);
        };

        /**
         * Encodes the specified Tile.
         * @function
         * @param {vector_tile.Tile|Object} message Tile or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tile.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
            writer || (writer = Writer.create())
            if (message.layers)
                for (var i = 0; i < message.layers.length; ++i)
                types[0].encode(message.layers[i], writer.uint32(26/*= id 3, wireType 2 */).fork()).ldelim()
            return writer
        }})($protobuf.Writer, $protobuf.util, ["vector_tile.Tile.Layer"]); /* eslint-enable */

        /**
         * Encodes the specified Tile, length delimited.
         * @param {vector_tile.Tile|Object} message Tile or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Tile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Tile from the specified reader or buffer.
         * @function
         * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vector_tile.Tile} Tile
         */
        Tile.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
            reader instanceof Reader || (reader = Reader.create(reader))
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile
            while (reader.pos < end) {
                var tag = reader.uint32()
                switch (tag >>> 3) {
                    case 3:
                        message.layers && message.layers.length || (message.layers = [])
                        message.layers.push(types[0].decode(reader, reader.uint32()))
                        break
                    default:
                        reader.skipType(tag & 7)
                        break
                }
            }
            return message
        }})($protobuf.Reader, $protobuf.util, ["vector_tile.Tile.Layer"]); /* eslint-enable */

        /**
         * Decodes a Tile from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @returns {vector_tile.Tile} Tile
         */
        Tile.decodeDelimited = function decodeDelimited(readerOrBuffer) {
            readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };

        /**
         * Verifies a Tile.
         * @function
         * @param {vector_tile.Tile|Object} message Tile or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Tile.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
            if (message.layers !== undefined) {
                if (!Array.isArray(message.layers))
                    return "invalid value for field .vector_tile.Tile.layers (array expected)"
                for (var i = 0; i < message.layers.length; ++i) {
                    var reason;
                    if (reason = types[0].verify(message.layers[i]))
                        return reason
                }
            }
            return null
        }})($protobuf.util, ["vector_tile.Tile.Layer"]); /* eslint-enable */

        /**
         * GeomType values.
         * @exports vector_tile.Tile.GeomType
         * @type {Object.<string,number>}
         */
        Tile.GeomType = {

            UNKNOWN: 0,
            POINT: 1,
            LINESTRING: 2,
            POLYGON: 3
        };

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
             * Encodes the specified Value.
             * @function
             * @param {vector_tile.Tile.Value|Object} message Value or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.stringValue !== undefined && message.stringValue !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.stringValue)
                if (message.floatValue !== undefined && message.floatValue !== 0)
                    writer.uint32(21/*= id 2, wireType 5 */).float(message.floatValue)
                if (message.doubleValue !== undefined && message.doubleValue !== 0)
                    writer.uint32(25/*= id 3, wireType 1 */).double(message.doubleValue)
                if (message.intValue !== undefined && message.intValue !== null && util.longNe(message.intValue, 0, 0))
                    writer.uint32(32/*= id 4, wireType 0 */).int64(message.intValue)
                if (message.uintValue !== undefined && message.uintValue !== null && util.longNe(message.uintValue, 0, 0))
                    writer.uint32(40/*= id 5, wireType 0 */).uint64(message.uintValue)
                if (message.sintValue !== undefined && message.sintValue !== null && util.longNe(message.sintValue, 0, 0))
                    writer.uint32(48/*= id 6, wireType 0 */).sint64(message.sintValue)
                if (message.boolValue !== undefined && message.boolValue !== false)
                    writer.uint32(56/*= id 7, wireType 0 */).bool(message.boolValue)
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, null, null, null, null, null]); /* eslint-enable */

            /**
             * Encodes the specified Value, length delimited.
             * @param {vector_tile.Tile.Value|Object} message Value or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Value from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Value} Value
             */
            Value.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile.Value
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.stringValue = reader.string()
                            break
                        case 2:
                            message.floatValue = reader.float()
                            break
                        case 3:
                            message.doubleValue = reader.double()
                            break
                        case 4:
                            message.intValue = reader.int64()
                            break
                        case 5:
                            message.uintValue = reader.uint64()
                            break
                        case 6:
                            message.sintValue = reader.sint64()
                            break
                        case 7:
                            message.boolValue = reader.bool()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, null, null, null, null, null]); /* eslint-enable */

            /**
             * Decodes a Value from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {vector_tile.Tile.Value} Value
             */
            Value.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Value.
             * @function
             * @param {vector_tile.Tile.Value|Object} message Value or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Value.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.stringValue !== undefined) {
                    if (!util.isString(message.stringValue))
                        return "invalid value for field .vector_tile.Tile.Value.stringValue (string expected)"
                }
                if (message.floatValue !== undefined) {
                    if (typeof message.floatValue !== "number")
                        return "invalid value for field .vector_tile.Tile.Value.floatValue (number expected)"
                }
                if (message.doubleValue !== undefined) {
                    if (typeof message.doubleValue !== "number")
                        return "invalid value for field .vector_tile.Tile.Value.doubleValue (number expected)"
                }
                if (message.intValue !== undefined) {
                    if (!util.isInteger(message.intValue) && !(message.intValue && util.isInteger(message.intValue.low) && util.isInteger(message.intValue.high)))
                        return "invalid value for field .vector_tile.Tile.Value.intValue (integer | Long expected)"
                }
                if (message.uintValue !== undefined) {
                    if (!util.isInteger(message.uintValue) && !(message.uintValue && util.isInteger(message.uintValue.low) && util.isInteger(message.uintValue.high)))
                        return "invalid value for field .vector_tile.Tile.Value.uintValue (integer | Long expected)"
                }
                if (message.sintValue !== undefined) {
                    if (!util.isInteger(message.sintValue) && !(message.sintValue && util.isInteger(message.sintValue.low) && util.isInteger(message.sintValue.high)))
                        return "invalid value for field .vector_tile.Tile.Value.sintValue (integer | Long expected)"
                }
                if (message.boolValue !== undefined) {
                    if (typeof message.boolValue !== "boolean")
                        return "invalid value for field .vector_tile.Tile.Value.boolValue (boolean expected)"
                }
                return null
            }})($protobuf.util, [null, null, null, null, null, null, null]); /* eslint-enable */

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
            $prototype.type = "UNKNOWN";

            /**
             * Feature geometry.
             * @type {Array.<number>}
             */
            $prototype.geometry = $protobuf.util.emptyArray;

            /**
             * Creates a new Feature instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {vector_tile.Tile.Feature} Feature instance
             */
            Feature.create = function create(properties) {
                return new Feature(properties);
            };

            /**
             * Encodes the specified Feature.
             * @function
             * @param {vector_tile.Tile.Feature|Object} message Feature or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Feature.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.id !== undefined && message.id !== null && util.longNe(message.id, 0, 0))
                    writer.uint32(8/*= id 1, wireType 0 */).uint64(message.id)
                if (message.tags && message.tags.length) {
                    writer.uint32(18/*= id 2, wireType 2 */).fork()
                    for (var i = 0; i < message.tags.length; ++i)
                        writer.uint32(message.tags[i])
                    writer.ldelim()
                }
                if (message.type !== undefined && message.type !== "UNKNOWN")
                    writer.uint32(24/*= id 3, wireType 0 */).uint32(message.type)
                if (message.geometry && message.geometry.length) {
                    writer.uint32(34/*= id 4, wireType 2 */).fork()
                    for (var i = 0; i < message.geometry.length; ++i)
                        writer.uint32(message.geometry[i])
                    writer.ldelim()
                }
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, "vector_tile.Tile.GeomType", null]); /* eslint-enable */

            /**
             * Encodes the specified Feature, length delimited.
             * @param {vector_tile.Tile.Feature|Object} message Feature or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Feature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Feature from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Feature} Feature
             */
            Feature.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile.Feature
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.id = reader.uint64()
                            break
                        case 2:
                            message.tags && message.tags.length || (message.tags = [])
                            if ((tag & 7) === 2) {
                                var e = reader.uint32()+reader.pos
                                while (reader.pos < e)
                                    message.tags.push(reader.uint32())
                            }else
                                message.tags.push(reader.uint32())
                            break
                        case 3:
                            message.type = reader.uint32()
                            break
                        case 4:
                            message.geometry && message.geometry.length || (message.geometry = [])
                            if ((tag & 7) === 2) {
                                var e = reader.uint32()+reader.pos
                                while (reader.pos < e)
                                    message.geometry.push(reader.uint32())
                            }else
                                message.geometry.push(reader.uint32())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, "vector_tile.Tile.GeomType", null]); /* eslint-enable */

            /**
             * Decodes a Feature from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {vector_tile.Tile.Feature} Feature
             */
            Feature.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Feature.
             * @function
             * @param {vector_tile.Tile.Feature|Object} message Feature or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Feature.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.id !== undefined) {
                    if (!util.isInteger(message.id) && !(message.id && util.isInteger(message.id.low) && util.isInteger(message.id.high)))
                        return "invalid value for field .vector_tile.Tile.Feature.id (integer | Long expected)"
                }
                if (message.tags !== undefined) {
                    if (!Array.isArray(message.tags))
                        return "invalid value for field .vector_tile.Tile.Feature.tags (array expected)"
                    for (var i = 0; i < message.tags.length; ++i) {
                        if (!util.isInteger(message.tags[i]))
                            return "invalid value for field .vector_tile.Tile.Feature.tags (integer[] expected)"
                    }
                }
                if (message.type !== undefined) {
                    switch (message.type) {
                        default:
                            return "invalid value for field .vector_tile.Tile.Feature.type (enum value expected)"
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break
                    }
                }
                if (message.geometry !== undefined) {
                    if (!Array.isArray(message.geometry))
                        return "invalid value for field .vector_tile.Tile.Feature.geometry (array expected)"
                    for (var i = 0; i < message.geometry.length; ++i) {
                        if (!util.isInteger(message.geometry[i]))
                            return "invalid value for field .vector_tile.Tile.Feature.geometry (integer[] expected)"
                    }
                }
                return null
            }})($protobuf.util, [null, null, "vector_tile.Tile.GeomType", null]); /* eslint-enable */

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

            /**
             * Creates a new Layer instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {vector_tile.Tile.Layer} Layer instance
             */
            Layer.create = function create(properties) {
                return new Layer(properties);
            };

            /**
             * Encodes the specified Layer.
             * @function
             * @param {vector_tile.Tile.Layer|Object} message Layer or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Layer.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                writer.uint32(120/*= id 15, wireType 0 */).uint32(message.version)
                writer.uint32(10/*= id 1, wireType 2 */).string(message.name)
                if (message.features)
                    for (var i = 0; i < message.features.length; ++i)
                    types[2].encode(message.features[i], writer.uint32(18/*= id 2, wireType 2 */).fork()).ldelim()
                if (message.keys)
                    for (var i = 0; i < message.keys.length; ++i)
                    writer.uint32(26/*= id 3, wireType 2 */).string(message.keys[i])
                if (message.values)
                    for (var i = 0; i < message.values.length; ++i)
                    types[4].encode(message.values[i], writer.uint32(34/*= id 4, wireType 2 */).fork()).ldelim()
                if (message.extent !== undefined && message.extent !== 4096)
                    writer.uint32(40/*= id 5, wireType 0 */).uint32(message.extent)
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, "vector_tile.Tile.Feature", null, "vector_tile.Tile.Value", null]); /* eslint-enable */

            /**
             * Encodes the specified Layer, length delimited.
             * @param {vector_tile.Tile.Layer|Object} message Layer or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Layer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Layer from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Layer} Layer
             */
            Layer.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.vector_tile.Tile.Layer
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 15:
                            message.version = reader.uint32()
                            break
                        case 1:
                            message.name = reader.string()
                            break
                        case 2:
                            message.features && message.features.length || (message.features = [])
                            message.features.push(types[2].decode(reader, reader.uint32()))
                            break
                        case 3:
                            message.keys && message.keys.length || (message.keys = [])
                            message.keys.push(reader.string())
                            break
                        case 4:
                            message.values && message.values.length || (message.values = [])
                            message.values.push(types[4].decode(reader, reader.uint32()))
                            break
                        case 5:
                            message.extent = reader.uint32()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, "vector_tile.Tile.Feature", null, "vector_tile.Tile.Value", null]); /* eslint-enable */

            /**
             * Decodes a Layer from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {vector_tile.Tile.Layer} Layer
             */
            Layer.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Layer.
             * @function
             * @param {vector_tile.Tile.Layer|Object} message Layer or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Layer.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (!util.isInteger(message.version))
                    return "invalid value for field .vector_tile.Tile.Layer.version (integer expected)"
                if (!util.isString(message.name))
                    return "invalid value for field .vector_tile.Tile.Layer.name (string expected)"
                if (message.features !== undefined) {
                    if (!Array.isArray(message.features))
                        return "invalid value for field .vector_tile.Tile.Layer.features (array expected)"
                    for (var i = 0; i < message.features.length; ++i) {
                        var reason;
                        if (reason = types[2].verify(message.features[i]))
                            return reason
                    }
                }
                if (message.keys !== undefined) {
                    if (!Array.isArray(message.keys))
                        return "invalid value for field .vector_tile.Tile.Layer.keys (array expected)"
                    for (var i = 0; i < message.keys.length; ++i) {
                        if (!util.isString(message.keys[i]))
                            return "invalid value for field .vector_tile.Tile.Layer.keys (string[] expected)"
                    }
                }
                if (message.values !== undefined) {
                    if (!Array.isArray(message.values))
                        return "invalid value for field .vector_tile.Tile.Layer.values (array expected)"
                    for (var i = 0; i < message.values.length; ++i) {
                        var reason;
                        if (reason = types[4].verify(message.values[i]))
                            return reason
                    }
                }
                if (message.extent !== undefined) {
                    if (!util.isInteger(message.extent))
                        return "invalid value for field .vector_tile.Tile.Layer.extent (integer expected)"
                }
                return null
            }})($protobuf.util, [null, null, "vector_tile.Tile.Feature", null, "vector_tile.Tile.Value", null]); /* eslint-enable */

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
        path = path.split('.');
        var ptr = $root;
        while (path.length)
            ptr = ptr[path.shift()];
        types[i] = ptr;
    });
});

$protobuf.roots["test_vector_tile"] = $root;

module.exports = $root;
