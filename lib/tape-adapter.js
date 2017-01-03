var tape = require("tape");

var Test = tape.Test;

// some ancient environments have invalid own properties on buffers so that deepEqual doesn't work.
// the following uses a monkey-patched deepEqual implementation for all kinds of number arrays.

var deepEqual = require("./deep-equal");

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : msg || "should be equivalent",
        operator : "deepEqual",
        actual : a,
        expected : b,
        extra : extra
    });
};
