import { util } from "../util/minimal.js";

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<TRes|null>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

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
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Service callback
 * @returns {Promise<TRes|null>} Promise if `callback` has been omitted, otherwise `undefined`
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
    if (!request)
        throw TypeError("request must be specified");

    var self = this,
        promise,
        resolvePromise,
        rejectPromise;
    if (!callback) {
        promise = new Promise(function executor(resolve, reject) {
            resolvePromise = resolve;
            rejectPromise = reject;
        });
        callback = function promiseCallback(err, response) {
            if (err)
                rejectPromise(err);
            else
                resolvePromise(response);
        };
    }

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return promise;
    }

    var settled = false;
    function rpcCallback(err, response) {
        if (settled)
            return;
        settled = true;

        if (err) {
            self.emit("error", err, method);
            callback(err);
            return;
        }

        if (response === null) {
            self.end(/* endedByRPC */ true);
            if (promise)
                callback(null, null);
            return;
        }

        if (!(response instanceof responseCtor)) {
            try {
                response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
            } catch (err) {
                self.emit("error", err, method);
                callback(err);
                return;
            }
        }

        self.emit("data", response, method);
        callback(null, response);
    }

    try {
        var pending = self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            rpcCallback
        );
        if (pending && typeof pending.then === "function")
            pending.then(function(response) {
                rpcCallback(null, response);
            }, function(err) {
                rpcCallback(err);
            });
    } catch (err) {
        if (!settled) {
            settled = true;
            self.emit("error", err, method);
            setTimeout(function() { callback(err); }, 0);
        }
    }
    return promise;
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};

export { Service };
