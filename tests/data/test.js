/* eslint-disable block-scoped-var, no-redeclare, no-control-regex, strict */
"use strict";

var $protobuf = require("../../runtime");

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = {};

$root.jspb = (function() {

    /**
     * Namespace jspb.
     * @exports jspb
     * @namespace
     */
    var jspb = {};

    jspb.test = (function() {

        /**
         * Namespace test.
         * @exports jspb.test
         * @namespace
         */
        var test = {};

        test.Empty = (function() {

            /**
             * Constructs a new Empty.
             * @exports jspb.test.Empty
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function Empty(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.Empty.prototype */
            var $prototype = Empty.prototype;

            /**
             * Creates a new Empty instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Empty} Empty instance
             */
            Empty.create = function create(properties) {
                return new Empty(properties);
            };

            /**
             * Encodes the specified Empty message.
             * @function
             * @param {jspb.test.Empty|Object} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified Empty message, length delimited.
             * @param {jspb.test.Empty|Object} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Empty} Empty
             */
            Empty.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.Empty();
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
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Empty} Empty
             */
            Empty.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an Empty message.
             * @function
             * @param {jspb.test.Empty|Object} message Empty message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Empty.verify = (function() { return function verify() {
                return null;
            };})();

            /**
             * Converts an Empty message.
             * @function
             * @param {jspb.test.Empty|Object} source Empty message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.Empty|Object} Converted message
             */
            Empty.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                return dst;
            };})();

            /**
             * Creates an Empty message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.Empty} Empty
             */
            Empty.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this Empty message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return Empty;
        })();

        /**
         * OuterEnum enum.
         * @name OuterEnum
         * @memberof jspb.test
         * @enum {number}
         * @property {number} FOO=1 FOO value
         * @property {number} BAR=2 BAR value
         */
        test.OuterEnum = (function() {
            var valuesById = {},
                values = Object.create(valuesById);
            values[valuesById[1] = "FOO"] = 1;
            values[valuesById[2] = "BAR"] = 2;
            return values;
        })();

        test.EnumContainer = (function() {

            /**
             * Constructs a new EnumContainer.
             * @exports jspb.test.EnumContainer
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function EnumContainer(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.EnumContainer.prototype */
            var $prototype = EnumContainer.prototype;

            /**
             * EnumContainer outerEnum.
             * @type {number}
             */
            $prototype.outerEnum = 0;

            // Referenced types
            var $types = ["jspb.test.OuterEnum"]; $lazyTypes.push($types);

            /**
             * Creates a new EnumContainer instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.EnumContainer} EnumContainer instance
             */
            EnumContainer.create = function create(properties) {
                return new EnumContainer(properties);
            };

            /**
             * Encodes the specified EnumContainer message.
             * @function
             * @param {jspb.test.EnumContainer|Object} message EnumContainer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumContainer.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.outerEnum !== undefined && message.outerEnum !== 0) {
                    writer.uint32(8).uint32(message.outerEnum);
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified EnumContainer message, length delimited.
             * @param {jspb.test.EnumContainer|Object} message EnumContainer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumContainer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an EnumContainer message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.EnumContainer} EnumContainer
             */
            EnumContainer.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.EnumContainer();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.outerEnum = reader.uint32();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes an EnumContainer message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.EnumContainer} EnumContainer
             */
            EnumContainer.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an EnumContainer message.
             * @function
             * @param {jspb.test.EnumContainer|Object} message EnumContainer message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            EnumContainer.verify = (function() { return function verify(message) {
                if (message.outerEnum !== undefined) {
                    switch (message.outerEnum) {
                    default:
                        return "jspb.test.EnumContainer.outerEnum: enum value expected";

                    case 1:
                    case 2:
                        break;
                    }
                }
                return null;
            };})();

            /**
             * Converts an EnumContainer message.
             * @function
             * @param {jspb.test.EnumContainer|Object} source EnumContainer message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.EnumContainer|Object} Converted message
             */
            EnumContainer.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    dst.outerEnum = impl.enums(src.outerEnum, 0, types[0], options);
                }
                return dst;
            };})($types);

            /**
             * Creates an EnumContainer message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.EnumContainer} EnumContainer
             */
            EnumContainer.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this EnumContainer message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return EnumContainer;
        })();

        test.Simple1 = (function() {

            /**
             * Constructs a new Simple1.
             * @exports jspb.test.Simple1
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function Simple1(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.Simple1.prototype */
            var $prototype = Simple1.prototype;

            /**
             * Simple1 aString.
             * @type {string}
             */
            $prototype.aString = "";

            /**
             * Simple1 aRepeatedString.
             * @type {Array.<string>}
             */
            $prototype.aRepeatedString = $protobuf.util.emptyArray;

            /**
             * Simple1 aBoolean.
             * @type {boolean}
             */
            $prototype.aBoolean = false;

            /**
             * Creates a new Simple1 instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Simple1} Simple1 instance
             */
            Simple1.create = function create(properties) {
                return new Simple1(properties);
            };

            /**
             * Encodes the specified Simple1 message.
             * @function
             * @param {jspb.test.Simple1|Object} message Simple1 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Simple1.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                writer.uint32(10).string(message.aString);
                if (message.aRepeatedString) {
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        writer.uint32(18).string(message.aRepeatedString[i]);
                    }
                }
                if (message.aBoolean !== undefined && message.aBoolean !== false) {
                    writer.uint32(24).bool(message.aBoolean);
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified Simple1 message, length delimited.
             * @param {jspb.test.Simple1|Object} message Simple1 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Simple1.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Simple1 message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Simple1} Simple1
             */
            Simple1.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.Simple1();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.aString = reader.string();
                        break;

                    case 2:
                        if (!(message.aRepeatedString && message.aRepeatedString.length)) {
                            message.aRepeatedString = [];
                        }
                        message.aRepeatedString.push(reader.string());
                        break;

                    case 3:
                        message.aBoolean = reader.bool();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes a Simple1 message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Simple1} Simple1
             */
            Simple1.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Simple1 message.
             * @function
             * @param {jspb.test.Simple1|Object} message Simple1 message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Simple1.verify = (function(util) { return function verify(message) {
                if (!util.isString(message.aString)) {
                    return "jspb.test.Simple1.aString: string expected";
                }
                if (message.aRepeatedString !== undefined) {
                    if (!Array.isArray(message.aRepeatedString)) {
                        return "jspb.test.Simple1.aRepeatedString: array expected";
                    }
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        if (!util.isString(message.aRepeatedString[i])) {
                            return "jspb.test.Simple1.aRepeatedString: string[] expected";
                        }
                    }
                }
                if (message.aBoolean !== undefined) {
                    if (typeof message.aBoolean !== "boolean") {
                        return "jspb.test.Simple1.aBoolean: boolean expected";
                    }
                }
                return null;
            };})($protobuf.util);

            /**
             * Converts a Simple1 message.
             * @function
             * @param {jspb.test.Simple1|Object} source Simple1 message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.Simple1|Object} Converted message
             */
            Simple1.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.aString === undefined && options.defaults) {
                        dst.aString = "";
                    }
                    if (src.aRepeatedString && src.aRepeatedString.length) {
                        dst.aRepeatedString = [];
                        for (var i = 0; i < src.aRepeatedString.length; ++i) {
                            dst.aRepeatedString.push(src.aRepeatedString[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.aRepeatedString = [];
                        }
                    }
                    if (dst.aBoolean === undefined && options.defaults) {
                        dst.aBoolean = false;
                    }
                }
                return dst;
            };})();

            /**
             * Creates a Simple1 message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.Simple1} Simple1
             */
            Simple1.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this Simple1 message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return Simple1;
        })();

        test.Simple2 = (function() {

            /**
             * Constructs a new Simple2.
             * @exports jspb.test.Simple2
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function Simple2(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.Simple2.prototype */
            var $prototype = Simple2.prototype;

            /**
             * Simple2 aString.
             * @type {string}
             */
            $prototype.aString = "";

            /**
             * Simple2 aRepeatedString.
             * @type {Array.<string>}
             */
            $prototype.aRepeatedString = $protobuf.util.emptyArray;

            /**
             * Creates a new Simple2 instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Simple2} Simple2 instance
             */
            Simple2.create = function create(properties) {
                return new Simple2(properties);
            };

            /**
             * Encodes the specified Simple2 message.
             * @function
             * @param {jspb.test.Simple2|Object} message Simple2 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Simple2.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                writer.uint32(10).string(message.aString);
                if (message.aRepeatedString) {
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        writer.uint32(18).string(message.aRepeatedString[i]);
                    }
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified Simple2 message, length delimited.
             * @param {jspb.test.Simple2|Object} message Simple2 message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Simple2.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Simple2 message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Simple2} Simple2
             */
            Simple2.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.Simple2();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.aString = reader.string();
                        break;

                    case 2:
                        if (!(message.aRepeatedString && message.aRepeatedString.length)) {
                            message.aRepeatedString = [];
                        }
                        message.aRepeatedString.push(reader.string());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes a Simple2 message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Simple2} Simple2
             */
            Simple2.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Simple2 message.
             * @function
             * @param {jspb.test.Simple2|Object} message Simple2 message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Simple2.verify = (function(util) { return function verify(message) {
                if (!util.isString(message.aString)) {
                    return "jspb.test.Simple2.aString: string expected";
                }
                if (message.aRepeatedString !== undefined) {
                    if (!Array.isArray(message.aRepeatedString)) {
                        return "jspb.test.Simple2.aRepeatedString: array expected";
                    }
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        if (!util.isString(message.aRepeatedString[i])) {
                            return "jspb.test.Simple2.aRepeatedString: string[] expected";
                        }
                    }
                }
                return null;
            };})($protobuf.util);

            /**
             * Converts a Simple2 message.
             * @function
             * @param {jspb.test.Simple2|Object} source Simple2 message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.Simple2|Object} Converted message
             */
            Simple2.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.aString === undefined && options.defaults) {
                        dst.aString = "";
                    }
                    if (src.aRepeatedString && src.aRepeatedString.length) {
                        dst.aRepeatedString = [];
                        for (var i = 0; i < src.aRepeatedString.length; ++i) {
                            dst.aRepeatedString.push(src.aRepeatedString[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.aRepeatedString = [];
                        }
                    }
                }
                return dst;
            };})();

            /**
             * Creates a Simple2 message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.Simple2} Simple2
             */
            Simple2.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this Simple2 message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return Simple2;
        })();

        test.SpecialCases = (function() {

            /**
             * Constructs a new SpecialCases.
             * @exports jspb.test.SpecialCases
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function SpecialCases(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.SpecialCases.prototype */
            var $prototype = SpecialCases.prototype;

            /**
             * SpecialCases normal.
             * @type {string}
             */
            $prototype.normal = "";

            /**
             * SpecialCases default.
             * @name jspb.test.SpecialCases#default
             * @type {string}
             */
            $prototype["default"] = "";

            /**
             * SpecialCases function.
             * @name jspb.test.SpecialCases#function
             * @type {string}
             */
            $prototype["function"] = "";

            /**
             * SpecialCases var.
             * @name jspb.test.SpecialCases#var
             * @type {string}
             */
            $prototype["var"] = "";

            /**
             * Creates a new SpecialCases instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.SpecialCases} SpecialCases instance
             */
            SpecialCases.create = function create(properties) {
                return new SpecialCases(properties);
            };

            /**
             * Encodes the specified SpecialCases message.
             * @function
             * @param {jspb.test.SpecialCases|Object} message SpecialCases message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SpecialCases.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                writer.uint32(10).string(message.normal);
                writer.uint32(18).string(message["default"]);
                writer.uint32(26).string(message["function"]);
                writer.uint32(34).string(message["var"]);
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified SpecialCases message, length delimited.
             * @param {jspb.test.SpecialCases|Object} message SpecialCases message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SpecialCases.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SpecialCases message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.SpecialCases} SpecialCases
             */
            SpecialCases.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.SpecialCases();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.normal = reader.string();
                        break;

                    case 2:
                        message["default"] = reader.string();
                        break;

                    case 3:
                        message["function"] = reader.string();
                        break;

                    case 4:
                        message["var"] = reader.string();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes a SpecialCases message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.SpecialCases} SpecialCases
             */
            SpecialCases.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a SpecialCases message.
             * @function
             * @param {jspb.test.SpecialCases|Object} message SpecialCases message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            SpecialCases.verify = (function(util) { return function verify(message) {
                if (!util.isString(message.normal)) {
                    return "jspb.test.SpecialCases.normal: string expected";
                }
                if (!util.isString(message["default"])) {
                    return "jspb.test.SpecialCases.default: string expected";
                }
                if (!util.isString(message["function"])) {
                    return "jspb.test.SpecialCases.function: string expected";
                }
                if (!util.isString(message["var"])) {
                    return "jspb.test.SpecialCases.var: string expected";
                }
                return null;
            };})($protobuf.util);

            /**
             * Converts a SpecialCases message.
             * @function
             * @param {jspb.test.SpecialCases|Object} source SpecialCases message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.SpecialCases|Object} Converted message
             */
            SpecialCases.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.normal === undefined && options.defaults) {
                        dst.normal = "";
                    }
                    if (dst["default"] === undefined && options.defaults) {
                        dst["default"] = "";
                    }
                    if (dst["function"] === undefined && options.defaults) {
                        dst["function"] = "";
                    }
                    if (dst["var"] === undefined && options.defaults) {
                        dst["var"] = "";
                    }
                }
                return dst;
            };})();

            /**
             * Creates a SpecialCases message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.SpecialCases} SpecialCases
             */
            SpecialCases.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this SpecialCases message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return SpecialCases;
        })();

        test.OptionalFields = (function() {

            /**
             * Constructs a new OptionalFields.
             * @exports jspb.test.OptionalFields
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function OptionalFields(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.OptionalFields.prototype */
            var $prototype = OptionalFields.prototype;

            /**
             * OptionalFields aString.
             * @type {string}
             */
            $prototype.aString = "";

            /**
             * OptionalFields aBool.
             * @type {boolean}
             */
            $prototype.aBool = false;

            /**
             * OptionalFields aNestedMessage.
             * @type {jspb.test.OptionalFields.Nested}
             */
            $prototype.aNestedMessage = null;

            /**
             * OptionalFields aRepeatedMessage.
             * @type {Array.<jspb.test.OptionalFields.Nested>}
             */
            $prototype.aRepeatedMessage = $protobuf.util.emptyArray;

            /**
             * OptionalFields aRepeatedString.
             * @type {Array.<string>}
             */
            $prototype.aRepeatedString = $protobuf.util.emptyArray;

            // Referenced types
            var $types = [null, null, "jspb.test.OptionalFields.Nested", "jspb.test.OptionalFields.Nested", null]; $lazyTypes.push($types);

            /**
             * Creates a new OptionalFields instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.OptionalFields} OptionalFields instance
             */
            OptionalFields.create = function create(properties) {
                return new OptionalFields(properties);
            };

            /**
             * Encodes the specified OptionalFields message.
             * @function
             * @param {jspb.test.OptionalFields|Object} message OptionalFields message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OptionalFields.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.aString !== undefined && message.aString !== "") {
                    writer.uint32(10).string(message.aString);
                }
                writer.uint32(16).bool(message.aBool);
                if (message.aNestedMessage !== undefined && message.aNestedMessage !== null) {
                    types[2].encode(message.aNestedMessage, writer.uint32(26).fork()).ldelim();
                }
                if (message.aRepeatedMessage) {
                    for (var i = 0; i < message.aRepeatedMessage.length; ++i) {
                        types[3].encode(message.aRepeatedMessage[i], writer.uint32(34).fork()).ldelim();
                    }
                }
                if (message.aRepeatedString) {
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        writer.uint32(42).string(message.aRepeatedString[i]);
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified OptionalFields message, length delimited.
             * @param {jspb.test.OptionalFields|Object} message OptionalFields message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OptionalFields.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an OptionalFields message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.OptionalFields} OptionalFields
             */
            OptionalFields.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.OptionalFields();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.aString = reader.string();
                        break;

                    case 2:
                        message.aBool = reader.bool();
                        break;

                    case 3:
                        message.aNestedMessage = types[2].decode(reader, reader.uint32());
                        break;

                    case 4:
                        if (!(message.aRepeatedMessage && message.aRepeatedMessage.length)) {
                            message.aRepeatedMessage = [];
                        }
                        message.aRepeatedMessage.push(types[3].decode(reader, reader.uint32()));
                        break;

                    case 5:
                        if (!(message.aRepeatedString && message.aRepeatedString.length)) {
                            message.aRepeatedString = [];
                        }
                        message.aRepeatedString.push(reader.string());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes an OptionalFields message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.OptionalFields} OptionalFields
             */
            OptionalFields.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an OptionalFields message.
             * @function
             * @param {jspb.test.OptionalFields|Object} message OptionalFields message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            OptionalFields.verify = (function(util, types) { return function verify(message) {
                if (message.aString !== undefined) {
                    if (!util.isString(message.aString)) {
                        return "jspb.test.OptionalFields.aString: string expected";
                    }
                }
                if (typeof message.aBool !== "boolean") {
                    return "jspb.test.OptionalFields.aBool: boolean expected";
                }
                if (message.aNestedMessage !== undefined && message.aNestedMessage !== null) {
                    var err;
                    if (err = types[2].verify(message.aNestedMessage)) {
                        return err;
                    }
                }
                if (message.aRepeatedMessage !== undefined) {
                    if (!Array.isArray(message.aRepeatedMessage)) {
                        return "jspb.test.OptionalFields.aRepeatedMessage: array expected";
                    }
                    for (var i = 0; i < message.aRepeatedMessage.length; ++i) {
                        var err;
                        if (err = types[3].verify(message.aRepeatedMessage[i])) {
                            return err;
                        }
                    }
                }
                if (message.aRepeatedString !== undefined) {
                    if (!Array.isArray(message.aRepeatedString)) {
                        return "jspb.test.OptionalFields.aRepeatedString: array expected";
                    }
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        if (!util.isString(message.aRepeatedString[i])) {
                            return "jspb.test.OptionalFields.aRepeatedString: string[] expected";
                        }
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts an OptionalFields message.
             * @function
             * @param {jspb.test.OptionalFields|Object} source OptionalFields message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.OptionalFields|Object} Converted message
             */
            OptionalFields.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.aString === undefined && options.defaults) {
                        dst.aString = "";
                    }
                    if (dst.aBool === undefined && options.defaults) {
                        dst.aBool = false;
                    }
                    dst.aNestedMessage = types[2].convert(src.aNestedMessage, impl, options);
                    if (src.aRepeatedMessage && src.aRepeatedMessage.length) {
                        dst.aRepeatedMessage = [];
                        for (var i = 0; i < src.aRepeatedMessage.length; ++i) {
                            dst.aRepeatedMessage.push(types[3].convert(src.aRepeatedMessage[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.aRepeatedMessage = [];
                        }
                    }
                    if (src.aRepeatedString && src.aRepeatedString.length) {
                        dst.aRepeatedString = [];
                        for (var i = 0; i < src.aRepeatedString.length; ++i) {
                            dst.aRepeatedString.push(src.aRepeatedString[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.aRepeatedString = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates an OptionalFields message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.OptionalFields} OptionalFields
             */
            OptionalFields.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this OptionalFields message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            OptionalFields.Nested = (function() {

                /**
                 * Constructs a new Nested.
                 * @exports jspb.test.OptionalFields.Nested
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                function Nested(properties) {
                    if (properties) {
                        var keys = Object.keys(properties);
                        for (var i = 0; i < keys.length; ++i)
                            this[keys[i]] = properties[keys[i]];
                    }
                }

                /** @alias jspb.test.OptionalFields.Nested.prototype */
                var $prototype = Nested.prototype;

                /**
                 * Nested anInt.
                 * @type {number}
                 */
                $prototype.anInt = 0;

                /**
                 * Creates a new Nested instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {jspb.test.OptionalFields.Nested} Nested instance
                 */
                Nested.create = function create(properties) {
                    return new Nested(properties);
                };

                /**
                 * Encodes the specified Nested message.
                 * @function
                 * @param {jspb.test.OptionalFields.Nested|Object} message Nested message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encode = (function(Writer) { return function encode(message, writer) {
                    if (!writer) {
                        writer = Writer.create();
                    }
                    if (message.anInt !== undefined && message.anInt !== 0) {
                        writer.uint32(8).int32(message.anInt);
                    }
                    return writer;
                };})($protobuf.Writer);

                /**
                 * Encodes the specified Nested message, length delimited.
                 * @param {jspb.test.OptionalFields.Nested|Object} message Nested message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Nested message from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.OptionalFields.Nested} Nested
                 */
                Nested.decode = (function(Reader) { return function decode(reader, len) {
                    if (!(reader instanceof Reader)) {
                        reader = Reader.create(reader);
                    }
                    var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.OptionalFields.Nested();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.anInt = reader.int32();
                            break;

                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };})($protobuf.Reader);

                /**
                 * Decodes a Nested message from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.OptionalFields.Nested} Nested
                 */
                Nested.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a Nested message.
                 * @function
                 * @param {jspb.test.OptionalFields.Nested|Object} message Nested message or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Nested.verify = (function(util) { return function verify(message) {
                    if (message.anInt !== undefined) {
                        if (!util.isInteger(message.anInt)) {
                            return "jspb.test.OptionalFields.Nested.anInt: integer expected";
                        }
                    }
                    return null;
                };})($protobuf.util);

                /**
                 * Converts a Nested message.
                 * @function
                 * @param {jspb.test.OptionalFields.Nested|Object} source Nested message or plain object to convert
                 * @param {*} impl Converter implementation to use
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {jspb.test.OptionalFields.Nested|Object} Converted message
                 */
                Nested.convert = (function() { return function convert(src, impl, options) {
                    if (!options) {
                        options = {};
                    }
                    var dst = impl.create(src, this, options);
                    if (dst) {
                        if (dst.anInt === undefined && options.defaults) {
                            dst.anInt = 0;
                        }
                    }
                    return dst;
                };})();

                /**
                 * Creates a Nested message from JSON.
                 * @param {Object.<string,*>} source Source object
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {jspb.test.OptionalFields.Nested} Nested
                 */
                Nested.from = function from(source, options) {
                    return this.convert(source, $protobuf.converters.message, options);
                };

                /**
                 * Converts this Nested message to JSON.
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {Object.<string,*>} JSON object
                 */
                $prototype.asJSON = function asJSON(options) {
                    return this.constructor.convert(this, $protobuf.converters.json, options);
                };

                return Nested;
            })();

            return OptionalFields;
        })();

        test.HasExtensions = (function() {

            /**
             * Constructs a new HasExtensions.
             * @exports jspb.test.HasExtensions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function HasExtensions(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.HasExtensions.prototype */
            var $prototype = HasExtensions.prototype;

            /**
             * HasExtensions str1.
             * @type {string}
             */
            $prototype.str1 = "";

            /**
             * HasExtensions str2.
             * @type {string}
             */
            $prototype.str2 = "";

            /**
             * HasExtensions str3.
             * @type {string}
             */
            $prototype.str3 = "";

            /**
             * HasExtensions .jspb.test.IsExtension.extField.
             * @name jspb.test.HasExtensions#.jspb.test.IsExtension.extField
             * @type {jspb.test.IsExtension}
             */
            $prototype[".jspb.test.IsExtension.extField"] = null;

            /**
             * HasExtensions .jspb.test.IndirectExtension.simple.
             * @name jspb.test.HasExtensions#.jspb.test.IndirectExtension.simple
             * @type {jspb.test.Simple1}
             */
            $prototype[".jspb.test.IndirectExtension.simple"] = null;

            /**
             * HasExtensions .jspb.test.IndirectExtension.str.
             * @name jspb.test.HasExtensions#.jspb.test.IndirectExtension.str
             * @type {string}
             */
            $prototype[".jspb.test.IndirectExtension.str"] = "";

            /**
             * HasExtensions .jspb.test.IndirectExtension.repeatedStr.
             * @name jspb.test.HasExtensions#.jspb.test.IndirectExtension.repeatedStr
             * @type {Array.<string>}
             */
            $prototype[".jspb.test.IndirectExtension.repeatedStr"] = $protobuf.util.emptyArray;

            /**
             * HasExtensions .jspb.test.IndirectExtension.repeatedSimple.
             * @name jspb.test.HasExtensions#.jspb.test.IndirectExtension.repeatedSimple
             * @type {Array.<jspb.test.Simple1>}
             */
            $prototype[".jspb.test.IndirectExtension.repeatedSimple"] = $protobuf.util.emptyArray;

            /**
             * HasExtensions .jspb.test.simple1.
             * @name jspb.test.HasExtensions#.jspb.test.simple1
             * @type {jspb.test.Simple1}
             */
            $prototype[".jspb.test.simple1"] = null;

            // Referenced types
            var $types = [null, null, null, "jspb.test.IsExtension", "jspb.test.Simple1", null, null, "jspb.test.Simple1", "jspb.test.Simple1"]; $lazyTypes.push($types);

            /**
             * Creates a new HasExtensions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.HasExtensions} HasExtensions instance
             */
            HasExtensions.create = function create(properties) {
                return new HasExtensions(properties);
            };

            /**
             * Encodes the specified HasExtensions message.
             * @function
             * @param {jspb.test.HasExtensions|Object} message HasExtensions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HasExtensions.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.str1 !== undefined && message.str1 !== "") {
                    writer.uint32(10).string(message.str1);
                }
                if (message.str2 !== undefined && message.str2 !== "") {
                    writer.uint32(18).string(message.str2);
                }
                if (message.str3 !== undefined && message.str3 !== "") {
                    writer.uint32(26).string(message.str3);
                }
                if (message[".jspb.test.IsExtension.extField"] !== undefined && message[".jspb.test.IsExtension.extField"] !== null) {
                    types[3].encode(message[".jspb.test.IsExtension.extField"], writer.uint32(802).fork()).ldelim();
                }
                if (message[".jspb.test.IndirectExtension.simple"] !== undefined && message[".jspb.test.IndirectExtension.simple"] !== null) {
                    types[4].encode(message[".jspb.test.IndirectExtension.simple"], writer.uint32(810).fork()).ldelim();
                }
                if (message[".jspb.test.IndirectExtension.str"] !== undefined && message[".jspb.test.IndirectExtension.str"] !== "") {
                    writer.uint32(818).string(message[".jspb.test.IndirectExtension.str"]);
                }
                if (message[".jspb.test.IndirectExtension.repeatedStr"]) {
                    for (var i = 0; i < message[".jspb.test.IndirectExtension.repeatedStr"].length; ++i) {
                        writer.uint32(826).string(message[".jspb.test.IndirectExtension.repeatedStr"][i]);
                    }
                }
                if (message[".jspb.test.IndirectExtension.repeatedSimple"]) {
                    for (var i = 0; i < message[".jspb.test.IndirectExtension.repeatedSimple"].length; ++i) {
                        types[7].encode(message[".jspb.test.IndirectExtension.repeatedSimple"][i], writer.uint32(834).fork()).ldelim();
                    }
                }
                if (message[".jspb.test.simple1"] !== undefined && message[".jspb.test.simple1"] !== null) {
                    types[8].encode(message[".jspb.test.simple1"], writer.uint32(842).fork()).ldelim();
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified HasExtensions message, length delimited.
             * @param {jspb.test.HasExtensions|Object} message HasExtensions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HasExtensions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a HasExtensions message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.HasExtensions} HasExtensions
             */
            HasExtensions.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.HasExtensions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.str1 = reader.string();
                        break;

                    case 2:
                        message.str2 = reader.string();
                        break;

                    case 3:
                        message.str3 = reader.string();
                        break;

                    case 100:
                        message[".jspb.test.IsExtension.extField"] = types[3].decode(reader, reader.uint32());
                        break;

                    case 101:
                        message[".jspb.test.IndirectExtension.simple"] = types[4].decode(reader, reader.uint32());
                        break;

                    case 102:
                        message[".jspb.test.IndirectExtension.str"] = reader.string();
                        break;

                    case 103:
                        if (!(message[".jspb.test.IndirectExtension.repeatedStr"] && message[".jspb.test.IndirectExtension.repeatedStr"].length)) {
                            message[".jspb.test.IndirectExtension.repeatedStr"] = [];
                        }
                        message[".jspb.test.IndirectExtension.repeatedStr"].push(reader.string());
                        break;

                    case 104:
                        if (!(message[".jspb.test.IndirectExtension.repeatedSimple"] && message[".jspb.test.IndirectExtension.repeatedSimple"].length)) {
                            message[".jspb.test.IndirectExtension.repeatedSimple"] = [];
                        }
                        message[".jspb.test.IndirectExtension.repeatedSimple"].push(types[7].decode(reader, reader.uint32()));
                        break;

                    case 105:
                        message[".jspb.test.simple1"] = types[8].decode(reader, reader.uint32());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a HasExtensions message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.HasExtensions} HasExtensions
             */
            HasExtensions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a HasExtensions message.
             * @function
             * @param {jspb.test.HasExtensions|Object} message HasExtensions message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            HasExtensions.verify = (function(util, types) { return function verify(message) {
                if (message.str1 !== undefined) {
                    if (!util.isString(message.str1)) {
                        return "jspb.test.HasExtensions.str1: string expected";
                    }
                }
                if (message.str2 !== undefined) {
                    if (!util.isString(message.str2)) {
                        return "jspb.test.HasExtensions.str2: string expected";
                    }
                }
                if (message.str3 !== undefined) {
                    if (!util.isString(message.str3)) {
                        return "jspb.test.HasExtensions.str3: string expected";
                    }
                }
                if (message[".jspb.test.IsExtension.extField"] !== undefined && message[".jspb.test.IsExtension.extField"] !== null) {
                    var err;
                    if (err = types[3].verify(message[".jspb.test.IsExtension.extField"])) {
                        return err;
                    }
                }
                if (message[".jspb.test.IndirectExtension.simple"] !== undefined && message[".jspb.test.IndirectExtension.simple"] !== null) {
                    var err;
                    if (err = types[4].verify(message[".jspb.test.IndirectExtension.simple"])) {
                        return err;
                    }
                }
                if (message[".jspb.test.IndirectExtension.str"] !== undefined) {
                    if (!util.isString(message[".jspb.test.IndirectExtension.str"])) {
                        return "jspb.test.HasExtensions..jspb.test.IndirectExtension.str: string expected";
                    }
                }
                if (message[".jspb.test.IndirectExtension.repeatedStr"] !== undefined) {
                    if (!Array.isArray(message[".jspb.test.IndirectExtension.repeatedStr"])) {
                        return "jspb.test.HasExtensions..jspb.test.IndirectExtension.repeatedStr: array expected";
                    }
                    for (var i = 0; i < message[".jspb.test.IndirectExtension.repeatedStr"].length; ++i) {
                        if (!util.isString(message[".jspb.test.IndirectExtension.repeatedStr"][i])) {
                            return "jspb.test.HasExtensions..jspb.test.IndirectExtension.repeatedStr: string[] expected";
                        }
                    }
                }
                if (message[".jspb.test.IndirectExtension.repeatedSimple"] !== undefined) {
                    if (!Array.isArray(message[".jspb.test.IndirectExtension.repeatedSimple"])) {
                        return "jspb.test.HasExtensions..jspb.test.IndirectExtension.repeatedSimple: array expected";
                    }
                    for (var i = 0; i < message[".jspb.test.IndirectExtension.repeatedSimple"].length; ++i) {
                        var err;
                        if (err = types[7].verify(message[".jspb.test.IndirectExtension.repeatedSimple"][i])) {
                            return err;
                        }
                    }
                }
                if (message[".jspb.test.simple1"] !== undefined && message[".jspb.test.simple1"] !== null) {
                    var err;
                    if (err = types[8].verify(message[".jspb.test.simple1"])) {
                        return err;
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a HasExtensions message.
             * @function
             * @param {jspb.test.HasExtensions|Object} source HasExtensions message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.HasExtensions|Object} Converted message
             */
            HasExtensions.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.str1 === undefined && options.defaults) {
                        dst.str1 = "";
                    }
                    if (dst.str2 === undefined && options.defaults) {
                        dst.str2 = "";
                    }
                    if (dst.str3 === undefined && options.defaults) {
                        dst.str3 = "";
                    }
                    dst[".jspb.test.IsExtension.extField"] = types[3].convert(src[".jspb.test.IsExtension.extField"], impl, options);
                    dst[".jspb.test.IndirectExtension.simple"] = types[4].convert(src[".jspb.test.IndirectExtension.simple"], impl, options);
                    if (dst[".jspb.test.IndirectExtension.str"] === undefined && options.defaults) {
                        dst[".jspb.test.IndirectExtension.str"] = "";
                    }
                    if (src[".jspb.test.IndirectExtension.repeatedStr"] && src[".jspb.test.IndirectExtension.repeatedStr"].length) {
                        dst[".jspb.test.IndirectExtension.repeatedStr"] = [];
                        for (var i = 0; i < src[".jspb.test.IndirectExtension.repeatedStr"].length; ++i) {
                            dst[".jspb.test.IndirectExtension.repeatedStr"].push(src[".jspb.test.IndirectExtension.repeatedStr"][i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst[".jspb.test.IndirectExtension.repeatedStr"] = [];
                        }
                    }
                    if (src[".jspb.test.IndirectExtension.repeatedSimple"] && src[".jspb.test.IndirectExtension.repeatedSimple"].length) {
                        dst[".jspb.test.IndirectExtension.repeatedSimple"] = [];
                        for (var i = 0; i < src[".jspb.test.IndirectExtension.repeatedSimple"].length; ++i) {
                            dst[".jspb.test.IndirectExtension.repeatedSimple"].push(types[7].convert(src[".jspb.test.IndirectExtension.repeatedSimple"][i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst[".jspb.test.IndirectExtension.repeatedSimple"] = [];
                        }
                    }
                    dst[".jspb.test.simple1"] = types[8].convert(src[".jspb.test.simple1"], impl, options);
                }
                return dst;
            };})($types);

            /**
             * Creates a HasExtensions message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.HasExtensions} HasExtensions
             */
            HasExtensions.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this HasExtensions message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return HasExtensions;
        })();

        test.Complex = (function() {

            /**
             * Constructs a new Complex.
             * @exports jspb.test.Complex
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function Complex(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.Complex.prototype */
            var $prototype = Complex.prototype;

            /**
             * Complex aString.
             * @type {string}
             */
            $prototype.aString = "";

            /**
             * Complex anOutOfOrderBool.
             * @type {boolean}
             */
            $prototype.anOutOfOrderBool = false;

            /**
             * Complex aNestedMessage.
             * @type {jspb.test.Complex.Nested}
             */
            $prototype.aNestedMessage = null;

            /**
             * Complex aRepeatedMessage.
             * @type {Array.<jspb.test.Complex.Nested>}
             */
            $prototype.aRepeatedMessage = $protobuf.util.emptyArray;

            /**
             * Complex aRepeatedString.
             * @type {Array.<string>}
             */
            $prototype.aRepeatedString = $protobuf.util.emptyArray;

            // Referenced types
            var $types = [null, null, "jspb.test.Complex.Nested", "jspb.test.Complex.Nested", null]; $lazyTypes.push($types);

            /**
             * Creates a new Complex instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Complex} Complex instance
             */
            Complex.create = function create(properties) {
                return new Complex(properties);
            };

            /**
             * Encodes the specified Complex message.
             * @function
             * @param {jspb.test.Complex|Object} message Complex message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Complex.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                writer.uint32(10).string(message.aString);
                writer.uint32(72).bool(message.anOutOfOrderBool);
                if (message.aNestedMessage !== undefined && message.aNestedMessage !== null) {
                    types[2].encode(message.aNestedMessage, writer.uint32(34).fork()).ldelim();
                }
                if (message.aRepeatedMessage) {
                    for (var i = 0; i < message.aRepeatedMessage.length; ++i) {
                        types[3].encode(message.aRepeatedMessage[i], writer.uint32(42).fork()).ldelim();
                    }
                }
                if (message.aRepeatedString) {
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        writer.uint32(58).string(message.aRepeatedString[i]);
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified Complex message, length delimited.
             * @param {jspb.test.Complex|Object} message Complex message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Complex.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Complex message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Complex} Complex
             */
            Complex.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.Complex();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.aString = reader.string();
                        break;

                    case 9:
                        message.anOutOfOrderBool = reader.bool();
                        break;

                    case 4:
                        message.aNestedMessage = types[2].decode(reader, reader.uint32());
                        break;

                    case 5:
                        if (!(message.aRepeatedMessage && message.aRepeatedMessage.length)) {
                            message.aRepeatedMessage = [];
                        }
                        message.aRepeatedMessage.push(types[3].decode(reader, reader.uint32()));
                        break;

                    case 7:
                        if (!(message.aRepeatedString && message.aRepeatedString.length)) {
                            message.aRepeatedString = [];
                        }
                        message.aRepeatedString.push(reader.string());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a Complex message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Complex} Complex
             */
            Complex.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Complex message.
             * @function
             * @param {jspb.test.Complex|Object} message Complex message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Complex.verify = (function(util, types) { return function verify(message) {
                if (!util.isString(message.aString)) {
                    return "jspb.test.Complex.aString: string expected";
                }
                if (typeof message.anOutOfOrderBool !== "boolean") {
                    return "jspb.test.Complex.anOutOfOrderBool: boolean expected";
                }
                if (message.aNestedMessage !== undefined && message.aNestedMessage !== null) {
                    var err;
                    if (err = types[2].verify(message.aNestedMessage)) {
                        return err;
                    }
                }
                if (message.aRepeatedMessage !== undefined) {
                    if (!Array.isArray(message.aRepeatedMessage)) {
                        return "jspb.test.Complex.aRepeatedMessage: array expected";
                    }
                    for (var i = 0; i < message.aRepeatedMessage.length; ++i) {
                        var err;
                        if (err = types[3].verify(message.aRepeatedMessage[i])) {
                            return err;
                        }
                    }
                }
                if (message.aRepeatedString !== undefined) {
                    if (!Array.isArray(message.aRepeatedString)) {
                        return "jspb.test.Complex.aRepeatedString: array expected";
                    }
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        if (!util.isString(message.aRepeatedString[i])) {
                            return "jspb.test.Complex.aRepeatedString: string[] expected";
                        }
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a Complex message.
             * @function
             * @param {jspb.test.Complex|Object} source Complex message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.Complex|Object} Converted message
             */
            Complex.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.aString === undefined && options.defaults) {
                        dst.aString = "";
                    }
                    if (dst.anOutOfOrderBool === undefined && options.defaults) {
                        dst.anOutOfOrderBool = false;
                    }
                    dst.aNestedMessage = types[2].convert(src.aNestedMessage, impl, options);
                    if (src.aRepeatedMessage && src.aRepeatedMessage.length) {
                        dst.aRepeatedMessage = [];
                        for (var i = 0; i < src.aRepeatedMessage.length; ++i) {
                            dst.aRepeatedMessage.push(types[3].convert(src.aRepeatedMessage[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.aRepeatedMessage = [];
                        }
                    }
                    if (src.aRepeatedString && src.aRepeatedString.length) {
                        dst.aRepeatedString = [];
                        for (var i = 0; i < src.aRepeatedString.length; ++i) {
                            dst.aRepeatedString.push(src.aRepeatedString[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.aRepeatedString = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a Complex message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.Complex} Complex
             */
            Complex.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this Complex message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            Complex.Nested = (function() {

                /**
                 * Constructs a new Nested.
                 * @exports jspb.test.Complex.Nested
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                function Nested(properties) {
                    if (properties) {
                        var keys = Object.keys(properties);
                        for (var i = 0; i < keys.length; ++i)
                            this[keys[i]] = properties[keys[i]];
                    }
                }

                /** @alias jspb.test.Complex.Nested.prototype */
                var $prototype = Nested.prototype;

                /**
                 * Nested anInt.
                 * @type {number}
                 */
                $prototype.anInt = 0;

                /**
                 * Creates a new Nested instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {jspb.test.Complex.Nested} Nested instance
                 */
                Nested.create = function create(properties) {
                    return new Nested(properties);
                };

                /**
                 * Encodes the specified Nested message.
                 * @function
                 * @param {jspb.test.Complex.Nested|Object} message Nested message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encode = (function(Writer) { return function encode(message, writer) {
                    if (!writer) {
                        writer = Writer.create();
                    }
                    writer.uint32(16).int32(message.anInt);
                    return writer;
                };})($protobuf.Writer);

                /**
                 * Encodes the specified Nested message, length delimited.
                 * @param {jspb.test.Complex.Nested|Object} message Nested message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Nested message from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.Complex.Nested} Nested
                 */
                Nested.decode = (function(Reader) { return function decode(reader, len) {
                    if (!(reader instanceof Reader)) {
                        reader = Reader.create(reader);
                    }
                    var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.Complex.Nested();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 2:
                            message.anInt = reader.int32();
                            break;

                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };})($protobuf.Reader);

                /**
                 * Decodes a Nested message from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.Complex.Nested} Nested
                 */
                Nested.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a Nested message.
                 * @function
                 * @param {jspb.test.Complex.Nested|Object} message Nested message or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Nested.verify = (function(util) { return function verify(message) {
                    if (!util.isInteger(message.anInt)) {
                        return "jspb.test.Complex.Nested.anInt: integer expected";
                    }
                    return null;
                };})($protobuf.util);

                /**
                 * Converts a Nested message.
                 * @function
                 * @param {jspb.test.Complex.Nested|Object} source Nested message or plain object to convert
                 * @param {*} impl Converter implementation to use
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {jspb.test.Complex.Nested|Object} Converted message
                 */
                Nested.convert = (function() { return function convert(src, impl, options) {
                    if (!options) {
                        options = {};
                    }
                    var dst = impl.create(src, this, options);
                    if (dst) {
                        if (dst.anInt === undefined && options.defaults) {
                            dst.anInt = 0;
                        }
                    }
                    return dst;
                };})();

                /**
                 * Creates a Nested message from JSON.
                 * @param {Object.<string,*>} source Source object
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {jspb.test.Complex.Nested} Nested
                 */
                Nested.from = function from(source, options) {
                    return this.convert(source, $protobuf.converters.message, options);
                };

                /**
                 * Converts this Nested message to JSON.
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {Object.<string,*>} JSON object
                 */
                $prototype.asJSON = function asJSON(options) {
                    return this.constructor.convert(this, $protobuf.converters.json, options);
                };

                return Nested;
            })();

            return Complex;
        })();

        test.OuterMessage = (function() {

            /**
             * Constructs a new OuterMessage.
             * @exports jspb.test.OuterMessage
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function OuterMessage(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.OuterMessage.prototype */
            var $prototype = OuterMessage.prototype;

            /**
             * Creates a new OuterMessage instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.OuterMessage} OuterMessage instance
             */
            OuterMessage.create = function create(properties) {
                return new OuterMessage(properties);
            };

            /**
             * Encodes the specified OuterMessage message.
             * @function
             * @param {jspb.test.OuterMessage|Object} message OuterMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OuterMessage.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified OuterMessage message, length delimited.
             * @param {jspb.test.OuterMessage|Object} message OuterMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OuterMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an OuterMessage message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.OuterMessage} OuterMessage
             */
            OuterMessage.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.OuterMessage();
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
             * Decodes an OuterMessage message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.OuterMessage} OuterMessage
             */
            OuterMessage.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an OuterMessage message.
             * @function
             * @param {jspb.test.OuterMessage|Object} message OuterMessage message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            OuterMessage.verify = (function() { return function verify() {
                return null;
            };})();

            /**
             * Converts an OuterMessage message.
             * @function
             * @param {jspb.test.OuterMessage|Object} source OuterMessage message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.OuterMessage|Object} Converted message
             */
            OuterMessage.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                return dst;
            };})();

            /**
             * Creates an OuterMessage message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.OuterMessage} OuterMessage
             */
            OuterMessage.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this OuterMessage message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            OuterMessage.Complex = (function() {

                /**
                 * Constructs a new Complex.
                 * @exports jspb.test.OuterMessage.Complex
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                function Complex(properties) {
                    if (properties) {
                        var keys = Object.keys(properties);
                        for (var i = 0; i < keys.length; ++i)
                            this[keys[i]] = properties[keys[i]];
                    }
                }

                /** @alias jspb.test.OuterMessage.Complex.prototype */
                var $prototype = Complex.prototype;

                /**
                 * Complex innerComplexField.
                 * @type {number}
                 */
                $prototype.innerComplexField = 0;

                /**
                 * Creates a new Complex instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {jspb.test.OuterMessage.Complex} Complex instance
                 */
                Complex.create = function create(properties) {
                    return new Complex(properties);
                };

                /**
                 * Encodes the specified Complex message.
                 * @function
                 * @param {jspb.test.OuterMessage.Complex|Object} message Complex message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Complex.encode = (function(Writer) { return function encode(message, writer) {
                    if (!writer) {
                        writer = Writer.create();
                    }
                    if (message.innerComplexField !== undefined && message.innerComplexField !== 0) {
                        writer.uint32(8).int32(message.innerComplexField);
                    }
                    return writer;
                };})($protobuf.Writer);

                /**
                 * Encodes the specified Complex message, length delimited.
                 * @param {jspb.test.OuterMessage.Complex|Object} message Complex message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Complex.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Complex message from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.OuterMessage.Complex} Complex
                 */
                Complex.decode = (function(Reader) { return function decode(reader, len) {
                    if (!(reader instanceof Reader)) {
                        reader = Reader.create(reader);
                    }
                    var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.OuterMessage.Complex();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.innerComplexField = reader.int32();
                            break;

                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };})($protobuf.Reader);

                /**
                 * Decodes a Complex message from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.OuterMessage.Complex} Complex
                 */
                Complex.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a Complex message.
                 * @function
                 * @param {jspb.test.OuterMessage.Complex|Object} message Complex message or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Complex.verify = (function(util) { return function verify(message) {
                    if (message.innerComplexField !== undefined) {
                        if (!util.isInteger(message.innerComplexField)) {
                            return "jspb.test.OuterMessage.Complex.innerComplexField: integer expected";
                        }
                    }
                    return null;
                };})($protobuf.util);

                /**
                 * Converts a Complex message.
                 * @function
                 * @param {jspb.test.OuterMessage.Complex|Object} source Complex message or plain object to convert
                 * @param {*} impl Converter implementation to use
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {jspb.test.OuterMessage.Complex|Object} Converted message
                 */
                Complex.convert = (function() { return function convert(src, impl, options) {
                    if (!options) {
                        options = {};
                    }
                    var dst = impl.create(src, this, options);
                    if (dst) {
                        if (dst.innerComplexField === undefined && options.defaults) {
                            dst.innerComplexField = 0;
                        }
                    }
                    return dst;
                };})();

                /**
                 * Creates a Complex message from JSON.
                 * @param {Object.<string,*>} source Source object
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {jspb.test.OuterMessage.Complex} Complex
                 */
                Complex.from = function from(source, options) {
                    return this.convert(source, $protobuf.converters.message, options);
                };

                /**
                 * Converts this Complex message to JSON.
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {Object.<string,*>} JSON object
                 */
                $prototype.asJSON = function asJSON(options) {
                    return this.constructor.convert(this, $protobuf.converters.json, options);
                };

                return Complex;
            })();

            return OuterMessage;
        })();

        test.IsExtension = (function() {

            /**
             * Constructs a new IsExtension.
             * @exports jspb.test.IsExtension
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function IsExtension(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.IsExtension.prototype */
            var $prototype = IsExtension.prototype;

            /**
             * IsExtension ext1.
             * @type {string}
             */
            $prototype.ext1 = "";

            /**
             * Creates a new IsExtension instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.IsExtension} IsExtension instance
             */
            IsExtension.create = function create(properties) {
                return new IsExtension(properties);
            };

            /**
             * Encodes the specified IsExtension message.
             * @function
             * @param {jspb.test.IsExtension|Object} message IsExtension message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IsExtension.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.ext1 !== undefined && message.ext1 !== "") {
                    writer.uint32(10).string(message.ext1);
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified IsExtension message, length delimited.
             * @param {jspb.test.IsExtension|Object} message IsExtension message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IsExtension.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an IsExtension message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.IsExtension} IsExtension
             */
            IsExtension.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.IsExtension();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ext1 = reader.string();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes an IsExtension message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.IsExtension} IsExtension
             */
            IsExtension.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an IsExtension message.
             * @function
             * @param {jspb.test.IsExtension|Object} message IsExtension message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            IsExtension.verify = (function(util) { return function verify(message) {
                if (message.ext1 !== undefined) {
                    if (!util.isString(message.ext1)) {
                        return "jspb.test.IsExtension.ext1: string expected";
                    }
                }
                return null;
            };})($protobuf.util);

            /**
             * Converts an IsExtension message.
             * @function
             * @param {jspb.test.IsExtension|Object} source IsExtension message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.IsExtension|Object} Converted message
             */
            IsExtension.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.ext1 === undefined && options.defaults) {
                        dst.ext1 = "";
                    }
                }
                return dst;
            };})();

            /**
             * Creates an IsExtension message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.IsExtension} IsExtension
             */
            IsExtension.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this IsExtension message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return IsExtension;
        })();

        test.IndirectExtension = (function() {

            /**
             * Constructs a new IndirectExtension.
             * @exports jspb.test.IndirectExtension
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function IndirectExtension(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.IndirectExtension.prototype */
            var $prototype = IndirectExtension.prototype;

            /**
             * Creates a new IndirectExtension instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.IndirectExtension} IndirectExtension instance
             */
            IndirectExtension.create = function create(properties) {
                return new IndirectExtension(properties);
            };

            /**
             * Encodes the specified IndirectExtension message.
             * @function
             * @param {jspb.test.IndirectExtension|Object} message IndirectExtension message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IndirectExtension.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified IndirectExtension message, length delimited.
             * @param {jspb.test.IndirectExtension|Object} message IndirectExtension message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IndirectExtension.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an IndirectExtension message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.IndirectExtension} IndirectExtension
             */
            IndirectExtension.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.IndirectExtension();
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
             * Decodes an IndirectExtension message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.IndirectExtension} IndirectExtension
             */
            IndirectExtension.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an IndirectExtension message.
             * @function
             * @param {jspb.test.IndirectExtension|Object} message IndirectExtension message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            IndirectExtension.verify = (function() { return function verify() {
                return null;
            };})();

            /**
             * Converts an IndirectExtension message.
             * @function
             * @param {jspb.test.IndirectExtension|Object} source IndirectExtension message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.IndirectExtension|Object} Converted message
             */
            IndirectExtension.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                return dst;
            };})();

            /**
             * Creates an IndirectExtension message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.IndirectExtension} IndirectExtension
             */
            IndirectExtension.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this IndirectExtension message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return IndirectExtension;
        })();

        test.DefaultValues = (function() {

            /**
             * Constructs a new DefaultValues.
             * @exports jspb.test.DefaultValues
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function DefaultValues(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.DefaultValues.prototype */
            var $prototype = DefaultValues.prototype;

            /**
             * DefaultValues stringField.
             * @type {string}
             */
            $prototype.stringField = "default<>'\"abc";

            /**
             * DefaultValues boolField.
             * @type {boolean}
             */
            $prototype.boolField = true;

            /**
             * DefaultValues intField.
             * @type {number|Long}
             */
            $prototype.intField = $protobuf.util.emptyObject;

            /**
             * DefaultValues enumField.
             * @type {number}
             */
            $prototype.enumField = 13;

            /**
             * DefaultValues emptyField.
             * @type {string}
             */
            $prototype.emptyField = "";

            /**
             * DefaultValues bytesField.
             * @type {Uint8Array}
             */
            $prototype.bytesField = "moo";

            // Referenced types
            var $types = [null, null, null, "jspb.test.DefaultValues.Enum", null, null]; $lazyTypes.push($types);

            /**
             * Creates a new DefaultValues instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.DefaultValues} DefaultValues instance
             */
            DefaultValues.create = function create(properties) {
                return new DefaultValues(properties);
            };

            /**
             * Encodes the specified DefaultValues message.
             * @function
             * @param {jspb.test.DefaultValues|Object} message DefaultValues message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DefaultValues.encode = (function(Writer, util) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.stringField !== undefined && message.stringField !== "default<>'\"abc") {
                    writer.uint32(10).string(message.stringField);
                }
                if (message.boolField !== undefined && message.boolField !== true) {
                    writer.uint32(16).bool(message.boolField);
                }
                if (message.intField !== undefined && message.intField !== null && util.longNe(message.intField, 11, 0)) {
                    writer.uint32(24).int64(message.intField);
                }
                if (message.enumField !== undefined && message.enumField !== 13) {
                    writer.uint32(32).uint32(message.enumField);
                }
                if (message.emptyField !== undefined && message.emptyField !== "") {
                    writer.uint32(50).string(message.emptyField);
                }
                if (message.bytesField !== undefined && message.bytesField !== "moo") {
                    writer.uint32(66).bytes(message.bytesField);
                }
                return writer;
            };})($protobuf.Writer, $protobuf.util);

            /**
             * Encodes the specified DefaultValues message, length delimited.
             * @param {jspb.test.DefaultValues|Object} message DefaultValues message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DefaultValues.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DefaultValues message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.DefaultValues} DefaultValues
             */
            DefaultValues.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.DefaultValues();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.stringField = reader.string();
                        break;

                    case 2:
                        message.boolField = reader.bool();
                        break;

                    case 3:
                        message.intField = reader.int64();
                        break;

                    case 4:
                        message.enumField = reader.uint32();
                        break;

                    case 6:
                        message.emptyField = reader.string();
                        break;

                    case 8:
                        message.bytesField = reader.bytes();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes a DefaultValues message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.DefaultValues} DefaultValues
             */
            DefaultValues.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a DefaultValues message.
             * @function
             * @param {jspb.test.DefaultValues|Object} message DefaultValues message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            DefaultValues.verify = (function(util) { return function verify(message) {
                if (message.stringField !== undefined) {
                    if (!util.isString(message.stringField)) {
                        return "jspb.test.DefaultValues.stringField: string expected";
                    }
                }
                if (message.boolField !== undefined) {
                    if (typeof message.boolField !== "boolean") {
                        return "jspb.test.DefaultValues.boolField: boolean expected";
                    }
                }
                if (message.intField !== undefined) {
                    if (!util.isInteger(message.intField) && !(message.intField && util.isInteger(message.intField.low) && util.isInteger(message.intField.high))) {
                        return "jspb.test.DefaultValues.intField: integer|Long expected";
                    }
                }
                if (message.enumField !== undefined) {
                    switch (message.enumField) {
                    default:
                        return "jspb.test.DefaultValues.enumField: enum value expected";

                    case 13:
                    case 77:
                        break;
                    }
                }
                if (message.emptyField !== undefined) {
                    if (!util.isString(message.emptyField)) {
                        return "jspb.test.DefaultValues.emptyField: string expected";
                    }
                }
                if (message.bytesField !== undefined) {
                    if (!(message.bytesField && typeof message.bytesField.length === "number" || util.isString(message.bytesField))) {
                        return "jspb.test.DefaultValues.bytesField: buffer expected";
                    }
                }
                return null;
            };})($protobuf.util);

            /**
             * Converts a DefaultValues message.
             * @function
             * @param {jspb.test.DefaultValues|Object} source DefaultValues message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.DefaultValues|Object} Converted message
             */
            DefaultValues.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.stringField === undefined && options.defaults) {
                        dst.stringField = "default<>'\"abc";
                    }
                    if (dst.boolField === undefined && options.defaults) {
                        dst.boolField = true;
                    }
                    dst.intField = impl.longs(src.intField, 0, 0, false, options);
                    dst.enumField = impl.enums(src.enumField, 0, types[3], options);
                    if (dst.emptyField === undefined && options.defaults) {
                        dst.emptyField = "";
                    }
                    dst.bytesField = impl.bytes(src.bytesField, "moo", options);
                }
                return dst;
            };})($types);

            /**
             * Creates a DefaultValues message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.DefaultValues} DefaultValues
             */
            DefaultValues.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this DefaultValues message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            /**
             * Enum enum.
             * @name Enum
             * @memberof jspb.test.DefaultValues
             * @enum {number}
             * @property {number} E1=13 E1 value
             * @property {number} E2=77 E2 value
             */
            DefaultValues.Enum = (function() {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[valuesById[13] = "E1"] = 13;
                values[valuesById[77] = "E2"] = 77;
                return values;
            })();

            return DefaultValues;
        })();

        test.FloatingPointFields = (function() {

            /**
             * Constructs a new FloatingPointFields.
             * @exports jspb.test.FloatingPointFields
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function FloatingPointFields(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.FloatingPointFields.prototype */
            var $prototype = FloatingPointFields.prototype;

            /**
             * FloatingPointFields optionalFloatField.
             * @type {number}
             */
            $prototype.optionalFloatField = 0;

            /**
             * FloatingPointFields requiredFloatField.
             * @type {number}
             */
            $prototype.requiredFloatField = 0;

            /**
             * FloatingPointFields repeatedFloatField.
             * @type {Array.<number>}
             */
            $prototype.repeatedFloatField = $protobuf.util.emptyArray;

            /**
             * FloatingPointFields defaultFloatField.
             * @type {number}
             */
            $prototype.defaultFloatField = 2;

            /**
             * FloatingPointFields optionalDoubleField.
             * @type {number}
             */
            $prototype.optionalDoubleField = 0;

            /**
             * FloatingPointFields requiredDoubleField.
             * @type {number}
             */
            $prototype.requiredDoubleField = 0;

            /**
             * FloatingPointFields repeatedDoubleField.
             * @type {Array.<number>}
             */
            $prototype.repeatedDoubleField = $protobuf.util.emptyArray;

            /**
             * FloatingPointFields defaultDoubleField.
             * @type {number}
             */
            $prototype.defaultDoubleField = 2;

            /**
             * Creates a new FloatingPointFields instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.FloatingPointFields} FloatingPointFields instance
             */
            FloatingPointFields.create = function create(properties) {
                return new FloatingPointFields(properties);
            };

            /**
             * Encodes the specified FloatingPointFields message.
             * @function
             * @param {jspb.test.FloatingPointFields|Object} message FloatingPointFields message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FloatingPointFields.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.optionalFloatField !== undefined && message.optionalFloatField !== 0) {
                    writer.uint32(13).float(message.optionalFloatField);
                }
                writer.uint32(21).float(message.requiredFloatField);
                if (message.repeatedFloatField) {
                    for (var i = 0; i < message.repeatedFloatField.length; ++i) {
                        writer.uint32(29).float(message.repeatedFloatField[i]);
                    }
                }
                if (message.defaultFloatField !== undefined && message.defaultFloatField !== 2) {
                    writer.uint32(37).float(message.defaultFloatField);
                }
                if (message.optionalDoubleField !== undefined && message.optionalDoubleField !== 0) {
                    writer.uint32(41).double(message.optionalDoubleField);
                }
                writer.uint32(49).double(message.requiredDoubleField);
                if (message.repeatedDoubleField) {
                    for (var i = 0; i < message.repeatedDoubleField.length; ++i) {
                        writer.uint32(57).double(message.repeatedDoubleField[i]);
                    }
                }
                if (message.defaultDoubleField !== undefined && message.defaultDoubleField !== 2) {
                    writer.uint32(65).double(message.defaultDoubleField);
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified FloatingPointFields message, length delimited.
             * @param {jspb.test.FloatingPointFields|Object} message FloatingPointFields message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FloatingPointFields.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FloatingPointFields message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.FloatingPointFields} FloatingPointFields
             */
            FloatingPointFields.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.FloatingPointFields();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.optionalFloatField = reader.float();
                        break;

                    case 2:
                        message.requiredFloatField = reader.float();
                        break;

                    case 3:
                        if (!(message.repeatedFloatField && message.repeatedFloatField.length)) {
                            message.repeatedFloatField = [];
                        }
                        message.repeatedFloatField.push(reader.float());
                        break;

                    case 4:
                        message.defaultFloatField = reader.float();
                        break;

                    case 5:
                        message.optionalDoubleField = reader.double();
                        break;

                    case 6:
                        message.requiredDoubleField = reader.double();
                        break;

                    case 7:
                        if (!(message.repeatedDoubleField && message.repeatedDoubleField.length)) {
                            message.repeatedDoubleField = [];
                        }
                        message.repeatedDoubleField.push(reader.double());
                        break;

                    case 8:
                        message.defaultDoubleField = reader.double();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes a FloatingPointFields message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.FloatingPointFields} FloatingPointFields
             */
            FloatingPointFields.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FloatingPointFields message.
             * @function
             * @param {jspb.test.FloatingPointFields|Object} message FloatingPointFields message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FloatingPointFields.verify = (function() { return function verify(message) {
                if (message.optionalFloatField !== undefined) {
                    if (typeof message.optionalFloatField !== "number") {
                        return "jspb.test.FloatingPointFields.optionalFloatField: number expected";
                    }
                }
                if (typeof message.requiredFloatField !== "number") {
                    return "jspb.test.FloatingPointFields.requiredFloatField: number expected";
                }
                if (message.repeatedFloatField !== undefined) {
                    if (!Array.isArray(message.repeatedFloatField)) {
                        return "jspb.test.FloatingPointFields.repeatedFloatField: array expected";
                    }
                    for (var i = 0; i < message.repeatedFloatField.length; ++i) {
                        if (typeof message.repeatedFloatField[i] !== "number") {
                            return "jspb.test.FloatingPointFields.repeatedFloatField: number[] expected";
                        }
                    }
                }
                if (message.defaultFloatField !== undefined) {
                    if (typeof message.defaultFloatField !== "number") {
                        return "jspb.test.FloatingPointFields.defaultFloatField: number expected";
                    }
                }
                if (message.optionalDoubleField !== undefined) {
                    if (typeof message.optionalDoubleField !== "number") {
                        return "jspb.test.FloatingPointFields.optionalDoubleField: number expected";
                    }
                }
                if (typeof message.requiredDoubleField !== "number") {
                    return "jspb.test.FloatingPointFields.requiredDoubleField: number expected";
                }
                if (message.repeatedDoubleField !== undefined) {
                    if (!Array.isArray(message.repeatedDoubleField)) {
                        return "jspb.test.FloatingPointFields.repeatedDoubleField: array expected";
                    }
                    for (var i = 0; i < message.repeatedDoubleField.length; ++i) {
                        if (typeof message.repeatedDoubleField[i] !== "number") {
                            return "jspb.test.FloatingPointFields.repeatedDoubleField: number[] expected";
                        }
                    }
                }
                if (message.defaultDoubleField !== undefined) {
                    if (typeof message.defaultDoubleField !== "number") {
                        return "jspb.test.FloatingPointFields.defaultDoubleField: number expected";
                    }
                }
                return null;
            };})();

            /**
             * Converts a FloatingPointFields message.
             * @function
             * @param {jspb.test.FloatingPointFields|Object} source FloatingPointFields message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.FloatingPointFields|Object} Converted message
             */
            FloatingPointFields.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.optionalFloatField === undefined && options.defaults) {
                        dst.optionalFloatField = 0;
                    }
                    if (dst.requiredFloatField === undefined && options.defaults) {
                        dst.requiredFloatField = 0;
                    }
                    if (src.repeatedFloatField && src.repeatedFloatField.length) {
                        dst.repeatedFloatField = [];
                        for (var i = 0; i < src.repeatedFloatField.length; ++i) {
                            dst.repeatedFloatField.push(src.repeatedFloatField[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.repeatedFloatField = [];
                        }
                    }
                    if (dst.defaultFloatField === undefined && options.defaults) {
                        dst.defaultFloatField = 2;
                    }
                    if (dst.optionalDoubleField === undefined && options.defaults) {
                        dst.optionalDoubleField = 0;
                    }
                    if (dst.requiredDoubleField === undefined && options.defaults) {
                        dst.requiredDoubleField = 0;
                    }
                    if (src.repeatedDoubleField && src.repeatedDoubleField.length) {
                        dst.repeatedDoubleField = [];
                        for (var i = 0; i < src.repeatedDoubleField.length; ++i) {
                            dst.repeatedDoubleField.push(src.repeatedDoubleField[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.repeatedDoubleField = [];
                        }
                    }
                    if (dst.defaultDoubleField === undefined && options.defaults) {
                        dst.defaultDoubleField = 2;
                    }
                }
                return dst;
            };})();

            /**
             * Creates a FloatingPointFields message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.FloatingPointFields} FloatingPointFields
             */
            FloatingPointFields.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this FloatingPointFields message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return FloatingPointFields;
        })();

        test.TestClone = (function() {

            /**
             * Constructs a new TestClone.
             * @exports jspb.test.TestClone
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function TestClone(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.TestClone.prototype */
            var $prototype = TestClone.prototype;

            /**
             * TestClone str.
             * @type {string}
             */
            $prototype.str = "";

            /**
             * TestClone simple1.
             * @type {jspb.test.Simple1}
             */
            $prototype.simple1 = null;

            /**
             * TestClone simple2.
             * @type {Array.<jspb.test.Simple1>}
             */
            $prototype.simple2 = $protobuf.util.emptyArray;

            /**
             * TestClone bytesField.
             * @type {Uint8Array}
             */
            $prototype.bytesField = $protobuf.util.emptyArray;

            /**
             * TestClone unused.
             * @type {string}
             */
            $prototype.unused = "";

            /**
             * TestClone .jspb.test.CloneExtension.extField.
             * @name jspb.test.TestClone#.jspb.test.CloneExtension.extField
             * @type {jspb.test.CloneExtension}
             */
            $prototype[".jspb.test.CloneExtension.extField"] = null;

            // Referenced types
            var $types = [null, "jspb.test.Simple1", "jspb.test.Simple1", null, null, "jspb.test.CloneExtension"]; $lazyTypes.push($types);

            /**
             * Creates a new TestClone instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestClone} TestClone instance
             */
            TestClone.create = function create(properties) {
                return new TestClone(properties);
            };

            /**
             * Encodes the specified TestClone message.
             * @function
             * @param {jspb.test.TestClone|Object} message TestClone message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestClone.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.str !== undefined && message.str !== "") {
                    writer.uint32(10).string(message.str);
                }
                if (message.simple1 !== undefined && message.simple1 !== null) {
                    types[1].encode(message.simple1, writer.uint32(26).fork()).ldelim();
                }
                if (message.simple2) {
                    for (var i = 0; i < message.simple2.length; ++i) {
                        types[2].encode(message.simple2[i], writer.uint32(42).fork()).ldelim();
                    }
                }
                if (message.bytesField !== undefined && message.bytesField !== []) {
                    writer.uint32(50).bytes(message.bytesField);
                }
                if (message.unused !== undefined && message.unused !== "") {
                    writer.uint32(58).string(message.unused);
                }
                if (message[".jspb.test.CloneExtension.extField"] !== undefined && message[".jspb.test.CloneExtension.extField"] !== null) {
                    types[5].encode(message[".jspb.test.CloneExtension.extField"], writer.uint32(802).fork()).ldelim();
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified TestClone message, length delimited.
             * @param {jspb.test.TestClone|Object} message TestClone message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestClone.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestClone message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestClone} TestClone
             */
            TestClone.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.TestClone();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.str = reader.string();
                        break;

                    case 3:
                        message.simple1 = types[1].decode(reader, reader.uint32());
                        break;

                    case 5:
                        if (!(message.simple2 && message.simple2.length)) {
                            message.simple2 = [];
                        }
                        message.simple2.push(types[2].decode(reader, reader.uint32()));
                        break;

                    case 6:
                        message.bytesField = reader.bytes();
                        break;

                    case 7:
                        message.unused = reader.string();
                        break;

                    case 100:
                        message[".jspb.test.CloneExtension.extField"] = types[5].decode(reader, reader.uint32());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a TestClone message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestClone} TestClone
             */
            TestClone.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestClone message.
             * @function
             * @param {jspb.test.TestClone|Object} message TestClone message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestClone.verify = (function(util, types) { return function verify(message) {
                if (message.str !== undefined) {
                    if (!util.isString(message.str)) {
                        return "jspb.test.TestClone.str: string expected";
                    }
                }
                if (message.simple1 !== undefined && message.simple1 !== null) {
                    var err;
                    if (err = types[1].verify(message.simple1)) {
                        return err;
                    }
                }
                if (message.simple2 !== undefined) {
                    if (!Array.isArray(message.simple2)) {
                        return "jspb.test.TestClone.simple2: array expected";
                    }
                    for (var i = 0; i < message.simple2.length; ++i) {
                        var err;
                        if (err = types[2].verify(message.simple2[i])) {
                            return err;
                        }
                    }
                }
                if (message.bytesField !== undefined) {
                    if (!(message.bytesField && typeof message.bytesField.length === "number" || util.isString(message.bytesField))) {
                        return "jspb.test.TestClone.bytesField: buffer expected";
                    }
                }
                if (message.unused !== undefined) {
                    if (!util.isString(message.unused)) {
                        return "jspb.test.TestClone.unused: string expected";
                    }
                }
                if (message[".jspb.test.CloneExtension.extField"] !== undefined && message[".jspb.test.CloneExtension.extField"] !== null) {
                    var err;
                    if (err = types[5].verify(message[".jspb.test.CloneExtension.extField"])) {
                        return err;
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a TestClone message.
             * @function
             * @param {jspb.test.TestClone|Object} source TestClone message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestClone|Object} Converted message
             */
            TestClone.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.str === undefined && options.defaults) {
                        dst.str = "";
                    }
                    dst.simple1 = types[1].convert(src.simple1, impl, options);
                    if (src.simple2 && src.simple2.length) {
                        dst.simple2 = [];
                        for (var i = 0; i < src.simple2.length; ++i) {
                            dst.simple2.push(types[2].convert(src.simple2[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.simple2 = [];
                        }
                    }
                    dst.bytesField = impl.bytes(src.bytesField, [], options);
                    if (dst.unused === undefined && options.defaults) {
                        dst.unused = "";
                    }
                    dst[".jspb.test.CloneExtension.extField"] = types[5].convert(src[".jspb.test.CloneExtension.extField"], impl, options);
                }
                return dst;
            };})($types);

            /**
             * Creates a TestClone message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestClone} TestClone
             */
            TestClone.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this TestClone message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return TestClone;
        })();

        test.CloneExtension = (function() {

            /**
             * Constructs a new CloneExtension.
             * @exports jspb.test.CloneExtension
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function CloneExtension(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.CloneExtension.prototype */
            var $prototype = CloneExtension.prototype;

            /**
             * CloneExtension ext.
             * @type {string}
             */
            $prototype.ext = "";

            /**
             * Creates a new CloneExtension instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.CloneExtension} CloneExtension instance
             */
            CloneExtension.create = function create(properties) {
                return new CloneExtension(properties);
            };

            /**
             * Encodes the specified CloneExtension message.
             * @function
             * @param {jspb.test.CloneExtension|Object} message CloneExtension message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CloneExtension.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.ext !== undefined && message.ext !== "") {
                    writer.uint32(18).string(message.ext);
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified CloneExtension message, length delimited.
             * @param {jspb.test.CloneExtension|Object} message CloneExtension message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CloneExtension.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CloneExtension message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.CloneExtension} CloneExtension
             */
            CloneExtension.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.CloneExtension();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        message.ext = reader.string();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes a CloneExtension message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.CloneExtension} CloneExtension
             */
            CloneExtension.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a CloneExtension message.
             * @function
             * @param {jspb.test.CloneExtension|Object} message CloneExtension message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            CloneExtension.verify = (function(util) { return function verify(message) {
                if (message.ext !== undefined) {
                    if (!util.isString(message.ext)) {
                        return "jspb.test.CloneExtension.ext: string expected";
                    }
                }
                return null;
            };})($protobuf.util);

            /**
             * Converts a CloneExtension message.
             * @function
             * @param {jspb.test.CloneExtension|Object} source CloneExtension message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.CloneExtension|Object} Converted message
             */
            CloneExtension.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.ext === undefined && options.defaults) {
                        dst.ext = "";
                    }
                }
                return dst;
            };})();

            /**
             * Creates a CloneExtension message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.CloneExtension} CloneExtension
             */
            CloneExtension.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this CloneExtension message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return CloneExtension;
        })();

        test.TestGroup = (function() {

            /**
             * Constructs a new TestGroup.
             * @exports jspb.test.TestGroup
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function TestGroup(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.TestGroup.prototype */
            var $prototype = TestGroup.prototype;

            /**
             * TestGroup id.
             * @type {string}
             */
            $prototype.id = "";

            /**
             * TestGroup requiredSimple.
             * @type {jspb.test.Simple2}
             */
            $prototype.requiredSimple = null;

            /**
             * TestGroup optionalSimple.
             * @type {jspb.test.Simple2}
             */
            $prototype.optionalSimple = null;

            // Referenced types
            var $types = [null, "jspb.test.Simple2", "jspb.test.Simple2"]; $lazyTypes.push($types);

            /**
             * Creates a new TestGroup instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestGroup} TestGroup instance
             */
            TestGroup.create = function create(properties) {
                return new TestGroup(properties);
            };

            /**
             * Encodes the specified TestGroup message.
             * @function
             * @param {jspb.test.TestGroup|Object} message TestGroup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestGroup.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.id !== undefined && message.id !== "") {
                    writer.uint32(34).string(message.id);
                }
                types[1].encode(message.requiredSimple, writer.uint32(42).fork()).ldelim();
                if (message.optionalSimple !== undefined && message.optionalSimple !== null) {
                    types[2].encode(message.optionalSimple, writer.uint32(50).fork()).ldelim();
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified TestGroup message, length delimited.
             * @param {jspb.test.TestGroup|Object} message TestGroup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestGroup.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestGroup message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestGroup} TestGroup
             */
            TestGroup.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.TestGroup();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 4:
                        message.id = reader.string();
                        break;

                    case 5:
                        message.requiredSimple = types[1].decode(reader, reader.uint32());
                        break;

                    case 6:
                        message.optionalSimple = types[2].decode(reader, reader.uint32());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a TestGroup message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestGroup} TestGroup
             */
            TestGroup.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestGroup message.
             * @function
             * @param {jspb.test.TestGroup|Object} message TestGroup message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestGroup.verify = (function(util, types) { return function verify(message) {
                if (message.id !== undefined) {
                    if (!util.isString(message.id)) {
                        return "jspb.test.TestGroup.id: string expected";
                    }
                }
                var err;
                if (err = types[1].verify(message.requiredSimple)) {
                    return err;
                }
                if (message.optionalSimple !== undefined && message.optionalSimple !== null) {
                    var err;
                    if (err = types[2].verify(message.optionalSimple)) {
                        return err;
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a TestGroup message.
             * @function
             * @param {jspb.test.TestGroup|Object} source TestGroup message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestGroup|Object} Converted message
             */
            TestGroup.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.id === undefined && options.defaults) {
                        dst.id = "";
                    }
                    dst.requiredSimple = types[1].convert(src.requiredSimple, impl, options);
                    dst.optionalSimple = types[2].convert(src.optionalSimple, impl, options);
                }
                return dst;
            };})($types);

            /**
             * Creates a TestGroup message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestGroup} TestGroup
             */
            TestGroup.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this TestGroup message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return TestGroup;
        })();

        test.TestReservedNames = (function() {

            /**
             * Constructs a new TestReservedNames.
             * @exports jspb.test.TestReservedNames
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function TestReservedNames(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.TestReservedNames.prototype */
            var $prototype = TestReservedNames.prototype;

            /**
             * TestReservedNames extension.
             * @type {number}
             */
            $prototype.extension = 0;

            /**
             * TestReservedNames .jspb.test.TestReservedNamesExtension.foo.
             * @name jspb.test.TestReservedNames#.jspb.test.TestReservedNamesExtension.foo
             * @type {number}
             */
            $prototype[".jspb.test.TestReservedNamesExtension.foo"] = 0;

            /**
             * Creates a new TestReservedNames instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestReservedNames} TestReservedNames instance
             */
            TestReservedNames.create = function create(properties) {
                return new TestReservedNames(properties);
            };

            /**
             * Encodes the specified TestReservedNames message.
             * @function
             * @param {jspb.test.TestReservedNames|Object} message TestReservedNames message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestReservedNames.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.extension !== undefined && message.extension !== 0) {
                    writer.uint32(8).int32(message.extension);
                }
                if (message[".jspb.test.TestReservedNamesExtension.foo"] !== undefined && message[".jspb.test.TestReservedNamesExtension.foo"] !== 0) {
                    writer.uint32(80).int32(message[".jspb.test.TestReservedNamesExtension.foo"]);
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified TestReservedNames message, length delimited.
             * @param {jspb.test.TestReservedNames|Object} message TestReservedNames message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestReservedNames.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestReservedNames message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestReservedNames} TestReservedNames
             */
            TestReservedNames.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.TestReservedNames();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.extension = reader.int32();
                        break;

                    case 10:
                        message[".jspb.test.TestReservedNamesExtension.foo"] = reader.int32();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes a TestReservedNames message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestReservedNames} TestReservedNames
             */
            TestReservedNames.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestReservedNames message.
             * @function
             * @param {jspb.test.TestReservedNames|Object} message TestReservedNames message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestReservedNames.verify = (function(util) { return function verify(message) {
                if (message.extension !== undefined) {
                    if (!util.isInteger(message.extension)) {
                        return "jspb.test.TestReservedNames.extension: integer expected";
                    }
                }
                if (message[".jspb.test.TestReservedNamesExtension.foo"] !== undefined) {
                    if (!util.isInteger(message[".jspb.test.TestReservedNamesExtension.foo"])) {
                        return "jspb.test.TestReservedNames..jspb.test.TestReservedNamesExtension.foo: integer expected";
                    }
                }
                return null;
            };})($protobuf.util);

            /**
             * Converts a TestReservedNames message.
             * @function
             * @param {jspb.test.TestReservedNames|Object} source TestReservedNames message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestReservedNames|Object} Converted message
             */
            TestReservedNames.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.extension === undefined && options.defaults) {
                        dst.extension = 0;
                    }
                    if (dst[".jspb.test.TestReservedNamesExtension.foo"] === undefined && options.defaults) {
                        dst[".jspb.test.TestReservedNamesExtension.foo"] = 0;
                    }
                }
                return dst;
            };})();

            /**
             * Creates a TestReservedNames message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestReservedNames} TestReservedNames
             */
            TestReservedNames.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this TestReservedNames message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return TestReservedNames;
        })();

        test.TestReservedNamesExtension = (function() {

            /**
             * Constructs a new TestReservedNamesExtension.
             * @exports jspb.test.TestReservedNamesExtension
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function TestReservedNamesExtension(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.TestReservedNamesExtension.prototype */
            var $prototype = TestReservedNamesExtension.prototype;

            /**
             * Creates a new TestReservedNamesExtension instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestReservedNamesExtension} TestReservedNamesExtension instance
             */
            TestReservedNamesExtension.create = function create(properties) {
                return new TestReservedNamesExtension(properties);
            };

            /**
             * Encodes the specified TestReservedNamesExtension message.
             * @function
             * @param {jspb.test.TestReservedNamesExtension|Object} message TestReservedNamesExtension message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestReservedNamesExtension.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified TestReservedNamesExtension message, length delimited.
             * @param {jspb.test.TestReservedNamesExtension|Object} message TestReservedNamesExtension message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestReservedNamesExtension.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestReservedNamesExtension message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestReservedNamesExtension} TestReservedNamesExtension
             */
            TestReservedNamesExtension.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.TestReservedNamesExtension();
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
             * Decodes a TestReservedNamesExtension message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestReservedNamesExtension} TestReservedNamesExtension
             */
            TestReservedNamesExtension.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestReservedNamesExtension message.
             * @function
             * @param {jspb.test.TestReservedNamesExtension|Object} message TestReservedNamesExtension message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestReservedNamesExtension.verify = (function() { return function verify() {
                return null;
            };})();

            /**
             * Converts a TestReservedNamesExtension message.
             * @function
             * @param {jspb.test.TestReservedNamesExtension|Object} source TestReservedNamesExtension message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestReservedNamesExtension|Object} Converted message
             */
            TestReservedNamesExtension.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                return dst;
            };})();

            /**
             * Creates a TestReservedNamesExtension message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestReservedNamesExtension} TestReservedNamesExtension
             */
            TestReservedNamesExtension.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this TestReservedNamesExtension message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return TestReservedNamesExtension;
        })();

        test.TestMessageWithOneof = (function() {

            /**
             * Constructs a new TestMessageWithOneof.
             * @exports jspb.test.TestMessageWithOneof
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function TestMessageWithOneof(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.TestMessageWithOneof.prototype */
            var $prototype = TestMessageWithOneof.prototype;

            /**
             * TestMessageWithOneof pone.
             * @type {string}
             */
            $prototype.pone = "";

            /**
             * TestMessageWithOneof pthree.
             * @type {string}
             */
            $prototype.pthree = "";

            /**
             * TestMessageWithOneof rone.
             * @type {jspb.test.TestMessageWithOneof}
             */
            $prototype.rone = null;

            /**
             * TestMessageWithOneof rtwo.
             * @type {string}
             */
            $prototype.rtwo = "";

            /**
             * TestMessageWithOneof normalField.
             * @type {boolean}
             */
            $prototype.normalField = false;

            /**
             * TestMessageWithOneof repeatedField.
             * @type {Array.<string>}
             */
            $prototype.repeatedField = $protobuf.util.emptyArray;

            /**
             * TestMessageWithOneof aone.
             * @type {number}
             */
            $prototype.aone = 1234;

            /**
             * TestMessageWithOneof atwo.
             * @type {number}
             */
            $prototype.atwo = 0;

            /**
             * TestMessageWithOneof bone.
             * @type {number}
             */
            $prototype.bone = 0;

            /**
             * TestMessageWithOneof btwo.
             * @type {number}
             */
            $prototype.btwo = 1234;

            /**
             * TestMessageWithOneof partialOneof.
             * @name jspb.test.TestMessageWithOneof#partialOneof
             * @type {string|undefined}
             */
            Object.defineProperty($prototype, "partialOneof", {
                get: function() {
                    if (this["pone"] !== undefined)
                        return "pone";
                    if (this["pthree"] !== undefined)
                        return "pthree";
                    return undefined;
                },
                set: function(value) {
                    if (value !== "pone")
                        delete this["pone"];
                    if (value !== "pthree")
                        delete this["pthree"];
                }
            });

            /**
             * TestMessageWithOneof recursiveOneof.
             * @name jspb.test.TestMessageWithOneof#recursiveOneof
             * @type {string|undefined}
             */
            Object.defineProperty($prototype, "recursiveOneof", {
                get: function() {
                    if (this["rone"] !== undefined)
                        return "rone";
                    if (this["rtwo"] !== undefined)
                        return "rtwo";
                    return undefined;
                },
                set: function(value) {
                    if (value !== "rone")
                        delete this["rone"];
                    if (value !== "rtwo")
                        delete this["rtwo"];
                }
            });

            /**
             * TestMessageWithOneof defaultOneofA.
             * @name jspb.test.TestMessageWithOneof#defaultOneofA
             * @type {string|undefined}
             */
            Object.defineProperty($prototype, "defaultOneofA", {
                get: function() {
                    if (this["aone"] !== undefined)
                        return "aone";
                    if (this["atwo"] !== undefined)
                        return "atwo";
                    return undefined;
                },
                set: function(value) {
                    if (value !== "aone")
                        delete this["aone"];
                    if (value !== "atwo")
                        delete this["atwo"];
                }
            });

            /**
             * TestMessageWithOneof defaultOneofB.
             * @name jspb.test.TestMessageWithOneof#defaultOneofB
             * @type {string|undefined}
             */
            Object.defineProperty($prototype, "defaultOneofB", {
                get: function() {
                    if (this["bone"] !== undefined)
                        return "bone";
                    if (this["btwo"] !== undefined)
                        return "btwo";
                    return undefined;
                },
                set: function(value) {
                    if (value !== "bone")
                        delete this["bone"];
                    if (value !== "btwo")
                        delete this["btwo"];
                }
            });

            // Referenced types
            var $types = [null, null, "jspb.test.TestMessageWithOneof", null, null, null, null, null, null, null]; $lazyTypes.push($types);

            /**
             * Creates a new TestMessageWithOneof instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestMessageWithOneof} TestMessageWithOneof instance
             */
            TestMessageWithOneof.create = function create(properties) {
                return new TestMessageWithOneof(properties);
            };

            /**
             * Encodes the specified TestMessageWithOneof message.
             * @function
             * @param {jspb.test.TestMessageWithOneof|Object} message TestMessageWithOneof message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestMessageWithOneof.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.normalField !== undefined && message.normalField !== false) {
                    writer.uint32(64).bool(message.normalField);
                }
                if (message.repeatedField) {
                    for (var i = 0; i < message.repeatedField.length; ++i) {
                        writer.uint32(74).string(message.repeatedField[i]);
                    }
                }
                switch (message.partialOneof) {
                case "pone":
                    writer.uint32(26).string(message.pone);
                    break;

                case "pthree":
                    writer.uint32(42).string(message.pthree);
                    break;
                }
                switch (message.recursiveOneof) {
                case "rone":
                    types[2].encode(message.rone, writer.uint32(50).fork()).ldelim();
                    break;

                case "rtwo":
                    writer.uint32(58).string(message.rtwo);
                    break;
                }
                switch (message.defaultOneofA) {
                case "aone":
                    writer.uint32(80).int32(message.aone);
                    break;

                case "atwo":
                    writer.uint32(88).int32(message.atwo);
                    break;
                }
                switch (message.defaultOneofB) {
                case "bone":
                    writer.uint32(96).int32(message.bone);
                    break;

                case "btwo":
                    writer.uint32(104).int32(message.btwo);
                    break;
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified TestMessageWithOneof message, length delimited.
             * @param {jspb.test.TestMessageWithOneof|Object} message TestMessageWithOneof message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestMessageWithOneof.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestMessageWithOneof message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestMessageWithOneof} TestMessageWithOneof
             */
            TestMessageWithOneof.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.TestMessageWithOneof();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 3:
                        message.pone = reader.string();
                        break;

                    case 5:
                        message.pthree = reader.string();
                        break;

                    case 6:
                        message.rone = types[2].decode(reader, reader.uint32());
                        break;

                    case 7:
                        message.rtwo = reader.string();
                        break;

                    case 8:
                        message.normalField = reader.bool();
                        break;

                    case 9:
                        if (!(message.repeatedField && message.repeatedField.length)) {
                            message.repeatedField = [];
                        }
                        message.repeatedField.push(reader.string());
                        break;

                    case 10:
                        message.aone = reader.int32();
                        break;

                    case 11:
                        message.atwo = reader.int32();
                        break;

                    case 12:
                        message.bone = reader.int32();
                        break;

                    case 13:
                        message.btwo = reader.int32();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a TestMessageWithOneof message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestMessageWithOneof} TestMessageWithOneof
             */
            TestMessageWithOneof.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestMessageWithOneof message.
             * @function
             * @param {jspb.test.TestMessageWithOneof|Object} message TestMessageWithOneof message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestMessageWithOneof.verify = (function(util, types) { return function verify(message) {
                if (message.pone !== undefined) {
                    if (!util.isString(message.pone)) {
                        return "jspb.test.TestMessageWithOneof.pone: string expected";
                    }
                }
                if (message.pthree !== undefined) {
                    if (!util.isString(message.pthree)) {
                        return "jspb.test.TestMessageWithOneof.pthree: string expected";
                    }
                }
                if (message.rone !== undefined && message.rone !== null) {
                    var err;
                    if (err = types[2].verify(message.rone)) {
                        return err;
                    }
                }
                if (message.rtwo !== undefined) {
                    if (!util.isString(message.rtwo)) {
                        return "jspb.test.TestMessageWithOneof.rtwo: string expected";
                    }
                }
                if (message.normalField !== undefined) {
                    if (typeof message.normalField !== "boolean") {
                        return "jspb.test.TestMessageWithOneof.normalField: boolean expected";
                    }
                }
                if (message.repeatedField !== undefined) {
                    if (!Array.isArray(message.repeatedField)) {
                        return "jspb.test.TestMessageWithOneof.repeatedField: array expected";
                    }
                    for (var i = 0; i < message.repeatedField.length; ++i) {
                        if (!util.isString(message.repeatedField[i])) {
                            return "jspb.test.TestMessageWithOneof.repeatedField: string[] expected";
                        }
                    }
                }
                if (message.aone !== undefined) {
                    if (!util.isInteger(message.aone)) {
                        return "jspb.test.TestMessageWithOneof.aone: integer expected";
                    }
                }
                if (message.atwo !== undefined) {
                    if (!util.isInteger(message.atwo)) {
                        return "jspb.test.TestMessageWithOneof.atwo: integer expected";
                    }
                }
                if (message.bone !== undefined) {
                    if (!util.isInteger(message.bone)) {
                        return "jspb.test.TestMessageWithOneof.bone: integer expected";
                    }
                }
                if (message.btwo !== undefined) {
                    if (!util.isInteger(message.btwo)) {
                        return "jspb.test.TestMessageWithOneof.btwo: integer expected";
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a TestMessageWithOneof message.
             * @function
             * @param {jspb.test.TestMessageWithOneof|Object} source TestMessageWithOneof message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestMessageWithOneof|Object} Converted message
             */
            TestMessageWithOneof.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.pone === undefined && options.defaults) {
                        dst.pone = "";
                    }
                    if (dst.pthree === undefined && options.defaults) {
                        dst.pthree = "";
                    }
                    dst.rone = types[2].convert(src.rone, impl, options);
                    if (dst.rtwo === undefined && options.defaults) {
                        dst.rtwo = "";
                    }
                    if (dst.normalField === undefined && options.defaults) {
                        dst.normalField = false;
                    }
                    if (src.repeatedField && src.repeatedField.length) {
                        dst.repeatedField = [];
                        for (var i = 0; i < src.repeatedField.length; ++i) {
                            dst.repeatedField.push(src.repeatedField[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.repeatedField = [];
                        }
                    }
                    if (dst.aone === undefined && options.defaults) {
                        dst.aone = 1234;
                    }
                    if (dst.atwo === undefined && options.defaults) {
                        dst.atwo = 0;
                    }
                    if (dst.bone === undefined && options.defaults) {
                        dst.bone = 0;
                    }
                    if (dst.btwo === undefined && options.defaults) {
                        dst.btwo = 1234;
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a TestMessageWithOneof message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestMessageWithOneof} TestMessageWithOneof
             */
            TestMessageWithOneof.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this TestMessageWithOneof message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return TestMessageWithOneof;
        })();

        test.TestEndsWithBytes = (function() {

            /**
             * Constructs a new TestEndsWithBytes.
             * @exports jspb.test.TestEndsWithBytes
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function TestEndsWithBytes(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.TestEndsWithBytes.prototype */
            var $prototype = TestEndsWithBytes.prototype;

            /**
             * TestEndsWithBytes value.
             * @type {number}
             */
            $prototype.value = 0;

            /**
             * TestEndsWithBytes data.
             * @type {Uint8Array}
             */
            $prototype.data = $protobuf.util.emptyArray;

            /**
             * Creates a new TestEndsWithBytes instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestEndsWithBytes} TestEndsWithBytes instance
             */
            TestEndsWithBytes.create = function create(properties) {
                return new TestEndsWithBytes(properties);
            };

            /**
             * Encodes the specified TestEndsWithBytes message.
             * @function
             * @param {jspb.test.TestEndsWithBytes|Object} message TestEndsWithBytes message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestEndsWithBytes.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.value !== undefined && message.value !== 0) {
                    writer.uint32(8).int32(message.value);
                }
                if (message.data !== undefined && message.data !== []) {
                    writer.uint32(18).bytes(message.data);
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified TestEndsWithBytes message, length delimited.
             * @param {jspb.test.TestEndsWithBytes|Object} message TestEndsWithBytes message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestEndsWithBytes.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestEndsWithBytes message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestEndsWithBytes} TestEndsWithBytes
             */
            TestEndsWithBytes.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.TestEndsWithBytes();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.int32();
                        break;

                    case 2:
                        message.data = reader.bytes();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes a TestEndsWithBytes message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestEndsWithBytes} TestEndsWithBytes
             */
            TestEndsWithBytes.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestEndsWithBytes message.
             * @function
             * @param {jspb.test.TestEndsWithBytes|Object} message TestEndsWithBytes message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestEndsWithBytes.verify = (function(util) { return function verify(message) {
                if (message.value !== undefined) {
                    if (!util.isInteger(message.value)) {
                        return "jspb.test.TestEndsWithBytes.value: integer expected";
                    }
                }
                if (message.data !== undefined) {
                    if (!(message.data && typeof message.data.length === "number" || util.isString(message.data))) {
                        return "jspb.test.TestEndsWithBytes.data: buffer expected";
                    }
                }
                return null;
            };})($protobuf.util);

            /**
             * Converts a TestEndsWithBytes message.
             * @function
             * @param {jspb.test.TestEndsWithBytes|Object} source TestEndsWithBytes message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestEndsWithBytes|Object} Converted message
             */
            TestEndsWithBytes.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.value === undefined && options.defaults) {
                        dst.value = 0;
                    }
                    dst.data = impl.bytes(src.data, [], options);
                }
                return dst;
            };})();

            /**
             * Creates a TestEndsWithBytes message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestEndsWithBytes} TestEndsWithBytes
             */
            TestEndsWithBytes.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this TestEndsWithBytes message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return TestEndsWithBytes;
        })();

        test.TestMapFieldsNoBinary = (function() {

            /**
             * Constructs a new TestMapFieldsNoBinary.
             * @exports jspb.test.TestMapFieldsNoBinary
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function TestMapFieldsNoBinary(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.TestMapFieldsNoBinary.prototype */
            var $prototype = TestMapFieldsNoBinary.prototype;

            /**
             * TestMapFieldsNoBinary mapStringString.
             * @type {string}
             */
            $prototype.mapStringString = $protobuf.util.emptyObject;

            /**
             * TestMapFieldsNoBinary mapStringInt32.
             * @type {number}
             */
            $prototype.mapStringInt32 = $protobuf.util.emptyObject;

            /**
             * TestMapFieldsNoBinary mapStringInt64.
             * @type {number|Long}
             */
            $prototype.mapStringInt64 = $protobuf.util.emptyObject;

            /**
             * TestMapFieldsNoBinary mapStringBool.
             * @type {boolean}
             */
            $prototype.mapStringBool = $protobuf.util.emptyObject;

            /**
             * TestMapFieldsNoBinary mapStringDouble.
             * @type {number}
             */
            $prototype.mapStringDouble = $protobuf.util.emptyObject;

            /**
             * TestMapFieldsNoBinary mapStringEnum.
             * @type {number}
             */
            $prototype.mapStringEnum = $protobuf.util.emptyObject;

            /**
             * TestMapFieldsNoBinary mapStringMsg.
             * @type {jspb.test.MapValueMessageNoBinary}
             */
            $prototype.mapStringMsg = $protobuf.util.emptyObject;

            /**
             * TestMapFieldsNoBinary mapInt32String.
             * @type {string}
             */
            $prototype.mapInt32String = $protobuf.util.emptyObject;

            /**
             * TestMapFieldsNoBinary mapInt64String.
             * @type {string}
             */
            $prototype.mapInt64String = $protobuf.util.emptyObject;

            /**
             * TestMapFieldsNoBinary mapBoolString.
             * @type {string}
             */
            $prototype.mapBoolString = $protobuf.util.emptyObject;

            /**
             * TestMapFieldsNoBinary testMapFields.
             * @type {jspb.test.TestMapFieldsNoBinary}
             */
            $prototype.testMapFields = null;

            /**
             * TestMapFieldsNoBinary mapStringTestmapfields.
             * @type {jspb.test.TestMapFieldsNoBinary}
             */
            $prototype.mapStringTestmapfields = $protobuf.util.emptyObject;

            // Referenced types
            var $types = [null, null, null, null, null, "jspb.test.MapValueEnumNoBinary", "jspb.test.MapValueMessageNoBinary", null, null, null, "jspb.test.TestMapFieldsNoBinary", "jspb.test.TestMapFieldsNoBinary"]; $lazyTypes.push($types);

            /**
             * Creates a new TestMapFieldsNoBinary instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestMapFieldsNoBinary} TestMapFieldsNoBinary instance
             */
            TestMapFieldsNoBinary.create = function create(properties) {
                return new TestMapFieldsNoBinary(properties);
            };

            /**
             * Encodes the specified TestMapFieldsNoBinary message.
             * @function
             * @param {jspb.test.TestMapFieldsNoBinary|Object} message TestMapFieldsNoBinary message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestMapFieldsNoBinary.encode = (function(Writer, util, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.mapStringString && message.mapStringString !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringString), i = 0; i < keys.length; ++i) {
                        writer.uint32(10).fork().uint32(10).string(keys[i]).uint32(18).string(message.mapStringString[keys[i]]).ldelim();
                    }
                }
                if (message.mapStringInt32 && message.mapStringInt32 !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringInt32), i = 0; i < keys.length; ++i) {
                        writer.uint32(18).fork().uint32(10).string(keys[i]).uint32(16).int32(message.mapStringInt32[keys[i]]).ldelim();
                    }
                }
                if (message.mapStringInt64 && message.mapStringInt64 !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringInt64), i = 0; i < keys.length; ++i) {
                        writer.uint32(26).fork().uint32(10).string(keys[i]).uint32(16).int64(message.mapStringInt64[keys[i]]).ldelim();
                    }
                }
                if (message.mapStringBool && message.mapStringBool !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringBool), i = 0; i < keys.length; ++i) {
                        writer.uint32(34).fork().uint32(10).string(keys[i]).uint32(16).bool(message.mapStringBool[keys[i]]).ldelim();
                    }
                }
                if (message.mapStringDouble && message.mapStringDouble !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringDouble), i = 0; i < keys.length; ++i) {
                        writer.uint32(42).fork().uint32(10).string(keys[i]).uint32(17).double(message.mapStringDouble[keys[i]]).ldelim();
                    }
                }
                if (message.mapStringEnum && message.mapStringEnum !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringEnum), i = 0; i < keys.length; ++i) {
                        writer.uint32(50).fork().uint32(10).string(keys[i]).uint32(16).uint32(message.mapStringEnum[keys[i]]).ldelim();
                    }
                }
                if (message.mapStringMsg && message.mapStringMsg !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringMsg), i = 0; i < keys.length; ++i) {
                        writer.uint32(58).fork().uint32(10).string(keys[i]);
                        types[6].encode(message.mapStringMsg[keys[i]], writer.uint32(18).fork()).ldelim().ldelim();
                    }
                }
                if (message.mapInt32String && message.mapInt32String !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapInt32String), i = 0; i < keys.length; ++i) {
                        writer.uint32(66).fork().uint32(8).int32(keys[i]).uint32(18).string(message.mapInt32String[keys[i]]).ldelim();
                    }
                }
                if (message.mapInt64String && message.mapInt64String !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapInt64String), i = 0; i < keys.length; ++i) {
                        writer.uint32(74).fork().uint32(8).int64(keys[i]).uint32(18).string(message.mapInt64String[keys[i]]).ldelim();
                    }
                }
                if (message.mapBoolString && message.mapBoolString !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapBoolString), i = 0; i < keys.length; ++i) {
                        writer.uint32(82).fork().uint32(8).bool(keys[i]).uint32(18).string(message.mapBoolString[keys[i]]).ldelim();
                    }
                }
                if (message.testMapFields !== undefined && message.testMapFields !== null) {
                    types[10].encode(message.testMapFields, writer.uint32(90).fork()).ldelim();
                }
                if (message.mapStringTestmapfields && message.mapStringTestmapfields !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringTestmapfields), i = 0; i < keys.length; ++i) {
                        writer.uint32(98).fork().uint32(10).string(keys[i]);
                        types[11].encode(message.mapStringTestmapfields[keys[i]], writer.uint32(18).fork()).ldelim().ldelim();
                    }
                }
                return writer;
            };})($protobuf.Writer, $protobuf.util, $types);

            /**
             * Encodes the specified TestMapFieldsNoBinary message, length delimited.
             * @param {jspb.test.TestMapFieldsNoBinary|Object} message TestMapFieldsNoBinary message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestMapFieldsNoBinary.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestMapFieldsNoBinary message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestMapFieldsNoBinary} TestMapFieldsNoBinary
             */
            TestMapFieldsNoBinary.decode = (function(Reader, util, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.TestMapFieldsNoBinary();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.mapStringString === util.emptyObject) {
                            message.mapStringString = {};
                        }
                        var key = reader.string();
                        if (typeof key === "object") {
                            key = util.longToHash(key);
                        }
                        reader.pos++;
                        message.mapStringString[key] = reader.string();
                        break;

                    case 2:
                        reader.skip().pos++;
                        if (message.mapStringInt32 === util.emptyObject) {
                            message.mapStringInt32 = {};
                        }
                        var key = reader.string();
                        if (typeof key === "object") {
                            key = util.longToHash(key);
                        }
                        reader.pos++;
                        message.mapStringInt32[key] = reader.int32();
                        break;

                    case 3:
                        reader.skip().pos++;
                        if (message.mapStringInt64 === util.emptyObject) {
                            message.mapStringInt64 = {};
                        }
                        var key = reader.string();
                        if (typeof key === "object") {
                            key = util.longToHash(key);
                        }
                        reader.pos++;
                        message.mapStringInt64[key] = reader.int64();
                        break;

                    case 4:
                        reader.skip().pos++;
                        if (message.mapStringBool === util.emptyObject) {
                            message.mapStringBool = {};
                        }
                        var key = reader.string();
                        if (typeof key === "object") {
                            key = util.longToHash(key);
                        }
                        reader.pos++;
                        message.mapStringBool[key] = reader.bool();
                        break;

                    case 5:
                        reader.skip().pos++;
                        if (message.mapStringDouble === util.emptyObject) {
                            message.mapStringDouble = {};
                        }
                        var key = reader.string();
                        if (typeof key === "object") {
                            key = util.longToHash(key);
                        }
                        reader.pos++;
                        message.mapStringDouble[key] = reader.double();
                        break;

                    case 6:
                        reader.skip().pos++;
                        if (message.mapStringEnum === util.emptyObject) {
                            message.mapStringEnum = {};
                        }
                        var key = reader.string();
                        if (typeof key === "object") {
                            key = util.longToHash(key);
                        }
                        reader.pos++;
                        message.mapStringEnum[key] = reader.uint32();
                        break;

                    case 7:
                        reader.skip().pos++;
                        if (message.mapStringMsg === util.emptyObject) {
                            message.mapStringMsg = {};
                        }
                        var key = reader.string();
                        if (typeof key === "object") {
                            key = util.longToHash(key);
                        }
                        reader.pos++;
                        message.mapStringMsg[key] = types[6].decode(reader, reader.uint32());
                        break;

                    case 8:
                        reader.skip().pos++;
                        if (message.mapInt32String === util.emptyObject) {
                            message.mapInt32String = {};
                        }
                        var key = reader.int32();
                        if (typeof key === "object") {
                            key = util.longToHash(key);
                        }
                        reader.pos++;
                        message.mapInt32String[key] = reader.string();
                        break;

                    case 9:
                        reader.skip().pos++;
                        if (message.mapInt64String === util.emptyObject) {
                            message.mapInt64String = {};
                        }
                        var key = reader.int64();
                        if (typeof key === "object") {
                            key = util.longToHash(key);
                        }
                        reader.pos++;
                        message.mapInt64String[key] = reader.string();
                        break;

                    case 10:
                        reader.skip().pos++;
                        if (message.mapBoolString === util.emptyObject) {
                            message.mapBoolString = {};
                        }
                        var key = reader.bool();
                        if (typeof key === "object") {
                            key = util.longToHash(key);
                        }
                        reader.pos++;
                        message.mapBoolString[key] = reader.string();
                        break;

                    case 11:
                        message.testMapFields = types[10].decode(reader, reader.uint32());
                        break;

                    case 12:
                        reader.skip().pos++;
                        if (message.mapStringTestmapfields === util.emptyObject) {
                            message.mapStringTestmapfields = {};
                        }
                        var key = reader.string();
                        if (typeof key === "object") {
                            key = util.longToHash(key);
                        }
                        reader.pos++;
                        message.mapStringTestmapfields[key] = types[11].decode(reader, reader.uint32());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $protobuf.util, $types);

            /**
             * Decodes a TestMapFieldsNoBinary message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestMapFieldsNoBinary} TestMapFieldsNoBinary
             */
            TestMapFieldsNoBinary.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestMapFieldsNoBinary message.
             * @function
             * @param {jspb.test.TestMapFieldsNoBinary|Object} message TestMapFieldsNoBinary message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestMapFieldsNoBinary.verify = (function(util, types) { return function verify(message) {
                if (message.mapStringString !== undefined) {
                    if (!util.isObject(message.mapStringString)) {
                        return "jspb.test.TestMapFieldsNoBinary.mapStringString: object expected";
                    }
                    var key = Object.keys(message.mapStringString);
                    for (var i = 0; i < key.length; ++i) {
                        if (!util.isString(message.mapStringString[key[i]])) {
                            return "jspb.test.TestMapFieldsNoBinary.mapStringString: string{key:string} expected";
                        }
                    }
                }
                if (message.mapStringInt32 !== undefined) {
                    if (!util.isObject(message.mapStringInt32)) {
                        return "jspb.test.TestMapFieldsNoBinary.mapStringInt32: object expected";
                    }
                    var key = Object.keys(message.mapStringInt32);
                    for (var i = 0; i < key.length; ++i) {
                        if (!util.isInteger(message.mapStringInt32[key[i]])) {
                            return "jspb.test.TestMapFieldsNoBinary.mapStringInt32: integer{key:string} expected";
                        }
                    }
                }
                if (message.mapStringInt64 !== undefined) {
                    if (!util.isObject(message.mapStringInt64)) {
                        return "jspb.test.TestMapFieldsNoBinary.mapStringInt64: object expected";
                    }
                    var key = Object.keys(message.mapStringInt64);
                    for (var i = 0; i < key.length; ++i) {
                        if (!util.isInteger(message.mapStringInt64[key[i]]) && !(message.mapStringInt64[key[i]] && util.isInteger(message.mapStringInt64[key[i]].low) && util.isInteger(message.mapStringInt64[key[i]].high))) {
                            return "jspb.test.TestMapFieldsNoBinary.mapStringInt64: integer|Long{key:string} expected";
                        }
                    }
                }
                if (message.mapStringBool !== undefined) {
                    if (!util.isObject(message.mapStringBool)) {
                        return "jspb.test.TestMapFieldsNoBinary.mapStringBool: object expected";
                    }
                    var key = Object.keys(message.mapStringBool);
                    for (var i = 0; i < key.length; ++i) {
                        if (typeof message.mapStringBool[key[i]] !== "boolean") {
                            return "jspb.test.TestMapFieldsNoBinary.mapStringBool: boolean{key:string} expected";
                        }
                    }
                }
                if (message.mapStringDouble !== undefined) {
                    if (!util.isObject(message.mapStringDouble)) {
                        return "jspb.test.TestMapFieldsNoBinary.mapStringDouble: object expected";
                    }
                    var key = Object.keys(message.mapStringDouble);
                    for (var i = 0; i < key.length; ++i) {
                        if (typeof message.mapStringDouble[key[i]] !== "number") {
                            return "jspb.test.TestMapFieldsNoBinary.mapStringDouble: number{key:string} expected";
                        }
                    }
                }
                if (message.mapStringEnum !== undefined) {
                    if (!util.isObject(message.mapStringEnum)) {
                        return "jspb.test.TestMapFieldsNoBinary.mapStringEnum: object expected";
                    }
                    var key = Object.keys(message.mapStringEnum);
                    for (var i = 0; i < key.length; ++i) {
                        switch (message.mapStringEnum[key[i]]) {
                        default:
                            return "jspb.test.TestMapFieldsNoBinary.mapStringEnum: enum value{key:string} expected";

                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
                    }
                }
                if (message.mapStringMsg !== undefined) {
                    if (!util.isObject(message.mapStringMsg)) {
                        return "jspb.test.TestMapFieldsNoBinary.mapStringMsg: object expected";
                    }
                    var key = Object.keys(message.mapStringMsg);
                    for (var i = 0; i < key.length; ++i) {
                        var err;
                        if (err = types[6].verify(message.mapStringMsg[key[i]])) {
                            return err;
                        }
                    }
                }
                if (message.mapInt32String !== undefined) {
                    if (!util.isObject(message.mapInt32String)) {
                        return "jspb.test.TestMapFieldsNoBinary.mapInt32String: object expected";
                    }
                    var key = Object.keys(message.mapInt32String);
                    for (var i = 0; i < key.length; ++i) {
                        if (!/^-?(?:0|[1-9]\dst*)$/.test(key[i])) {
                            return "jspb.test.TestMapFieldsNoBinary.mapInt32String: integer key{key:int32} expected";
                        }
                        if (!util.isString(message.mapInt32String[key[i]])) {
                            return "jspb.test.TestMapFieldsNoBinary.mapInt32String: string{key:int32} expected";
                        }
                    }
                }
                if (message.mapInt64String !== undefined) {
                    if (!util.isObject(message.mapInt64String)) {
                        return "jspb.test.TestMapFieldsNoBinary.mapInt64String: object expected";
                    }
                    var key = Object.keys(message.mapInt64String);
                    for (var i = 0; i < key.length; ++i) {
                        if (!/^(?:[\x00-\xff]{8}|-?(?:0|[1-9]\dst*))$/.test(key[i])) {
                            return "jspb.test.TestMapFieldsNoBinary.mapInt64String: integer|Long key{key:int64} expected";
                        }
                        if (!util.isString(message.mapInt64String[key[i]])) {
                            return "jspb.test.TestMapFieldsNoBinary.mapInt64String: string{key:int64} expected";
                        }
                    }
                }
                if (message.mapBoolString !== undefined) {
                    if (!util.isObject(message.mapBoolString)) {
                        return "jspb.test.TestMapFieldsNoBinary.mapBoolString: object expected";
                    }
                    var key = Object.keys(message.mapBoolString);
                    for (var i = 0; i < key.length; ++i) {
                        if (!/^true|false|0|1$/.test(key[i])) {
                            return "jspb.test.TestMapFieldsNoBinary.mapBoolString: boolean key{key:bool} expected";
                        }
                        if (!util.isString(message.mapBoolString[key[i]])) {
                            return "jspb.test.TestMapFieldsNoBinary.mapBoolString: string{key:bool} expected";
                        }
                    }
                }
                if (message.testMapFields !== undefined && message.testMapFields !== null) {
                    var err;
                    if (err = types[10].verify(message.testMapFields)) {
                        return err;
                    }
                }
                if (message.mapStringTestmapfields !== undefined) {
                    if (!util.isObject(message.mapStringTestmapfields)) {
                        return "jspb.test.TestMapFieldsNoBinary.mapStringTestmapfields: object expected";
                    }
                    var key = Object.keys(message.mapStringTestmapfields);
                    for (var i = 0; i < key.length; ++i) {
                        var err;
                        if (err = types[11].verify(message.mapStringTestmapfields[key[i]])) {
                            return err;
                        }
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a TestMapFieldsNoBinary message.
             * @function
             * @param {jspb.test.TestMapFieldsNoBinary|Object} source TestMapFieldsNoBinary message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestMapFieldsNoBinary|Object} Converted message
             */
            TestMapFieldsNoBinary.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.mapStringString === undefined && options.defaults) {
                        dst.mapStringString = {};
                    }
                    if (dst.mapStringInt32 === undefined && options.defaults) {
                        dst.mapStringInt32 = {};
                    }
                    dst.mapStringInt64 = impl.longs(src.mapStringInt64, 0, 0, false, options);
                    if (dst.mapStringBool === undefined && options.defaults) {
                        dst.mapStringBool = {};
                    }
                    if (dst.mapStringDouble === undefined && options.defaults) {
                        dst.mapStringDouble = {};
                    }
                    dst.mapStringEnum = impl.enums(src.mapStringEnum, 0, types[5], options);
                    dst.mapStringMsg = types[6].convert(src.mapStringMsg, impl, options);
                    if (dst.mapInt32String === undefined && options.defaults) {
                        dst.mapInt32String = {};
                    }
                    if (dst.mapInt64String === undefined && options.defaults) {
                        dst.mapInt64String = {};
                    }
                    if (dst.mapBoolString === undefined && options.defaults) {
                        dst.mapBoolString = {};
                    }
                    dst.testMapFields = types[10].convert(src.testMapFields, impl, options);
                    dst.mapStringTestmapfields = types[11].convert(src.mapStringTestmapfields, impl, options);
                }
                return dst;
            };})($types);

            /**
             * Creates a TestMapFieldsNoBinary message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.TestMapFieldsNoBinary} TestMapFieldsNoBinary
             */
            TestMapFieldsNoBinary.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this TestMapFieldsNoBinary message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return TestMapFieldsNoBinary;
        })();

        /**
         * MapValueEnumNoBinary enum.
         * @name MapValueEnumNoBinary
         * @memberof jspb.test
         * @enum {number}
         * @property {number} MAP_VALUE_FOO_NOBINARY=0 MAP_VALUE_FOO_NOBINARY value
         * @property {number} MAP_VALUE_BAR_NOBINARY=1 MAP_VALUE_BAR_NOBINARY value
         * @property {number} MAP_VALUE_BAZ_NOBINARY=2 MAP_VALUE_BAZ_NOBINARY value
         */
        test.MapValueEnumNoBinary = (function() {
            var valuesById = {},
                values = Object.create(valuesById);
            values[valuesById[0] = "MAP_VALUE_FOO_NOBINARY"] = 0;
            values[valuesById[1] = "MAP_VALUE_BAR_NOBINARY"] = 1;
            values[valuesById[2] = "MAP_VALUE_BAZ_NOBINARY"] = 2;
            return values;
        })();

        test.MapValueMessageNoBinary = (function() {

            /**
             * Constructs a new MapValueMessageNoBinary.
             * @exports jspb.test.MapValueMessageNoBinary
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function MapValueMessageNoBinary(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.MapValueMessageNoBinary.prototype */
            var $prototype = MapValueMessageNoBinary.prototype;

            /**
             * MapValueMessageNoBinary foo.
             * @type {number}
             */
            $prototype.foo = 0;

            /**
             * Creates a new MapValueMessageNoBinary instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.MapValueMessageNoBinary} MapValueMessageNoBinary instance
             */
            MapValueMessageNoBinary.create = function create(properties) {
                return new MapValueMessageNoBinary(properties);
            };

            /**
             * Encodes the specified MapValueMessageNoBinary message.
             * @function
             * @param {jspb.test.MapValueMessageNoBinary|Object} message MapValueMessageNoBinary message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MapValueMessageNoBinary.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.foo !== undefined && message.foo !== 0) {
                    writer.uint32(8).int32(message.foo);
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified MapValueMessageNoBinary message, length delimited.
             * @param {jspb.test.MapValueMessageNoBinary|Object} message MapValueMessageNoBinary message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MapValueMessageNoBinary.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MapValueMessageNoBinary message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.MapValueMessageNoBinary} MapValueMessageNoBinary
             */
            MapValueMessageNoBinary.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.MapValueMessageNoBinary();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.foo = reader.int32();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader);

            /**
             * Decodes a MapValueMessageNoBinary message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.MapValueMessageNoBinary} MapValueMessageNoBinary
             */
            MapValueMessageNoBinary.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a MapValueMessageNoBinary message.
             * @function
             * @param {jspb.test.MapValueMessageNoBinary|Object} message MapValueMessageNoBinary message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MapValueMessageNoBinary.verify = (function(util) { return function verify(message) {
                if (message.foo !== undefined) {
                    if (!util.isInteger(message.foo)) {
                        return "jspb.test.MapValueMessageNoBinary.foo: integer expected";
                    }
                }
                return null;
            };})($protobuf.util);

            /**
             * Converts a MapValueMessageNoBinary message.
             * @function
             * @param {jspb.test.MapValueMessageNoBinary|Object} source MapValueMessageNoBinary message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.MapValueMessageNoBinary|Object} Converted message
             */
            MapValueMessageNoBinary.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.foo === undefined && options.defaults) {
                        dst.foo = 0;
                    }
                }
                return dst;
            };})();

            /**
             * Creates a MapValueMessageNoBinary message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.MapValueMessageNoBinary} MapValueMessageNoBinary
             */
            MapValueMessageNoBinary.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this MapValueMessageNoBinary message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return MapValueMessageNoBinary;
        })();

        test.Deeply = (function() {

            /**
             * Constructs a new Deeply.
             * @exports jspb.test.Deeply
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function Deeply(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias jspb.test.Deeply.prototype */
            var $prototype = Deeply.prototype;

            /**
             * Creates a new Deeply instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Deeply} Deeply instance
             */
            Deeply.create = function create(properties) {
                return new Deeply(properties);
            };

            /**
             * Encodes the specified Deeply message.
             * @function
             * @param {jspb.test.Deeply|Object} message Deeply message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Deeply.encode = (function(Writer) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                return writer;
            };})($protobuf.Writer);

            /**
             * Encodes the specified Deeply message, length delimited.
             * @param {jspb.test.Deeply|Object} message Deeply message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Deeply.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Deeply message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Deeply} Deeply
             */
            Deeply.decode = (function(Reader) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.Deeply();
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
             * Decodes a Deeply message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Deeply} Deeply
             */
            Deeply.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Deeply message.
             * @function
             * @param {jspb.test.Deeply|Object} message Deeply message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Deeply.verify = (function() { return function verify() {
                return null;
            };})();

            /**
             * Converts a Deeply message.
             * @function
             * @param {jspb.test.Deeply|Object} source Deeply message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.Deeply|Object} Converted message
             */
            Deeply.convert = (function() { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                return dst;
            };})();

            /**
             * Creates a Deeply message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {jspb.test.Deeply} Deeply
             */
            Deeply.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this Deeply message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            Deeply.Nested = (function() {

                /**
                 * Constructs a new Nested.
                 * @exports jspb.test.Deeply.Nested
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                function Nested(properties) {
                    if (properties) {
                        var keys = Object.keys(properties);
                        for (var i = 0; i < keys.length; ++i)
                            this[keys[i]] = properties[keys[i]];
                    }
                }

                /** @alias jspb.test.Deeply.Nested.prototype */
                var $prototype = Nested.prototype;

                /**
                 * Creates a new Nested instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {jspb.test.Deeply.Nested} Nested instance
                 */
                Nested.create = function create(properties) {
                    return new Nested(properties);
                };

                /**
                 * Encodes the specified Nested message.
                 * @function
                 * @param {jspb.test.Deeply.Nested|Object} message Nested message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encode = (function(Writer) { return function encode(message, writer) {
                    if (!writer) {
                        writer = Writer.create();
                    }
                    return writer;
                };})($protobuf.Writer);

                /**
                 * Encodes the specified Nested message, length delimited.
                 * @param {jspb.test.Deeply.Nested|Object} message Nested message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Nested message from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.Deeply.Nested} Nested
                 */
                Nested.decode = (function(Reader) { return function decode(reader, len) {
                    if (!(reader instanceof Reader)) {
                        reader = Reader.create(reader);
                    }
                    var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.Deeply.Nested();
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
                 * Decodes a Nested message from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.Deeply.Nested} Nested
                 */
                Nested.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a Nested message.
                 * @function
                 * @param {jspb.test.Deeply.Nested|Object} message Nested message or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Nested.verify = (function() { return function verify() {
                    return null;
                };})();

                /**
                 * Converts a Nested message.
                 * @function
                 * @param {jspb.test.Deeply.Nested|Object} source Nested message or plain object to convert
                 * @param {*} impl Converter implementation to use
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {jspb.test.Deeply.Nested|Object} Converted message
                 */
                Nested.convert = (function() { return function convert(src, impl, options) {
                    if (!options) {
                        options = {};
                    }
                    var dst = impl.create(src, this, options);
                    return dst;
                };})();

                /**
                 * Creates a Nested message from JSON.
                 * @param {Object.<string,*>} source Source object
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {jspb.test.Deeply.Nested} Nested
                 */
                Nested.from = function from(source, options) {
                    return this.convert(source, $protobuf.converters.message, options);
                };

                /**
                 * Converts this Nested message to JSON.
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {Object.<string,*>} JSON object
                 */
                $prototype.asJSON = function asJSON(options) {
                    return this.constructor.convert(this, $protobuf.converters.json, options);
                };

                Nested.Message = (function() {

                    /**
                     * Constructs a new Message.
                     * @exports jspb.test.Deeply.Nested.Message
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

                    /** @alias jspb.test.Deeply.Nested.Message.prototype */
                    var $prototype = Message.prototype;

                    /**
                     * Message count.
                     * @type {number}
                     */
                    $prototype.count = 0;

                    /**
                     * Creates a new Message instance using the specified properties.
                     * @param {Object} [properties] Properties to set
                     * @returns {jspb.test.Deeply.Nested.Message} Message instance
                     */
                    Message.create = function create(properties) {
                        return new Message(properties);
                    };

                    /**
                     * Encodes the specified Message message.
                     * @function
                     * @param {jspb.test.Deeply.Nested.Message|Object} message Message message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Message.encode = (function(Writer) { return function encode(message, writer) {
                        if (!writer) {
                            writer = Writer.create();
                        }
                        if (message.count !== undefined && message.count !== 0) {
                            writer.uint32(8).int32(message.count);
                        }
                        return writer;
                    };})($protobuf.Writer);

                    /**
                     * Encodes the specified Message message, length delimited.
                     * @param {jspb.test.Deeply.Nested.Message|Object} message Message message or plain object to encode
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
                     * @returns {jspb.test.Deeply.Nested.Message} Message
                     */
                    Message.decode = (function(Reader) { return function decode(reader, len) {
                        if (!(reader instanceof Reader)) {
                            reader = Reader.create(reader);
                        }
                        var end = len === undefined ? reader.len : reader.pos + len, message = new $root.jspb.test.Deeply.Nested.Message();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.count = reader.int32();
                                break;

                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };})($protobuf.Reader);

                    /**
                     * Decodes a Message message from the specified reader or buffer, length delimited.
                     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                     * @returns {jspb.test.Deeply.Nested.Message} Message
                     */
                    Message.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                    };

                    /**
                     * Verifies a Message message.
                     * @function
                     * @param {jspb.test.Deeply.Nested.Message|Object} message Message message or plain object to verify
                     * @returns {?string} `null` if valid, otherwise the reason why it is not
                     */
                    Message.verify = (function(util) { return function verify(message) {
                        if (message.count !== undefined) {
                            if (!util.isInteger(message.count)) {
                                return "jspb.test.Deeply.Nested.Message.count: integer expected";
                            }
                        }
                        return null;
                    };})($protobuf.util);

                    /**
                     * Converts a Message message.
                     * @function
                     * @param {jspb.test.Deeply.Nested.Message|Object} source Message message or plain object to convert
                     * @param {*} impl Converter implementation to use
                     * @param {Object.<string,*>} [options] Conversion options
                     * @returns {jspb.test.Deeply.Nested.Message|Object} Converted message
                     */
                    Message.convert = (function() { return function convert(src, impl, options) {
                        if (!options) {
                            options = {};
                        }
                        var dst = impl.create(src, this, options);
                        if (dst) {
                            if (dst.count === undefined && options.defaults) {
                                dst.count = 0;
                            }
                        }
                        return dst;
                    };})();

                    /**
                     * Creates a Message message from JSON.
                     * @param {Object.<string,*>} source Source object
                     * @param {Object.<string,*>} [options] Conversion options
                     * @returns {jspb.test.Deeply.Nested.Message} Message
                     */
                    Message.from = function from(source, options) {
                        return this.convert(source, $protobuf.converters.message, options);
                    };

                    /**
                     * Converts this Message message to JSON.
                     * @param {Object.<string,*>} [options] Conversion options
                     * @returns {Object.<string,*>} JSON object
                     */
                    $prototype.asJSON = function asJSON(options) {
                        return this.constructor.convert(this, $protobuf.converters.json, options);
                    };

                    return Message;
                })();

                return Nested;
            })();

            return Deeply;
        })();

        return test;
    })();

    return jspb;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @exports google.protobuf
         * @namespace
         */
        var protobuf = {};

        protobuf.FileDescriptorSet = (function() {

            /**
             * Constructs a new FileDescriptorSet.
             * @exports google.protobuf.FileDescriptorSet
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function FileDescriptorSet(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.FileDescriptorSet.prototype */
            var $prototype = FileDescriptorSet.prototype;

            /**
             * FileDescriptorSet file.
             * @type {Array.<google.protobuf.FileDescriptorProto>}
             */
            $prototype.file = $protobuf.util.emptyArray;

            // Referenced types
            var $types = ["google.protobuf.FileDescriptorProto"]; $lazyTypes.push($types);

            /**
             * Creates a new FileDescriptorSet instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet instance
             */
            FileDescriptorSet.create = function create(properties) {
                return new FileDescriptorSet(properties);
            };

            /**
             * Encodes the specified FileDescriptorSet message.
             * @function
             * @param {google.protobuf.FileDescriptorSet|Object} message FileDescriptorSet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileDescriptorSet.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.file) {
                    for (var i = 0; i < message.file.length; ++i) {
                        types[0].encode(message.file[i], writer.uint32(10).fork()).ldelim();
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified FileDescriptorSet message, length delimited.
             * @param {google.protobuf.FileDescriptorSet|Object} message FileDescriptorSet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileDescriptorSet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FileDescriptorSet message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet
             */
            FileDescriptorSet.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.FileDescriptorSet();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.file && message.file.length)) {
                            message.file = [];
                        }
                        message.file.push(types[0].decode(reader, reader.uint32()));
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a FileDescriptorSet message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet
             */
            FileDescriptorSet.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FileDescriptorSet message.
             * @function
             * @param {google.protobuf.FileDescriptorSet|Object} message FileDescriptorSet message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FileDescriptorSet.verify = (function(types) { return function verify(message) {
                if (message.file !== undefined) {
                    if (!Array.isArray(message.file)) {
                        return "google.protobuf.FileDescriptorSet.file: array expected";
                    }
                    for (var i = 0; i < message.file.length; ++i) {
                        var err;
                        if (err = types[0].verify(message.file[i])) {
                            return err;
                        }
                    }
                }
                return null;
            };})($types);

            /**
             * Converts a FileDescriptorSet message.
             * @function
             * @param {google.protobuf.FileDescriptorSet|Object} source FileDescriptorSet message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.FileDescriptorSet|Object} Converted message
             */
            FileDescriptorSet.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (src.file && src.file.length) {
                        dst.file = [];
                        for (var i = 0; i < src.file.length; ++i) {
                            dst.file.push(types[0].convert(src.file[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.file = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a FileDescriptorSet message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet
             */
            FileDescriptorSet.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this FileDescriptorSet message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return FileDescriptorSet;
        })();

        protobuf.FileDescriptorProto = (function() {

            /**
             * Constructs a new FileDescriptorProto.
             * @exports google.protobuf.FileDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function FileDescriptorProto(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.FileDescriptorProto.prototype */
            var $prototype = FileDescriptorProto.prototype;

            /**
             * FileDescriptorProto name.
             * @type {string}
             */
            $prototype.name = "";

            /**
             * FileDescriptorProto package.
             * @name google.protobuf.FileDescriptorProto#package
             * @type {string}
             */
            $prototype["package"] = "";

            /**
             * FileDescriptorProto dependency.
             * @type {Array.<string>}
             */
            $prototype.dependency = $protobuf.util.emptyArray;

            /**
             * FileDescriptorProto publicDependency.
             * @type {Array.<number>}
             */
            $prototype.publicDependency = $protobuf.util.emptyArray;

            /**
             * FileDescriptorProto weakDependency.
             * @type {Array.<number>}
             */
            $prototype.weakDependency = $protobuf.util.emptyArray;

            /**
             * FileDescriptorProto messageType.
             * @type {Array.<google.protobuf.DescriptorProto>}
             */
            $prototype.messageType = $protobuf.util.emptyArray;

            /**
             * FileDescriptorProto enumType.
             * @type {Array.<google.protobuf.EnumDescriptorProto>}
             */
            $prototype.enumType = $protobuf.util.emptyArray;

            /**
             * FileDescriptorProto service.
             * @type {Array.<google.protobuf.ServiceDescriptorProto>}
             */
            $prototype.service = $protobuf.util.emptyArray;

            /**
             * FileDescriptorProto extension.
             * @type {Array.<google.protobuf.FieldDescriptorProto>}
             */
            $prototype.extension = $protobuf.util.emptyArray;

            /**
             * FileDescriptorProto options.
             * @type {google.protobuf.FileOptions}
             */
            $prototype.options = null;

            /**
             * FileDescriptorProto sourceCodeInfo.
             * @type {google.protobuf.SourceCodeInfo}
             */
            $prototype.sourceCodeInfo = null;

            /**
             * FileDescriptorProto syntax.
             * @type {string}
             */
            $prototype.syntax = "";

            // Referenced types
            var $types = [null, null, null, null, null, "google.protobuf.DescriptorProto", "google.protobuf.EnumDescriptorProto", "google.protobuf.ServiceDescriptorProto", "google.protobuf.FieldDescriptorProto", "google.protobuf.FileOptions", "google.protobuf.SourceCodeInfo", null]; $lazyTypes.push($types);

            /**
             * Creates a new FileDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto instance
             */
            FileDescriptorProto.create = function create(properties) {
                return new FileDescriptorProto(properties);
            };

            /**
             * Encodes the specified FileDescriptorProto message.
             * @function
             * @param {google.protobuf.FileDescriptorProto|Object} message FileDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileDescriptorProto.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.name !== undefined && message.name !== "") {
                    writer.uint32(10).string(message.name);
                }
                if (message["package"] !== undefined && message["package"] !== "") {
                    writer.uint32(18).string(message["package"]);
                }
                if (message.dependency) {
                    for (var i = 0; i < message.dependency.length; ++i) {
                        writer.uint32(26).string(message.dependency[i]);
                    }
                }
                if (message.publicDependency) {
                    for (var i = 0; i < message.publicDependency.length; ++i) {
                        writer.uint32(80).int32(message.publicDependency[i]);
                    }
                }
                if (message.weakDependency) {
                    for (var i = 0; i < message.weakDependency.length; ++i) {
                        writer.uint32(88).int32(message.weakDependency[i]);
                    }
                }
                if (message.messageType) {
                    for (var i = 0; i < message.messageType.length; ++i) {
                        types[5].encode(message.messageType[i], writer.uint32(34).fork()).ldelim();
                    }
                }
                if (message.enumType) {
                    for (var i = 0; i < message.enumType.length; ++i) {
                        types[6].encode(message.enumType[i], writer.uint32(42).fork()).ldelim();
                    }
                }
                if (message.service) {
                    for (var i = 0; i < message.service.length; ++i) {
                        types[7].encode(message.service[i], writer.uint32(50).fork()).ldelim();
                    }
                }
                if (message.extension) {
                    for (var i = 0; i < message.extension.length; ++i) {
                        types[8].encode(message.extension[i], writer.uint32(58).fork()).ldelim();
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    types[9].encode(message.options, writer.uint32(66).fork()).ldelim();
                }
                if (message.sourceCodeInfo !== undefined && message.sourceCodeInfo !== null) {
                    types[10].encode(message.sourceCodeInfo, writer.uint32(74).fork()).ldelim();
                }
                if (message.syntax !== undefined && message.syntax !== "") {
                    writer.uint32(98).string(message.syntax);
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified FileDescriptorProto message, length delimited.
             * @param {google.protobuf.FileDescriptorProto|Object} message FileDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FileDescriptorProto message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto
             */
            FileDescriptorProto.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.FileDescriptorProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;

                    case 2:
                        message["package"] = reader.string();
                        break;

                    case 3:
                        if (!(message.dependency && message.dependency.length)) {
                            message.dependency = [];
                        }
                        message.dependency.push(reader.string());
                        break;

                    case 10:
                        if (!(message.publicDependency && message.publicDependency.length)) {
                            message.publicDependency = [];
                        }
                        message.publicDependency.push(reader.int32());
                        break;

                    case 11:
                        if (!(message.weakDependency && message.weakDependency.length)) {
                            message.weakDependency = [];
                        }
                        message.weakDependency.push(reader.int32());
                        break;

                    case 4:
                        if (!(message.messageType && message.messageType.length)) {
                            message.messageType = [];
                        }
                        message.messageType.push(types[5].decode(reader, reader.uint32()));
                        break;

                    case 5:
                        if (!(message.enumType && message.enumType.length)) {
                            message.enumType = [];
                        }
                        message.enumType.push(types[6].decode(reader, reader.uint32()));
                        break;

                    case 6:
                        if (!(message.service && message.service.length)) {
                            message.service = [];
                        }
                        message.service.push(types[7].decode(reader, reader.uint32()));
                        break;

                    case 7:
                        if (!(message.extension && message.extension.length)) {
                            message.extension = [];
                        }
                        message.extension.push(types[8].decode(reader, reader.uint32()));
                        break;

                    case 8:
                        message.options = types[9].decode(reader, reader.uint32());
                        break;

                    case 9:
                        message.sourceCodeInfo = types[10].decode(reader, reader.uint32());
                        break;

                    case 12:
                        message.syntax = reader.string();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a FileDescriptorProto message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto
             */
            FileDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FileDescriptorProto message.
             * @function
             * @param {google.protobuf.FileDescriptorProto|Object} message FileDescriptorProto message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FileDescriptorProto.verify = (function(util, types) { return function verify(message) {
                if (message.name !== undefined) {
                    if (!util.isString(message.name)) {
                        return "google.protobuf.FileDescriptorProto.name: string expected";
                    }
                }
                if (message["package"] !== undefined) {
                    if (!util.isString(message["package"])) {
                        return "google.protobuf.FileDescriptorProto.package: string expected";
                    }
                }
                if (message.dependency !== undefined) {
                    if (!Array.isArray(message.dependency)) {
                        return "google.protobuf.FileDescriptorProto.dependency: array expected";
                    }
                    for (var i = 0; i < message.dependency.length; ++i) {
                        if (!util.isString(message.dependency[i])) {
                            return "google.protobuf.FileDescriptorProto.dependency: string[] expected";
                        }
                    }
                }
                if (message.publicDependency !== undefined) {
                    if (!Array.isArray(message.publicDependency)) {
                        return "google.protobuf.FileDescriptorProto.publicDependency: array expected";
                    }
                    for (var i = 0; i < message.publicDependency.length; ++i) {
                        if (!util.isInteger(message.publicDependency[i])) {
                            return "google.protobuf.FileDescriptorProto.publicDependency: integer[] expected";
                        }
                    }
                }
                if (message.weakDependency !== undefined) {
                    if (!Array.isArray(message.weakDependency)) {
                        return "google.protobuf.FileDescriptorProto.weakDependency: array expected";
                    }
                    for (var i = 0; i < message.weakDependency.length; ++i) {
                        if (!util.isInteger(message.weakDependency[i])) {
                            return "google.protobuf.FileDescriptorProto.weakDependency: integer[] expected";
                        }
                    }
                }
                if (message.messageType !== undefined) {
                    if (!Array.isArray(message.messageType)) {
                        return "google.protobuf.FileDescriptorProto.messageType: array expected";
                    }
                    for (var i = 0; i < message.messageType.length; ++i) {
                        var err;
                        if (err = types[5].verify(message.messageType[i])) {
                            return err;
                        }
                    }
                }
                if (message.enumType !== undefined) {
                    if (!Array.isArray(message.enumType)) {
                        return "google.protobuf.FileDescriptorProto.enumType: array expected";
                    }
                    for (var i = 0; i < message.enumType.length; ++i) {
                        var err;
                        if (err = types[6].verify(message.enumType[i])) {
                            return err;
                        }
                    }
                }
                if (message.service !== undefined) {
                    if (!Array.isArray(message.service)) {
                        return "google.protobuf.FileDescriptorProto.service: array expected";
                    }
                    for (var i = 0; i < message.service.length; ++i) {
                        var err;
                        if (err = types[7].verify(message.service[i])) {
                            return err;
                        }
                    }
                }
                if (message.extension !== undefined) {
                    if (!Array.isArray(message.extension)) {
                        return "google.protobuf.FileDescriptorProto.extension: array expected";
                    }
                    for (var i = 0; i < message.extension.length; ++i) {
                        var err;
                        if (err = types[8].verify(message.extension[i])) {
                            return err;
                        }
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var err;
                    if (err = types[9].verify(message.options)) {
                        return err;
                    }
                }
                if (message.sourceCodeInfo !== undefined && message.sourceCodeInfo !== null) {
                    var err;
                    if (err = types[10].verify(message.sourceCodeInfo)) {
                        return err;
                    }
                }
                if (message.syntax !== undefined) {
                    if (!util.isString(message.syntax)) {
                        return "google.protobuf.FileDescriptorProto.syntax: string expected";
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a FileDescriptorProto message.
             * @function
             * @param {google.protobuf.FileDescriptorProto|Object} source FileDescriptorProto message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.FileDescriptorProto|Object} Converted message
             */
            FileDescriptorProto.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.name === undefined && options.defaults) {
                        dst.name = "";
                    }
                    if (dst["package"] === undefined && options.defaults) {
                        dst["package"] = "";
                    }
                    if (src.dependency && src.dependency.length) {
                        dst.dependency = [];
                        for (var i = 0; i < src.dependency.length; ++i) {
                            dst.dependency.push(src.dependency[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.dependency = [];
                        }
                    }
                    if (src.publicDependency && src.publicDependency.length) {
                        dst.publicDependency = [];
                        for (var i = 0; i < src.publicDependency.length; ++i) {
                            dst.publicDependency.push(src.publicDependency[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.publicDependency = [];
                        }
                    }
                    if (src.weakDependency && src.weakDependency.length) {
                        dst.weakDependency = [];
                        for (var i = 0; i < src.weakDependency.length; ++i) {
                            dst.weakDependency.push(src.weakDependency[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.weakDependency = [];
                        }
                    }
                    if (src.messageType && src.messageType.length) {
                        dst.messageType = [];
                        for (var i = 0; i < src.messageType.length; ++i) {
                            dst.messageType.push(types[5].convert(src.messageType[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.messageType = [];
                        }
                    }
                    if (src.enumType && src.enumType.length) {
                        dst.enumType = [];
                        for (var i = 0; i < src.enumType.length; ++i) {
                            dst.enumType.push(types[6].convert(src.enumType[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.enumType = [];
                        }
                    }
                    if (src.service && src.service.length) {
                        dst.service = [];
                        for (var i = 0; i < src.service.length; ++i) {
                            dst.service.push(types[7].convert(src.service[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.service = [];
                        }
                    }
                    if (src.extension && src.extension.length) {
                        dst.extension = [];
                        for (var i = 0; i < src.extension.length; ++i) {
                            dst.extension.push(types[8].convert(src.extension[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.extension = [];
                        }
                    }
                    dst.options = types[9].convert(src.options, impl, options);
                    dst.sourceCodeInfo = types[10].convert(src.sourceCodeInfo, impl, options);
                    if (dst.syntax === undefined && options.defaults) {
                        dst.syntax = "";
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a FileDescriptorProto message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto
             */
            FileDescriptorProto.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this FileDescriptorProto message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return FileDescriptorProto;
        })();

        protobuf.DescriptorProto = (function() {

            /**
             * Constructs a new DescriptorProto.
             * @exports google.protobuf.DescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function DescriptorProto(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.DescriptorProto.prototype */
            var $prototype = DescriptorProto.prototype;

            /**
             * DescriptorProto name.
             * @type {string}
             */
            $prototype.name = "";

            /**
             * DescriptorProto field.
             * @type {Array.<google.protobuf.FieldDescriptorProto>}
             */
            $prototype.field = $protobuf.util.emptyArray;

            /**
             * DescriptorProto extension.
             * @type {Array.<google.protobuf.FieldDescriptorProto>}
             */
            $prototype.extension = $protobuf.util.emptyArray;

            /**
             * DescriptorProto nestedType.
             * @type {Array.<google.protobuf.DescriptorProto>}
             */
            $prototype.nestedType = $protobuf.util.emptyArray;

            /**
             * DescriptorProto enumType.
             * @type {Array.<google.protobuf.EnumDescriptorProto>}
             */
            $prototype.enumType = $protobuf.util.emptyArray;

            /**
             * DescriptorProto extensionRange.
             * @type {Array.<google.protobuf.DescriptorProto.ExtensionRange>}
             */
            $prototype.extensionRange = $protobuf.util.emptyArray;

            /**
             * DescriptorProto oneofDecl.
             * @type {Array.<google.protobuf.OneofDescriptorProto>}
             */
            $prototype.oneofDecl = $protobuf.util.emptyArray;

            /**
             * DescriptorProto options.
             * @type {google.protobuf.MessageOptions}
             */
            $prototype.options = null;

            /**
             * DescriptorProto reservedRange.
             * @type {Array.<google.protobuf.DescriptorProto.ReservedRange>}
             */
            $prototype.reservedRange = $protobuf.util.emptyArray;

            /**
             * DescriptorProto reservedName.
             * @type {Array.<string>}
             */
            $prototype.reservedName = $protobuf.util.emptyArray;

            // Referenced types
            var $types = [null, "google.protobuf.FieldDescriptorProto", "google.protobuf.FieldDescriptorProto", "google.protobuf.DescriptorProto", "google.protobuf.EnumDescriptorProto", "google.protobuf.DescriptorProto.ExtensionRange", "google.protobuf.OneofDescriptorProto", "google.protobuf.MessageOptions", "google.protobuf.DescriptorProto.ReservedRange", null]; $lazyTypes.push($types);

            /**
             * Creates a new DescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.DescriptorProto} DescriptorProto instance
             */
            DescriptorProto.create = function create(properties) {
                return new DescriptorProto(properties);
            };

            /**
             * Encodes the specified DescriptorProto message.
             * @function
             * @param {google.protobuf.DescriptorProto|Object} message DescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DescriptorProto.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.name !== undefined && message.name !== "") {
                    writer.uint32(10).string(message.name);
                }
                if (message.field) {
                    for (var i = 0; i < message.field.length; ++i) {
                        types[1].encode(message.field[i], writer.uint32(18).fork()).ldelim();
                    }
                }
                if (message.extension) {
                    for (var i = 0; i < message.extension.length; ++i) {
                        types[2].encode(message.extension[i], writer.uint32(50).fork()).ldelim();
                    }
                }
                if (message.nestedType) {
                    for (var i = 0; i < message.nestedType.length; ++i) {
                        types[3].encode(message.nestedType[i], writer.uint32(26).fork()).ldelim();
                    }
                }
                if (message.enumType) {
                    for (var i = 0; i < message.enumType.length; ++i) {
                        types[4].encode(message.enumType[i], writer.uint32(34).fork()).ldelim();
                    }
                }
                if (message.extensionRange) {
                    for (var i = 0; i < message.extensionRange.length; ++i) {
                        types[5].encode(message.extensionRange[i], writer.uint32(42).fork()).ldelim();
                    }
                }
                if (message.oneofDecl) {
                    for (var i = 0; i < message.oneofDecl.length; ++i) {
                        types[6].encode(message.oneofDecl[i], writer.uint32(66).fork()).ldelim();
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    types[7].encode(message.options, writer.uint32(58).fork()).ldelim();
                }
                if (message.reservedRange) {
                    for (var i = 0; i < message.reservedRange.length; ++i) {
                        types[8].encode(message.reservedRange[i], writer.uint32(74).fork()).ldelim();
                    }
                }
                if (message.reservedName) {
                    for (var i = 0; i < message.reservedName.length; ++i) {
                        writer.uint32(82).string(message.reservedName[i]);
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified DescriptorProto message, length delimited.
             * @param {google.protobuf.DescriptorProto|Object} message DescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DescriptorProto message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.DescriptorProto} DescriptorProto
             */
            DescriptorProto.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.DescriptorProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;

                    case 2:
                        if (!(message.field && message.field.length)) {
                            message.field = [];
                        }
                        message.field.push(types[1].decode(reader, reader.uint32()));
                        break;

                    case 6:
                        if (!(message.extension && message.extension.length)) {
                            message.extension = [];
                        }
                        message.extension.push(types[2].decode(reader, reader.uint32()));
                        break;

                    case 3:
                        if (!(message.nestedType && message.nestedType.length)) {
                            message.nestedType = [];
                        }
                        message.nestedType.push(types[3].decode(reader, reader.uint32()));
                        break;

                    case 4:
                        if (!(message.enumType && message.enumType.length)) {
                            message.enumType = [];
                        }
                        message.enumType.push(types[4].decode(reader, reader.uint32()));
                        break;

                    case 5:
                        if (!(message.extensionRange && message.extensionRange.length)) {
                            message.extensionRange = [];
                        }
                        message.extensionRange.push(types[5].decode(reader, reader.uint32()));
                        break;

                    case 8:
                        if (!(message.oneofDecl && message.oneofDecl.length)) {
                            message.oneofDecl = [];
                        }
                        message.oneofDecl.push(types[6].decode(reader, reader.uint32()));
                        break;

                    case 7:
                        message.options = types[7].decode(reader, reader.uint32());
                        break;

                    case 9:
                        if (!(message.reservedRange && message.reservedRange.length)) {
                            message.reservedRange = [];
                        }
                        message.reservedRange.push(types[8].decode(reader, reader.uint32()));
                        break;

                    case 10:
                        if (!(message.reservedName && message.reservedName.length)) {
                            message.reservedName = [];
                        }
                        message.reservedName.push(reader.string());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a DescriptorProto message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.DescriptorProto} DescriptorProto
             */
            DescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a DescriptorProto message.
             * @function
             * @param {google.protobuf.DescriptorProto|Object} message DescriptorProto message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            DescriptorProto.verify = (function(util, types) { return function verify(message) {
                if (message.name !== undefined) {
                    if (!util.isString(message.name)) {
                        return "google.protobuf.DescriptorProto.name: string expected";
                    }
                }
                if (message.field !== undefined) {
                    if (!Array.isArray(message.field)) {
                        return "google.protobuf.DescriptorProto.field: array expected";
                    }
                    for (var i = 0; i < message.field.length; ++i) {
                        var err;
                        if (err = types[1].verify(message.field[i])) {
                            return err;
                        }
                    }
                }
                if (message.extension !== undefined) {
                    if (!Array.isArray(message.extension)) {
                        return "google.protobuf.DescriptorProto.extension: array expected";
                    }
                    for (var i = 0; i < message.extension.length; ++i) {
                        var err;
                        if (err = types[2].verify(message.extension[i])) {
                            return err;
                        }
                    }
                }
                if (message.nestedType !== undefined) {
                    if (!Array.isArray(message.nestedType)) {
                        return "google.protobuf.DescriptorProto.nestedType: array expected";
                    }
                    for (var i = 0; i < message.nestedType.length; ++i) {
                        var err;
                        if (err = types[3].verify(message.nestedType[i])) {
                            return err;
                        }
                    }
                }
                if (message.enumType !== undefined) {
                    if (!Array.isArray(message.enumType)) {
                        return "google.protobuf.DescriptorProto.enumType: array expected";
                    }
                    for (var i = 0; i < message.enumType.length; ++i) {
                        var err;
                        if (err = types[4].verify(message.enumType[i])) {
                            return err;
                        }
                    }
                }
                if (message.extensionRange !== undefined) {
                    if (!Array.isArray(message.extensionRange)) {
                        return "google.protobuf.DescriptorProto.extensionRange: array expected";
                    }
                    for (var i = 0; i < message.extensionRange.length; ++i) {
                        var err;
                        if (err = types[5].verify(message.extensionRange[i])) {
                            return err;
                        }
                    }
                }
                if (message.oneofDecl !== undefined) {
                    if (!Array.isArray(message.oneofDecl)) {
                        return "google.protobuf.DescriptorProto.oneofDecl: array expected";
                    }
                    for (var i = 0; i < message.oneofDecl.length; ++i) {
                        var err;
                        if (err = types[6].verify(message.oneofDecl[i])) {
                            return err;
                        }
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var err;
                    if (err = types[7].verify(message.options)) {
                        return err;
                    }
                }
                if (message.reservedRange !== undefined) {
                    if (!Array.isArray(message.reservedRange)) {
                        return "google.protobuf.DescriptorProto.reservedRange: array expected";
                    }
                    for (var i = 0; i < message.reservedRange.length; ++i) {
                        var err;
                        if (err = types[8].verify(message.reservedRange[i])) {
                            return err;
                        }
                    }
                }
                if (message.reservedName !== undefined) {
                    if (!Array.isArray(message.reservedName)) {
                        return "google.protobuf.DescriptorProto.reservedName: array expected";
                    }
                    for (var i = 0; i < message.reservedName.length; ++i) {
                        if (!util.isString(message.reservedName[i])) {
                            return "google.protobuf.DescriptorProto.reservedName: string[] expected";
                        }
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a DescriptorProto message.
             * @function
             * @param {google.protobuf.DescriptorProto|Object} source DescriptorProto message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.DescriptorProto|Object} Converted message
             */
            DescriptorProto.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.name === undefined && options.defaults) {
                        dst.name = "";
                    }
                    if (src.field && src.field.length) {
                        dst.field = [];
                        for (var i = 0; i < src.field.length; ++i) {
                            dst.field.push(types[1].convert(src.field[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.field = [];
                        }
                    }
                    if (src.extension && src.extension.length) {
                        dst.extension = [];
                        for (var i = 0; i < src.extension.length; ++i) {
                            dst.extension.push(types[2].convert(src.extension[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.extension = [];
                        }
                    }
                    if (src.nestedType && src.nestedType.length) {
                        dst.nestedType = [];
                        for (var i = 0; i < src.nestedType.length; ++i) {
                            dst.nestedType.push(types[3].convert(src.nestedType[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.nestedType = [];
                        }
                    }
                    if (src.enumType && src.enumType.length) {
                        dst.enumType = [];
                        for (var i = 0; i < src.enumType.length; ++i) {
                            dst.enumType.push(types[4].convert(src.enumType[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.enumType = [];
                        }
                    }
                    if (src.extensionRange && src.extensionRange.length) {
                        dst.extensionRange = [];
                        for (var i = 0; i < src.extensionRange.length; ++i) {
                            dst.extensionRange.push(types[5].convert(src.extensionRange[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.extensionRange = [];
                        }
                    }
                    if (src.oneofDecl && src.oneofDecl.length) {
                        dst.oneofDecl = [];
                        for (var i = 0; i < src.oneofDecl.length; ++i) {
                            dst.oneofDecl.push(types[6].convert(src.oneofDecl[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.oneofDecl = [];
                        }
                    }
                    dst.options = types[7].convert(src.options, impl, options);
                    if (src.reservedRange && src.reservedRange.length) {
                        dst.reservedRange = [];
                        for (var i = 0; i < src.reservedRange.length; ++i) {
                            dst.reservedRange.push(types[8].convert(src.reservedRange[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.reservedRange = [];
                        }
                    }
                    if (src.reservedName && src.reservedName.length) {
                        dst.reservedName = [];
                        for (var i = 0; i < src.reservedName.length; ++i) {
                            dst.reservedName.push(src.reservedName[i]);
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.reservedName = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a DescriptorProto message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.DescriptorProto} DescriptorProto
             */
            DescriptorProto.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this DescriptorProto message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            DescriptorProto.ExtensionRange = (function() {

                /**
                 * Constructs a new ExtensionRange.
                 * @exports google.protobuf.DescriptorProto.ExtensionRange
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                function ExtensionRange(properties) {
                    if (properties) {
                        var keys = Object.keys(properties);
                        for (var i = 0; i < keys.length; ++i)
                            this[keys[i]] = properties[keys[i]];
                    }
                }

                /** @alias google.protobuf.DescriptorProto.ExtensionRange.prototype */
                var $prototype = ExtensionRange.prototype;

                /**
                 * ExtensionRange start.
                 * @type {number}
                 */
                $prototype.start = 0;

                /**
                 * ExtensionRange end.
                 * @type {number}
                 */
                $prototype.end = 0;

                /**
                 * Creates a new ExtensionRange instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange instance
                 */
                ExtensionRange.create = function create(properties) {
                    return new ExtensionRange(properties);
                };

                /**
                 * Encodes the specified ExtensionRange message.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ExtensionRange|Object} message ExtensionRange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ExtensionRange.encode = (function(Writer) { return function encode(message, writer) {
                    if (!writer) {
                        writer = Writer.create();
                    }
                    if (message.start !== undefined && message.start !== 0) {
                        writer.uint32(8).int32(message.start);
                    }
                    if (message.end !== undefined && message.end !== 0) {
                        writer.uint32(16).int32(message.end);
                    }
                    return writer;
                };})($protobuf.Writer);

                /**
                 * Encodes the specified ExtensionRange message, length delimited.
                 * @param {google.protobuf.DescriptorProto.ExtensionRange|Object} message ExtensionRange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ExtensionRange.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an ExtensionRange message from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange
                 */
                ExtensionRange.decode = (function(Reader) { return function decode(reader, len) {
                    if (!(reader instanceof Reader)) {
                        reader = Reader.create(reader);
                    }
                    var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.DescriptorProto.ExtensionRange();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.start = reader.int32();
                            break;

                        case 2:
                            message.end = reader.int32();
                            break;

                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };})($protobuf.Reader);

                /**
                 * Decodes an ExtensionRange message from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange
                 */
                ExtensionRange.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies an ExtensionRange message.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ExtensionRange|Object} message ExtensionRange message or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                ExtensionRange.verify = (function(util) { return function verify(message) {
                    if (message.start !== undefined) {
                        if (!util.isInteger(message.start)) {
                            return "google.protobuf.DescriptorProto.ExtensionRange.start: integer expected";
                        }
                    }
                    if (message.end !== undefined) {
                        if (!util.isInteger(message.end)) {
                            return "google.protobuf.DescriptorProto.ExtensionRange.end: integer expected";
                        }
                    }
                    return null;
                };})($protobuf.util);

                /**
                 * Converts an ExtensionRange message.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ExtensionRange|Object} source ExtensionRange message or plain object to convert
                 * @param {*} impl Converter implementation to use
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange|Object} Converted message
                 */
                ExtensionRange.convert = (function() { return function convert(src, impl, options) {
                    if (!options) {
                        options = {};
                    }
                    var dst = impl.create(src, this, options);
                    if (dst) {
                        if (dst.start === undefined && options.defaults) {
                            dst.start = 0;
                        }
                        if (dst.end === undefined && options.defaults) {
                            dst.end = 0;
                        }
                    }
                    return dst;
                };})();

                /**
                 * Creates an ExtensionRange message from JSON.
                 * @param {Object.<string,*>} source Source object
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange
                 */
                ExtensionRange.from = function from(source, options) {
                    return this.convert(source, $protobuf.converters.message, options);
                };

                /**
                 * Converts this ExtensionRange message to JSON.
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {Object.<string,*>} JSON object
                 */
                $prototype.asJSON = function asJSON(options) {
                    return this.constructor.convert(this, $protobuf.converters.json, options);
                };

                return ExtensionRange;
            })();

            DescriptorProto.ReservedRange = (function() {

                /**
                 * Constructs a new ReservedRange.
                 * @exports google.protobuf.DescriptorProto.ReservedRange
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                function ReservedRange(properties) {
                    if (properties) {
                        var keys = Object.keys(properties);
                        for (var i = 0; i < keys.length; ++i)
                            this[keys[i]] = properties[keys[i]];
                    }
                }

                /** @alias google.protobuf.DescriptorProto.ReservedRange.prototype */
                var $prototype = ReservedRange.prototype;

                /**
                 * ReservedRange start.
                 * @type {number}
                 */
                $prototype.start = 0;

                /**
                 * ReservedRange end.
                 * @type {number}
                 */
                $prototype.end = 0;

                /**
                 * Creates a new ReservedRange instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange instance
                 */
                ReservedRange.create = function create(properties) {
                    return new ReservedRange(properties);
                };

                /**
                 * Encodes the specified ReservedRange message.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ReservedRange|Object} message ReservedRange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ReservedRange.encode = (function(Writer) { return function encode(message, writer) {
                    if (!writer) {
                        writer = Writer.create();
                    }
                    if (message.start !== undefined && message.start !== 0) {
                        writer.uint32(8).int32(message.start);
                    }
                    if (message.end !== undefined && message.end !== 0) {
                        writer.uint32(16).int32(message.end);
                    }
                    return writer;
                };})($protobuf.Writer);

                /**
                 * Encodes the specified ReservedRange message, length delimited.
                 * @param {google.protobuf.DescriptorProto.ReservedRange|Object} message ReservedRange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ReservedRange.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ReservedRange message from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange
                 */
                ReservedRange.decode = (function(Reader) { return function decode(reader, len) {
                    if (!(reader instanceof Reader)) {
                        reader = Reader.create(reader);
                    }
                    var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.DescriptorProto.ReservedRange();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.start = reader.int32();
                            break;

                        case 2:
                            message.end = reader.int32();
                            break;

                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };})($protobuf.Reader);

                /**
                 * Decodes a ReservedRange message from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange
                 */
                ReservedRange.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a ReservedRange message.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ReservedRange|Object} message ReservedRange message or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                ReservedRange.verify = (function(util) { return function verify(message) {
                    if (message.start !== undefined) {
                        if (!util.isInteger(message.start)) {
                            return "google.protobuf.DescriptorProto.ReservedRange.start: integer expected";
                        }
                    }
                    if (message.end !== undefined) {
                        if (!util.isInteger(message.end)) {
                            return "google.protobuf.DescriptorProto.ReservedRange.end: integer expected";
                        }
                    }
                    return null;
                };})($protobuf.util);

                /**
                 * Converts a ReservedRange message.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ReservedRange|Object} source ReservedRange message or plain object to convert
                 * @param {*} impl Converter implementation to use
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {google.protobuf.DescriptorProto.ReservedRange|Object} Converted message
                 */
                ReservedRange.convert = (function() { return function convert(src, impl, options) {
                    if (!options) {
                        options = {};
                    }
                    var dst = impl.create(src, this, options);
                    if (dst) {
                        if (dst.start === undefined && options.defaults) {
                            dst.start = 0;
                        }
                        if (dst.end === undefined && options.defaults) {
                            dst.end = 0;
                        }
                    }
                    return dst;
                };})();

                /**
                 * Creates a ReservedRange message from JSON.
                 * @param {Object.<string,*>} source Source object
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange
                 */
                ReservedRange.from = function from(source, options) {
                    return this.convert(source, $protobuf.converters.message, options);
                };

                /**
                 * Converts this ReservedRange message to JSON.
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {Object.<string,*>} JSON object
                 */
                $prototype.asJSON = function asJSON(options) {
                    return this.constructor.convert(this, $protobuf.converters.json, options);
                };

                return ReservedRange;
            })();

            return DescriptorProto;
        })();

        protobuf.FieldDescriptorProto = (function() {

            /**
             * Constructs a new FieldDescriptorProto.
             * @exports google.protobuf.FieldDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function FieldDescriptorProto(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.FieldDescriptorProto.prototype */
            var $prototype = FieldDescriptorProto.prototype;

            /**
             * FieldDescriptorProto name.
             * @type {string}
             */
            $prototype.name = "";

            /**
             * FieldDescriptorProto number.
             * @type {number}
             */
            $prototype.number = 0;

            /**
             * FieldDescriptorProto label.
             * @type {number}
             */
            $prototype.label = 0;

            /**
             * FieldDescriptorProto type.
             * @type {number}
             */
            $prototype.type = 0;

            /**
             * FieldDescriptorProto typeName.
             * @type {string}
             */
            $prototype.typeName = "";

            /**
             * FieldDescriptorProto extendee.
             * @type {string}
             */
            $prototype.extendee = "";

            /**
             * FieldDescriptorProto defaultValue.
             * @type {string}
             */
            $prototype.defaultValue = "";

            /**
             * FieldDescriptorProto oneofIndex.
             * @type {number}
             */
            $prototype.oneofIndex = 0;

            /**
             * FieldDescriptorProto jsonName.
             * @type {string}
             */
            $prototype.jsonName = "";

            /**
             * FieldDescriptorProto options.
             * @type {google.protobuf.FieldOptions}
             */
            $prototype.options = null;

            // Referenced types
            var $types = [null, null, "google.protobuf.FieldDescriptorProto.Label", "google.protobuf.FieldDescriptorProto.Type", null, null, null, null, null, "google.protobuf.FieldOptions"]; $lazyTypes.push($types);

            /**
             * Creates a new FieldDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto instance
             */
            FieldDescriptorProto.create = function create(properties) {
                return new FieldDescriptorProto(properties);
            };

            /**
             * Encodes the specified FieldDescriptorProto message.
             * @function
             * @param {google.protobuf.FieldDescriptorProto|Object} message FieldDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FieldDescriptorProto.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.name !== undefined && message.name !== "") {
                    writer.uint32(10).string(message.name);
                }
                if (message.number !== undefined && message.number !== 0) {
                    writer.uint32(24).int32(message.number);
                }
                if (message.label !== undefined && message.label !== 0) {
                    writer.uint32(32).uint32(message.label);
                }
                if (message.type !== undefined && message.type !== 0) {
                    writer.uint32(40).uint32(message.type);
                }
                if (message.typeName !== undefined && message.typeName !== "") {
                    writer.uint32(50).string(message.typeName);
                }
                if (message.extendee !== undefined && message.extendee !== "") {
                    writer.uint32(18).string(message.extendee);
                }
                if (message.defaultValue !== undefined && message.defaultValue !== "") {
                    writer.uint32(58).string(message.defaultValue);
                }
                if (message.oneofIndex !== undefined && message.oneofIndex !== 0) {
                    writer.uint32(72).int32(message.oneofIndex);
                }
                if (message.jsonName !== undefined && message.jsonName !== "") {
                    writer.uint32(82).string(message.jsonName);
                }
                if (message.options !== undefined && message.options !== null) {
                    types[9].encode(message.options, writer.uint32(66).fork()).ldelim();
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified FieldDescriptorProto message, length delimited.
             * @param {google.protobuf.FieldDescriptorProto|Object} message FieldDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FieldDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto
             */
            FieldDescriptorProto.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.FieldDescriptorProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;

                    case 3:
                        message.number = reader.int32();
                        break;

                    case 4:
                        message.label = reader.uint32();
                        break;

                    case 5:
                        message.type = reader.uint32();
                        break;

                    case 6:
                        message.typeName = reader.string();
                        break;

                    case 2:
                        message.extendee = reader.string();
                        break;

                    case 7:
                        message.defaultValue = reader.string();
                        break;

                    case 9:
                        message.oneofIndex = reader.int32();
                        break;

                    case 10:
                        message.jsonName = reader.string();
                        break;

                    case 8:
                        message.options = types[9].decode(reader, reader.uint32());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto
             */
            FieldDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FieldDescriptorProto message.
             * @function
             * @param {google.protobuf.FieldDescriptorProto|Object} message FieldDescriptorProto message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FieldDescriptorProto.verify = (function(util, types) { return function verify(message) {
                if (message.name !== undefined) {
                    if (!util.isString(message.name)) {
                        return "google.protobuf.FieldDescriptorProto.name: string expected";
                    }
                }
                if (message.number !== undefined) {
                    if (!util.isInteger(message.number)) {
                        return "google.protobuf.FieldDescriptorProto.number: integer expected";
                    }
                }
                if (message.label !== undefined) {
                    switch (message.label) {
                    default:
                        return "google.protobuf.FieldDescriptorProto.label: enum value expected";

                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                }
                if (message.type !== undefined) {
                    switch (message.type) {
                    default:
                        return "google.protobuf.FieldDescriptorProto.type: enum value expected";

                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                        break;
                    }
                }
                if (message.typeName !== undefined) {
                    if (!util.isString(message.typeName)) {
                        return "google.protobuf.FieldDescriptorProto.typeName: string expected";
                    }
                }
                if (message.extendee !== undefined) {
                    if (!util.isString(message.extendee)) {
                        return "google.protobuf.FieldDescriptorProto.extendee: string expected";
                    }
                }
                if (message.defaultValue !== undefined) {
                    if (!util.isString(message.defaultValue)) {
                        return "google.protobuf.FieldDescriptorProto.defaultValue: string expected";
                    }
                }
                if (message.oneofIndex !== undefined) {
                    if (!util.isInteger(message.oneofIndex)) {
                        return "google.protobuf.FieldDescriptorProto.oneofIndex: integer expected";
                    }
                }
                if (message.jsonName !== undefined) {
                    if (!util.isString(message.jsonName)) {
                        return "google.protobuf.FieldDescriptorProto.jsonName: string expected";
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var err;
                    if (err = types[9].verify(message.options)) {
                        return err;
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a FieldDescriptorProto message.
             * @function
             * @param {google.protobuf.FieldDescriptorProto|Object} source FieldDescriptorProto message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.FieldDescriptorProto|Object} Converted message
             */
            FieldDescriptorProto.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.name === undefined && options.defaults) {
                        dst.name = "";
                    }
                    if (dst.number === undefined && options.defaults) {
                        dst.number = 0;
                    }
                    dst.label = impl.enums(src.label, 0, types[2], options);
                    dst.type = impl.enums(src.type, 0, types[3].values, options);
                    if (dst.typeName === undefined && options.defaults) {
                        dst.typeName = "";
                    }
                    if (dst.extendee === undefined && options.defaults) {
                        dst.extendee = "";
                    }
                    if (dst.defaultValue === undefined && options.defaults) {
                        dst.defaultValue = "";
                    }
                    if (dst.oneofIndex === undefined && options.defaults) {
                        dst.oneofIndex = 0;
                    }
                    if (dst.jsonName === undefined && options.defaults) {
                        dst.jsonName = "";
                    }
                    dst.options = types[9].convert(src.options, impl, options);
                }
                return dst;
            };})($types);

            /**
             * Creates a FieldDescriptorProto message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto
             */
            FieldDescriptorProto.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this FieldDescriptorProto message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            /**
             * Type enum.
             * @name Type
             * @memberof google.protobuf.FieldDescriptorProto
             * @enum {number}
             * @property {number} TYPE_DOUBLE=1 TYPE_DOUBLE value
             * @property {number} TYPE_FLOAT=2 TYPE_FLOAT value
             * @property {number} TYPE_INT64=3 TYPE_INT64 value
             * @property {number} TYPE_UINT64=4 TYPE_UINT64 value
             * @property {number} TYPE_INT32=5 TYPE_INT32 value
             * @property {number} TYPE_FIXED64=6 TYPE_FIXED64 value
             * @property {number} TYPE_FIXED32=7 TYPE_FIXED32 value
             * @property {number} TYPE_BOOL=8 TYPE_BOOL value
             * @property {number} TYPE_STRING=9 TYPE_STRING value
             * @property {number} TYPE_GROUP=10 TYPE_GROUP value
             * @property {number} TYPE_MESSAGE=11 TYPE_MESSAGE value
             * @property {number} TYPE_BYTES=12 TYPE_BYTES value
             * @property {number} TYPE_UINT32=13 TYPE_UINT32 value
             * @property {number} TYPE_ENUM=14 TYPE_ENUM value
             * @property {number} TYPE_SFIXED32=15 TYPE_SFIXED32 value
             * @property {number} TYPE_SFIXED64=16 TYPE_SFIXED64 value
             * @property {number} TYPE_SINT32=17 TYPE_SINT32 value
             * @property {number} TYPE_SINT64=18 TYPE_SINT64 value
             */
            FieldDescriptorProto.Type = (function() {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[valuesById[1] = "TYPE_DOUBLE"] = 1;
                values[valuesById[2] = "TYPE_FLOAT"] = 2;
                values[valuesById[3] = "TYPE_INT64"] = 3;
                values[valuesById[4] = "TYPE_UINT64"] = 4;
                values[valuesById[5] = "TYPE_INT32"] = 5;
                values[valuesById[6] = "TYPE_FIXED64"] = 6;
                values[valuesById[7] = "TYPE_FIXED32"] = 7;
                values[valuesById[8] = "TYPE_BOOL"] = 8;
                values[valuesById[9] = "TYPE_STRING"] = 9;
                values[valuesById[10] = "TYPE_GROUP"] = 10;
                values[valuesById[11] = "TYPE_MESSAGE"] = 11;
                values[valuesById[12] = "TYPE_BYTES"] = 12;
                values[valuesById[13] = "TYPE_UINT32"] = 13;
                values[valuesById[14] = "TYPE_ENUM"] = 14;
                values[valuesById[15] = "TYPE_SFIXED32"] = 15;
                values[valuesById[16] = "TYPE_SFIXED64"] = 16;
                values[valuesById[17] = "TYPE_SINT32"] = 17;
                values[valuesById[18] = "TYPE_SINT64"] = 18;
                return values;
            })();

            /**
             * Label enum.
             * @name Label
             * @memberof google.protobuf.FieldDescriptorProto
             * @enum {number}
             * @property {number} LABEL_OPTIONAL=1 LABEL_OPTIONAL value
             * @property {number} LABEL_REQUIRED=2 LABEL_REQUIRED value
             * @property {number} LABEL_REPEATED=3 LABEL_REPEATED value
             */
            FieldDescriptorProto.Label = (function() {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[valuesById[1] = "LABEL_OPTIONAL"] = 1;
                values[valuesById[2] = "LABEL_REQUIRED"] = 2;
                values[valuesById[3] = "LABEL_REPEATED"] = 3;
                return values;
            })();

            return FieldDescriptorProto;
        })();

        protobuf.OneofDescriptorProto = (function() {

            /**
             * Constructs a new OneofDescriptorProto.
             * @exports google.protobuf.OneofDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function OneofDescriptorProto(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.OneofDescriptorProto.prototype */
            var $prototype = OneofDescriptorProto.prototype;

            /**
             * OneofDescriptorProto name.
             * @type {string}
             */
            $prototype.name = "";

            /**
             * OneofDescriptorProto options.
             * @type {google.protobuf.OneofOptions}
             */
            $prototype.options = null;

            // Referenced types
            var $types = [null, "google.protobuf.OneofOptions"]; $lazyTypes.push($types);

            /**
             * Creates a new OneofDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto instance
             */
            OneofDescriptorProto.create = function create(properties) {
                return new OneofDescriptorProto(properties);
            };

            /**
             * Encodes the specified OneofDescriptorProto message.
             * @function
             * @param {google.protobuf.OneofDescriptorProto|Object} message OneofDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneofDescriptorProto.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.name !== undefined && message.name !== "") {
                    writer.uint32(10).string(message.name);
                }
                if (message.options !== undefined && message.options !== null) {
                    types[1].encode(message.options, writer.uint32(18).fork()).ldelim();
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified OneofDescriptorProto message, length delimited.
             * @param {google.protobuf.OneofDescriptorProto|Object} message OneofDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneofDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto
             */
            OneofDescriptorProto.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.OneofDescriptorProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;

                    case 2:
                        message.options = types[1].decode(reader, reader.uint32());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto
             */
            OneofDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an OneofDescriptorProto message.
             * @function
             * @param {google.protobuf.OneofDescriptorProto|Object} message OneofDescriptorProto message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            OneofDescriptorProto.verify = (function(util, types) { return function verify(message) {
                if (message.name !== undefined) {
                    if (!util.isString(message.name)) {
                        return "google.protobuf.OneofDescriptorProto.name: string expected";
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var err;
                    if (err = types[1].verify(message.options)) {
                        return err;
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts an OneofDescriptorProto message.
             * @function
             * @param {google.protobuf.OneofDescriptorProto|Object} source OneofDescriptorProto message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.OneofDescriptorProto|Object} Converted message
             */
            OneofDescriptorProto.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.name === undefined && options.defaults) {
                        dst.name = "";
                    }
                    dst.options = types[1].convert(src.options, impl, options);
                }
                return dst;
            };})($types);

            /**
             * Creates an OneofDescriptorProto message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto
             */
            OneofDescriptorProto.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this OneofDescriptorProto message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return OneofDescriptorProto;
        })();

        protobuf.EnumDescriptorProto = (function() {

            /**
             * Constructs a new EnumDescriptorProto.
             * @exports google.protobuf.EnumDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function EnumDescriptorProto(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.EnumDescriptorProto.prototype */
            var $prototype = EnumDescriptorProto.prototype;

            /**
             * EnumDescriptorProto name.
             * @type {string}
             */
            $prototype.name = "";

            /**
             * EnumDescriptorProto value.
             * @type {Array.<google.protobuf.EnumValueDescriptorProto>}
             */
            $prototype.value = $protobuf.util.emptyArray;

            /**
             * EnumDescriptorProto options.
             * @type {google.protobuf.EnumOptions}
             */
            $prototype.options = null;

            // Referenced types
            var $types = [null, "google.protobuf.EnumValueDescriptorProto", "google.protobuf.EnumOptions"]; $lazyTypes.push($types);

            /**
             * Creates a new EnumDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto instance
             */
            EnumDescriptorProto.create = function create(properties) {
                return new EnumDescriptorProto(properties);
            };

            /**
             * Encodes the specified EnumDescriptorProto message.
             * @function
             * @param {google.protobuf.EnumDescriptorProto|Object} message EnumDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumDescriptorProto.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.name !== undefined && message.name !== "") {
                    writer.uint32(10).string(message.name);
                }
                if (message.value) {
                    for (var i = 0; i < message.value.length; ++i) {
                        types[1].encode(message.value[i], writer.uint32(18).fork()).ldelim();
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    types[2].encode(message.options, writer.uint32(26).fork()).ldelim();
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified EnumDescriptorProto message, length delimited.
             * @param {google.protobuf.EnumDescriptorProto|Object} message EnumDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto
             */
            EnumDescriptorProto.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.EnumDescriptorProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;

                    case 2:
                        if (!(message.value && message.value.length)) {
                            message.value = [];
                        }
                        message.value.push(types[1].decode(reader, reader.uint32()));
                        break;

                    case 3:
                        message.options = types[2].decode(reader, reader.uint32());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto
             */
            EnumDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an EnumDescriptorProto message.
             * @function
             * @param {google.protobuf.EnumDescriptorProto|Object} message EnumDescriptorProto message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            EnumDescriptorProto.verify = (function(util, types) { return function verify(message) {
                if (message.name !== undefined) {
                    if (!util.isString(message.name)) {
                        return "google.protobuf.EnumDescriptorProto.name: string expected";
                    }
                }
                if (message.value !== undefined) {
                    if (!Array.isArray(message.value)) {
                        return "google.protobuf.EnumDescriptorProto.value: array expected";
                    }
                    for (var i = 0; i < message.value.length; ++i) {
                        var err;
                        if (err = types[1].verify(message.value[i])) {
                            return err;
                        }
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var err;
                    if (err = types[2].verify(message.options)) {
                        return err;
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts an EnumDescriptorProto message.
             * @function
             * @param {google.protobuf.EnumDescriptorProto|Object} source EnumDescriptorProto message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.EnumDescriptorProto|Object} Converted message
             */
            EnumDescriptorProto.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.name === undefined && options.defaults) {
                        dst.name = "";
                    }
                    if (src.value && src.value.length) {
                        dst.value = [];
                        for (var i = 0; i < src.value.length; ++i) {
                            dst.value.push(types[1].convert(src.value[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.value = [];
                        }
                    }
                    dst.options = types[2].convert(src.options, impl, options);
                }
                return dst;
            };})($types);

            /**
             * Creates an EnumDescriptorProto message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto
             */
            EnumDescriptorProto.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this EnumDescriptorProto message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return EnumDescriptorProto;
        })();

        protobuf.EnumValueDescriptorProto = (function() {

            /**
             * Constructs a new EnumValueDescriptorProto.
             * @exports google.protobuf.EnumValueDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function EnumValueDescriptorProto(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.EnumValueDescriptorProto.prototype */
            var $prototype = EnumValueDescriptorProto.prototype;

            /**
             * EnumValueDescriptorProto name.
             * @type {string}
             */
            $prototype.name = "";

            /**
             * EnumValueDescriptorProto number.
             * @type {number}
             */
            $prototype.number = 0;

            /**
             * EnumValueDescriptorProto options.
             * @type {google.protobuf.EnumValueOptions}
             */
            $prototype.options = null;

            // Referenced types
            var $types = [null, null, "google.protobuf.EnumValueOptions"]; $lazyTypes.push($types);

            /**
             * Creates a new EnumValueDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto instance
             */
            EnumValueDescriptorProto.create = function create(properties) {
                return new EnumValueDescriptorProto(properties);
            };

            /**
             * Encodes the specified EnumValueDescriptorProto message.
             * @function
             * @param {google.protobuf.EnumValueDescriptorProto|Object} message EnumValueDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumValueDescriptorProto.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.name !== undefined && message.name !== "") {
                    writer.uint32(10).string(message.name);
                }
                if (message.number !== undefined && message.number !== 0) {
                    writer.uint32(16).int32(message.number);
                }
                if (message.options !== undefined && message.options !== null) {
                    types[2].encode(message.options, writer.uint32(26).fork()).ldelim();
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified EnumValueDescriptorProto message, length delimited.
             * @param {google.protobuf.EnumValueDescriptorProto|Object} message EnumValueDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumValueDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto
             */
            EnumValueDescriptorProto.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.EnumValueDescriptorProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;

                    case 2:
                        message.number = reader.int32();
                        break;

                    case 3:
                        message.options = types[2].decode(reader, reader.uint32());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto
             */
            EnumValueDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an EnumValueDescriptorProto message.
             * @function
             * @param {google.protobuf.EnumValueDescriptorProto|Object} message EnumValueDescriptorProto message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            EnumValueDescriptorProto.verify = (function(util, types) { return function verify(message) {
                if (message.name !== undefined) {
                    if (!util.isString(message.name)) {
                        return "google.protobuf.EnumValueDescriptorProto.name: string expected";
                    }
                }
                if (message.number !== undefined) {
                    if (!util.isInteger(message.number)) {
                        return "google.protobuf.EnumValueDescriptorProto.number: integer expected";
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var err;
                    if (err = types[2].verify(message.options)) {
                        return err;
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts an EnumValueDescriptorProto message.
             * @function
             * @param {google.protobuf.EnumValueDescriptorProto|Object} source EnumValueDescriptorProto message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.EnumValueDescriptorProto|Object} Converted message
             */
            EnumValueDescriptorProto.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.name === undefined && options.defaults) {
                        dst.name = "";
                    }
                    if (dst.number === undefined && options.defaults) {
                        dst.number = 0;
                    }
                    dst.options = types[2].convert(src.options, impl, options);
                }
                return dst;
            };})($types);

            /**
             * Creates an EnumValueDescriptorProto message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto
             */
            EnumValueDescriptorProto.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this EnumValueDescriptorProto message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return EnumValueDescriptorProto;
        })();

        protobuf.ServiceDescriptorProto = (function() {

            /**
             * Constructs a new ServiceDescriptorProto.
             * @exports google.protobuf.ServiceDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function ServiceDescriptorProto(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.ServiceDescriptorProto.prototype */
            var $prototype = ServiceDescriptorProto.prototype;

            /**
             * ServiceDescriptorProto name.
             * @type {string}
             */
            $prototype.name = "";

            /**
             * ServiceDescriptorProto method.
             * @type {Array.<google.protobuf.MethodDescriptorProto>}
             */
            $prototype.method = $protobuf.util.emptyArray;

            /**
             * ServiceDescriptorProto options.
             * @type {google.protobuf.ServiceOptions}
             */
            $prototype.options = null;

            // Referenced types
            var $types = [null, "google.protobuf.MethodDescriptorProto", "google.protobuf.ServiceOptions"]; $lazyTypes.push($types);

            /**
             * Creates a new ServiceDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto instance
             */
            ServiceDescriptorProto.create = function create(properties) {
                return new ServiceDescriptorProto(properties);
            };

            /**
             * Encodes the specified ServiceDescriptorProto message.
             * @function
             * @param {google.protobuf.ServiceDescriptorProto|Object} message ServiceDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceDescriptorProto.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.name !== undefined && message.name !== "") {
                    writer.uint32(10).string(message.name);
                }
                if (message.method) {
                    for (var i = 0; i < message.method.length; ++i) {
                        types[1].encode(message.method[i], writer.uint32(18).fork()).ldelim();
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    types[2].encode(message.options, writer.uint32(26).fork()).ldelim();
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified ServiceDescriptorProto message, length delimited.
             * @param {google.protobuf.ServiceDescriptorProto|Object} message ServiceDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto
             */
            ServiceDescriptorProto.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.ServiceDescriptorProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;

                    case 2:
                        if (!(message.method && message.method.length)) {
                            message.method = [];
                        }
                        message.method.push(types[1].decode(reader, reader.uint32()));
                        break;

                    case 3:
                        message.options = types[2].decode(reader, reader.uint32());
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto
             */
            ServiceDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a ServiceDescriptorProto message.
             * @function
             * @param {google.protobuf.ServiceDescriptorProto|Object} message ServiceDescriptorProto message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            ServiceDescriptorProto.verify = (function(util, types) { return function verify(message) {
                if (message.name !== undefined) {
                    if (!util.isString(message.name)) {
                        return "google.protobuf.ServiceDescriptorProto.name: string expected";
                    }
                }
                if (message.method !== undefined) {
                    if (!Array.isArray(message.method)) {
                        return "google.protobuf.ServiceDescriptorProto.method: array expected";
                    }
                    for (var i = 0; i < message.method.length; ++i) {
                        var err;
                        if (err = types[1].verify(message.method[i])) {
                            return err;
                        }
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var err;
                    if (err = types[2].verify(message.options)) {
                        return err;
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a ServiceDescriptorProto message.
             * @function
             * @param {google.protobuf.ServiceDescriptorProto|Object} source ServiceDescriptorProto message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.ServiceDescriptorProto|Object} Converted message
             */
            ServiceDescriptorProto.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.name === undefined && options.defaults) {
                        dst.name = "";
                    }
                    if (src.method && src.method.length) {
                        dst.method = [];
                        for (var i = 0; i < src.method.length; ++i) {
                            dst.method.push(types[1].convert(src.method[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.method = [];
                        }
                    }
                    dst.options = types[2].convert(src.options, impl, options);
                }
                return dst;
            };})($types);

            /**
             * Creates a ServiceDescriptorProto message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto
             */
            ServiceDescriptorProto.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this ServiceDescriptorProto message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return ServiceDescriptorProto;
        })();

        protobuf.MethodDescriptorProto = (function() {

            /**
             * Constructs a new MethodDescriptorProto.
             * @exports google.protobuf.MethodDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function MethodDescriptorProto(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.MethodDescriptorProto.prototype */
            var $prototype = MethodDescriptorProto.prototype;

            /**
             * MethodDescriptorProto name.
             * @type {string}
             */
            $prototype.name = "";

            /**
             * MethodDescriptorProto inputType.
             * @type {string}
             */
            $prototype.inputType = "";

            /**
             * MethodDescriptorProto outputType.
             * @type {string}
             */
            $prototype.outputType = "";

            /**
             * MethodDescriptorProto options.
             * @type {google.protobuf.MethodOptions}
             */
            $prototype.options = null;

            /**
             * MethodDescriptorProto clientStreaming.
             * @type {boolean}
             */
            $prototype.clientStreaming = false;

            /**
             * MethodDescriptorProto serverStreaming.
             * @type {boolean}
             */
            $prototype.serverStreaming = false;

            // Referenced types
            var $types = [null, null, null, "google.protobuf.MethodOptions", null, null]; $lazyTypes.push($types);

            /**
             * Creates a new MethodDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto instance
             */
            MethodDescriptorProto.create = function create(properties) {
                return new MethodDescriptorProto(properties);
            };

            /**
             * Encodes the specified MethodDescriptorProto message.
             * @function
             * @param {google.protobuf.MethodDescriptorProto|Object} message MethodDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MethodDescriptorProto.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.name !== undefined && message.name !== "") {
                    writer.uint32(10).string(message.name);
                }
                if (message.inputType !== undefined && message.inputType !== "") {
                    writer.uint32(18).string(message.inputType);
                }
                if (message.outputType !== undefined && message.outputType !== "") {
                    writer.uint32(26).string(message.outputType);
                }
                if (message.options !== undefined && message.options !== null) {
                    types[3].encode(message.options, writer.uint32(34).fork()).ldelim();
                }
                if (message.clientStreaming !== undefined && message.clientStreaming !== false) {
                    writer.uint32(40).bool(message.clientStreaming);
                }
                if (message.serverStreaming !== undefined && message.serverStreaming !== false) {
                    writer.uint32(48).bool(message.serverStreaming);
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified MethodDescriptorProto message, length delimited.
             * @param {google.protobuf.MethodDescriptorProto|Object} message MethodDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MethodDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto
             */
            MethodDescriptorProto.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.MethodDescriptorProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;

                    case 2:
                        message.inputType = reader.string();
                        break;

                    case 3:
                        message.outputType = reader.string();
                        break;

                    case 4:
                        message.options = types[3].decode(reader, reader.uint32());
                        break;

                    case 5:
                        message.clientStreaming = reader.bool();
                        break;

                    case 6:
                        message.serverStreaming = reader.bool();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto
             */
            MethodDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a MethodDescriptorProto message.
             * @function
             * @param {google.protobuf.MethodDescriptorProto|Object} message MethodDescriptorProto message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MethodDescriptorProto.verify = (function(util, types) { return function verify(message) {
                if (message.name !== undefined) {
                    if (!util.isString(message.name)) {
                        return "google.protobuf.MethodDescriptorProto.name: string expected";
                    }
                }
                if (message.inputType !== undefined) {
                    if (!util.isString(message.inputType)) {
                        return "google.protobuf.MethodDescriptorProto.inputType: string expected";
                    }
                }
                if (message.outputType !== undefined) {
                    if (!util.isString(message.outputType)) {
                        return "google.protobuf.MethodDescriptorProto.outputType: string expected";
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var err;
                    if (err = types[3].verify(message.options)) {
                        return err;
                    }
                }
                if (message.clientStreaming !== undefined) {
                    if (typeof message.clientStreaming !== "boolean") {
                        return "google.protobuf.MethodDescriptorProto.clientStreaming: boolean expected";
                    }
                }
                if (message.serverStreaming !== undefined) {
                    if (typeof message.serverStreaming !== "boolean") {
                        return "google.protobuf.MethodDescriptorProto.serverStreaming: boolean expected";
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a MethodDescriptorProto message.
             * @function
             * @param {google.protobuf.MethodDescriptorProto|Object} source MethodDescriptorProto message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.MethodDescriptorProto|Object} Converted message
             */
            MethodDescriptorProto.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.name === undefined && options.defaults) {
                        dst.name = "";
                    }
                    if (dst.inputType === undefined && options.defaults) {
                        dst.inputType = "";
                    }
                    if (dst.outputType === undefined && options.defaults) {
                        dst.outputType = "";
                    }
                    dst.options = types[3].convert(src.options, impl, options);
                    if (dst.clientStreaming === undefined && options.defaults) {
                        dst.clientStreaming = false;
                    }
                    if (dst.serverStreaming === undefined && options.defaults) {
                        dst.serverStreaming = false;
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a MethodDescriptorProto message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto
             */
            MethodDescriptorProto.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this MethodDescriptorProto message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return MethodDescriptorProto;
        })();

        protobuf.FileOptions = (function() {

            /**
             * Constructs a new FileOptions.
             * @exports google.protobuf.FileOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function FileOptions(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.FileOptions.prototype */
            var $prototype = FileOptions.prototype;

            /**
             * FileOptions javaPackage.
             * @type {string}
             */
            $prototype.javaPackage = "";

            /**
             * FileOptions javaOuterClassname.
             * @type {string}
             */
            $prototype.javaOuterClassname = "";

            /**
             * FileOptions javaMultipleFiles.
             * @type {boolean}
             */
            $prototype.javaMultipleFiles = false;

            /**
             * FileOptions javaGenerateEqualsAndHash.
             * @type {boolean}
             */
            $prototype.javaGenerateEqualsAndHash = false;

            /**
             * FileOptions javaStringCheckUtf8.
             * @type {boolean}
             */
            $prototype.javaStringCheckUtf8 = false;

            /**
             * FileOptions optimizeFor.
             * @type {number}
             */
            $prototype.optimizeFor = 1;

            /**
             * FileOptions goPackage.
             * @type {string}
             */
            $prototype.goPackage = "";

            /**
             * FileOptions ccGenericServices.
             * @type {boolean}
             */
            $prototype.ccGenericServices = false;

            /**
             * FileOptions javaGenericServices.
             * @type {boolean}
             */
            $prototype.javaGenericServices = false;

            /**
             * FileOptions pyGenericServices.
             * @type {boolean}
             */
            $prototype.pyGenericServices = false;

            /**
             * FileOptions deprecated.
             * @type {boolean}
             */
            $prototype.deprecated = false;

            /**
             * FileOptions ccEnableArenas.
             * @type {boolean}
             */
            $prototype.ccEnableArenas = false;

            /**
             * FileOptions objcClassPrefix.
             * @type {string}
             */
            $prototype.objcClassPrefix = "";

            /**
             * FileOptions csharpNamespace.
             * @type {string}
             */
            $prototype.csharpNamespace = "";

            /**
             * FileOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            $prototype.uninterpretedOption = $protobuf.util.emptyArray;

            // Referenced types
            var $types = [null, null, null, null, null, "google.protobuf.FileOptions.OptimizeMode", null, null, null, null, null, null, null, null, "google.protobuf.UninterpretedOption"]; $lazyTypes.push($types);

            /**
             * Creates a new FileOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FileOptions} FileOptions instance
             */
            FileOptions.create = function create(properties) {
                return new FileOptions(properties);
            };

            /**
             * Encodes the specified FileOptions message.
             * @function
             * @param {google.protobuf.FileOptions|Object} message FileOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileOptions.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.javaPackage !== undefined && message.javaPackage !== "") {
                    writer.uint32(10).string(message.javaPackage);
                }
                if (message.javaOuterClassname !== undefined && message.javaOuterClassname !== "") {
                    writer.uint32(66).string(message.javaOuterClassname);
                }
                if (message.javaMultipleFiles !== undefined && message.javaMultipleFiles !== false) {
                    writer.uint32(80).bool(message.javaMultipleFiles);
                }
                if (message.javaGenerateEqualsAndHash !== undefined && message.javaGenerateEqualsAndHash !== false) {
                    writer.uint32(160).bool(message.javaGenerateEqualsAndHash);
                }
                if (message.javaStringCheckUtf8 !== undefined && message.javaStringCheckUtf8 !== false) {
                    writer.uint32(216).bool(message.javaStringCheckUtf8);
                }
                if (message.optimizeFor !== undefined && message.optimizeFor !== 1) {
                    writer.uint32(72).uint32(message.optimizeFor);
                }
                if (message.goPackage !== undefined && message.goPackage !== "") {
                    writer.uint32(90).string(message.goPackage);
                }
                if (message.ccGenericServices !== undefined && message.ccGenericServices !== false) {
                    writer.uint32(128).bool(message.ccGenericServices);
                }
                if (message.javaGenericServices !== undefined && message.javaGenericServices !== false) {
                    writer.uint32(136).bool(message.javaGenericServices);
                }
                if (message.pyGenericServices !== undefined && message.pyGenericServices !== false) {
                    writer.uint32(144).bool(message.pyGenericServices);
                }
                if (message.deprecated !== undefined && message.deprecated !== false) {
                    writer.uint32(184).bool(message.deprecated);
                }
                if (message.ccEnableArenas !== undefined && message.ccEnableArenas !== false) {
                    writer.uint32(248).bool(message.ccEnableArenas);
                }
                if (message.objcClassPrefix !== undefined && message.objcClassPrefix !== "") {
                    writer.uint32(290).string(message.objcClassPrefix);
                }
                if (message.csharpNamespace !== undefined && message.csharpNamespace !== "") {
                    writer.uint32(298).string(message.csharpNamespace);
                }
                if (message.uninterpretedOption) {
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        types[14].encode(message.uninterpretedOption[i], writer.uint32(7994).fork()).ldelim();
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified FileOptions message, length delimited.
             * @param {google.protobuf.FileOptions|Object} message FileOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FileOptions message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileOptions} FileOptions
             */
            FileOptions.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.FileOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.javaPackage = reader.string();
                        break;

                    case 8:
                        message.javaOuterClassname = reader.string();
                        break;

                    case 10:
                        message.javaMultipleFiles = reader.bool();
                        break;

                    case 20:
                        message.javaGenerateEqualsAndHash = reader.bool();
                        break;

                    case 27:
                        message.javaStringCheckUtf8 = reader.bool();
                        break;

                    case 9:
                        message.optimizeFor = reader.uint32();
                        break;

                    case 11:
                        message.goPackage = reader.string();
                        break;

                    case 16:
                        message.ccGenericServices = reader.bool();
                        break;

                    case 17:
                        message.javaGenericServices = reader.bool();
                        break;

                    case 18:
                        message.pyGenericServices = reader.bool();
                        break;

                    case 23:
                        message.deprecated = reader.bool();
                        break;

                    case 31:
                        message.ccEnableArenas = reader.bool();
                        break;

                    case 36:
                        message.objcClassPrefix = reader.string();
                        break;

                    case 37:
                        message.csharpNamespace = reader.string();
                        break;

                    case 999:
                        if (!(message.uninterpretedOption && message.uninterpretedOption.length)) {
                            message.uninterpretedOption = [];
                        }
                        message.uninterpretedOption.push(types[14].decode(reader, reader.uint32()));
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a FileOptions message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FileOptions} FileOptions
             */
            FileOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FileOptions message.
             * @function
             * @param {google.protobuf.FileOptions|Object} message FileOptions message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FileOptions.verify = (function(util, types) { return function verify(message) {
                if (message.javaPackage !== undefined) {
                    if (!util.isString(message.javaPackage)) {
                        return "google.protobuf.FileOptions.javaPackage: string expected";
                    }
                }
                if (message.javaOuterClassname !== undefined) {
                    if (!util.isString(message.javaOuterClassname)) {
                        return "google.protobuf.FileOptions.javaOuterClassname: string expected";
                    }
                }
                if (message.javaMultipleFiles !== undefined) {
                    if (typeof message.javaMultipleFiles !== "boolean") {
                        return "google.protobuf.FileOptions.javaMultipleFiles: boolean expected";
                    }
                }
                if (message.javaGenerateEqualsAndHash !== undefined) {
                    if (typeof message.javaGenerateEqualsAndHash !== "boolean") {
                        return "google.protobuf.FileOptions.javaGenerateEqualsAndHash: boolean expected";
                    }
                }
                if (message.javaStringCheckUtf8 !== undefined) {
                    if (typeof message.javaStringCheckUtf8 !== "boolean") {
                        return "google.protobuf.FileOptions.javaStringCheckUtf8: boolean expected";
                    }
                }
                if (message.optimizeFor !== undefined) {
                    switch (message.optimizeFor) {
                    default:
                        return "google.protobuf.FileOptions.optimizeFor: enum value expected";

                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                }
                if (message.goPackage !== undefined) {
                    if (!util.isString(message.goPackage)) {
                        return "google.protobuf.FileOptions.goPackage: string expected";
                    }
                }
                if (message.ccGenericServices !== undefined) {
                    if (typeof message.ccGenericServices !== "boolean") {
                        return "google.protobuf.FileOptions.ccGenericServices: boolean expected";
                    }
                }
                if (message.javaGenericServices !== undefined) {
                    if (typeof message.javaGenericServices !== "boolean") {
                        return "google.protobuf.FileOptions.javaGenericServices: boolean expected";
                    }
                }
                if (message.pyGenericServices !== undefined) {
                    if (typeof message.pyGenericServices !== "boolean") {
                        return "google.protobuf.FileOptions.pyGenericServices: boolean expected";
                    }
                }
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean") {
                        return "google.protobuf.FileOptions.deprecated: boolean expected";
                    }
                }
                if (message.ccEnableArenas !== undefined) {
                    if (typeof message.ccEnableArenas !== "boolean") {
                        return "google.protobuf.FileOptions.ccEnableArenas: boolean expected";
                    }
                }
                if (message.objcClassPrefix !== undefined) {
                    if (!util.isString(message.objcClassPrefix)) {
                        return "google.protobuf.FileOptions.objcClassPrefix: string expected";
                    }
                }
                if (message.csharpNamespace !== undefined) {
                    if (!util.isString(message.csharpNamespace)) {
                        return "google.protobuf.FileOptions.csharpNamespace: string expected";
                    }
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption)) {
                        return "google.protobuf.FileOptions.uninterpretedOption: array expected";
                    }
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var err;
                        if (err = types[14].verify(message.uninterpretedOption[i])) {
                            return err;
                        }
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts a FileOptions message.
             * @function
             * @param {google.protobuf.FileOptions|Object} source FileOptions message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.FileOptions|Object} Converted message
             */
            FileOptions.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.javaPackage === undefined && options.defaults) {
                        dst.javaPackage = "";
                    }
                    if (dst.javaOuterClassname === undefined && options.defaults) {
                        dst.javaOuterClassname = "";
                    }
                    if (dst.javaMultipleFiles === undefined && options.defaults) {
                        dst.javaMultipleFiles = false;
                    }
                    if (dst.javaGenerateEqualsAndHash === undefined && options.defaults) {
                        dst.javaGenerateEqualsAndHash = false;
                    }
                    if (dst.javaStringCheckUtf8 === undefined && options.defaults) {
                        dst.javaStringCheckUtf8 = false;
                    }
                    dst.optimizeFor = impl.enums(src.optimizeFor, 0, types[5], options);
                    if (dst.goPackage === undefined && options.defaults) {
                        dst.goPackage = "";
                    }
                    if (dst.ccGenericServices === undefined && options.defaults) {
                        dst.ccGenericServices = false;
                    }
                    if (dst.javaGenericServices === undefined && options.defaults) {
                        dst.javaGenericServices = false;
                    }
                    if (dst.pyGenericServices === undefined && options.defaults) {
                        dst.pyGenericServices = false;
                    }
                    if (dst.deprecated === undefined && options.defaults) {
                        dst.deprecated = false;
                    }
                    if (dst.ccEnableArenas === undefined && options.defaults) {
                        dst.ccEnableArenas = false;
                    }
                    if (dst.objcClassPrefix === undefined && options.defaults) {
                        dst.objcClassPrefix = "";
                    }
                    if (dst.csharpNamespace === undefined && options.defaults) {
                        dst.csharpNamespace = "";
                    }
                    if (src.uninterpretedOption && src.uninterpretedOption.length) {
                        dst.uninterpretedOption = [];
                        for (var i = 0; i < src.uninterpretedOption.length; ++i) {
                            dst.uninterpretedOption.push(types[14].convert(src.uninterpretedOption[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.uninterpretedOption = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a FileOptions message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.FileOptions} FileOptions
             */
            FileOptions.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this FileOptions message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            /**
             * OptimizeMode enum.
             * @name OptimizeMode
             * @memberof google.protobuf.FileOptions
             * @enum {number}
             * @property {number} SPEED=1 SPEED value
             * @property {number} CODE_SIZE=2 CODE_SIZE value
             * @property {number} LITE_RUNTIME=3 LITE_RUNTIME value
             */
            FileOptions.OptimizeMode = (function() {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[valuesById[1] = "SPEED"] = 1;
                values[valuesById[2] = "CODE_SIZE"] = 2;
                values[valuesById[3] = "LITE_RUNTIME"] = 3;
                return values;
            })();

            return FileOptions;
        })();

        protobuf.MessageOptions = (function() {

            /**
             * Constructs a new MessageOptions.
             * @exports google.protobuf.MessageOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function MessageOptions(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.MessageOptions.prototype */
            var $prototype = MessageOptions.prototype;

            /**
             * MessageOptions messageSetWireFormat.
             * @type {boolean}
             */
            $prototype.messageSetWireFormat = false;

            /**
             * MessageOptions noStandardDescriptorAccessor.
             * @type {boolean}
             */
            $prototype.noStandardDescriptorAccessor = false;

            /**
             * MessageOptions deprecated.
             * @type {boolean}
             */
            $prototype.deprecated = false;

            /**
             * MessageOptions mapEntry.
             * @type {boolean}
             */
            $prototype.mapEntry = false;

            /**
             * MessageOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            $prototype.uninterpretedOption = $protobuf.util.emptyArray;

            // Referenced types
            var $types = [null, null, null, null, "google.protobuf.UninterpretedOption"]; $lazyTypes.push($types);

            /**
             * Creates a new MessageOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.MessageOptions} MessageOptions instance
             */
            MessageOptions.create = function create(properties) {
                return new MessageOptions(properties);
            };

            /**
             * Encodes the specified MessageOptions message.
             * @function
             * @param {google.protobuf.MessageOptions|Object} message MessageOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MessageOptions.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.messageSetWireFormat !== undefined && message.messageSetWireFormat !== false) {
                    writer.uint32(8).bool(message.messageSetWireFormat);
                }
                if (message.noStandardDescriptorAccessor !== undefined && message.noStandardDescriptorAccessor !== false) {
                    writer.uint32(16).bool(message.noStandardDescriptorAccessor);
                }
                if (message.deprecated !== undefined && message.deprecated !== false) {
                    writer.uint32(24).bool(message.deprecated);
                }
                if (message.mapEntry !== undefined && message.mapEntry !== false) {
                    writer.uint32(56).bool(message.mapEntry);
                }
                if (message.uninterpretedOption) {
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        types[4].encode(message.uninterpretedOption[i], writer.uint32(7994).fork()).ldelim();
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified MessageOptions message, length delimited.
             * @param {google.protobuf.MessageOptions|Object} message MessageOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MessageOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MessageOptions message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MessageOptions} MessageOptions
             */
            MessageOptions.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.MessageOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.messageSetWireFormat = reader.bool();
                        break;

                    case 2:
                        message.noStandardDescriptorAccessor = reader.bool();
                        break;

                    case 3:
                        message.deprecated = reader.bool();
                        break;

                    case 7:
                        message.mapEntry = reader.bool();
                        break;

                    case 999:
                        if (!(message.uninterpretedOption && message.uninterpretedOption.length)) {
                            message.uninterpretedOption = [];
                        }
                        message.uninterpretedOption.push(types[4].decode(reader, reader.uint32()));
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a MessageOptions message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.MessageOptions} MessageOptions
             */
            MessageOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a MessageOptions message.
             * @function
             * @param {google.protobuf.MessageOptions|Object} message MessageOptions message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MessageOptions.verify = (function(types) { return function verify(message) {
                if (message.messageSetWireFormat !== undefined) {
                    if (typeof message.messageSetWireFormat !== "boolean") {
                        return "google.protobuf.MessageOptions.messageSetWireFormat: boolean expected";
                    }
                }
                if (message.noStandardDescriptorAccessor !== undefined) {
                    if (typeof message.noStandardDescriptorAccessor !== "boolean") {
                        return "google.protobuf.MessageOptions.noStandardDescriptorAccessor: boolean expected";
                    }
                }
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean") {
                        return "google.protobuf.MessageOptions.deprecated: boolean expected";
                    }
                }
                if (message.mapEntry !== undefined) {
                    if (typeof message.mapEntry !== "boolean") {
                        return "google.protobuf.MessageOptions.mapEntry: boolean expected";
                    }
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption)) {
                        return "google.protobuf.MessageOptions.uninterpretedOption: array expected";
                    }
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var err;
                        if (err = types[4].verify(message.uninterpretedOption[i])) {
                            return err;
                        }
                    }
                }
                return null;
            };})($types);

            /**
             * Converts a MessageOptions message.
             * @function
             * @param {google.protobuf.MessageOptions|Object} source MessageOptions message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.MessageOptions|Object} Converted message
             */
            MessageOptions.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.messageSetWireFormat === undefined && options.defaults) {
                        dst.messageSetWireFormat = false;
                    }
                    if (dst.noStandardDescriptorAccessor === undefined && options.defaults) {
                        dst.noStandardDescriptorAccessor = false;
                    }
                    if (dst.deprecated === undefined && options.defaults) {
                        dst.deprecated = false;
                    }
                    if (dst.mapEntry === undefined && options.defaults) {
                        dst.mapEntry = false;
                    }
                    if (src.uninterpretedOption && src.uninterpretedOption.length) {
                        dst.uninterpretedOption = [];
                        for (var i = 0; i < src.uninterpretedOption.length; ++i) {
                            dst.uninterpretedOption.push(types[4].convert(src.uninterpretedOption[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.uninterpretedOption = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a MessageOptions message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.MessageOptions} MessageOptions
             */
            MessageOptions.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this MessageOptions message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return MessageOptions;
        })();

        protobuf.FieldOptions = (function() {

            /**
             * Constructs a new FieldOptions.
             * @exports google.protobuf.FieldOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function FieldOptions(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.FieldOptions.prototype */
            var $prototype = FieldOptions.prototype;

            /**
             * FieldOptions ctype.
             * @type {number}
             */
            $prototype.ctype = 0;

            /**
             * FieldOptions packed.
             * @type {boolean}
             */
            $prototype.packed = false;

            /**
             * FieldOptions jstype.
             * @type {number}
             */
            $prototype.jstype = 0;

            /**
             * FieldOptions lazy.
             * @type {boolean}
             */
            $prototype.lazy = false;

            /**
             * FieldOptions deprecated.
             * @type {boolean}
             */
            $prototype.deprecated = false;

            /**
             * FieldOptions weak.
             * @type {boolean}
             */
            $prototype.weak = false;

            /**
             * FieldOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            $prototype.uninterpretedOption = $protobuf.util.emptyArray;

            // Referenced types
            var $types = ["google.protobuf.FieldOptions.CType", null, "google.protobuf.FieldOptions.JSType", null, null, null, "google.protobuf.UninterpretedOption"]; $lazyTypes.push($types);

            /**
             * Creates a new FieldOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FieldOptions} FieldOptions instance
             */
            FieldOptions.create = function create(properties) {
                return new FieldOptions(properties);
            };

            /**
             * Encodes the specified FieldOptions message.
             * @function
             * @param {google.protobuf.FieldOptions|Object} message FieldOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FieldOptions.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.ctype !== undefined && message.ctype !== 0) {
                    writer.uint32(8).uint32(message.ctype);
                }
                if (message.packed !== undefined && message.packed !== false) {
                    writer.uint32(16).bool(message.packed);
                }
                if (message.jstype !== undefined && message.jstype !== 0) {
                    writer.uint32(48).uint32(message.jstype);
                }
                if (message.lazy !== undefined && message.lazy !== false) {
                    writer.uint32(40).bool(message.lazy);
                }
                if (message.deprecated !== undefined && message.deprecated !== false) {
                    writer.uint32(24).bool(message.deprecated);
                }
                if (message.weak !== undefined && message.weak !== false) {
                    writer.uint32(80).bool(message.weak);
                }
                if (message.uninterpretedOption) {
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        types[6].encode(message.uninterpretedOption[i], writer.uint32(7994).fork()).ldelim();
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified FieldOptions message, length delimited.
             * @param {google.protobuf.FieldOptions|Object} message FieldOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FieldOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FieldOptions message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FieldOptions} FieldOptions
             */
            FieldOptions.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.FieldOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ctype = reader.uint32();
                        break;

                    case 2:
                        message.packed = reader.bool();
                        break;

                    case 6:
                        message.jstype = reader.uint32();
                        break;

                    case 5:
                        message.lazy = reader.bool();
                        break;

                    case 3:
                        message.deprecated = reader.bool();
                        break;

                    case 10:
                        message.weak = reader.bool();
                        break;

                    case 999:
                        if (!(message.uninterpretedOption && message.uninterpretedOption.length)) {
                            message.uninterpretedOption = [];
                        }
                        message.uninterpretedOption.push(types[6].decode(reader, reader.uint32()));
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a FieldOptions message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FieldOptions} FieldOptions
             */
            FieldOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FieldOptions message.
             * @function
             * @param {google.protobuf.FieldOptions|Object} message FieldOptions message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FieldOptions.verify = (function(types) { return function verify(message) {
                if (message.ctype !== undefined) {
                    switch (message.ctype) {
                    default:
                        return "google.protobuf.FieldOptions.ctype: enum value expected";

                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                }
                if (message.packed !== undefined) {
                    if (typeof message.packed !== "boolean") {
                        return "google.protobuf.FieldOptions.packed: boolean expected";
                    }
                }
                if (message.jstype !== undefined) {
                    switch (message.jstype) {
                    default:
                        return "google.protobuf.FieldOptions.jstype: enum value expected";

                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                }
                if (message.lazy !== undefined) {
                    if (typeof message.lazy !== "boolean") {
                        return "google.protobuf.FieldOptions.lazy: boolean expected";
                    }
                }
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean") {
                        return "google.protobuf.FieldOptions.deprecated: boolean expected";
                    }
                }
                if (message.weak !== undefined) {
                    if (typeof message.weak !== "boolean") {
                        return "google.protobuf.FieldOptions.weak: boolean expected";
                    }
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption)) {
                        return "google.protobuf.FieldOptions.uninterpretedOption: array expected";
                    }
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var err;
                        if (err = types[6].verify(message.uninterpretedOption[i])) {
                            return err;
                        }
                    }
                }
                return null;
            };})($types);

            /**
             * Converts a FieldOptions message.
             * @function
             * @param {google.protobuf.FieldOptions|Object} source FieldOptions message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.FieldOptions|Object} Converted message
             */
            FieldOptions.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    dst.ctype = impl.enums(src.ctype, 0, types[0], options);
                    if (dst.packed === undefined && options.defaults) {
                        dst.packed = false;
                    }
                    dst.jstype = impl.enums(src.jstype, 0, types[2].values, options);
                    if (dst.lazy === undefined && options.defaults) {
                        dst.lazy = false;
                    }
                    if (dst.deprecated === undefined && options.defaults) {
                        dst.deprecated = false;
                    }
                    if (dst.weak === undefined && options.defaults) {
                        dst.weak = false;
                    }
                    if (src.uninterpretedOption && src.uninterpretedOption.length) {
                        dst.uninterpretedOption = [];
                        for (var i = 0; i < src.uninterpretedOption.length; ++i) {
                            dst.uninterpretedOption.push(types[6].convert(src.uninterpretedOption[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.uninterpretedOption = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a FieldOptions message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.FieldOptions} FieldOptions
             */
            FieldOptions.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this FieldOptions message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            /**
             * CType enum.
             * @name CType
             * @memberof google.protobuf.FieldOptions
             * @enum {number}
             * @property {number} STRING=0 STRING value
             * @property {number} CORD=1 CORD value
             * @property {number} STRING_PIECE=2 STRING_PIECE value
             */
            FieldOptions.CType = (function() {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[valuesById[0] = "STRING"] = 0;
                values[valuesById[1] = "CORD"] = 1;
                values[valuesById[2] = "STRING_PIECE"] = 2;
                return values;
            })();

            /**
             * JSType enum.
             * @name JSType
             * @memberof google.protobuf.FieldOptions
             * @enum {number}
             * @property {number} JS_NORMAL=0 JS_NORMAL value
             * @property {number} JS_STRING=1 JS_STRING value
             * @property {number} JS_NUMBER=2 JS_NUMBER value
             */
            FieldOptions.JSType = (function() {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[valuesById[0] = "JS_NORMAL"] = 0;
                values[valuesById[1] = "JS_STRING"] = 1;
                values[valuesById[2] = "JS_NUMBER"] = 2;
                return values;
            })();

            return FieldOptions;
        })();

        protobuf.OneofOptions = (function() {

            /**
             * Constructs a new OneofOptions.
             * @exports google.protobuf.OneofOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function OneofOptions(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.OneofOptions.prototype */
            var $prototype = OneofOptions.prototype;

            /**
             * OneofOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            $prototype.uninterpretedOption = $protobuf.util.emptyArray;

            // Referenced types
            var $types = ["google.protobuf.UninterpretedOption"]; $lazyTypes.push($types);

            /**
             * Creates a new OneofOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.OneofOptions} OneofOptions instance
             */
            OneofOptions.create = function create(properties) {
                return new OneofOptions(properties);
            };

            /**
             * Encodes the specified OneofOptions message.
             * @function
             * @param {google.protobuf.OneofOptions|Object} message OneofOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneofOptions.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.uninterpretedOption) {
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        types[0].encode(message.uninterpretedOption[i], writer.uint32(7994).fork()).ldelim();
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified OneofOptions message, length delimited.
             * @param {google.protobuf.OneofOptions|Object} message OneofOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneofOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an OneofOptions message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.OneofOptions} OneofOptions
             */
            OneofOptions.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.OneofOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 999:
                        if (!(message.uninterpretedOption && message.uninterpretedOption.length)) {
                            message.uninterpretedOption = [];
                        }
                        message.uninterpretedOption.push(types[0].decode(reader, reader.uint32()));
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes an OneofOptions message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.OneofOptions} OneofOptions
             */
            OneofOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an OneofOptions message.
             * @function
             * @param {google.protobuf.OneofOptions|Object} message OneofOptions message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            OneofOptions.verify = (function(types) { return function verify(message) {
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption)) {
                        return "google.protobuf.OneofOptions.uninterpretedOption: array expected";
                    }
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var err;
                        if (err = types[0].verify(message.uninterpretedOption[i])) {
                            return err;
                        }
                    }
                }
                return null;
            };})($types);

            /**
             * Converts an OneofOptions message.
             * @function
             * @param {google.protobuf.OneofOptions|Object} source OneofOptions message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.OneofOptions|Object} Converted message
             */
            OneofOptions.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (src.uninterpretedOption && src.uninterpretedOption.length) {
                        dst.uninterpretedOption = [];
                        for (var i = 0; i < src.uninterpretedOption.length; ++i) {
                            dst.uninterpretedOption.push(types[0].convert(src.uninterpretedOption[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.uninterpretedOption = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates an OneofOptions message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.OneofOptions} OneofOptions
             */
            OneofOptions.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this OneofOptions message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return OneofOptions;
        })();

        protobuf.EnumOptions = (function() {

            /**
             * Constructs a new EnumOptions.
             * @exports google.protobuf.EnumOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function EnumOptions(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.EnumOptions.prototype */
            var $prototype = EnumOptions.prototype;

            /**
             * EnumOptions allowAlias.
             * @type {boolean}
             */
            $prototype.allowAlias = false;

            /**
             * EnumOptions deprecated.
             * @type {boolean}
             */
            $prototype.deprecated = false;

            /**
             * EnumOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            $prototype.uninterpretedOption = $protobuf.util.emptyArray;

            /**
             * EnumOptions .jspb.test.IsExtension.simpleOption.
             * @name google.protobuf.EnumOptions#.jspb.test.IsExtension.simpleOption
             * @type {string}
             */
            $prototype[".jspb.test.IsExtension.simpleOption"] = "";

            // Referenced types
            var $types = [null, null, "google.protobuf.UninterpretedOption", null]; $lazyTypes.push($types);

            /**
             * Creates a new EnumOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumOptions} EnumOptions instance
             */
            EnumOptions.create = function create(properties) {
                return new EnumOptions(properties);
            };

            /**
             * Encodes the specified EnumOptions message.
             * @function
             * @param {google.protobuf.EnumOptions|Object} message EnumOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumOptions.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.allowAlias !== undefined && message.allowAlias !== false) {
                    writer.uint32(16).bool(message.allowAlias);
                }
                if (message.deprecated !== undefined && message.deprecated !== false) {
                    writer.uint32(24).bool(message.deprecated);
                }
                if (message.uninterpretedOption) {
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        types[2].encode(message.uninterpretedOption[i], writer.uint32(7994).fork()).ldelim();
                    }
                }
                if (message[".jspb.test.IsExtension.simpleOption"] !== undefined && message[".jspb.test.IsExtension.simpleOption"] !== "") {
                    writer.uint32(336904306).string(message[".jspb.test.IsExtension.simpleOption"]);
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified EnumOptions message, length delimited.
             * @param {google.protobuf.EnumOptions|Object} message EnumOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an EnumOptions message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumOptions} EnumOptions
             */
            EnumOptions.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.EnumOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        message.allowAlias = reader.bool();
                        break;

                    case 3:
                        message.deprecated = reader.bool();
                        break;

                    case 999:
                        if (!(message.uninterpretedOption && message.uninterpretedOption.length)) {
                            message.uninterpretedOption = [];
                        }
                        message.uninterpretedOption.push(types[2].decode(reader, reader.uint32()));
                        break;

                    case 42113038:
                        message[".jspb.test.IsExtension.simpleOption"] = reader.string();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes an EnumOptions message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumOptions} EnumOptions
             */
            EnumOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an EnumOptions message.
             * @function
             * @param {google.protobuf.EnumOptions|Object} message EnumOptions message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            EnumOptions.verify = (function(util, types) { return function verify(message) {
                if (message.allowAlias !== undefined) {
                    if (typeof message.allowAlias !== "boolean") {
                        return "google.protobuf.EnumOptions.allowAlias: boolean expected";
                    }
                }
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean") {
                        return "google.protobuf.EnumOptions.deprecated: boolean expected";
                    }
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption)) {
                        return "google.protobuf.EnumOptions.uninterpretedOption: array expected";
                    }
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var err;
                        if (err = types[2].verify(message.uninterpretedOption[i])) {
                            return err;
                        }
                    }
                }
                if (message[".jspb.test.IsExtension.simpleOption"] !== undefined) {
                    if (!util.isString(message[".jspb.test.IsExtension.simpleOption"])) {
                        return "google.protobuf.EnumOptions..jspb.test.IsExtension.simpleOption: string expected";
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts an EnumOptions message.
             * @function
             * @param {google.protobuf.EnumOptions|Object} source EnumOptions message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.EnumOptions|Object} Converted message
             */
            EnumOptions.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.allowAlias === undefined && options.defaults) {
                        dst.allowAlias = false;
                    }
                    if (dst.deprecated === undefined && options.defaults) {
                        dst.deprecated = false;
                    }
                    if (src.uninterpretedOption && src.uninterpretedOption.length) {
                        dst.uninterpretedOption = [];
                        for (var i = 0; i < src.uninterpretedOption.length; ++i) {
                            dst.uninterpretedOption.push(types[2].convert(src.uninterpretedOption[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.uninterpretedOption = [];
                        }
                    }
                    if (dst[".jspb.test.IsExtension.simpleOption"] === undefined && options.defaults) {
                        dst[".jspb.test.IsExtension.simpleOption"] = "";
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates an EnumOptions message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.EnumOptions} EnumOptions
             */
            EnumOptions.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this EnumOptions message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return EnumOptions;
        })();

        protobuf.EnumValueOptions = (function() {

            /**
             * Constructs a new EnumValueOptions.
             * @exports google.protobuf.EnumValueOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function EnumValueOptions(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.EnumValueOptions.prototype */
            var $prototype = EnumValueOptions.prototype;

            /**
             * EnumValueOptions deprecated.
             * @type {boolean}
             */
            $prototype.deprecated = false;

            /**
             * EnumValueOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            $prototype.uninterpretedOption = $protobuf.util.emptyArray;

            // Referenced types
            var $types = [null, "google.protobuf.UninterpretedOption"]; $lazyTypes.push($types);

            /**
             * Creates a new EnumValueOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions instance
             */
            EnumValueOptions.create = function create(properties) {
                return new EnumValueOptions(properties);
            };

            /**
             * Encodes the specified EnumValueOptions message.
             * @function
             * @param {google.protobuf.EnumValueOptions|Object} message EnumValueOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumValueOptions.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.deprecated !== undefined && message.deprecated !== false) {
                    writer.uint32(8).bool(message.deprecated);
                }
                if (message.uninterpretedOption) {
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        types[1].encode(message.uninterpretedOption[i], writer.uint32(7994).fork()).ldelim();
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified EnumValueOptions message, length delimited.
             * @param {google.protobuf.EnumValueOptions|Object} message EnumValueOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumValueOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an EnumValueOptions message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions
             */
            EnumValueOptions.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.EnumValueOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.deprecated = reader.bool();
                        break;

                    case 999:
                        if (!(message.uninterpretedOption && message.uninterpretedOption.length)) {
                            message.uninterpretedOption = [];
                        }
                        message.uninterpretedOption.push(types[1].decode(reader, reader.uint32()));
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes an EnumValueOptions message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions
             */
            EnumValueOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an EnumValueOptions message.
             * @function
             * @param {google.protobuf.EnumValueOptions|Object} message EnumValueOptions message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            EnumValueOptions.verify = (function(types) { return function verify(message) {
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean") {
                        return "google.protobuf.EnumValueOptions.deprecated: boolean expected";
                    }
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption)) {
                        return "google.protobuf.EnumValueOptions.uninterpretedOption: array expected";
                    }
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var err;
                        if (err = types[1].verify(message.uninterpretedOption[i])) {
                            return err;
                        }
                    }
                }
                return null;
            };})($types);

            /**
             * Converts an EnumValueOptions message.
             * @function
             * @param {google.protobuf.EnumValueOptions|Object} source EnumValueOptions message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.EnumValueOptions|Object} Converted message
             */
            EnumValueOptions.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.deprecated === undefined && options.defaults) {
                        dst.deprecated = false;
                    }
                    if (src.uninterpretedOption && src.uninterpretedOption.length) {
                        dst.uninterpretedOption = [];
                        for (var i = 0; i < src.uninterpretedOption.length; ++i) {
                            dst.uninterpretedOption.push(types[1].convert(src.uninterpretedOption[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.uninterpretedOption = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates an EnumValueOptions message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions
             */
            EnumValueOptions.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this EnumValueOptions message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return EnumValueOptions;
        })();

        protobuf.ServiceOptions = (function() {

            /**
             * Constructs a new ServiceOptions.
             * @exports google.protobuf.ServiceOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function ServiceOptions(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.ServiceOptions.prototype */
            var $prototype = ServiceOptions.prototype;

            /**
             * ServiceOptions deprecated.
             * @type {boolean}
             */
            $prototype.deprecated = false;

            /**
             * ServiceOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            $prototype.uninterpretedOption = $protobuf.util.emptyArray;

            // Referenced types
            var $types = [null, "google.protobuf.UninterpretedOption"]; $lazyTypes.push($types);

            /**
             * Creates a new ServiceOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.ServiceOptions} ServiceOptions instance
             */
            ServiceOptions.create = function create(properties) {
                return new ServiceOptions(properties);
            };

            /**
             * Encodes the specified ServiceOptions message.
             * @function
             * @param {google.protobuf.ServiceOptions|Object} message ServiceOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceOptions.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.deprecated !== undefined && message.deprecated !== false) {
                    writer.uint32(264).bool(message.deprecated);
                }
                if (message.uninterpretedOption) {
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        types[1].encode(message.uninterpretedOption[i], writer.uint32(7994).fork()).ldelim();
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified ServiceOptions message, length delimited.
             * @param {google.protobuf.ServiceOptions|Object} message ServiceOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServiceOptions message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.ServiceOptions} ServiceOptions
             */
            ServiceOptions.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.ServiceOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 33:
                        message.deprecated = reader.bool();
                        break;

                    case 999:
                        if (!(message.uninterpretedOption && message.uninterpretedOption.length)) {
                            message.uninterpretedOption = [];
                        }
                        message.uninterpretedOption.push(types[1].decode(reader, reader.uint32()));
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a ServiceOptions message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.ServiceOptions} ServiceOptions
             */
            ServiceOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a ServiceOptions message.
             * @function
             * @param {google.protobuf.ServiceOptions|Object} message ServiceOptions message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            ServiceOptions.verify = (function(types) { return function verify(message) {
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean") {
                        return "google.protobuf.ServiceOptions.deprecated: boolean expected";
                    }
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption)) {
                        return "google.protobuf.ServiceOptions.uninterpretedOption: array expected";
                    }
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var err;
                        if (err = types[1].verify(message.uninterpretedOption[i])) {
                            return err;
                        }
                    }
                }
                return null;
            };})($types);

            /**
             * Converts a ServiceOptions message.
             * @function
             * @param {google.protobuf.ServiceOptions|Object} source ServiceOptions message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.ServiceOptions|Object} Converted message
             */
            ServiceOptions.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.deprecated === undefined && options.defaults) {
                        dst.deprecated = false;
                    }
                    if (src.uninterpretedOption && src.uninterpretedOption.length) {
                        dst.uninterpretedOption = [];
                        for (var i = 0; i < src.uninterpretedOption.length; ++i) {
                            dst.uninterpretedOption.push(types[1].convert(src.uninterpretedOption[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.uninterpretedOption = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a ServiceOptions message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.ServiceOptions} ServiceOptions
             */
            ServiceOptions.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this ServiceOptions message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            return ServiceOptions;
        })();

        protobuf.MethodOptions = (function() {

            /**
             * Constructs a new MethodOptions.
             * @exports google.protobuf.MethodOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function MethodOptions(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.MethodOptions.prototype */
            var $prototype = MethodOptions.prototype;

            /**
             * MethodOptions deprecated.
             * @type {boolean}
             */
            $prototype.deprecated = false;

            /**
             * MethodOptions idempotencyLevel.
             * @type {number}
             */
            $prototype.idempotencyLevel = 0;

            /**
             * MethodOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            $prototype.uninterpretedOption = $protobuf.util.emptyArray;

            // Referenced types
            var $types = [null, "google.protobuf.MethodOptions.IdempotencyLevel", "google.protobuf.UninterpretedOption"]; $lazyTypes.push($types);

            /**
             * Creates a new MethodOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.MethodOptions} MethodOptions instance
             */
            MethodOptions.create = function create(properties) {
                return new MethodOptions(properties);
            };

            /**
             * Encodes the specified MethodOptions message.
             * @function
             * @param {google.protobuf.MethodOptions|Object} message MethodOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MethodOptions.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.deprecated !== undefined && message.deprecated !== false) {
                    writer.uint32(264).bool(message.deprecated);
                }
                if (message.idempotencyLevel !== undefined && message.idempotencyLevel !== 0) {
                    writer.uint32(272).uint32(message.idempotencyLevel);
                }
                if (message.uninterpretedOption) {
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        types[2].encode(message.uninterpretedOption[i], writer.uint32(7994).fork()).ldelim();
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified MethodOptions message, length delimited.
             * @param {google.protobuf.MethodOptions|Object} message MethodOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MethodOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MethodOptions message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MethodOptions} MethodOptions
             */
            MethodOptions.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.MethodOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 33:
                        message.deprecated = reader.bool();
                        break;

                    case 34:
                        message.idempotencyLevel = reader.uint32();
                        break;

                    case 999:
                        if (!(message.uninterpretedOption && message.uninterpretedOption.length)) {
                            message.uninterpretedOption = [];
                        }
                        message.uninterpretedOption.push(types[2].decode(reader, reader.uint32()));
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a MethodOptions message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.MethodOptions} MethodOptions
             */
            MethodOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a MethodOptions message.
             * @function
             * @param {google.protobuf.MethodOptions|Object} message MethodOptions message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MethodOptions.verify = (function(types) { return function verify(message) {
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean") {
                        return "google.protobuf.MethodOptions.deprecated: boolean expected";
                    }
                }
                if (message.idempotencyLevel !== undefined) {
                    switch (message.idempotencyLevel) {
                    default:
                        return "google.protobuf.MethodOptions.idempotencyLevel: enum value expected";

                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption)) {
                        return "google.protobuf.MethodOptions.uninterpretedOption: array expected";
                    }
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var err;
                        if (err = types[2].verify(message.uninterpretedOption[i])) {
                            return err;
                        }
                    }
                }
                return null;
            };})($types);

            /**
             * Converts a MethodOptions message.
             * @function
             * @param {google.protobuf.MethodOptions|Object} source MethodOptions message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.MethodOptions|Object} Converted message
             */
            MethodOptions.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (dst.deprecated === undefined && options.defaults) {
                        dst.deprecated = false;
                    }
                    dst.idempotencyLevel = impl.enums(src.idempotencyLevel, 0, types[1], options);
                    if (src.uninterpretedOption && src.uninterpretedOption.length) {
                        dst.uninterpretedOption = [];
                        for (var i = 0; i < src.uninterpretedOption.length; ++i) {
                            dst.uninterpretedOption.push(types[2].convert(src.uninterpretedOption[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.uninterpretedOption = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a MethodOptions message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.MethodOptions} MethodOptions
             */
            MethodOptions.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this MethodOptions message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            /**
             * IdempotencyLevel enum.
             * @name IdempotencyLevel
             * @memberof google.protobuf.MethodOptions
             * @enum {number}
             * @property {number} IDEMPOTENCY_UNKNOWN=0 IDEMPOTENCY_UNKNOWN value
             * @property {number} NO_SIDE_EFFECTS=1 NO_SIDE_EFFECTS value
             * @property {number} IDEMPOTENT=2 IDEMPOTENT value
             */
            MethodOptions.IdempotencyLevel = (function() {
                var valuesById = {},
                    values = Object.create(valuesById);
                values[valuesById[0] = "IDEMPOTENCY_UNKNOWN"] = 0;
                values[valuesById[1] = "NO_SIDE_EFFECTS"] = 1;
                values[valuesById[2] = "IDEMPOTENT"] = 2;
                return values;
            })();

            return MethodOptions;
        })();

        protobuf.UninterpretedOption = (function() {

            /**
             * Constructs a new UninterpretedOption.
             * @exports google.protobuf.UninterpretedOption
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function UninterpretedOption(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.UninterpretedOption.prototype */
            var $prototype = UninterpretedOption.prototype;

            /**
             * UninterpretedOption name.
             * @type {Array.<google.protobuf.UninterpretedOption.NamePart>}
             */
            $prototype.name = $protobuf.util.emptyArray;

            /**
             * UninterpretedOption identifierValue.
             * @type {string}
             */
            $prototype.identifierValue = "";

            /**
             * UninterpretedOption positiveIntValue.
             * @type {number|Long}
             */
            $prototype.positiveIntValue = $protobuf.util.emptyObject;

            /**
             * UninterpretedOption negativeIntValue.
             * @type {number|Long}
             */
            $prototype.negativeIntValue = $protobuf.util.emptyObject;

            /**
             * UninterpretedOption doubleValue.
             * @type {number}
             */
            $prototype.doubleValue = 0;

            /**
             * UninterpretedOption stringValue.
             * @type {Uint8Array}
             */
            $prototype.stringValue = $protobuf.util.emptyArray;

            /**
             * UninterpretedOption aggregateValue.
             * @type {string}
             */
            $prototype.aggregateValue = "";

            // Referenced types
            var $types = ["google.protobuf.UninterpretedOption.NamePart", null, null, null, null, null, null]; $lazyTypes.push($types);

            /**
             * Creates a new UninterpretedOption instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption instance
             */
            UninterpretedOption.create = function create(properties) {
                return new UninterpretedOption(properties);
            };

            /**
             * Encodes the specified UninterpretedOption message.
             * @function
             * @param {google.protobuf.UninterpretedOption|Object} message UninterpretedOption message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UninterpretedOption.encode = (function(Writer, util, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.name) {
                    for (var i = 0; i < message.name.length; ++i) {
                        types[0].encode(message.name[i], writer.uint32(18).fork()).ldelim();
                    }
                }
                if (message.identifierValue !== undefined && message.identifierValue !== "") {
                    writer.uint32(26).string(message.identifierValue);
                }
                if (message.positiveIntValue !== undefined && message.positiveIntValue !== null && util.longNe(message.positiveIntValue, 0, 0)) {
                    writer.uint32(32).uint64(message.positiveIntValue);
                }
                if (message.negativeIntValue !== undefined && message.negativeIntValue !== null && util.longNe(message.negativeIntValue, 0, 0)) {
                    writer.uint32(40).int64(message.negativeIntValue);
                }
                if (message.doubleValue !== undefined && message.doubleValue !== 0) {
                    writer.uint32(49).double(message.doubleValue);
                }
                if (message.stringValue !== undefined && message.stringValue !== []) {
                    writer.uint32(58).bytes(message.stringValue);
                }
                if (message.aggregateValue !== undefined && message.aggregateValue !== "") {
                    writer.uint32(66).string(message.aggregateValue);
                }
                return writer;
            };})($protobuf.Writer, $protobuf.util, $types);

            /**
             * Encodes the specified UninterpretedOption message, length delimited.
             * @param {google.protobuf.UninterpretedOption|Object} message UninterpretedOption message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UninterpretedOption.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an UninterpretedOption message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption
             */
            UninterpretedOption.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.UninterpretedOption();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        if (!(message.name && message.name.length)) {
                            message.name = [];
                        }
                        message.name.push(types[0].decode(reader, reader.uint32()));
                        break;

                    case 3:
                        message.identifierValue = reader.string();
                        break;

                    case 4:
                        message.positiveIntValue = reader.uint64();
                        break;

                    case 5:
                        message.negativeIntValue = reader.int64();
                        break;

                    case 6:
                        message.doubleValue = reader.double();
                        break;

                    case 7:
                        message.stringValue = reader.bytes();
                        break;

                    case 8:
                        message.aggregateValue = reader.string();
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes an UninterpretedOption message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption
             */
            UninterpretedOption.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies an UninterpretedOption message.
             * @function
             * @param {google.protobuf.UninterpretedOption|Object} message UninterpretedOption message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            UninterpretedOption.verify = (function(util, types) { return function verify(message) {
                if (message.name !== undefined) {
                    if (!Array.isArray(message.name)) {
                        return "google.protobuf.UninterpretedOption.name: array expected";
                    }
                    for (var i = 0; i < message.name.length; ++i) {
                        var err;
                        if (err = types[0].verify(message.name[i])) {
                            return err;
                        }
                    }
                }
                if (message.identifierValue !== undefined) {
                    if (!util.isString(message.identifierValue)) {
                        return "google.protobuf.UninterpretedOption.identifierValue: string expected";
                    }
                }
                if (message.positiveIntValue !== undefined) {
                    if (!util.isInteger(message.positiveIntValue) && !(message.positiveIntValue && util.isInteger(message.positiveIntValue.low) && util.isInteger(message.positiveIntValue.high))) {
                        return "google.protobuf.UninterpretedOption.positiveIntValue: integer|Long expected";
                    }
                }
                if (message.negativeIntValue !== undefined) {
                    if (!util.isInteger(message.negativeIntValue) && !(message.negativeIntValue && util.isInteger(message.negativeIntValue.low) && util.isInteger(message.negativeIntValue.high))) {
                        return "google.protobuf.UninterpretedOption.negativeIntValue: integer|Long expected";
                    }
                }
                if (message.doubleValue !== undefined) {
                    if (typeof message.doubleValue !== "number") {
                        return "google.protobuf.UninterpretedOption.doubleValue: number expected";
                    }
                }
                if (message.stringValue !== undefined) {
                    if (!(message.stringValue && typeof message.stringValue.length === "number" || util.isString(message.stringValue))) {
                        return "google.protobuf.UninterpretedOption.stringValue: buffer expected";
                    }
                }
                if (message.aggregateValue !== undefined) {
                    if (!util.isString(message.aggregateValue)) {
                        return "google.protobuf.UninterpretedOption.aggregateValue: string expected";
                    }
                }
                return null;
            };})($protobuf.util, $types);

            /**
             * Converts an UninterpretedOption message.
             * @function
             * @param {google.protobuf.UninterpretedOption|Object} source UninterpretedOption message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.UninterpretedOption|Object} Converted message
             */
            UninterpretedOption.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (src.name && src.name.length) {
                        dst.name = [];
                        for (var i = 0; i < src.name.length; ++i) {
                            dst.name.push(types[0].convert(src.name[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.name = [];
                        }
                    }
                    if (dst.identifierValue === undefined && options.defaults) {
                        dst.identifierValue = "";
                    }
                    dst.positiveIntValue = impl.longs(src.positiveIntValue, 0, 0, true, options);
                    dst.negativeIntValue = impl.longs(src.negativeIntValue, 0, 0, false, options);
                    if (dst.doubleValue === undefined && options.defaults) {
                        dst.doubleValue = 0;
                    }
                    dst.stringValue = impl.bytes(src.stringValue, [], options);
                    if (dst.aggregateValue === undefined && options.defaults) {
                        dst.aggregateValue = "";
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates an UninterpretedOption message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption
             */
            UninterpretedOption.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this UninterpretedOption message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            UninterpretedOption.NamePart = (function() {

                /**
                 * Constructs a new NamePart.
                 * @exports google.protobuf.UninterpretedOption.NamePart
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                function NamePart(properties) {
                    if (properties) {
                        var keys = Object.keys(properties);
                        for (var i = 0; i < keys.length; ++i)
                            this[keys[i]] = properties[keys[i]];
                    }
                }

                /** @alias google.protobuf.UninterpretedOption.NamePart.prototype */
                var $prototype = NamePart.prototype;

                /**
                 * NamePart namePart.
                 * @type {string}
                 */
                $prototype.namePart = "";

                /**
                 * NamePart isExtension.
                 * @type {boolean}
                 */
                $prototype.isExtension = false;

                /**
                 * Creates a new NamePart instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart instance
                 */
                NamePart.create = function create(properties) {
                    return new NamePart(properties);
                };

                /**
                 * Encodes the specified NamePart message.
                 * @function
                 * @param {google.protobuf.UninterpretedOption.NamePart|Object} message NamePart message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NamePart.encode = (function(Writer) { return function encode(message, writer) {
                    if (!writer) {
                        writer = Writer.create();
                    }
                    writer.uint32(10).string(message.namePart);
                    writer.uint32(16).bool(message.isExtension);
                    return writer;
                };})($protobuf.Writer);

                /**
                 * Encodes the specified NamePart message, length delimited.
                 * @param {google.protobuf.UninterpretedOption.NamePart|Object} message NamePart message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NamePart.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a NamePart message from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart
                 */
                NamePart.decode = (function(Reader) { return function decode(reader, len) {
                    if (!(reader instanceof Reader)) {
                        reader = Reader.create(reader);
                    }
                    var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.UninterpretedOption.NamePart();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.namePart = reader.string();
                            break;

                        case 2:
                            message.isExtension = reader.bool();
                            break;

                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };})($protobuf.Reader);

                /**
                 * Decodes a NamePart message from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart
                 */
                NamePart.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a NamePart message.
                 * @function
                 * @param {google.protobuf.UninterpretedOption.NamePart|Object} message NamePart message or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                NamePart.verify = (function(util) { return function verify(message) {
                    if (!util.isString(message.namePart)) {
                        return "google.protobuf.UninterpretedOption.NamePart.namePart: string expected";
                    }
                    if (typeof message.isExtension !== "boolean") {
                        return "google.protobuf.UninterpretedOption.NamePart.isExtension: boolean expected";
                    }
                    return null;
                };})($protobuf.util);

                /**
                 * Converts a NamePart message.
                 * @function
                 * @param {google.protobuf.UninterpretedOption.NamePart|Object} source NamePart message or plain object to convert
                 * @param {*} impl Converter implementation to use
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {google.protobuf.UninterpretedOption.NamePart|Object} Converted message
                 */
                NamePart.convert = (function() { return function convert(src, impl, options) {
                    if (!options) {
                        options = {};
                    }
                    var dst = impl.create(src, this, options);
                    if (dst) {
                        if (dst.namePart === undefined && options.defaults) {
                            dst.namePart = "";
                        }
                        if (dst.isExtension === undefined && options.defaults) {
                            dst.isExtension = false;
                        }
                    }
                    return dst;
                };})();

                /**
                 * Creates a NamePart message from JSON.
                 * @param {Object.<string,*>} source Source object
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart
                 */
                NamePart.from = function from(source, options) {
                    return this.convert(source, $protobuf.converters.message, options);
                };

                /**
                 * Converts this NamePart message to JSON.
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {Object.<string,*>} JSON object
                 */
                $prototype.asJSON = function asJSON(options) {
                    return this.constructor.convert(this, $protobuf.converters.json, options);
                };

                return NamePart;
            })();

            return UninterpretedOption;
        })();

        protobuf.SourceCodeInfo = (function() {

            /**
             * Constructs a new SourceCodeInfo.
             * @exports google.protobuf.SourceCodeInfo
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function SourceCodeInfo(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.SourceCodeInfo.prototype */
            var $prototype = SourceCodeInfo.prototype;

            /**
             * SourceCodeInfo location.
             * @type {Array.<google.protobuf.SourceCodeInfo.Location>}
             */
            $prototype.location = $protobuf.util.emptyArray;

            // Referenced types
            var $types = ["google.protobuf.SourceCodeInfo.Location"]; $lazyTypes.push($types);

            /**
             * Creates a new SourceCodeInfo instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo instance
             */
            SourceCodeInfo.create = function create(properties) {
                return new SourceCodeInfo(properties);
            };

            /**
             * Encodes the specified SourceCodeInfo message.
             * @function
             * @param {google.protobuf.SourceCodeInfo|Object} message SourceCodeInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SourceCodeInfo.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.location) {
                    for (var i = 0; i < message.location.length; ++i) {
                        types[0].encode(message.location[i], writer.uint32(10).fork()).ldelim();
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified SourceCodeInfo message, length delimited.
             * @param {google.protobuf.SourceCodeInfo|Object} message SourceCodeInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SourceCodeInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SourceCodeInfo message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo
             */
            SourceCodeInfo.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.SourceCodeInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.location && message.location.length)) {
                            message.location = [];
                        }
                        message.location.push(types[0].decode(reader, reader.uint32()));
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a SourceCodeInfo message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo
             */
            SourceCodeInfo.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a SourceCodeInfo message.
             * @function
             * @param {google.protobuf.SourceCodeInfo|Object} message SourceCodeInfo message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            SourceCodeInfo.verify = (function(types) { return function verify(message) {
                if (message.location !== undefined) {
                    if (!Array.isArray(message.location)) {
                        return "google.protobuf.SourceCodeInfo.location: array expected";
                    }
                    for (var i = 0; i < message.location.length; ++i) {
                        var err;
                        if (err = types[0].verify(message.location[i])) {
                            return err;
                        }
                    }
                }
                return null;
            };})($types);

            /**
             * Converts a SourceCodeInfo message.
             * @function
             * @param {google.protobuf.SourceCodeInfo|Object} source SourceCodeInfo message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.SourceCodeInfo|Object} Converted message
             */
            SourceCodeInfo.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (src.location && src.location.length) {
                        dst.location = [];
                        for (var i = 0; i < src.location.length; ++i) {
                            dst.location.push(types[0].convert(src.location[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.location = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a SourceCodeInfo message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo
             */
            SourceCodeInfo.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this SourceCodeInfo message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            SourceCodeInfo.Location = (function() {

                /**
                 * Constructs a new Location.
                 * @exports google.protobuf.SourceCodeInfo.Location
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                function Location(properties) {
                    if (properties) {
                        var keys = Object.keys(properties);
                        for (var i = 0; i < keys.length; ++i)
                            this[keys[i]] = properties[keys[i]];
                    }
                }

                /** @alias google.protobuf.SourceCodeInfo.Location.prototype */
                var $prototype = Location.prototype;

                /**
                 * Location path.
                 * @type {Array.<number>}
                 */
                $prototype.path = $protobuf.util.emptyArray;

                /**
                 * Location span.
                 * @type {Array.<number>}
                 */
                $prototype.span = $protobuf.util.emptyArray;

                /**
                 * Location leadingComments.
                 * @type {string}
                 */
                $prototype.leadingComments = "";

                /**
                 * Location trailingComments.
                 * @type {string}
                 */
                $prototype.trailingComments = "";

                /**
                 * Location leadingDetachedComments.
                 * @type {Array.<string>}
                 */
                $prototype.leadingDetachedComments = $protobuf.util.emptyArray;

                /**
                 * Creates a new Location instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location instance
                 */
                Location.create = function create(properties) {
                    return new Location(properties);
                };

                /**
                 * Encodes the specified Location message.
                 * @function
                 * @param {google.protobuf.SourceCodeInfo.Location|Object} message Location message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Location.encode = (function(Writer) { return function encode(message, writer) {
                    if (!writer) {
                        writer = Writer.create();
                    }
                    if (message.path && message.path.length) {
                        writer.uint32(10).fork();
                        for (var i = 0; i < message.path.length; ++i) {
                            writer.int32(message.path[i]);
                        }
                        writer.ldelim();
                    }
                    if (message.span && message.span.length) {
                        writer.uint32(18).fork();
                        for (var i = 0; i < message.span.length; ++i) {
                            writer.int32(message.span[i]);
                        }
                        writer.ldelim();
                    }
                    if (message.leadingComments !== undefined && message.leadingComments !== "") {
                        writer.uint32(26).string(message.leadingComments);
                    }
                    if (message.trailingComments !== undefined && message.trailingComments !== "") {
                        writer.uint32(34).string(message.trailingComments);
                    }
                    if (message.leadingDetachedComments) {
                        for (var i = 0; i < message.leadingDetachedComments.length; ++i) {
                            writer.uint32(50).string(message.leadingDetachedComments[i]);
                        }
                    }
                    return writer;
                };})($protobuf.Writer);

                /**
                 * Encodes the specified Location message, length delimited.
                 * @param {google.protobuf.SourceCodeInfo.Location|Object} message Location message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Location.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Location message from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location
                 */
                Location.decode = (function(Reader) { return function decode(reader, len) {
                    if (!(reader instanceof Reader)) {
                        reader = Reader.create(reader);
                    }
                    var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.SourceCodeInfo.Location();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.path && message.path.length)) {
                                message.path = [];
                            }
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2) {
                                    message.path.push(reader.int32());
                                }
                            } else {
                                message.path.push(reader.int32());
                            }
                            break;

                        case 2:
                            if (!(message.span && message.span.length)) {
                                message.span = [];
                            }
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2) {
                                    message.span.push(reader.int32());
                                }
                            } else {
                                message.span.push(reader.int32());
                            }
                            break;

                        case 3:
                            message.leadingComments = reader.string();
                            break;

                        case 4:
                            message.trailingComments = reader.string();
                            break;

                        case 6:
                            if (!(message.leadingDetachedComments && message.leadingDetachedComments.length)) {
                                message.leadingDetachedComments = [];
                            }
                            message.leadingDetachedComments.push(reader.string());
                            break;

                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };})($protobuf.Reader);

                /**
                 * Decodes a Location message from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location
                 */
                Location.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a Location message.
                 * @function
                 * @param {google.protobuf.SourceCodeInfo.Location|Object} message Location message or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Location.verify = (function(util) { return function verify(message) {
                    if (message.path !== undefined) {
                        if (!Array.isArray(message.path)) {
                            return "google.protobuf.SourceCodeInfo.Location.path: array expected";
                        }
                        for (var i = 0; i < message.path.length; ++i) {
                            if (!util.isInteger(message.path[i])) {
                                return "google.protobuf.SourceCodeInfo.Location.path: integer[] expected";
                            }
                        }
                    }
                    if (message.span !== undefined) {
                        if (!Array.isArray(message.span)) {
                            return "google.protobuf.SourceCodeInfo.Location.span: array expected";
                        }
                        for (var i = 0; i < message.span.length; ++i) {
                            if (!util.isInteger(message.span[i])) {
                                return "google.protobuf.SourceCodeInfo.Location.span: integer[] expected";
                            }
                        }
                    }
                    if (message.leadingComments !== undefined) {
                        if (!util.isString(message.leadingComments)) {
                            return "google.protobuf.SourceCodeInfo.Location.leadingComments: string expected";
                        }
                    }
                    if (message.trailingComments !== undefined) {
                        if (!util.isString(message.trailingComments)) {
                            return "google.protobuf.SourceCodeInfo.Location.trailingComments: string expected";
                        }
                    }
                    if (message.leadingDetachedComments !== undefined) {
                        if (!Array.isArray(message.leadingDetachedComments)) {
                            return "google.protobuf.SourceCodeInfo.Location.leadingDetachedComments: array expected";
                        }
                        for (var i = 0; i < message.leadingDetachedComments.length; ++i) {
                            if (!util.isString(message.leadingDetachedComments[i])) {
                                return "google.protobuf.SourceCodeInfo.Location.leadingDetachedComments: string[] expected";
                            }
                        }
                    }
                    return null;
                };})($protobuf.util);

                /**
                 * Converts a Location message.
                 * @function
                 * @param {google.protobuf.SourceCodeInfo.Location|Object} source Location message or plain object to convert
                 * @param {*} impl Converter implementation to use
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {google.protobuf.SourceCodeInfo.Location|Object} Converted message
                 */
                Location.convert = (function() { return function convert(src, impl, options) {
                    if (!options) {
                        options = {};
                    }
                    var dst = impl.create(src, this, options);
                    if (dst) {
                        if (src.path && src.path.length) {
                            dst.path = [];
                            for (var i = 0; i < src.path.length; ++i) {
                                dst.path.push(src.path[i]);
                            }
                        } else {
                            if (options.defaults || options.arrays) {
                                dst.path = [];
                            }
                        }
                        if (src.span && src.span.length) {
                            dst.span = [];
                            for (var i = 0; i < src.span.length; ++i) {
                                dst.span.push(src.span[i]);
                            }
                        } else {
                            if (options.defaults || options.arrays) {
                                dst.span = [];
                            }
                        }
                        if (dst.leadingComments === undefined && options.defaults) {
                            dst.leadingComments = "";
                        }
                        if (dst.trailingComments === undefined && options.defaults) {
                            dst.trailingComments = "";
                        }
                        if (src.leadingDetachedComments && src.leadingDetachedComments.length) {
                            dst.leadingDetachedComments = [];
                            for (var i = 0; i < src.leadingDetachedComments.length; ++i) {
                                dst.leadingDetachedComments.push(src.leadingDetachedComments[i]);
                            }
                        } else {
                            if (options.defaults || options.arrays) {
                                dst.leadingDetachedComments = [];
                            }
                        }
                    }
                    return dst;
                };})();

                /**
                 * Creates a Location message from JSON.
                 * @param {Object.<string,*>} source Source object
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location
                 */
                Location.from = function from(source, options) {
                    return this.convert(source, $protobuf.converters.message, options);
                };

                /**
                 * Converts this Location message to JSON.
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {Object.<string,*>} JSON object
                 */
                $prototype.asJSON = function asJSON(options) {
                    return this.constructor.convert(this, $protobuf.converters.json, options);
                };

                return Location;
            })();

            return SourceCodeInfo;
        })();

        protobuf.GeneratedCodeInfo = (function() {

            /**
             * Constructs a new GeneratedCodeInfo.
             * @exports google.protobuf.GeneratedCodeInfo
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            function GeneratedCodeInfo(properties) {
                if (properties) {
                    var keys = Object.keys(properties);
                    for (var i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
                }
            }

            /** @alias google.protobuf.GeneratedCodeInfo.prototype */
            var $prototype = GeneratedCodeInfo.prototype;

            /**
             * GeneratedCodeInfo annotation.
             * @type {Array.<google.protobuf.GeneratedCodeInfo.Annotation>}
             */
            $prototype.annotation = $protobuf.util.emptyArray;

            // Referenced types
            var $types = ["google.protobuf.GeneratedCodeInfo.Annotation"]; $lazyTypes.push($types);

            /**
             * Creates a new GeneratedCodeInfo instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo instance
             */
            GeneratedCodeInfo.create = function create(properties) {
                return new GeneratedCodeInfo(properties);
            };

            /**
             * Encodes the specified GeneratedCodeInfo message.
             * @function
             * @param {google.protobuf.GeneratedCodeInfo|Object} message GeneratedCodeInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GeneratedCodeInfo.encode = (function(Writer, types) { return function encode(message, writer) {
                if (!writer) {
                    writer = Writer.create();
                }
                if (message.annotation) {
                    for (var i = 0; i < message.annotation.length; ++i) {
                        types[0].encode(message.annotation[i], writer.uint32(10).fork()).ldelim();
                    }
                }
                return writer;
            };})($protobuf.Writer, $types);

            /**
             * Encodes the specified GeneratedCodeInfo message, length delimited.
             * @param {google.protobuf.GeneratedCodeInfo|Object} message GeneratedCodeInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GeneratedCodeInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo
             */
            GeneratedCodeInfo.decode = (function(Reader, types) { return function decode(reader, len) {
                if (!(reader instanceof Reader)) {
                    reader = Reader.create(reader);
                }
                var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.GeneratedCodeInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.annotation && message.annotation.length)) {
                            message.annotation = [];
                        }
                        message.annotation.push(types[0].decode(reader, reader.uint32()));
                        break;

                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };})($protobuf.Reader, $types);

            /**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo
             */
            GeneratedCodeInfo.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a GeneratedCodeInfo message.
             * @function
             * @param {google.protobuf.GeneratedCodeInfo|Object} message GeneratedCodeInfo message or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            GeneratedCodeInfo.verify = (function(types) { return function verify(message) {
                if (message.annotation !== undefined) {
                    if (!Array.isArray(message.annotation)) {
                        return "google.protobuf.GeneratedCodeInfo.annotation: array expected";
                    }
                    for (var i = 0; i < message.annotation.length; ++i) {
                        var err;
                        if (err = types[0].verify(message.annotation[i])) {
                            return err;
                        }
                    }
                }
                return null;
            };})($types);

            /**
             * Converts a GeneratedCodeInfo message.
             * @function
             * @param {google.protobuf.GeneratedCodeInfo|Object} source GeneratedCodeInfo message or plain object to convert
             * @param {*} impl Converter implementation to use
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.GeneratedCodeInfo|Object} Converted message
             */
            GeneratedCodeInfo.convert = (function(types) { return function convert(src, impl, options) {
                if (!options) {
                    options = {};
                }
                var dst = impl.create(src, this, options);
                if (dst) {
                    if (src.annotation && src.annotation.length) {
                        dst.annotation = [];
                        for (var i = 0; i < src.annotation.length; ++i) {
                            dst.annotation.push(types[0].convert(src.annotation[i], impl, options));
                        }
                    } else {
                        if (options.defaults || options.arrays) {
                            dst.annotation = [];
                        }
                    }
                }
                return dst;
            };})($types);

            /**
             * Creates a GeneratedCodeInfo message from JSON.
             * @param {Object.<string,*>} source Source object
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo
             */
            GeneratedCodeInfo.from = function from(source, options) {
                return this.convert(source, $protobuf.converters.message, options);
            };

            /**
             * Converts this GeneratedCodeInfo message to JSON.
             * @param {Object.<string,*>} [options] Conversion options
             * @returns {Object.<string,*>} JSON object
             */
            $prototype.asJSON = function asJSON(options) {
                return this.constructor.convert(this, $protobuf.converters.json, options);
            };

            GeneratedCodeInfo.Annotation = (function() {

                /**
                 * Constructs a new Annotation.
                 * @exports google.protobuf.GeneratedCodeInfo.Annotation
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                function Annotation(properties) {
                    if (properties) {
                        var keys = Object.keys(properties);
                        for (var i = 0; i < keys.length; ++i)
                            this[keys[i]] = properties[keys[i]];
                    }
                }

                /** @alias google.protobuf.GeneratedCodeInfo.Annotation.prototype */
                var $prototype = Annotation.prototype;

                /**
                 * Annotation path.
                 * @type {Array.<number>}
                 */
                $prototype.path = $protobuf.util.emptyArray;

                /**
                 * Annotation sourceFile.
                 * @type {string}
                 */
                $prototype.sourceFile = "";

                /**
                 * Annotation begin.
                 * @type {number}
                 */
                $prototype.begin = 0;

                /**
                 * Annotation end.
                 * @type {number}
                 */
                $prototype.end = 0;

                /**
                 * Creates a new Annotation instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation instance
                 */
                Annotation.create = function create(properties) {
                    return new Annotation(properties);
                };

                /**
                 * Encodes the specified Annotation message.
                 * @function
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation|Object} message Annotation message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Annotation.encode = (function(Writer) { return function encode(message, writer) {
                    if (!writer) {
                        writer = Writer.create();
                    }
                    if (message.path && message.path.length) {
                        writer.uint32(10).fork();
                        for (var i = 0; i < message.path.length; ++i) {
                            writer.int32(message.path[i]);
                        }
                        writer.ldelim();
                    }
                    if (message.sourceFile !== undefined && message.sourceFile !== "") {
                        writer.uint32(18).string(message.sourceFile);
                    }
                    if (message.begin !== undefined && message.begin !== 0) {
                        writer.uint32(24).int32(message.begin);
                    }
                    if (message.end !== undefined && message.end !== 0) {
                        writer.uint32(32).int32(message.end);
                    }
                    return writer;
                };})($protobuf.Writer);

                /**
                 * Encodes the specified Annotation message, length delimited.
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation|Object} message Annotation message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Annotation.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Annotation message from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation
                 */
                Annotation.decode = (function(Reader) { return function decode(reader, len) {
                    if (!(reader instanceof Reader)) {
                        reader = Reader.create(reader);
                    }
                    var end = len === undefined ? reader.len : reader.pos + len, message = new $root.google.protobuf.GeneratedCodeInfo.Annotation();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.path && message.path.length)) {
                                message.path = [];
                            }
                            if ((tag & 7) === 2) {
                                var end2 = reader.uint32() + reader.pos;
                                while (reader.pos < end2) {
                                    message.path.push(reader.int32());
                                }
                            } else {
                                message.path.push(reader.int32());
                            }
                            break;

                        case 2:
                            message.sourceFile = reader.string();
                            break;

                        case 3:
                            message.begin = reader.int32();
                            break;

                        case 4:
                            message.end = reader.int32();
                            break;

                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };})($protobuf.Reader);

                /**
                 * Decodes an Annotation message from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation
                 */
                Annotation.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies an Annotation message.
                 * @function
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation|Object} message Annotation message or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Annotation.verify = (function(util) { return function verify(message) {
                    if (message.path !== undefined) {
                        if (!Array.isArray(message.path)) {
                            return "google.protobuf.GeneratedCodeInfo.Annotation.path: array expected";
                        }
                        for (var i = 0; i < message.path.length; ++i) {
                            if (!util.isInteger(message.path[i])) {
                                return "google.protobuf.GeneratedCodeInfo.Annotation.path: integer[] expected";
                            }
                        }
                    }
                    if (message.sourceFile !== undefined) {
                        if (!util.isString(message.sourceFile)) {
                            return "google.protobuf.GeneratedCodeInfo.Annotation.sourceFile: string expected";
                        }
                    }
                    if (message.begin !== undefined) {
                        if (!util.isInteger(message.begin)) {
                            return "google.protobuf.GeneratedCodeInfo.Annotation.begin: integer expected";
                        }
                    }
                    if (message.end !== undefined) {
                        if (!util.isInteger(message.end)) {
                            return "google.protobuf.GeneratedCodeInfo.Annotation.end: integer expected";
                        }
                    }
                    return null;
                };})($protobuf.util);

                /**
                 * Converts an Annotation message.
                 * @function
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation|Object} source Annotation message or plain object to convert
                 * @param {*} impl Converter implementation to use
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation|Object} Converted message
                 */
                Annotation.convert = (function() { return function convert(src, impl, options) {
                    if (!options) {
                        options = {};
                    }
                    var dst = impl.create(src, this, options);
                    if (dst) {
                        if (src.path && src.path.length) {
                            dst.path = [];
                            for (var i = 0; i < src.path.length; ++i) {
                                dst.path.push(src.path[i]);
                            }
                        } else {
                            if (options.defaults || options.arrays) {
                                dst.path = [];
                            }
                        }
                        if (dst.sourceFile === undefined && options.defaults) {
                            dst.sourceFile = "";
                        }
                        if (dst.begin === undefined && options.defaults) {
                            dst.begin = 0;
                        }
                        if (dst.end === undefined && options.defaults) {
                            dst.end = 0;
                        }
                    }
                    return dst;
                };})();

                /**
                 * Creates an Annotation message from JSON.
                 * @param {Object.<string,*>} source Source object
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation
                 */
                Annotation.from = function from(source, options) {
                    return this.convert(source, $protobuf.converters.message, options);
                };

                /**
                 * Converts this Annotation message to JSON.
                 * @param {Object.<string,*>} [options] Conversion options
                 * @returns {Object.<string,*>} JSON object
                 */
                $prototype.asJSON = function asJSON(options) {
                    return this.constructor.convert(this, $protobuf.converters.json, options);
                };

                return Annotation;
            })();

            return GeneratedCodeInfo;
        })();

        return protobuf;
    })();

    return google;
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

$protobuf.roots["test_test"] = $root;

module.exports = $root;
