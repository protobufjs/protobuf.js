var ReflectionObject = require("./object"),
    util = require("./util");

module.exports = Method;

/**
 * Reflected service method.
 * @extends ReflectionObject
 * @param {string} name
 * @param {string} type Usually "rpc"
 * @param {string} requestType
 * @param {string} responseType
 * @param {boolean} [requestStream]
 * @param {boolean} [responseStream]
 * @param {!Object.<string,*>=} [options]
 */
function Method(name, type, requestType, responseType, requestStream, responseStream, options) {
    if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = undefined;
    } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = undefined;
    }
    
    ReflectionObject.call(this, name, options);

    // Exposed properties

    /**
     * Method type.
     * @type {string}
     */
    this.type = type || "rpc";

    /**
     * Request type.
     * @type {string}
     */
    this.requestType = requestType;

    /**
     * Whether requests are streamed or not.
     * @type {boolean|undefined}
     */
    this.requestStream = requestStream ? true : undefined;

    /**
     * Response type.
     * @type {string}
     */
    this.responseType = responseType;

    /**
     * Whether responses are streamed or not.
     * @type {boolean|undefined}
     */
    this.responseStream = responseStream ? true : undefined;

    // Reflection-only properties

    /**
     * Service this method belongs to.
     * @type {?Service}
     */
    this.service = null;
}

ReflectionObject.extend(Method, [ "type", "requestType", "requestStream", "responseType", "responseStream" ]);

/**
 * Tests if the specified JSON object describes a service method.
 * @param {!Object} json
 * @returns {boolean}
 */
Method.testJSON = function testJSON(json) {
    return Boolean(json && json.requestType !== undefined);
};

/**
 * Constructs a service method from JSON.
 * @param {!Object} json
 * @returns {!Method}
 */
Method.fromJSON = function fromJSON(name, json) {
    return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options);
};
