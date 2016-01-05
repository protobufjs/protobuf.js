/**
 * Constructs a new Message Field.
 * @exports ProtoBuf.Reflect.Message.Field
 * @param {!ProtoBuf.Builder} builder Builder reference
 * @param {!ProtoBuf.Reflect.Message} message Message reference
 * @param {string} rule Rule, one of requried, optional, repeated
 * @param {string?} keytype Key data type, if any.
 * @param {string} type Data type, e.g. int32
 * @param {string} name Field name
 * @param {number} id Unique field id
 * @param {Object.<string,*>=} options Options
 * @param {!ProtoBuf.Reflect.Message.OneOf=} oneof Enclosing OneOf
 * @param {string?} syntax The syntax level of this definition (e.g., proto3)
 * @constructor
 * @extends ProtoBuf.Reflect.T
 */
var Field = function(builder, message, rule, keytype, type, name, id, options, oneof, syntax) {
    T.call(this, builder, message, name);

    /**
     * @override
     */
    this.className = "Message.Field";

    /**
     * Message field required flag.
     * @type {boolean}
     * @expose
     */
    this.required = rule === "required";

    /**
     * Message field repeated flag.
     * @type {boolean}
     * @expose
     */
    this.repeated = rule === "repeated";

    /**
     * Message field map flag.
     * @type {boolean}
     * @expose
     */
    this.map = rule === "map";

    /**
     * Message field key type. Type reference string if unresolved, protobuf
     * type if resolved. Valid only if this.map === true, null otherwise.
     * @type {string|{name: string, wireType: number}|null}
     * @expose
     */
    this.keyType = keytype || null;

    /**
     * Message field type. Type reference string if unresolved, protobuf type if
     * resolved. In a map field, this is the value type.
     * @type {string|{name: string, wireType: number}}
     * @expose
     */
    this.type = type;

    /**
     * Resolved type reference inside the global namespace.
     * @type {ProtoBuf.Reflect.T|null}
     * @expose
     */
    this.resolvedType = null;

    /**
     * Unique message field id.
     * @type {number}
     * @expose
     */
    this.id = id;

    /**
     * Message field options.
     * @type {!Object.<string,*>}
     * @dict
     * @expose
     */
    this.options = options || {};

    /**
     * Default value.
     * @type {*}
     * @expose
     */
    this.defaultValue = null;

    /**
     * Enclosing OneOf.
     * @type {?ProtoBuf.Reflect.Message.OneOf}
     * @expose
     */
    this.oneof = oneof || null;

    /**
     * Syntax level of this definition (e.g., proto3).
     * @type {string}
     * @expose
     */
    this.syntax = syntax || 'proto2';

    /**
     * Original field name.
     * @type {string}
     * @expose
     */
    this.originalName = this.name; // Used to revert camelcase transformation on naming collisions

    /**
     * Element implementation. Created in build() after types are resolved.
     * @type {ProtoBuf.Element}
     * @expose
     */
    this.element = null;

    /**
     * Key element implementation, for map fields. Created in build() after
     * types are resolved.
     * @type {ProtoBuf.Element}
     * @expose
     */
    this.keyElement = null;

    // Convert field names to camel case notation if the override is set
    if (this.builder.options['convertFieldsToCamelCase'] && !(this instanceof Message.ExtensionField))
        this.name = ProtoBuf.Util.toCamelCase(this.name);
};

/**
 * @alias ProtoBuf.Reflect.Message.Field.prototype
 * @inner
 */
var FieldPrototype = Field.prototype = Object.create(T.prototype);

/**
 * Builds the field.
 * @override
 * @expose
 */
FieldPrototype.build = function() {
    this.element = new Element(this.type, this.resolvedType, false, this.syntax);
    if (this.map)
        this.keyElement = new Element(this.keyType, undefined, true, this.syntax);

    // In proto3, fields do not have field presence, and every field is set to
    // its type's default value ("", 0, 0.0, or false).
    if (this.syntax === 'proto3' && !this.repeated && !this.map)
        this.defaultValue = Element.defaultFieldValue(this.type);

    // Otherwise, default values are present when explicitly specified
    else if (typeof this.options['default'] !== 'undefined')
        this.defaultValue = this.verifyValue(this.options['default']);
};

/**
 * Checks if the given value can be set for this field.
 * @param {*} value Value to check
 * @param {boolean=} skipRepeated Whether to skip the repeated value check or not. Defaults to false.
 * @return {*} Verified, maybe adjusted, value
 * @throws {Error} If the value cannot be set for this field
 * @expose
 */
FieldPrototype.verifyValue = function(value, skipRepeated) {
    skipRepeated = skipRepeated || false;
    var self = this;
    function fail(val, msg) {
        throw Error("Illegal value for "+self.toString(true)+" of type "+self.type.name+": "+val+" ("+msg+")");
    }
    if (value === null) { // NULL values for optional fields
        if (this.required)
            fail(typeof value, "required");
        if (this.syntax === 'proto3' && this.type !== ProtoBuf.TYPES["message"])
            fail(typeof value, "proto3 field without field presence cannot be null");
        return null;
    }
    var i;
    if (this.repeated && !skipRepeated) { // Repeated values as arrays
        if (!Array.isArray(value))
            value = [value];
        var res = [];
        for (i=0; i<value.length; i++)
            res.push(this.element.verifyValue(value[i]));
        return res;
    }
    if (this.map && !skipRepeated) { // Map values as objects
        if (!(value instanceof ProtoBuf.Map)) {
            // If not already a Map, attempt to convert.
            if (!(value instanceof Object)) {
                fail(typeof value,
                     "expected ProtoBuf.Map or raw object for map field");
            }
            return new ProtoBuf.Map(this, value);
        } else {
            return value;
        }
    }
    // All non-repeated fields expect no array
    if (!this.repeated && Array.isArray(value))
        fail(typeof value, "no array expected");

    return this.element.verifyValue(value);
};

/**
 * Determines whether the field will have a presence on the wire given its
 * value.
 * @param {*} value Verified field value
 * @param {!ProtoBuf.Builder.Message} message Runtime message
 * @return {boolean} Whether the field will be present on the wire
 */
FieldPrototype.hasWirePresence = function(value, message) {
    if (this.syntax !== 'proto3')
        return (value !== null);
    if (this.oneof && message[this.oneof.name] === this.name)
        return true;
    switch (this.type) {
        case ProtoBuf.TYPES["int32"]:
        case ProtoBuf.TYPES["sint32"]:
        case ProtoBuf.TYPES["sfixed32"]:
        case ProtoBuf.TYPES["uint32"]:
        case ProtoBuf.TYPES["fixed32"]:
            return value !== 0;

        case ProtoBuf.TYPES["int64"]:
        case ProtoBuf.TYPES["sint64"]:
        case ProtoBuf.TYPES["sfixed64"]:
        case ProtoBuf.TYPES["uint64"]:
        case ProtoBuf.TYPES["fixed64"]:
            return value.low !== 0 || value.high !== 0;

        case ProtoBuf.TYPES["bool"]:
            return value;

        case ProtoBuf.TYPES["float"]:
        case ProtoBuf.TYPES["double"]:
            return value !== 0.0;

        case ProtoBuf.TYPES["string"]:
            return value.length > 0;

        case ProtoBuf.TYPES["bytes"]:
            return value.remaining() > 0;

        case ProtoBuf.TYPES["enum"]:
            return value !== 0;

        case ProtoBuf.TYPES["message"]:
            return value !== null;
        default:
            return true;
    }
};

/**
 * Encodes the specified field value to the specified buffer.
 * @param {*} value Verified field value
 * @param {ByteBuffer} buffer ByteBuffer to encode to
 * @param {!ProtoBuf.Builder.Message} message Runtime message
 * @return {ByteBuffer} The ByteBuffer for chaining
 * @throws {Error} If the field cannot be encoded
 * @expose
 */
FieldPrototype.encode = function(value, buffer, message) {
    if (this.type === null || typeof this.type !== 'object')
        throw Error("[INTERNAL] Unresolved type in "+this.toString(true)+": "+this.type);
    if (value === null || (this.repeated && value.length == 0))
        return buffer; // Optional omitted
    try {
        if (this.repeated) {
            var i;
            // "Only repeated fields of primitive numeric types (types which use the varint, 32-bit, or 64-bit wire
            // types) can be declared 'packed'."
            if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                // "All of the elements of the field are packed into a single key-value pair with wire type 2
                // (length-delimited). Each element is encoded the same way it would be normally, except without a
                // tag preceding it."
                buffer.writeVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
                buffer.ensureCapacity(buffer.offset += 1); // We do not know the length yet, so let's assume a varint of length 1
                var start = buffer.offset; // Remember where the contents begin
                for (i=0; i<value.length; i++)
                    this.element.encodeValue(this.id, value[i], buffer);
                var len = buffer.offset-start,
                    varintLen = ByteBuffer.calculateVarint32(len);
                if (varintLen > 1) { // We need to move the contents
                    var contents = buffer.slice(start, buffer.offset);
                    start += varintLen-1;
                    buffer.offset = start;
                    buffer.append(contents);
                }
                buffer.writeVarint32(len, start-varintLen);
            } else {
                // "If your message definition has repeated elements (without the [packed=true] option), the encoded
                // message has zero or more key-value pairs with the same tag number"
                for (i=0; i<value.length; i++)
                    buffer.writeVarint32((this.id << 3) | this.type.wireType),
                    this.element.encodeValue(this.id, value[i], buffer);
            }
        } else if (this.map) {
            // Write out each map entry as a submessage.
            value.forEach(function(val, key, m) {
                // Compute the length of the submessage (key, val) pair.
                var length =
                    ByteBuffer.calculateVarint32((1 << 3) | this.keyType.wireType) +
                    this.keyElement.calculateLength(1, key) +
                    ByteBuffer.calculateVarint32((2 << 3) | this.type.wireType) +
                    this.element.calculateLength(2, val);

                // Submessage with wire type of length-delimited.
                buffer.writeVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
                buffer.writeVarint32(length);

                // Write out the key and val.
                buffer.writeVarint32((1 << 3) | this.keyType.wireType);
                this.keyElement.encodeValue(1, key, buffer);
                buffer.writeVarint32((2 << 3) | this.type.wireType);
                this.element.encodeValue(2, val, buffer);
            }, this);
        } else {
            if (this.hasWirePresence(value, message)) {
                buffer.writeVarint32((this.id << 3) | this.type.wireType);
                this.element.encodeValue(this.id, value, buffer);
            }
        }
    } catch (e) {
        throw Error("Illegal value for "+this.toString(true)+": "+value+" ("+e+")");
    }
    return buffer;
};

/**
 * Calculates the length of this field's value on the network level.
 * @param {*} value Field value
 * @param {!ProtoBuf.Builder.Message} message Runtime message
 * @returns {number} Byte length
 * @expose
 */
FieldPrototype.calculate = function(value, message) {
    value = this.verifyValue(value); // May throw
    if (this.type === null || typeof this.type !== 'object')
        throw Error("[INTERNAL] Unresolved type in "+this.toString(true)+": "+this.type);
    if (value === null || (this.repeated && value.length == 0))
        return 0; // Optional omitted
    var n = 0;
    try {
        if (this.repeated) {
            var i, ni;
            if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                n += ByteBuffer.calculateVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
                ni = 0;
                for (i=0; i<value.length; i++)
                    ni += this.element.calculateLength(this.id, value[i]);
                n += ByteBuffer.calculateVarint32(ni);
                n += ni;
            } else {
                for (i=0; i<value.length; i++)
                    n += ByteBuffer.calculateVarint32((this.id << 3) | this.type.wireType),
                    n += this.element.calculateLength(this.id, value[i]);
            }
        } else if (this.map) {
            // Each map entry becomes a submessage.
            value.forEach(function(val, key, m) {
                // Compute the length of the submessage (key, val) pair.
                var length =
                    ByteBuffer.calculateVarint32((1 << 3) | this.keyType.wireType) +
                    this.keyElement.calculateLength(1, key) +
                    ByteBuffer.calculateVarint32((2 << 3) | this.type.wireType) +
                    this.element.calculateLength(2, val);

                n += ByteBuffer.calculateVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
                n += ByteBuffer.calculateVarint32(length);
                n += length;
            }, this);
        } else {
            if (this.hasWirePresence(value, message)) {
                n += ByteBuffer.calculateVarint32((this.id << 3) | this.type.wireType);
                n += this.element.calculateLength(this.id, value);
            }
        }
    } catch (e) {
        throw Error("Illegal value for "+this.toString(true)+": "+value+" ("+e+")");
    }
    return n;
};

/**
 * Decode the field value from the specified buffer.
 * @param {number} wireType Leading wire type
 * @param {ByteBuffer} buffer ByteBuffer to decode from
 * @param {boolean=} skipRepeated Whether to skip the repeated check or not. Defaults to false.
 * @return {*} Decoded value: array for packed repeated fields, [key, value] for
 *             map fields, or an individual value otherwise.
 * @throws {Error} If the field cannot be decoded
 * @expose
 */
FieldPrototype.decode = function(wireType, buffer, skipRepeated) {
    var value, nBytes;

    // We expect wireType to match the underlying type's wireType unless we see
    // a packed repeated field, or unless this is a map field.
    var wireTypeOK =
        (!this.map && wireType == this.type.wireType) ||
        (!skipRepeated && this.repeated && this.options["packed"] &&
         wireType == ProtoBuf.WIRE_TYPES.LDELIM) ||
        (this.map && wireType == ProtoBuf.WIRE_TYPES.LDELIM);
    if (!wireTypeOK)
        throw Error("Illegal wire type for field "+this.toString(true)+": "+wireType+" ("+this.type.wireType+" expected)");

    // Handle packed repeated fields.
    if (wireType == ProtoBuf.WIRE_TYPES.LDELIM && this.repeated && this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
        if (!skipRepeated) {
            nBytes = buffer.readVarint32();
            nBytes = buffer.offset + nBytes; // Limit
            var values = [];
            while (buffer.offset < nBytes)
                values.push(this.decode(this.type.wireType, buffer, true));
            return values;
        }
        // Read the next value otherwise...
    }

    // Handle maps.
    if (this.map) {
        // Read one (key, value) submessage, and return [key, value]
        var key = Element.defaultFieldValue(this.keyType);
        value = Element.defaultFieldValue(this.type);

        // Read the length
        nBytes = buffer.readVarint32();
        if (buffer.remaining() < nBytes)
            throw Error("Illegal number of bytes for "+this.toString(true)+": "+nBytes+" required but got only "+buffer.remaining());

        // Get a sub-buffer of this key/value submessage
        var msgbuf = buffer.clone();
        msgbuf.limit = msgbuf.offset + nBytes;
        buffer.offset += nBytes;

        while (msgbuf.remaining() > 0) {
            var tag = msgbuf.readVarint32();
            wireType = tag & 0x07;
            var id = tag >>> 3;
            if (id === 1) {
                key = this.keyElement.decode(msgbuf, wireType, id);
            } else if (id === 2) {
                value = this.element.decode(msgbuf, wireType, id);
            } else {
                throw Error("Unexpected tag in map field key/value submessage");
            }
        }

        return [key, value];
    }

    // Handle singular and non-packed repeated field values.
    return this.element.decode(buffer, wireType, this.id);
};
