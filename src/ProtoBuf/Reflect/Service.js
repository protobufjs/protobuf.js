/**
 * Constructs a new Service.
 * @exports ProtoBuf.Reflect.Service
 * @param {!ProtoBuf.Builder} builder Builder reference
 * @param {!ProtoBuf.Reflect.Namespace} root Root
 * @param {string} name Service name
 * @param {Object.<string,*>=} options Options
 * @constructor
 * @extends ProtoBuf.Reflect.Namespace
 */
var Service = function(builder, root, name, options) {
    Namespace.call(this, builder, root, name, options);

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

/**
 * @alias ProtoBuf.Reflect.Service.prototype
 * @inner
 */
var ServicePrototype = Service.prototype = Object.create(Namespace.prototype);

/**
 * Builds the service and returns the runtime counterpart, which is a fully functional class.
 * @see ProtoBuf.Builder.Service
 * @param {boolean=} rebuild Whether to rebuild or not
 * @return {Function} Service class
 * @throws {Error} If the message cannot be built
 * @expose
 */
ServicePrototype.build = function(rebuild) {
    if (this.clazz && !rebuild)
        return this.clazz;

    // Create the runtime Service class in its own scope
    return this.clazz = (function(ProtoBuf, T) {

        //? include("../Builder/Service.js");

        return Service;

    })(ProtoBuf, this);
};
