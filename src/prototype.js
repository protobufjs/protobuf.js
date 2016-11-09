module.exports = Prototype;

/**
 * Runtime message prototype ready to be extended by custom classes or generated code.
 * 
 * Calling the prototype constructor from within your own classes is optional but you can do so if
 * all you want is to initialize your instance's properties in conformance with the reflected type's
 * fields.
 * 
 * @constructor
 * @param {Object.<string,*>} [properties] Properties to set
 * @param {Object.<string,*>} [options] Initialization options
 * @param {boolean} [options.fieldsOnly=false] Sets only properties that actually reference a field
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
                this[key = keys[i]] = properties[key];
    }
}

/**
 * Converts a runtime message to a JSON object.
 * @param {Object.<string,*>} [options] Conversion options
 * @returns {Object.<string,*>} JSON object
 * @virtual
 */
Prototype.prototype.toJSON = function toJSON(options) {
    var values = this.$values;
    if (!options)
        return values;
    var json = {},
        keys = Object.keys(values);
    for (var i = 0, k = keys.length, key; i < k; ++i) {
        var field = this.constructor.$type.fields[key = keys[i]];
        if (field)
            json[key] = field.jsonConvert(values[key], options);
    }
    return json;
};
