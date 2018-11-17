type pbjsCallback = (err: Error|null, output?: string) => void;

export interface IPBJSArgs {
    [paramater: string]: any;
}

/**
 * Runs pbjs as API.
 * @param {IPBJSArgs} options Command line arguments
 * @param {?{content: (string | Object), name: ?string}} source Object containing the sourcecode and filename
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
export function pbjs(options: IPBJSArgs, source?: {content: string | object, name?: string}, callback?: pbjsCallback): number|undefined;

/**
 * Runs pbjs programmatically.
 * @param {string[]} args Command line arguments
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
export function main(args: string[], callback?: pbjsCallback): number|undefined;
