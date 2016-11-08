module.exports = codegen;

/**
 * Programmatically generates a function. When done appending code, call `eof()` on the Appender
 * to generate the actual function.
 * @param {...string} params Function parameter names
 * @returns {function} Appender function similar to `util.format` known from node
 * @see {@link https://nodejs.org/docs/latest/api/util.html#util_util_format_format_args}
 */
function codegen(/* varargs */) {
    var arg = Array.prototype.slice.call(arguments),
        src = [],
        ws  = 1;
    function append(format/*, varargs */) {
        var val = Array.prototype.slice.call(arguments, 1),
            idx = 0;
        format = format.replace(/%([djs])/g, function($0, $1) {
            return $1 === "j"
                ? JSON.stringify(val[idx++])
                : String(val[idx++]);
        });
        var ind = false,
            blk  = false;
        if (src.length > 0) {
            if (/[\{\[]$/.test(src[src.length-1])) {
                ind = blk = true;
                ws++;
            } else if (!/;$/.test(src[src.length-1])) {
                ind = true;
                ws++;
            }
        }
        for (var i = 0; i < ws; ++i)
            format = "    " + format;
        if (ind) {
            if (!blk || /[\}\]]$/.test(format))
                ws--;
        }
        src.push(format);
        return append;
    }
    append.toString = function toString(name) {
        name = name ? name.replace(/[^\w_$]/g, "_") : "";
        var code = "function " + name + "(" + arg.join(", ") + ") {\n" + src.join("\n") + "\n}";
        if (codegen.verbose)
            console.log("--- codegen ---\n" + code.replace(/^/mg, "> "));
        return code;
    };
    append.eof = function eof(name) {
        return new Function("return " + append.toString(name) + ";").call(null);
    };
    return append;
}

/**
 * Whether code generation is supported by the environment.
 * @type {boolean}
 */
codegen.supported = false;
try { codegen.supported = codegen("a","b")("return a-b").eof()(2,1) === 1; } catch (e) {} // eslint-disable no-empty

/**
 * When set to true, codegen will log generated code to console. Useful for debugging.
 * @type {boolean}
 */
codegen.verbose = false;
