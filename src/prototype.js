module.exports = Prototype;

/**
 * Runtime message prototype ready to be extended by custom classes or generated code.
 * @constructor
 * @param {Object.<string,*>} [properties] Properties to set
 * @param {Object.<string,*>} [options] Initialization options
 * @param {boolean} [options.fieldsOnly=false] Sets only properties that reference a field
 * @abstract
 * @see {@link inherits}
 * @see {@link Class}
 */
function Prototype(properties, options) {
    if (properties) {
        var fieldsOnly = Boolean(options && options.fieldsOnly),
            fields = this.constructor.$type.fields,
            keys = Object.keys(properties);
        for (var i = 0, k = keys.length, key; i < k; ++i)
            if (!fieldsOnly || fields[key])
                this._fields[key = keys[i]] = properties[key];
    }
}

/**
 * Converts a runtime message to a JSON object.
 * @param {Object.<string,*>} [options] Conversion options
 * @param {boolean} [options.fieldsOnly=false] Converts only properties that reference a field
 * @param {Function} [options.long] Long conversion type. Valid values are `String` (requires a
 * long library) and `Number` (throws without a long library if unsafe).
 * Defaults to the internal representation.
 * @param {Function} [options.enum] Enum value conversion type. Only valid value is `String`.
 * Defaults to the values' numeric ids.
 * @returns {Object.<string,*>} JSON object
 */
Prototype.prototype.asJSON = function asJSON(options) {
    var fields = this.constructor.$type.fields,
        json = {};
    for (var key in this) { // also enumerates prototype
        var field = fields[key];
        if (field)
            json[key] = field.jsonConvert(this[key], options)
        else if (!options.fieldsOnly)
            json[key] = this[key];
    }
    return json;
};

/**
 * Beware: This method does not return JSON but it overrides the object serialized by `JSON.stringify`.
 * To convert a message to JSON manually, use {@link Prototype#asJSON} instead.
 * @returns {Object.<string,*>} JSON serializable object
 */
Prototype.prototype.toJSON = function toJSON() {
    return this._fields;
};
