var ReflectionObject = require("./object");

module.exports = Enum;

/**
 * Reflected enum.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {!Object.<string,number>} [values] Enum values as an object, by name
 * @param {!Object.<string,*>} [options] Enum options
 */
function Enum(name, values, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Enum values by name.
     * @type {!Object.<string,number>}
     */
    this.values = values || {};

    /**
     * Cached values by id.
     * @type {?Object.<number,string>}
     * @private
     */
    this._valuesById = null;
}

var EnumPrototype = ReflectionObject.extend(Enum, [ "values" ]);

Object.defineProperties(EnumPrototype, {

    /**
     * Enum values by id.
     * @name Enum#valuesById
     * @type {!Object.<number,string>}
     * @readonly
     */
    valuesById: {
        get: function() {
            if (!this._valuesById) {
                this._valuesById = {};
                Object.keys(this.values).forEach(function(name) {
                    var id = this.values[name];
                    this._valuesById[id] = name;
                }, this);
            }
            return this._valuesById;
        }
    }

});

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
 * @param {!Object.<string,*>} json JSON object
 * @returns {!Enum} Created enum
 */
Enum.fromJSON = function fromJSON(name, json) {
    return new Enum(name, json.values, json.options);
};

/**
 * Adds a value to this enum.
 * @param {string} name Value name
 * @param {number} id Value id
 * @returns {!Enum} this
 */
/* EnumPrototype.add = function(name, id) {
    if (!util.isString(name))
        throw TypeError("name must be a string");
    if (!util.isInteger(id) || id < 0)
        throw TypeError("id must be a positive integer");
    this.values[name] = id;
    this._valuesById = null;
    return this;
}; */

/**
 * Removes a value from this enum
 * @param {string} name Value name
 * @returns {!Enum} this
 */
/* EnumPrototype.remove = function(name) {
    if (!util.isString(name))
        throw TypeError("name must be a string");
    delete this.values[name];
    this._valuesById = null;
    return this;
}; */
