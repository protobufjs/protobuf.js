export = codegen;

/**
 * A codegen instance as returned by {@link codegen}, that also is a sprintf-like appender function.
 * @typedef Codegen
 * @type {function}
 * @param {string} format Format string
 * @param {...*} args Replacements
 * @returns {Codegen} Itself
 * @property {function(string=):string} str Stringifies the so far generated function source.
 * @property {function(string=, Object=):function} eof Ends generation and builds the function whilst applying a scope.
 */
type Codegen = (format: string, ...args: any[]) => Codegen;

/**
 * A closure for generating functions programmatically.
 * @memberof util
 * @namespace
 * @function
 * @param {...string} params Function parameter names
 * @returns {Codegen} Codegen instance
 * @property {boolean} supported Whether code generation is supported by the environment.
 * @property {boolean} verbose=false When set to true, codegen will log generated code to console. Useful for debugging.
 * @property {function(string, ...*):string} sprintf Underlying sprintf implementation
 */
declare function codegen(...params: string[]): Codegen;
