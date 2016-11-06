var fs = require("fs"),
    path = require("path"),
    pkg = require("../package.json");
var dir = path.join(__dirname, "..", "types");

var header = [
    "/*",
    " * protobuf.js v" + pkg.version + " TypeScript definitions",
    " * Generated " + (new Date()).toUTCString().replace(/GMT/, "UTC"),
    " */"
];

var dts = fs.readFileSync(path.join(dir, "types.d.ts"), "utf8");

// Fix generic promises
dts = dts.replace(/Promise\./g, "Promise");

// Fix multidimensional arrays
var found;
do {
    found = false;
    dts = dts.replace(/Array\.<([^>]+)>/g, function($0, $1) {
        found = true;
        return $1 + "[]";
    });
} while (found);

// Remove declare statements and wrap everything in a module
dts = dts.replace(/\bdeclare\s/g, "");
dts = dts.replace(/^/mg, "   ");
dts = header.join('\n')+"\ndeclare module protobuf {\n\n" + dts + "\n}\n";

fs.writeFileSync(path.join(dir, "protobuf.js.d.ts"), dts);
fs.unlinkSync(path.join(dir, "types.d.ts"));
