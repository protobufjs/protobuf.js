/**
 * Constructs a new Message Field.
 * @exports ProtoBuf.Reflect.Message.Field
 * @param {ProtoBuf.Reflect.Message} message Message reference
 * @param {string} rule Rule, one of requried, optional, repeated
 * @param {string} type Data type, e.g. int32
 * @param {string} name Field name
 * @param {number} id Unique field id
 * @param {Object.<string.*>=} options Options
 * @constructor
 * @extends ProtoBuf.Reflect.T
 */
var Field = function(message, rule, type, name, id, options) {
    T.call(this, message, name);

    /**
     * @override
     */
    this.className = "Message.Field";

    /**
     * Message field required flag.
     * @type {boolean}
     * @expose
     */
    this.required = rule == "required";

    /**
     * Message field repeated flag.
     * @type {boolean}
     * @expose
     */
    this.repeated = rule == "repeated";

    /**
     * Message field type. Type reference string if unresolved, protobuf type if resolved.
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
     * Original field name.
     * @type {string}
     * @expose
     */
    this.originalName = this.name; // Used to revert camelcase transformation on naming collisions

    // Convert field names to camel case notation if the override is set
    if (ProtoBuf.convertFieldsToCamelCase) {
        this.name = this.name.replace(/_([a-zA-Z])/g, function($0, $1) {
            return $1.toUpperCase();
        });
    }
};

// Extends T
Field.prototype = Object.create(T.prototype);

/**
 * Makes a Long from a value.
 * @param {{low: number, high: number, unsigned: boolean}|string|number} value Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to reuse it from Long-like objects or to signed for
 *  strings and numbers
 * @returns {!Long}
 * @throws {Error} If the value cannot be converted to a Long
 * @inner
 */
function mkLong(value, unsigned) {
    if (value && typeof value.low === 'number' && typeof value.high === 'number' && typeof value.unsigned === 'boolean')
        return new ProtoBuf.Long(value.low, value.high, typeof unsigned === 'undefined' ? value.unsigned : unsigned);
    if (typeof value === 'string')
        return ProtoBuf.Long.fromString(value, unsigned || false, 10);
    if (typeof value === 'number')
        return ProtoBuf.Long.fromNumber(value, unsigned || false);
    throw(new Error("not convertible to Long"));
}

/**
 * Checks if the given value can be set for this field.
 * @param {*} value Value to check
 * @param {boolean=} skipRepeated Whether to skip the repeated value check or not. Defaults to false.
 * @return {*} Verified, maybe adjusted, value
 * @throws {Error} If the value cannot be set for this field
 * @expose
 */
Field.prototype.verifyValue = function(value, skipRepeated) {
    skipRepeated = skipRepeated || false;
    if (value === null) { // NULL values for optional fields
        if (this.required) {
            throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (required)"));
        }
        return null;
    }
    var i;
    if (this.repeated && !skipRepeated) { // Repeated values as arrays
        if (!ProtoBuf.Util.isArray(value)) {
            value = [value];
        }
        var res = [];
        for (i=0; i<value.length; i++) {
            res.push(this.verifyValue(value[i], true));
        }
        return res;
    }
    // All non-repeated fields expect no array
    if (!this.repeated && ProtoBuf.Util.isArray(value)) {
        throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (no array expected)"));
    }

    switch (this.type) {
        // Signed 32bit
        case ProtoBuf.TYPES["int32"]:
        case ProtoBuf.TYPES["sint32"]:
        case ProtoBuf.TYPES["sfixed32"]:
            // Do not cast NaN as it'd become 0
            return isNaN(i = parseInt(value, 10)) ? i : i | 0;

        // Unsigned 32bit
        case ProtoBuf.TYPES["uint32"]:
        case ProtoBuf.TYPES["fixed32"]:
            // Do not cast NaN as it'd become 0
            return isNaN(i = parseInt(value, 10)) ? i : i >>> 0;

        // Signed 64bit
        case ProtoBuf.TYPES["int64"]:
        case ProtoBuf.TYPES["sint64"]:
        case ProtoBuf.TYPES["sfixed64"]: {
            if (ProtoBuf.Long) {
                try {
                    return mkLong(value, false);
                } catch (e) {
                    throw(new Error("Illegal value for "+this.toString(true)+": "+value+" ("+e.message+")"));
                }
            }
        }

        // Unsigned 64bit
        case ProtoBuf.TYPES["uint64"]:
        case ProtoBuf.TYPES["fixed64"]: {
            if (ProtoBuf.Long) {
                try {
                    return mkLong(value, true);
                } catch (e) {
                    throw(new Error("Illegal value for "+this.toString(true)+": "+value+" ("+e.message+")"));
                }
            }
        }

        // Bool
        case ProtoBuf.TYPES["bool"]:
            return typeof value === 'string'
                ? value === 'true'
                : !!value;

        // Float
        case ProtoBuf.TYPES["float"]:
        case ProtoBuf.TYPES["double"]:
            // May also become NaN, +Infinity, -Infinity
            return parseFloat(value);

        // Length-delimited string
        case ProtoBuf.TYPES["string"]:
            return ""+value;

        // Length-delimited bytes
        case ProtoBuf.TYPES["bytes"]:
            return value && value instanceof ByteBuffer
                ? value
                : ByteBuffer.wrap(value);

        // Constant enum value
        case ProtoBuf.TYPES["enum"]: {
            var values = this.resolvedType.getChildren(Enum.Value);
            for (i=0; i<values.length; i++) {
                if (values[i].name == value) {
                    return values[i].id;
                } else if (values[i].id == value) {
                    return values[i].id;
                }
            }
            throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (not a valid enum value)"));
        }
        // Embedded message
        case ProtoBuf.TYPES["group"]:
        case ProtoBuf.TYPES["message"]: {
            if (typeof value !== 'object') {
                throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (object expected)"));
            }
            if (value instanceof this.resolvedType.clazz) {
                return value;
            }
            // Else let's try to construct one from a key-value object
            return new (this.resolvedType.clazz)(value); // May throw for a hundred of reasons
        }
    }

    // We should never end here
    throw(new Error("[INTERNAL] Illegal value for "+this.toString(true)+": "+value+" (undefined type "+this.type+")"));
};

/**
 * Encodes the specified field value to the specified buffer.
 * @param {*} value Field value
 * @param {ByteBuffer} buffer ByteBuffer to encode to
 * @return {ByteBuffer} The ByteBuffer for chaining
 * @throws {Error} If the field cannot be encoded
 * @expose
 */
Field.prototype.encode = function(value, buffer) {
    value = this.verifyValue(value); // May throw
    if (this.type === null || typeof this.type !== 'object')
        throw(new Error("[INTERNAL] Unresolved type in "+this.toString(true)+": "+this.type));
    if (value === null || (this.repeated && value.length == 0)) return buffer; // Optional omitted
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
                for (i=0; i<value.length; i++) {
                    this.encodeValue(value[i], buffer);
                }
                var len = buffer.offset-start;
                var varintLen = ByteBuffer.calculateVarint32(len);
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
                for (i=0; i<value.length; i++) {
                    buffer.writeVarint32((this.id << 3) | this.type.wireType);
                    this.encodeValue(value[i], buffer);
                }
            }
        } else {
            buffer.writeVarint32((this.id << 3) | this.type.wireType);
            this.encodeValue(value, buffer);
        }
    } catch (e) {
        throw(new Error("Illegal value for "+this.toString(true)+": "+value+" ("+e+")"));
    }
    return buffer;
};

/**
 * Encodes a value to the specified buffer. Does not encode the key.
 * @param {*} value Field value
 * @param {ByteBuffer} buffer ByteBuffer to encode to
 * @return {ByteBuffer} The ByteBuffer for chaining
 * @throws {Error} If the value cannot be encoded
 * @expose
 */
Field.prototype.encodeValue = function(value, buffer) {
    if (value === null) return; // Nothing to encode
    // Tag has already been written

    switch (this.type) {
        // 32bit signed varint
        case ProtoBuf.TYPES["int32"]: {
            // "If you use int32 or int64 as the type for a negative number, the resulting varint is always ten bytes
            // long – it is, effectively, treated like a very large unsigned integer." (see #122)
            if (value < 0)
                buffer.writeVarint64(value);
            else
                buffer.writeVarint32(value);
            break;
        }

        // 32bit unsigned varint
        case ProtoBuf.TYPES["uint32"]:
            buffer.writeVarint32(value);
            break;

        // 32bit varint zig-zag
        case ProtoBuf.TYPES["sint32"]:
            buffer.writeVarint32ZigZag(value);
            break;

        // Fixed unsigned 32bit
        case ProtoBuf.TYPES["fixed32"]:
            buffer.writeUint32(value);
            break;

        // Fixed signed 32bit
        case ProtoBuf.TYPES["sfixed32"]:
            buffer.writeInt32(value);
            break;

        // 64bit varint as-is
        case ProtoBuf.TYPES["int64"]:
        case ProtoBuf.TYPES["uint64"]:
            buffer.writeVarint64(value); // throws
            break;

        // 64bit varint zig-zag
        case ProtoBuf.TYPES["sint64"]:
            buffer.writeVarint64ZigZag(value); // throws
            break;

        // Fixed unsigned 64bit
        case ProtoBuf.TYPES["fixed64"]:
            buffer.writeUint64(value); // throws
            break;

        // Fixed signed 64bit
        case ProtoBuf.TYPES["sfixed64"]:
            buffer.writeInt64(value); // throws
            break;

        // Bool
        case ProtoBuf.TYPES["bool"]: {
            if (typeof value === 'string')
                buffer.writeVarint32(value.toLowerCase() === 'false' ? 0 : !!value);
            else
                buffer.writeVarint32(value ? 1 : 0);
            break;
        }

        // Constant enum value
        case ProtoBuf.TYPES["enum"]:
            buffer.writeVarint32(value);
            break;

        // 32bit float
        case ProtoBuf.TYPES["float"]:
            buffer.writeFloat32(value);
            break;

        // 64bit float
        case ProtoBuf.TYPES["double"]:
            buffer.writeFloat64(value);
            break;

        // Length-delimited string
        case ProtoBuf.TYPES["string"]:
            buffer.writeVString(value);
            break;

        // Length-delimited bytes
        case ProtoBuf.TYPES["bytes"]: {
            if (value.offset > value.length) { // Forgot to flip?
                // TODO: This is actually dangerous as it might lead to a condition where data is included that isn't
                // meant to be transmitted. Shall we remove this?
                buffer = buffer.clone().flip();
            }
            var prevOffset = value.offset;
            buffer.writeVarint32(value.remaining());
            buffer.append(value);
            value.offset = prevOffset;
            break;
        }

        // Embedded message
        case ProtoBuf.TYPES["message"]: {
            var bb = new ByteBuffer().LE();
            this.resolvedType.encode(value, bb);
            buffer.writeVarint32(bb.offset);
            buffer.append(bb.flip());
            break;
        }

        // Legacy group
        case ProtoBuf.TYPES["group"]: {
            this.resolvedType.encode(value, buffer);
            buffer.writeVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.ENDGROUP);
            break;
        }

        default:
            // We should never end here
            throw(new Error("[INTERNAL] Illegal value to encode in "+this.toString(true)+": "+value+" (unknown type)"));
    }
    return buffer;
};

/**
 * Decode the field value from the specified buffer.
 * @param {number} wireType Leading wire type
 * @param {ByteBuffer} buffer ByteBuffer to decode from
 * @param {boolean=} skipRepeated Whether to skip the repeated check or not. Defaults to false.
 * @return {*} Decoded value
 * @throws {Error} If the field cannot be decoded
 * @expose
 */
Field.prototype.decode = function(wireType, buffer, skipRepeated) {
    var value, nBytes;
    if (wireType != this.type.wireType && (skipRepeated || (wireType != ProtoBuf.WIRE_TYPES.LDELIM || !this.repeated))) {
        throw(new Error("Illegal wire type for field "+this.toString(true)+": "+wireType+" ("+this.type.wireType+" expected)"));
    }
    if (wireType == ProtoBuf.WIRE_TYPES.LDELIM && this.repeated && this.options["packed"]) {
        if (!skipRepeated) {
            nBytes = buffer.readVarint32();
            nBytes = buffer.offset + nBytes; // Limit
            var values = [];
            while (buffer.offset < nBytes) {
                values.push(this.decode(this.type.wireType, buffer, true));
            }
            return values;
        }
        // Read the next value otherwise...
    }
    switch (this.type) {
        // 32bit signed varint
        case ProtoBuf.TYPES["int32"]:
            return buffer.readVarint32() | 0;

        // 32bit unsigned varint
        case ProtoBuf.TYPES["uint32"]:
            return buffer.readVarint32() >>> 0;

        // 32bit signed varint zig-zag
        case ProtoBuf.TYPES["sint32"]:
            return buffer.readVarint32ZigZag() | 0;

        // Fixed 32bit unsigned
        case ProtoBuf.TYPES["fixed32"]:
            return buffer.readUint32() >>> 0;

        case ProtoBuf.TYPES["sfixed32"]:
            return buffer.readInt32() | 0;

        // 64bit signed varint
        case ProtoBuf.TYPES["int64"]:
            return buffer.readVarint64();

        // 64bit unsigned varint
        case ProtoBuf.TYPES["uint64"]:
            return buffer.readVarint64().toUnsigned();

        // 64bit signed varint zig-zag
        case ProtoBuf.TYPES["sint64"]:
            return buffer.readVarint64ZigZag();

        // Fixed 64bit unsigned
        case ProtoBuf.TYPES["fixed64"]:
            return buffer.readUint64();

        // Fixed 64bit signed
        case ProtoBuf.TYPES["sfixed64"]:
            return buffer.readInt64();

        // Bool varint
        case ProtoBuf.TYPES["bool"]:
            return !!buffer.readVarint32();

        // Constant enum value (varint)
        case ProtoBuf.TYPES["enum"]:
            // The following Builder.Message#set will already throw
            return buffer.readVarint32();

        // 32bit float
        case ProtoBuf.TYPES["float"]:
            return buffer.readFloat();

        // 64bit float
        case ProtoBuf.TYPES["double"]:
            return buffer.readDouble();

        // Length-delimited string
        case ProtoBuf.TYPES["string"]:
            return buffer.readVString();

        // Length-delimited bytes
        case ProtoBuf.TYPES["bytes"]: {
            nBytes = buffer.readVarint32();
            if (buffer.remaining() < nBytes) {
                throw(new Error("Illegal number of bytes for "+this.toString(true)+": "+nBytes+" required but got only "+buffer.remaining()));
            }
            value = buffer.clone(); // Offset already set
            value.limit = value.offset+nBytes;
            buffer.offset += nBytes;
            return value;
        }

        // Length-delimited embedded message
        case ProtoBuf.TYPES["message"]: {
            nBytes = buffer.readVarint32();
            return this.resolvedType.decode(buffer, nBytes);
        }

        // Legacy group
        case ProtoBuf.TYPES["group"]:
            return this.resolvedType.decode(buffer, -1, this.id);
    }

    // We should never end here
    throw(new Error("[INTERNAL] Illegal wire type for "+this.toString(true)+": "+wireType));
}
