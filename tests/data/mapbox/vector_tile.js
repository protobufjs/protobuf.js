"use strict"; // eslint-disable-line strict

var $protobuf = require("../../runtime");

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
         * @name vector_tile.Tile#layers
         * @type {Array.<vector_tile.Tile.Layer>}
         */
        $prototype["layers"] = $protobuf.util.emptyArray;

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
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Tile.encode = (function() {
            /* eslint-disable */
            var Writer = $protobuf.Writer;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = ["vector_tile.Tile.Layer"]);
            return function encode(m, w) {
                w||(w=Writer.create())
                if(m.layers)
                    for(var i=0;i<m.layers.length;++i)
                    types[0].encode(m.layers[i],w.uint32(26).fork()).ldelim()
                return w
            }
            /* eslint-enable */
        })();

        /**
         * Encodes the specified Tile, length delimited.
         * @param {vector_tile.Tile|Object} message Tile or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Tile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Tile from the specified reader or buffer.
         * @function
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {vector_tile.Tile} Tile
         */
        Tile.decode = (function() {
            /* eslint-disable */
            var Reader = $protobuf.Reader;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = ["vector_tile.Tile.Layer"]);
            return function decode(r, l) {
                r instanceof Reader||(r=Reader.create(r))
                var c=l===undefined?r.len:r.pos+l,m=new $root.vector_tile.Tile
                while(r.pos<c){
                    var t=r.uint32()
                    switch(t>>>3){
                        case 3:
                            m.layers&&m.layers.length||(m.layers=[])
                            m.layers.push(types[0].decode(r,r.uint32()))
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
         * Decodes a Tile from the specified reader or buffer, length delimited.
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
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
        Tile.verify = (function() {
            /* eslint-disable */
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = ["vector_tile.Tile.Layer"]);
            return function verify(m) {
                if(m.layers!==undefined){
                    if(!Array.isArray(m.layers))
                        return"invalid value for field .vector_tile.Tile.layers (array expected)"
                    for(var i=0;i<m.layers.length;++i){
                        var r;
                        if(r=types[0].verify(m.layers[i]))
                            return r
                    }
                }
                return null
            }
            /* eslint-enable */
        })();

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
             * @name vector_tile.Tile.Value#stringValue
             * @type {string}
             */
            $prototype["stringValue"] = "";

            /**
             * Value floatValue.
             * @name vector_tile.Tile.Value#floatValue
             * @type {number}
             */
            $prototype["floatValue"] = 0;

            /**
             * Value doubleValue.
             * @name vector_tile.Tile.Value#doubleValue
             * @type {number}
             */
            $prototype["doubleValue"] = 0;

            /**
             * Value intValue.
             * @name vector_tile.Tile.Value#intValue
             * @type {number|Long}
             */
            $prototype["intValue"] = $protobuf.util.emptyObject;

            /**
             * Value uintValue.
             * @name vector_tile.Tile.Value#uintValue
             * @type {number|Long}
             */
            $prototype["uintValue"] = $protobuf.util.emptyObject;

            /**
             * Value sintValue.
             * @name vector_tile.Tile.Value#sintValue
             * @type {number|Long}
             */
            $prototype["sintValue"] = $protobuf.util.emptyObject;

            /**
             * Value boolValue.
             * @name vector_tile.Tile.Value#boolValue
             * @type {boolean}
             */
            $prototype["boolValue"] = false;

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
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            Value.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,null,null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.stringValue!==undefined&&m.stringValue!=="")
                        w.uint32(10).string(m.stringValue)
                    if(m.floatValue!==undefined&&m.floatValue!==0)
                        w.uint32(21).float(m.floatValue)
                    if(m.doubleValue!==undefined&&m.doubleValue!==0)
                        w.uint32(25).double(m.doubleValue)
                    if(m.intValue!==undefined&&util.longNe(m.intValue,0,0))
                        w.uint32(32).int64(m.intValue)
                    if(m.uintValue!==undefined&&util.longNe(m.uintValue,0,0))
                        w.uint32(40).uint64(m.uintValue)
                    if(m.sintValue!==undefined&&util.longNe(m.sintValue,0,0))
                        w.uint32(48).sint64(m.sintValue)
                    if(m.boolValue!==undefined&&m.boolValue!==false)
                        w.uint32(56).bool(m.boolValue)
                    return w
                }
                /* eslint-enable */
            })();

            /**
             * Encodes the specified Value, length delimited.
             * @param {vector_tile.Tile.Value|Object} message Value or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Value from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Value} Value
             */
            Value.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,null,null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.vector_tile.Tile.Value
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.stringValue=r.string()
                                break
                            case 2:
                                m.floatValue=r.float()
                                break
                            case 3:
                                m.doubleValue=r.double()
                                break
                            case 4:
                                m.intValue=r.int64()
                                break
                            case 5:
                                m.uintValue=r.uint64()
                                break
                            case 6:
                                m.sintValue=r.sint64()
                                break
                            case 7:
                                m.boolValue=r.bool()
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
             * Decodes a Value from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
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
            Value.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,null,null,null,null,null]);
                return function verify(m) {
                    if(m.stringValue!==undefined){
                        if(!util.isString(m.stringValue))
                            return"invalid value for field .vector_tile.Tile.Value.stringValue (string expected)"
                    }
                    if(m.floatValue!==undefined){
                        if(typeof m.floatValue!=="number")
                            return"invalid value for field .vector_tile.Tile.Value.floatValue (number expected)"
                    }
                    if(m.doubleValue!==undefined){
                        if(typeof m.doubleValue!=="number")
                            return"invalid value for field .vector_tile.Tile.Value.doubleValue (number expected)"
                    }
                    if(m.intValue!==undefined){
                        if(!util.isInteger(m.intValue)&&!(m.intValue&&util.isInteger(m.intValue.low)&&util.isInteger(m.intValue.high)))
                            return"invalid value for field .vector_tile.Tile.Value.intValue (integer|Long expected)"
                    }
                    if(m.uintValue!==undefined){
                        if(!util.isInteger(m.uintValue)&&!(m.uintValue&&util.isInteger(m.uintValue.low)&&util.isInteger(m.uintValue.high)))
                            return"invalid value for field .vector_tile.Tile.Value.uintValue (integer|Long expected)"
                    }
                    if(m.sintValue!==undefined){
                        if(!util.isInteger(m.sintValue)&&!(m.sintValue&&util.isInteger(m.sintValue.low)&&util.isInteger(m.sintValue.high)))
                            return"invalid value for field .vector_tile.Tile.Value.sintValue (integer|Long expected)"
                    }
                    if(m.boolValue!==undefined){
                        if(typeof m.boolValue!=="boolean")
                            return"invalid value for field .vector_tile.Tile.Value.boolValue (boolean expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
             * @name vector_tile.Tile.Feature#id
             * @type {number|Long}
             */
            $prototype["id"] = $protobuf.util.emptyObject;

            /**
             * Feature tags.
             * @name vector_tile.Tile.Feature#tags
             * @type {Array.<number>}
             */
            $prototype["tags"] = $protobuf.util.emptyArray;

            /**
             * Feature type.
             * @name vector_tile.Tile.Feature#type
             * @type {number}
             */
            $prototype["type"] = "UNKNOWN";

            /**
             * Feature geometry.
             * @name vector_tile.Tile.Feature#geometry
             * @type {Array.<number>}
             */
            $prototype["geometry"] = $protobuf.util.emptyArray;

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
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            Feature.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"vector_tile.Tile.GeomType",null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    if(m.id!==undefined&&util.longNe(m.id,0,0))
                        w.uint32(8).uint64(m.id)
                    if(m.tags&&m.tags.length){
                        w.uint32(18).fork()
                        for(var i=0;i<m.tags.length;++i)
                            w.uint32(m.tags[i])
                        w.ldelim()
                    }
                    if(m.type!==undefined&&m.type!=="UNKNOWN")
                        w.uint32(24).uint32(m.type)
                    if(m.geometry&&m.geometry.length){
                        w.uint32(34).fork()
                        for(var i=0;i<m.geometry.length;++i)
                            w.uint32(m.geometry[i])
                        w.ldelim()
                    }
                    return w
                }
                /* eslint-enable */
            })();

            /**
             * Encodes the specified Feature, length delimited.
             * @param {vector_tile.Tile.Feature|Object} message Feature or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            Feature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Feature from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Feature} Feature
             */
            Feature.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"vector_tile.Tile.GeomType",null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.vector_tile.Tile.Feature
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 1:
                                m.id=r.uint64()
                                break
                            case 2:
                                m.tags&&m.tags.length||(m.tags=[])
                                if((t&7)===2){
                                    var e=r.uint32()+r.pos
                                    while(r.pos<e)
                                        m.tags.push(r.uint32())
                                }else
                                    m.tags.push(r.uint32())
                                break
                            case 3:
                                m.type=r.uint32()
                                break
                            case 4:
                                m.geometry&&m.geometry.length||(m.geometry=[])
                                if((t&7)===2){
                                    var e=r.uint32()+r.pos
                                    while(r.pos<e)
                                        m.geometry.push(r.uint32())
                                }else
                                    m.geometry.push(r.uint32())
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
             * Decodes a Feature from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
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
            Feature.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"vector_tile.Tile.GeomType",null]);
                return function verify(m) {
                    if(m.id!==undefined){
                        if(!util.isInteger(m.id)&&!(m.id&&util.isInteger(m.id.low)&&util.isInteger(m.id.high)))
                            return"invalid value for field .vector_tile.Tile.Feature.id (integer|Long expected)"
                    }
                    if(m.tags!==undefined){
                        if(!Array.isArray(m.tags))
                            return"invalid value for field .vector_tile.Tile.Feature.tags (array expected)"
                        for(var i=0;i<m.tags.length;++i){
                            if(!util.isInteger(m.tags[i]))
                                return"invalid value for field .vector_tile.Tile.Feature.tags (integer[] expected)"
                        }
                    }
                    if(m.type!==undefined){
                        switch(m.type){
                            default:
                                return"invalid value for field .vector_tile.Tile.Feature.type (enum value expected)"
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                break
                        }
                    }
                    if(m.geometry!==undefined){
                        if(!Array.isArray(m.geometry))
                            return"invalid value for field .vector_tile.Tile.Feature.geometry (array expected)"
                        for(var i=0;i<m.geometry.length;++i){
                            if(!util.isInteger(m.geometry[i]))
                                return"invalid value for field .vector_tile.Tile.Feature.geometry (integer[] expected)"
                        }
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
             * @name vector_tile.Tile.Layer#version
             * @type {number}
             */
            $prototype["version"] = 1;

            /**
             * Layer name.
             * @name vector_tile.Tile.Layer#name
             * @type {string}
             */
            $prototype["name"] = "";

            /**
             * Layer features.
             * @name vector_tile.Tile.Layer#features
             * @type {Array.<vector_tile.Tile.Feature>}
             */
            $prototype["features"] = $protobuf.util.emptyArray;

            /**
             * Layer keys.
             * @name vector_tile.Tile.Layer#keys
             * @type {Array.<string>}
             */
            $prototype["keys"] = $protobuf.util.emptyArray;

            /**
             * Layer values.
             * @name vector_tile.Tile.Layer#values
             * @type {Array.<vector_tile.Tile.Value>}
             */
            $prototype["values"] = $protobuf.util.emptyArray;

            /**
             * Layer extent.
             * @name vector_tile.Tile.Layer#extent
             * @type {number}
             */
            $prototype["extent"] = 4096;

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
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            Layer.encode = (function() {
                /* eslint-disable */
                var Writer = $protobuf.Writer;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"vector_tile.Tile.Feature",null,"vector_tile.Tile.Value",null]);
                return function encode(m, w) {
                    w||(w=Writer.create())
                    w.uint32(120).uint32(m.version)
                    w.uint32(10).string(m.name)
                    if(m.features)
                        for(var i=0;i<m.features.length;++i)
                        types[2].encode(m.features[i],w.uint32(18).fork()).ldelim()
                    if(m.keys)
                        for(var i=0;i<m.keys.length;++i)
                        w.uint32(26).string(m.keys[i])
                    if(m.values)
                        for(var i=0;i<m.values.length;++i)
                        types[4].encode(m.values[i],w.uint32(34).fork()).ldelim()
                    if(m.extent!==undefined&&m.extent!==4096)
                        w.uint32(40).uint32(m.extent)
                    return w
                }
                /* eslint-enable */
            })();

            /**
             * Encodes the specified Layer, length delimited.
             * @param {vector_tile.Tile.Layer|Object} message Layer or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            Layer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Layer from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {vector_tile.Tile.Layer} Layer
             */
            Layer.decode = (function() {
                /* eslint-disable */
                var Reader = $protobuf.Reader;
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"vector_tile.Tile.Feature",null,"vector_tile.Tile.Value",null]);
                return function decode(r, l) {
                    r instanceof Reader||(r=Reader.create(r))
                    var c=l===undefined?r.len:r.pos+l,m=new $root.vector_tile.Tile.Layer
                    while(r.pos<c){
                        var t=r.uint32()
                        switch(t>>>3){
                            case 15:
                                m.version=r.uint32()
                                break
                            case 1:
                                m.name=r.string()
                                break
                            case 2:
                                m.features&&m.features.length||(m.features=[])
                                m.features.push(types[2].decode(r,r.uint32()))
                                break
                            case 3:
                                m.keys&&m.keys.length||(m.keys=[])
                                m.keys.push(r.string())
                                break
                            case 4:
                                m.values&&m.values.length||(m.values=[])
                                m.values.push(types[4].decode(r,r.uint32()))
                                break
                            case 5:
                                m.extent=r.uint32()
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
             * Decodes a Layer from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
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
            Layer.verify = (function() {
                /* eslint-disable */
                var util = $protobuf.util;
                var types; $lazyTypes.push(types = [null,null,"vector_tile.Tile.Feature",null,"vector_tile.Tile.Value",null]);
                return function verify(m) {
                    if(!util.isInteger(m.version))
                        return"invalid value for field .vector_tile.Tile.Layer.version (integer expected)"
                    if(!util.isString(m.name))
                        return"invalid value for field .vector_tile.Tile.Layer.name (string expected)"
                    if(m.features!==undefined){
                        if(!Array.isArray(m.features))
                            return"invalid value for field .vector_tile.Tile.Layer.features (array expected)"
                        for(var i=0;i<m.features.length;++i){
                            var r;
                            if(r=types[2].verify(m.features[i]))
                                return r
                        }
                    }
                    if(m.keys!==undefined){
                        if(!Array.isArray(m.keys))
                            return"invalid value for field .vector_tile.Tile.Layer.keys (array expected)"
                        for(var i=0;i<m.keys.length;++i){
                            if(!util.isString(m.keys[i]))
                                return"invalid value for field .vector_tile.Tile.Layer.keys (string[] expected)"
                        }
                    }
                    if(m.values!==undefined){
                        if(!Array.isArray(m.values))
                            return"invalid value for field .vector_tile.Tile.Layer.values (array expected)"
                        for(var i=0;i<m.values.length;++i){
                            var r;
                            if(r=types[4].verify(m.values[i]))
                                return r
                        }
                    }
                    if(m.extent!==undefined){
                        if(!util.isInteger(m.extent))
                            return"invalid value for field .vector_tile.Tile.Layer.extent (integer expected)"
                    }
                    return null
                }
                /* eslint-enable */
            })();

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
