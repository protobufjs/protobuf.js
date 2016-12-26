var tape = require("tape");

var protobuf = require("..");

function name(fn) {
    if (!fn)
        return "" + fn;
    return fn.name;
}

var ans = {};
try {
    Object.defineProperty(ans, "wer", {
        get: function() {
            return 42;
        }
    });
} catch (e) {}

tape.test("environment supports", function(test) {
    test.ok(typeof Uint8Array !== "undefined", "Uint8Array");
    test.ok(ans.wer === 42, "getters/setters");
    test.end();
});