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
 * @alias ProtoBuf.DotProto.Parser
 * @expose
 */
ProtoBuf.DotProto.Parser = (function(ProtoBuf, Lang, Tokenizer) {
    "use strict";
    
    /**
     * Constructs a new Parser.
     * @exports ProtoBuf.DotProto.Parser
     * @class A ProtoBuf .proto parser.
     * @param {string} proto Protocol source
     * @constructor
     */
    var Parser = function(proto) {

        /**
         * Tokenizer.
         * @type {ProtoBuf.DotProto.Tokenizer}
         * @expose
         */
        this.tn = new Tokenizer(proto);
    };

    /**
     * Runs the parser.
     * @return {{package: string|null, messages: Array.<object>, enums: Array.<object>, imports: Array.<string>, options: object<string,*>}}
     * @throws {Error} If the source cannot be parsed
     * @expose
     */
    Parser.prototype.parse = function() {
        var topLevel = {
            "name": "[ROOT]", // temporary
            "package": null,
            "messages": [],
            "enums": [],
            "imports": [],
            "options": {}
        };
        var token, header = true;
        do {
            token = this.tn.next();
            if (token == null) {
                break; // No more messages
            }
            if (token == 'package') {
                if (!header) {
                    throw(new Error("Illegal package definition: Must be declared before the first message or enum"));
                }
                if (topLevel["package"] !== null) {
                    throw(new Error("Illegal package definition: Package already declared"));
                }
                topLevel["package"] = this._parsePackage(token);
            } else if (token == 'import') {
                if (!header) {
                    throw(new Error("Illegal import definition: Must be declared before the first message or enum"));
                }
                topLevel.imports.push(this._parseImport(token));
            } else if (token == 'message') {
                this._parseMessage(topLevel, token);
                header = false;
            } else if (token == 'enum') {
                this._parseEnum(topLevel, token);
                header = false;
            } else if (token == 'option') {
                if (!header) {
                    throw(new Error("Illegal option definition: Must be declared before the first message or enum"));
                }
                this._parseOption(topLevel, token);
            } else if (token == 'extend' || token == 'service') {
                this._parseIgnored(topLevel, token);
            } else {
                throw(new Error("Illegal top level declaration: "+token));
            }
        } while (true);
        delete topLevel["name"];
        return topLevel;
    };

    /**
     * Parses the package definition.
     * @param {string} token Initial token
     * @return {string} Package name
     * @throws {Error} If the package definition cannot be parsed
     * @private
     */
    Parser.prototype._parsePackage = function(token) {
        token = this.tn.next();
        if (!Lang.TYPEDEF.test(token)) {
            throw(new Error("Illegal package name: "+token));
        }
        var pkg = token;
        token = this.tn.next();
        if (token != Lang.END) {
            throw(new Error("Illegal end of package definition: "+token+" ('"+Lang.END+"' expected)"));
        }
        return pkg;
    };

    /**
     * Parses an import definition.
     * @param {string} token Initial token
     * @return {string} Import file name 
     * @throws {Error} If the import definition cannot be parsed
     * @private
     */
    Parser.prototype._parseImport = function(token) {
        token = this.tn.next();
        if (token == "public") {
            token = this.tn.next();
        }
        if (token != Lang.STRINGOPEN) {
            throw(new Error("Illegal begin of import value: "+token+" ('"+Lang.STRINGOPEN+"' expected)"));
        }
        var imported = this.tn.next();
        token = this.tn.next();
        if (token != Lang.STRINGCLOSE) {
            throw(new Error("Illegal end of import value: "+token+" ('"+Lang.STRINGCLOSE+"' expected)"));
        }
        token = this.tn.next();
        if (token != Lang.END) {
            throw(new Error("Illegal end of import definition: "+token+" ('"+Lang.END+"' expected)"));
        }
        return imported;
    };

    /**
     * Parses a namespace option.
     * @param {Object} parent Parent definition
     * @param {string} token Initial token
     * @throws {Error} If the option cannot be parsed
     * @private
     */
    Parser.prototype._parseOption = function(parent, token) {
        token = this.tn.next();
        var custom = false;
        if (token == Lang.COPTOPEN) {
            custom = true;
            token = this.tn.next();
        }
        if (!Lang.NAME.test(token)) {
            throw(new Error("Illegal option name in message "+parent.name+": "+token));
        }
        var name = token;
        token = this.tn.next();
        if (custom) {
            if (token != Lang.COPTCLOSE) {
                throw(new Error("Illegal custom option name delimiter in message "+parent.name+", option "+name+": "+token+" ('"+Lang.COPTCLOSE+"' expected)"));
            }
            token = this.tn.next();
        }
        if (token != Lang.EQUAL) {
            throw(new Error("Illegal option operator in message "+parent.name+", option "+name+": "+token+" ('"+Lang.EQUAL+"' expected)"));
        }
        var value;
        token = this.tn.next();
        if (token == Lang.STRINGOPEN) {
            value = this.tn.next();
            token = this.tn.next();
            if (token != Lang.STRINGCLOSE) {
                throw(new Error("Illegal end of option value in message "+parent.name+", option "+name+": "+token+" ('"+Lang.STRINGCLOSE+"' expected)"));
            }
        } else {
            if (Lang.NUMBER.test(token)) {
                value = parseInt(token);
            } else if (Lang.NAME.test(token)) {
                value = token;
            } else {
                throw(new Error("Illegal option value in message "+parent.name+", option "+name+": "+token));
            }
        }
        token = this.tn.next();
        if (token != Lang.END) {
            throw(new Error("Illegal end of option in message "+parent.name+", option "+name+": "+token+" ('"+Lang.END+"' expected)"));
        }
        parent["options"][name] = value;
    };

    /**
     * Parses an ignored directive of the form ['keyword', 'typeref', '{' ... '}'].
     * @param {Object} parent Parent definition
     * @param {string} keyword Initial token
     * @return {Object}
     * @throws {Error} If the directive cannot be parsed
     * @private
     */
    Parser.prototype._parseIgnored = function(parent, keyword) {
        var token = this.tn.next();
        if (!Lang.TYPEREF.test(token)) {
            throw(new Error("Illegal "+keyword+" type in "+parent.name+": "+token));
        }
        var name = token;
        token = this.tn.next();
        if (token != Lang.OPEN) {
            throw(new Error("Illegal OPEN in "+parent.name+" after "+keyword+" "+name+": "+token));
        }
        var depth = 1;
        do {
            token = this.tn.next();
            if (token === null) {
                throw(new Error("Illegal nesting in "+parent.name+", "+keyword+" "+name+": EOF"));
            }
            if (token == Lang.OPEN) {
                depth++;
            } else if (token == Lang.CLOSE) {
                depth--;
                if (depth == 0) {
                    break;
                }
            }
        } while(true);
    };

    /**
     * Parses a message.
     * @param {Object} parent Parent definition
     * @param {string} token First token
     * @return {Object}
     * @throws {Error} If the message cannot be parsed
     * @private
     */
    Parser.prototype._parseMessage = function(parent, token) {
        /** @dict */
        var msg = {}; // Note: At some point we might want to exclude the parser, so we need a dict.
        token = this.tn.next();
        if (!Lang.NAME.test(token)) {
            throw(new Error("Illegal message name"+(parent ? " in message "+parent["name"] : "")+": "+token));
        }
        msg["name"] = token;
        token = this.tn.next();
        if (token != Lang.OPEN) {
            throw(new Error("Illegal OPEN after message "+msg.name+": "+token+" ('"+Lang.OPEN+"' expected)"));
        }
        msg["fields"] = []; // Note: Using arrays to support also browser that cannot preserve order of object keys.
        msg["enums"] = [];
        msg["messages"] = [];
        msg["options"] = {};
        do {
            token = this.tn.next();
            if (token == Lang.CLOSE) {
                break;
            } else if (Lang.RULE.test(token)) {
                this._parseMessageField(msg, token);
            } else if (token == "enum") {
                this._parseEnum(msg, token);
            } else if (token == "message") {
                this._parseMessage(msg, token);
            } else if (token == "option") {
                this._parseOption(msg, token);
            } else {
                throw(new Error("Illegal token in message "+msg.name+": "+token+" (type or '"+Lang.CLOSE+"' expected)"));
            }
        } while (true);
        parent["messages"].push(msg);
        return msg;
    };

    /**
     * Parses a message field.
     * @param {Object} msg Message definition
     * @param {string} token Initial token
     * @throws {Error} If the message field cannot be parsed
     * @private
     */
    Parser.prototype._parseMessageField = function(msg, token) {
        /** @dict */
        var fld = {};
        fld["rule"] = token;
        token = this.tn.next();
        if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token)) {
            throw(new Error("Illegal field type in message "+msg.name+": "+token));
        }
        fld["type"] = token;
        token = this.tn.next();
        if (!Lang.NAME.test(token)) {
            throw(new Error("Illegal field name in message "+msg.name+": "+token));
        }
        fld["name"] = token;
        token = this.tn.next();
        if (token != Lang.EQUAL) {
            throw(new Error("Illegal field number operator in message "+msg.name+"#"+fld.name+": "+token+" ('"+Lang.EQUAL+"' expected)"));
        }
        token = this.tn.next();
        if (!Lang.ID.test(token)) {
            throw(new Error("Illegal field number in message "+msg.name+"#"+fld.name+": "+token));
        }
        fld["id"] = parseInt(token, 10);
        /** @dict */
        fld["options"] = {};
        token = this.tn.next();
        if (token == Lang.OPTOPEN) {
            this._parseFieldOptions(msg, fld, token);
            token = this.tn.next();
        }
        if (token != Lang.END) {
            throw(new Error("Illegal field delimiter in message "+msg.name+"#"+fld.name+": "+token+" ('"+Lang.END+"' expected)"));
        }
        msg["fields"].push(fld);
    };

    /**
     * Parses a set of field option defintions.
     * @param {Object} msg Message definition
     * @param {Object} fld Field definition
     * @param {string} token Initial token
     * @throws {Error} If the message field options cannot be parsed
     * @private
     */
    Parser.prototype._parseFieldOptions = function(msg, fld, token) {
        var first = true;
        do {
            token = this.tn.next();
            if (token == Lang.OPTCLOSE) {
                break;
            } else if (token == Lang.OPTEND) {
                if (first) {
                    throw(new Error("Illegal start of message field options in message "+msg.name+"#"+fld.name+": "+token));
                }
                token = this.tn.next();
            }
            this._parseFieldOption(msg, fld, token);
            first = false;
        } while (true);
    };

    /**
     * Parses a single field option.
     * @param {Object} msg Message definition
     * @param {Object} fld Field definition
     * @param {string} token Initial token
     * @throws {Error} If the mesage field option cannot be parsed
     * @private
     */
    Parser.prototype._parseFieldOption = function(msg, fld, token) {
        var custom = false;
        if (token == Lang.COPTOPEN) {
            token = this.tn.next();
            custom = true;
        }
        if (!Lang.NAME.test(token)) {
            throw(new Error("Illegal field option in message "+msg.name+"#"+fld.name+": "+token));
        }
        var name = token;
        token = this.tn.next();
        if (custom) {
            if (token != Lang.COPTCLOSE) {
                throw(new Error("Illegal custom field option name delimiter in message "+msg.name+"#"+fld.name+": "+token+" (')' expected)"));
            }
            token = this.tn.next();
        }
        if (token != Lang.EQUAL) {
            throw(new Error("Illegal field option operation in message "+msg.name+"#"+fld.name+": "+token+" ('=' expected)"));
        }
        var value;
        token = this.tn.next();
        if (token == Lang.STRINGOPEN) {
            value = this.tn.next();
            token = this.tn.next();
            if (token != Lang.STRINGCLOSE) {
                throw(new Error("Illegal end of field value in message "+msg.name+"#"+fld.name+", option "+name+": "+token+" ('"+Lang.STRINGCLOSE+"' expected)"));
            }
        } else if (Lang.NUMBER.test(token)) {
            value = parseFloat(token);
        } else if (Lang.TYPEREF.test(token)) {
            value = token; // TODO: Resolve?
        } else {
            throw(new Error("Illegal field option value in message "+msg.name+"#"+fld.name+", option "+name+": "+token));
        }
        fld["options"][name] = value;
    };

    /**
     * Parses an enum.
     * @param {Object} msg Message definition
     * @param {string} token Initial token
     * @throws {Error} If the enum cannot be parsed
     * @private
     */
    Parser.prototype._parseEnum = function(msg, token) {
        /** @dict */
        var enm = {};
        token = this.tn.next();
        if (!Lang.NAME.test(token)) {
            throw(new Error("Illegal enum name in message "+msg.name+": "+token));
        }
        enm["name"] = token;
        token = this.tn.next();
        if (token != Lang.OPEN) {
            throw(new Error("Illegal OPEN after enum "+enm.name+": "+token));
        }
        enm["values"] = [];
        enm["options"] = {};
        do {
            token = this.tn.next();
            if (token == Lang.CLOSE) {
                break;
            }
            if (token == 'option') {
                this._parseOption(enm, token);
            } else {
                if (!Lang.NAME.test(token)) {
                    throw(new Error("Illegal enum value name in enum "+enm.name+": "+token));
                }
                this._parseEnumValue(enm, token);
            }
        } while (true);
        msg["enums"].push(enm);
    };

    /**
     * Parses an enum value.
     * @param {Object} enm Enum definition
     * @param {string} token Initial token
     * @throws {Error} If the enum value cannot be parsed
     * @private
     */
    Parser.prototype._parseEnumValue = function(enm, token) {
        /** @dict */
        var val = {};
        val["name"] = token;
        token = this.tn.next();
        if (token != Lang.EQUAL) {
            throw(new Error("Illegal enum value operator in enum "+enm.name+": "+token+" ('"+Lang.EQUAL+"' expected)"));
        }
        token = this.tn.next();
        if (!Lang.ID.test(token)) {
            throw(new Error("Illegal enum value value in enum "+enm.name+": "+token));
        }
        val["id"] = parseInt(token, 10);
        enm["values"].push(val);
        token = this.tn.next();
        if (token == Lang.OPTOPEN) {
            var opt = { 'options' : {} }; // TODO: Actually expose them somehow.
            this._parseFieldOptions(enm, opt, token);
            token = this.tn.next();
        }
        if (token != Lang.END) {
            throw(new Error("Illegal enum value delimiter in enum "+enm.name+": "+token+" ('"+Lang.END+"' expected)"));
        }
    };

    /**
     * Returns a string representation of this object.
     * @returns {string} String representation as of "Parser"
     */
    Parser.prototype.toString = function() {
        return "Parser";
    };
    
    return Parser;
    
})(ProtoBuf, ProtoBuf.Lang, ProtoBuf.DotProto.Tokenizer);
