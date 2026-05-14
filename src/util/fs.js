var fs = null;
try {
    if (typeof require === "function") {
        fs = require(/* webpackIgnore: true */ "fs");
        if (!fs || !fs.readFile || !fs.readFileSync)
            fs = null;
    }
} catch (e) {
    // `fs` is unavailable in browsers and browser-like bundles.
}

export { fs };
