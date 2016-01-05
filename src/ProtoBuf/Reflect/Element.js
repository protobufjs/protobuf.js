/**
 * Constructs a new Element implementation that checks and converts values for a
 * particular field type, as appropriate.
 *
 * An Element represents a single value: either the value of a singular field,
 * or a value contained in one entry of a repeated field or map field. This
 * class does not implement these higher-level concepts; it only encapsulates
 * the low-level typechecking and conversion.
 *
 * @exports ProtoBuf.Reflect.Element
 * @param {{name: string, wireType: number}} type Resolved data type
 * @param {ProtoBuf.Reflect.T|null} resolvedType Resolved type, if relevant
 * (e.g. submessage field).
 * @param {boolean} isMapKey Is this element a Map key? The value will be
 * converted to string form if so.
 * @param {string} syntax Syntax level of defining message type, e.g.,
 * proto2 or proto3.
 * @constructor
 */
var Element = function(type, resolvedType, isMapKey, syntax) {

    /**
     * Element type, as a string (e.g., int32).
     * @type {{name: string, wireType: number}}
     */
    this.type = type;

    /**
     * Element type reference to submessage or enum definition, if needed.
     * @type {ProtoBuf.Reflect.T|null}
     */
    this.resolvedType = resolvedType;

    /**
     * Element is a map key.
     * @type {boolean}
     */
    this.isMapKey = isMapKey;

    /**
     * Syntax level of defining message type, e.g., proto2 or proto3.
     * @type {string}
     */
    this.syntax = syntax;

    if (isMapKey && ProtoBuf.MAP_KEY_TYPES.indexOf(type) < 0)
        throw Error("Invalid map key type: " + type.name);
};

var ElementPrototype = Element.prototype;

/**
 * Obtains a (new) default value for the specified type.
 * @param type {string|{name: string, wireType: number}} Field type
 * @returns {*} Default value
 * @inner
 */
function mkDefault(type) {
    if (typeof type === 'string')
        type = ProtoBuf.TYPES[type];
    if (typeof type.defaultValue === 'undefined')
        throw Error("default value for type "+type.name+" is not supported");
    if (type == ProtoBuf.TYPES["bytes"])
        return new ByteBuffer(0);
    return type.defaultValue;
}

/**
 * Returns the default value for this field in proto3.
 * @function
 * @param type {string|{name: string, wireType: number}} the field type
 * @returns {*} Default value
 */
Element.defaultFieldValue = mkDefault;

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
    if (value && typeof value.low === 'number' && typeof value.high === 'number' && typeof value.unsigned === 'boolean'
        && value.low === value.low && value.high === value.high)
        return new ProtoBuf.Long(value.low, value.high, typeof unsigned === 'undefined' ? value.unsigned : unsigned);
    if (typeof value === 'string')
        return ProtoBuf.Long.fromString(value, unsigned || false, 10);
    if (typeof value === 'number')
        return ProtoBuf.Long.fromNumber(value, unsigned || false);
    throw Error("not convertible to Long");
}

/**
 * Checks if the given value can be set for an element of this type (singular
 * field or one element of a repeated field or map).
 * @param {*} value Value to check
 * @return {*} Verified, maybe adjusted, value
 * @throws {Error} If the value cannot be verified for this element slot
 * @expose
 */
ElementPrototype.verifyValue = function(value) {
    var self = this;
    function fail(val, msg) {
        throw Error("Illegal value for "+self.toString(true)+" of type "+self.type.name+": "+val+" ("+msg+")");
    }
    switch (this.type) {
        // Signed 32bit
        case ProtoBuf.TYPES["int32"]:
        case ProtoBuf.TYPES["sint32"]:
        case ProtoBuf.TYPES["sfixed32"]:
            // Account for !NaN: value === value
            if (typeof value !== 'number' || (value === value && value % 1 !== 0))
                fail(typeof value, "not an integer");
            return value > 4294967295 ? value | 0 : value;

        // Unsigned 32bit
        case ProtoBuf.TYPES["uint32"]:
        case ProtoBuf.TYPES["fixed32"]:
            if (typeof value !== 'number' || (value === value && value % 1 !== 0))
                fail(typeof value, "not an integer");
            return value < 0 ? value >>> 0 : value;

        // Signed 64bit
        case ProtoBuf.TYPES["int64"]:
        case ProtoBuf.TYPES["sint64"]:
        case ProtoBuf.TYPES["sfixed64"]: {
            if (ProtoBuf.Long)
                try {
                    return mkLong(value, false);
                } catch (e) {
                    fail(typeof value, e.message);
                }
            else
                fail(typeof value, "requires Long.js");
        }

        // Unsigned 64bit
        case ProtoBuf.TYPES["uint64"]:
        case ProtoBuf.TYPES["fixed64"]: {
            if (ProtoBuf.Long)
                try {
                    return mkLong(value, true);
                } catch (e) {
                    fail(typeof value, e.message);
                }
            else
                fail(typeof value, "requires Long.js");
        }

        // Bool
        case ProtoBuf.TYPES["bool"]:
            if (typeof value !== 'boolean')
                fail(typeof value, "not a boolean");
            return value;

        // Float
        case ProtoBuf.TYPES["float"]:
        case ProtoBuf.TYPES["double"]:
            if (typeof value !== 'number')
                fail(typeof value, "not a number");
            return value;

        // Length-delimited string
        case ProtoBuf.TYPES["string"]:
            if (typeof value !== 'string' && !(value && value instanceof String))
                fail(typeof value, "not a string");
            return ""+value; // Convert String object to string

        // Length-delimited bytes
        case ProtoBuf.TYPES["bytes"]:
            if (ByteBuffer.isByteBuffer(value))
                return value;
            return ByteBuffer.wrap(value, "base64");

        // Constant enum value
        case ProtoBuf.TYPES["enum"]: {
            var values = this.resolvedType.getChildren(ProtoBuf.Reflect.Enum.Value);
            for (i=0; i<values.length; i++)
                if (values[i].name == value)
                    return values[i].id;
                else if (values[i].id == value)
                    return values[i].id;

            if (this.syntax === 'proto3') {
                // proto3: just make sure it's an integer.
                if (typeof value !== 'number' || (value === value && value % 1 !== 0))
                    fail(typeof value, "not an integer");
                if (value > 4294967295 || value < 0)
                    fail(typeof value, "not in range for uint32")
                return value;
            } else {
                // proto2 requires enum values to be valid.
                fail(value, "not a valid enum value");
            }
        }
        // Embedded message
        case ProtoBuf.TYPES["group"]:
        case ProtoBuf.TYPES["message"]: {
            if (!value || typeof value !== 'object')
                fail(typeof value, "object expected");
            if (value instanceof this.resolvedType.clazz)
                return value;
            if (value instanceof ProtoBuf.Builder.Message) {
                // Mismatched type: Convert to object (see: https://github.com/dcodeIO/ProtoBuf.js/issues/180)
                var obj = {};
                for (var i in value)
                    if (value.hasOwnProperty(i))
                        obj[i] = value[i];
                value = obj;
            }
            // Else let's try to construct one from a key-value object
            return new (this.resolvedType.clazz)(value); // May throw for a hundred of reasons
        }
    }

    // We should never end here
    throw Error("[INTERNAL] Illegal value for "+this.toString(true)+": "+value+" (undefined type "+this.type+")");
};

/**
 * Calculates the byte length of an element on the wire.
 * @param {number} id Field number
 * @param {*} value Field value
 * @returns {number} Byte length
 * @throws {Error} If the value cannot be calculated
 * @expose
 */
ElementPrototype.calculateLength = function(id, value) {
    if (value === null) return 0; // Nothing to encode
    // Tag has already been written
    var n;
    switch (this.type) {
        case ProtoBuf.TYPES["int32"]:
            return value < 0 ? ByteBuffer.calculateVarint64(value) : ByteBuffer.calculateVarint32(value);
        case ProtoBuf.TYPES["uint32"]:
            return ByteBuffer.calculateVarint32(value);
        case ProtoBuf.TYPES["sint32"]:
            return ByteBuffer.calculateVarint32(ByteBuffer.zigZagEncode32(value));
        case ProtoBuf.TYPES["fixed32"]:
        case ProtoBuf.TYPES["sfixed32"]:
        case ProtoBuf.TYPES["float"]:
            return 4;
        case ProtoBuf.TYPES["int64"]:
        case ProtoBuf.TYPES["uint64"]:
            return ByteBuffer.calculateVarint64(value);
        case ProtoBuf.TYPES["sint64"]:
            return ByteBuffer.calculateVarint64(ByteBuffer.zigZagEncode64(value));
        case ProtoBuf.TYPES["fixed64"]:
        case ProtoBuf.TYPES["sfixed64"]:
            return 8;
        case ProtoBuf.TYPES["bool"]:
            return 1;
        case ProtoBuf.TYPES["enum"]:
            return ByteBuffer.calculateVarint32(value);
        case ProtoBuf.TYPES["double"]:
            return 8;
        case ProtoBuf.TYPES["string"]:
            n = ByteBuffer.calculateUTF8Bytes(value);
            return ByteBuffer.calculateVarint32(n) + n;
        case ProtoBuf.TYPES["bytes"]:
            if (value.remaining() < 0)
                throw Error("Illegal value for "+this.toString(true)+": "+value.remaining()+" bytes remaining");
            return ByteBuffer.calculateVarint32(value.remaining()) + value.remaining();
        case ProtoBuf.TYPES["message"]:
            n = this.resolvedType.calculate(value);
            return ByteBuffer.calculateVarint32(n) + n;
        case ProtoBuf.TYPES["group"]:
            n = this.resolvedType.calculate(value);
            return n + ByteBuffer.calculateVarint32((id << 3) | ProtoBuf.WIRE_TYPES.ENDGROUP);
    }
    // We should never end here
    throw Error("[INTERNAL] Illegal value to encode in "+this.toString(true)+": "+value+" (unknown type)");
};

/**
 * Encodes a value to the specified buffer. Does not encode the key.
 * @param {number} id Field number
 * @param {*} value Field value
 * @param {ByteBuffer} buffer ByteBuffer to encode to
 * @return {ByteBuffer} The ByteBuffer for chaining
 * @throws {Error} If the value cannot be encoded
 * @expose
 */
ElementPrototype.encodeValue = function(id, value, buffer) {
    if (value === null) return buffer; // Nothing to encode
    // Tag has already been written

    switch (this.type) {
        // 32bit signed varint
        case ProtoBuf.TYPES["int32"]:
            // "If you use int32 or int64 as the type for a negative number, the resulting varint is always ten bytes
            // long – it is, effectively, treated like a very large unsigned integer." (see #122)
            if (value < 0)
                buffer.writeVarint64(value);
            else
                buffer.writeVarint32(value);
            break;

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
        case ProtoBuf.TYPES["bool"]:
            if (typeof value === 'string')
                buffer.writeVarint32(value.toLowerCase() === 'false' ? 0 : !!value);
            else
                buffer.writeVarint32(value ? 1 : 0);
            break;

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
        case ProtoBuf.TYPES["bytes"]:
            if (value.remaining() < 0)
                throw Error("Illegal value for "+this.toString(true)+": "+value.remaining()+" bytes remaining");
            var prevOffset = value.offset;
            buffer.writeVarint32(value.remaining());
            buffer.append(value);
            value.offset = prevOffset;
            break;

        // Embedded message
        case ProtoBuf.TYPES["message"]:
            var bb = new ByteBuffer().LE();
            this.resolvedType.encode(value, bb);
            buffer.writeVarint32(bb.offset);
            buffer.append(bb.flip());
            break;

        // Legacy group
        case ProtoBuf.TYPES["group"]:
            this.resolvedType.encode(value, buffer);
            buffer.writeVarint32((id << 3) | ProtoBuf.WIRE_TYPES.ENDGROUP);
            break;

        default:
            // We should never end here
            throw Error("[INTERNAL] Illegal value to encode in "+this.toString(true)+": "+value+" (unknown type)");
    }
    return buffer;
};

/**
 * Decode one element value from the specified buffer.
 * @param {ByteBuffer} buffer ByteBuffer to decode from
 * @param {number} wireType The field wire type
 * @param {number} id The field number
 * @return {*} Decoded value
 * @throws {Error} If the field cannot be decoded
 * @expose
 */
ElementPrototype.decode = function(buffer, wireType, id) {
    if (wireType != this.type.wireType)
        throw Error("Unexpected wire type for element");

    var value, nBytes;
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
            if (buffer.remaining() < nBytes)
                throw Error("Illegal number of bytes for "+this.toString(true)+": "+nBytes+" required but got only "+buffer.remaining());
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
            return this.resolvedType.decode(buffer, -1, id);
    }

    // We should never end here
    throw Error("[INTERNAL] Illegal decode type");
};

/**
 * Converts a value from a string to the canonical element type.
 *
 * Legal only when isMapKey is true.
 *
 * @param {string} str The string value
 * @returns {*} The value
 */
ElementPrototype.valueFromString = function(str) {
    if (!this.isMapKey) {
        throw Error("valueFromString() called on non-map-key element");
    }

    switch (this.type) {
        case ProtoBuf.TYPES["int32"]:
        case ProtoBuf.TYPES["sint32"]:
        case ProtoBuf.TYPES["sfixed32"]:
        case ProtoBuf.TYPES["uint32"]:
        case ProtoBuf.TYPES["fixed32"]:
            return this.verifyValue(parseInt(str));

        case ProtoBuf.TYPES["int64"]:
        case ProtoBuf.TYPES["sint64"]:
        case ProtoBuf.TYPES["sfixed64"]:
        case ProtoBuf.TYPES["uint64"]:
        case ProtoBuf.TYPES["fixed64"]:
              // Long-based fields support conversions from string already.
              return this.verifyValue(str);

        case ProtoBuf.TYPES["bool"]:
              return str === "true";

        case ProtoBuf.TYPES["string"]:
              return this.verifyValue(str);

        case ProtoBuf.TYPES["bytes"]:
              return ByteBuffer.fromBinary(str);
    }
};

/**
 * Converts a value from the canonical element type to a string.
 *
 * It should be the case that `valueFromString(valueToString(val))` returns
 * a value equivalent to `verifyValue(val)` for every legal value of `val`
 * according to this element type.
 *
 * This may be used when the element must be stored or used as a string,
 * e.g., as a map key on an Object.
 *
 * Legal only when isMapKey is true.
 *
 * @param {*} val The value
 * @returns {string} The string form of the value.
 */
ElementPrototype.valueToString = function(value) {
    if (!this.isMapKey) {
        throw Error("valueToString() called on non-map-key element");
    }

    if (this.type === ProtoBuf.TYPES["bytes"]) {
        return value.toString("binary");
    } else {
        return value.toString();
    }
};
