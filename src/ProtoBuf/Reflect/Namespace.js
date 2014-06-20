/**
 * Constructs a new Namespace.
 * @exports ProtoBuf.Reflect.Namespace
 * @param {ProtoBuf.Reflect.Namespace|null} parent Namespace parent
 * @param {string} name Namespace name
 * @param {Object.<string,*>} options Namespace options
 * @constructor
 * @extends ProtoBuf.Reflect.T
 */
var Namespace = function(parent, name, options) {
    T.call(this, parent, name);

    /**
     * @override
     */
    this.className = "Namespace";

    /**
     * Children inside the namespace.
     * @type {Array.<ProtoBuf.Reflect.T>}
     */
    this.children = [];

    /**
     * Options.
     * @type {Object.<string, *>}
     */
    this.options = options || {};
};

// Extends T
Namespace.prototype = Object.create(T.prototype);

/**
 * Returns an array of the namespace's children.
 * @param {ProtoBuf.Reflect.T=} type Filter type (returns instances of this type only). Defaults to null (all children).
 * @return {Array.<ProtoBuf.Reflect.T>}
 * @expose
 */
Namespace.prototype.getChildren = function(type) {
    type = type || null;
    if (type == null) {
        return this.children.slice();
    }
    var children = [];
    for (var i=0; i<this.children.length; i++) {
        if (this.children[i] instanceof type) {
            children.push(this.children[i]);
        }
    }
    return children;
};

/**
 * Adds a child to the namespace.
 * @param {ProtoBuf.Reflect.T} child Child
 * @throws {Error} If the child cannot be added (duplicate)
 * @expose
 */
Namespace.prototype.addChild = function(child) {
    var other;
    if (other = this.getChild(child.name)) {
        // Try to revert camelcase transformation on collision
        if (other instanceof Message.Field && other.name !== other.originalName && !this.hasChild(other.originalName)) {
            other.name = other.originalName; // Revert previous first (effectively keeps both originals)
        } else if (child instanceof Message.Field && child.name !== child.originalName && !this.hasChild(child.originalName)) {
            child.name = child.originalName;
        } else {
            throw(new Error("Duplicate name in namespace "+this.toString(true)+": "+child.name));
        }
    }
    this.children.push(child);
};

/**
 * Tests if this namespace has a child with the specified name.
 * @param {string|number} nameOrId Child name or id
 * @returns {boolean} true if there is one, else false
 * @expose
 */
Namespace.prototype.hasChild = function(nameOrId) {
    return this._indexOf(nameOrId) > -1;
};

/**
 * Gets a child by its name.
 * @param {string|number} nameOrId Child name or id
 * @return {?ProtoBuf.Reflect.T} The child or null if not found
 * @expose
 */
Namespace.prototype.getChild = function(nameOrId) {
    var index = this._indexOf(nameOrId);
    return index > -1 ? this.children[index] : null;
};

/**
 * Returns child index by its name or id.
 * @param {string|number} nameOrId Child name or id
 * @return {Number} The child index
 * @private
 */
Namespace.prototype._indexOf = function(nameOrId) {
    var key = (typeof nameOrId == 'number')
        ? 'id'
        : 'name';
    for (var i=0; i<this.children.length; i++)
        if (typeof this.children[i][key] !== 'undefined' && this.children[i][key] == nameOrId)
            return i;
    return -1;
};

/**
 * Resolves a reflect object inside of this namespace.
 * @param {string} qn Qualified name to resolve
 * @param {boolean=} excludeFields Excludes fields, defaults to `false`
 * @return {ProtoBuf.Reflect.Namespace|null} The resolved type or null if not found
 * @expose
 */
Namespace.prototype.resolve = function(qn, excludeFields) {
    var part = qn.split(".");
    var ptr = this, i=0;
    if (part[i] == "") { // Fully qualified name, e.g. ".My.Message'
        while (ptr.parent != null) {
            ptr = ptr.parent;
        }
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
        if (ptr != null) break; // Found
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
Namespace.prototype.build = function() {
    /** @dict */
    var ns = {};
    var children = this.getChildren(), child;
    for (var i=0; i<children.length; i++) {
        child = children[i];
        if (child instanceof Namespace) {
            ns[child.name] = child.build();
        }
    }
    if (Object.defineProperty) {
        Object.defineProperty(ns, "$options", {
            "value": this.buildOpt(),
            "enumerable": false,
            "configurable": false,
            "writable": false
        });
    }
    return ns;
};

/**
 * Builds the namespace's '$options' property.
 * @return {Object.<string,*>}
 */
Namespace.prototype.buildOpt = function() {
    var opt = {};
    var keys = Object.keys(this.options);
    for (var i=0; i<keys.length; i++) {
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
Namespace.prototype.getOption = function(name) {
    if (typeof name == 'undefined') {
        return this.options;
    }
    return typeof this.options[name] != 'undefined' ? this.options[name] : null;
};
