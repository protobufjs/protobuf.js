var Namespace = require("./namespace"),
    Type      = require("./type"),
    Field     = require("./field"),
    OneOf     = require("./oneof"),
    Enum      = require("./enum"),
    parse     = require("./parse"),
    util      = require("./util");

module.exports = Root;

/**
 * Root namespace.
 * @extends Namespace
 * @constructor
 * @param {!Object.<string,*>} [contextOptions] Context options
 * @param {!Object.<string,*>} [options] Namespace options
 */
function Root(contextOptions, options) {
    Namespace.call(this, "", options);

    if (!contextOptions)
        contextOptions = {};

    /**
     * Already loaded file names.
     * @type {!Array.<string>}
     * @private
     */
    this._loaded = []; // use addLoaded/isLoaded instead

    /**
     * Deferred extension fields that have not yet been added to their extended type and are still
     * unresolved.
     * @type {!Array.<!Field>}
     * @private
     */
    this._extends = [];

    /**
     * Deferred extension fields that have been resolved but not yet been added to their extended
     * type.
     * @type {!Object.<string,!Array<!Field>>}
     * @private
     */
    this._resolvedExtends = {};

    if (!contextOptions.noGoogleTypes)
        importGoogleTypes(this, false);
}

var RootPrototype = Namespace.extend(Root);

/**
 * Checks if a specific file has already been loaded.
 * @param {string} filename File name to test
 * @returns {boolean} `true` if already loaded
 */
RootPrototype.isLoaded = function isLoaded(filename) {
    filename = util.normalizePath(filename);
    var index = filename.indexOf("google/protobuf/");
    if (index > 0 /* not -1 */)
        filename = filename.substring(index);
    return this._loaded.indexOf(filename) > -1;
};

/**
 * Lets the root know of a loaded file, i.e. when added programmatically.
 * @param {string} filename File name to add
 * @returns {boolean} `false` if this file has already been loaded before
 */
RootPrototype.addLoaded = function addLoaded(filename) {
    if (this.isLoaded(filename))
        return false;
    filename = util.normalizePath(filename);
    this._loaded.push(filename);
    return true;
};

/**
 * Imports common google types to the specified root.
 * @memberof Root
 * @param {!Root} root The root to import to
 * @param {boolean} [visible] Whether visible when exporting definitions. Defaults to inherit from parent.
 * @returns {undefined}
 */
function importGoogleTypes(root, visible) {

    var bool     = "bool",
        int32    = "int32",
        uint32   = "u"+int32,
        int64    = "int64",
        uint64   = "u"+int64,
        float    = "float",
        double   = "double",
        string   = "string",
        bytes    = "bytes",
        repeated = "repeated",
        value    = "value",
        name     = "name",
        number   = "number",
        options  = "options",
        seconds  = "seconds",
        nanos    = "nanos";

    // NOTE: It is important to create new instances for each root
    var types = {

        "empty": [

            new Type("Empty")
        ],
        "any": [

            new Type("Any")
            .add(new Field("type_url", 1, string))
            .add(new Field( value    , 2, bytes))
        ],
        "timestamp": [

            new Type("Timestamp")
            .add(new Field(seconds, 1, int64))
            .add(new Field(nanos  , 2, int32))
        ],
        "duration": [

            new Type("Duration")
            .add(new Field(seconds, 1, int64))
            .add(new Field(nanos  , 2, int32))
        ],
        "wrappers": [

            new Type("DoubleValue")
            .add(new Field(value, 1, double)),

            new Type("FloatValue")
            .add(new Field(value, 1, float)),

            new Type("Int64Value")
            .add(new Field(value, 1, int64)),

            new Type("UInt64Value")
            .add(new Field(value, 1, uint64)),

            new Type("Int32Value")
            .add(new Field(value, 1, int32)),

            new Type("UInt32Value")
            .add(new Field(value, 1, uint32)),

            new Type("BoolValue")
            .add(new Field(value, 1, bool)),

            new Type("StringValue")
            .add(new Field(value, 1, string)),

            new Type("BytesValue")
            .add(new Field(value, 1, bytes))
        ],
        "struct": [

            new Type("Value")
            .add(new OneOf("kind")
                .add(new Field("null_"       + value, 1, "NullValue"))
                .add(new Field( number + "_" + value, 2,  double))
                .add(new Field( string + "_" + value, 3,  string))
                .add(new Field( bool   + "_" + value, 4,  bool))
                .add(new Field("struct_"     + value, 5, "Struct"))
                .add(new Field("list_"       + value, 6, "ListValue"))
            ),
            new Enum("NullValue", { NULL_VALUE: 0 }),

            new Type("ListValue")
            .add(new Field("values", 1, "Value", repeated))
        ],
        "source_context": [

            new Type("SourceContext")
            .add(new Field("file_name", 1, string))
        ],
        "type": [

            new Type("Type")
            .add(new Field( name           , 1, string))
            .add(new Field("fields"        , 2, "Field", repeated))
            .add(new Field("oneofs"        , 3, string, repeated))
            .add(new Field( options        , 4, "Option", repeated))
            .add(new Field("source_context", 5, "SourceContext"))
            .add(new Field("syntax"        , 6, "Syntax")),

            new Type("Field")
            .add(new Enum("Kind", {
                TYPE_UNKNOWN  : 0,
                TYPE_DOUBLE   : 1,
                TYPE_FLOAT    : 2,
                TYPE_INT64    : 3,
                TYPE_UINT64   : 4,
                TYPE_INT32    : 5,
                TYPE_FIXED64  : 6,
                TYPE_FIXED32  : 7,
                TYPE_BOOL     : 8,
                TYPE_STRING   : 9,
                TYPE_GROUP    : 10,
                TYPE_MESSAGE  : 11,
                TYPE_BYTES    : 12,
                TYPE_UINT32   : 13,
                TYPE_ENUM     : 14,
                TYPE_SFIXED32 : 15,
                TYPE_SFIXED64 : 16,
                TYPE_SINT32   : 17,
                TYPE_SINT64   : 18
            }))
            .add(new Enum("Cardinality", {
                CARDINALITY_UNKNOWN  : 0,
                CARDINALITY_OPTIONAL : 1,
                CARDINALITY_REQUIRED : 2,
                CARDINALITY_REPEATED : 3
            }))
            .add(new Field("kind"         , 1 , "Kind"))
            .add(new Field("cardinality"  , 2 , "Cardinality"))
            .add(new Field( number        , 3 ,  int32))
            .add(new Field( name          , 4 ,  string))
            .add(new Field("type_url"     , 6 ,  string))
            .add(new Field("oneof_index"  , 7 ,  int32))
            .add(new Field("packed"       , 8 ,  bool))
            .add(new Field( options       , 9 , "Option"))
            .add(new Field("json_name"    , 10,  string))
            .add(new Field("default_value", 11,  string)),

            new Type("Enum")
            .add(new Field( name           , 1,  string))
            .add(new Field("enum" + value  , 2, "EnumValue", repeated))
            .add(new Field( options        , 3, "Option", repeated))
            .add(new Field("source_context", 4, "SourceContext"))
            .add(new Field("syntax"        , 5, "Syntax")),

            new Type("EnumValue")
            .add(new Field( name    , 1,  string))
            .add(new Field( number  , 2,  int32))
            .add(new Field( options , 3, "Option", repeated )),

            new Type("Option")
            .add(new Field(name , 1,  string ))
            .add(new Field(value, 2, "Any"   )),

            new Enum("Syntax", { SYNTAX_PROTO2 : 0, SYNTAX_PROTO3 : 1 })
        ],
        "field_mask": [

            new Type("FieldMask")
            .add(new Field("paths", 1, string, repeated))
        ]
    };

    var google_protobuf = root.define([ "google", "protobuf" ], visible);
    Object.keys(types).forEach(function(protoName) {
        if (!root.addLoaded("google/protobuf/" + protoName + ".proto"))
            return;
        types[protoName].forEach(function(type) {
            google_protobuf.add(type);
        });
    });
}

Root.importGoogleTypes = importGoogleTypes;

/**
 * Loads one or multiple .proto files into a common root namespace.
 * @param {string|!Array.<string>} filename Names of one or multiple files to load
 * @param {!function(Error, ?Root)} [callback] Node-style callback function
 * @param {!Object} [ctx] Optional callback context
 * @returns {!Promise|undefined} A promise if callback has been omitted, otherwise `undefined`
 * @throws {TypeError} If arguments are invalid
 */
RootPrototype.load = function load(filename, callback, ctx) { // eslint-disable-line consistent-return
    var self = this;
    if (!callback)
        return util.asPromise(load, filename);
    if (!util.isFunction(parse))
        parse = require("./parse");

    // Finishes loading by calling the callback (exactly once)
    function finish(err, root) {
        if (!callback)
            return;
        var cb = callback;
        callback = null;
        cb.call(ctx || self, err, root);
    }

    // Processes a single file
    function process(origin, source, visible) {
        try {
            var parsed = parse(source, self, visible);
            if (parsed.publicImports)
                parsed.publicImports.forEach(function(file) {
                    fetch(util.resolvePath(origin, file), visible, false);
                });
            if (parsed.imports)
                parsed.imports.forEach(function(file) {
                    fetch(util.resolvePath(origin, file), false, false);
                });
            if (parsed.weakImports)
                parsed.weakImports.forEach(function(file) {
                    fetch(util.resolvePath(origin, file), false, true);
                });
            if (!queued)
                finish(null, self);
        } catch (err) {
            finish(err);
        }
    }

    // Fetches a single file
    function fetch(file, visible, weak) {
        if (!self.addLoaded(file))
            return;
        ++queued;
        util.fetch(file, function(err, source) {
            --queued;
            if (!callback)
                return;
            if (!err) {
                process(file, source, visible);
                return;
            }
            if (!weak)
                finish(err);
        });
    }
    var queued = 0;

    // Assembling the root namespace doesn't require working type
    // references anymore, so we can load everything in parallel
    if (util.isArray(filename))
        filename.forEach(function(file) {
            fetch(file, true, false);
        });
    else if (util.isString(filename))
        fetch(filename, true, false);
    else
        throw util._TypeError("filename", "string or array");

    if (!queued)
        finish(null);
};

/**
 * Resolves any deferred extended fields that have not yet been added to their extended type.
 * @returns {!Root} this
 */
RootPrototype.resolveExtends = function resolveExtends() {
    while (this._extends.length) {
        var field = this._extends.shift(),
            extendedType = field.parent.lookup(field.extend);
        if (extendedType && extendedType.root === this) {
            var fullName = extendedType.fullName;
            field.extend = fullName;
            (this._resolvedExtends[fullName] || (this._resolvedExtends[fullName] = [])).push(field);
        }
    }
    return this;
};

/**
 * Called when any object is added to this root or its sub-namespaces.
 * @param {!ReflectionObject} object Object added
 * @param {!Namespace} parent Parent added to
 * @returns {undefined}
 */
RootPrototype.handleAdd = function handleAdd(object, parent) { // eslint-disable-line no-unused-vars
    if (object instanceof Field && object.extend !== undefined) {
        // Remember this extension and inject it when handleResolve is called
        this._extends.push(object);
    }
};

/**
 * Called when any object is removed from this root or its sub-namespaces.
 * @param {!ReflectionObject} object Object removed
 * @param {!Namespace} parent Parent removed from
 * @returns {undefined}
 */
RootPrototype.handleRemove = function handleRemove(object, parent) { // eslint-disable-line no-unused-vars
    if (object instanceof Field && object.extend !== undefined) {
        var index = this._extends.indexOf(object);
        if (index > -1)
            this._extends.splice(index, 1);
    }
};

/**
 * Called when any object in this root or its sub-namespaces is being resolved.
 * @param {!ReflectionObject} object Object being resolved
 * @returns {undefined}
 */
RootPrototype.handleResolve = function handleResolve(object) { // eslint-disable-line no-unused-vars
    if (object instanceof Type) {
        this.resolveExtends();
        var fullName = object.fullName,
            resolved = this._resolvedExtends[fullName];
        if (resolved) {
            while (resolved.length)
                object.add(resolved.shift());
            delete this._resolvedExtends[fullName];
        }
    }
};

/**
 * @override
 */
RootPrototype.toString = function toString() {
    return this.constructor.name;
};
