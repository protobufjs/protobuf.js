/*?
 // --- Scope ------------------
 // T : Reflect.Message instance
 */
var fields = T.getChildren(ProtoBuf.Reflect.Message.Field);

/**
 * Constructs a new runtime Message.
 * @name ProtoBuf.Builder.Message
 * @class Barebone of all runtime messages.
 * @param {Object.<string,*>|...[string]} values Preset values
 * @constructor
 * @throws {Error} If the message cannot be created
 */
var Message = function(values) {
    ProtoBuf.Builder.Message.call(this);
    var i, field;

    // Create fields on the object itself to allow setting and getting through Message#fieldname
    for (i=0; i<fields.length; i++) {
        field = fields[i];
        this[field.name] = (field.repeated) ? [] : null;
    }
    // Set the default values
    for (i=0; i<fields.length; i++) {
        field = fields[i];
        if (typeof field.options['default'] != 'undefined') {
            try {
                this.$set(field.name, field.options['default']); // Should not throw
            } catch (e) {
                throw(new Error("[INTERNAL] "+e));
            }
        }
    }
    // Set field values from a values object
    if (arguments.length == 1 && typeof values == 'object' &&
        /* not another Message */ typeof values.encode != 'function' &&
        /* not a repeated field */ !ProtoBuf.Util.isArray(values) &&
        /* not a ByteBuffer */ !(values instanceof ByteBuffer) &&
        /* not an ArrayBuffer */ !(values instanceof ArrayBuffer) &&
        /* not a Long */ !(ProtoBuf.Long && values instanceof ProtoBuf.Long)) {
        var keys = Object.keys(values);
        for (i=0; i<keys.length; i++) {
            this.$set(keys[i], values[keys[i]]); // May throw
        }
        // Else set field values from arguments, in correct order
    } else {
        for (i=0; i<arguments.length; i++) {
            if (i<fields.length) {
                this.$set(fields[i].name, arguments[i]); // May throw
            }
        }
    }
};

// Extends ProtoBuf.Builder.Message
Message.prototype = Object.create(ProtoBuf.Builder.Message.prototype);

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
Message.prototype.add = function(key, value, noAssert) {
    var field = T.getChild(key);
    if (!field) {
        throw(new Error(this+"#"+key+" is undefined"));
    }
    if (!(field instanceof ProtoBuf.Reflect.Message.Field)) {
        throw(new Error(this+"#"+key+" is not a field: "+field.toString(true))); // May throw if it's an enum or embedded message
    }
    if (!field.repeated) {
        throw(new Error(this+"#"+key+" is not a repeated field"));
    }
    if (this[field.name] === null) this[field.name] = [];
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
Message.prototype.$add = Message.prototype.add;

/**
 * Sets a field's value.
 * @name ProtoBuf.Builder.Message#set
 * @function
 * @param {string} key Key
 * @param {*} value Value to set
 * @param {boolean=} noAssert Whether to assert the value or not (asserts by default)
 * @throws {Error} If the value cannot be set
 * @expose
 */
Message.prototype.set = function(key, value, noAssert) {
    var field = T.getChild(key);
    if (!field) {
        throw(new Error(this+"#"+key+" is not a field: undefined"));
    }
    if (!(field instanceof ProtoBuf.Reflect.Message.Field)) {
        throw(new Error(this+"#"+key+" is not a field: "+field.toString(true)));
    }
    this[field.name] = noAssert ? value : field.verifyValue(value); // May throw
};

/**
 * Sets a field's value. This is an alias for [@link ProtoBuf.Builder.Message#set}.
 * @name ProtoBuf.Builder.Message#$set
 * @function
 * @param {string} key Key
 * @param {*} value Value to set
 * @param {boolean=} noAssert Whether to assert the value or not (asserts by default)
 * @throws {Error} If the value cannot be set
 * @expose
 */
Message.prototype.$set = Message.prototype.set;

/**
 * Gets a field's value.
 * @name ProtoBuf.Builder.Message#get
 * @function
 * @param {string} key Key
 * @return {*} Value
 * @throws {Error} If there is no such field
 * @expose
 */
Message.prototype.get = function(key) {
    var field = T.getChild(key);
    if (!field || !(field instanceof ProtoBuf.Reflect.Message.Field)) {
        throw(new Error(this+"#"+key+" is not a field: undefined"));
    }
    if (!(field instanceof ProtoBuf.Reflect.Message.Field)) {
        throw(new Error(this+"#"+key+" is not a field: "+field.toString(true)));
    }
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
Message.prototype.$get = Message.prototype.get;

// Getters and setters

for (var i=0; i<fields.length; i++) {
    var field = fields[i];

    (function(field) {
        // set/get[SomeValue]
        var Name = field.originalName.replace(/(_[a-zA-Z])/g,
            function(match) {
                return match.toUpperCase().replace('_','');
            }
        );
        Name = Name.substring(0,1).toUpperCase()+Name.substring(1);

        // set/get_[some_value]
        var name = field.originalName.replace(/([A-Z])/g,
            function(match) {
                return "_"+match;
            }
        );

        /**
         * Sets a value. This method is present for each field, but only if there is no name conflict with
         * another field.
         * @name ProtoBuf.Builder.Message#set[SomeField]
         * @function
         * @param {*} value Value to set
         * @abstract
         * @throws {Error} If the value cannot be set
         */
        if (!T.hasChild("set"+Name)) {
            Message.prototype["set"+Name] = function(value) {
                this.$set(field.name, value);
            }
        }

        /**
         * Sets a value. This method is present for each field, but only if there is no name conflict with
         * another field.
         * @name ProtoBuf.Builder.Message#set_[some_field]
         * @function
         * @param {*} value Value to set
         * @abstract
         * @throws {Error} If the value cannot be set
         */
        if (!T.hasChild("set_"+name)) {
            Message.prototype["set_"+name] = function(value) {
                this.$set(field.name, value);
            };
        }

        /**
         * Gets a value. This method is present for each field, but only if there is no name conflict with
         * another field.
         * @name ProtoBuf.Builder.Message#get[SomeField]
         * @function
         * @abstract
         * @return {*} The value
         */
        if (!T.hasChild("get"+Name)) {
            Message.prototype["get"+Name] = function() {
                return this.$get(field.name); // Does not throw, field exists
            }
        }

        /**
         * Gets a value. This method is present for each field, but only if there is no name conflict with
         * another field.
         * @name ProtoBuf.Builder.Message#get_[some_field]
         * @function
         * @return {*} The value
         * @abstract
         */
        if (!T.hasChild("get_"+name)) {
            Message.prototype["get_"+name] = function() {
                return this.$get(field.name); // Does not throw, field exists
            };
        }

    })(field);
}

// En-/decoding

/**
 * Encodes the message.
 * @name ProtoBuf.Builder.Message#$encode
 * @function
 * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
 * @return {!ByteBuffer} Encoded message as a ByteBuffer
 * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
 *  returns the encoded ByteBuffer in the `encoded` property on the error.
 * @expose
 * @see ProtoBuf.Builder.Message#encode64
 * @see ProtoBuf.Builder.Message#encodeHex
 * @see ProtoBuf.Builder.Message#encodeAB
 */
Message.prototype.encode = function(buffer) {
    var isNew = false;
    if (!buffer) {
        buffer = new ByteBuffer();
        isNew = true;
    }
    var le = buffer.littleEndian;
    try {
        T.encode(this, buffer.LE());
        return (isNew ? buffer.flip() : buffer).LE(le);
    } catch (e) {
        buffer.LE(le);
        throw(e);
    }
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
Message.prototype.encodeDelimited = function(buffer) {
    var isNew = false;
    if (!buffer) {
        buffer = new ByteBuffer();
        isNew = true;
    }
    // var le = buffer.littleEndian;
    try {
        var enc = new ByteBuffer().LE();
        T.encode(this, enc).flip();
        buffer.writeVarint32(enc.remaining());
        buffer.append(enc);
        return isNew ? buffer.flip() : buffer;
    } catch (e) {
        // buffer.LE(le);
        throw(e);
    }
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
Message.prototype.encodeAB = function() {
    try {
        return this.encode().toArrayBuffer();
    } catch (err) {
        if (err["encoded"]) err["encoded"] = err["encoded"].toArrayBuffer();
        throw(err);
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
Message.prototype.toArrayBuffer = Message.prototype.encodeAB;

/**
 * Directly encodes the message to a node Buffer.
 * @name ProtoBuf.Builder.Message#encodeNB
 * @function
 * @return {!Buffer}
 * @throws {Error} If the message cannot be encoded, not running under node.js or if required fields are
 *  missing. The later still returns the encoded node Buffer in the `encoded` property on the error.
 * @expose
 */
Message.prototype.encodeNB = function() {
    try {
        return this.encode().toBuffer();
    } catch (err) {
        if (err["encoded"]) err["encoded"] = err["encoded"].toBuffer();
        throw(err);
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
Message.prototype.toBuffer = Message.prototype.encodeNB;

/**
 * Directly encodes the message to a base64 encoded string.
 * @name ProtoBuf.Builder.Message#encode64
 * @function
 * @return {string} Base64 encoded string
 * @throws {Error} If the underlying buffer cannot be encoded or if required fields are missing. The later
 *  still returns the encoded base64 string in the `encoded` property on the error.
 * @expose
 */
Message.prototype.encode64 = function() {
    try {
        return this.encode().toBase64();
    } catch (err) {
        if (err["encoded"]) err["encoded"] = err["encoded"].toBase64();
        throw(err);
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
Message.prototype.toBase64 = Message.prototype.encode64;

/**
 * Directly encodes the message to a hex encoded string.
 * @name ProtoBuf.Builder.Message#encodeHex
 * @function
 * @return {string} Hex encoded string
 * @throws {Error} If the underlying buffer cannot be encoded or if required fields are missing. The later
 *  still returns the encoded hex string in the `encoded` property on the error.
 * @expose
 */
Message.prototype.encodeHex = function() {
    try {
        return this.encode().toHex();
    } catch (err) {
        if (err["encoded"]) err["encoded"] = err["encoded"].toHex();
        throw(err);
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
Message.prototype.toHex = Message.prototype.encodeHex;

/**
 * Clones a message object to a raw object.
 * @param {*} obj Object to clone
 * @param {boolean} includeBuffers Whether to include native buffer data or not
 * @returns {*} Cloned object
 * @inner
 */
function cloneRaw(obj, includeBuffers) {
    var clone = {};
    for (var i in obj)
        if (obj.hasOwnProperty(i)) {
            if (obj[i] === null || typeof obj[i] !== 'object') {
                clone[i] = obj[i];
            } else if (obj[i] instanceof ByteBuffer) {
                if (includeBuffers)
                    clone[i] = obj.toBuffer();
            } else { // is a non-null object
                clone[i] = cloneRaw(obj[i], includeBuffers);
            }
        }
    return clone;
}

/**
 * Returns the message's raw payload.
 * @param {boolean=} includeBuffers Whether to include native buffer data or not, defaults to `false`
 * @returns {Object.<string,*>} Raw payload
 * @expose
 */
Message.prototype.toRaw = function(includeBuffers) {
    return cloneRaw(this, !!includeBuffers);
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
    if (buffer === null) throw(new Error("buffer must not be null"));
    if (typeof buffer === 'string') {
        buffer = ByteBuffer.wrap(buffer, enc ? enc : "base64");
    }
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
 * @return {!ProtoBuf.Builder.Message} Decoded message
 * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
 *  returns the decoded message with missing fields in the `decoded` property on the error.
 * @expose
 */
Message.decodeDelimited = function(buffer, enc) {
    if (buffer === null) throw(new Error("buffer must not be null"));
    if (typeof buffer === 'string') {
        buffer = ByteBuffer.wrap(buffer, enc ? enc : "base64");
    }
    buffer = buffer instanceof ByteBuffer ? buffer : ByteBuffer.wrap(buffer); // May throw
    var len = buffer.readVarint32();
    var msg = T.decode(buffer.slice(buffer.offset, buffer.offset + len).LE());
    buffer.offset += len;
    return msg;
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
Message.prototype.toString = function() {
    return T.toString();
};

// Static

/**
 * Options.
 * @name ProtoBuf.Builder.Message.$options
 * @type {Object.<string,*>}
 * @expose
 */
var $options; // for cc

if (Object.defineProperty) {
    Object.defineProperty(Message, '$options', {
        'value': T.buildOpt(),
        'enumerable': false,
        'configurable': false,
        'writable': false
    });
}
