var util = require("./util");
var Root;

module.exports = ReflectionObject;

// One time function to initialize cyclic dependencies
var initCyclics = function() {
    Root = require("./root");
    initCyclics = false;
};

/**
 * Base class of all reflection objects.
 * @constructor
 * @param {string} name Object name
 * @param {!Object.<string,*>} [options] Object options
 * @abstract
 */
function ReflectionObject(name, options) {
    if (!util.isString(name))
        throw util._TypeError("name");
    if (options && !util.isObject(options))
        throw util._TypeError("options", "object");

    /**
     * Properties exposed to JSON.
     * @type {?Object.<string,*>}
     */
    this.properties = null;

    // NOTE: Properties are null if not present to ensure proper workings of hidden class
    // optimizations within the reflection object. The properties object itself, however, will most
    // likely resort to a hashmap, which is ok. All properties marked as "// exposed" are stored
    // within properties and can take any value.

    /**
     * Options.
     * @type {!Object|undefined}
     */
    this.options = options; // exposed

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
     * @type {?boolean}
     * @private
     */
    this._visible = null;

    /**
     * Internally stores this object's full name.
     * @type {?string}
     * @private
     */
    this._fullName = null;
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
                if (ptr._visible !== null)
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
 * @param {!Function} constructor Extending constructor
 * @param {!Array.<string>} [exposePropertyNames] Properties to expose to JSON
 * @returns {!Object} Prototype
 */
ReflectionObject.extend = function extend(constructor, exposePropertyNames) {
    var proto = constructor.prototype = Object.create(this.prototype);
    proto.constructor = constructor;
    constructor.extend = extend;
    if (exposePropertyNames)
        exposeJSON(proto, exposePropertyNames);
    return proto;
};

/**
 * Exposes the specified properties to JSON.
 * @memberof ReflectionObject
 * @param {!Object} prototype Prototype to expose the properties upon
 * @param {!Array.<string>} propertyNames Property names to expose
 * @returns {!Object} prototype
 */
function exposeJSON(prototype, propertyNames) {
    var descriptors = {};
    propertyNames.forEach(function(name) {
        descriptors[name] = {
            get: function() {
                if (!this.properties)
                    return undefined;
                return this.properties[name];
            },
            set: function(value) {
                (this.properties || (this.properties = {}))[name] = value;
            }
        };
    });
    Object.defineProperties(prototype, descriptors);
    return prototype;
}

ReflectionObject.exposeJSON = exposeJSON;

/**
 * Converts this reflection object to its JSON representation.
 * Returns only properties that have explicitly been exposed.
 * @returns {!Object} JSON object
 * @see {@link ReflectionObject.exposeJSON}
 */
ReflectionObjectPrototype.toJSON = function toJSON() {
    if (!this.visible)
        return undefined;
    return this.properties || undefined;
};

/**
 * Called when this object is added to a parent.
 * @param {!ReflectionObject} parent Parent added to
 * @returns {undefined}
 */
ReflectionObjectPrototype.onAdd = function onAdd(parent) {
    if (this.parent !== parent && this.parent)
        this.parent.remove(this);
    this.parent = parent;
    this.resolved = false;
    if (initCyclics)
        initCyclics();
    var root = parent.root;
    if (root instanceof Root)
        root.handleAdd(this, parent);
};

/**
 * Called when this object is removed from a parent.
 * @param {!ReflectionObject} parent Parent removed from
 * @returns {undefined}
 */
ReflectionObjectPrototype.onRemove = function onRemove(parent) {
    this.parent = null;
    this.resolved = false;
    if (initCyclics)
        initCyclics();
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
    if (initCyclics)
        initCyclics();
    var root = this.root;
    if (root instanceof Root) {
        root.handleResolve(this);
        this.resolved = true; // only if part of a root
    }
    return this;
};

/**
 * Changes this object's visibility when exporting definitions.
 * @param {?boolean} visible `true` for public, `false` for private, `null` to inherit from parent
 * @returns {!ReflectionObject} this
 */
ReflectionObjectPrototype.visibility = function visibility(visible) {
    this._visible = visible;
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
 * Sets an option.
 * @param {string} name Option name
 * @param {*} value Option value
 * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
 * @returns {!ReflectionObject} this
 */
ReflectionObjectPrototype.setOption = function setOption(name, value, ifNotSet) {
    if (!ifNotSet || !this.options || this.options[name] === undefined)
        (this.options || (this.options = {}))[name] = value;
    return this;
};

/**
 * Sets multiple options.
 * @param {!Object.<string,*>} options Options to set
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
 * Converts this instance to its string representation.
 * @returns {string} Constructor name plus full name
 */
ReflectionObjectPrototype.toString = function toString() {
    return this.constructor.name + " " + this.fullName;
};
