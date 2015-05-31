/*?
 // --- Scope ------------------
 // T : Reflect.Service instance
 */
/**
 * Constructs a new runtime Service.
 * @name ProtoBuf.Builder.Service
 * @param {function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))=} rpcImpl RPC implementation receiving the method name and the message
 * @class Barebone of all runtime services.
 * @constructor
 * @throws {Error} If the service cannot be created
 */
var Service = function(rpcImpl) {
    ProtoBuf.Builder.Service.call(this);

    /**
     * Service implementation.
     * @name ProtoBuf.Builder.Service#rpcImpl
     * @type {!function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))}
     * @expose
     */
    this.rpcImpl = rpcImpl || function(name, msg, callback) {
        // This is what a user has to implement: A function receiving the method name, the actual message to
        // send (type checked) and the callback that's either provided with the error as its first
        // argument or null and the actual response message.
        setTimeout(callback.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0); // Must be async!
    };
};

/**
 * @alias ProtoBuf.Builder.Service.prototype
 * @inner
 */
var ServicePrototype = Service.prototype = Object.create(ProtoBuf.Builder.Service.prototype);

/**
 * Asynchronously performs an RPC call using the given RPC implementation.
 * @name ProtoBuf.Builder.Service.[Method]
 * @function
 * @param {!function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))} rpcImpl RPC implementation
 * @param {ProtoBuf.Builder.Message} req Request
 * @param {function(Error, (ProtoBuf.Builder.Message|ByteBuffer|Buffer|string)=)} callback Callback receiving
 *  the error if any and the response either as a pre-parsed message or as its raw bytes
 * @abstract
 */

/**
 * Asynchronously performs an RPC call using the instance's RPC implementation.
 * @name ProtoBuf.Builder.Service#[Method]
 * @function
 * @param {ProtoBuf.Builder.Message} req Request
 * @param {function(Error, (ProtoBuf.Builder.Message|ByteBuffer|Buffer|string)=)} callback Callback receiving
 *  the error if any and the response either as a pre-parsed message or as its raw bytes
 * @abstract
 */

var rpc = T.getChildren(ProtoBuf.Reflect.Service.RPCMethod);
for (var i=0; i<rpc.length; i++) {
    (function(method) {

        // service#Method(message, callback)
        ServicePrototype[method.name] = function(req, callback) {
            try {
                try {
                    // If given as a buffer, decode the request. Will throw a TypeError if not a valid buffer.
                    req = method.resolvedRequestType.clazz.decode(ByteBuffer.wrap(req));
                } catch (err) {
                    if (!(err instanceof TypeError))
                        throw err;
                }
                if (!req || !(req instanceof method.resolvedRequestType.clazz)) {
                    setTimeout(callback.bind(this, Error("Illegal request type provided to service method "+T.name+"#"+method.name)), 0);
                    return;
                }
                this.rpcImpl(method.fqn(), req, function(err, res) { // Assumes that this is properly async
                    if (err) {
                        callback(err);
                        return;
                    }
                    try { res = method.resolvedResponseType.clazz.decode(res); } catch (notABuffer) {}
                    if (!res || !(res instanceof method.resolvedResponseType.clazz)) {
                        callback(Error("Illegal response type received in service method "+ T.name+"#"+method.name));
                        return;
                    }
                    callback(null, res);
                });
            } catch (err) {
                setTimeout(callback.bind(this, err), 0);
            }
        };

        // Service.Method(rpcImpl, message, callback)
        Service[method.name] = function(rpcImpl, req, callback) {
            new Service(rpcImpl)[method.name](req, callback);
        };

        if (Object.defineProperty)
            Object.defineProperty(Service[method.name], "$options", { "value": method.buildOpt() }),
            Object.defineProperty(ServicePrototype[method.name], "$options", { "value": Service[method.name]["$options"] });
    })(rpc[i]);
}

// Properties

/**
 * Service options.
 * @name ProtoBuf.Builder.Service.$options
 * @type {Object.<string,*>}
 * @expose
 */
var $optionsS; // cc needs this

/**
 * Service options.
 * @name ProtoBuf.Builder.Service#$options
 * @type {Object.<string,*>}
 * @expose
 */
var $options;

/**
 * Reflection type.
 * @name ProtoBuf.Builder.Service.$type
 * @type {!ProtoBuf.Reflect.Service}
 * @expose
 */
var $typeS;

/**
 * Reflection type.
 * @name ProtoBuf.Builder.Service#$type
 * @type {!ProtoBuf.Reflect.Service}
 * @expose
 */
var $type;

if (Object.defineProperty)
    Object.defineProperty(Service, "$options", { "value": T.buildOpt() }),
    Object.defineProperty(ServicePrototype, "$options", { "value": Service["$options"] }),
    Object.defineProperty(Service, "$type", { "value": T }),
    Object.defineProperty(ServicePrototype, "$type", { "value": T });
