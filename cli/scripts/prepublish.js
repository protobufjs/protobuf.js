"use strict";

var path = require("path"),
    fs   = require("fs");

// ensure LF on bin files
[
    path.join(__dirname, "..", "bin", "pbjs"),
    path.join(__dirname, "..", "bin", "pbts")
]
.forEach(function(file) {
    fs.writeFileSync(file, fs.readFileSync(file).toString("utf8").replace(/\r?\n/g, "\n"), "utf8");
});
