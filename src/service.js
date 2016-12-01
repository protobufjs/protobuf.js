"use strict";
module.exports = Service;

var Namespace = require("./namespace");
/** @alias Namespace.prototype */
var NamespacePrototype = Namespace.prototype;
/** @alias Service.prototype */
var ServicePrototype = Namespace.extend(Service);

var Method = require("./method"),
    util   = require("./util");

/**
 * Constructs a new service.
 * @classdesc Reflected service.
 * @extends Namespace
 * @constructor
 * @param {string} name Service name
 * @param {Object.<string,*>} [options] Service options
 * @throws {TypeError} If arguments are invalid
 */
function Service(name, options) {
    Namespace.call(this, name, options);

    /**
     * Service methods.
     * @type {Object.<string,Method>}
     */
    this.methods = {}; // toJSON, marker

    /**
     * Cached methods as an array.
     * @type {?Method[]}
     * @private
     */
    this._methodsArray = null;
}

Object.defineProperties(ServicePrototype, {

    /**
     * Methods of this service as an array for iteration.
     * @name Service#methodsArray
     * @type {Method[]}
     * @readonly
     */
    methodsArray: {
        get: ServicePrototype.getMethodsArray = function getMethodsArray() {
            return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
        }
    }

});

function clearCache(service) {
    service._methodsArray = null;
    return service;
}

/**
 * Tests if the specified JSON object describes a service.
 * @param {Object} json JSON object to test
 * @returns {boolean} `true` if the object describes a service
 */
Service.testJSON = function testJSON(json) {
    return Boolean(json && json.methods);
};

/**
 * Constructs a service from JSON.
 * @param {string} name Service name
 * @param {Object} json JSON object
 * @returns {Service} Created service
 * @throws {TypeError} If arguments are invalid
 */
Service.fromJSON = function fromJSON(name, json) {
    var service = new Service(name, json.options);
    if (json.methods)
        Object.keys(json.methods).forEach(function(methodName) {
            service.add(Method.fromJSON(methodName, json.methods[methodName]));
        });
    return service;
};

/**
 * @override
 */
ServicePrototype.toJSON = function toJSON() {
    var inherited = NamespacePrototype.toJSON.call(this);
    return {
        options : inherited && inherited.options || undefined,
        methods : Namespace.arrayToJSON(this.getMethodsArray()) || {},
        nested  : inherited && inherited.nested || undefined
    };
};

/**
 * @override
 */
ServicePrototype.get = function get(name) {
    return NamespacePrototype.get.call(this, name) || this.methods[name] || null;
};

/**
 * @override
 */
ServicePrototype.resolveAll = function resolve() {
    var methods = this.getMethodsArray();
    for (var i = 0; i < methods.length; ++i)
        methods[i].resolve();
    return NamespacePrototype.resolve.call(this);
};

/**
 * @override
 */
ServicePrototype.add = function add(object) {
    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + '" in ' + this);
    if (object instanceof Method) {
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
    }
    return NamespacePrototype.add.call(this, object);
};

/**
 * @override
 */
ServicePrototype.remove = function remove(object) {
    if (object instanceof Method) {
        if (this.methods[object.name] !== object)
            throw Error(object + " is not a member of " + this);
        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
    }
    return NamespacePrototype.remove.call(this, object);
};

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @function
 * @param {Method} method Reflected method being called
 * @param {Uint8Array} requestData Request data
 * @param {function(?Error, Uint8Array=)} callback Node-style callback called with the error, if any, and the response data
 * @returns {undefined}
 */

/**
 * Creates a runtime service using the specified rpc implementation.
 * @param {function(Method, Uint8Array, function)} rpc RPC implementation ({@link RPCImpl|see})
 * @param {boolean} [requestDelimited=false] Whether request data is length delimited
 * @param {boolean} [responseDelimited=false] Whether response data is length delimited
 * @returns {Object} Runtime service
 */
ServicePrototype.create = function create(rpc, requestDelimited, responseDelimited) {
    var rpcService = {};
    Object.defineProperty(rpcService, "$rpc", {
        value: rpc
    });
    this.getMethodsArray().forEach(function(method) {
        rpcService[method.name] = function(request, callback) {
            method.resolve();
            var requestData;
            try {
                requestData = (requestDelimited && method.resolvedRequestType.encodeDelimited(request) || method.resolvedRequestType.encode(request)).finish();
            } catch (err) {
                (typeof setImmediate === 'function' && setImmediate || setTimeout)(function() { callback(err); });
                return;
            }
            // Calls the custom RPC implementation with the reflected method and binary request data
            // and expects the rpc implementation to call its callback with the binary response data.
            rpc(method, requestData, function(err, responseData) {
                if (err) {
                    callback(err);
                    return;
                }
                var response;
                try {
                    response = responseDelimited && method.resolvedResponseType.decodeDelimited(responseData) || method.resolvedResponseType.decode(responseData);
                } catch (err2) {
                    callback(err2);
                    return;
                }
                callback(null, response);
            });
        };
    });
    return rpcService;
};
