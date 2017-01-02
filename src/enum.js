"use strict";
module.exports = Enum;

var ReflectionObject = require("./object");
/** @alias Enum.prototype */
var EnumPrototype = ReflectionObject.extend(Enum);

Enum.className = "Enum";

var util = require("./util");

var TypeError = util._TypeError;

/**
 * Constructs a new enum instance.
 * @classdesc Reflected enum.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {Object.<string,number>} [values] Enum values as an object, by name
 * @param {Object.<string,*>} [options] Declared options
 */
function Enum(name, values, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Enum values by id.
     * @type {Object.<number,string>}
     */
    this.valuesById = {};

    /**
     * Enum values by name.
     * @type {Object.<string,number>}
     */
    this.values = Object.create(this.valuesById); // toJSON, marker

    // Note that values inherit valuesById on their prototype which makes them a TypeScript-
    // compatible enum. This is used by pbts to write actual enum definitions that work for
    // static and reflection code alike instead of emitting generic object definitions.

    var self = this;
    Object.keys(values || {}).forEach(function(key) {
        var val;
        if (typeof values[key] === "number")
            val = values[key];
        else {
            val = parseInt(key, 10);
            key = values[key];
        }
        self.valuesById[self.values[key] = val] = key;
    });
}

/**
 * Tests if the specified JSON object describes an enum.
 * @param {*} json JSON object to test
 * @returns {boolean} `true` if the object describes an enum
 */
Enum.testJSON = function testJSON(json) {
    return Boolean(json && json.values);
};

/**
 * Creates an enum from JSON.
 * @param {string} name Enum name
 * @param {Object.<string,*>} json JSON object
 * @returns {Enum} Created enum
 * @throws {TypeError} If arguments are invalid
 */
Enum.fromJSON = function fromJSON(name, json) {
    return new Enum(name, json.values, json.options);
};

/**
 * @override
 */
EnumPrototype.toJSON = function toJSON() {
    return {
        options : this.options,
        values  : this.values
    };
};

/**
 * Adds a value to this enum.
 * @param {string} name Value name
 * @param {number} id Value id
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a value with this name or id
 */
EnumPrototype.add = function(name, id) {

    /* istanbul ignore next */
    if (!util.isString(name))
        throw TypeError("name");
    /* istanbul ignore next */
    if (!util.isInteger(id) || id < 0)
        throw TypeError("id", "a non-negative integer");
    /* istanbul ignore next */
    if (this.values[name] !== undefined)
        throw Error("duplicate name '" + name + "' in " + this);
    /* istanbul ignore next */
    if (this.valuesById[id] !== undefined)
        throw Error("duplicate id " + id + " in " + this);

    this.valuesById[this.values[name] = id] = name;
    return this;
};

/**
 * Removes a value from this enum
 * @param {string} name Value name
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `name` is not a name of this enum
 */
EnumPrototype.remove = function(name) {
    if (!util.isString(name))
        throw TypeError("name");
    var val = this.values[name];
    if (val === undefined)
        throw Error("'" + name + "' is not a name of " + this);
    delete this.valuesById[val];
    delete this.values[name];
    return this;
};
