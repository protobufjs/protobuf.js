var tape = require("tape");

var protobuf = require("..");
var codegen = require("../src/util/codegen");

tape.test("codegen", function(test) {
    test.equal(protobuf.util.codegen.verbose, false, "should not be verbose by default");

    var add = codegen(["a", "b"], "add")
      ("// awesome comment")
      ("return a + b - c + %d", 1)
      ({ c: 1 });

    test.equal(add(1, 2), 3, "should generate a working function");

    var floats = codegen()
      ("return [%f,%f,%f,%f,%f,%d]", 1.5, Infinity, -Infinity, NaN, -0, -0)
      ()
      ();

    test.equal(floats[0], 1.5, "should format finite floating-point values");
    test.equal(floats[1], Infinity, "should format positive infinity");
    test.equal(floats[2], -Infinity, "should format negative infinity");
    test.ok(Number.isNaN(floats[3]), "should format NaN");
    test.ok(Object.is(floats[4], -0), "should format negative zero");
    test.ok(Object.is(floats[5], -0), "should format negative zero as a number");

    test.end();
});
