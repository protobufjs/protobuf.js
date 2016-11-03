var Root;

module.exports = ReflectionObject;

/**
 * Base class of all reflection objects.
 * @param {string} name
 * @param {!Object=} options
 */
function ReflectionObject(name, options) {

    /**
     * Properties exposed to JSON.
     * @type {!Object.<string,*>|undefined}
     */
    this.properties = undefined;

    /**
     * Options.
     * @type {!Object|undefined}
     */
    this.options = options;

    /**
     * Unique name within its namespace.
     * @type {string}
     */
    this.name = name;

    /**
     * Parent namespace.
     * @type {!Namespace}
     */
    this.parent = null;

    /**
     * Whether already resolved or not.
     * @type {boolean}
     */
    this.resolved = false;

    /**
     * Internally stores whether this object is visible.
     * @type {boolean|undefined}
     * @private
     */
    this._visible = undefined;
}

var ReflectionObjectPrototype = ReflectionObject.prototype;

exposeJSON(ReflectionObjectPrototype, [ "options" ]);

Object.defineProperties(ReflectionObjectPrototype, {

    /**
     * Reference to the root namespace.
     * @name ReflectionObject#root
     * @type {!Root}
     * @readonly
     */
    root: {
        get: function() {
            var ptr = this;
            while (ptr.parent !== null)
                ptr = ptr.parent;
            return ptr;
        }
    },

    /**
     * Full name including leading dot.
     * @name ReflectionObject#fullName
     * @type {string}
     * @readonly
     */
    fullName: {
        get: function() {
            var path = [ this.name ],
                ptr = this.parent;
            while (ptr) {
                path.unshift(ptr.name);
                ptr = ptr.parent;
            }
            return path.join('.');
        }
    },

    /**
     * Whether this object visible when exporting definitions.
     * @name ReflectionObject#visible
     * @type {boolean}
     */
    visible: {
        get: function() {
            var ptr = this;
            do {
                if (ptr._visible !== undefined)
                    return ptr._visible;
            } while ((ptr = ptr.parent) !== null);
            return true; // visible by default
        },
        set: function(value) {
            this._visible = value;
        }
    }

});

/**
 * Extends this class and optionally exposes the specified properties to JSON.
 * @param {!Function} child Child class
 * @param {!Function} [parent=ReflectionObject] Parent class
 * @param {!Array.<string>} [exposePropertyNames] Properties to expose to JSON
 * @returns {!Object} Prototype
 */
ReflectionObject.extend = function extend(child, exposePropertyNames) {
    var proto = child.prototype = Object.create(this.prototype);
    proto.constructor = child;
    child.extend = extend;
    if (exposePropertyNames)
        exposeJSON(proto, exposePropertyNames);
    return proto;
};

/**
 * Exposes the specified properties to JSON.
 * @memberof ReflectionObject
 * @param {!Object} prototype
 * @param {!Array.<string>} propertyNames
 */
function exposeJSON(prototype, propertyNames) {
    var descriptors = {};
    propertyNames.forEach(function(name) {
        descriptors[name] = {
            get: function() {
                return this.properties && this.properties[name];
            },
            set: function(value) {
                (this.properties || (this.properties = {}))[name] = value;
            },
            configurable: true
        };
    });
    Object.defineProperties(prototype, descriptors);
}

ReflectionObject.exposeJSON = exposeJSON;

/**
 * Converts this reflection object to its JSON representation.
 * Returns only properties that have explicitly been exposed.
 * @returns {!Object}
 * @see {@link ReflectionObject.exposeJSON}
 */
ReflectionObjectPrototype.toJSON = function toJSON() {
    if (!this.visible)
        return undefined;
    return this.properties;
};

/**
 * Called when this object is added to a parent.
 * @param {!ReflectionObject} parent Parent added to
 */
ReflectionObjectPrototype.onAdd = function onAdd(parent) {
    if (this.parent !== parent && this.parent)
        this.parent.remove(this);
    this.parent = parent;
    this.resolved = false;
    if (!Root)
        Root = require("./root");
    var root = parent.root;
    if (root instanceof Root)
        root.handleAdd(this, parent);
};

/**
 * Called when this object is removed from a parent.
 * @param {!ReflectionObject} parent Parent removed from
 */
ReflectionObjectPrototype.onRemove = function onRemove(parent) {
    this.parent = null;
    this.resolved = false;
    if (!Root)
        Root = require("./root");
    var root = parent.root;
    if (root instanceof Root)
        root.handleRemove(this, parent);
};

/**
 * Resolves this object and all it's required dependencies.
 * @returns {!ReflectionObject} this
 */
ReflectionObjectPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    if (!Root)
        Root = require("./root");
    var root = this.root;
    if (root instanceof Root) {
        root.handleResolve(this);
        this.resolved = true; // only if part of a root
    }
    return this;
};

/**
 * Changes this object's visibility when exporting definitions.
 * @param {boolean|undefined} visible `true` for public, `false` for private, `undefined` to inherit from parent
 * @returns {!ReflectionObject} this
 */
ReflectionObjectPrototype.visibility = function visibility(visible) {
    this._visible = visible;
    return this;
};

/**
 * Sets an option.
 * @param {string} name Option name
 * @param {*} value Option value
 * @param {boolean=} ifNotSet Sets the option only if it hasn't been set, yet
 * @returns {!ReflectionObject} this
 */
ReflectionObjectPrototype.setOption = function setOption(name, value, ifNotSet) {
    if (ifNotSet && (!this.options || this.options[name] !== undefined))
        return this;
    (this.options = this.options || {})[name] = value;
    return this;
};

/**
 * Sets multiple options.
 * @param {!Object.<string,*>} options
 * @returns {!ReflectionObject} this
 */
ReflectionObjectPrototype.setOptions = function setOptions(options) {
    if (options)
        Object.keys(options).forEach(function(name) {
            this.setOption(name, options[name]);
        }, this);
    return this;
};

/**
 * Gets an option value.
 * @param {string} name Option name
 * @returns {*} Option value or `undefined` if not set
 */
ReflectionObjectPrototype.getOption = function getOption(name) {
    if (!this.options)
        return undefined;
    return this.options[name];
};

/**
 * Converts this instance to its string representation.
 * @returns {string}
 */
ReflectionObjectPrototype.toString = function toString() {
    return this.constructor.name + " " + this.fullName;
};
