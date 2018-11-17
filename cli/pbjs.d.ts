type pbjsCallback = (err: Error|null, output?: string) => void;

/**
 * Runs pbjs programmatically.
 * @param {string[]} args Command line arguments
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @param {?{content: (string | Object), name: ?string}} source Object containing the sourcecode and filename
 * @returns {number|undefined} Exit code, if known
 */
export function main(args: string[], callback?: pbjsCallback, source?: {content: string | object, name?: string}): number|undefined;
