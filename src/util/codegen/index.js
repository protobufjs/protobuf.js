"use strict";
module.exports = codegen;

var blockOpenRe  = /[{[]$/,
    blockCloseRe = /^[}\]]/,
    casingRe     = /:$/,
    branchRe     = /^\s*(?:if|}?else if|while|for)\b|\b(?:else)\s*$/,
    breakRe      = /\b(?:break|continue)(?: \w+)?;?$|^\s*return\b/;

/**
 * A closure for generating functions programmatically.
 * @memberof util
 * @namespace
 * @function
 * @param {...string} params Function parameter names
 * @returns {Codegen} Codegen instance
 * @property {boolean} supported Whether code generation is supported by the environment.
 * @property {boolean} verbose=false When set to true, codegen will log generated code to console. Useful for debugging.
 * @property {function(string, ...*):string} sprintf Underlying sprintf implementation
 */
function codegen() {
    var params = [],
        src    = [],
        indent = 1,
        inCase = false;
    for (var i = 0; i < arguments.length;)
        params.push(arguments[i++]);

    /**
     * A codegen instance as returned by {@link codegen}, that also is a sprintf-like appender function.
     * @typedef Codegen
     * @type {function}
     * @param {string} format Format string
     * @param {...*} args Replacements
     * @returns {Codegen} Itself
     * @property {function(string=):string} str Stringifies the so far generated function source.
     * @property {function(string=, Object=):function} eof Ends generation and builds the function whilst applying a scope.
     */
    /**/
    function gen() {
        var args = [],
            i = 0;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        var line = sprintf.apply(null, args);
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
        for (i = 0; i < level; ++i)
            line = "\t" + line;
        src.push(line);
        return gen;
    }

    /**
     * Stringifies the so far generated function source.
     * @param {string} [name] Function name, defaults to generate an anonymous function
     * @returns {string} Function source using tabs for indentation
     * @inner
     */
    function str(name) {
        return "function" + (name ? " " + name.replace(/[^\w_$]/g, "_") : "") + "(" + params.join(",") + ") {\n" + src.join("\n") + "\n}";
    }

    gen.str = str;

    /**
     * Ends generation and builds the function whilst applying a scope.
     * @param {string} [name] Function name, defaults to generate an anonymous function
     * @param {Object.<string,*>} [scope] Function scope
     * @returns {function} The generated function, with scope applied if specified
     * @inner
     */
    function eof(name, scope) {
        if (typeof name === "object") {
            scope = name;
            name = undefined;
        }
        var source = gen.str(name);
        if (codegen.verbose)
            console.log("--- codegen ---\n" + source.replace(/^/mg, "> ").replace(/\t/g, "  ")); // eslint-disable-line no-console
        var keys = Object.keys(scope || (scope = {}));
        return Function.apply(null, keys.concat("return " + source)).apply(null, keys.map(function(key) { return scope[key]; })); // eslint-disable-line no-new-func
        //     ^ Creates a wrapper function with the scoped variable names as its parameters,
        //       calls it with the respective scoped variable values ^
        //       and returns our brand-new properly scoped function.
        //
        // This works because "Invoking the Function constructor as a function (without using the
        // new operator) has the same effect as invoking it as a constructor."
        // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Function
    }

    gen.eof = eof;

    return gen;
}

function sprintf(format) {
    var args = [],
        i = 1;
    for (; i < arguments.length;)
        args.push(arguments[i++]);
    i = 0;
    format = format.replace(/%([dfjs])/g, function($0, $1) {
        switch ($1) {
            case "d":
                return Math.floor(args[i++]);
            case "f":
                return Number(args[i++]);
            case "j":
                return JSON.stringify(args[i++]);
            default:
                return args[i++];
        }
    });
    if (i !== args.length)
        throw Error("argument count mismatch");
    return format;
}

codegen.sprintf   = sprintf;
codegen.supported = false; try { codegen.supported = codegen("a","b")("return a-b").eof()(2,1) === 1; } catch (e) {} // eslint-disable-line no-empty
codegen.verbose   = false;
