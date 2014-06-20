/**
 * Constructs a new Message.
 * @exports ProtoBuf.Reflect.Message
 * @param {ProtoBuf.Reflect.Namespace} parent Parent message or namespace
 * @param {string} name Message name
 * @param {Object.<string,*>} options Message options
 * @param {boolean=} isGroup `true` if this is a legacy group
 * @constructor
 * @extends ProtoBuf.Reflect.Namespace
 */
var Message = function(parent, name, options, isGroup) {
    Namespace.call(this, parent, name, options);

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
};

// Extends Namespace
Message.prototype = Object.create(Namespace.prototype);

/**
 * Builds the message and returns the runtime counterpart, which is a fully functional class.
 * @see ProtoBuf.Builder.Message
 * @param {boolean=} rebuild Whether to rebuild or not, defaults to false
 * @return {ProtoBuf.Reflect.Message} Message class
 * @throws {Error} If the message cannot be built
 * @expose
 */
Message.prototype.build = function(rebuild) {
    if (this.clazz && !rebuild) return this.clazz;

    // We need to create a prototyped Message class in an isolated scope
    var clazz = (function(ProtoBuf, T) {

        //? include("../Builder/Message.js");

        return Message;

    })(ProtoBuf, this);

    // Static enums and prototyped sub-messages
    var children = this.getChildren();
    for (var i=0; i<children.length; i++) {
        if (children[i] instanceof Enum) {
            clazz[children[i]['name']] = children[i].build();
        } else if (children[i] instanceof Message) {
            clazz[children[i]['name']] = children[i].build();
        } else if (children[i] instanceof Message.Field) {
            // Ignore
        } else {
            throw(new Error("Illegal reflect child of "+this.toString(true)+": "+children[i].toString(true)));
        }
    }
    return this.clazz = clazz;
};

/**
 * Encodes a runtime message's contents to the specified buffer.
 * @param {ProtoBuf.Builder.Message} message Runtime message to encode
 * @param {ByteBuffer} buffer ByteBuffer to write to
 * @return {ByteBuffer} The ByteBuffer for chaining
 * @throws {Error} If required fields are missing or the message cannot be encoded for another reason
 * @expose
 */
Message.prototype.encode = function(message, buffer) {
    var fields = this.getChildren(Message.Field),
        fieldMissing = null;
    for (var i=0; i<fields.length; i++) {
        var val = message.$get(fields[i].name);
        if (fields[i].required && val === null) {
            if (fieldMissing === null) fieldMissing = fields[i];
        } else {
            fields[i].encode(val, buffer);
        }
    }
    if (fieldMissing !== null) {
        var err = new Error("Missing at least one required field for "+this.toString(true)+": "+fieldMissing);
        err["encoded"] = buffer; // Still expose what we got
        throw(err);
    }
    return buffer;
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
        id = tag >> 3;
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
                throw(new Error("Illegal GROUPEND after unknown group: "+id+" ("+expectedId+" expected)"));
        case ProtoBuf.WIRE_TYPES.BITS32:
            buf.offset += 4;
            break;
        default:
            throw(new Error("Illegal wire type in unknown group "+expectedId+": "+wireType));
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
Message.prototype.decode = function(buffer, length, expectedGroupEndId) {
    length = typeof length === 'number' ? length : -1;
    var start = buffer.offset;
    var msg = new (this.clazz)();
    var tag, wireType, id;
    while (buffer.offset < start+length || (length == -1 && buffer.remaining() > 0)) {
        tag = buffer.readVarint32();
        wireType = tag & 0x07;
        id = tag >> 3;
        if (wireType === ProtoBuf.WIRE_TYPES.ENDGROUP) {
            if (id !== expectedGroupEndId)
                throw(new Error("Illegal group end indicator for "+this.toString(true)+": "+id+" ("+(expectedGroupEndId ? expectedGroupEndId+" expected" : "not a group")+")"));
            break;
        }
        var field = this.getChild(id); // Message.Field only
        if (!field) {
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
                    throw(new Error("Illegal wire type for unknown field "+id+" in "+this.toString(true)+"#decode: "+wireType));
            }
            continue;
        }
        if (field.repeated && !field.options["packed"]) {
            msg.$add(field.name, field.decode(wireType, buffer), true);
        } else {
            msg.$set(field.name, field.decode(wireType, buffer), true);
        }
    }

    // Check if all required fields are present
    var fields = this.getChildren(ProtoBuf.Reflect.Field);
    for (var i=0; i<fields.length; i++) {
        if (fields[i].required && msg[fields[i].name] === null) {
            var err = new Error("Missing at least one required field for "+this.toString(true)+": "+fields[i].name);
            err["decoded"] = msg; // Still expose what we got
            throw(err);
        }
    }
    return msg;
};
