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
             // Only use fully qualified type name after the last '/'
            var name = object["@type"].substring(object["@type"].lastIndexOf("/") + 1);
            var type = this.lookup(name);
            /* istanbul ignore else */
            if (type) {
                // type_url does not accept leading "."
                var type_url = object["@type"].charAt(0) === "." ?
                    object["@type"].slice(1) : object["@type"];
                // type_url prefix is optional, but path seperator is required
                if (type_url.indexOf("/") === -1) {
                    type_url = "/" + type_url;
                }
                return this.create({
                    type_url: type_url,
                    value: type.encode(type.fromObject(object)).finish()
                });
            }
        }

        return this.fromObject(object);
    },

    toObject: function(message, options) {

        // Default prefix
        var googleApi = "type.googleapis.com/";
        var prefix = "";
        var name = "";

        // decode value if requested and unmapped
        if (options && options.json && message.type_url && message.value) {
            // Only use fully qualified type name after the last '/'
            name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
            // Separate the prefix used
            prefix = message.type_url.substring(0, message.type_url.lastIndexOf("/") + 1);
            var type = this.lookup(name);
            /* istanbul ignore else */
            if (type)
                message = type.decode(message.value);
        }

        // wrap value if unmapped
        if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.$type.toObject(message, options);
            var messageName = message.$type.fullName[0] === "." ?
                message.$type.fullName.slice(1) : message.$type.fullName;
            // Default to type.googleapis.com prefix if no prefix is used
            if (prefix === "") {
                prefix = googleApi;
            }
            name = prefix + messageName;
            object["@type"] = name;
            return object;
        }

        return this.toObject(message, options);
    }
};

// Custom wrapper for Struct
wrappers[".google.protobuf.Struct"] = {
    fromObject: function(object) {
        console.log('[DEBUG] Struct.fromObject called with:', object);
        // If already a Struct instance, return as is
        if (object instanceof this.ctor) return object;
        // Convert plain JS object to Struct
        var fields = {};
        if (object && typeof object === "object" && !Array.isArray(object)) {
            for (var k in object) {
                if (object[k] !== undefined) {
                    fields[k] = this.lookup("Value").fromObject(object[k]);
                }
            }
        }
        return this.create({ fields });
    },
    toObject: function(message, options) {
        // Convert Struct message to plain JS object
        var obj = {};
        if (message && message.fields) {
            var Value = this.lookup("Value");
            for (var k in message.fields) {
                obj[k] = Value.toObject(message.fields[k], options);
            }
        }
        return obj;
    }
};

// Custom wrapper for Value
wrappers[".google.protobuf.Value"] = {
    fromObject: function(object) {
        // If already a Value instance, return as is
        if (object instanceof this.ctor) return object;
        
        // Handle different types and convert to appropriate Value field
        if (object === null || object === undefined) {
            return this.create({ null_value: 0 });
        }
        
        if (typeof object === "string") {
            return this.create({ string_value: object });
        }
        
        if (typeof object === "number") {
            return this.create({ number_value: object });
        }
        
        if (typeof object === "boolean") {
            return this.create({ bool_value: object });
        }
        
        if (Array.isArray(object)) {
            // Use the ListValue wrapper's fromObject to ensure correct construction
            var ListValue = this.lookup("ListValue");
            return this.create({ list_value: ListValue.fromObject(object) });
        }
        
        if (typeof object === "object") {
            // Convert object to Struct
            var Struct = this.lookup("Struct");
            return this.create({ struct_value: Struct.fromObject(object) });
        }
        
        // Fallback to null value for unknown types
        return this.create({ null_value: 0 });
    },
    toObject: function(message, options) {
        // Convert Value message to plain JS object
        if (message.hasOwnProperty("null_value")) {
            return null;
        }
        if (message.hasOwnProperty("string_value")) {
            return message.string_value;
        }
        if (message.hasOwnProperty("number_value")) {
            return message.number_value;
        }
        if (message.hasOwnProperty("bool_value")) {
            return message.bool_value;
        }
        if (message.hasOwnProperty("list_value")) {
            var values = [];
            for (var i = 0; i < message.list_value.values.length; i++) {
                values.push(wrappers[".google.protobuf.Value"].toObject.call(this, message.list_value.values[i], options));
            }
            return values;
        }
        if (message.hasOwnProperty("struct_value")) {
            var Struct = this.lookup("Struct");
            return Struct.toObject(message.struct_value, options);
        }
        return null;
    }
};

// Custom wrapper for ListValue
wrappers[".google.protobuf.ListValue"] = {
    fromObject: function(object) {
        // If already a ListValue instance, return as is
        if (object instanceof this.ctor) return object;
        
        // Convert array to ListValue
        var values = [];
        if (Array.isArray(object)) {
            var Value = this.lookup("Value");
            for (var i = 0; i < object.length; i++) {
                values.push(Value.fromObject(object[i]));
            }
        }
        var msg = this.create();
        msg.values = values;
        return msg;
    },
    toObject: function(message, options) {
        // Convert ListValue message to plain JS array
        var values = [];
        if (message && message.values) {
            var Value = this.lookup("Value");
            for (var i = 0; i < message.values.length; i++) {
                values.push(Value.toObject(message.values[i], options));
            }
        }
        return values;
    }
};
