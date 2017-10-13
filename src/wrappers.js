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

// Custom wrapper for Value
wrappers[".google.protobuf.Value"] = {
    // given a plain javascript scalar or object, return a protobuf Value
    fromObject: function(object) {
        var Struct = this.lookup("google.protobuf.Struct");
        var Value = this.lookup("google.protobuf.Value");

        var valueDef;
        if (object === null) {
            valueDef = {nullValue: 0};
        } else if (typeof object === "number") {
            valueDef = {numberValue: object};
        } else if (typeof object === "string") {
            valueDef = {stringValue: object};
        } else if (typeof object === "boolean") {
            valueDef = {boolValue: object};
        } else if (Array.isArray(object)) {
            valueDef = {listValue: {
                values: object.map(function(i) { return Value.fromObject(i); })
            }};
        } else if (typeof object === "object") {
            valueDef = {structValue: Struct.fromObject(object)};
        } else {
            return valueDef = {nullValue: 0};
        }
        return Value.create(valueDef);
    },

    toObject: function(message, options) {
        var Struct = this.lookup("google.protobuf.Struct");
        var Value = this.lookup("google.protobuf.Value");

        var object;
        if (message.kind === "nullValue") {
            object = null;
        } else if (message.kind === "numberValue") {
            object = message.numberValue;
        } else if (message.kind === "stringValue") {
            object = message.stringValue;
        } else if (message.kind === "boolValue") {
            object = message.boolValue;
        } else if (message.kind === "structValue") {
            object = Struct.toObject(message.structValue);
        } else if (message.kind === "listValue") {
            object = message.listValue.values.map(Value.toObject.bind(Value));
        }

        return object;
    }
};

// Custom wrapper for Struct
wrappers[".google.protobuf.Struct"] = {

    // given a plain javascript object, return a protobuf Struct object
    fromObject: function(object) {
        var Struct = this.lookup("google.protobuf.Struct");
        var Value = this.lookup("google.protobuf.Value");
        var structDef = {fields: {}};

        Object.keys(object).forEach(function (k) {
            structDef.fields[k] = Value.fromObject(object[k]);
        });
        return Struct.create(structDef);
    },

    // given a protobuf Struct object, return a plain JS object
    toObject: function(message, options) {
        var Value = this.lookup("google.protobuf.Value");
        var object = {};
        var fields = message.fields;

        Object.keys(fields).forEach(function (k) {
            object[k] = Value.toObject(fields[k], options);
        });
        return object;
    }
};
