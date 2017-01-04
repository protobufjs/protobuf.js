"use strict";
var converters = exports;

var util = require("./util/runtime");

/**
 * JSON conversion options as used by {@link Message#asJSON}.
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
 * @property {boolean} [arrays=false] Sets empty arrays for missing repeated fields even if `defaults=false`
 */

/**
 * Converter implementation producing JSON.
 * @type {ConverterImpl}
 */
converters.json = {
    create: function(value, typeOrCtor, options) {
        if (!value) // inner messages
            return null;
        return options.fieldsOnly
            ? {}
            : util.merge({}, value);
    },
    enums: function(value, defaultValue, values, options) {
        if (value === undefined)
            value = defaultValue;
        return options.enums === String && typeof value === "number"
            ? values[value]
            : value;
    },
    longs: function(value, defaultLow, defaultHigh, unsigned, options) {
        if (value === undefined || value === null)
            value = { low: defaultLow, high: defaultHigh };
        if (options.longs === Number)
            return typeof value === "number"
                ? value
                : util.LongBits.from(value).toNumber(unsigned);
        if (options.longs === String) {
            if (typeof value === "number")
                return util.Long.fromNumber(value, unsigned).toString();
            value = util.Long.fromValue(value); // has no unsigned option
            value.unsigned = unsigned;
            return value.toString();
        }
        return value;
    },
    bytes: function(value, defaultValue, options) {
        if (!value) {
            value = defaultValue;
        } else if (!value.length && !options.defaults)
            return undefined;
        return options.bytes === String
            ? util.base64.encode(value, 0, value.length)
            : options.bytes === Array
            ? Array.prototype.slice.call(value)
            : options.bytes === util.Buffer && !util.Buffer.isBuffer(value)
            ? util.Buffer.from(value) // polyfilled
            : value;
    }
};

/**
 * Message conversion options as used by {@link Message.from} and {@link Type#from}.
 * @typedef MessageConversionOptions
 * @type {Object}
 * @property {boolean} [fieldsOnly=false] Keeps only properties that reference a field
 */
// Note that options.defaults and options.arrays also affect the message converter.
// As defaults are already on the prototype, usage is not recommended and thus undocumented.

/**
 * Converter implementation producing runtime messages.
 * @type {ConverterImpl}
 */
converters.message = {
    create: function(value, typeOrCtor, options) {
        if (!value)
            return null;
        // can't use instanceof Type here because converters are also part of the minimal runtime
        return new (typeOrCtor.ctor ? typeOrCtor.ctor : typeOrCtor)(options.fieldsOnly ? undefined : value);
    },
    enums: function(value, defaultValue, values) {
        if (typeof value === "string")
            return values[value];
        return value;
    },
    longs: function(value, defaultLow, defaultHigh, unsigned) {
        if (typeof value === "string")
            return util.Long.fromString(value, unsigned);
        if (typeof value === "number")
            return util.Long.fromNumber(value, unsigned);
        return value;
    },
    bytes: function(value/*, defaultValue*/) {
        if (util.Buffer)
            return util.Buffer.isBuffer(value)
                ? value
                : util.Buffer.from(value, "base64"); // polyfilled
        if (typeof value === "string") {
            var buf = util.newBuffer(util.base64.length(value));
            util.base64.decode(value, buf, 0);
            return buf;
        }
        return value instanceof util.Array
            ? value
            : new util.Array(value);
    }
};
