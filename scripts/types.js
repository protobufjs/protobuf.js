var fs = require("fs"),
    path = require("path"),
    pkg = require("../package.json");
var dir = path.join(__dirname, "..", "types");

var header = [
    // '/// <reference types="long" />',
    // "",
    "/*",
    " * protobuf.js v" + pkg.version + " TypeScript definitions",
    " * Generated " + (new Date()).toUTCString().replace(/GMT/, "UTC"),
    " */"
];

var dts = fs.readFileSync(path.join(dir, "types.d.ts"), "utf8");
fs.unlinkSync(path.join(dir, "types.d.ts"));

// Remove declare statements and wrap everything in a module
dts = dts.replace(/\bdeclare\s/g, "");
dts = dts.replace(/^/mg, "   ");
dts = header.join('\n')+"\ndeclare module \"protobufjs\" {\n\n" + dts + "\n}\n";

fs.writeFileSync(path.join(dir, "protobuf.js.d.ts"), dts);
