"use strict";

var fs = null;
try {
    fs = require(/* webpackIgnore: true */ "fs");
    if (!fs || !fs.readFile || !fs.readFileSync)
        fs = null;
} catch (e) {
    // `fs` is unavailable in browsers and browser-like bundles.
}
module.exports = fs;
