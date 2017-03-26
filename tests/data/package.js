/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("../../minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots.test_package || ($protobuf.roots.test_package = {});

$root.Package = (function() {

    /**
     * Properties of a Package.
     * @typedef Package$Properties
     * @type {Object}
     * @property {string} [name] Package name.
     * @property {string} [version] Package version.
     * @property {string} [versionScheme] Package versionScheme.
     * @property {string} [description] Package description.
     * @property {string} [author] Package author.
     * @property {string} [license] Package license.
     * @property {Package.Repository$Properties} [repository] Package repository.
     * @property {string} [bugs] Package bugs.
     * @property {string} [homepage] Package homepage.
     * @property {Array.<string>} [keywords] Package keywords.
     * @property {string} [main] Package main.
     * @property {Object.<string,string>} [bin] Package bin.
     * @property {Object.<string,string>} [scripts] Package scripts.
     * @property {Object.<string,string>} [dependencies] Package dependencies.
     * @property {Object.<string,string>} [optionalDependencies] Package optionalDependencies.
     * @property {Object.<string,string>} [devDependencies] Package devDependencies.
     * @property {string} [types] Package types.
     * @property {Array.<string>} [cliDependencies] Package cliDependencies.
     */

    /**
     * Constructs a new Package.
     * @exports Package
     * @constructor
     * @param {Package$Properties=} [properties] Properties to set
     */
    function Package(properties) {
        this.keywords = [];
        this.bin = {};
        this.scripts = {};
        this.dependencies = {};
        this.optionalDependencies = {};
        this.devDependencies = {};
        this.cliDependencies = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
    }

    /**
     * Package name.
     * @type {string|undefined}
     */
    Package.prototype.name = "";

    /**
     * Package version.
     * @type {string|undefined}
     */
    Package.prototype.version = "";

    /**
     * Package versionScheme.
     * @type {string|undefined}
     */
    Package.prototype.versionScheme = "";

    /**
     * Package description.
     * @type {string|undefined}
     */
    Package.prototype.description = "";

    /**
     * Package author.
     * @type {string|undefined}
     */
    Package.prototype.author = "";

    /**
     * Package license.
     * @type {string|undefined}
     */
    Package.prototype.license = "";

    /**
     * Package repository.
     * @type {Package.Repository$Properties|undefined}
     */
    Package.prototype.repository = null;

    /**
     * Package bugs.
     * @type {string|undefined}
     */
    Package.prototype.bugs = "";

    /**
     * Package homepage.
     * @type {string|undefined}
     */
    Package.prototype.homepage = "";

    /**
     * Package keywords.
     * @type {Array.<string>|undefined}
     */
    Package.prototype.keywords = $util.emptyArray;

    /**
     * Package main.
     * @type {string|undefined}
     */
    Package.prototype.main = "";

    /**
     * Package bin.
     * @type {Object.<string,string>|undefined}
     */
    Package.prototype.bin = $util.emptyObject;

    /**
     * Package scripts.
     * @type {Object.<string,string>|undefined}
     */
    Package.prototype.scripts = $util.emptyObject;

    /**
     * Package dependencies.
     * @type {Object.<string,string>|undefined}
     */
    Package.prototype.dependencies = $util.emptyObject;

    /**
     * Package optionalDependencies.
     * @type {Object.<string,string>|undefined}
     */
    Package.prototype.optionalDependencies = $util.emptyObject;

    /**
     * Package devDependencies.
     * @type {Object.<string,string>|undefined}
     */
    Package.prototype.devDependencies = $util.emptyObject;

    /**
     * Package types.
     * @type {string|undefined}
     */
    Package.prototype.types = "";

    /**
     * Package cliDependencies.
     * @type {Array.<string>|undefined}
     */
    Package.prototype.cliDependencies = $util.emptyArray;

    /**
     * Creates a new Package instance using the specified properties.
     * @param {Package$Properties=} [properties] Properties to set
     * @returns {Package} Package instance
     */
    Package.create = function create(properties) {
        return new Package(properties);
    };

    /**
     * Encodes the specified Package message. Does not implicitly {@link Package.verify|verify} messages.
     * @param {Package$Properties} message Package message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Package.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.version != null && message.hasOwnProperty("version"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.version);
        if (message.description != null && message.hasOwnProperty("description"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
        if (message.author != null && message.hasOwnProperty("author"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.author);
        if (message.license != null && message.hasOwnProperty("license"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.license);
        if (message.repository && message.hasOwnProperty("repository"))
            $root.Package.Repository.encode(message.repository, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.bugs != null && message.hasOwnProperty("bugs"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.bugs);
        if (message.homepage != null && message.hasOwnProperty("homepage"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.homepage);
        if (message.keywords && message.keywords.length)
            for (var i = 0; i < message.keywords.length; ++i)
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.keywords[i]);
        if (message.main != null && message.hasOwnProperty("main"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.main);
        if (message.bin && message.hasOwnProperty("bin"))
            for (var keys = Object.keys(message.bin), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 11, wireType 2 =*/90).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.bin[keys[i]]).ldelim();
        if (message.scripts && message.hasOwnProperty("scripts"))
            for (var keys = Object.keys(message.scripts), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 12, wireType 2 =*/98).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.scripts[keys[i]]).ldelim();
        if (message.dependencies && message.hasOwnProperty("dependencies"))
            for (var keys = Object.keys(message.dependencies), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 13, wireType 2 =*/106).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.dependencies[keys[i]]).ldelim();
        if (message.optionalDependencies && message.hasOwnProperty("optionalDependencies"))
            for (var keys = Object.keys(message.optionalDependencies), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 14, wireType 2 =*/114).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.optionalDependencies[keys[i]]).ldelim();
        if (message.devDependencies && message.hasOwnProperty("devDependencies"))
            for (var keys = Object.keys(message.devDependencies), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 15, wireType 2 =*/122).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.devDependencies[keys[i]]).ldelim();
        if (message.types != null && message.hasOwnProperty("types"))
            writer.uint32(/* id 17, wireType 2 =*/138).string(message.types);
        if (message.cliDependencies && message.cliDependencies.length)
            for (var i = 0; i < message.cliDependencies.length; ++i)
                writer.uint32(/* id 18, wireType 2 =*/146).string(message.cliDependencies[i]);
        if (message.versionScheme != null && message.hasOwnProperty("versionScheme"))
            writer.uint32(/* id 19, wireType 2 =*/154).string(message.versionScheme);
        return writer;
    };

    /**
     * Encodes the specified Package message, length delimited. Does not implicitly {@link Package.verify|verify} messages.
     * @param {Package$Properties} message Package message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Package.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Package message from the specified reader or buffer.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Package} Package
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Package.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Package(), key;
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            case 2:
                message.version = reader.string();
                break;
            case 19:
                message.versionScheme = reader.string();
                break;
            case 3:
                message.description = reader.string();
                break;
            case 4:
                message.author = reader.string();
                break;
            case 5:
                message.license = reader.string();
                break;
            case 6:
                message.repository = $root.Package.Repository.decode(reader, reader.uint32());
                break;
            case 7:
                message.bugs = reader.string();
                break;
            case 8:
                message.homepage = reader.string();
                break;
            case 9:
                if (!(message.keywords && message.keywords.length))
                    message.keywords = [];
                message.keywords.push(reader.string());
                break;
            case 10:
                message.main = reader.string();
                break;
            case 11:
                reader.skip().pos++;
                if (message.bin === $util.emptyObject)
                    message.bin = {};
                key = reader.string();
                reader.pos++;
                message.bin[key] = reader.string();
                break;
            case 12:
                reader.skip().pos++;
                if (message.scripts === $util.emptyObject)
                    message.scripts = {};
                key = reader.string();
                reader.pos++;
                message.scripts[key] = reader.string();
                break;
            case 13:
                reader.skip().pos++;
                if (message.dependencies === $util.emptyObject)
                    message.dependencies = {};
                key = reader.string();
                reader.pos++;
                message.dependencies[key] = reader.string();
                break;
            case 14:
                reader.skip().pos++;
                if (message.optionalDependencies === $util.emptyObject)
                    message.optionalDependencies = {};
                key = reader.string();
                reader.pos++;
                message.optionalDependencies[key] = reader.string();
                break;
            case 15:
                reader.skip().pos++;
                if (message.devDependencies === $util.emptyObject)
                    message.devDependencies = {};
                key = reader.string();
                reader.pos++;
                message.devDependencies[key] = reader.string();
                break;
            case 17:
                message.types = reader.string();
                break;
            case 18:
                if (!(message.cliDependencies && message.cliDependencies.length))
                    message.cliDependencies = [];
                message.cliDependencies.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Package message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Package} Package
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Package.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Package message.
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    Package.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null)
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.version != null)
            if (!$util.isString(message.version))
                return "version: string expected";
        if (message.versionScheme != null)
            if (!$util.isString(message.versionScheme))
                return "versionScheme: string expected";
        if (message.description != null)
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.author != null)
            if (!$util.isString(message.author))
                return "author: string expected";
        if (message.license != null)
            if (!$util.isString(message.license))
                return "license: string expected";
        if (message.repository != null) {
            var error = $root.Package.Repository.verify(message.repository);
            if (error)
                return "repository." + error;
        }
        if (message.bugs != null)
            if (!$util.isString(message.bugs))
                return "bugs: string expected";
        if (message.homepage != null)
            if (!$util.isString(message.homepage))
                return "homepage: string expected";
        if (message.keywords != null) {
            if (!Array.isArray(message.keywords))
                return "keywords: array expected";
            for (var i = 0; i < message.keywords.length; ++i)
                if (!$util.isString(message.keywords[i]))
                    return "keywords: string[] expected";
        }
        if (message.main != null)
            if (!$util.isString(message.main))
                return "main: string expected";
        if (message.bin != null) {
            if (!$util.isObject(message.bin))
                return "bin: object expected";
            var key = Object.keys(message.bin);
            for (var i = 0; i < key.length; ++i)
                if (!$util.isString(message.bin[key[i]]))
                    return "bin: string{k:string} expected";
        }
        if (message.scripts != null) {
            if (!$util.isObject(message.scripts))
                return "scripts: object expected";
            var key = Object.keys(message.scripts);
            for (var i = 0; i < key.length; ++i)
                if (!$util.isString(message.scripts[key[i]]))
                    return "scripts: string{k:string} expected";
        }
        if (message.dependencies != null) {
            if (!$util.isObject(message.dependencies))
                return "dependencies: object expected";
            var key = Object.keys(message.dependencies);
            for (var i = 0; i < key.length; ++i)
                if (!$util.isString(message.dependencies[key[i]]))
                    return "dependencies: string{k:string} expected";
        }
        if (message.optionalDependencies != null) {
            if (!$util.isObject(message.optionalDependencies))
                return "optionalDependencies: object expected";
            var key = Object.keys(message.optionalDependencies);
            for (var i = 0; i < key.length; ++i)
                if (!$util.isString(message.optionalDependencies[key[i]]))
                    return "optionalDependencies: string{k:string} expected";
        }
        if (message.devDependencies != null) {
            if (!$util.isObject(message.devDependencies))
                return "devDependencies: object expected";
            var key = Object.keys(message.devDependencies);
            for (var i = 0; i < key.length; ++i)
                if (!$util.isString(message.devDependencies[key[i]]))
                    return "devDependencies: string{k:string} expected";
        }
        if (message.types != null)
            if (!$util.isString(message.types))
                return "types: string expected";
        if (message.cliDependencies != null) {
            if (!Array.isArray(message.cliDependencies))
                return "cliDependencies: array expected";
            for (var i = 0; i < message.cliDependencies.length; ++i)
                if (!$util.isString(message.cliDependencies[i]))
                    return "cliDependencies: string[] expected";
        }
        return null;
    };

    /**
     * Creates a Package message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {Package} Package
     */
    Package.fromObject = function fromObject(object) {
        if (object instanceof $root.Package)
            return object;
        var message = new $root.Package();
        if (object.name != null)
            message.name = String(object.name);
        if (object.version != null)
            message.version = String(object.version);
        if (object.versionScheme != null)
            message.versionScheme = String(object.versionScheme);
        if (object.description != null)
            message.description = String(object.description);
        if (object.author != null)
            message.author = String(object.author);
        if (object.license != null)
            message.license = String(object.license);
        if (object.repository != null) {
            if (typeof object.repository !== "object")
                throw TypeError(".Package.repository: object expected");
            message.repository = $root.Package.Repository.fromObject(object.repository);
        }
        if (object.bugs != null)
            message.bugs = String(object.bugs);
        if (object.homepage != null)
            message.homepage = String(object.homepage);
        if (object.keywords) {
            if (!Array.isArray(object.keywords))
                throw TypeError(".Package.keywords: array expected");
            message.keywords = [];
            for (var i = 0; i < object.keywords.length; ++i)
                message.keywords[i] = String(object.keywords[i]);
        }
        if (object.main != null)
            message.main = String(object.main);
        if (object.bin) {
            if (typeof object.bin !== "object")
                throw TypeError(".Package.bin: object expected");
            message.bin = {};
            for (var keys = Object.keys(object.bin), i = 0; i < keys.length; ++i)
                message.bin[keys[i]] = String(object.bin[keys[i]]);
        }
        if (object.scripts) {
            if (typeof object.scripts !== "object")
                throw TypeError(".Package.scripts: object expected");
            message.scripts = {};
            for (var keys = Object.keys(object.scripts), i = 0; i < keys.length; ++i)
                message.scripts[keys[i]] = String(object.scripts[keys[i]]);
        }
        if (object.dependencies) {
            if (typeof object.dependencies !== "object")
                throw TypeError(".Package.dependencies: object expected");
            message.dependencies = {};
            for (var keys = Object.keys(object.dependencies), i = 0; i < keys.length; ++i)
                message.dependencies[keys[i]] = String(object.dependencies[keys[i]]);
        }
        if (object.optionalDependencies) {
            if (typeof object.optionalDependencies !== "object")
                throw TypeError(".Package.optionalDependencies: object expected");
            message.optionalDependencies = {};
            for (var keys = Object.keys(object.optionalDependencies), i = 0; i < keys.length; ++i)
                message.optionalDependencies[keys[i]] = String(object.optionalDependencies[keys[i]]);
        }
        if (object.devDependencies) {
            if (typeof object.devDependencies !== "object")
                throw TypeError(".Package.devDependencies: object expected");
            message.devDependencies = {};
            for (var keys = Object.keys(object.devDependencies), i = 0; i < keys.length; ++i)
                message.devDependencies[keys[i]] = String(object.devDependencies[keys[i]]);
        }
        if (object.types != null)
            message.types = String(object.types);
        if (object.cliDependencies) {
            if (!Array.isArray(object.cliDependencies))
                throw TypeError(".Package.cliDependencies: array expected");
            message.cliDependencies = [];
            for (var i = 0; i < object.cliDependencies.length; ++i)
                message.cliDependencies[i] = String(object.cliDependencies[i]);
        }
        return message;
    };

    /**
     * Creates a Package message from a plain object. Also converts values to their respective internal types.
     * This is an alias of {@link Package.fromObject}.
     * @function
     * @param {Object.<string,*>} object Plain object
     * @returns {Package} Package
     */
    Package.from = Package.fromObject;

    /**
     * Creates a plain object from a Package message. Also converts values to other types if specified.
     * @param {Package} message Package
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Package.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.keywords = [];
            object.cliDependencies = [];
        }
        if (options.objects || options.defaults) {
            object.bin = {};
            object.scripts = {};
            object.dependencies = {};
            object.optionalDependencies = {};
            object.devDependencies = {};
        }
        if (options.defaults) {
            object.name = "";
            object.version = "";
            object.description = "";
            object.author = "";
            object.license = "";
            object.repository = null;
            object.bugs = "";
            object.homepage = "";
            object.main = "";
            object.types = "";
            object.versionScheme = "";
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.author != null && message.hasOwnProperty("author"))
            object.author = message.author;
        if (message.license != null && message.hasOwnProperty("license"))
            object.license = message.license;
        if (message.repository != null && message.hasOwnProperty("repository"))
            object.repository = $root.Package.Repository.toObject(message.repository, options);
        if (message.bugs != null && message.hasOwnProperty("bugs"))
            object.bugs = message.bugs;
        if (message.homepage != null && message.hasOwnProperty("homepage"))
            object.homepage = message.homepage;
        if (message.keywords && message.keywords.length) {
            object.keywords = [];
            for (var j = 0; j < message.keywords.length; ++j)
                object.keywords[j] = message.keywords[j];
        }
        if (message.main != null && message.hasOwnProperty("main"))
            object.main = message.main;
        var keys2;
        if (message.bin && (keys2 = Object.keys(message.bin)).length) {
            object.bin = {};
            for (var j = 0; j < keys2.length; ++j)
                object.bin[keys2[j]] = message.bin[keys2[j]];
        }
        if (message.scripts && (keys2 = Object.keys(message.scripts)).length) {
            object.scripts = {};
            for (var j = 0; j < keys2.length; ++j)
                object.scripts[keys2[j]] = message.scripts[keys2[j]];
        }
        if (message.dependencies && (keys2 = Object.keys(message.dependencies)).length) {
            object.dependencies = {};
            for (var j = 0; j < keys2.length; ++j)
                object.dependencies[keys2[j]] = message.dependencies[keys2[j]];
        }
        if (message.optionalDependencies && (keys2 = Object.keys(message.optionalDependencies)).length) {
            object.optionalDependencies = {};
            for (var j = 0; j < keys2.length; ++j)
                object.optionalDependencies[keys2[j]] = message.optionalDependencies[keys2[j]];
        }
        if (message.devDependencies && (keys2 = Object.keys(message.devDependencies)).length) {
            object.devDependencies = {};
            for (var j = 0; j < keys2.length; ++j)
                object.devDependencies[keys2[j]] = message.devDependencies[keys2[j]];
        }
        if (message.types != null && message.hasOwnProperty("types"))
            object.types = message.types;
        if (message.cliDependencies && message.cliDependencies.length) {
            object.cliDependencies = [];
            for (var j = 0; j < message.cliDependencies.length; ++j)
                object.cliDependencies[j] = message.cliDependencies[j];
        }
        if (message.versionScheme != null && message.hasOwnProperty("versionScheme"))
            object.versionScheme = message.versionScheme;
        return object;
    };

    /**
     * Creates a plain object from this Package message. Also converts values to other types if specified.
     * @param {$protobuf.ConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Package.prototype.toObject = function toObject(options) {
        return this.constructor.toObject(this, options);
    };

    /**
     * Converts this Package to JSON.
     * @returns {Object.<string,*>} JSON object
     */
    Package.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Package.Repository = (function() {

        /**
         * Properties of a Repository.
         * @typedef Package.Repository$Properties
         * @type {Object}
         * @property {string} [type] Repository type.
         * @property {string} [url] Repository url.
         */

        /**
         * Constructs a new Repository.
         * @exports Package.Repository
         * @constructor
         * @param {Package.Repository$Properties=} [properties] Properties to set
         */
        function Repository(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
        }

        /**
         * Repository type.
         * @type {string|undefined}
         */
        Repository.prototype.type = "";

        /**
         * Repository url.
         * @type {string|undefined}
         */
        Repository.prototype.url = "";

        /**
         * Creates a new Repository instance using the specified properties.
         * @param {Package.Repository$Properties=} [properties] Properties to set
         * @returns {Package.Repository} Repository instance
         */
        Repository.create = function create(properties) {
            return new Repository(properties);
        };

        /**
         * Encodes the specified Repository message. Does not implicitly {@link Package.Repository.verify|verify} messages.
         * @param {Package.Repository$Properties} message Repository message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Repository.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
            if (message.url != null && message.hasOwnProperty("url"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.url);
            return writer;
        };

        /**
         * Encodes the specified Repository message, length delimited. Does not implicitly {@link Package.Repository.verify|verify} messages.
         * @param {Package.Repository$Properties} message Repository message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Repository.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Repository message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Package.Repository} Repository
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Repository.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Package.Repository();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.string();
                    break;
                case 2:
                    message.url = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Repository message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Package.Repository} Repository
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Repository.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Repository message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Repository.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null)
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.url != null)
                if (!$util.isString(message.url))
                    return "url: string expected";
            return null;
        };

        /**
         * Creates a Repository message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {Package.Repository} Repository
         */
        Repository.fromObject = function fromObject(object) {
            if (object instanceof $root.Package.Repository)
                return object;
            var message = new $root.Package.Repository();
            if (object.type != null)
                message.type = String(object.type);
            if (object.url != null)
                message.url = String(object.url);
            return message;
        };

        /**
         * Creates a Repository message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link Package.Repository.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {Package.Repository} Repository
         */
        Repository.from = Repository.fromObject;

        /**
         * Creates a plain object from a Repository message. Also converts values to other types if specified.
         * @param {Package.Repository} message Repository
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Repository.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = "";
                object.url = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            return object;
        };

        /**
         * Creates a plain object from this Repository message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Repository.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Repository to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Repository.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Repository;
    })();

    return Package;
})();

module.exports = $root;
