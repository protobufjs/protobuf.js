export = EventEmitter;

type EventEmitterListener = (...args: any[]) => {};

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
declare class EventEmitter {

    /**
     * Constructs a new event emitter instance.
     * @classdesc A minimal event emitter.
     * @memberof util
     * @constructor
     */
    constructor();

    /**
     * Registers an event listener.
     * @param {string} evt Event name
     * @param {EventEmitterListener} fn Listener
     * @param {*} [ctx] Listener context
     * @returns {this} `this`
     */
    public on(evt: string, fn: EventEmitterListener, ctx?: any): EventEmitter;

    /**
     * Removes an event listener or any matching listeners if arguments are omitted.
     * @param {string} [evt] Event name. Removes all listeners if omitted.
     * @param {EventEmitterListener} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
     * @returns {this} `this`
     */
    public off(evt?: string, fn?: EventEmitterListener): EventEmitter;

    /**
     * Emits an event by calling its listeners with the specified arguments.
     * @param {string} evt Event name
     * @param {...*} args Arguments
     * @returns {this} `this`
     */
    public emit(evt: string, ...args: any[]): EventEmitter;
}
