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
     * @param {Object.<string,*>=} options Options
     * @constructor
     */
    var Builder = function(options) {

        /**
         * Namespace.
         * @type {ProtoBuf.Reflect.Namespace}
         * @expose
         */
        this.ns = new Reflect.Namespace(this, null, ""); // Global namespace

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

        /**
         * Imported files.
         * @type {Array.<string>}
         * @expose
         */
        this.files = {};

        /**
         * Import root override.
         * @type {?string}
         * @expose
         */
        this.importRoot = null;

        /**
         * Options.
         * @type {!Object.<string, *>}
         * @expose
         */
        this.options = options || {};
    };

    /**
     * @alias ProtoBuf.Builder.prototype
     * @inner
     */
    var BuilderPrototype = Builder.prototype;

    /**
     * Resets the pointer to the root namespace.
     * @expose
     */
    BuilderPrototype.reset = function() {
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
    BuilderPrototype.define = function(pkg, options) {
        if (typeof pkg !== 'string' || !Lang.TYPEREF.test(pkg))
            throw Error("Illegal package: "+pkg);
        var part = pkg.split("."), i;
        for (i=0; i<part.length; i++) // To be absolutely sure
            if (!Lang.NAME.test(part[i]))
                throw Error("Illegal package: "+part[i]);
        for (i=0; i<part.length; i++) {
            if (this.ptr.getChild(part[i]) === null) // Keep existing namespace
                this.ptr.addChild(new Reflect.Namespace(this, this.ptr, part[i], options));
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
        if (typeof def["name"] !== 'string' || !Lang.NAME.test(def["name"]))
            return false;
        // Messages must not contain values (that'd be an enum) or methods (that'd be a service)
        if (typeof def["values"] !== 'undefined' || typeof def["rpc"] !== 'undefined')
            return false;
        // Fields, enums and messages are arrays if provided
        var i;
        if (typeof def["fields"] !== 'undefined') {
            if (!ProtoBuf.Util.isArray(def["fields"]))
                return false;
            var ids = [], id; // IDs must be unique
            for (i=0; i<def["fields"].length; i++) {
                if (!Builder.isValidMessageField(def["fields"][i]))
                    return false;
                id = parseInt(def["fields"][i]["id"], 10);
                if (ids.indexOf(id) >= 0)
                    return false;
                ids.push(id);
            }
            ids = null;
        }
        if (typeof def["enums"] !== 'undefined') {
            if (!ProtoBuf.Util.isArray(def["enums"]))
                return false;
            for (i=0; i<def["enums"].length; i++)
                if (!Builder.isValidEnum(def["enums"][i]))
                    return false;
        }
        if (typeof def["messages"] !== 'undefined') {
            if (!ProtoBuf.Util.isArray(def["messages"]))
                return false;
            for (i=0; i<def["messages"].length; i++)
                if (!Builder.isValidMessage(def["messages"][i]) && !Builder.isValidExtend(def["messages"][i]))
                    return false;
        }
        if (typeof def["extensions"] !== 'undefined')
            if (!ProtoBuf.Util.isArray(def["extensions"]) || def["extensions"].length !== 2 || typeof def["extensions"][0] !== 'number' || typeof def["extensions"][1] !== 'number')
                return false;
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
        if (typeof def["rule"] !== 'string' || typeof def["name"] !== 'string' || typeof def["type"] !== 'string' || typeof def["id"] === 'undefined')
            return false;
        if (!Lang.RULE.test(def["rule"]) || !Lang.NAME.test(def["name"]) || !Lang.TYPEREF.test(def["type"]) || !Lang.ID.test(""+def["id"]))
            return false;
        if (typeof def["options"] !== 'undefined') {
            // Options are objects
            if (typeof def["options"] !== 'object')
                return false;
            // Options are <string,string|number|boolean>
            var keys = Object.keys(def["options"]);
            for (var i=0, key; i<keys.length; i++)
                if (typeof (key = keys[i]) !== 'string' || (typeof def["options"][key] !== 'string' && typeof def["options"][key] !== 'number' && typeof def["options"][key] !== 'boolean'))
                    return false;
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
        // Enums require a string name
        if (typeof def["name"] !== 'string' || !Lang.NAME.test(def["name"]))
            return false;
        // Enums require at least one value
        if (typeof def["values"] === 'undefined' || !ProtoBuf.Util.isArray(def["values"]) || def["values"].length == 0)
            return false;
        for (var i=0; i<def["values"].length; i++) {
            // Values are objects
            if (typeof def["values"][i] != "object")
                return false;
            // Values require a string name and an id
            if (typeof def["values"][i]["name"] !== 'string' || typeof def["values"][i]["id"] === 'undefined')
                return false;
            if (!Lang.NAME.test(def["values"][i]["name"]) || !Lang.NEGID.test(""+def["values"][i]["id"]))
                return false;
        }
        // It's not important if there are other fields because ["values"] is already unique
        return true;
    };

    /**
     * Creates ths specified protocol types at the current pointer position.
     * @param {Array.<Object.<string,*>>} defs Messages, enums or services to create
     * @return {ProtoBuf.Builder} this
     * @throws {Error} If a message definition is invalid
     * @expose
     */
    BuilderPrototype.create = function(defs) {
        if (!defs)
            return this; // Nothing to create
        if (!ProtoBuf.Util.isArray(defs))
            defs = [defs];
        if (defs.length == 0)
            return this;
        
        // It's quite hard to keep track of scopes and memory here, so let's do this iteratively.
        var stack = [];
        stack.push(defs); // One level [a, b, c]
        while (stack.length > 0) {
            defs = stack.pop();
            if (ProtoBuf.Util.isArray(defs)) { // Stack always contains entire namespaces
                while (defs.length > 0) {
                    var def = defs.shift(); // Namespace always contains an array of messages, enums and services
                    if (Builder.isValidMessage(def)) {
                        var obj = new Reflect.Message(this, this.ptr, def["name"], def["options"], def["isGroup"]);
                        // Create OneOfs
                        var oneofs = {};
                        if (def["oneofs"]) {
                            var keys = Object.keys(def["oneofs"]);
                            for (var i=0, k=keys.length; i<k; ++i)
                                obj.addChild(oneofs[keys[i]] = new Reflect.Message.OneOf(this, obj, keys[i]));
                        }
                        // Create fields
                        if (def["fields"] && def["fields"].length > 0) {
                            for (i=0, k=def["fields"].length; i<k; ++i) { // i:k=Fields
                                var fld = def['fields'][i];
                                if (obj.getChild(fld['id']) !== null)
                                    throw Error("Duplicate field id in message "+obj.name+": "+fld['id']);
                                if (fld["options"]) {
                                    var opts = Object.keys(fld["options"]);
                                    for (var j= 0,l=opts.length; j<l; ++j) { // j:l=Option names
                                        if (typeof opts[j] !== 'string')
                                            throw Error("Illegal field option name in message "+obj.name+"#"+fld["name"]+": "+opts[j]);
                                        if (typeof fld["options"][opts[j]] !== 'string' && typeof fld["options"][opts[j]] !== 'number' && typeof fld["options"][opts[j]] !== 'boolean')
                                            throw Error("Illegal field option value in message "+obj.name+"#"+fld["name"]+"#"+opts[j]+": "+fld["options"][opts[j]]);
                                    }
                                }
                                var oneof = null;
                                if (typeof fld["oneof"] === 'string') {
                                    oneof = oneofs[fld["oneof"]];
                                    if (typeof oneof === 'undefined')
                                        throw Error("Illegal oneof in message "+obj.name+"#"+fld["name"]+": "+fld["oneof"]);
                                }
                                fld = new Reflect.Message.Field(this, obj, fld["rule"], fld["type"], fld["name"], fld["id"], fld["options"], oneof);
                                if (oneof)
                                    oneof.fields.push(fld);
                                obj.addChild(fld);
                            }
                        }
                        // Push enums and messages to stack
                        var subObj = [];
                        if (typeof def["enums"] !== 'undefined' && def['enums'].length > 0)
                            for (i=0; i<def["enums"].length; i++)
                                subObj.push(def["enums"][i]);
                        if (def["messages"] && def["messages"].length > 0)
                            for (i=0; i<def["messages"].length; i++)
                                subObj.push(def["messages"][i]);
                        // Set extension range
                        if (def["extensions"]) {
                            obj.extensions = def["extensions"];
                            if (obj.extensions[0] < ProtoBuf.ID_MIN)
                                obj.extensions[0] = ProtoBuf.ID_MIN;
                            if (obj.extensions[1] > ProtoBuf.ID_MAX)
                                obj.extensions[1] = ProtoBuf.ID_MAX;
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
                        obj = new Reflect.Enum(this, this.ptr, def["name"], def["options"]);
                        for (i=0; i<def["values"].length; i++)
                            obj.addChild(new Reflect.Enum.Value(this, obj, def["values"][i]["name"], def["values"][i]["id"]));
                        this.ptr.addChild(obj);
                        obj = null;
                    } else if (Builder.isValidService(def)) {
                        obj = new Reflect.Service(this, this.ptr, def["name"], def["options"]);
                        for (i in def["rpc"])
                            if (def["rpc"].hasOwnProperty(i))
                                obj.addChild(new Reflect.Service.RPCMethod(this, obj, i, def["rpc"][i]["request"], def["rpc"][i]["response"], def["rpc"][i]["options"]));
                        this.ptr.addChild(obj);
                        obj = null;
                    } else if (Builder.isValidExtend(def)) {
                        obj = this.ptr.resolve(def["ref"]);
                        if (obj) {
                            for (i=0; i<def["fields"].length; i++) { // i=Fields
                                if (obj.getChild(def['fields'][i]['id']) !== null)
                                    throw Error("Duplicate extended field id in message "+obj.name+": "+def['fields'][i]['id']);
                                if (def['fields'][i]['id'] < obj.extensions[0] || def['fields'][i]['id'] > obj.extensions[1])
                                    throw Error("Illegal extended field id in message "+obj.name+": "+def['fields'][i]['id']+" ("+obj.extensions.join(' to ')+" expected)");
                                // Convert extension field names to camel case notation if the override is set
                                var name = def["fields"][i]["name"];
                                if (this.options['convertFieldsToCamelCase'])
                                    name = Reflect.Message.Field._toCamelCase(def["fields"][i]["name"]);
                                // see #161: Extensions use their fully qualified name as their runtime key and...
                                fld = new Reflect.Message.ExtensionField(this, obj, def["fields"][i]["rule"], def["fields"][i]["type"], this.ptr.fqn()+'.'+name, def["fields"][i]["id"], def["fields"][i]["options"]);
                                // ...are added on top of the current namespace as an extension which is used for
                                // resolving their type later on (the extension always keeps the original name to
                                // prevent naming collisions)
                                var ext = new Reflect.Extension(this, this.ptr, def["fields"][i]["name"], fld);
                                fld.extension = ext;
                                this.ptr.addChild(ext);
                                obj.addChild(fld);
                            }
                        } else if (!/\.?google\.protobuf\./.test(def["ref"])) // Silently skip internal extensions
                            throw Error("Extended message "+def["ref"]+" is not defined");
                    } else
                        throw Error("Not a valid definition: "+JSON.stringify(def));
                    def = null;
                }
                // Break goes here
            } else
                throw Error("Not a valid namespace: "+JSON.stringify(defs));
            defs = null;
            this.ptr = this.ptr.parent; // This namespace is s done
        }
        this.resolved = false; // Require re-resolve
        this.result = null; // Require re-build
        return this;
    };

    /**
     * Imports another definition into this builder.
     * @param {Object.<string,*>} json Parsed import
     * @param {(string|{root: string, file: string})=} filename Imported file name
     * @return {ProtoBuf.Builder} this
     * @throws {Error} If the definition or file cannot be imported
     * @expose
     */
    BuilderPrototype["import"] = function(json, filename) {
        if (typeof filename === 'string') {
            if (ProtoBuf.Util.IS_NODE)
                filename = require("path")['resolve'](filename);
            if (this.files[filename] === true) {
                this.reset();
                return this; // Skip duplicate imports
            }
            this.files[filename] = true;
        }
        if (!!json['imports'] && json['imports'].length > 0) {
            var importRoot, delim = '/', resetRoot = false;
            if (typeof filename === 'object') { // If an import root is specified, override
                this.importRoot = filename["root"]; resetRoot = true; // ... and reset afterwards
                importRoot = this.importRoot;
                filename = filename["file"];
                if (importRoot.indexOf("\\") >= 0 || filename.indexOf("\\") >= 0) delim = '\\';
            } else if (typeof filename === 'string') {
                if (this.importRoot) // If import root is overridden, use it
                    importRoot = this.importRoot;
                else { // Otherwise compute from filename
                    if (filename.indexOf("/") >= 0) { // Unix
                        importRoot = filename.replace(/\/[^\/]*$/, "");
                        if (/* /file.proto */ importRoot === "")
                            importRoot = "/";
                    } else if (filename.indexOf("\\") >= 0) { // Windows
                        importRoot = filename.replace(/\\[^\\]*$/, "");
                        delim = '\\';
                    } else
                        importRoot = ".";
                }
            } else
                importRoot = null;

            for (var i=0; i<json['imports'].length; i++) {
                if (typeof json['imports'][i] === 'string') { // Import file
                    if (!importRoot)
                        throw Error("Cannot determine import root: File name is unknown");
                    var importFilename = json['imports'][i];
                    if (/^google\/protobuf\//.test(importFilename))
                        continue; // Not needed and therefore not used
                    importFilename = importRoot+delim+importFilename;
                    if (this.files[importFilename] === true)
                        continue; // Already imported
                    if (/\.proto$/i.test(importFilename) && !ProtoBuf.DotProto)     // If this is a NOPARSE build
                        importFilename = importFilename.replace(/\.proto$/, ".json"); // always load the JSON file
                    var contents = ProtoBuf.Util.fetch(importFilename);
                    if (contents === null)
                        throw Error("Failed to import '"+importFilename+"' in '"+filename+"': File not found");
                    if (/\.json$/i.test(importFilename)) // Always possible
                        this["import"](JSON.parse(contents+""), importFilename); // May throw
                    else
                        this["import"]((new ProtoBuf.DotProto.Parser(contents+"")).parse(), importFilename); // May throw
                } else // Import structure
                    if (!filename)
                        this["import"](json['imports'][i]);
                    else if (/\.(\w+)$/.test(filename)) // With extension: Append _importN to the name portion to make it unique
                        this["import"](json['imports'][i], filename.replace(/^(.+)\.(\w+)$/, function($0, $1, $2) { return $1+"_import"+i+"."+$2; }));
                    else // Without extension: Append _importN to make it unique
                        this["import"](json['imports'][i], filename+"_import"+i);
            }
            if (resetRoot) // Reset import root override when all imports are done
                this.importRoot = null;
        }
        if (json['messages']) {
            if (json['package'])
                this.define(json['package'], json["options"]);
            this.create(json['messages']);
            this.reset();
        }
        if (json['enums']) {
            if (json['package'])
                this.define(json['package'], json["options"]);
            this.create(json['enums']);
            this.reset();
        }
        if (json['services']) {
            if (json['package'])
                this.define(json['package'], json["options"]);
            this.create(json['services']);
            this.reset();
        }
        if (json['extends']) {
            if (json['package'])
                this.define(json['package'], json["options"]);
            this.create(json['extends']);
            this.reset();
        }
        return this;
    };

    /**
     * Tests if a definition is a valid service definition.
     * @param {Object} def Definition
     * @return {boolean} true if valid, else false
     * @expose
     */
    Builder.isValidService = function(def) {
        // Services require a string name and an rpc object
        return !(typeof def["name"] !== 'string' || !Lang.NAME.test(def["name"]) || typeof def["rpc"] !== 'object');
    };

    /**
     * Tests if a definition is a valid extension.
     * @param {Object} def Definition
     * @returns {boolean} true if valid, else false
     * @expose
    */
    Builder.isValidExtend = function(def) {
        if (typeof def["ref"] !== 'string' || !Lang.TYPEREF.test(def["ref"]))
            return false;
        var i;
        if (typeof def["fields"] !== 'undefined') {
            if (!ProtoBuf.Util.isArray(def["fields"]))
                return false;
            var ids = [], id; // IDs must be unique (does not yet test for the extended message's ids)
            for (i=0; i<def["fields"].length; i++) {
                if (!Builder.isValidMessageField(def["fields"][i]))
                    return false;
                id = parseInt(def["id"], 10);
                if (ids.indexOf(id) >= 0)
                    return false;
                ids.push(id);
            }
            ids = null;
        }
        return true;
    };

    /**
     * Resolves all namespace objects.
     * @throws {Error} If a type cannot be resolved
     * @expose
     */
    BuilderPrototype.resolveAll = function() {
        // Resolve all reflected objects
        var res;
        if (this.ptr == null || typeof this.ptr.type === 'object')
            return; // Done (already resolved)
        if (this.ptr instanceof Reflect.Namespace) {
            // Build all children
            var children = this.ptr.children;
            for (var i= 0, k=children.length; i<k; ++i)
                this.ptr = children[i],
                this.resolveAll();
        } else if (this.ptr instanceof Reflect.Message.Field) {
            if (!Lang.TYPE.test(this.ptr.type)) { // Resolve type...
                if (!Lang.TYPEREF.test(this.ptr.type))
                    throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
                res = (this.ptr instanceof Reflect.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, true);
                if (!res)
                    throw Error("Unresolvable type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
                this.ptr.resolvedType = res;
                if (res instanceof Reflect.Enum)
                    this.ptr.type = ProtoBuf.TYPES["enum"];
                else if (res instanceof Reflect.Message)
                    this.ptr.type = res.isGroup ? ProtoBuf.TYPES["group"] : ProtoBuf.TYPES["message"];
                else
                    throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
            } else
                this.ptr.type = ProtoBuf.TYPES[this.ptr.type];
        } else if (this.ptr instanceof ProtoBuf.Reflect.Enum.Value) {
            // No need to build enum values (built in enum)
        } else if (this.ptr instanceof ProtoBuf.Reflect.Service.Method) {
            if (this.ptr instanceof ProtoBuf.Reflect.Service.RPCMethod) {
                res = this.ptr.parent.resolve(this.ptr.requestName);
                if (!res || !(res instanceof ProtoBuf.Reflect.Message))
                    throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.requestName);
                this.ptr.resolvedRequestType = res;
                res = this.ptr.parent.resolve(this.ptr.responseName);
                if (!res || !(res instanceof ProtoBuf.Reflect.Message))
                    throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.responseName);
                this.ptr.resolvedResponseType = res;
            } else {
                // Should not happen as nothing else is implemented
                throw Error("Illegal service type in "+this.ptr.toString(true));
            }
        } else if (!(this.ptr instanceof ProtoBuf.Reflect.Message.OneOf) && !(this.ptr instanceof ProtoBuf.Reflect.Extension))
            throw Error("Illegal object in namespace: "+typeof(this.ptr)+":"+this.ptr);
        this.reset();
    };

    /**
     * Builds the protocol. This will first try to resolve all definitions and, if this has been successful,
     * return the built package.
     * @param {string=} path Specifies what to return. If omitted, the entire namespace will be returned.
     * @return {ProtoBuf.Builder.Message|Object.<string,*>}
     * @throws {Error} If a type could not be resolved
     * @expose
     */
    BuilderPrototype.build = function(path) {
        this.reset();
        if (!this.resolved)
            this.resolveAll(),
            this.resolved = true,
            this.result = null; // Require re-build
        if (this.result == null) // (Re-)Build
            this.result = this.ns.build();
        if (!path)
            return this.result;
        else {
            var part = path.split(".");
            var ptr = this.result; // Build namespace pointer (no hasChild etc.)
            for (var i=0; i<part.length; i++)
                if (ptr[part[i]])
                    ptr = ptr[part[i]];
                else {
                    ptr = null;
                    break;
                }
            return ptr;
        }
    };

    /**
     * Similar to {@link ProtoBuf.Builder#build}, but looks up the internal reflection descriptor.
     * @param {string=} path Specifies what to return. If omitted, the entire namespace wiil be returned.
     * @return {ProtoBuf.Reflect.T} Reflection descriptor or `null` if not found
     */
    BuilderPrototype.lookup = function(path) {
        return path ? this.ns.resolve(path) : this.ns;
    };

    /**
     * Returns a string representation of this object.
     * @return {string} String representation as of "Builder"
     * @expose
     */
    BuilderPrototype.toString = function() {
        return "Builder";
    };

    // Pseudo types documented in Reflect.js.
    // Exist for the sole purpose of being able to "... instanceof ProtoBuf.Builder.Message" etc.
    Builder.Message = function() {};
    Builder.Service = function() {};
    
    return Builder;
    
})(ProtoBuf, ProtoBuf.Lang, ProtoBuf.Reflect);
