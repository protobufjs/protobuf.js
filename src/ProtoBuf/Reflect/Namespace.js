/**
 * Constructs a new Namespace.
 * @exports ProtoBuf.Reflect.Namespace
 * @param {!ProtoBuf.Builder} builder Builder reference
 * @param {?ProtoBuf.Reflect.Namespace} parent Namespace parent
 * @param {string} name Namespace name
 * @param {Object.<string,*>=} options Namespace options
 * @constructor
 * @extends ProtoBuf.Reflect.T
 */
var Namespace = function(builder, parent, name, options) {
    T.call(this, builder, parent, name);

    /**
     * @override
     */
    this.className = "Namespace";

    /**
     * Children inside the namespace.
     * @type {!Array.<ProtoBuf.Reflect.T>}
     */
    this.children = [];

    /**
     * Options.
     * @type {!Object.<string, *>}
     */
    this.options = options || {};
};

/**
 * @alias ProtoBuf.Reflect.Namespace.prototype
 * @inner
 */
var NamespacePrototype = Namespace.prototype = Object.create(T.prototype);

/**
 * Returns an array of the namespace's children.
 * @param {ProtoBuf.Reflect.T=} type Filter type (returns instances of this type only). Defaults to null (all children).
 * @return {Array.<ProtoBuf.Reflect.T>}
 * @expose
 */
NamespacePrototype.getChildren = function(type) {
    type = type || null;
    if (type == null)
        return this.children.slice();
    var children = [];
    for (var i=0, k=this.children.length; i<k; ++i)
        if (this.children[i] instanceof type)
            children.push(this.children[i]);
    return children;
};

/**
 * Adds a child to the namespace.
 * @param {ProtoBuf.Reflect.T} child Child
 * @throws {Error} If the child cannot be added (duplicate)
 * @expose
 */
NamespacePrototype.addChild = function(child) {
    var other;
    if (other = this.getChild(child.name)) {
        // Try to revert camelcase transformation on collision
        if (other instanceof Message.Field && other.name !== other.originalName && this.getChild(other.originalName) === null)
            other.name = other.originalName; // Revert previous first (effectively keeps both originals)
        else if (child instanceof Message.Field && child.name !== child.originalName && this.getChild(child.originalName) === null)
            child.name = child.originalName;
        else
            throw Error("Duplicate name in namespace "+this.toString(true)+": "+child.name);
    }
    this.children.push(child);
};

/**
 * Gets a child by its name or id.
 * @param {string|number} nameOrId Child name or id
 * @return {?ProtoBuf.Reflect.T} The child or null if not found
 * @expose
 */
NamespacePrototype.getChild = function(nameOrId) {
    var key = typeof nameOrId === 'number' ? 'id' : 'name';
    for (var i=0, k=this.children.length; i<k; ++i)
        if (this.children[i][key] === nameOrId)
            return this.children[i];
    return null;
};

/**
 * Resolves a reflect object inside of this namespace.
 * @param {string} qn Qualified name to resolve
 * @param {boolean=} excludeFields Excludes fields, defaults to `false`
 * @return {?ProtoBuf.Reflect.Namespace} The resolved type or null if not found
 * @expose
 */
NamespacePrototype.resolve = function(qn, excludeFields) {
    var part = qn.split("."),
        ptr = this,
        i = 0;
    if (part[i] === "") { // Fully qualified name, e.g. ".My.Message'
        while (ptr.parent !== null)
            ptr = ptr.parent;
        i++;
    }
    var child;
    do {
        do {
            child = ptr.getChild(part[i]);
            if (!child || !(child instanceof Reflect.T) || (excludeFields && child instanceof Reflect.Message.Field)) {
                ptr = null;
                break;
            }
            ptr = child; i++;
        } while (i < part.length);
        if (ptr != null)
            break; // Found
        // Else search the parent
        if (this.parent !== null) {
            return this.parent.resolve(qn, excludeFields);
        }
    } while (ptr != null);
    return ptr;
};

/**
 * Builds the namespace and returns the runtime counterpart.
 * @return {Object.<string,Function|Object>} Runtime namespace
 * @expose
 */
NamespacePrototype.build = function() {
    /** @dict */
    var ns = {};
    var children = this.children;
    for (var i=0, k=children.length, child; i<k; ++i) {
        child = children[i];
        if (child instanceof Namespace)
            ns[child.name] = child.build();
    }
    if (Object.defineProperty)
        Object.defineProperty(ns, "$options", { "value": this.buildOpt() });
    return ns;
};

/**
 * Builds the namespace's '$options' property.
 * @return {Object.<string,*>}
 */
NamespacePrototype.buildOpt = function() {
    var opt = {},
        keys = Object.keys(this.options);
    for (var i=0, k=keys.length; i<k; ++i) {
        var key = keys[i],
            val = this.options[keys[i]];
        // TODO: Options are not resolved, yet.
        // if (val instanceof Namespace) {
        //     opt[key] = val.build();
        // } else {
        opt[key] = val;
        // }
    }
    return opt;
};

/**
 * Gets the value assigned to the option with the specified name.
 * @param {string=} name Returns the option value if specified, otherwise all options are returned.
 * @return {*|Object.<string,*>}null} Option value or NULL if there is no such option
 */
NamespacePrototype.getOption = function(name) {
    if (typeof name === 'undefined')
        return this.options;
    return typeof this.options[name] !== 'undefined' ? this.options[name] : null;
};
