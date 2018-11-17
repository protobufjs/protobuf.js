type pbtsCallback = (err: Error|null, output?: string) => void;

export interface IArgs {
    [paramater: string]: any;
}

/**
 * Runs pbts programmatically.
 * @param {string[] | IArgs} args Command line arguments
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @param {?{content: (string | Object), name: ?string}} source Object containing the sourcecode
 * @returns {number|undefined} Exit code, if known
 */
export function main(args: string[] | IArgs, callback?: pbtsCallback, source?: {content: string | object}): number|undefined;
