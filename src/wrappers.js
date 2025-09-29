"use strict";

/**
 * Wrappers for common types.
 * @type {Object.<string,IWrapper>}
 * @const
 */
var wrappers = exports;

var Message = require("./message");
var isLegacyStruct = require("./util/is-legacy-struct");

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
        // If already a Struct instance, return as is
        if (object instanceof this.ctor) return object;
        // Convert plain JS object to Struct
        var fields = {};
        if (object && typeof object === "object" && !Array.isArray(object)) {

            // If the struct is in the form of a legacy struct, we don't need to convert it. 
            // Return the fields object as is
            if (isLegacyStruct(object)) {
                return this.create({ fields: object.fields });
            } 

            for (var k in object) {
                if (object[k] !== undefined) {
                    fields[k] = this.lookup("Value").fromObject(object[k]);
                }
            }

            return this.create({ fields });
        }

        return this.fromObject(object);
    },
    toObject: function(message, options) {
        // Convert Struct message to plain JS object
        var obj = {};
        if (message && message.fields) {
            var Value = this.lookup("Value");
            for (var k in message.fields) {
                obj[k] = Value.toObject(message.fields[k], options);
            }
            return obj;
        }

        return this.toObject(message, options);
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
        
        return this.fromObject(object);
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

        return this.toObject(message, options);
    }
};

// Custom wrapper for ListValue
wrappers[".google.protobuf.ListValue"] = {
    fromObject: function(object) {
        // If already a ListValue instance, return as is
        if (object instanceof this.ctor) return object;
        
        // Convert array to ListValue
        if (Array.isArray(object)) {
            var values = [];
            var Value = this.lookup("Value");
            for (var i = 0; i < object.length; i++) {
                values.push(Value.fromObject(object[i]));
            }
            var msg = this.create();
            msg.values = values;
            return msg;
        }

        return this.fromObject(object);
    },
    toObject: function(message, options) {
        // Convert ListValue message to plain JS array
        if (message && message.values) {
            var values = [];
            var Value = this.lookup("Value");
            for (var i = 0; i < message.values.length; i++) {
                values.push(Value.toObject(message.values[i], options));
            }
            return values;
        }

        return this.toObject(message, options);
    }
};

// Custom wrapper for Duration
wrappers[".google.protobuf.Duration"] = {
    fromObject: function(object) {
        // If already a Duration instance, return as is
        if (object instanceof this.ctor) return object;
        
        // Handle string input (e.g., "1.5s", "2m", "1h", "1h30m", "500ms", "250us", "100ns")
        if (typeof object === "string") {
            // Parse compound duration string like "1h30m15s" or "1.5s500ms250us100ns"
            // Note: Multiple segments of the same unit are allowed and will be added together
            // e.g., "2s32.232s" becomes "34.232s"
            var totalSeconds = 0;
            var totalNanos = 0;
            var sign = 1;
            
            // Check for negative duration
            if (object.startsWith('-')) {
                sign = -1;
                object = object.substring(1);
            }
            
            // Match all duration parts (e.g., "1h", "30m", "15s", "500ms", "250us", "100ns")
            var durationRegex = /(\d+(?:\.\d+)?)(ms|us|μs|ns|[smh])/g;
            var matches = [];
            var match;
            while ((match = durationRegex.exec(object)) !== null) {
                matches.push(match);
            }
            
            if (matches.length === 0) {
                throw new Error("Invalid duration format. Expected units: h, m, s, ms, us or ns (e.g. 1h30m, 2m, 5s, -1s)");
            }
                        
            // Track units used for validation/warning
            var unitsUsed = { s: 0, m: 0, h: 0, ms: 0, us: 0, ns: 0 };
            
            // Process all matches
            for (var i = 0; i < matches.length; i++) {
                var value = parseFloat(matches[i][1]);
                var unit = matches[i][2];
                
                // Count usage of each unit
                unitsUsed[unit]++;
                
                switch (unit) {
                    case 's':
                        totalSeconds += Math.floor(value);
                        totalNanos += Math.round((value - Math.floor(value)) * 1000000000);
                        break;
                    case 'm':
                        var minutesTotalSeconds = value * 60;
                        totalSeconds += Math.floor(minutesTotalSeconds);
                        totalNanos += Math.round((minutesTotalSeconds - Math.floor(minutesTotalSeconds)) * 1000000000);
                        break;
                    case 'h':
                        var hoursTotalSeconds = value * 3600;
                        totalSeconds += Math.floor(hoursTotalSeconds);
                        totalNanos += Math.round((hoursTotalSeconds - Math.floor(hoursTotalSeconds)) * 1000000000);
                        break;
                    case 'ms':
                        // Convert milliseconds to seconds and nanos
                        var msSeconds = Math.floor(value / 1000);
                        var msNanos = Math.round((value % 1000) * 1000000);
                        totalSeconds += msSeconds;
                        totalNanos += msNanos;
                        break;
                    case 'μs':
                    case 'us':
                        // Convert microseconds to seconds and nanos
                        var usSeconds = Math.floor(value / 1000000);
                        var usNanos = Math.round((value % 1000000) * 1000);
                        totalSeconds += usSeconds;
                        totalNanos += usNanos;
                        break;
                    case 'ns':
                        // Convert nanoseconds to seconds and nanos
                        var nsSeconds = Math.floor(value / 1000000000);
                        var nsNanos = Math.round(value % 1000000000);
                        totalSeconds += nsSeconds;
                        totalNanos += nsNanos;
                        break;
                }
            }
            
            // Warn about unusual formats (multiple segments of same unit)
            var duplicateUnits = Object.keys(unitsUsed).filter(unit => unitsUsed[unit] > 1);
            if (duplicateUnits.length > 0) {
                console.warn('Warning: Duplicate units found in duration:', duplicateUnits.join(', '), 
                           'in input:', object, '- segments will be added together');
            }
            
            // Handle nanos overflow
            if (totalNanos >= 1000000000) {
                totalSeconds += Math.floor(totalNanos / 1000000000);
                totalNanos = totalNanos % 1000000000;
            }
            
            // Use util.Long.fromValue to properly create Long objects for int64 fields
            var util = require("./util");
            return this.create({
                seconds: util.Long.fromValue(sign * totalSeconds),
                nanos: sign * totalNanos
            });
        }
        
        // Handle number input (seconds)
        if (typeof object === "number") {
            var seconds = Math.floor(object);
            var nanos = Math.round((object - seconds) * 1000000000);
            return this.create({ seconds: seconds, nanos: nanos });
        }
        
        // Handle object input
        if (object && typeof object === "object") {
            return this.create(object);
        }
        
        return this.fromObject(object);
    },
    toObject: function(message, options) {
        // Convert Duration message to string representation
        if (message && typeof message === "object" && !Array.isArray(message)) {
            // Handle Long objects for seconds field
            var seconds = message.seconds;
            if (seconds && typeof seconds === 'object' && seconds.low !== undefined) {
                // Convert Long to number using utility
                seconds = seconds.toNumber();
            }
            
            // Handle durations correctly for all sign combinations
            var totalSeconds;
            var nanosSeconds = message.nanos / 1000000000;
            
            if (seconds < 0 && message.nanos < 0) {
                // Both negative: add them together (both contribute to negative duration)
                totalSeconds = seconds + nanosSeconds;
            } else if (seconds < 0 && message.nanos >= 0) {
                // Negative seconds, positive nanos: subtract nanos from negative seconds
                totalSeconds = seconds - nanosSeconds;
            } else if (seconds >= 0 && message.nanos < 0) {
                // Positive seconds, negative nanos: subtract nanos from positive seconds
                totalSeconds = seconds + nanosSeconds; // nanosSeconds is already negative
            } else {
                // Both positive: add them together
                totalSeconds = seconds + nanosSeconds;
            }
            
            if (totalSeconds === 0) return "0s";
            
            var sign = totalSeconds < 0 ? "-" : "";
            totalSeconds = Math.abs(totalSeconds);
            
            // Always return duration in seconds format
            if (totalSeconds === Math.floor(totalSeconds)) {
                // Integer seconds
                return sign + totalSeconds + "s";
            } else {
                // Fractional seconds - use up to 9 decimal places, then clip trailing zeros
                var formatted = totalSeconds.toFixed(9);
                // Remove trailing zeros and decimal point if all zeros
                formatted = formatted.replace(/\.?0+$/, '');
                return sign + formatted + "s";
            }
        }
        
        return this.toObject(message, options);
    }
};

// Custom wrapper for Timestamp
wrappers[".google.protobuf.Timestamp"] = {
    fromObject: function(object) {
        // If already a Timestamp instance, return as is
        if (object instanceof this.ctor) {
            return object;
        }
        
        // Handle Date object
        if (object instanceof Date) {
            var seconds = Math.floor(object.getTime() / 1000);
            var nanos = (object.getTime() % 1000) * 1000000;
            return this.create({ seconds: seconds, nanos: nanos });
        }
        
        // Handle number input (milliseconds since epoch)
        if (typeof object === "number") {
            var seconds = Math.floor(object / 1000);
            var nanos = (object % 1000) * 1000000;
            return this.create({ seconds: seconds, nanos: nanos });
        }
        
        // Handle string input (ISO 8601 format)
        if (typeof object === "string") {
            var date = new Date(object);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid timestamp format. Expected ISO 8601 format.");
            }
            var seconds = Math.floor(date.getTime() / 1000);
            var nanos = (date.getTime() % 1000) * 1000000;
            return this.create({ seconds: seconds, nanos: nanos });
        }
        
        // Handle object input (but not Timestamp instances)
        if (object && typeof object === "object" && !(object instanceof this.ctor)) {
            return this.create(object);
        }
        
        // Fallback to default behavior - call the original fromObject method
        // Use the original fromObject method that was stored in originalThis.fromObject
        return this.fromObject(object);
    },
    toObject: function(message, options) {

        // Convert Timestamp message to Date object or ISO string
        if (message && typeof message === "object" && !Array.isArray(message)) {
            // Handle Long objects for seconds field
            var seconds = message.seconds;
            if (seconds && typeof seconds === 'object' && seconds.low !== undefined) {
                // Convert Long to number
                seconds = seconds.low + (seconds.high * 0x100000000);
            }
            
            var milliseconds = seconds * 1000 + Math.floor(message.nanos / 1000000);
            var date = new Date(milliseconds);
            return date.toISOString();
        }
        
        return this.toObject(message, options);
    }
};
