"use strict";

/**
 * Wrappers for common types.
 * @namespace
 */
var wrappers = exports;

var Message = require("./message"),
    util    = require("./util/minimal");

/**
 * From object converter part of a {@link Wrapper}.
 * @typedef WrapperFromObjectConverter
 * @type {function}
 * @param {Object.<string,*>} object Plain object
 * @returns {Message<{}>}
 * @this Type
 */

/**
 * To object converter part of a {@link Wrapper}.
 * @typedef WrapperToObjectConverter
 * @type {function}
 * @param {Message<{}>} message Message instance
 * @param {ConversionOptions=} options Conversion options
 * @returns {Object.<string,*>}
 * @this Type
 */

/**
 * Common type wrapper part of {@link wrappers}.
 * @typedef Wrapper
 * @type {Object}
 * @property {WrapperFromObjectConverter} [fromObject] From object converter
 * @property {WrapperToObjectConverter} [toObject] To object converter
 */

/**
 * Custom wrapper for Any.
 * @type {Wrapper}
 */
wrappers[".google.protobuf.Any"] = {

    fromObject: function(object) {

        // unwrap value type if mapped
        if (object && object["@type"]) {
            var type = this.lookup(object["@type"]);
            /* istanbul ignore else */
            if (type)
                return type.fromObject(object);
        }

        return this.fromObject(object);
    },

    toObject: function(message, options) {

        // decode value if requested and unmapped
        if (options && options.json && message.type_url && message.value) {
            var type = this.lookup(message.type_url);
            /* istanbul ignore else */
            if (type)
                message = type.decode(message.value);
        }

        // wrap value if unmapped
        if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.toObject(options);
            object["@type"] = message.$type.fullName;
            return object;
        }

        return this.toObject(message, options);
    }
};
