var ReflectionObject = require("./object");

module.exports = Enum;

/**
 * Reflected enum.
 * @extends ReflectionObject
 * @param {string} name Unique name within its namespace
 * @param {!Object.<string,number>=} values
 * @param {!Object.<string,*>=} options
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
 * @param {!Object} json
 * @returns {boolean}
 */
Enum.testJSON = function testJSON(json) {
    return Boolean(json && json.values);
};

/**
 * Creates an enum from JSON.
 * @param {string} name
 * @param {!Object.<string,*>} json
 * @returns {!Enum}
 */
Enum.fromJSON = function fromJSON(name, json) {
    return new Enum(name, json.values, json.options);
};

/**
 * Tests whether the specified value is present on the wire.
 * @param {*} value
 * @returns {boolean}
 */
EnumPrototype.present = function present(value) {
    return value > 0;
};
