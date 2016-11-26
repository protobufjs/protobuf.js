"use strict";
module.exports = ReflectionObject;

ReflectionObject.extend = extend;

var Root = require("./root"),
    util = require("./util");

var _TypeError = util._TypeError;

/**
 * Constructs a new reflection object.
 * @classdesc Base class of all reflection objects.
 * @constructor
 * @param {string} name Object name
 * @param {Object} [options] Declared options
 * @abstract
 */
function ReflectionObject(name, options) {
    if (!util.isString(name))
        throw _TypeError("name");
    if (options && !util.isObject(options))
        throw _TypeError("options", "an object");

    /**
     * Options.
     * @type {Object.<string,*>|undefined}
     */
    this.options = options; // toJSON

    /**
     * Unique name within its namespace.
     * @type {string}
     */
    this.name = name;

    /**
     * Parent namespace.
     * @type {?Namespace}
     */
    this.parent = null;

    /**
     * Whether already resolved or not.
     * @type {boolean}
     */
    this.resolved = false;
}

/** @alias ReflectionObject.prototype */
var ReflectionObjectPrototype = ReflectionObject.prototype;

Object.defineProperties(ReflectionObjectPrototype, {

    /**
     * Reference to the root namespace.
     * @name ReflectionObject#root
     * @type {Root}
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
    }
});

/**
 * Lets the specified constructor extend this class.
 * @memberof ReflectionObject
 * @param {Function} constructor Extending constructor
 * @returns {Object} Prototype
 * @this ReflectionObject
 */
function extend(constructor) {
    var proto = constructor.prototype = Object.create(this.prototype);
    proto.constructor = constructor;
    constructor.extend = extend;
    return proto;
}

/**
 * Converts this reflection object to its JSON representation.
 * @returns {Object} JSON object
 * @abstract
 */
ReflectionObjectPrototype.toJSON = function toJSON() {
    throw Error(); // not implemented, shouldn't happen
};

/**
 * Called when this object is added to a parent.
 * @param {ReflectionObject} parent Parent added to
 * @returns {undefined}
 */
ReflectionObjectPrototype.onAdd = function onAdd(parent) {
    if (this.parent && this.parent !== parent)
        this.parent.remove(this);
    this.parent = parent;
    this.resolved = false;
    var root = parent.root;
    if (root instanceof Root)
        root._handleAdd(this);
};

/**
 * Called when this object is removed from a parent.
 * @param {ReflectionObject} parent Parent removed from
 * @returns {undefined}
 */
ReflectionObjectPrototype.onRemove = function onRemove(parent) {
    var root = parent.root;
    if (root instanceof Root)
        root._handleRemove(this);
    this.parent = null;
    this.resolved = false;
};

/**
 * Resolves this objects type references.
 * @returns {ReflectionObject} `this`
 */
ReflectionObjectPrototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    var root = this.root;
    if (root instanceof Root)
        this.resolved = true; // only if part of a root
    return this;
};

/**
 * Gets an option value.
 * @param {string} name Option name
 * @returns {*} Option value or `undefined` if not set
 */
ReflectionObjectPrototype.getOption = function getOption(name) {
    if (this.options)
        return this.options[name];
    return undefined;
};

/**
 * Sets an option.
 * @param {string} name Option name
 * @param {*} value Option value
 * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObjectPrototype.setOption = function setOption(name, value, ifNotSet) {
    if (!ifNotSet || !this.options || this.options[name] === undefined)
        (this.options || (this.options = {}))[name] = value;
    return this;
};

/**
 * Sets multiple options.
 * @param {Object.<string,*>} options Options to set
 * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObjectPrototype.setOptions = function setOptions(options, ifNotSet) {
    if (options)
        Object.keys(options).forEach(function(name) {
            this.setOption(name, options[name], ifNotSet);
        }, this);
    return this;
};

/**
 * Converts this instance to its string representation.
 * @returns {string} Constructor name, space, full name
 */
ReflectionObjectPrototype.toString = function toString() {
    return this.constructor.name + " " + this.fullName;
};
