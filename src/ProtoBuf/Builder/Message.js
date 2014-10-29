/*?
 // --- Scope ------------------
 // T : Reflect.Message instance
 */
var fields = T.getChildren(ProtoBuf.Reflect.Message.Field),
    oneofs = T.getChildren(ProtoBuf.Reflect.Message.OneOf);

/**
 * Constructs a new runtime Message.
 * @name ProtoBuf.Builder.Message
 * @class Barebone of all runtime messages.
 * @param {!Object.<string,*>|string} values Preset values
 * @param {...string} var_args
 * @constructor
 * @throws {Error} If the message cannot be created
 */
var Message = function(values, var_args) {
    ProtoBuf.Builder.Message.call(this);

    // Create virtual oneof properties
    for (var i=0, k=oneofs.length; i<k; ++i)
        this[oneofs[i].name] = null;
    // Create fields and set default values
    for (i=0, k=fields.length; i<k; ++i) {
        var field = fields[i];
        this[field.name] = field.repeated ? [] : null;
        if (field.required && field.defaultValue !== null)
            this[field.name] = field.defaultValue;
    }

    if (arguments.length > 0) {
        // Set field values from a values object
        if (arguments.length === 1 && typeof values === 'object' &&
            /* not another Message */ typeof values.encode !== 'function' &&
            /* not a repeated field */ !ProtoBuf.Util.isArray(values) &&
            /* not a ByteBuffer */ !(values instanceof ByteBuffer) &&
            /* not an ArrayBuffer */ !(values instanceof ArrayBuffer) &&
            /* not a Long */ !(ProtoBuf.Long && values instanceof ProtoBuf.Long)) {
            var keys = Object.keys(values);
            for (i=0, k=keys.length; i<k; ++i)
                this.$set(keys[i], values[keys[i]]); // May throw
        } else // Set field values from arguments, in declaration order
            for (i=0, k=arguments.length; i<k; ++i)
                this.$set(fields[i].name, arguments[i]); // May throw
    }
};

/**
 * @alias ProtoBuf.Builder.Message.prototype
 * @inner
 */
var MessagePrototype = Message.prototype = Object.create(ProtoBuf.Builder.Message.prototype);

/**
 * Adds a value to a repeated field.
 * @name ProtoBuf.Builder.Message#add
 * @function
 * @param {string} key Field name
 * @param {*} value Value to add
 * @param {boolean=} noAssert Whether to assert the value or not (asserts by default)
 * @throws {Error} If the value cannot be added
 * @expose
 */
MessagePrototype.add = function(key, value, noAssert) {
    var field = T._fieldsByName[key];
    if (!noAssert) {
        if (!field)
            throw Error(this+"#"+key+" is undefined");
        if (!(field instanceof ProtoBuf.Reflect.Message.Field))
            throw Error(this+"#"+key+" is not a field: "+field.toString(true)); // May throw if it's an enum or embedded message
        if (!field.repeated)
            throw Error(this+"#"+key+" is not a repeated field");
    }
    if (this[field.name] === null)
        this[field.name] = [];
    this[field.name].push(noAssert ? value : field.verifyValue(value, true));
};

/**
 * Adds a value to a repeated field. This is an alias for {@link ProtoBuf.Builder.Message#add}.
 * @name ProtoBuf.Builder.Message#$add
 * @function
 * @param {string} key Field name
 * @param {*} value Value to add
 * @param {boolean=} noAssert Whether to assert the value or not (asserts by default)
 * @throws {Error} If the value cannot be added
 * @expose
 */
MessagePrototype.$add = MessagePrototype.add;

/**
 * Sets a field's value.
 * @name ProtoBuf.Builder.Message#set
 * @function
 * @param {string} key Key
 * @param {*} value Value to set
 * @param {boolean=} noAssert Whether to not assert for an actual field / proper value type, defaults to `false`
 * @returns {!ProtoBuf.Builder.Message} this
 * @throws {Error} If the value cannot be set
 * @expose
 */
MessagePrototype.set = function(key, value, noAssert) {
    if (key && typeof key === 'object') {
        for (var i in key)
            if (key.hasOwnProperty(i))
                this.$set(i, key[i], noAssert);
        return this;
    }
    var field = T._fieldsByName[key];
    if (!noAssert) {
        if (!field)
            throw Error(this+"#"+key+" is not a field: undefined");
        if (!(field instanceof ProtoBuf.Reflect.Message.Field))
            throw Error(this+"#"+key+" is not a field: "+field.toString(true));
        this[field.name] = (value = field.verifyValue(value)); // May throw
    } else {
        this[field.name] = value;
    }
    if (field.oneof) {
        if (value !== null) {
            if (this[field.oneof.name] !== null)
                this[this[field.oneof.name]] = null; // Unset the previous (field name is the oneof field's value)
            this[field.oneof.name] = field.name;
        } else if (field.oneof.name === key)
            this[field.oneof.name] = null;
    }
    return this;
};

/**
 * Sets a field's value. This is an alias for [@link ProtoBuf.Builder.Message#set}.
 * @name ProtoBuf.Builder.Message#$set
 * @function
 * @param {string} key Key
 * @param {*} value Value to set
 * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
 * @throws {Error} If the value cannot be set
 * @expose
 */
MessagePrototype.$set = MessagePrototype.set;

/**
 * Gets a field's value.
 * @name ProtoBuf.Builder.Message#get
 * @function
 * @param {string} key Key
 * @param {boolean=} noAssert Whether to not assert for an actual field, defaults to `false`
 * @return {*} Value
 * @throws {Error} If there is no such field
 * @expose
 */
MessagePrototype.get = function(key, noAssert) {
    if (noAssert)
        return this[key];
    var field = T._fieldsByName[key];
    if (!field || !(field instanceof ProtoBuf.Reflect.Message.Field))
        throw Error(this+"#"+key+" is not a field: undefined");
    if (!(field instanceof ProtoBuf.Reflect.Message.Field))
        throw Error(this+"#"+key+" is not a field: "+field.toString(true));
    return this[field.name];
};

/**
 * Gets a field's value. This is an alias for {@link ProtoBuf.Builder.Message#$get}.
 * @name ProtoBuf.Builder.Message#$get
 * @function
 * @param {string} key Key
 * @return {*} Value
 * @throws {Error} If there is no such field
 * @expose
 */
MessagePrototype.$get = MessagePrototype.get;

// Getters and setters

for (var i=0; i<fields.length; i++) {
    var field = fields[i];
    // no setters for extension fields as these are named by their fqn
    if (field instanceof ProtoBuf.Reflect.Message.ExtensionField)
        continue;

    if (T.builder.options['populateAccessors'])
        (function(field) {
            // set/get[SomeValue]
            var Name = field.originalName.replace(/(_[a-zA-Z])/g, function(match) {
                return match.toUpperCase().replace('_','');
            });
            Name = Name.substring(0,1).toUpperCase() + Name.substring(1);

            // set/get_[some_value] FIXME: Do we really need these?
            var name = field.originalName.replace(/([A-Z])/g, function(match) {
                return "_"+match;
            });

            /**
             * The current field's unbound setter function.
             * @function
             * @param {*} value
             * @param {boolean=} noAssert
             * @returns {!ProtoBuf.Builder.Message}
             * @inner
             */
            var setter = function(value, noAssert) {
                this[field.name] = noAssert ? value : field.verifyValue(value);
                return this;
            };

            /**
             * The current field's unbound getter function.
             * @function
             * @returns {*}
             * @inner
             */
            var getter = function() {
                return this[field.name];
            };

            /**
             * Sets a value. This method is present for each field, but only if there is no name conflict with
             *  another field.
             * @name ProtoBuf.Builder.Message#set[SomeField]
             * @function
             * @param {*} value Value to set
             * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
             * @returns {!ProtoBuf.Builder.Message} this
             * @abstract
             * @throws {Error} If the value cannot be set
             */
            if (T.getChild("set"+Name) === null)
                MessagePrototype["set"+Name] = setter;

            /**
             * Sets a value. This method is present for each field, but only if there is no name conflict with
             *  another field.
             * @name ProtoBuf.Builder.Message#set_[some_field]
             * @function
             * @param {*} value Value to set
             * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
             * @returns {!ProtoBuf.Builder.Message} this
             * @abstract
             * @throws {Error} If the value cannot be set
             */
            if (T.getChild("set_"+name) === null)
                MessagePrototype["set_"+name] = setter;

            /**
             * Gets a value. This method is present for each field, but only if there is no name conflict with
             *  another field.
             * @name ProtoBuf.Builder.Message#get[SomeField]
             * @function
             * @abstract
             * @return {*} The value
             */
            if (T.getChild("get"+Name) === null)
                MessagePrototype["get"+Name] = getter;

            /**
             * Gets a value. This method is present for each field, but only if there is no name conflict with
             *  another field.
             * @name ProtoBuf.Builder.Message#get_[some_field]
             * @function
             * @return {*} The value
             * @abstract
             */
            if (T.getChild("get_"+name) === null)
                MessagePrototype["get_"+name] = getter;

        })(field);
}

// En-/decoding

/**
 * Encodes the message.
 * @name ProtoBuf.Builder.Message#$encode
 * @function
 * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
 * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
 * @return {!ByteBuffer} Encoded message as a ByteBuffer
 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
 *  returns the encoded ByteBuffer in the `encoded` property on the error.
 * @expose
 * @see ProtoBuf.Builder.Message#encode64
 * @see ProtoBuf.Builder.Message#encodeHex
 * @see ProtoBuf.Builder.Message#encodeAB
 */
MessagePrototype.encode = function(buffer, noVerify) {
    if (typeof buffer === 'boolean')
        noVerify = buffer,
        buffer = undefined;
    var isNew = false;
    if (!buffer)
        buffer = new ByteBuffer(),
        isNew = true;
    var le = buffer.littleEndian;
    try {
        T.encode(this, buffer.LE(), noVerify);
        return (isNew ? buffer.flip() : buffer).LE(le);
    } catch (e) {
        buffer.LE(le);
        throw(e);
    }
};

/**
 * Calculates the byte length of the message.
 * @name ProtoBuf.Builder.Message#calculate
 * @function
 * @returns {number} Byte length
 * @throws {Error} If the message cannot be calculated or if required fields are missing.
 * @expose
 */
MessagePrototype.calculate = function() {
    return T.calculate(this);
};

/**
 * Encodes the varint32 length-delimited message.
 * @name ProtoBuf.Builder.Message#encodeDelimited
 * @function
 * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
 * @return {!ByteBuffer} Encoded message as a ByteBuffer
 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
 *  returns the encoded ByteBuffer in the `encoded` property on the error.
 * @expose
 */
MessagePrototype.encodeDelimited = function(buffer) {
    var isNew = false;
    if (!buffer)
        buffer = new ByteBuffer(),
        isNew = true;
    var enc = new ByteBuffer().LE();
    T.encode(this, enc).flip();
    buffer.writeVarint32(enc.remaining());
    buffer.append(enc);
    return isNew ? buffer.flip() : buffer;
};

/**
 * Directly encodes the message to an ArrayBuffer.
 * @name ProtoBuf.Builder.Message#encodeAB
 * @function
 * @return {ArrayBuffer} Encoded message as ArrayBuffer
 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
 *  returns the encoded ArrayBuffer in the `encoded` property on the error.
 * @expose
 */
MessagePrototype.encodeAB = function() {
    try {
        return this.encode().toArrayBuffer();
    } catch (e) {
        if (e["encoded"]) e["encoded"] = e["encoded"].toArrayBuffer();
        throw(e);
    }
};

/**
 * Returns the message as an ArrayBuffer. This is an alias for {@link ProtoBuf.Builder.Message#encodeAB}.
 * @name ProtoBuf.Builder.Message#toArrayBuffer
 * @function
 * @return {ArrayBuffer} Encoded message as ArrayBuffer
 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
 *  returns the encoded ArrayBuffer in the `encoded` property on the error.
 * @expose
 */
MessagePrototype.toArrayBuffer = MessagePrototype.encodeAB;

/**
 * Directly encodes the message to a node Buffer.
 * @name ProtoBuf.Builder.Message#encodeNB
 * @function
 * @return {!Buffer}
 * @throws {Error} If the message cannot be encoded, not running under node.js or if required fields are
 *  missing. The later still returns the encoded node Buffer in the `encoded` property on the error.
 * @expose
 */
MessagePrototype.encodeNB = function() {
    try {
        return this.encode().toBuffer();
    } catch (e) {
        if (e["encoded"]) e["encoded"] = e["encoded"].toBuffer();
        throw(e);
    }
};

/**
 * Returns the message as a node Buffer. This is an alias for {@link ProtoBuf.Builder.Message#encodeNB}.
 * @name ProtoBuf.Builder.Message#toBuffer
 * @function
 * @return {!Buffer}
 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
 *  returns the encoded node Buffer in the `encoded` property on the error.
 * @expose
 */
MessagePrototype.toBuffer = MessagePrototype.encodeNB;

/**
 * Directly encodes the message to a base64 encoded string.
 * @name ProtoBuf.Builder.Message#encode64
 * @function
 * @return {string} Base64 encoded string
 * @throws {Error} If the underlying buffer cannot be encoded or if required fields are missing. The later
 *  still returns the encoded base64 string in the `encoded` property on the error.
 * @expose
 */
MessagePrototype.encode64 = function() {
    try {
        return this.encode().toBase64();
    } catch (e) {
        if (e["encoded"]) e["encoded"] = e["encoded"].toBase64();
        throw(e);
    }
};

/**
 * Returns the message as a base64 encoded string. This is an alias for {@link ProtoBuf.Builder.Message#encode64}.
 * @name ProtoBuf.Builder.Message#toBase64
 * @function
 * @return {string} Base64 encoded string
 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
 *  returns the encoded base64 string in the `encoded` property on the error.
 * @expose
 */
MessagePrototype.toBase64 = MessagePrototype.encode64;

/**
 * Directly encodes the message to a hex encoded string.
 * @name ProtoBuf.Builder.Message#encodeHex
 * @function
 * @return {string} Hex encoded string
 * @throws {Error} If the underlying buffer cannot be encoded or if required fields are missing. The later
 *  still returns the encoded hex string in the `encoded` property on the error.
 * @expose
 */
MessagePrototype.encodeHex = function() {
    try {
        return this.encode().toHex();
    } catch (e) {
        if (e["encoded"]) e["encoded"] = e["encoded"].toHex();
        throw(e);
    }
};

/**
 * Returns the message as a hex encoded string. This is an alias for {@link ProtoBuf.Builder.Message#encodeHex}.
 * @name ProtoBuf.Builder.Message#toHex
 * @function
 * @return {string} Hex encoded string
 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
 *  returns the encoded hex string in the `encoded` property on the error.
 * @expose
 */
MessagePrototype.toHex = MessagePrototype.encodeHex;

/**
 * Clones a message object to a raw object.
 * @param {*} obj Object to clone
 * @param {boolean} includeBinaryAsBase64 Whether to include binary data as base64 strings or not
 * @returns {*} Cloned object
 * @inner
 */
function cloneRaw(obj, includeBinaryAsBase64) {
    var clone = {};
    for (var i in obj)
        if (obj.hasOwnProperty(i)) {
            if (obj[i] === null || typeof obj[i] !== 'object')
                clone[i] = obj[i];
            else if (obj[i] instanceof ByteBuffer) {
                if (includeBinaryAsBase64)
                    clone[i] = obj[i].toBase64();
            } else // is a non-null object
                clone[i] = cloneRaw(obj[i], includeBinaryAsBase64);
        }
    return clone;
}

/**
 * Returns the message's raw payload.
 * @param {boolean=} includeBinaryAsBase64 Whether to include binary data as base64 strings or not, defaults to `false`
 * @returns {Object.<string,*>} Raw payload
 * @expose
 */
MessagePrototype.toRaw = function(includeBinaryAsBase64) {
    return cloneRaw(this, !!includeBinaryAsBase64);
};

/**
 * Decodes a message from the specified buffer or string.
 * @name ProtoBuf.Builder.Message.decode
 * @function
 * @param {!ByteBuffer|!ArrayBuffer|!Buffer|string} buffer Buffer to decode from
 * @param {string=} enc Encoding if buffer is a string: hex, utf8 (not recommended), defaults to base64
 * @return {!ProtoBuf.Builder.Message} Decoded message
 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
 *  returns the decoded message with missing fields in the `decoded` property on the error.
 * @expose
 * @see ProtoBuf.Builder.Message.decode64
 * @see ProtoBuf.Builder.Message.decodeHex
 */
Message.decode = function(buffer, enc) {
    if (typeof buffer === 'string')
        buffer = ByteBuffer.wrap(buffer, enc ? enc : "base64");
    buffer = buffer instanceof ByteBuffer ? buffer : ByteBuffer.wrap(buffer); // May throw
    var le = buffer.littleEndian;
    try {
        var msg = T.decode(buffer.LE());
        buffer.LE(le);
        return msg;
    } catch (e) {
        buffer.LE(le);
        throw(e);
    }
};

/**
 * Decodes a varint32 length-delimited message from the specified buffer or string.
 * @name ProtoBuf.Builder.Message.decodeDelimited
 * @function
 * @param {!ByteBuffer|!ArrayBuffer|!Buffer|string} buffer Buffer to decode from
 * @param {string=} enc Encoding if buffer is a string: hex, utf8 (not recommended), defaults to base64
 * @return {ProtoBuf.Builder.Message} Decoded message or `null` if not enough bytes are available yet
 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
 *  returns the decoded message with missing fields in the `decoded` property on the error.
 * @expose
 */
Message.decodeDelimited = function(buffer, enc) {
    if (typeof buffer === 'string')
        buffer = ByteBuffer.wrap(buffer, enc ? enc : "base64");
    buffer = buffer instanceof ByteBuffer ? buffer : ByteBuffer.wrap(buffer); // May throw
    if (buffer.remaining() < 1)
        return null;
    var off = buffer.offset,
        len = buffer.readVarint32();
    if (buffer.remaining() < len) {
        buffer.offset = off;
        return null;
    }
    try {
        var msg = T.decode(buffer.slice(buffer.offset, buffer.offset + len).LE());
        buffer.offset += len;
        return msg;
    } catch (err) {
        buffer.offset += len;
        throw err;
    }
};

/**
 * Decodes the message from the specified base64 encoded string.
 * @name ProtoBuf.Builder.Message.decode64
 * @function
 * @param {string} str String to decode from
 * @return {!ProtoBuf.Builder.Message} Decoded message
 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
 *  returns the decoded message with missing fields in the `decoded` property on the error.
 * @expose
 */
Message.decode64 = function(str) {
    return Message.decode(str, "base64");
};

/**
 * Decodes the message from the specified hex encoded string.
 * @name ProtoBuf.Builder.Message.decodeHex
 * @function
 * @param {string} str String to decode from
 * @return {!ProtoBuf.Builder.Message} Decoded message
 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
 *  returns the decoded message with missing fields in the `decoded` property on the error.
 * @expose
 */
Message.decodeHex = function(str) {
    return Message.decode(str, "hex");
};

// Utility

/**
 * Returns a string representation of this Message.
 * @name ProtoBuf.Builder.Message#toString
 * @function
 * @return {string} String representation as of ".Fully.Qualified.MessageName"
 * @expose
 */
MessagePrototype.toString = function() {
    return T.toString();
};

// Properties

/**
 * Options.
 * @name ProtoBuf.Builder.Message.$options
 * @type {Object.<string,*>}
 * @expose
 */
var $options; // cc

/**
 * Reflection type.
 * @name ProtoBuf.Builder.Message#$type
 * @type {!ProtoBuf.Reflect.Message}
 * @expose
 */
var $type; // cc

if (Object.defineProperty)
    Object.defineProperty(Message, '$options', { "value": T.buildOpt() }),
    Object.defineProperty(MessagePrototype, "$type", {
        get: function() { return T; }
    });
