var codegen = require("..");

var add = codegen(["a", "b"], "add")
  ("// awesome comment")
  ("return a + b - c + %d", 1)
  ({ c: 1 });

if (add(1, 2) !== 3)
  throw Error("failed");
