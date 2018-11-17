type pbtsCallback = (err: Error|null, output?: string) => void;

/**
 * Runs pbts programmatically.
 * @param {string[]} args Command line arguments
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @param {?{content: (string | Object), name: ?string}} source Object containing the sourcecode
 * @returns {number|undefined} Exit code, if known
 */
export function main(args: string[], callback?: pbtsCallback, source?: {content: string | object}): number|undefined;
