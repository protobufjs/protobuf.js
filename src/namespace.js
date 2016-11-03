var ReflectionObject = require("./object"),
    Enum    = require("./enum"),
    util    = require("./util");
var Service,
    Type;

module.exports = Namespace;

/**
 * Base class of all reflection objects containing nested objects.
 * @extends ReflectionObjects
 * @param {string} name
 * @param {!Object.<string,*>=} options
 */
function Namespace(name, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Nested reflection objects by name.
     * @name Namespace#nested
     * @type {!Object.<string,!ReflectionObject>|undefined}
     */
}

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
 * Tests if the specified JSON object describes a namespace.
 * @param {!Object} json
 * @returns {boolean}
 */
Namespace.testJSON = function testJSON(json) {
    return Boolean(json && json.nested && !json.fields);
};

/**
 * Constructs a namespace from JSON.
 * @param {string} name
 * @param {!Object} json
 * @returns {!Namespace}
 */
Namespace.fromJSON = function fromJSON(name, json) {
    var ns = new Namespace(name, json.options);
    if (json.nested) {
        if (!Type)
            Type = require("./type");
        if (!Service)
            Service = require("./Service");
        var nestedTypes = [ Enum, Type, Service ];
        Object.keys(json.nested).forEach(function(nestedName) {
            var nested = json.nested[nestedName];
            for (var i = 0, k = nestedTypes.length, clazz; i < k; ++i)
                if ((clazz = nestedTypes[i]).testJSON(nested)) {
                    ns.add(clazz.fromJSON(nestedName, nested));
                    return;
                }
            throw TypeError("invalid nested object in " + ns + ": " + nestedName);
        });
    }
    return ns;
};

/**
 * Iterates over all nested objects.
 * @param {function(!ReflectionObject, string):*} fn Iterator function called with nested objects
 *  and their names. Can return something different than `undefined` to break the iteration.
 * @param {!Object} [ctx] Optional iterator function context
 * @param {!Object} [object] Alternative object to iterate over
 * @returns {*} First value returned, otherwise this
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
 * Tests if the specified name (already) exists in this namespace.
 * @returns {boolean}
 */
NamespacePrototype.exists = function exists(name) {
    return Boolean(this.nested && this.nested[name]);
};

/**
 * Gets the nested object of the specified name.
 * @returns {?ReflectionObject}
 */
NamespacePrototype.get = function get(name) {
    if (!this.nested)
        return null;
    return this.nested[name] || null;
};

/**
 * Adds a nested object to this namespace.
 * @param {!ReflectionObject} object
 * @returns {!Namespace} this
 */
NamespacePrototype.add = function add(object) {
    if (!(object instanceof ReflectionObject))
        throw TypeError("object must be a ReflectionObject");
    var prev = this.get(object.name);
    if (prev) {
        if (!Type)
            Type = require("./type");
        if (prev instanceof Namespace && !(prev instanceof Type) && object instanceof Type) {
            prev.each(object.add, object); // move existing nested objects to the message type
            this.remove(prev);             // and remove the previous namespace
        } else
            throw Error("duplicate name '" + object.name + "' in " + this);
    }
    if (!this.nested)
        this.nested = {};
    this.nested[object.name] = object;
    object.onAdd(this);
    return this;
};

/**
 * Removes a nested object from this namespace.
 * @param {!ReflectionObject} object
 * @returns {!Namespace} this
 */
NamespacePrototype.remove = function remove(object) {
    if (!(object instanceof ReflectionObject))
        throw TypeError("object must be a ReflectionObject");
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
 * @param {string|!Array.<string>} path Path to create
 * @param {boolean|undefined} [visible] Whether visible when exporting definitions. Defaults to inherit from parent.
 * @returns {!Namespace} Pointer to the last namespace created
 */
NamespacePrototype.define = function define(path, visible) {
    if (util.isString(path))
        path = path.split('.');
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
 * @override
 */
NamespacePrototype.resolve = function resolve() {
    // NOTE: Namespaces aren't resolved internally - this is here as utility.
    if (this.resolved)
        return this;
    this.each(function(nested) {
        nested.resolve();
    }, this);
    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Looks up the reflection object specified by path, relative to this namespace.
 * @param {string|!Array.<string>} path
 * @param {boolean} [parentAlreadyChecked] Whether the parent has already been checked
 * @returns {?ReflectionObject}
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
    // Test if the first part matches any nested object and traverse
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
