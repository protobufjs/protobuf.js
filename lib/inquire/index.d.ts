export = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 * @deprecated Legacy optional require helper. Will be removed in a future release.
 */
declare function inquire(moduleName: string): object;
