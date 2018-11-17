type pbjsCallback = (err: Error|null, output?: string) => void;

export interface IPBJSOptions {
    [paramater: string]: any;
}

/**
 * Runs pbjs as API.
 * @param {IPBJSOptions} options Command line arguments
 * @param {?{content: (string | Object), name: ?string}} source Object containing the sourcecode and filename
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
export function pbjs(options: IPBJSOptions, source?: {content: string | object, name?: string}, callback?: pbjsCallback): number|undefined;

/**
 * Runs pbjs programmatically.
 * @param {string[]} args Command line arguments
 * @param {function(?Error, string=)} [callback] Optional completion callback
 * @returns {number|undefined} Exit code, if known
 */
export function main(args: string[], callback?: pbjsCallback): number|undefined;
