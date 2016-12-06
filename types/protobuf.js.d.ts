/// <reference types="node" />
/// <reference types="long" />

/*
 * protobuf.js v6.0.2 TypeScript definitions
 * Generated Tue, 06 Dec 2016 14:03:33 UTC
 */
declare module "protobufjs" {

   /**
    * Provides common type definitions.
    * Can also be used to provide additional google types or your own custom types.
    * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
    * @param {Object} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
    * @returns {undefined}
    * @property {Object} google/protobuf/any.proto Any
    * @property {Object} google/protobuf/duration.proto Duration
    * @property {Object} google/protobuf/empty.proto Empty
    * @property {Object} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
    * @property {Object} google/protobuf/timestamp.proto Timestamp
    */
   function common(name: string, json: Object): undefined;
   
   /**
    * Wire format decoder using code generation on top of reflection.
    * @namespace
    */
   module decoder {
      /**
       * Decodes a message of `this` message's type.
       * @param {Reader} reader Reader to decode from
       * @param {number} [length] Length of the message, if known beforehand
       * @returns {Prototype} Populated runtime message
       * @this Type
       */
      function fallback(reader: Reader, length?: number): Prototype;
   
      /**
       * Generates a decoder specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {util.CodegenAppender} Unscoped codegen instance
       */
      function generate(mtype: Type): util.CodegenAppender;
   
   }
   
   /**
    * Wire format encoder using code generation on top of reflection.
    * @namespace
    */
   module encoder {
      /**
       * Encodes a message of `this` message's type.
       * @param {Prototype|Object} message Runtime message or plain object to encode
       * @param {Writer} [writer] Writer to encode to
       * @returns {Writer} writer
       * @this Type
       */
      function fallback(message: (Prototype|Object), writer?: Writer): Writer;
   
      /**
       * Generates an encoder specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {util.CodegenAppender} Unscoped codegen instance
       */
      function generate(mtype: Type): util.CodegenAppender;
   
   }
   
   /**
    * Constructs a new enum.
    * @classdesc Reflected enum.
    * @extends ReflectionObject
    * @constructor
    * @param {string} name Unique name within its namespace
    * @param {Object.<string,number>} [values] Enum values as an object, by name
    * @param {Object} [options] Declared options
    */
   class Enum extends ReflectionObject {
      /**
       * Constructs a new enum.
       * @classdesc Reflected enum.
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {Object.<string,number>} [values] Enum values as an object, by name
       * @param {Object} [options] Declared options
       */
      constructor(name: string, values?: { [k: string]: number }, options?: Object);
   
      /**
       * Enum values by name.
       * @type {Object.<string,number>}
       */
      values: { [k: string]: number };
   
      /**
       * Enum values by id.
       * @name Enum#valuesById
       * @type {Object.<number,string>}
       * @readonly
       */
      valuesById: { [k: number]: string };
   
      /**
       * Gets this enum's values by id. This is an alias of {@link Enum#valuesById}'s getter for use within non-ES5 environments.
       * @name Enum#getValuesById
       * @function
       * @returns {Object.<number,string>}
       */
      getValuesById(): { [k: number]: string };
   
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
       * @returns {Enum} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If there is already a value with this name or id
       */
      add(name: string, id: number): Enum;
   
      /**
       * Removes a value from this enum
       * @param {string} name Value name
       * @returns {Enum} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If `name` is not a name of this enum
       */
      remove(name: string): Enum;
   
   }
   
   /**
    * Constructs a new message field. Note that {@link MapField|map fields} have their own class.
    * @classdesc Reflected message field.
    * @extends ReflectionObject
    * @constructor
    * @param {string} name Unique name within its namespace
    * @param {number} id Unique id within its namespace
    * @param {string} type Value type
    * @param {string} [rule=optional] Field rule
    * @param {string} [extend] Extended type if different from parent
    * @param {Object} [options] Declared options
    */
   class Field extends ReflectionObject {
      /**
       * Constructs a new message field. Note that {@link MapField|map fields} have their own class.
       * @classdesc Reflected message field.
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {number} id Unique id within its namespace
       * @param {string} type Value type
       * @param {string} [rule=optional] Field rule
       * @param {string} [extend] Extended type if different from parent
       * @param {Object} [options] Declared options
       */
      constructor(name: string, id: number, type: string, rule?: string, extend?: string, options?: Object);
   
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
       * Extended type if different from parent.
       * @type {string|undefined}
       */
      extend: (string|undefined);
   
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
       * Whether this field's value should be treated as a long.
       * @type {boolean}
       */
      long: boolean;
   
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
       * Sister-field within the declaring namespace if an extended field.
       * @type {?Field}
       */
      declaringField: Field;
   
      /**
       * Determines whether this field is packed. Only relevant when repeated and working with proto2.
       * @name Field#packed
       * @type {boolean}
       * @readonly
       */
      packed: boolean;
   
      /**
       * Determines whether this field is packed. This is an alias of {@link Field#packed}'s getter for use within non-ES5 environments.
       * @name Field#isPacked
       * @function
       * @returns {boolean}
       */
      isPacked(): boolean;
   
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
       * Resolves this field's type references.
       * @returns {Field} `this`
       * @throws {Error} If any reference cannot be resolved
       */
      resolve(): Field;
   
      /**
       * Converts a field value to JSON using the specified options. Note that this method does not account for repeated fields and must be called once for each repeated element instead.
       * @param {*} value Field value
       * @param {Object.<string,*>} [options] Conversion options
       * @returns {*} Converted value
       * @see {@link Prototype#asJSON}
       */
      jsonConvert(value: any, options?: { [k: string]: any }): any;
   
   }
   
   /**
    * Loads one or multiple .proto or preprocessed .json files into a common root namespace.
    * @param {string|string[]} filename One or multiple files to load
    * @param {Root|function(?Error, Root=)} [root] Root namespace, defaults to create a new one if omitted.
    * @param {function(?Error, Root=)} [callback] Callback function
    * @returns {Promise<Root>|undefined} A promise if `callback` has been omitted
    * @throws {TypeError} If arguments are invalid
    */
   function load(filename: (string|string[]), root?: (Root|any), callback?: any): (Promise<Root>|undefined);
   
   /**
    * Options passed to {@link inherits}, modifying its behavior.
    * @typedef InheritanceOptions
    * @type {Object}
    * @property {boolean} [noStatics=false] Skips adding the default static methods on top of the constructor
    * @property {boolean} [noRegister=false] Skips registering the constructor with the reflected type
    */
   interface InheritanceOptions {
      noStatics: boolean;
      noRegister: boolean;
   }
   
   
   /**
    * Inherits a custom class from the message prototype of the specified message type.
    * @param {Function} clazz Inheriting class
    * @param {Type} type Inherited message type
    * @param {InheritanceOptions} [options] Inheritance options
    * @returns {Prototype} Created prototype
    */
   function inherits(clazz: any, type: Type, options?: InheritanceOptions): Prototype;
   
   /**
    * This is not an actual type but stands as a reference for any constructor of a custom message class that you pass to the library.
    * @name Class
    * @extends Prototype
    * @constructor
    * @param {Object.<string,*>} [properties] Properties to set on the message
    * @see {@link inherits}
    */
   class Class extends Prototype {
      /**
       * This is not an actual type but stands as a reference for any constructor of a custom message class that you pass to the library.
       * @name Class
       * @extends Prototype
       * @constructor
       * @param {Object.<string,*>} [properties] Properties to set on the message
       * @see {@link inherits}
       */
      constructor(properties?: { [k: string]: any });
   
      /**
       * Reference to the reflected type.
       * @name Class.$type
       * @type {Type}
       * @readonly
       */
      static $type: Type;
   
      /**
       * Encodes a message of this type to a buffer.
       * @name Class.encode
       * @function
       * @param {Prototype|Object} message Message to encode
       * @param {Writer} [writer] Writer to use
       * @returns {Writer} Writer
       */
      static encode(message: (Prototype|Object), writer?: Writer): Writer;
   
      /**
       * Encodes a message of this type preceeded by its length as a varint to a buffer.
       * @name Class.encodeDelimited
       * @function
       * @param {Prototype|Object} message Message to encode
       * @param {Writer} [writer] Writer to use
       * @returns {Writer} Writer
       */
      static encodeDelimited(message: (Prototype|Object), writer?: Writer): Writer;
   
      /**
       * Decodes a message of this type from a buffer.
       * @name Class.decode
       * @function
       * @param {Uint8Array} buffer Buffer to decode
       * @returns {Prototype} Decoded message
       */
      static decode(buffer: Uint8Array): Prototype;
   
      /**
       * Decodes a message of this type preceeded by its length as a varint from a buffer.
       * @name Class.decodeDelimited
       * @function
       * @param {Uint8Array} buffer Buffer to decode
       * @returns {Prototype} Decoded message
       */
      static decodeDelimited(buffer: Uint8Array): Prototype;
   
      /**
       * Verifies a message of this type.
       * @name Class.verify
       * @function
       * @param {Prototype|Object} message Message or plain object to verify
       * @returns {?string} `null` if valid, otherwise the reason why it is not
       */
      static verify(message: (Prototype|Object)): string;
   
   }
   
   /**
    * Constructs a new map field.
    * @classdesc Reflected map field.
    * @extends Field
    * @constructor
    * @param {string} name Unique name within its namespace
    * @param {number} id Unique id within its namespace
    * @param {string} keyType Key type
    * @param {string} type Value type
    * @param {Object} [options] Declared options
    */
   class MapField extends Field {
      /**
       * Constructs a new map field.
       * @classdesc Reflected map field.
       * @extends Field
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {number} id Unique id within its namespace
       * @param {string} keyType Key type
       * @param {string} type Value type
       * @param {Object} [options] Declared options
       */
      constructor(name: string, id: number, keyType: string, type: string, options?: Object);
   
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
   
      /**
       * Tests if the specified JSON object describes a map field.
       * @param {Object} json JSON object to test
       * @returns {boolean} `true` if the object describes a field
       */
      static testJSON(json: Object): boolean;
   
      /**
       * Constructs a map field from JSON.
       * @param {string} name Field name
       * @param {Object} json JSON object
       * @returns {MapField} Created map field
       * @throws {TypeError} If arguments are invalid
       */
      static fromJSON(name: string, json: Object): MapField;
   
   }
   
   /**
    * Constructs a new service method.
    * @classdesc Reflected service method.
    * @extends ReflectionObject
    * @constructor
    * @param {string} name Method name
    * @param {string|undefined} type Method type, usually `"rpc"`
    * @param {string} requestType Request message type
    * @param {string} responseType Response message type
    * @param {boolean|Object} [requestStream] Whether the request is streamed
    * @param {boolean|Object} [responseStream] Whether the response is streamed
    * @param {Object} [options] Declared options
    */
   class Method extends ReflectionObject {
      /**
       * Constructs a new service method.
       * @classdesc Reflected service method.
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Method name
       * @param {string|undefined} type Method type, usually `"rpc"`
       * @param {string} requestType Request message type
       * @param {string} responseType Response message type
       * @param {boolean|Object} [requestStream] Whether the request is streamed
       * @param {boolean|Object} [responseStream] Whether the response is streamed
       * @param {Object} [options] Declared options
       */
      constructor(name: string, type: (string|undefined), requestType: string, responseType: string, requestStream?: (boolean|Object), responseStream?: (boolean|Object), options?: Object);
   
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
       * Resolved request type.
       * @type {?Type}
       */
      resolvedRequestType: Type;
   
      /**
       * Resolved response type.
       * @type {?Type}
       */
      resolvedResponseType: Type;
   
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
    * Constructs a new namespace.
    * @classdesc Reflected namespace and base class of all reflection objects containing nested objects.
    * @extends ReflectionObject
    * @constructor
    * @param {string} name Namespace name
    * @param {Object} [options] Declared options
    */
   class Namespace extends ReflectionObject {
      /**
       * Constructs a new namespace.
       * @classdesc Reflected namespace and base class of all reflection objects containing nested objects.
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Namespace name
       * @param {Object} [options] Declared options
       */
      constructor(name: string, options?: Object);
   
      /**
       * Nested objects by name.
       * @type {Object.<string,ReflectionObject>|undefined}
       */
      nested: ({ [k: string]: ReflectionObject }|undefined);
   
      /**
       * Nested objects of this namespace as an array for iteration.
       * @name Namespace#nestedArray
       * @type {ReflectionObject[]}
       * @readonly
       */
      nestedArray: ReflectionObject[];
   
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
       * Converts an array of reflection objects to JSON.
       * @memberof Namespace
       * @param {ReflectionObject[]} array Object array
       * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
       */
      static arrayToJSON(array: ReflectionObject[]): ({ [k: string]: any }|undefined);
   
      /**
       * Adds nested elements to this namespace from JSON.
       * @param {Object.<string,*>} nestedJson Nested JSON
       * @returns {Namespace} `this`
       */
      addJSON(nestedJson: { [k: string]: any }): Namespace;
   
      /**
       * Gets the nested object of the specified name.
       * @param {string} name Nested object name
       * @returns {?ReflectionObject} The reflection object or `null` if it doesn't exist
       */
      get(name: string): ReflectionObject;
   
      /**
       * Adds a nested object to this namespace.
       * @param {ReflectionObject} object Nested object to add
       * @returns {Namespace} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If there is already a nested object with this name
       */
      add(object: ReflectionObject): Namespace;
   
      /**
       * Removes a nested object from this namespace.
       * @param {ReflectionObject} object Nested object to remove
       * @returns {Namespace} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If `object` is not a member of this namespace
       */
      remove(object: ReflectionObject): Namespace;
   
      /**
       * Defines additial namespaces within this one if not yet existing.
       * @param {string|string[]} path Path to create
       * @param {*} [json] Nested types to create from JSON
       * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
       */
      define(path: (string|string[]), json?: any): Namespace;
   
      /**
       * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree.
       * @returns {Namespace} `this`
       */
      resolveAll(): Namespace;
   
      /**
       * Looks up the reflection object at the specified path, relative to this namespace.
       * @param {string|string[]} path Path to look up
       * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
       * @returns {?ReflectionObject} Looked up object or `null` if none could be found
       */
      lookup(path: (string|string[]), parentAlreadyChecked?: boolean): ReflectionObject;
   
   }
   
   /**
    * Constructs a new reflection object.
    * @classdesc Base class of all reflection objects.
    * @constructor
    * @param {string} name Object name
    * @param {Object} [options] Declared options
    * @abstract
    */
   abstract class ReflectionObject {
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
       * Reference to the root namespace.
       * @name ReflectionObject#root
       * @type {Root}
       * @readonly
       */
      root: Root;
   
      /**
       * Full name including leading dot.
       * @name ReflectionObject#fullName
       * @type {string}
       * @readonly
       */
      fullName: string;
   
      /**
       * Lets the specified constructor extend this class.
       * @memberof ReflectionObject
       * @param {Function} constructor Extending constructor
       * @returns {Object} Prototype
       * @this ReflectionObject
       */
      static extend(constructor: any): Object;
   
      /**
       * Converts this reflection object to its JSON representation.
       * @returns {Object} JSON object
       * @abstract
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
       * @returns {ReflectionObject} `this`
       */
      resolve(): ReflectionObject;
   
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
       * @returns {ReflectionObject} `this`
       */
      setOption(name: string, value: any, ifNotSet?: boolean): ReflectionObject;
   
      /**
       * Sets multiple options.
       * @param {Object.<string,*>} options Options to set
       * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
       * @returns {ReflectionObject} `this`
       */
      setOptions(options: { [k: string]: any }, ifNotSet?: boolean): ReflectionObject;
   
      /**
       * Converts this instance to its string representation.
       * @returns {string} Constructor name, space, full name
       */
      toString(): string;
   
   }
   
   /**
    * Constructs a new oneof.
    * @classdesc Reflected oneof.
    * @extends ReflectionObject
    * @constructor
    * @param {string} name Oneof name
    * @param {string[]|Object} [fieldNames] Field names
    * @param {Object} [options] Declared options
    */
   class OneOf extends ReflectionObject {
      /**
       * Constructs a new oneof.
       * @classdesc Reflected oneof.
       * @extends ReflectionObject
       * @constructor
       * @param {string} name Oneof name
       * @param {string[]|Object} [fieldNames] Field names
       * @param {Object} [options] Declared options
       */
      constructor(name: string, fieldNames?: (string[]|Object), options?: Object);
   
      /**
       * Upper cased name for getter/setter calls.
       * @type {string}
       */
      ucName: string;
   
      /**
       * Field names that belong to this oneof.
       * @type {string[]}
       */
      oneof: string[];
   
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
       * @param {Field} field Field to add
       * @returns {OneOf} `this`
       */
      add(field: Field): OneOf;
   
      /**
       * Removes a field from this oneof.
       * @param {Field} field Field to remove
       * @returns {OneOf} `this`
       */
      remove(field: Field): OneOf;
   
   }
   
   /**
    * Result object returned from {@link parse}.
    * @typedef ParserResult
    * @type {Object}
    * @property {string|undefined} package Package name, if declared
    * @property {string[]|undefined} imports Imports, if any
    * @property {string[]|undefined} weakImports Weak imports, if any
    * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
    * @property {Root} root Populated root instance
    */
   interface ParserResult {
      package: (string|undefined);
      imports: (string[]|undefined);
      weakImports: (string[]|undefined);
      syntax: (string|undefined);
      root: Root;
   }
   
   
   /**
    * Parses the given .proto source and returns an object with the parsed contents.
    * @param {string} source Source contents
    * @param {Root} [root] Root to populate
    * @returns {ParserResult} Parser result
    */
   function parse(source: string, root?: Root): ParserResult;
   
   /**
    * Options passed to the {@link Prototype|prototype constructor}, modifying its behavior.
    * @typedef PrototypeOptions
    * @type {Object}
    * @property {boolean} [fieldsOnly=false] Sets only properties that reference a field
    */
   interface PrototypeOptions {
      fieldsOnly: boolean;
   }
   
   
   /**
    * Constructs a new prototype.
    * This method should be called from your custom constructors, i.e. `Prototype.call(this, properties)`.
    * @classdesc Runtime message prototype ready to be extended by custom classes or generated code.
    * @constructor
    * @param {Object.<string,*>} [properties] Properties to set
    * @param {PrototypeOptions} [options] Prototype options
    * @abstract
    * @see {@link inherits}
    * @see {@link Class}
    */
   abstract class Prototype {
      /**
       * Reference to the reflected type.
       * @name Prototype#$type
       * @type {Type}
       * @readonly
       */
      $type: Type;
   
      /**
       * Converts a runtime message to a JSON object.
       * @param {Object.<string,*>} [options] Conversion options
       * @param {boolean} [options.fieldsOnly=false] Converts only properties that reference a field
       * @param {Function} [options.long] Long conversion type. Only relevant with a long library.
       * Valid values are `String` and `Number` (the global types).
       * Defaults to a possibly unsafe number without, and a `Long` with a long library.
       * @param {Function} [options.enum=Number] Enum value conversion type.
       * Valid values are `String` and `Number` (the global types).
       * Defaults to the numeric ids.
       * @returns {Object.<string,*>} JSON object
       */
      asJSON(options?: { [k: string]: any }): { [k: string]: any };
   
   }
   
   /**
    * Constructs a new reader using the specified buffer.
    * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
    * @constructor
    * @param {Uint8Array} buffer Buffer to read from
    */
   class Reader {
      /**
       * Constructs a new reader using the specified buffer.
       * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
       * @constructor
       * @param {Uint8Array} buffer Buffer to read from
       */
      constructor(buffer: Uint8Array);
   
      /**
       * Configures the Reader interface according to the environment.
       * @memberof Reader
       * @returns {undefined}
       */
      static configure(): undefined;
   
      /**
       * Read buffer.
       * @type {Uint8Array}
       */
      buf: Uint8Array;
   
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
       * Creates a new reader using the specified buffer.
       * @param {Uint8Array} buffer Buffer to read from
       * @returns {BufferReader|Reader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
       */
      static create(buffer: Uint8Array): (BufferReader|Reader);
   
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
       * @name Reader#int64
       * @function
       * @returns {Long|number} Value read
       */
      int64(): (Long|number);
   
      /**
       * Reads a varint as an unsigned 64 bit value.
       * @name Reader#uint64
       * @function
       * @returns {Long|number} Value read
       */
      uint64(): (Long|number);
   
      /**
       * Reads a zig-zag encoded varint as a signed 64 bit value.
       * @name Reader#sint64
       * @function
       * @returns {Long|number} Value read
       */
      sint64(): (Long|number);
   
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
       * Reads fixed 64 bits.
       * @name Reader#fixed64
       * @function
       * @returns {Long|number} Value read
       */
      fixed64(): (Long|number);
   
      /**
       * Reads zig-zag encoded fixed 64 bits.
       * @name Reader#sfixed64
       * @function
       * @returns {Long|number} Value read
       */
      sfixed64(): (Long|number);
   
      /**
       * Reads a float (32 bit) as a number.
       * @function
       * @returns {number} Value read
       */
      float(): number;
   
      /**
       * Reads a double (64 bit float) as a number.
       * @function
       * @returns {number} Value read
       */
      double(): number;
   
      /**
       * Reads a sequence of bytes preceeded by its length as a varint.
       * @returns {Uint8Array} Value read
       */
      bytes(): Uint8Array;
   
      /**
       * Reads a string preceeded by its byte length as a varint.
       * @returns {string} Value read
       */
      string(): string;
   
      /**
       * Skips the specified number of bytes if specified, otherwise skips a varint.
       * @param {number} [length] Length if known, otherwise a varint is assumed
       * @returns {Reader} `this`
       */
      skip(length?: number): Reader;
   
      /**
       * Skips the next element of the specified wire type.
       * @param {number} wireType Wire type received
       * @returns {Reader} `this`
       */
      skipType(wireType: number): Reader;
   
      /**
       * Resets this instance and frees all resources.
       * @param {Uint8Array} [buffer] New buffer for a new sequence of read operations
       * @returns {Reader} `this`
       */
      reset(buffer?: Uint8Array): Reader;
   
      /**
       * Finishes the current sequence of read operations, frees all resources and returns the remaining buffer.
       * @param {Uint8Array} [buffer] New buffer for a new sequence of read operations
       * @returns {Uint8Array} Finished buffer
       */
      finish(buffer?: Uint8Array): Uint8Array;
   
   }
   
   /**
    * Constructs a new buffer reader.
    * @classdesc Wire format reader using node buffers.
    * @extends Reader
    * @constructor
    * @param {Buffer} buffer Buffer to read from
    */
   class BufferReader extends Reader {
      /**
       * Constructs a new buffer reader.
       * @classdesc Wire format reader using node buffers.
       * @extends Reader
       * @constructor
       * @param {Buffer} buffer Buffer to read from
       */
      constructor(buffer: Buffer);
   
   }
   
   /**
    * Constructs a new root namespace.
    * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
    * @extends Namespace
    * @constructor
    * @param {Object} [options] Top level options
    */
   class Root extends Namespace {
      /**
       * Constructs a new root namespace.
       * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
       * @extends Namespace
       * @constructor
       * @param {Object} [options] Top level options
       */
      constructor(options?: Object);
   
      /**
       * Deferred extension fields.
       * @type {Field[]}
       */
      deferred: Field[];
   
      /**
       * Resolved file names of loaded files.
       * @type {string[]}
       */
      files: string[];
   
      /**
       * Loads a JSON definition into a root namespace.
       * @param {*} json JSON definition
       * @param {Root} [root] Root namespace, defaults to create a new one if omitted
       * @returns {Root} Root namespace
       */
      static fromJSON(json: any, root?: Root): Root;
   
      /**
       * Resolves the path of an imported file, relative to the importing origin.
       * This method exists so you can override it with your own logic in case your imports are scattered over multiple directories.
       * @function
       * @param {string} origin The file name of the importing file
       * @param {string} target The file name being imported
       * @returns {string} Resolved path to `target`
       */
      resolvePath(origin: string, target: string): string;
   
      /**
       * Loads one or multiple .proto or preprocessed .json files into this root namespace.
       * @param {string|string[]} filename Names of one or multiple files to load
       * @param {function(?Error, Root=)} [callback] Node-style callback function
       * @returns {Promise<Root>|undefined} A promise if `callback` has been omitted
       * @throws {TypeError} If arguments are invalid
       */
      load(filename: (string|string[]), callback?: any): (Promise<Root>|undefined);
   
   }
   
   /**
    * Constructs a new service.
    * @classdesc Reflected service.
    * @extends Namespace
    * @constructor
    * @param {string} name Service name
    * @param {Object.<string,*>} [options] Service options
    * @throws {TypeError} If arguments are invalid
    */
   class Service extends Namespace {
      /**
       * Constructs a new service.
       * @classdesc Reflected service.
       * @extends Namespace
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
   
      /**
       * Methods of this service as an array for iteration.
       * @name Service#methodsArray
       * @type {Method[]}
       * @readonly
       */
      methodsArray: Method[];
   
      /**
       * Tests if the specified JSON object describes a service.
       * @param {Object} json JSON object to test
       * @returns {boolean} `true` if the object describes a service
       */
      static testJSON(json: Object): boolean;
   
      /**
       * Constructs a service from JSON.
       * @param {string} name Service name
       * @param {Object} json JSON object
       * @returns {Service} Created service
       * @throws {TypeError} If arguments are invalid
       */
      static fromJSON(name: string, json: Object): Service;
   
      /**
       * Creates a runtime service using the specified rpc implementation.
       * @param {function(Method, Uint8Array, function)} rpc RPC implementation ({@link RPCImpl|see})
       * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
       * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
       * @returns {Object} Runtime service
       */
      create(rpc: any, requestDelimited?: boolean, responseDelimited?: boolean): Object;
   
   }
   
   /**
    * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
    * @typedef RPCImpl
    * @function
    * @param {Method} method Reflected method being called
    * @param {Uint8Array} requestData Request data
    * @param {function(?Error, Uint8Array=)} callback Node-style callback called with the error, if any, and the response data
    * @returns {undefined}
    */
   function RPCImpl(method: Method, requestData: Uint8Array, callback: any): undefined;
   
   /**
    * Handle object returned from {@link tokenize}.
    * @typedef {Object} TokenizerHandle
    * @property {function():number} line Gets the current line number
    * @property {function():?string} next Gets the next token and advances (`null` on eof)
    * @property {function():?string} peek Peeks for the next token (`null` on eof)
    * @property {function(string)} push Pushes a token back to the stack
    * @property {function(string, boolean=):boolean} skip Skips a token, returns its presence and advances or, if non-optional and not present, throws
    */
   interface TokenizerHandle {
      line: any;
      next: any;
      peek: any;
      push: any;
      skip: any;
   }
   
   
   /**
    * Tokenizes the given .proto source and returns an object with useful utility functions.
    * @param {string} source Source contents
    * @returns {TokenizerHandle} Tokenizer handle
    */
   function tokenize(source: string): TokenizerHandle;
   
   /**
    * Constructs a new message type.
    * @classdesc Reflected message type.
    * @extends Namespace
    * @constructor
    * @param {string} name Message name
    * @param {Object} [options] Declared options
    */
   class Type extends Namespace {
      /**
       * Constructs a new message type.
       * @classdesc Reflected message type.
       * @extends Namespace
       * @constructor
       * @param {string} name Message name
       * @param {Object} [options] Declared options
       */
      constructor(name: string, options?: Object);
   
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
       * Message fields by id.
       * @name Type#fieldsById
       * @type {Object.<number,Field>}
       * @readonly
       */
      fieldsById: { [k: number]: Field };
   
      /**
       * Fields of this message as an array for iteration.
       * @name Type#fieldsArray
       * @type {Field[]}
       * @readonly
       */
      fieldsArray: Field[];
   
      /**
       * Oneofs of this message as an array for iteration.
       * @name Type#oneofsArray
       * @type {OneOf[]}
       * @readonly
       */
      oneofsArray: OneOf[];
   
      /**
       * The registered constructor, if any registered, otherwise a generic constructor.
       * @name Type#ctor
       * @type {Prototype}
       */
      ctor: Prototype;
   
      /**
       * Tests if the specified JSON object describes a message type.
       * @param {*} json JSON object to test
       * @returns {boolean} `true` if the object describes a message type
       */
      static testJSON(json: any): boolean;
   
      /**
       * Creates a type from JSON.
       * @param {string} name Message name
       * @param {Object} json JSON object
       * @returns {Type} Created message type
       */
      static fromJSON(name: string, json: Object): Type;
   
      /**
       * Adds a nested object to this type.
       * @param {ReflectionObject} object Nested object to add
       * @returns {Type} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
       */
      add(object: ReflectionObject): Type;
   
      /**
       * Removes a nested object from this type.
       * @param {ReflectionObject} object Nested object to remove
       * @returns {Type} `this`
       * @throws {TypeError} If arguments are invalid
       * @throws {Error} If `object` is not a member of this type
       */
      remove(object: ReflectionObject): Type;
   
      /**
       * Creates a new message of this type using the specified properties.
       * @param {Object|?Function} [properties] Properties to set
       * @param {?Function} [ctor] Constructor to use.
       * Defaults to use the internal constuctor.
       * @returns {Prototype} Message instance
       */
      create(properties?: (Object|any), ctor?: any): Prototype;
   
      /**
       * Encodes a message of this type.
       * @param {Prototype|Object} message Message instance or plain object
       * @param {Writer} [writer] Writer to encode to
       * @returns {Writer} writer
       */
      encode(message: (Prototype|Object), writer?: Writer): Writer;
   
      /**
       * Encodes a message of this type preceeded by its byte length as a varint.
       * @param {Prototype|Object} message Message instance or plain object
       * @param {Writer} [writer] Writer to encode to
       * @returns {Writer} writer
       */
      encodeDelimited(message: (Prototype|Object), writer?: Writer): Writer;
   
      /**
       * Decodes a message of this type.
       * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
       * @param {number} [length] Length of the message, if known beforehand
       * @returns {Prototype} Decoded message
       */
      decode(readerOrBuffer: (Reader|Uint8Array), length?: number): Prototype;
   
      /**
       * Decodes a message of this type preceeded by its byte length as a varint.
       * @param {Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
       * @returns {Prototype} Decoded message
       */
      decodeDelimited(readerOrBuffer: (Reader|Uint8Array)): Prototype;
   
      /**
       * Verifies that enum values are valid and that any required fields are present.
       * @param {Prototype|Object} message Message to verify
       * @returns {?string} `null` if valid, otherwise the reason why it is not
       */
      verify(message: (Prototype|Object)): string;
   
   }
   
   /**
    * Common type constants.
    * @namespace
    */
   module types {
      /**
       * Basic type wire types.
       * @type {Object.<string,number>}
       */
      var basic: { [k: string]: number };
   
      /**
       * Basic type defaults.
       * @type {Object.<string,*>}
       */
      var defaults: { [k: string]: any };
   
      /**
       * Basic long type wire types.
       * @type {Object.<string,number>}
       */
      var long: { [k: string]: number };
   
      /**
       * Allowed types for map keys with their associated wire type.
       * @type {Object.<string,number>}
       */
      var mapKey: { [k: string]: number };
   
      /**
       * Allowed types for packed repeated fields with their associated wire type.
       * @type {Object.<string,number>}
       */
      var packed: { [k: string]: number };
   
   }
   
   /**
    * Utility functions.
    * @namespace
    */
   module util {
      /**
       * Programmatically generates a function.
       * @memberof util
       * @param {...string} params Function parameter names
       * @returns {util.CodegenAppender} Printf-like appender function
       * @property {boolean} supported Whether code generation is supported by the environment.
       * @property {boolean} verbose=false When set to true, codegen will log generated code to console. Useful for debugging.
       */
      function codegen(params: string): util.CodegenAppender;
   
      /**
       * Appends a printf-like formatted line to the generated source. Returned when calling {@link util.codegen}.
       * @typedef CodegenAppender
       * @memberof util
       * @type {function}
       * @param {string} format A printf-like format string
       * @param {...*} params Format replacements
       * @returns {util.CodegenAppender} Itself
       * @property {util.CodegenStringer} str
       * @property {util.CodegenEnder} eof
       * @see {@link https://nodejs.org/docs/latest/api/util.html#util_util_format_format_args}
       */
      type CodegenAppender = (format: string, params: any) => util.CodegenAppender;
   
      /**
       * Stringifies the so far generated function source.
       * @typedef CodegenStringer
       * @memberof util
       * @type {function}
       * @param {string} [name] Function name, defaults to generate an anonymous function
       * @returns {string} Function source using tabs for indentation
       */
      type CodegenStringer = (name?: string) => string;
   
      /**
       * Ends generation and builds the function.
       * @typedef CodegenEnder
       * @memberof util
       * @type {function}
       * @param {string} [name] Function name, defaults to generate an anonymous function
       * @param {Object|string[]} [scope] Function scope
       * @returns {function} A function to apply the scope manually when `scope` is an array, otherwise the generated function with scope applied
       */
      type CodegenEnder = (name?: string, scope?: (Object|string[])) => any;
   
      /**
       * Constructs new long bits.
       * @classdesc Helper class for working with the low and high bits of a 64 bit value.
       * @memberof util
       * @constructor
       * @param {number} lo Low bits
       * @param {number} hi High bits
       */
      class LongBits {
          /**
           * Constructs new long bits.
           * @classdesc Helper class for working with the low and high bits of a 64 bit value.
           * @memberof util
           * @constructor
           * @param {number} lo Low bits
           * @param {number} hi High bits
           */
          constructor(lo: number, hi: number);
   
          /**
           * Low bits.
           * @type {number}
           */
          lo: number;
   
          /**
           * High bits.
           * @type {number}
           */
          hi: number;
   
          /**
           * Zero bits.
           * @memberof util.LongBits
           * @type {util.LongBits}
           */
          static zero: util.LongBits;
   
          /**
           * Constructs new long bits from the specified number.
           * @param {number} value Value
           * @returns {util.LongBits} Instance
           */
          static fromNumber(value: number): util.LongBits;
   
          /**
           * Constructs new long bits from a number, long or string.
           * @param {Long|number|string} value Value
           * @returns {util.LongBits} Instance
           * @throws {TypeError} If `value` is a string and no long library is present.
           */
          static from(value: (Long|number|string)): util.LongBits;
   
          /**
           * Converts this long bits to a possibly unsafe JavaScript number.
           * @param {boolean} [unsigned=false] Whether unsigned or not
           * @returns {number} Possibly unsafe number
           */
          toNumber(unsigned?: boolean): number;
   
          /**
           * Converts this long bits to a long.
           * @param {boolean} [unsigned=false] Whether unsigned or not
           * @returns {Long} Long
           */
          toLong(unsigned?: boolean): Long;
   
          /**
           * Constructs new long bits from the specified 8 characters long hash.
           * @param {string} hash Hash
           * @returns {util.LongBits} Bits
           */
          static fromHash(hash: string): util.LongBits;
   
          /**
           * Converts this long bits to a 8 characters long hash.
           * @returns {string} Hash
           */
          toHash(): string;
   
          /**
           * Zig-zag encodes this long bits.
           * @returns {util.LongBits} `this`
           */
          zzEncode(): util.LongBits;
   
          /**
           * Zig-zag decodes this long bits.
           * @returns {util.LongBits} `this`
           */
          zzDecode(): util.LongBits;
   
          /**
           * Calculates the length of this longbits when encoded as a varint.
           * @returns {number} Length
           */
          length(): number;
   
      }
   
      /**
       * Whether running within node or not.
       * @memberof util
       * @type {boolean}
       */
      var isNode: boolean;
   
      /**
       * Optional buffer class to use.
       * If you assign any compatible buffer implementation to this property, the library will use it.
       * @type {?Function}
       */
      var Buffer: any;
   
      /**
       * Optional Long class to use.
       * If you assign any compatible long implementation to this property, the library will use it.
       * @type {?Function}
       */
      var Long: any;
   
      /**
       * Converts a number or long to an 8 characters long hash string.
       * @param {Long|number} value Value to convert
       * @returns {string} Hash
       */
      function longToHash(value: (Long|number)): string;
   
      /**
       * Converts an 8 characters long hash string to a long or number.
       * @param {string} hash Hash
       * @param {boolean} [unsigned=false] Whether unsigned or not
       * @returns {Long|number} Original value
       */
      function longFromHash(hash: string, unsigned?: boolean): (Long|number);
   
      /**
       * Tests if two possibly long values are not equal.
       * @param {number|Long} a First value
       * @param {number|Long} b Second value
       * @returns {boolean} `true` if not equal
       */
      function longNeq(a: (number|Long), b: (number|Long)): boolean;
   
      /**
       * Defines the specified properties on the specified target. Also adds getters and setters for non-ES5 environments.
       * @param {Object} target Target object
       * @param {Object} descriptors Property descriptors
       * @returns {undefined}
       */
      function props(target: Object, descriptors: Object): undefined;
   
      /**
       * Defines the specified property on the specified target. Also adds getters and setters for non-ES5 environments.
       * @param {Object} target Target object
       * @param {string} key Property name
       * @param {Object} descriptor Property descriptor
       * @returns {undefined}
       */
      function prop(target: Object, key: string, descriptor: Object): undefined;
   
      /**
       * Tests if the specified value is a string.
       * @memberof util
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
       * Tests if the specified value is an integer.
       * @function
       * @param {*} value Value to test
       * @returns {boolean} `true` if the value is an integer
       */
      function isInteger(value: any): boolean;
   
      /**
       * Converts an object's values to an array.
       * @param {Object.<string,*>} object Object to convert
       * @returns {*[]} Converted array
       */
      function toArray(object: { [k: string]: any }): any[];
   
      /**
       * Returns a promise from a node-style function.
       * @memberof util
       * @param {function(Error, ...*)} fn Function to call
       * @param {Object} ctx Function context
       * @param {...*} params Function arguments
       * @returns {Promise<*>} Promisified function
       */
      function asPromise(fn: any, ctx: Object, params: any): Promise<any>;
   
      /**
       * Fetches the contents of a file.
       * @memberof util
       * @param {string} path File path or url
       * @param {function(?Error, string=)} [callback] Node-style callback
       * @returns {Promise<string>|undefined} A Promise if `callback` has been omitted
       */
      function fetch(path: string, callback?: any): (Promise<string>|undefined);
   
      /**
       * Tests if the specified path is absolute.
       * @memberof util
       * @param {string} path Path to test
       * @returns {boolean} `true` if path is absolute
       */
      function isAbsolutePath(path: string): boolean;
   
      /**
       * Normalizes the specified path.
       * @memberof util
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
       * Merges the properties of the source object into the destination object.
       * @param {Object} dst Destination object
       * @param {Object} src Source object
       * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
       * @returns {Object} Destination object
       */
      function merge(dst: Object, src: Object, ifNotSet?: boolean): Object;
   
      /**
       * Returns a safe property accessor for the specified properly name.
       * @param {string} prop Property name
       * @returns {string} Safe accessor
       */
      function safeProp(prop: string): string;
   
      /**
       * Creates a new buffer of whatever type supported by the environment.
       * @param {number} [size=0] Buffer size
       * @returns {Uint8Array} Buffer
       */
      function newBuffer(size?: number): Uint8Array;
   
   }
   
   /**
    * Runtime message verifier using code generation on top of reflection.
    * @namespace
    */
   module verifier {
      /**
       * Verifies a runtime message of `this` message type.
       * @param {Prototype|Object} message Runtime message or plain object to verify
       * @returns {?string} `null` if valid, otherwise the reason why it is not
       * @this {Type}
       */
      function fallback(message: (Prototype|Object)): string;
   
      /**
       * Generates a verifier specific to the specified message type.
       * @param {Type} mtype Message type
       * @returns {util.CodegenAppender} Unscoped codegen instance
       */
      function generate(mtype: Type): util.CodegenAppender;
   
   }
   
   /**
    * Constructs a new writer.
    * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
    * @constructor
    */
   class Writer {
      /**
       * Constructs a new writer.
       * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
       * @constructor
       */
      constructor();
   
      /**
       * Current length.
       * @type {number}
       */
      len: number;
   
      /**
       * Operations head.
       * @type {Object}
       */
      head: Object;
   
      /**
       * Operations tail
       * @type {Object}
       */
      tail: Object;
   
      /**
       * Linked forked states.
       * @type {?Object}
       */
      states: Object;
   
      /**
       * Creates a new writer.
       * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
       */
      static create(): (BufferWriter|Writer);
   
      /**
       * Pushes a new operation to the queue.
       * @param {function(Uint8Array, number, *)} fn Function to call
       * @param {number} len Value byte length
       * @param {number} val Value to write
       * @returns {Writer} `this`
       */
      push(fn: any, len: number, val: number): Writer;
   
      /**
       * Writes a tag.
       * @param {number} id Field id
       * @param {number} wireType Wire type
       * @returns {Writer} `this`
       */
      tag(id: number, wireType: number): Writer;
   
      /**
       * Writes an unsigned 32 bit value as a varint.
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */
      uint32(value: number): Writer;
   
      /**
       * Writes a signed 32 bit value as a varint.
       * @function
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */
      int32(value: number): Writer;
   
      /**
       * Writes a 32 bit value as a varint, zig-zag encoded.
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */
      sint32(value: number): Writer;
   
      /**
       * Writes an unsigned 64 bit value as a varint.
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */
      uint64(value: (Long|number|string)): Writer;
   
      /**
       * Writes a signed 64 bit value as a varint.
       * @function
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */
      int64(value: (Long|number|string)): Writer;
   
      /**
       * Writes a signed 64 bit value as a varint, zig-zag encoded.
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */
      sint64(value: (Long|number|string)): Writer;
   
      /**
       * Writes a boolish value as a varint.
       * @param {boolean} value Value to write
       * @returns {Writer} `this`
       */
      bool(value: boolean): Writer;
   
      /**
       * Writes a 32 bit value as fixed 32 bits.
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */
      fixed32(value: number): Writer;
   
      /**
       * Writes a 32 bit value as fixed 32 bits, zig-zag encoded.
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */
      sfixed32(value: number): Writer;
   
      /**
       * Writes a 64 bit value as fixed 64 bits.
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */
      fixed64(value: (Long|number|string)): Writer;
   
      /**
       * Writes a 64 bit value as fixed 64 bits, zig-zag encoded.
       * @param {Long|number|string} value Value to write
       * @returns {Writer} `this`
       * @throws {TypeError} If `value` is a string and no long library is present.
       */
      sfixed64(value: (Long|number|string)): Writer;
   
      /**
       * Writes a float (32 bit).
       * @function
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */
      float(value: number): Writer;
   
      /**
       * Writes a double (64 bit float).
       * @function
       * @param {number} value Value to write
       * @returns {Writer} `this`
       */
      double(value: number): Writer;
   
      /**
       * Writes a sequence of bytes.
       * @param {Uint8Array} value Value to write
       * @returns {Writer} `this`
       */
      bytes(value: Uint8Array): Writer;
   
      /**
       * Writes a string.
       * @param {string} value Value to write
       * @returns {Writer} `this`
       */
      string(value: string): Writer;
   
      /**
       * Forks this writer's state by pushing it to a stack.
       * Calling {@link Writer#ldelim}, {@link Writer#reset} or {@link Writer#finish} resets the writer to the previous state.
       * @returns {Writer} `this`
       */
      fork(): Writer;
   
      /**
       * Resets this instance to the last state.
       * @returns {Writer} `this`
       */
      reset(): Writer;
   
      /**
       * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
       * @param {number} [id] Id with wire type 2 to prepend where applicable
       * @returns {Writer} `this`
       */
      ldelim(id?: number): Writer;
   
      /**
       * Finishes the current sequence of write operations and frees all resources.
       * @returns {Uint8Array} Finished buffer
       */
      finish(): Uint8Array;
   
   }
   
   /**
    * Constructs a new buffer writer.
    * @classdesc Wire format writer using node buffers.
    * @exports BufferWriter
    * @extends Writer
    * @constructor
    */
   class BufferWriter extends Writer {
      /**
       * Constructs a new buffer writer.
       * @classdesc Wire format writer using node buffers.
       * @exports BufferWriter
       * @extends Writer
       * @constructor
       */
      constructor();
   
   }
   
   
}
