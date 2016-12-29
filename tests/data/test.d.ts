/// <reference path="../../types/protobuf.js.d.ts" />
// $> pbts tests\data\test.js
// Generated Tue, 27 Dec 2016 22:59:45 UTC
/**
 * Namespace jspb.
 * @exports jspb
 * @namespace
 */
declare module jspb {

    /**
     * Namespace test.
     * @exports jspb.test
     * @namespace
     */
    module test {

        /**
         * Constructs a new Empty.
         * @exports jspb.test.Empty
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class Empty {

            /**
             * Constructs a new Empty.
             * @exports jspb.test.Empty
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * Creates a new Empty instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Empty} Empty instance
             */
            static create(properties?: Object): jspb.test.Empty;

            /**
             * Encodes the specified Empty.
             * @function
             * @param {jspb.test.Empty|Object} message Empty or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.Empty|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified Empty, length delimited.
             * @param {jspb.test.Empty|Object} message Empty or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.Empty|Object), writer?: Writer): Writer;

            /**
             * Decodes a Empty from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Empty} Empty
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.Empty;

            /**
             * Decodes a Empty from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Empty} Empty
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.Empty;

            /**
             * Verifies a Empty.
             * @function
             * @param {jspb.test.Empty|Object} message Empty or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.Empty|Object)): string;
        }

        /**
         * Constructs a new EnumContainer.
         * @exports jspb.test.EnumContainer
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class EnumContainer {

            /**
             * Constructs a new EnumContainer.
             * @exports jspb.test.EnumContainer
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * EnumContainer outerEnum.
             * @type {number}
             */
            outerEnum: number;

            /**
             * Creates a new EnumContainer instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.EnumContainer} EnumContainer instance
             */
            static create(properties?: Object): jspb.test.EnumContainer;

            /**
             * Encodes the specified EnumContainer.
             * @function
             * @param {jspb.test.EnumContainer|Object} message EnumContainer or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.EnumContainer|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified EnumContainer, length delimited.
             * @param {jspb.test.EnumContainer|Object} message EnumContainer or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.EnumContainer|Object), writer?: Writer): Writer;

            /**
             * Decodes a EnumContainer from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.EnumContainer} EnumContainer
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.EnumContainer;

            /**
             * Decodes a EnumContainer from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.EnumContainer} EnumContainer
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.EnumContainer;

            /**
             * Verifies a EnumContainer.
             * @function
             * @param {jspb.test.EnumContainer|Object} message EnumContainer or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.EnumContainer|Object)): string;
        }

        /**
         * Constructs a new Simple1.
         * @exports jspb.test.Simple1
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class Simple1 {

            /**
             * Constructs a new Simple1.
             * @exports jspb.test.Simple1
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * Simple1 aString.
             * @type {string}
             */
            aString: string;

            /**
             * Simple1 aRepeatedString.
             * @type {Array.<string>}
             */
            aRepeatedString: string[];

            /**
             * Simple1 aBoolean.
             * @type {boolean}
             */
            aBoolean: boolean;

            /**
             * Creates a new Simple1 instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Simple1} Simple1 instance
             */
            static create(properties?: Object): jspb.test.Simple1;

            /**
             * Encodes the specified Simple1.
             * @function
             * @param {jspb.test.Simple1|Object} message Simple1 or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.Simple1|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified Simple1, length delimited.
             * @param {jspb.test.Simple1|Object} message Simple1 or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.Simple1|Object), writer?: Writer): Writer;

            /**
             * Decodes a Simple1 from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Simple1} Simple1
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.Simple1;

            /**
             * Decodes a Simple1 from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Simple1} Simple1
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.Simple1;

            /**
             * Verifies a Simple1.
             * @function
             * @param {jspb.test.Simple1|Object} message Simple1 or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.Simple1|Object)): string;
        }

        /**
         * Constructs a new Simple2.
         * @exports jspb.test.Simple2
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class Simple2 {

            /**
             * Constructs a new Simple2.
             * @exports jspb.test.Simple2
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * Simple2 aString.
             * @type {string}
             */
            aString: string;

            /**
             * Simple2 aRepeatedString.
             * @type {Array.<string>}
             */
            aRepeatedString: string[];

            /**
             * Creates a new Simple2 instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Simple2} Simple2 instance
             */
            static create(properties?: Object): jspb.test.Simple2;

            /**
             * Encodes the specified Simple2.
             * @function
             * @param {jspb.test.Simple2|Object} message Simple2 or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.Simple2|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified Simple2, length delimited.
             * @param {jspb.test.Simple2|Object} message Simple2 or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.Simple2|Object), writer?: Writer): Writer;

            /**
             * Decodes a Simple2 from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Simple2} Simple2
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.Simple2;

            /**
             * Decodes a Simple2 from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Simple2} Simple2
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.Simple2;

            /**
             * Verifies a Simple2.
             * @function
             * @param {jspb.test.Simple2|Object} message Simple2 or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.Simple2|Object)): string;
        }

        /**
         * Constructs a new SpecialCases.
         * @exports jspb.test.SpecialCases
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class SpecialCases {

            /**
             * Constructs a new SpecialCases.
             * @exports jspb.test.SpecialCases
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * SpecialCases normal.
             * @type {string}
             */
            normal: string;

            /**
             * SpecialCases default.
             * @name jspb.test.SpecialCases#default
             * @type {string}
             */
            default: string;

            /**
             * SpecialCases function.
             * @name jspb.test.SpecialCases#function
             * @type {string}
             */
            function: string;

            /**
             * SpecialCases var.
             * @name jspb.test.SpecialCases#var
             * @type {string}
             */
            var: string;

            /**
             * Creates a new SpecialCases instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.SpecialCases} SpecialCases instance
             */
            static create(properties?: Object): jspb.test.SpecialCases;

            /**
             * Encodes the specified SpecialCases.
             * @function
             * @param {jspb.test.SpecialCases|Object} message SpecialCases or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.SpecialCases|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified SpecialCases, length delimited.
             * @param {jspb.test.SpecialCases|Object} message SpecialCases or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.SpecialCases|Object), writer?: Writer): Writer;

            /**
             * Decodes a SpecialCases from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.SpecialCases} SpecialCases
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.SpecialCases;

            /**
             * Decodes a SpecialCases from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.SpecialCases} SpecialCases
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.SpecialCases;

            /**
             * Verifies a SpecialCases.
             * @function
             * @param {jspb.test.SpecialCases|Object} message SpecialCases or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.SpecialCases|Object)): string;
        }

        /**
         * Constructs a new OptionalFields.
         * @exports jspb.test.OptionalFields
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class OptionalFields {

            /**
             * Constructs a new OptionalFields.
             * @exports jspb.test.OptionalFields
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * OptionalFields aString.
             * @type {string}
             */
            aString: string;

            /**
             * OptionalFields aBool.
             * @type {boolean}
             */
            aBool: boolean;

            /**
             * OptionalFields aNestedMessage.
             * @type {jspb.test.OptionalFields.Nested}
             */
            aNestedMessage: jspb.test.OptionalFields.Nested;

            /**
             * OptionalFields aRepeatedMessage.
             * @type {Array.<jspb.test.OptionalFields.Nested>}
             */
            aRepeatedMessage: jspb.test.OptionalFields.Nested[];

            /**
             * OptionalFields aRepeatedString.
             * @type {Array.<string>}
             */
            aRepeatedString: string[];

            /**
             * Creates a new OptionalFields instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.OptionalFields} OptionalFields instance
             */
            static create(properties?: Object): jspb.test.OptionalFields;

            /**
             * Encodes the specified OptionalFields.
             * @function
             * @param {jspb.test.OptionalFields|Object} message OptionalFields or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.OptionalFields|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified OptionalFields, length delimited.
             * @param {jspb.test.OptionalFields|Object} message OptionalFields or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.OptionalFields|Object), writer?: Writer): Writer;

            /**
             * Decodes a OptionalFields from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.OptionalFields} OptionalFields
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.OptionalFields;

            /**
             * Decodes a OptionalFields from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.OptionalFields} OptionalFields
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.OptionalFields;

            /**
             * Verifies a OptionalFields.
             * @function
             * @param {jspb.test.OptionalFields|Object} message OptionalFields or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.OptionalFields|Object)): string;
        }


        /**
         * Constructs a new OptionalFields.
         * @exports jspb.test.OptionalFields
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        module OptionalFields {

            /**
             * Constructs a new Nested.
             * @exports jspb.test.OptionalFields.Nested
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            class Nested {

                /**
                 * Constructs a new Nested.
                 * @exports jspb.test.OptionalFields.Nested
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                constructor(properties?: Object);

                /**
                 * Nested anInt.
                 * @type {number}
                 */
                anInt: number;

                /**
                 * Creates a new Nested instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {jspb.test.OptionalFields.Nested} Nested instance
                 */
                static create(properties?: Object): jspb.test.OptionalFields.Nested;

                /**
                 * Encodes the specified Nested.
                 * @function
                 * @param {jspb.test.OptionalFields.Nested|Object} message Nested or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encode(message: (jspb.test.OptionalFields.Nested|Object), writer?: Writer): Writer;

                /**
                 * Encodes the specified Nested, length delimited.
                 * @param {jspb.test.OptionalFields.Nested|Object} message Nested or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encodeDelimited(message: (jspb.test.OptionalFields.Nested|Object), writer?: Writer): Writer;

                /**
                 * Decodes a Nested from the specified reader or buffer.
                 * @function
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.OptionalFields.Nested} Nested
                 */
                static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.OptionalFields.Nested;

                /**
                 * Decodes a Nested from the specified reader or buffer, length delimited.
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.OptionalFields.Nested} Nested
                 */
                static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.OptionalFields.Nested;

                /**
                 * Verifies a Nested.
                 * @function
                 * @param {jspb.test.OptionalFields.Nested|Object} message Nested or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: (jspb.test.OptionalFields.Nested|Object)): string;
            }
        }

        /**
         * Constructs a new HasExtensions.
         * @exports jspb.test.HasExtensions
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class HasExtensions {

            /**
             * Constructs a new HasExtensions.
             * @exports jspb.test.HasExtensions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * HasExtensions str1.
             * @type {string}
             */
            str1: string;

            /**
             * HasExtensions str2.
             * @type {string}
             */
            str2: string;

            /**
             * HasExtensions str3.
             * @type {string}
             */
            str3: string;

            /**
             * Creates a new HasExtensions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.HasExtensions} HasExtensions instance
             */
            static create(properties?: Object): jspb.test.HasExtensions;

            /**
             * Encodes the specified HasExtensions.
             * @function
             * @param {jspb.test.HasExtensions|Object} message HasExtensions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.HasExtensions|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified HasExtensions, length delimited.
             * @param {jspb.test.HasExtensions|Object} message HasExtensions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.HasExtensions|Object), writer?: Writer): Writer;

            /**
             * Decodes a HasExtensions from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.HasExtensions} HasExtensions
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.HasExtensions;

            /**
             * Decodes a HasExtensions from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.HasExtensions} HasExtensions
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.HasExtensions;

            /**
             * Verifies a HasExtensions.
             * @function
             * @param {jspb.test.HasExtensions|Object} message HasExtensions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.HasExtensions|Object)): string;
        }

        /**
         * Constructs a new Complex.
         * @exports jspb.test.Complex
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class Complex {

            /**
             * Constructs a new Complex.
             * @exports jspb.test.Complex
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * Complex aString.
             * @type {string}
             */
            aString: string;

            /**
             * Complex anOutOfOrderBool.
             * @type {boolean}
             */
            anOutOfOrderBool: boolean;

            /**
             * Complex aNestedMessage.
             * @type {jspb.test.Complex.Nested}
             */
            aNestedMessage: jspb.test.Complex.Nested;

            /**
             * Complex aRepeatedMessage.
             * @type {Array.<jspb.test.Complex.Nested>}
             */
            aRepeatedMessage: jspb.test.Complex.Nested[];

            /**
             * Complex aRepeatedString.
             * @type {Array.<string>}
             */
            aRepeatedString: string[];

            /**
             * Creates a new Complex instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Complex} Complex instance
             */
            static create(properties?: Object): jspb.test.Complex;

            /**
             * Encodes the specified Complex.
             * @function
             * @param {jspb.test.Complex|Object} message Complex or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.Complex|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified Complex, length delimited.
             * @param {jspb.test.Complex|Object} message Complex or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.Complex|Object), writer?: Writer): Writer;

            /**
             * Decodes a Complex from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Complex} Complex
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.Complex;

            /**
             * Decodes a Complex from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Complex} Complex
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.Complex;

            /**
             * Verifies a Complex.
             * @function
             * @param {jspb.test.Complex|Object} message Complex or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.Complex|Object)): string;
        }


        /**
         * Constructs a new Complex.
         * @exports jspb.test.Complex
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        module Complex {

            /**
             * Constructs a new Nested.
             * @exports jspb.test.Complex.Nested
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            class Nested {

                /**
                 * Constructs a new Nested.
                 * @exports jspb.test.Complex.Nested
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                constructor(properties?: Object);

                /**
                 * Nested anInt.
                 * @type {number}
                 */
                anInt: number;

                /**
                 * Creates a new Nested instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {jspb.test.Complex.Nested} Nested instance
                 */
                static create(properties?: Object): jspb.test.Complex.Nested;

                /**
                 * Encodes the specified Nested.
                 * @function
                 * @param {jspb.test.Complex.Nested|Object} message Nested or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encode(message: (jspb.test.Complex.Nested|Object), writer?: Writer): Writer;

                /**
                 * Encodes the specified Nested, length delimited.
                 * @param {jspb.test.Complex.Nested|Object} message Nested or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encodeDelimited(message: (jspb.test.Complex.Nested|Object), writer?: Writer): Writer;

                /**
                 * Decodes a Nested from the specified reader or buffer.
                 * @function
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.Complex.Nested} Nested
                 */
                static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.Complex.Nested;

                /**
                 * Decodes a Nested from the specified reader or buffer, length delimited.
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.Complex.Nested} Nested
                 */
                static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.Complex.Nested;

                /**
                 * Verifies a Nested.
                 * @function
                 * @param {jspb.test.Complex.Nested|Object} message Nested or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: (jspb.test.Complex.Nested|Object)): string;
            }
        }

        /**
         * Constructs a new OuterMessage.
         * @exports jspb.test.OuterMessage
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class OuterMessage {

            /**
             * Constructs a new OuterMessage.
             * @exports jspb.test.OuterMessage
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * Creates a new OuterMessage instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.OuterMessage} OuterMessage instance
             */
            static create(properties?: Object): jspb.test.OuterMessage;

            /**
             * Encodes the specified OuterMessage.
             * @function
             * @param {jspb.test.OuterMessage|Object} message OuterMessage or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.OuterMessage|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified OuterMessage, length delimited.
             * @param {jspb.test.OuterMessage|Object} message OuterMessage or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.OuterMessage|Object), writer?: Writer): Writer;

            /**
             * Decodes a OuterMessage from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.OuterMessage} OuterMessage
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.OuterMessage;

            /**
             * Decodes a OuterMessage from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.OuterMessage} OuterMessage
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.OuterMessage;

            /**
             * Verifies a OuterMessage.
             * @function
             * @param {jspb.test.OuterMessage|Object} message OuterMessage or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.OuterMessage|Object)): string;
        }


        /**
         * Constructs a new OuterMessage.
         * @exports jspb.test.OuterMessage
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        module OuterMessage {

            /**
             * Constructs a new Complex.
             * @exports jspb.test.OuterMessage.Complex
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            class Complex {

                /**
                 * Constructs a new Complex.
                 * @exports jspb.test.OuterMessage.Complex
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                constructor(properties?: Object);

                /**
                 * Complex innerComplexField.
                 * @type {number}
                 */
                innerComplexField: number;

                /**
                 * Creates a new Complex instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {jspb.test.OuterMessage.Complex} Complex instance
                 */
                static create(properties?: Object): jspb.test.OuterMessage.Complex;

                /**
                 * Encodes the specified Complex.
                 * @function
                 * @param {jspb.test.OuterMessage.Complex|Object} message Complex or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encode(message: (jspb.test.OuterMessage.Complex|Object), writer?: Writer): Writer;

                /**
                 * Encodes the specified Complex, length delimited.
                 * @param {jspb.test.OuterMessage.Complex|Object} message Complex or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encodeDelimited(message: (jspb.test.OuterMessage.Complex|Object), writer?: Writer): Writer;

                /**
                 * Decodes a Complex from the specified reader or buffer.
                 * @function
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.OuterMessage.Complex} Complex
                 */
                static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.OuterMessage.Complex;

                /**
                 * Decodes a Complex from the specified reader or buffer, length delimited.
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.OuterMessage.Complex} Complex
                 */
                static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.OuterMessage.Complex;

                /**
                 * Verifies a Complex.
                 * @function
                 * @param {jspb.test.OuterMessage.Complex|Object} message Complex or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: (jspb.test.OuterMessage.Complex|Object)): string;
            }
        }

        /**
         * Constructs a new IsExtension.
         * @exports jspb.test.IsExtension
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class IsExtension {

            /**
             * Constructs a new IsExtension.
             * @exports jspb.test.IsExtension
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * IsExtension ext1.
             * @type {string}
             */
            ext1: string;

            /**
             * Creates a new IsExtension instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.IsExtension} IsExtension instance
             */
            static create(properties?: Object): jspb.test.IsExtension;

            /**
             * Encodes the specified IsExtension.
             * @function
             * @param {jspb.test.IsExtension|Object} message IsExtension or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.IsExtension|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified IsExtension, length delimited.
             * @param {jspb.test.IsExtension|Object} message IsExtension or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.IsExtension|Object), writer?: Writer): Writer;

            /**
             * Decodes a IsExtension from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.IsExtension} IsExtension
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.IsExtension;

            /**
             * Decodes a IsExtension from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.IsExtension} IsExtension
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.IsExtension;

            /**
             * Verifies a IsExtension.
             * @function
             * @param {jspb.test.IsExtension|Object} message IsExtension or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.IsExtension|Object)): string;
        }

        /**
         * Constructs a new IndirectExtension.
         * @exports jspb.test.IndirectExtension
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class IndirectExtension {

            /**
             * Constructs a new IndirectExtension.
             * @exports jspb.test.IndirectExtension
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * Creates a new IndirectExtension instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.IndirectExtension} IndirectExtension instance
             */
            static create(properties?: Object): jspb.test.IndirectExtension;

            /**
             * Encodes the specified IndirectExtension.
             * @function
             * @param {jspb.test.IndirectExtension|Object} message IndirectExtension or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.IndirectExtension|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified IndirectExtension, length delimited.
             * @param {jspb.test.IndirectExtension|Object} message IndirectExtension or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.IndirectExtension|Object), writer?: Writer): Writer;

            /**
             * Decodes a IndirectExtension from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.IndirectExtension} IndirectExtension
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.IndirectExtension;

            /**
             * Decodes a IndirectExtension from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.IndirectExtension} IndirectExtension
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.IndirectExtension;

            /**
             * Verifies a IndirectExtension.
             * @function
             * @param {jspb.test.IndirectExtension|Object} message IndirectExtension or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.IndirectExtension|Object)): string;
        }

        /**
         * Constructs a new DefaultValues.
         * @exports jspb.test.DefaultValues
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class DefaultValues {

            /**
             * Constructs a new DefaultValues.
             * @exports jspb.test.DefaultValues
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * DefaultValues stringField.
             * @type {string}
             */
            stringField: string;

            /**
             * DefaultValues boolField.
             * @type {boolean}
             */
            boolField: boolean;

            /**
             * DefaultValues intField.
             * @type {number|Long}
             */
            intField: (number|Long);

            /**
             * DefaultValues enumField.
             * @type {number}
             */
            enumField: number;

            /**
             * DefaultValues emptyField.
             * @type {string}
             */
            emptyField: string;

            /**
             * DefaultValues bytesField.
             * @type {Uint8Array}
             */
            bytesField: Uint8Array;

            /**
             * Creates a new DefaultValues instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.DefaultValues} DefaultValues instance
             */
            static create(properties?: Object): jspb.test.DefaultValues;

            /**
             * Encodes the specified DefaultValues.
             * @function
             * @param {jspb.test.DefaultValues|Object} message DefaultValues or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.DefaultValues|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified DefaultValues, length delimited.
             * @param {jspb.test.DefaultValues|Object} message DefaultValues or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.DefaultValues|Object), writer?: Writer): Writer;

            /**
             * Decodes a DefaultValues from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.DefaultValues} DefaultValues
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.DefaultValues;

            /**
             * Decodes a DefaultValues from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.DefaultValues} DefaultValues
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.DefaultValues;

            /**
             * Verifies a DefaultValues.
             * @function
             * @param {jspb.test.DefaultValues|Object} message DefaultValues or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.DefaultValues|Object)): string;
        }

        /**
         * Constructs a new FloatingPointFields.
         * @exports jspb.test.FloatingPointFields
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class FloatingPointFields {

            /**
             * Constructs a new FloatingPointFields.
             * @exports jspb.test.FloatingPointFields
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * FloatingPointFields optionalFloatField.
             * @type {number}
             */
            optionalFloatField: number;

            /**
             * FloatingPointFields requiredFloatField.
             * @type {number}
             */
            requiredFloatField: number;

            /**
             * FloatingPointFields repeatedFloatField.
             * @type {Array.<number>}
             */
            repeatedFloatField: number[];

            /**
             * FloatingPointFields defaultFloatField.
             * @type {number}
             */
            defaultFloatField: number;

            /**
             * FloatingPointFields optionalDoubleField.
             * @type {number}
             */
            optionalDoubleField: number;

            /**
             * FloatingPointFields requiredDoubleField.
             * @type {number}
             */
            requiredDoubleField: number;

            /**
             * FloatingPointFields repeatedDoubleField.
             * @type {Array.<number>}
             */
            repeatedDoubleField: number[];

            /**
             * FloatingPointFields defaultDoubleField.
             * @type {number}
             */
            defaultDoubleField: number;

            /**
             * Creates a new FloatingPointFields instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.FloatingPointFields} FloatingPointFields instance
             */
            static create(properties?: Object): jspb.test.FloatingPointFields;

            /**
             * Encodes the specified FloatingPointFields.
             * @function
             * @param {jspb.test.FloatingPointFields|Object} message FloatingPointFields or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.FloatingPointFields|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified FloatingPointFields, length delimited.
             * @param {jspb.test.FloatingPointFields|Object} message FloatingPointFields or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.FloatingPointFields|Object), writer?: Writer): Writer;

            /**
             * Decodes a FloatingPointFields from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.FloatingPointFields} FloatingPointFields
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.FloatingPointFields;

            /**
             * Decodes a FloatingPointFields from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.FloatingPointFields} FloatingPointFields
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.FloatingPointFields;

            /**
             * Verifies a FloatingPointFields.
             * @function
             * @param {jspb.test.FloatingPointFields|Object} message FloatingPointFields or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.FloatingPointFields|Object)): string;
        }

        /**
         * Constructs a new TestClone.
         * @exports jspb.test.TestClone
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class TestClone {

            /**
             * Constructs a new TestClone.
             * @exports jspb.test.TestClone
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * TestClone str.
             * @type {string}
             */
            str: string;

            /**
             * TestClone simple1.
             * @type {jspb.test.Simple1}
             */
            simple1: jspb.test.Simple1;

            /**
             * TestClone simple2.
             * @type {Array.<jspb.test.Simple1>}
             */
            simple2: jspb.test.Simple1[];

            /**
             * TestClone bytesField.
             * @type {Uint8Array}
             */
            bytesField: Uint8Array;

            /**
             * TestClone unused.
             * @type {string}
             */
            unused: string;

            /**
             * Creates a new TestClone instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestClone} TestClone instance
             */
            static create(properties?: Object): jspb.test.TestClone;

            /**
             * Encodes the specified TestClone.
             * @function
             * @param {jspb.test.TestClone|Object} message TestClone or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.TestClone|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified TestClone, length delimited.
             * @param {jspb.test.TestClone|Object} message TestClone or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.TestClone|Object), writer?: Writer): Writer;

            /**
             * Decodes a TestClone from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestClone} TestClone
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.TestClone;

            /**
             * Decodes a TestClone from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestClone} TestClone
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.TestClone;

            /**
             * Verifies a TestClone.
             * @function
             * @param {jspb.test.TestClone|Object} message TestClone or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.TestClone|Object)): string;
        }

        /**
         * Constructs a new CloneExtension.
         * @exports jspb.test.CloneExtension
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class CloneExtension {

            /**
             * Constructs a new CloneExtension.
             * @exports jspb.test.CloneExtension
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * CloneExtension ext.
             * @type {string}
             */
            ext: string;

            /**
             * Creates a new CloneExtension instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.CloneExtension} CloneExtension instance
             */
            static create(properties?: Object): jspb.test.CloneExtension;

            /**
             * Encodes the specified CloneExtension.
             * @function
             * @param {jspb.test.CloneExtension|Object} message CloneExtension or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.CloneExtension|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified CloneExtension, length delimited.
             * @param {jspb.test.CloneExtension|Object} message CloneExtension or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.CloneExtension|Object), writer?: Writer): Writer;

            /**
             * Decodes a CloneExtension from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.CloneExtension} CloneExtension
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.CloneExtension;

            /**
             * Decodes a CloneExtension from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.CloneExtension} CloneExtension
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.CloneExtension;

            /**
             * Verifies a CloneExtension.
             * @function
             * @param {jspb.test.CloneExtension|Object} message CloneExtension or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.CloneExtension|Object)): string;
        }

        /**
         * Constructs a new TestGroup.
         * @exports jspb.test.TestGroup
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class TestGroup {

            /**
             * Constructs a new TestGroup.
             * @exports jspb.test.TestGroup
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * TestGroup id.
             * @type {string}
             */
            id: string;

            /**
             * TestGroup requiredSimple.
             * @type {jspb.test.Simple2}
             */
            requiredSimple: jspb.test.Simple2;

            /**
             * TestGroup optionalSimple.
             * @type {jspb.test.Simple2}
             */
            optionalSimple: jspb.test.Simple2;

            /**
             * Creates a new TestGroup instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestGroup} TestGroup instance
             */
            static create(properties?: Object): jspb.test.TestGroup;

            /**
             * Encodes the specified TestGroup.
             * @function
             * @param {jspb.test.TestGroup|Object} message TestGroup or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.TestGroup|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified TestGroup, length delimited.
             * @param {jspb.test.TestGroup|Object} message TestGroup or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.TestGroup|Object), writer?: Writer): Writer;

            /**
             * Decodes a TestGroup from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestGroup} TestGroup
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.TestGroup;

            /**
             * Decodes a TestGroup from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestGroup} TestGroup
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.TestGroup;

            /**
             * Verifies a TestGroup.
             * @function
             * @param {jspb.test.TestGroup|Object} message TestGroup or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.TestGroup|Object)): string;
        }

        /**
         * Constructs a new TestReservedNames.
         * @exports jspb.test.TestReservedNames
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class TestReservedNames {

            /**
             * Constructs a new TestReservedNames.
             * @exports jspb.test.TestReservedNames
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * TestReservedNames extension.
             * @type {number}
             */
            extension: number;

            /**
             * Creates a new TestReservedNames instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestReservedNames} TestReservedNames instance
             */
            static create(properties?: Object): jspb.test.TestReservedNames;

            /**
             * Encodes the specified TestReservedNames.
             * @function
             * @param {jspb.test.TestReservedNames|Object} message TestReservedNames or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.TestReservedNames|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified TestReservedNames, length delimited.
             * @param {jspb.test.TestReservedNames|Object} message TestReservedNames or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.TestReservedNames|Object), writer?: Writer): Writer;

            /**
             * Decodes a TestReservedNames from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestReservedNames} TestReservedNames
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.TestReservedNames;

            /**
             * Decodes a TestReservedNames from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestReservedNames} TestReservedNames
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.TestReservedNames;

            /**
             * Verifies a TestReservedNames.
             * @function
             * @param {jspb.test.TestReservedNames|Object} message TestReservedNames or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.TestReservedNames|Object)): string;
        }

        /**
         * Constructs a new TestReservedNamesExtension.
         * @exports jspb.test.TestReservedNamesExtension
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class TestReservedNamesExtension {

            /**
             * Constructs a new TestReservedNamesExtension.
             * @exports jspb.test.TestReservedNamesExtension
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * Creates a new TestReservedNamesExtension instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestReservedNamesExtension} TestReservedNamesExtension instance
             */
            static create(properties?: Object): jspb.test.TestReservedNamesExtension;

            /**
             * Encodes the specified TestReservedNamesExtension.
             * @function
             * @param {jspb.test.TestReservedNamesExtension|Object} message TestReservedNamesExtension or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.TestReservedNamesExtension|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified TestReservedNamesExtension, length delimited.
             * @param {jspb.test.TestReservedNamesExtension|Object} message TestReservedNamesExtension or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.TestReservedNamesExtension|Object), writer?: Writer): Writer;

            /**
             * Decodes a TestReservedNamesExtension from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestReservedNamesExtension} TestReservedNamesExtension
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.TestReservedNamesExtension;

            /**
             * Decodes a TestReservedNamesExtension from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestReservedNamesExtension} TestReservedNamesExtension
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.TestReservedNamesExtension;

            /**
             * Verifies a TestReservedNamesExtension.
             * @function
             * @param {jspb.test.TestReservedNamesExtension|Object} message TestReservedNamesExtension or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.TestReservedNamesExtension|Object)): string;
        }

        /**
         * Constructs a new TestMessageWithOneof.
         * @exports jspb.test.TestMessageWithOneof
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class TestMessageWithOneof {

            /**
             * Constructs a new TestMessageWithOneof.
             * @exports jspb.test.TestMessageWithOneof
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * TestMessageWithOneof pone.
             * @type {string}
             */
            pone: string;

            /**
             * TestMessageWithOneof pthree.
             * @type {string}
             */
            pthree: string;

            /**
             * TestMessageWithOneof rone.
             * @type {jspb.test.TestMessageWithOneof}
             */
            rone: jspb.test.TestMessageWithOneof;

            /**
             * TestMessageWithOneof rtwo.
             * @type {string}
             */
            rtwo: string;

            /**
             * TestMessageWithOneof normalField.
             * @type {boolean}
             */
            normalField: boolean;

            /**
             * TestMessageWithOneof repeatedField.
             * @type {Array.<string>}
             */
            repeatedField: string[];

            /**
             * TestMessageWithOneof aone.
             * @type {number}
             */
            aone: number;

            /**
             * TestMessageWithOneof atwo.
             * @type {number}
             */
            atwo: number;

            /**
             * TestMessageWithOneof bone.
             * @type {number}
             */
            bone: number;

            /**
             * TestMessageWithOneof btwo.
             * @type {number}
             */
            btwo: number;

            /**
             * TestMessageWithOneof partialOneof.
             * @name jspb.test.TestMessageWithOneof#partialOneof
             * @type {string|undefined}
             */
            partialOneof: (string|undefined);

            /**
             * TestMessageWithOneof recursiveOneof.
             * @name jspb.test.TestMessageWithOneof#recursiveOneof
             * @type {string|undefined}
             */
            recursiveOneof: (string|undefined);

            /**
             * TestMessageWithOneof defaultOneofA.
             * @name jspb.test.TestMessageWithOneof#defaultOneofA
             * @type {string|undefined}
             */
            defaultOneofA: (string|undefined);

            /**
             * TestMessageWithOneof defaultOneofB.
             * @name jspb.test.TestMessageWithOneof#defaultOneofB
             * @type {string|undefined}
             */
            defaultOneofB: (string|undefined);

            /**
             * Creates a new TestMessageWithOneof instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestMessageWithOneof} TestMessageWithOneof instance
             */
            static create(properties?: Object): jspb.test.TestMessageWithOneof;

            /**
             * Encodes the specified TestMessageWithOneof.
             * @function
             * @param {jspb.test.TestMessageWithOneof|Object} message TestMessageWithOneof or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.TestMessageWithOneof|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified TestMessageWithOneof, length delimited.
             * @param {jspb.test.TestMessageWithOneof|Object} message TestMessageWithOneof or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.TestMessageWithOneof|Object), writer?: Writer): Writer;

            /**
             * Decodes a TestMessageWithOneof from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestMessageWithOneof} TestMessageWithOneof
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.TestMessageWithOneof;

            /**
             * Decodes a TestMessageWithOneof from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestMessageWithOneof} TestMessageWithOneof
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.TestMessageWithOneof;

            /**
             * Verifies a TestMessageWithOneof.
             * @function
             * @param {jspb.test.TestMessageWithOneof|Object} message TestMessageWithOneof or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.TestMessageWithOneof|Object)): string;
        }

        /**
         * Constructs a new TestEndsWithBytes.
         * @exports jspb.test.TestEndsWithBytes
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class TestEndsWithBytes {

            /**
             * Constructs a new TestEndsWithBytes.
             * @exports jspb.test.TestEndsWithBytes
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * TestEndsWithBytes value.
             * @type {number}
             */
            value: number;

            /**
             * TestEndsWithBytes data.
             * @type {Uint8Array}
             */
            data: Uint8Array;

            /**
             * Creates a new TestEndsWithBytes instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestEndsWithBytes} TestEndsWithBytes instance
             */
            static create(properties?: Object): jspb.test.TestEndsWithBytes;

            /**
             * Encodes the specified TestEndsWithBytes.
             * @function
             * @param {jspb.test.TestEndsWithBytes|Object} message TestEndsWithBytes or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.TestEndsWithBytes|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified TestEndsWithBytes, length delimited.
             * @param {jspb.test.TestEndsWithBytes|Object} message TestEndsWithBytes or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.TestEndsWithBytes|Object), writer?: Writer): Writer;

            /**
             * Decodes a TestEndsWithBytes from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestEndsWithBytes} TestEndsWithBytes
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.TestEndsWithBytes;

            /**
             * Decodes a TestEndsWithBytes from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestEndsWithBytes} TestEndsWithBytes
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.TestEndsWithBytes;

            /**
             * Verifies a TestEndsWithBytes.
             * @function
             * @param {jspb.test.TestEndsWithBytes|Object} message TestEndsWithBytes or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.TestEndsWithBytes|Object)): string;
        }

        /**
         * Constructs a new TestMapFieldsNoBinary.
         * @exports jspb.test.TestMapFieldsNoBinary
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class TestMapFieldsNoBinary {

            /**
             * Constructs a new TestMapFieldsNoBinary.
             * @exports jspb.test.TestMapFieldsNoBinary
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * TestMapFieldsNoBinary mapStringString.
             * @type {string}
             */
            mapStringString: string;

            /**
             * TestMapFieldsNoBinary mapStringInt32.
             * @type {number}
             */
            mapStringInt32: number;

            /**
             * TestMapFieldsNoBinary mapStringInt64.
             * @type {number|Long}
             */
            mapStringInt64: (number|Long);

            /**
             * TestMapFieldsNoBinary mapStringBool.
             * @type {boolean}
             */
            mapStringBool: boolean;

            /**
             * TestMapFieldsNoBinary mapStringDouble.
             * @type {number}
             */
            mapStringDouble: number;

            /**
             * TestMapFieldsNoBinary mapStringEnum.
             * @type {number}
             */
            mapStringEnum: number;

            /**
             * TestMapFieldsNoBinary mapStringMsg.
             * @type {jspb.test.MapValueMessageNoBinary}
             */
            mapStringMsg: jspb.test.MapValueMessageNoBinary;

            /**
             * TestMapFieldsNoBinary mapInt32String.
             * @type {string}
             */
            mapInt32String: string;

            /**
             * TestMapFieldsNoBinary mapInt64String.
             * @type {string}
             */
            mapInt64String: string;

            /**
             * TestMapFieldsNoBinary mapBoolString.
             * @type {string}
             */
            mapBoolString: string;

            /**
             * TestMapFieldsNoBinary testMapFields.
             * @type {jspb.test.TestMapFieldsNoBinary}
             */
            testMapFields: jspb.test.TestMapFieldsNoBinary;

            /**
             * TestMapFieldsNoBinary mapStringTestmapfields.
             * @type {jspb.test.TestMapFieldsNoBinary}
             */
            mapStringTestmapfields: jspb.test.TestMapFieldsNoBinary;

            /**
             * Creates a new TestMapFieldsNoBinary instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.TestMapFieldsNoBinary} TestMapFieldsNoBinary instance
             */
            static create(properties?: Object): jspb.test.TestMapFieldsNoBinary;

            /**
             * Encodes the specified TestMapFieldsNoBinary.
             * @function
             * @param {jspb.test.TestMapFieldsNoBinary|Object} message TestMapFieldsNoBinary or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.TestMapFieldsNoBinary|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified TestMapFieldsNoBinary, length delimited.
             * @param {jspb.test.TestMapFieldsNoBinary|Object} message TestMapFieldsNoBinary or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.TestMapFieldsNoBinary|Object), writer?: Writer): Writer;

            /**
             * Decodes a TestMapFieldsNoBinary from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.TestMapFieldsNoBinary} TestMapFieldsNoBinary
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.TestMapFieldsNoBinary;

            /**
             * Decodes a TestMapFieldsNoBinary from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.TestMapFieldsNoBinary} TestMapFieldsNoBinary
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.TestMapFieldsNoBinary;

            /**
             * Verifies a TestMapFieldsNoBinary.
             * @function
             * @param {jspb.test.TestMapFieldsNoBinary|Object} message TestMapFieldsNoBinary or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.TestMapFieldsNoBinary|Object)): string;
        }

        /**
         * Constructs a new MapValueMessageNoBinary.
         * @exports jspb.test.MapValueMessageNoBinary
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class MapValueMessageNoBinary {

            /**
             * Constructs a new MapValueMessageNoBinary.
             * @exports jspb.test.MapValueMessageNoBinary
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * MapValueMessageNoBinary foo.
             * @type {number}
             */
            foo: number;

            /**
             * Creates a new MapValueMessageNoBinary instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.MapValueMessageNoBinary} MapValueMessageNoBinary instance
             */
            static create(properties?: Object): jspb.test.MapValueMessageNoBinary;

            /**
             * Encodes the specified MapValueMessageNoBinary.
             * @function
             * @param {jspb.test.MapValueMessageNoBinary|Object} message MapValueMessageNoBinary or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.MapValueMessageNoBinary|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified MapValueMessageNoBinary, length delimited.
             * @param {jspb.test.MapValueMessageNoBinary|Object} message MapValueMessageNoBinary or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.MapValueMessageNoBinary|Object), writer?: Writer): Writer;

            /**
             * Decodes a MapValueMessageNoBinary from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.MapValueMessageNoBinary} MapValueMessageNoBinary
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.MapValueMessageNoBinary;

            /**
             * Decodes a MapValueMessageNoBinary from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.MapValueMessageNoBinary} MapValueMessageNoBinary
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.MapValueMessageNoBinary;

            /**
             * Verifies a MapValueMessageNoBinary.
             * @function
             * @param {jspb.test.MapValueMessageNoBinary|Object} message MapValueMessageNoBinary or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.MapValueMessageNoBinary|Object)): string;
        }

        /**
         * Constructs a new Deeply.
         * @exports jspb.test.Deeply
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class Deeply {

            /**
             * Constructs a new Deeply.
             * @exports jspb.test.Deeply
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * Creates a new Deeply instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {jspb.test.Deeply} Deeply instance
             */
            static create(properties?: Object): jspb.test.Deeply;

            /**
             * Encodes the specified Deeply.
             * @function
             * @param {jspb.test.Deeply|Object} message Deeply or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (jspb.test.Deeply|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified Deeply, length delimited.
             * @param {jspb.test.Deeply|Object} message Deeply or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (jspb.test.Deeply|Object), writer?: Writer): Writer;

            /**
             * Decodes a Deeply from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {jspb.test.Deeply} Deeply
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.Deeply;

            /**
             * Decodes a Deeply from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {jspb.test.Deeply} Deeply
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.Deeply;

            /**
             * Verifies a Deeply.
             * @function
             * @param {jspb.test.Deeply|Object} message Deeply or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (jspb.test.Deeply|Object)): string;
        }


        /**
         * Constructs a new Deeply.
         * @exports jspb.test.Deeply
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        module Deeply {

            /**
             * Constructs a new Nested.
             * @exports jspb.test.Deeply.Nested
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            class Nested {

                /**
                 * Constructs a new Nested.
                 * @exports jspb.test.Deeply.Nested
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                constructor(properties?: Object);

                /**
                 * Creates a new Nested instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {jspb.test.Deeply.Nested} Nested instance
                 */
                static create(properties?: Object): jspb.test.Deeply.Nested;

                /**
                 * Encodes the specified Nested.
                 * @function
                 * @param {jspb.test.Deeply.Nested|Object} message Nested or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encode(message: (jspb.test.Deeply.Nested|Object), writer?: Writer): Writer;

                /**
                 * Encodes the specified Nested, length delimited.
                 * @param {jspb.test.Deeply.Nested|Object} message Nested or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encodeDelimited(message: (jspb.test.Deeply.Nested|Object), writer?: Writer): Writer;

                /**
                 * Decodes a Nested from the specified reader or buffer.
                 * @function
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {jspb.test.Deeply.Nested} Nested
                 */
                static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested;

                /**
                 * Decodes a Nested from the specified reader or buffer, length delimited.
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {jspb.test.Deeply.Nested} Nested
                 */
                static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.Deeply.Nested;

                /**
                 * Verifies a Nested.
                 * @function
                 * @param {jspb.test.Deeply.Nested|Object} message Nested or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: (jspb.test.Deeply.Nested|Object)): string;
            }


            /**
             * Constructs a new Nested.
             * @exports jspb.test.Deeply.Nested
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            module Nested {

                /**
                 * Constructs a new Message.
                 * @exports jspb.test.Deeply.Nested.Message
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                class Message {

                    /**
                     * Constructs a new Message.
                     * @exports jspb.test.Deeply.Nested.Message
                     * @constructor
                     * @param {Object} [properties] Properties to set
                     */
                    constructor(properties?: Object);

                    /**
                     * Message count.
                     * @type {number}
                     */
                    count: number;

                    /**
                     * Creates a new Message instance using the specified properties.
                     * @param {Object} [properties] Properties to set
                     * @returns {jspb.test.Deeply.Nested.Message} Message instance
                     */
                    static create(properties?: Object): jspb.test.Deeply.Nested.Message;

                    /**
                     * Encodes the specified Message.
                     * @function
                     * @param {jspb.test.Deeply.Nested.Message|Object} message Message or plain object to encode
                     * @param {Writer} [writer] Writer to encode to
                     * @returns {Writer} Writer
                     */
                    static encode(message: (jspb.test.Deeply.Nested.Message|Object), writer?: Writer): Writer;

                    /**
                     * Encodes the specified Message, length delimited.
                     * @param {jspb.test.Deeply.Nested.Message|Object} message Message or plain object to encode
                     * @param {Writer} [writer] Writer to encode to
                     * @returns {Writer} Writer
                     */
                    static encodeDelimited(message: (jspb.test.Deeply.Nested.Message|Object), writer?: Writer): Writer;

                    /**
                     * Decodes a Message from the specified reader or buffer.
                     * @function
                     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {jspb.test.Deeply.Nested.Message} Message
                     */
                    static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): jspb.test.Deeply.Nested.Message;

                    /**
                     * Decodes a Message from the specified reader or buffer, length delimited.
                     * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                     * @returns {jspb.test.Deeply.Nested.Message} Message
                     */
                    static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): jspb.test.Deeply.Nested.Message;

                    /**
                     * Verifies a Message.
                     * @function
                     * @param {jspb.test.Deeply.Nested.Message|Object} message Message or plain object to verify
                     * @returns {?string} `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: (jspb.test.Deeply.Nested.Message|Object)): string;
                }
            }
        }
    }
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
         * Constructs a new FileDescriptorSet.
         * @exports google.protobuf.FileDescriptorSet
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class FileDescriptorSet {

            /**
             * Constructs a new FileDescriptorSet.
             * @exports google.protobuf.FileDescriptorSet
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * FileDescriptorSet file.
             * @type {Array.<google.protobuf.FileDescriptorProto>}
             */
            file: google.protobuf.FileDescriptorProto[];

            /**
             * Creates a new FileDescriptorSet instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet instance
             */
            static create(properties?: Object): google.protobuf.FileDescriptorSet;

            /**
             * Encodes the specified FileDescriptorSet.
             * @function
             * @param {google.protobuf.FileDescriptorSet|Object} message FileDescriptorSet or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.FileDescriptorSet|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified FileDescriptorSet, length delimited.
             * @param {google.protobuf.FileDescriptorSet|Object} message FileDescriptorSet or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.FileDescriptorSet|Object), writer?: Writer): Writer;

            /**
             * Decodes a FileDescriptorSet from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorSet;

            /**
             * Decodes a FileDescriptorSet from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.FileDescriptorSet;

            /**
             * Verifies a FileDescriptorSet.
             * @function
             * @param {google.protobuf.FileDescriptorSet|Object} message FileDescriptorSet or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.FileDescriptorSet|Object)): string;
        }

        /**
         * Constructs a new FileDescriptorProto.
         * @exports google.protobuf.FileDescriptorProto
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class FileDescriptorProto {

            /**
             * Constructs a new FileDescriptorProto.
             * @exports google.protobuf.FileDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * FileDescriptorProto name.
             * @type {string}
             */
            name: string;

            /**
             * FileDescriptorProto package.
             * @name google.protobuf.FileDescriptorProto#package
             * @type {string}
             */
            package: string;

            /**
             * FileDescriptorProto dependency.
             * @type {Array.<string>}
             */
            dependency: string[];

            /**
             * FileDescriptorProto publicDependency.
             * @type {Array.<number>}
             */
            publicDependency: number[];

            /**
             * FileDescriptorProto weakDependency.
             * @type {Array.<number>}
             */
            weakDependency: number[];

            /**
             * FileDescriptorProto messageType.
             * @type {Array.<google.protobuf.DescriptorProto>}
             */
            messageType: google.protobuf.DescriptorProto[];

            /**
             * FileDescriptorProto enumType.
             * @type {Array.<google.protobuf.EnumDescriptorProto>}
             */
            enumType: google.protobuf.EnumDescriptorProto[];

            /**
             * FileDescriptorProto service.
             * @type {Array.<google.protobuf.ServiceDescriptorProto>}
             */
            service: google.protobuf.ServiceDescriptorProto[];

            /**
             * FileDescriptorProto extension.
             * @type {Array.<google.protobuf.FieldDescriptorProto>}
             */
            extension: google.protobuf.FieldDescriptorProto[];

            /**
             * FileDescriptorProto options.
             * @type {google.protobuf.FileOptions}
             */
            options: google.protobuf.FileOptions;

            /**
             * FileDescriptorProto sourceCodeInfo.
             * @type {google.protobuf.SourceCodeInfo}
             */
            sourceCodeInfo: google.protobuf.SourceCodeInfo;

            /**
             * FileDescriptorProto syntax.
             * @type {string}
             */
            syntax: string;

            /**
             * Creates a new FileDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto instance
             */
            static create(properties?: Object): google.protobuf.FileDescriptorProto;

            /**
             * Encodes the specified FileDescriptorProto.
             * @function
             * @param {google.protobuf.FileDescriptorProto|Object} message FileDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.FileDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified FileDescriptorProto, length delimited.
             * @param {google.protobuf.FileDescriptorProto|Object} message FileDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.FileDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Decodes a FileDescriptorProto from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorProto;

            /**
             * Decodes a FileDescriptorProto from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.FileDescriptorProto;

            /**
             * Verifies a FileDescriptorProto.
             * @function
             * @param {google.protobuf.FileDescriptorProto|Object} message FileDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.FileDescriptorProto|Object)): string;
        }

        /**
         * Constructs a new DescriptorProto.
         * @exports google.protobuf.DescriptorProto
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class DescriptorProto {

            /**
             * Constructs a new DescriptorProto.
             * @exports google.protobuf.DescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * DescriptorProto name.
             * @type {string}
             */
            name: string;

            /**
             * DescriptorProto field.
             * @type {Array.<google.protobuf.FieldDescriptorProto>}
             */
            field: google.protobuf.FieldDescriptorProto[];

            /**
             * DescriptorProto extension.
             * @type {Array.<google.protobuf.FieldDescriptorProto>}
             */
            extension: google.protobuf.FieldDescriptorProto[];

            /**
             * DescriptorProto nestedType.
             * @type {Array.<google.protobuf.DescriptorProto>}
             */
            nestedType: google.protobuf.DescriptorProto[];

            /**
             * DescriptorProto enumType.
             * @type {Array.<google.protobuf.EnumDescriptorProto>}
             */
            enumType: google.protobuf.EnumDescriptorProto[];

            /**
             * DescriptorProto extensionRange.
             * @type {Array.<google.protobuf.DescriptorProto.ExtensionRange>}
             */
            extensionRange: google.protobuf.DescriptorProto.ExtensionRange[];

            /**
             * DescriptorProto oneofDecl.
             * @type {Array.<google.protobuf.OneofDescriptorProto>}
             */
            oneofDecl: google.protobuf.OneofDescriptorProto[];

            /**
             * DescriptorProto options.
             * @type {google.protobuf.MessageOptions}
             */
            options: google.protobuf.MessageOptions;

            /**
             * DescriptorProto reservedRange.
             * @type {Array.<google.protobuf.DescriptorProto.ReservedRange>}
             */
            reservedRange: google.protobuf.DescriptorProto.ReservedRange[];

            /**
             * DescriptorProto reservedName.
             * @type {Array.<string>}
             */
            reservedName: string[];

            /**
             * Creates a new DescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.DescriptorProto} DescriptorProto instance
             */
            static create(properties?: Object): google.protobuf.DescriptorProto;

            /**
             * Encodes the specified DescriptorProto.
             * @function
             * @param {google.protobuf.DescriptorProto|Object} message DescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.DescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified DescriptorProto, length delimited.
             * @param {google.protobuf.DescriptorProto|Object} message DescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.DescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Decodes a DescriptorProto from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.DescriptorProto} DescriptorProto
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto;

            /**
             * Decodes a DescriptorProto from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.DescriptorProto} DescriptorProto
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.DescriptorProto;

            /**
             * Verifies a DescriptorProto.
             * @function
             * @param {google.protobuf.DescriptorProto|Object} message DescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.DescriptorProto|Object)): string;
        }


        /**
         * Constructs a new DescriptorProto.
         * @exports google.protobuf.DescriptorProto
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        module DescriptorProto {

            /**
             * Constructs a new ExtensionRange.
             * @exports google.protobuf.DescriptorProto.ExtensionRange
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            class ExtensionRange {

                /**
                 * Constructs a new ExtensionRange.
                 * @exports google.protobuf.DescriptorProto.ExtensionRange
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                constructor(properties?: Object);

                /**
                 * ExtensionRange start.
                 * @type {number}
                 */
                start: number;

                /**
                 * ExtensionRange end.
                 * @type {number}
                 */
                end: number;

                /**
                 * Creates a new ExtensionRange instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange instance
                 */
                static create(properties?: Object): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Encodes the specified ExtensionRange.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ExtensionRange|Object} message ExtensionRange or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encode(message: (google.protobuf.DescriptorProto.ExtensionRange|Object), writer?: Writer): Writer;

                /**
                 * Encodes the specified ExtensionRange, length delimited.
                 * @param {google.protobuf.DescriptorProto.ExtensionRange|Object} message ExtensionRange or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encodeDelimited(message: (google.protobuf.DescriptorProto.ExtensionRange|Object), writer?: Writer): Writer;

                /**
                 * Decodes a ExtensionRange from the specified reader or buffer.
                 * @function
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange
                 */
                static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Decodes a ExtensionRange from the specified reader or buffer, length delimited.
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange
                 */
                static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Verifies a ExtensionRange.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ExtensionRange|Object} message ExtensionRange or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: (google.protobuf.DescriptorProto.ExtensionRange|Object)): string;
            }

            /**
             * Constructs a new ReservedRange.
             * @exports google.protobuf.DescriptorProto.ReservedRange
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            class ReservedRange {

                /**
                 * Constructs a new ReservedRange.
                 * @exports google.protobuf.DescriptorProto.ReservedRange
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                constructor(properties?: Object);

                /**
                 * ReservedRange start.
                 * @type {number}
                 */
                start: number;

                /**
                 * ReservedRange end.
                 * @type {number}
                 */
                end: number;

                /**
                 * Creates a new ReservedRange instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange instance
                 */
                static create(properties?: Object): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Encodes the specified ReservedRange.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ReservedRange|Object} message ReservedRange or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encode(message: (google.protobuf.DescriptorProto.ReservedRange|Object), writer?: Writer): Writer;

                /**
                 * Encodes the specified ReservedRange, length delimited.
                 * @param {google.protobuf.DescriptorProto.ReservedRange|Object} message ReservedRange or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encodeDelimited(message: (google.protobuf.DescriptorProto.ReservedRange|Object), writer?: Writer): Writer;

                /**
                 * Decodes a ReservedRange from the specified reader or buffer.
                 * @function
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange
                 */
                static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Decodes a ReservedRange from the specified reader or buffer, length delimited.
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange
                 */
                static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Verifies a ReservedRange.
                 * @function
                 * @param {google.protobuf.DescriptorProto.ReservedRange|Object} message ReservedRange or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: (google.protobuf.DescriptorProto.ReservedRange|Object)): string;
            }
        }

        /**
         * Constructs a new FieldDescriptorProto.
         * @exports google.protobuf.FieldDescriptorProto
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class FieldDescriptorProto {

            /**
             * Constructs a new FieldDescriptorProto.
             * @exports google.protobuf.FieldDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * FieldDescriptorProto name.
             * @type {string}
             */
            name: string;

            /**
             * FieldDescriptorProto number.
             * @type {number}
             */
            number: number;

            /**
             * FieldDescriptorProto label.
             * @type {number}
             */
            label: number;

            /**
             * FieldDescriptorProto type.
             * @type {number}
             */
            type: number;

            /**
             * FieldDescriptorProto typeName.
             * @type {string}
             */
            typeName: string;

            /**
             * FieldDescriptorProto extendee.
             * @type {string}
             */
            extendee: string;

            /**
             * FieldDescriptorProto defaultValue.
             * @type {string}
             */
            defaultValue: string;

            /**
             * FieldDescriptorProto oneofIndex.
             * @type {number}
             */
            oneofIndex: number;

            /**
             * FieldDescriptorProto jsonName.
             * @type {string}
             */
            jsonName: string;

            /**
             * FieldDescriptorProto options.
             * @type {google.protobuf.FieldOptions}
             */
            options: google.protobuf.FieldOptions;

            /**
             * Creates a new FieldDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto instance
             */
            static create(properties?: Object): google.protobuf.FieldDescriptorProto;

            /**
             * Encodes the specified FieldDescriptorProto.
             * @function
             * @param {google.protobuf.FieldDescriptorProto|Object} message FieldDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.FieldDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified FieldDescriptorProto, length delimited.
             * @param {google.protobuf.FieldDescriptorProto|Object} message FieldDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.FieldDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Decodes a FieldDescriptorProto from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.FieldDescriptorProto;

            /**
             * Decodes a FieldDescriptorProto from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.FieldDescriptorProto;

            /**
             * Verifies a FieldDescriptorProto.
             * @function
             * @param {google.protobuf.FieldDescriptorProto|Object} message FieldDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.FieldDescriptorProto|Object)): string;
        }

        /**
         * Constructs a new OneofDescriptorProto.
         * @exports google.protobuf.OneofDescriptorProto
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class OneofDescriptorProto {

            /**
             * Constructs a new OneofDescriptorProto.
             * @exports google.protobuf.OneofDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * OneofDescriptorProto name.
             * @type {string}
             */
            name: string;

            /**
             * OneofDescriptorProto options.
             * @type {google.protobuf.OneofOptions}
             */
            options: google.protobuf.OneofOptions;

            /**
             * Creates a new OneofDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto instance
             */
            static create(properties?: Object): google.protobuf.OneofDescriptorProto;

            /**
             * Encodes the specified OneofDescriptorProto.
             * @function
             * @param {google.protobuf.OneofDescriptorProto|Object} message OneofDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.OneofDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified OneofDescriptorProto, length delimited.
             * @param {google.protobuf.OneofDescriptorProto|Object} message OneofDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.OneofDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Decodes a OneofDescriptorProto from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.OneofDescriptorProto;

            /**
             * Decodes a OneofDescriptorProto from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.OneofDescriptorProto;

            /**
             * Verifies a OneofDescriptorProto.
             * @function
             * @param {google.protobuf.OneofDescriptorProto|Object} message OneofDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.OneofDescriptorProto|Object)): string;
        }

        /**
         * Constructs a new EnumDescriptorProto.
         * @exports google.protobuf.EnumDescriptorProto
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class EnumDescriptorProto {

            /**
             * Constructs a new EnumDescriptorProto.
             * @exports google.protobuf.EnumDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * EnumDescriptorProto name.
             * @type {string}
             */
            name: string;

            /**
             * EnumDescriptorProto value.
             * @type {Array.<google.protobuf.EnumValueDescriptorProto>}
             */
            value: google.protobuf.EnumValueDescriptorProto[];

            /**
             * EnumDescriptorProto options.
             * @type {google.protobuf.EnumOptions}
             */
            options: google.protobuf.EnumOptions;

            /**
             * Creates a new EnumDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto instance
             */
            static create(properties?: Object): google.protobuf.EnumDescriptorProto;

            /**
             * Encodes the specified EnumDescriptorProto.
             * @function
             * @param {google.protobuf.EnumDescriptorProto|Object} message EnumDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.EnumDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified EnumDescriptorProto, length delimited.
             * @param {google.protobuf.EnumDescriptorProto|Object} message EnumDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.EnumDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Decodes a EnumDescriptorProto from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto;

            /**
             * Decodes a EnumDescriptorProto from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.EnumDescriptorProto;

            /**
             * Verifies a EnumDescriptorProto.
             * @function
             * @param {google.protobuf.EnumDescriptorProto|Object} message EnumDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.EnumDescriptorProto|Object)): string;
        }

        /**
         * Constructs a new EnumValueDescriptorProto.
         * @exports google.protobuf.EnumValueDescriptorProto
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class EnumValueDescriptorProto {

            /**
             * Constructs a new EnumValueDescriptorProto.
             * @exports google.protobuf.EnumValueDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * EnumValueDescriptorProto name.
             * @type {string}
             */
            name: string;

            /**
             * EnumValueDescriptorProto number.
             * @type {number}
             */
            number: number;

            /**
             * EnumValueDescriptorProto options.
             * @type {google.protobuf.EnumValueOptions}
             */
            options: google.protobuf.EnumValueOptions;

            /**
             * Creates a new EnumValueDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto instance
             */
            static create(properties?: Object): google.protobuf.EnumValueDescriptorProto;

            /**
             * Encodes the specified EnumValueDescriptorProto.
             * @function
             * @param {google.protobuf.EnumValueDescriptorProto|Object} message EnumValueDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.EnumValueDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified EnumValueDescriptorProto, length delimited.
             * @param {google.protobuf.EnumValueDescriptorProto|Object} message EnumValueDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.EnumValueDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Decodes a EnumValueDescriptorProto from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.EnumValueDescriptorProto;

            /**
             * Decodes a EnumValueDescriptorProto from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.EnumValueDescriptorProto;

            /**
             * Verifies a EnumValueDescriptorProto.
             * @function
             * @param {google.protobuf.EnumValueDescriptorProto|Object} message EnumValueDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.EnumValueDescriptorProto|Object)): string;
        }

        /**
         * Constructs a new ServiceDescriptorProto.
         * @exports google.protobuf.ServiceDescriptorProto
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class ServiceDescriptorProto {

            /**
             * Constructs a new ServiceDescriptorProto.
             * @exports google.protobuf.ServiceDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * ServiceDescriptorProto name.
             * @type {string}
             */
            name: string;

            /**
             * ServiceDescriptorProto method.
             * @type {Array.<google.protobuf.MethodDescriptorProto>}
             */
            method: google.protobuf.MethodDescriptorProto[];

            /**
             * ServiceDescriptorProto options.
             * @type {google.protobuf.ServiceOptions}
             */
            options: google.protobuf.ServiceOptions;

            /**
             * Creates a new ServiceDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto instance
             */
            static create(properties?: Object): google.protobuf.ServiceDescriptorProto;

            /**
             * Encodes the specified ServiceDescriptorProto.
             * @function
             * @param {google.protobuf.ServiceDescriptorProto|Object} message ServiceDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.ServiceDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified ServiceDescriptorProto, length delimited.
             * @param {google.protobuf.ServiceDescriptorProto|Object} message ServiceDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.ServiceDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Decodes a ServiceDescriptorProto from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.ServiceDescriptorProto;

            /**
             * Decodes a ServiceDescriptorProto from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.ServiceDescriptorProto;

            /**
             * Verifies a ServiceDescriptorProto.
             * @function
             * @param {google.protobuf.ServiceDescriptorProto|Object} message ServiceDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.ServiceDescriptorProto|Object)): string;
        }

        /**
         * Constructs a new MethodDescriptorProto.
         * @exports google.protobuf.MethodDescriptorProto
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class MethodDescriptorProto {

            /**
             * Constructs a new MethodDescriptorProto.
             * @exports google.protobuf.MethodDescriptorProto
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * MethodDescriptorProto name.
             * @type {string}
             */
            name: string;

            /**
             * MethodDescriptorProto inputType.
             * @type {string}
             */
            inputType: string;

            /**
             * MethodDescriptorProto outputType.
             * @type {string}
             */
            outputType: string;

            /**
             * MethodDescriptorProto options.
             * @type {google.protobuf.MethodOptions}
             */
            options: google.protobuf.MethodOptions;

            /**
             * MethodDescriptorProto clientStreaming.
             * @type {boolean}
             */
            clientStreaming: boolean;

            /**
             * MethodDescriptorProto serverStreaming.
             * @type {boolean}
             */
            serverStreaming: boolean;

            /**
             * Creates a new MethodDescriptorProto instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto instance
             */
            static create(properties?: Object): google.protobuf.MethodDescriptorProto;

            /**
             * Encodes the specified MethodDescriptorProto.
             * @function
             * @param {google.protobuf.MethodDescriptorProto|Object} message MethodDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.MethodDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified MethodDescriptorProto, length delimited.
             * @param {google.protobuf.MethodDescriptorProto|Object} message MethodDescriptorProto or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.MethodDescriptorProto|Object), writer?: Writer): Writer;

            /**
             * Decodes a MethodDescriptorProto from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.MethodDescriptorProto;

            /**
             * Decodes a MethodDescriptorProto from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.MethodDescriptorProto;

            /**
             * Verifies a MethodDescriptorProto.
             * @function
             * @param {google.protobuf.MethodDescriptorProto|Object} message MethodDescriptorProto or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.MethodDescriptorProto|Object)): string;
        }

        /**
         * Constructs a new FileOptions.
         * @exports google.protobuf.FileOptions
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class FileOptions {

            /**
             * Constructs a new FileOptions.
             * @exports google.protobuf.FileOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * FileOptions javaPackage.
             * @type {string}
             */
            javaPackage: string;

            /**
             * FileOptions javaOuterClassname.
             * @type {string}
             */
            javaOuterClassname: string;

            /**
             * FileOptions javaMultipleFiles.
             * @type {boolean}
             */
            javaMultipleFiles: boolean;

            /**
             * FileOptions javaGenerateEqualsAndHash.
             * @type {boolean}
             */
            javaGenerateEqualsAndHash: boolean;

            /**
             * FileOptions javaStringCheckUtf8.
             * @type {boolean}
             */
            javaStringCheckUtf8: boolean;

            /**
             * FileOptions optimizeFor.
             * @type {number}
             */
            optimizeFor: number;

            /**
             * FileOptions goPackage.
             * @type {string}
             */
            goPackage: string;

            /**
             * FileOptions ccGenericServices.
             * @type {boolean}
             */
            ccGenericServices: boolean;

            /**
             * FileOptions javaGenericServices.
             * @type {boolean}
             */
            javaGenericServices: boolean;

            /**
             * FileOptions pyGenericServices.
             * @type {boolean}
             */
            pyGenericServices: boolean;

            /**
             * FileOptions deprecated.
             * @type {boolean}
             */
            deprecated: boolean;

            /**
             * FileOptions ccEnableArenas.
             * @type {boolean}
             */
            ccEnableArenas: boolean;

            /**
             * FileOptions objcClassPrefix.
             * @type {string}
             */
            objcClassPrefix: string;

            /**
             * FileOptions csharpNamespace.
             * @type {string}
             */
            csharpNamespace: string;

            /**
             * FileOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            uninterpretedOption: google.protobuf.UninterpretedOption[];

            /**
             * Creates a new FileOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FileOptions} FileOptions instance
             */
            static create(properties?: Object): google.protobuf.FileOptions;

            /**
             * Encodes the specified FileOptions.
             * @function
             * @param {google.protobuf.FileOptions|Object} message FileOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.FileOptions|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified FileOptions, length delimited.
             * @param {google.protobuf.FileOptions|Object} message FileOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.FileOptions|Object), writer?: Writer): Writer;

            /**
             * Decodes a FileOptions from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileOptions} FileOptions
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.FileOptions;

            /**
             * Decodes a FileOptions from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FileOptions} FileOptions
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.FileOptions;

            /**
             * Verifies a FileOptions.
             * @function
             * @param {google.protobuf.FileOptions|Object} message FileOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.FileOptions|Object)): string;
        }

        /**
         * Constructs a new MessageOptions.
         * @exports google.protobuf.MessageOptions
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class MessageOptions {

            /**
             * Constructs a new MessageOptions.
             * @exports google.protobuf.MessageOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * MessageOptions messageSetWireFormat.
             * @type {boolean}
             */
            messageSetWireFormat: boolean;

            /**
             * MessageOptions noStandardDescriptorAccessor.
             * @type {boolean}
             */
            noStandardDescriptorAccessor: boolean;

            /**
             * MessageOptions deprecated.
             * @type {boolean}
             */
            deprecated: boolean;

            /**
             * MessageOptions mapEntry.
             * @type {boolean}
             */
            mapEntry: boolean;

            /**
             * MessageOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            uninterpretedOption: google.protobuf.UninterpretedOption[];

            /**
             * Creates a new MessageOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.MessageOptions} MessageOptions instance
             */
            static create(properties?: Object): google.protobuf.MessageOptions;

            /**
             * Encodes the specified MessageOptions.
             * @function
             * @param {google.protobuf.MessageOptions|Object} message MessageOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.MessageOptions|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified MessageOptions, length delimited.
             * @param {google.protobuf.MessageOptions|Object} message MessageOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.MessageOptions|Object), writer?: Writer): Writer;

            /**
             * Decodes a MessageOptions from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MessageOptions} MessageOptions
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.MessageOptions;

            /**
             * Decodes a MessageOptions from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.MessageOptions} MessageOptions
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.MessageOptions;

            /**
             * Verifies a MessageOptions.
             * @function
             * @param {google.protobuf.MessageOptions|Object} message MessageOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.MessageOptions|Object)): string;
        }

        /**
         * Constructs a new FieldOptions.
         * @exports google.protobuf.FieldOptions
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class FieldOptions {

            /**
             * Constructs a new FieldOptions.
             * @exports google.protobuf.FieldOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * FieldOptions ctype.
             * @type {number}
             */
            ctype: number;

            /**
             * FieldOptions packed.
             * @type {boolean}
             */
            packed: boolean;

            /**
             * FieldOptions jstype.
             * @type {number}
             */
            jstype: number;

            /**
             * FieldOptions lazy.
             * @type {boolean}
             */
            lazy: boolean;

            /**
             * FieldOptions deprecated.
             * @type {boolean}
             */
            deprecated: boolean;

            /**
             * FieldOptions weak.
             * @type {boolean}
             */
            weak: boolean;

            /**
             * FieldOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            uninterpretedOption: google.protobuf.UninterpretedOption[];

            /**
             * Creates a new FieldOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.FieldOptions} FieldOptions instance
             */
            static create(properties?: Object): google.protobuf.FieldOptions;

            /**
             * Encodes the specified FieldOptions.
             * @function
             * @param {google.protobuf.FieldOptions|Object} message FieldOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.FieldOptions|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified FieldOptions, length delimited.
             * @param {google.protobuf.FieldOptions|Object} message FieldOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.FieldOptions|Object), writer?: Writer): Writer;

            /**
             * Decodes a FieldOptions from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FieldOptions} FieldOptions
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.FieldOptions;

            /**
             * Decodes a FieldOptions from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.FieldOptions} FieldOptions
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.FieldOptions;

            /**
             * Verifies a FieldOptions.
             * @function
             * @param {google.protobuf.FieldOptions|Object} message FieldOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.FieldOptions|Object)): string;
        }

        /**
         * Constructs a new OneofOptions.
         * @exports google.protobuf.OneofOptions
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class OneofOptions {

            /**
             * Constructs a new OneofOptions.
             * @exports google.protobuf.OneofOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * OneofOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            uninterpretedOption: google.protobuf.UninterpretedOption[];

            /**
             * Creates a new OneofOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.OneofOptions} OneofOptions instance
             */
            static create(properties?: Object): google.protobuf.OneofOptions;

            /**
             * Encodes the specified OneofOptions.
             * @function
             * @param {google.protobuf.OneofOptions|Object} message OneofOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.OneofOptions|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified OneofOptions, length delimited.
             * @param {google.protobuf.OneofOptions|Object} message OneofOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.OneofOptions|Object), writer?: Writer): Writer;

            /**
             * Decodes a OneofOptions from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.OneofOptions} OneofOptions
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.OneofOptions;

            /**
             * Decodes a OneofOptions from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.OneofOptions} OneofOptions
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.OneofOptions;

            /**
             * Verifies a OneofOptions.
             * @function
             * @param {google.protobuf.OneofOptions|Object} message OneofOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.OneofOptions|Object)): string;
        }

        /**
         * Constructs a new EnumOptions.
         * @exports google.protobuf.EnumOptions
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class EnumOptions {

            /**
             * Constructs a new EnumOptions.
             * @exports google.protobuf.EnumOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * EnumOptions allowAlias.
             * @type {boolean}
             */
            allowAlias: boolean;

            /**
             * EnumOptions deprecated.
             * @type {boolean}
             */
            deprecated: boolean;

            /**
             * EnumOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            uninterpretedOption: google.protobuf.UninterpretedOption[];

            /**
             * Creates a new EnumOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumOptions} EnumOptions instance
             */
            static create(properties?: Object): google.protobuf.EnumOptions;

            /**
             * Encodes the specified EnumOptions.
             * @function
             * @param {google.protobuf.EnumOptions|Object} message EnumOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.EnumOptions|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified EnumOptions, length delimited.
             * @param {google.protobuf.EnumOptions|Object} message EnumOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.EnumOptions|Object), writer?: Writer): Writer;

            /**
             * Decodes a EnumOptions from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumOptions} EnumOptions
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.EnumOptions;

            /**
             * Decodes a EnumOptions from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumOptions} EnumOptions
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.EnumOptions;

            /**
             * Verifies a EnumOptions.
             * @function
             * @param {google.protobuf.EnumOptions|Object} message EnumOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.EnumOptions|Object)): string;
        }

        /**
         * Constructs a new EnumValueOptions.
         * @exports google.protobuf.EnumValueOptions
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class EnumValueOptions {

            /**
             * Constructs a new EnumValueOptions.
             * @exports google.protobuf.EnumValueOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * EnumValueOptions deprecated.
             * @type {boolean}
             */
            deprecated: boolean;

            /**
             * EnumValueOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            uninterpretedOption: google.protobuf.UninterpretedOption[];

            /**
             * Creates a new EnumValueOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions instance
             */
            static create(properties?: Object): google.protobuf.EnumValueOptions;

            /**
             * Encodes the specified EnumValueOptions.
             * @function
             * @param {google.protobuf.EnumValueOptions|Object} message EnumValueOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.EnumValueOptions|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified EnumValueOptions, length delimited.
             * @param {google.protobuf.EnumValueOptions|Object} message EnumValueOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.EnumValueOptions|Object), writer?: Writer): Writer;

            /**
             * Decodes a EnumValueOptions from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.EnumValueOptions;

            /**
             * Decodes a EnumValueOptions from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.EnumValueOptions;

            /**
             * Verifies a EnumValueOptions.
             * @function
             * @param {google.protobuf.EnumValueOptions|Object} message EnumValueOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.EnumValueOptions|Object)): string;
        }

        /**
         * Constructs a new ServiceOptions.
         * @exports google.protobuf.ServiceOptions
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class ServiceOptions {

            /**
             * Constructs a new ServiceOptions.
             * @exports google.protobuf.ServiceOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * ServiceOptions deprecated.
             * @type {boolean}
             */
            deprecated: boolean;

            /**
             * ServiceOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            uninterpretedOption: google.protobuf.UninterpretedOption[];

            /**
             * Creates a new ServiceOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.ServiceOptions} ServiceOptions instance
             */
            static create(properties?: Object): google.protobuf.ServiceOptions;

            /**
             * Encodes the specified ServiceOptions.
             * @function
             * @param {google.protobuf.ServiceOptions|Object} message ServiceOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.ServiceOptions|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified ServiceOptions, length delimited.
             * @param {google.protobuf.ServiceOptions|Object} message ServiceOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.ServiceOptions|Object), writer?: Writer): Writer;

            /**
             * Decodes a ServiceOptions from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.ServiceOptions} ServiceOptions
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.ServiceOptions;

            /**
             * Decodes a ServiceOptions from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.ServiceOptions} ServiceOptions
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.ServiceOptions;

            /**
             * Verifies a ServiceOptions.
             * @function
             * @param {google.protobuf.ServiceOptions|Object} message ServiceOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.ServiceOptions|Object)): string;
        }

        /**
         * Constructs a new MethodOptions.
         * @exports google.protobuf.MethodOptions
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class MethodOptions {

            /**
             * Constructs a new MethodOptions.
             * @exports google.protobuf.MethodOptions
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * MethodOptions deprecated.
             * @type {boolean}
             */
            deprecated: boolean;

            /**
             * MethodOptions idempotencyLevel.
             * @type {number}
             */
            idempotencyLevel: number;

            /**
             * MethodOptions uninterpretedOption.
             * @type {Array.<google.protobuf.UninterpretedOption>}
             */
            uninterpretedOption: google.protobuf.UninterpretedOption[];

            /**
             * Creates a new MethodOptions instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.MethodOptions} MethodOptions instance
             */
            static create(properties?: Object): google.protobuf.MethodOptions;

            /**
             * Encodes the specified MethodOptions.
             * @function
             * @param {google.protobuf.MethodOptions|Object} message MethodOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.MethodOptions|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified MethodOptions, length delimited.
             * @param {google.protobuf.MethodOptions|Object} message MethodOptions or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.MethodOptions|Object), writer?: Writer): Writer;

            /**
             * Decodes a MethodOptions from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MethodOptions} MethodOptions
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.MethodOptions;

            /**
             * Decodes a MethodOptions from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.MethodOptions} MethodOptions
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.MethodOptions;

            /**
             * Verifies a MethodOptions.
             * @function
             * @param {google.protobuf.MethodOptions|Object} message MethodOptions or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.MethodOptions|Object)): string;
        }

        /**
         * Constructs a new UninterpretedOption.
         * @exports google.protobuf.UninterpretedOption
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class UninterpretedOption {

            /**
             * Constructs a new UninterpretedOption.
             * @exports google.protobuf.UninterpretedOption
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * UninterpretedOption name.
             * @type {Array.<google.protobuf.UninterpretedOption.NamePart>}
             */
            name: google.protobuf.UninterpretedOption.NamePart[];

            /**
             * UninterpretedOption identifierValue.
             * @type {string}
             */
            identifierValue: string;

            /**
             * UninterpretedOption positiveIntValue.
             * @type {number|Long}
             */
            positiveIntValue: (number|Long);

            /**
             * UninterpretedOption negativeIntValue.
             * @type {number|Long}
             */
            negativeIntValue: (number|Long);

            /**
             * UninterpretedOption doubleValue.
             * @type {number}
             */
            doubleValue: number;

            /**
             * UninterpretedOption stringValue.
             * @type {Uint8Array}
             */
            stringValue: Uint8Array;

            /**
             * UninterpretedOption aggregateValue.
             * @type {string}
             */
            aggregateValue: string;

            /**
             * Creates a new UninterpretedOption instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption instance
             */
            static create(properties?: Object): google.protobuf.UninterpretedOption;

            /**
             * Encodes the specified UninterpretedOption.
             * @function
             * @param {google.protobuf.UninterpretedOption|Object} message UninterpretedOption or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.UninterpretedOption|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified UninterpretedOption, length delimited.
             * @param {google.protobuf.UninterpretedOption|Object} message UninterpretedOption or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.UninterpretedOption|Object), writer?: Writer): Writer;

            /**
             * Decodes a UninterpretedOption from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption;

            /**
             * Decodes a UninterpretedOption from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.UninterpretedOption;

            /**
             * Verifies a UninterpretedOption.
             * @function
             * @param {google.protobuf.UninterpretedOption|Object} message UninterpretedOption or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.UninterpretedOption|Object)): string;
        }


        /**
         * Constructs a new UninterpretedOption.
         * @exports google.protobuf.UninterpretedOption
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        module UninterpretedOption {

            /**
             * Constructs a new NamePart.
             * @exports google.protobuf.UninterpretedOption.NamePart
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            class NamePart {

                /**
                 * Constructs a new NamePart.
                 * @exports google.protobuf.UninterpretedOption.NamePart
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                constructor(properties?: Object);

                /**
                 * NamePart namePart.
                 * @type {string}
                 */
                namePart: string;

                /**
                 * NamePart isExtension.
                 * @type {boolean}
                 */
                isExtension: boolean;

                /**
                 * Creates a new NamePart instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart instance
                 */
                static create(properties?: Object): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Encodes the specified NamePart.
                 * @function
                 * @param {google.protobuf.UninterpretedOption.NamePart|Object} message NamePart or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encode(message: (google.protobuf.UninterpretedOption.NamePart|Object), writer?: Writer): Writer;

                /**
                 * Encodes the specified NamePart, length delimited.
                 * @param {google.protobuf.UninterpretedOption.NamePart|Object} message NamePart or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encodeDelimited(message: (google.protobuf.UninterpretedOption.NamePart|Object), writer?: Writer): Writer;

                /**
                 * Decodes a NamePart from the specified reader or buffer.
                 * @function
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart
                 */
                static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Decodes a NamePart from the specified reader or buffer, length delimited.
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart
                 */
                static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Verifies a NamePart.
                 * @function
                 * @param {google.protobuf.UninterpretedOption.NamePart|Object} message NamePart or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: (google.protobuf.UninterpretedOption.NamePart|Object)): string;
            }
        }

        /**
         * Constructs a new SourceCodeInfo.
         * @exports google.protobuf.SourceCodeInfo
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class SourceCodeInfo {

            /**
             * Constructs a new SourceCodeInfo.
             * @exports google.protobuf.SourceCodeInfo
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * SourceCodeInfo location.
             * @type {Array.<google.protobuf.SourceCodeInfo.Location>}
             */
            location: google.protobuf.SourceCodeInfo.Location[];

            /**
             * Creates a new SourceCodeInfo instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo instance
             */
            static create(properties?: Object): google.protobuf.SourceCodeInfo;

            /**
             * Encodes the specified SourceCodeInfo.
             * @function
             * @param {google.protobuf.SourceCodeInfo|Object} message SourceCodeInfo or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.SourceCodeInfo|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified SourceCodeInfo, length delimited.
             * @param {google.protobuf.SourceCodeInfo|Object} message SourceCodeInfo or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.SourceCodeInfo|Object), writer?: Writer): Writer;

            /**
             * Decodes a SourceCodeInfo from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo;

            /**
             * Decodes a SourceCodeInfo from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.SourceCodeInfo;

            /**
             * Verifies a SourceCodeInfo.
             * @function
             * @param {google.protobuf.SourceCodeInfo|Object} message SourceCodeInfo or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.SourceCodeInfo|Object)): string;
        }


        /**
         * Constructs a new SourceCodeInfo.
         * @exports google.protobuf.SourceCodeInfo
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        module SourceCodeInfo {

            /**
             * Constructs a new Location.
             * @exports google.protobuf.SourceCodeInfo.Location
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            class Location {

                /**
                 * Constructs a new Location.
                 * @exports google.protobuf.SourceCodeInfo.Location
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                constructor(properties?: Object);

                /**
                 * Location path.
                 * @type {Array.<number>}
                 */
                path: number[];

                /**
                 * Location span.
                 * @type {Array.<number>}
                 */
                span: number[];

                /**
                 * Location leadingComments.
                 * @type {string}
                 */
                leadingComments: string;

                /**
                 * Location trailingComments.
                 * @type {string}
                 */
                trailingComments: string;

                /**
                 * Location leadingDetachedComments.
                 * @type {Array.<string>}
                 */
                leadingDetachedComments: string[];

                /**
                 * Creates a new Location instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location instance
                 */
                static create(properties?: Object): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Encodes the specified Location.
                 * @function
                 * @param {google.protobuf.SourceCodeInfo.Location|Object} message Location or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encode(message: (google.protobuf.SourceCodeInfo.Location|Object), writer?: Writer): Writer;

                /**
                 * Encodes the specified Location, length delimited.
                 * @param {google.protobuf.SourceCodeInfo.Location|Object} message Location or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encodeDelimited(message: (google.protobuf.SourceCodeInfo.Location|Object), writer?: Writer): Writer;

                /**
                 * Decodes a Location from the specified reader or buffer.
                 * @function
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location
                 */
                static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Decodes a Location from the specified reader or buffer, length delimited.
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location
                 */
                static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Verifies a Location.
                 * @function
                 * @param {google.protobuf.SourceCodeInfo.Location|Object} message Location or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: (google.protobuf.SourceCodeInfo.Location|Object)): string;
            }
        }

        /**
         * Constructs a new GeneratedCodeInfo.
         * @exports google.protobuf.GeneratedCodeInfo
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        class GeneratedCodeInfo {

            /**
             * Constructs a new GeneratedCodeInfo.
             * @exports google.protobuf.GeneratedCodeInfo
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            constructor(properties?: Object);

            /**
             * GeneratedCodeInfo annotation.
             * @type {Array.<google.protobuf.GeneratedCodeInfo.Annotation>}
             */
            annotation: google.protobuf.GeneratedCodeInfo.Annotation[];

            /**
             * Creates a new GeneratedCodeInfo instance using the specified properties.
             * @param {Object} [properties] Properties to set
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo instance
             */
            static create(properties?: Object): google.protobuf.GeneratedCodeInfo;

            /**
             * Encodes the specified GeneratedCodeInfo.
             * @function
             * @param {google.protobuf.GeneratedCodeInfo|Object} message GeneratedCodeInfo or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encode(message: (google.protobuf.GeneratedCodeInfo|Object), writer?: Writer): Writer;

            /**
             * Encodes the specified GeneratedCodeInfo, length delimited.
             * @param {google.protobuf.GeneratedCodeInfo|Object} message GeneratedCodeInfo or plain object to encode
             * @param {Writer} [writer] Writer to encode to
             * @returns {Writer} Writer
             */
            static encodeDelimited(message: (google.protobuf.GeneratedCodeInfo|Object), writer?: Writer): Writer;

            /**
             * Decodes a GeneratedCodeInfo from the specified reader or buffer.
             * @function
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo
             */
            static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo;

            /**
             * Decodes a GeneratedCodeInfo from the specified reader or buffer, length delimited.
             * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo
             */
            static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo;

            /**
             * Verifies a GeneratedCodeInfo.
             * @function
             * @param {google.protobuf.GeneratedCodeInfo|Object} message GeneratedCodeInfo or plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            static verify(message: (google.protobuf.GeneratedCodeInfo|Object)): string;
        }


        /**
         * Constructs a new GeneratedCodeInfo.
         * @exports google.protobuf.GeneratedCodeInfo
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        module GeneratedCodeInfo {

            /**
             * Constructs a new Annotation.
             * @exports google.protobuf.GeneratedCodeInfo.Annotation
             * @constructor
             * @param {Object} [properties] Properties to set
             */
            class Annotation {

                /**
                 * Constructs a new Annotation.
                 * @exports google.protobuf.GeneratedCodeInfo.Annotation
                 * @constructor
                 * @param {Object} [properties] Properties to set
                 */
                constructor(properties?: Object);

                /**
                 * Annotation path.
                 * @type {Array.<number>}
                 */
                path: number[];

                /**
                 * Annotation sourceFile.
                 * @type {string}
                 */
                sourceFile: string;

                /**
                 * Annotation begin.
                 * @type {number}
                 */
                begin: number;

                /**
                 * Annotation end.
                 * @type {number}
                 */
                end: number;

                /**
                 * Creates a new Annotation instance using the specified properties.
                 * @param {Object} [properties] Properties to set
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation instance
                 */
                static create(properties?: Object): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Encodes the specified Annotation.
                 * @function
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation|Object} message Annotation or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encode(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object), writer?: Writer): Writer;

                /**
                 * Encodes the specified Annotation, length delimited.
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation|Object} message Annotation or plain object to encode
                 * @param {Writer} [writer] Writer to encode to
                 * @returns {Writer} Writer
                 */
                static encodeDelimited(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object), writer?: Writer): Writer;

                /**
                 * Decodes a Annotation from the specified reader or buffer.
                 * @function
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation
                 */
                static decode(readerOrBuffer: (Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Decodes a Annotation from the specified reader or buffer, length delimited.
                 * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation
                 */
                static decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Verifies a Annotation.
                 * @function
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation|Object} message Annotation or plain object to verify
                 * @returns {?string} `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: (google.protobuf.GeneratedCodeInfo.Annotation|Object)): string;
            }
        }
    }
}
