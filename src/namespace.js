"use strict";
module.exports = Namespace;

// extends ReflectionObject
var ReflectionObject = require("./object");
/** @alias NamespaceBase.prototype */
var NamespacePrototype = ReflectionObject.extend(Namespace);

Namespace.className = "Namespace";

var Enum    = require("./enum"),
    Field   = require("./field"),
    util    = require("./util");

var Type,    // cyclic
    Service; // cyclic

var nestedTypes, // contains cyclics
    nestedError;

function initNested() {

    /* istanbul ignore next */
    if (!Type)
        Type = require("./type");
    /* istanbul ignore next */
    if (!Service)
        Service = require("./service");

    nestedTypes = [ Enum, Type, Service, Field, Namespace ];
    nestedError = "one of " + nestedTypes.map(function(ctor) { return ctor.name; }).join(", ");
}

/**
 * Constructs a new namespace instance.
 * @name Namespace
 * @classdesc Reflected namespace.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 */

/**
 * This is not an actual class but here for the sake of having consistent type definitions.
 * @classdesc Base of all reflection objects containing nested objects.
 * @exports NamespaceBase
 * @extends ReflectionObject
 * @abstract
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 * @see {@link Namespace}
 */
function Namespace(name, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Nested objects by name.
     * @type {Object.<string,ReflectionObject>|undefined}
     */
    this.nested = undefined; // toJSON

    /**
     * Cached nested objects as an array.
     * @type {?ReflectionObject[]}
     * @private
     */
    this._nestedArray = null;

    /**
     * Properties to remove when cache is cleared.
     * @type {Array.<string>}
     * @private
     */
    this._clearProperties = [];
}

function clearCache(namespace) {
    namespace._nestedArray = null;
    for (var i = 0; i < namespace._clearProperties.length; ++i)
        delete namespace[namespace._clearProperties[i]];
    namespace._clearProperties = [];
    return namespace;
}

/**
 * Nested objects of this namespace as an array for iteration.
 * @name NamespaceBase#nestedArray
 * @type {ReflectionObject[]}
 * @readonly
 */
Object.defineProperty(NamespacePrototype, "nestedArray", {
    get: function() {
        return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
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
 * @name Namespace.fromJSON
 * @function
 * @param {string} name Namespace name
 * @param {Object.<string,*>} json JSON object
 * @returns {Namespace} Created namespace
 * @throws {TypeError} If arguments are invalid
 */
Namespace.fromJSON = function fromJSON(name, json) {
    return new Namespace(name, json.options).addJSON(json.nested);
};

/**
 * @override
 */
NamespacePrototype.toJSON = function toJSON() {
    return {
        options : this.options,
        nested  : arrayToJSON(this.nestedArray)
    };
};

/**
 * Converts an array of reflection objects to JSON.
 * @memberof NamespaceBase
 * @param {ReflectionObject[]} array Object array
 * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
 */
function arrayToJSON(array) {
    if (!(array && array.length))
        return undefined;
    var obj = {};
    for (var i = 0; i < array.length; ++i)
        obj[array[i].name] = array[i].toJSON();
    return obj;
}

Namespace.arrayToJSON = arrayToJSON;

/**
 * Adds nested elements to this namespace from JSON.
 * @param {Object.<string,*>} nestedJson Nested JSON
 * @returns {Namespace} `this`
 */
NamespacePrototype.addJSON = function addJSON(nestedJson) {
    var ns = this;
    if (nestedJson) {
        if (!nestedTypes)
            initNested();
        Object.keys(nestedJson).forEach(function(nestedName) {
            var nested = nestedJson[nestedName];
            for (var j = 0; j < nestedTypes.length; ++j)
                if (nestedTypes[j].testJSON(nested))
                    return ns.add(nestedTypes[j].fromJSON(nestedName, nested));
            throw TypeError("nested." + nestedName + " must be JSON for " + nestedError);
        });
    }
    return this;
};

/**
 * Gets the nested object of the specified name.
 * @param {string} name Nested object name
 * @returns {?ReflectionObject} The reflection object or `null` if it doesn't exist
 */
NamespacePrototype.get = function get(name) {
    if (this.nested === undefined) // prevents deopt
        return null;
    return this.nested[name] || null;
};

/**
 * Gets the values of the nested {@link Enum|enum} of the specified name.
 * This methods differs from {@link Namespace#get|get} in that it returns an enum's values directly and throws instead of returning `null`.
 * @param {string} name Nested enum name
 * @returns {Object.<string,number>} Enum values
 * @throws {Error} If there is no such enum
 */
NamespacePrototype.getEnum = function getEnum(name) {
    if (this.nested && this.nested[name] instanceof Enum)
        return this.nested[name].values;
    throw Error("no such enum");
};

/**
 * Adds a nested object to this namespace.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name
 */
NamespacePrototype.add = function add(object) {
    if (!nestedTypes)
        initNested();

    /* istanbul ignore next */
    if (!object || nestedTypes.indexOf(object.constructor) < 0)
        throw TypeError("object must be " + nestedError);
    /* istanbul ignore next */
    if (object instanceof Field && object.extend === undefined)
        throw TypeError("object must be an extension field when not part of a type");

    if (!this.nested)
        this.nested = {};
    else {
        var prev = this.get(object.name);
        if (prev) {
            // initNested above already initializes Type and Service
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
                // replace plain namespace but keep existing nested elements and options
                var nested = prev.nestedArray;
                for (var i = 0; i < nested.length; ++i)
                    object.add(nested[i]);
                this.remove(prev);
                if (!this.nested)
                    this.nested = {};
                object.setOptions(prev.options, true);

            /* istanbul ignore next */
            } else
                throw Error("duplicate name '" + object.name + "' in " + this);
        }
    }
    this.nested[object.name] = object;
    object.onAdd(this);
    return clearCache(this);
};

/**
 * Removes a nested object from this namespace.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this namespace
 */
NamespacePrototype.remove = function remove(object) {

    /* istanbul ignore next */
    if (!(object instanceof ReflectionObject))
        throw TypeError("object must be a ReflectionObject");
    /* istanbul ignore next */
    if (object.parent !== this || !this.nested)
        throw Error(object + " is not a member of " + this);

    delete this.nested[object.name];
    if (!Object.keys(this.nested).length)
        this.nested = undefined;
    object.onRemove(this);
    return clearCache(this);
};

/**
 * Defines additial namespaces within this one if not yet existing.
 * @param {string|string[]} path Path to create
 * @param {*} [json] Nested types to create from JSON
 * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
 */
NamespacePrototype.define = function define(path, json) {
    if (util.isString(path))
        path = path.split(".");
    else if (!Array.isArray(path)) {
        json = path;
        path = undefined;
    }
    var ptr = this;
    if (path)
        while (path.length > 0) {
            var part = path.shift();
            if (ptr.nested && ptr.nested[part]) {
                ptr = ptr.nested[part];
                if (!(ptr instanceof Namespace))
                    throw Error("path conflicts with non-namespace objects");
            } else
                ptr.add(ptr = new Namespace(part));
        }
    if (json)
        ptr.addJSON(json);
    return ptr;
};

/**
 * @override
 */
NamespacePrototype.resolve = function resolve() {
    /* istanbul ignore next */
    if (!Type)
        Type = require("./type");
    /* istanbul ignore next */
    if (!Service)
        Type = require("./service");

    // Add uppercased (and thus conflict-free) nested types, services and enums as properties
    // of the type just like static code does. This allows using a .d.ts generated for a static
    // module with reflection-based solutions where the condition is met.
    var nested = this.nestedArray;
    for (var i = 0; i < nested.length; ++i)
        if (/^[A-Z]/.test(nested[i].name)) {
            if (nested[i] instanceof Type || nested[i] instanceof Service)
                this[nested[i].name] = nested[i];
            else if (nested[i] instanceof Enum)
                this[nested[i].name] = nested[i].values;
            else
                continue;
            this._clearProperties.push(nested[i].name);
        }

    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree.
 * @returns {Namespace} `this`
 */
NamespacePrototype.resolveAll = function resolveAll() {
    var nested = this.nestedArray, i = 0;
    while (i < nested.length)
        if (nested[i] instanceof Namespace)
            nested[i++].resolveAll();
        else
            nested[i++].resolve();
    return NamespacePrototype.resolve.call(this);
};

/**
 * Looks up the reflection object at the specified path, relative to this namespace.
 * @param {string|string[]} path Path to look up
 * @param {function(new: ReflectionObject)} filterType Filter type, one of `protobuf.Type`, `protobuf.Enum`, `protobuf.Service` etc.
 * @param {boolean} [parentAlreadyChecked=false] If known, whether the parent has already been checked
 * @returns {?ReflectionObject} Looked up object or `null` if none could be found
 */
NamespacePrototype.lookup = function lookup(path, filterType, parentAlreadyChecked) {
    if (typeof filterType === "boolean") {
        parentAlreadyChecked = filterType;
        filterType = undefined;
    }
    if (util.isString(path) && path.length)
        path = path.split(".");
    else if (!path.length)
        return null;
    // Start at root if path is absolute
    if (path[0] === "")
        return this.root.lookup(path.slice(1), filterType);
    // Test if the first part matches any nested object, and if so, traverse if path contains more
    var found = this.get(path[0]);
    if (found && path.length === 1 && (!filterType || found instanceof filterType) || found instanceof Namespace && (found = found.lookup(path.slice(1), filterType, true)))
        return found;
    // If there hasn't been a match, try again at the parent
    if (this.parent === null || parentAlreadyChecked)
        return null;
    return this.parent.lookup(path, filterType);
};

/**
 * Looks up the reflection object at the specified path, relative to this namespace.
 * @name NamespaceBase#lookup
 * @function
 * @param {string|string[]} path Path to look up
 * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
 * @returns {?ReflectionObject} Looked up object or `null` if none could be found
 * @variation 2
 */
// lookup(path: string, [parentAlreadyChecked: boolean])

/**
 * Looks up the {@link Type|type} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type
 * @throws {Error} If `path` does not point to a type
 */
NamespacePrototype.lookupType = function lookupType(path) {

    /* istanbul ignore next */
    if (!Type)
        Type = require("./type");

    var found = this.lookup(path, Type);
    if (!found)
        throw Error("no such type");
    return found;
};

/**
 * Looks up the {@link Service|service} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Service} Looked up service
 * @throws {Error} If `path` does not point to a service
 */
NamespacePrototype.lookupService = function lookupService(path) {

    /* istanbul ignore next */
    if (!Service)
        Service = require("./service");

    var found = this.lookup(path, Service);
    if (!found)
        throw Error("no such service");
    return found;
};

/**
 * Looks up the values of the {@link Enum|enum} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it returns the enum's values directly and throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Object.<string,number>} Enum values
 * @throws {Error} If `path` does not point to an enum
 */
NamespacePrototype.lookupEnum = function lookupEnum(path) {
    var found = this.lookup(path, Enum);
    if (!found)
        throw Error("no such enum");
    return found.values;
};
