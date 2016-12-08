"use strict";
module.exports = Service;

var EventEmitter = require("../util/eventemitter");

/**
 * Constructs a new RPC service.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @memberof rpc
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 */
function Service(rpcImpl) {
    EventEmitter.call(this);

    /**
     * RPC implementation.
     * @type {RPCImpl}
     */
    this.$rpc = rpcImpl;
}

/** @alias rpc.Service.prototype */
var ServicePrototype = Service.prototype = Object.create(EventEmitter.prototype);
ServicePrototype.constructor = Service;

/**
 * Ends this service and emits the `end` event.
 * @returns {rpc.Service} `this`
 */
ServicePrototype.end = function end() {
    return this.emit('end').off();
};
