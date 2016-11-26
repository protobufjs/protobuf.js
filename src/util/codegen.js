"use strict";
module.exports = codegen;

var blockOpenRe  = /[{[]$/,
    blockCloseRe = /^[}\]]/,
    casingRe     = /:$/,
    branchRe     = /^\s*(?:if|else if|while|for)\b|\b(?:else)\s*$/,
    breakRe      = /\b(?:break|continue);?$|^\s*return\b/;

/**
 * Programmatically generates a function.
 * @memberof util
 * @param {...string} params Function parameter names
 * @returns {util.CodegenAppender} Printf-like appender function
 * @property {boolean} supported Whether code generation is supported by the environment.
 * @property {boolean} verbose=false When set to true, codegen will log generated code to console. Useful for debugging.
 */
function codegen(/* varargs */) {
    var args   = Array.prototype.slice.call(arguments),
        src    = ['\t"use strict"'];

    var indent = 1,
        inCase = false;

    /**
     * Appends a printf-like formatted line to the generated source. Returned when calling {@link util.codegen}.
     * @typedef CodegenAppender
     * @memberof util
     * @type {function}
     * @param {string} format A printf-like format string
     * @param {...*} params Format replacements
     * @returns {util.CodegenAppender} Itself
     * @property {util.CodegenStringer} str
     * @property {util.CodegenEnder} eof
     * @see {@link https://nodejs.org/docs/latest/api/util.html#util_util_format_format_args}
     */
    /**/
    function gen() {
        var fmt = [];
        for (var i = 0; i < arguments.length; ++i)
            fmt[i] = arguments[i];
        var line = gen.fmt.apply(null, fmt);
        var level = indent;
        if (src.length) {
            var prev = src[src.length - 1];

            // block open or one time branch
            if (blockOpenRe.test(prev))
                level = ++indent; // keep
            else if (branchRe.test(prev))
                ++level; // once
            
            // casing
            if (casingRe.test(prev) && !casingRe.test(line)) {
                level = ++indent;
                inCase = true;
            } else if (inCase && breakRe.test(prev)) {
                level = --indent;
                inCase = false;
            }

            // block close
            if (blockCloseRe.test(line))
                level = --indent;
        }
        for (var index = 0; index < level; ++index)
            line = "\t" + line;
        src.push(line);
        return gen;
    }

    gen.fmt = function fmt(format) {
        var params = Array.prototype.slice.call(arguments, 1),
            index  = 0;
        return format.replace(/%([djs])/g, function($0, $1) {
            var param = params[index++];
            return $1 === "j"
                ? JSON.stringify(param)
                : String(param);
        });
    };

    /**
     * Stringifies the so far generated function source.
     * @typedef CodegenStringer
     * @memberof util
     * @type {function}
     * @param {string} [name] Function name, defaults to generate an anonymous function
     * @returns {string} Function source using tabs for indentation
     */
    /**/
    gen.str = function str(name) {
        return "function " + (name ? name.replace(/[^\w_$]/g, "_") : "") + "(" + args.join(",") + ") {\n" + src.join("\n") + "\n}";
    };

    /**
     * Ends generation and builds the function.
     * @typedef CodegenEnder
     * @memberof util
     * @type {function}
     * @param {string} [name] Function name, defaults to generate an anonymous function
     * @param {Object|Array.<string>} [scope] Function scope
     * @returns {function} A function to apply the scope manually when `scope` is an array, otherwise the generated function with scope applied
     */
    /**/
    gen.eof = function eof(name, scope) {
        if (name && typeof name === 'object') {
            scope = name;
            name = undefined;
        }
        var code = gen.str(name);
        if (codegen.verbose)
            console.log("--- codegen ---\n" + code.replace(/^/mg, "> ").replace(/\t/g, "  ")); // eslint-disable-line no-console
        code = "return " + code;
        var params, values = [];
        if (Array.isArray(scope)) {
            params = scope.slice();
        } else if (scope) {
            params = Object.keys(scope);
            values = params.map(function(key) { return scope[key]; });
        } else
            params = [];
        var fn = Function.apply(null, params.concat(code)); // eslint-disable-line no-new-func
        return values ? fn.apply(null, values) : fn();
    };

    return gen;
}

codegen.supported = false;
try { codegen.supported = codegen("a","b")("return a-b").eof()(2,1) === 1; } catch (e) {} // eslint-disable-line no-empty

codegen.verbose = false;
