"use strict";
module.exports = MapField;

// extends Field
var Field = require("./field");
((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";

var types   = require("./types"),
    util    = require("./util");

/**
 * Constructs a new map field instance.
 * @classdesc Reflected map field.
 * @extends Field
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} keyType Key type
 * @param {string} type Value type
 * @param {Object.<string,*>} [options] Declared options
 */
function MapField(name, id, keyType, type, options) {
    Field.call(this, name, id, type, options);

    /* istanbul ignore if */
    if (!util.isString(keyType))
        throw TypeError("keyType must be a string");

    /**
     * Key type.
     * @type {string}
     */
    this.keyType = keyType; // toJSON, marker

    /**
     * Resolved key type if not a basic type.
     * @type {?ReflectionObject}
     */
    this.resolvedKeyType = null;

    // Overrides Field#map
    this.map = true;
}

/**
 * Map field descriptor.
 * @typedef MapFieldDescriptor
 * @type {Object}
 * @property {string} keyType Key type
 * @property {string} type Value type
 * @property {number} id Field id
 * @property {Object.<string,*>} [options] Field options
 */

/**
 * Extension map field descriptor.
 * @typedef ExtensionMapFieldDescriptor
 * @type {Object}
 * @property {string} keyType Key type
 * @property {string} type Value type
 * @property {number} id Field id
 * @property {string} extend Extended type
 * @property {Object.<string,*>} [options] Field options
 */

/**
 * Constructs a map field from a map field descriptor.
 * @param {string} name Field name
 * @param {MapFieldDescriptor} json Map field descriptor
 * @returns {MapField} Created map field
 * @throws {TypeError} If arguments are invalid
 */
MapField.fromJSON = function fromJSON(name, json) {
    return new MapField(name, json.id, json.keyType, json.type, json.options);
};

/**
 * Converts this map field to a map field descriptor.
 * @returns {MapFieldDescriptor} Map field descriptor
 */
MapField.prototype.toJSON = function toJSON() {
    return {
        keyType : this.keyType,
        type    : this.type,
        id      : this.id,
        extend  : this.extend,
        options : this.options
    };
};

/**
 * @override
 */
MapField.prototype.resolve = function resolve() {
    if (this.resolved)
        return this;

    // Besides a value type, map fields have a key type that may be "any scalar type except for floating point types and bytes"
    if (types.mapKey[this.keyType] === undefined)
        throw Error("invalid key type: " + this.keyType);

    return Field.prototype.resolve.call(this);
};
