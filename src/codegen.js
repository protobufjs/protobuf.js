module.exports = codegen;

/**
 * @typedef {function(string, ...*): Appender} Appender
 */

/**
 * Programmatically generates a function.
 * @param {...string} params Parameter names
 * @returns {Appender} Appender
 */
function codegen(/* varargs */) {
    var arg = Array.prototype.slice.call(arguments),
        src = [];
    function append(format/*, varargs */) {
        var val = Array.prototype.slice.call(arguments, 1),
            idx = 0;
        src.push(format.replace(/%([djs])/g, function($0, $1) {
            return $1 === "j"
                ? JSON.stringify(val[idx++])
                : String(val[idx++]);
        }));
        return append;
    }
    append.toString = function toString(name) {
        return "function "+(name || "")+"("+arg.join(",")+") {\n" + src.join("\n") + "\n}";
    };
    append.eof = function eof() {
        return Function.apply(null, arg.concat(src.join("\n"))); // new Function(arg1, arg2, body)
    };
    return append;
}
