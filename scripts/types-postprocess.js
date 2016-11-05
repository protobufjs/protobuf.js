var fs = require("fs"),
    path = require("path");
var dir = path.join(__dirname, "..", "types");

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

fs.writeFileSync(path.join(dir, "protobuf.js.d.ts"), dts);
fs.unlinkSync(path.join(dir, "types.d.ts"));
