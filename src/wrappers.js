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
                    object["@type"].substr(1) : object["@type"];
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
                message.$type.fullName.substr(1) : message.$type.fullName;
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

// recursive .fromObject implementation for google.protobuf.Value
function googleProtobufValueFromObject(object, create) {
    if (object === null) {
        return create({
            kind: "nullValue",
            nullValue: 0
        });
    }
    if (typeof object === "number") {
        return create({
            kind: "numberValue",
            numberValue: object
        });
    }
    if (typeof object === "string") {
        return create({
            kind: "stringValue",
            stringValue: object
        });
    }
    if (Array.isArray(object)) {
        var array = object.map(function(element) { return googleProtobufValueFromObject(element, create); });
        return create({
            kind: "listValue",
            listValue: {
                values: array
            }
        });
    }
    if (typeof object === "object") {
        var fields = {},
            names = Object.keys(object),
            i = 0;
        for (; i < names.length; ++i) {
            fields[names[i]] = googleProtobufValueFromObject(object[names[i]], create);
        }
        return create({
            kind: "structValue",
            structValue: {
                fields: fields
            }
        });
    }
    return undefined;
}

// recursive .toObject implementation for google.protobuf.Value
function googleProtobufValueToObject(message) {
    if (message.kind === "nullValue") {
        return null;
    }
    if (message.kind === "numberValue") {
        return message.numberValue;
    }
    if (message.kind === "stringValue") {
        return message.stringValue;
    }
    if (message.kind === "listValue") {
        return message.listValue.values.map(googleProtobufValueToObject);
    }
    if (message.kind === "structValue") {
        if (!message.structValue.fields) {
            return {};
        }
        var names = Object.keys(message.structValue.fields),
            i = 0,
            struct = {};
        for (; i < names.length; ++i) {
            struct[names[i]] = googleProtobufValueToObject(message.structValue["fields"][names[i]]);
        }
        return struct;
    }
    return undefined;
}

// custom wrapper for google.protobuf.Value
wrappers[".google.protobuf.Value"] = {
    fromObject: function(object) {
        // heuristic: if an object looks like a regular representation of google.protobuf.Value,
        // with all those stringValues, etc., just accept it as is for compatibility.
        if (typeof object === "object" && object) {
            // something that has just one property called stringValue, listValue, etc.,
            // and possibly a property called kind, is likely an object we don't want to touch
            var names = Object.keys(object);
            if (names.length === 1 && names.match(/^(?:null|number|string|list|struct)Value$/) ||
                names.length === 2 &&
                    names.every(function(name) {
                        return name.match(/^(?:kind|(?:null|number|string|list|struct)Value)$/); })
            ) {
                return this.fromObject(object);
            }
        }

        // otherwise, it's a JSON representation as described in google/protobuf/struct.proto
        var self = this;
        var message = googleProtobufValueFromObject(object, function(obj) { return self.create(obj); });
        if (typeof message !== "undefined") {
            return message;
        }

        // fallback to the normal .fromObject if decoding failed
        return this.fromObject(object);
    },

    toObject: function(message, options) {
        // decode value if requested
        // In the next major version we will get rid of "options.values".
        if (options && options.json && options.values) {
            var object = googleProtobufValueToObject(message);
            if (typeof object !== "undefined") {
                return object;
            }
        }

        return this.toObject(message, options);
    }
};

// custom wrapper for google.protobuf.Struct
wrappers[".google.protobuf.Struct"] = {
    fromObject: function(object) {
        if (typeof object === "object" && object) {
            var names = Object.keys(object),
                i = 0,
                fields = {},
                Value = this.fields.fields.resolvedType;

            // heuristic: if an object looks like a regular representation of google.protobuf.Struct,
            // with just one field called `fields`, just accept it as is for compatibility.
            if (names.length === 1 && names[0] === "fields") {
                return this.fromObject(object);
            }

            for (; i < names.length; ++i) {
                fields[names[i]] = Value.fromObject(object[names[i]]);
            }
            return this.create({
                fields: fields
            });
        }

        // fallback to the normal .fromObject if decoding failed
        return this.fromObject(object);
    },

    toObject: function(message, options) {
        // decode value if requested
        // In the next major version we will get rid of "options.values".
        if (options && options.json && options.values) {
            if (!message.fields) {
                return {};
            }
            var names = Object.keys(message.fields),
                i = 0,
                struct = {},
                Value = this.fields.fields.resolvedType;
            for (; i < names.length; ++i) {
                struct[names[i]] = Value.toObject(message["fields"][names[i]], options);
            }
            return struct;
        }

        return this.toObject(message, options);
    }
};

// custom wrapper for google.protobuf.Duration
wrappers[".google.protobuf.Duration"] = {
    fromObject: function(object) {
        var match;
        if (typeof object === "string") {
            // whole seconds
            match = object.match(/^(\d+)s$/);
            if (match) {
                return this.create({
                    seconds: Number(match[1]),
                    nanos: 0
                });
            }
            // fractional seconds
            match = object.match(/^(\d*)\.(\d+)s$/);
            if (match) {
                var nanos = match[2];
                // pad trailing zeros; cannot use .padEnd since it will break old versions
                while (nanos.length < 9) {
                    nanos = nanos + "0";
                }
                return this.create({
                    seconds: match[1].length > 0 ? Number(match[1]) : 0,
                    nanos: Number(nanos)
                });
            }
        }
        return this.fromObject(object);
    },

    toObject: function(message, options) {
        if (options && options.json && options.values) {
            var durationSeconds = message.seconds;
            if (message.nanos > 0) {
                var nanosStr = String(message.nanos);
                // add leading zeros; cannot use .padStart since it will break old versions
                while (nanosStr.length < 9) {
                    nanosStr = "0" + nanosStr;
                }
                // nanosStr should contain 3, 6, or 9 fractional digits.
                nanosStr = nanosStr.replace(/^((?:\d\d\d)+?)(?:0*)$/, "$1");
                durationSeconds += "." + nanosStr;
            }
            durationSeconds += "s";
            return durationSeconds;
        }

        return this.toObject(message, options);
    }
};
