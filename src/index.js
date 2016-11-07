var protobuf = exports;

var util = require("./util");

/**
 * Loads one or multiple .proto files into a common root namespace.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @param {function(?Error, Root=)} [callback] Callback function
 * @param {Object} [ctx] Optional callback context
 * @returns {Promise<Root>|Object} A promise if callback has been omitted, otherwise the protobuf namespace
 * @throws {TypeError} If arguments are invalid
 */
function load(filename, root, callback, ctx) {
    if (typeof root === 'function') {
        ctx = callback;
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback, ctx) || protobuf;
}

protobuf.load = load;

/**
 * Makes a custom class inherit from the message prototype of the specified message type.
 * @param {Function} clazz Inheriting class
 * @param {Type} type Inherited message type
 * @param {Object.<string,*>} [options] Extension options
 * @param {boolean} [options.noStatics=false] Skips adding the default static methods on top of the constructor
 * @param {boolean} [options.noRegister=false] Skips registering the constructor with the reflected type
 * @returns {Prototype} Created prototype
 */
function inherits(clazz, type, options) {
    if (typeof clazz !== 'function')
        throw util._TypeError("clazz", "a function");
    if (!(type instanceof protobuf.Type))
        throw util._TypeError("type", "a Type");
    if (!options)
        options = {};

    /**
     * This is not an actual type but stands as a reference for any constructor of a custom message class
     * that you pass to the library.
     * @name Class
     * @extends Prototype
     * @constructor
     * @param {Object.<string,*>} [properties] Properties to set on the message
     * @see {@link inherits}
     * @see {@link Prototype}
     */
    var defineProperties = {
        
        /**
         * Reference to the reflected type.
         * @name Class.$type
         * @type {Type}
         * @readonly
         */
        $type: {
            value: type
        },

        /**
         * Field names present on the message. Useful as an alternative to `Object.keys`.
         * @name Class.$keys
         * @type {string[]}
         * @readonly
         */
        $keys: {
            value: Object.keys(type.fields)
        }
    };

    if (!options.noStatics)
        protobuf.util.merge(defineProperties, {

            /**
             * Encodes a message of this type to a buffer.
             * @name Class.encode
             * @function
             * @param {Prototype|Object} message Message to encode
             * @returns {number[]} Encoded message
             */
            encode: {
                value: function encode(message) {
                    return this.$type.encode(message).finish();
                }
            },

            /**
             * Encodes a message of this type preceeded by its length as a varint to a buffer.
             * @name Class.encodeDelimited
             * @function
             * @param {Prototype|Object} message Message to encodee
             * @returns {number[]} Encoded message
             */
            encodeDelimited: {
                value: function encodeDelimited(message) {
                    return this.$type.encodeDelimited(message).finish();
                }
            },

            /**
             * Decodes a message of this type from a buffer.
             * @name Class.decode
             * @function
             * @param {number[]} buffer Buffer to decode
             * @returns {Prototype} Decoded message
             */
            decode: {
                value: function decode(buffer) {
                    return this.$type.decode(buffer, clazz);
                }
            },

            /**
             * Decodes a message of this type preceeded by its length as a varint from a buffer.
             * @name Class.decodeDelimited
             * @function
             * @param {number[]} buffer Buffer to decode
             * @returns {Prototype} Decoded message
             */
            decodeDelimited: {
                value: function decodeDelimited(buffer) {
                    return this.$type.decodeDelimited(buffer, clazz);
                }
            }

        }, true);

    Object.defineProperties(clazz, defineProperties);

    var prototype = initialize(new protobuf.Prototype(), type);
    clazz.prototype = prototype;
    prototype.constructor = clazz;

    if (!options.noRegister)
        type.register(clazz);

    return prototype;
}

protobuf.inherits = inherits;

/**
 * Initializes the specified prototype with getters and setters corresponding to the reflected
 * type's fields and oneofs. Stores field values within {@link Prototype#$values}.
 * @param {Prototype} prototype Prototype to initialize
 * @param {Type} type Reflected message type
 * @returns {Prototype} The specified prototype
 */
function initialize(prototype, type) {

    var defaultValues = {};
    
    var defineProperties = {

        /**
         * Reference to the reflected type.
         * @name Prototype#$type
         * @type {Type}
         * @readonly
         */
        $type: {
            value: type
        },

        /**
         * Field names present on the message. Useful as an alternative to `Object.keys`.
         * @name Prototype#$keys
         * @type {string[]}
         * @readonly
         */
        $keys: {
            value: Object.keys(type.fields)
        },

        /**
         * Field values present on the message.
         * @name Prototype#$values
         * @type {Object.<string,*>}
         * @readonly
         */
        $values: {
            value: defaultValues
        },

        /**
         * Virtual OneOf field values. Stores the present field's name for each OneOf, or, if no field is present, `undefined`.
         * @name Prototype#$oneofs
         * @type {Object.<string,string|undefined>}
         * @readonly
         */
        $oneofs: {
            value: {}
        }
    };

    // Initialize default values and define each field with a getter and a setter
    type.fieldsArray.forEach(function(field) {
        field.resolve();

        defaultValues[field.name] = field.defaultValue;
        
        defineProperties[field.name] = {
            get: function() {
                return this.$values[field.name];
            },
            set: function(value) {
                if (field.partOf) { // Handle oneof side effects
                    var fieldNameSet = this.$oneofs[field.partOf.name];
                    if (value === undefined || value === null) {
                        if (fieldNameSet === field.name)
                            this.$oneofs[field.partOf.name] = undefined;
                        this.$values[field.name] = field.defaultValue;
                    } else {
                        if (fieldNameSet !== undefined)
                            this.$values[fieldNameSet] = type.fields[fieldNameSet].defaultValue;
                        this.$values[field.name] = value;
                        this.$oneofs[field.partOf.name] = field.name;
                    }
                } else // Just set the value and reset to the default when unset
                    this.$values[field.name] = value === undefined || value === null
                        ? field.defaultValue
                        : value;
            },
            enumerable: true
        };
    });

    // Define each oneof with a non-enumerable getter returning the name of the currently set field
    type.oneofsArray.forEach(function(oneof) {
        oneof.resolve();
        
        defineProperties[oneof.name] = {
            get: function() {
                return this.$oneofs[oneof.name];
            }
        };
    });

    Object.defineProperties(prototype, defineProperties);
    return prototype;
}

protobuf.initialize = initialize;

// Parser

protobuf.tokenize         = require("./tokenize");
protobuf.parse            = require("./parse");

// Serialization
protobuf.Writer           = require("./writer");
protobuf.BufferWriter     = protobuf.Writer.BufferWriter;
protobuf.Reader           = require("./reader");
protobuf.BufferReader     = protobuf.Reader.BufferReader;

// Reflection
protobuf.ReflectionObject = require("./object");
protobuf.Namespace        = require("./namespace");
protobuf.Root             = require("./root");
protobuf.Type             = require("./type");
protobuf.Field            = require("./field");
protobuf.MapField         = require("./mapfield");
protobuf.Enum             = require("./enum");
protobuf.Service          = require("./service");
protobuf.Method           = require("./method");

// Runtime
protobuf.Prototype        = require("./prototype");

// Utility
protobuf.types            = require("./types");
protobuf.util             = util;
