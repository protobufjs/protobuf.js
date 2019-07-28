"use strict";

var prototxt = require("./prototxt");

if (typeof module !== "undefined" && typeof module.exports === "object") {
    module.exports.TextReader = prototxt.TextReader;
}
