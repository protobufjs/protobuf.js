// #ifdef UNDEFINED
/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
// #endif
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
    };

    /**
     * Returns a string representation of this Reflect object (its fully qualified name).
     * @param {boolean=} includeClass Set to true to include the class name. Defaults to false.
     * @return String representation
     * @expose
     */
    T.prototype.toString = function(includeClass) {
        var name = this.name;
        var ptr = this;
        do {
            ptr = ptr.parent;
            if (ptr == null) break;
            name = ptr.name+"."+name;
        } while (true);
        if (includeClass) {
            if (this instanceof Reflect.Message) {
                name = "Message "+name;
            } else if (this instanceof Message.Field) {
                name = "Message.Field "+name;
            } else if (this instanceof Enum) {
                name = "Enum "+name;
            } else if (this instanceof Enum.Value) {
                name = "Enum.Value "+name;
            } else if (this instanceof Namespace) {
                name = "Namespace "+name;
            }
        }
        return name;
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
        if (this.hasChild(child.name)) {
            throw(new Error("Duplicate name in namespace "+this.toString(true)+": "+child.name));
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
        var i;
        if (typeof nameOrId == 'number') {
            for (i=0; i<this.children.length; i++) if (this.children[i] instanceof Message.Field && this.children[i].id == nameOrId) return true;
        } else {
            for (i=0; i<this.children.length; i++) if (this.children[i].name == nameOrId) return true;
        }
        return false;
    };

    /**
     * Gets a child by its name.
     * @param {string|number} nameOrId Child name or id
     * @return {?ProtoBuf.Reflect.T} The child or null if not found
     * @expose
     */
    Namespace.prototype.getChild = function(nameOrId) {
        var i;
        if (typeof nameOrId == 'number') {
            for (i=0; i<this.children.length; i++) if (this.children[i] instanceof Message.Field && this.children[i].id == nameOrId) return this.children[i];
        } else {
            for (i=0; i<this.children.length; i++) if (this.children[i].name == nameOrId) return this.children[i];
        }
        return null;
    };

    /**
     * Resolves a reflect object inside of this namespace.
     * @param {string} qn Qualified name to resolve
     * @return {ProtoBuf.Reflect.Namespace|null} The resolved type or null if not found
     * @expose
     */
    Namespace.prototype.resolve = function(qn) {
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
                if (!child || !(child instanceof Reflect.T)) {
                    ptr = null;
                    break;
                }
                ptr = child; i++;
            } while (i < part.length);
            if (ptr != null) break; // Found
            // Else search the parent
            if (this.parent !== null) {
                return this.parent.resolve(qn);
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
     * Builds the namespace's 'opt' property.
     * @return {Object.<string,*>}
     */
    Namespace.prototype.buildOpt = function() {
        var opt = {};
        var keys = Object.keys(this.options);
        for (var i=0; i<keys.length; i++) {
            var key = keys[i];
            var val = this.options[keys[i]];
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
     * @constructor
     * @extends ProtoBuf.Reflect.Namespace
     */
    var Message = function(parent, name, options) {
        Namespace.call(this, parent, name, options);

        /**
         * Runtime message class.
         * @type {ProtoBuf.Builder.Message|null}
         * @expose
         */
        this.clazz = null;
    };

    // Extends Namespace
    Message.prototype = Object.create(Namespace.prototype);

    /**
     * Builds the message and returns the runtime counterpart, which is a fully functional class.
     * @see ProtoBuf.Builder.Message
     * @return {ProtoBuf.Reflect.Message} Message class
     * @throws {Error} If the message cannot be built
     * @expose
     */
    Message.prototype.build = function() {
        // We need to create a prototyped Message class in an isolated scope
        var clazz = (function(Reflect, T) {
            var fields = T.getChildren(Reflect.Message.Field);

            /**
             * Constructs a new runtime Message.
             * @name ProtoBuf.Builder.Message
             * @class Barebone of all runtime messages.
             * @param {Object.<string,*>} values Preset values
             * @constructor
             * @throws {Error} If the message cannot be created
             */

            /**
             * @type {!Function}
             */
            var Message = eval("0, (function "+T.name+"() { ProtoBuf.Builder.Message.call(this); this.__construct.apply(this, arguments); })");
            // Any better way to create a named function? This is so much nicer for debugging with util.inspect()
            
            // Extends ProtoBuf.Builder.Message
            Message.prototype = Object.create(ProtoBuf.Builder.Message.prototype);
            
            /**
             * @expose
             */
            Message.prototype.__construct = function(values) {                
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
                            this.set(field.name, field.options['default']); // Should not throw
                        } catch (e) {
                            throw(new Error("[INTERNAL ERROR] "+e));
                        }
                    }
                }
                // Set field values from a values object
                if (arguments.length == 1 && typeof values == 'object' &&
                    /* not another Message */ typeof values.encode != 'function' &&
                    /* not a repeated field */ !(values instanceof Array) &&
                    /* not a ByteBuffer */ !(values instanceof ByteBuffer) &&
                    /* not an ArrayBuffer */ !(values instanceof ArrayBuffer) &&
                    /* not a Long */ !(ProtoBuf.Long && values instanceof ProtoBuf.Long)) {
                    var keys = Object.keys(values);
                    for (i=0; i<keys.length; i++) {
                        this.set(keys[i], values[keys[i]]); // May throw
                    }
                    // Else set field values from arguments, in correct order
                } else {
                    for (i=0; i<arguments.length; i++) {
                        if (i<fields.length) {
                            this.set(fields[i].name, arguments[i]); // May throw
                        }
                    }
                }
            };

            /**
             * Adds a value to a repeated field.
             * @name ProtoBuf.Builder.Message#add
             * @function
             * @param {string} key Field name
             * @param {*} value Value to add
             * @throws {Error} If the value cannot be added
             * @expose
             */
            Message.prototype.add = function(key, value) {
                var field = T.getChild(key);
                if (!field) {
                    throw(new Error(this+"#"+key+" is undefined"));
                }
                if (!(field instanceof Reflect.Message.Field)) {
                    throw(new Error(this+"#"+key+" is not a field: "+field.toString(true))); // May throw if it's an enum or embedded message
                }
                if (!field.repeated) {
                    throw(new Error(this+"#"+key+" is not a repeated field"));
                }
                if (this[field.name] === null) this[field.name] = [];
                this[field.name].push(field.verifyValue(value, true));
            };

            /**
             * Sets a field value.
             * @name ProtoBuf.Builder.Message#set
             * @function
             * @param {string} key Key
             * @param {*} value Value to set
             * @throws {Error} If the value cannot be set
             * @expose
             */
            Message.prototype.set = function(key, value) {
                var field = T.getChild(key);
                if (!field) {
                    throw(new Error(this+"#"+key+" is not a field: undefined"));
                }
                if (!(field instanceof Reflect.Message.Field)) {
                    throw(new Error(this+"#"+key+" is not a field: "+field.toString(true)));
                }
                this[field.name] = field.verifyValue(value); // May throw
            };

            /**
             * Gets a value.
             * @name ProtoBuf.Builder.Message#get
             * @function
             * @param {string} key Key
             * @return {*} Value
             * @throws {Error} If there is no such field
             * @expose
             */
            Message.prototype.get = function(key) {
                var field = T.getChild(key);
                if (!field || !(field instanceof Reflect.Message.Field)) {
                    throw(new Error(this+"#"+key+" is not a field: undefined"));
                }
                if (!(field instanceof Reflect.Message.Field)) {
                    throw(new Error(this+"#"+key+" is not a field: "+field.toString(true)));
                }
                return this[field.name];
            };

            // Getters and setters

            for (var i=0; i<fields.length; i++) {
                var field = fields[i];
                
                (function(field) {
                    // set/get[SomeValue]
                    var Name = field.name.replace(/(_[a-zA-Z])/g,
                        function(match) {
                            return match.toUpperCase().replace('_','');
                        }
                    );
                    Name = Name.substring(0,1).toUpperCase()+Name.substring(1);
    
                    // set/get_[some_value]
                    var name = field.name.replace(/([A-Z])/g,
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
                            this.set(field.name, value);
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
                            this.set(field.name, value);
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
                            return this.get(field.name); // Does not throw, field exists
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
                            return this.get(field.name); // Does not throw, field exists
                        };
                    }
                    
                })(field);
            }

            // En-/decoding

            /**
             * Encodes the message.
             * @name ProtoBuf.Builder.Message#encode
             * @function
             * @param {ByteBuffer=} buffer ByteBuffer to encode to. Will create a new one if omitted.
             * @return {ByteBuffer} Encoded message
             * @throws {Error} If the message cannot be encoded
             * @expose
             */
            Message.prototype.encode = function(buffer) {
                buffer = buffer || new ByteBuffer();
                var le = buffer.littleEndian;
                var bb = T.encode(this, buffer.LE()).flip();
                buffer.littleEndian = le;
                return bb;
            };

            /**
             * Directly encodes the message to an ArrayBuffer.
             * @name ProtoBuf.Builder.Message#toArrayBuffer
             * @function
             * @return {ArrayBuffer} Encoded message as ArrayBuffer
             * @throws {Error} If the message cannot be encoded
             * @expose
             */
            Message.prototype.toArrayBuffer = function() {
                return this.encode().toArrayBuffer();
            };

            /**
             * Directly encodes the message to a node Buffer.
             * @name ProtoBuf.Builder.Message#toBuffer
             * @function
             * @return {!Buffer}
             * @throws {Error} If the message cannot be encoded or not running under node.js
             * @expose
             */
            Message.prototype.toBuffer = function() {
                return this.encode().toBuffer();
            };

            /**
             * Decodes the message from the specified ByteBuffer.
             * @name ProtoBuf.Builder.Message.decode
             * @function
             * @param {!ByteBuffer|!ArrayBuffer|!Buffer} buffer ByteBuffer to decode from
             * @return {!ProtoBuf.Builder.Message} Decoded message
             * @throws {Error} If the message cannot be decoded
             * @expose
             */
            Message.decode = function(buffer) {
                buffer = buffer ? (buffer instanceof ByteBuffer ? buffer : ByteBuffer.wrap(buffer)) : new ByteBuffer();
                var le = buffer.littleEndian;
                var msg = T.decode(buffer.LE());
                buffer.littleEndian = le;
                return msg;
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
            var O_o; // for cc
            
            if (Object.defineProperty) {
                Object.defineProperty(Message, '$options', {
                    'value': T.buildOpt(),
                    'enumerable': false,
                    'configurable': false,
                    'writable': false
                });
            }
            
            return Message;

        })(Reflect, this);

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
     * @throws {string} If the message cannot be encoded
     * @expose
     */
    Message.prototype.encode = function(message, buffer) {
        var fields = this.getChildren(Message.Field);
        for (var i=0; i<fields.length; i++) {
            fields[i].encode(message.get(fields[i].name), buffer);
        }
        return buffer;
    };

    /**
     * Decodes an encoded message and returns the decoded message.
     * @param {ByteBuffer} buffer ByteBuffer to decode from
     * @param {number=} length Message length. Defaults to decode all the available data.
     * @return {ProtoBuf.Builder.Message} Decoded message
     * @throws {Error} If the message cannot be decoded
     * @expose
     */
    Message.prototype.decode = function(buffer, length) {
        length = typeof length === 'number' ? length : -1;
        var start = buffer.offset;
        var msg = new (this.clazz)();
        while (buffer.offset < start+length || (length == -1 && buffer.remaining() > 0)) {
            var tag = buffer.readVarint32();
            var wireType = tag & 0x07,
                id = tag >> 3;
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
                    default:
                        throw(new Error("Illegal wire type of unknown field "+id+" in "+this.toString(true)+"#decode: "+wireType));
                }
                continue;
            }
            if (field.repeated && !field.options["packed"]) {
                msg.add(field.name, field.decode(wireType, buffer));
            } else {
                msg.set(field.name, field.decode(wireType, buffer));
            }
        }
        // Check if all required fields are present
        var fields = this.getChildren(Reflect.Field);
        for (var i=0; i<fields.length; i++) {
            if (fields[i].required && msg[fields[i].name] === null) {
                var err = new Error("Missing field "+fields[i].toString(true)+" in "+this.toString(true)+"#decode");
                err.msg = msg;
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
         * @type {string|{name: string, wireType: number}
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
    };

    // Extends T
    Field.prototype = Object.create(T.prototype);

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
            if (!(value instanceof Array)) {
                value = [value];
            }
            var res = [];
            for (i=0; i<value.length; i++) {
                res.push(this.verifyValue(value[i], true));
            }
            return res;
        }
        // All non-repeated fields expect no array
        if (!this.repeated && value instanceof Array) {
            throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (no array expected)"));
        }
        // Signed 32bit
        if (this.type == ProtoBuf.TYPES["int32"] || this.type == ProtoBuf.TYPES["sint32"] || this.type == ProtoBuf.TYPES["sfixed32"]) {
            return parseInt(value, 10) | 0;
        }
        // Unsigned 32bit
        if (this.type == ProtoBuf.TYPES["uint32"] || this.type == ProtoBuf.TYPES["fixed32"]) {
            return parseInt(value, 10) >>> 0;
        }
        if (ProtoBuf.Long) {
            // Signed 64bit
            if (this.type == ProtoBuf.TYPES["int64"] || this.type == ProtoBuf.TYPES["sint64"] || this.type == ProtoBuf.TYPES["sfixed64"]) {
                if (!(typeof value == 'object' && value instanceof ProtoBuf.Long)) {
                    return ProtoBuf.Long.fromNumber(value, false);
                }
                return value.unsigned ? value.toSigned() : value;
            }
            // Unsigned 64bit
            if (this.type == ProtoBuf.TYPES["uint64"] || this.type == ProtoBuf.TYPES["fixed64"]) {
                if (!(typeof value == 'object' && value instanceof ProtoBuf.Long)) {
                    return ProtoBuf.Long.fromNumber(value, true);
                }
                return value.unsigned ? value : value.toUnsigned();
            }
        }
        // Bool
        if (this.type == ProtoBuf.TYPES["bool"]) {
            return !!value;
        }
        // 64bit float
        if (this.type == ProtoBuf.TYPES["float"] || this.type == ProtoBuf.TYPES["double"]) {
            return parseFloat(value);
        }
        // Length-delimited string
        if (this.type == ProtoBuf.TYPES["string"]) {
            return ""+value;
        }
        // Length-delimited bytes
        if (this.type == ProtoBuf.TYPES["bytes"]) {
            if (typeof value == 'object' && value instanceof ByteBuffer) {
                return value;
            }
            return ByteBuffer.wrap(value);
        }
        // Constant enum value
        if (this.type == ProtoBuf.TYPES["enum"]) {
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
        if (this.type == ProtoBuf.TYPES["message"]) {
            if (typeof value != 'object') {
                throw(new Error("Illegal value for "+this.toString(true)+": "+value+" (object expected)"));
            }
            if (value instanceof this.resolvedType.clazz) {
                return value;
            }
            // Else let's try to construct one from a key-value object
            return new (this.resolvedType.clazz)(value); // May throw for a hundred of reasons
        }
        // We should never end here
        throw(new Error("[INTERNAL ERROR] Illegal value for "+this.toString(true)+": "+value+" (undefined type "+this.type+")"));
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
            throw(new Error("[INTERNAL ERROR] Unresolved type in "+this.toString(true)+": "+this.type));
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
            buffer.littleEndian = le;
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
        
        // 32bit varint as-is
        if (this.type == ProtoBuf.TYPES["int32"] || this.type == ProtoBuf.TYPES["uint32"]) {
            buffer.writeVarint32(value);
            
        // 32bit varint zig-zag
        } else if (this.type == ProtoBuf.TYPES["sint32"]) {
            buffer.writeZigZagVarint32(value);
            
        // Fixed unsigned 32bit
        } else if (this.type == ProtoBuf.TYPES["fixed32"]) {
            buffer.writeUint32(value);
            
        // Fixed signed 32bit
        } else if (this.type == ProtoBuf.TYPES["sfixed32"]) {
            buffer.writeInt32(value);
        
        // 64bit varint as-is
        } else if (this.type == ProtoBuf.TYPES["int64"] || this.type == ProtoBuf.TYPES["uint64"]) {
            buffer.writeVarint64(value); // throws
            
        // 64bit varint zig-zag
        } else if (this.type == ProtoBuf.TYPES["sint64"]) {
            buffer.writeZigZagVarint64(value); // throws
            
        // Fixed unsigned 64bit
        } else if (this.type == ProtoBuf.TYPES["fixed64"]) {
            buffer.writeUint64(value); // throws
            
        // Fixed signed 64bit
        } else if (this.type == ProtoBuf.TYPES["sfixed64"]) {
            buffer.writeInt64(value); // throws
            
        // Bool
        } else if (this.type == ProtoBuf.TYPES["bool"]) {
            buffer.writeVarint32(value ? 1 : 0);
            
        // Constant enum value
        } else if (this.type == ProtoBuf.TYPES["enum"]) {
            buffer.writeVarint32(value);
            
        // 32bit float
        } else if (this.type == ProtoBuf.TYPES["float"]) {
            buffer.writeFloat32(value);
            
        // 64bit float
        } else if (this.type == ProtoBuf.TYPES["double"]) {
            buffer.writeFloat64(value);
            
        // Length-delimited string
        } else if (this.type == ProtoBuf.TYPES["string"]) {
            buffer.writeVString(value);
            
        // Length-delimited bytes
        } else if (this.type == ProtoBuf.TYPES["bytes"]) {
            if (value.offset > value.length) { // Forgot to flip?
                buffer = buffer.clone().flip();
            }
            buffer.writeVarint32(value.remaining());
            buffer.append(value);
            
        // Embedded message
        } else if (this.type == ProtoBuf.TYPES["message"]) {
            var bb = new ByteBuffer().LE();
            this.resolvedType.encode(value, bb);
            buffer.writeVarint32(bb.offset);
            buffer.append(bb.flip());
        } else {
            // We should never end here
            throw(new Error("[INTERNAL ERROR] Illegal value to encode in "+this.toString(true)+": "+value+" (unknown type)"));
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
        // 32bit signed varint
        if (this.type == ProtoBuf.TYPES["int32"]) {
            return buffer.readVarint32() | 0;
        }
        
        // 32bit unsigned varint
        if (this.type == ProtoBuf.TYPES["uint32"]) {
            return buffer.readVarint32() >>> 0;
        }
        
        // 32bit signed varint zig-zag
        if (this.type == ProtoBuf.TYPES["sint32"]) {
            return buffer.readZigZagVarint32() | 0;
        }
        
        // Fixed 32bit unsigned
        if (this.type == ProtoBuf.TYPES["fixed32"]) {
            return buffer.readUint32() >>> 0;
        }
        
        // Fixed 32bit signed
        if (this.type == ProtoBuf.TYPES["sfixed32"]) {
            return buffer.readInt32() | 0;
        }
        
        // 64bit signed varint
        if (this.type == ProtoBuf.TYPES["int64"]) {
            return buffer.readVarint64();
        }
        
        // 64bit unsigned varint
        if (this.type == ProtoBuf.TYPES["uint64"]) {
            return buffer.readVarint64().toUnsigned();
        }
        
        // 64bit signed varint zig-zag
        if (this.type == ProtoBuf.TYPES["sint64"]) {
            return buffer.readZigZagVarint64();
        }

        // Fixed 64bit unsigned
        if (this.type == ProtoBuf.TYPES["fixed64"]) {
            return buffer.readUint64();
        }
        
        // Fixed 64bit signed
        if (this.type == ProtoBuf.TYPES["sfixed64"]) {
            return buffer.readInt64();
        }
        
        // Bool varint
        if (this.type == ProtoBuf.TYPES["bool"]) {
            return !!buffer.readVarint32();
        }
        
        // Constant enum value varint)
        if (this.type == ProtoBuf.TYPES["enum"]) {
            return buffer.readVarint32(); // The following Builder.Message#set will already throw
        }
        
        // 32bit float
        if (this.type == ProtoBuf.TYPES["float"]) {
            return buffer.readFloat();
        }
        // 64bit float
        if (this.type == ProtoBuf.TYPES["double"]) {
            return buffer.readDouble();
        }
        
        // Length-delimited string
        if (this.type == ProtoBuf.TYPES["string"]){
            return buffer.readVString();
        }
        
        // Length-delimited bytes
        if (this.type == ProtoBuf.TYPES["bytes"]) {
            nBytes = buffer.readVarint32();
            value = buffer.clone(); // Offset already set
            value.length = value.offset+nBytes;
            buffer.offset += nBytes;
            return value;
        }
        
        // Length-delimited embedded message
        if (this.type == ProtoBuf.TYPES["message"]) {
            nBytes = buffer.readVarint32();
            return this.resolvedType.decode(buffer, nBytes);
        }
        
        // We should never end here
        throw(new Error("[INTERNAL ERROR] Illegal wire type for "+this.toString(true)+": "+wireType));
    };

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

    return Reflect;
})(ProtoBuf);
