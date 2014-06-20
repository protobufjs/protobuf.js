/**
 * @alias ProtoBuf.Reflect
 * @expose
 */
ProtoBuf.Reflect = (function(ProtoBuf) {
    "use strict";

    /**
     * @exports ProtoBuf.Reflect
     * @namespace
     */
    var Reflect = {};

    /**
     * Constructs a Reflect base class.
     * @exports ProtoBuf.Reflect.T
     * @constructor
     * @abstract
     * @param {ProtoBuf.Reflect.T} parent Parent object
     * @param {string} name Object name
     */
    var T = function(parent, name) {
        
        /**
         * Parent object.
         * @type {ProtoBuf.Reflect.T|null}
         * @expose
         */
        this.parent = parent;

        /**
         * Object name in namespace.
         * @type {string}
         * @expose
         */
        this.name = name;

        /**
         * Fully qualified class name
         * @type {string}
         * @expose
         */
        this.className;
    };

    /**
     * Returns the fully qualified name of this object.
     * @returns {string} Fully qualified name as of ".PATH.TO.THIS"
     * @expose
     */
    T.prototype.fqn = function() {
        var name = this.name,
            ptr = this;
        do {
            ptr = ptr.parent;
            if (ptr == null) break;
            name = ptr.name+"."+name;
        } while (true);
        return name;
    };

    /**
     * Returns a string representation of this Reflect object (its fully qualified name).
     * @param {boolean=} includeClass Set to true to include the class name. Defaults to false.
     * @return String representation
     * @expose
     */
    T.prototype.toString = function(includeClass) {
        var pfx = includeClass
            ? this.className + " "
            : "";
        return pfx + this.fqn();
    };

    /**
     * Builds this type.
     * @throws {Error} If this type cannot be built directly
     * @expose
     */
    T.prototype.build = function() {
        throw(new Error(this.toString(true)+" cannot be built directly"));
    };

    /**
     * @alias ProtoBuf.Reflect.T
     * @expose
     */
    Reflect.T = T;

    /**
     * Constructs a new Namespace.
     * @exports ProtoBuf.Reflect.Namespace
     * @param {ProtoBuf.Reflect.Namespace|null} parent Namespace parent
     * @param {string} name Namespace name
     * @param {Object.<string,*>} options Namespace options
     * @constructor
     * @extends ProtoBuf.Reflect.T
     */
    var Namespace = function(parent, name, options) {
        T.call(this, parent, name);

        /**
         * @override
         */
        this.className = "Namespace";

        /**
         * Children inside the namespace.
         * @type {Array.<ProtoBuf.Reflect.T>}
         */
        this.children = [];

        /**
         * Options.
         * @type {Object.<string, *>}
         */
        this.options = options || {};
    };

    // Extends T
    Namespace.prototype = Object.create(T.prototype);

    /**
     * Returns an array of the namespace's children.
     * @param {ProtoBuf.Reflect.T=} type Filter type (returns instances of this type only). Defaults to null (all children).
     * @return {Array.<ProtoBuf.Reflect.T>}
     * @expose
     */
    Namespace.prototype.getChildren = function(type) {
        type = type || null;
        if (type == null) {
            return this.children.slice();
        }
        var children = [];
        for (var i=0; i<this.children.length; i++) {
            if (this.children[i] instanceof type) {
                children.push(this.children[i]);
            }
        }
        return children;
    };

    /**
     * Adds a child to the namespace.
     * @param {ProtoBuf.Reflect.T} child Child
     * @throws {Error} If the child cannot be added (duplicate)
     * @expose
     */
    Namespace.prototype.addChild = function(child) {
        var other;
        if (other = this.getChild(child.name)) {
            // Try to revert camelcase transformation on collision
            if (other instanceof Message.Field && other.name !== other.originalName && !this.hasChild(other.originalName)) {
                other.name = other.originalName; // Revert previous first (effectively keeps both originals)
            } else if (child instanceof Message.Field && child.name !== child.originalName && !this.hasChild(child.originalName)) {
                child.name = child.originalName;
            } else {
                throw(new Error("Duplicate name in namespace "+this.toString(true)+": "+child.name));
            }
        }
        this.children.push(child);
    };

    /**
     * Tests if this namespace has a child with the specified name.
     * @param {string|number} nameOrId Child name or id
     * @returns {boolean} true if there is one, else false
     * @expose
     */
    Namespace.prototype.hasChild = function(nameOrId) {
        return this._indexOf(nameOrId) > -1;
    };

    /**
     * Gets a child by its name.
     * @param {string|number} nameOrId Child name or id
     * @return {?ProtoBuf.Reflect.T} The child or null if not found
     * @expose
     */
    Namespace.prototype.getChild = function(nameOrId) {
        var index = this._indexOf(nameOrId);
        return index > -1 ? this.children[index] : null;
    };

    /**
     * Returns child index by its name or id.
     * @param {string|number} nameOrId Child name or id
     * @return {Number} The child index
     * @private
     */
    Namespace.prototype._indexOf = function(nameOrId) {
        var key = (typeof nameOrId == 'number')
            ? 'id'
            : 'name';
        for (var i=0; i<this.children.length; i++)
            if (typeof this.children[i][key] !== 'undefined' && this.children[i][key] == nameOrId)
                return i;
        return -1;
    };

    /**
     * Resolves a reflect object inside of this namespace.
     * @param {string} qn Qualified name to resolve
     * @param {boolean=} excludeFields Excludes fields, defaults to `false`
     * @return {ProtoBuf.Reflect.Namespace|null} The resolved type or null if not found
     * @expose
     */
    Namespace.prototype.resolve = function(qn, excludeFields) {
        var part = qn.split(".");
        var ptr = this, i=0;
        if (part[i] == "") { // Fully qualified name, e.g. ".My.Message'
            while (ptr.parent != null) {
                ptr = ptr.parent;
            }
            i++;
        }
        var child;
        do {
            do {
                child = ptr.getChild(part[i]);
                if (!child || !(child instanceof Reflect.T) || (excludeFields && child instanceof Reflect.Message.Field)) {
                    ptr = null;
                    break;
                }
                ptr = child; i++;
            } while (i < part.length);
            if (ptr != null) break; // Found
            // Else search the parent
            if (this.parent !== null) {
                return this.parent.resolve(qn, excludeFields);
            }
        } while (ptr != null);
        return ptr;
    };

    /**
     * Builds the namespace and returns the runtime counterpart.
     * @return {Object.<string,Function|Object>} Runtime namespace
     * @expose
     */
    Namespace.prototype.build = function() {
        /** @dict */
        var ns = {};
        var children = this.getChildren(), child;
        for (var i=0; i<children.length; i++) {
            child = children[i];
            if (child instanceof Namespace) {
                ns[child.name] = child.build();
            }
        }
        if (Object.defineProperty) {
            Object.defineProperty(ns, "$options", {
                "value": this.buildOpt(),
                "enumerable": false,
                "configurable": false,
                "writable": false
            });
        }
        return ns;
    };

    /**
     * Builds the namespace's '$options' property.
     * @return {Object.<string,*>}
     */
    Namespace.prototype.buildOpt = function() {
        var opt = {};
        var keys = Object.keys(this.options);
        for (var i=0; i<keys.length; i++) {
            var key = keys[i],
                val = this.options[keys[i]];
            // TODO: Options are not resolved, yet.
            // if (val instanceof Namespace) {
            //     opt[key] = val.build();
            // } else {
                opt[key] = val;
            // }
        }
        return opt;
    };

    /**
     * Gets the value assigned to the option with the specified name.
     * @param {string=} name Returns the option value if specified, otherwise all options are returned.
     * @return {*|Object.<string,*>}null} Option value or NULL if there is no such option
     */
    Namespace.prototype.getOption = function(name) {
        if (typeof name == 'undefined') {
            return this.options;
        }
        return typeof this.options[name] != 'undefined' ? this.options[name] : null;
    };

    /**
     * @alias ProtoBuf.Reflect.Namespace
     * @expose
     */
    Reflect.Namespace = Namespace;

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
        this.extensions = [ProtoBuf.Lang.ID_MIN, ProtoBuf.Lang.ID_MAX];

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
            var fields = T.getChildren(Reflect.Message.Field);

            //? include("Builder/Message.js");

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

    /**
     * @alias ProtoBuf.Reflect.Message
     * @expose
     */
    Reflect.Message = Message;

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
        if (this.type == null || typeof this.type != 'object') {
            throw(new Error("[INTERNAL] Unresolved type in "+this.toString(true)+": "+this.type));
        }
        if (value === null || (this.repeated && value.length == 0)) return buffer; // Optional omitted
        try {
            if (this.repeated) {
                var i;
                if (this.options["packed"]) {
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

    /**
     * @alias ProtoBuf.Reflect.Message.Field
     * @expose
     */
    Reflect.Message.Field = Field;

    /**
     * Constructs a new Enum.
     * @exports ProtoBuf.Reflect.Enum
     * @param {!ProtoBuf.Reflect.T} parent Parent Reflect object
     * @param {string} name Enum name
     * @param {Object.<string.*>=} options Enum options
     * @constructor
     * @extends ProtoBuf.Reflect.Namespace
     */
    var Enum = function(parent, name, options) {
        Namespace.call(this, parent, name, options);

        /**
         * @override
         */
        this.className = "Enum";

        /**
         * Runtime enum object.
         * @type {Object.<string,number>|null}
         * @expose
         */
        this.object = null;
    };

    // Extends Namespace
    Enum.prototype = Object.create(Namespace.prototype);

    /**
     * Builds this enum and returns the runtime counterpart.
     * @return {Object<string,*>}
     * @expose
     */
    Enum.prototype.build = function() {
        var enm = {};
        var values = this.getChildren(Enum.Value);
        for (var i=0; i<values.length; i++) {
            enm[values[i]['name']] = values[i]['id'];
        }
        if (Object.defineProperty) {
            Object.defineProperty(enm, '$options', {
                'value': this.buildOpt(),
                'enumerable': false,
                'configurable': false,
                'writable': false
            });
        }
        return this.object = enm;
    };

    /**
     * @alias ProtoBuf.Reflect.Enum
     * @expose
     */
    Reflect.Enum = Enum;

    /**
     * Constructs a new Enum Value.
     * @exports ProtoBuf.Reflect.Enum.Value
     * @param {!ProtoBuf.Reflect.Enum} enm Enum reference
     * @param {string} name Field name
     * @param {number} id Unique field id
     * @constructor
     * @extends ProtoBuf.Reflect.T
     */
    var Value = function(enm, name, id) {
        T.call(this, enm, name);

        /**
         * @override
         */
        this.className = "Enum.Value";

        /**
         * Unique enum value id.
         * @type {number}
         * @expose
         */
        this.id = id;
    };

    // Extends T
    Value.prototype = Object.create(T.prototype);

    /**
     * @alias ProtoBuf.Reflect.Enum.Value
     * @expose
     */
    Reflect.Enum.Value = Value;

    /**
     * Constructs a new Service.
     * @exports ProtoBuf.Reflect.Service
     * @param {!ProtoBuf.Reflect.Namespace} root Root
     * @param {string} name Service name
     * @param {Object.<string,*>=} options Options
     * @constructor
     * @extends ProtoBuf.Reflect.Namespace
     */
    var Service = function(root, name, options) {
        Namespace.call(this, root, name, options);

        /**
         * @override
         */
        this.className = "Service";

        /**
         * Built runtime service class.
         * @type {?function(new:ProtoBuf.Builder.Service)}
         */
        this.clazz = null;
    };

    // Extends Namespace
    Service.prototype = Object.create(Namespace.prototype);

    /**
     * Builds the service and returns the runtime counterpart, which is a fully functional class.
     * @see ProtoBuf.Builder.Service
     * @param {boolean=} rebuild Whether to rebuild or not
     * @return {Function} Service class
     * @throws {Error} If the message cannot be built
     * @expose
     */
    Service.prototype.build = function(rebuild) {
        if (this.clazz && !rebuild) return this.clazz;
        return this.clazz = (function(ProtoBuf, T) {
            
            //? include("Builder/Service.js");

            return Service;

        })(ProtoBuf, this);
    };

    Reflect.Service = Service;

    /**
     * Abstract service method.
     * @exports ProtoBuf.Reflect.Service.Method
     * @param {!ProtoBuf.Reflect.Service} svc Service
     * @param {string} name Method name
     * @param {Object.<string,*>=} options Options
     * @constructor
     * @extends ProtoBuf.Reflect.T
     */
    var Method = function(svc, name, options) {
        T.call(this, svc, name);
        
        /**
         * @override
         */
        this.className = "Service.Method";

        /**
         * Options.
         * @type {Object.<string, *>}
         * @expose
         */
        this.options = options || {};
    };

    // Extends T
    Method.prototype = Object.create(T.prototype);

    /**
     * Builds the method's '$options' property.
     * @name ProtoBuf.Reflect.Service.Method#buildOpt
     * @function
     * @return {Object.<string,*>}
     */
    Method.prototype.buildOpt = Namespace.prototype.buildOpt;

    /**
     * @alias ProtoBuf.Reflect.Service.Method
     * @expose
     */
    Reflect.Service.Method = Method;

    /**
     * RPC service method.
     * @exports ProtoBuf.Reflect.Service.RPCMethod
     * @param {!ProtoBuf.Reflect.Service} svc Service
     * @param {string} name Method name
     * @param {string} request Request message name
     * @param {string} response Response message name
     * @param {Object.<string,*>=} options Options
     * @constructor
     * @extends ProtoBuf.Reflect.Service.Method
     */
    var RPCMethod = function(svc, name, request, response, options) {
        Method.call(this, svc, name, options);
        
        /**
         * @override
         */
        this.className = "Service.RPCMethod";

        /**
         * Request message name.
         * @type {string}
         * @expose
         */
        this.requestName = request;

        /**
         * Response message name.
         * @type {string}
         * @expose
         */
        this.responseName = response;

        /**
         * Resolved request message type.
         * @type {ProtoBuf.Reflect.Message}
         * @expose
         */
        this.resolvedRequestType = null;

        /**
         * Resolved response message type.
         * @type {ProtoBuf.Reflect.Message}
         * @expose
         */
        this.resolvedResponseType = null;
    };

    // Extends Method
    RPCMethod.prototype = Object.create(Method.prototype);

    /**
     * @alias ProtoBuf.Reflect.Service.RPCMethod
     * @expose
     */
    Reflect.Service.RPCMethod = RPCMethod;

    return Reflect;
})(ProtoBuf);
