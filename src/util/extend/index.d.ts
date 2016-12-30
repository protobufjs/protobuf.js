/**
 * Lets the specified constructor extend `this` class.
 * @memberof util
 * @param {*} ctor Extending constructor
 * @returns {Object.<string,*>} Constructor prototype
 * @this Function
 */
declare function extend(this: Function, ctor: any): { [k: string]: any };
