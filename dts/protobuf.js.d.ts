/**
 * Protobuf namespace.
 * @namespace
 */
declare module protobuf {
   /**
    * Reflected enum.
    * @memberof protobuf
    * @extends protobuf.ReflectionObject
    * @constructor
    * @param {string} name Unique name within its namespace
    * @param {Object.<string,number>} [values] Enum values as an object, by name
    * @param {Object.<string,*>} [options] Enum options
    */
   class Enum extends protobuf.ReflectionObject {
       /**
        * Reflected enum.
        * @memberof protobuf
        * @extends protobuf.ReflectionObject
        * @constructor
        * @param {string} name Unique name within its namespace
        * @param {Object.<string,number>} [values] Enum values as an object, by name
        * @param {Object.<string,*>} [options] Enum options
        */
       constructor(name: string, values?: { [k: string]: number }, options?: { [k: string]: any });

       /**
        * Enum values by name.
        * @type {Object.<string,number>}
        */
       values: { [k: string]: number };

       /**
        * Cached values by id.
        * @type {?Object.<number,string>}
        * @private
        */
       private _valuesById: { [k: number]: string };

       /**
        * Enum values by id.
        * @name protobuf.Enum#valuesById
        * @type {Object.<number,string>}
        * @readonly
        */
       valuesById: { [k: number]: string };

       /**
        * Tests if the specified JSON object describes an enum.
        * @param {*} json JSON object to test
        * @returns {boolean} `true` if the object describes an enum
        */
       static testJSON(json: any): boolean;

       /**
        * Creates an enum from JSON.
        * @param {string} name Enum name
        * @param {Object.<string,*>} json JSON object
        * @returns {Enum} Created enum
        * @throws {TypeError} If arguments are invalid
        */
       static fromJSON(name: string, json: { [k: string]: any }): Enum;

       /**
        * Adds a value to this enum.
        * @param {string} name Value name
        * @param {number} id Value id
        * @returns {Enum} this
        */
       add(name: string, id: number): Enum;

       /**
        * Removes a value from this enum
        * @param {string} name Value name
        * @returns {Enum} this
        */
       remove(name: string): Enum;

   }

   /**
    * Reflected message field.
    * @memberof protobuf
    * @extends protobuf.ReflectionObject
    * @constructor
    * @param {string} name Unique name within its namespace
    * @param {number} id Unique id within its namespace
    * @param {string} type Type of the underlying value
    * @param {string} [rule=optional] Field rule
    * @param {string} [extend] Extended type if different from parent
    * @param {Object.<string,*>} [options] Field options
    */
   class Field extends protobuf.ReflectionObject {
       /**
        * Reflected message field.
        * @memberof protobuf
        * @extends protobuf.ReflectionObject
        * @constructor
        * @param {string} name Unique name within its namespace
        * @param {number} id Unique id within its namespace
        * @param {string} type Type of the underlying value
        * @param {string} [rule=optional] Field rule
        * @param {string} [extend] Extended type if different from parent
        * @param {Object.<string,*>} [options] Field options
        */
       constructor(name: string, id: number, type: string, rule?: string, extend?: string, options?: { [k: string]: any });

       /**
        * Field rule, if any.
        * @type {string|undefined}
        */
       rule: (string|undefined);

       /**
        * Field type.
        * @type {string}
        */
       type: string;

       /**
        * Unique field id.
        * @type {number}
        */
       id: number;

       /**
        * Whether this field is required.
        * @type {boolean}
        */
       required: boolean;

       /**
        * Whether this field is optional.
        * @type {boolean}
        */
       optional: boolean;

       /**
        * Whether this field is repeated.
        * @type {boolean}
        */
       repeated: boolean;

       /**
        * Whether this field is a map or not.
        * @type {boolean}
        */
       map: boolean;

       /**
        * Message this field belongs to.
        * @type {?Type}
        */
       message: Type;

       /**
        * OneOf this field belongs to, if any,
        * @type {?OneOf}
        */
       partOf: OneOf;

       /**
        * The field's default value. Only relevant when working with proto2.
        * @type {*}
        */
       defaultValue: any;

       /**
        * Resolved type if not a basic type.
        * @type {?(Type|Enum)}
        */
       resolvedType: (Type|Enum);

       /**
        * Sister-field within the extended type if a declaring extension field.
        * @type {?Field}
        */
       extensionField: Field;

       /**
        * Sister-field within the declaring type if an extended field.
        * @type {?Field}
        */
       declaringField: Field;

       /**
        * Internally remembers whether this field is packed.
        * @type {?boolean}
        * @private
        */
       private _packed: boolean;

       /**
        * Determines whether this field is packed. Only relevant when repeated and working with proto2.
        * @name protobuf.Field#packed
        * @type {boolean}
        * @readonly
        */
       packed: boolean;

       /**
        * Tests if the specified JSON object describes a field.
        * @param {*} json Any JSON object to test
        * @returns {boolean} `true` if the object describes a field
        */
       static testJSON(json: any): boolean;

       /**
        * Constructs a field from JSON.
        * @param {string} name Field name
        * @param {Object} json JSON object
        * @returns {Field} Created field
        * @throws {TypeError} If arguments are invalid
        */
       static fromJSON(name: string, json: Object): Field;

       /**
        * Encodes the specified field value. Assumes that the field is present.
        * @param {*} value Field value
        * @param {Writer} writer Writer to encode to
        * @returns {Writer} writer
        */
       encode(value: any, writer: Writer): Writer;

       /**
        * Decodes a field value.
        * @param {Reader} reader Reader to decode from
        * @param {number} receivedWireType Wire type received
        * @returns {*} Field value
        * @throws {Error} If the wire format is invalid
        */
       decode(reader: Reader, receivedWireType: number): any;

   }

   /**
    * Loads one or multiple .proto files into a common root namespace.
    * @param {string|string[]} filename One or multiple files to load
    * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
    * @param {function(Error, Root=)} [callback] Callback function
    * @param {Object} [ctx] Optional callback context
    * @returns {Promise<Root>|Object} A promise if callback has been omitted, otherwise this
    * @throws {TypeError} If arguments are invalid
    */
   function load(filename: (string|string[]), root?: Root, callback?: (() => any), ctx?: Object): (Promise<Root>|Object);

   /**
    * Reflected message map field.
    * @memberof protobuf
    * @extends protobuf.Field
    * @constructor
    * @param {string} name Unique name within its namespace
    * @param {number} id Unique id within its namespace
    * @param {string} type Value type
    * @param {string} keyType Key type
    * @param {Object.<string,*>} [options] Field options
    */
   class MapField extends protobuf.Field {
       /**
        * Reflected message map field.
        * @memberof protobuf
        * @extends protobuf.Field
        * @constructor
        * @param {string} name Unique name within its namespace
        * @param {number} id Unique id within its namespace
        * @param {string} type Value type
        * @param {string} keyType Key type
        * @param {Object.<string,*>} [options] Field options
        */
       constructor(name: string, id: number, type: string, keyType: string, options?: { [k: string]: any });

       /**
        * Key type.
        * @type {string}
        */
       keyType: string;

       /**
        * Resolved key type if not a basic type.
        * @type {?ReflectionObject}
        */
       resolvedKeyType: ReflectionObject;

   }

   /**
    * Reflected service method.
    * @memberof protobuf
    * @extends protobuf.ReflectionObject
    * @constructor
    * @param {string} name Method name
    * @param {string} type Usually "rpc"
    * @param {string} requestType Request message type
    * @param {string} responseType Response message type
    * @param {boolean} [requestStream] Whether the request is streamed
    * @param {boolean} [responseStream] Whether the response is streamed
    * @param {Object.<string,*>} [options] Method options
    */
   class Method extends protobuf.ReflectionObject {
       /**
        * Reflected service method.
        * @memberof protobuf
        * @extends protobuf.ReflectionObject
        * @constructor
        * @param {string} name Method name
        * @param {string} type Usually "rpc"
        * @param {string} requestType Request message type
        * @param {string} responseType Response message type
        * @param {boolean} [requestStream] Whether the request is streamed
        * @param {boolean} [responseStream] Whether the response is streamed
        * @param {Object.<string,*>} [options] Method options
        */
       constructor(name: string, type: string, requestType: string, responseType: string, requestStream?: boolean, responseStream?: boolean, options?: { [k: string]: any });

       /**
        * Method type.
        * @type {string}
        */
       type: string;

       /**
        * Request type.
        * @type {string}
        */
       requestType: string;

       /**
        * Whether requests are streamed or not.
        * @type {boolean|undefined}
        */
       requestStream: (boolean|undefined);

       /**
        * Response type.
        * @type {string}
        */
       responseType: string;

       /**
        * Whether responses are streamed or not.
        * @type {boolean|undefined}
        */
       responseStream: (boolean|undefined);

       /**
        * Service this method belongs to.
        * @type {?Service}
        */
       service: Service;

       /**
        * Tests if the specified JSON object describes a service method.
        * @param {Object} json JSON object
        * @returns {boolean} `true` if the object describes a map field
        */
       static testJSON(json: Object): boolean;

       /**
        * Constructs a service method from JSON.
        * @param {string} name Method name
        * @param {Object} json JSON object
        * @returns {Method} Created method
        * @throws {TypeError} If arguments are invalid
        */
       static fromJSON(name: string, json: Object): Method;

   }

   /**
    * Base class of all reflection objects containing nested objects.
    * @memberof protobuf
    * @extends protobuf.ReflectionObject
    * @constructor
    * @param {string} name Namespace name
    * @param {Object.<string,*>} [options] Namespace options
    */
   class Namespace extends protobuf.ReflectionObject {
       /**
        * Base class of all reflection objects containing nested objects.
        * @memberof protobuf
        * @extends protobuf.ReflectionObject
        * @constructor
        * @param {string} name Namespace name
        * @param {Object.<string,*>} [options] Namespace options
        */
       constructor(name: string, options?: { [k: string]: any });

       /**
        * Nested reflection objects by name.
        * @type {Object.<string,ReflectionObject>|undefined}
        */
       nested: ({ [k: string]: ReflectionObject }|undefined);

       /**
        * Determines whether this namespace is empty.
        * @name protobuf.Namespace#empty
        * @type {boolean}
        * @readonly
        */
       empty: boolean;

       /**
        * Tests if the specified JSON object describes not another reflection object.
        * @param {*} json JSON object
        * @returns {boolean} `true` if the object describes not another reflection object
        */
       static testJSON(json: any): boolean;

       /**
        * Constructs a namespace from JSON.
        * @param {string} name Namespace name
        * @param {Object} json JSON object
        * @returns {Namespace} Created namespace
        * @throws {TypeError} If arguments are invalid
        */
       static fromJSON(name: string, json: Object): Namespace;

       /**
        * Iterates over all nested objects.
        * @param {function(this:Namespace, !ReflectionObject, string):*} fn Iterator function called with nested objects
        *  and their names. Can return something different than `undefined` to break the iteration.
        * @param {Object} [ctx] Optional iterator function context
        * @param {Object} [object] Alternative object to iterate over
        * @returns {*|!Namespace} First value returned, otherwise this
        */
       each(fn: (() => any), ctx?: Object, object?: Object): (any|Namespace);

       /**
        * Gets the nested object of the specified name.
        * @param {string} name Nested object name
        * @returns {?ReflectionObject} The reflection object or `null` if it doesn't exist
        */
       get(name: string): ReflectionObject;

       /**
        * Adds a nested object to this namespace.
        * @param {ReflectionObject} object Nested object to add
        * @returns {Namespace} this
        */
       add(object: ReflectionObject): Namespace;

       /**
        * Removes a nested object from this namespace.
        * @param {ReflectionObject} object Nested object to remove
        * @returns {Namespace} this
        */
       remove(object: ReflectionObject): Namespace;

       /**
        * Defines additial namespaces within this one if not yet existing.
        * @param {string|string[]} path Path to create
        * @param {?boolean} [visible] Whether visible when exporting definitions. Defaults to inherit from parent.
        * @returns {Namespace} Pointer to the last namespace created
        */
       define(path: (string|string[]), visible?: boolean): Namespace;

       /**
        * Resolves this namespace's and all its nested objects' type references. Useful to validate a
        * reflection tree.
        * @returns {Namespace} this
        */
       resolveAll(): Namespace;

       /**
        * Looks up the reflection object specified by path, relative to this namespace.
        * @param {string|string[]} path Path to look up
        * @param {boolean} [parentAlreadyChecked] Whether the parent has already been checked
        * @returns {?ReflectionObject} Looked up object or `null` if none could be found
        */
       lookup(path: (string|string[]), parentAlreadyChecked?: boolean): ReflectionObject;

   }

   /**
    * Base class of all reflection objects.
    * @memberof protobuf
    * @constructor
    * @param {string} name Object name
    * @param {Object.<string,*>} [options] Object options
    * @abstract
    */
   abstract class ReflectionObject {
       /**
        * JSON-exportable properties.
        * @type {?Object.<string,*>}
        */
       properties: { [k: string]: any };

       /**
        * Options.
        * @type {Object.<string,*>|undefined}
        */
       options: ({ [k: string]: any }|undefined);

       /**
        * Unique name within its namespace.
        * @type {string}
        */
       name: string;

       /**
        * Parent namespace.
        * @type {?Namespace}
        */
       parent: Namespace;

       /**
        * Whether already resolved or not.
        * @type {boolean}
        */
       resolved: boolean;

       /**
        * Internally stores whether this object is visible.
        * @type {?boolean}
        * @private
        */
       private _visible: boolean;

       /**
        * Reference to the root namespace.
        * @name protobuf.ReflectionObject#root
        * @type {Root}
        * @readonly
        */
       root: Root;

       /**
        * Full name including leading dot.
        * @name protobuf.ReflectionObject#fullName
        * @type {string}
        * @readonly
        */
       fullName: string;

       /**
        * Whether this object is visible when exporting definitions. Possible values are `true` to
        * be visible, `false` to be not and `null` (setter only) to inherit from parent.
        * @name protobuf.ReflectionObject#visible
        * @type {?boolean}
        */
       visible: boolean;

       /**
        * Extends this class and optionally exposes the specified properties to JSON.
        * @param {Function} constructor Extending constructor
        * @param {string[]} [exposePropertyNames] Properties to expose to JSON
        * @returns {Object} Prototype
        */
       static extend(constructor: (() => any), exposePropertyNames?: string[]): Object;

       /**
        * Converts this reflection object to its JSON representation.
        * Returns only properties that have explicitly been exposed.
        * @returns {Object} JSON object
        * @see {@link ReflectionObject.exposeJSON}
        */
       toJSON(): Object;

       /**
        * Called when this object is added to a parent.
        * @param {ReflectionObject} parent Parent added to
        * @returns {undefined}
        */
       onAdd(parent: ReflectionObject): undefined;

       /**
        * Called when this object is removed from a parent.
        * @param {ReflectionObject} parent Parent removed from
        * @returns {undefined}
        */
       onRemove(parent: ReflectionObject): undefined;

       /**
        * Resolves this objects type references.
        * @returns {ReflectionObject} this
        */
       resolve(): ReflectionObject;

       /**
        * Changes this object's visibility when exporting definitions.
        * @param {?boolean} visible `true` for public, `false` for private, `null` to inherit from parent
        * @returns {ReflectionObject} this
        * @throws {TypeError} If arguments are invalid
        */
       visibility(visible?: boolean): ReflectionObject;

       /**
        * Gets an option value.
        * @param {string} name Option name
        * @returns {*} Option value or `undefined` if not set
        */
       getOption(name: string): any;

       /**
        * Sets an option.
        * @param {string} name Option name
        * @param {*} value Option value
        * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
        * @returns {ReflectionObject} this
        */
       setOption(name: string, value: any, ifNotSet?: boolean): ReflectionObject;

       /**
        * Sets multiple options.
        * @param {Object.<string,*>} options Options to set
        * @returns {ReflectionObject} this
        */
       setOptions(options: { [k: string]: any }): ReflectionObject;

       /**
        * Converts this instance to its string representation.
        * @returns {string} Constructor name plus full name
        */
       toString(): string;

   }

   /**
    * Reflected OneOf.
    * @memberof protobuf
    * @extends protobuf.ReflectionObject
    * @constructor
    * @param {string} name Oneof name
    * @param {string[]} [fieldNames] Field names
    * @param {Object} [options] Oneof options
    */
   class OneOf extends protobuf.ReflectionObject {
       /**
        * Reflected OneOf.
        * @memberof protobuf
        * @extends protobuf.ReflectionObject
        * @constructor
        * @param {string} name Oneof name
        * @param {string[]} [fieldNames] Field names
        * @param {Object} [options] Oneof options
        */
       constructor(name: string, fieldNames?: string[], options?: Object);

       /**
        * Field names that belong to this oneof.
        * @type {string[]}
        */
       oneof: string[];

       /**
        * Fields that belong to this oneof and are possibly not yet added to its parent.
        * @type {Field[]}
        * @private
        */
       private _fields: Field[];

       /**
        * Tests if the specified JSON object describes a oneof.
        * @param {*} json JSON object
        * @returns {boolean} `true` if the object describes a oneof
        */
       static testJSON(json: any): boolean;

       /**
        * Constructs a oneof from JSON.
        * @param {string} name Oneof name
        * @param {Object} json JSON object
        * @returns {MapField} Created oneof
        * @throws {TypeError} If arguments are invalid
        */
       static fromJSON(name: string, json: Object): MapField;

       /**
        * Adds a field to this oneof.
        * @override
        * @param {Field} field Field to add
        * @returns {OneOf} this
        */
       add(field: Field): OneOf;

       /**
        * Removes a field from this oneof.
        * @override
        * @param {Field} field Field to remove
        * @returns {OneOf} this
        */
       remove(field: Field): OneOf;

   }

   /**
    * Parses the given .proto source and returns an object with the parsed contents.
    * @memberof protobuf
    * @param {string} source Source contents
    * @param {Root} [root] Root to populate
    * @param {boolean} [visible=true] Whether types from this file are visible when exporting definitions
    * @returns {Object} Parsed contents
    */
   function parse(source: string, root?: Root, visible?: boolean): Object;

   /**
    * Runtime message prototype ready to be extended by custom classes or generated code.
    * @memberof protobuf
    * @constructor
    * @param {Object.<string,*>} [properties] Properties to set on the instance. Only relevant when extended.
    * @abstract
    * @see {@link Type#create}
    */
   abstract class Prototype {
       /**
        * Makes the specified constructor extend the runtime message prototype.
        * @param {function(new:Message)} constructor Constructor to extend
        * @param {Type} type Reflected message type
        * @param {Object.<string,*>} [options] Additional options
        * @returns {Object} Prototype
        */
       static extend(constructor: (() => any), type: Type, options?: { [k: string]: any }): Object;

   }

   /**
    * Wire format reader using arrays.
    * @memberof protobuf
    * @constructor
    * @param {number[]} buffer Buffer to read from
    */
   class Reader {
       /**
        * Wire format reader using arrays.
        * @memberof protobuf
        * @constructor
        * @param {number[]} buffer Buffer to read from
        */
       constructor(buffer: number[]);

       /**
        * Read buffer.
        * @type {number[]}
        */
       buf: number[];

       /**
        * Read buffer position.
        * @type {number}
        */
       pos: number;

       /**
        * Read buffer length.
        * @type {number}
        */
       len: number;

       /**
        * Reads a tag.
        * @returns {{id: number, wireType: number}} Field id and wire type
        */
       tag(): Object;

       /**
        * Reads a varint as a signed 32 bit value.
        * @returns {number} Value read
        */
       int32(): number;

       /**
        * Reads a varint as an unsigned 32 bit value.
        * @returns {number} Value read
        */
       uint32(): number;

       /**
        * Reads a zig-zag encoded varint as a signed 32 bit value.
        * @returns {number} Value read
        */
       sint32(): number;

       /**
        * Reads a varint as a signed 64 bit value.
        * @returns {number|{ low: number, high: number, unsigned: false }|Long} Value read
        */
       int64(): (number|Object|Long);

       /**
        * Reads a varint as an unsigned 64 bit value.
        * @returns {number|{ low: number, high: number, unsigned: true }|Long} Value read
        */
       uint64(): (number|Object|Long);

       /**
        * Reads a zig-zag encoded varint as a signed 64 bit value.
        * @returns {number|{ low: number, high: number, unsigned: false }|Long} Value read
        */
       sint64(): (number|Object|Long);

       /**
        * Reads a varint as a boolean.
        * @returns {boolean} Value read
        */
       bool(): boolean;

       /**
        * Reads fixed 32 bits as a number.
        * @returns {number} Value read
        */
       fixed32(): number;

       /**
        * Reads zig-zag encoded fixed 32 bits as a number.
        * @returns {number} Value read
        */
       sfixed32(): number;

       /**
        * Reads fixed 64 bits as a Long.
        * @returns {number|{ low: number, high: number, unsigned: true }|Long} Value read
        */
       fixed64(): (number|Object|Long);

       /**
        * Reads zig-zag encoded 64 bits as a Long.
        * @returns {number|{ low: numbeer, high: number, unsigned: false }|Long} Value read
        */
       sfixed64(): (number|Object|Long);

       /**
        * Reads a float (32 bit) as a number.
        * @returns {number} Value read
        */
       float(): number;

       /**
        * Reads a double (64 bit float) as a number.
        * @returns {number} Value read
        */
       double(): number;

       /**
        * Reads a sequence of bytes.
        * @param {number} [length] Optional number of bytes to read, if known beforehand
        * @returns {number[]} Value read
        */
       bytes(length?: number): number[];

       /**
        * Reads a string.
        * @param {number} [length] Optional number of bytes to read, if known beforehand
        * @returns {string} Value read
        */
       string(length?: number): string;

       /**
        * Skips some bytes.
        * @param {number} [length] Length if known, otherwise a varint is assumed
        * @returns {Reader} this
        */
       skip(length?: number): Reader;

       /**
        * Skips the next element of the specified wire type.
        * @param {number} wireType Wire type received
        * @returns {Reader}this
        */
       skipType(wireType: number): Reader;

       /**
        * Resets this instance and frees all resources.
        * @param {number[]} [buffer] Optionally a new buffer for a new sequence of read operations
        * @returns {Reader} this
        */
       reset(buffer?: number[]): Reader;

       /**
        * Finishes the current sequence of read operations, frees all resources and returns the remaining buffer.
        * Optionally accepts a new buffer for a new sequence of read operations.
        * @param {number[]} [buffer] Optionally a new buffer for a new sequence of read operations
        * @returns {number[]} Finished buffer
        */
       finish(buffer?: number[]): number[];

   }

   /**
    * Wire format reader using node buffers.
    * @memberof protobuf
    * @extends protobuf.Reader
    * @constructor
    * @param {number[]} buffer Buffer to read from
    */
   class BufferReader extends protobuf.Reader {
       /**
        * Wire format reader using node buffers.
        * @memberof protobuf
        * @extends protobuf.Reader
        * @constructor
        * @param {number[]} buffer Buffer to read from
        */
       constructor(buffer: number[]);

   }

   /**
    * Root namespace.
    * @memberof protobuf
    * @extends protobuf.Namespace
    * @constructor
    * @param {Object.<string,*>} [contextOptions] Context options
    * @param {Object.<string,*>} [options] Namespace options
    */
   class Root extends protobuf.Namespace {
       /**
        * Root namespace.
        * @memberof protobuf
        * @extends protobuf.Namespace
        * @constructor
        * @param {Object.<string,*>} [contextOptions] Context options
        * @param {Object.<string,*>} [options] Namespace options
        */
       constructor(contextOptions?: { [k: string]: any }, options?: { [k: string]: any });

       /**
        * Already loaded file names.
        * @type {string[]}
        * @private
        */
       private _loaded: string[];

       /**
        * Array of pending extension fields.
        * @type {Field[]}
        * @private
        */
       private pendingExtensions: Field[];

       /**
        * Checks if a specific file has already been loaded.
        * @param {string} filename File name to test
        * @returns {boolean} `true` if already loaded
        */
       isLoaded(filename: string): boolean;

       /**
        * Lets the root know of a loaded file, i.e. when added programmatically.
        * @param {string} filename File name to add
        * @returns {boolean} `false` if this file has already been loaded before
        */
       addLoaded(filename: string): boolean;

       /**
        * Loads one or multiple .proto files into a common root namespace.
        * @param {string|string[]} filename Names of one or multiple files to load
        * @param {function(Error, ?Root)} [callback] Node-style callback function
        * @param {Object} [ctx] Optional callback context
        * @returns {Promise<Root>|undefined} A promise if callback has been omitted, otherwise `undefined`
        * @throws {TypeError} If arguments are invalid
        */
       load(filename: (string|string[]), callback?: (() => any), ctx?: Object): (Promise<Root>|undefined);

       /**
        * Called when any object is added to this root or its sub-namespaces.
        * @param {ReflectionObject} object Object added
        * @returns {undefined}
        */
       handleAdd(object: ReflectionObject): undefined;

       /**
        * Called when any object is removed from this root or its sub-namespaces.
        * @param {ReflectionObject} object Object removed
        * @returns {undefined}
        */
       handleRemove(object: ReflectionObject): undefined;

   }

   /**
    * Reflected service.
    * @memberof protobuf
    * @extends protobuf.Namespace
    * @constructor
    * @param {string} name Service name
    * @param {Object.<string,*>} [options] Service options
    * @throws {TypeError} If arguments are invalid
    */
   class Service extends protobuf.Namespace {
       /**
        * Reflected service.
        * @memberof protobuf
        * @extends protobuf.Namespace
        * @constructor
        * @param {string} name Service name
        * @param {Object.<string,*>} [options] Service options
        * @throws {TypeError} If arguments are invalid
        */
       constructor(name: string, options?: { [k: string]: any });

       /**
        * Service methods.
        * @type {Object.<string,Method>}
        */
       methods: { [k: string]: Method };

   }

   /**
    * Tokenizes the given .proto source and returns an object with useful utility functions.
    * @memberof protobuf
    * @param {string} source Source contents
    * @returns {Object} Tokenizer handle
    */
   function tokenize(source: string): Object;

   /**
    * Reflected message type.
    * @memberof protobuf
    * @extends protobuf.Namespace
    * @constructor
    * @param {string} name Message name
    * @param {Object.<string,*>} [options] Message options
    */
   class Type extends protobuf.Namespace {
       /**
        * Reflected message type.
        * @memberof protobuf
        * @extends protobuf.Namespace
        * @constructor
        * @param {string} name Message name
        * @param {Object.<string,*>} [options] Message options
        */
       constructor(name: string, options?: { [k: string]: any });

       /**
        * Message fields.
        * @type {Object.<string,Field>}
        */
       fields: { [k: string]: Field };

       /**
        * Oneofs declared within this namespace, if any.
        * @type {Object.<string,OneOf>}
        */
       oneofs: { [k: string]: OneOf };

       /**
        * Extension ranges, if any.
        * @type {number[][]}
        */
       extensions: number[][];

       /**
        * Reserved ranges, if any.
        * @type {number[][]}
        */
       reserved: number[][];

       /**
        * Cached fields by id.
        * @type {?Object.<number,Field>}
        * @private
        */
       private _fieldsById: { [k: number]: Field };

       /**
        * Cached fields as an array.
        * @type {?Field[]}
        * @private
        */
       private _fieldsArray: Field[];

       /**
        * Cached prototype.
        * @type {?Prototype}
        * @private
        */
       private _prototype: Prototype;

       /**
        * Message fields by id.
        * @name protobuf.Type#fieldsById
        * @type {Object.<number,Field>}
        * @readonly
        */
       fieldsById: { [k: number]: Field };

       /**
        * Message fields as an array for iteration.
        * @name protobuf.Type#fieldsArray
        * @type {Field[]}
        * @readonly
        */
       fieldsArray: Field[];

       /**
        * Runtime message prototype of this message.
        * @name protobuf.Type#prototype
        * @type {Prototype}
        * @readonly
        */
       prototype: Prototype;

       /**
        * Creates a new message of this type using the specified properties.
        * @param {Object} [properties] Properties to set
        * @param {Function} [constructor] Optional constructor to use (should extend {@link Prototype})
        * @returns {Prototype} Message instance
        */
       create(properties?: Object, constructor?: (() => any)): Prototype;

       /**
        * Encodes a message of this type.
        * @param {Prototype|Object} message Message instance or plain object
        * @param {Writer} [writer] Writer to encode to
        * @returns {Writer} writer
        */
       encode(message: (Prototype|Object), writer?: Writer): Writer;

       /**
        * Encodes a message of this type, preceeded by its byte length as a varint.
        * @param {Object} message Message instance or plain object
        * @param {Writer} [writer] Writer to encode to
        * @returns {Writer} writer
        */
       encodeDelimited(message: Object, writer?: Writer): Writer;

       /**
        * Decodes a runtime message of this message's type.
        * @param {Reader|number[]} readerOrBuffer Reader or buffer to decode from
        * @param {Function} [constructor] Optional constructor of the created message, see {@link Type#create}
        * @param {number} [length] Length of the message, if known beforehand
        * @returns {Object} Decoded message
        */
       decode(readerOrBuffer: (Reader|number[]), constructor?: (() => any), length?: number): Object;

       /**
        * Decodes a message of this type,
        * which is preceeded by its byte length as a varint.
        * @param {Reader|number[]} readerOrBuffer Reader or buffer to decode from
        * @param {Function} [constructor] Optional constructor of the created message, see {@link Type#create}
        * @returns {Object} Decoded message
        */
       decodeDelimited(readerOrBuffer: (Reader|number[]), constructor?: (() => any)): Object;

   }

   /**
    * Common type constants.
    * @namespace
    * @memberof protobuf
    */
   module types {
       /**
        * Basic type wire types.
        * @type {Object.<string,number>}
        */
       var wireTypes: { [k: string]: number };

       /**
        * Basic type defaults.
        * @type {Object.<string,*>}
        */
       var defaults: { [k: string]: any };

       /**
        * Allowed types for map keys with their associated wire type.
        * @type {Object.<string,number>}
        */
       var mapKeyWireTypes: { [k: string]: number };

       /**
        * Allowed types for packed repeated fields with their associated wire type.
        * @type {Object.<string,number>}
        */
       var packableWireTypes: { [k: string]: number };

   }

   /**
    * Utility functions.
    * @namespace
    * @memberof protobuf
    */
   module util {
       /**
        * Whether running under node.js or not.
        * @type {boolean}
        */
       var isNode: boolean;

       /**
        * Optional buffer class to use. If you assign any compatible buffer implementation to this
        * property, the library will use it.
        * @type {?Function}
        */
       var Buffer: (() => any);

       /**
        * Optional Long class to use. If you assign any compatible long implementation to this property,
        * the library will use it.
        * @type {?Function}
        */
       var Long: (() => any);

       /**
        * Tests if the specified value is a string.
        * @memberof protobuf.util
        * @param {*} value Value to test
        * @returns {boolean} `true` if the value is a string
        */
       function isString(value: any): boolean;

       /**
        * Tests if the specified value is a non-null object.
        * @param {*} value Value to test
        * @returns {boolean} `true` if the value is a non-null object
        */
       function isObject(value: any): boolean;

       /**
        * Tests if the specified value is an array.
        * @function
        * @param {*} value Value to test
        * @returns {boolean} `true` if the value is an array
        */
       function isArray(value: any): boolean;

       /**
        * Tests if the specified value is a function.
        * @param {*} value Value to test
        * @returns {boolean} `true` if the value is a function
        */
       function isFunction(value: any): boolean;

       /**
        * Tests if the specified value is a number.
        * @memberof protobuf.util
        * @param {*} value Value to test
        * @returns {boolean} `true` if the value is a number
        */
       function isNumber(value: any): boolean;

       /**
        * Tests if the specified value is an integer.
        * @function
        * @param {*} value Value to test
        * @returns {boolean} `true` if the value is an integer
        */
       function isInteger(value: any): boolean;

       /**
        * Tests if the specified value is a boolean.
        * @param {*} value Value to test
        * @returns {boolean} `true` if the value is a boolean
        */
       function isBoolean(value: any): boolean;

       /**
        * Creates a type error.
        * @param {string} name Argument name
        * @param {string} [description=a string] Expected argument descripotion
        * @returns {TypeError} Created type error
        * @private
        */
       function _TypeError(name: string, description?: string): TypeError;

       /**
        * Returns a promise from a node-style function.
        * @memberof protobuf.util
        * @param {function(Error, ...*)} fn Function to call
        * @returns {Promise<*>} Promisified function
        */
       function asPromise(fn: (() => any)): Promise<any>;

       /**
        * Fetches the contents of a file.
        * @memberof protobuf.util
        * @param {string} path File path or url
        * @param {function(?Error, string=)} [callback] Node-style callback
        * @returns {Promise<string>|undefined} Promise if callback has been omitted
        */
       function fetch(path: string, callback?: (() => any)): (Promise<string>|undefined);

       /**
        * Tests if the specified path is absolute.
        * @memberof protobuf.util
        * @param {string} path Path to test
        * @returns {boolean} `true` if path is absolute
        */
       function isAbsolutePath(path: string): boolean;

       /**
        * Normalizes the specified path.
        * @memberof protobuf.util
        * @param {string} path Path to normalize
        * @returns {string} Normalized path
        */
       function normalizePath(path: string): string;

       /**
        * Resolves the specified include path against the specified origin path.
        * @param {string} originPath Path that was used to fetch the origin file
        * @param {string} importPath Import path specified in the origin file
        * @param {boolean} [alreadyNormalized] `true` if both paths are already known to be normalized
        * @returns {string} Path to the imported file
        */
       function resolvePath(originPath: string, importPath: string, alreadyNormalized?: boolean): string;

       /**
        * Converts a number or long-like object to an 8 characters long hash string.
        * @memberof protobuf.util
        * @param {number|!{ low: number, high: number }} value Value to convert
        * @returns {string} Hashed value
        */
       function toHash(value: (number|Object)): string;

       /**
        * Converts an 8 characters long hash string to a number or long-like object.
        * @memberof protobuf.util
        * @param {string} hash Hashed value to convert
        * @param {boolean} [unsigned=false] Whether unsigned or not
        * @returns {number|!{ low: number, high: number, unsigned: boolean }} Original value
        */
       function fromHash(hash: string, unsigned?: boolean): (number|Object);

   }

   /**
    * Wire format writer using arrays.
    * @memberof protobuf
    * @constructor
    */
   class Writer {
       /**
        * Wire format writer using arrays.
        * @memberof protobuf
        * @constructor
        */
       constructor();

       /**
        * Current buffer.
        * @type {?number[]}
        */
       buf: number[];

       /**
        * Current buffer position.
        * @type {number}
        */
       pos: number;

       /**
        * Current buffer length.
        * @type {number}
        */
       len: number;

       /**
        * Completed buffers.
        * @type {number[][]}
        */
       bufs: number[][];

       /**
        * Forked states stack.
        * @type {number[][][]}
        * @private
        */
       private _stack: number[][][];

       /**
        * Allocates a chunk of memory.
        * @function
        * @param {number} size Buffer size
        * @returns {number[]} Allocated buffer
        */
       static alloc(size: number): number[];

       /**
        * Writes a tag.
        * @param {number} id Field id
        * @param {number} wireType Wire type
        * @returns {Writer} this
        */
       tag(id: number, wireType: number): Writer;

       /**
        * Writes an unsigned 32 bit value as a varint.
        * @param {number} value Value to write
        * @returns {Writer} this
        */
       uint32(value: number): Writer;

       /**
        * Writes a signed 32 bit value as a varint.
        * @function
        * @param {number} value Value to write
        * @returns {Writer} this
        */
       int32(value: number): Writer;

       /**
        * Writes a 32 bit value as a varint, zig-zag encoded.
        * @param {number} value Value to write
        * @returns {Writer} this
        */
       sint32(value: number): Writer;

       /**
        * Writes an unsigned 64 bit value as a varint.
        * @param {number|!{ low: number, high: number }|!Long} value Value to write
        * @returns {Writer} this
        */
       uint64(value: (number|Object|Long)): Writer;

       /**
        * Writes a signed 64 bit value as a varint.
        * @function
        * @param {number|!{ low: number, high: number }|!Long} value Value to write
        * @returns {Writer} this
        */
       int64(value: (number|Object|Long)): Writer;

       /**
        * Writes a signed 64 bit value as a varint, zig-zag encoded.
        * @param {number|!{ low: number, high: number }|!Long} value Value to write
        * @returns {Writer} this
        */
       sint64(value: (number|Object|Long)): Writer;

       /**
        * Writes a boolish value as a varint.
        * @param {boolean} value Value to write
        * @returns {Writer} this
        */
       bool(value: boolean): Writer;

       /**
        * Writes a 32 bit value as fixed 32 bits.
        * @param {number} value Value to write
        * @returns {Writer} this
        */
       fixed32(value: number): Writer;

       /**
        * Writes a 32 bit value as fixed 32 bits, zig-zag encoded.
        * @param {number} value Value to write
        * @returns {Writer} this
        */
       sfixed32(value: number): Writer;

       /**
        * Writes a 64 bit value as fixed 64 bits.
        * @param {number|!{ low: number, high: number }|!Long} value Value to write
        * @returns {Writer} this
        */
       fixed64(value: (number|Object|Long)): Writer;

       /**
        * Writes a 64 bit value as fixed 64 bits, zig-zag encoded.
        * @param {number|!{ low: number, high: number }|!Long} value Value to write
        * @returns {Writer} this
        */
       sfixed64(value: (number|Object|Long)): Writer;

       /**
        * Writes a float (32 bit).
        * @param {number} value Value to write
        * @returns {Writer} this
        */
       float(value: number): Writer;

       /**
        * Writes a double (64 bit float).
        * @param {number} value Value to write
        * @returns {Writer} this
        */
       double(value: number): Writer;

       /**
        * Writes a sequence of bytes.
        * @param {number[]} value Value to write
        * @returns {Writer} this
        */
       bytes(value: number[]): Writer;

       /**
        * Writes a string.
        * @param {string} value Value to write
        * @returns {Writer} this
        */
       string(value: string): Writer;

       /**
        * Forks this writer's state by pushing it to a stack and reusing the remaining buffer
        * for a new set of write operations. A call to {@link Writer#reset} or {@link Writer#finish}
        * resets the writer to the previous state.
        * @returns {Writer} this
        */
       fork(): Writer;

       /**
        * Resets this instance to the last state. If there is no last state, all references
        * to previous buffers will be cleared.
        * @param {boolean} [clearForkedStates=false] `true` to clear all previously forked states
        * @returns {Writer} this
        */
       reset(clearForkedStates?: boolean): Writer;

       /**
        * Finishes the current sequence of write operations and frees all resources.
        * @param {boolean} [clearForkedStates=false] `true` to clear all previously forked states
        * @returns {number[]} Finished buffer
        */
       finish(clearForkedStates?: boolean): number[];

   }

   /**
    * Wire format writer using node buffers.
    * @memberof protobuf
    * @extends protobuf.Writer
    * @constructor
    */
   class BufferWriter extends protobuf.Writer {
       /**
        * Wire format writer using node buffers.
        * @memberof protobuf
        * @extends protobuf.Writer
        * @constructor
        */
       constructor();

   }

}

