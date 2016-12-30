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
            Empty.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    return w
                }
                /* eslint-enable */
            })();

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
            Empty.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.Empty
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            Empty.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function verify(m) {
                    return null
                }
                /* eslint-enable */
            })();

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
            EnumContainer.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["jspb.test.OuterEnum"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.outerEnum!==undefined&&m.outerEnum!==0)
                        w.uint32(8).uint32(m.outerEnum)
                    return w
                }
                /* eslint-enable */
            })();

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
            EnumContainer.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["jspb.test.OuterEnum"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.EnumContainer
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.outerEnum=r.uint32()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            EnumContainer.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["jspb.test.OuterEnum"]);
                return function verify(m) {
                    if(m.outerEnum!==undefined){
                        switch(m.outerEnum){
                            default:
                                return"invalid value for field .jspb.test.EnumContainer.outerEnum (enum value expected)"
                            case 1:
                            case 2:
                                break
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            Simple1.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    w.uint32(10).string(m.aString)
                    if(m.aRepeatedString)
                        for(var i=0;i<m.aRepeatedString.length;++i)
                        w.uint32(18).string(m.aRepeatedString[i])
                    if(m.aBoolean!==undefined&&m.aBoolean!==false)
                        w.uint32(24).bool(m.aBoolean)
                    return w
                }
                /* eslint-enable */
            })();

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
            Simple1.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.Simple1
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.aString=r.string()
                                break
                            case 2:
                                m.aRepeatedString&&m.aRepeatedString.length||(m.aRepeatedString=[])
                                m.aRepeatedString.push(r.string())
                                break
                            case 3:
                                m.aBoolean=r.bool()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            Simple1.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null]);
                return function verify(m) {
                    if(!util.isString(m.aString))
                        return"invalid value for field .jspb.test.Simple1.aString (string expected)"
                    if(m.aRepeatedString!==undefined){
                        if(!Array.isArray(m.aRepeatedString))
                            return"invalid value for field .jspb.test.Simple1.aRepeatedString (array expected)"
                        for(var i=0;i<m.aRepeatedString.length;++i){
                            if(!util.isString(m.aRepeatedString[i]))
                                return"invalid value for field .jspb.test.Simple1.aRepeatedString (string[] expected)"
                        }
                    }
                    if(m.aBoolean!==undefined){
                        if(typeof m.aBoolean!=="boolean")
                            return"invalid value for field .jspb.test.Simple1.aBoolean (boolean expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            Simple2.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    w.uint32(10).string(m.aString)
                    if(m.aRepeatedString)
                        for(var i=0;i<m.aRepeatedString.length;++i)
                        w.uint32(18).string(m.aRepeatedString[i])
                    return w
                }
                /* eslint-enable */
            })();

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
            Simple2.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.Simple2
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.aString=r.string()
                                break
                            case 2:
                                m.aRepeatedString&&m.aRepeatedString.length||(m.aRepeatedString=[])
                                m.aRepeatedString.push(r.string())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            Simple2.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null]);
                return function verify(m) {
                    if(!util.isString(m.aString))
                        return"invalid value for field .jspb.test.Simple2.aString (string expected)"
                    if(m.aRepeatedString!==undefined){
                        if(!Array.isArray(m.aRepeatedString))
                            return"invalid value for field .jspb.test.Simple2.aRepeatedString (array expected)"
                        for(var i=0;i<m.aRepeatedString.length;++i){
                            if(!util.isString(m.aRepeatedString[i]))
                                return"invalid value for field .jspb.test.Simple2.aRepeatedString (string[] expected)"
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            SpecialCases.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    w.uint32(10).string(m.normal)
                    w.uint32(18).string(m["default"])
                    w.uint32(26).string(m["function"])
                    w.uint32(34).string(m["var"])
                    return w
                }
                /* eslint-enable */
            })();

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
            SpecialCases.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.SpecialCases
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.normal=r.string()
                                break
                            case 2:
                                m["default"]=r.string()
                                break
                            case 3:
                                m["function"]=r.string()
                                break
                            case 4:
                                m["var"]=r.string()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            SpecialCases.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null]);
                return function verify(m) {
                    if(!util.isString(m.normal))
                        return"invalid value for field .jspb.test.SpecialCases.normal (string expected)"
                    if(!util.isString(m["default"]))
                        return"invalid value for field .jspb.test.SpecialCases.default (string expected)"
                    if(!util.isString(m["function"]))
                        return"invalid value for field .jspb.test.SpecialCases.function (string expected)"
                    if(!util.isString(m["var"]))
                        return"invalid value for field .jspb.test.SpecialCases.var (string expected)"
                    return null
                }
                /* eslint-enable */
            })();

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
            OptionalFields.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"jspb.test.OptionalFields.Nested","jspb.test.OptionalFields.Nested",null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.aString!==undefined&&m.aString!=="")
                        w.uint32(10).string(m.aString)
                    w.uint32(16).bool(m.aBool)
                    if(m.aNestedMessage!==undefined&&m.aNestedMessage!==null)
                        types[2].encode(m.aNestedMessage,w.uint32(26).fork()).ldelim()
                    if(m.aRepeatedMessage)
                        for(var i=0;i<m.aRepeatedMessage.length;++i)
                        types[3].encode(m.aRepeatedMessage[i],w.uint32(34).fork()).ldelim()
                    if(m.aRepeatedString)
                        for(var i=0;i<m.aRepeatedString.length;++i)
                        w.uint32(42).string(m.aRepeatedString[i])
                    return w
                }
                /* eslint-enable */
            })();

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
            OptionalFields.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"jspb.test.OptionalFields.Nested","jspb.test.OptionalFields.Nested",null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.OptionalFields
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.aString=r.string()
                                break
                            case 2:
                                m.aBool=r.bool()
                                break
                            case 3:
                                m.aNestedMessage=types[2].decode(r,r.uint32())
                                break
                            case 4:
                                m.aRepeatedMessage&&m.aRepeatedMessage.length||(m.aRepeatedMessage=[])
                                m.aRepeatedMessage.push(types[3].decode(r,r.uint32()))
                                break
                            case 5:
                                m.aRepeatedString&&m.aRepeatedString.length||(m.aRepeatedString=[])
                                m.aRepeatedString.push(r.string())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            OptionalFields.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"jspb.test.OptionalFields.Nested","jspb.test.OptionalFields.Nested",null]);
                return function verify(m) {
                    if(m.aString!==undefined){
                        if(!util.isString(m.aString))
                            return"invalid value for field .jspb.test.OptionalFields.aString (string expected)"
                    }
                    if(typeof m.aBool!=="boolean")
                        return"invalid value for field .jspb.test.OptionalFields.aBool (boolean expected)"
                    if(m.aNestedMessage!==undefined&&m.aNestedMessage!==null){
                        var r;
                        if(r=types[2].verify(m.aNestedMessage))
                            return r
                    }
                    if(m.aRepeatedMessage!==undefined){
                        if(!Array.isArray(m.aRepeatedMessage))
                            return"invalid value for field .jspb.test.OptionalFields.aRepeatedMessage (array expected)"
                        for(var i=0;i<m.aRepeatedMessage.length;++i){
                            var r;
                            if(r=types[3].verify(m.aRepeatedMessage[i]))
                                return r
                        }
                    }
                    if(m.aRepeatedString!==undefined){
                        if(!Array.isArray(m.aRepeatedString))
                            return"invalid value for field .jspb.test.OptionalFields.aRepeatedString (array expected)"
                        for(var i=0;i<m.aRepeatedString.length;++i){
                            if(!util.isString(m.aRepeatedString[i]))
                                return"invalid value for field .jspb.test.OptionalFields.aRepeatedString (string[] expected)"
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
                Nested.encode = (function() {
                    /* eslint-disable */
                    var Writer = $protobuf.Writer;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null]);
                    return function encode(m, w) {
                        w||(w=Writer.create())
                        if(m.anInt!==undefined&&m.anInt!==0)
                            w.uint32(8).int32(m.anInt)
                        return w
                    }
                    /* eslint-enable */
                })();

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
                Nested.decode = (function() {
                    /* eslint-disable */
                    var Reader = $protobuf.Reader;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null]);
                    return function decode(r, l) {
                        r instanceof Reader||(r=Reader.create(r))
                        var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.OptionalFields.Nested
                        while(r.pos<c){
                            var t=r.uint32()
                            switch(t>>>3){
                                case 1:
                                    m.anInt=r.int32()
                                    break
                                default:
                                    r.skipType(t&7)
                                    break
                            }
                        }
                        return m
                    }
                    /* eslint-enable */
                })();

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
                Nested.verify = (function() {
                    /* eslint-disable */
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null]);
                    return function verify(m) {
                        if(m.anInt!==undefined){
                            if(!util.isInteger(m.anInt))
                                return"invalid value for field .jspb.test.OptionalFields.Nested.anInt (integer expected)"
                        }
                        return null
                    }
                    /* eslint-enable */
                })();

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
            HasExtensions.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,"jspb.test.IsExtension","jspb.test.Simple1",null,null,"jspb.test.Simple1","jspb.test.Simple1"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.str1!==undefined&&m.str1!=="")
                        w.uint32(10).string(m.str1)
                    if(m.str2!==undefined&&m.str2!=="")
                        w.uint32(18).string(m.str2)
                    if(m.str3!==undefined&&m.str3!=="")
                        w.uint32(26).string(m.str3)
                    if(m[".jspb.test.IsExtension.extField"]!==undefined&&m[".jspb.test.IsExtension.extField"]!==null)
                        types[3].encode(m[".jspb.test.IsExtension.extField"],w.uint32(802).fork()).ldelim()
                    if(m[".jspb.test.IndirectExtension.simple"]!==undefined&&m[".jspb.test.IndirectExtension.simple"]!==null)
                        types[4].encode(m[".jspb.test.IndirectExtension.simple"],w.uint32(810).fork()).ldelim()
                    if(m[".jspb.test.IndirectExtension.str"]!==undefined&&m[".jspb.test.IndirectExtension.str"]!=="")
                        w.uint32(818).string(m[".jspb.test.IndirectExtension.str"])
                    if(m[".jspb.test.IndirectExtension.repeatedStr"])
                        for(var i=0;i<m[".jspb.test.IndirectExtension.repeatedStr"].length;++i)
                        w.uint32(826).string(m[".jspb.test.IndirectExtension.repeatedStr"][i])
                    if(m[".jspb.test.IndirectExtension.repeatedSimple"])
                        for(var i=0;i<m[".jspb.test.IndirectExtension.repeatedSimple"].length;++i)
                        types[7].encode(m[".jspb.test.IndirectExtension.repeatedSimple"][i],w.uint32(834).fork()).ldelim()
                    if(m[".jspb.test.simple1"]!==undefined&&m[".jspb.test.simple1"]!==null)
                        types[8].encode(m[".jspb.test.simple1"],w.uint32(842).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            HasExtensions.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,"jspb.test.IsExtension","jspb.test.Simple1",null,null,"jspb.test.Simple1","jspb.test.Simple1"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.HasExtensions
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.str1=r.string()
                                break
                            case 2:
                                m.str2=r.string()
                                break
                            case 3:
                                m.str3=r.string()
                                break
                            case 100:
                                m[".jspb.test.IsExtension.extField"]=types[3].decode(r,r.uint32())
                                break
                            case 101:
                                m[".jspb.test.IndirectExtension.simple"]=types[4].decode(r,r.uint32())
                                break
                            case 102:
                                m[".jspb.test.IndirectExtension.str"]=r.string()
                                break
                            case 103:
                                m[".jspb.test.IndirectExtension.repeatedStr"]&&m[".jspb.test.IndirectExtension.repeatedStr"].length||(m[".jspb.test.IndirectExtension.repeatedStr"]=[])
                                m[".jspb.test.IndirectExtension.repeatedStr"].push(r.string())
                                break
                            case 104:
                                m[".jspb.test.IndirectExtension.repeatedSimple"]&&m[".jspb.test.IndirectExtension.repeatedSimple"].length||(m[".jspb.test.IndirectExtension.repeatedSimple"]=[])
                                m[".jspb.test.IndirectExtension.repeatedSimple"].push(types[7].decode(r,r.uint32()))
                                break
                            case 105:
                                m[".jspb.test.simple1"]=types[8].decode(r,r.uint32())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            HasExtensions.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,"jspb.test.IsExtension","jspb.test.Simple1",null,null,"jspb.test.Simple1","jspb.test.Simple1"]);
                return function verify(m) {
                    if(m.str1!==undefined){
                        if(!util.isString(m.str1))
                            return"invalid value for field .jspb.test.HasExtensions.str1 (string expected)"
                    }
                    if(m.str2!==undefined){
                        if(!util.isString(m.str2))
                            return"invalid value for field .jspb.test.HasExtensions.str2 (string expected)"
                    }
                    if(m.str3!==undefined){
                        if(!util.isString(m.str3))
                            return"invalid value for field .jspb.test.HasExtensions.str3 (string expected)"
                    }
                    if(m[".jspb.test.IsExtension.extField"]!==undefined&&m[".jspb.test.IsExtension.extField"]!==null){
                        var r;
                        if(r=types[3].verify(m[".jspb.test.IsExtension.extField"]))
                            return r
                    }
                    if(m[".jspb.test.IndirectExtension.simple"]!==undefined&&m[".jspb.test.IndirectExtension.simple"]!==null){
                        var r;
                        if(r=types[4].verify(m[".jspb.test.IndirectExtension.simple"]))
                            return r
                    }
                    if(m[".jspb.test.IndirectExtension.str"]!==undefined){
                        if(!util.isString(m[".jspb.test.IndirectExtension.str"]))
                            return"invalid value for field .jspb.test.HasExtensions..jspb.test.IndirectExtension.str (string expected)"
                    }
                    if(m[".jspb.test.IndirectExtension.repeatedStr"]!==undefined){
                        if(!Array.isArray(m[".jspb.test.IndirectExtension.repeatedStr"]))
                            return"invalid value for field .jspb.test.HasExtensions..jspb.test.IndirectExtension.repeatedStr (array expected)"
                        for(var i=0;i<m[".jspb.test.IndirectExtension.repeatedStr"].length;++i){
                            if(!util.isString(m[".jspb.test.IndirectExtension.repeatedStr"][i]))
                                return"invalid value for field .jspb.test.HasExtensions..jspb.test.IndirectExtension.repeatedStr (string[] expected)"
                        }
                    }
                    if(m[".jspb.test.IndirectExtension.repeatedSimple"]!==undefined){
                        if(!Array.isArray(m[".jspb.test.IndirectExtension.repeatedSimple"]))
                            return"invalid value for field .jspb.test.HasExtensions..jspb.test.IndirectExtension.repeatedSimple (array expected)"
                        for(var i=0;i<m[".jspb.test.IndirectExtension.repeatedSimple"].length;++i){
                            var r;
                            if(r=types[7].verify(m[".jspb.test.IndirectExtension.repeatedSimple"][i]))
                                return r
                        }
                    }
                    if(m[".jspb.test.simple1"]!==undefined&&m[".jspb.test.simple1"]!==null){
                        var r;
                        if(r=types[8].verify(m[".jspb.test.simple1"]))
                            return r
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            Complex.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"jspb.test.Complex.Nested","jspb.test.Complex.Nested",null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    w.uint32(10).string(m.aString)
                    w.uint32(72).bool(m.anOutOfOrderBool)
                    if(m.aNestedMessage!==undefined&&m.aNestedMessage!==null)
                        types[2].encode(m.aNestedMessage,w.uint32(34).fork()).ldelim()
                    if(m.aRepeatedMessage)
                        for(var i=0;i<m.aRepeatedMessage.length;++i)
                        types[3].encode(m.aRepeatedMessage[i],w.uint32(42).fork()).ldelim()
                    if(m.aRepeatedString)
                        for(var i=0;i<m.aRepeatedString.length;++i)
                        w.uint32(58).string(m.aRepeatedString[i])
                    return w
                }
                /* eslint-enable */
            })();

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
            Complex.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"jspb.test.Complex.Nested","jspb.test.Complex.Nested",null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.Complex
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.aString=r.string()
                                break
                            case 9:
                                m.anOutOfOrderBool=r.bool()
                                break
                            case 4:
                                m.aNestedMessage=types[2].decode(r,r.uint32())
                                break
                            case 5:
                                m.aRepeatedMessage&&m.aRepeatedMessage.length||(m.aRepeatedMessage=[])
                                m.aRepeatedMessage.push(types[3].decode(r,r.uint32()))
                                break
                            case 7:
                                m.aRepeatedString&&m.aRepeatedString.length||(m.aRepeatedString=[])
                                m.aRepeatedString.push(r.string())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            Complex.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"jspb.test.Complex.Nested","jspb.test.Complex.Nested",null]);
                return function verify(m) {
                    if(!util.isString(m.aString))
                        return"invalid value for field .jspb.test.Complex.aString (string expected)"
                    if(typeof m.anOutOfOrderBool!=="boolean")
                        return"invalid value for field .jspb.test.Complex.anOutOfOrderBool (boolean expected)"
                    if(m.aNestedMessage!==undefined&&m.aNestedMessage!==null){
                        var r;
                        if(r=types[2].verify(m.aNestedMessage))
                            return r
                    }
                    if(m.aRepeatedMessage!==undefined){
                        if(!Array.isArray(m.aRepeatedMessage))
                            return"invalid value for field .jspb.test.Complex.aRepeatedMessage (array expected)"
                        for(var i=0;i<m.aRepeatedMessage.length;++i){
                            var r;
                            if(r=types[3].verify(m.aRepeatedMessage[i]))
                                return r
                        }
                    }
                    if(m.aRepeatedString!==undefined){
                        if(!Array.isArray(m.aRepeatedString))
                            return"invalid value for field .jspb.test.Complex.aRepeatedString (array expected)"
                        for(var i=0;i<m.aRepeatedString.length;++i){
                            if(!util.isString(m.aRepeatedString[i]))
                                return"invalid value for field .jspb.test.Complex.aRepeatedString (string[] expected)"
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
                Nested.encode = (function() {
                    /* eslint-disable */
                    var Writer = $protobuf.Writer;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null]);
                    return function encode(m, w) {
                        w||(w=Writer.create())
                        w.uint32(16).int32(m.anInt)
                        return w
                    }
                    /* eslint-enable */
                })();

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
                Nested.decode = (function() {
                    /* eslint-disable */
                    var Reader = $protobuf.Reader;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null]);
                    return function decode(r, l) {
                        r instanceof Reader||(r=Reader.create(r))
                        var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.Complex.Nested
                        while(r.pos<c){
                            var t=r.uint32()
                            switch(t>>>3){
                                case 2:
                                    m.anInt=r.int32()
                                    break
                                default:
                                    r.skipType(t&7)
                                    break
                            }
                        }
                        return m
                    }
                    /* eslint-enable */
                })();

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
                Nested.verify = (function() {
                    /* eslint-disable */
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null]);
                    return function verify(m) {
                        if(!util.isInteger(m.anInt))
                            return"invalid value for field .jspb.test.Complex.Nested.anInt (integer expected)"
                        return null
                    }
                    /* eslint-enable */
                })();

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
            OuterMessage.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    return w
                }
                /* eslint-enable */
            })();

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
            OuterMessage.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.OuterMessage
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            OuterMessage.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function verify(m) {
                    return null
                }
                /* eslint-enable */
            })();

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
                Complex.encode = (function() {
                    /* eslint-disable */
                    var Writer = $protobuf.Writer;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null]);
                    return function encode(m, w) {
                        w||(w=Writer.create())
                        if(m.innerComplexField!==undefined&&m.innerComplexField!==0)
                            w.uint32(8).int32(m.innerComplexField)
                        return w
                    }
                    /* eslint-enable */
                })();

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
                Complex.decode = (function() {
                    /* eslint-disable */
                    var Reader = $protobuf.Reader;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null]);
                    return function decode(r, l) {
                        r instanceof Reader||(r=Reader.create(r))
                        var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.OuterMessage.Complex
                        while(r.pos<c){
                            var t=r.uint32()
                            switch(t>>>3){
                                case 1:
                                    m.innerComplexField=r.int32()
                                    break
                                default:
                                    r.skipType(t&7)
                                    break
                            }
                        }
                        return m
                    }
                    /* eslint-enable */
                })();

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
                Complex.verify = (function() {
                    /* eslint-disable */
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null]);
                    return function verify(m) {
                        if(m.innerComplexField!==undefined){
                            if(!util.isInteger(m.innerComplexField))
                                return"invalid value for field .jspb.test.OuterMessage.Complex.innerComplexField (integer expected)"
                        }
                        return null
                    }
                    /* eslint-enable */
                })();

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
            IsExtension.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.ext1!==undefined&&m.ext1!=="")
                        w.uint32(10).string(m.ext1)
                    return w
                }
                /* eslint-enable */
            })();

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
            IsExtension.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.IsExtension
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.ext1=r.string()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            IsExtension.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null]);
                return function verify(m) {
                    if(m.ext1!==undefined){
                        if(!util.isString(m.ext1))
                            return"invalid value for field .jspb.test.IsExtension.ext1 (string expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            IndirectExtension.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    return w
                }
                /* eslint-enable */
            })();

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
            IndirectExtension.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.IndirectExtension
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            IndirectExtension.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function verify(m) {
                    return null
                }
                /* eslint-enable */
            })();

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
            DefaultValues.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,"jspb.test.DefaultValues.Enum",null,null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.stringField!==undefined&&m.stringField!=="default<>'\"abc")
                        w.uint32(10).string(m.stringField)
                    if(m.boolField!==undefined&&m.boolField!==true)
                        w.uint32(16).bool(m.boolField)
                    if(m.intField!==undefined&&m.intField!==null&&util.longNe(m.intField,11,0))
                        w.uint32(24).int64(m.intField)
                    if(m.enumField!==undefined&&m.enumField!=="E1")
                        w.uint32(32).uint32(m.enumField)
                    if(m.emptyField!==undefined&&m.emptyField!=="")
                        w.uint32(50).string(m.emptyField)
                    if(m.bytesField!==undefined&&m.bytesField!=="moo")
                        w.uint32(66).bytes(m.bytesField)
                    return w
                }
                /* eslint-enable */
            })();

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
            DefaultValues.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,"jspb.test.DefaultValues.Enum",null,null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.DefaultValues
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.stringField=r.string()
                                break
                            case 2:
                                m.boolField=r.bool()
                                break
                            case 3:
                                m.intField=r.int64()
                                break
                            case 4:
                                m.enumField=r.uint32()
                                break
                            case 6:
                                m.emptyField=r.string()
                                break
                            case 8:
                                m.bytesField=r.bytes()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            DefaultValues.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,"jspb.test.DefaultValues.Enum",null,null]);
                return function verify(m) {
                    if(m.stringField!==undefined){
                        if(!util.isString(m.stringField))
                            return"invalid value for field .jspb.test.DefaultValues.stringField (string expected)"
                    }
                    if(m.boolField!==undefined){
                        if(typeof m.boolField!=="boolean")
                            return"invalid value for field .jspb.test.DefaultValues.boolField (boolean expected)"
                    }
                    if(m.intField!==undefined){
                        if(!util.isInteger(m.intField)&&!(m.intField&&util.isInteger(m.intField.low)&&util.isInteger(m.intField.high)))
                            return"invalid value for field .jspb.test.DefaultValues.intField (integer|Long expected)"
                    }
                    if(m.enumField!==undefined){
                        switch(m.enumField){
                            default:
                                return"invalid value for field .jspb.test.DefaultValues.enumField (enum value expected)"
                            case 13:
                            case 77:
                                break
                        }
                    }
                    if(m.emptyField!==undefined){
                        if(!util.isString(m.emptyField))
                            return"invalid value for field .jspb.test.DefaultValues.emptyField (string expected)"
                    }
                    if(m.bytesField!==undefined){
                        if(!(m.bytesField&&typeof m.bytesField.length==="number"||util.isString(m.bytesField)))
                            return"invalid value for field .jspb.test.DefaultValues.bytesField (buffer expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            FloatingPointFields.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,null,null,null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.optionalFloatField!==undefined&&m.optionalFloatField!==0)
                        w.uint32(13).float(m.optionalFloatField)
                    w.uint32(21).float(m.requiredFloatField)
                    if(m.repeatedFloatField)
                        for(var i=0;i<m.repeatedFloatField.length;++i)
                        w.uint32(29).float(m.repeatedFloatField[i])
                    if(m.defaultFloatField!==undefined&&m.defaultFloatField!==2)
                        w.uint32(37).float(m.defaultFloatField)
                    if(m.optionalDoubleField!==undefined&&m.optionalDoubleField!==0)
                        w.uint32(41).double(m.optionalDoubleField)
                    w.uint32(49).double(m.requiredDoubleField)
                    if(m.repeatedDoubleField)
                        for(var i=0;i<m.repeatedDoubleField.length;++i)
                        w.uint32(57).double(m.repeatedDoubleField[i])
                    if(m.defaultDoubleField!==undefined&&m.defaultDoubleField!==2)
                        w.uint32(65).double(m.defaultDoubleField)
                    return w
                }
                /* eslint-enable */
            })();

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
            FloatingPointFields.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,null,null,null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.FloatingPointFields
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.optionalFloatField=r.float()
                                break
                            case 2:
                                m.requiredFloatField=r.float()
                                break
                            case 3:
                                m.repeatedFloatField&&m.repeatedFloatField.length||(m.repeatedFloatField=[])
                                m.repeatedFloatField.push(r.float())
                                break
                            case 4:
                                m.defaultFloatField=r.float()
                                break
                            case 5:
                                m.optionalDoubleField=r.double()
                                break
                            case 6:
                                m.requiredDoubleField=r.double()
                                break
                            case 7:
                                m.repeatedDoubleField&&m.repeatedDoubleField.length||(m.repeatedDoubleField=[])
                                m.repeatedDoubleField.push(r.double())
                                break
                            case 8:
                                m.defaultDoubleField=r.double()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            FloatingPointFields.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,null,null,null]);
                return function verify(m) {
                    if(m.optionalFloatField!==undefined){
                        if(typeof m.optionalFloatField!=="number")
                            return"invalid value for field .jspb.test.FloatingPointFields.optionalFloatField (number expected)"
                    }
                    if(typeof m.requiredFloatField!=="number")
                        return"invalid value for field .jspb.test.FloatingPointFields.requiredFloatField (number expected)"
                    if(m.repeatedFloatField!==undefined){
                        if(!Array.isArray(m.repeatedFloatField))
                            return"invalid value for field .jspb.test.FloatingPointFields.repeatedFloatField (array expected)"
                        for(var i=0;i<m.repeatedFloatField.length;++i){
                            if(typeof m.repeatedFloatField[i]!=="number")
                                return"invalid value for field .jspb.test.FloatingPointFields.repeatedFloatField (number[] expected)"
                        }
                    }
                    if(m.defaultFloatField!==undefined){
                        if(typeof m.defaultFloatField!=="number")
                            return"invalid value for field .jspb.test.FloatingPointFields.defaultFloatField (number expected)"
                    }
                    if(m.optionalDoubleField!==undefined){
                        if(typeof m.optionalDoubleField!=="number")
                            return"invalid value for field .jspb.test.FloatingPointFields.optionalDoubleField (number expected)"
                    }
                    if(typeof m.requiredDoubleField!=="number")
                        return"invalid value for field .jspb.test.FloatingPointFields.requiredDoubleField (number expected)"
                    if(m.repeatedDoubleField!==undefined){
                        if(!Array.isArray(m.repeatedDoubleField))
                            return"invalid value for field .jspb.test.FloatingPointFields.repeatedDoubleField (array expected)"
                        for(var i=0;i<m.repeatedDoubleField.length;++i){
                            if(typeof m.repeatedDoubleField[i]!=="number")
                                return"invalid value for field .jspb.test.FloatingPointFields.repeatedDoubleField (number[] expected)"
                        }
                    }
                    if(m.defaultDoubleField!==undefined){
                        if(typeof m.defaultDoubleField!=="number")
                            return"invalid value for field .jspb.test.FloatingPointFields.defaultDoubleField (number expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            TestClone.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"jspb.test.Simple1","jspb.test.Simple1",null,null,"jspb.test.CloneExtension"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.str!==undefined&&m.str!=="")
                        w.uint32(10).string(m.str)
                    if(m.simple1!==undefined&&m.simple1!==null)
                        types[1].encode(m.simple1,w.uint32(26).fork()).ldelim()
                    if(m.simple2)
                        for(var i=0;i<m.simple2.length;++i)
                        types[2].encode(m.simple2[i],w.uint32(42).fork()).ldelim()
                    if(m.bytesField!==undefined&&m.bytesField!==[])
                        w.uint32(50).bytes(m.bytesField)
                    if(m.unused!==undefined&&m.unused!=="")
                        w.uint32(58).string(m.unused)
                    if(m[".jspb.test.CloneExtension.extField"]!==undefined&&m[".jspb.test.CloneExtension.extField"]!==null)
                        types[5].encode(m[".jspb.test.CloneExtension.extField"],w.uint32(802).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            TestClone.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"jspb.test.Simple1","jspb.test.Simple1",null,null,"jspb.test.CloneExtension"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.TestClone
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.str=r.string()
                                break
                            case 3:
                                m.simple1=types[1].decode(r,r.uint32())
                                break
                            case 5:
                                m.simple2&&m.simple2.length||(m.simple2=[])
                                m.simple2.push(types[2].decode(r,r.uint32()))
                                break
                            case 6:
                                m.bytesField=r.bytes()
                                break
                            case 7:
                                m.unused=r.string()
                                break
                            case 100:
                                m[".jspb.test.CloneExtension.extField"]=types[5].decode(r,r.uint32())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            TestClone.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"jspb.test.Simple1","jspb.test.Simple1",null,null,"jspb.test.CloneExtension"]);
                return function verify(m) {
                    if(m.str!==undefined){
                        if(!util.isString(m.str))
                            return"invalid value for field .jspb.test.TestClone.str (string expected)"
                    }
                    if(m.simple1!==undefined&&m.simple1!==null){
                        var r;
                        if(r=types[1].verify(m.simple1))
                            return r
                    }
                    if(m.simple2!==undefined){
                        if(!Array.isArray(m.simple2))
                            return"invalid value for field .jspb.test.TestClone.simple2 (array expected)"
                        for(var i=0;i<m.simple2.length;++i){
                            var r;
                            if(r=types[2].verify(m.simple2[i]))
                                return r
                        }
                    }
                    if(m.bytesField!==undefined){
                        if(!(m.bytesField&&typeof m.bytesField.length==="number"||util.isString(m.bytesField)))
                            return"invalid value for field .jspb.test.TestClone.bytesField (buffer expected)"
                    }
                    if(m.unused!==undefined){
                        if(!util.isString(m.unused))
                            return"invalid value for field .jspb.test.TestClone.unused (string expected)"
                    }
                    if(m[".jspb.test.CloneExtension.extField"]!==undefined&&m[".jspb.test.CloneExtension.extField"]!==null){
                        var r;
                        if(r=types[5].verify(m[".jspb.test.CloneExtension.extField"]))
                            return r
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            CloneExtension.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.ext!==undefined&&m.ext!=="")
                        w.uint32(18).string(m.ext)
                    return w
                }
                /* eslint-enable */
            })();

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
            CloneExtension.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.CloneExtension
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 2:
                                m.ext=r.string()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            CloneExtension.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null]);
                return function verify(m) {
                    if(m.ext!==undefined){
                        if(!util.isString(m.ext))
                            return"invalid value for field .jspb.test.CloneExtension.ext (string expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            TestGroup.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"jspb.test.Simple2","jspb.test.Simple2"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.id!==undefined&&m.id!=="")
                        w.uint32(34).string(m.id)
                    types[1].encode(m.requiredSimple,w.uint32(42).fork()).ldelim()
                    if(m.optionalSimple!==undefined&&m.optionalSimple!==null)
                        types[2].encode(m.optionalSimple,w.uint32(50).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            TestGroup.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"jspb.test.Simple2","jspb.test.Simple2"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.TestGroup
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 4:
                                m.id=r.string()
                                break
                            case 5:
                                m.requiredSimple=types[1].decode(r,r.uint32())
                                break
                            case 6:
                                m.optionalSimple=types[2].decode(r,r.uint32())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            TestGroup.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"jspb.test.Simple2","jspb.test.Simple2"]);
                return function verify(m) {
                    if(m.id!==undefined){
                        if(!util.isString(m.id))
                            return"invalid value for field .jspb.test.TestGroup.id (string expected)"
                    }
                    var r;
                    if(r=types[1].verify(m.requiredSimple))
                        return r
                    if(m.optionalSimple!==undefined&&m.optionalSimple!==null){
                        var r;
                        if(r=types[2].verify(m.optionalSimple))
                            return r
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            TestReservedNames.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.extension!==undefined&&m.extension!==0)
                        w.uint32(8).int32(m.extension)
                    if(m[".jspb.test.TestReservedNamesExtension.foo"]!==undefined&&m[".jspb.test.TestReservedNamesExtension.foo"]!==0)
                        w.uint32(80).int32(m[".jspb.test.TestReservedNamesExtension.foo"])
                    return w
                }
                /* eslint-enable */
            })();

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
            TestReservedNames.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.TestReservedNames
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.extension=r.int32()
                                break
                            case 10:
                                m[".jspb.test.TestReservedNamesExtension.foo"]=r.int32()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            TestReservedNames.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null]);
                return function verify(m) {
                    if(m.extension!==undefined){
                        if(!util.isInteger(m.extension))
                            return"invalid value for field .jspb.test.TestReservedNames.extension (integer expected)"
                    }
                    if(m[".jspb.test.TestReservedNamesExtension.foo"]!==undefined){
                        if(!util.isInteger(m[".jspb.test.TestReservedNamesExtension.foo"]))
                            return"invalid value for field .jspb.test.TestReservedNames..jspb.test.TestReservedNamesExtension.foo (integer expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            TestReservedNamesExtension.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    return w
                }
                /* eslint-enable */
            })();

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
            TestReservedNamesExtension.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.TestReservedNamesExtension
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            TestReservedNamesExtension.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function verify(m) {
                    return null
                }
                /* eslint-enable */
            })();

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
            TestMessageWithOneof.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"jspb.test.TestMessageWithOneof",null,null,null,null,null,null,null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.normalField!==undefined&&m.normalField!==false)
                        w.uint32(64).bool(m.normalField)
                    if(m.repeatedField)
                        for(var i=0;i<m.repeatedField.length;++i)
                        w.uint32(74).string(m.repeatedField[i])
                    switch(m.getPartialOneof()){
                        case"pone":
                            w.uint32(26).string(m.pone)
                            break;
                        case"pthree":
                            w.uint32(42).string(m.pthree)
                            break;
                    }
                    switch(m.getRecursiveOneof()){
                        case"rone":
                            types[2].encode(m.rone,w.uint32(50).fork()).ldelim()
                            break;
                        case"rtwo":
                            w.uint32(58).string(m.rtwo)
                            break;
                    }
                    switch(m.getDefaultOneofA()){
                        case"aone":
                            w.uint32(80).int32(m.aone)
                            break;
                        case"atwo":
                            w.uint32(88).int32(m.atwo)
                            break;
                    }
                    switch(m.getDefaultOneofB()){
                        case"bone":
                            w.uint32(96).int32(m.bone)
                            break;
                        case"btwo":
                            w.uint32(104).int32(m.btwo)
                            break;
                    }
                    return w
                }
                /* eslint-enable */
            })();

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
            TestMessageWithOneof.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"jspb.test.TestMessageWithOneof",null,null,null,null,null,null,null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.TestMessageWithOneof
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 3:
                                m.pone=r.string()
                                break
                            case 5:
                                m.pthree=r.string()
                                break
                            case 6:
                                m.rone=types[2].decode(r,r.uint32())
                                break
                            case 7:
                                m.rtwo=r.string()
                                break
                            case 8:
                                m.normalField=r.bool()
                                break
                            case 9:
                                m.repeatedField&&m.repeatedField.length||(m.repeatedField=[])
                                m.repeatedField.push(r.string())
                                break
                            case 10:
                                m.aone=r.int32()
                                break
                            case 11:
                                m.atwo=r.int32()
                                break
                            case 12:
                                m.bone=r.int32()
                                break
                            case 13:
                                m.btwo=r.int32()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            TestMessageWithOneof.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"jspb.test.TestMessageWithOneof",null,null,null,null,null,null,null]);
                return function verify(m) {
                    if(m.pone!==undefined){
                        if(!util.isString(m.pone))
                            return"invalid value for field .jspb.test.TestMessageWithOneof.pone (string expected)"
                    }
                    if(m.pthree!==undefined){
                        if(!util.isString(m.pthree))
                            return"invalid value for field .jspb.test.TestMessageWithOneof.pthree (string expected)"
                    }
                    if(m.rone!==undefined&&m.rone!==null){
                        var r;
                        if(r=types[2].verify(m.rone))
                            return r
                    }
                    if(m.rtwo!==undefined){
                        if(!util.isString(m.rtwo))
                            return"invalid value for field .jspb.test.TestMessageWithOneof.rtwo (string expected)"
                    }
                    if(m.normalField!==undefined){
                        if(typeof m.normalField!=="boolean")
                            return"invalid value for field .jspb.test.TestMessageWithOneof.normalField (boolean expected)"
                    }
                    if(m.repeatedField!==undefined){
                        if(!Array.isArray(m.repeatedField))
                            return"invalid value for field .jspb.test.TestMessageWithOneof.repeatedField (array expected)"
                        for(var i=0;i<m.repeatedField.length;++i){
                            if(!util.isString(m.repeatedField[i]))
                                return"invalid value for field .jspb.test.TestMessageWithOneof.repeatedField (string[] expected)"
                        }
                    }
                    if(m.aone!==undefined){
                        if(!util.isInteger(m.aone))
                            return"invalid value for field .jspb.test.TestMessageWithOneof.aone (integer expected)"
                    }
                    if(m.atwo!==undefined){
                        if(!util.isInteger(m.atwo))
                            return"invalid value for field .jspb.test.TestMessageWithOneof.atwo (integer expected)"
                    }
                    if(m.bone!==undefined){
                        if(!util.isInteger(m.bone))
                            return"invalid value for field .jspb.test.TestMessageWithOneof.bone (integer expected)"
                    }
                    if(m.btwo!==undefined){
                        if(!util.isInteger(m.btwo))
                            return"invalid value for field .jspb.test.TestMessageWithOneof.btwo (integer expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            TestEndsWithBytes.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.value!==undefined&&m.value!==0)
                        w.uint32(8).int32(m.value)
                    if(m.data!==undefined&&m.data!==[])
                        w.uint32(18).bytes(m.data)
                    return w
                }
                /* eslint-enable */
            })();

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
            TestEndsWithBytes.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.TestEndsWithBytes
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.value=r.int32()
                                break
                            case 2:
                                m.data=r.bytes()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            TestEndsWithBytes.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null]);
                return function verify(m) {
                    if(m.value!==undefined){
                        if(!util.isInteger(m.value))
                            return"invalid value for field .jspb.test.TestEndsWithBytes.value (integer expected)"
                    }
                    if(m.data!==undefined){
                        if(!(m.data&&typeof m.data.length==="number"||util.isString(m.data)))
                            return"invalid value for field .jspb.test.TestEndsWithBytes.data (buffer expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            TestMapFieldsNoBinary.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,"jspb.test.MapValueEnumNoBinary","jspb.test.MapValueMessageNoBinary",null,null,null,"jspb.test.TestMapFieldsNoBinary","jspb.test.TestMapFieldsNoBinary"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.mapStringString&&m.mapStringString!==util.emptyObject){
                        for(var ks=Object.keys(m.mapStringString),i=0;i<ks.length;++i){
                            w.uint32(10).fork().uint32(10).string(ks[i])
                            w.uint32(18).string(m.mapStringString[ks[i]])
                            w.ldelim()
                        }
                    }
                    if(m.mapStringInt32&&m.mapStringInt32!==util.emptyObject){
                        for(var ks=Object.keys(m.mapStringInt32),i=0;i<ks.length;++i){
                            w.uint32(18).fork().uint32(10).string(ks[i])
                            w.uint32(16).int32(m.mapStringInt32[ks[i]])
                            w.ldelim()
                        }
                    }
                    if(m.mapStringInt64&&m.mapStringInt64!==util.emptyObject){
                        for(var ks=Object.keys(m.mapStringInt64),i=0;i<ks.length;++i){
                            w.uint32(26).fork().uint32(10).string(ks[i])
                            w.uint32(16).int64(m.mapStringInt64[ks[i]])
                            w.ldelim()
                        }
                    }
                    if(m.mapStringBool&&m.mapStringBool!==util.emptyObject){
                        for(var ks=Object.keys(m.mapStringBool),i=0;i<ks.length;++i){
                            w.uint32(34).fork().uint32(10).string(ks[i])
                            w.uint32(16).bool(m.mapStringBool[ks[i]])
                            w.ldelim()
                        }
                    }
                    if(m.mapStringDouble&&m.mapStringDouble!==util.emptyObject){
                        for(var ks=Object.keys(m.mapStringDouble),i=0;i<ks.length;++i){
                            w.uint32(42).fork().uint32(10).string(ks[i])
                            w.uint32(17).double(m.mapStringDouble[ks[i]])
                            w.ldelim()
                        }
                    }
                    if(m.mapStringEnum&&m.mapStringEnum!==util.emptyObject){
                        for(var ks=Object.keys(m.mapStringEnum),i=0;i<ks.length;++i){
                            w.uint32(50).fork().uint32(10).string(ks[i])
                            w.uint32(16).uint32(m.mapStringEnum[ks[i]])
                            w.ldelim()
                        }
                    }
                    if(m.mapStringMsg&&m.mapStringMsg!==util.emptyObject){
                        for(var ks=Object.keys(m.mapStringMsg),i=0;i<ks.length;++i){
                            w.uint32(58).fork().uint32(10).string(ks[i])
                            types[6].encode(m.mapStringMsg[ks[i]],w.uint32(18).fork()).ldelim()
                            w.ldelim()
                        }
                    }
                    if(m.mapInt32String&&m.mapInt32String!==util.emptyObject){
                        for(var ks=Object.keys(m.mapInt32String),i=0;i<ks.length;++i){
                            w.uint32(66).fork().uint32(8).int32(ks[i])
                            w.uint32(18).string(m.mapInt32String[ks[i]])
                            w.ldelim()
                        }
                    }
                    if(m.mapInt64String&&m.mapInt64String!==util.emptyObject){
                        for(var ks=Object.keys(m.mapInt64String),i=0;i<ks.length;++i){
                            w.uint32(74).fork().uint32(8).int64(ks[i])
                            w.uint32(18).string(m.mapInt64String[ks[i]])
                            w.ldelim()
                        }
                    }
                    if(m.mapBoolString&&m.mapBoolString!==util.emptyObject){
                        for(var ks=Object.keys(m.mapBoolString),i=0;i<ks.length;++i){
                            w.uint32(82).fork().uint32(8).bool(ks[i])
                            w.uint32(18).string(m.mapBoolString[ks[i]])
                            w.ldelim()
                        }
                    }
                    if(m.testMapFields!==undefined&&m.testMapFields!==null)
                        types[10].encode(m.testMapFields,w.uint32(90).fork()).ldelim()
                    if(m.mapStringTestmapfields&&m.mapStringTestmapfields!==util.emptyObject){
                        for(var ks=Object.keys(m.mapStringTestmapfields),i=0;i<ks.length;++i){
                            w.uint32(98).fork().uint32(10).string(ks[i])
                            types[11].encode(m.mapStringTestmapfields[ks[i]],w.uint32(18).fork()).ldelim()
                            w.ldelim()
                        }
                    }
                    return w
                }
                /* eslint-enable */
            })();

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
            TestMapFieldsNoBinary.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,"jspb.test.MapValueEnumNoBinary","jspb.test.MapValueMessageNoBinary",null,null,null,"jspb.test.TestMapFieldsNoBinary","jspb.test.TestMapFieldsNoBinary"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.TestMapFieldsNoBinary
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                r.skip().pos++
                                if(m.mapStringString===util.emptyObject)
                                    m.mapStringString={}
                                var k=r.string()
                                if(typeof k==="object")
                                    k=util.longToHash(k)
                                r.pos++
                                m.mapStringString[k]=r.string()
                                break
                            case 2:
                                r.skip().pos++
                                if(m.mapStringInt32===util.emptyObject)
                                    m.mapStringInt32={}
                                var k=r.string()
                                if(typeof k==="object")
                                    k=util.longToHash(k)
                                r.pos++
                                m.mapStringInt32[k]=r.int32()
                                break
                            case 3:
                                r.skip().pos++
                                if(m.mapStringInt64===util.emptyObject)
                                    m.mapStringInt64={}
                                var k=r.string()
                                if(typeof k==="object")
                                    k=util.longToHash(k)
                                r.pos++
                                m.mapStringInt64[k]=r.int64()
                                break
                            case 4:
                                r.skip().pos++
                                if(m.mapStringBool===util.emptyObject)
                                    m.mapStringBool={}
                                var k=r.string()
                                if(typeof k==="object")
                                    k=util.longToHash(k)
                                r.pos++
                                m.mapStringBool[k]=r.bool()
                                break
                            case 5:
                                r.skip().pos++
                                if(m.mapStringDouble===util.emptyObject)
                                    m.mapStringDouble={}
                                var k=r.string()
                                if(typeof k==="object")
                                    k=util.longToHash(k)
                                r.pos++
                                m.mapStringDouble[k]=r.double()
                                break
                            case 6:
                                r.skip().pos++
                                if(m.mapStringEnum===util.emptyObject)
                                    m.mapStringEnum={}
                                var k=r.string()
                                if(typeof k==="object")
                                    k=util.longToHash(k)
                                r.pos++
                                m.mapStringEnum[k]=r.uint32()
                                break
                            case 7:
                                r.skip().pos++
                                if(m.mapStringMsg===util.emptyObject)
                                    m.mapStringMsg={}
                                var k=r.string()
                                if(typeof k==="object")
                                    k=util.longToHash(k)
                                r.pos++
                                m.mapStringMsg[k]=types[6].decode(r,r.uint32())
                                break
                            case 8:
                                r.skip().pos++
                                if(m.mapInt32String===util.emptyObject)
                                    m.mapInt32String={}
                                var k=r.int32()
                                if(typeof k==="object")
                                    k=util.longToHash(k)
                                r.pos++
                                m.mapInt32String[k]=r.string()
                                break
                            case 9:
                                r.skip().pos++
                                if(m.mapInt64String===util.emptyObject)
                                    m.mapInt64String={}
                                var k=r.int64()
                                if(typeof k==="object")
                                    k=util.longToHash(k)
                                r.pos++
                                m.mapInt64String[k]=r.string()
                                break
                            case 10:
                                r.skip().pos++
                                if(m.mapBoolString===util.emptyObject)
                                    m.mapBoolString={}
                                var k=r.bool()
                                if(typeof k==="object")
                                    k=util.longToHash(k)
                                r.pos++
                                m.mapBoolString[k]=r.string()
                                break
                            case 11:
                                m.testMapFields=types[10].decode(r,r.uint32())
                                break
                            case 12:
                                r.skip().pos++
                                if(m.mapStringTestmapfields===util.emptyObject)
                                    m.mapStringTestmapfields={}
                                var k=r.string()
                                if(typeof k==="object")
                                    k=util.longToHash(k)
                                r.pos++
                                m.mapStringTestmapfields[k]=types[11].decode(r,r.uint32())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            TestMapFieldsNoBinary.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,"jspb.test.MapValueEnumNoBinary","jspb.test.MapValueMessageNoBinary",null,null,null,"jspb.test.TestMapFieldsNoBinary","jspb.test.TestMapFieldsNoBinary"]);
                return function verify(m) {
                    if(m.mapStringString!==undefined){
                        if(!util.isObject(m.mapStringString))
                            return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringString (object expected)"
                        var k=Object.keys(m.mapStringString)
                        for(var i=0;i<k.length;++i){
                            if(!util.isString(m.mapStringString[k[i]]))
                                return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringString (string{k:string} expected)"
                        }
                    }
                    if(m.mapStringInt32!==undefined){
                        if(!util.isObject(m.mapStringInt32))
                            return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringInt32 (object expected)"
                        var k=Object.keys(m.mapStringInt32)
                        for(var i=0;i<k.length;++i){
                            if(!util.isInteger(m.mapStringInt32[k[i]]))
                                return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringInt32 (integer{k:string} expected)"
                        }
                    }
                    if(m.mapStringInt64!==undefined){
                        if(!util.isObject(m.mapStringInt64))
                            return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringInt64 (object expected)"
                        var k=Object.keys(m.mapStringInt64)
                        for(var i=0;i<k.length;++i){
                            if(!util.isInteger(m.mapStringInt64[k[i]])&&!(m.mapStringInt64[k[i]]&&util.isInteger(m.mapStringInt64[k[i]].low)&&util.isInteger(m.mapStringInt64[k[i]].high)))
                                return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringInt64 (integer|Long{k:string} expected)"
                        }
                    }
                    if(m.mapStringBool!==undefined){
                        if(!util.isObject(m.mapStringBool))
                            return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringBool (object expected)"
                        var k=Object.keys(m.mapStringBool)
                        for(var i=0;i<k.length;++i){
                            if(typeof m.mapStringBool[k[i]]!=="boolean")
                                return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringBool (boolean{k:string} expected)"
                        }
                    }
                    if(m.mapStringDouble!==undefined){
                        if(!util.isObject(m.mapStringDouble))
                            return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringDouble (object expected)"
                        var k=Object.keys(m.mapStringDouble)
                        for(var i=0;i<k.length;++i){
                            if(typeof m.mapStringDouble[k[i]]!=="number")
                                return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringDouble (number{k:string} expected)"
                        }
                    }
                    if(m.mapStringEnum!==undefined){
                        if(!util.isObject(m.mapStringEnum))
                            return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringEnum (object expected)"
                        var k=Object.keys(m.mapStringEnum)
                        for(var i=0;i<k.length;++i){
                            switch(m.mapStringEnum[k[i]]){
                                default:
                                    return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringEnum (enum value{k:string} expected)"
                                case 0:
                                case 1:
                                case 2:
                                    break
                            }
                        }
                    }
                    if(m.mapStringMsg!==undefined){
                        if(!util.isObject(m.mapStringMsg))
                            return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringMsg (object expected)"
                        var k=Object.keys(m.mapStringMsg)
                        for(var i=0;i<k.length;++i){
                            var r;
                            if(r=types[6].verify(m.mapStringMsg[k[i]]))
                                return r
                        }
                    }
                    if(m.mapInt32String!==undefined){
                        if(!util.isObject(m.mapInt32String))
                            return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt32String (object expected)"
                        var k=Object.keys(m.mapInt32String)
                        for(var i=0;i<k.length;++i){
                            if(!/^-?(?:0|[1-9]\d*)$/.test(k[i]))
                                return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt32String (integer key{k:int32} expected)"
                            if(!util.isString(m.mapInt32String[k[i]]))
                                return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt32String (string{k:int32} expected)"
                        }
                    }
                    if(m.mapInt64String!==undefined){
                        if(!util.isObject(m.mapInt64String))
                            return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt64String (object expected)"
                        var k=Object.keys(m.mapInt64String)
                        for(var i=0;i<k.length;++i){
                            if(!/^(?:[\x00-\xff]{8}|-?(?:0|[1-9]\d*))$/.test(k[i]))
                                return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt64String (integer|Long key{k:int64} expected)"
                            if(!util.isString(m.mapInt64String[k[i]]))
                                return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapInt64String (string{k:int64} expected)"
                        }
                    }
                    if(m.mapBoolString!==undefined){
                        if(!util.isObject(m.mapBoolString))
                            return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapBoolString (object expected)"
                        var k=Object.keys(m.mapBoolString)
                        for(var i=0;i<k.length;++i){
                            if(!/^true|false|0|1$/.test(k[i]))
                                return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapBoolString (boolean key{k:bool} expected)"
                            if(!util.isString(m.mapBoolString[k[i]]))
                                return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapBoolString (string{k:bool} expected)"
                        }
                    }
                    if(m.testMapFields!==undefined&&m.testMapFields!==null){
                        var r;
                        if(r=types[10].verify(m.testMapFields))
                            return r
                    }
                    if(m.mapStringTestmapfields!==undefined){
                        if(!util.isObject(m.mapStringTestmapfields))
                            return"invalid value for field .jspb.test.TestMapFieldsNoBinary.mapStringTestmapfields (object expected)"
                        var k=Object.keys(m.mapStringTestmapfields)
                        for(var i=0;i<k.length;++i){
                            var r;
                            if(r=types[11].verify(m.mapStringTestmapfields[k[i]]))
                                return r
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            MapValueMessageNoBinary.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.foo!==undefined&&m.foo!==0)
                        w.uint32(8).int32(m.foo)
                    return w
                }
                /* eslint-enable */
            })();

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
            MapValueMessageNoBinary.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.MapValueMessageNoBinary
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.foo=r.int32()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            MapValueMessageNoBinary.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null]);
                return function verify(m) {
                    if(m.foo!==undefined){
                        if(!util.isInteger(m.foo))
                            return"invalid value for field .jspb.test.MapValueMessageNoBinary.foo (integer expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            Deeply.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    return w
                }
                /* eslint-enable */
            })();

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
            Deeply.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.Deeply
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            Deeply.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = []);
                return function verify(m) {
                    return null
                }
                /* eslint-enable */
            })();

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
                Nested.encode = (function() {
                    /* eslint-disable */
                    var Writer = $protobuf.Writer;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = []);
                    return function encode(m, w) {
                        w||(w=Writer.create())
                        return w
                    }
                    /* eslint-enable */
                })();

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
                Nested.decode = (function() {
                    /* eslint-disable */
                    var Reader = $protobuf.Reader;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = []);
                    return function decode(r, l) {
                        r instanceof Reader||(r=Reader.create(r))
                        var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.Deeply.Nested
                        while(r.pos<c){
                            var t=r.uint32()
                            switch(t>>>3){
                                default:
                                    r.skipType(t&7)
                                    break
                            }
                        }
                        return m
                    }
                    /* eslint-enable */
                })();

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
                Nested.verify = (function() {
                    /* eslint-disable */
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = []);
                    return function verify(m) {
                        return null
                    }
                    /* eslint-enable */
                })();

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
                    Message.encode = (function() {
                        /* eslint-disable */
                        var Writer = $protobuf.Writer;
                        var util = $protobuf.util;
                        var types; $lazyTypes.push(types = [null]);
                        return function encode(m, w) {
                            w||(w=Writer.create())
                            if(m.count!==undefined&&m.count!==0)
                                w.uint32(8).int32(m.count)
                            return w
                        }
                        /* eslint-enable */
                    })();

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
                    Message.decode = (function() {
                        /* eslint-disable */
                        var Reader = $protobuf.Reader;
                        var util = $protobuf.util;
                        var types; $lazyTypes.push(types = [null]);
                        return function decode(r, l) {
                            r instanceof Reader||(r=Reader.create(r))
                            var c=l===undefined?r.len:r.pos+l,m=new $root.jspb.test.Deeply.Nested.Message
                            while(r.pos<c){
                                var t=r.uint32()
                                switch(t>>>3){
                                    case 1:
                                        m.count=r.int32()
                                        break
                                    default:
                                        r.skipType(t&7)
                                        break
                                }
                            }
                            return m
                        }
                        /* eslint-enable */
                    })();

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
                    Message.verify = (function() {
                        /* eslint-disable */
                        var util = $protobuf.util;
                        var types; $lazyTypes.push(types = [null]);
                        return function verify(m) {
                            if(m.count!==undefined){
                                if(!util.isInteger(m.count))
                                    return"invalid value for field .jspb.test.Deeply.Nested.Message.count (integer expected)"
                            }
                            return null
                        }
                        /* eslint-enable */
                    })();

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
            FileDescriptorSet.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.FileDescriptorProto"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.file)
                        for(var i=0;i<m.file.length;++i)
                        types[0].encode(m.file[i],w.uint32(10).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            FileDescriptorSet.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.FileDescriptorProto"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.FileDescriptorSet
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.file&&m.file.length||(m.file=[])
                                m.file.push(types[0].decode(r,r.uint32()))
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            FileDescriptorSet.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.FileDescriptorProto"]);
                return function verify(m) {
                    if(m.file!==undefined){
                        if(!Array.isArray(m.file))
                            return"invalid value for field .google.protobuf.FileDescriptorSet.file (array expected)"
                        for(var i=0;i<m.file.length;++i){
                            var r;
                            if(r=types[0].verify(m.file[i]))
                                return r
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            FileDescriptorProto.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,"google.protobuf.DescriptorProto","google.protobuf.EnumDescriptorProto","google.protobuf.ServiceDescriptorProto","google.protobuf.FieldDescriptorProto","google.protobuf.FileOptions","google.protobuf.SourceCodeInfo",null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.name!==undefined&&m.name!=="")
                        w.uint32(10).string(m.name)
                    if(m["package"]!==undefined&&m["package"]!=="")
                        w.uint32(18).string(m["package"])
                    if(m.dependency)
                        for(var i=0;i<m.dependency.length;++i)
                        w.uint32(26).string(m.dependency[i])
                    if(m.publicDependency)
                        for(var i=0;i<m.publicDependency.length;++i)
                        w.uint32(80).int32(m.publicDependency[i])
                    if(m.weakDependency)
                        for(var i=0;i<m.weakDependency.length;++i)
                        w.uint32(88).int32(m.weakDependency[i])
                    if(m.messageType)
                        for(var i=0;i<m.messageType.length;++i)
                        types[5].encode(m.messageType[i],w.uint32(34).fork()).ldelim()
                    if(m.enumType)
                        for(var i=0;i<m.enumType.length;++i)
                        types[6].encode(m.enumType[i],w.uint32(42).fork()).ldelim()
                    if(m.service)
                        for(var i=0;i<m.service.length;++i)
                        types[7].encode(m.service[i],w.uint32(50).fork()).ldelim()
                    if(m.extension)
                        for(var i=0;i<m.extension.length;++i)
                        types[8].encode(m.extension[i],w.uint32(58).fork()).ldelim()
                    if(m.options!==undefined&&m.options!==null)
                        types[9].encode(m.options,w.uint32(66).fork()).ldelim()
                    if(m.sourceCodeInfo!==undefined&&m.sourceCodeInfo!==null)
                        types[10].encode(m.sourceCodeInfo,w.uint32(74).fork()).ldelim()
                    if(m.syntax!==undefined&&m.syntax!=="")
                        w.uint32(98).string(m.syntax)
                    return w
                }
                /* eslint-enable */
            })();

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
            FileDescriptorProto.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,"google.protobuf.DescriptorProto","google.protobuf.EnumDescriptorProto","google.protobuf.ServiceDescriptorProto","google.protobuf.FieldDescriptorProto","google.protobuf.FileOptions","google.protobuf.SourceCodeInfo",null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.FileDescriptorProto
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.name=r.string()
                                break
                            case 2:
                                m["package"]=r.string()
                                break
                            case 3:
                                m.dependency&&m.dependency.length||(m.dependency=[])
                                m.dependency.push(r.string())
                                break
                            case 10:
                                m.publicDependency&&m.publicDependency.length||(m.publicDependency=[])
                                m.publicDependency.push(r.int32())
                                break
                            case 11:
                                m.weakDependency&&m.weakDependency.length||(m.weakDependency=[])
                                m.weakDependency.push(r.int32())
                                break
                            case 4:
                                m.messageType&&m.messageType.length||(m.messageType=[])
                                m.messageType.push(types[5].decode(r,r.uint32()))
                                break
                            case 5:
                                m.enumType&&m.enumType.length||(m.enumType=[])
                                m.enumType.push(types[6].decode(r,r.uint32()))
                                break
                            case 6:
                                m.service&&m.service.length||(m.service=[])
                                m.service.push(types[7].decode(r,r.uint32()))
                                break
                            case 7:
                                m.extension&&m.extension.length||(m.extension=[])
                                m.extension.push(types[8].decode(r,r.uint32()))
                                break
                            case 8:
                                m.options=types[9].decode(r,r.uint32())
                                break
                            case 9:
                                m.sourceCodeInfo=types[10].decode(r,r.uint32())
                                break
                            case 12:
                                m.syntax=r.string()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            FileDescriptorProto.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,"google.protobuf.DescriptorProto","google.protobuf.EnumDescriptorProto","google.protobuf.ServiceDescriptorProto","google.protobuf.FieldDescriptorProto","google.protobuf.FileOptions","google.protobuf.SourceCodeInfo",null]);
                return function verify(m) {
                    if(m.name!==undefined){
                        if(!util.isString(m.name))
                            return"invalid value for field .google.protobuf.FileDescriptorProto.name (string expected)"
                    }
                    if(m["package"]!==undefined){
                        if(!util.isString(m["package"]))
                            return"invalid value for field .google.protobuf.FileDescriptorProto.package (string expected)"
                    }
                    if(m.dependency!==undefined){
                        if(!Array.isArray(m.dependency))
                            return"invalid value for field .google.protobuf.FileDescriptorProto.dependency (array expected)"
                        for(var i=0;i<m.dependency.length;++i){
                            if(!util.isString(m.dependency[i]))
                                return"invalid value for field .google.protobuf.FileDescriptorProto.dependency (string[] expected)"
                        }
                    }
                    if(m.publicDependency!==undefined){
                        if(!Array.isArray(m.publicDependency))
                            return"invalid value for field .google.protobuf.FileDescriptorProto.publicDependency (array expected)"
                        for(var i=0;i<m.publicDependency.length;++i){
                            if(!util.isInteger(m.publicDependency[i]))
                                return"invalid value for field .google.protobuf.FileDescriptorProto.publicDependency (integer[] expected)"
                        }
                    }
                    if(m.weakDependency!==undefined){
                        if(!Array.isArray(m.weakDependency))
                            return"invalid value for field .google.protobuf.FileDescriptorProto.weakDependency (array expected)"
                        for(var i=0;i<m.weakDependency.length;++i){
                            if(!util.isInteger(m.weakDependency[i]))
                                return"invalid value for field .google.protobuf.FileDescriptorProto.weakDependency (integer[] expected)"
                        }
                    }
                    if(m.messageType!==undefined){
                        if(!Array.isArray(m.messageType))
                            return"invalid value for field .google.protobuf.FileDescriptorProto.messageType (array expected)"
                        for(var i=0;i<m.messageType.length;++i){
                            var r;
                            if(r=types[5].verify(m.messageType[i]))
                                return r
                        }
                    }
                    if(m.enumType!==undefined){
                        if(!Array.isArray(m.enumType))
                            return"invalid value for field .google.protobuf.FileDescriptorProto.enumType (array expected)"
                        for(var i=0;i<m.enumType.length;++i){
                            var r;
                            if(r=types[6].verify(m.enumType[i]))
                                return r
                        }
                    }
                    if(m.service!==undefined){
                        if(!Array.isArray(m.service))
                            return"invalid value for field .google.protobuf.FileDescriptorProto.service (array expected)"
                        for(var i=0;i<m.service.length;++i){
                            var r;
                            if(r=types[7].verify(m.service[i]))
                                return r
                        }
                    }
                    if(m.extension!==undefined){
                        if(!Array.isArray(m.extension))
                            return"invalid value for field .google.protobuf.FileDescriptorProto.extension (array expected)"
                        for(var i=0;i<m.extension.length;++i){
                            var r;
                            if(r=types[8].verify(m.extension[i]))
                                return r
                        }
                    }
                    if(m.options!==undefined&&m.options!==null){
                        var r;
                        if(r=types[9].verify(m.options))
                            return r
                    }
                    if(m.sourceCodeInfo!==undefined&&m.sourceCodeInfo!==null){
                        var r;
                        if(r=types[10].verify(m.sourceCodeInfo))
                            return r
                    }
                    if(m.syntax!==undefined){
                        if(!util.isString(m.syntax))
                            return"invalid value for field .google.protobuf.FileDescriptorProto.syntax (string expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            DescriptorProto.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.FieldDescriptorProto","google.protobuf.FieldDescriptorProto","google.protobuf.DescriptorProto","google.protobuf.EnumDescriptorProto","google.protobuf.DescriptorProto.ExtensionRange","google.protobuf.OneofDescriptorProto","google.protobuf.MessageOptions","google.protobuf.DescriptorProto.ReservedRange",null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.name!==undefined&&m.name!=="")
                        w.uint32(10).string(m.name)
                    if(m.field)
                        for(var i=0;i<m.field.length;++i)
                        types[1].encode(m.field[i],w.uint32(18).fork()).ldelim()
                    if(m.extension)
                        for(var i=0;i<m.extension.length;++i)
                        types[2].encode(m.extension[i],w.uint32(50).fork()).ldelim()
                    if(m.nestedType)
                        for(var i=0;i<m.nestedType.length;++i)
                        types[3].encode(m.nestedType[i],w.uint32(26).fork()).ldelim()
                    if(m.enumType)
                        for(var i=0;i<m.enumType.length;++i)
                        types[4].encode(m.enumType[i],w.uint32(34).fork()).ldelim()
                    if(m.extensionRange)
                        for(var i=0;i<m.extensionRange.length;++i)
                        types[5].encode(m.extensionRange[i],w.uint32(42).fork()).ldelim()
                    if(m.oneofDecl)
                        for(var i=0;i<m.oneofDecl.length;++i)
                        types[6].encode(m.oneofDecl[i],w.uint32(66).fork()).ldelim()
                    if(m.options!==undefined&&m.options!==null)
                        types[7].encode(m.options,w.uint32(58).fork()).ldelim()
                    if(m.reservedRange)
                        for(var i=0;i<m.reservedRange.length;++i)
                        types[8].encode(m.reservedRange[i],w.uint32(74).fork()).ldelim()
                    if(m.reservedName)
                        for(var i=0;i<m.reservedName.length;++i)
                        w.uint32(82).string(m.reservedName[i])
                    return w
                }
                /* eslint-enable */
            })();

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
            DescriptorProto.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.FieldDescriptorProto","google.protobuf.FieldDescriptorProto","google.protobuf.DescriptorProto","google.protobuf.EnumDescriptorProto","google.protobuf.DescriptorProto.ExtensionRange","google.protobuf.OneofDescriptorProto","google.protobuf.MessageOptions","google.protobuf.DescriptorProto.ReservedRange",null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.DescriptorProto
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.name=r.string()
                                break
                            case 2:
                                m.field&&m.field.length||(m.field=[])
                                m.field.push(types[1].decode(r,r.uint32()))
                                break
                            case 6:
                                m.extension&&m.extension.length||(m.extension=[])
                                m.extension.push(types[2].decode(r,r.uint32()))
                                break
                            case 3:
                                m.nestedType&&m.nestedType.length||(m.nestedType=[])
                                m.nestedType.push(types[3].decode(r,r.uint32()))
                                break
                            case 4:
                                m.enumType&&m.enumType.length||(m.enumType=[])
                                m.enumType.push(types[4].decode(r,r.uint32()))
                                break
                            case 5:
                                m.extensionRange&&m.extensionRange.length||(m.extensionRange=[])
                                m.extensionRange.push(types[5].decode(r,r.uint32()))
                                break
                            case 8:
                                m.oneofDecl&&m.oneofDecl.length||(m.oneofDecl=[])
                                m.oneofDecl.push(types[6].decode(r,r.uint32()))
                                break
                            case 7:
                                m.options=types[7].decode(r,r.uint32())
                                break
                            case 9:
                                m.reservedRange&&m.reservedRange.length||(m.reservedRange=[])
                                m.reservedRange.push(types[8].decode(r,r.uint32()))
                                break
                            case 10:
                                m.reservedName&&m.reservedName.length||(m.reservedName=[])
                                m.reservedName.push(r.string())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            DescriptorProto.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.FieldDescriptorProto","google.protobuf.FieldDescriptorProto","google.protobuf.DescriptorProto","google.protobuf.EnumDescriptorProto","google.protobuf.DescriptorProto.ExtensionRange","google.protobuf.OneofDescriptorProto","google.protobuf.MessageOptions","google.protobuf.DescriptorProto.ReservedRange",null]);
                return function verify(m) {
                    if(m.name!==undefined){
                        if(!util.isString(m.name))
                            return"invalid value for field .google.protobuf.DescriptorProto.name (string expected)"
                    }
                    if(m.field!==undefined){
                        if(!Array.isArray(m.field))
                            return"invalid value for field .google.protobuf.DescriptorProto.field (array expected)"
                        for(var i=0;i<m.field.length;++i){
                            var r;
                            if(r=types[1].verify(m.field[i]))
                                return r
                        }
                    }
                    if(m.extension!==undefined){
                        if(!Array.isArray(m.extension))
                            return"invalid value for field .google.protobuf.DescriptorProto.extension (array expected)"
                        for(var i=0;i<m.extension.length;++i){
                            var r;
                            if(r=types[2].verify(m.extension[i]))
                                return r
                        }
                    }
                    if(m.nestedType!==undefined){
                        if(!Array.isArray(m.nestedType))
                            return"invalid value for field .google.protobuf.DescriptorProto.nestedType (array expected)"
                        for(var i=0;i<m.nestedType.length;++i){
                            var r;
                            if(r=types[3].verify(m.nestedType[i]))
                                return r
                        }
                    }
                    if(m.enumType!==undefined){
                        if(!Array.isArray(m.enumType))
                            return"invalid value for field .google.protobuf.DescriptorProto.enumType (array expected)"
                        for(var i=0;i<m.enumType.length;++i){
                            var r;
                            if(r=types[4].verify(m.enumType[i]))
                                return r
                        }
                    }
                    if(m.extensionRange!==undefined){
                        if(!Array.isArray(m.extensionRange))
                            return"invalid value for field .google.protobuf.DescriptorProto.extensionRange (array expected)"
                        for(var i=0;i<m.extensionRange.length;++i){
                            var r;
                            if(r=types[5].verify(m.extensionRange[i]))
                                return r
                        }
                    }
                    if(m.oneofDecl!==undefined){
                        if(!Array.isArray(m.oneofDecl))
                            return"invalid value for field .google.protobuf.DescriptorProto.oneofDecl (array expected)"
                        for(var i=0;i<m.oneofDecl.length;++i){
                            var r;
                            if(r=types[6].verify(m.oneofDecl[i]))
                                return r
                        }
                    }
                    if(m.options!==undefined&&m.options!==null){
                        var r;
                        if(r=types[7].verify(m.options))
                            return r
                    }
                    if(m.reservedRange!==undefined){
                        if(!Array.isArray(m.reservedRange))
                            return"invalid value for field .google.protobuf.DescriptorProto.reservedRange (array expected)"
                        for(var i=0;i<m.reservedRange.length;++i){
                            var r;
                            if(r=types[8].verify(m.reservedRange[i]))
                                return r
                        }
                    }
                    if(m.reservedName!==undefined){
                        if(!Array.isArray(m.reservedName))
                            return"invalid value for field .google.protobuf.DescriptorProto.reservedName (array expected)"
                        for(var i=0;i<m.reservedName.length;++i){
                            if(!util.isString(m.reservedName[i]))
                                return"invalid value for field .google.protobuf.DescriptorProto.reservedName (string[] expected)"
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
                ExtensionRange.encode = (function() {
                    /* eslint-disable */
                    var Writer = $protobuf.Writer;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function encode(m, w) {
                        w||(w=Writer.create())
                        if(m.start!==undefined&&m.start!==0)
                            w.uint32(8).int32(m.start)
                        if(m.end!==undefined&&m.end!==0)
                            w.uint32(16).int32(m.end)
                        return w
                    }
                    /* eslint-enable */
                })();

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
                ExtensionRange.decode = (function() {
                    /* eslint-disable */
                    var Reader = $protobuf.Reader;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function decode(r, l) {
                        r instanceof Reader||(r=Reader.create(r))
                        var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.DescriptorProto.ExtensionRange
                        while(r.pos<c){
                            var t=r.uint32()
                            switch(t>>>3){
                                case 1:
                                    m.start=r.int32()
                                    break
                                case 2:
                                    m.end=r.int32()
                                    break
                                default:
                                    r.skipType(t&7)
                                    break
                            }
                        }
                        return m
                    }
                    /* eslint-enable */
                })();

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
                ExtensionRange.verify = (function() {
                    /* eslint-disable */
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function verify(m) {
                        if(m.start!==undefined){
                            if(!util.isInteger(m.start))
                                return"invalid value for field .google.protobuf.DescriptorProto.ExtensionRange.start (integer expected)"
                        }
                        if(m.end!==undefined){
                            if(!util.isInteger(m.end))
                                return"invalid value for field .google.protobuf.DescriptorProto.ExtensionRange.end (integer expected)"
                        }
                        return null
                    }
                    /* eslint-enable */
                })();

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
                ReservedRange.encode = (function() {
                    /* eslint-disable */
                    var Writer = $protobuf.Writer;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function encode(m, w) {
                        w||(w=Writer.create())
                        if(m.start!==undefined&&m.start!==0)
                            w.uint32(8).int32(m.start)
                        if(m.end!==undefined&&m.end!==0)
                            w.uint32(16).int32(m.end)
                        return w
                    }
                    /* eslint-enable */
                })();

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
                ReservedRange.decode = (function() {
                    /* eslint-disable */
                    var Reader = $protobuf.Reader;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function decode(r, l) {
                        r instanceof Reader||(r=Reader.create(r))
                        var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.DescriptorProto.ReservedRange
                        while(r.pos<c){
                            var t=r.uint32()
                            switch(t>>>3){
                                case 1:
                                    m.start=r.int32()
                                    break
                                case 2:
                                    m.end=r.int32()
                                    break
                                default:
                                    r.skipType(t&7)
                                    break
                            }
                        }
                        return m
                    }
                    /* eslint-enable */
                })();

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
                ReservedRange.verify = (function() {
                    /* eslint-disable */
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function verify(m) {
                        if(m.start!==undefined){
                            if(!util.isInteger(m.start))
                                return"invalid value for field .google.protobuf.DescriptorProto.ReservedRange.start (integer expected)"
                        }
                        if(m.end!==undefined){
                            if(!util.isInteger(m.end))
                                return"invalid value for field .google.protobuf.DescriptorProto.ReservedRange.end (integer expected)"
                        }
                        return null
                    }
                    /* eslint-enable */
                })();

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
            FieldDescriptorProto.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"google.protobuf.FieldDescriptorProto.Label","google.protobuf.FieldDescriptorProto.Type",null,null,null,null,null,"google.protobuf.FieldOptions"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.name!==undefined&&m.name!=="")
                        w.uint32(10).string(m.name)
                    if(m.number!==undefined&&m.number!==0)
                        w.uint32(24).int32(m.number)
                    if(m.label!==undefined&&m.label!==0)
                        w.uint32(32).uint32(m.label)
                    if(m.type!==undefined&&m.type!==0)
                        w.uint32(40).uint32(m.type)
                    if(m.typeName!==undefined&&m.typeName!=="")
                        w.uint32(50).string(m.typeName)
                    if(m.extendee!==undefined&&m.extendee!=="")
                        w.uint32(18).string(m.extendee)
                    if(m.defaultValue!==undefined&&m.defaultValue!=="")
                        w.uint32(58).string(m.defaultValue)
                    if(m.oneofIndex!==undefined&&m.oneofIndex!==0)
                        w.uint32(72).int32(m.oneofIndex)
                    if(m.jsonName!==undefined&&m.jsonName!=="")
                        w.uint32(82).string(m.jsonName)
                    if(m.options!==undefined&&m.options!==null)
                        types[9].encode(m.options,w.uint32(66).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            FieldDescriptorProto.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"google.protobuf.FieldDescriptorProto.Label","google.protobuf.FieldDescriptorProto.Type",null,null,null,null,null,"google.protobuf.FieldOptions"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.FieldDescriptorProto
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.name=r.string()
                                break
                            case 3:
                                m.number=r.int32()
                                break
                            case 4:
                                m.label=r.uint32()
                                break
                            case 5:
                                m.type=r.uint32()
                                break
                            case 6:
                                m.typeName=r.string()
                                break
                            case 2:
                                m.extendee=r.string()
                                break
                            case 7:
                                m.defaultValue=r.string()
                                break
                            case 9:
                                m.oneofIndex=r.int32()
                                break
                            case 10:
                                m.jsonName=r.string()
                                break
                            case 8:
                                m.options=types[9].decode(r,r.uint32())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            FieldDescriptorProto.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"google.protobuf.FieldDescriptorProto.Label","google.protobuf.FieldDescriptorProto.Type",null,null,null,null,null,"google.protobuf.FieldOptions"]);
                return function verify(m) {
                    if(m.name!==undefined){
                        if(!util.isString(m.name))
                            return"invalid value for field .google.protobuf.FieldDescriptorProto.name (string expected)"
                    }
                    if(m.number!==undefined){
                        if(!util.isInteger(m.number))
                            return"invalid value for field .google.protobuf.FieldDescriptorProto.number (integer expected)"
                    }
                    if(m.label!==undefined){
                        switch(m.label){
                            default:
                                return"invalid value for field .google.protobuf.FieldDescriptorProto.label (enum value expected)"
                            case 1:
                            case 2:
                            case 3:
                                break
                        }
                    }
                    if(m.type!==undefined){
                        switch(m.type){
                            default:
                                return"invalid value for field .google.protobuf.FieldDescriptorProto.type (enum value expected)"
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
                    if(m.typeName!==undefined){
                        if(!util.isString(m.typeName))
                            return"invalid value for field .google.protobuf.FieldDescriptorProto.typeName (string expected)"
                    }
                    if(m.extendee!==undefined){
                        if(!util.isString(m.extendee))
                            return"invalid value for field .google.protobuf.FieldDescriptorProto.extendee (string expected)"
                    }
                    if(m.defaultValue!==undefined){
                        if(!util.isString(m.defaultValue))
                            return"invalid value for field .google.protobuf.FieldDescriptorProto.defaultValue (string expected)"
                    }
                    if(m.oneofIndex!==undefined){
                        if(!util.isInteger(m.oneofIndex))
                            return"invalid value for field .google.protobuf.FieldDescriptorProto.oneofIndex (integer expected)"
                    }
                    if(m.jsonName!==undefined){
                        if(!util.isString(m.jsonName))
                            return"invalid value for field .google.protobuf.FieldDescriptorProto.jsonName (string expected)"
                    }
                    if(m.options!==undefined&&m.options!==null){
                        var r;
                        if(r=types[9].verify(m.options))
                            return r
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            OneofDescriptorProto.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.OneofOptions"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.name!==undefined&&m.name!=="")
                        w.uint32(10).string(m.name)
                    if(m.options!==undefined&&m.options!==null)
                        types[1].encode(m.options,w.uint32(18).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            OneofDescriptorProto.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.OneofOptions"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.OneofDescriptorProto
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.name=r.string()
                                break
                            case 2:
                                m.options=types[1].decode(r,r.uint32())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            OneofDescriptorProto.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.OneofOptions"]);
                return function verify(m) {
                    if(m.name!==undefined){
                        if(!util.isString(m.name))
                            return"invalid value for field .google.protobuf.OneofDescriptorProto.name (string expected)"
                    }
                    if(m.options!==undefined&&m.options!==null){
                        var r;
                        if(r=types[1].verify(m.options))
                            return r
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            EnumDescriptorProto.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.EnumValueDescriptorProto","google.protobuf.EnumOptions"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.name!==undefined&&m.name!=="")
                        w.uint32(10).string(m.name)
                    if(m.value)
                        for(var i=0;i<m.value.length;++i)
                        types[1].encode(m.value[i],w.uint32(18).fork()).ldelim()
                    if(m.options!==undefined&&m.options!==null)
                        types[2].encode(m.options,w.uint32(26).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            EnumDescriptorProto.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.EnumValueDescriptorProto","google.protobuf.EnumOptions"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.EnumDescriptorProto
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.name=r.string()
                                break
                            case 2:
                                m.value&&m.value.length||(m.value=[])
                                m.value.push(types[1].decode(r,r.uint32()))
                                break
                            case 3:
                                m.options=types[2].decode(r,r.uint32())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            EnumDescriptorProto.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.EnumValueDescriptorProto","google.protobuf.EnumOptions"]);
                return function verify(m) {
                    if(m.name!==undefined){
                        if(!util.isString(m.name))
                            return"invalid value for field .google.protobuf.EnumDescriptorProto.name (string expected)"
                    }
                    if(m.value!==undefined){
                        if(!Array.isArray(m.value))
                            return"invalid value for field .google.protobuf.EnumDescriptorProto.value (array expected)"
                        for(var i=0;i<m.value.length;++i){
                            var r;
                            if(r=types[1].verify(m.value[i]))
                                return r
                        }
                    }
                    if(m.options!==undefined&&m.options!==null){
                        var r;
                        if(r=types[2].verify(m.options))
                            return r
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            EnumValueDescriptorProto.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"google.protobuf.EnumValueOptions"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.name!==undefined&&m.name!=="")
                        w.uint32(10).string(m.name)
                    if(m.number!==undefined&&m.number!==0)
                        w.uint32(16).int32(m.number)
                    if(m.options!==undefined&&m.options!==null)
                        types[2].encode(m.options,w.uint32(26).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            EnumValueDescriptorProto.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"google.protobuf.EnumValueOptions"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.EnumValueDescriptorProto
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.name=r.string()
                                break
                            case 2:
                                m.number=r.int32()
                                break
                            case 3:
                                m.options=types[2].decode(r,r.uint32())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            EnumValueDescriptorProto.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"google.protobuf.EnumValueOptions"]);
                return function verify(m) {
                    if(m.name!==undefined){
                        if(!util.isString(m.name))
                            return"invalid value for field .google.protobuf.EnumValueDescriptorProto.name (string expected)"
                    }
                    if(m.number!==undefined){
                        if(!util.isInteger(m.number))
                            return"invalid value for field .google.protobuf.EnumValueDescriptorProto.number (integer expected)"
                    }
                    if(m.options!==undefined&&m.options!==null){
                        var r;
                        if(r=types[2].verify(m.options))
                            return r
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            ServiceDescriptorProto.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.MethodDescriptorProto","google.protobuf.ServiceOptions"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.name!==undefined&&m.name!=="")
                        w.uint32(10).string(m.name)
                    if(m.method)
                        for(var i=0;i<m.method.length;++i)
                        types[1].encode(m.method[i],w.uint32(18).fork()).ldelim()
                    if(m.options!==undefined&&m.options!==null)
                        types[2].encode(m.options,w.uint32(26).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            ServiceDescriptorProto.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.MethodDescriptorProto","google.protobuf.ServiceOptions"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.ServiceDescriptorProto
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.name=r.string()
                                break
                            case 2:
                                m.method&&m.method.length||(m.method=[])
                                m.method.push(types[1].decode(r,r.uint32()))
                                break
                            case 3:
                                m.options=types[2].decode(r,r.uint32())
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            ServiceDescriptorProto.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.MethodDescriptorProto","google.protobuf.ServiceOptions"]);
                return function verify(m) {
                    if(m.name!==undefined){
                        if(!util.isString(m.name))
                            return"invalid value for field .google.protobuf.ServiceDescriptorProto.name (string expected)"
                    }
                    if(m.method!==undefined){
                        if(!Array.isArray(m.method))
                            return"invalid value for field .google.protobuf.ServiceDescriptorProto.method (array expected)"
                        for(var i=0;i<m.method.length;++i){
                            var r;
                            if(r=types[1].verify(m.method[i]))
                                return r
                        }
                    }
                    if(m.options!==undefined&&m.options!==null){
                        var r;
                        if(r=types[2].verify(m.options))
                            return r
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            MethodDescriptorProto.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,"google.protobuf.MethodOptions",null,null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.name!==undefined&&m.name!=="")
                        w.uint32(10).string(m.name)
                    if(m.inputType!==undefined&&m.inputType!=="")
                        w.uint32(18).string(m.inputType)
                    if(m.outputType!==undefined&&m.outputType!=="")
                        w.uint32(26).string(m.outputType)
                    if(m.options!==undefined&&m.options!==null)
                        types[3].encode(m.options,w.uint32(34).fork()).ldelim()
                    if(m.clientStreaming!==undefined&&m.clientStreaming!==false)
                        w.uint32(40).bool(m.clientStreaming)
                    if(m.serverStreaming!==undefined&&m.serverStreaming!==false)
                        w.uint32(48).bool(m.serverStreaming)
                    return w
                }
                /* eslint-enable */
            })();

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
            MethodDescriptorProto.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,"google.protobuf.MethodOptions",null,null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.MethodDescriptorProto
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.name=r.string()
                                break
                            case 2:
                                m.inputType=r.string()
                                break
                            case 3:
                                m.outputType=r.string()
                                break
                            case 4:
                                m.options=types[3].decode(r,r.uint32())
                                break
                            case 5:
                                m.clientStreaming=r.bool()
                                break
                            case 6:
                                m.serverStreaming=r.bool()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            MethodDescriptorProto.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,"google.protobuf.MethodOptions",null,null]);
                return function verify(m) {
                    if(m.name!==undefined){
                        if(!util.isString(m.name))
                            return"invalid value for field .google.protobuf.MethodDescriptorProto.name (string expected)"
                    }
                    if(m.inputType!==undefined){
                        if(!util.isString(m.inputType))
                            return"invalid value for field .google.protobuf.MethodDescriptorProto.inputType (string expected)"
                    }
                    if(m.outputType!==undefined){
                        if(!util.isString(m.outputType))
                            return"invalid value for field .google.protobuf.MethodDescriptorProto.outputType (string expected)"
                    }
                    if(m.options!==undefined&&m.options!==null){
                        var r;
                        if(r=types[3].verify(m.options))
                            return r
                    }
                    if(m.clientStreaming!==undefined){
                        if(typeof m.clientStreaming!=="boolean")
                            return"invalid value for field .google.protobuf.MethodDescriptorProto.clientStreaming (boolean expected)"
                    }
                    if(m.serverStreaming!==undefined){
                        if(typeof m.serverStreaming!=="boolean")
                            return"invalid value for field .google.protobuf.MethodDescriptorProto.serverStreaming (boolean expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            FileOptions.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,"google.protobuf.FileOptions.OptimizeMode",null,null,null,null,null,null,null,null,"google.protobuf.UninterpretedOption"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.javaPackage!==undefined&&m.javaPackage!=="")
                        w.uint32(10).string(m.javaPackage)
                    if(m.javaOuterClassname!==undefined&&m.javaOuterClassname!=="")
                        w.uint32(66).string(m.javaOuterClassname)
                    if(m.javaMultipleFiles!==undefined&&m.javaMultipleFiles!==false)
                        w.uint32(80).bool(m.javaMultipleFiles)
                    if(m.javaGenerateEqualsAndHash!==undefined&&m.javaGenerateEqualsAndHash!==false)
                        w.uint32(160).bool(m.javaGenerateEqualsAndHash)
                    if(m.javaStringCheckUtf8!==undefined&&m.javaStringCheckUtf8!==false)
                        w.uint32(216).bool(m.javaStringCheckUtf8)
                    if(m.optimizeFor!==undefined&&m.optimizeFor!=="SPEED")
                        w.uint32(72).uint32(m.optimizeFor)
                    if(m.goPackage!==undefined&&m.goPackage!=="")
                        w.uint32(90).string(m.goPackage)
                    if(m.ccGenericServices!==undefined&&m.ccGenericServices!==false)
                        w.uint32(128).bool(m.ccGenericServices)
                    if(m.javaGenericServices!==undefined&&m.javaGenericServices!==false)
                        w.uint32(136).bool(m.javaGenericServices)
                    if(m.pyGenericServices!==undefined&&m.pyGenericServices!==false)
                        w.uint32(144).bool(m.pyGenericServices)
                    if(m.deprecated!==undefined&&m.deprecated!==false)
                        w.uint32(184).bool(m.deprecated)
                    if(m.ccEnableArenas!==undefined&&m.ccEnableArenas!==false)
                        w.uint32(248).bool(m.ccEnableArenas)
                    if(m.objcClassPrefix!==undefined&&m.objcClassPrefix!=="")
                        w.uint32(290).string(m.objcClassPrefix)
                    if(m.csharpNamespace!==undefined&&m.csharpNamespace!=="")
                        w.uint32(298).string(m.csharpNamespace)
                    if(m.uninterpretedOption)
                        for(var i=0;i<m.uninterpretedOption.length;++i)
                        types[14].encode(m.uninterpretedOption[i],w.uint32(7994).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            FileOptions.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,"google.protobuf.FileOptions.OptimizeMode",null,null,null,null,null,null,null,null,"google.protobuf.UninterpretedOption"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.FileOptions
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.javaPackage=r.string()
                                break
                            case 8:
                                m.javaOuterClassname=r.string()
                                break
                            case 10:
                                m.javaMultipleFiles=r.bool()
                                break
                            case 20:
                                m.javaGenerateEqualsAndHash=r.bool()
                                break
                            case 27:
                                m.javaStringCheckUtf8=r.bool()
                                break
                            case 9:
                                m.optimizeFor=r.uint32()
                                break
                            case 11:
                                m.goPackage=r.string()
                                break
                            case 16:
                                m.ccGenericServices=r.bool()
                                break
                            case 17:
                                m.javaGenericServices=r.bool()
                                break
                            case 18:
                                m.pyGenericServices=r.bool()
                                break
                            case 23:
                                m.deprecated=r.bool()
                                break
                            case 31:
                                m.ccEnableArenas=r.bool()
                                break
                            case 36:
                                m.objcClassPrefix=r.string()
                                break
                            case 37:
                                m.csharpNamespace=r.string()
                                break
                            case 999:
                                m.uninterpretedOption&&m.uninterpretedOption.length||(m.uninterpretedOption=[])
                                m.uninterpretedOption.push(types[14].decode(r,r.uint32()))
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            FileOptions.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,"google.protobuf.FileOptions.OptimizeMode",null,null,null,null,null,null,null,null,"google.protobuf.UninterpretedOption"]);
                return function verify(m) {
                    if(m.javaPackage!==undefined){
                        if(!util.isString(m.javaPackage))
                            return"invalid value for field .google.protobuf.FileOptions.javaPackage (string expected)"
                    }
                    if(m.javaOuterClassname!==undefined){
                        if(!util.isString(m.javaOuterClassname))
                            return"invalid value for field .google.protobuf.FileOptions.javaOuterClassname (string expected)"
                    }
                    if(m.javaMultipleFiles!==undefined){
                        if(typeof m.javaMultipleFiles!=="boolean")
                            return"invalid value for field .google.protobuf.FileOptions.javaMultipleFiles (boolean expected)"
                    }
                    if(m.javaGenerateEqualsAndHash!==undefined){
                        if(typeof m.javaGenerateEqualsAndHash!=="boolean")
                            return"invalid value for field .google.protobuf.FileOptions.javaGenerateEqualsAndHash (boolean expected)"
                    }
                    if(m.javaStringCheckUtf8!==undefined){
                        if(typeof m.javaStringCheckUtf8!=="boolean")
                            return"invalid value for field .google.protobuf.FileOptions.javaStringCheckUtf8 (boolean expected)"
                    }
                    if(m.optimizeFor!==undefined){
                        switch(m.optimizeFor){
                            default:
                                return"invalid value for field .google.protobuf.FileOptions.optimizeFor (enum value expected)"
                            case 1:
                            case 2:
                            case 3:
                                break
                        }
                    }
                    if(m.goPackage!==undefined){
                        if(!util.isString(m.goPackage))
                            return"invalid value for field .google.protobuf.FileOptions.goPackage (string expected)"
                    }
                    if(m.ccGenericServices!==undefined){
                        if(typeof m.ccGenericServices!=="boolean")
                            return"invalid value for field .google.protobuf.FileOptions.ccGenericServices (boolean expected)"
                    }
                    if(m.javaGenericServices!==undefined){
                        if(typeof m.javaGenericServices!=="boolean")
                            return"invalid value for field .google.protobuf.FileOptions.javaGenericServices (boolean expected)"
                    }
                    if(m.pyGenericServices!==undefined){
                        if(typeof m.pyGenericServices!=="boolean")
                            return"invalid value for field .google.protobuf.FileOptions.pyGenericServices (boolean expected)"
                    }
                    if(m.deprecated!==undefined){
                        if(typeof m.deprecated!=="boolean")
                            return"invalid value for field .google.protobuf.FileOptions.deprecated (boolean expected)"
                    }
                    if(m.ccEnableArenas!==undefined){
                        if(typeof m.ccEnableArenas!=="boolean")
                            return"invalid value for field .google.protobuf.FileOptions.ccEnableArenas (boolean expected)"
                    }
                    if(m.objcClassPrefix!==undefined){
                        if(!util.isString(m.objcClassPrefix))
                            return"invalid value for field .google.protobuf.FileOptions.objcClassPrefix (string expected)"
                    }
                    if(m.csharpNamespace!==undefined){
                        if(!util.isString(m.csharpNamespace))
                            return"invalid value for field .google.protobuf.FileOptions.csharpNamespace (string expected)"
                    }
                    if(m.uninterpretedOption!==undefined){
                        if(!Array.isArray(m.uninterpretedOption))
                            return"invalid value for field .google.protobuf.FileOptions.uninterpretedOption (array expected)"
                        for(var i=0;i<m.uninterpretedOption.length;++i){
                            var r;
                            if(r=types[14].verify(m.uninterpretedOption[i]))
                                return r
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            MessageOptions.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,"google.protobuf.UninterpretedOption"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.messageSetWireFormat!==undefined&&m.messageSetWireFormat!==false)
                        w.uint32(8).bool(m.messageSetWireFormat)
                    if(m.noStandardDescriptorAccessor!==undefined&&m.noStandardDescriptorAccessor!==false)
                        w.uint32(16).bool(m.noStandardDescriptorAccessor)
                    if(m.deprecated!==undefined&&m.deprecated!==false)
                        w.uint32(24).bool(m.deprecated)
                    if(m.mapEntry!==undefined&&m.mapEntry!==false)
                        w.uint32(56).bool(m.mapEntry)
                    if(m.uninterpretedOption)
                        for(var i=0;i<m.uninterpretedOption.length;++i)
                        types[4].encode(m.uninterpretedOption[i],w.uint32(7994).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            MessageOptions.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,"google.protobuf.UninterpretedOption"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.MessageOptions
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.messageSetWireFormat=r.bool()
                                break
                            case 2:
                                m.noStandardDescriptorAccessor=r.bool()
                                break
                            case 3:
                                m.deprecated=r.bool()
                                break
                            case 7:
                                m.mapEntry=r.bool()
                                break
                            case 999:
                                m.uninterpretedOption&&m.uninterpretedOption.length||(m.uninterpretedOption=[])
                                m.uninterpretedOption.push(types[4].decode(r,r.uint32()))
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            MessageOptions.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,"google.protobuf.UninterpretedOption"]);
                return function verify(m) {
                    if(m.messageSetWireFormat!==undefined){
                        if(typeof m.messageSetWireFormat!=="boolean")
                            return"invalid value for field .google.protobuf.MessageOptions.messageSetWireFormat (boolean expected)"
                    }
                    if(m.noStandardDescriptorAccessor!==undefined){
                        if(typeof m.noStandardDescriptorAccessor!=="boolean")
                            return"invalid value for field .google.protobuf.MessageOptions.noStandardDescriptorAccessor (boolean expected)"
                    }
                    if(m.deprecated!==undefined){
                        if(typeof m.deprecated!=="boolean")
                            return"invalid value for field .google.protobuf.MessageOptions.deprecated (boolean expected)"
                    }
                    if(m.mapEntry!==undefined){
                        if(typeof m.mapEntry!=="boolean")
                            return"invalid value for field .google.protobuf.MessageOptions.mapEntry (boolean expected)"
                    }
                    if(m.uninterpretedOption!==undefined){
                        if(!Array.isArray(m.uninterpretedOption))
                            return"invalid value for field .google.protobuf.MessageOptions.uninterpretedOption (array expected)"
                        for(var i=0;i<m.uninterpretedOption.length;++i){
                            var r;
                            if(r=types[4].verify(m.uninterpretedOption[i]))
                                return r
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            FieldOptions.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.FieldOptions.CType",null,"google.protobuf.FieldOptions.JSType",null,null,null,"google.protobuf.UninterpretedOption"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.ctype!==undefined&&m.ctype!=="STRING")
                        w.uint32(8).uint32(m.ctype)
                    if(m.packed!==undefined&&m.packed!==false)
                        w.uint32(16).bool(m.packed)
                    if(m.jstype!==undefined&&m.jstype!=="JS_NORMAL")
                        w.uint32(48).uint32(m.jstype)
                    if(m.lazy!==undefined&&m.lazy!==false)
                        w.uint32(40).bool(m.lazy)
                    if(m.deprecated!==undefined&&m.deprecated!==false)
                        w.uint32(24).bool(m.deprecated)
                    if(m.weak!==undefined&&m.weak!==false)
                        w.uint32(80).bool(m.weak)
                    if(m.uninterpretedOption)
                        for(var i=0;i<m.uninterpretedOption.length;++i)
                        types[6].encode(m.uninterpretedOption[i],w.uint32(7994).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            FieldOptions.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.FieldOptions.CType",null,"google.protobuf.FieldOptions.JSType",null,null,null,"google.protobuf.UninterpretedOption"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.FieldOptions
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.ctype=r.uint32()
                                break
                            case 2:
                                m.packed=r.bool()
                                break
                            case 6:
                                m.jstype=r.uint32()
                                break
                            case 5:
                                m.lazy=r.bool()
                                break
                            case 3:
                                m.deprecated=r.bool()
                                break
                            case 10:
                                m.weak=r.bool()
                                break
                            case 999:
                                m.uninterpretedOption&&m.uninterpretedOption.length||(m.uninterpretedOption=[])
                                m.uninterpretedOption.push(types[6].decode(r,r.uint32()))
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            FieldOptions.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.FieldOptions.CType",null,"google.protobuf.FieldOptions.JSType",null,null,null,"google.protobuf.UninterpretedOption"]);
                return function verify(m) {
                    if(m.ctype!==undefined){
                        switch(m.ctype){
                            default:
                                return"invalid value for field .google.protobuf.FieldOptions.ctype (enum value expected)"
                            case 0:
                            case 1:
                            case 2:
                                break
                        }
                    }
                    if(m.packed!==undefined){
                        if(typeof m.packed!=="boolean")
                            return"invalid value for field .google.protobuf.FieldOptions.packed (boolean expected)"
                    }
                    if(m.jstype!==undefined){
                        switch(m.jstype){
                            default:
                                return"invalid value for field .google.protobuf.FieldOptions.jstype (enum value expected)"
                            case 0:
                            case 1:
                            case 2:
                                break
                        }
                    }
                    if(m.lazy!==undefined){
                        if(typeof m.lazy!=="boolean")
                            return"invalid value for field .google.protobuf.FieldOptions.lazy (boolean expected)"
                    }
                    if(m.deprecated!==undefined){
                        if(typeof m.deprecated!=="boolean")
                            return"invalid value for field .google.protobuf.FieldOptions.deprecated (boolean expected)"
                    }
                    if(m.weak!==undefined){
                        if(typeof m.weak!=="boolean")
                            return"invalid value for field .google.protobuf.FieldOptions.weak (boolean expected)"
                    }
                    if(m.uninterpretedOption!==undefined){
                        if(!Array.isArray(m.uninterpretedOption))
                            return"invalid value for field .google.protobuf.FieldOptions.uninterpretedOption (array expected)"
                        for(var i=0;i<m.uninterpretedOption.length;++i){
                            var r;
                            if(r=types[6].verify(m.uninterpretedOption[i]))
                                return r
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            OneofOptions.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.UninterpretedOption"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.uninterpretedOption)
                        for(var i=0;i<m.uninterpretedOption.length;++i)
                        types[0].encode(m.uninterpretedOption[i],w.uint32(7994).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            OneofOptions.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.UninterpretedOption"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.OneofOptions
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 999:
                                m.uninterpretedOption&&m.uninterpretedOption.length||(m.uninterpretedOption=[])
                                m.uninterpretedOption.push(types[0].decode(r,r.uint32()))
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            OneofOptions.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.UninterpretedOption"]);
                return function verify(m) {
                    if(m.uninterpretedOption!==undefined){
                        if(!Array.isArray(m.uninterpretedOption))
                            return"invalid value for field .google.protobuf.OneofOptions.uninterpretedOption (array expected)"
                        for(var i=0;i<m.uninterpretedOption.length;++i){
                            var r;
                            if(r=types[0].verify(m.uninterpretedOption[i]))
                                return r
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            EnumOptions.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"google.protobuf.UninterpretedOption",null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.allowAlias!==undefined&&m.allowAlias!==false)
                        w.uint32(16).bool(m.allowAlias)
                    if(m.deprecated!==undefined&&m.deprecated!==false)
                        w.uint32(24).bool(m.deprecated)
                    if(m.uninterpretedOption)
                        for(var i=0;i<m.uninterpretedOption.length;++i)
                        types[2].encode(m.uninterpretedOption[i],w.uint32(7994).fork()).ldelim()
                    if(m[".jspb.test.IsExtension.simpleOption"]!==undefined&&m[".jspb.test.IsExtension.simpleOption"]!=="")
                        w.uint32(336904306).string(m[".jspb.test.IsExtension.simpleOption"])
                    return w
                }
                /* eslint-enable */
            })();

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
            EnumOptions.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"google.protobuf.UninterpretedOption",null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.EnumOptions
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 2:
                                m.allowAlias=r.bool()
                                break
                            case 3:
                                m.deprecated=r.bool()
                                break
                            case 999:
                                m.uninterpretedOption&&m.uninterpretedOption.length||(m.uninterpretedOption=[])
                                m.uninterpretedOption.push(types[2].decode(r,r.uint32()))
                                break
                            case 42113038:
                                m[".jspb.test.IsExtension.simpleOption"]=r.string()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            EnumOptions.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"google.protobuf.UninterpretedOption",null]);
                return function verify(m) {
                    if(m.allowAlias!==undefined){
                        if(typeof m.allowAlias!=="boolean")
                            return"invalid value for field .google.protobuf.EnumOptions.allowAlias (boolean expected)"
                    }
                    if(m.deprecated!==undefined){
                        if(typeof m.deprecated!=="boolean")
                            return"invalid value for field .google.protobuf.EnumOptions.deprecated (boolean expected)"
                    }
                    if(m.uninterpretedOption!==undefined){
                        if(!Array.isArray(m.uninterpretedOption))
                            return"invalid value for field .google.protobuf.EnumOptions.uninterpretedOption (array expected)"
                        for(var i=0;i<m.uninterpretedOption.length;++i){
                            var r;
                            if(r=types[2].verify(m.uninterpretedOption[i]))
                                return r
                        }
                    }
                    if(m[".jspb.test.IsExtension.simpleOption"]!==undefined){
                        if(!util.isString(m[".jspb.test.IsExtension.simpleOption"]))
                            return"invalid value for field .google.protobuf.EnumOptions..jspb.test.IsExtension.simpleOption (string expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            EnumValueOptions.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.UninterpretedOption"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.deprecated!==undefined&&m.deprecated!==false)
                        w.uint32(8).bool(m.deprecated)
                    if(m.uninterpretedOption)
                        for(var i=0;i<m.uninterpretedOption.length;++i)
                        types[1].encode(m.uninterpretedOption[i],w.uint32(7994).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            EnumValueOptions.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.UninterpretedOption"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.EnumValueOptions
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.deprecated=r.bool()
                                break
                            case 999:
                                m.uninterpretedOption&&m.uninterpretedOption.length||(m.uninterpretedOption=[])
                                m.uninterpretedOption.push(types[1].decode(r,r.uint32()))
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            EnumValueOptions.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.UninterpretedOption"]);
                return function verify(m) {
                    if(m.deprecated!==undefined){
                        if(typeof m.deprecated!=="boolean")
                            return"invalid value for field .google.protobuf.EnumValueOptions.deprecated (boolean expected)"
                    }
                    if(m.uninterpretedOption!==undefined){
                        if(!Array.isArray(m.uninterpretedOption))
                            return"invalid value for field .google.protobuf.EnumValueOptions.uninterpretedOption (array expected)"
                        for(var i=0;i<m.uninterpretedOption.length;++i){
                            var r;
                            if(r=types[1].verify(m.uninterpretedOption[i]))
                                return r
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            ServiceOptions.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.UninterpretedOption"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.deprecated!==undefined&&m.deprecated!==false)
                        w.uint32(264).bool(m.deprecated)
                    if(m.uninterpretedOption)
                        for(var i=0;i<m.uninterpretedOption.length;++i)
                        types[1].encode(m.uninterpretedOption[i],w.uint32(7994).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            ServiceOptions.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.UninterpretedOption"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.ServiceOptions
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 33:
                                m.deprecated=r.bool()
                                break
                            case 999:
                                m.uninterpretedOption&&m.uninterpretedOption.length||(m.uninterpretedOption=[])
                                m.uninterpretedOption.push(types[1].decode(r,r.uint32()))
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            ServiceOptions.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.UninterpretedOption"]);
                return function verify(m) {
                    if(m.deprecated!==undefined){
                        if(typeof m.deprecated!=="boolean")
                            return"invalid value for field .google.protobuf.ServiceOptions.deprecated (boolean expected)"
                    }
                    if(m.uninterpretedOption!==undefined){
                        if(!Array.isArray(m.uninterpretedOption))
                            return"invalid value for field .google.protobuf.ServiceOptions.uninterpretedOption (array expected)"
                        for(var i=0;i<m.uninterpretedOption.length;++i){
                            var r;
                            if(r=types[1].verify(m.uninterpretedOption[i]))
                                return r
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            MethodOptions.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.MethodOptions.IdempotencyLevel","google.protobuf.UninterpretedOption"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.deprecated!==undefined&&m.deprecated!==false)
                        w.uint32(264).bool(m.deprecated)
                    if(m.idempotencyLevel!==undefined&&m.idempotencyLevel!=="IDEMPOTENCY_UNKNOWN")
                        w.uint32(272).uint32(m.idempotencyLevel)
                    if(m.uninterpretedOption)
                        for(var i=0;i<m.uninterpretedOption.length;++i)
                        types[2].encode(m.uninterpretedOption[i],w.uint32(7994).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            MethodOptions.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.MethodOptions.IdempotencyLevel","google.protobuf.UninterpretedOption"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.MethodOptions
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 33:
                                m.deprecated=r.bool()
                                break
                            case 34:
                                m.idempotencyLevel=r.uint32()
                                break
                            case 999:
                                m.uninterpretedOption&&m.uninterpretedOption.length||(m.uninterpretedOption=[])
                                m.uninterpretedOption.push(types[2].decode(r,r.uint32()))
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            MethodOptions.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,"google.protobuf.MethodOptions.IdempotencyLevel","google.protobuf.UninterpretedOption"]);
                return function verify(m) {
                    if(m.deprecated!==undefined){
                        if(typeof m.deprecated!=="boolean")
                            return"invalid value for field .google.protobuf.MethodOptions.deprecated (boolean expected)"
                    }
                    if(m.idempotencyLevel!==undefined){
                        switch(m.idempotencyLevel){
                            default:
                                return"invalid value for field .google.protobuf.MethodOptions.idempotencyLevel (enum value expected)"
                            case 0:
                            case 1:
                            case 2:
                                break
                        }
                    }
                    if(m.uninterpretedOption!==undefined){
                        if(!Array.isArray(m.uninterpretedOption))
                            return"invalid value for field .google.protobuf.MethodOptions.uninterpretedOption (array expected)"
                        for(var i=0;i<m.uninterpretedOption.length;++i){
                            var r;
                            if(r=types[2].verify(m.uninterpretedOption[i]))
                                return r
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
            UninterpretedOption.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.UninterpretedOption.NamePart",null,null,null,null,null,null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.name)
                        for(var i=0;i<m.name.length;++i)
                        types[0].encode(m.name[i],w.uint32(18).fork()).ldelim()
                    if(m.identifierValue!==undefined&&m.identifierValue!=="")
                        w.uint32(26).string(m.identifierValue)
                    if(m.positiveIntValue!==undefined&&m.positiveIntValue!==null&&util.longNe(m.positiveIntValue,0,0))
                        w.uint32(32).uint64(m.positiveIntValue)
                    if(m.negativeIntValue!==undefined&&m.negativeIntValue!==null&&util.longNe(m.negativeIntValue,0,0))
                        w.uint32(40).int64(m.negativeIntValue)
                    if(m.doubleValue!==undefined&&m.doubleValue!==0)
                        w.uint32(49).double(m.doubleValue)
                    if(m.stringValue!==undefined&&m.stringValue!==[])
                        w.uint32(58).bytes(m.stringValue)
                    if(m.aggregateValue!==undefined&&m.aggregateValue!=="")
                        w.uint32(66).string(m.aggregateValue)
                    return w
                }
                /* eslint-enable */
            })();

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
            UninterpretedOption.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.UninterpretedOption.NamePart",null,null,null,null,null,null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.UninterpretedOption
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 2:
                                m.name&&m.name.length||(m.name=[])
                                m.name.push(types[0].decode(r,r.uint32()))
                                break
                            case 3:
                                m.identifierValue=r.string()
                                break
                            case 4:
                                m.positiveIntValue=r.uint64()
                                break
                            case 5:
                                m.negativeIntValue=r.int64()
                                break
                            case 6:
                                m.doubleValue=r.double()
                                break
                            case 7:
                                m.stringValue=r.bytes()
                                break
                            case 8:
                                m.aggregateValue=r.string()
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            UninterpretedOption.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.UninterpretedOption.NamePart",null,null,null,null,null,null]);
                return function verify(m) {
                    if(m.name!==undefined){
                        if(!Array.isArray(m.name))
                            return"invalid value for field .google.protobuf.UninterpretedOption.name (array expected)"
                        for(var i=0;i<m.name.length;++i){
                            var r;
                            if(r=types[0].verify(m.name[i]))
                                return r
                        }
                    }
                    if(m.identifierValue!==undefined){
                        if(!util.isString(m.identifierValue))
                            return"invalid value for field .google.protobuf.UninterpretedOption.identifierValue (string expected)"
                    }
                    if(m.positiveIntValue!==undefined){
                        if(!util.isInteger(m.positiveIntValue)&&!(m.positiveIntValue&&util.isInteger(m.positiveIntValue.low)&&util.isInteger(m.positiveIntValue.high)))
                            return"invalid value for field .google.protobuf.UninterpretedOption.positiveIntValue (integer|Long expected)"
                    }
                    if(m.negativeIntValue!==undefined){
                        if(!util.isInteger(m.negativeIntValue)&&!(m.negativeIntValue&&util.isInteger(m.negativeIntValue.low)&&util.isInteger(m.negativeIntValue.high)))
                            return"invalid value for field .google.protobuf.UninterpretedOption.negativeIntValue (integer|Long expected)"
                    }
                    if(m.doubleValue!==undefined){
                        if(typeof m.doubleValue!=="number")
                            return"invalid value for field .google.protobuf.UninterpretedOption.doubleValue (number expected)"
                    }
                    if(m.stringValue!==undefined){
                        if(!(m.stringValue&&typeof m.stringValue.length==="number"||util.isString(m.stringValue)))
                            return"invalid value for field .google.protobuf.UninterpretedOption.stringValue (buffer expected)"
                    }
                    if(m.aggregateValue!==undefined){
                        if(!util.isString(m.aggregateValue))
                            return"invalid value for field .google.protobuf.UninterpretedOption.aggregateValue (string expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
                NamePart.encode = (function() {
                    /* eslint-disable */
                    var Writer = $protobuf.Writer;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function encode(m, w) {
                        w||(w=Writer.create())
                        w.uint32(10).string(m.namePart)
                        w.uint32(16).bool(m.isExtension)
                        return w
                    }
                    /* eslint-enable */
                })();

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
                NamePart.decode = (function() {
                    /* eslint-disable */
                    var Reader = $protobuf.Reader;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function decode(r, l) {
                        r instanceof Reader||(r=Reader.create(r))
                        var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.UninterpretedOption.NamePart
                        while(r.pos<c){
                            var t=r.uint32()
                            switch(t>>>3){
                                case 1:
                                    m.namePart=r.string()
                                    break
                                case 2:
                                    m.isExtension=r.bool()
                                    break
                                default:
                                    r.skipType(t&7)
                                    break
                            }
                        }
                        return m
                    }
                    /* eslint-enable */
                })();

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
                NamePart.verify = (function() {
                    /* eslint-disable */
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function verify(m) {
                        if(!util.isString(m.namePart))
                            return"invalid value for field .google.protobuf.UninterpretedOption.NamePart.namePart (string expected)"
                        if(typeof m.isExtension!=="boolean")
                            return"invalid value for field .google.protobuf.UninterpretedOption.NamePart.isExtension (boolean expected)"
                        return null
                    }
                    /* eslint-enable */
                })();

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
            SourceCodeInfo.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.SourceCodeInfo.Location"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.location)
                        for(var i=0;i<m.location.length;++i)
                        types[0].encode(m.location[i],w.uint32(10).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            SourceCodeInfo.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.SourceCodeInfo.Location"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.SourceCodeInfo
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.location&&m.location.length||(m.location=[])
                                m.location.push(types[0].decode(r,r.uint32()))
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            SourceCodeInfo.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.SourceCodeInfo.Location"]);
                return function verify(m) {
                    if(m.location!==undefined){
                        if(!Array.isArray(m.location))
                            return"invalid value for field .google.protobuf.SourceCodeInfo.location (array expected)"
                        for(var i=0;i<m.location.length;++i){
                            var r;
                            if(r=types[0].verify(m.location[i]))
                                return r
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
                Location.encode = (function() {
                    /* eslint-disable */
                    var Writer = $protobuf.Writer;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null,null,null,null]);
                    return function encode(m, w) {
                        w||(w=Writer.create())
                        if(m.path&&m.path.length){
                            w.uint32(10).fork()
                            for(var i=0;i<m.path.length;++i)
                                w.int32(m.path[i])
                            w.ldelim()
                        }
                        if(m.span&&m.span.length){
                            w.uint32(18).fork()
                            for(var i=0;i<m.span.length;++i)
                                w.int32(m.span[i])
                            w.ldelim()
                        }
                        if(m.leadingComments!==undefined&&m.leadingComments!=="")
                            w.uint32(26).string(m.leadingComments)
                        if(m.trailingComments!==undefined&&m.trailingComments!=="")
                            w.uint32(34).string(m.trailingComments)
                        if(m.leadingDetachedComments)
                            for(var i=0;i<m.leadingDetachedComments.length;++i)
                            w.uint32(50).string(m.leadingDetachedComments[i])
                        return w
                    }
                    /* eslint-enable */
                })();

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
                Location.decode = (function() {
                    /* eslint-disable */
                    var Reader = $protobuf.Reader;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null,null,null,null]);
                    return function decode(r, l) {
                        r instanceof Reader||(r=Reader.create(r))
                        var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.SourceCodeInfo.Location
                        while(r.pos<c){
                            var t=r.uint32()
                            switch(t>>>3){
                                case 1:
                                    m.path&&m.path.length||(m.path=[])
                                    if((t&7)===2){
                                        var e=r.uint32()+r.pos
                                        while(r.pos<e)
                                            m.path.push(r.int32())
                                    }else
                                        m.path.push(r.int32())
                                    break
                                case 2:
                                    m.span&&m.span.length||(m.span=[])
                                    if((t&7)===2){
                                        var e=r.uint32()+r.pos
                                        while(r.pos<e)
                                            m.span.push(r.int32())
                                    }else
                                        m.span.push(r.int32())
                                    break
                                case 3:
                                    m.leadingComments=r.string()
                                    break
                                case 4:
                                    m.trailingComments=r.string()
                                    break
                                case 6:
                                    m.leadingDetachedComments&&m.leadingDetachedComments.length||(m.leadingDetachedComments=[])
                                    m.leadingDetachedComments.push(r.string())
                                    break
                                default:
                                    r.skipType(t&7)
                                    break
                            }
                        }
                        return m
                    }
                    /* eslint-enable */
                })();

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
                Location.verify = (function() {
                    /* eslint-disable */
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null,null,null,null]);
                    return function verify(m) {
                        if(m.path!==undefined){
                            if(!Array.isArray(m.path))
                                return"invalid value for field .google.protobuf.SourceCodeInfo.Location.path (array expected)"
                            for(var i=0;i<m.path.length;++i){
                                if(!util.isInteger(m.path[i]))
                                    return"invalid value for field .google.protobuf.SourceCodeInfo.Location.path (integer[] expected)"
                            }
                        }
                        if(m.span!==undefined){
                            if(!Array.isArray(m.span))
                                return"invalid value for field .google.protobuf.SourceCodeInfo.Location.span (array expected)"
                            for(var i=0;i<m.span.length;++i){
                                if(!util.isInteger(m.span[i]))
                                    return"invalid value for field .google.protobuf.SourceCodeInfo.Location.span (integer[] expected)"
                            }
                        }
                        if(m.leadingComments!==undefined){
                            if(!util.isString(m.leadingComments))
                                return"invalid value for field .google.protobuf.SourceCodeInfo.Location.leadingComments (string expected)"
                        }
                        if(m.trailingComments!==undefined){
                            if(!util.isString(m.trailingComments))
                                return"invalid value for field .google.protobuf.SourceCodeInfo.Location.trailingComments (string expected)"
                        }
                        if(m.leadingDetachedComments!==undefined){
                            if(!Array.isArray(m.leadingDetachedComments))
                                return"invalid value for field .google.protobuf.SourceCodeInfo.Location.leadingDetachedComments (array expected)"
                            for(var i=0;i<m.leadingDetachedComments.length;++i){
                                if(!util.isString(m.leadingDetachedComments[i]))
                                    return"invalid value for field .google.protobuf.SourceCodeInfo.Location.leadingDetachedComments (string[] expected)"
                            }
                        }
                        return null
                    }
                    /* eslint-enable */
                })();

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
            GeneratedCodeInfo.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.GeneratedCodeInfo.Annotation"]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.annotation)
                        for(var i=0;i<m.annotation.length;++i)
                        types[0].encode(m.annotation[i],w.uint32(10).fork()).ldelim()
                    return w
                }
                /* eslint-enable */
            })();

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
            GeneratedCodeInfo.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.GeneratedCodeInfo.Annotation"]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.GeneratedCodeInfo
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.annotation&&m.annotation.length||(m.annotation=[])
                                m.annotation.push(types[0].decode(r,r.uint32()))
                                break
                            default:
                                r.skipType(t&7)
                                break
                        }
                    }
                    return m
                }
                /* eslint-enable */
            })();

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
            GeneratedCodeInfo.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = ["google.protobuf.GeneratedCodeInfo.Annotation"]);
                return function verify(m) {
                    if(m.annotation!==undefined){
                        if(!Array.isArray(m.annotation))
                            return"invalid value for field .google.protobuf.GeneratedCodeInfo.annotation (array expected)"
                        for(var i=0;i<m.annotation.length;++i){
                            var r;
                            if(r=types[0].verify(m.annotation[i]))
                                return r
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
                Annotation.encode = (function() {
                    /* eslint-disable */
                    var Writer = $protobuf.Writer;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null,null,null]);
                    return function encode(m, w) {
                        w||(w=Writer.create())
                        if(m.path&&m.path.length){
                            w.uint32(10).fork()
                            for(var i=0;i<m.path.length;++i)
                                w.int32(m.path[i])
                            w.ldelim()
                        }
                        if(m.sourceFile!==undefined&&m.sourceFile!=="")
                            w.uint32(18).string(m.sourceFile)
                        if(m.begin!==undefined&&m.begin!==0)
                            w.uint32(24).int32(m.begin)
                        if(m.end!==undefined&&m.end!==0)
                            w.uint32(32).int32(m.end)
                        return w
                    }
                    /* eslint-enable */
                })();

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
                Annotation.decode = (function() {
                    /* eslint-disable */
                    var Reader = $protobuf.Reader;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null,null,null]);
                    return function decode(r, l) {
                        r instanceof Reader||(r=Reader.create(r))
                        var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.GeneratedCodeInfo.Annotation
                        while(r.pos<c){
                            var t=r.uint32()
                            switch(t>>>3){
                                case 1:
                                    m.path&&m.path.length||(m.path=[])
                                    if((t&7)===2){
                                        var e=r.uint32()+r.pos
                                        while(r.pos<e)
                                            m.path.push(r.int32())
                                    }else
                                        m.path.push(r.int32())
                                    break
                                case 2:
                                    m.sourceFile=r.string()
                                    break
                                case 3:
                                    m.begin=r.int32()
                                    break
                                case 4:
                                    m.end=r.int32()
                                    break
                                default:
                                    r.skipType(t&7)
                                    break
                            }
                        }
                        return m
                    }
                    /* eslint-enable */
                })();

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
                Annotation.verify = (function() {
                    /* eslint-disable */
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null,null,null]);
                    return function verify(m) {
                        if(m.path!==undefined){
                            if(!Array.isArray(m.path))
                                return"invalid value for field .google.protobuf.GeneratedCodeInfo.Annotation.path (array expected)"
                            for(var i=0;i<m.path.length;++i){
                                if(!util.isInteger(m.path[i]))
                                    return"invalid value for field .google.protobuf.GeneratedCodeInfo.Annotation.path (integer[] expected)"
                            }
                        }
                        if(m.sourceFile!==undefined){
                            if(!util.isString(m.sourceFile))
                                return"invalid value for field .google.protobuf.GeneratedCodeInfo.Annotation.sourceFile (string expected)"
                        }
                        if(m.begin!==undefined){
                            if(!util.isInteger(m.begin))
                                return"invalid value for field .google.protobuf.GeneratedCodeInfo.Annotation.begin (integer expected)"
                        }
                        if(m.end!==undefined){
                            if(!util.isInteger(m.end))
                                return"invalid value for field .google.protobuf.GeneratedCodeInfo.Annotation.end (integer expected)"
                        }
                        return null
                    }
                    /* eslint-enable */
                })();

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
