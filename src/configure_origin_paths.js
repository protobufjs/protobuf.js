"use strict";
module.exports = configureOriginPaths;

var Root = require("./root"),
    util = require("./util");

/**
 * Configures base import paths for resolving `.proto` imports.
 * @param {string[]} originPaths - One or more base import paths to look for imports
 * @returns {undefined}
 */
function configureOriginPaths(originPaths) {
    if (!Array.isArray(originPaths)) {
        throw Error("origin paths is not an array");
    }
    Root.prototype.resolvePath = function(originPath, includePath, alreadyNormalized) {
        // Try the default originPath first
        let importPath = util.path.resolve(originPath, includePath, alreadyNormalized);
        // If that fails, try every fallback originPath before giving up
        let i = 0;
        while (!util.fs.existsSync(importPath)) {
            // Give up and return the original import path
            if (i >= originPaths.length) {
                return util.path.resolve(originPath, includePath, alreadyNormalized);
            }
            importPath = util.path.resolve(originPaths[i], includePath, alreadyNormalized);
            i++;
        }
        return importPath;
    }
}
