"use strict";
module.exports = Prototype;

/**
 * Options passed to the {@link Prototype|prototype constructor}, modifying its behavior.
 * @typedef PrototypeOptions
 * @type {Object}
 * @property {boolean} [fieldsOnly=false] Sets only properties that reference a field
 */

/**
 * Constructs a new prototype.
 * This method should be called from your custom constructors, i.e. `Prototype.call(this, properties)`.
 * @classdesc Runtime message prototype ready to be extended by custom classes or generated code.
 * @constructor
 * @param {Object.<string,*>} [properties] Properties to set
 * @param {PrototypeOptions} [options] Prototype options
 * @abstract
 * @see {@link inherits}
 * @see {@link Class}
 */
function Prototype(properties, options) {
    if (properties) {
        var any    = !(options && options.fieldsOnly),
            fields = this.constructor.$type.fields,
            keys   = Object.keys(properties);
        for (var i = 0; i < keys.length; ++i)
            if (fields[keys[i]] || any)
                this[keys[i]] = properties[keys[i]];
    }
}

/**
 * Converts a runtime message to a JSON object.
 * @param {Object.<string,*>} [options] Conversion options
 * @param {boolean} [options.fieldsOnly=false] Converts only properties that reference a field
 * @param {Function} [options.long] Long conversion type. Only relevant with a long library.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to a possibly unsafe number without, and a `Long` with a long library.
 * @param {Function} [options.enum=Number] Enum value conversion type.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to the numeric ids.
 * @returns {Object.<string,*>} JSON object
 */
Prototype.prototype.asJSON = function asJSON(options) {
    var any    = !(options && options.fieldsOnly),
        fields = this.constructor.$type.fields,
        json   = {};
    var keys   = Object.keys(this);
    for (var i = 0, key; i < keys.length; ++i) {
        var field = fields[key = keys[i]],
            value = this[key];
        if (field) {
            if (field.repeated) {
                if (value && value.length) {
                    var array = new Array(value.length);
                    for (var j = 0, l = value.length; j < l; ++j)
                        array[j] = field.jsonConvert(value[j], options);
                    json[key] = array;
                }
            } else
                json[key] = field.jsonConvert(value, options);
        } else if (any)
            json[key] = value;
    }
    return json;
};
