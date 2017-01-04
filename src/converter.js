"use strict";
module.exports = converter;

var Enum       = require("./enum"),
    converters = require("./converters"),
    util       = require("./util");

var sprintf    = util.codegen.sprintf;

function genConvert(field, fieldIndex, prop) {
    if (field.resolvedType)
        return field.resolvedType instanceof Enum
            // enums
            ? sprintf("f.enums(s%s,%d,types[%d].values,o)", prop, field.typeDefault, fieldIndex)
            // recurse into messages
            : sprintf("types[%d].convert(s%s,f,o)", fieldIndex, prop);
    switch (field.type) {
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
            // longs
            return sprintf("f.longs(s%s,%d,%d,%j,o)", prop, field.typeDefault.low, field.typeDefault.high, field.type.charAt(0) === "u");
        case "bytes":
            // bytes
            return sprintf("f.bytes(s%s,%j,o)", prop, Array.prototype.slice.call(field.typeDefault));
    }
    return null;
}

/**
 * Generates a conveter specific to the specified message type.
 * @param {Type} mtype Message type
 * @param {function} generateField Field generator
 * @returns {Codegen} Codegen instance
 * @property {ConverterImpl} json Converter implementation producing JSON
 * @property {ConverterImpl} message Converter implementation producing runtime messages
 */
function converter(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var fields = mtype.fieldsArray;
    var gen = util.codegen("s", "f", "o")
    ("if(!o)")
        ("o={}")
    ("var d=f.create(s,this,o)");
    if (fields.length) { gen
    ("if(d){");
        var convert;
        fields.forEach(function(field, i) {
            var prop = util.safeProp(field.resolve().name);

            // repeated
            if (field.repeated) { gen
        ("if(s%s&&s%s.length){", prop, prop)
            ("d%s=[]", prop)
            ("for(var i=0;i<s%s.length;++i)", prop);
                if (convert = genConvert(field, i, prop + "[i]")) gen
                ("d%s.push(%s)", prop, convert);
                else gen
                ("d%s.push(s%s[i])", prop, prop);
                gen
        ("}else if(o.defaults||o.arrays)")
            ("d%s=[]", prop);

            // non-repeated
            } else if (convert = genConvert(field, i, prop)) {
                if (field.long || field.resolvedType && !(field.resolvedType instanceof Enum)) gen
        ("if(s%s!==undefined&&s%s!==null||o.defaults)", prop, prop);
                else gen
        ("if(s%s!==undefined||o.defaults)", prop);
                gen
            ("d%s=%s", prop, convert);
            } else gen
        ("if(d%s===undefined&&o.defaults)", prop)
            ("d%s=%j", prop, field.typeDefault /* == field.defaultValue */);

        });
        gen
    ("}");
    }
    return gen
    ("return d");
    /* eslint-enable no-unexpected-multiline */
}

util.merge(converter, converters);

/**
 * A converter implementation as used by {@link Type#convert} respectively {@link Message.convert}.
 * @typedef ConverterImpl
 * @type {Object}
 * @property {ConverterCreate} create Function for creating a new destination object
 * @property {ConverterEnums} enums Function for converting enum values
 * @property {ConverterLongs} longs Function for converting long values
 * @property {ConverterBytes} bytes Function for converting bytes values
 */

/**
 * A function for creating a new destination object.
 * @typedef ConverterCreate
 * @type {function}
 * @param {Message|Object} value Source object or message
 * @param {Function} typeOrCtor Reflected type or message constructor
 * @param {Object.<string,*>} [options] Conversion options
 * @returns {Message|Object} Destination object or message
 */

/**
 * A function for converting enum values.
 * @typedef ConverterEnums
 * @type {function}
 * @param {number|string} value Actual value
 * @param {number} defaultValue Default value
 * @param {Object.<string,number>} values Possible values
 * @param {Object.<string,*>} [options] Conversion options
 * @returns {number|string} Converted value
 */

/**
 * A function for converting long values.
 * @typedef ConverterLongs
 * @type {function}
 * @param {number|string|Long} value Actual value
 * @param {Long} defaultValue Default value
 * @param {boolean} unsigned Whether unsigned or not
 * @param {Object.<string,*>} [options] Conversion options
 * @returns {number|string|Long} Converted value
 */

/**
 * A function for converting bytes values.
 * @typedef ConverterBytes
 * @type {function}
 * @param {string|number[]|Uint8Array} value Actual value
 * @param {number[]} defaultValue Default value
 * @param {Object.<string,*>} [options] Conversion options
 * @returns {string|number[]|Uint8Array} Converted value 
 */
