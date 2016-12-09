"use strict";
module.exports = Service;

var EventEmitter = require("../util/eventemitter");

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @memberof rpc
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 */
function Service(rpcImpl) {
    EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` when the service is ended.
     * @type {?RPCImpl}
     */
    this.$rpc = rpcImpl;
}

/** @alias rpc.Service.prototype */
var ServicePrototype = Service.prototype = Object.create(EventEmitter.prototype);
ServicePrototype.constructor = Service;

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
ServicePrototype.end = function end(endedByRPC) {
    if (this.$rpc) {
        if (!endedByRPC) // signal end to rpcImpl
            this.$rpc(null, null, null);
        this.$rpc = null;
        this.emit('end').off();
    }
    return this;
};
