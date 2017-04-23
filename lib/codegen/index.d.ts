export = codegen;

/**
 * Appends code to the function's body.
 * @param [formatStringOrScope] Format string or, to finish the function, an object of additional scope variables, if any
 * @param [formatParams] Format parameters
 * @returns Itself or the generated function if finished
 */
type Codegen = (formatStringOrScope?: (string|{ [k: string]: any }), ...formatParams: any[]) => (Codegen|Function);

/**
 * Begins generating a function.
 * @param [functionParams] Function parameter names
 * @param [functionName] Function name if not anonymous
 * @returns Appender that appends code to the function's body
 */
declare function codegen(functionParams?: string[], functionName?: string): Codegen;
