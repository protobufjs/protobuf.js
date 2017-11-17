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

wrappers['.google.protobuf.DoubleValue'] = {
  fromObject: function (object) {
    return this.create({value: object})
  },
  toObject: function (message, options) {
    return this.toObject(message, options).value
  }
}
wrappers['.google.protobuf.FloatValue'] = {
  fromObject: function (object) {
    return this.create({value: object})
  },
  toObject: function (message, options) {

    return this.toObject(message, options).value
  }
}
wrappers['.google.protobuf.Int64Value'] = {
  fromObject: function (object) {
    return this.create({value: object})
  },
  toObject: function (message, options) {
    return this.toObject(message, options).value
  }
}
wrappers['.google.protobuf.UInt64Value'] = {
  fromObject: function (object) {
    return this.create({value: object})
  },
  toObject: function (message, options) {
    return this.toObject(message, options).value
  }
}
wrappers['.google.protobuf.Int32Value'] = {
  fromObject: function (object) {
    return this.create({value: object})
  },
  toObject: function (message, options) {
    return this.toObject(message, options).value
  }
}
wrappers['.google.protobuf.UInt32Value'] = {
  fromObject: function (object) {
    return this.create({value: object})
  },
  toObject: function (message, options) {
    return this.toObject(message, options).value
  }
}
wrappers['.google.protobuf.BoolValue'] = {
  fromObject: function (object) {
    if (object === null) {
      return
    }
    if (object !== false) {
      return this.create({value: object})
    }
    return this.create()
  },
  toObject: function (message, options) {
    if (message === null) {
      return
    }
    return this.toObject(message, options).value || false
  }
}
wrappers['.google.protobuf.StringValue'] = {
  fromObject: function (object) {
    return this.create({value: object})
  },
  toObject: function (message, options) {
    return this.toObject(message, options).value
  }
}
