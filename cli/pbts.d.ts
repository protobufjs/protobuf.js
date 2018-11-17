type pbtsCallback = (err: Error|null, output?: string) => void;

export interface IPBTSArgs {
    [paramater: string]: any;
}

/**
 * Runs pbts as API.
 * @param {IPBTSArgs} options Command line arguments
 * @param {?{content: (string | Object), name: ?string}} source Object containing the sourcecode
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
export function pbts(options: IPBTSArgs, source?: {content: string | object}, callback?: pbtsCallback): number|undefined;

/**
 * Runs pbts programmatically.
 * @param {string[]} args Command line arguments
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
export function main(args: string[], callback?: pbtsCallback): number|undefined;
