"use strict"; // eslint-disable-line strict

var $protobuf = require("../../runtime");

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = {};

$root.MyService = (function() {

    /**
     * Constructs a new MyService.
     * @exports MyService
     * @constructor
     * @param {function(function, Uint8Array, function)} rpc RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     */
    function MyService(rpc, requestDelimited, responseDelimited) {

        /**
         * RPC implementation.
         * @type {function(function, Uint8Array, function)}
         */
        this.rpc = rpc;

        /**
         * Whether requests are length-delimited.
         * @type {boolean}
         */
        this.requestDelimited = Boolean(requestDelimited);

        /**
         * Whether responses are length-delimited.
         * @type {boolean}
         */
        this.responseDelimited = Boolean(responseDelimited);
    };

    /**
     * Calls MyMethod.
     * @param {MyRequest|Object} request MyRequest or plain object
     * @param {function(?Error, MyResponse=)} callback Node-style callback called with the error, if any, and MyResponse
     * @returns {undefined}
     */
    MyService.prototype["myMethod"] = function myMethod(request, callback) {
        var requestData;
        try {
            requestData = (this.requestDelimited ? $root.MyRequest.encodeDelimited(request) : $root.MyRequest.encode(request)).finish();
        } catch (err) {
            (typeof setImmediate === 'function' ? setImmediate : setTimeout)(function() { callback(err); });
            return;
        }
        var self = this;
        this.rpc(myMethod, requestData, function(err, responseData) {
            if (err) {
                callback(err);
                return;
            }
            var response;
            try {
                response = self.responseDelimited ? $root.MyResponse.decodeDelimited(responseData) : $root.MyResponse.decode(responseData);
            } catch (err2) {
                callback(err2);
                return;
            }
            callback(null, response);
        });
    };

    return MyService;
})();

$root.MyRequest = (function() {

    /**
     * Constructs a new MyRequest.
     * @exports MyRequest
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function MyRequest(properties) {
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias MyRequest.prototype */
    var $prototype = MyRequest.prototype;

    /**
     * MyRequest path.
     * @name MyRequest#path
     * @type {string}
     */
    $prototype["path"] = "";

    /**
     * Creates a new MyRequest instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {MyRequest} MyRequest instance
     */
    MyRequest.create = function create(properties) {
        return new MyRequest(properties);
    };

    /**
     * Encodes the specified MyRequest.
     * @function
     * @param {MyRequest|Object} message MyRequest or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    MyRequest.encode = (function() {
        /* eslint-disable */
        var Writer = $protobuf.Writer;
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null]);
        return function encode(m, w) {
            w||(w=Writer.create())
            if(m["path"]!==undefined&&m["path"]!=="")
                w.uint32(10).string(m["path"])
            return w
        }
        /* eslint-enable */
    })();

    /**
     * Encodes the specified MyRequest, length delimited.
     * @param {MyRequest|Object} message MyRequest or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    MyRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MyRequest from the specified reader or buffer.
     * @function
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MyRequest} MyRequest
     */
    MyRequest.decode = (function() {
        /* eslint-disable */
        var Reader = $protobuf.Reader;
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null]);
        return function decode(r, l) {
            r instanceof Reader||(r=Reader.create(r))
            var c=l===undefined?r.len:r.pos+l,m=new $root.MyRequest
            while(r.pos<c){
                var t=r.int32()
                switch(t>>>3){
                    case 1:
                        m["path"]=r.string()
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
     * Decodes a MyRequest from the specified reader or buffer, length delimited.
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {MyRequest} MyRequest
     */
    MyRequest.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a MyRequest.
     * @function
     * @param {MyRequest|Object} message MyRequest or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    MyRequest.verify = (function() {
        /* eslint-disable */
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null]);
        return function verify(m) {
            if(m["path"]!==undefined){
                if(!util.isString(m["path"]))
                    return"invalid value for field .MyRequest.path (string expected)"
            }
            return null
        }
        /* eslint-enable */
    })();

    return MyRequest;
})();

$root.MyResponse = (function() {

    /**
     * Constructs a new MyResponse.
     * @exports MyResponse
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function MyResponse(properties) {
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /** @alias MyResponse.prototype */
    var $prototype = MyResponse.prototype;

    /**
     * MyResponse status.
     * @name MyResponse#status
     * @type {number}
     */
    $prototype["status"] = 0;

    /**
     * Creates a new MyResponse instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {MyResponse} MyResponse instance
     */
    MyResponse.create = function create(properties) {
        return new MyResponse(properties);
    };

    /**
     * Encodes the specified MyResponse.
     * @function
     * @param {MyResponse|Object} message MyResponse or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    MyResponse.encode = (function() {
        /* eslint-disable */
        var Writer = $protobuf.Writer;
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null]);
        return function encode(m, w) {
            w||(w=Writer.create())
            if(m["status"]!==undefined&&m["status"]!==0)
                w.uint32(16).int32(m["status"])
            return w
        }
        /* eslint-enable */
    })();

    /**
     * Encodes the specified MyResponse, length delimited.
     * @param {MyResponse|Object} message MyResponse or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    MyResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MyResponse from the specified reader or buffer.
     * @function
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MyResponse} MyResponse
     */
    MyResponse.decode = (function() {
        /* eslint-disable */
        var Reader = $protobuf.Reader;
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null]);
        return function decode(r, l) {
            r instanceof Reader||(r=Reader.create(r))
            var c=l===undefined?r.len:r.pos+l,m=new $root.MyResponse
            while(r.pos<c){
                var t=r.int32()
                switch(t>>>3){
                    case 2:
                        m["status"]=r.int32()
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
     * Decodes a MyResponse from the specified reader or buffer, length delimited.
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {MyResponse} MyResponse
     */
    MyResponse.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a MyResponse.
     * @function
     * @param {MyResponse|Object} message MyResponse or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    MyResponse.verify = (function() {
        /* eslint-disable */
        var util = $protobuf.util;
        var types; $lazyTypes.push(types = [null]);
        return function verify(m) {
            if(m["status"]!==undefined){
                if(!util.isInteger(m["status"]))
                    return"invalid value for field .MyResponse.status (integer expected)"
            }
            return null
        }
        /* eslint-enable */
    })();

    return MyResponse;
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

$protobuf.roots["test_rpc"] = $root;

module.exports = $root;
