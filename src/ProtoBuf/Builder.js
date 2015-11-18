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

    // ----- Definition tests -----

    /**
     * Tests if a definition most likely describes a message.
     * @param {!Object} def
     * @returns {boolean}
     * @expose
     */
    Builder.isMessage = function(def) {
        // Messages require a string name
        if (typeof def["name"] !== 'string')
            return false;
        // Messages do not contain values (enum) or rpc methods (service)
        if (typeof def["values"] !== 'undefined' || typeof def["rpc"] !== 'undefined')
            return false;
        return true;
    };

    /**
     * Tests if a definition most likely describes a message field.
     * @param {!Object} def
     * @returns {boolean}
     * @expose
     */
    Builder.isMessageField = function(def) {
        // Message fields require a string rule, name and type and an id
        if (typeof def["rule"] !== 'string' || typeof def["name"] !== 'string' || typeof def["type"] !== 'string' || typeof def["id"] === 'undefined')
            return false;
        return true;
    };

    /**
     * Tests if a definition most likely describes an enum.
     * @param {!Object} def
     * @returns {boolean}
     * @expose
     */
    Builder.isEnum = function(def) {
        // Enums require a string name
        if (typeof def["name"] !== 'string')
            return false;
        // Enums require at least one value
        if (typeof def["values"] === 'undefined' || !Array.isArray(def["values"]) || def["values"].length === 0)
            return false;
        return true;
    };

    /**
     * Tests if a definition most likely describes a service.
     * @param {!Object} def
     * @returns {boolean}
     * @expose
     */
    Builder.isService = function(def) {
        // Services require a string name and an rpc object
        if (typeof def["name"] !== 'string' || typeof def["rpc"] !== 'object' || !def["rpc"])
            return false;
        return true;
    };

    /**
     * Tests if a definition most likely describes an extended message
     * @param {!Object} def
     * @returns {boolean}
     * @expose
     */
    Builder.isExtend = function(def) {
        // Extends rquire a string ref
        if (typeof def["ref"] !== 'string')
            return false;
        return true;
    };

    // ----- Building -----

    /**
     * Resets the pointer to the root namespace.
     * @returns {!ProtoBuf.Builder} this
     * @expose
     */
    BuilderPrototype.reset = function() {
        this.ptr = this.ns;
        return this;
    };

    /**
     * Defines a namespace on top of the current pointer position and places the pointer on it.
     * @param {string} namespace
     * @return {!ProtoBuf.Builder} this
     * @expose
     */
    BuilderPrototype.define = function(namespace) {
        if (typeof namespace !== 'string' || !Lang.TYPEREF.test(namespace))
            throw Error("illegal namespace: "+namespace);
        namespace.split(".").forEach(function(part) {
            var ns = this.ptr.getChild(part);
            if (ns === null) // Keep existing
                this.ptr.addChild(ns = new Reflect.Namespace(this, this.ptr, part));
            this.ptr = ns;
        }, this);
        return this;
    };

    /**
     * Creates the specified definitions at the current pointer position.
     * @param {!Array.<!Object>} defs Messages, enums or services to create
     * @returns {!ProtoBuf.Builder} this
     * @throws {Error} If a message definition is invalid
     * @expose
     */
    BuilderPrototype.create = function(defs) {
        if (!defs)
            return this; // Nothing to create
        if (!Array.isArray(defs))
            defs = [defs];
        else {
            if (defs.length === 0)
                return this;
            defs = defs.slice();
        }

        // It's quite hard to keep track of scopes and memory here, so let's do this iteratively.
        var stack = [defs];
        while (stack.length > 0) {
            defs = stack.pop();

            if (!Array.isArray(defs)) // Stack always contains entire namespaces
                throw Error("not a valid namespace: "+JSON.stringify(defs));

            while (defs.length > 0) {
                var def = defs.shift(); // Namespaces always contain an array of messages, enums and services

                if (Builder.isMessage(def)) {
                    var obj = new Reflect.Message(this, this.ptr, def["name"], def["options"], def["isGroup"], def["syntax"]);

                    // Create OneOfs
                    var oneofs = {};
                    if (def["oneofs"])
                        Object.keys(def["oneofs"]).forEach(function(name) {
                            obj.addChild(oneofs[name] = new Reflect.Message.OneOf(this, obj, name));
                        }, this);

                    // Create fields
                    if (def["fields"])
                        def["fields"].forEach(function(fld) {
                            if (obj.getChild(fld["id"]|0) !== null)
                                throw Error("duplicate or invalid field id in "+obj.name+": "+fld['id']);
                            if (fld["options"] && typeof fld["options"] !== 'object')
                                throw Error("illegal field options in "+obj.name+"#"+fld["name"]);
                            var oneof = null;
                            if (typeof fld["oneof"] === 'string' && !(oneof = oneofs[fld["oneof"]]))
                                throw Error("illegal oneof in "+obj.name+"#"+fld["name"]+": "+fld["oneof"]);
                            fld = new Reflect.Message.Field(this, obj, fld["rule"], fld["keytype"], fld["type"], fld["name"], fld["id"], fld["options"], oneof, def["syntax"]);
                            if (oneof)
                                oneof.fields.push(fld);
                            obj.addChild(fld);
                        }, this);

                    // Push children to stack
                    var subObj = [];
                    if (def["enums"])
                        def["enums"].forEach(function(enm) {
                            subObj.push(enm);
                        });
                    if (def["messages"])
                        def["messages"].forEach(function(msg) {
                            subObj.push(msg);
                        });
                    if (def["services"])
                        def["services"].forEach(function(svc) {
                            subObj.push(svc);
                        });

                    // Set extension ranges
                    if (def["extensions"]) {
                        if (typeof def["extensions"][0] === 'number') // pre 5.0.1
                            obj.extensions = [ def["extensions"] ];
                        else
                            obj.extensions = def["extensions"];
                    }

                    // Create on top of current namespace
                    this.ptr.addChild(obj);
                    if (subObj.length > 0) {
                        stack.push(defs); // Push the current level back
                        defs = subObj; // Continue processing sub level
                        subObj = null;
                        this.ptr = obj; // And move the pointer to this namespace
                        obj = null;
                        continue;
                    }
                    subObj = null;

                } else if (Builder.isEnum(def)) {

                    obj = new Reflect.Enum(this, this.ptr, def["name"], def["options"], def["syntax"]);
                    def["values"].forEach(function(val) {
                        obj.addChild(new Reflect.Enum.Value(this, obj, val["name"], val["id"]));
                    }, this);
                    this.ptr.addChild(obj);

                } else if (Builder.isService(def)) {

                    obj = new Reflect.Service(this, this.ptr, def["name"], def["options"]);
                    Object.keys(def["rpc"]).forEach(function(name) {
                        var mtd = def["rpc"][name];
                        obj.addChild(new Reflect.Service.RPCMethod(this, obj, name, mtd["request"], mtd["response"], !!mtd["request_stream"], !!mtd["response_stream"], mtd["options"]));
                    }, this);
                    this.ptr.addChild(obj);

                } else if (Builder.isExtend(def)) {

                    obj = this.ptr.resolve(def["ref"], true);
                    if (obj) {
                        def["fields"].forEach(function(fld) {
                            if (obj.getChild(fld['id']|0) !== null)
                                throw Error("duplicate extended field id in "+obj.name+": "+fld['id']);
                            // Check if field id is allowed to be extended
                            if (obj.extensions) {
                                var valid = false;
                                obj.extensions.forEach(function(range) {
                                    if (fld["id"] >= range[0] && fld["id"] <= range[1])
                                        valid = true;
                                });
                                if (!valid)
                                    throw Error("illegal extended field id in "+obj.name+": "+fld['id']+" (not within valid ranges)");
                            }
                            // Convert extension field names to camel case notation if the override is set
                            var name = fld["name"];
                            if (this.options['convertFieldsToCamelCase'])
                                name = ProtoBuf.Util.toCamelCase(name);
                            // see #161: Extensions use their fully qualified name as their runtime key and...
                            var field = new Reflect.Message.ExtensionField(this, obj, fld["rule"], fld["type"], this.ptr.fqn()+'.'+name, fld["id"], fld["options"]);
                            // ...are added on top of the current namespace as an extension which is used for
                            // resolving their type later on (the extension always keeps the original name to
                            // prevent naming collisions)
                            var ext = new Reflect.Extension(this, this.ptr, fld["name"], field);
                            field.extension = ext;
                            this.ptr.addChild(ext);
                            obj.addChild(field);
                        }, this);

                    } else if (!/\.?google\.protobuf\./.test(def["ref"])) // Silently skip internal extensions
                        throw Error("extended message "+def["ref"]+" is not defined");

                } else
                    throw Error("not a valid definition: "+JSON.stringify(def));

                def = null;
                obj = null;
            }
            // Break goes here
            defs = null;
            this.ptr = this.ptr.parent; // Namespace done, continue at parent
        }
        this.resolved = false; // Require re-resolve
        this.result = null; // Require re-build
        return this;
    };

    /**
     * Propagates syntax to all children.
     * @param {!Object} parent
     * @inner
     */
    function propagateSyntax(parent) {
        if (parent['messages']) {
            parent['messages'].forEach(function(child) {
                child["syntax"] = parent["syntax"];
                propagateSyntax(child);
            });
        }
        if (parent['enums']) {
            parent['enums'].forEach(function(child) {
                child["syntax"] = parent["syntax"];
            });
        }
    }

    /**
     * Imports another definition into this builder.
     * @param {Object.<string,*>} json Parsed import
     * @param {(string|{root: string, file: string})=} filename Imported file name
     * @returns {!ProtoBuf.Builder} this
     * @throws {Error} If the definition or file cannot be imported
     * @expose
     */
    BuilderPrototype["import"] = function(json, filename) {
        var delim = '/';

        // Make sure to skip duplicate imports

        if (typeof filename === 'string') {

            if (ProtoBuf.Util.IS_NODE)
                filename = require("path")['resolve'](filename);
            if (this.files[filename] === true)
                return this.reset();
            this.files[filename] = true;

        } else if (typeof filename === 'object') { // Object with root, file.

            var root = filename.root;
            if (ProtoBuf.Util.IS_NODE)
                root = require("path")['resolve'](root);
            if (root.indexOf("\\") >= 0 || filename.file.indexOf("\\") >= 0)
                delim = '\\';
            var fname = root + delim + filename.file;
            if (this.files[fname] === true)
                return this.reset();
            this.files[fname] = true;
        }

        // Import imports

        if (json['imports'] && json['imports'].length > 0) {
            var importRoot,
                resetRoot = false;

            if (typeof filename === 'object') { // If an import root is specified, override

                this.importRoot = filename["root"]; resetRoot = true; // ... and reset afterwards
                importRoot = this.importRoot;
                filename = filename["file"];
                if (importRoot.indexOf("\\") >= 0 || filename.indexOf("\\") >= 0)
                    delim = '\\';

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
                        throw Error("cannot determine import root");
                    var importFilename = json['imports'][i];
                    if (importFilename === "google/protobuf/descriptor.proto")
                        continue; // Not needed and therefore not used
                    importFilename = importRoot + delim + importFilename;
                    if (this.files[importFilename] === true)
                        continue; // Already imported
                    if (/\.proto$/i.test(importFilename) && !ProtoBuf.DotProto)       // If this is a light build
                        importFilename = importFilename.replace(/\.proto$/, ".json"); // always load the JSON file
                    var contents = ProtoBuf.Util.fetch(importFilename);
                    if (contents === null)
                        throw Error("failed to import '"+importFilename+"' in '"+filename+"': file not found");
                    if (/\.json$/i.test(importFilename)) // Always possible
                        this["import"](JSON.parse(contents+""), importFilename); // May throw
                    else
                        this["import"](ProtoBuf.DotProto.Parser.parse(contents), importFilename); // May throw
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

        // Import structures

        if (json['package'])
            this.define(json['package']);
        if (json['syntax'])
            propagateSyntax(json);
        var base = this.ptr;
        if (json['options'])
            Object.keys(json['options']).forEach(function(key) {
                base.options[key] = json['options'][key];
            });
        if (json['messages'])
            this.create(json['messages']),
            this.ptr = base;
        if (json['enums'])
            this.create(json['enums']),
            this.ptr = base;
        if (json['services'])
            this.create(json['services']),
            this.ptr = base;
        if (json['extends'])
            this.create(json['extends']);

        return this.reset();
    };

    /**
     * Resolves all namespace objects.
     * @throws {Error} If a type cannot be resolved
     * @returns {!ProtoBuf.Builder} this
     * @expose
     */
    BuilderPrototype.resolveAll = function() {
        // Resolve all reflected objects
        var res;
        if (this.ptr == null || typeof this.ptr.type === 'object')
            return this; // Done (already resolved)

        if (this.ptr instanceof Reflect.Namespace) { // Resolve children

            this.ptr.children.forEach(function(child) {
                this.ptr = child;
                this.resolveAll();
            }, this);

        } else if (this.ptr instanceof Reflect.Message.Field) { // Resolve type

            if (!Lang.TYPE.test(this.ptr.type)) {
                if (!Lang.TYPEREF.test(this.ptr.type))
                    throw Error("illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
                res = (this.ptr instanceof Reflect.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, true);
                if (!res)
                    throw Error("unresolvable type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
                this.ptr.resolvedType = res;
                if (res instanceof Reflect.Enum) {
                    this.ptr.type = ProtoBuf.TYPES["enum"];
                    if (this.ptr.syntax === 'proto3' && res.syntax !== 'proto3')
                        throw Error("proto3 message cannot reference proto2 enum");
                }
                else if (res instanceof Reflect.Message)
                    this.ptr.type = res.isGroup ? ProtoBuf.TYPES["group"] : ProtoBuf.TYPES["message"];
                else
                    throw Error("illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
            } else
                this.ptr.type = ProtoBuf.TYPES[this.ptr.type];

            // If it's a map field, also resolve the key type. The key type can be only a numeric, string, or bool type
            // (i.e., no enums or messages), so we don't need to resolve against the current namespace.
            if (this.ptr.map) {
                if (!Lang.TYPE.test(this.ptr.keyType))
                    throw Error("illegal key type for map field in "+this.ptr.toString(true)+": "+this.ptr.keyType);
                this.ptr.keyType = ProtoBuf.TYPES[this.ptr.keyType];
            }

        } else if (this.ptr instanceof ProtoBuf.Reflect.Service.Method) {

            if (this.ptr instanceof ProtoBuf.Reflect.Service.RPCMethod) {
                res = this.ptr.parent.resolve(this.ptr.requestName, true);
                if (!res || !(res instanceof ProtoBuf.Reflect.Message))
                    throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.requestName);
                this.ptr.resolvedRequestType = res;
                res = this.ptr.parent.resolve(this.ptr.responseName, true);
                if (!res || !(res instanceof ProtoBuf.Reflect.Message))
                    throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.responseName);
                this.ptr.resolvedResponseType = res;
            } else // Should not happen as nothing else is implemented
                throw Error("illegal service type in "+this.ptr.toString(true));

        } else if (
            !(this.ptr instanceof ProtoBuf.Reflect.Message.OneOf) && // Not built
            !(this.ptr instanceof ProtoBuf.Reflect.Extension) && // Not built
            !(this.ptr instanceof ProtoBuf.Reflect.Enum.Value) // Built in enum
        )
            throw Error("illegal object in namespace: "+typeof(this.ptr)+": "+this.ptr);

        return this.reset();
    };

    /**
     * Builds the protocol. This will first try to resolve all definitions and, if this has been successful,
     * return the built package.
     * @param {(string|Array.<string>)=} path Specifies what to return. If omitted, the entire namespace will be returned.
     * @returns {!ProtoBuf.Builder.Message|!Object.<string,*>}
     * @throws {Error} If a type could not be resolved
     * @expose
     */
    BuilderPrototype.build = function(path) {
        this.reset();
        if (!this.resolved)
            this.resolveAll(),
            this.resolved = true,
            this.result = null; // Require re-build
        if (this.result === null) // (Re-)Build
            this.result = this.ns.build();
        if (!path)
            return this.result;
        var part = typeof path === 'string' ? path.split(".") : path,
            ptr = this.result; // Build namespace pointer (no hasChild etc.)
        for (var i=0; i<part.length; i++)
            if (ptr[part[i]])
                ptr = ptr[part[i]];
            else {
                ptr = null;
                break;
            }
        return ptr;
    };

    /**
     * Similar to {@link ProtoBuf.Builder#build}, but looks up the internal reflection descriptor.
     * @param {string=} path Specifies what to return. If omitted, the entire namespace wiil be returned.
     * @param {boolean=} excludeNonNamespace Excludes non-namespace types like fields, defaults to `false`
     * @returns {?ProtoBuf.Reflect.T} Reflection descriptor or `null` if not found
     */
    BuilderPrototype.lookup = function(path, excludeNonNamespace) {
        return path ? this.ns.resolve(path, excludeNonNamespace) : this.ns;
    };

    /**
     * Returns a string representation of this object.
     * @return {string} String representation as of "Builder"
     * @expose
     */
    BuilderPrototype.toString = function() {
        return "Builder";
    };

    // ----- Base classes -----
    // Exist for the sole purpose of being able to "... instanceof ProtoBuf.Builder.Message" etc.

    /**
     * @alias ProtoBuf.Builder.Message
     */
    Builder.Message = function() {};

    /**
     * @alias ProtoBuf.Builder.Enum
     */
    Builder.Enum = function() {};

    /**
     * @alias ProtoBuf.Builder.Message
     */
    Builder.Service = function() {};

    return Builder;

})(ProtoBuf, ProtoBuf.Lang, ProtoBuf.Reflect);
