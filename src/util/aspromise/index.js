"use strict";
module.exports = asPromise;

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {function(?Error, ...*)} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params = [];
    for (var i = 2; i < arguments.length;)
        params.push(arguments[i++]);
    var pending = true;
    return new Promise(function asPromiseExecutor(resolve, reject) {
        params.push(function asPromiseCallback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var args = [];
                    for (var i = 1; i < arguments.length;)
                        args.push(arguments[i++]);
                    resolve.apply(null, args);
                }
            }
        });
        try {
            fn.apply(ctx || this, params); // eslint-disable-line no-invalid-this
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}
