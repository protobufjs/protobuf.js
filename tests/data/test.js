"use strict"; // eslint-disable-line strict

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

            /**
             * Creates a new Empty instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Empty} Empty instance
             */
            Empty.create = function create(properties) {
                return new Empty(properties);
            };

            /**
             * Encodes the specified Empty.
             * @function
             * @param {jspb.test.Empty|Object} message Empty or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                return writer
            }})($protobuf.Writer, $protobuf.util, []); /* eslint-enable */

            /**
             * Encodes the specified Empty, length delimited.
             * @param {jspb.test.Empty|Object} message Empty or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Empty from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Empty} Empty
             */
            Empty.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.Empty
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, []); /* eslint-enable */

            /**
             * Decodes a Empty from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Empty} Empty
             */
            Empty.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Empty.
             * @function
             * @param {jspb.test.Empty|Object} message Empty or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Empty.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                return null
            }})($protobuf.util, []); /* eslint-enable */

            return Empty;
        })();

        /**
         * OuterEnum values.
         * @exports jspb.test.OuterEnum
         * @type {Object.<string,number>}
         */
        test.OuterEnum = {

            FOO: 1,
            BAR: 2
        };

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

            /**
             * Creates a new EnumContainer instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.EnumContainer} EnumContainer instance
             */
            EnumContainer.create = function create(properties) {
                return new EnumContainer(properties);
            };

            /**
             * Encodes the specified EnumContainer.
             * @function
             * @param {jspb.test.EnumContainer|Object} message EnumContainer or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumContainer.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.outerEnum !== undefined && message.outerEnum !== 0)
                    writer.uint32(8/*= id 1, wireType 0 */).uint32(message.outerEnum)
                return writer
            }})($protobuf.Writer, $protobuf.util, ["jspb.test.OuterEnum"]); /* eslint-enable */

            /**
             * Encodes the specified EnumContainer, length delimited.
             * @param {jspb.test.EnumContainer|Object} message EnumContainer or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumContainer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a EnumContainer from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.EnumContainer} EnumContainer
             */
            EnumContainer.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.EnumContainer
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.outerEnum = reader.uint32()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, ["jspb.test.OuterEnum"]); /* eslint-enable */

            /**
             * Decodes a EnumContainer from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.EnumContainer} EnumContainer
             */
            EnumContainer.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a EnumContainer.
             * @function
             * @param {jspb.test.EnumContainer|Object} message EnumContainer or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            EnumContainer.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.outerEnum !== undefined) {
                    switch (message.outerEnum) {
                        default:
                            return "invalid value for field .jspb.test.EnumContainer.outerEnum (enum value expected)"
                        case 1:
                        case 2:
                            break
                    }
                }
                return null
            }})($protobuf.util, ["jspb.test.OuterEnum"]); /* eslint-enable */

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
             * Encodes the specified Simple1.
             * @function
             * @param {jspb.test.Simple1|Object} message Simple1 or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Simple1.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                writer.uint32(10/*= id 1, wireType 2 */).string(message.aString)
                if (message.aRepeatedString)
                    for (var i = 0; i < message.aRepeatedString.length; ++i)
                    writer.uint32(18/*= id 2, wireType 2 */).string(message.aRepeatedString[i])
                if (message.aBoolean !== undefined && message.aBoolean !== false)
                    writer.uint32(24/*= id 3, wireType 0 */).bool(message.aBoolean)
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, null]); /* eslint-enable */

            /**
             * Encodes the specified Simple1, length delimited.
             * @param {jspb.test.Simple1|Object} message Simple1 or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Simple1.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Simple1 from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Simple1} Simple1
             */
            Simple1.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.Simple1
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.aString = reader.string()
                            break
                        case 2:
                            message.aRepeatedString && message.aRepeatedString.length || (message.aRepeatedString = [])
                            message.aRepeatedString.push(reader.string())
                            break
                        case 3:
                            message.aBoolean = reader.bool()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, null]); /* eslint-enable */

            /**
             * Decodes a Simple1 from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Simple1} Simple1
             */
            Simple1.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Simple1.
             * @function
             * @param {jspb.test.Simple1|Object} message Simple1 or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Simple1.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (!util.isString(message.aString))
                    return "invalid value for field .jspb.test.Simple1.aString (string expected)"
                if (message.aRepeatedString !== undefined) {
                    if (!Array.isArray(message.aRepeatedString))
                        return "invalid value for field .jspb.test.Simple1.aRepeatedString (array expected)"
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        if (!util.isString(message.aRepeatedString[i]))
                            return "invalid value for field .jspb.test.Simple1.aRepeatedString (string[] expected)"
                    }
                }
                if (message.aBoolean !== undefined) {
                    if (typeof message.aBoolean !== "boolean")
                        return "invalid value for field .jspb.test.Simple1.aBoolean (boolean expected)"
                }
                return null
            }})($protobuf.util, [null, null, null]); /* eslint-enable */

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
             * Encodes the specified Simple2.
             * @function
             * @param {jspb.test.Simple2|Object} message Simple2 or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Simple2.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                writer.uint32(10/*= id 1, wireType 2 */).string(message.aString)
                if (message.aRepeatedString)
                    for (var i = 0; i < message.aRepeatedString.length; ++i)
                    writer.uint32(18/*= id 2, wireType 2 */).string(message.aRepeatedString[i])
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null]); /* eslint-enable */

            /**
             * Encodes the specified Simple2, length delimited.
             * @param {jspb.test.Simple2|Object} message Simple2 or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Simple2.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Simple2 from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Simple2} Simple2
             */
            Simple2.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.Simple2
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.aString = reader.string()
                            break
                        case 2:
                            message.aRepeatedString && message.aRepeatedString.length || (message.aRepeatedString = [])
                            message.aRepeatedString.push(reader.string())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null]); /* eslint-enable */

            /**
             * Decodes a Simple2 from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Simple2} Simple2
             */
            Simple2.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Simple2.
             * @function
             * @param {jspb.test.Simple2|Object} message Simple2 or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Simple2.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (!util.isString(message.aString))
                    return "invalid value for field .jspb.test.Simple2.aString (string expected)"
                if (message.aRepeatedString !== undefined) {
                    if (!Array.isArray(message.aRepeatedString))
                        return "invalid value for field .jspb.test.Simple2.aRepeatedString (array expected)"
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        if (!util.isString(message.aRepeatedString[i]))
                            return "invalid value for field .jspb.test.Simple2.aRepeatedString (string[] expected)"
                    }
                }
                return null
            }})($protobuf.util, [null, null]); /* eslint-enable */

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
             * Encodes the specified SpecialCases.
             * @function
             * @param {jspb.test.SpecialCases|Object} message SpecialCases or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SpecialCases.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                writer.uint32(10/*= id 1, wireType 2 */).string(message.normal)
                writer.uint32(18/*= id 2, wireType 2 */).string(message["default"])
                writer.uint32(26/*= id 3, wireType 2 */).string(message["function"])
                writer.uint32(34/*= id 4, wireType 2 */).string(message["var"])
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, null, null]); /* eslint-enable */

            /**
             * Encodes the specified SpecialCases, length delimited.
             * @param {jspb.test.SpecialCases|Object} message SpecialCases or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SpecialCases.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SpecialCases from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.SpecialCases} SpecialCases
             */
            SpecialCases.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.SpecialCases
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.normal = reader.string()
                            break
                        case 2:
                            message["default"] = reader.string()
                            break
                        case 3:
                            message["function"] = reader.string()
                            break
                        case 4:
                            message["var"] = reader.string()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, null, null]); /* eslint-enable */

            /**
             * Decodes a SpecialCases from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.SpecialCases} SpecialCases
             */
            SpecialCases.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a SpecialCases.
             * @function
             * @param {jspb.test.SpecialCases|Object} message SpecialCases or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            SpecialCases.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (!util.isString(message.normal))
                    return "invalid value for field .jspb.test.SpecialCases.normal (string expected)"
                if (!util.isString(message["default"]))
                    return "invalid value for field .jspb.test.SpecialCases.default (string expected)"
                if (!util.isString(message["function"]))
                    return "invalid value for field .jspb.test.SpecialCases.function (string expected)"
                if (!util.isString(message["var"]))
                    return "invalid value for field .jspb.test.SpecialCases.var (string expected)"
                return null
            }})($protobuf.util, [null, null, null, null]); /* eslint-enable */

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

            /**
             * Creates a new OptionalFields instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.OptionalFields} OptionalFields instance
             */
            OptionalFields.create = function create(properties) {
                return new OptionalFields(properties);
            };

            /**
             * Encodes the specified OptionalFields.
             * @function
             * @param {jspb.test.OptionalFields|Object} message OptionalFields or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OptionalFields.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.aString !== undefined && message.aString !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.aString)
                writer.uint32(16/*= id 2, wireType 0 */).bool(message.aBool)
                if (message.aNestedMessage !== undefined && message.aNestedMessage !== null)
                    types[2].encode(message.aNestedMessage, writer.uint32(26/*= id 3, wireType 2 */).fork()).ldelim()
                if (message.aRepeatedMessage)
                    for (var i = 0; i < message.aRepeatedMessage.length; ++i)
                    types[3].encode(message.aRepeatedMessage[i], writer.uint32(34/*= id 4, wireType 2 */).fork()).ldelim()
                if (message.aRepeatedString)
                    for (var i = 0; i < message.aRepeatedString.length; ++i)
                    writer.uint32(42/*= id 5, wireType 2 */).string(message.aRepeatedString[i])
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, "jspb.test.OptionalFields.Nested", "jspb.test.OptionalFields.Nested", null]); /* eslint-enable */

            /**
             * Encodes the specified OptionalFields, length delimited.
             * @param {jspb.test.OptionalFields|Object} message OptionalFields or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OptionalFields.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a OptionalFields from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.OptionalFields} OptionalFields
             */
            OptionalFields.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.OptionalFields
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.aString = reader.string()
                            break
                        case 2:
                            message.aBool = reader.bool()
                            break
                        case 3:
                            message.aNestedMessage = types[2].decode(reader, reader.uint32())
                            break
                        case 4:
                            message.aRepeatedMessage && message.aRepeatedMessage.length || (message.aRepeatedMessage = [])
                            message.aRepeatedMessage.push(types[3].decode(reader, reader.uint32()))
                            break
                        case 5:
                            message.aRepeatedString && message.aRepeatedString.length || (message.aRepeatedString = [])
                            message.aRepeatedString.push(reader.string())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, "jspb.test.OptionalFields.Nested", "jspb.test.OptionalFields.Nested", null]); /* eslint-enable */

            /**
             * Decodes a OptionalFields from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.OptionalFields} OptionalFields
             */
            OptionalFields.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a OptionalFields.
             * @function
             * @param {jspb.test.OptionalFields|Object} message OptionalFields or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            OptionalFields.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.aString !== undefined) {
                    if (!util.isString(message.aString))
                        return "invalid value for field .jspb.test.OptionalFields.aString (string expected)"
                }
                if (typeof message.aBool !== "boolean")
                    return "invalid value for field .jspb.test.OptionalFields.aBool (boolean expected)"
                if (message.aNestedMessage !== undefined && message.aNestedMessage !== null) {
                    var reason;
                    if (reason = types[2].verify(message.aNestedMessage))
                        return reason
                }
                if (message.aRepeatedMessage !== undefined) {
                    if (!Array.isArray(message.aRepeatedMessage))
                        return "invalid value for field .jspb.test.OptionalFields.aRepeatedMessage (array expected)"
                    for (var i = 0; i < message.aRepeatedMessage.length; ++i) {
                        var reason;
                        if (reason = types[3].verify(message.aRepeatedMessage[i]))
                            return reason
                    }
                }
                if (message.aRepeatedString !== undefined) {
                    if (!Array.isArray(message.aRepeatedString))
                        return "invalid value for field .jspb.test.OptionalFields.aRepeatedString (array expected)"
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        if (!util.isString(message.aRepeatedString[i]))
                            return "invalid value for field .jspb.test.OptionalFields.aRepeatedString (string[] expected)"
                    }
                }
                return null
            }})($protobuf.util, [null, null, "jspb.test.OptionalFields.Nested", "jspb.test.OptionalFields.Nested", null]); /* eslint-enable */

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
                 * Encodes the specified Nested.
                 * @function
                 * @param {jspb.test.OptionalFields.Nested|Object} message Nested or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                    writer || (writer = Writer.create())
                    if (message.anInt !== undefined && message.anInt !== 0)
                        writer.uint32(8/*= id 1, wireType 0 */).int32(message.anInt)
                    return writer
                }})($protobuf.Writer, $protobuf.util, [null]); /* eslint-enable */

                /**
                 * Encodes the specified Nested, length delimited.
                 * @param {jspb.test.OptionalFields.Nested|Object} message Nested or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Nested from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.OptionalFields.Nested} Nested
                 */
                Nested.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                    reader instanceof Reader || (reader = Reader.create(reader))
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.OptionalFields.Nested
                    while (reader.pos < end) {
                        var tag = reader.uint32()
                        switch (tag >>> 3) {
                            case 1:
                                message.anInt = reader.int32()
                                break
                            default:
                                reader.skipType(tag & 7)
                                break
                        }
                    }
                    return message
                }})($protobuf.Reader, $protobuf.util, [null]); /* eslint-enable */

                /**
                 * Decodes a Nested from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.OptionalFields.Nested} Nested
                 */
                Nested.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a Nested.
                 * @function
                 * @param {jspb.test.OptionalFields.Nested|Object} message Nested or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Nested.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                    if (message.anInt !== undefined) {
                        if (!util.isInteger(message.anInt))
                            return "invalid value for field .jspb.test.OptionalFields.Nested.anInt (integer expected)"
                    }
                    return null
                }})($protobuf.util, [null]); /* eslint-enable */

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

            /**
             * Creates a new HasExtensions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.HasExtensions} HasExtensions instance
             */
            HasExtensions.create = function create(properties) {
                return new HasExtensions(properties);
            };

            /**
             * Encodes the specified HasExtensions.
             * @function
             * @param {jspb.test.HasExtensions|Object} message HasExtensions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HasExtensions.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.str1 !== undefined && message.str1 !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.str1)
                if (message.str2 !== undefined && message.str2 !== "")
                    writer.uint32(18/*= id 2, wireType 2 */).string(message.str2)
                if (message.str3 !== undefined && message.str3 !== "")
                    writer.uint32(26/*= id 3, wireType 2 */).string(message.str3)
                if (message[".jspb.test.IsExtension.extField"] !== undefined && message[".jspb.test.IsExtension.extField"] !== null)
                    types[3].encode(message[".jspb.test.IsExtension.extField"], writer.uint32(802/*= id 100, wireType 2 */).fork()).ldelim()
                if (message[".jspb.test.IndirectExtension.simple"] !== undefined && message[".jspb.test.IndirectExtension.simple"] !== null)
                    types[4].encode(message[".jspb.test.IndirectExtension.simple"], writer.uint32(810/*= id 101, wireType 2 */).fork()).ldelim()
                if (message[".jspb.test.IndirectExtension.str"] !== undefined && message[".jspb.test.IndirectExtension.str"] !== "")
                    writer.uint32(818/*= id 102, wireType 2 */).string(message[".jspb.test.IndirectExtension.str"])
                if (message[".jspb.test.IndirectExtension.repeatedStr"])
                    for (var i = 0; i < message[".jspb.test.IndirectExtension.repeatedStr"].length; ++i)
                    writer.uint32(826/*= id 103, wireType 2 */).string(message[".jspb.test.IndirectExtension.repeatedStr"][i])
                if (message[".jspb.test.IndirectExtension.repeatedSimple"])
                    for (var i = 0; i < message[".jspb.test.IndirectExtension.repeatedSimple"].length; ++i)
                    types[7].encode(message[".jspb.test.IndirectExtension.repeatedSimple"][i], writer.uint32(834/*= id 104, wireType 2 */).fork()).ldelim()
                if (message[".jspb.test.simple1"] !== undefined && message[".jspb.test.simple1"] !== null)
                    types[8].encode(message[".jspb.test.simple1"], writer.uint32(842/*= id 105, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, null, "jspb.test.IsExtension", "jspb.test.Simple1", null, null, "jspb.test.Simple1", "jspb.test.Simple1"]); /* eslint-enable */

            /**
             * Encodes the specified HasExtensions, length delimited.
             * @param {jspb.test.HasExtensions|Object} message HasExtensions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HasExtensions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a HasExtensions from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.HasExtensions} HasExtensions
             */
            HasExtensions.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.HasExtensions
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.str1 = reader.string()
                            break
                        case 2:
                            message.str2 = reader.string()
                            break
                        case 3:
                            message.str3 = reader.string()
                            break
                        case 100:
                            message[".jspb.test.IsExtension.extField"] = types[3].decode(reader, reader.uint32())
                            break
                        case 101:
                            message[".jspb.test.IndirectExtension.simple"] = types[4].decode(reader, reader.uint32())
                            break
                        case 102:
                            message[".jspb.test.IndirectExtension.str"] = reader.string()
                            break
                        case 103:
                            message[".jspb.test.IndirectExtension.repeatedStr"] && message[".jspb.test.IndirectExtension.repeatedStr"].length || (message[".jspb.test.IndirectExtension.repeatedStr"] = [])
                            message[".jspb.test.IndirectExtension.repeatedStr"].push(reader.string())
                            break
                        case 104:
                            message[".jspb.test.IndirectExtension.repeatedSimple"] && message[".jspb.test.IndirectExtension.repeatedSimple"].length || (message[".jspb.test.IndirectExtension.repeatedSimple"] = [])
                            message[".jspb.test.IndirectExtension.repeatedSimple"].push(types[7].decode(reader, reader.uint32()))
                            break
                        case 105:
                            message[".jspb.test.simple1"] = types[8].decode(reader, reader.uint32())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, null, "jspb.test.IsExtension", "jspb.test.Simple1", null, null, "jspb.test.Simple1", "jspb.test.Simple1"]); /* eslint-enable */

            /**
             * Decodes a HasExtensions from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.HasExtensions} HasExtensions
             */
            HasExtensions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a HasExtensions.
             * @function
             * @param {jspb.test.HasExtensions|Object} message HasExtensions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            HasExtensions.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.str1 !== undefined) {
                    if (!util.isString(message.str1))
                        return "invalid value for field .jspb.test.HasExtensions.str1 (string expected)"
                }
                if (message.str2 !== undefined) {
                    if (!util.isString(message.str2))
                        return "invalid value for field .jspb.test.HasExtensions.str2 (string expected)"
                }
                if (message.str3 !== undefined) {
                    if (!util.isString(message.str3))
                        return "invalid value for field .jspb.test.HasExtensions.str3 (string expected)"
                }
                if (message[".jspb.test.IsExtension.extField"] !== undefined && message[".jspb.test.IsExtension.extField"] !== null) {
                    var reason;
                    if (reason = types[3].verify(message[".jspb.test.IsExtension.extField"]))
                        return reason
                }
                if (message[".jspb.test.IndirectExtension.simple"] !== undefined && message[".jspb.test.IndirectExtension.simple"] !== null) {
                    var reason;
                    if (reason = types[4].verify(message[".jspb.test.IndirectExtension.simple"]))
                        return reason
                }
                if (message[".jspb.test.IndirectExtension.str"] !== undefined) {
                    if (!util.isString(message[".jspb.test.IndirectExtension.str"]))
                        return "invalid value for field .jspb.test.HasExtensions..jspb.test.IndirectExtension.str (string expected)"
                }
                if (message[".jspb.test.IndirectExtension.repeatedStr"] !== undefined) {
                    if (!Array.isArray(message[".jspb.test.IndirectExtension.repeatedStr"]))
                        return "invalid value for field .jspb.test.HasExtensions..jspb.test.IndirectExtension.repeatedStr (array expected)"
                    for (var i = 0; i < message[".jspb.test.IndirectExtension.repeatedStr"].length; ++i) {
                        if (!util.isString(message[".jspb.test.IndirectExtension.repeatedStr"][i]))
                            return "invalid value for field .jspb.test.HasExtensions..jspb.test.IndirectExtension.repeatedStr (string[] expected)"
                    }
                }
                if (message[".jspb.test.IndirectExtension.repeatedSimple"] !== undefined) {
                    if (!Array.isArray(message[".jspb.test.IndirectExtension.repeatedSimple"]))
                        return "invalid value for field .jspb.test.HasExtensions..jspb.test.IndirectExtension.repeatedSimple (array expected)"
                    for (var i = 0; i < message[".jspb.test.IndirectExtension.repeatedSimple"].length; ++i) {
                        var reason;
                        if (reason = types[7].verify(message[".jspb.test.IndirectExtension.repeatedSimple"][i]))
                            return reason
                    }
                }
                if (message[".jspb.test.simple1"] !== undefined && message[".jspb.test.simple1"] !== null) {
                    var reason;
                    if (reason = types[8].verify(message[".jspb.test.simple1"]))
                        return reason
                }
                return null
            }})($protobuf.util, [null, null, null, "jspb.test.IsExtension", "jspb.test.Simple1", null, null, "jspb.test.Simple1", "jspb.test.Simple1"]); /* eslint-enable */

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

            /**
             * Creates a new Complex instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Complex} Complex instance
             */
            Complex.create = function create(properties) {
                return new Complex(properties);
            };

            /**
             * Encodes the specified Complex.
             * @function
             * @param {jspb.test.Complex|Object} message Complex or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Complex.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                writer.uint32(10/*= id 1, wireType 2 */).string(message.aString)
                writer.uint32(72/*= id 9, wireType 0 */).bool(message.anOutOfOrderBool)
                if (message.aNestedMessage !== undefined && message.aNestedMessage !== null)
                    types[2].encode(message.aNestedMessage, writer.uint32(34/*= id 4, wireType 2 */).fork()).ldelim()
                if (message.aRepeatedMessage)
                    for (var i = 0; i < message.aRepeatedMessage.length; ++i)
                    types[3].encode(message.aRepeatedMessage[i], writer.uint32(42/*= id 5, wireType 2 */).fork()).ldelim()
                if (message.aRepeatedString)
                    for (var i = 0; i < message.aRepeatedString.length; ++i)
                    writer.uint32(58/*= id 7, wireType 2 */).string(message.aRepeatedString[i])
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, "jspb.test.Complex.Nested", "jspb.test.Complex.Nested", null]); /* eslint-enable */

            /**
             * Encodes the specified Complex, length delimited.
             * @param {jspb.test.Complex|Object} message Complex or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Complex.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Complex from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Complex} Complex
             */
            Complex.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.Complex
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.aString = reader.string()
                            break
                        case 9:
                            message.anOutOfOrderBool = reader.bool()
                            break
                        case 4:
                            message.aNestedMessage = types[2].decode(reader, reader.uint32())
                            break
                        case 5:
                            message.aRepeatedMessage && message.aRepeatedMessage.length || (message.aRepeatedMessage = [])
                            message.aRepeatedMessage.push(types[3].decode(reader, reader.uint32()))
                            break
                        case 7:
                            message.aRepeatedString && message.aRepeatedString.length || (message.aRepeatedString = [])
                            message.aRepeatedString.push(reader.string())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, "jspb.test.Complex.Nested", "jspb.test.Complex.Nested", null]); /* eslint-enable */

            /**
             * Decodes a Complex from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Complex} Complex
             */
            Complex.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Complex.
             * @function
             * @param {jspb.test.Complex|Object} message Complex or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Complex.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (!util.isString(message.aString))
                    return "invalid value for field .jspb.test.Complex.aString (string expected)"
                if (typeof message.anOutOfOrderBool !== "boolean")
                    return "invalid value for field .jspb.test.Complex.anOutOfOrderBool (boolean expected)"
                if (message.aNestedMessage !== undefined && message.aNestedMessage !== null) {
                    var reason;
                    if (reason = types[2].verify(message.aNestedMessage))
                        return reason
                }
                if (message.aRepeatedMessage !== undefined) {
                    if (!Array.isArray(message.aRepeatedMessage))
                        return "invalid value for field .jspb.test.Complex.aRepeatedMessage (array expected)"
                    for (var i = 0; i < message.aRepeatedMessage.length; ++i) {
                        var reason;
                        if (reason = types[3].verify(message.aRepeatedMessage[i]))
                            return reason
                    }
                }
                if (message.aRepeatedString !== undefined) {
                    if (!Array.isArray(message.aRepeatedString))
                        return "invalid value for field .jspb.test.Complex.aRepeatedString (array expected)"
                    for (var i = 0; i < message.aRepeatedString.length; ++i) {
                        if (!util.isString(message.aRepeatedString[i]))
                            return "invalid value for field .jspb.test.Complex.aRepeatedString (string[] expected)"
                    }
                }
                return null
            }})($protobuf.util, [null, null, "jspb.test.Complex.Nested", "jspb.test.Complex.Nested", null]); /* eslint-enable */

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
                 * Encodes the specified Nested.
                 * @function
                 * @param {jspb.test.Complex.Nested|Object} message Nested or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                    writer || (writer = Writer.create())
                    writer.uint32(16/*= id 2, wireType 0 */).int32(message.anInt)
                    return writer
                }})($protobuf.Writer, $protobuf.util, [null]); /* eslint-enable */

                /**
                 * Encodes the specified Nested, length delimited.
                 * @param {jspb.test.Complex.Nested|Object} message Nested or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Nested from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.Complex.Nested} Nested
                 */
                Nested.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                    reader instanceof Reader || (reader = Reader.create(reader))
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.Complex.Nested
                    while (reader.pos < end) {
                        var tag = reader.uint32()
                        switch (tag >>> 3) {
                            case 2:
                                message.anInt = reader.int32()
                                break
                            default:
                                reader.skipType(tag & 7)
                                break
                        }
                    }
                    return message
                }})($protobuf.Reader, $protobuf.util, [null]); /* eslint-enable */

                /**
                 * Decodes a Nested from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.Complex.Nested} Nested
                 */
                Nested.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a Nested.
                 * @function
                 * @param {jspb.test.Complex.Nested|Object} message Nested or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Nested.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                    if (!util.isInteger(message.anInt))
                        return "invalid value for field .jspb.test.Complex.Nested.anInt (integer expected)"
                    return null
                }})($protobuf.util, [null]); /* eslint-enable */

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

            /**
             * Creates a new OuterMessage instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.OuterMessage} OuterMessage instance
             */
            OuterMessage.create = function create(properties) {
                return new OuterMessage(properties);
            };

            /**
             * Encodes the specified OuterMessage.
             * @function
             * @param {jspb.test.OuterMessage|Object} message OuterMessage or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OuterMessage.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                return writer
            }})($protobuf.Writer, $protobuf.util, []); /* eslint-enable */

            /**
             * Encodes the specified OuterMessage, length delimited.
             * @param {jspb.test.OuterMessage|Object} message OuterMessage or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OuterMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a OuterMessage from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.OuterMessage} OuterMessage
             */
            OuterMessage.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.OuterMessage
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, []); /* eslint-enable */

            /**
             * Decodes a OuterMessage from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.OuterMessage} OuterMessage
             */
            OuterMessage.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a OuterMessage.
             * @function
             * @param {jspb.test.OuterMessage|Object} message OuterMessage or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            OuterMessage.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                return null
            }})($protobuf.util, []); /* eslint-enable */

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
                 * Encodes the specified Complex.
                 * @function
                 * @param {jspb.test.OuterMessage.Complex|Object} message Complex or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Complex.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                    writer || (writer = Writer.create())
                    if (message.innerComplexField !== undefined && message.innerComplexField !== 0)
                        writer.uint32(8/*= id 1, wireType 0 */).int32(message.innerComplexField)
                    return writer
                }})($protobuf.Writer, $protobuf.util, [null]); /* eslint-enable */

                /**
                 * Encodes the specified Complex, length delimited.
                 * @param {jspb.test.OuterMessage.Complex|Object} message Complex or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Complex.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Complex from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.OuterMessage.Complex} Complex
                 */
                Complex.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                    reader instanceof Reader || (reader = Reader.create(reader))
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.OuterMessage.Complex
                    while (reader.pos < end) {
                        var tag = reader.uint32()
                        switch (tag >>> 3) {
                            case 1:
                                message.innerComplexField = reader.int32()
                                break
                            default:
                                reader.skipType(tag & 7)
                                break
                        }
                    }
                    return message
                }})($protobuf.Reader, $protobuf.util, [null]); /* eslint-enable */

                /**
                 * Decodes a Complex from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.OuterMessage.Complex} Complex
                 */
                Complex.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a Complex.
                 * @function
                 * @param {jspb.test.OuterMessage.Complex|Object} message Complex or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Complex.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                    if (message.innerComplexField !== undefined) {
                        if (!util.isInteger(message.innerComplexField))
                            return "invalid value for field .jspb.test.OuterMessage.Complex.innerComplexField (integer expected)"
                    }
                    return null
                }})($protobuf.util, [null]); /* eslint-enable */

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
             * Encodes the specified IsExtension.
             * @function
             * @param {jspb.test.IsExtension|Object} message IsExtension or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IsExtension.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.ext1 !== undefined && message.ext1 !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.ext1)
                return writer
            }})($protobuf.Writer, $protobuf.util, [null]); /* eslint-enable */

            /**
             * Encodes the specified IsExtension, length delimited.
             * @param {jspb.test.IsExtension|Object} message IsExtension or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IsExtension.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a IsExtension from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.IsExtension} IsExtension
             */
            IsExtension.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.IsExtension
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.ext1 = reader.string()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null]); /* eslint-enable */

            /**
             * Decodes a IsExtension from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.IsExtension} IsExtension
             */
            IsExtension.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a IsExtension.
             * @function
             * @param {jspb.test.IsExtension|Object} message IsExtension or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            IsExtension.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.ext1 !== undefined) {
                    if (!util.isString(message.ext1))
                        return "invalid value for field .jspb.test.IsExtension.ext1 (string expected)"
                }
                return null
            }})($protobuf.util, [null]); /* eslint-enable */

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

            /**
             * Creates a new IndirectExtension instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.IndirectExtension} IndirectExtension instance
             */
            IndirectExtension.create = function create(properties) {
                return new IndirectExtension(properties);
            };

            /**
             * Encodes the specified IndirectExtension.
             * @function
             * @param {jspb.test.IndirectExtension|Object} message IndirectExtension or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IndirectExtension.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                return writer
            }})($protobuf.Writer, $protobuf.util, []); /* eslint-enable */

            /**
             * Encodes the specified IndirectExtension, length delimited.
             * @param {jspb.test.IndirectExtension|Object} message IndirectExtension or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IndirectExtension.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a IndirectExtension from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.IndirectExtension} IndirectExtension
             */
            IndirectExtension.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.IndirectExtension
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, []); /* eslint-enable */

            /**
             * Decodes a IndirectExtension from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.IndirectExtension} IndirectExtension
             */
            IndirectExtension.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a IndirectExtension.
             * @function
             * @param {jspb.test.IndirectExtension|Object} message IndirectExtension or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            IndirectExtension.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                return null
            }})($protobuf.util, []); /* eslint-enable */

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
            $prototype.enumField = "E1";

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

            /**
             * Creates a new DefaultValues instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.DefaultValues} DefaultValues instance
             */
            DefaultValues.create = function create(properties) {
                return new DefaultValues(properties);
            };

            /**
             * Encodes the specified DefaultValues.
             * @function
             * @param {jspb.test.DefaultValues|Object} message DefaultValues or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DefaultValues.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.stringField !== undefined && message.stringField !== "default <> '\"abc")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.stringField)
                if (message.boolField !== undefined && message.boolField !== true)
                    writer.uint32(16/*= id 2, wireType 0 */).bool(message.boolField)
                if (message.intField !== undefined && message.intField !== null && util.longNe(message.intField, 11, 0))
                    writer.uint32(24/*= id 3, wireType 0 */).int64(message.intField)
                if (message.enumField !== undefined && message.enumField !== "E1")
                    writer.uint32(32/*= id 4, wireType 0 */).uint32(message.enumField)
                if (message.emptyField !== undefined && message.emptyField !== "")
                    writer.uint32(50/*= id 6, wireType 2 */).string(message.emptyField)
                if (message.bytesField !== undefined && message.bytesField !== "moo")
                    writer.uint32(66/*= id 8, wireType 2 */).bytes(message.bytesField)
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, null, "jspb.test.DefaultValues.Enum", null, null]); /* eslint-enable */

            /**
             * Encodes the specified DefaultValues, length delimited.
             * @param {jspb.test.DefaultValues|Object} message DefaultValues or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DefaultValues.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DefaultValues from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.DefaultValues} DefaultValues
             */
            DefaultValues.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.DefaultValues
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.stringField = reader.string()
                            break
                        case 2:
                            message.boolField = reader.bool()
                            break
                        case 3:
                            message.intField = reader.int64()
                            break
                        case 4:
                            message.enumField = reader.uint32()
                            break
                        case 6:
                            message.emptyField = reader.string()
                            break
                        case 8:
                            message.bytesField = reader.bytes()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, null, "jspb.test.DefaultValues.Enum", null, null]); /* eslint-enable */

            /**
             * Decodes a DefaultValues from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.DefaultValues} DefaultValues
             */
            DefaultValues.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a DefaultValues.
             * @function
             * @param {jspb.test.DefaultValues|Object} message DefaultValues or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            DefaultValues.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.stringField !== undefined) {
                    if (!util.isString(message.stringField))
                        return "invalid value for field .jspb.test.DefaultValues.stringField (string expected)"
                }
                if (message.boolField !== undefined) {
                    if (typeof message.boolField !== "boolean")
                        return "invalid value for field .jspb.test.DefaultValues.boolField (boolean expected)"
                }
                if (message.intField !== undefined) {
                    if (!util.isInteger(message.intField) && !(message.intField && util.isInteger(message.intField.low) && util.isInteger(message.intField.high)))
                        return "invalid value for field .jspb.test.DefaultValues.intField (integer | Long expected)"
                }
                if (message.enumField !== undefined) {
                    switch (message.enumField) {
                        default:
                            return "invalid value for field .jspb.test.DefaultValues.enumField (enum value expected)"
                        case 13:
                        case 77:
                            break
                    }
                }
                if (message.emptyField !== undefined) {
                    if (!util.isString(message.emptyField))
                        return "invalid value for field .jspb.test.DefaultValues.emptyField (string expected)"
                }
                if (message.bytesField !== undefined) {
                    if (!(message.bytesField && typeof message.bytesField.length === "number" || util.isString(message.bytesField)))
                        return "invalid value for field .jspb.test.DefaultValues.bytesField (buffer expected)"
                }
                return null
            }})($protobuf.util, [null, null, null, "jspb.test.DefaultValues.Enum", null, null]); /* eslint-enable */

            /**
             * Enum values.
             * @exports jspb.test.DefaultValues.Enum
             * @type {Object.<string,number>}
             */
            DefaultValues.Enum = {

                E1: 13,
                E2: 77
            };

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
             * Encodes the specified FloatingPointFields.
             * @function
             * @param {jspb.test.FloatingPointFields|Object} message FloatingPointFields or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FloatingPointFields.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.optionalFloatField !== undefined && message.optionalFloatField !== 0)
                    writer.uint32(13/*= id 1, wireType 5 */).float(message.optionalFloatField)
                writer.uint32(21/*= id 2, wireType 5 */).float(message.requiredFloatField)
                if (message.repeatedFloatField)
                    for (var i = 0; i < message.repeatedFloatField.length; ++i)
                    writer.uint32(29/*= id 3, wireType 5 */).float(message.repeatedFloatField[i])
                if (message.defaultFloatField !== undefined && message.defaultFloatField !== 2)
                    writer.uint32(37/*= id 4, wireType 5 */).float(message.defaultFloatField)
                if (message.optionalDoubleField !== undefined && message.optionalDoubleField !== 0)
                    writer.uint32(41/*= id 5, wireType 1 */).double(message.optionalDoubleField)
                writer.uint32(49/*= id 6, wireType 1 */).double(message.requiredDoubleField)
                if (message.repeatedDoubleField)
                    for (var i = 0; i < message.repeatedDoubleField.length; ++i)
                    writer.uint32(57/*= id 7, wireType 1 */).double(message.repeatedDoubleField[i])
                if (message.defaultDoubleField !== undefined && message.defaultDoubleField !== 2)
                    writer.uint32(65/*= id 8, wireType 1 */).double(message.defaultDoubleField)
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, null, null, null, null, null, null]); /* eslint-enable */

            /**
             * Encodes the specified FloatingPointFields, length delimited.
             * @param {jspb.test.FloatingPointFields|Object} message FloatingPointFields or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FloatingPointFields.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FloatingPointFields from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.FloatingPointFields} FloatingPointFields
             */
            FloatingPointFields.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.FloatingPointFields
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.optionalFloatField = reader.float()
                            break
                        case 2:
                            message.requiredFloatField = reader.float()
                            break
                        case 3:
                            message.repeatedFloatField && message.repeatedFloatField.length || (message.repeatedFloatField = [])
                            message.repeatedFloatField.push(reader.float())
                            break
                        case 4:
                            message.defaultFloatField = reader.float()
                            break
                        case 5:
                            message.optionalDoubleField = reader.double()
                            break
                        case 6:
                            message.requiredDoubleField = reader.double()
                            break
                        case 7:
                            message.repeatedDoubleField && message.repeatedDoubleField.length || (message.repeatedDoubleField = [])
                            message.repeatedDoubleField.push(reader.double())
                            break
                        case 8:
                            message.defaultDoubleField = reader.double()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, null, null, null, null, null, null]); /* eslint-enable */

            /**
             * Decodes a FloatingPointFields from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.FloatingPointFields} FloatingPointFields
             */
            FloatingPointFields.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FloatingPointFields.
             * @function
             * @param {jspb.test.FloatingPointFields|Object} message FloatingPointFields or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FloatingPointFields.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.optionalFloatField !== undefined) {
                    if (typeof message.optionalFloatField !== "number")
                        return "invalid value for field .jspb.test.FloatingPointFields.optionalFloatField (number expected)"
                }
                if (typeof message.requiredFloatField !== "number")
                    return "invalid value for field .jspb.test.FloatingPointFields.requiredFloatField (number expected)"
                if (message.repeatedFloatField !== undefined) {
                    if (!Array.isArray(message.repeatedFloatField))
                        return "invalid value for field .jspb.test.FloatingPointFields.repeatedFloatField (array expected)"
                    for (var i = 0; i < message.repeatedFloatField.length; ++i) {
                        if (typeof message.repeatedFloatField[i] !== "number")
                            return "invalid value for field .jspb.test.FloatingPointFields.repeatedFloatField (number[] expected)"
                    }
                }
                if (message.defaultFloatField !== undefined) {
                    if (typeof message.defaultFloatField !== "number")
                        return "invalid value for field .jspb.test.FloatingPointFields.defaultFloatField (number expected)"
                }
                if (message.optionalDoubleField !== undefined) {
                    if (typeof message.optionalDoubleField !== "number")
                        return "invalid value for field .jspb.test.FloatingPointFields.optionalDoubleField (number expected)"
                }
                if (typeof message.requiredDoubleField !== "number")
                    return "invalid value for field .jspb.test.FloatingPointFields.requiredDoubleField (number expected)"
                if (message.repeatedDoubleField !== undefined) {
                    if (!Array.isArray(message.repeatedDoubleField))
                        return "invalid value for field .jspb.test.FloatingPointFields.repeatedDoubleField (array expected)"
                    for (var i = 0; i < message.repeatedDoubleField.length; ++i) {
                        if (typeof message.repeatedDoubleField[i] !== "number")
                            return "invalid value for field .jspb.test.FloatingPointFields.repeatedDoubleField (number[] expected)"
                    }
                }
                if (message.defaultDoubleField !== undefined) {
                    if (typeof message.defaultDoubleField !== "number")
                        return "invalid value for field .jspb.test.FloatingPointFields.defaultDoubleField (number expected)"
                }
                return null
            }})($protobuf.util, [null, null, null, null, null, null, null, null]); /* eslint-enable */

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

            /**
             * Creates a new TestClone instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestClone} TestClone instance
             */
            TestClone.create = function create(properties) {
                return new TestClone(properties);
            };

            /**
             * Encodes the specified TestClone.
             * @function
             * @param {jspb.test.TestClone|Object} message TestClone or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestClone.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.str !== undefined && message.str !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.str)
                if (message.simple1 !== undefined && message.simple1 !== null)
                    types[1].encode(message.simple1, writer.uint32(26/*= id 3, wireType 2 */).fork()).ldelim()
                if (message.simple2)
                    for (var i = 0; i < message.simple2.length; ++i)
                    types[2].encode(message.simple2[i], writer.uint32(42/*= id 5, wireType 2 */).fork()).ldelim()
                if (message.bytesField !== undefined && message.bytesField !== [])
                    writer.uint32(50/*= id 6, wireType 2 */).bytes(message.bytesField)
                if (message.unused !== undefined && message.unused !== "")
                    writer.uint32(58/*= id 7, wireType 2 */).string(message.unused)
                if (message[".jspb.test.CloneExtension.extField"] !== undefined && message[".jspb.test.CloneExtension.extField"] !== null)
                    types[5].encode(message[".jspb.test.CloneExtension.extField"], writer.uint32(802/*= id 100, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, "jspb.test.Simple1", "jspb.test.Simple1", null, null, "jspb.test.CloneExtension"]); /* eslint-enable */

            /**
             * Encodes the specified TestClone, length delimited.
             * @param {jspb.test.TestClone|Object} message TestClone or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestClone.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestClone from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestClone} TestClone
             */
            TestClone.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.TestClone
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.str = reader.string()
                            break
                        case 3:
                            message.simple1 = types[1].decode(reader, reader.uint32())
                            break
                        case 5:
                            message.simple2 && message.simple2.length || (message.simple2 = [])
                            message.simple2.push(types[2].decode(reader, reader.uint32()))
                            break
                        case 6:
                            message.bytesField = reader.bytes()
                            break
                        case 7:
                            message.unused = reader.string()
                            break
                        case 100:
                            message[".jspb.test.CloneExtension.extField"] = types[5].decode(reader, reader.uint32())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, "jspb.test.Simple1", "jspb.test.Simple1", null, null, "jspb.test.CloneExtension"]); /* eslint-enable */

            /**
             * Decodes a TestClone from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestClone} TestClone
             */
            TestClone.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestClone.
             * @function
             * @param {jspb.test.TestClone|Object} message TestClone or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestClone.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.str !== undefined) {
                    if (!util.isString(message.str))
                        return "invalid value for field .jspb.test.TestClone.str (string expected)"
                }
                if (message.simple1 !== undefined && message.simple1 !== null) {
                    var reason;
                    if (reason = types[1].verify(message.simple1))
                        return reason
                }
                if (message.simple2 !== undefined) {
                    if (!Array.isArray(message.simple2))
                        return "invalid value for field .jspb.test.TestClone.simple2 (array expected)"
                    for (var i = 0; i < message.simple2.length; ++i) {
                        var reason;
                        if (reason = types[2].verify(message.simple2[i]))
                            return reason
                    }
                }
                if (message.bytesField !== undefined) {
                    if (!(message.bytesField && typeof message.bytesField.length === "number" || util.isString(message.bytesField)))
                        return "invalid value for field .jspb.test.TestClone.bytesField (buffer expected)"
                }
                if (message.unused !== undefined) {
                    if (!util.isString(message.unused))
                        return "invalid value for field .jspb.test.TestClone.unused (string expected)"
                }
                if (message[".jspb.test.CloneExtension.extField"] !== undefined && message[".jspb.test.CloneExtension.extField"] !== null) {
                    var reason;
                    if (reason = types[5].verify(message[".jspb.test.CloneExtension.extField"]))
                        return reason
                }
                return null
            }})($protobuf.util, [null, "jspb.test.Simple1", "jspb.test.Simple1", null, null, "jspb.test.CloneExtension"]); /* eslint-enable */

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
             * Encodes the specified CloneExtension.
             * @function
             * @param {jspb.test.CloneExtension|Object} message CloneExtension or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CloneExtension.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.ext !== undefined && message.ext !== "")
                    writer.uint32(18/*= id 2, wireType 2 */).string(message.ext)
                return writer
            }})($protobuf.Writer, $protobuf.util, [null]); /* eslint-enable */

            /**
             * Encodes the specified CloneExtension, length delimited.
             * @param {jspb.test.CloneExtension|Object} message CloneExtension or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CloneExtension.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CloneExtension from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.CloneExtension} CloneExtension
             */
            CloneExtension.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.CloneExtension
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 2:
                            message.ext = reader.string()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null]); /* eslint-enable */

            /**
             * Decodes a CloneExtension from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.CloneExtension} CloneExtension
             */
            CloneExtension.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a CloneExtension.
             * @function
             * @param {jspb.test.CloneExtension|Object} message CloneExtension or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            CloneExtension.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.ext !== undefined) {
                    if (!util.isString(message.ext))
                        return "invalid value for field .jspb.test.CloneExtension.ext (string expected)"
                }
                return null
            }})($protobuf.util, [null]); /* eslint-enable */

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

            /**
             * Creates a new TestGroup instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestGroup} TestGroup instance
             */
            TestGroup.create = function create(properties) {
                return new TestGroup(properties);
            };

            /**
             * Encodes the specified TestGroup.
             * @function
             * @param {jspb.test.TestGroup|Object} message TestGroup or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestGroup.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.id !== undefined && message.id !== "")
                    writer.uint32(34/*= id 4, wireType 2 */).string(message.id)
                types[1].encode(message.requiredSimple, writer.uint32(42/*= id 5, wireType 2 */).fork()).ldelim()
                if (message.optionalSimple !== undefined && message.optionalSimple !== null)
                    types[2].encode(message.optionalSimple, writer.uint32(50/*= id 6, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, "jspb.test.Simple2", "jspb.test.Simple2"]); /* eslint-enable */

            /**
             * Encodes the specified TestGroup, length delimited.
             * @param {jspb.test.TestGroup|Object} message TestGroup or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestGroup.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestGroup from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestGroup} TestGroup
             */
            TestGroup.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.TestGroup
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 4:
                            message.id = reader.string()
                            break
                        case 5:
                            message.requiredSimple = types[1].decode(reader, reader.uint32())
                            break
                        case 6:
                            message.optionalSimple = types[2].decode(reader, reader.uint32())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, "jspb.test.Simple2", "jspb.test.Simple2"]); /* eslint-enable */

            /**
             * Decodes a TestGroup from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestGroup} TestGroup
             */
            TestGroup.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestGroup.
             * @function
             * @param {jspb.test.TestGroup|Object} message TestGroup or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestGroup.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.id !== undefined) {
                    if (!util.isString(message.id))
                        return "invalid value for field .jspb.test.TestGroup.id (string expected)"
                }
                var reason;
                if (reason = types[1].verify(message.requiredSimple))
                    return reason
                if (message.optionalSimple !== undefined && message.optionalSimple !== null) {
                    var reason;
                    if (reason = types[2].verify(message.optionalSimple))
                        return reason
                }
                return null
            }})($protobuf.util, [null, "jspb.test.Simple2", "jspb.test.Simple2"]); /* eslint-enable */

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
             * Encodes the specified TestReservedNames.
             * @function
             * @param {jspb.test.TestReservedNames|Object} message TestReservedNames or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestReservedNames.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.extension !== undefined && message.extension !== 0)
                    writer.uint32(8/*= id 1, wireType 0 */).int32(message.extension)
                if (message[".jspb.test.TestReservedNamesExtension.foo"] !== undefined && message[".jspb.test.TestReservedNamesExtension.foo"] !== 0)
                    writer.uint32(80/*= id 10, wireType 0 */).int32(message[".jspb.test.TestReservedNamesExtension.foo"])
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null]); /* eslint-enable */

            /**
             * Encodes the specified TestReservedNames, length delimited.
             * @param {jspb.test.TestReservedNames|Object} message TestReservedNames or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestReservedNames.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestReservedNames from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestReservedNames} TestReservedNames
             */
            TestReservedNames.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.TestReservedNames
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.extension = reader.int32()
                            break
                        case 10:
                            message[".jspb.test.TestReservedNamesExtension.foo"] = reader.int32()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null]); /* eslint-enable */

            /**
             * Decodes a TestReservedNames from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestReservedNames} TestReservedNames
             */
            TestReservedNames.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestReservedNames.
             * @function
             * @param {jspb.test.TestReservedNames|Object} message TestReservedNames or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestReservedNames.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.extension !== undefined) {
                    if (!util.isInteger(message.extension))
                        return "invalid value for field .jspb.test.TestReservedNames.extension (integer expected)"
                }
                if (message[".jspb.test.TestReservedNamesExtension.foo"] !== undefined) {
                    if (!util.isInteger(message[".jspb.test.TestReservedNamesExtension.foo"]))
                        return "invalid value for field .jspb.test.TestReservedNames..jspb.test.TestReservedNamesExtension.foo (integer expected)"
                }
                return null
            }})($protobuf.util, [null, null]); /* eslint-enable */

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

            /**
             * Creates a new TestReservedNamesExtension instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestReservedNamesExtension} TestReservedNamesExtension instance
             */
            TestReservedNamesExtension.create = function create(properties) {
                return new TestReservedNamesExtension(properties);
            };

            /**
             * Encodes the specified TestReservedNamesExtension.
             * @function
             * @param {jspb.test.TestReservedNamesExtension|Object} message TestReservedNamesExtension or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestReservedNamesExtension.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                return writer
            }})($protobuf.Writer, $protobuf.util, []); /* eslint-enable */

            /**
             * Encodes the specified TestReservedNamesExtension, length delimited.
             * @param {jspb.test.TestReservedNamesExtension|Object} message TestReservedNamesExtension or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestReservedNamesExtension.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestReservedNamesExtension from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestReservedNamesExtension} TestReservedNamesExtension
             */
            TestReservedNamesExtension.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.TestReservedNamesExtension
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, []); /* eslint-enable */

            /**
             * Decodes a TestReservedNamesExtension from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestReservedNamesExtension} TestReservedNamesExtension
             */
            TestReservedNamesExtension.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestReservedNamesExtension.
             * @function
             * @param {jspb.test.TestReservedNamesExtension|Object} message TestReservedNamesExtension or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestReservedNamesExtension.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                return null
            }})($protobuf.util, []); /* eslint-enable */

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
            $protobuf.util.prop($prototype, "partialOneof", {
                get: function getVirtual() {
                    if (this["pone"] !== undefined)
                        return "pone";
                    if (this["pthree"] !== undefined)
                        return "pthree";
                    return undefined;
                },
                set: function setVirtual(value) {
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
            $protobuf.util.prop($prototype, "recursiveOneof", {
                get: function getVirtual() {
                    if (this["rone"] !== undefined)
                        return "rone";
                    if (this["rtwo"] !== undefined)
                        return "rtwo";
                    return undefined;
                },
                set: function setVirtual(value) {
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
            $protobuf.util.prop($prototype, "defaultOneofA", {
                get: function getVirtual() {
                    if (this["aone"] !== undefined)
                        return "aone";
                    if (this["atwo"] !== undefined)
                        return "atwo";
                    return undefined;
                },
                set: function setVirtual(value) {
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
            $protobuf.util.prop($prototype, "defaultOneofB", {
                get: function getVirtual() {
                    if (this["bone"] !== undefined)
                        return "bone";
                    if (this["btwo"] !== undefined)
                        return "btwo";
                    return undefined;
                },
                set: function setVirtual(value) {
                    if (value !== "bone")
                        delete this["bone"];
                    if (value !== "btwo")
                        delete this["btwo"];
                }
            });

            /**
             * Creates a new TestMessageWithOneof instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestMessageWithOneof} TestMessageWithOneof instance
             */
            TestMessageWithOneof.create = function create(properties) {
                return new TestMessageWithOneof(properties);
            };

            /**
             * Encodes the specified TestMessageWithOneof.
             * @function
             * @param {jspb.test.TestMessageWithOneof|Object} message TestMessageWithOneof or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestMessageWithOneof.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.normalField !== undefined && message.normalField !== false)
                    writer.uint32(64/*= id 8, wireType 0 */).bool(message.normalField)
                if (message.repeatedField)
                    for (var i = 0; i < message.repeatedField.length; ++i)
                    writer.uint32(74/*= id 9, wireType 2 */).string(message.repeatedField[i])
                switch (message.getPartialOneof()) {
                    case "pone":
                        writer.uint32(26/*= id 3, wireType 2 */).string(message.pone)
                        break;
                    case "pthree":
                        writer.uint32(42/*= id 5, wireType 2 */).string(message.pthree)
                        break;
                }
                switch (message.getRecursiveOneof()) {
                    case "rone":
                        types[2].encode(message.rone, writer.uint32(50/*= id 6, wireType 2 */).fork()).ldelim()
                        break;
                    case "rtwo":
                        writer.uint32(58/*= id 7, wireType 2 */).string(message.rtwo)
                        break;
                }
                switch (message.getDefaultOneofA()) {
                    case "aone":
                        writer.uint32(80/*= id 10, wireType 0 */).int32(message.aone)
                        break;
                    case "atwo":
                        writer.uint32(88/*= id 11, wireType 0 */).int32(message.atwo)
                        break;
                }
                switch (message.getDefaultOneofB()) {
                    case "bone":
                        writer.uint32(96/*= id 12, wireType 0 */).int32(message.bone)
                        break;
                    case "btwo":
                        writer.uint32(104/*= id 13, wireType 0 */).int32(message.btwo)
                        break;
                }
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, "jspb.test.TestMessageWithOneof", null, null, null, null, null, null, null]); /* eslint-enable */

            /**
             * Encodes the specified TestMessageWithOneof, length delimited.
             * @param {jspb.test.TestMessageWithOneof|Object} message TestMessageWithOneof or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestMessageWithOneof.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestMessageWithOneof from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestMessageWithOneof} TestMessageWithOneof
             */
            TestMessageWithOneof.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.TestMessageWithOneof
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 3:
                            message.pone = reader.string()
                            break
                        case 5:
                            message.pthree = reader.string()
                            break
                        case 6:
                            message.rone = types[2].decode(reader, reader.uint32())
                            break
                        case 7:
                            message.rtwo = reader.string()
                            break
                        case 8:
                            message.normalField = reader.bool()
                            break
                        case 9:
                            message.repeatedField && message.repeatedField.length || (message.repeatedField = [])
                            message.repeatedField.push(reader.string())
                            break
                        case 10:
                            message.aone = reader.int32()
                            break
                        case 11:
                            message.atwo = reader.int32()
                            break
                        case 12:
                            message.bone = reader.int32()
                            break
                        case 13:
                            message.btwo = reader.int32()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, "jspb.test.TestMessageWithOneof", null, null, null, null, null, null, null]); /* eslint-enable */

            /**
             * Decodes a TestMessageWithOneof from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestMessageWithOneof} TestMessageWithOneof
             */
            TestMessageWithOneof.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestMessageWithOneof.
             * @function
             * @param {jspb.test.TestMessageWithOneof|Object} message TestMessageWithOneof or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestMessageWithOneof.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.pone !== undefined) {
                    if (!util.isString(message.pone))
                        return "invalid value for field .jspb.test.TestMessageWithOneof.pone (string expected)"
                }
                if (message.pthree !== undefined) {
                    if (!util.isString(message.pthree))
                        return "invalid value for field .jspb.test.TestMessageWithOneof.pthree (string expected)"
                }
                if (message.rone !== undefined && message.rone !== null) {
                    var reason;
                    if (reason = types[2].verify(message.rone))
                        return reason
                }
                if (message.rtwo !== undefined) {
                    if (!util.isString(message.rtwo))
                        return "invalid value for field .jspb.test.TestMessageWithOneof.rtwo (string expected)"
                }
                if (message.normalField !== undefined) {
                    if (typeof message.normalField !== "boolean")
                        return "invalid value for field .jspb.test.TestMessageWithOneof.normalField (boolean expected)"
                }
                if (message.repeatedField !== undefined) {
                    if (!Array.isArray(message.repeatedField))
                        return "invalid value for field .jspb.test.TestMessageWithOneof.repeatedField (array expected)"
                    for (var i = 0; i < message.repeatedField.length; ++i) {
                        if (!util.isString(message.repeatedField[i]))
                            return "invalid value for field .jspb.test.TestMessageWithOneof.repeatedField (string[] expected)"
                    }
                }
                if (message.aone !== undefined) {
                    if (!util.isInteger(message.aone))
                        return "invalid value for field .jspb.test.TestMessageWithOneof.aone (integer expected)"
                }
                if (message.atwo !== undefined) {
                    if (!util.isInteger(message.atwo))
                        return "invalid value for field .jspb.test.TestMessageWithOneof.atwo (integer expected)"
                }
                if (message.bone !== undefined) {
                    if (!util.isInteger(message.bone))
                        return "invalid value for field .jspb.test.TestMessageWithOneof.bone (integer expected)"
                }
                if (message.btwo !== undefined) {
                    if (!util.isInteger(message.btwo))
                        return "invalid value for field .jspb.test.TestMessageWithOneof.btwo (integer expected)"
                }
                return null
            }})($protobuf.util, [null, null, "jspb.test.TestMessageWithOneof", null, null, null, null, null, null, null]); /* eslint-enable */

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
             * Encodes the specified TestEndsWithBytes.
             * @function
             * @param {jspb.test.TestEndsWithBytes|Object} message TestEndsWithBytes or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestEndsWithBytes.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.value !== undefined && message.value !== 0)
                    writer.uint32(8/*= id 1, wireType 0 */).int32(message.value)
                if (message.data !== undefined && message.data !== [])
                    writer.uint32(18/*= id 2, wireType 2 */).bytes(message.data)
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null]); /* eslint-enable */

            /**
             * Encodes the specified TestEndsWithBytes, length delimited.
             * @param {jspb.test.TestEndsWithBytes|Object} message TestEndsWithBytes or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestEndsWithBytes.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestEndsWithBytes from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestEndsWithBytes} TestEndsWithBytes
             */
            TestEndsWithBytes.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.TestEndsWithBytes
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.value = reader.int32()
                            break
                        case 2:
                            message.data = reader.bytes()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null]); /* eslint-enable */

            /**
             * Decodes a TestEndsWithBytes from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestEndsWithBytes} TestEndsWithBytes
             */
            TestEndsWithBytes.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestEndsWithBytes.
             * @function
             * @param {jspb.test.TestEndsWithBytes|Object} message TestEndsWithBytes or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestEndsWithBytes.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.value !== undefined) {
                    if (!util.isInteger(message.value))
                        return "invalid value for field .jspb.test.TestEndsWithBytes.value (integer expected)"
                }
                if (message.data !== undefined) {
                    if (!(message.data && typeof message.data.length === "number" || util.isString(message.data)))
                        return "invalid value for field .jspb.test.TestEndsWithBytes.data (buffer expected)"
                }
                return null
            }})($protobuf.util, [null, null]); /* eslint-enable */

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

            /**
             * Creates a new TestMapFieldsNoBinary instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestMapFieldsNoBinary} TestMapFieldsNoBinary instance
             */
            TestMapFieldsNoBinary.create = function create(properties) {
                return new TestMapFieldsNoBinary(properties);
            };

            /**
             * Encodes the specified TestMapFieldsNoBinary.
             * @function
             * @param {jspb.test.TestMapFieldsNoBinary|Object} message TestMapFieldsNoBinary or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestMapFieldsNoBinary.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.mapStringString && message.mapStringString !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringString), i = 0; i < keys.length; ++i) {
                        writer.uint32(10/*= id 1, wireType 2 */).fork().uint32(10/*= id 1, wireType 2 */).string(keys[i])
                        writer.uint32(18/*= id 2, wireType 2 */).string(message.mapStringString[keys[i]])
                        writer.ldelim()
                    }
                }
                if (message.mapStringInt32 && message.mapStringInt32 !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringInt32), i = 0; i < keys.length; ++i) {
                        writer.uint32(18/*= id 2, wireType 2 */).fork().uint32(10/*= id 1, wireType 2 */).string(keys[i])
                        writer.uint32(16/*= id 2, wireType 0 */).int32(message.mapStringInt32[keys[i]])
                        writer.ldelim()
                    }
                }
                if (message.mapStringInt64 && message.mapStringInt64 !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringInt64), i = 0; i < keys.length; ++i) {
                        writer.uint32(26/*= id 3, wireType 2 */).fork().uint32(10/*= id 1, wireType 2 */).string(keys[i])
                        writer.uint32(16/*= id 2, wireType 0 */).int64(message.mapStringInt64[keys[i]])
                        writer.ldelim()
                    }
                }
                if (message.mapStringBool && message.mapStringBool !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringBool), i = 0; i < keys.length; ++i) {
                        writer.uint32(34/*= id 4, wireType 2 */).fork().uint32(10/*= id 1, wireType 2 */).string(keys[i])
                        writer.uint32(16/*= id 2, wireType 0 */).bool(message.mapStringBool[keys[i]])
                        writer.ldelim()
                    }
                }
                if (message.mapStringDouble && message.mapStringDouble !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringDouble), i = 0; i < keys.length; ++i) {
                        writer.uint32(42/*= id 5, wireType 2 */).fork().uint32(10/*= id 1, wireType 2 */).string(keys[i])
                        writer.uint32(17/*= id 2, wireType 1 */).double(message.mapStringDouble[keys[i]])
                        writer.ldelim()
                    }
                }
                if (message.mapStringEnum && message.mapStringEnum !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringEnum), i = 0; i < keys.length; ++i) {
                        writer.uint32(50/*= id 6, wireType 2 */).fork().uint32(10/*= id 1, wireType 2 */).string(keys[i])
                        writer.uint32(16/*= id 2, wireType 0 */).uint32(message.mapStringEnum[keys[i]])
                        writer.ldelim()
                    }
                }
                if (message.mapStringMsg && message.mapStringMsg !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringMsg), i = 0; i < keys.length; ++i) {
                        writer.uint32(58/*= id 7, wireType 2 */).fork().uint32(10/*= id 1, wireType 2 */).string(keys[i])
                        types[6].encode(message.mapStringMsg[keys[i]], writer.uint32(18/*= id 2, wireType 2 */).fork()).ldelim()
                        writer.ldelim()
                    }
                }
                if (message.mapInt32String && message.mapInt32String !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapInt32String), i = 0; i < keys.length; ++i) {
                        writer.uint32(66/*= id 8, wireType 2 */).fork().uint32(8/*= id 1, wireType 0 */).int32(keys[i])
                        writer.uint32(18/*= id 2, wireType 2 */).string(message.mapInt32String[keys[i]])
                        writer.ldelim()
                    }
                }
                if (message.mapInt64String && message.mapInt64String !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapInt64String), i = 0; i < keys.length; ++i) {
                        writer.uint32(74/*= id 9, wireType 2 */).fork().uint32(8/*= id 1, wireType 0 */).int64(keys[i])
                        writer.uint32(18/*= id 2, wireType 2 */).string(message.mapInt64String[keys[i]])
                        writer.ldelim()
                    }
                }
                if (message.mapBoolString && message.mapBoolString !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapBoolString), i = 0; i < keys.length; ++i) {
                        writer.uint32(82/*= id 10, wireType 2 */).fork().uint32(8/*= id 1, wireType 0 */).bool(keys[i])
                        writer.uint32(18/*= id 2, wireType 2 */).string(message.mapBoolString[keys[i]])
                        writer.ldelim()
                    }
                }
                if (message.testMapFields !== undefined && message.testMapFields !== null)
                    types[10].encode(message.testMapFields, writer.uint32(90/*= id 11, wireType 2 */).fork()).ldelim()
                if (message.mapStringTestmapfields && message.mapStringTestmapfields !== util.emptyObject) {
                    for (var keys = Object.keys(message.mapStringTestmapfields), i = 0; i < keys.length; ++i) {
                        writer.uint32(98/*= id 12, wireType 2 */).fork().uint32(10/*= id 1, wireType 2 */).string(keys[i])
                        types[11].encode(message.mapStringTestmapfields[keys[i]], writer.uint32(18/*= id 2, wireType 2 */).fork()).ldelim()
                        writer.ldelim()
                    }
                }
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, null, null, null, "jspb.test.MapValueEnumNoBinary", "jspb.test.MapValueMessageNoBinary", null, null, null, "jspb.test.TestMapFieldsNoBinary", "jspb.test.TestMapFieldsNoBinary"]); /* eslint-enable */

            /**
             * Encodes the specified TestMapFieldsNoBinary, length delimited.
             * @param {jspb.test.TestMapFieldsNoBinary|Object} message TestMapFieldsNoBinary or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TestMapFieldsNoBinary.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TestMapFieldsNoBinary from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestMapFieldsNoBinary} TestMapFieldsNoBinary
             */
            TestMapFieldsNoBinary.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.TestMapFieldsNoBinary
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            reader.skip().pos++
                            if (message.mapStringString === util.emptyObject)
                                message.mapStringString = {}
                            var key = reader.string()
                            if (typeof key === "object")
                                key = util.longToHash(key)
                            reader.pos++
                            message.mapStringString[key] = reader.string()
                            break
                        case 2:
                            reader.skip().pos++
                            if (message.mapStringInt32 === util.emptyObject)
                                message.mapStringInt32 = {}
                            var key = reader.string()
                            if (typeof key === "object")
                                key = util.longToHash(key)
                            reader.pos++
                            message.mapStringInt32[key] = reader.int32()
                            break
                        case 3:
                            reader.skip().pos++
                            if (message.mapStringInt64 === util.emptyObject)
                                message.mapStringInt64 = {}
                            var key = reader.string()
                            if (typeof key === "object")
                                key = util.longToHash(key)
                            reader.pos++
                            message.mapStringInt64[key] = reader.int64()
                            break
                        case 4:
                            reader.skip().pos++
                            if (message.mapStringBool === util.emptyObject)
                                message.mapStringBool = {}
                            var key = reader.string()
                            if (typeof key === "object")
                                key = util.longToHash(key)
                            reader.pos++
                            message.mapStringBool[key] = reader.bool()
                            break
                        case 5:
                            reader.skip().pos++
                            if (message.mapStringDouble === util.emptyObject)
                                message.mapStringDouble = {}
                            var key = reader.string()
                            if (typeof key === "object")
                                key = util.longToHash(key)
                            reader.pos++
                            message.mapStringDouble[key] = reader.double()
                            break
                        case 6:
                            reader.skip().pos++
                            if (message.mapStringEnum === util.emptyObject)
                                message.mapStringEnum = {}
                            var key = reader.string()
                            if (typeof key === "object")
                                key = util.longToHash(key)
                            reader.pos++
                            message.mapStringEnum[key] = reader.uint32()
                            break
                        case 7:
                            reader.skip().pos++
                            if (message.mapStringMsg === util.emptyObject)
                                message.mapStringMsg = {}
                            var key = reader.string()
                            if (typeof key === "object")
                                key = util.longToHash(key)
                            reader.pos++
                            message.mapStringMsg[key] = types[6].decode(reader, reader.uint32())
                            break
                        case 8:
                            reader.skip().pos++
                            if (message.mapInt32String === util.emptyObject)
                                message.mapInt32String = {}
                            var key = reader.int32()
                            if (typeof key === "object")
                                key = util.longToHash(key)
                            reader.pos++
                            message.mapInt32String[key] = reader.string()
                            break
                        case 9:
                            reader.skip().pos++
                            if (message.mapInt64String === util.emptyObject)
                                message.mapInt64String = {}
                            var key = reader.int64()
                            if (typeof key === "object")
                                key = util.longToHash(key)
                            reader.pos++
                            message.mapInt64String[key] = reader.string()
                            break
                        case 10:
                            reader.skip().pos++
                            if (message.mapBoolString === util.emptyObject)
                                message.mapBoolString = {}
                            var key = reader.bool()
                            if (typeof key === "object")
                                key = util.longToHash(key)
                            reader.pos++
                            message.mapBoolString[key] = reader.string()
                            break
                        case 11:
                            message.testMapFields = types[10].decode(reader, reader.uint32())
                            break
                        case 12:
                            reader.skip().pos++
                            if (message.mapStringTestmapfields === util.emptyObject)
                                message.mapStringTestmapfields = {}
                            var key = reader.string()
                            if (typeof key === "object")
                                key = util.longToHash(key)
                            reader.pos++
                            message.mapStringTestmapfields[key] = types[11].decode(reader, reader.uint32())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, null, null, null, "jspb.test.MapValueEnumNoBinary", "jspb.test.MapValueMessageNoBinary", null, null, null, "jspb.test.TestMapFieldsNoBinary", "jspb.test.TestMapFieldsNoBinary"]); /* eslint-enable */

            /**
             * Decodes a TestMapFieldsNoBinary from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestMapFieldsNoBinary} TestMapFieldsNoBinary
             */
            TestMapFieldsNoBinary.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a TestMapFieldsNoBinary.
             * @function
             * @param {jspb.test.TestMapFieldsNoBinary|Object} message TestMapFieldsNoBinary or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TestMapFieldsNoBinary.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.mapStringString !== undefined) {
                    if (!util.isObject(message.mapStringString))
                        return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringString (object expected)"
                    var key = Object.keys(message.mapStringString)
                    for (var i = 0; i < key.length; ++i) {
                        if (!util.isString(message.mapStringString[key[i]]))
                            return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringString (string{key : string} expected)"
                    }
                }
                if (message.mapStringInt32 !== undefined) {
                    if (!util.isObject(message.mapStringInt32))
                        return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringInt32 (object expected)"
                    var key = Object.keys(message.mapStringInt32)
                    for (var i = 0; i < key.length; ++i) {
                        if (!util.isInteger(message.mapStringInt32[key[i]]))
                            return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringInt32 (integer{key : string} expected)"
                    }
                }
                if (message.mapStringInt64 !== undefined) {
                    if (!util.isObject(message.mapStringInt64))
                        return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringInt64 (object expected)"
                    var key = Object.keys(message.mapStringInt64)
                    for (var i = 0; i < key.length; ++i) {
                        if (!util.isInteger(message.mapStringInt64[key[i]]) && !(message.mapStringInt64[key[i]] && util.isInteger(message.mapStringInt64[key[i]].low) && util.isInteger(message.mapStringInt64[key[i]].high)))
                            return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringInt64 (integer | Long{key : string} expected)"
                    }
                }
                if (message.mapStringBool !== undefined) {
                    if (!util.isObject(message.mapStringBool))
                        return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringBool (object expected)"
                    var key = Object.keys(message.mapStringBool)
                    for (var i = 0; i < key.length; ++i) {
                        if (typeof message.mapStringBool[key[i]] !== "boolean")
                            return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringBool (boolean{key : string} expected)"
                    }
                }
                if (message.mapStringDouble !== undefined) {
                    if (!util.isObject(message.mapStringDouble))
                        return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringDouble (object expected)"
                    var key = Object.keys(message.mapStringDouble)
                    for (var i = 0; i < key.length; ++i) {
                        if (typeof message.mapStringDouble[key[i]] !== "number")
                            return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringDouble (number{key : string} expected)"
                    }
                }
                if (message.mapStringEnum !== undefined) {
                    if (!util.isObject(message.mapStringEnum))
                        return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringEnum (object expected)"
                    var key = Object.keys(message.mapStringEnum)
                    for (var i = 0; i < key.length; ++i) {
                        switch (message.mapStringEnum[key[i]]) {
                            default:
                                return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringEnum (enum value{key : string} expected)"
                            case 0:
                            case 1:
                            case 2:
                                break
                        }
                    }
                }
                if (message.mapStringMsg !== undefined) {
                    if (!util.isObject(message.mapStringMsg))
                        return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringMsg (object expected)"
                    var key = Object.keys(message.mapStringMsg)
                    for (var i = 0; i < key.length; ++i) {
                        var reason;
                        if (reason = types[6].verify(message.mapStringMsg[key[i]]))
                            return reason
                    }
                }
                if (message.mapInt32String !== undefined) {
                    if (!util.isObject(message.mapInt32String))
                        return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt32String (object expected)"
                    var key = Object.keys(message.mapInt32String)
                    for (var i = 0; i < key.length; ++i) {
                        if (!/^- ? ( ?: 0 | [1 - 9]\d*)$/.test(key[i]))
                            return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt32String (integer key{key : int32} expected)"
                        if (!util.isString(message.mapInt32String[key[i]]))
                            return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt32String (string{key : int32} expected)"
                    }
                }
                if (message.mapInt64String !== undefined) {
                    if (!util.isObject(message.mapInt64String))
                        return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt64String (object expected)"
                    var key = Object.keys(message.mapInt64String)
                    for (var i = 0; i < key.length; ++i) {
                        if (!/^( ?: [\x00-\xff]{8} | - ? ( ?: 0 | [1 - 9]\d*))$/.test(key[i]))
                            return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt64String (integer | Long key{key : int64} expected)"
                        if (!util.isString(message.mapInt64String[key[i]]))
                            return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt64String (string{key : int64} expected)"
                    }
                }
                if (message.mapBoolString !== undefined) {
                    if (!util.isObject(message.mapBoolString))
                        return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapBoolString (object expected)"
                    var key = Object.keys(message.mapBoolString)
                    for (var i = 0; i < key.length; ++i) {
                        if (!/^true | false | 0 | 1$/.test(key[i]))
                            return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapBoolString (boolean key{key : bool} expected)"
                        if (!util.isString(message.mapBoolString[key[i]]))
                            return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapBoolString (string{key : bool} expected)"
                    }
                }
                if (message.testMapFields !== undefined && message.testMapFields !== null) {
                    var reason;
                    if (reason = types[10].verify(message.testMapFields))
                        return reason
                }
                if (message.mapStringTestmapfields !== undefined) {
                    if (!util.isObject(message.mapStringTestmapfields))
                        return "invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringTestmapfields (object expected)"
                    var key = Object.keys(message.mapStringTestmapfields)
                    for (var i = 0; i < key.length; ++i) {
                        var reason;
                        if (reason = types[11].verify(message.mapStringTestmapfields[key[i]]))
                            return reason
                    }
                }
                return null
            }})($protobuf.util, [null, null, null, null, null, "jspb.test.MapValueEnumNoBinary", "jspb.test.MapValueMessageNoBinary", null, null, null, "jspb.test.TestMapFieldsNoBinary", "jspb.test.TestMapFieldsNoBinary"]); /* eslint-enable */

            return TestMapFieldsNoBinary;
        })();

        /**
         * MapValueEnumNoBinary values.
         * @exports jspb.test.MapValueEnumNoBinary
         * @type {Object.<string,number>}
         */
        test.MapValueEnumNoBinary = {

            MAP_VALUE_FOO_NOBINARY: 0,
            MAP_VALUE_BAR_NOBINARY: 1,
            MAP_VALUE_BAZ_NOBINARY: 2
        };

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
             * Encodes the specified MapValueMessageNoBinary.
             * @function
             * @param {jspb.test.MapValueMessageNoBinary|Object} message MapValueMessageNoBinary or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MapValueMessageNoBinary.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.foo !== undefined && message.foo !== 0)
                    writer.uint32(8/*= id 1, wireType 0 */).int32(message.foo)
                return writer
            }})($protobuf.Writer, $protobuf.util, [null]); /* eslint-enable */

            /**
             * Encodes the specified MapValueMessageNoBinary, length delimited.
             * @param {jspb.test.MapValueMessageNoBinary|Object} message MapValueMessageNoBinary or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MapValueMessageNoBinary.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MapValueMessageNoBinary from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.MapValueMessageNoBinary} MapValueMessageNoBinary
             */
            MapValueMessageNoBinary.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.MapValueMessageNoBinary
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.foo = reader.int32()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null]); /* eslint-enable */

            /**
             * Decodes a MapValueMessageNoBinary from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.MapValueMessageNoBinary} MapValueMessageNoBinary
             */
            MapValueMessageNoBinary.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a MapValueMessageNoBinary.
             * @function
             * @param {jspb.test.MapValueMessageNoBinary|Object} message MapValueMessageNoBinary or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MapValueMessageNoBinary.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.foo !== undefined) {
                    if (!util.isInteger(message.foo))
                        return "invalid value for field .jspb.test.MapValueMessageNoBinary.foo (integer expected)"
                }
                return null
            }})($protobuf.util, [null]); /* eslint-enable */

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

            /**
             * Creates a new Deeply instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Deeply} Deeply instance
             */
            Deeply.create = function create(properties) {
                return new Deeply(properties);
            };

            /**
             * Encodes the specified Deeply.
             * @function
             * @param {jspb.test.Deeply|Object} message Deeply or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Deeply.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                return writer
            }})($protobuf.Writer, $protobuf.util, []); /* eslint-enable */

            /**
             * Encodes the specified Deeply, length delimited.
             * @param {jspb.test.Deeply|Object} message Deeply or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Deeply.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Deeply from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Deeply} Deeply
             */
            Deeply.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.Deeply
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, []); /* eslint-enable */

            /**
             * Decodes a Deeply from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Deeply} Deeply
             */
            Deeply.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a Deeply.
             * @function
             * @param {jspb.test.Deeply|Object} message Deeply or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Deeply.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                return null
            }})($protobuf.util, []); /* eslint-enable */

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

                /**
                 * Creates a new Nested instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {jspb.test.Deeply.Nested} Nested instance
                 */
                Nested.create = function create(properties) {
                    return new Nested(properties);
                };

                /**
                 * Encodes the specified Nested.
                 * @function
                 * @param {jspb.test.Deeply.Nested|Object} message Nested or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                    writer || (writer = Writer.create())
                    return writer
                }})($protobuf.Writer, $protobuf.util, []); /* eslint-enable */

                /**
                 * Encodes the specified Nested, length delimited.
                 * @param {jspb.test.Deeply.Nested|Object} message Nested or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Nested.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Nested from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.Deeply.Nested} Nested
                 */
                Nested.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                    reader instanceof Reader || (reader = Reader.create(reader))
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.Deeply.Nested
                    while (reader.pos < end) {
                        var tag = reader.uint32()
                        switch (tag >>> 3) {
                            default:
                                reader.skipType(tag & 7)
                                break
                        }
                    }
                    return message
                }})($protobuf.Reader, $protobuf.util, []); /* eslint-enable */

                /**
                 * Decodes a Nested from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.Deeply.Nested} Nested
                 */
                Nested.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a Nested.
                 * @function
                 * @param {jspb.test.Deeply.Nested|Object} message Nested or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Nested.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                    return null
                }})($protobuf.util, []); /* eslint-enable */

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
                     * Encodes the specified Message.
                     * @function
                     * @param {jspb.test.Deeply.Nested.Message|Object} message Message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Message.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                        writer || (writer = Writer.create())
                        if (message.count !== undefined && message.count !== 0)
                            writer.uint32(8/*= id 1, wireType 0 */).int32(message.count)
                        return writer
                    }})($protobuf.Writer, $protobuf.util, [null]); /* eslint-enable */

                    /**
                     * Encodes the specified Message, length delimited.
                     * @param {jspb.test.Deeply.Nested.Message|Object} message Message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Message.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Message from the specified reader or buffer.
                     * @function
                     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {jspb.test.Deeply.Nested.Message} Message
                     */
                    Message.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                        reader instanceof Reader || (reader = Reader.create(reader))
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.jspb.test.Deeply.Nested.Message
                        while (reader.pos < end) {
                            var tag = reader.uint32()
                            switch (tag >>> 3) {
                                case 1:
                                    message.count = reader.int32()
                                    break
                                default:
                                    reader.skipType(tag & 7)
                                    break
                            }
                        }
                        return message
                    }})($protobuf.Reader, $protobuf.util, [null]); /* eslint-enable */

                    /**
                     * Decodes a Message from the specified reader or buffer, length delimited.
                     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                     * @returns {jspb.test.Deeply.Nested.Message} Message
                     */
                    Message.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                    };

                    /**
                     * Verifies a Message.
                     * @function
                     * @param {jspb.test.Deeply.Nested.Message|Object} message Message or plain object to verify
                     * @returns {?string} `null` if valid, otherwise the reason why it is not
                     */
                    Message.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                        if (message.count !== undefined) {
                            if (!util.isInteger(message.count))
                                return "invalid value for field .jspb.test.Deeply.Nested.Message.count (integer expected)"
                        }
                        return null
                    }})($protobuf.util, [null]); /* eslint-enable */

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

            /**
             * Creates a new FileDescriptorSet instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet instance
             */
            FileDescriptorSet.create = function create(properties) {
                return new FileDescriptorSet(properties);
            };

            /**
             * Encodes the specified FileDescriptorSet.
             * @function
             * @param {google.protobuf.FileDescriptorSet|Object} message FileDescriptorSet or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileDescriptorSet.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.file)
                    for (var i = 0; i < message.file.length; ++i)
                    types[0].encode(message.file[i], writer.uint32(10/*= id 1, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, ["google.protobuf.FileDescriptorProto"]); /* eslint-enable */

            /**
             * Encodes the specified FileDescriptorSet, length delimited.
             * @param {google.protobuf.FileDescriptorSet|Object} message FileDescriptorSet or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileDescriptorSet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FileDescriptorSet from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet
             */
            FileDescriptorSet.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.FileDescriptorSet
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.file && message.file.length || (message.file = [])
                            message.file.push(types[0].decode(reader, reader.uint32()))
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, ["google.protobuf.FileDescriptorProto"]); /* eslint-enable */

            /**
             * Decodes a FileDescriptorSet from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet
             */
            FileDescriptorSet.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FileDescriptorSet.
             * @function
             * @param {google.protobuf.FileDescriptorSet|Object} message FileDescriptorSet or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FileDescriptorSet.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.file !== undefined) {
                    if (!Array.isArray(message.file))
                        return "invalid value for field .google.protobuf.FileDescriptorSet.file (array expected)"
                    for (var i = 0; i < message.file.length; ++i) {
                        var reason;
                        if (reason = types[0].verify(message.file[i]))
                            return reason
                    }
                }
                return null
            }})($protobuf.util, ["google.protobuf.FileDescriptorProto"]); /* eslint-enable */

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

            /**
             * Creates a new FileDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto instance
             */
            FileDescriptorProto.create = function create(properties) {
                return new FileDescriptorProto(properties);
            };

            /**
             * Encodes the specified FileDescriptorProto.
             * @function
             * @param {google.protobuf.FileDescriptorProto|Object} message FileDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileDescriptorProto.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.name !== undefined && message.name !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.name)
                if (message["package"] !== undefined && message["package"] !== "")
                    writer.uint32(18/*= id 2, wireType 2 */).string(message["package"])
                if (message.dependency)
                    for (var i = 0; i < message.dependency.length; ++i)
                    writer.uint32(26/*= id 3, wireType 2 */).string(message.dependency[i])
                if (message.publicDependency)
                    for (var i = 0; i < message.publicDependency.length; ++i)
                    writer.uint32(80/*= id 10, wireType 0 */).int32(message.publicDependency[i])
                if (message.weakDependency)
                    for (var i = 0; i < message.weakDependency.length; ++i)
                    writer.uint32(88/*= id 11, wireType 0 */).int32(message.weakDependency[i])
                if (message.messageType)
                    for (var i = 0; i < message.messageType.length; ++i)
                    types[5].encode(message.messageType[i], writer.uint32(34/*= id 4, wireType 2 */).fork()).ldelim()
                if (message.enumType)
                    for (var i = 0; i < message.enumType.length; ++i)
                    types[6].encode(message.enumType[i], writer.uint32(42/*= id 5, wireType 2 */).fork()).ldelim()
                if (message.service)
                    for (var i = 0; i < message.service.length; ++i)
                    types[7].encode(message.service[i], writer.uint32(50/*= id 6, wireType 2 */).fork()).ldelim()
                if (message.extension)
                    for (var i = 0; i < message.extension.length; ++i)
                    types[8].encode(message.extension[i], writer.uint32(58/*= id 7, wireType 2 */).fork()).ldelim()
                if (message.options !== undefined && message.options !== null)
                    types[9].encode(message.options, writer.uint32(66/*= id 8, wireType 2 */).fork()).ldelim()
                if (message.sourceCodeInfo !== undefined && message.sourceCodeInfo !== null)
                    types[10].encode(message.sourceCodeInfo, writer.uint32(74/*= id 9, wireType 2 */).fork()).ldelim()
                if (message.syntax !== undefined && message.syntax !== "")
                    writer.uint32(98/*= id 12, wireType 2 */).string(message.syntax)
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, null, null, null, "google.protobuf.DescriptorProto", "google.protobuf.EnumDescriptorProto", "google.protobuf.ServiceDescriptorProto", "google.protobuf.FieldDescriptorProto", "google.protobuf.FileOptions", "google.protobuf.SourceCodeInfo", null]); /* eslint-enable */

            /**
             * Encodes the specified FileDescriptorProto, length delimited.
             * @param {google.protobuf.FileDescriptorProto|Object} message FileDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FileDescriptorProto from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto
             */
            FileDescriptorProto.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.FileDescriptorProto
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string()
                            break
                        case 2:
                            message["package"] = reader.string()
                            break
                        case 3:
                            message.dependency && message.dependency.length || (message.dependency = [])
                            message.dependency.push(reader.string())
                            break
                        case 10:
                            message.publicDependency && message.publicDependency.length || (message.publicDependency = [])
                            message.publicDependency.push(reader.int32())
                            break
                        case 11:
                            message.weakDependency && message.weakDependency.length || (message.weakDependency = [])
                            message.weakDependency.push(reader.int32())
                            break
                        case 4:
                            message.messageType && message.messageType.length || (message.messageType = [])
                            message.messageType.push(types[5].decode(reader, reader.uint32()))
                            break
                        case 5:
                            message.enumType && message.enumType.length || (message.enumType = [])
                            message.enumType.push(types[6].decode(reader, reader.uint32()))
                            break
                        case 6:
                            message.service && message.service.length || (message.service = [])
                            message.service.push(types[7].decode(reader, reader.uint32()))
                            break
                        case 7:
                            message.extension && message.extension.length || (message.extension = [])
                            message.extension.push(types[8].decode(reader, reader.uint32()))
                            break
                        case 8:
                            message.options = types[9].decode(reader, reader.uint32())
                            break
                        case 9:
                            message.sourceCodeInfo = types[10].decode(reader, reader.uint32())
                            break
                        case 12:
                            message.syntax = reader.string()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, null, null, null, "google.protobuf.DescriptorProto", "google.protobuf.EnumDescriptorProto", "google.protobuf.ServiceDescriptorProto", "google.protobuf.FieldDescriptorProto", "google.protobuf.FileOptions", "google.protobuf.SourceCodeInfo", null]); /* eslint-enable */

            /**
             * Decodes a FileDescriptorProto from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto
             */
            FileDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FileDescriptorProto.
             * @function
             * @param {google.protobuf.FileDescriptorProto|Object} message FileDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FileDescriptorProto.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.name !== undefined) {
                    if (!util.isString(message.name))
                        return "invalid value for field .google.protobuf.FileDescriptorProto.name (string expected)"
                }
                if (message["package"] !== undefined) {
                    if (!util.isString(message["package"]))
                        return "invalid value for field .google.protobuf.FileDescriptorProto.package (string expected)"
                }
                if (message.dependency !== undefined) {
                    if (!Array.isArray(message.dependency))
                        return "invalid value for field .google.protobuf.FileDescriptorProto.dependency (array expected)"
                    for (var i = 0; i < message.dependency.length; ++i) {
                        if (!util.isString(message.dependency[i]))
                            return "invalid value for field .google.protobuf.FileDescriptorProto.dependency (string[] expected)"
                    }
                }
                if (message.publicDependency !== undefined) {
                    if (!Array.isArray(message.publicDependency))
                        return "invalid value for field .google.protobuf.FileDescriptorProto.publicDependency (array expected)"
                    for (var i = 0; i < message.publicDependency.length; ++i) {
                        if (!util.isInteger(message.publicDependency[i]))
                            return "invalid value for field .google.protobuf.FileDescriptorProto.publicDependency (integer[] expected)"
                    }
                }
                if (message.weakDependency !== undefined) {
                    if (!Array.isArray(message.weakDependency))
                        return "invalid value for field .google.protobuf.FileDescriptorProto.weakDependency (array expected)"
                    for (var i = 0; i < message.weakDependency.length; ++i) {
                        if (!util.isInteger(message.weakDependency[i]))
                            return "invalid value for field .google.protobuf.FileDescriptorProto.weakDependency (integer[] expected)"
                    }
                }
                if (message.messageType !== undefined) {
                    if (!Array.isArray(message.messageType))
                        return "invalid value for field .google.protobuf.FileDescriptorProto.messageType (array expected)"
                    for (var i = 0; i < message.messageType.length; ++i) {
                        var reason;
                        if (reason = types[5].verify(message.messageType[i]))
                            return reason
                    }
                }
                if (message.enumType !== undefined) {
                    if (!Array.isArray(message.enumType))
                        return "invalid value for field .google.protobuf.FileDescriptorProto.enumType (array expected)"
                    for (var i = 0; i < message.enumType.length; ++i) {
                        var reason;
                        if (reason = types[6].verify(message.enumType[i]))
                            return reason
                    }
                }
                if (message.service !== undefined) {
                    if (!Array.isArray(message.service))
                        return "invalid value for field .google.protobuf.FileDescriptorProto.service (array expected)"
                    for (var i = 0; i < message.service.length; ++i) {
                        var reason;
                        if (reason = types[7].verify(message.service[i]))
                            return reason
                    }
                }
                if (message.extension !== undefined) {
                    if (!Array.isArray(message.extension))
                        return "invalid value for field .google.protobuf.FileDescriptorProto.extension (array expected)"
                    for (var i = 0; i < message.extension.length; ++i) {
                        var reason;
                        if (reason = types[8].verify(message.extension[i]))
                            return reason
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var reason;
                    if (reason = types[9].verify(message.options))
                        return reason
                }
                if (message.sourceCodeInfo !== undefined && message.sourceCodeInfo !== null) {
                    var reason;
                    if (reason = types[10].verify(message.sourceCodeInfo))
                        return reason
                }
                if (message.syntax !== undefined) {
                    if (!util.isString(message.syntax))
                        return "invalid value for field .google.protobuf.FileDescriptorProto.syntax (string expected)"
                }
                return null
            }})($protobuf.util, [null, null, null, null, null, "google.protobuf.DescriptorProto", "google.protobuf.EnumDescriptorProto", "google.protobuf.ServiceDescriptorProto", "google.protobuf.FieldDescriptorProto", "google.protobuf.FileOptions", "google.protobuf.SourceCodeInfo", null]); /* eslint-enable */

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

            /**
             * Creates a new DescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.DescriptorProto} DescriptorProto instance
             */
            DescriptorProto.create = function create(properties) {
                return new DescriptorProto(properties);
            };

            /**
             * Encodes the specified DescriptorProto.
             * @function
             * @param {google.protobuf.DescriptorProto|Object} message DescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DescriptorProto.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.name !== undefined && message.name !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.name)
                if (message.field)
                    for (var i = 0; i < message.field.length; ++i)
                    types[1].encode(message.field[i], writer.uint32(18/*= id 2, wireType 2 */).fork()).ldelim()
                if (message.extension)
                    for (var i = 0; i < message.extension.length; ++i)
                    types[2].encode(message.extension[i], writer.uint32(50/*= id 6, wireType 2 */).fork()).ldelim()
                if (message.nestedType)
                    for (var i = 0; i < message.nestedType.length; ++i)
                    types[3].encode(message.nestedType[i], writer.uint32(26/*= id 3, wireType 2 */).fork()).ldelim()
                if (message.enumType)
                    for (var i = 0; i < message.enumType.length; ++i)
                    types[4].encode(message.enumType[i], writer.uint32(34/*= id 4, wireType 2 */).fork()).ldelim()
                if (message.extensionRange)
                    for (var i = 0; i < message.extensionRange.length; ++i)
                    types[5].encode(message.extensionRange[i], writer.uint32(42/*= id 5, wireType 2 */).fork()).ldelim()
                if (message.oneofDecl)
                    for (var i = 0; i < message.oneofDecl.length; ++i)
                    types[6].encode(message.oneofDecl[i], writer.uint32(66/*= id 8, wireType 2 */).fork()).ldelim()
                if (message.options !== undefined && message.options !== null)
                    types[7].encode(message.options, writer.uint32(58/*= id 7, wireType 2 */).fork()).ldelim()
                if (message.reservedRange)
                    for (var i = 0; i < message.reservedRange.length; ++i)
                    types[8].encode(message.reservedRange[i], writer.uint32(74/*= id 9, wireType 2 */).fork()).ldelim()
                if (message.reservedName)
                    for (var i = 0; i < message.reservedName.length; ++i)
                    writer.uint32(82/*= id 10, wireType 2 */).string(message.reservedName[i])
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, "google.protobuf.FieldDescriptorProto", "google.protobuf.FieldDescriptorProto", "google.protobuf.DescriptorProto", "google.protobuf.EnumDescriptorProto", "google.protobuf.DescriptorProto.ExtensionRange", "google.protobuf.OneofDescriptorProto", "google.protobuf.MessageOptions", "google.protobuf.DescriptorProto.ReservedRange", null]); /* eslint-enable */

            /**
             * Encodes the specified DescriptorProto, length delimited.
             * @param {google.protobuf.DescriptorProto|Object} message DescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DescriptorProto from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.DescriptorProto} DescriptorProto
             */
            DescriptorProto.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.DescriptorProto
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string()
                            break
                        case 2:
                            message.field && message.field.length || (message.field = [])
                            message.field.push(types[1].decode(reader, reader.uint32()))
                            break
                        case 6:
                            message.extension && message.extension.length || (message.extension = [])
                            message.extension.push(types[2].decode(reader, reader.uint32()))
                            break
                        case 3:
                            message.nestedType && message.nestedType.length || (message.nestedType = [])
                            message.nestedType.push(types[3].decode(reader, reader.uint32()))
                            break
                        case 4:
                            message.enumType && message.enumType.length || (message.enumType = [])
                            message.enumType.push(types[4].decode(reader, reader.uint32()))
                            break
                        case 5:
                            message.extensionRange && message.extensionRange.length || (message.extensionRange = [])
                            message.extensionRange.push(types[5].decode(reader, reader.uint32()))
                            break
                        case 8:
                            message.oneofDecl && message.oneofDecl.length || (message.oneofDecl = [])
                            message.oneofDecl.push(types[6].decode(reader, reader.uint32()))
                            break
                        case 7:
                            message.options = types[7].decode(reader, reader.uint32())
                            break
                        case 9:
                            message.reservedRange && message.reservedRange.length || (message.reservedRange = [])
                            message.reservedRange.push(types[8].decode(reader, reader.uint32()))
                            break
                        case 10:
                            message.reservedName && message.reservedName.length || (message.reservedName = [])
                            message.reservedName.push(reader.string())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, "google.protobuf.FieldDescriptorProto", "google.protobuf.FieldDescriptorProto", "google.protobuf.DescriptorProto", "google.protobuf.EnumDescriptorProto", "google.protobuf.DescriptorProto.ExtensionRange", "google.protobuf.OneofDescriptorProto", "google.protobuf.MessageOptions", "google.protobuf.DescriptorProto.ReservedRange", null]); /* eslint-enable */

            /**
             * Decodes a DescriptorProto from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.DescriptorProto} DescriptorProto
             */
            DescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a DescriptorProto.
             * @function
             * @param {google.protobuf.DescriptorProto|Object} message DescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            DescriptorProto.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.name !== undefined) {
                    if (!util.isString(message.name))
                        return "invalid value for field .google.protobuf.DescriptorProto.name (string expected)"
                }
                if (message.field !== undefined) {
                    if (!Array.isArray(message.field))
                        return "invalid value for field .google.protobuf.DescriptorProto.field (array expected)"
                    for (var i = 0; i < message.field.length; ++i) {
                        var reason;
                        if (reason = types[1].verify(message.field[i]))
                            return reason
                    }
                }
                if (message.extension !== undefined) {
                    if (!Array.isArray(message.extension))
                        return "invalid value for field .google.protobuf.DescriptorProto.extension (array expected)"
                    for (var i = 0; i < message.extension.length; ++i) {
                        var reason;
                        if (reason = types[2].verify(message.extension[i]))
                            return reason
                    }
                }
                if (message.nestedType !== undefined) {
                    if (!Array.isArray(message.nestedType))
                        return "invalid value for field .google.protobuf.DescriptorProto.nestedType (array expected)"
                    for (var i = 0; i < message.nestedType.length; ++i) {
                        var reason;
                        if (reason = types[3].verify(message.nestedType[i]))
                            return reason
                    }
                }
                if (message.enumType !== undefined) {
                    if (!Array.isArray(message.enumType))
                        return "invalid value for field .google.protobuf.DescriptorProto.enumType (array expected)"
                    for (var i = 0; i < message.enumType.length; ++i) {
                        var reason;
                        if (reason = types[4].verify(message.enumType[i]))
                            return reason
                    }
                }
                if (message.extensionRange !== undefined) {
                    if (!Array.isArray(message.extensionRange))
                        return "invalid value for field .google.protobuf.DescriptorProto.extensionRange (array expected)"
                    for (var i = 0; i < message.extensionRange.length; ++i) {
                        var reason;
                        if (reason = types[5].verify(message.extensionRange[i]))
                            return reason
                    }
                }
                if (message.oneofDecl !== undefined) {
                    if (!Array.isArray(message.oneofDecl))
                        return "invalid value for field .google.protobuf.DescriptorProto.oneofDecl (array expected)"
                    for (var i = 0; i < message.oneofDecl.length; ++i) {
                        var reason;
                        if (reason = types[6].verify(message.oneofDecl[i]))
                            return reason
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var reason;
                    if (reason = types[7].verify(message.options))
                        return reason
                }
                if (message.reservedRange !== undefined) {
                    if (!Array.isArray(message.reservedRange))
                        return "invalid value for field .google.protobuf.DescriptorProto.reservedRange (array expected)"
                    for (var i = 0; i < message.reservedRange.length; ++i) {
                        var reason;
                        if (reason = types[8].verify(message.reservedRange[i]))
                            return reason
                    }
                }
                if (message.reservedName !== undefined) {
                    if (!Array.isArray(message.reservedName))
                        return "invalid value for field .google.protobuf.DescriptorProto.reservedName (array expected)"
                    for (var i = 0; i < message.reservedName.length; ++i) {
                        if (!util.isString(message.reservedName[i]))
                            return "invalid value for field .google.protobuf.DescriptorProto.reservedName (string[] expected)"
                    }
                }
                return null
            }})($protobuf.util, [null, "google.protobuf.FieldDescriptorProto", "google.protobuf.FieldDescriptorProto", "google.protobuf.DescriptorProto", "google.protobuf.EnumDescriptorProto", "google.protobuf.DescriptorProto.ExtensionRange", "google.protobuf.OneofDescriptorProto", "google.protobuf.MessageOptions", "google.protobuf.DescriptorProto.ReservedRange", null]); /* eslint-enable */

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
                 * Encodes the specified ExtensionRange.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ExtensionRange|Object} message ExtensionRange or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ExtensionRange.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                    writer || (writer = Writer.create())
                    if (message.start !== undefined && message.start !== 0)
                        writer.uint32(8/*= id 1, wireType 0 */).int32(message.start)
                    if (message.end !== undefined && message.end !== 0)
                        writer.uint32(16/*= id 2, wireType 0 */).int32(message.end)
                    return writer
                }})($protobuf.Writer, $protobuf.util, [null, null]); /* eslint-enable */

                /**
                 * Encodes the specified ExtensionRange, length delimited.
                 * @param {google.protobuf.DescriptorProto.ExtensionRange|Object} message ExtensionRange or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ExtensionRange.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ExtensionRange from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange
                 */
                ExtensionRange.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                    reader instanceof Reader || (reader = Reader.create(reader))
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.DescriptorProto.ExtensionRange
                    while (reader.pos < end) {
                        var tag = reader.uint32()
                        switch (tag >>> 3) {
                            case 1:
                                message.start = reader.int32()
                                break
                            case 2:
                                message.end = reader.int32()
                                break
                            default:
                                reader.skipType(tag & 7)
                                break
                        }
                    }
                    return message
                }})($protobuf.Reader, $protobuf.util, [null, null]); /* eslint-enable */

                /**
                 * Decodes a ExtensionRange from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange
                 */
                ExtensionRange.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a ExtensionRange.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ExtensionRange|Object} message ExtensionRange or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                ExtensionRange.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                    if (message.start !== undefined) {
                        if (!util.isInteger(message.start))
                            return "invalid value for field .google.protobuf.DescriptorProto.ExtensionRange.start (integer expected)"
                    }
                    if (message.end !== undefined) {
                        if (!util.isInteger(message.end))
                            return "invalid value for field .google.protobuf.DescriptorProto.ExtensionRange.end (integer expected)"
                    }
                    return null
                }})($protobuf.util, [null, null]); /* eslint-enable */

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
                 * Encodes the specified ReservedRange.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ReservedRange|Object} message ReservedRange or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ReservedRange.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                    writer || (writer = Writer.create())
                    if (message.start !== undefined && message.start !== 0)
                        writer.uint32(8/*= id 1, wireType 0 */).int32(message.start)
                    if (message.end !== undefined && message.end !== 0)
                        writer.uint32(16/*= id 2, wireType 0 */).int32(message.end)
                    return writer
                }})($protobuf.Writer, $protobuf.util, [null, null]); /* eslint-enable */

                /**
                 * Encodes the specified ReservedRange, length delimited.
                 * @param {google.protobuf.DescriptorProto.ReservedRange|Object} message ReservedRange or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ReservedRange.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ReservedRange from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange
                 */
                ReservedRange.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                    reader instanceof Reader || (reader = Reader.create(reader))
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.DescriptorProto.ReservedRange
                    while (reader.pos < end) {
                        var tag = reader.uint32()
                        switch (tag >>> 3) {
                            case 1:
                                message.start = reader.int32()
                                break
                            case 2:
                                message.end = reader.int32()
                                break
                            default:
                                reader.skipType(tag & 7)
                                break
                        }
                    }
                    return message
                }})($protobuf.Reader, $protobuf.util, [null, null]); /* eslint-enable */

                /**
                 * Decodes a ReservedRange from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange
                 */
                ReservedRange.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a ReservedRange.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ReservedRange|Object} message ReservedRange or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                ReservedRange.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                    if (message.start !== undefined) {
                        if (!util.isInteger(message.start))
                            return "invalid value for field .google.protobuf.DescriptorProto.ReservedRange.start (integer expected)"
                    }
                    if (message.end !== undefined) {
                        if (!util.isInteger(message.end))
                            return "invalid value for field .google.protobuf.DescriptorProto.ReservedRange.end (integer expected)"
                    }
                    return null
                }})($protobuf.util, [null, null]); /* eslint-enable */

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

            /**
             * Creates a new FieldDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto instance
             */
            FieldDescriptorProto.create = function create(properties) {
                return new FieldDescriptorProto(properties);
            };

            /**
             * Encodes the specified FieldDescriptorProto.
             * @function
             * @param {google.protobuf.FieldDescriptorProto|Object} message FieldDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FieldDescriptorProto.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.name !== undefined && message.name !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.name)
                if (message.number !== undefined && message.number !== 0)
                    writer.uint32(24/*= id 3, wireType 0 */).int32(message.number)
                if (message.label !== undefined && message.label !== 0)
                    writer.uint32(32/*= id 4, wireType 0 */).uint32(message.label)
                if (message.type !== undefined && message.type !== 0)
                    writer.uint32(40/*= id 5, wireType 0 */).uint32(message.type)
                if (message.typeName !== undefined && message.typeName !== "")
                    writer.uint32(50/*= id 6, wireType 2 */).string(message.typeName)
                if (message.extendee !== undefined && message.extendee !== "")
                    writer.uint32(18/*= id 2, wireType 2 */).string(message.extendee)
                if (message.defaultValue !== undefined && message.defaultValue !== "")
                    writer.uint32(58/*= id 7, wireType 2 */).string(message.defaultValue)
                if (message.oneofIndex !== undefined && message.oneofIndex !== 0)
                    writer.uint32(72/*= id 9, wireType 0 */).int32(message.oneofIndex)
                if (message.jsonName !== undefined && message.jsonName !== "")
                    writer.uint32(82/*= id 10, wireType 2 */).string(message.jsonName)
                if (message.options !== undefined && message.options !== null)
                    types[9].encode(message.options, writer.uint32(66/*= id 8, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, "google.protobuf.FieldDescriptorProto.Label", "google.protobuf.FieldDescriptorProto.Type", null, null, null, null, null, "google.protobuf.FieldOptions"]); /* eslint-enable */

            /**
             * Encodes the specified FieldDescriptorProto, length delimited.
             * @param {google.protobuf.FieldDescriptorProto|Object} message FieldDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FieldDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FieldDescriptorProto from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto
             */
            FieldDescriptorProto.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.FieldDescriptorProto
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string()
                            break
                        case 3:
                            message.number = reader.int32()
                            break
                        case 4:
                            message.label = reader.uint32()
                            break
                        case 5:
                            message.type = reader.uint32()
                            break
                        case 6:
                            message.typeName = reader.string()
                            break
                        case 2:
                            message.extendee = reader.string()
                            break
                        case 7:
                            message.defaultValue = reader.string()
                            break
                        case 9:
                            message.oneofIndex = reader.int32()
                            break
                        case 10:
                            message.jsonName = reader.string()
                            break
                        case 8:
                            message.options = types[9].decode(reader, reader.uint32())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, "google.protobuf.FieldDescriptorProto.Label", "google.protobuf.FieldDescriptorProto.Type", null, null, null, null, null, "google.protobuf.FieldOptions"]); /* eslint-enable */

            /**
             * Decodes a FieldDescriptorProto from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto
             */
            FieldDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FieldDescriptorProto.
             * @function
             * @param {google.protobuf.FieldDescriptorProto|Object} message FieldDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FieldDescriptorProto.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.name !== undefined) {
                    if (!util.isString(message.name))
                        return "invalid value for field .google.protobuf.FieldDescriptorProto.name (string expected)"
                }
                if (message.number !== undefined) {
                    if (!util.isInteger(message.number))
                        return "invalid value for field .google.protobuf.FieldDescriptorProto.number (integer expected)"
                }
                if (message.label !== undefined) {
                    switch (message.label) {
                        default:
                            return "invalid value for field .google.protobuf.FieldDescriptorProto.label (enum value expected)"
                        case 1:
                        case 2:
                        case 3:
                            break
                    }
                }
                if (message.type !== undefined) {
                    switch (message.type) {
                        default:
                            return "invalid value for field .google.protobuf.FieldDescriptorProto.type (enum value expected)"
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
                            break
                    }
                }
                if (message.typeName !== undefined) {
                    if (!util.isString(message.typeName))
                        return "invalid value for field .google.protobuf.FieldDescriptorProto.typeName (string expected)"
                }
                if (message.extendee !== undefined) {
                    if (!util.isString(message.extendee))
                        return "invalid value for field .google.protobuf.FieldDescriptorProto.extendee (string expected)"
                }
                if (message.defaultValue !== undefined) {
                    if (!util.isString(message.defaultValue))
                        return "invalid value for field .google.protobuf.FieldDescriptorProto.defaultValue (string expected)"
                }
                if (message.oneofIndex !== undefined) {
                    if (!util.isInteger(message.oneofIndex))
                        return "invalid value for field .google.protobuf.FieldDescriptorProto.oneofIndex (integer expected)"
                }
                if (message.jsonName !== undefined) {
                    if (!util.isString(message.jsonName))
                        return "invalid value for field .google.protobuf.FieldDescriptorProto.jsonName (string expected)"
                }
                if (message.options !== undefined && message.options !== null) {
                    var reason;
                    if (reason = types[9].verify(message.options))
                        return reason
                }
                return null
            }})($protobuf.util, [null, null, "google.protobuf.FieldDescriptorProto.Label", "google.protobuf.FieldDescriptorProto.Type", null, null, null, null, null, "google.protobuf.FieldOptions"]); /* eslint-enable */

            /**
             * Type values.
             * @exports google.protobuf.FieldDescriptorProto.Type
             * @type {Object.<string,number>}
             */
            FieldDescriptorProto.Type = {

                TYPE_DOUBLE: 1,
                TYPE_FLOAT: 2,
                TYPE_INT64: 3,
                TYPE_UINT64: 4,
                TYPE_INT32: 5,
                TYPE_FIXED64: 6,
                TYPE_FIXED32: 7,
                TYPE_BOOL: 8,
                TYPE_STRING: 9,
                TYPE_GROUP: 10,
                TYPE_MESSAGE: 11,
                TYPE_BYTES: 12,
                TYPE_UINT32: 13,
                TYPE_ENUM: 14,
                TYPE_SFIXED32: 15,
                TYPE_SFIXED64: 16,
                TYPE_SINT32: 17,
                TYPE_SINT64: 18
            };

            /**
             * Label values.
             * @exports google.protobuf.FieldDescriptorProto.Label
             * @type {Object.<string,number>}
             */
            FieldDescriptorProto.Label = {

                LABEL_OPTIONAL: 1,
                LABEL_REQUIRED: 2,
                LABEL_REPEATED: 3
            };

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

            /**
             * Creates a new OneofDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto instance
             */
            OneofDescriptorProto.create = function create(properties) {
                return new OneofDescriptorProto(properties);
            };

            /**
             * Encodes the specified OneofDescriptorProto.
             * @function
             * @param {google.protobuf.OneofDescriptorProto|Object} message OneofDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneofDescriptorProto.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.name !== undefined && message.name !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.name)
                if (message.options !== undefined && message.options !== null)
                    types[1].encode(message.options, writer.uint32(18/*= id 2, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, "google.protobuf.OneofOptions"]); /* eslint-enable */

            /**
             * Encodes the specified OneofDescriptorProto, length delimited.
             * @param {google.protobuf.OneofDescriptorProto|Object} message OneofDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneofDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a OneofDescriptorProto from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto
             */
            OneofDescriptorProto.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.OneofDescriptorProto
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string()
                            break
                        case 2:
                            message.options = types[1].decode(reader, reader.uint32())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, "google.protobuf.OneofOptions"]); /* eslint-enable */

            /**
             * Decodes a OneofDescriptorProto from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto
             */
            OneofDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a OneofDescriptorProto.
             * @function
             * @param {google.protobuf.OneofDescriptorProto|Object} message OneofDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            OneofDescriptorProto.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.name !== undefined) {
                    if (!util.isString(message.name))
                        return "invalid value for field .google.protobuf.OneofDescriptorProto.name (string expected)"
                }
                if (message.options !== undefined && message.options !== null) {
                    var reason;
                    if (reason = types[1].verify(message.options))
                        return reason
                }
                return null
            }})($protobuf.util, [null, "google.protobuf.OneofOptions"]); /* eslint-enable */

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

            /**
             * Creates a new EnumDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto instance
             */
            EnumDescriptorProto.create = function create(properties) {
                return new EnumDescriptorProto(properties);
            };

            /**
             * Encodes the specified EnumDescriptorProto.
             * @function
             * @param {google.protobuf.EnumDescriptorProto|Object} message EnumDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumDescriptorProto.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.name !== undefined && message.name !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.name)
                if (message.value)
                    for (var i = 0; i < message.value.length; ++i)
                    types[1].encode(message.value[i], writer.uint32(18/*= id 2, wireType 2 */).fork()).ldelim()
                if (message.options !== undefined && message.options !== null)
                    types[2].encode(message.options, writer.uint32(26/*= id 3, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, "google.protobuf.EnumValueDescriptorProto", "google.protobuf.EnumOptions"]); /* eslint-enable */

            /**
             * Encodes the specified EnumDescriptorProto, length delimited.
             * @param {google.protobuf.EnumDescriptorProto|Object} message EnumDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a EnumDescriptorProto from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto
             */
            EnumDescriptorProto.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.EnumDescriptorProto
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string()
                            break
                        case 2:
                            message.value && message.value.length || (message.value = [])
                            message.value.push(types[1].decode(reader, reader.uint32()))
                            break
                        case 3:
                            message.options = types[2].decode(reader, reader.uint32())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, "google.protobuf.EnumValueDescriptorProto", "google.protobuf.EnumOptions"]); /* eslint-enable */

            /**
             * Decodes a EnumDescriptorProto from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto
             */
            EnumDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a EnumDescriptorProto.
             * @function
             * @param {google.protobuf.EnumDescriptorProto|Object} message EnumDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            EnumDescriptorProto.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.name !== undefined) {
                    if (!util.isString(message.name))
                        return "invalid value for field .google.protobuf.EnumDescriptorProto.name (string expected)"
                }
                if (message.value !== undefined) {
                    if (!Array.isArray(message.value))
                        return "invalid value for field .google.protobuf.EnumDescriptorProto.value (array expected)"
                    for (var i = 0; i < message.value.length; ++i) {
                        var reason;
                        if (reason = types[1].verify(message.value[i]))
                            return reason
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var reason;
                    if (reason = types[2].verify(message.options))
                        return reason
                }
                return null
            }})($protobuf.util, [null, "google.protobuf.EnumValueDescriptorProto", "google.protobuf.EnumOptions"]); /* eslint-enable */

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

            /**
             * Creates a new EnumValueDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto instance
             */
            EnumValueDescriptorProto.create = function create(properties) {
                return new EnumValueDescriptorProto(properties);
            };

            /**
             * Encodes the specified EnumValueDescriptorProto.
             * @function
             * @param {google.protobuf.EnumValueDescriptorProto|Object} message EnumValueDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumValueDescriptorProto.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.name !== undefined && message.name !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.name)
                if (message.number !== undefined && message.number !== 0)
                    writer.uint32(16/*= id 2, wireType 0 */).int32(message.number)
                if (message.options !== undefined && message.options !== null)
                    types[2].encode(message.options, writer.uint32(26/*= id 3, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, "google.protobuf.EnumValueOptions"]); /* eslint-enable */

            /**
             * Encodes the specified EnumValueDescriptorProto, length delimited.
             * @param {google.protobuf.EnumValueDescriptorProto|Object} message EnumValueDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumValueDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a EnumValueDescriptorProto from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto
             */
            EnumValueDescriptorProto.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.EnumValueDescriptorProto
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string()
                            break
                        case 2:
                            message.number = reader.int32()
                            break
                        case 3:
                            message.options = types[2].decode(reader, reader.uint32())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, "google.protobuf.EnumValueOptions"]); /* eslint-enable */

            /**
             * Decodes a EnumValueDescriptorProto from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto
             */
            EnumValueDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a EnumValueDescriptorProto.
             * @function
             * @param {google.protobuf.EnumValueDescriptorProto|Object} message EnumValueDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            EnumValueDescriptorProto.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.name !== undefined) {
                    if (!util.isString(message.name))
                        return "invalid value for field .google.protobuf.EnumValueDescriptorProto.name (string expected)"
                }
                if (message.number !== undefined) {
                    if (!util.isInteger(message.number))
                        return "invalid value for field .google.protobuf.EnumValueDescriptorProto.number (integer expected)"
                }
                if (message.options !== undefined && message.options !== null) {
                    var reason;
                    if (reason = types[2].verify(message.options))
                        return reason
                }
                return null
            }})($protobuf.util, [null, null, "google.protobuf.EnumValueOptions"]); /* eslint-enable */

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

            /**
             * Creates a new ServiceDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto instance
             */
            ServiceDescriptorProto.create = function create(properties) {
                return new ServiceDescriptorProto(properties);
            };

            /**
             * Encodes the specified ServiceDescriptorProto.
             * @function
             * @param {google.protobuf.ServiceDescriptorProto|Object} message ServiceDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceDescriptorProto.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.name !== undefined && message.name !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.name)
                if (message.method)
                    for (var i = 0; i < message.method.length; ++i)
                    types[1].encode(message.method[i], writer.uint32(18/*= id 2, wireType 2 */).fork()).ldelim()
                if (message.options !== undefined && message.options !== null)
                    types[2].encode(message.options, writer.uint32(26/*= id 3, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, "google.protobuf.MethodDescriptorProto", "google.protobuf.ServiceOptions"]); /* eslint-enable */

            /**
             * Encodes the specified ServiceDescriptorProto, length delimited.
             * @param {google.protobuf.ServiceDescriptorProto|Object} message ServiceDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServiceDescriptorProto from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto
             */
            ServiceDescriptorProto.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.ServiceDescriptorProto
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string()
                            break
                        case 2:
                            message.method && message.method.length || (message.method = [])
                            message.method.push(types[1].decode(reader, reader.uint32()))
                            break
                        case 3:
                            message.options = types[2].decode(reader, reader.uint32())
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, "google.protobuf.MethodDescriptorProto", "google.protobuf.ServiceOptions"]); /* eslint-enable */

            /**
             * Decodes a ServiceDescriptorProto from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto
             */
            ServiceDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a ServiceDescriptorProto.
             * @function
             * @param {google.protobuf.ServiceDescriptorProto|Object} message ServiceDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            ServiceDescriptorProto.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.name !== undefined) {
                    if (!util.isString(message.name))
                        return "invalid value for field .google.protobuf.ServiceDescriptorProto.name (string expected)"
                }
                if (message.method !== undefined) {
                    if (!Array.isArray(message.method))
                        return "invalid value for field .google.protobuf.ServiceDescriptorProto.method (array expected)"
                    for (var i = 0; i < message.method.length; ++i) {
                        var reason;
                        if (reason = types[1].verify(message.method[i]))
                            return reason
                    }
                }
                if (message.options !== undefined && message.options !== null) {
                    var reason;
                    if (reason = types[2].verify(message.options))
                        return reason
                }
                return null
            }})($protobuf.util, [null, "google.protobuf.MethodDescriptorProto", "google.protobuf.ServiceOptions"]); /* eslint-enable */

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

            /**
             * Creates a new MethodDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto instance
             */
            MethodDescriptorProto.create = function create(properties) {
                return new MethodDescriptorProto(properties);
            };

            /**
             * Encodes the specified MethodDescriptorProto.
             * @function
             * @param {google.protobuf.MethodDescriptorProto|Object} message MethodDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MethodDescriptorProto.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.name !== undefined && message.name !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.name)
                if (message.inputType !== undefined && message.inputType !== "")
                    writer.uint32(18/*= id 2, wireType 2 */).string(message.inputType)
                if (message.outputType !== undefined && message.outputType !== "")
                    writer.uint32(26/*= id 3, wireType 2 */).string(message.outputType)
                if (message.options !== undefined && message.options !== null)
                    types[3].encode(message.options, writer.uint32(34/*= id 4, wireType 2 */).fork()).ldelim()
                if (message.clientStreaming !== undefined && message.clientStreaming !== false)
                    writer.uint32(40/*= id 5, wireType 0 */).bool(message.clientStreaming)
                if (message.serverStreaming !== undefined && message.serverStreaming !== false)
                    writer.uint32(48/*= id 6, wireType 0 */).bool(message.serverStreaming)
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, null, "google.protobuf.MethodOptions", null, null]); /* eslint-enable */

            /**
             * Encodes the specified MethodDescriptorProto, length delimited.
             * @param {google.protobuf.MethodDescriptorProto|Object} message MethodDescriptorProto or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MethodDescriptorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MethodDescriptorProto from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto
             */
            MethodDescriptorProto.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.MethodDescriptorProto
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string()
                            break
                        case 2:
                            message.inputType = reader.string()
                            break
                        case 3:
                            message.outputType = reader.string()
                            break
                        case 4:
                            message.options = types[3].decode(reader, reader.uint32())
                            break
                        case 5:
                            message.clientStreaming = reader.bool()
                            break
                        case 6:
                            message.serverStreaming = reader.bool()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, null, "google.protobuf.MethodOptions", null, null]); /* eslint-enable */

            /**
             * Decodes a MethodDescriptorProto from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto
             */
            MethodDescriptorProto.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a MethodDescriptorProto.
             * @function
             * @param {google.protobuf.MethodDescriptorProto|Object} message MethodDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MethodDescriptorProto.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.name !== undefined) {
                    if (!util.isString(message.name))
                        return "invalid value for field .google.protobuf.MethodDescriptorProto.name (string expected)"
                }
                if (message.inputType !== undefined) {
                    if (!util.isString(message.inputType))
                        return "invalid value for field .google.protobuf.MethodDescriptorProto.inputType (string expected)"
                }
                if (message.outputType !== undefined) {
                    if (!util.isString(message.outputType))
                        return "invalid value for field .google.protobuf.MethodDescriptorProto.outputType (string expected)"
                }
                if (message.options !== undefined && message.options !== null) {
                    var reason;
                    if (reason = types[3].verify(message.options))
                        return reason
                }
                if (message.clientStreaming !== undefined) {
                    if (typeof message.clientStreaming !== "boolean")
                        return "invalid value for field .google.protobuf.MethodDescriptorProto.clientStreaming (boolean expected)"
                }
                if (message.serverStreaming !== undefined) {
                    if (typeof message.serverStreaming !== "boolean")
                        return "invalid value for field .google.protobuf.MethodDescriptorProto.serverStreaming (boolean expected)"
                }
                return null
            }})($protobuf.util, [null, null, null, "google.protobuf.MethodOptions", null, null]); /* eslint-enable */

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
            $prototype.optimizeFor = "SPEED";

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

            /**
             * Creates a new FileOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FileOptions} FileOptions instance
             */
            FileOptions.create = function create(properties) {
                return new FileOptions(properties);
            };

            /**
             * Encodes the specified FileOptions.
             * @function
             * @param {google.protobuf.FileOptions|Object} message FileOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileOptions.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.javaPackage !== undefined && message.javaPackage !== "")
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.javaPackage)
                if (message.javaOuterClassname !== undefined && message.javaOuterClassname !== "")
                    writer.uint32(66/*= id 8, wireType 2 */).string(message.javaOuterClassname)
                if (message.javaMultipleFiles !== undefined && message.javaMultipleFiles !== false)
                    writer.uint32(80/*= id 10, wireType 0 */).bool(message.javaMultipleFiles)
                if (message.javaGenerateEqualsAndHash !== undefined && message.javaGenerateEqualsAndHash !== false)
                    writer.uint32(160/*= id 20, wireType 0 */).bool(message.javaGenerateEqualsAndHash)
                if (message.javaStringCheckUtf8 !== undefined && message.javaStringCheckUtf8 !== false)
                    writer.uint32(216/*= id 27, wireType 0 */).bool(message.javaStringCheckUtf8)
                if (message.optimizeFor !== undefined && message.optimizeFor !== "SPEED")
                    writer.uint32(72/*= id 9, wireType 0 */).uint32(message.optimizeFor)
                if (message.goPackage !== undefined && message.goPackage !== "")
                    writer.uint32(90/*= id 11, wireType 2 */).string(message.goPackage)
                if (message.ccGenericServices !== undefined && message.ccGenericServices !== false)
                    writer.uint32(128/*= id 16, wireType 0 */).bool(message.ccGenericServices)
                if (message.javaGenericServices !== undefined && message.javaGenericServices !== false)
                    writer.uint32(136/*= id 17, wireType 0 */).bool(message.javaGenericServices)
                if (message.pyGenericServices !== undefined && message.pyGenericServices !== false)
                    writer.uint32(144/*= id 18, wireType 0 */).bool(message.pyGenericServices)
                if (message.deprecated !== undefined && message.deprecated !== false)
                    writer.uint32(184/*= id 23, wireType 0 */).bool(message.deprecated)
                if (message.ccEnableArenas !== undefined && message.ccEnableArenas !== false)
                    writer.uint32(248/*= id 31, wireType 0 */).bool(message.ccEnableArenas)
                if (message.objcClassPrefix !== undefined && message.objcClassPrefix !== "")
                    writer.uint32(290/*= id 36, wireType 2 */).string(message.objcClassPrefix)
                if (message.csharpNamespace !== undefined && message.csharpNamespace !== "")
                    writer.uint32(298/*= id 37, wireType 2 */).string(message.csharpNamespace)
                if (message.uninterpretedOption)
                    for (var i = 0; i < message.uninterpretedOption.length; ++i)
                    types[14].encode(message.uninterpretedOption[i], writer.uint32(7994/*= id 999, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, null, null, null, "google.protobuf.FileOptions.OptimizeMode", null, null, null, null, null, null, null, null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Encodes the specified FileOptions, length delimited.
             * @param {google.protobuf.FileOptions|Object} message FileOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FileOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FileOptions from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileOptions} FileOptions
             */
            FileOptions.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.FileOptions
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.javaPackage = reader.string()
                            break
                        case 8:
                            message.javaOuterClassname = reader.string()
                            break
                        case 10:
                            message.javaMultipleFiles = reader.bool()
                            break
                        case 20:
                            message.javaGenerateEqualsAndHash = reader.bool()
                            break
                        case 27:
                            message.javaStringCheckUtf8 = reader.bool()
                            break
                        case 9:
                            message.optimizeFor = reader.uint32()
                            break
                        case 11:
                            message.goPackage = reader.string()
                            break
                        case 16:
                            message.ccGenericServices = reader.bool()
                            break
                        case 17:
                            message.javaGenericServices = reader.bool()
                            break
                        case 18:
                            message.pyGenericServices = reader.bool()
                            break
                        case 23:
                            message.deprecated = reader.bool()
                            break
                        case 31:
                            message.ccEnableArenas = reader.bool()
                            break
                        case 36:
                            message.objcClassPrefix = reader.string()
                            break
                        case 37:
                            message.csharpNamespace = reader.string()
                            break
                        case 999:
                            message.uninterpretedOption && message.uninterpretedOption.length || (message.uninterpretedOption = [])
                            message.uninterpretedOption.push(types[14].decode(reader, reader.uint32()))
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, null, null, null, "google.protobuf.FileOptions.OptimizeMode", null, null, null, null, null, null, null, null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Decodes a FileOptions from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FileOptions} FileOptions
             */
            FileOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FileOptions.
             * @function
             * @param {google.protobuf.FileOptions|Object} message FileOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FileOptions.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.javaPackage !== undefined) {
                    if (!util.isString(message.javaPackage))
                        return "invalid value for field .google.protobuf.FileOptions.javaPackage (string expected)"
                }
                if (message.javaOuterClassname !== undefined) {
                    if (!util.isString(message.javaOuterClassname))
                        return "invalid value for field .google.protobuf.FileOptions.javaOuterClassname (string expected)"
                }
                if (message.javaMultipleFiles !== undefined) {
                    if (typeof message.javaMultipleFiles !== "boolean")
                        return "invalid value for field .google.protobuf.FileOptions.javaMultipleFiles (boolean expected)"
                }
                if (message.javaGenerateEqualsAndHash !== undefined) {
                    if (typeof message.javaGenerateEqualsAndHash !== "boolean")
                        return "invalid value for field .google.protobuf.FileOptions.javaGenerateEqualsAndHash (boolean expected)"
                }
                if (message.javaStringCheckUtf8 !== undefined) {
                    if (typeof message.javaStringCheckUtf8 !== "boolean")
                        return "invalid value for field .google.protobuf.FileOptions.javaStringCheckUtf8 (boolean expected)"
                }
                if (message.optimizeFor !== undefined) {
                    switch (message.optimizeFor) {
                        default:
                            return "invalid value for field .google.protobuf.FileOptions.optimizeFor (enum value expected)"
                        case 1:
                        case 2:
                        case 3:
                            break
                    }
                }
                if (message.goPackage !== undefined) {
                    if (!util.isString(message.goPackage))
                        return "invalid value for field .google.protobuf.FileOptions.goPackage (string expected)"
                }
                if (message.ccGenericServices !== undefined) {
                    if (typeof message.ccGenericServices !== "boolean")
                        return "invalid value for field .google.protobuf.FileOptions.ccGenericServices (boolean expected)"
                }
                if (message.javaGenericServices !== undefined) {
                    if (typeof message.javaGenericServices !== "boolean")
                        return "invalid value for field .google.protobuf.FileOptions.javaGenericServices (boolean expected)"
                }
                if (message.pyGenericServices !== undefined) {
                    if (typeof message.pyGenericServices !== "boolean")
                        return "invalid value for field .google.protobuf.FileOptions.pyGenericServices (boolean expected)"
                }
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean")
                        return "invalid value for field .google.protobuf.FileOptions.deprecated (boolean expected)"
                }
                if (message.ccEnableArenas !== undefined) {
                    if (typeof message.ccEnableArenas !== "boolean")
                        return "invalid value for field .google.protobuf.FileOptions.ccEnableArenas (boolean expected)"
                }
                if (message.objcClassPrefix !== undefined) {
                    if (!util.isString(message.objcClassPrefix))
                        return "invalid value for field .google.protobuf.FileOptions.objcClassPrefix (string expected)"
                }
                if (message.csharpNamespace !== undefined) {
                    if (!util.isString(message.csharpNamespace))
                        return "invalid value for field .google.protobuf.FileOptions.csharpNamespace (string expected)"
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption))
                        return "invalid value for field .google.protobuf.FileOptions.uninterpretedOption (array expected)"
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var reason;
                        if (reason = types[14].verify(message.uninterpretedOption[i]))
                            return reason
                    }
                }
                return null
            }})($protobuf.util, [null, null, null, null, null, "google.protobuf.FileOptions.OptimizeMode", null, null, null, null, null, null, null, null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * OptimizeMode values.
             * @exports google.protobuf.FileOptions.OptimizeMode
             * @type {Object.<string,number>}
             */
            FileOptions.OptimizeMode = {

                SPEED: 1,
                CODE_SIZE: 2,
                LITE_RUNTIME: 3
            };

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

            /**
             * Creates a new MessageOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.MessageOptions} MessageOptions instance
             */
            MessageOptions.create = function create(properties) {
                return new MessageOptions(properties);
            };

            /**
             * Encodes the specified MessageOptions.
             * @function
             * @param {google.protobuf.MessageOptions|Object} message MessageOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MessageOptions.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.messageSetWireFormat !== undefined && message.messageSetWireFormat !== false)
                    writer.uint32(8/*= id 1, wireType 0 */).bool(message.messageSetWireFormat)
                if (message.noStandardDescriptorAccessor !== undefined && message.noStandardDescriptorAccessor !== false)
                    writer.uint32(16/*= id 2, wireType 0 */).bool(message.noStandardDescriptorAccessor)
                if (message.deprecated !== undefined && message.deprecated !== false)
                    writer.uint32(24/*= id 3, wireType 0 */).bool(message.deprecated)
                if (message.mapEntry !== undefined && message.mapEntry !== false)
                    writer.uint32(56/*= id 7, wireType 0 */).bool(message.mapEntry)
                if (message.uninterpretedOption)
                    for (var i = 0; i < message.uninterpretedOption.length; ++i)
                    types[4].encode(message.uninterpretedOption[i], writer.uint32(7994/*= id 999, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, null, null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Encodes the specified MessageOptions, length delimited.
             * @param {google.protobuf.MessageOptions|Object} message MessageOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MessageOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MessageOptions from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MessageOptions} MessageOptions
             */
            MessageOptions.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.MessageOptions
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.messageSetWireFormat = reader.bool()
                            break
                        case 2:
                            message.noStandardDescriptorAccessor = reader.bool()
                            break
                        case 3:
                            message.deprecated = reader.bool()
                            break
                        case 7:
                            message.mapEntry = reader.bool()
                            break
                        case 999:
                            message.uninterpretedOption && message.uninterpretedOption.length || (message.uninterpretedOption = [])
                            message.uninterpretedOption.push(types[4].decode(reader, reader.uint32()))
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, null, null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Decodes a MessageOptions from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.MessageOptions} MessageOptions
             */
            MessageOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a MessageOptions.
             * @function
             * @param {google.protobuf.MessageOptions|Object} message MessageOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MessageOptions.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.messageSetWireFormat !== undefined) {
                    if (typeof message.messageSetWireFormat !== "boolean")
                        return "invalid value for field .google.protobuf.MessageOptions.messageSetWireFormat (boolean expected)"
                }
                if (message.noStandardDescriptorAccessor !== undefined) {
                    if (typeof message.noStandardDescriptorAccessor !== "boolean")
                        return "invalid value for field .google.protobuf.MessageOptions.noStandardDescriptorAccessor (boolean expected)"
                }
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean")
                        return "invalid value for field .google.protobuf.MessageOptions.deprecated (boolean expected)"
                }
                if (message.mapEntry !== undefined) {
                    if (typeof message.mapEntry !== "boolean")
                        return "invalid value for field .google.protobuf.MessageOptions.mapEntry (boolean expected)"
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption))
                        return "invalid value for field .google.protobuf.MessageOptions.uninterpretedOption (array expected)"
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var reason;
                        if (reason = types[4].verify(message.uninterpretedOption[i]))
                            return reason
                    }
                }
                return null
            }})($protobuf.util, [null, null, null, null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

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
            $prototype.ctype = "STRING";

            /**
             * FieldOptions packed.
             * @type {boolean}
             */
            $prototype.packed = false;

            /**
             * FieldOptions jstype.
             * @type {number}
             */
            $prototype.jstype = "JS_NORMAL";

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

            /**
             * Creates a new FieldOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FieldOptions} FieldOptions instance
             */
            FieldOptions.create = function create(properties) {
                return new FieldOptions(properties);
            };

            /**
             * Encodes the specified FieldOptions.
             * @function
             * @param {google.protobuf.FieldOptions|Object} message FieldOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FieldOptions.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.ctype !== undefined && message.ctype !== "STRING")
                    writer.uint32(8/*= id 1, wireType 0 */).uint32(message.ctype)
                if (message.packed !== undefined && message.packed !== false)
                    writer.uint32(16/*= id 2, wireType 0 */).bool(message.packed)
                if (message.jstype !== undefined && message.jstype !== "JS_NORMAL")
                    writer.uint32(48/*= id 6, wireType 0 */).uint32(message.jstype)
                if (message.lazy !== undefined && message.lazy !== false)
                    writer.uint32(40/*= id 5, wireType 0 */).bool(message.lazy)
                if (message.deprecated !== undefined && message.deprecated !== false)
                    writer.uint32(24/*= id 3, wireType 0 */).bool(message.deprecated)
                if (message.weak !== undefined && message.weak !== false)
                    writer.uint32(80/*= id 10, wireType 0 */).bool(message.weak)
                if (message.uninterpretedOption)
                    for (var i = 0; i < message.uninterpretedOption.length; ++i)
                    types[6].encode(message.uninterpretedOption[i], writer.uint32(7994/*= id 999, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, ["google.protobuf.FieldOptions.CType", null, "google.protobuf.FieldOptions.JSType", null, null, null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Encodes the specified FieldOptions, length delimited.
             * @param {google.protobuf.FieldOptions|Object} message FieldOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FieldOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FieldOptions from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FieldOptions} FieldOptions
             */
            FieldOptions.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.FieldOptions
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.ctype = reader.uint32()
                            break
                        case 2:
                            message.packed = reader.bool()
                            break
                        case 6:
                            message.jstype = reader.uint32()
                            break
                        case 5:
                            message.lazy = reader.bool()
                            break
                        case 3:
                            message.deprecated = reader.bool()
                            break
                        case 10:
                            message.weak = reader.bool()
                            break
                        case 999:
                            message.uninterpretedOption && message.uninterpretedOption.length || (message.uninterpretedOption = [])
                            message.uninterpretedOption.push(types[6].decode(reader, reader.uint32()))
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, ["google.protobuf.FieldOptions.CType", null, "google.protobuf.FieldOptions.JSType", null, null, null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Decodes a FieldOptions from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FieldOptions} FieldOptions
             */
            FieldOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a FieldOptions.
             * @function
             * @param {google.protobuf.FieldOptions|Object} message FieldOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            FieldOptions.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.ctype !== undefined) {
                    switch (message.ctype) {
                        default:
                            return "invalid value for field .google.protobuf.FieldOptions.ctype (enum value expected)"
                        case 0:
                        case 1:
                        case 2:
                            break
                    }
                }
                if (message.packed !== undefined) {
                    if (typeof message.packed !== "boolean")
                        return "invalid value for field .google.protobuf.FieldOptions.packed (boolean expected)"
                }
                if (message.jstype !== undefined) {
                    switch (message.jstype) {
                        default:
                            return "invalid value for field .google.protobuf.FieldOptions.jstype (enum value expected)"
                        case 0:
                        case 1:
                        case 2:
                            break
                    }
                }
                if (message.lazy !== undefined) {
                    if (typeof message.lazy !== "boolean")
                        return "invalid value for field .google.protobuf.FieldOptions.lazy (boolean expected)"
                }
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean")
                        return "invalid value for field .google.protobuf.FieldOptions.deprecated (boolean expected)"
                }
                if (message.weak !== undefined) {
                    if (typeof message.weak !== "boolean")
                        return "invalid value for field .google.protobuf.FieldOptions.weak (boolean expected)"
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption))
                        return "invalid value for field .google.protobuf.FieldOptions.uninterpretedOption (array expected)"
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var reason;
                        if (reason = types[6].verify(message.uninterpretedOption[i]))
                            return reason
                    }
                }
                return null
            }})($protobuf.util, ["google.protobuf.FieldOptions.CType", null, "google.protobuf.FieldOptions.JSType", null, null, null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * CType values.
             * @exports google.protobuf.FieldOptions.CType
             * @type {Object.<string,number>}
             */
            FieldOptions.CType = {

                STRING: 0,
                CORD: 1,
                STRING_PIECE: 2
            };

            /**
             * JSType values.
             * @exports google.protobuf.FieldOptions.JSType
             * @type {Object.<string,number>}
             */
            FieldOptions.JSType = {

                JS_NORMAL: 0,
                JS_STRING: 1,
                JS_NUMBER: 2
            };

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

            /**
             * Creates a new OneofOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.OneofOptions} OneofOptions instance
             */
            OneofOptions.create = function create(properties) {
                return new OneofOptions(properties);
            };

            /**
             * Encodes the specified OneofOptions.
             * @function
             * @param {google.protobuf.OneofOptions|Object} message OneofOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneofOptions.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.uninterpretedOption)
                    for (var i = 0; i < message.uninterpretedOption.length; ++i)
                    types[0].encode(message.uninterpretedOption[i], writer.uint32(7994/*= id 999, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, ["google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Encodes the specified OneofOptions, length delimited.
             * @param {google.protobuf.OneofOptions|Object} message OneofOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OneofOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a OneofOptions from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.OneofOptions} OneofOptions
             */
            OneofOptions.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.OneofOptions
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 999:
                            message.uninterpretedOption && message.uninterpretedOption.length || (message.uninterpretedOption = [])
                            message.uninterpretedOption.push(types[0].decode(reader, reader.uint32()))
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, ["google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Decodes a OneofOptions from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.OneofOptions} OneofOptions
             */
            OneofOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a OneofOptions.
             * @function
             * @param {google.protobuf.OneofOptions|Object} message OneofOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            OneofOptions.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption))
                        return "invalid value for field .google.protobuf.OneofOptions.uninterpretedOption (array expected)"
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var reason;
                        if (reason = types[0].verify(message.uninterpretedOption[i]))
                            return reason
                    }
                }
                return null
            }})($protobuf.util, ["google.protobuf.UninterpretedOption"]); /* eslint-enable */

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

            /**
             * Creates a new EnumOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumOptions} EnumOptions instance
             */
            EnumOptions.create = function create(properties) {
                return new EnumOptions(properties);
            };

            /**
             * Encodes the specified EnumOptions.
             * @function
             * @param {google.protobuf.EnumOptions|Object} message EnumOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumOptions.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.allowAlias !== undefined && message.allowAlias !== false)
                    writer.uint32(16/*= id 2, wireType 0 */).bool(message.allowAlias)
                if (message.deprecated !== undefined && message.deprecated !== false)
                    writer.uint32(24/*= id 3, wireType 0 */).bool(message.deprecated)
                if (message.uninterpretedOption)
                    for (var i = 0; i < message.uninterpretedOption.length; ++i)
                    types[2].encode(message.uninterpretedOption[i], writer.uint32(7994/*= id 999, wireType 2 */).fork()).ldelim()
                if (message[".jspb.test.IsExtension.simpleOption"] !== undefined && message[".jspb.test.IsExtension.simpleOption"] !== "")
                    writer.uint32(336904306/*= id 42113038, wireType 2 */).string(message[".jspb.test.IsExtension.simpleOption"])
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, null, "google.protobuf.UninterpretedOption", null]); /* eslint-enable */

            /**
             * Encodes the specified EnumOptions, length delimited.
             * @param {google.protobuf.EnumOptions|Object} message EnumOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a EnumOptions from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumOptions} EnumOptions
             */
            EnumOptions.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.EnumOptions
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 2:
                            message.allowAlias = reader.bool()
                            break
                        case 3:
                            message.deprecated = reader.bool()
                            break
                        case 999:
                            message.uninterpretedOption && message.uninterpretedOption.length || (message.uninterpretedOption = [])
                            message.uninterpretedOption.push(types[2].decode(reader, reader.uint32()))
                            break
                        case 42113038:
                            message[".jspb.test.IsExtension.simpleOption"] = reader.string()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, null, "google.protobuf.UninterpretedOption", null]); /* eslint-enable */

            /**
             * Decodes a EnumOptions from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumOptions} EnumOptions
             */
            EnumOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a EnumOptions.
             * @function
             * @param {google.protobuf.EnumOptions|Object} message EnumOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            EnumOptions.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.allowAlias !== undefined) {
                    if (typeof message.allowAlias !== "boolean")
                        return "invalid value for field .google.protobuf.EnumOptions.allowAlias (boolean expected)"
                }
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean")
                        return "invalid value for field .google.protobuf.EnumOptions.deprecated (boolean expected)"
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption))
                        return "invalid value for field .google.protobuf.EnumOptions.uninterpretedOption (array expected)"
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var reason;
                        if (reason = types[2].verify(message.uninterpretedOption[i]))
                            return reason
                    }
                }
                if (message[".jspb.test.IsExtension.simpleOption"] !== undefined) {
                    if (!util.isString(message[".jspb.test.IsExtension.simpleOption"]))
                        return "invalid value for field .google.protobuf.EnumOptions..jspb.test.IsExtension.simpleOption (string expected)"
                }
                return null
            }})($protobuf.util, [null, null, "google.protobuf.UninterpretedOption", null]); /* eslint-enable */

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

            /**
             * Creates a new EnumValueOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions instance
             */
            EnumValueOptions.create = function create(properties) {
                return new EnumValueOptions(properties);
            };

            /**
             * Encodes the specified EnumValueOptions.
             * @function
             * @param {google.protobuf.EnumValueOptions|Object} message EnumValueOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumValueOptions.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.deprecated !== undefined && message.deprecated !== false)
                    writer.uint32(8/*= id 1, wireType 0 */).bool(message.deprecated)
                if (message.uninterpretedOption)
                    for (var i = 0; i < message.uninterpretedOption.length; ++i)
                    types[1].encode(message.uninterpretedOption[i], writer.uint32(7994/*= id 999, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Encodes the specified EnumValueOptions, length delimited.
             * @param {google.protobuf.EnumValueOptions|Object} message EnumValueOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EnumValueOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a EnumValueOptions from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions
             */
            EnumValueOptions.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.EnumValueOptions
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.deprecated = reader.bool()
                            break
                        case 999:
                            message.uninterpretedOption && message.uninterpretedOption.length || (message.uninterpretedOption = [])
                            message.uninterpretedOption.push(types[1].decode(reader, reader.uint32()))
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Decodes a EnumValueOptions from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions
             */
            EnumValueOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a EnumValueOptions.
             * @function
             * @param {google.protobuf.EnumValueOptions|Object} message EnumValueOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            EnumValueOptions.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean")
                        return "invalid value for field .google.protobuf.EnumValueOptions.deprecated (boolean expected)"
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption))
                        return "invalid value for field .google.protobuf.EnumValueOptions.uninterpretedOption (array expected)"
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var reason;
                        if (reason = types[1].verify(message.uninterpretedOption[i]))
                            return reason
                    }
                }
                return null
            }})($protobuf.util, [null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

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

            /**
             * Creates a new ServiceOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.ServiceOptions} ServiceOptions instance
             */
            ServiceOptions.create = function create(properties) {
                return new ServiceOptions(properties);
            };

            /**
             * Encodes the specified ServiceOptions.
             * @function
             * @param {google.protobuf.ServiceOptions|Object} message ServiceOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceOptions.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.deprecated !== undefined && message.deprecated !== false)
                    writer.uint32(264/*= id 33, wireType 0 */).bool(message.deprecated)
                if (message.uninterpretedOption)
                    for (var i = 0; i < message.uninterpretedOption.length; ++i)
                    types[1].encode(message.uninterpretedOption[i], writer.uint32(7994/*= id 999, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Encodes the specified ServiceOptions, length delimited.
             * @param {google.protobuf.ServiceOptions|Object} message ServiceOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ServiceOptions from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.ServiceOptions} ServiceOptions
             */
            ServiceOptions.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.ServiceOptions
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 33:
                            message.deprecated = reader.bool()
                            break
                        case 999:
                            message.uninterpretedOption && message.uninterpretedOption.length || (message.uninterpretedOption = [])
                            message.uninterpretedOption.push(types[1].decode(reader, reader.uint32()))
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Decodes a ServiceOptions from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.ServiceOptions} ServiceOptions
             */
            ServiceOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a ServiceOptions.
             * @function
             * @param {google.protobuf.ServiceOptions|Object} message ServiceOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            ServiceOptions.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean")
                        return "invalid value for field .google.protobuf.ServiceOptions.deprecated (boolean expected)"
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption))
                        return "invalid value for field .google.protobuf.ServiceOptions.uninterpretedOption (array expected)"
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var reason;
                        if (reason = types[1].verify(message.uninterpretedOption[i]))
                            return reason
                    }
                }
                return null
            }})($protobuf.util, [null, "google.protobuf.UninterpretedOption"]); /* eslint-enable */

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
            $prototype.idempotencyLevel = "IDEMPOTENCY_UNKNOWN";

            /**
             * MethodOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            $prototype.uninterpretedOption = $protobuf.util.emptyArray;

            /**
             * Creates a new MethodOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.MethodOptions} MethodOptions instance
             */
            MethodOptions.create = function create(properties) {
                return new MethodOptions(properties);
            };

            /**
             * Encodes the specified MethodOptions.
             * @function
             * @param {google.protobuf.MethodOptions|Object} message MethodOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MethodOptions.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.deprecated !== undefined && message.deprecated !== false)
                    writer.uint32(264/*= id 33, wireType 0 */).bool(message.deprecated)
                if (message.idempotencyLevel !== undefined && message.idempotencyLevel !== "IDEMPOTENCY_UNKNOWN")
                    writer.uint32(272/*= id 34, wireType 0 */).uint32(message.idempotencyLevel)
                if (message.uninterpretedOption)
                    for (var i = 0; i < message.uninterpretedOption.length; ++i)
                    types[2].encode(message.uninterpretedOption[i], writer.uint32(7994/*= id 999, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, [null, "google.protobuf.MethodOptions.IdempotencyLevel", "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Encodes the specified MethodOptions, length delimited.
             * @param {google.protobuf.MethodOptions|Object} message MethodOptions or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MethodOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MethodOptions from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MethodOptions} MethodOptions
             */
            MethodOptions.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.MethodOptions
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 33:
                            message.deprecated = reader.bool()
                            break
                        case 34:
                            message.idempotencyLevel = reader.uint32()
                            break
                        case 999:
                            message.uninterpretedOption && message.uninterpretedOption.length || (message.uninterpretedOption = [])
                            message.uninterpretedOption.push(types[2].decode(reader, reader.uint32()))
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, [null, "google.protobuf.MethodOptions.IdempotencyLevel", "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * Decodes a MethodOptions from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.MethodOptions} MethodOptions
             */
            MethodOptions.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a MethodOptions.
             * @function
             * @param {google.protobuf.MethodOptions|Object} message MethodOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MethodOptions.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.deprecated !== undefined) {
                    if (typeof message.deprecated !== "boolean")
                        return "invalid value for field .google.protobuf.MethodOptions.deprecated (boolean expected)"
                }
                if (message.idempotencyLevel !== undefined) {
                    switch (message.idempotencyLevel) {
                        default:
                            return "invalid value for field .google.protobuf.MethodOptions.idempotencyLevel (enum value expected)"
                        case 0:
                        case 1:
                        case 2:
                            break
                    }
                }
                if (message.uninterpretedOption !== undefined) {
                    if (!Array.isArray(message.uninterpretedOption))
                        return "invalid value for field .google.protobuf.MethodOptions.uninterpretedOption (array expected)"
                    for (var i = 0; i < message.uninterpretedOption.length; ++i) {
                        var reason;
                        if (reason = types[2].verify(message.uninterpretedOption[i]))
                            return reason
                    }
                }
                return null
            }})($protobuf.util, [null, "google.protobuf.MethodOptions.IdempotencyLevel", "google.protobuf.UninterpretedOption"]); /* eslint-enable */

            /**
             * IdempotencyLevel values.
             * @exports google.protobuf.MethodOptions.IdempotencyLevel
             * @type {Object.<string,number>}
             */
            MethodOptions.IdempotencyLevel = {

                IDEMPOTENCY_UNKNOWN: 0,
                NO_SIDE_EFFECTS: 1,
                IDEMPOTENT: 2
            };

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

            /**
             * Creates a new UninterpretedOption instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption instance
             */
            UninterpretedOption.create = function create(properties) {
                return new UninterpretedOption(properties);
            };

            /**
             * Encodes the specified UninterpretedOption.
             * @function
             * @param {google.protobuf.UninterpretedOption|Object} message UninterpretedOption or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UninterpretedOption.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.name)
                    for (var i = 0; i < message.name.length; ++i)
                    types[0].encode(message.name[i], writer.uint32(18/*= id 2, wireType 2 */).fork()).ldelim()
                if (message.identifierValue !== undefined && message.identifierValue !== "")
                    writer.uint32(26/*= id 3, wireType 2 */).string(message.identifierValue)
                if (message.positiveIntValue !== undefined && message.positiveIntValue !== null && util.longNe(message.positiveIntValue, 0, 0))
                    writer.uint32(32/*= id 4, wireType 0 */).uint64(message.positiveIntValue)
                if (message.negativeIntValue !== undefined && message.negativeIntValue !== null && util.longNe(message.negativeIntValue, 0, 0))
                    writer.uint32(40/*= id 5, wireType 0 */).int64(message.negativeIntValue)
                if (message.doubleValue !== undefined && message.doubleValue !== 0)
                    writer.uint32(49/*= id 6, wireType 1 */).double(message.doubleValue)
                if (message.stringValue !== undefined && message.stringValue !== [])
                    writer.uint32(58/*= id 7, wireType 2 */).bytes(message.stringValue)
                if (message.aggregateValue !== undefined && message.aggregateValue !== "")
                    writer.uint32(66/*= id 8, wireType 2 */).string(message.aggregateValue)
                return writer
            }})($protobuf.Writer, $protobuf.util, ["google.protobuf.UninterpretedOption.NamePart", null, null, null, null, null, null]); /* eslint-enable */

            /**
             * Encodes the specified UninterpretedOption, length delimited.
             * @param {google.protobuf.UninterpretedOption|Object} message UninterpretedOption or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UninterpretedOption.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a UninterpretedOption from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption
             */
            UninterpretedOption.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.UninterpretedOption
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 2:
                            message.name && message.name.length || (message.name = [])
                            message.name.push(types[0].decode(reader, reader.uint32()))
                            break
                        case 3:
                            message.identifierValue = reader.string()
                            break
                        case 4:
                            message.positiveIntValue = reader.uint64()
                            break
                        case 5:
                            message.negativeIntValue = reader.int64()
                            break
                        case 6:
                            message.doubleValue = reader.double()
                            break
                        case 7:
                            message.stringValue = reader.bytes()
                            break
                        case 8:
                            message.aggregateValue = reader.string()
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, ["google.protobuf.UninterpretedOption.NamePart", null, null, null, null, null, null]); /* eslint-enable */

            /**
             * Decodes a UninterpretedOption from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption
             */
            UninterpretedOption.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a UninterpretedOption.
             * @function
             * @param {google.protobuf.UninterpretedOption|Object} message UninterpretedOption or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            UninterpretedOption.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.name !== undefined) {
                    if (!Array.isArray(message.name))
                        return "invalid value for field .google.protobuf.UninterpretedOption.name (array expected)"
                    for (var i = 0; i < message.name.length; ++i) {
                        var reason;
                        if (reason = types[0].verify(message.name[i]))
                            return reason
                    }
                }
                if (message.identifierValue !== undefined) {
                    if (!util.isString(message.identifierValue))
                        return "invalid value for field .google.protobuf.UninterpretedOption.identifierValue (string expected)"
                }
                if (message.positiveIntValue !== undefined) {
                    if (!util.isInteger(message.positiveIntValue) && !(message.positiveIntValue && util.isInteger(message.positiveIntValue.low) && util.isInteger(message.positiveIntValue.high)))
                        return "invalid value for field .google.protobuf.UninterpretedOption.positiveIntValue (integer | Long expected)"
                }
                if (message.negativeIntValue !== undefined) {
                    if (!util.isInteger(message.negativeIntValue) && !(message.negativeIntValue && util.isInteger(message.negativeIntValue.low) && util.isInteger(message.negativeIntValue.high)))
                        return "invalid value for field .google.protobuf.UninterpretedOption.negativeIntValue (integer | Long expected)"
                }
                if (message.doubleValue !== undefined) {
                    if (typeof message.doubleValue !== "number")
                        return "invalid value for field .google.protobuf.UninterpretedOption.doubleValue (number expected)"
                }
                if (message.stringValue !== undefined) {
                    if (!(message.stringValue && typeof message.stringValue.length === "number" || util.isString(message.stringValue)))
                        return "invalid value for field .google.protobuf.UninterpretedOption.stringValue (buffer expected)"
                }
                if (message.aggregateValue !== undefined) {
                    if (!util.isString(message.aggregateValue))
                        return "invalid value for field .google.protobuf.UninterpretedOption.aggregateValue (string expected)"
                }
                return null
            }})($protobuf.util, ["google.protobuf.UninterpretedOption.NamePart", null, null, null, null, null, null]); /* eslint-enable */

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
                 * Encodes the specified NamePart.
                 * @function
                 * @param {google.protobuf.UninterpretedOption.NamePart|Object} message NamePart or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NamePart.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                    writer || (writer = Writer.create())
                    writer.uint32(10/*= id 1, wireType 2 */).string(message.namePart)
                    writer.uint32(16/*= id 2, wireType 0 */).bool(message.isExtension)
                    return writer
                }})($protobuf.Writer, $protobuf.util, [null, null]); /* eslint-enable */

                /**
                 * Encodes the specified NamePart, length delimited.
                 * @param {google.protobuf.UninterpretedOption.NamePart|Object} message NamePart or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NamePart.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a NamePart from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart
                 */
                NamePart.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                    reader instanceof Reader || (reader = Reader.create(reader))
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.UninterpretedOption.NamePart
                    while (reader.pos < end) {
                        var tag = reader.uint32()
                        switch (tag >>> 3) {
                            case 1:
                                message.namePart = reader.string()
                                break
                            case 2:
                                message.isExtension = reader.bool()
                                break
                            default:
                                reader.skipType(tag & 7)
                                break
                        }
                    }
                    return message
                }})($protobuf.Reader, $protobuf.util, [null, null]); /* eslint-enable */

                /**
                 * Decodes a NamePart from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart
                 */
                NamePart.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a NamePart.
                 * @function
                 * @param {google.protobuf.UninterpretedOption.NamePart|Object} message NamePart or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                NamePart.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                    if (!util.isString(message.namePart))
                        return "invalid value for field .google.protobuf.UninterpretedOption.NamePart.namePart (string expected)"
                    if (typeof message.isExtension !== "boolean")
                        return "invalid value for field .google.protobuf.UninterpretedOption.NamePart.isExtension (boolean expected)"
                    return null
                }})($protobuf.util, [null, null]); /* eslint-enable */

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

            /**
             * Creates a new SourceCodeInfo instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo instance
             */
            SourceCodeInfo.create = function create(properties) {
                return new SourceCodeInfo(properties);
            };

            /**
             * Encodes the specified SourceCodeInfo.
             * @function
             * @param {google.protobuf.SourceCodeInfo|Object} message SourceCodeInfo or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SourceCodeInfo.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.location)
                    for (var i = 0; i < message.location.length; ++i)
                    types[0].encode(message.location[i], writer.uint32(10/*= id 1, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, ["google.protobuf.SourceCodeInfo.Location"]); /* eslint-enable */

            /**
             * Encodes the specified SourceCodeInfo, length delimited.
             * @param {google.protobuf.SourceCodeInfo|Object} message SourceCodeInfo or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SourceCodeInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SourceCodeInfo from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo
             */
            SourceCodeInfo.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.SourceCodeInfo
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.location && message.location.length || (message.location = [])
                            message.location.push(types[0].decode(reader, reader.uint32()))
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, ["google.protobuf.SourceCodeInfo.Location"]); /* eslint-enable */

            /**
             * Decodes a SourceCodeInfo from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo
             */
            SourceCodeInfo.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a SourceCodeInfo.
             * @function
             * @param {google.protobuf.SourceCodeInfo|Object} message SourceCodeInfo or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            SourceCodeInfo.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.location !== undefined) {
                    if (!Array.isArray(message.location))
                        return "invalid value for field .google.protobuf.SourceCodeInfo.location (array expected)"
                    for (var i = 0; i < message.location.length; ++i) {
                        var reason;
                        if (reason = types[0].verify(message.location[i]))
                            return reason
                    }
                }
                return null
            }})($protobuf.util, ["google.protobuf.SourceCodeInfo.Location"]); /* eslint-enable */

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
                 * Encodes the specified Location.
                 * @function
                 * @param {google.protobuf.SourceCodeInfo.Location|Object} message Location or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Location.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                    writer || (writer = Writer.create())
                    if (message.path && message.path.length) {
                        writer.uint32(10/*= id 1, wireType 2 */).fork()
                        for (var i = 0; i < message.path.length; ++i)
                            writer.int32(message.path[i])
                        writer.ldelim()
                    }
                    if (message.span && message.span.length) {
                        writer.uint32(18/*= id 2, wireType 2 */).fork()
                        for (var i = 0; i < message.span.length; ++i)
                            writer.int32(message.span[i])
                        writer.ldelim()
                    }
                    if (message.leadingComments !== undefined && message.leadingComments !== "")
                        writer.uint32(26/*= id 3, wireType 2 */).string(message.leadingComments)
                    if (message.trailingComments !== undefined && message.trailingComments !== "")
                        writer.uint32(34/*= id 4, wireType 2 */).string(message.trailingComments)
                    if (message.leadingDetachedComments)
                        for (var i = 0; i < message.leadingDetachedComments.length; ++i)
                        writer.uint32(50/*= id 6, wireType 2 */).string(message.leadingDetachedComments[i])
                    return writer
                }})($protobuf.Writer, $protobuf.util, [null, null, null, null, null]); /* eslint-enable */

                /**
                 * Encodes the specified Location, length delimited.
                 * @param {google.protobuf.SourceCodeInfo.Location|Object} message Location or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Location.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Location from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location
                 */
                Location.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                    reader instanceof Reader || (reader = Reader.create(reader))
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.SourceCodeInfo.Location
                    while (reader.pos < end) {
                        var tag = reader.uint32()
                        switch (tag >>> 3) {
                            case 1:
                                message.path && message.path.length || (message.path = [])
                                if ((tag & 7) === 2) {
                                    var e = reader.uint32()+reader.pos
                                    while (reader.pos < e)
                                        message.path.push(reader.int32())
                                }else
                                    message.path.push(reader.int32())
                                break
                            case 2:
                                message.span && message.span.length || (message.span = [])
                                if ((tag & 7) === 2) {
                                    var e = reader.uint32()+reader.pos
                                    while (reader.pos < e)
                                        message.span.push(reader.int32())
                                }else
                                    message.span.push(reader.int32())
                                break
                            case 3:
                                message.leadingComments = reader.string()
                                break
                            case 4:
                                message.trailingComments = reader.string()
                                break
                            case 6:
                                message.leadingDetachedComments && message.leadingDetachedComments.length || (message.leadingDetachedComments = [])
                                message.leadingDetachedComments.push(reader.string())
                                break
                            default:
                                reader.skipType(tag & 7)
                                break
                        }
                    }
                    return message
                }})($protobuf.Reader, $protobuf.util, [null, null, null, null, null]); /* eslint-enable */

                /**
                 * Decodes a Location from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location
                 */
                Location.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a Location.
                 * @function
                 * @param {google.protobuf.SourceCodeInfo.Location|Object} message Location or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Location.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                    if (message.path !== undefined) {
                        if (!Array.isArray(message.path))
                            return "invalid value for field .google.protobuf.SourceCodeInfo.Location.path (array expected)"
                        for (var i = 0; i < message.path.length; ++i) {
                            if (!util.isInteger(message.path[i]))
                                return "invalid value for field .google.protobuf.SourceCodeInfo.Location.path (integer[] expected)"
                        }
                    }
                    if (message.span !== undefined) {
                        if (!Array.isArray(message.span))
                            return "invalid value for field .google.protobuf.SourceCodeInfo.Location.span (array expected)"
                        for (var i = 0; i < message.span.length; ++i) {
                            if (!util.isInteger(message.span[i]))
                                return "invalid value for field .google.protobuf.SourceCodeInfo.Location.span (integer[] expected)"
                        }
                    }
                    if (message.leadingComments !== undefined) {
                        if (!util.isString(message.leadingComments))
                            return "invalid value for field .google.protobuf.SourceCodeInfo.Location.leadingComments (string expected)"
                    }
                    if (message.trailingComments !== undefined) {
                        if (!util.isString(message.trailingComments))
                            return "invalid value for field .google.protobuf.SourceCodeInfo.Location.trailingComments (string expected)"
                    }
                    if (message.leadingDetachedComments !== undefined) {
                        if (!Array.isArray(message.leadingDetachedComments))
                            return "invalid value for field .google.protobuf.SourceCodeInfo.Location.leadingDetachedComments (array expected)"
                        for (var i = 0; i < message.leadingDetachedComments.length; ++i) {
                            if (!util.isString(message.leadingDetachedComments[i]))
                                return "invalid value for field .google.protobuf.SourceCodeInfo.Location.leadingDetachedComments (string[] expected)"
                        }
                    }
                    return null
                }})($protobuf.util, [null, null, null, null, null]); /* eslint-enable */

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

            /**
             * Creates a new GeneratedCodeInfo instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo instance
             */
            GeneratedCodeInfo.create = function create(properties) {
                return new GeneratedCodeInfo(properties);
            };

            /**
             * Encodes the specified GeneratedCodeInfo.
             * @function
             * @param {google.protobuf.GeneratedCodeInfo|Object} message GeneratedCodeInfo or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GeneratedCodeInfo.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                writer || (writer = Writer.create())
                if (message.annotation)
                    for (var i = 0; i < message.annotation.length; ++i)
                    types[0].encode(message.annotation[i], writer.uint32(10/*= id 1, wireType 2 */).fork()).ldelim()
                return writer
            }})($protobuf.Writer, $protobuf.util, ["google.protobuf.GeneratedCodeInfo.Annotation"]); /* eslint-enable */

            /**
             * Encodes the specified GeneratedCodeInfo, length delimited.
             * @param {google.protobuf.GeneratedCodeInfo|Object} message GeneratedCodeInfo or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GeneratedCodeInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GeneratedCodeInfo from the specified reader or buffer.
             * @function
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo
             */
            GeneratedCodeInfo.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                reader instanceof Reader || (reader = Reader.create(reader))
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.GeneratedCodeInfo
                while (reader.pos < end) {
                    var tag = reader.uint32()
                    switch (tag >>> 3) {
                        case 1:
                            message.annotation && message.annotation.length || (message.annotation = [])
                            message.annotation.push(types[0].decode(reader, reader.uint32()))
                            break
                        default:
                            reader.skipType(tag & 7)
                            break
                    }
                }
                return message
            }})($protobuf.Reader, $protobuf.util, ["google.protobuf.GeneratedCodeInfo.Annotation"]); /* eslint-enable */

            /**
             * Decodes a GeneratedCodeInfo from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo
             */
            GeneratedCodeInfo.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                return this.decode(readerOrBuffer, readerOrBuffer.uint32());
            };

            /**
             * Verifies a GeneratedCodeInfo.
             * @function
             * @param {google.protobuf.GeneratedCodeInfo|Object} message GeneratedCodeInfo or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            GeneratedCodeInfo.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                if (message.annotation !== undefined) {
                    if (!Array.isArray(message.annotation))
                        return "invalid value for field .google.protobuf.GeneratedCodeInfo.annotation (array expected)"
                    for (var i = 0; i < message.annotation.length; ++i) {
                        var reason;
                        if (reason = types[0].verify(message.annotation[i]))
                            return reason
                    }
                }
                return null
            }})($protobuf.util, ["google.protobuf.GeneratedCodeInfo.Annotation"]); /* eslint-enable */

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
                 * Encodes the specified Annotation.
                 * @function
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation|Object} message Annotation or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Annotation.encode = /* eslint-disable */ (function(Writer, util, types) { $lazyTypes.push(types); return function encode(message, writer)  {
                    writer || (writer = Writer.create())
                    if (message.path && message.path.length) {
                        writer.uint32(10/*= id 1, wireType 2 */).fork()
                        for (var i = 0; i < message.path.length; ++i)
                            writer.int32(message.path[i])
                        writer.ldelim()
                    }
                    if (message.sourceFile !== undefined && message.sourceFile !== "")
                        writer.uint32(18/*= id 2, wireType 2 */).string(message.sourceFile)
                    if (message.begin !== undefined && message.begin !== 0)
                        writer.uint32(24/*= id 3, wireType 0 */).int32(message.begin)
                    if (message.end !== undefined && message.end !== 0)
                        writer.uint32(32/*= id 4, wireType 0 */).int32(message.end)
                    return writer
                }})($protobuf.Writer, $protobuf.util, [null, null, null, null]); /* eslint-enable */

                /**
                 * Encodes the specified Annotation, length delimited.
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation|Object} message Annotation or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Annotation.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Annotation from the specified reader or buffer.
                 * @function
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation
                 */
                Annotation.decode = /* eslint-disable */ (function(Reader, util, types) { $lazyTypes.push(types); return function decode(reader, length)  {
                    reader instanceof Reader || (reader = Reader.create(reader))
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.GeneratedCodeInfo.Annotation
                    while (reader.pos < end) {
                        var tag = reader.uint32()
                        switch (tag >>> 3) {
                            case 1:
                                message.path && message.path.length || (message.path = [])
                                if ((tag & 7) === 2) {
                                    var e = reader.uint32()+reader.pos
                                    while (reader.pos < e)
                                        message.path.push(reader.int32())
                                }else
                                    message.path.push(reader.int32())
                                break
                            case 2:
                                message.sourceFile = reader.string()
                                break
                            case 3:
                                message.begin = reader.int32()
                                break
                            case 4:
                                message.end = reader.int32()
                                break
                            default:
                                reader.skipType(tag & 7)
                                break
                        }
                    }
                    return message
                }})($protobuf.Reader, $protobuf.util, [null, null, null, null]); /* eslint-enable */

                /**
                 * Decodes a Annotation from the specified reader or buffer, length delimited.
                 * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation
                 */
                Annotation.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };

                /**
                 * Verifies a Annotation.
                 * @function
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation|Object} message Annotation or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Annotation.verify = /* eslint-disable */ (function(util, types) { $lazyTypes.push(types); return function verify(message)  {
                    if (message.path !== undefined) {
                        if (!Array.isArray(message.path))
                            return "invalid value for field .google.protobuf.GeneratedCodeInfo.Annotation.path (array expected)"
                        for (var i = 0; i < message.path.length; ++i) {
                            if (!util.isInteger(message.path[i]))
                                return "invalid value for field .google.protobuf.GeneratedCodeInfo.Annotation.path (integer[] expected)"
                        }
                    }
                    if (message.sourceFile !== undefined) {
                        if (!util.isString(message.sourceFile))
                            return "invalid value for field .google.protobuf.GeneratedCodeInfo.Annotation.sourceFile (string expected)"
                    }
                    if (message.begin !== undefined) {
                        if (!util.isInteger(message.begin))
                            return "invalid value for field .google.protobuf.GeneratedCodeInfo.Annotation.begin (integer expected)"
                    }
                    if (message.end !== undefined) {
                        if (!util.isInteger(message.end))
                            return "invalid value for field .google.protobuf.GeneratedCodeInfo.Annotation.end (integer expected)"
                    }
                    return null
                }})($protobuf.util, [null, null, null, null]); /* eslint-enable */

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
        path = path.split('.');
        var ptr = $root;
        while (path.length)
            ptr = ptr[path.shift()];
        types[i] = ptr;
    });
});

$protobuf.roots["test_test"] = $root;

module.exports = $root;
