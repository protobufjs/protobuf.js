// $> pbts tests\sandbox\sample.js
// Generated Sun, 18 Dec 2016 15:44:01 UTC
/**
 * Constructs a new Request.
 * @exports Request
 * @constructor
 * @param {Object} [properties] Properties to set
 */
declare class Request {

    /**
     * Constructs a new Request.
     * @exports Request
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    constructor(properties?: Object);

    /**
     * Request action.
     * @name Request#action
     * @type {number}
     */
    action: number;

    /**
     * Request target.
     * @name Request#target
     * @type {Array.<string>}
     */
    target: string[];

    /**
     * Request source.
     * @name Request#source
     * @type {string}
     */
    source: string;

    /**
     * Request require.
     * @name Request#require
     * @type {Array.<Dict>}
     */
    require: Dict[];

    /**
     * Request sort.
     * @name Request#sort
     * @type {Array.<Sort>}
     */
    sort: Sort[];

    /**
     * Request limit.
     * @name Request#limit
     * @type {number}
     */
    limit: number;

    /**
     * Request offset.
     * @name Request#offset
     * @type {number|Long}
     */
    offset: (number|Long);

    /**
     * Request args.
     * @name Request#args
     * @type {google.protobuf.Any}
     */
    args: google.protobuf.Any;

    /**
     * Request content.
     * @name Request#content
     * @type {Array.<google.protobuf.Any>}
     */
    content: google.protobuf.Any[];

    /**
     * Encodes the specified Request.
     * @function
     * @param {Request|Object} message Request or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    static encode(message: (Request|Object), writer?: Writer): Writer;

    /**
     * Encodes the specified Request, length delimited.
     * @param {Request|Object} message Request or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    static encodeDelimited(message: (Request|Object), writer?: Writer): Writer;

    /**
     * Decodes a Request from the specified reader or buffer.
     * @function
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Request} Request
     */
    static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): Request;

    /**
     * Decodes a Request from the specified reader or buffer, length delimited.
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {Request} Request
     */
    static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): Request;

    /**
     * Verifies a Request.
     * @function
     * @param {Request|Object} message Request or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    static verify(message: (Request|Object)): string;
}

/**
 * Constructs a new Response.
 * @exports Response
 * @constructor
 * @param {Object} [properties] Properties to set
 */
declare class Response {

    /**
     * Constructs a new Response.
     * @exports Response
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    constructor(properties?: Object);

    /**
     * Response code.
     * @name Response#code
     * @type {number}
     */
    code: number;

    /**
     * Response msg.
     * @name Response#msg
     * @type {string}
     */
    msg: string;

    /**
     * Response result.
     * @name Response#result
     * @type {google.protobuf.Any}
     */
    result: google.protobuf.Any;

    /**
     * Response content.
     * @name Response#content
     * @type {Array.<google.protobuf.Any>}
     */
    content: google.protobuf.Any[];

    /**
     * Encodes the specified Response.
     * @function
     * @param {Response|Object} message Response or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    static encode(message: (Response|Object), writer?: Writer): Writer;

    /**
     * Encodes the specified Response, length delimited.
     * @param {Response|Object} message Response or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    static encodeDelimited(message: (Response|Object), writer?: Writer): Writer;

    /**
     * Decodes a Response from the specified reader or buffer.
     * @function
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Response} Response
     */
    static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): Response;

    /**
     * Decodes a Response from the specified reader or buffer, length delimited.
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {Response} Response
     */
    static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): Response;

    /**
     * Verifies a Response.
     * @function
     * @param {Response|Object} message Response or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    static verify(message: (Response|Object)): string;
}

/**
 * Constructs a new Dict.
 * @exports Dict
 * @constructor
 * @param {Object} [properties] Properties to set
 */
declare class Dict {

    /**
     * Constructs a new Dict.
     * @exports Dict
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    constructor(properties?: Object);

    /**
     * Dict key.
     * @name Dict#key
     * @type {string}
     */
    key: string;

    /**
     * Dict value.
     * @name Dict#value
     * @type {string}
     */
    value: string;

    /**
     * Dict compare.
     * @name Dict#compare
     * @type {number}
     */
    compare: number;

    /**
     * Encodes the specified Dict.
     * @function
     * @param {Dict|Object} message Dict or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    static encode(message: (Dict|Object), writer?: Writer): Writer;

    /**
     * Encodes the specified Dict, length delimited.
     * @param {Dict|Object} message Dict or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    static encodeDelimited(message: (Dict|Object), writer?: Writer): Writer;

    /**
     * Decodes a Dict from the specified reader or buffer.
     * @function
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Dict} Dict
     */
    static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): Dict;

    /**
     * Decodes a Dict from the specified reader or buffer, length delimited.
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {Dict} Dict
     */
    static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): Dict;

    /**
     * Verifies a Dict.
     * @function
     * @param {Dict|Object} message Dict or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    static verify(message: (Dict|Object)): string;
}

/**
 * Constructs a new Sort.
 * @exports Sort
 * @constructor
 * @param {Object} [properties] Properties to set
 */
declare class Sort {

    /**
     * Constructs a new Sort.
     * @exports Sort
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    constructor(properties?: Object);

    /**
     * Sort column.
     * @name Sort#column
     * @type {string}
     */
    column: string;

    /**
     * Sort orderBy.
     * @name Sort#orderBy
     * @type {number}
     */
    orderBy: number;

    /**
     * Encodes the specified Sort.
     * @function
     * @param {Sort|Object} message Sort or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    static encode(message: (Sort|Object), writer?: Writer): Writer;

    /**
     * Encodes the specified Sort, length delimited.
     * @param {Sort|Object} message Sort or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    static encodeDelimited(message: (Sort|Object), writer?: Writer): Writer;

    /**
     * Decodes a Sort from the specified reader or buffer.
     * @function
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Sort} Sort
     */
    static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): Sort;

    /**
     * Decodes a Sort from the specified reader or buffer, length delimited.
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {Sort} Sort
     */
    static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): Sort;

    /**
     * Verifies a Sort.
     * @function
     * @param {Sort|Object} message Sort or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    static verify(message: (Sort|Object)): string;
}

/**
 * Constructs a new Arg.
 * @exports Arg
 * @constructor
 * @param {Object} [properties] Properties to set
 */
declare class Arg {

    /**
     * Constructs a new Arg.
     * @exports Arg
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    constructor(properties?: Object);

    /**
     * Arg text.
     * @name Arg#text
     * @type {Array.<string>}
     */
    text: string[];

    /**
     * Arg obj.
     * @name Arg#obj
     * @type {Array.<google.protobuf.Any>}
     */
    obj: google.protobuf.Any[];

    /**
     * Encodes the specified Arg.
     * @function
     * @param {Arg|Object} message Arg or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    static encode(message: (Arg|Object), writer?: Writer): Writer;

    /**
     * Encodes the specified Arg, length delimited.
     * @param {Arg|Object} message Arg or plain object to encode
     * @param {Writer} [writer] Writer to encode to
     * @returns {Writer} Writer
     */
    static encodeDelimited(message: (Arg|Object), writer?: Writer): Writer;

    /**
     * Decodes a Arg from the specified reader or buffer.
     * @function
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Arg} Arg
     */
    static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): Arg;

    /**
     * Decodes a Arg from the specified reader or buffer, length delimited.
     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {Arg} Arg
     */
    static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): Arg;

    /**
     * Verifies a Arg.
     * @function
     * @param {Arg|Object} message Arg or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    static verify(message: (Arg|Object)): string;
}

/**
 * Namespace google.
 * @exports google
 * @namespace
 */
declare module google {

    /**
     * Namespace protobuf.
     * @exports google.protobuf
     * @namespace
     */
    module protobuf {

        /**
         * Constructs a new Any.
         * @exports google.protobuf.Any
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class Any {

            /**
             * Constructs a new Any.
             * @exports google.protobuf.Any
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * Any type_url.
             * @name google.protobuf.Any#type_url
             * @type {string}
             */
            type_url: string;

            /**
             * Any value.
             * @name google.protobuf.Any#value
             * @type {Uint8Array}
             */
            value: Uint8Array;

            /**
             * Encodes the specified Any.
             * @function
             * @param {google.protobuf.Any|Object} message Any or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.Any|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified Any, length delimited.
             * @param {google.protobuf.Any|Object} message Any or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.Any|Object), writer?: Writer): Writer;

            /**
             * Decodes a Any from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes a Any from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies a Any.
             * @function
             * @param {google.protobuf.Any|Object} message Any or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.Any|Object)): string;
        }
    }
}
