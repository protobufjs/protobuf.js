/**
 * RPC service method.
 * @exports ProtoBuf.Reflect.Service.RPCMethod
 * @param {!ProtoBuf.Builder} builder Builder reference
 * @param {!ProtoBuf.Reflect.Service} svc Service
 * @param {string} name Method name
 * @param {string} request Request message name
 * @param {string} response Response message name
 * @param {boolean} request_stream Whether requests are streamed
 * @param {boolean} response_stream Whether responses are streamed
 * @param {Object.<string,*>=} options Options
 * @constructor
 * @extends ProtoBuf.Reflect.Service.Method
 */
var RPCMethod = function(builder, svc, name, request, response, request_stream, response_stream, options) {
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
     * Whether requests are streamed
     * @type {bool}
     * @expose
     */
    this.requestStream = request_stream;

    /**
     * Whether responses are streamed
     * @type {bool}
     * @expose
     */
    this.responseStream = response_stream;

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
