module.exports = Method;

var ReflectionObject = require("./object");
/** @alias Method.prototype */
var MethodPrototype = ReflectionObject.extend(Method, [ "type", "requestType", "requestStream", "responseType", "responseStream" ]);

var Type = require("./type"),
    util = require("./util");

var _TypeError = util._TypeError;

/**
 * Reflected service method.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Method name
 * @param {string} type Usually "rpc"
 * @param {string} requestType Request message type
 * @param {string} responseType Response message type
 * @param {boolean} [requestStream] Whether the request is streamed
 * @param {boolean} [responseStream] Whether the response is streamed
 * @param {Object.<string,*>} [options] Method options
 */
function Method(name, type, requestType, responseType, requestStream, responseStream, options) {
    if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = undefined;
    } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = undefined;
    }
    if (!util.isString(type))
        throw _TypeError("type");
    if (!util.isString(requestType))
        throw _TypeError("requestType");
    if (!util.isString(responseType))
        throw _TypeError("responseType");
    
    ReflectionObject.call(this, name, options);

    /**
     * Method type.
     * @type {string}
     */
    this.type = type || "rpc"; // exposed

    /**
     * Request type.
     * @type {string}
     */
    this.requestType = requestType; // exposed, marker

    /**
     * Whether requests are streamed or not.
     * @type {boolean|undefined}
     */
    this.requestStream = requestStream ? true : undefined; // exposed

    /**
     * Response type.
     * @type {string}
     */
    this.responseType = responseType; // exposed

    /**
     * Whether responses are streamed or not.
     * @type {boolean|undefined}
     */
    this.responseStream = responseStream ? true : undefined; // exposed

    /**
     * Resolved request type.
     * @type {?Type}
     */
    this.resolvedRequestType = null;

    /**
     * Resolved response type.
     * @type {?Type}
     */
    this.resolvedResponseType = null;
}

Object.defineProperties(MethodPrototype, {

    // override
    object: {
        get: function() {
            return this._object || (this._object = MethodPrototype.call.bind(this));
        }
    }
});

/**
 * Tests if the specified JSON object describes a service method.
 * @param {Object} json JSON object
 * @returns {boolean} `true` if the object describes a map field
 */
Method.testJSON = function testJSON(json) {
    return Boolean(json && json.requestType !== undefined);
};

/**
 * Constructs a service method from JSON.
 * @param {string} name Method name
 * @param {Object} json JSON object
 * @returns {Method} Created method
 * @throws {TypeError} If arguments are invalid
 */
Method.fromJSON = function fromJSON(name, json) {
    return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options);
};

/**
 * @override
 */
MethodPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    var resolved = this.parent.lookup(this.requestType);
    if (!(resolved && resolved instanceof Type))
        throw Error("unresolvable request type: " + this.requestType);
    this.resolvedRequestType = resolved;
    resolved = this.parent.lookup(this.responseType);
    if (!(resolved && resolved instanceof Type))
        throw Error("unresolvable response type: " + this.requestType);
    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Calls this method.
 * @param {Prototype|Object} message Request message
 * @param {function(number[], function(?Error, (number[])=))} performRequest A function performing the
 * request on binary level, taking a buffer and a node-style callback for the response buffer as
 * its parameters.
 * @param {function(Error, Prototype=)} [callback] Node-style callback function
 * @param {Object} [ctx] Optional callback context
 * @returns {Promise<Prototype>|undefined} A promise if `callback` has been omitted
 */
MethodPrototype.call = function call(message, performRequest, callback, ctx) {
    if (!callback)
        return util.asPromise(MethodPrototype.call, this, message, performRequest, undefined, ctx);
    if (!ctx)
        ctx = this;
    var requestBuffer;
    try {
        requestBuffer = this.resolve().resolvedRequestType.encode(message);
    } catch (e1) {
        setTimeout(function() {
            callback.call(ctx, e1);
        });
        return undefined;
    }
    var self = this;
    performRequest(requestBuffer, function(err, responseBuffer) {
        if (!err) {
            try {
                callback.call(ctx, null, self.resolvedResponseType.decode(responseBuffer));
                return;
            } catch (e2) {
                err = e2;
            }
        }
        callback.call(ctx, err);
    });
    return undefined;
};
