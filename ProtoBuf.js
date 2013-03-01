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

/**
 * @license ProtoBuf.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/ProtoBuf.js for details
 */
(function(global) {
    
    function loadProtoBuf(ByteBuffer) {
        if (!ByteBuffer || !ByteBuffer.calculateVarint32) {
            throw("ProtoBuf.js requires ByteBuffer.js: Get it at https://github.com/dcodeIO/ByteBuffer.js");
        }
    
        /**
         * @exports ProtoBuf
         * @namespace
         */
        var ProtoBuf = {};
    
        /**
         * Key types.
         * @type {{VARINT: number, FIXED64: number, LENGTH: number, GROUPSTART: number, GROUPEND: number, FIXED32: number}}
         */
        ProtoBuf.TYPES = {
            
            /**
             * Base 128 variable-length integer.
             * @type {number}
             */
            VARINT: 0,
    
            /**
             * Fixed 64bits.
             * @type {number}
             */
            FIXED64: 1, // Though unsupported
    
            /**
             * Length-delimited.
             * @type {number}
             */
            LENGTH: 2,
    
            /**
             * Start of a group.
             * @type {number}
             */
            GROUPSTART: 3,
    
            /**
             * End of a group.
             * @type {number}
             */
            GROUPEND: 4,
    
            /**
             * Fixed 32bits.
             * @type {number}
             */
            FIXED32: 5
        };
    
        /**
         * Shifted keys.
         * @type {{VARINT: number, FIXED64: number, LENGTH: number, GROUPSTART: number, GROUPEND: number, FIXED32: number}}
         */
        ProtoBuf.KEYS = {
            
            /**
             * Base 128 variable-length integer.
             * @type {number}
             */
            VARINT: ProtoBuf.TYPES.VARINT<<3,
            
            /**
             * Fixed 64bits.
             * @type {number}
             */
            FIXED64: ProtoBuf.FIXED64<<3,
    
            /**
             * Length-delimited.
             * @type {number}
             */
            LENDELIM: ProtoBuf.TYPES.LENGTH<<3,
    
            /**
             * Start of a group.
             * @type {number}
             */
            GROUPSTART: ProtoBuf.TYPES.GROUPSTART<<3,
    
            /**
             * End of a group.
             * @type {number}
             */
            GROUPEND: ProtoBuf.TYPES.GROUPEND<<3,
    
            /**
             * Fixed 32bits.
             * @type {number}
             */
            FIXED32: ProtoBuf.TYPES.FIXED32<<3
        };

        /**
         * @exports ProtoBuf.DotProto
         * @namespace
         */
        var DotProto = {};
        
        /**
         * ProtoBuf Language.
         * @exports ProtoBuf.DotProto.Lang
         * @namespace
         */
        var Lang = { // Look, so cute!
            OPEN: "{",
            CLOSE: "}",
            EQUAL: "=",
            END: ";",
            DELIM: /[\s\{\}=;\[\],]/g,
            KEYWORD: /package|message|enum/,
            RULE: /required|optional|repeated/,
            TYPE: /double|float|int32|uint32|sint32|fixed32|sfixed32|bool|string|bytes/,
            NAME: /[a-zA-Z][a-zA-Z_0-9]*/,
            TYPEDEF: /[a-zA-Z](\.?[a-zA-Z_0-9])*/,
            TYPEREF: /\.?[a-zA-Z](\.?[a-zA-Z_0-9])*/,
            VALUE: /[0-9]+/,
            COMMENT: "//",
            WHITESPACE: /\s/
        };
        
        DotProto.Lang = Lang;

        /**
         * Constructs a new Tokenizer.
         * @exports ProtoBuf.DotProto.Tokenizer
         * @class A ProtoBuf .proto Tokenizer.
         * @param {string} proto Proto to tokenize
         * @constructor
         */
        var Tokenizer = function(proto) {
            /**
             * Source to parse.
             * @type {string}
             */
            this.source = ""+proto;
            /**
             * Current index.
             * @type {number}
             */
            this.index = 0;
        };

        /**
         * Gets the next token.
         * @returns {string} Token
         */
        Tokenizer.prototype.next = function() {
            if (this.index >= this.source.length) {
                return null; // No more tokens
            }
            var repeat;
            do {
                repeat = false;
                // Strip white spaces
                while (Lang.WHITESPACE.test(this.source.charAt(this.index))) {
                    this.index++;
                    if (this.index == this.source.length) {
                        return null;
                    }
                }
                // Strip comments
                if (this.source.charAt(this.index) == Lang.COMMENT.charAt(0)) {
                    if (this.source.charAt(++this.index) != Lang.COMMENT.charAt(1)) {
                        throw("Invalid comment: /"+this.source.charAt(this.index)+" ('"+Lang.COMMENT.charAt(1)+"' expected)");
                    }
                    while (this.source.charAt(this.index) != "\n") {
                        this.index++;
                    }
                    this.index++;
                    repeat = true;
                }
            } while (repeat);
            
            // Read the next token
            var end = this.index;
            Lang.DELIM.lastIndex = 0;
            var delim = Lang.DELIM.test(this.source.charAt(end));
            if (!delim) {
                end++;
                while(end < this.source.length && !Lang.DELIM.test(this.source.charAt(end))) {
                    end++;
                }
            } else {
                end++;
            }
            return this.source.substring(this.index, this.index = end);
        };

        /**
         * Returns a string representation of this object.
         * @returns {string} String representation as of "Tokenizer(index/length)"
         */
        Tokenizer.prototype.toString = function() {
            return "Tokenizer("+this.index+"/"+this.source.length+")";
        };
        
        DotProto.Tokenizer = Tokenizer;

        /**
         * Constructs a new Parser.
         * @exports ProtoBuf.DotProto.Parser
         * @class A ProtoBuf .proto parser.
         * @constructor
         */
        var Parser = function(proto) {
            this.tn = new Tokenizer(proto);
        };

        /**
         * Runs the parser.
         * @return {Object} Parsed messages
         */
        Parser.prototype.parse = function() {
            var messages = {};
            var token, first = true;
            do {
                token = this.tn.next();
                if (token == null) {
                    break; // No more messages
                }
                if (token == 'package') {
                    if (!first) {
                        throw("Illegal package definition: Must be the first expression ");
                    }
                    token = this.tn.next();
                    if (!Lang.TYPEDEF.test(token)) {
                        throw("Illegal package name: "+token);
                    }
                    messages._package = token;
                    token = this.tn.next();
                    if (token != ";") {
                        throw("Illegal end of package definition: "+token+" (';' expected)")
                    }
                    token = this.tn.next();
                    if (token == null) break;
                }
                if (token != 'message') {
                    throw("Illegal start of message: "+token+" ('message' expected)");
                }
                var msg = this._parseMessage(null, token);
                messages[msg.name] = msg;
                first = false;
            } while (true);
            return messages;
        };

        /**
         * Parses a message.
         * @return {Object}
         * @private
         */
        Parser.prototype._parseMessage = function(outer, token) {
            var msg = {};
            token = this.tn.next();
            if (!Lang.NAME.test(token)) {
                throw("Illegal message name"+(outer ? " in message "+outer.name : "")+": "+token);
            }
            msg.name = token;
            token = this.tn.next();
            if (token != Lang.OPEN) {
                throw("Illegal OPEN after message "+msg.name+": "+token);
            }
            msg.fields = [];
            msg.enums = [];
            msg.messages = [];
            do {
                token = this.tn.next();
                if (token == "}") {
                    break;
                } else if (Lang.RULE.test(token)) {
                    this._parseMessageField(msg, token);
                } else if (token == "enum") {
                    this._parseEnum(msg, token);
                } else if (token == "message") {
                    this._parseMessage(msg, token);
                } else {
                    throw("Illegal token in message "+msg.name+": "+token);
                }
            } while (true);
            if (outer != null) {
                outer.messages[msg.name] = msg;
            }
            return msg;
        };

        /**
         * Parses a message field.
         * @param {Object} msg Message definition
         * @param {string} token Initial token
         * @private
         */
        Parser.prototype._parseMessageField = function(msg, token) {
            var fld = {};
            fld.rule = token;
            token = this.tn.next();
            if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token)) {
                throw("Illegal field type in message "+msg.name+": "+token);
            }
            fld.type = token;
            token = this.tn.next();
            if (!Lang.NAME.test(token)) {
                throw("Illegal field name in message "+msg.name+": "+token);
            }
            fld.name = token;
            token = this.tn.next();
            if (token != "=") {
                throw("Illegal field number operator in message "+msg.name+"#"+fld.name+": "+token+" ('=' expected)");
            }
            token = this.tn.next();
            if (!Lang.VALUE.test(token)) {
                throw("Illegal field number in message "+msg.name+"#"+fld.name+": "+token);
            }
            fld.value = parseInt(token, 10);
            fld.options = {};
            token = this.tn.next();
            if (token == "[") {
                this._parseMessageFieldOptions(msg, fld, token);
                token = this.tn.next();
            }
            if (token != ';') {
                throw("Illegal field delimiter in message "+msg.name+"#"+fld.name+": "+token+" (';' expected)");
            }
            msg.fields[fld.name] = fld;
        };
        
        Parser.prototype._parseMessageFieldOptions = function(msg, fld, token) {
            var opt = {}, name;
            var first = true;
            do {
                token = this.tn.next();
                if (token == "]") {
                    break;
                } else if (token == ",") {
                    if (first) {
                        throw("Illegal start of message field options in message "+msg.name+"#"+fld.name+": "+token);
                    }
                    token = this.tn.next();
                }
                if (!Lang.NAME.test(token)) {
                    throw("Illegal field option in message "+msg.name+"#"+fld.name+": "+token);
                }
                this._parseMessageFieldOption(msg, fld, token);
                first = false;
            } while (true);
        };

        /**
         * Parses a message field directive
         * @param {Object} msg Message definition
         * @param {Object} fld Field definition
         * @param {string} token Initial token
         * @private
         */
        Parser.prototype._parseMessageFieldOption = function(msg, fld, token) {
            var name = token;
            token = this.tn.next();
            if (token != '=') {
                throw("Illega field directive operation in message "+msg.name+"#"+fld.name+": "+token+" ('=' expected)");
            }
            token = this.tn.next();
            if (!Lang.VALUE.test(token) && !Lang.NAME.test(token)) {
                throw("Illegal field directive value in message "+msg.name+"#"+fld.name+": "+token);
            }
            fld.options[name] = Lang.VALUE.test(token) ? parseInt(token, 10) : token
        };

        /**
         * Parses an enum.
         * @param {Object} msg Message definition
         * @param {string} token Initial token
         * @private
         */
        Parser.prototype._parseEnum = function(msg, token) {
            var enm = {};
            token = this.tn.next();
            if (!Lang.NAME.test(token)) {
                throw("Illegal enum name in message "+msg.name+": "+token);
            }
            enm.name = token;
            token = this.tn.next();
            if (token != "{") {
                throw("Illegal OPEN after enum "+enm.name+": "+token);
            }
            enm.fields = {};
            do {
                token = this.tn.next();
                if (token == "}") {
                    break;
                } else if (!Lang.NAME.test(token)) {
                    throw("Illegal enum field name in enum "+enm.name+": "+token);
                }
                this._parseEnumField(enm, token);
            } while (true);
            msg.enums[enm.name] = enm;
        };

        /**
         * Parses an enum field.
         * @param {Object} enm Enum definition
         * @param {string} token Initial token
         * @private
         */
        Parser.prototype._parseEnumField = function(enm, token) {
            var name = token;
            token = this.tn.next();
            if (token != '=') {
                throw("Illegal enum field operator in enum "+enm.name+": "+token+" ('=' expected)");
            }
            token = this.tn.next();
            if (!Lang.VALUE.test(token)) {
                throw("Illegal enum field value in enum "+enm.name+": "+token);
            }
            enm.fields[name] = parseInt(token, 10);
            token = this.tn.next();
            if (token != ';') {
                throw("Illegal enum field delimiter in enum "+enm.name+": "+token+" (';' expected)");
            }
        };

        DotProto.Parser = Parser;
        
        ProtoBuf.DotProto = DotProto;

        /**
         * Constructs a new Builder.
         * @class ProtBuf Class Builder.
         * @constructor
         */
        var Builder = function() {
            
        };
        
        return ProtoBuf;
    }

    // Enable module loading if available
    if (typeof module != 'undefined' && module["exports"]) { // CommonJS
        module["exports"] = loadProtoBuf(require("bytebuffer"));
    } else if (typeof define != 'undefined' && define["amd"]) { // AMD
        define("ProtoBuf", ["ByteBuffer"], loadProtoBuf);
    } else { // Shim
        if (!global["dcodeIO"]) {
            global["dcodeIO"] = {};
        }
        global["dcodeIO"]["ProtoBuf"] = loadProtoBuf(global["dcodeIO"]["ByteBuffer"]);
    }    
    
})(this);