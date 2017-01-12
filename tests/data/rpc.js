/*eslint-disable block-scoped-var, no-redeclare, no-control-regex*/
"use strict";

var $protobuf = require("../../runtime");

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = {};

$root.MyService = (function() {

    /**
     * RPC implementation passed to services performing a service request on network level, i.e. by utilizing http requests or websockets.
     * @typedef RPCImpl
     * @type {function}
     * @param {$protobuf.Method} method Reflected method being called
     * @param {Uint8Array} requestData Request data
     * @param {RPCCallback} callback Callback function
     * @returns {undefined}
     */

    /**
     * Node-style callback as used by {@link RPCImpl}.
     * @typedef RPCCallback
     * @type {function}
     * @param {?Error} error Error, if any, otherwise `null`
     * @param {Uint8Array} [responseData] Response data or `null` to signal end of stream, if there hasn't been an error
     * @returns {undefined}
     */

    /**
     * Constructs a new MyService service.
     * @exports MyService
     * @constructor
     * @param {RPCImpl} rpc RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     */
    function MyService(rpc, requestDelimited, responseDelimited) {

        /**
         * RPC implementation.
         * @type {RPCImpl}
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
    }

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
    MyService.prototype["myMethod"] = function myMethod(request, callback) {
        var requestData;
        try {
            requestData = (this.requestDelimited ? $root.MyRequest.encodeDelimited(request) : $root.MyRequest.encode(request)).finish();
        } catch (err) {
            (typeof setImmediate === "function" ? setImmediate : setTimeout)(function() { callback(err); });
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
     * @type {string}
     */
    $prototype.path = "";

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
     * @function
     * @param {MyRequest|Object} message MyRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MyRequest.encode = (function(Writer) { return function encode(message, writer) {
        if (!writer) {
            writer = Writer.create();
        }
        if (message.path !== undefined && message.path !== "") {
            writer.uint32(10).string(message.path);
        }
        return writer;
    };})($protobuf.Writer);

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
     * @function
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MyRequest} MyRequest
     */
    MyRequest.decode = (function(Reader) { return function decode(reader, len) {
        if (!(reader instanceof Reader)) {
            reader = Reader.create(reader);
        }
        var end = len === undefined ? reader.len : reader.pos + len, message = new $root.MyRequest();
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
    };})($protobuf.Reader);

    /**
     * Decodes a MyRequest message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {MyRequest} MyRequest
     */
    MyRequest.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a MyRequest message.
     * @function
     * @param {MyRequest|Object} message MyRequest message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    MyRequest.verify = (function(util) { return function verify(message) {
        if (message.path !== undefined) {
            if (!util.isString(message.path)) {
                return "MyRequest.path: string expected";
            }
        }
        return null;
    };})($protobuf.util);

    /**
     * Creates a MyRequest message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {MyRequest} MyRequest
     */
    MyRequest.fromObject = (function() { return function fromObject(object) {
        var message = new $root.MyRequest();
        if (object.path !== undefined && object.path !== null) {
            message.path = String(object.path);
        }
        return message;
    };})();

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
    MyRequest.toObject = (function() { return function toObject(message, options) {
        if (!options) {
            options = {};
        }
        var object = {};
        if (options.defaults) {
            object.path = "";
        }
        for (var keys = Object.keys(message), i = 0; i < keys.length; ++i) {
            switch (keys[i]) {
            case "path":
                if (message.path !== undefined && message.path !== null) {
                    object.path = message.path;
                }
                break;
            }
        }
        return object;
    };})();

    /**
     * Creates a plain object from this MyRequest message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    $prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this MyRequest to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    $prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, {
            longs: String,
            enums: String,
            bytes: String
        });
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
     * @type {number}
     */
    $prototype.status = 0;

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
     * @function
     * @param {MyResponse|Object} message MyResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MyResponse.encode = (function(Writer) { return function encode(message, writer) {
        if (!writer) {
            writer = Writer.create();
        }
        if (message.status !== undefined && message.status !== 0) {
            writer.uint32(16).int32(message.status);
        }
        return writer;
    };})($protobuf.Writer);

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
     * @function
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MyResponse} MyResponse
     */
    MyResponse.decode = (function(Reader) { return function decode(reader, len) {
        if (!(reader instanceof Reader)) {
            reader = Reader.create(reader);
        }
        var end = len === undefined ? reader.len : reader.pos + len, message = new $root.MyResponse();
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
    };})($protobuf.Reader);

    /**
     * Decodes a MyResponse message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {MyResponse} MyResponse
     */
    MyResponse.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a MyResponse message.
     * @function
     * @param {MyResponse|Object} message MyResponse message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    MyResponse.verify = (function(util) { return function verify(message) {
        if (message.status !== undefined) {
            if (!util.isInteger(message.status)) {
                return "MyResponse.status: integer expected";
            }
        }
        return null;
    };})($protobuf.util);

    /**
     * Creates a MyResponse message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {MyResponse} MyResponse
     */
    MyResponse.fromObject = (function() { return function fromObject(object) {
        var message = new $root.MyResponse();
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status | 0;
        }
        return message;
    };})();

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
    MyResponse.toObject = (function() { return function toObject(message, options) {
        if (!options) {
            options = {};
        }
        var object = {};
        if (options.defaults) {
            object.status = 0;
        }
        for (var keys = Object.keys(message), i = 0; i < keys.length; ++i) {
            switch (keys[i]) {
            case "status":
                if (message.status !== undefined && message.status !== null) {
                    object.status = message.status;
                }
                break;
            }
        }
        return object;
    };})();

    /**
     * Creates a plain object from this MyResponse message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    $prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this MyResponse to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    $prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, {
            longs: String,
            enums: String,
            bytes: String
        });
    };

    return MyResponse;
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

$protobuf.roots["test_rpc"] = $root;

module.exports = $root;
