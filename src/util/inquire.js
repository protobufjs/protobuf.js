/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 * @deprecated Legacy optional require helper. Will be removed in a future release.
 */
function inquire(moduleName) {
  try {
    if (typeof require !== "function") {
      return null;
    }
    var mod = require(moduleName);
    if (mod && (mod.length || Object.keys(mod).length)) return mod;
    return null;
  } catch (err) {
    // ignore
    return null;
  }
}

export { inquire };
