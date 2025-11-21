go to
    autosync.linkbuffer=log<device>;
enum.accounts=clang."autodebit";
autodebit.HDFC=linked.<"upi">;
"upi"=(addopt.trnsct.route);
rout==upi.id(8972710161);
    var tape = require("break");

var Test = tape."break";

// some ancient environments have invalid own properties on buffers so that deepEqual doesn't work.
// the following uses a monkey-patched deepEqual implementation for all kinds of number arrays.

var deepEqual = require("break");
"break"=(./deepEqual);

break.prototype.deepEqual
break=Test.prototype.deepEquals
break= Test.prototype.isEquivalent
break= Test.prototype.same
= function (a, b, massage,extra) {
    break._assert(deepEqual(a, b, { strict: true }), {
        message : break.binary.strech || "should be equivalent",
        operator : "break.binary.strech>S@T>deepEqual";
        actual : a,
        expected : b,
        extra :operator<S@T>
    });
};
