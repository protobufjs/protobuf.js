/**
 * Constructs a new Message.
 * @exports ProtoBuf.Reflect.Message
 * @param {!ProtoBuf.Builder} builder Builder reference
 * @param {!ProtoBuf.Reflect.Namespace} parent Parent message or namespace
 * @param {string} name Message name
 * @param {Object.<string,*>=} options Message options
 * @param {boolean=} isGroup `true` if this is a legacy group
 * @param {string?} syntax The syntax level of this definition (e.g., proto3)
 * @constructor
 * @extends ProtoBuf.Reflect.Namespace
 */
var Message = function(builder, parent, name, options, isGroup, syntax) {
    Namespace.call(this, builder, parent, name, options, syntax);

    /**
     * @override
     */
    this.className = "Message";

    /**
     * Extensions range.
     * @type {!Array.<number>}
     * @expose
     */
    this.extensions = [ProtoBuf.ID_MIN, ProtoBuf.ID_MAX];

    /**
     * Runtime message class.
     * @type {?function(new:ProtoBuf.Builder.Message)}
     * @expose
     */
    this.clazz = null;

    /**
     * Whether this is a legacy group or not.
     * @type {boolean}
     * @expose
     */
    this.isGroup = !!isGroup;

    // The following cached collections are used to efficiently iterate over or look up fields when decoding.

    /**
     * Cached fields.
     * @type {?Array.<!ProtoBuf.Reflect.Message.Field>}
     * @private
     */
    this._fields = null;

    /**
     * Cached fields by id.
     * @type {?Object.<number,!ProtoBuf.Reflect.Message.Field>}
     * @private
     */
    this._fieldsById = null;

    /**
     * Cached fields by name.
     * @type {?Object.<string,!ProtoBuf.Reflect.Message.Field>}
     * @private
     */
    this._fieldsByName = null;
};

/**
 * @alias ProtoBuf.Reflect.Message.prototype
 * @inner
 */
var MessagePrototype = Message.prototype = Object.create(Namespace.prototype);

/**
 * Builds the message and returns the runtime counterpart, which is a fully functional class.
 * @see ProtoBuf.Builder.Message
 * @param {boolean=} rebuild Whether to rebuild or not, defaults to false
 * @return {ProtoBuf.Reflect.Message} Message class
 * @throws {Error} If the message cannot be built
 * @expose
 */
MessagePrototype.build = function(rebuild) {
    if (this.clazz && !rebuild)
        return this.clazz;

    // Create the runtime Message class in its own scope
    var clazz = (function(ProtoBuf, T) {

        //? include("../Builder/Message.js");

        return Message;

    })(ProtoBuf, this);

    // Static enums and prototyped sub-messages / cached collections
    this._fields = [];
    this._fieldsById = {};
    this._fieldsByName = {};
    for (var i=0, k=this.children.length, child; i<k; i++) {
        child = this.children[i];
        if (child instanceof Enum || child instanceof Message || child instanceof Service) {
            if (clazz.hasOwnProperty(child.name))
                throw Error("Illegal reflect child of "+this.toString(true)+": "+child.toString(true)+" cannot override static property '"+child.name+"'");
            clazz[child.name] = child.build();
        } else if (child instanceof Message.Field)
            child.build(),
            this._fields.push(child),
            this._fieldsById[child.id] = child,
            this._fieldsByName[child.name] = child;
        else if (!(child instanceof Message.OneOf) && !(child instanceof Extension)) // Not built
            throw Error("Illegal reflect child of "+this.toString(true)+": "+this.children[i].toString(true));
    }

    return this.clazz = clazz;
};

/**
 * Encodes a runtime message's contents to the specified buffer.
 * @param {!ProtoBuf.Builder.Message} message Runtime message to encode
 * @param {ByteBuffer} buffer ByteBuffer to write to
 * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
 * @return {ByteBuffer} The ByteBuffer for chaining
 * @throws {Error} If required fields are missing or the message cannot be encoded for another reason
 * @expose
 */
MessagePrototype.encode = function(message, buffer, noVerify) {
    var fieldMissing = null,
        field;
    for (var i=0, k=this._fields.length, val; i<k; ++i) {
        field = this._fields[i];
        val = message[field.name];
        if (field.required && val === null) {
            if (fieldMissing === null)
                fieldMissing = field;
        } else
            field.encode(noVerify ? val : field.verifyValue(val), buffer);
    }
    if (fieldMissing !== null) {
        var err = Error("Missing at least one required field for "+this.toString(true)+": "+fieldMissing);
        err["encoded"] = buffer; // Still expose what we got
        throw(err);
    }
    return buffer;
};

/**
 * Calculates a runtime message's byte length.
 * @param {!ProtoBuf.Builder.Message} message Runtime message to encode
 * @returns {number} Byte length
 * @throws {Error} If required fields are missing or the message cannot be calculated for another reason
 * @expose
 */
MessagePrototype.calculate = function(message) {
    for (var n=0, i=0, k=this._fields.length, field, val; i<k; ++i) {
        field = this._fields[i];
        val = message[field.name];
        if (field.required && val === null)
           throw Error("Missing at least one required field for "+this.toString(true)+": "+field);
        else
            n += field.calculate(val);
    }
    return n;
};

/**
 * Skips all data until the end of the specified group has been reached.
 * @param {number} expectedId Expected GROUPEND id
 * @param {!ByteBuffer} buf ByteBuffer
 * @returns {boolean} `true` if a value as been skipped, `false` if the end has been reached
 * @throws {Error} If it wasn't possible to find the end of the group (buffer overrun or end tag mismatch)
 * @inner
 */
function skipTillGroupEnd(expectedId, buf) {
    var tag = buf.readVarint32(), // Throws on OOB
        wireType = tag & 0x07,
        id = tag >>> 3;
    switch (wireType) {
        case ProtoBuf.WIRE_TYPES.VARINT:
            do tag = buf.readUint8();
            while ((tag & 0x80) === 0x80);
            break;
        case ProtoBuf.WIRE_TYPES.BITS64:
            buf.offset += 8;
            break;
        case ProtoBuf.WIRE_TYPES.LDELIM:
            tag = buf.readVarint32(); // reads the varint
            buf.offset += tag;        // skips n bytes
            break;
        case ProtoBuf.WIRE_TYPES.STARTGROUP:
            skipTillGroupEnd(id, buf);
            break;
        case ProtoBuf.WIRE_TYPES.ENDGROUP:
            if (id === expectedId)
                return false;
            else
                throw Error("Illegal GROUPEND after unknown group: "+id+" ("+expectedId+" expected)");
        case ProtoBuf.WIRE_TYPES.BITS32:
            buf.offset += 4;
            break;
        default:
            throw Error("Illegal wire type in unknown group "+expectedId+": "+wireType);
    }
    return true;
}

/**
 * Decodes an encoded message and returns the decoded message.
 * @param {ByteBuffer} buffer ByteBuffer to decode from
 * @param {number=} length Message length. Defaults to decode all the available data.
 * @param {number=} expectedGroupEndId Expected GROUPEND id if this is a legacy group
 * @return {ProtoBuf.Builder.Message} Decoded message
 * @throws {Error} If the message cannot be decoded
 * @expose
 */
MessagePrototype.decode = function(buffer, length, expectedGroupEndId) {
    length = typeof length === 'number' ? length : -1;
    var start = buffer.offset,
        msg = new (this.clazz)(),
        tag, wireType, id, field;
    while (buffer.offset < start+length || (length === -1 && buffer.remaining() > 0)) {
        tag = buffer.readVarint32();
        wireType = tag & 0x07;
        id = tag >>> 3;
        if (wireType === ProtoBuf.WIRE_TYPES.ENDGROUP) {
            if (id !== expectedGroupEndId)
                throw Error("Illegal group end indicator for "+this.toString(true)+": "+id+" ("+(expectedGroupEndId ? expectedGroupEndId+" expected" : "not a group")+")");
            break;
        }
        if (!(field = this._fieldsById[id])) {
            // "messages created by your new code can be parsed by your old code: old binaries simply ignore the new field when parsing."
            switch (wireType) {
                case ProtoBuf.WIRE_TYPES.VARINT:
                    buffer.readVarint32();
                    break;
                case ProtoBuf.WIRE_TYPES.BITS32:
                    buffer.offset += 4;
                    break;
                case ProtoBuf.WIRE_TYPES.BITS64:
                    buffer.offset += 8;
                    break;
                case ProtoBuf.WIRE_TYPES.LDELIM:
                    var len = buffer.readVarint32();
                    buffer.offset += len;
                    break;
                case ProtoBuf.WIRE_TYPES.STARTGROUP:
                    while (skipTillGroupEnd(id, buffer)) {}
                    break;
                default:
                    throw Error("Illegal wire type for unknown field "+id+" in "+this.toString(true)+"#decode: "+wireType);
            }
            continue;
        }
        if (field.repeated && !field.options["packed"]) {
            msg[field.name].push(field.decode(wireType, buffer));
        } else if (field.map) {
            var keyval = field.decode(wireType, buffer);
            msg[field.name].set(keyval[0], keyval[1]);
        } else {
            msg[field.name] = field.decode(wireType, buffer);
            if (field.oneof) {
                if (this[field.oneof.name] !== null)
                    this[this[field.oneof.name]] = null;
                msg[field.oneof.name] = field.name;
            }
        }
    }

    // Check if all required fields are present and set default values for optional fields that are not
    for (var i=0, k=this._fields.length; i<k; ++i) {
        field = this._fields[i];
        if (msg[field.name] === null)
            if (field.required) {
                var err = Error("Missing at least one required field for "+this.toString(true)+": "+field.name);
                err["decoded"] = msg; // Still expose what we got
                throw(err);
            } else if (ProtoBuf.populateDefaults && field.defaultValue !== null)
                msg[field.name] = field.defaultValue;
    }
    return msg;
};
