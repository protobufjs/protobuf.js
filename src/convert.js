"use strict";
module.exports = convert;

var Enum    = require("./enum"),
    util    = require("./util");

var Type,    // cyclic
    Message;

/**
 * A converter as used by {@link convert}.
 * @typedef Converter
 * @type {function}
 * @param {Field} field Reflected field
 * @param {*} value Value to convert
 * @param {Object.<string,*>} options Conversion options
 * @returns {*} Converted value
 */

/**
 * Converts between JSON objects and messages, based on reflection information.
 * @param {Type} type Type
 * @param {*} source Source object
 * @param {*} destination Destination object
 * @param {Object.<string,*>} options Conversion options
 * @param {Converter} converter Conversion function
 * @returns {*} `destination`
 * @property {Converter} toJson To JSON converter using {@link JSONConversionOptions}
 * @property {Converter} toMessage To message converter using {@link MessageConversionOptions}
 */
function convert(type, source, destination, options, converter) {

    if (!Type) { // require this here already so it is available within the converters below
        Type = require("./type");
        Message = require("./message");
    }

    if (!options)
        options = {};

    var keys = Object.keys(options.defaults ? type.fields : source);
    for (var i = 0, key; i < keys.length; ++i) {
        var field = type.fields[key = keys[i]],
            value = source[key];
        if (field) {
            if (field.repeated) {
                if (value || options.defaults) {
                    destination[key] = [];
                    if (value)
                        for (var j = 0, l = value.length; j < l; ++j)
                            destination[key].push(converter(field, value[j], options));
                }
            } else
                destination[key] = converter(field, value, options);
        } else if (!options.fieldsOnly)
            destination[key] = value;
    }
    return destination;
}

/**
 * JSON conversion options as used by {@link Message#asJSON} with {@link convert}.
 * @typedef JSONConversionOptions
 * @type {Object}
 * @property {boolean} [fieldsOnly=false] Keeps only properties that reference a field
 * @property {*} [longs] Long conversion type. Only relevant with a long library.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to a possibly unsafe number without, and a `Long` with a long library.
 * @property {*} [enums=Number] Enum value conversion type.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to the numeric ids.
 * @property {*} [bytes] Bytes value conversion type.
 * Valid values are `Array` and `String` (the global types).
 * Defaults to return the underlying buffer type.
 * @property {boolean} [defaults=false] Also sets default values on the resulting object
 */
/**/
convert.toJson = function toJson(field, value, options) {
    if (!options)
        options = {};

    // Recurse into inner messages
    if (value instanceof Message)
        return convert(value.$type, value, {}, options, toJson);

    // Enums as strings
    if (options.enums && field.resolvedType instanceof Enum)
        return options.enums === String
            ? field.resolvedType.getValuesById()[value]
            : value | 0;

    // Longs as numbers or strings
    if (options.longs && field.long) {
        var unsigned = field.type.charAt(0) === "u";
        if (options.longs === Number)
            return typeof value === "number"
                ? value
                : util.LongBits.from(value).toNumber(unsigned);
        if (options.longs === String) {
            if(typeof value === "number")
                return util.Long.fromNumber(value, unsigned).toString();
            value = util.Long.fromValue(value); // TODO: fromValue is missing an unsigned option (long.js 3.2.0)
            value.unsigned = unsigned;
            return value.toString();
        }
    }

    // Bytes as base64 strings, plain arrays or buffers
    if (options.bytes && field.bytes) {
        if (options.bytes === String)
            return util.base64.encode(value, 0, value.length);
        if (options.bytes === Array)
            return Array.prototype.slice.call(value);
        if (options.bytes === util.Buffer && !util.Buffer.isBuffer(value))
            return util.Buffer.from(value); // polyfilled
    }
    return value;
};

/**
 * Message conversion options as used by {@link Message.from} and {@link Type#from} with {@link convert}.
 * @typedef MessageConversionOptions
 * @type {Object}
 * @property {boolean} [fieldsOnly=false] Keeps only properties that reference a field
 */
/**/
convert.toMessage = function toMessage(field, value, options) {
    switch (typeof value) {

        // Recurse into inner messages
        case "object":
            if (value) {
                if (field.resolvedType instanceof Type)
                    return convert(field.resolvedType, value, new (field.resolvedType.getCtor())(), options, toMessage);
                if (field.type === "bytes")
                    return util.Buffer
                        ? util.Buffer.isBuffer(value)
                          ? value
                          : util.Buffer.from(value) // polyfilled
                        : value instanceof util.Array
                          ? value
                          : new util.Array(value);
            }
            break;

        // Strings to proper numbers, longs or buffers
        case "string":
            if (field.resolvedType instanceof Enum)
                return field.resolvedType.values[value] || 0;
            if (field.long)
                return util.Long.fromString(value, field.type.charAt(0) === "u");
            if (field.bytes) {
                var buf = util.newBuffer(util.base64.length(value));
                util.base64.decode(value, buf, 0);
                return buf;
            }
            break;

        // Numbers to proper longs
        case "number":
            if (field.long)
                return util.Long.fromNumber(value, field.type.charAt(0) === "u");
            break;

    }
    return value;
};
