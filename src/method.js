"use strict";
module.exports = Method;

// extends ReflectionObject
var ReflectionObject = require("./object");
/** @alias Method.prototype */
var MethodPrototype = ReflectionObject.extend(Method);

Method.className = "Method";

var Type = require("./type"),
    util = require("./util");

/**
 * Constructs a new service method instance.
 * @classdesc Reflected service method.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Method name
 * @param {string|undefined} type Method type, usually `"rpc"`
 * @param {string} requestType Request message type
 * @param {string} responseType Response message type
 * @param {boolean|Object.<string,*>} [requestStream] Whether the request is streamed
 * @param {boolean|Object.<string,*>} [responseStream] Whether the response is streamed
 * @param {Object.<string,*>} [options] Declared options
 */
function Method(name, type, requestType, responseType, requestStream, responseStream, options) {
    /* istanbul ignore next */
    if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = undefined;
    /* istanbul ignore next */
    } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = undefined;
    }

    /* istanbul ignore next */
    if (type && !util.isString(type))
        throw TypeError("type must be a string");
    /* istanbul ignore next */
    if (!util.isString(requestType))
        throw TypeError("requestType must be a string");
    /* istanbul ignore next */
    if (!util.isString(responseType))
        throw TypeError("responseType must be a string");

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
 * @param {*} json JSON object
 * @returns {boolean} `true` if the object describes a map field
 */
Method.testJSON = function testJSON(json) {
    return Boolean(json && json.requestType !== undefined);
};

/**
 * Constructs a service method from JSON.
 * @param {string} name Method name
 * @param {Object.<string,*>} json JSON object
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
        type           : this.type !== "rpc" && /* istanbul ignore next */ this.type || undefined,
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

    /* istanbul ignore next */
    if (!(this.resolvedRequestType = this.parent.lookup(this.requestType, Type)))
        throw Error("unresolvable request type: " + this.requestType);
    /* istanbul ignore next */
    if (!(this.resolvedResponseType = this.parent.lookup(this.responseType, Type)))
        throw Error("unresolvable response type: " + this.requestType);

    return ReflectionObject.prototype.resolve.call(this);
};
