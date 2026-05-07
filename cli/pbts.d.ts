type pbtsCallback = (err: Error|null, output?: string) => void;

/**
 * Runs pbts programmatically.
 * @param {string[]} args Command line arguments
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
export function main(args: string[], callback?: pbtsCallback): number|undefined;

/**
 * Generates TypeScript definitions from a JavaScript source.
 * @param {string|Buffer} source JavaScript source
 * @param {string[]} args Command line arguments
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
export function process(source: string|Buffer, args: string[], callback?: pbtsCallback): number|undefined;
