"use strict";
module.exports = Method;

var ReflectionObject = require("./object");
/** @alias Method.prototype */
var MethodPrototype = ReflectionObject.extend(Method);

var Type = require("./type"),
    util = require("./util");

var _TypeError = util._TypeError;

/**
 * Constructs a new service method.
 * @classdesc Reflected service method.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Method name
 * @param {string|undefined} type Method type, usually `"rpc"`
 * @param {string} requestType Request message type
 * @param {string} responseType Response message type
 * @param {boolean} [requestStream] Whether the request is streamed
 * @param {boolean} [responseStream] Whether the response is streamed
 * @param {Object} [options] Declared options
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
    this.type = type || "rpc"; // toJSON

    /**
     * Request type.
     * @type {string}
     */
    this.requestType = requestType; // toJSON, marker

    /**
     * Whether requests are streamed or not.
     * @type {boolean|undefined}
     */
    this.requestStream = requestStream ? true : undefined; // toJSON

    /**
     * Response type.
     * @type {string}
     */
    this.responseType = responseType; // toJSON

    /**
     * Whether responses are streamed or not.
     * @type {boolean|undefined}
     */
    this.responseStream = responseStream ? true : undefined; // toJSON

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
MethodPrototype.toJSON = function toJSON() {
    return {
        type           : this.type !== "rpc" && this.type || undefined,
        requestType    : this.requestType,
        requestStream  : this.requestStream,
        responseType   : this.responseType,
        responseStream : this.responseStream,
        options        : this.options
    };
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
 * @param {function(number[], function(?Error, (number[])=))} performRequest A function performing the request on binary level, taking a buffer and a node-style callback for the response buffer as its parameters.
 * @param {function(Error, Prototype=)} [callback] Node-style callback function
 * @returns {Promise<Prototype>|undefined} A promise if `callback` has been omitted
 */
MethodPrototype.call = function call(message, performRequest, callback) {
    if (!callback)
        return util.asPromise(call, this, message, performRequest);
    var requestBuffer;
    try {
        requestBuffer = this.resolve().resolvedRequestType.encode(message);
    } catch (e1) {
        setTimeout(function() {
            callback(e1);
        });
        return undefined;
    }
    var self = this;
    performRequest(requestBuffer, function(err, responseBuffer) {
        if (!err) {
            try {
                callback(null, self.resolvedResponseType.decode(responseBuffer));
                return;
            } catch (e2) {
                err = e2;
            }
        }
        callback(err);
    });
    return undefined;
};
