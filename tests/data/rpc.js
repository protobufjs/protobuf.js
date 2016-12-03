;(function(global, factory) {

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobuf"], factory);
    
    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("../../runtime"));
    
    /* Global */ else
        global.root = factory(global.protobuf);

})(this, function($runtime) {
    "use strict";

    // Lazily resolved type references
    var $lazyTypes = [];

    // Exported root namespace
    var $root = {};

    /** @alias MyService */
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
        MyService.prototype.myMethod = function myMethod(request, callback) {
            var requestData;
            try {
                requestData = (this.requestDelimited && $root.MyRequest.encodeDelimited(request) || $root.MyRequest.encode(request)).finish();
            } catch (err) {
                (typeof setImmediate === 'function' && setImmediate || setTimeout)(function() { callback(err); });
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
                    response = self.responseDelimited && $root.MyResponse.decodeDelimited(responseData) || $root.MyResponse.decode(responseData);
                } catch (err2) {
                    callback(err2);
                    return;
                }
                callback(null, response);
            });
        };

        return MyService;
    })();

    /** @alias MyRequest */
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

        MyRequest.prototype.path = "";

        /**
         * Encodes the specified MyRequest.
         * @function
         * @param {MyRequest|Object} message MyRequest or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        MyRequest.encode = (function() {
            /* eslint-disable */
            var Writer = $runtime.Writer;
            var util = $runtime.util;
            var types; $lazyTypes.push(types = [null]);
            return function encode(m,w) {
                w||(w=Writer())
                if(m['path']!==undefined&&m['path']!=="")
                    w.tag(1,2).string(m['path'])
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
            var Reader = $runtime.Reader;
            var util = $runtime.util;
            var types; $lazyTypes.push(types = [null]);
            return function decode(r,l) {
                r instanceof Reader||(r=Reader(r))
                var c=l===undefined?r.len:r.pos+l,m=new $root.MyRequest
                while(r.pos<c){
                    var t=r.tag()
                    switch(t.id){
                        case 1:
                            m['path']=r.string()
                            break
                        default:
                            r.skipType(t.wireType)
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
            readerOrBuffer = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };

        /**
         * Verifies a MyRequest.
         * @param {MyRequest|Object} message MyRequest or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        MyRequest.verify = (function() {
            /* eslint-disable */
            var types; $lazyTypes.push(types = [null]);
            return function verify(m) {
                return null
            }
            /* eslint-enable */
        })();

        return MyRequest;
    })();

    /** @alias MyResponse */
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

        MyResponse.prototype.status = 0;

        /**
         * Encodes the specified MyResponse.
         * @function
         * @param {MyResponse|Object} message MyResponse or plain object to encode
         * @param {Writer} [writer] Writer to encode to
         * @returns {Writer} Writer
         */
        MyResponse.encode = (function() {
            /* eslint-disable */
            var Writer = $runtime.Writer;
            var util = $runtime.util;
            var types; $lazyTypes.push(types = [null]);
            return function encode(m,w) {
                w||(w=Writer())
                if(m['status']!==undefined&&m['status']!==0)
                    w.tag(2,0).int32(m['status'])
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
            var Reader = $runtime.Reader;
            var util = $runtime.util;
            var types; $lazyTypes.push(types = [null]);
            return function decode(r,l) {
                r instanceof Reader||(r=Reader(r))
                var c=l===undefined?r.len:r.pos+l,m=new $root.MyResponse
                while(r.pos<c){
                    var t=r.tag()
                    switch(t.id){
                        case 2:
                            m['status']=r.int32()
                            break
                        default:
                            r.skipType(t.wireType)
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
            readerOrBuffer = readerOrBuffer instanceof Reader ? readerOrBuffer : Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };

        /**
         * Verifies a MyResponse.
         * @param {MyResponse|Object} message MyResponse or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        MyResponse.verify = (function() {
            /* eslint-disable */
            var types; $lazyTypes.push(types = [null]);
            return function verify(m) {
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

    return $root;
});
