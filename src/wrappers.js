"use strict";

/**
 * Wrappers for common types.
 * @type {Object.<string,IWrapper>}
 * @const
 */
var wrappers = exports;

var Message = require("./message");

/**
 * From object converter part of an {@link IWrapper}.
 * @typedef WrapperFromObjectConverter
 * @type {function}
 * @param {Object.<string,*>} object Plain object
 * @returns {Message<{}>} Message instance
 * @this Type
 */

/**
 * To object converter part of an {@link IWrapper}.
 * @typedef WrapperToObjectConverter
 * @type {function}
 * @param {Message<{}>} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 * @this Type
 */

/**
 * Common type wrapper part of {@link wrappers}.
 * @interface IWrapper
 * @property {WrapperFromObjectConverter} [fromObject] From object converter
 * @property {WrapperToObjectConverter} [toObject] To object converter
 */

// Custom wrapper for Any
wrappers[".google.protobuf.Any"] = {

    fromObject: function(object) {

        // unwrap value type if mapped
        if (object && object["@type"]) {
            var type = this.lookup(object["@type"]);
            /* istanbul ignore else */
            if (type) {
                // type_url does not accept leading "."
                var type_url = object["@type"].charAt(0) === "." ?
                    object["@type"].substr(1) : object["@type"];
                return this.create({
                    type_url: type_url,
                    value: type.encode(type.fromObject(object)).finish()
                });
            }
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
            var object = message.$type.toObject(message, options);
            object["@type"] = message.$type.fullName;
            return object;
        }

        return this.toObject(message, options);
    }
};

// Custom wrapper for Struct
wrappers[".google.protobuf.Struct"] = {

    // given a plain javascript object, return a protobuf Struct object
    fromObject: function(object) {
        var Struct = this.lookup("google.protobuf.Struct");
        var Value = this.lookup("google.protobuf.Value");

        var toValue = function(v) {
            var valueDef;
            if (v === null) {
                valueDef = {nullValue: 0};
            } else if (typeof v === "number") {
                valueDef = {numberValue: v};
            } else if (typeof v === "string") {
                valueDef = {stringValue: v};
            } else if (typeof v === "boolean") {
                valueDef = {boolValue: v};
            } else if (Array.isArray(v)) {
                valueDef = {listValue: {
                    values: v.map(function(i) { return toValue(i); })
                }};
            } else if (typeof v === "object") {
                valueDef = {structValue: toStruct(v)};
            } else {
                return valueDef = {nullValue: 0};
            }
            return Value.create(valueDef);
        };

        var toStruct = function(o) {
            var structDef = {fields: {}};

            Object.keys(o).forEach(function (k) {
                structDef.fields[k] = toValue(o[k]);
            });
            return Struct.create(structDef);
        };

        return toStruct(object);
    },

    // given a protobuf Struct object, return a plain JS object
    toObject: function(message, options) {
        function fromValue(v) {
            if (v.kind === "nullValue") {
                v = null;
            } else if (v.kind === "numberValue") {
                v = v.numberValue;
            } else if (v.kind === "stringValue") {
                v = v.stringValue;
            } else if (v.kind === "boolValue") {
                v = v.boolValue;
            } else if (v.kind === "structValue") {
                v = fromStruct(v.structValue);
            } else if (v.kind === "listValue") {
                v = v.listValue.values.map(fromValue);
            }
            return v;
        }

        function fromStruct(struct) {
            var object = {};
            var fields = struct.fields;
            Object.keys(fields).forEach(function (k) {
                object[k] = fromValue(fields[k]);
            });
            return object;
        }

        return fromStruct(message);
    }
};

