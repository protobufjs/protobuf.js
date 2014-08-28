/**
 * RPC service method.
 * @exports ProtoBuf.Reflect.Service.RPCMethod
 * @param {!ProtoBuf.Builder} builder Builder reference
 * @param {!ProtoBuf.Reflect.Service} svc Service
 * @param {string} name Method name
 * @param {string} request Request message name
 * @param {string} response Response message name
 * @param {Object.<string,*>=} options Options
 * @constructor
 * @extends ProtoBuf.Reflect.Service.Method
 */
var RPCMethod = function(builder, svc, name, request, response, options) {
    Method.call(this, builder, svc, name, options);

    /**
     * @override
     */
    this.className = "Service.RPCMethod";

    /**
     * Request message name.
     * @type {string}
     * @expose
     */
    this.requestName = request;

    /**
     * Response message name.
     * @type {string}
     * @expose
     */
    this.responseName = response;

    /**
     * Resolved request message type.
     * @type {ProtoBuf.Reflect.Message}
     * @expose
     */
    this.resolvedRequestType = null;

    /**
     * Resolved response message type.
     * @type {ProtoBuf.Reflect.Message}
     * @expose
     */
    this.resolvedResponseType = null;
};

// Extends Method
RPCMethod.prototype = Object.create(Method.prototype);
