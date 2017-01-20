"use strict";
module.exports = Service;

var EventEmitter = require("../util").EventEmitter;

/**
 * A service method callback as used by {@link ServiceMethod}.
 * @typedef ServiceMethodCallback
 * @type {function}
 * @param {?Error} error Error, if any
 * @param {?Message} [response] Response message or `null` if service has been terminated server-side
 * @returns {undefined}
 */

/**
 * A service method part of an {@link rpc.Service} as created by {@link Service.create}.
 * @typedef ServiceMethod
 * @type {function}
 * @param {Message|Object} request Request message or plain object
 * @param {ServiceMethodCallback} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * A service method mixin.
 * @typedef ServiceMethodMixin
 * @type {Object.<string,ServiceMethod>}
 */

// Mixed in methods are not directly supported by TypeScript because they cannot be statically
// typed. Instead, either use a TypeScript definition of a static module to work around it, or use:
//
//   (myService["myMethod"] as protobuf.ServiceMethod)(...)
//

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @augments ServiceMethodMixin
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 */
function Service(rpcImpl) {
    EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {?RPCImpl}
     */
    this.$rpc = rpcImpl;
}

(Service.prototype = Object.create(EventEmitter.prototype)).constructor = Service;

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.$rpc) {
        if (!endedByRPC) // signal end to rpcImpl
            this.$rpc(null, null, null);
        this.$rpc = null;
        this.emit("end").off();
    }
    return this;
};
