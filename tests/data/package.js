/*eslint-disable block-scoped-var, no-redeclare, no-control-regex*/
"use strict";

var $protobuf = require("../../runtime");

// Lazily resolved type references
var $lazyTypes = [];

// Exported root namespace
var $root = {};

$root.Package = (function() {

    /**
     * Constructs a new Package.
     * @exports Package
     * @constructor
     * @param {Object} [properties] Properties to set
     */
    function Package(properties) {
        if (properties) {
            var keys = Object.keys(properties);
            for (var i = 0; i < keys.length; ++i)
                this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Package name.
     * @type {string}
     */
    Package.prototype.name = "";

    /**
     * Package version.
     * @type {string}
     */
    Package.prototype.version = "";

    /**
     * Package description.
     * @type {string}
     */
    Package.prototype.description = "";

    /**
     * Package author.
     * @type {string}
     */
    Package.prototype.author = "";

    /**
     * Package license.
     * @type {string}
     */
    Package.prototype.license = "";

    /**
     * Package repository.
     * @type {Package.Repository}
     */
    Package.prototype.repository = null;

    /**
     * Package bugs.
     * @type {string}
     */
    Package.prototype.bugs = "";

    /**
     * Package homepage.
     * @type {string}
     */
    Package.prototype.homepage = "";

    /**
     * Package keywords.
     * @type {Array.<string>}
     */
    Package.prototype.keywords = $protobuf.util.emptyArray;

    /**
     * Package main.
     * @type {string}
     */
    Package.prototype.main = "";

    /**
     * Package bin.
     * @type {Object.<string,string>}
     */
    Package.prototype.bin = $protobuf.util.emptyObject;

    /**
     * Package scripts.
     * @type {Object.<string,string>}
     */
    Package.prototype.scripts = $protobuf.util.emptyObject;

    /**
     * Package dependencies.
     * @type {Object.<string,string>}
     */
    Package.prototype.dependencies = $protobuf.util.emptyObject;

    /**
     * Package optionalDependencies.
     * @type {Object.<string,string>}
     */
    Package.prototype.optionalDependencies = $protobuf.util.emptyObject;

    /**
     * Package devDependencies.
     * @type {Object.<string,string>}
     */
    Package.prototype.devDependencies = $protobuf.util.emptyObject;

    /**
     * Package types.
     * @type {string}
     */
    Package.prototype.types = "";

    /**
     * Package cliDependencies.
     * @type {Array.<string>}
     */
    Package.prototype.cliDependencies = $protobuf.util.emptyArray;

    // Lazily resolved referenced types
    var $types = {5:"Package.Repository"}; $lazyTypes.push($types);

    /**
     * Creates a new Package instance using the specified properties.
     * @param {Object} [properties] Properties to set
     * @returns {Package} Package instance
     */
    Package.create = function create(properties) {
        return new Package(properties);
    };

    /**
     * Encodes the specified Package message.
     * @function
     * @param {Package|Object} message Package message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Package.encode = (function(Writer, util, types) { return function encode(message, writer) {
        if (!writer) {
            writer = Writer.create();
        }
        if (message.name !== undefined && message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.version !== undefined && message.version !== "") {
            writer.uint32(18).string(message.version);
        }
        if (message.description !== undefined && message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        if (message.author !== undefined && message.author !== "") {
            writer.uint32(34).string(message.author);
        }
        if (message.license !== undefined && message.license !== "") {
            writer.uint32(42).string(message.license);
        }
        if (message.repository !== undefined && message.repository !== null) {
            types[5].encode(message.repository, writer.uint32(50).fork()).ldelim();
        }
        if (message.bugs !== undefined && message.bugs !== "") {
            writer.uint32(58).string(message.bugs);
        }
        if (message.homepage !== undefined && message.homepage !== "") {
            writer.uint32(66).string(message.homepage);
        }
        if (message.keywords) {
            for (var i = 0; i < message.keywords.length; ++i) {
                writer.uint32(74).string(message.keywords[i]);
            }
        }
        if (message.main !== undefined && message.main !== "") {
            writer.uint32(82).string(message.main);
        }
        if (message.bin && message.bin !== util.emptyObject) {
            for (var keys = Object.keys(message.bin), i = 0; i < keys.length; ++i) {
                writer.uint32(90).fork().uint32(10).string(keys[i]).uint32(18).string(message.bin[keys[i]]).ldelim();
            }
        }
        if (message.scripts && message.scripts !== util.emptyObject) {
            for (var keys = Object.keys(message.scripts), i = 0; i < keys.length; ++i) {
                writer.uint32(98).fork().uint32(10).string(keys[i]).uint32(18).string(message.scripts[keys[i]]).ldelim();
            }
        }
        if (message.dependencies && message.dependencies !== util.emptyObject) {
            for (var keys = Object.keys(message.dependencies), i = 0; i < keys.length; ++i) {
                writer.uint32(106).fork().uint32(10).string(keys[i]).uint32(18).string(message.dependencies[keys[i]]).ldelim();
            }
        }
        if (message.optionalDependencies && message.optionalDependencies !== util.emptyObject) {
            for (var keys = Object.keys(message.optionalDependencies), i = 0; i < keys.length; ++i) {
                writer.uint32(114).fork().uint32(10).string(keys[i]).uint32(18).string(message.optionalDependencies[keys[i]]).ldelim();
            }
        }
        if (message.devDependencies && message.devDependencies !== util.emptyObject) {
            for (var keys = Object.keys(message.devDependencies), i = 0; i < keys.length; ++i) {
                writer.uint32(122).fork().uint32(10).string(keys[i]).uint32(18).string(message.devDependencies[keys[i]]).ldelim();
            }
        }
        if (message.types !== undefined && message.types !== "") {
            writer.uint32(138).string(message.types);
        }
        if (message.cliDependencies) {
            for (var i = 0; i < message.cliDependencies.length; ++i) {
                writer.uint32(146).string(message.cliDependencies[i]);
            }
        }
        return writer;
    };})($protobuf.Writer, $protobuf.util, $types);

    /**
     * Encodes the specified Package message, length delimited.
     * @param {Package|Object} message Package message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Package.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Package message from the specified reader or buffer.
     * @function
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Package} Package
     */
    Package.decode = (function(Reader, util, types) { return function decode(reader, len) {
        if (!(reader instanceof Reader)) {
            reader = Reader.create(reader);
        }
        var end = len === undefined ? reader.len : reader.pos + len, message = new $root.Package();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;

            case 2:
                message.version = reader.string();
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
                message.repository = types[5].decode(reader, reader.uint32());
                break;

            case 7:
                message.bugs = reader.string();
                break;

            case 8:
                message.homepage = reader.string();
                break;

            case 9:
                if (!(message.keywords && message.keywords.length)) {
                    message.keywords = [];
                }
                message.keywords.push(reader.string());
                break;

            case 10:
                message.main = reader.string();
                break;

            case 11:
                reader.skip().pos++;
                if (message.bin === util.emptyObject) {
                    message.bin = {};
                }
                var key = reader.string();
                reader.pos++;
                message.bin[typeof key === "object" ? util.longToHash(key) : key] = reader.string();
                break;

            case 12:
                reader.skip().pos++;
                if (message.scripts === util.emptyObject) {
                    message.scripts = {};
                }
                var key = reader.string();
                reader.pos++;
                message.scripts[typeof key === "object" ? util.longToHash(key) : key] = reader.string();
                break;

            case 13:
                reader.skip().pos++;
                if (message.dependencies === util.emptyObject) {
                    message.dependencies = {};
                }
                var key = reader.string();
                reader.pos++;
                message.dependencies[typeof key === "object" ? util.longToHash(key) : key] = reader.string();
                break;

            case 14:
                reader.skip().pos++;
                if (message.optionalDependencies === util.emptyObject) {
                    message.optionalDependencies = {};
                }
                var key = reader.string();
                reader.pos++;
                message.optionalDependencies[typeof key === "object" ? util.longToHash(key) : key] = reader.string();
                break;

            case 15:
                reader.skip().pos++;
                if (message.devDependencies === util.emptyObject) {
                    message.devDependencies = {};
                }
                var key = reader.string();
                reader.pos++;
                message.devDependencies[typeof key === "object" ? util.longToHash(key) : key] = reader.string();
                break;

            case 17:
                message.types = reader.string();
                break;

            case 18:
                if (!(message.cliDependencies && message.cliDependencies.length)) {
                    message.cliDependencies = [];
                }
                message.cliDependencies.push(reader.string());
                break;

            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };})($protobuf.Reader, $protobuf.util, $types);

    /**
     * Decodes a Package message from the specified reader or buffer, length delimited.
     * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
     * @returns {Package} Package
     */
    Package.decodeDelimited = function decodeDelimited(readerOrBuffer) {
        readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
        return this.decode(readerOrBuffer, readerOrBuffer.uint32());
    };

    /**
     * Verifies a Package message.
     * @function
     * @param {Package|Object} message Package message or plain object to verify
     * @returns {?string} `null` if valid, otherwise the reason why it is not
     */
    Package.verify = (function(util, types) { return function verify(message) {
        if (message.name !== undefined) {
            if (!util.isString(message.name)) {
                return "name: string expected";
            }
        }
        if (message.version !== undefined) {
            if (!util.isString(message.version)) {
                return "version: string expected";
            }
        }
        if (message.description !== undefined) {
            if (!util.isString(message.description)) {
                return "description: string expected";
            }
        }
        if (message.author !== undefined) {
            if (!util.isString(message.author)) {
                return "author: string expected";
            }
        }
        if (message.license !== undefined) {
            if (!util.isString(message.license)) {
                return "license: string expected";
            }
        }
        if (message.repository !== undefined && message.repository !== null) {
            var err = types[5].verify(message.repository);
            if (err) {
                return "repository." + err;
            }
        }
        if (message.bugs !== undefined) {
            if (!util.isString(message.bugs)) {
                return "bugs: string expected";
            }
        }
        if (message.homepage !== undefined) {
            if (!util.isString(message.homepage)) {
                return "homepage: string expected";
            }
        }
        if (message.keywords !== undefined) {
            if (!Array.isArray(message.keywords)) {
                return "keywords: array expected";
            }
            for (var i = 0; i < message.keywords.length; ++i) {
                if (!util.isString(message.keywords[i])) {
                    return "keywords: string[] expected";
                }
            }
        }
        if (message.main !== undefined) {
            if (!util.isString(message.main)) {
                return "main: string expected";
            }
        }
        if (message.bin !== undefined) {
            if (!util.isObject(message.bin)) {
                return "bin: object expected";
            }
            var key = Object.keys(message.bin);
            for (var i = 0; i < key.length; ++i) {
                if (!util.isString(message.bin[key[i]])) {
                    return "bin: string{key:string} expected";
                }
            }
        }
        if (message.scripts !== undefined) {
            if (!util.isObject(message.scripts)) {
                return "scripts: object expected";
            }
            var key = Object.keys(message.scripts);
            for (var i = 0; i < key.length; ++i) {
                if (!util.isString(message.scripts[key[i]])) {
                    return "scripts: string{key:string} expected";
                }
            }
        }
        if (message.dependencies !== undefined) {
            if (!util.isObject(message.dependencies)) {
                return "dependencies: object expected";
            }
            var key = Object.keys(message.dependencies);
            for (var i = 0; i < key.length; ++i) {
                if (!util.isString(message.dependencies[key[i]])) {
                    return "dependencies: string{key:string} expected";
                }
            }
        }
        if (message.optionalDependencies !== undefined) {
            if (!util.isObject(message.optionalDependencies)) {
                return "optionalDependencies: object expected";
            }
            var key = Object.keys(message.optionalDependencies);
            for (var i = 0; i < key.length; ++i) {
                if (!util.isString(message.optionalDependencies[key[i]])) {
                    return "optionalDependencies: string{key:string} expected";
                }
            }
        }
        if (message.devDependencies !== undefined) {
            if (!util.isObject(message.devDependencies)) {
                return "devDependencies: object expected";
            }
            var key = Object.keys(message.devDependencies);
            for (var i = 0; i < key.length; ++i) {
                if (!util.isString(message.devDependencies[key[i]])) {
                    return "devDependencies: string{key:string} expected";
                }
            }
        }
        if (message.types !== undefined) {
            if (!util.isString(message.types)) {
                return "types: string expected";
            }
        }
        if (message.cliDependencies !== undefined) {
            if (!Array.isArray(message.cliDependencies)) {
                return "cliDependencies: array expected";
            }
            for (var i = 0; i < message.cliDependencies.length; ++i) {
                if (!util.isString(message.cliDependencies[i])) {
                    return "cliDependencies: string[] expected";
                }
            }
        }
        return null;
    };})($protobuf.util, $types);

    /**
     * Creates a Package message from a plain object. Also converts values to their respective internal types.
     * @param {Object.<string,*>} object Plain object
     * @returns {Package} Package
     */
    Package.fromObject = (function(types) { return function fromObject(object) {
        var message = new $root.Package();
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = String(object.version);
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description);
        }
        if (object.author !== undefined && object.author !== null) {
            message.author = String(object.author);
        }
        if (object.license !== undefined && object.license !== null) {
            message.license = String(object.license);
        }
        if (object.repository !== undefined && object.repository !== null) {
            message.repository = types[5].fromObject(object.repository);
        }
        if (object.bugs !== undefined && object.bugs !== null) {
            message.bugs = String(object.bugs);
        }
        if (object.homepage !== undefined && object.homepage !== null) {
            message.homepage = String(object.homepage);
        }
        if (object.keywords) {
            message.keywords = [];
            for (var i = 0; i < object.keywords.length; ++i) {
                message.keywords[i] = String(object.keywords[i]);
            }
        }
        if (object.main !== undefined && object.main !== null) {
            message.main = String(object.main);
        }
        if (object.bin) {
            message.bin = {};
            for (var keys = Object.keys(object.bin), i = 0; i < keys.length; ++i) {
                message.bin[keys[i]] = String(object.bin[keys[i]]);
            }
        }
        if (object.scripts) {
            message.scripts = {};
            for (var keys = Object.keys(object.scripts), i = 0; i < keys.length; ++i) {
                message.scripts[keys[i]] = String(object.scripts[keys[i]]);
            }
        }
        if (object.dependencies) {
            message.dependencies = {};
            for (var keys = Object.keys(object.dependencies), i = 0; i < keys.length; ++i) {
                message.dependencies[keys[i]] = String(object.dependencies[keys[i]]);
            }
        }
        if (object.optionalDependencies) {
            message.optionalDependencies = {};
            for (var keys = Object.keys(object.optionalDependencies), i = 0; i < keys.length; ++i) {
                message.optionalDependencies[keys[i]] = String(object.optionalDependencies[keys[i]]);
            }
        }
        if (object.devDependencies) {
            message.devDependencies = {};
            for (var keys = Object.keys(object.devDependencies), i = 0; i < keys.length; ++i) {
                message.devDependencies[keys[i]] = String(object.devDependencies[keys[i]]);
            }
        }
        if (object.types !== undefined && object.types !== null) {
            message.types = String(object.types);
        }
        if (object.cliDependencies) {
            message.cliDependencies = [];
            for (var i = 0; i < object.cliDependencies.length; ++i) {
                message.cliDependencies[i] = String(object.cliDependencies[i]);
            }
        }
        return message;
    };})($types);

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
    Package.toObject = (function(util, types) { return function toObject(message, options) {
        if (!options) {
            options = {};
        }
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
        }
        for (var keys = Object.keys(message), i = 0; i < keys.length; ++i) {
            switch (keys[i]) {
            case "name":
                if (message.name !== undefined && message.name !== null) {
                    object.name = message.name;
                }
                break;

            case "version":
                if (message.version !== undefined && message.version !== null) {
                    object.version = message.version;
                }
                break;

            case "description":
                if (message.description !== undefined && message.description !== null) {
                    object.description = message.description;
                }
                break;

            case "author":
                if (message.author !== undefined && message.author !== null) {
                    object.author = message.author;
                }
                break;

            case "license":
                if (message.license !== undefined && message.license !== null) {
                    object.license = message.license;
                }
                break;

            case "repository":
                if (message.repository !== undefined && message.repository !== null) {
                    object.repository = types[5].toObject(message.repository, options);
                }
                break;

            case "bugs":
                if (message.bugs !== undefined && message.bugs !== null) {
                    object.bugs = message.bugs;
                }
                break;

            case "homepage":
                if (message.homepage !== undefined && message.homepage !== null) {
                    object.homepage = message.homepage;
                }
                break;

            case "keywords":
                if (message.keywords.length) {
                    object.keywords = [];
                    for (var j = 0; j < message.keywords.length; ++j) {
                        object.keywords[j] = message.keywords[j];
                    }
                }
                break;

            case "main":
                if (message.main !== undefined && message.main !== null) {
                    object.main = message.main;
                }
                break;

            case "bin":
                if (message.bin && message.bin !== util.emptyObject) {
                    object.bin = {};
                    for (var keys2 = Object.keys(message.bin), j = 0; j < keys2.length; ++j) {
                        object.bin[keys2[j]] = message.bin[keys2[j]];
                    }
                }
                break;

            case "scripts":
                if (message.scripts && message.scripts !== util.emptyObject) {
                    object.scripts = {};
                    for (var keys2 = Object.keys(message.scripts), j = 0; j < keys2.length; ++j) {
                        object.scripts[keys2[j]] = message.scripts[keys2[j]];
                    }
                }
                break;

            case "dependencies":
                if (message.dependencies && message.dependencies !== util.emptyObject) {
                    object.dependencies = {};
                    for (var keys2 = Object.keys(message.dependencies), j = 0; j < keys2.length; ++j) {
                        object.dependencies[keys2[j]] = message.dependencies[keys2[j]];
                    }
                }
                break;

            case "optionalDependencies":
                if (message.optionalDependencies && message.optionalDependencies !== util.emptyObject) {
                    object.optionalDependencies = {};
                    for (var keys2 = Object.keys(message.optionalDependencies), j = 0; j < keys2.length; ++j) {
                        object.optionalDependencies[keys2[j]] = message.optionalDependencies[keys2[j]];
                    }
                }
                break;

            case "devDependencies":
                if (message.devDependencies && message.devDependencies !== util.emptyObject) {
                    object.devDependencies = {};
                    for (var keys2 = Object.keys(message.devDependencies), j = 0; j < keys2.length; ++j) {
                        object.devDependencies[keys2[j]] = message.devDependencies[keys2[j]];
                    }
                }
                break;

            case "types":
                if (message.types !== undefined && message.types !== null) {
                    object.types = message.types;
                }
                break;

            case "cliDependencies":
                if (message.cliDependencies.length) {
                    object.cliDependencies = [];
                    for (var j = 0; j < message.cliDependencies.length; ++j) {
                        object.cliDependencies[j] = message.cliDependencies[j];
                    }
                }
                break;
            }
        }
        return object;
    };})($protobuf.util, $types);

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
         * Constructs a new Repository.
         * @exports Package.Repository
         * @constructor
         * @param {Object} [properties] Properties to set
         */
        function Repository(properties) {
            if (properties) {
                var keys = Object.keys(properties);
                for (var i = 0; i < keys.length; ++i)
                    this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Repository type.
         * @type {string}
         */
        Repository.prototype.type = "";

        /**
         * Repository url.
         * @type {string}
         */
        Repository.prototype.url = "";

        /**
         * Creates a new Repository instance using the specified properties.
         * @param {Object} [properties] Properties to set
         * @returns {Package.Repository} Repository instance
         */
        Repository.create = function create(properties) {
            return new Repository(properties);
        };

        /**
         * Encodes the specified Repository message.
         * @function
         * @param {Package.Repository|Object} message Repository message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Repository.encode = (function(Writer) { return function encode(message, writer) {
            if (!writer) {
                writer = Writer.create();
            }
            if (message.type !== undefined && message.type !== "") {
                writer.uint32(10).string(message.type);
            }
            if (message.url !== undefined && message.url !== "") {
                writer.uint32(18).string(message.url);
            }
            return writer;
        };})($protobuf.Writer);

        /**
         * Encodes the specified Repository message, length delimited.
         * @param {Package.Repository|Object} message Repository message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Repository.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Repository message from the specified reader or buffer.
         * @function
         * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Package.Repository} Repository
         */
        Repository.decode = (function(Reader) { return function decode(reader, len) {
            if (!(reader instanceof Reader)) {
                reader = Reader.create(reader);
            }
            var end = len === undefined ? reader.len : reader.pos + len, message = new $root.Package.Repository();
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
        };})($protobuf.Reader);

        /**
         * Decodes a Repository message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} readerOrBuffer Reader or buffer to decode from
         * @returns {Package.Repository} Repository
         */
        Repository.decodeDelimited = function decodeDelimited(readerOrBuffer) {
            readerOrBuffer = readerOrBuffer instanceof $protobuf.Reader ? readerOrBuffer : $protobuf.Reader(readerOrBuffer);
            return this.decode(readerOrBuffer, readerOrBuffer.uint32());
        };

        /**
         * Verifies a Repository message.
         * @function
         * @param {Package.Repository|Object} message Repository message or plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Repository.verify = (function(util) { return function verify(message) {
            if (message.type !== undefined) {
                if (!util.isString(message.type)) {
                    return "type: string expected";
                }
            }
            if (message.url !== undefined) {
                if (!util.isString(message.url)) {
                    return "url: string expected";
                }
            }
            return null;
        };})($protobuf.util);

        /**
         * Creates a Repository message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {Package.Repository} Repository
         */
        Repository.fromObject = function fromObject(object) {
            var message = new $root.Package.Repository();
            if (object.type !== undefined && object.type !== null) {
                message.type = String(object.type);
            }
            if (object.url !== undefined && object.url !== null) {
                message.url = String(object.url);
            }
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
            if (!options) {
                options = {};
            }
            var object = {};
            if (options.defaults) {
                object.type = "";
                object.url = "";
            }
            for (var keys = Object.keys(message), i = 0; i < keys.length; ++i) {
                switch (keys[i]) {
                case "type":
                    if (message.type !== undefined && message.type !== null) {
                        object.type = message.type;
                    }
                    break;

                case "url":
                    if (message.url !== undefined && message.url !== null) {
                        object.url = message.url;
                    }
                    break;
                }
            }
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

// Resolve lazy type names to actual types
$protobuf.util.lazyResolve($root, $lazyTypes);

$protobuf.roots["test_package"] = $root;

module.exports = $root;
