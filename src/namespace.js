var ReflectionObject = require("./object"),
    Enum    = require("./enum"),
    util    = require("./util");
var Type,
    Service;
var nestedTypes,
    nestedError;

module.exports = Namespace;

// One time function to initialize cyclic dependencies
var initCyclics = function() {
    Type = require("./type");
    Service = require("./service");
    nestedTypes = [ Enum, Type, Service, Namespace ];
    nestedError = "one of " + nestedTypes.map(function(ctor) { return ctor.name; }).join(', ');
    initCyclics = false;
};

/**
 * Base class of all reflection objects containing nested objects.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Namespace options
 */
function Namespace(name, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Nested reflection objects by name.
     * @type {Object.<string,ReflectionObject>|undefined}
     */
    this.nested = undefined; // exposed
}

/**
 * @alias Namespace.prototype
 */
var NamespacePrototype = ReflectionObject.extend(Namespace, [ "nested" ]);

Object.defineProperties(NamespacePrototype, {

    /**
     * Determines whether this namespace is empty.
     * @name Namespace#empty
     * @type {boolean}
     * @readonly
     */
    empty: {
        get: function() {
            return Boolean(this.nested && Object.keys(this.nested).length);
        }
    }

});

/**
 * Tests if the specified JSON object describes not another reflection object.
 * @param {*} json JSON object
 * @returns {boolean} `true` if the object describes not another reflection object
 */
Namespace.testJSON = function testJSON(json) {
    return Boolean(json
        && !json.fields                   // Type
        && !json.values                   // Enum
        && json.id === undefined          // Field, MapField
        && !json.oneof                    // OneOf
        && !json.methods                  // Service
        && json.requestType === undefined // Method
    );
};

/**
 * Constructs a namespace from JSON.
 * @param {string} name Namespace name
 * @param {Object} json JSON object
 * @returns {Namespace} Created namespace
 * @throws {TypeError} If arguments are invalid
 */
Namespace.fromJSON = function fromJSON(name, json) {
    var ns = new Namespace(name, json.options);
    if (json.nested) {
        if (initCyclics)
            initCyclics();
        Object.keys(json.nested).forEach(function(nestedName) {
            var nested = json.nested[nestedName];
            for (var i = 0, k = nestedTypes.length, clazz; i < k; ++i)
                if ((clazz = nestedTypes[i]).testJSON(nested)) {
                    ns.add(clazz.fromJSON(nestedName, nested));
                    return;
                }
            throw util._TypeError("nested", nestedError);
        });
    }
    return ns;
};

/**
 * Iterates over all nested objects.
 * @param {function(this:Namespace, ReflectionObject, string):*} fn Iterator function called with nested objects
 *  and their names. Can return something different than `undefined` to break the iteration.
 * @param {Object} [ctx] Optional iterator function context
 * @param {Object} [object] Alternative object to iterate over
 * @returns {*|Namespace} First value returned, otherwise this
 */
NamespacePrototype.each = function each(fn, ctx, object) {
    if (!object)
        object = this.nested;
    if (object) {
        var names = Object.keys(object);
        for (var i = 0, k = names.length, name, ret; i < k; ++i)
            if ((ret = fn.call(ctx || this, object[name = names[i]], name)) !== undefined)
                return ret;
    }
    return this;
};

/**
 * Gets the nested object of the specified name.
 * @param {string} name Nested object name
 * @returns {?ReflectionObject} The reflection object or `null` if it doesn't exist
 */
NamespacePrototype.get = function get(name) {
    return this.nested && this.nested[name] || null;
};

/**
 * Adds a nested object to this namespace.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Namespace} this
 */
NamespacePrototype.add = function add(object) {
    if (initCyclics)
        initCyclics();
    if (!object || nestedTypes.indexOf(object.constructor) < 0)
        throw util._TypeError("object", nestedError);
    if (!this.nested)
        this.nested = {};
    else {
        var prev = this.get(object.name);
        if (prev) {
            if (initCyclics)
                initCyclics();
            if (prev instanceof Namespace && !(prev instanceof Type) && object instanceof Type) {
                prev.each(object.add, object); // move existing nested objects to the message type
                this.remove(prev);             // and remove the previous namespace
            } else
                throw Error("duplicate name '" + object.name + "' in " + this);
        }
    }
    this.nested[object.name] = object;
    object.onAdd(this);
    return this;
};

/**
 * Removes a nested object from this namespace.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Namespace} this
 */
NamespacePrototype.remove = function remove(object) {
    if (initCyclics)
        initCyclics();
    if (!(object instanceof ReflectionObject))
        throw util._TypeError("object", "a ReflectionObject");
    if (object.parent !== this)
        throw Error(object + " is not a member of " + this);
    delete this.nested[object.name];
    if (this.empty)
        this.nested = undefined;
    object.onRemove(this);
    return this;
};

/**
 * Defines additial namespaces within this one if not yet existing.
 * @param {string|string[]} path Path to create
 * @param {?boolean} [visible] Whether visible when exporting definitions. Defaults to inherit from parent.
 * @returns {Namespace} Pointer to the last namespace created
 */
NamespacePrototype.define = function define(path, visible) {
    if (util.isString(path))
        path = path.split('.');
    if (visible === undefined)
        visible = null;
    var ptr = this;
    while (path.length > 0) {
        var part = path.shift();
        if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace))
                throw Error("path conflicts with non-namespace objects");
            if (visible) // make visible when new namespaces are
                ptr.visible = true;
        } else {
            ptr.add(ptr = new Namespace(part));
            ptr.visible = visible;
        }
    }
    return ptr;
};

/**
 * Resolves this namespace's and all its nested objects' type references. Useful to validate a
 * reflection tree.
 * @returns {Namespace} this
 */
NamespacePrototype.resolveAll = function resolve() {
    this.each(function(nested) {
        nested.resolve();
    }, this);
    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Looks up the reflection object specified by path, relative to this namespace.
 * @param {string|string[]} path Path to look up
 * @param {boolean} [parentAlreadyChecked] Whether the parent has already been checked
 * @returns {?ReflectionObject} Looked up object or `null` if none could be found
 */
NamespacePrototype.lookup = function lookup(path, parentAlreadyChecked) {
    if (util.isString(path)) {
        if (!path.length)
            return null;
        path = path.split('.');
    }
    if (!path.length)
        return null;
    // Start at root if path is absolute
    if (path[0] === "")
        return this.root.lookup(path.slice(1));
    // Test if the first part matches any nested object, and if so, traverse if path contains more
    var found = this.nested && this.nested[path[0]];
    if (found && (path.length === 1 || found.lookup && (found = found.lookup(path.slice(1), true))))
        return found;
    // If there hasn't been a match, try again at the parent
    if (this.parent === null || parentAlreadyChecked)
        return null;
    return this.parent.lookup(path);
};

/**
 * @override
 */
NamespacePrototype.toJSON = function toJSON() {
    if (this.visible) return this.properties;

    // Otherwise expose visible members only
    var visibleMembers = {};
    var hasVisibleMembers = false;
    this.each(function(nested, name) {
        var json = nested.toJSON();
        if (json) {
            visibleMembers[name] = json;
            hasVisibleMembers = true;
        }
    }, this);
    return hasVisibleMembers ? { nested: visibleMembers } : undefined;
};
