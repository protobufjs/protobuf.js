var codegen = require("..");

// new require("benchmark").Suite().add("add + delete", function() {

var add = codegen(["a", "b"], "add")
  ("// awesome comment")
  ("return a + b - c + %d", 1)
  ({ c: 1 });

if (add(1, 2) !== 3)
  throw Error("failed");

var object = { a: 1, b: 2 };
var delete_ = codegen(["object", "property"], "delete3")
  ("delete object[property];")
  ();

delete_(object, 'a');

if ("a" in object)
  throw Error("expected 'a' property to be deleted but was not");

if (!delete_.name.includes('delete'))
  throw Error("expected function name to contain 'delete': " + delete_.name);

delete_(object, 'b');

if (JSON.stringify(object) !== '{}')
  throw Error("unexpected JSON: " + JSON.stringify(object));

// }).on("cycle", function(event) { process.stdout.write(String(event.target) + "\n"); }).run();
