/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("../../minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = $protobuf.roots.test_rpc || ($protobuf.roots.test_rpc = {});

$root.MyService = (function() {

    /**
     * Constructs a new MyService service.
     * @exports MyService
     * @extends $protobuf.rpc.Service
     * @constructor
     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     */
    function MyService(rpcImpl, requestDelimited, responseDelimited) {
        $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
    }

    (MyService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = MyService;

    /**
     * Creates new MyService service using the specified rpc implementation.
     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     * @returns {MyService} RPC service. Useful where requests and/or responses are streamed.
     */
    MyService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        return new this(rpcImpl, requestDelimited, responseDelimited);
    };

    /**
     * Callback as used by {@link MyService#myMethod}.
     * @typedef MyService_myMethod_Callback
     * @type {function}
     * @param {?Error} error Error, if any
     * @param {MyResponse} [response] MyResponse
     */

    /**
     * Calls MyMethod.
     * @param {MyRequest|Object} request MyRequest message or plain object
     * @param {MyService_myMethod_Callback} callback Node-style callback called with the error, if any, and MyResponse
     * @returns {undefined}
     */
    MyService.prototype.myMethod = function myMethod(request, callback) {
        return this.rpcCall(myMethod, $root.MyRequest, $root.MyResponse, request, callback);
    };

    /**
     * Calls MyMethod.
     * @name MyService#myMethod
     * @function
     * @param {MyRequest|Object} request MyRequest message or plain object
     * @returns {Promise<MyResponse>} Promise
     * @variation 2
     */

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
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
    }

    /**
     * MyRequest path.
     * @type {string}
     */
    MyRequest.prototype.path = "";

    /**
     * Creates a new MyRequest instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {MyRequest} MyRequest instance
     */
    MyRequest.create = function create(properties) {
        return new MyRequest(properties);
    };

    /**
     * Encodes the specified MyRequest message.
     * @param {MyRequest|Object} message MyRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MyRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.path !== undefined && message.hasOwnProperty("path"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.path);
        return writer;
    };

    /**
     * Encodes the specified MyRequest message, length delimited.
     * @param {MyRequest|Object} message MyRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MyRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MyRequest message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MyRequest} MyRequest
     */
    MyRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MyRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.path = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MyRequest message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MyRequest} MyRequest
     */
    MyRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MyRequest message.
     * @param {MyRequest|Object} message MyRequest message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    MyRequest.verify = function verify(message) {
        if (message.path !== undefined)
            if (!$util.isString(message.path))
                return "path: string expected";
        return null;
    };

    /**
     * Creates a MyRequest message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {MyRequest} MyRequest
     */
    MyRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.MyRequest)
            return object;
        var message = new $root.MyRequest();
        if (object.path !== undefined && object.path !== null)
            message.path = String(object.path);
        return message;
    };

    /**
     * Creates a MyRequest message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link MyRequest.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {MyRequest} MyRequest
     */
    MyRequest.from = MyRequest.fromObject;

    /**
     * Creates a plain object from a MyRequest message. Also converts values to other types if specified.
     * @param {MyRequest} message MyRequest
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MyRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.path = "";
        if (message.path !== undefined && message.path !== null && message.hasOwnProperty("path"))
            object.path = message.path;
        return object;
    };

    /**
     * Creates a plain object from this MyRequest message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MyRequest.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this MyRequest to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    MyRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

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
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
    }

    /**
     * MyResponse status.
     * @type {number}
     */
    MyResponse.prototype.status = 0;

    /**
     * Creates a new MyResponse instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {MyResponse} MyResponse instance
     */
    MyResponse.create = function create(properties) {
        return new MyResponse(properties);
    };

    /**
     * Encodes the specified MyResponse message.
     * @param {MyResponse|Object} message MyResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MyResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.status !== undefined && message.hasOwnProperty("status"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
        return writer;
    };

    /**
     * Encodes the specified MyResponse message, length delimited.
     * @param {MyResponse|Object} message MyResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MyResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MyResponse message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MyResponse} MyResponse
     */
    MyResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MyResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 2:
                message.status = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MyResponse message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MyResponse} MyResponse
     */
    MyResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MyResponse message.
     * @param {MyResponse|Object} message MyResponse message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    MyResponse.verify = function verify(message) {
        if (message.status !== undefined)
            if (!$util.isInteger(message.status))
                return "status: integer expected";
        return null;
    };

    /**
     * Creates a MyResponse message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {MyResponse} MyResponse
     */
    MyResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.MyResponse)
            return object;
        var message = new $root.MyResponse();
        if (object.status !== undefined && object.status !== null)
            message.status = object.status | 0;
        return message;
    };

    /**
     * Creates a MyResponse message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link MyResponse.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {MyResponse} MyResponse
     */
    MyResponse.from = MyResponse.fromObject;

    /**
     * Creates a plain object from a MyResponse message. Also converts values to other types if specified.
     * @param {MyResponse} message MyResponse
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MyResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.status = 0;
        if (message.status !== undefined && message.status !== null && message.hasOwnProperty("status"))
            object.status = message.status;
        return object;
    };

    /**
     * Creates a plain object from this MyResponse message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MyResponse.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this MyResponse to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    MyResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MyResponse;
})();

// Resolve lazy type references to actual types
$util.lazyResolve($root, $lazyTypes);

module.exports = $root;
