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
 * @alias ProtoBuf.Builder
 * @expose
 */
ProtoBuf.Builder = (function(ProtoBuf, Lang, Reflect) {
    "use strict";
    
    /**
     * Constructs a new Builder.
     * @exports ProtoBuf.Builder
     * @class Provides the functionality to build protocol messages.
     * @constructor
     */
    var Builder = function() {

        /**
         * Namespace.
         * @type {ProtoBuf.Reflect.Namespace}
         * @expose
         */
        this.ns = new Reflect.Namespace(null, ""); // Global namespace

        /**
         * Namespace pointer.
         * @type {ProtoBuf.Reflect.T}
         * @expose
         */
        this.ptr = this.ns;

        /**
         * Resolved flag.
         * @type {boolean}
         * @expose
         */
        this.resolved = false;

        /**
         * The current building result.
         * @type {Object.<string,ProtoBuf.Builder.Message|Object>|null}
         * @expose
         */
        this.result = null;
    };

    /**
     * Resets the pointer to the global namespace.
     * @expose
     */
    Builder.prototype.reset = function() {
        this.ptr = this.ns;
    };

    /**
     * Defines a package on top of the current pointer position and places the pointer on it.
     * @param {string} pkg
     * @param {Object.<string,*>=} options
     * @return {ProtoBuf.Builder} this
     * @throws {Error} If the package name is invalid
     * @expose
     */
    Builder.prototype.define = function(pkg, options) {
        if (typeof pkg != 'string' || !Lang.TYPEDEF.test(pkg)) {
            throw(new Error("Illegal package name: "+pkg));
        }
        var part = pkg.split("."), i;
        for (i=0; i<part.length; i++) { // To be absolutely sure
            if (!Lang.NAME.test(part[i])) {
                throw(new Error("Illegal package name: "+part[i]));
            }
        }
        for (i=0; i<part.length; i++) {
            if (!this.ptr.hasChild(part[i])) { // Keep existing namespace
                this.ptr.addChild(new Reflect.Namespace(this.ptr, part[i], options));
            }
            this.ptr = this.ptr.getChild(part[i]);
        }
        return this;
    };

    /**
     * Tests if a definition is a valid message definition.
     * @param {Object.<string,*>} def Definition
     * @return {boolean} true if valid, else false
     * @expose
     */
    Builder.isValidMessage = function(def) {
        // Messages require a string name
        if (typeof def["name"] != 'string' || !Lang.NAME.test(def["name"])) {
            return false;
        }
        // Messages must not contain values (that'd be an enum)
        if (typeof def["values"] != 'undefined') {
            return false;
        }
        // Fields, enums and messages are arrays if provided
        var i;
        if (typeof def["fields"] != 'undefined') {
            if (!(def["fields"] instanceof Array)) {
                return false;
            }
            var ids = [], id; // IDs must be unique
            for (i=0; i<def["fields"].length; i++) {
                if (!Builder.isValidMessageField(def["fields"][i])) {
                    return false;
                }
                id = parseInt(def["id"], 10);
                if (ids.indexOf(id) >= 0) {
                    return false;
                }
                ids.push(id);
            }
            ids = null;
        }
        if (typeof def["enums"] != 'undefined') {
            if (!(def["enums"] instanceof Array)) {
                return false;
            }
            for (i=0; i<def["enums"].length; i++) {
                if (!Builder.isValidEnum(def["enums"][i])) {
                    return false;
                }
            }
        }
        if (typeof def["messages"] != 'undefined') {
            if (!(def["messages"] instanceof Array)) {
                return false;
            }
            for (i=0; i<def["messages"].length; i++) {
                if (!Builder.isValidMessage(def["messages"][i])) {
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * Tests if a definition is a valid message field definition.
     * @param {Object} def Definition
     * @return {boolean} true if valid, else false
     * @expose
     */
    Builder.isValidMessageField = function(def) {
        // Message fields require a string rule, name and type and an id
        if (typeof def["rule"] != 'string' || typeof def["name"] != 'string' || typeof def["type"] != 'string' || typeof def["id"] == 'undefined') {
            return false;
        }
        if (!Lang.RULE.test(def["rule"]) || !Lang.NAME.test(def["name"]) || !Lang.TYPEREF.test(def["type"]) || !Lang.ID.test(""+def["id"])) {
            return false;
        }
        if (typeof def["options"] != 'undefined') {
            // Options are objects
            if (typeof def["options"] != 'object') {
                return false;
            }
            // Options are <string,number|typeref>
            var keys = Object.keys(def["options"]);
            for (var i=0; i<keys.length; i++) {
                if (!Lang.NAME.test(keys[i]) || (!Lang.ID.test(""+def["options"][keys[i]]) && !Lang.TYPEREF.test(def["options"][keys[i]]))) {
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * Tests if a definition is a valid enum definition.
     * @param {Object} def Definition
     * @return {boolean} true if valid, else false
     * @expose
     */
    Builder.isValidEnum = function(def) {
        // Enums requrie a string name
        if (typeof def["name"] != 'string' || !Lang.NAME.test(def["name"])) {
            return false;
        }
        // Enums require at least one value
        if (typeof def["values"] == 'undefined' || !(def["values"] instanceof Array) || def["values"].length == 0) {
            return false;
        }
        for (var i=0; i<def["values"].length; i++) {
            // Values are objects
            if (typeof def["values"][i] != "object") {
                return false;
            }
            // Values require a string name and an id
            if (typeof def["values"][i]["name"] != 'string' || typeof def["values"][i]["id"] == 'undefined') {
                return false;
            }
            if (!Lang.NAME.test(def["values"][i]["name"]) || !Lang.ID.test(""+def["values"][i]["id"])) {
                return false;
            }
        }
        // It's not important if there are other fields because ["values"] is already unique
        return true;
    };

    /**
     * Creates ths specified protocol types at the current pointer position.
     * @param {Array.<Object.<string,*>>} messages Messages or enums to create
     * @return {ProtoBuf.Builder} this
     * @throws {Error} If a message definition is invalid
     * @expose
     */
    Builder.prototype.create = function(messages) {
        if (!messages) return; // Nothing to create
        if (!(messages instanceof Array)) {
            messages = [messages];
        }
        if (messages.length == 0) return;

        // It's quite hard to keep track of scopes and memory here, so let's do this iteratively.
        var stack = [], defs, def, obj, subObj, i, j;
        stack.push(messages); // One level [a, b, c]
        while (stack.length > 0) {
            defs = stack.pop();
            if (defs instanceof Array) { // Stack always contains entire namespaces
                while (defs.length > 0) {
                    def = defs.shift(); // Namespace always contains an array of messages and enums
                    if (Builder.isValidMessage(def)) {
                        obj = new Reflect.Message(this.ptr, def["name"], def["options"]);
                        // Create fields
                        if (def["fields"] && def["fields"].length > 0) {
                            for (i=0; i<def["fields"].length; i++) { // i=Fields
                                if (!Builder.isValidMessageField(def["fields"][i])) {
                                    throw(new Error("Not a valid message field definition in message "+obj.name+": "+JSON.stringify(def["fields"][i])));
                                }
                                if (obj.hasChild(def['fields'][i]['id'])) {
                                    throw(new Error("Duplicate field id in message "+obj.name+": "+def['fields'][i]['id']));
                                }
                                if (def["fields"][i]["options"]) {
                                    subObj = Object.keys(def["fields"][i]["options"]);
                                    for (j=0; j<subObj.length; j++) { // j=Option names
                                        if (!Lang.NAME.test(subObj[j])) {
                                            throw(new Error("Illegal field option name in message "+obj.name+"#"+def["fields"][i]["name"]+": "+subObj[j]));
                                        }
                                        if (!Lang.ID.test(""+def["fields"][i]["options"][subObj[j]]) && !Lang.TYPEREF.test(def["fields"][i]["options"][subObj[j]])) {
                                            throw(new Error("Illegal field option value in message "+obj.name+"#"+def["fields"][i]["name"]+"#"+subObj[j]+": "+def["fields"][i]["options"][subObj[j]]));
                                        }
                                    }
                                    subObj = null;
                                }
                                obj.addChild(new Reflect.Message.Field(obj, def["fields"][i]["rule"], def["fields"][i]["type"], def["fields"][i]["name"], def["fields"][i]["id"], def["fields"][i]["options"]));
                            }
                        }
                        // Push enums and messages to stack
                        subObj = [];
                        if (typeof def["enums"] != 'undefined' && def['enums'].length > 0) {
                            for (i=0; i<def["enums"].length; i++) {
                                subObj.push(def["enums"][i]);
                            }
                        }
                        if (def["messages"] && def["messages"].length > 0) {
                            for (i=0; i<def["messages"].length; i++) {
                                subObj.push(def["messages"][i]);
                            }
                        }
                        this.ptr.addChild(obj); // Add to current namespace
                        if (subObj.length > 0) {
                            stack.push(defs); // Push the current level back
                            defs = subObj; // Continue processing sub level
                            subObj = null;
                            this.ptr = obj; // And move the pointer to this namespace
                            obj = null;
                            continue;
                        }
                        subObj = null;
                        obj = null;
                    } else if (Builder.isValidEnum(def)) {
                        obj = new Reflect.Enum(this.ptr, def["name"], def["options"]);
                        for (i=0; i<def["values"].length; i++) {
                            obj.addChild(new Reflect.Enum.Value(obj, def["values"][i]["name"], def["values"][i]["id"]));
                        }
                        this.ptr.addChild(obj);
                        obj = null;
                    } else {
                        throw(new Error("Not a valid message or enum definition: "+JSON.stringify(def)));
                    }
                    def = null;
                }
                // Break goes here
            } else {
                throw(new Error("Not a valid namespace definition: "+JSON.stringify(defs)));
            }
            defs = null;
            this.ptr = this.ptr.parent; // This namespace is s done
        }
        this.resolved = false; // Require re-resolve
        this.result = null; // Require re-build
        return this;
    };

    /**
     * Imports another builder into this one.
     * @param {Object.<string,*>} parsed Parsed import
     * @param {string} filename Imported file name
     * @return {ProtoBuf.Builder} this
     * @throws {Error} If there is a naming conflict
     * @expose
     */
    Builder.prototype["import"] = function(parsed, filename) {
        if (!!parsed['package']) {
            this.define(parsed['package'], parsed["options"]);
        }
        if (!!parsed['messages']) {
            this.create(parsed['messages']);
        }
        this.reset();

        if (!!parsed['package']) {
            this.define(parsed['package'], parsed["options"]);
        }
        if (!!parsed['enums']) {
            this.create(parsed['enums']);
        }
        this.reset();

        if (!!parsed['imports'] && parsed['imports'].length > 0) {
            if (!filename) {
                throw(new Error("Cannot determine import root: File name is unknown"));
            }
            var importRoot = filename.replace(/[\/\\][^\/\\]*$/, "");
            for (var i=0; i<parsed['imports'].length; i++) {
                var importFilename = importRoot+"/"+parsed['imports'][i];
                if (/\.json$/i.test(importFilename)) { // Always possible
                    var json = ProtoBuf.Util.fetch(importFilename);
                    if (json === null) {
                        throw(new Error("Failed to import '"+importFilename+"' in '"+filename+"': File not found"));
                    }
                    this["import"](JSON.parse(json), importFilename); // Throws on its own
                } else {
                    // #ifdef NOPARSE
                    throw(new Error("This build of ProtoBuf.js does not include DotProto support. See: https://github.com/dcodeIO/ProtoBuf.js"));
                    // #else
                    if (/google\/protobuf\//.test(importFilename)) {
                        // Ignore google/protobuf/descriptor.proto (for example) as it makes use of low-level
                        // bootstrapping directives that are not required and therefore cannot be parsed by ProtoBuf.js.
                        continue;
                    }
                    var proto = ProtoBuf.Util.fetch(importFilename);
                    if (proto === null) {
                        throw(new Error("Failed to import '"+importFilename+"' in '"+filename+"': File not found"));
                    }
                    var parser = new ProtoBuf.DotProto.Parser(proto+"");
                    this["import"](parser.parse(), importFilename); // Throws on its own                    
                    // #endif
                }
            }
        }
        return this;
    };

    /**
     * Resolves all namespace objects.
     * @throws {Error} If a type cannot be resolved
     * @expose
     */
    Builder.prototype.resolveAll = function() {
        // Resolve all reflected objects
        if (this.ptr == null || typeof this.ptr.type == 'object') return; // Done (already resolved)
        if (this.ptr instanceof Reflect.Namespace) {
            // Build all children
            var children = this.ptr.getChildren();
            for (var i=0; i<children.length; i++) {
                this.ptr = children[i];
                this.resolveAll();
            }
        } else if (this.ptr instanceof Reflect.Message.Field) {
            if (!Lang.TYPE.test(this.ptr.type)) { // Resolve type...
                if (!Lang.TYPEREF.test(this.ptr.type)) {
                    throw(new Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type));
                }
                var res = this.ptr.parent.resolve(this.ptr.type);
                if (!res) {
                    throw(new Error("Unresolvable type reference in "+this.ptr.toString(true)+": "+this.ptr.type));
                }
                this.ptr.resolvedType = res;
                if (res instanceof Reflect.Enum) {
                    this.ptr.type = ProtoBuf.TYPES["enum"];
                } else if (res instanceof Reflect.Message) {
                    this.ptr.type = ProtoBuf.TYPES["message"];
                } else {
                    throw(new Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type));
                }
            } else {
                this.ptr.type = ProtoBuf.TYPES[this.ptr.type];
            }
        } else if (this.ptr instanceof ProtoBuf.Reflect.Enum.Value) {
            // No need to build enum values (built in enum)
        } else {
            throw(new Error("Illegal object type in namespace: "+typeof(this.ptr)+":"+this.ptr));
        }
        this.reset();
    };

    /**
     * Builds the protocol. This will first try to resolve all definitions and, if this has been successful,
     * return the builded package.
     * @param {string=} path Specified what to return. If omitted, the entire namespace will be returned.
     * @return {ProtoBuf.Builder} this
     * @throws {string} Exception if a type could not be resolved
     * @expose
     */
    Builder.prototype.build = function(path) {
        this.reset();
        if (!this.resolved) {
            this.resolveAll();
            this.resolved = true;
            this.result = null; // Require re-build
        }
        if (this.result == null) { // (Re-)Build
            this.result = this.ns.build();
        }
        if (!path) {
            return this.result;
        } else {
            var part = path.split(".");
            var ptr = this.result; // Build namespace pointer (no hasChild etc.)
            for (var i=0; i<part.length; i++) {
                if (ptr[part[i]]) {
                    ptr = ptr[part[i]];
                } else {
                    ptr = null;
                    break;
                }
            }
            return ptr;
        }
    };

    /**
     * Returns a string representation of this object.
     * @return {string} String representation as of "Builder"
     * @expose
     */
    Builder.prototype.toString = function() {
        return "Builder";
    };
    
    return Builder;
    
})(ProtoBuf, ProtoBuf.Lang, ProtoBuf.Reflect);
