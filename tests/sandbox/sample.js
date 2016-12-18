(function(global, factory) {
    /* eslint-disable no-undef */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobuf"], factory);
    
    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/runtime"));

    /* eslint-enable no-undef */
})(this, function($protobuf) {
    "use strict"; // eslint-disable-line strict

    // Lazily resolved type references
    var $lazyTypes = [];
    
    // Exported root namespace
    var $root = {};
    
    /** @alias Request */
    $root.Request = (function() {
    
        /**
         * Constructs a new Request.
         * @exports Request
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function Request(properties) {
            if (properties) {
                var keys = Object.keys(properties);
                for (var i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
            }
        }
    
        /** @alias Request.prototype */
        var $prototype = Request.prototype;
    
        /**
         * Request action.
         * @name Request#action
         * @type {number}
         */
        $prototype["action"] = 0;
    
        /**
         * Request target.
         * @name Request#target
         * @type {Array.<string>}
         */
        $prototype["target"] = $protobuf.util.emptyArray;
    
        /**
         * Request source.
         * @name Request#source
         * @type {string}
         */
        $prototype["source"] = "";
    
        /**
         * Request require.
         * @name Request#require
         * @type {Array.<Dict>}
         */
        $prototype["require"] = $protobuf.util.emptyArray;
    
        /**
         * Request sort.
         * @name Request#sort
         * @type {Array.<Sort>}
         */
        $prototype["sort"] = $protobuf.util.emptyArray;
    
        /**
         * Request limit.
         * @name Request#limit
         * @type {number}
         */
        $prototype["limit"] = 0;
    
        /**
         * Request offset.
         * @name Request#offset
         * @type {number|Long}
         */
        $prototype["offset"] = $protobuf.util.emptyObject;
    
        /**
         * Request args.
         * @name Request#args
         * @type {google.protobuf.Any}
         */
        $prototype["args"] = null;
    
        /**
         * Request content.
         * @name Request#content
         * @type {Array.<google.protobuf.Any>}
         */
        $prototype["content"] = $protobuf.util.emptyArray;
    
        /**
         * Encodes the specified Request.
         * @function
         * @param {Request|Object} message Request or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Request.encode = (function() {
            /* eslint-disable */
            var Writer = $protobuf.Writer;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = ["Request.Action",null,null,"Dict","Sort",null,null,"google.protobuf.Any","google.protobuf.Any"]);
            return function encode(m, w) {
                w||(w=Writer.create())
                if(m["action"]!==undefined&&m["action"]!==0)
                    w.uint32(8).uint32(m["action"])
                if(m["target"])
                    for(var i=0;i<m["target"].length;++i)
                    w.uint32(18).string(m["target"][i])
                if(m["source"]!==undefined&&m["source"]!=="")
                    w.uint32(26).string(m["source"])
                if(m["require"])
                    for(var i=0;i<m["require"].length;++i)
                    types[3].encode(m["require"][i],w.uint32(34).fork()).ldelim()
                if(m["sort"])
                    for(var i=0;i<m["sort"].length;++i)
                    types[4].encode(m["sort"][i],w.uint32(42).fork()).ldelim()
                if(m["limit"]!==undefined&&m["limit"]!==0)
                    w.uint32(48).int32(m["limit"])
                if(m["offset"]!==undefined&&util.longNe(m["offset"],0,0))
                    w.uint32(56).int64(m["offset"])
                if(m["args"]!==undefined&&m["args"]!==null)
                    types[7].encode(m["args"],w.fork()).len&&w.ldelim(8)||w.reset()
                if(m["content"])
                    for(var i=0;i<m["content"].length;++i)
                    types[8].encode(m["content"][i],w.uint32(74).fork()).ldelim()
                return w
            }
            /* eslint-enable */
        })();
    
        /**
         * Encodes the specified Request, length delimited.
         * @param {Request|Object} message Request or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Request.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Request from the specified reader or buffer.
         * @function
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Request} Request
         */
        Request.decode = (function() {
            /* eslint-disable */
            var Reader = $protobuf.Reader;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = ["Request.Action",null,null,"Dict","Sort",null,null,"google.protobuf.Any","google.protobuf.Any"]);
            return function decode(r, l) {
                r instanceof Reader||(r=Reader.create(r))
                var c=l===undefined?r.len:r.pos+l,m=new $root.Request
                while(r.pos<c){
                    var t=r.int32()
                    switch(t>>>3){
                        case 1:
                            m["action"]=r.uint32()
                            break
                        case 2:
                            m["target"]&&m["target"].length?m["target"]:m["target"]=[]
                            m["target"].push(r.string())
                            break
                        case 3:
                            m["source"]=r.string()
                            break
                        case 4:
                            m["require"]&&m["require"].length?m["require"]:m["require"]=[]
                            m["require"].push(types[3].decode(r,r.uint32()))
                            break
                        case 5:
                            m["sort"]&&m["sort"].length?m["sort"]:m["sort"]=[]
                            m["sort"].push(types[4].decode(r,r.uint32()))
                            break
                        case 6:
                            m["limit"]=r.int32()
                            break
                        case 7:
                            m["offset"]=r.int64()
                            break
                        case 8:
                            m["args"]=types[7].decode(r,r.uint32())
                            break
                        case 9:
                            m["content"]&&m["content"].length?m["content"]:m["content"]=[]
                            m["content"].push(types[8].decode(r,r.uint32()))
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
         * Decodes a Request from the specified reader or buffer, length delimited.
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @returns {Request} Request
         */
        Request.decodeDelimited = function decodeDelimited(readerOrBuffer) {
            readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };
    
        /**
         * Verifies a Request.
         * @function
         * @param {Request|Object} message Request or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Request.verify = (function() {
            /* eslint-disable */
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = ["Request.Action",null,null,"Dict","Sort",null,null,"google.protobuf.Any","google.protobuf.Any"]);
            return function verify(m) {
                if(m["action"]!==undefined){
                    switch(m["action"]){
                        default:
                            return"invalid value for field .Request.action (enum value expected)"
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break
                    }
                }
                if(m["target"]!==undefined){
                    if(!Array.isArray(m["target"]))
                        return"invalid value for field .Request.target (array expected)"
                    for(var i=0;i<m["target"].length;++i){
                        if(!util.isString(m["target"][i]))
                            return"invalid value for field .Request.target (string[] expected)"
                    }
                }
                if(m["source"]!==undefined){
                    if(!util.isString(m["source"]))
                        return"invalid value for field .Request.source (string expected)"
                }
                if(m["require"]!==undefined){
                    if(!Array.isArray(m["require"]))
                        return"invalid value for field .Request.require (array expected)"
                    for(var i=0;i<m["require"].length;++i){
                        var r;
                        if(r=types[3].verify(m["require"][i]))
                            return r
                    }
                }
                if(m["sort"]!==undefined){
                    if(!Array.isArray(m["sort"]))
                        return"invalid value for field .Request.sort (array expected)"
                    for(var i=0;i<m["sort"].length;++i){
                        var r;
                        if(r=types[4].verify(m["sort"][i]))
                            return r
                    }
                }
                if(m["limit"]!==undefined){
                    if(!util.isInteger(m["limit"]))
                        return"invalid value for field .Request.limit (integer expected)"
                }
                if(m["offset"]!==undefined){
                    if(!util.isInteger(m["offset"])&&!(m["offset"]&&util.isInteger(m["offset"].low)&&util.isInteger(m["offset"].high)))
                        return"invalid value for field .Request.offset (integer|Long expected)"
                }
                if(m["args"]!==undefined&&m["args"]!==null){
                    var r;
                    if(r=types[7].verify(m["args"]))
                        return r
                }
                if(m["content"]!==undefined){
                    if(!Array.isArray(m["content"]))
                        return"invalid value for field .Request.content (array expected)"
                    for(var i=0;i<m["content"].length;++i){
                        var r;
                        if(r=types[8].verify(m["content"][i]))
                            return r
                    }
                }
                return null
            }
            /* eslint-enable */
        })();
    
        /**
         * Action values.
         * @exports Request.Action
         * @type {Object.<string,number>}
         */
        Request.Action = {
    
            SELECT: 0,
            INSERT: 1,
            UPDATE: 2,
            DELETE: 3
        };
    
        return Request;
    })();
    
    /** @alias Response */
    $root.Response = (function() {
    
        /**
         * Constructs a new Response.
         * @exports Response
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function Response(properties) {
            if (properties) {
                var keys = Object.keys(properties);
                for (var i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
            }
        }
    
        /** @alias Response.prototype */
        var $prototype = Response.prototype;
    
        /**
         * Response code.
         * @name Response#code
         * @type {number}
         */
        $prototype["code"] = 0;
    
        /**
         * Response msg.
         * @name Response#msg
         * @type {string}
         */
        $prototype["msg"] = "";
    
        /**
         * Response result.
         * @name Response#result
         * @type {google.protobuf.Any}
         */
        $prototype["result"] = null;
    
        /**
         * Response content.
         * @name Response#content
         * @type {Array.<google.protobuf.Any>}
         */
        $prototype["content"] = $protobuf.util.emptyArray;
    
        /**
         * Encodes the specified Response.
         * @function
         * @param {Response|Object} message Response or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Response.encode = (function() {
            /* eslint-disable */
            var Writer = $protobuf.Writer;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,null,"google.protobuf.Any","google.protobuf.Any"]);
            return function encode(m, w) {
                w||(w=Writer.create())
                if(m["code"]!==undefined&&m["code"]!==0)
                    w.uint32(8).int32(m["code"])
                if(m["msg"]!==undefined&&m["msg"]!=="")
                    w.uint32(18).string(m["msg"])
                if(m["result"]!==undefined&&m["result"]!==null)
                    types[2].encode(m["result"],w.fork()).len&&w.ldelim(4)||w.reset()
                if(m["content"])
                    for(var i=0;i<m["content"].length;++i)
                    types[3].encode(m["content"][i],w.uint32(26).fork()).ldelim()
                return w
            }
            /* eslint-enable */
        })();
    
        /**
         * Encodes the specified Response, length delimited.
         * @param {Response|Object} message Response or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Response from the specified reader or buffer.
         * @function
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Response} Response
         */
        Response.decode = (function() {
            /* eslint-disable */
            var Reader = $protobuf.Reader;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,null,"google.protobuf.Any","google.protobuf.Any"]);
            return function decode(r, l) {
                r instanceof Reader||(r=Reader.create(r))
                var c=l===undefined?r.len:r.pos+l,m=new $root.Response
                while(r.pos<c){
                    var t=r.int32()
                    switch(t>>>3){
                        case 1:
                            m["code"]=r.int32()
                            break
                        case 2:
                            m["msg"]=r.string()
                            break
                        case 4:
                            m["result"]=types[2].decode(r,r.uint32())
                            break
                        case 3:
                            m["content"]&&m["content"].length?m["content"]:m["content"]=[]
                            m["content"].push(types[3].decode(r,r.uint32()))
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
         * Decodes a Response from the specified reader or buffer, length delimited.
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @returns {Response} Response
         */
        Response.decodeDelimited = function decodeDelimited(readerOrBuffer) {
            readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };
    
        /**
         * Verifies a Response.
         * @function
         * @param {Response|Object} message Response or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Response.verify = (function() {
            /* eslint-disable */
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,null,"google.protobuf.Any","google.protobuf.Any"]);
            return function verify(m) {
                if(m["code"]!==undefined){
                    if(!util.isInteger(m["code"]))
                        return"invalid value for field .Response.code (integer expected)"
                }
                if(m["msg"]!==undefined){
                    if(!util.isString(m["msg"]))
                        return"invalid value for field .Response.msg (string expected)"
                }
                if(m["result"]!==undefined&&m["result"]!==null){
                    var r;
                    if(r=types[2].verify(m["result"]))
                        return r
                }
                if(m["content"]!==undefined){
                    if(!Array.isArray(m["content"]))
                        return"invalid value for field .Response.content (array expected)"
                    for(var i=0;i<m["content"].length;++i){
                        var r;
                        if(r=types[3].verify(m["content"][i]))
                            return r
                    }
                }
                return null
            }
            /* eslint-enable */
        })();
    
        return Response;
    })();
    
    /** @alias Dict */
    $root.Dict = (function() {
    
        /**
         * Constructs a new Dict.
         * @exports Dict
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function Dict(properties) {
            if (properties) {
                var keys = Object.keys(properties);
                for (var i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
            }
        }
    
        /** @alias Dict.prototype */
        var $prototype = Dict.prototype;
    
        /**
         * Dict key.
         * @name Dict#key
         * @type {string}
         */
        $prototype["key"] = "";
    
        /**
         * Dict value.
         * @name Dict#value
         * @type {string}
         */
        $prototype["value"] = "";
    
        /**
         * Dict compare.
         * @name Dict#compare
         * @type {number}
         */
        $prototype["compare"] = 0;
    
        /**
         * Encodes the specified Dict.
         * @function
         * @param {Dict|Object} message Dict or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Dict.encode = (function() {
            /* eslint-disable */
            var Writer = $protobuf.Writer;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,null,"Dict.Compare"]);
            return function encode(m, w) {
                w||(w=Writer.create())
                if(m["key"]!==undefined&&m["key"]!=="")
                    w.uint32(10).string(m["key"])
                if(m["value"]!==undefined&&m["value"]!=="")
                    w.uint32(18).string(m["value"])
                if(m["compare"]!==undefined&&m["compare"]!==0)
                    w.uint32(24).uint32(m["compare"])
                return w
            }
            /* eslint-enable */
        })();
    
        /**
         * Encodes the specified Dict, length delimited.
         * @param {Dict|Object} message Dict or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Dict.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Dict from the specified reader or buffer.
         * @function
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Dict} Dict
         */
        Dict.decode = (function() {
            /* eslint-disable */
            var Reader = $protobuf.Reader;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,null,"Dict.Compare"]);
            return function decode(r, l) {
                r instanceof Reader||(r=Reader.create(r))
                var c=l===undefined?r.len:r.pos+l,m=new $root.Dict
                while(r.pos<c){
                    var t=r.int32()
                    switch(t>>>3){
                        case 1:
                            m["key"]=r.string()
                            break
                        case 2:
                            m["value"]=r.string()
                            break
                        case 3:
                            m["compare"]=r.uint32()
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
         * Decodes a Dict from the specified reader or buffer, length delimited.
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @returns {Dict} Dict
         */
        Dict.decodeDelimited = function decodeDelimited(readerOrBuffer) {
            readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };
    
        /**
         * Verifies a Dict.
         * @function
         * @param {Dict|Object} message Dict or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Dict.verify = (function() {
            /* eslint-disable */
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,null,"Dict.Compare"]);
            return function verify(m) {
                if(m["key"]!==undefined){
                    if(!util.isString(m["key"]))
                        return"invalid value for field .Dict.key (string expected)"
                }
                if(m["value"]!==undefined){
                    if(!util.isString(m["value"]))
                        return"invalid value for field .Dict.value (string expected)"
                }
                if(m["compare"]!==undefined){
                    switch(m["compare"]){
                        default:
                            return"invalid value for field .Dict.compare (enum value expected)"
                        case 0:
                        case 1:
                        case 2:
                            break
                    }
                }
                return null
            }
            /* eslint-enable */
        })();
    
        /**
         * Compare values.
         * @exports Dict.Compare
         * @type {Object.<string,number>}
         */
        Dict.Compare = {
    
            LT: 0,
            EQ: 1,
            GT: 2
        };
    
        return Dict;
    })();
    
    /** @alias Sort */
    $root.Sort = (function() {
    
        /**
         * Constructs a new Sort.
         * @exports Sort
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function Sort(properties) {
            if (properties) {
                var keys = Object.keys(properties);
                for (var i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
            }
        }
    
        /** @alias Sort.prototype */
        var $prototype = Sort.prototype;
    
        /**
         * Sort column.
         * @name Sort#column
         * @type {string}
         */
        $prototype["column"] = "";
    
        /**
         * Sort orderBy.
         * @name Sort#orderBy
         * @type {number}
         */
        $prototype["orderBy"] = 0;
    
        /**
         * Encodes the specified Sort.
         * @function
         * @param {Sort|Object} message Sort or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Sort.encode = (function() {
            /* eslint-disable */
            var Writer = $protobuf.Writer;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,"Sort.OrderBy"]);
            return function encode(m, w) {
                w||(w=Writer.create())
                if(m["column"]!==undefined&&m["column"]!=="")
                    w.uint32(10).string(m["column"])
                if(m["orderBy"]!==undefined&&m["orderBy"]!==0)
                    w.uint32(16).uint32(m["orderBy"])
                return w
            }
            /* eslint-enable */
        })();
    
        /**
         * Encodes the specified Sort, length delimited.
         * @param {Sort|Object} message Sort or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Sort.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Sort from the specified reader or buffer.
         * @function
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Sort} Sort
         */
        Sort.decode = (function() {
            /* eslint-disable */
            var Reader = $protobuf.Reader;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,"Sort.OrderBy"]);
            return function decode(r, l) {
                r instanceof Reader||(r=Reader.create(r))
                var c=l===undefined?r.len:r.pos+l,m=new $root.Sort
                while(r.pos<c){
                    var t=r.int32()
                    switch(t>>>3){
                        case 1:
                            m["column"]=r.string()
                            break
                        case 2:
                            m["orderBy"]=r.uint32()
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
         * Decodes a Sort from the specified reader or buffer, length delimited.
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @returns {Sort} Sort
         */
        Sort.decodeDelimited = function decodeDelimited(readerOrBuffer) {
            readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };
    
        /**
         * Verifies a Sort.
         * @function
         * @param {Sort|Object} message Sort or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Sort.verify = (function() {
            /* eslint-disable */
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,"Sort.OrderBy"]);
            return function verify(m) {
                if(m["column"]!==undefined){
                    if(!util.isString(m["column"]))
                        return"invalid value for field .Sort.column (string expected)"
                }
                if(m["orderBy"]!==undefined){
                    switch(m["orderBy"]){
                        default:
                            return"invalid value for field .Sort.orderBy (enum value expected)"
                        case 0:
                        case 1:
                            break
                    }
                }
                return null
            }
            /* eslint-enable */
        })();
    
        /**
         * OrderBy values.
         * @exports Sort.OrderBy
         * @type {Object.<string,number>}
         */
        Sort.OrderBy = {
    
            ASC: 0,
            DESC: 1
        };
    
        return Sort;
    })();
    
    /** @alias Arg */
    $root.Arg = (function() {
    
        /**
         * Constructs a new Arg.
         * @exports Arg
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function Arg(properties) {
            if (properties) {
                var keys = Object.keys(properties);
                for (var i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
            }
        }
    
        /** @alias Arg.prototype */
        var $prototype = Arg.prototype;
    
        /**
         * Arg text.
         * @name Arg#text
         * @type {Array.<string>}
         */
        $prototype["text"] = $protobuf.util.emptyArray;
    
        /**
         * Arg obj.
         * @name Arg#obj
         * @type {Array.<google.protobuf.Any>}
         */
        $prototype["obj"] = $protobuf.util.emptyArray;
    
        /**
         * Encodes the specified Arg.
         * @function
         * @param {Arg|Object} message Arg or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Arg.encode = (function() {
            /* eslint-disable */
            var Writer = $protobuf.Writer;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,"google.protobuf.Any"]);
            return function encode(m, w) {
                w||(w=Writer.create())
                if(m["text"])
                    for(var i=0;i<m["text"].length;++i)
                    w.uint32(10).string(m["text"][i])
                if(m["obj"])
                    for(var i=0;i<m["obj"].length;++i)
                    types[1].encode(m["obj"][i],w.uint32(18).fork()).ldelim()
                return w
            }
            /* eslint-enable */
        })();
    
        /**
         * Encodes the specified Arg, length delimited.
         * @param {Arg|Object} message Arg or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        Arg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Arg from the specified reader or buffer.
         * @function
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Arg} Arg
         */
        Arg.decode = (function() {
            /* eslint-disable */
            var Reader = $protobuf.Reader;
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,"google.protobuf.Any"]);
            return function decode(r, l) {
                r instanceof Reader||(r=Reader.create(r))
                var c=l===undefined?r.len:r.pos+l,m=new $root.Arg
                while(r.pos<c){
                    var t=r.int32()
                    switch(t>>>3){
                        case 1:
                            m["text"]&&m["text"].length?m["text"]:m["text"]=[]
                            m["text"].push(r.string())
                            break
                        case 2:
                            m["obj"]&&m["obj"].length?m["obj"]:m["obj"]=[]
                            m["obj"].push(types[1].decode(r,r.uint32()))
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
         * Decodes a Arg from the specified reader or buffer, length delimited.
         * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @returns {Arg} Arg
         */
        Arg.decodeDelimited = function decodeDelimited(readerOrBuffer) {
            readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };
    
        /**
         * Verifies a Arg.
         * @function
         * @param {Arg|Object} message Arg or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Arg.verify = (function() {
            /* eslint-disable */
            var util = $protobuf.util;
            var types; $lazyTypes.push(types = [null,"google.protobuf.Any"]);
            return function verify(m) {
                if(m["text"]!==undefined){
                    if(!Array.isArray(m["text"]))
                        return"invalid value for field .Arg.text (array expected)"
                    for(var i=0;i<m["text"].length;++i){
                        if(!util.isString(m["text"][i]))
                            return"invalid value for field .Arg.text (string[] expected)"
                    }
                }
                if(m["obj"]!==undefined){
                    if(!Array.isArray(m["obj"]))
                        return"invalid value for field .Arg.obj (array expected)"
                    for(var i=0;i<m["obj"].length;++i){
                        var r;
                        if(r=types[1].verify(m["obj"][i]))
                            return r
                    }
                }
                return null
            }
            /* eslint-enable */
        })();
    
        return Arg;
    })();
    
    /** @alias google */
    $root.google = (function() {
    
        /**
         * Namespace google.
         * @exports google
         * @namespace
         */
        var google = {};
    
        /** @alias google.protobuf */
        google.protobuf = (function() {
    
            /**
             * Namespace protobuf.
             * @exports google.protobuf
             * @namespace
             */
            var protobuf = {};
    
            /** @alias google.protobuf.Any */
            protobuf.Any = (function() {
    
                /**
                 * Constructs a new Any.
                 * @exports google.protobuf.Any
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                function Any(properties) {
                    if (properties) {
                        var keys = Object.keys(properties);
                        for (var i = 0; i < keys.length; ++i)
                            this[keys[i]] = properties[keys[i]];
                    }
                }
    
                /** @alias google.protobuf.Any.prototype */
                var $prototype = Any.prototype;
    
                /**
                 * Any type_url.
                 * @name google.protobuf.Any#type_url
                 * @type {string}
                 */
                $prototype["type_url"] = "";
    
                /**
                 * Any value.
                 * @name google.protobuf.Any#value
                 * @type {Uint8Array}
                 */
                $prototype["value"] = $protobuf.util.emptyArray;
    
                /**
                 * Encodes the specified Any.
                 * @function
                 * @param {google.protobuf.Any|Object} message Any or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                Any.encode = (function() {
                    /* eslint-disable */
                    var Writer = $protobuf.Writer;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function encode(m, w) {
                        w||(w=Writer.create())
                        if(m["type_url"]!==undefined&&m["type_url"]!=="")
                            w.uint32(10).string(m["type_url"])
                        if(m["value"]!==undefined&&m["value"]!==[])
                            w.uint32(18).bytes(m["value"])
                        return w
                    }
                    /* eslint-enable */
                })();
    
                /**
                 * Encodes the specified Any, length delimited.
                 * @param {google.protobuf.Any|Object} message Any or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                Any.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Any from the specified reader or buffer.
                 * @function
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.Any} Any
                 */
                Any.decode = (function() {
                    /* eslint-disable */
                    var Reader = $protobuf.Reader;
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function decode(r, l) {
                        r instanceof Reader||(r=Reader.create(r))
                        var c=l===undefined?r.len:r.pos+l,m=new $root.google.protobuf.Any
                        while(r.pos<c){
                            var t=r.int32()
                            switch(t>>>3){
                                case 1:
                                    m["type_url"]=r.string()
                                    break
                                case 2:
                                    m["value"]=r.bytes()
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
                 * Decodes a Any from the specified reader or buffer, length delimited.
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.Any} Any
                 */
                Any.decodeDelimited = function decodeDelimited(readerOrBuffer) {
                    readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
                    return this.decode(readerOrBuffer, readerOrBuffer.uint32());
                };
    
                /**
                 * Verifies a Any.
                 * @function
                 * @param {google.protobuf.Any|Object} message Any or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                Any.verify = (function() {
                    /* eslint-disable */
                    var util = $protobuf.util;
                    var types; $lazyTypes.push(types = [null,null]);
                    return function verify(m) {
                        if(m["type_url"]!==undefined){
                            if(!util.isString(m["type_url"]))
                                return"invalid value for field .google.protobuf.Any.type_url (string expected)"
                        }
                        if(m["value"]!==undefined){
                            if(!(m["value"]&&typeof m["value"].length==="number"||util.isString(m["value"])))
                                return"invalid value for field .google.protobuf.Any.value (buffer expected)"
                        }
                        return null
                    }
                    /* eslint-enable */
                })();
    
                return Any;
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

    $protobuf.roots["default"] = $root;

    return $root;
});
