/**
 * Constructs a new Service.
 * @exports ProtoBuf.Reflect.Service
 * @param {!ProtoBuf.Reflect.Namespace} root Root
 * @param {string} name Service name
 * @param {Object.<string,*>=} options Options
 * @constructor
 * @extends ProtoBuf.Reflect.Namespace
 */
var Service = function(root, name, options) {
    Namespace.call(this, root, name, options);

    /**
     * @override
     */
    this.className = "Service";

    /**
     * Built runtime service class.
     * @type {?function(new:ProtoBuf.Builder.Service)}
     */
    this.clazz = null;
};

// Extends Namespace
Service.prototype = Object.create(Namespace.prototype);

/**
 * Builds the service and returns the runtime counterpart, which is a fully functional class.
 * @see ProtoBuf.Builder.Service
 * @param {boolean=} rebuild Whether to rebuild or not
 * @return {Function} Service class
 * @throws {Error} If the message cannot be built
 * @expose
 */
Service.prototype.build = function(rebuild) {
    if (this.clazz && !rebuild) return this.clazz;
    return this.clazz = (function(ProtoBuf, T) {

        //? include("../Builder/Service.js");

        return Service;

    })(ProtoBuf, this);
};
