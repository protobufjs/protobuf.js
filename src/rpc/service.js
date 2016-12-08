"use strict";
module.exports = Service;

/**
 * Constructs a new RPC service.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @memberof rpc
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 */
function Service(rpcImpl) {

    /**
     * RPC implementation.
     * @type {RPCImpl}
     */
    this.$rpc = rpcImpl;

    /**
     * Service listeners.
     * @type {Object.<string,function[]>}
     * @private
     */
    this._listeners = {};
}

/** @alias rpc.Service.prototype */
var ServicePrototype = Service.prototype;

/**
 * Registers an event listener.
 * @param {string} evt Event name, one of `"data"`, `"error"`, `"end"`
 * @param {function} cb Listener
 * @returns {rpc.Service} `this`
 */
ServicePrototype.on = function on(evt, cb) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push(cb);
    return this;
};

/**
 * Removes an event listener.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [cb] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {rpc.Service} `this`
 */
ServicePrototype.off = function off(evt, cb) {
    if (evt) {
        if (cb) {
            var p = (this._listeners[evt] || []).indexOf(cb);
            if (p > -1)
                this._listeners[evt].splice(p, 1);
        } else
            this._listeners[evt] = [];
    } else
        this._listeners = {};
    return this;
};

/**
 * Emits an event.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {rpc.Service} `this`
 */
ServicePrototype.emit = function emit(evt) {
    if (this._listeners[evt]) {
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < this._listeners[evt].length; ++i)
            this._listeners[evt][i].apply(this, args);
    }
    return this;
};

/**
 * Ends this service and emits the `end` event.
 * @returns {rpc.Service} `this`
 */
ServicePrototype.end = function end() {
    return this.emit('end').off();
};
