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
        this[field.name] =
            field.repeated ? [] :
            (field.map ? new ProtoBuf.Map(field) : null);
        if ((field.required || T.syntax === 'proto3') &&
            field.defaultValue !== null)
            this[field.name] = field.defaultValue;
    }

    if (arguments.length > 0) {
        var value;
        // Set field values from a values object
        if (arguments.length === 1 && values !== null && typeof values === 'object' &&
            /* not _another_ Message */ (typeof values.encode !== 'function' || values instanceof Message) &&
            /* not a repeated field */ !Array.isArray(values) &&
            /* not a Map */ !(values instanceof ProtoBuf.Map) &&
            /* not a ByteBuffer */ !ByteBuffer.isByteBuffer(values) &&
            /* not an ArrayBuffer */ !(values instanceof ArrayBuffer) &&
            /* not a Long */ !(ProtoBuf.Long && values instanceof ProtoBuf.Long)) {
            this.$set(values);
        } else // Set field values from arguments, in declaration order
            for (i=0, k=arguments.length; i<k; ++i)
                if (typeof (value = arguments[i]) !== 'undefined')
                    this.$set(fields[i].name, value); // May throw
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
 * @returns {!ProtoBuf.Builder.Message} this
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
        value = field.verifyValue(value, true);
    }
    if (this[key] === null)
        this[key] = [];
    this[key].push(value);
    return this;
};

/**
 * Adds a value to a repeated field. This is an alias for {@link ProtoBuf.Builder.Message#add}.
 * @name ProtoBuf.Builder.Message#$add
 * @function
 * @param {string} key Field name
 * @param {*} value Value to add
 * @param {boolean=} noAssert Whether to assert the value or not (asserts by default)
 * @returns {!ProtoBuf.Builder.Message} this
 * @throws {Error} If the value cannot be added
 * @expose
 */
MessagePrototype.$add = MessagePrototype.add;

/**
 * Sets a field's value.
 * @name ProtoBuf.Builder.Message#set
 * @function
 * @param {string|!Object.<string,*>} keyOrObj String key or plain object holding multiple values
 * @param {(*|boolean)=} value Value to set if key is a string, otherwise omitted
 * @param {boolean=} noAssert Whether to not assert for an actual field / proper value type, defaults to `false`
 * @returns {!ProtoBuf.Builder.Message} this
 * @throws {Error} If the value cannot be set
 * @expose
 */
MessagePrototype.set = function(keyOrObj, value, noAssert) {
    if (keyOrObj && typeof keyOrObj === 'object') {
        noAssert = value;
        for (var ikey in keyOrObj)
            if (keyOrObj.hasOwnProperty(ikey) && typeof (value = keyOrObj[ikey]) !== 'undefined')
                this.$set(ikey, value, noAssert);
        return this;
    }
    var field = T._fieldsByName[keyOrObj];
    if (!noAssert) {
        if (!field)
            throw Error(this+"#"+keyOrObj+" is not a field: undefined");
        if (!(field instanceof ProtoBuf.Reflect.Message.Field))
            throw Error(this+"#"+keyOrObj+" is not a field: "+field.toString(true));
        this[field.name] = (value = field.verifyValue(value)); // May throw
    } else
        this[keyOrObj] = value;
    if (field && field.oneof) {
        if (value !== null) {
            if (this[field.oneof.name] !== null)
                this[this[field.oneof.name]] = null; // Unset the previous (field name is the oneof field's value)
            this[field.oneof.name] = field.name;
        } else if (field.oneof.name === keyOrObj)
            this[field.oneof.name] = null;
    }
    return this;
};

/**
 * Sets a field's value. This is an alias for [@link ProtoBuf.Builder.Message#set}.
 * @name ProtoBuf.Builder.Message#$set
 * @function
 * @param {string|!Object.<string,*>} keyOrObj String key or plain object holding multiple values
 * @param {(*|boolean)=} value Value to set if key is a string, otherwise omitted
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

            if (T.getChild("set"+Name) === null)
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
                MessagePrototype["set"+Name] = setter;

            if (T.getChild("set_"+name) === null)
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
                MessagePrototype["set_"+name] = setter;

            if (T.getChild("get"+Name) === null)
                /**
                 * Gets a value. This method is present for each field, but only if there is no name conflict with
                 *  another field.
                 * @name ProtoBuf.Builder.Message#get[SomeField]
                 * @function
                 * @abstract
                 * @return {*} The value
                 */
                MessagePrototype["get"+Name] = getter;

            if (T.getChild("get_"+name) === null)
                /**
                 * Gets a value. This method is present for each field, but only if there is no name conflict with
                 *  another field.
                 * @name ProtoBuf.Builder.Message#get_[some_field]
                 * @function
                 * @return {*} The value
                 * @abstract
                 */
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
 * Encodes a message using the specified data payload.
 * @param {!Object.<string,*>} data Data payload
 * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
 * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
 * @return {!ByteBuffer} Encoded message as a ByteBuffer
 * @expose
 */
Message.encode = function(data, buffer, noVerify) {
    return new Message(data).encode(buffer, noVerify);
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
 * Clones a message object or field value to a raw object.
 * @param {*} obj Object to clone
 * @param {boolean} binaryAsBase64 Whether to include binary data as base64 strings or as a buffer otherwise
 * @param {boolean} longsAsStrings Whether to encode longs as strings
 * @param {{name: string, wireType: number}} fieldType The field type, if
 * appropriate
 * @param {ProtoBuf.Reflect.T} resolvedType The resolved field type, if appropriate
 * @returns {*} Cloned object
 * @inner
 */
function cloneRaw(obj, binaryAsBase64, longsAsStrings, fieldType, resolvedType) {
    var clone = undefined;
    if (obj === null || typeof obj !== 'object') {
        if (fieldType == ProtoBuf.TYPES["enum"]) {
            var values = resolvedType.getChildren(ProtoBuf.Reflect.Enum.Value);
            for (var i = 0; i < values.length; i++) {
                if (values[i]['id'] === obj) {
                    obj = values[i]['name'];
                    break;
                }
            }
        }
        clone = obj;
    } else if (ByteBuffer.isByteBuffer(obj)) {
        if (binaryAsBase64) {
            clone = obj.toBase64();
        } else {
            clone = obj.toBuffer();
        }
    } else if (Array.isArray(obj)) {
        var src = obj;
        clone = [];
        for (var idx = 0; idx < src.length; idx++)
            clone.push(cloneRaw(src[idx], binaryAsBase64, longsAsStrings, fieldType, resolvedType));
    } else if (obj instanceof ProtoBuf.Map) {
        var it = obj.entries();
        clone = {};
        for (var e = it.next(); !e.done; e = it.next())
            clone[obj.keyElem.valueToString(e.value[0])] = cloneRaw(e.value[1], binaryAsBase64, longsAsStrings, obj.valueElem.type, obj.valueElem.resolvedType);
    } else if (obj instanceof ProtoBuf.Long) {
        if (longsAsStrings)
            // int64s are encoded as strings
            clone = obj.toString();
        else
            clone = new ProtoBuf.Long(obj);
    } else { // is a non-null object
        clone = {};
        var type = obj.$type;
        var field = undefined;
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                var value = obj[i];
                if (type) {
                    field = type.getChild(i);
                }
                clone[i] = cloneRaw(value, binaryAsBase64, longsAsStrings, field.type, field.resolvedType);
            }
        }
    }
    return clone;
}

/**
 * Returns the message's raw payload.
 * @param {boolean=} binaryAsBase64 Whether to include binary data as base64 strings instead of Buffers, defaults to `false`
 * @param {boolean} longsAsStrings Whether to encode longs as strings
 * @returns {Object.<string,*>} Raw payload
 * @expose
 */
MessagePrototype.toRaw = function(binaryAsBase64, longsAsStrings) {
    return cloneRaw(this, !!binaryAsBase64, !!longsAsStrings, ProtoBuf.TYPES["message"], this.$type);
};

/**
 * Encodes a message to JSON.
 * @returns {string} JSON string
 * @expose
 */
MessagePrototype.encodeJSON = function() {
    return JSON.stringify(
        cloneRaw(this,
             /* binary-as-base64 */ true,
             /* longs-as-strings */ true,
             ProtoBuf.TYPES["message"],
             this.$type
        )
    );
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
    buffer = ByteBuffer.isByteBuffer(buffer) ? buffer : ByteBuffer.wrap(buffer); // May throw
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
    buffer = ByteBuffer.isByteBuffer(buffer) ? buffer : ByteBuffer.wrap(buffer); // May throw
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

/**
 * Decodes the message from a JSON string.
 * @name ProtoBuf.Builder.Message.decodeJSON
 * @function
 * @param {string} str String to decode from
 * @return {!ProtoBuf.Builder.Message} Decoded message
 * @throws {Error} If the message cannot be decoded or if required fields are
 * missing.
 * @expose
 */
Message.decodeJSON = function(str) {
    return new Message(JSON.parse(str));
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
 * Message options.
 * @name ProtoBuf.Builder.Message.$options
 * @type {Object.<string,*>}
 * @expose
 */
var $optionsS; // cc needs this

/**
 * Message options.
 * @name ProtoBuf.Builder.Message#$options
 * @type {Object.<string,*>}
 * @expose
 */
var $options;

/**
 * Reflection type.
 * @name ProtoBuf.Builder.Message.$type
 * @type {!ProtoBuf.Reflect.Message}
 * @expose
 */
var $typeS;

/**
 * Reflection type.
 * @name ProtoBuf.Builder.Message#$type
 * @type {!ProtoBuf.Reflect.Message}
 * @expose
 */
var $type;

if (Object.defineProperty)
    Object.defineProperty(Message, '$options', { "value": T.buildOpt() }),
    Object.defineProperty(MessagePrototype, "$options", { "value": Message["$options"] }),
    Object.defineProperty(Message, "$type", { "value": T }),
    Object.defineProperty(MessagePrototype, "$type", { "value": T });
