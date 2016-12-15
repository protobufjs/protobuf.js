"use strict";
module.exports = extend;

/**
 * Lets the specified constructor extend `this` class.
 * @memberof util
 * @param {*} ctor Extending constructor
 * @returns {Object} Constructor prototype
 * @this Function
 */
function extend(ctor) {
    // copy static members
    var keys = Object.keys(this);
    for (var i = 0; i < keys.length; ++i)
        ctor[keys[i]] = this[keys[i]];
    // properly extend
    var prototype = ctor.prototype = Object.create(this.prototype);
    prototype.constructor = ctor;
    return prototype;
}
