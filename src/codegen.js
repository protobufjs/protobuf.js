module.exports = codegen;

/**
 * Whether code generation is supported by the environment.
 * @memberof util.codegen
 * @type {boolean}
 */
codegen.supported = false;
try { codegen.supported = codegen("a","b")("return a-b").eof()(2,1) === 1; } catch (e) {} // eslint-disable-line no-empty

/**
 * When set to true, codegen will log generated code to console. Useful for debugging.
 * @memberof util.codegen
 * @type {boolean}
 */
codegen.verbose = false;

/**
 * Programmatically generates a function. When done appending code, call `eof()` on the Appender
 * to generate the actual function.
 * @memberof util
 * @param {...string} params Function parameter names
 * @returns {function} Appender function similar to `util.format` known from node
 * @see {@link https://nodejs.org/docs/latest/api/util.html#util_util_format_format_args}
 */
function codegen(/* varargs */) {
    var args   = Array.prototype.slice.call(arguments),
        src    = [],
        indent = 1;

    // Appends a formatted line to the generated source
    function gen(format/*, varargs */) {
        var params = Array.prototype.slice.call(arguments, 1),
            index  = 0;
        var line = format.replace(/%([djs])/g, function($0, $1) {
            var param = params[index++];
            return $1 === "j"
                ? JSON.stringify(param)
                : String(param);
        });
        var level = indent;
        if (src.length) {
            var prev = src[src.length - 1];
            if (/[\{\[\:]$/.test(prev)) // block open before (increment and keep)
                level = ++indent;
            else if (/^\s*(?:if|else if|while|for)\b|\b(?:else)\s*$/.test(prev)) // branch without block before (increment once)
                ++level;
            else if (/\b(?:break|continue);?$/.test(prev)) // control flow before (decrement and keep)
                level = --indent;
            
            if (/^[\}\]]/.test(line)) // block close on line (decrement and keep)
                level = --indent;
        }
        for (index = 0; index < level; ++index)
            line = "\t" + line;
        src.push(line);
        return gen;
    }

    // Converts the so far generated source to a string
    gen.toString = function toString(name) {
        return "function " + (name ? name.replace(/[^\w_$]/g, "_") : "") + "(" + args.join(",") + ") {\n" + src.join("\n") + "\n}";
    };

    // Ends generation
    gen.eof = function eof(name) {
        var code = gen.toString(name);
        if (codegen.verbose)
            console.log("--- codegen ---\n" + code.replace(/^/mg, "> ").replace(/\t/g, "  ")); // eslint-disable-line no-console
        return new Function("return " + code + ";")(); // eslint-disable-line no-new-func
    };

    return gen;
}
