/**
 * Abstract service method.
 * @exports ProtoBuf.Reflect.Service.Method
 * @param {!ProtoBuf.Builder} builder Builder reference
 * @param {!ProtoBuf.Reflect.Service} svc Service
 * @param {string} name Method name
 * @param {Object.<string,*>=} options Options
 * @constructor
 * @extends ProtoBuf.Reflect.T
 */
var Method = function(builder, svc, name, options) {
    T.call(this, builder, svc, name);

    /**
     * @override
     */
    this.className = "Service.Method";

    /**
     * Options.
     * @type {Object.<string, *>}
     * @expose
     */
    this.options = options || {};
};

// Extends T
Method.prototype = Object.create(T.prototype);

/**
 * Builds the method's '$options' property.
 * @name ProtoBuf.Reflect.Service.Method#buildOpt
 * @function
 * @return {Object.<string,*>}
 */
Method.prototype.buildOpt = Namespace.prototype.buildOpt;
