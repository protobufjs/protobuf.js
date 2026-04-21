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

    test.end();
});
