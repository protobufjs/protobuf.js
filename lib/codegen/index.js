"use strict";
module.exports = codegen;

codegen.verbose = false;

/**
 * Begins generating a function.
 * @memberof util
 * @param {string[]} [functionParams] Function parameter names
 * @param {string} [functionName] Function name if not anonymous
 * @returns {Codegen} Appender that appends code to the function's body
 * @property {boolean} verbose=false When set to `true`, codegen will log generated code to console. Useful for debugging.
 */
function codegen(functionParams, functionName) {

    /* istanbul ignore if */
    if (typeof functionParams === "string") {
        functionName = functionParams;
        functionParams = undefined;
    }

    var body = [];

    /**
     * Appends code to the function's body or finishes generation.
     * @typedef Codegen
     * @type {function}
     * @param {string|Object.<string,*>} [formatStringOrScope] Format string or, to finish the function, an object of additional scope variables, if any
     * @param {...*} [formatParams] Format parameters
     * @returns {Codegen|Function} Itself or the generated function if finished
     */

    function codegen(formatStringOrScope) {
        if (typeof formatStringOrScope !== "string") {
            var scopeParams = [],
                scopeValues = [];
            if (formatStringOrScope)
                for (var i = 0, keys = Object.keys(formatStringOrScope); i < keys.length; ++i) {
                    scopeParams.push(keys[i]);
                    scopeValues.push(formatStringOrScope[keys[i]]);
                }
            var source = codegen.toString();
            if (codegen.verbose)
                console.log("codegen: " + source); // eslint-disable-line no-console
            return Function.apply(null, scopeParams.concat("return " + source)).apply(null, scopeValues);
        }
        var formatParams = Array.prototype.slice.call(arguments, 1),
            formatParamsIndex = 0;
        formatStringOrScope = formatStringOrScope.replace(/%([dfjs])/g, function($0, $1) {
            var value = formatParams[formatParamsIndex++];
            return $1 === "d" ? Math.floor(value)
                 : $1 === "f" ? Number(value)
                 : $1 === "j" ? JSON.stringify(value)
                 : value;
        });
        if (formatParamsIndex !== formatParams.length)
            throw Error("parameter count mismatch");
        body.push(formatStringOrScope);
        return codegen;
    }

    codegen.toString = function(functionNameOverride) {
        return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
    };

    return codegen;
}
