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
        var any    = !(options && options.fieldsOnly),
            fields = this.constructor.$type.fields,
            keys   = Object.keys(properties);
        for (var i = 0, k = keys.length, key; i < k; ++i)
            if (fields[key = keys[i]] || any)
                this[key] = properties[key];
    }
}

/**
 * Converts a runtime message to a JSON object.
 * @param {Object.<string,*>} [options] Conversion options
 * @param {boolean} [options.fieldsOnly=false] Converts only properties that reference a field
 * @param {Function} [options.long] Long conversion type. Only relevant with a long library. Valid
 * values are `String` and `Number` (the global types).
 * Defaults to a possibly unsafe number without, and a `Long` with a long library.
 * @param {Function} [options.enum=Number] Enum value conversion type. Valid values are `String`
 * and `Number` (the global types).
 * Defaults to the values' numeric ids.
 * @returns {Object.<string,*>} JSON object
 */
Prototype.prototype.asJSON = function asJSON(options) {
    var any    = !(options && options.fieldsOnly),
        fields = this.constructor.$type.fields,
        json   = {};
    var keys   = Object.keys(this);
    for (var i = 0, k = keys.length, key; i < k; ++i) {
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
