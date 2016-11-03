var Namespace = require("./namespace"),
    Method    = require("./method");

module.exports = Service;

/**
 * Reflected service.
 * @extends Namespace
 * @param {string} name
 * @param {!Object.<string,*>} [options]
 */
function Service(name, options) {
    Namespace.call(this, name, options);

    /**
     * Service methods.
     * @type {!Object.<string,!Method>}
     */
    this.methods = {};
}

var ServicePrototype = Namespace.extend(Service, [ "methods" ]);

/**
 * Tests if the specified JSON object describes a service.
 * @param {!Object} json
 * @returns {boolean}
 */
Service.testJSON = function testJSON(json) {
    return Boolean(json && json.methods);
};

/**
 * Constructs a service from JSON.
 * @param {!Object} json
 * @returns {!Service}
 */
Service.fromJSON = function fromJSON(name, json) {
    return new Service(name, json.options);
};

/**
 * Adds a method to this service.
 * @param {!Method} method
 * @returns {!Service} this
 */
ServicePrototype.add = function add(method) {
    if (!(method instanceof Method))
        throw TypeError("method must be a Method");
    if (this.methods[method.name])
        throw Error("duplicate name '" + method.name + "' in " + this);
    this.methods[method.name] = method;
    method.service = this;
    return this;
};

/**
 * Removes a method from this service.
 * @param {!Method} method
 * @returns {!Service} this
 */
ServicePrototype.remove = function remove(method) {
    if (!(method instanceof Method))
        throw TypeError("method must be a Method");
    if (this.methods[method.name] !== method)
        throw Error("not a member of " + this);
    delete this.methods[method.name];
    method.service = null;
    return this;
};
